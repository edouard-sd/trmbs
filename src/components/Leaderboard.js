/**
 * ═══════════════════════════════════════════════════════════
 *  Leaderboard — Global Ranking
 * ═══════════════════════════════════════════════════════════
 */

import { navigate, getPseudo } from '../main.js';
import { getLeaderboard, onLeaderboardUpdate, isFirebaseReady } from '../firebase.js';
import { renderNavBar, attachNavBack } from './GameEngine.js';

let unsubscribe = null;

export async function renderLeaderboard(container) {
  const pseudo = getPseudo();

  container.innerHTML = `
    ${renderNavBar('Classement', '', () => navigate('menu'))}

    <div class="page" style="padding-top: var(--space-lg);">
      <div class="page-content" style="max-width: 600px;">
        <div class="header animate-fade-in-up">
          <span class="header-emoji">🏆</span>
          <h1 class="heading-1">Classement</h1>
          <p class="text-secondary">
            ${isFirebaseReady()
              ? 'Classement en temps réel'
              : '⚠️ Mode hors-ligne (localStorage)'}
          </p>
        </div>

        <div id="leaderboard-list">
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  `;

  attachNavBack(() => {
    // Arrêter l'écoute temps réel
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    navigate('menu');
  });

  // Charger et écouter les données
  if (isFirebaseReady()) {
    unsubscribe = onLeaderboardUpdate((players) => {
      renderList(players, pseudo);
    });
  } else {
    const players = await getLeaderboard();
    renderList(players, pseudo);
  }
}

function renderList(players, currentPseudo) {
  const listContainer = document.getElementById('leaderboard-list');
  if (!listContainer) return;

  if (players.length === 0) {
    listContainer.innerHTML = `
      <div class="card text-center animate-fade-in" style="padding: var(--space-3xl);">
        <span class="emoji-icon">🏜️</span>
        <h3 class="heading-3" style="margin-bottom: var(--space-sm);">Aucun score</h3>
        <p class="text-secondary">Sois le premier à jouer pour apparaître ici !</p>
        <button class="btn btn-primary" style="margin-top: var(--space-lg);" id="btn-play-now">
          🎮 Jouer maintenant
        </button>
      </div>
    `;
    document.getElementById('btn-play-now')?.addEventListener('click', () => navigate('menu'));
    return;
  }

  // Top 3 podium
  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  listContainer.innerHTML = `
    <!-- Podium Top 3 -->
    ${top3.length > 0 ? `
      <div class="animate-fade-in-up" style="
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: var(--space-md);
        margin-bottom: var(--space-2xl);
        padding: var(--space-lg) 0;
      ">
        ${top3.length >= 2 ? renderPodiumItem(top3[1], 2, currentPseudo, '90px') : ''}
        ${renderPodiumItem(top3[0], 1, currentPseudo, '120px')}
        ${top3.length >= 3 ? renderPodiumItem(top3[2], 3, currentPseudo, '70px') : ''}
      </div>
    ` : ''}

    <!-- Rest of the list -->
    <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
      ${rest.map((player, i) => `
        <div class="leaderboard-item animate-fade-in-up stagger-${(i % 8) + 1} ${player.pseudo === currentPseudo ? 'current-user' : ''}">
          <span class="leaderboard-rank">${i + 4}</span>
          <span class="leaderboard-name">
            ${player.pseudo === currentPseudo ? '👉 ' : ''}${player.pseudo}
          </span>
          <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
            ${player.gamesPlayed || 0} parties
          </span>
          <span class="leaderboard-score">${player.score}</span>
        </div>
      `).join('')}
    </div>

    <!-- Current user not in list? -->
    ${!players.find(p => p.pseudo === currentPseudo) ? `
      <div class="divider"></div>
      <div class="card text-center" style="margin-top: var(--space-lg);">
        <p class="text-secondary">Tu n'es pas encore classé·e !</p>
        <button class="btn btn-primary" style="margin-top: var(--space-md);" id="btn-play-to-rank">
          🎮 Jouer pour apparaître
        </button>
      </div>
    ` : ''}
  `;

  document.getElementById('btn-play-to-rank')?.addEventListener('click', () => navigate('menu'));
}

function renderPodiumItem(player, rank, currentPseudo, height) {
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  const isCurrentUser = player.pseudo === currentPseudo;

  return `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      ${rank === 1 ? 'order: 0;' : rank === 2 ? 'order: -1;' : 'order: 1;'}
    ">
      <div style="font-size: 2rem;">${medals[rank]}</div>
      <div style="
        width: 80px;
        height: ${height};
        background: ${rank === 1
          ? 'linear-gradient(180deg, #FFD700 0%, rgba(255,215,0,0.2) 100%)'
          : rank === 2
            ? 'linear-gradient(180deg, #C0C0C0 0%, rgba(192,192,192,0.2) 100%)'
            : 'linear-gradient(180deg, #CD7F32 0%, rgba(205,127,50,0.2) 100%)'
        };
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: var(--space-md);
        border: 1px solid ${rank === 1 ? 'rgba(255,215,0,0.3)' : rank === 2 ? 'rgba(192,192,192,0.3)' : 'rgba(205,127,50,0.3)'};
        ${isCurrentUser ? 'box-shadow: 0 0 15px var(--color-accent-glow);' : ''}
      ">
        <div style="font-weight: 700; font-size: var(--font-size-lg);">${player.score}</div>
      </div>
      <div style="
        font-weight: 600;
        font-size: var(--font-size-sm);
        max-width: 90px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        ${isCurrentUser ? 'color: var(--color-accent-secondary);' : ''}
      ">
        ${isCurrentUser ? '👉 ' : ''}${player.pseudo}
      </div>
      <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
        ${player.gamesPlayed || 0} parties
      </div>
    </div>
  `;
}
