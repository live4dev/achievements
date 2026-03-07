/**
 * app.js — mobile SPA, two screens:
 *   #/            → groups list
 *   #/group/{id}  → achievements in group
 */

// ── Telegram WebApp ───────────────────────────────────────────
const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();

// ── Constants ─────────────────────────────────────────────────
const RARITY_ORDER = { LEGENDARY: 0, EPIC: 1, RARE: 2, UNCOMMON: 3, COMMON: 4 };
const RARITY_LABEL = {
  COMMON: 'Обычная', UNCOMMON: 'Необычная', RARE: 'Редкая',
  EPIC: 'Эпическая', LEGENDARY: 'Легендарная',
};

// ── Helpers ───────────────────────────────────────────────────
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function plural(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

function memberWord(n) {
  return `${n} ${plural(n, 'участник', 'участника', 'участников')}`;
}

function render(html) {
  document.getElementById('app').innerHTML = html;
}

function spinner() {
  render('<div class="spinner-wrap"><div class="spinner"></div></div>');
}

function showError(msg, onRetry) {
  render(`
    <div class="error-wrap">
      <div class="empty__icon">⚠️</div>
      <p>${esc(msg)}</p>
      <button class="btn-retry" id="btn-retry">Повторить</button>
    </div>
  `);
  document.getElementById('btn-retry').onclick = onRetry;
}

// ── Router ────────────────────────────────────────────────────
function route() {
  const hash = location.hash || '#/';
  const m = hash.match(/^#\/group\/([^/]+)$/);
  if (m) {
    showGroup(m[1]);
  } else {
    showGroups();
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);

// ── Screen 1: Groups ──────────────────────────────────────────
async function showGroups() {
  tg?.BackButton.hide();

  spinner();

  let groups;
  try {
    groups = await fetchGroups();
  } catch (e) {
    showError(e.message, showGroups);
    return;
  }

  if (!groups.length) {
    render(`
      <div class="screen-header">
        <h1>🏆 Family Achievements</h1>
      </div>
      <div class="empty">
        <div class="empty__icon">🏠</div>
        <p>Групп пока нет</p>
      </div>
    `);
    return;
  }

  const cards = groups.map(g => `
    <a class="group-card" href="#/group/${esc(g.id)}">
      <div class="group-card__info">
        <div class="group-card__title">🏠 ${esc(g.title)}</div>
        <div class="group-card__meta">${memberWord(g.member_count)}</div>
      </div>
      <div class="group-card__arrow">›</div>
    </a>
  `).join('');

  render(`
    <div class="screen-header">
      <h1>🏆 Family Achievements</h1>
      <div class="subtitle">Выбери группу</div>
    </div>
    <div class="list">${cards}</div>
  `);
}

// ── Chain detection ───────────────────────────────────────────
function findChains(achList, edges) {
  const codes = new Set(achList.map(a => a.code));
  const achByCode = Object.fromEntries(achList.map(a => [a.code, a]));

  // Keep only edges within this category
  const catEdges = edges.filter(e => codes.has(e.from_code) && codes.has(e.to_code));

  // Undirected adjacency for connected components
  const adj = {};
  achList.forEach(a => { adj[a.code] = []; });
  catEdges.forEach(e => {
    adj[e.from_code].push(e.to_code);
    adj[e.to_code].push(e.from_code);
  });

  // BFS connected components
  const visited = new Set();
  const chains = [];
  achList.forEach(a => {
    if (visited.has(a.code)) return;
    const component = [];
    const queue = [a.code];
    while (queue.length) {
      const code = queue.shift();
      if (visited.has(code)) continue;
      visited.add(code);
      component.push(achByCode[code]);
      adj[code].forEach(nb => { if (!visited.has(nb)) queue.push(nb); });
    }
    chains.push(component);
  });

  // Topological sort within each multi-node chain
  const dirAdj = {};
  const indegree = {};
  achList.forEach(a => { dirAdj[a.code] = []; indegree[a.code] = 0; });
  catEdges.forEach(e => { dirAdj[e.from_code].push(e.to_code); indegree[e.to_code]++; });

  return chains.map(chain => {
    if (chain.length <= 1) return chain;
    const inDeg = Object.fromEntries(chain.map(a => [a.code, indegree[a.code]]));
    const queue = chain.filter(a => inDeg[a.code] === 0).map(a => a.code);
    const sorted = [];
    while (queue.length) {
      const code = queue.shift();
      sorted.push(achByCode[code]);
      dirAdj[code].forEach(nb => { if (--inDeg[nb] === 0) queue.push(nb); });
    }
    return sorted.length === chain.length ? sorted : chain;
  });
}

// ── Screen 2: Achievements ────────────────────────────────────
async function showGroup(groupId) {
  // Show BackButton in Telegram
  if (tg?.BackButton) {
    tg.BackButton.show();
    tg.BackButton.offClick();  // clear previous listeners
    tg.BackButton.onClick(() => { location.hash = '#/'; });
  }

  spinner();

  let data;
  try {
    data = await fetchAggregate(groupId);
  } catch (e) {
    showError(e.message, () => showGroup(groupId));
    return;
  }

  const { group, achievements, categories, edges, aggregate_state } = data;

  // Build category lookup: code → name
  const catName = {};
  (categories || []).forEach(c => { catName[c.code] = c.name; });

  // Group achievements by category, keeping API order for categories
  const catOrder = [];
  const byCategory = {};
  achievements.forEach(a => {
    const cat = a.category_code || '__none__';
    if (!byCategory[cat]) {
      byCategory[cat] = [];
      catOrder.push(cat);
    }
    byCategory[cat].push(a);
  });

  // Helper: render a single achievement card
  function achCardHtml(a) {
    const state = aggregate_state[a.code] || { achieved_by: [] };
    const icon = a.icon ? `<span class="ach-card__icon">${esc(a.icon)}</span>` : '';
    const pts = a.points ? `<span class="ach-card__points">${a.points}⭐</span>` : '';
    const repeatBadge = a.repeatable
      ? `<span class="badge">♻️ повт${a.max_level ? ` до ур.${a.max_level}` : ''}</span>`
      : '';
    const rarityLabel = RARITY_LABEL[a.rarity] || a.rarity;
    const achieversList = state.achieved_by.length
      ? `<div class="ach-card__achievers"><span class="achievers-label">Выполнили:</span> ${state.achieved_by.map(n => `<span class="achiever">${esc(n)}</span>`).join('')}</div>`
      : '';
    return `
      <div class="ach-card" data-id="${esc(a.code)}">
        <div class="ach-card__main">
          <div class="ach-card__strip strip-${esc(a.rarity)}"></div>
          <div class="ach-card__body">
            <div class="ach-card__title-row">
              ${icon}
              <span class="ach-card__title">${esc(a.title)}</span>
              <span class="ach-card__rarity-dot dot-${esc(a.rarity)}"></span>
            </div>
            <div class="ach-card__meta">
              ${pts}
              <span class="badge badge-${esc(a.rarity)}">${esc(rarityLabel)}</span>
              ${repeatBadge}
            </div>
          </div>
        </div>
        <div class="ach-card__detail">
          <p class="ach-card__desc">${esc(a.description)}</p>
          ${achieversList}
        </div>
      </div>
    `;
  }

  // Render
  let html = `
    <div class="screen-header">
      <h1>${esc(group.title)}</h1>
      <div class="subtitle">${achievements.length} достижений</div>
    </div>
    <div class="list">
  `;

  catOrder.forEach(cat => {
    const label = cat === '__none__' ? 'Без категории' : (catName[cat] || cat);
    html += `<div class="cat-header">🏆 ${esc(label)}</div>`;

    // Detect chains within this category
    const chains = findChains(byCategory[cat], edges || []);

    // Sort chains: multi-node chains first (by best rarity), then single achievements
    chains.sort((cA, cB) => {
      const isChainA = cA.length > 1 ? 0 : 1;
      const isChainB = cB.length > 1 ? 0 : 1;
      if (isChainA !== isChainB) return isChainA - isChainB;
      const bestRarity = ch => Math.min(...ch.map(a => RARITY_ORDER[a.rarity] ?? 99));
      const rd = bestRarity(cA) - bestRarity(cB);
      return rd !== 0 ? rd : (cA[0].sort_order - cB[0].sort_order);
    });

    chains.forEach(chain => {
      if (chain.length > 1) {
        html += `<div class="chain-group">`;
        html += `<div class="chain-header">⛓ Цепочка</div>`;
        chain.forEach(a => { html += achCardHtml(a); });
        html += `</div>`;
      } else {
        html += achCardHtml(chain[0]);
      }
    });
  });

  html += '</div>';
  render(html);

  // Accordion: tap card → toggle detail
  document.querySelectorAll('.ach-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('open'));
  });
}
