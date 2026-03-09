/**
 * ═══════════════════════════════════════════════════════════
 *  ReviewPole — Mode "Révision par pôle"
 * ═══════════════════════════════════════════════════════════
 *
 * Navigation : Liste BDE → Pôle → Fiches / Quiz
 */

import { navigate, getPseudo } from '../main.js';
import { saveScore } from '../firebase.js';
import {
  getPeopleByPole,
  getPeopleByList,
  getAllPeople,
  getAllPoles,
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

const LIST_EMOJIS = {
  'KSK': '🟡',
  'PRK': '🟣',
  'RNK': '🔵',
  'TMK': '🔴',
};

const POLE_EMOJIS = {
  'Ambassador': '🤝',
  'Animation': '🎉',
  'Communication': '📢',
  'Event': '🎪',
  'IS': '💻',
  'Logistics': '📦',
  'Members': '👥',
  'Partnerships': '🤝',
  'Presidency': '👑',
  'Secretary': '📋',
  'Travel': '✈️',
  'Treasury': '💰',
};

let currentList = null;
let currentPole = null;
let currentTab = 'fiches';
let session = null;
let allPeople = [];

export function renderReviewPole(container, data, selectedPole = null) {
  allPeople = getAllPeople(data);

  if (selectedPole) {
    currentPole = selectedPole;
    renderPoleView(container, data);
  } else if (currentPole) {
    renderPoleView(container, data);
  } else if (currentList) {
    renderPoleSelector(container, data);
  } else {
    renderListSelector(container, data);
  }
}

// ─────────────────── ÉTAPE 1 : Choisir la liste BDE ───────────────────
function renderListSelector(container, data) {
  const lists = data?.lists || [];

  container.innerHTML = `
    ${renderNavBar('Révision par pôle', '', () => navigate('menu'))}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content page-wide">
        <div class="header animate-fade-in-up">
          <span class="header-emoji">📋</span>
          <h1 class="heading-1">Choisis une liste</h1>
          <p class="text-secondary">Sélectionne le BDE à réviser</p>
        </div>

        <div class="pole-grid">
          ${lists.map((list, i) => {
            const totalPeople = list.poles.reduce((s, p) => s + p.people.length, 0);
            return `
              <div class="pole-card animate-fade-in-up stagger-${i + 1}" data-list="${list.id}" id="list-${list.id}">
                <div class="pole-card-emoji">${LIST_EMOJIS[list.id] || '📌'}</div>
                <div class="pole-card-name">${list.name}</div>
                <div class="pole-card-count">${list.poles.length} pôles · ${totalPeople} personnes</div>
              </div>
            `;
          }).join('')}

          <!-- Toutes les listes -->
          <div class="pole-card animate-fade-in-up stagger-${lists.length + 1}" data-list="ALL" id="list-ALL">
            <div class="pole-card-emoji">🌟</div>
            <div class="pole-card-name">Toutes les listes</div>
            <div class="pole-card-count">${allPeople.length} personnes</div>
          </div>
        </div>
      </div>
    </div>
  `;

  attachNavBack(() => navigate('menu'));

  lists.forEach((list) => {
    document.getElementById(`list-${list.id}`).addEventListener('click', () => {
      currentList = list.id;
      renderPoleSelector(container, data);
    });
  });

  document.getElementById('list-ALL').addEventListener('click', () => {
    currentList = 'ALL';
    currentPole = 'ALL';
    currentTab = 'fiches';
    renderPoleView(container, data);
  });
}

// ─────────────────── ÉTAPE 2 : Choisir le pôle ───────────────────
function renderPoleSelector(container, data) {
  const list = data?.lists?.find(l => l.id === currentList);
  const poles = list?.poles || [];
  const listPeople = getPeopleByList(data, currentList);

  container.innerHTML = `
    ${renderNavBar(`${list?.name || currentList}`, '', () => {
      currentList = null;
      renderListSelector(container, data);
    })}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content page-wide">
        <div class="header animate-fade-in-up">
          <span class="header-emoji">${LIST_EMOJIS[currentList] || '📋'}</span>
          <h1 class="heading-1">Pôles de ${list?.name || currentList}</h1>
          <p class="text-secondary">Sélectionne un pôle</p>
        </div>

        <div class="pole-grid">
          ${poles.map((pole, i) => `
            <div class="pole-card animate-fade-in-up stagger-${(i % 8) + 1}" data-pole="${pole.id}" id="pole-${pole.id}">
              <div class="pole-card-emoji">${POLE_EMOJIS[pole.name] || '📌'}</div>
              <div class="pole-card-name">${pole.name}</div>
              <div class="pole-card-count">${pole.people.length} personnes</div>
            </div>
          `).join('')}

          <!-- Tous les pôles de cette liste -->
          <div class="pole-card animate-fade-in-up stagger-${(poles.length % 8) + 1}" data-pole="LIST_ALL" id="pole-LIST_ALL">
            <div class="pole-card-emoji">🌟</div>
            <div class="pole-card-name">Toute la liste</div>
            <div class="pole-card-count">${listPeople.length} personnes</div>
          </div>
        </div>
      </div>
    </div>
  `;

  attachNavBack(() => {
    currentList = null;
    renderListSelector(container, data);
  });

  poles.forEach((pole) => {
    document.getElementById(`pole-${pole.id}`).addEventListener('click', () => {
      currentPole = pole.id;
      currentTab = 'fiches';
      renderPoleView(container, data);
    });
  });

  document.getElementById('pole-LIST_ALL').addEventListener('click', () => {
    currentPole = 'LIST_ALL';
    currentTab = 'fiches';
    renderPoleView(container, data);
  });
}

// ─────────────────── ÉTAPE 3 : Vue pôle (Fiches / Quiz) ───────────────────
function renderPoleView(container, data) {
  let people;
  let poleName;

  if (currentPole === 'ALL') {
    people = allPeople;
    poleName = 'Toutes les listes';
  } else if (currentPole === 'LIST_ALL') {
    people = getPeopleByList(data, currentList);
    const list = data?.lists?.find(l => l.id === currentList);
    poleName = list?.name || currentList;
  } else {
    people = getPeopleByPole(data, currentPole);
    const allPolesList = getAllPoles(data);
    const pole = allPolesList.find(p => p.id === currentPole);
    poleName = pole?.name || currentPole;
  }

  if (currentTab === 'quiz') {
    renderQuiz(container, data, people, poleName);
    return;
  }

  const goBack = () => {
    currentPole = null;
    if (currentList === 'ALL' || currentPole === 'ALL') {
      currentList = null;
      renderListSelector(container, data);
    } else {
      renderPoleSelector(container, data);
    }
  };

  container.innerHTML = `
    ${renderNavBar(poleName, '', goBack)}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content page-wide">
        <!-- Tabs -->
        <div class="tabs animate-fade-in">
          <button class="tab ${currentTab === 'fiches' ? 'active' : ''}" id="tab-fiches">
            📖 Fiches
          </button>
          <button class="tab ${currentTab === 'quiz' ? 'active' : ''}" id="tab-quiz">
            🎮 Quiz
          </button>
        </div>

        <!-- People Grid -->
        <div class="person-grid">
          ${people.map((person, i) => `
            <div class="person-card animate-fade-in-up stagger-${(i % 8) + 1}">
              ${renderPhoto(person, 'photo-frame-sm')}
              <div class="person-name">${person.firstName} ${person.lastName}</div>
              <div class="person-role">${person.roleDisplay || person.role}</div>
              ${person.poleName ? `<div style="margin-top: 4px;"><span class="badge badge-accent">${person.poleName}</span></div>` : ''}
            </div>
          `).join('')}
        </div>

        ${people.length === 0 ? `
          <div class="text-center" style="padding: var(--space-3xl);">
            <span class="emoji-icon">🤷</span>
            <p class="text-secondary">Aucune personne dans ce pôle</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  attachNavBack(goBack);

  document.getElementById('tab-fiches').addEventListener('click', () => {
    currentTab = 'fiches';
    renderPoleView(container, data);
  });

  document.getElementById('tab-quiz').addEventListener('click', () => {
    currentTab = 'quiz';
    renderPoleView(container, data);
  });
}

// ─────────────────── QUIZ ───────────────────
function renderQuiz(container, data, people, poleName) {
  if (people.length === 0) {
    container.innerHTML = `
      ${renderNavBar(poleName, '', () => {
        currentTab = 'fiches';
        renderPoleView(container, data);
      })}
      <div class="page">
        <div class="page-content text-center">
          <span class="emoji-icon">⚠️</span>
          <h2 class="heading-2">Pas de personnes</h2>
          <p class="text-secondary" style="margin: var(--space-md) 0;">
            Il n'y a personne dans ce pôle pour faire un quiz.
          </p>
          <button class="btn btn-secondary" id="btn-back-fiches">← Fiches</button>
        </div>
      </div>
    `;
    attachNavBack(() => {
      currentTab = 'fiches';
      renderPoleView(container, data);
    });
    document.getElementById('btn-back-fiches').addEventListener('click', () => {
      currentTab = 'fiches';
      renderPoleView(container, data);
    });
    return;
  }

  session = createGameSession(people, Math.min(10, people.length));
  renderQuizQuestion(container, data, people, poleName);
}

function renderQuizQuestion(container, data, people, poleName) {
  if (session.finished) {
    renderQuizSummary(container, data, people, poleName);
    return;
  }

  const current = session.questions[session.currentIndex];
  const optionPool = people.length >= 4 ? people : allPeople;
  const options = generateOptions(current, optionPool);
  const progress = ((session.currentIndex) / session.questions.length) * 100;

  container.innerHTML = `
    ${renderNavBar(`Quiz ${poleName}`, session.score, () => {
      currentTab = 'fiches';
      renderPoleView(container, data);
    })}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content">
        <div class="tabs animate-fade-in">
          <button class="tab" id="tab-fiches">📖 Fiches</button>
          <button class="tab active" id="tab-quiz">🎮 Quiz</button>
        </div>

        <div class="game-counter">
          Question ${session.currentIndex + 1} / ${session.questions.length}
          ${session.streak >= 3 ? `<span class="badge badge-accent" style="margin-left: var(--space-sm);">🔥 ${session.streak}</span>` : ''}
        </div>
        <div class="progress-bar" style="margin-bottom: var(--space-xl);">
          <div class="progress-fill" style="width: ${progress}%;"></div>
        </div>

        <div class="game-photo-container animate-scale-in">
          ${renderPhoto(current)}
        </div>

        <p class="text-center text-secondary" style="margin-bottom: var(--space-lg);">
          Qui est cette personne ?
        </p>

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

  attachNavBack(() => {
    currentTab = 'fiches';
    renderPoleView(container, data);
  });

  document.getElementById('tab-fiches').addEventListener('click', () => {
    currentTab = 'fiches';
    renderPoleView(container, data);
  });

  options.forEach((opt, i) => {
    document.getElementById(`option-${i}`).addEventListener('click', () => {
      const currentId = current.id || current.photo;
      const optId = opt.id || opt.photo;
      const isCorrect = optId === currentId;
      const { points } = recordAnswer(session, isCorrect);

      document.querySelectorAll('.option-card').forEach((card) => {
        card.classList.add('disabled');
        if (card.dataset.id === currentId) card.classList.add('correct');
      });

      if (!isCorrect) {
        document.getElementById(`option-${i}`).classList.add('wrong');
        showToast('❌ Raté !', 'error');
      } else {
        showToast(`✅ +${points} points !`, 'success');
      }

      setTimeout(() => {
        nextQuestion(session);
        renderQuizQuestion(container, data, people, poleName);
      }, 1500);
    });
  });
}

async function renderQuizSummary(container, data, people, poleName) {
  const pseudo = getPseudo();
  await saveScore(pseudo, session.score, `review-${currentPole}`);

  container.innerHTML = renderGameSummary(session);

  document.getElementById('btn-replay').addEventListener('click', () => {
    session = createGameSession(people, Math.min(10, people.length));
    renderQuizQuestion(container, data, people, poleName);
  });

  document.getElementById('btn-back-menu').addEventListener('click', () => {
    currentList = null;
    currentPole = null;
    navigate('menu');
  });
}
