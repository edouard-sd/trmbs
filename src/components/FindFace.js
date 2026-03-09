/**
 * ═══════════════════════════════════════════════════════════
 *  FindFace — Mode "Trouve la tête"
 * ═══════════════════════════════════════════════════════════
 *
 * Un nom s'affiche, le joueur doit choisir la bonne photo
 * parmi 4 propositions.
 */

import { navigate, getPseudo } from '../main.js';
import { saveScore } from '../firebase.js';
import {
  getAllPeople,
  generateOptions,
  createGameSession,
  nextQuestion,
  recordAnswer,
  renderPhoto,
  showToast,
  renderNavBar,
  attachNavBack,
  renderGameSummary,
} from './GameEngine.js';

let session = null;
let allPeople = [];

export function renderFindFace(container, data) {
  allPeople = getAllPeople(data);

  if (allPeople.length < 4) {
    container.innerHTML = `
      <div class="page">
        <div class="page-content text-center">
          <span class="emoji-icon">⚠️</span>
          <h2 class="heading-2">Pas assez de données</h2>
          <p class="text-secondary" style="margin: var(--space-md) 0;">
            Il faut au moins 4 personnes pour jouer à ce mode.
          </p>
          <button class="btn btn-primary" id="btn-back">← Retour</button>
        </div>
      </div>
    `;
    document.getElementById('btn-back').addEventListener('click', () => navigate('menu'));
    return;
  }

  session = createGameSession(allPeople, Math.min(10, allPeople.length));
  renderQuestion(container);
}

function renderQuestion(container) {
  if (session.finished) {
    renderSummary(container);
    return;
  }

  const current = session.questions[session.currentIndex];
  const options = generateOptions(current, allPeople);
  const progress = ((session.currentIndex) / session.questions.length) * 100;

  container.innerHTML = `
    ${renderNavBar('Trouve la tête', session.score, () => navigate('menu'))}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content">
        <!-- Progress -->
        <div class="game-counter animate-fade-in">
          Question ${session.currentIndex + 1} / ${session.questions.length}
          ${session.streak >= 3 ? `<span class="badge badge-accent" style="margin-left: var(--space-sm);">🔥 ${session.streak}</span>` : ''}
        </div>
        <div class="progress-bar" style="margin-bottom: var(--space-xl);">
          <div class="progress-fill" style="width: ${progress}%;"></div>
        </div>

        <!-- Name Display -->
        <div class="game-name-display animate-scale-in">
          <div style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: var(--space-sm);">
            Trouve la photo de
          </div>
          ${current.firstName} ${current.lastName}
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--space-sm);">
            ${current.role}
          </div>
        </div>

        <!-- Badge pôle -->
        <div class="text-center" style="margin-bottom: var(--space-lg);">
          <span class="badge badge-accent">${current.poleName}</span>
        </div>

        <!-- Photo Options -->
        <div class="options-grid options-grid-2">
          ${options.map((opt, i) => `
            <button class="option-card option-photo animate-fade-in-up stagger-${i + 1}" data-id="${opt.id}" id="option-${i}">
              ${renderPhoto(opt, 'photo-frame-sm')}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  attachNavBack(() => navigate('menu'));

  // Event listeners pour les options
  options.forEach((opt, i) => {
    document.getElementById(`option-${i}`).addEventListener('click', () => {
      handleAnswer(container, opt.id === current.id, current.id, options);
    });
  });
}

function handleAnswer(container, isCorrect, correctId, options) {
  const { points } = recordAnswer(session, isCorrect);

  // Désactiver et colorer les boutons
  document.querySelectorAll('.option-card').forEach((card) => {
    card.classList.add('disabled');

    if (card.dataset.id === correctId) {
      card.classList.add('correct');
    }
  });

  // Trouver et marquer le mauvais choix
  if (!isCorrect) {
    showToast('❌ Raté !', 'error');
  } else {
    showToast(`✅ +${points} points !`, 'success');
  }

  // Passer à la question suivante après un délai
  setTimeout(() => {
    nextQuestion(session);
    renderQuestion(container);
  }, 1500);
}

async function renderSummary(container) {
  const pseudo = getPseudo();
  await saveScore(pseudo, session.score, 'find-face');

  container.innerHTML = renderGameSummary(session);

  document.getElementById('btn-replay').addEventListener('click', () => {
    session = createGameSession(allPeople, Math.min(10, allPeople.length));
    renderQuestion(container);
  });

  document.getElementById('btn-back-menu').addEventListener('click', () => {
    navigate('menu');
  });
}
