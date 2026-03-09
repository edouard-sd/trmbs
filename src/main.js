/**
 * ═══════════════════════════════════════════════════════════
 *  Main Entry Point — Router & App State
 * ═══════════════════════════════════════════════════════════
 */

import './styles/index.css';
import { initFirebase } from './firebase.js';
import { renderLoginGate } from './components/LoginGate.js';
import { renderMenu } from './components/Menu.js';
import { renderFindName } from './components/FindName.js';
import { renderFindFace } from './components/FindFace.js';
import { renderReviewPole } from './components/ReviewPole.js';
import { renderFindInfos } from './components/FindInfos.js';
import { renderLeaderboard } from './components/Leaderboard.js';

// ── App State ───────────────────────────────────────────
const state = {
  authenticated: false,
  pseudo: '',
  currentRoute: 'login',
  peopleData: null,
  selectedPole: null,
};

// Restaurer la session si elle existe
const savedPseudo = sessionStorage.getItem('pseudo');
const savedAuth = sessionStorage.getItem('authenticated');
if (savedPseudo && savedAuth === 'true') {
  state.authenticated = true;
  state.pseudo = savedPseudo;
  state.currentRoute = 'menu';
}

// ── Initialize Firebase ─────────────────────────────────
initFirebase();

// ── Data Loading ────────────────────────────────────────
async function loadPeopleData() {
  if (state.peopleData) return state.peopleData;

  try {
    const response = await fetch(import.meta.env.BASE_URL + 'data/people.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.peopleData = await response.json();
    return state.peopleData;
  } catch (error) {
    console.error('❌ Erreur chargement données :', error);
    // Données de fallback minimales
    state.peopleData = { lists: [] };
    return state.peopleData;
  }
}

// ── Router ──────────────────────────────────────────────
const app = document.getElementById('app');

/**
 * Navigue vers une route donnée
 * @param {string} route - La route cible
 * @param {object} params - Paramètres optionnels
 */
export function navigate(route, params = {}) {
  state.currentRoute = route;

  if (params.pole) state.selectedPole = params.pole;

  render();
}

/**
 * Met à jour l'état d'authentification
 */
export function setAuth(pseudo) {
  state.authenticated = true;
  state.pseudo = pseudo;
  sessionStorage.setItem('pseudo', pseudo);
  sessionStorage.setItem('authenticated', 'true');
}

/**
 * Déconnecte l'utilisateur
 */
export function logout() {
  state.authenticated = false;
  state.pseudo = '';
  state.currentRoute = 'login';
  sessionStorage.removeItem('pseudo');
  sessionStorage.removeItem('authenticated');
  render();
}

/**
 * Récupère le pseudo courant
 */
export function getPseudo() {
  return state.pseudo;
}

/**
 * Rendu principal — affiche la bonne vue
 */
async function render() {
  // Si pas authentifié, toujours afficher le login
  if (!state.authenticated && state.currentRoute !== 'login') {
    state.currentRoute = 'login';
  }

  // Transition fluide
  app.style.opacity = '0';
  app.style.transform = 'translateY(10px)';

  await new Promise(r => setTimeout(r, 150));

  // Charger les données si nécessaire
  if (state.authenticated && !state.peopleData) {
    app.innerHTML = `
      <div class="page">
        <div class="spinner"></div>
        <p class="text-secondary" style="margin-top: var(--space-md)">Chargement des données...</p>
      </div>
    `;
    app.style.opacity = '1';
    app.style.transform = 'translateY(0)';
    await loadPeopleData();
  }

  switch (state.currentRoute) {
    case 'login':
      renderLoginGate(app);
      break;
    case 'menu':
      renderMenu(app, state.peopleData);
      break;
    case 'find-name':
      renderFindName(app, state.peopleData);
      break;
    case 'find-face':
      renderFindFace(app, state.peopleData);
      break;
    case 'find-infos':
      renderFindInfos(app, state.peopleData);
      break;
    case 'review-pole':
      renderReviewPole(app, state.peopleData, state.selectedPole);
      break;
    case 'leaderboard':
      renderLeaderboard(app);
      break;
    default:
      renderMenu(app, state.peopleData);
  }

  // Transition entrée
  requestAnimationFrame(() => {
    app.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    app.style.opacity = '1';
    app.style.transform = 'translateY(0)';
  });
}

// ── Initial Render ──────────────────────────────────────
render();
