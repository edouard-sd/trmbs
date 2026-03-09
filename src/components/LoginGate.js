/**
 * ═══════════════════════════════════════════════════════════
 *  LoginGate — Password + Pseudo Entry
 * ═══════════════════════════════════════════════════════════
 */

import { navigate, setAuth } from '../main.js';

// Mot de passe global
const GLOBAL_PASSWORD = 'LucasBode67';

export function renderLoginGate(container) {
  container.innerHTML = `
    <div class="page" id="login-page">
      <div class="page-content">
        <!-- Step 1: Password -->
        <div id="step-password" class="animate-fade-in-up">
          <div class="header">
            <span class="header-emoji animate-float">🔒</span>
            <h1 class="heading-display">Trombinoscope</h1>
            <p class="header-subtitle">Entre le mot de passe pour accéder au jeu</p>
          </div>

          <div class="card">
            <form id="password-form">
              <div class="input-group" style="margin-bottom: var(--space-lg);">
                <label class="input-label" for="password-input">Mot de passe</label>
                <input
                  type="password"
                  id="password-input"
                  class="input"
                  placeholder="Tape le mot de passe..."
                  autocomplete="off"
                  autofocus
                />
              </div>
              <div id="password-error" class="error-msg" style="display: none; margin-bottom: var(--space-md);">
                ❌ Mot de passe incorrect
              </div>
              <button type="submit" class="btn btn-primary btn-full btn-lg" id="password-submit">
                Entrer →
              </button>
            </form>
          </div>
        </div>

        <!-- Step 2: Pseudo -->
        <div id="step-pseudo" style="display: none;">
          <div class="header">
            <span class="header-emoji animate-float">👋</span>
            <h1 class="heading-display">Bienvenue !</h1>
            <p class="header-subtitle">Choisis ton pseudo pour jouer</p>
          </div>

          <div class="card animate-scale-in">
            <form id="pseudo-form">
              <div class="input-group" style="margin-bottom: var(--space-lg);">
                <label class="input-label" for="pseudo-input">Ton pseudo</label>
                <input
                  type="text"
                  id="pseudo-input"
                  class="input"
                  placeholder="Ex: LucasB, MarieDupont..."
                  maxlength="20"
                  autocomplete="off"
                />
              </div>
              <div id="pseudo-error" class="error-msg" style="display: none; margin-bottom: var(--space-md);">
                ❌ Entre un pseudo (2 à 20 caractères)
              </div>
              <button type="submit" class="btn btn-primary btn-full btn-lg" id="pseudo-submit">
                🎮 C'est parti !
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // ── Event Listeners ──────────────────────────────────
  const passwordForm = document.getElementById('password-form');
  const passwordInput = document.getElementById('password-input');
  const passwordError = document.getElementById('password-error');
  const stepPassword = document.getElementById('step-password');
  const stepPseudo = document.getElementById('step-pseudo');

  const pseudoForm = document.getElementById('pseudo-form');
  const pseudoInput = document.getElementById('pseudo-input');
  const pseudoError = document.getElementById('pseudo-error');

  // Step 1 : Vérification du mot de passe
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = passwordInput.value.trim();

    if (value === GLOBAL_PASSWORD) {
      // Transition vers le pseudo
      stepPassword.style.opacity = '0';
      stepPassword.style.transform = 'translateX(-30px)';

      setTimeout(() => {
        stepPassword.style.display = 'none';
        stepPseudo.style.display = 'block';
        stepPseudo.classList.add('animate-fade-in-up');
        pseudoInput.focus();
      }, 300);
    } else {
      // Mauvais mot de passe
      passwordError.style.display = 'block';
      passwordInput.classList.add('input-error');
      passwordInput.parentElement.parentElement.classList.add('animate-shake');

      setTimeout(() => {
        passwordInput.parentElement.parentElement.classList.remove('animate-shake');
      }, 500);

      // Effacer l'erreur après 3 secondes
      setTimeout(() => {
        passwordError.style.display = 'none';
        passwordInput.classList.remove('input-error');
      }, 3000);
    }
  });

  // Step 2 : Saisie du pseudo
  pseudoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pseudo = pseudoInput.value.trim();

    if (pseudo.length >= 2 && pseudo.length <= 20) {
      setAuth(pseudo);
      navigate('menu');
    } else {
      pseudoError.style.display = 'block';
      pseudoInput.classList.add('input-error');

      setTimeout(() => {
        pseudoError.style.display = 'none';
        pseudoInput.classList.remove('input-error');
      }, 3000);
    }
  });

  // Transition smooth pour step-password
  stepPassword.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  // Focus auto sur le champ mot de passe
  setTimeout(() => passwordInput.focus(), 100);
}
