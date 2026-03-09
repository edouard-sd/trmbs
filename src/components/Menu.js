/**
 * ═══════════════════════════════════════════════════════════
 *  Menu — Main Navigation
 * ═══════════════════════════════════════════════════════════
 */

import { navigate, getPseudo, logout } from '../main.js';

export function renderMenu(container, data) {
  const pseudo = getPseudo();
  const totalPeople = data?.lists?.reduce((acc, l) => acc + l.poles.reduce((s, p) => s + p.people.length, 0), 0) || 0;
  const totalLists = data?.lists?.length || 0;

  container.innerHTML = `
    <div class="page">
      <div class="page-content" style="max-width: 600px;">
        <!-- Header -->
        <div class="header animate-fade-in-up">
          <span class="header-emoji">🎓</span>
          <h1 class="heading-display">Salut ${pseudo} !</h1>
          <p class="header-subtitle">
            ${totalPeople} personnes à apprendre dans ${totalLists} listes
          </p>
        </div>

        <!-- Game Modes -->
        <div class="menu-grid">
          <!-- Trouve le nom -->
          <div class="menu-card animate-fade-in-up stagger-1" id="btn-find-name">
            <span class="menu-card-icon">📸</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Trouve le nom</div>
              <div class="menu-card-desc">
                Une photo s'affiche, choisis le bon nom parmi 4 propositions
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>

          <!-- Trouve la tête -->
          <div class="menu-card animate-fade-in-up stagger-2" id="btn-find-face">
            <span class="menu-card-icon">🧑</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Trouve la tête</div>
              <div class="menu-card-desc">
                Un nom s'affiche, choisis la bonne photo parmi 4 propositions
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>

          <!-- Trouve les infos -->
          <div class="menu-card animate-fade-in-up stagger-3" id="btn-find-infos">
            <span class="menu-card-icon">🕵️</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Trouve les infos</div>
              <div class="menu-card-desc">
                Une vraie enquête ! Trouve le prénom, nom, pôle, BDE, et rôle d'un membre
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>

          <!-- Révision par pôle -->
          <div class="menu-card animate-fade-in-up stagger-3" id="btn-review-pole">
            <span class="menu-card-icon">📋</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Révision par pôle</div>
              <div class="menu-card-desc">
                Révise ou teste-toi sur les membres d'un pôle spécifique
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>

          <!-- Leaderboard -->
          <div class="menu-card animate-fade-in-up stagger-4" id="btn-leaderboard">
            <span class="menu-card-icon">🏆</span>
            <div class="menu-card-content">
              <div class="menu-card-title">Classement</div>
              <div class="menu-card-desc">
                Consulte le classement global de tous les joueurs
              </div>
            </div>
            <span class="menu-card-arrow">→</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer-links animate-fade-in stagger-5">
          <button class="btn btn-ghost" id="btn-logout">
            🚪 Déconnexion
          </button>
        </div>
      </div>
    </div>
  `;

  // ── Event Listeners ──────────────────────────────────
  document.getElementById('btn-find-name').addEventListener('click', () => {
    navigate('find-name');
  });

  document.getElementById('btn-find-face').addEventListener('click', () => {
    navigate('find-face');
  });

  document.getElementById('btn-find-infos').addEventListener('click', () => {
    navigate('find-infos');
  });

  document.getElementById('btn-review-pole').addEventListener('click', () => {
    navigate('review-pole');
  });

  document.getElementById('btn-leaderboard').addEventListener('click', () => {
    navigate('leaderboard');
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    logout();
  });
}
