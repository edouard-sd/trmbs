/**
 * ═══════════════════════════════════════════════════════════
 *  FindInfos - Game Mode (Trouve toutes les infos)
 * ═══════════════════════════════════════════════════════════
 */

import { getAllPeople, createGameSession, renderGameSummary, renderPhoto, renderNavBar, attachNavBack, shuffle } from './GameEngine.js';
import { navigate, getPseudo } from '../main.js';
import { saveScore } from '../firebase.js';

const INFO_STEPS = [
  { key: 'firstName', label: 'Prénom ?' },
  { key: 'lastName', label: 'Nom de famille ?' },
  { key: 'list', label: 'Liste BDE ?' },
  { key: 'poleName', label: 'Dans quel Pôle ?' },
  { key: 'role', label: 'Rôle principal ?' },
  { key: 'roleTransverse', label: 'Rôle transverse ?' }
];

let allUniqueLists = [];
let allUniquePoles = [];
let allUniqueRoles = [];
let allUniqueRoleTransverses = [];

function initializeExtracts(allPeople) {
  allUniqueLists = [...new Set(allPeople.map(p => p.list))].filter(Boolean);
  allUniquePoles = [...new Set(allPeople.map(p => p.poleName || p.pole))].filter(Boolean);
  allUniqueRoles = [...new Set(allPeople.map(p => p.role))].filter(Boolean);
  allUniqueRoleTransverses = [...new Set(allPeople.map(p => p.roleTransverse))].filter(Boolean);
  
  if (!allUniqueRoleTransverses.includes('Aucun (❌)')) {
    allUniqueRoleTransverses.push('Aucun (❌)');
  }
}

function getOptionsForStep(stepIndex, currentPerson, allPeople) {
  const step = INFO_STEPS[stepIndex];
  
  let currentVal = currentPerson[step.key];
  if (step.key === 'poleName') {
    currentVal = currentPerson.poleName || currentPerson.pole;
  }
  if (step.key === 'roleTransverse' && !currentVal) {
    currentVal = 'Aucun (❌)';
  }

  let pool = [];
  if (step.key === 'firstName') pool = [...new Set(allPeople.map(p => p.firstName))];
  else if (step.key === 'lastName') pool = [...new Set(allPeople.map(p => p.lastName))];
  else if (step.key === 'list') pool = allUniqueLists;
  else if (step.key === 'poleName') pool = allUniquePoles;
  else if (step.key === 'role') pool = allUniqueRoles;
  else if (step.key === 'roleTransverse') pool = allUniqueRoleTransverses;

  // Ensure current value is safe string
  const safeCurrentVal = String(currentVal || '');

  // Filter out current value to get pure distractors
  pool = pool.filter(val => String(val || '') !== safeCurrentVal && val);
  
  // Pick random distractors
  const shuffledPool = shuffle(pool);
  let distractors = shuffledPool.slice(0, 3);
  
  // If not enough unique distractors, repeat some (should be rare with enough data)
  while (distractors.length < 3 && pool.length > 0) {
    distractors.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  
  // Combine correct and distractors
  const combined = [safeCurrentVal, ...distractors];
  
  // Shuffle multiple times or ensure shuffle is definitely returning the new array
  const finalOptions = shuffle(combined);
  
  return { options: finalOptions, correctAnswer: safeCurrentVal };
}

let internalStep = 0;
let personMistakes = 0;
let session = null;

export function renderFindInfos(container, data) {
  const allPeople = getAllPeople(data);
  initializeExtracts(allPeople);
  
  if (allPeople.length < 4) {
    container.innerHTML = `
      ${renderNavBar('Trouve les infos', '', () => {
        navigate('menu');
      })}
      <div class="page"><div class="text-center" style="padding-top: 100px;">Pas assez de données pour jouer.</div></div>
    `;
    return;
  }

  // Session: 10 people max
  session = createGameSession(allPeople, Math.min(10, allPeople.length));
  
  internalStep = 0;
  personMistakes = 0;

  renderFindInfosQuestion(container, data, allPeople, () => navigate('menu'));
}

function renderFindInfosQuestion(container, data, allPeople, goBackMenu) {
  
  if (!session || session.currentIndex >= session.questions.length) {
    // Game over: show summary
    // Save score
    saveScore(getPseudo(), session.score, 'find-infos');

    container.innerHTML = renderGameSummary(session, null, goBackMenu);
    
    // Attach replay and menu buttons
    document.getElementById('btn-replay').addEventListener('click', () => {
      renderFindInfos(container, data);
    });
    document.getElementById('btn-back-menu').addEventListener('click', goBackMenu);
    return;
  }

  const currentPerson = session.questions[session.currentIndex];

  if (internalStep === 0 && !session.startTimerObj) {
    personMistakes = 0;
    session.startTime = Date.now();
    session.startTimerObj = true; // Just a flag to denote start of current person
  }

  const step = INFO_STEPS[internalStep];
  const { options, correctAnswer } = getOptionsForStep(internalStep, currentPerson, allPeople);

  container.innerHTML = `
    ${renderNavBar(`Personne ${session.currentIndex + 1} / ${session.totalQuestions}`, '', goBackMenu, session.score)}

    <div class="page">
      <div class="page-content page-narrow text-center">
        <!-- Progress bar for steps -->
        <div class="step-dots" style="margin-bottom: var(--space-lg); display: flex; justify-content: center; gap: 8px;">
           ${INFO_STEPS.map((_, i) => `
             <div style="width: 12px; height: 12px; border-radius: 50%; opacity: ${i < internalStep ? '1' : i === internalStep ? '1' : '0.3'}; background: ${i < internalStep ? 'var(--color-success)' : i === internalStep ? 'var(--color-primary)' : 'var(--text-color)'};"></div>
           `).join('')}
        </div>

        <div class="animate-fade-in">
          ${renderPhoto(currentPerson, 'photo-frame-lg')}
        </div>

        <div class="step-container" style="min-height: 250px;">
          <h2 class="heading-2 animate-fade-in-up stagger-1" style="margin: var(--space-xl) 0 var(--space-lg) 0;">
            ${step.label}
          </h2>

          <div class="options-grid options-text animate-fade-in-up stagger-2">
            ${options.map((opt, i) => `
              <button class="option-card option-text" data-val="${opt}" id="option-${i}">
                <div class="option-text-name">${opt}</div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  attachNavBack(goBackMenu);

  // Attach button events
  options.forEach((opt, i) => {
    const btn = document.getElementById(`option-${i}`);
    
    // We pass `opt` dynamically so capture it in the closure
    btn.addEventListener('click', () => {
      // Disable all buttons
      const buttons = container.querySelectorAll('.option-card');
      buttons.forEach(b => {
        b.style.pointerEvents = 'none';
        if (b.dataset.val === correctAnswer) {
          b.classList.add('correct');
        } else if (b === btn) {
          b.classList.add('wrong');
        } else {
          b.style.opacity = '0.5';
        }
      });

      if (opt !== correctAnswer) {
        personMistakes++;
      }

      // Proceed after delay
      setTimeout(() => {
        internalStep++;
        
        if (internalStep >= INFO_STEPS.length) {
          // Finished all steps for this person
          if (personMistakes === 0) {
            session.score += session.scoreMultiplier || 100; 
            session.correct = (session.correct || 0) + 1;
            session.streak = (session.streak || 0) + 1;
            session.bestStreak = Math.max(session.bestStreak || 0, session.streak);
          } else {
            session.wrong = (session.wrong || 0) + 1;
            session.streak = 0;
          }
          
          session.answers = session.answers || [];
          session.answers.push({
            correctPerson: currentPerson,
            isCorrect: personMistakes === 0,
            timeTaken: Date.now() - session.startTime
          });

          session.currentIndex++;
          internalStep = 0;
          session.startTimerObj = false; 
        }
        
        renderFindInfosQuestion(container, data, allPeople, goBackMenu);
      }, 1000);
    });
  });
}
