/**
 * ═══════════════════════════════════════════════════════════
 *  Firebase Configuration & Leaderboard Functions
 * ═══════════════════════════════════════════════════════════
 *
 * ⚠️ INSTRUCTIONS POUR CONFIGURER FIREBASE :
 *
 * 1. Va sur https://console.firebase.google.com/
 * 2. Clique "Ajouter un projet" → nomme-le "trombinoscope"
 * 3. Désactive Google Analytics (pas nécessaire) → Créer
 * 4. Dans le menu gauche : "Realtime Database" → "Créer une base de données"
 * 5. Choisis la zone Europe (eur3) → Mode test → Activer
 * 6. Dans le menu gauche : "⚙ Paramètres du projet" → "Ajouter une appli" → Web
 * 7. Nomme l'app "trombinoscope-web" → Enregistrer
 * 8. Copie les valeurs de firebaseConfig ci-dessous et remplace les placeholders
 *
 * RÈGLES DE SECURITÉ (dans Realtime Database → Règles) :
 * {
 *   "rules": {
 *     "leaderboard": {
 *       ".read": true,
 *       ".write": true
 *     }
 *   }
 * }
 */

import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from 'firebase/database';

// ── Configuration Firebase ─────────────────────────────
// ⚠️ REMPLACE CES VALEURS par celles de ton projet Firebase !
const firebaseConfig = {
  apiKey: "AIzaSyCdjqi9HWTze561v2HAu_s3orKXVhC3tdA",
  authDomain: "trombinoscope-87ae6.firebaseapp.com",
  databaseURL: "https://trombinoscope-87ae6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trombinoscope-87ae6",
  storageBucket: "trombinoscope-87ae6.firebasestorage.app",
  messagingSenderId: "872375555849",
  appId: "1:872375555849:web:3d21c50733c79fae0c25d8",
  measurementId: "G-9GRF3XVRPB"
};

let app = null;
let db = null;
let firebaseReady = false;

/**
 * Initialise Firebase. Retourne true si la config est valide.
 */
export function initFirebase() {
  try {
    // Ne pas initialiser si la config n'a pas été remplacée
    if (firebaseConfig.apiKey === "REMPLACE-MOI") {
      console.warn("⚠️ Firebase n'est pas configuré. Le leaderboard sera en mode hors-ligne.");
      return false;
    }

    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    firebaseReady = true;
    console.log("✅ Firebase initialisé avec succès");
    return true;
  } catch (error) {
    console.error("❌ Erreur Firebase :", error);
    return false;
  }
}

/**
 * Vérifie si Firebase est prêt
 */
export function isFirebaseReady() {
  return firebaseReady;
}

/**
 * Sauvegarde ou met à jour le score d'un joueur
 * @param {string} pseudo - Le pseudo du joueur
 * @param {number} score - Le score à ajouter
 * @param {string} mode - Le mode de jeu
 */
export async function saveScore(pseudo, score, mode = 'general') {
  if (!firebaseReady) {
    // Mode hors-ligne : sauvegarde en localStorage
    saveScoreOffline(pseudo, score, mode);
    return;
  }

  try {
    const playerRef = ref(db, `leaderboard/${pseudo}`);
    const snapshot = await get(playerRef);

    if (snapshot.exists()) {
      const existing = snapshot.val();
      await set(playerRef, {
        pseudo,
        score: (existing.score || 0) + score,
        gamesPlayed: (existing.gamesPlayed || 0) + 1,
        bestScore: Math.max(existing.bestScore || 0, score),
        lastPlayed: new Date().toISOString(),
        lastMode: mode,
      });
    } else {
      await set(playerRef, {
        pseudo,
        score,
        gamesPlayed: 1,
        bestScore: score,
        lastPlayed: new Date().toISOString(),
        lastMode: mode,
      });
    }
  } catch (error) {
    console.error("❌ Erreur sauvegarde score :", error);
    // Fallback vers localStorage
    saveScoreOffline(pseudo, score, mode);
  }
}

/**
 * Récupère le classement (top N joueurs)
 * @param {number} limit - Nombre max de joueurs
 * @returns {Promise<Array>} Liste des joueurs triés par score
 */
export async function getLeaderboard(limit = 50) {
  if (!firebaseReady) {
    return getLeaderboardOffline();
  }

  try {
    const leaderboardRef = ref(db, 'leaderboard');
    const topQuery = query(leaderboardRef, orderByChild('score'), limitToLast(limit));
    const snapshot = await get(topQuery);

    if (!snapshot.exists()) return [];

    const players = [];
    snapshot.forEach((child) => {
      players.push({ id: child.key, ...child.val() });
    });

    // Firebase limitToLast retourne en ordre croissant, on inverse
    return players.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error("❌ Erreur récupération leaderboard :", error);
    return getLeaderboardOffline();
  }
}

/**
 * Écoute les changements du leaderboard en temps réel
 * @param {Function} callback - Fonction appelée avec la liste mise à jour
 * @returns {Function} Fonction pour arrêter l'écoute
 */
export function onLeaderboardUpdate(callback) {
  if (!firebaseReady) {
    callback(getLeaderboardOffline());
    return () => { };
  }

  const leaderboardRef = ref(db, 'leaderboard');
  const topQuery = query(leaderboardRef, orderByChild('score'), limitToLast(50));

  const unsubscribe = onValue(topQuery, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const players = [];
    snapshot.forEach((child) => {
      players.push({ id: child.key, ...child.val() });
    });

    callback(players.sort((a, b) => b.score - a.score));
  });

  return unsubscribe;
}

// ── Mode hors-ligne (localStorage) ──────────────────────
function saveScoreOffline(pseudo, score, mode) {
  const data = JSON.parse(localStorage.getItem('leaderboard') || '{}');

  if (data[pseudo]) {
    data[pseudo].score = (data[pseudo].score || 0) + score;
    data[pseudo].gamesPlayed = (data[pseudo].gamesPlayed || 0) + 1;
    data[pseudo].bestScore = Math.max(data[pseudo].bestScore || 0, score);
    data[pseudo].lastPlayed = new Date().toISOString();
    data[pseudo].lastMode = mode;
  } else {
    data[pseudo] = {
      pseudo,
      score,
      gamesPlayed: 1,
      bestScore: score,
      lastPlayed: new Date().toISOString(),
      lastMode: mode,
    };
  }

  localStorage.setItem('leaderboard', JSON.stringify(data));
}

function getLeaderboardOffline() {
  const data = JSON.parse(localStorage.getItem('leaderboard') || '{}');
  return Object.values(data).sort((a, b) => b.score - a.score);
}
