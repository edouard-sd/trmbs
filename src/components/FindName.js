/**
 * ═══════════════════════════════════════════════════════════
 *  FindName — Mode "Trouve le nom"
 * ═══════════════════════════════════════════════════════════
 *
 * Une photo s'affiche, le joueur doit choisir le bon nom
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

export function renderFindName(container, data) {
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
    ${renderNavBar('Trouve le nom', session.score, () => navigate('menu'))}

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

        <!-- Photo -->
        <div class="game-photo-container animate-scale-in">
          ${renderPhoto(current)}
        </div>

        <p class="text-center text-secondary" style="margin-bottom: var(--space-lg);">
          Qui est cette personne ?
        </p>

        <!-- Badge pôle -->
        <div class="text-center" style="margin-bottom: var(--space-lg);">
          <span class="badge badge-accent">${current.poleName}</span>
        </div>

        <!-- Options -->
        <div class="options-grid options-grid-2">
          ${options.map((opt, i) => `
            <button class="option-card animate-fade-in-up stagger-${i + 1}" data-id="${opt.id}" id="option-${i}">
              ${opt.firstName} ${opt.lastName}
              <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: 4px;">
                ${opt.role}
              </div>
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

  // Désactiver tous les boutons
  document.querySelectorAll('.option-card').forEach((card) => {
    card.classList.add('disabled');

    if (card.dataset.id === correctId) {
      card.classList.add('correct');
    } else if (!isCorrect && card === document.activeElement) {
      card.classList.add('wrong');
    }
  });

  // Marquer la mauvaise réponse cliquée
  if (!isCorrect) {
    const clicked = document.querySelector('.option-card:not(.correct):hover, .option-card:not(.correct):focus');
    document.querySelectorAll('.option-card').forEach((card) => {
      if (card.dataset.id !== correctId && !card.classList.contains('correct')) {
        // Trouver le bouton cliqué
      }
    });
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
  // Sauvegarder le score
  const pseudo = getPseudo();
  await saveScore(pseudo, session.score, 'find-name');

  container.innerHTML = renderGameSummary(session,
    () => {
      session = createGameSession(allPeople, Math.min(10, allPeople.length));
      renderQuestion(container);
    },
    () => navigate('menu')
  );

  document.getElementById('btn-replay').addEventListener('click', () => {
    session = createGameSession(allPeople, Math.min(10, allPeople.length));
    renderQuestion(container);
  });

  document.getElementById('btn-back-menu').addEventListener('click', () => {
    navigate('menu');
  });
}
