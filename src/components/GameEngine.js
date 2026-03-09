/**
 * ═══════════════════════════════════════════════════════════
 *  GameEngine — Shared Game Logic
 * ═══════════════════════════════════════════════════════════
 *
 * Moteur de jeu réutilisable par tous les modes.
 * Gère : shuffle, scoring, sélection d'options, timer bonus.
 */

/**
 * Mélange un tableau aléatoirement (Fisher-Yates)
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Récupère tous les pôles à plat (de toutes les listes)
 */
export function getAllPoles(data) {
  if (data?.lists) {
    return data.lists.flatMap((list) =>
      (list.poles || []).map((pole) => ({
        ...pole,
        listId: list.id,
        listName: list.name,
      }))
    );
  }
  // Fallback ancien format
  return data?.poles || [];
}

/**
 * Récupère toutes les personnes de tous les pôles
 */
export function getAllPeople(data) {
  const poles = getAllPoles(data);
  return poles.flatMap((pole) =>
    (pole.people || []).map((person) => ({
      ...person,
      id: person.photo || `${person.firstName}_${person.lastName}`,
      poleName: pole.name,
      poleId: pole.id,
      listId: pole.listId || '',
      listName: pole.listName || '',
    }))
  );
}

/**
 * Récupère les personnes d'un pôle spécifique
 */
export function getPeopleByPole(data, poleId) {
  const poles = getAllPoles(data);
  const pole = poles.find((p) => p.id === poleId);
  if (!pole) return [];
  return (pole.people || []).map((person) => ({
    ...person,
    id: person.photo || `${person.firstName}_${person.lastName}`,
    poleName: pole.name,
    poleId: pole.id,
    listId: pole.listId || '',
    listName: pole.listName || '',
  }));
}

/**
 * Récupère les personnes d'une liste spécifique  
 */
export function getPeopleByList(data, listId) {
  if (!data?.lists) return [];
  const list = data.lists.find((l) => l.id === listId);
  if (!list) return [];
  return (list.poles || []).flatMap((pole) =>
    (pole.people || []).map((person) => ({
      ...person,
      id: person.photo || `${person.firstName}_${person.lastName}`,
      poleName: pole.name,
      poleId: pole.id,
      listId: list.id,
      listName: list.name,
    }))
  );
}

/**
 * Génère 4 options pour un QCM (1 correcte + 3 distracteurs)
 * @param {object} correctPerson - La bonne réponse
 * @param {Array} allPeople - Toutes les personnes disponibles
 * @returns {Array} 4 options mélangées
 */
export function generateOptions(correctPerson, allPeople) {
  // Exclure la bonne réponse (comparer par photo pour unicité)
  const correctId = correctPerson.id || correctPerson.photo;
  const others = allPeople.filter((p) => (p.id || p.photo) !== correctId);

  // Prendre 3 distracteurs aléatoires
  const distractors = shuffle(others).slice(0, 3);

  // Ajouter la bonne réponse et mélanger
  return shuffle([correctPerson, ...distractors]);
}

/**
 * Calcule le score pour une réponse
 * @param {boolean} isCorrect - Si la réponse est correcte
 * @param {number} timeMs - Temps de réponse en millisecondes
 * @returns {number} Points gagnés
 */
export function calculateScore(isCorrect, timeMs = 5000) {
  if (!isCorrect) return 0;

  const BASE_POINTS = 100;
  const TIME_BONUS_MAX = 50; // bonus max si réponse < 2s

  // Bonus de rapidité (linéaire, 0-50 points)
  const timeFactor = Math.max(0, 1 - timeMs / 10000); // 10s max
  const timeBonus = Math.floor(timeFactor * TIME_BONUS_MAX);

  return BASE_POINTS + timeBonus;
}

/**
 * Crée l'état d'une session de jeu
 * @param {Array} people - Liste des personnes
 * @param {number} totalQuestions - Nombre de questions (0 = toutes)
 */
export function createGameSession(people, totalQuestions = 10) {
  const shuffled = shuffle(people);
  const questions = totalQuestions > 0
    ? shuffled.slice(0, Math.min(totalQuestions, shuffled.length))
    : shuffled;

  return {
    questions,
    currentIndex: 0,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    startTime: Date.now(),
    questionStartTime: Date.now(),
    finished: false,
  };
}

/**
 * Passe à la question suivante
 */
export function nextQuestion(session) {
  session.currentIndex++;
  session.questionStartTime = Date.now();

  if (session.currentIndex >= session.questions.length) {
    session.finished = true;
  }

  return session;
}

/**
 * Enregistre une réponse
 */
export function recordAnswer(session, isCorrect) {
  const timeMs = Date.now() - session.questionStartTime;
  const points = calculateScore(isCorrect, timeMs);

  session.score += points;

  if (isCorrect) {
    session.correct++;
    session.streak++;
    session.bestStreak = Math.max(session.bestStreak, session.streak);
  } else {
    session.wrong++;
    session.streak = 0;
  }

  return { points, timeMs };
}

/**
 * Génère le HTML d'un avatar/photo
 */
export function renderPhoto(person, sizeClass = '') {
  const frameClass = sizeClass || 'photo-frame-lg';

  if (person.photo) {
    return `
      <div class="photo-frame ${frameClass}">
        <img src="${import.meta.env.BASE_URL}${person.photo}" alt="${person.firstName}" loading="lazy" />
      </div>
    `;
  }

  // Pas de photo → initiales avec couleur aléatoire
  const initials = `${person.firstName?.[0] || '?'}${person.lastName?.[0] || ''}`.toUpperCase();
  const hue = hashCode(person.id || person.firstName || '') % 360;

  return `
    <div class="photo-frame ${frameClass}" style="background: hsl(${hue}, 50%, 25%);">
      <span class="photo-placeholder" style="font-size: ${frameClass === 'photo-frame-sm' ? '1.5rem' : '3rem'}; color: hsl(${hue}, 80%, 75%);">
        ${initials}
      </span>
    </div>
  `;
}

/**
 * Affiche un toast (notification temporaire)
 */
export function showToast(message, type = 'success') {
  // Supprimer les toasts existants
  document.querySelectorAll('.toast').forEach((t) => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

/**
 * Génère le HTML de la barre de navigation en jeu
 */
export function renderNavBar(title, score, onBack) {
  return `
    <div class="nav-bar">
      <button class="nav-back" id="nav-back-btn">
        ← Retour
      </button>
      <span class="nav-title">${title}</span>
      <span class="nav-score">⭐ ${score}</span>
    </div>
  `;
}

/**
 * Attache l'event listener pour le bouton retour
 */
export function attachNavBack(callback) {
  const btn = document.getElementById('nav-back-btn');
  if (btn) btn.addEventListener('click', callback);
}

/**
 * Affiche le résumé de fin de partie
 */
export function renderGameSummary(session, onReplay, onMenu) {
  const totalTime = Math.floor((Date.now() - session.startTime) / 1000);
  const accuracy = session.questions.length > 0
    ? Math.round((session.correct / session.questions.length) * 100)
    : 0;

  const emoji = accuracy >= 80 ? '🎉' : accuracy >= 50 ? '👍' : '💪';

  return `
    <div class="page">
      <div class="page-content text-center">
        <div class="header animate-bounce-in">
          <span class="header-emoji">${emoji}</span>
          <h1 class="heading-display">
            ${accuracy >= 80 ? 'Excellent !' : accuracy >= 50 ? 'Pas mal !' : 'Continue !'}
          </h1>
        </div>

        <div class="card animate-fade-in-up stagger-1" style="margin-bottom: var(--space-xl);">
          <div class="score-display" style="justify-content: center; margin-bottom: var(--space-lg);">
            <div>
              <div class="score-value" style="font-size: var(--font-size-4xl);">${session.score}</div>
              <div class="score-label">points</div>
            </div>
          </div>

          <div class="summary-stat">
            <span class="summary-stat-label">✅ Bonnes réponses</span>
            <span class="summary-stat-value" style="color: var(--color-success);">${session.correct}/${session.questions.length}</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">🎯 Précision</span>
            <span class="summary-stat-value">${accuracy}%</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">🔥 Meilleure série</span>
            <span class="summary-stat-value">${session.bestStreak}</span>
          </div>
          <div class="summary-stat">
            <span class="summary-stat-label">⏱ Temps total</span>
            <span class="summary-stat-value">${totalTime}s</span>
          </div>
        </div>

        <div class="animate-fade-in-up stagger-3" style="display: flex; flex-direction: column; gap: var(--space-md);">
          <button class="btn btn-primary btn-full btn-lg" id="btn-replay">
            🔄 Rejouer
          </button>
          <button class="btn btn-secondary btn-full" id="btn-back-menu">
            ← Retour au menu
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Utility ─────────────────────────────────────────────
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
