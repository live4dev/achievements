/**
 * app.js — mobile SPA:
 *   #/                           → groups list
 *   #/group/{id}                 → achievements in group (aggregate)
 *   #/group/{id}/me              → personal achievements + claim submission
 *   #/admin                      → admin home
 *   #/admin/categories           → category list
 *   #/admin/categories/new       → create category
 *   #/admin/categories/:code     → edit category
 *   #/admin/achievements         → achievement list
 *   #/admin/achievements/new     → create achievement
 *   #/admin/achievements/:code   → edit achievement + prereqs
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
const RARITIES = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'];

// ── Auth state ────────────────────────────────────────────────
let _isAdmin = false;

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
async function route() {
  try {
    await ensureAuth();
    _isAdmin = isAdminUser();
  } catch (_) { _isAdmin = false; }

  const hash = location.hash || '#/';

  let m;
  if ((m = hash.match(/^#\/group\/([^/]+)\/me$/))) return showMyPage(m[1]);
  if ((m = hash.match(/^#\/group\/([^/]+)$/))) return showGroup(m[1]);
  if (hash === '#/admin') return showAdminHome();
  if (hash === '#/admin/categories') return showAdminCategories();
  if (hash === '#/admin/categories/new') return showAdminCategoryForm(null);
  if ((m = hash.match(/^#\/admin\/categories\/([^/]+)$/))) return showAdminCategoryForm(m[1]);
  if (hash === '#/admin/achievements') return showAdminAchievements();
  if (hash === '#/admin/achievements/new') return showAdminAchievementForm(null);
  if ((m = hash.match(/^#\/admin\/achievements\/([^/]+)$/))) return showAdminAchievementForm(m[1]);
  showGroups();
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

  const adminBtn = _isAdmin
    ? `<a class="admin-link" href="#/admin">⚙️</a>`
    : '';

  render(`
    <div class="screen-header">
      <div class="screen-header__row">
        <h1>🏆 Family Achievements</h1>
        ${adminBtn}
      </div>
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

  // Build category lookup: code → name / icon
  const catName = {};
  const catIcon = {};
  (categories || []).forEach(c => { catName[c.code] = c.name; catIcon[c.code] = c.icon; });

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
      <div class="screen-header__row">
        <h1>${esc(group.title)}</h1>
        <a class="btn-sm btn-primary" href="#/group/${esc(groupId)}/me">Мои ачивки</a>
      </div>
      <div class="subtitle">${achievements.length} достижений</div>
    </div>
    <div class="list">
  `;

  catOrder.forEach(cat => {
    const label = cat === '__none__' ? 'Без категории' : (catName[cat] || cat);
    const icon = cat !== '__none__' && catIcon[cat] ? catIcon[cat] : '🏆';
    html += `<div class="cat-header">${icon} ${esc(label)}</div>`;

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

// ── Screen 3: Personal achievements page ─────────────────────
async function showMyPage(groupId) {
  if (tg?.BackButton) {
    tg.BackButton.show();
    tg.BackButton.offClick();
    tg.BackButton.onClick(() => { location.hash = `#/group/${groupId}`; });
  }

  spinner();

  let treeData, claimsData;
  try {
    [treeData, claimsData] = await Promise.all([
      fetchMyTree(groupId),
      fetchMyClaims(groupId),
    ]);
  } catch (e) {
    showError(e.message, () => showMyPage(groupId));
    return;
  }

  const { group, achievements, categories, edges, user_state } = treeData;

  // Build category lookup from categories array
  const catName = {};
  const catIcon = {};
  (categories || []).forEach(c => { catName[c.code] = c.name; catIcon[c.code] = c.icon; });

  // Group achievements by category
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

  // Pending claims map: achievement_code → claim_id
  const pendingClaims = {};
  claimsData.filter(c => c.status === 'SUBMITTED').forEach(c => {
    pendingClaims[c.achievement_code] = c.id;
  });

  function achMyCardHtml(a) {
    const state = user_state[a.code] || { status: 'LOCKED', level: 0 };
    const icon = a.icon ? `<span class="ach-card__icon">${esc(a.icon)}</span>` : '';
    const pts = a.points ? `<span class="ach-card__points">${a.points}⭐</span>` : '';
    const rarityLabel = RARITY_LABEL[a.rarity] || a.rarity;
    let statusBadge = '';
    let actionBtn = '';
    const onCooldown = state.cooldown_until && new Date(state.cooldown_until) > new Date();
    if (state.status === 'ACHIEVED' && !onCooldown) {
      statusBadge = `<span class="status-badge status-achieved">✓ Получена${state.level > 1 ? ' ур.' + state.level : ''}</span>`;
    } else if (onCooldown) {
      const until = new Date(state.cooldown_until);
      const hhmm = until.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const ddmm = until.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
      statusBadge = `<span class="status-badge status-achieved">✓ ур.${state.level}</span>`;
      actionBtn = `<span class="status-badge status-cooldown">⏳ до ${ddmm} ${hhmm}</span>`;
    } else if (state.status === 'AVAILABLE') {
      if (pendingClaims[a.code]) {
        actionBtn = `<button class="btn-sm btn-secondary btn-cancel-claim" data-claim="${esc(pendingClaims[a.code])}" data-code="${esc(a.code)}">⏳ Отменить заявку</button>`;
      } else {
        actionBtn = `<button class="btn-sm btn-primary btn-claim" data-code="${esc(a.code)}" data-title="${esc(a.title)}">Заявиться</button>`;
      }
    } else {
      statusBadge = `<span class="status-badge status-locked">🔒 Заблокирована</span>`;
    }
    return `
      <div class="ach-card ach-card--my status-${esc(state.status.toLowerCase())}" data-id="${esc(a.code)}">
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
              ${statusBadge}
            </div>
            ${actionBtn ? `<div class="ach-card__actions">${actionBtn}</div>` : ''}
          </div>
        </div>
        <div class="ach-card__detail">
          <p class="ach-card__desc">${esc(a.description)}</p>
          <div class="claim-form" id="claim-form-${esc(a.code)}" hidden>
            <textarea class="form-textarea claim-evidence" placeholder="Опишите подтверждение (необязательно)"></textarea>
            <div class="claim-form__actions">
              <button class="btn-sm btn-primary btn-submit-claim" data-code="${esc(a.code)}">Подать заявку</button>
              <button class="btn-sm btn-secondary btn-cancel-form" data-code="${esc(a.code)}">Отмена</button>
            </div>
            <div class="claim-form__error" id="claim-err-${esc(a.code)}" hidden></div>
          </div>
        </div>
      </div>
    `;
  }

  // Render pending claims section
  const pendingList = claimsData.filter(c => c.status === 'SUBMITTED');
  let pendingSection = '';
  if (pendingList.length) {
    const rows = pendingList.map(c => `
      <div class="claim-item" id="claim-item-${esc(c.id)}">
        <div class="claim-item__info">
          <div class="claim-item__title">${esc(c.achievement_title)}</div>
          <div class="claim-item__meta">⏳ Ожидает рассмотрения</div>
        </div>
        <button class="btn-sm btn-secondary btn-cancel-claim-row" data-claim="${esc(c.id)}" data-code="${esc(c.achievement_code)}">Отменить</button>
      </div>
    `).join('');
    pendingSection = `
      <div class="claims-section">
        <div class="claims-section__title">📋 Мои заявки</div>
        ${rows}
      </div>
    `;
  }

  let html = `
    <div class="screen-header">
      <h1>🏅 Мои ачивки</h1>
      <div class="subtitle">${esc(group.title)}</div>
    </div>
    ${pendingSection}
    <div class="list">
  `;

  catOrder.forEach(cat => {
    const label = catName[cat] || (cat === '__none__' ? 'Без категории' : cat);
    const icon = catIcon[cat] ? catIcon[cat] : '🏆';
    html += `<div class="cat-header">${icon} ${esc(label)}</div>`;
    const chains = findChains(byCategory[cat], edges || []);
    chains.sort((cA, cB) => {
      const isChainA = cA.length > 1 ? 0 : 1;
      const isChainB = cB.length > 1 ? 0 : 1;
      if (isChainA !== isChainB) return isChainA - isChainB;
      const bestRarity = ch => Math.min(...ch.map(a => RARITY_ORDER[a.rarity] ?? 99));
      return bestRarity(cA) - bestRarity(cB);
    });
    chains.forEach(chain => {
      if (chain.length > 1) {
        html += `<div class="chain-group">`;
        html += `<div class="chain-header">⛓ Цепочка</div>`;
        chain.forEach(a => { html += achMyCardHtml(a); });
        html += `</div>`;
      } else {
        html += achMyCardHtml(chain[0]);
      }
    });
  });

  html += '</div>';
  render(html);

  // Accordion: tap card → toggle detail
  document.querySelectorAll('.ach-card--my').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('button') || e.target.closest('textarea')) return;
      card.classList.toggle('open');
    });
  });

  // "Заявиться" → show inline form
  document.querySelectorAll('.btn-claim').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const code = btn.dataset.code;
      const card = btn.closest('.ach-card--my');
      card.classList.add('open');
      document.getElementById(`claim-form-${code}`).hidden = false;
      btn.closest('.ach-card__actions').style.display = 'none';
    });
  });

  // "Отмена" form button
  document.querySelectorAll('.btn-cancel-form').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const code = btn.dataset.code;
      document.getElementById(`claim-form-${code}`).hidden = true;
      const card = btn.closest('.ach-card--my');
      card.querySelector('.ach-card__actions').style.display = '';
    });
  });

  // "Подать заявку"
  document.querySelectorAll('.btn-submit-claim').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const code = btn.dataset.code;
      const form = document.getElementById(`claim-form-${code}`);
      const errEl = document.getElementById(`claim-err-${code}`);
      const evidenceText = form.querySelector('.claim-evidence').value.trim() || null;
      btn.disabled = true;
      errEl.hidden = true;
      try {
        await submitClaim(groupId, code, evidenceText);
        showMyPage(groupId);  // reload
      } catch (err) {
        errEl.textContent = err.message;
        errEl.hidden = false;
        btn.disabled = false;
      }
    });
  });

  // Cancel claim buttons (in card actions)
  document.querySelectorAll('.btn-cancel-claim').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      try {
        await cancelClaim(groupId, btn.dataset.claim);
        showMyPage(groupId);  // reload
      } catch (err) {
        alert(err.message);
      }
    });
  });

  // Cancel claim buttons (in pending section)
  document.querySelectorAll('.btn-cancel-claim-row').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await cancelClaim(groupId, btn.dataset.claim);
        showMyPage(groupId);  // reload
      } catch (err) {
        alert(err.message);
      }
    });
  });
}

// ── Admin helpers ─────────────────────────────────────────────
function adminBack(href) {
  if (tg?.BackButton) {
    tg.BackButton.show();
    tg.BackButton.offClick();
    tg.BackButton.onClick(() => { location.hash = href; });
  }
}

function showAdminError(msg) {
  const el = document.getElementById('admin-error');
  if (el) { el.textContent = msg; el.hidden = false; }
}

function hideAdminError() {
  const el = document.getElementById('admin-error');
  if (el) el.hidden = true;
}

// ── Admin Home ────────────────────────────────────────────────
function showAdminHome() {
  adminBack('#/');
  render(`
    <div class="screen-header">
      <h1>⚙️ Администрирование</h1>
    </div>
    <div class="list">
      <a class="admin-menu-item" href="#/admin/categories">
        <span class="admin-menu-item__icon">📁</span>
        <span class="admin-menu-item__label">Категории</span>
        <span class="admin-menu-item__arrow">›</span>
      </a>
      <a class="admin-menu-item" href="#/admin/achievements">
        <span class="admin-menu-item__icon">🏆</span>
        <span class="admin-menu-item__label">Ачивки</span>
        <span class="admin-menu-item__arrow">›</span>
      </a>
    </div>
  `);
}

// ── Admin: Categories list ────────────────────────────────────
async function showAdminCategories() {
  adminBack('#/admin');
  spinner();
  let cats;
  try { cats = await fetchAdminCategories(); }
  catch (e) { showError(e.message, showAdminCategories); return; }

  const rows = cats.map(c => `
    <div class="admin-item">
      <div class="admin-item__info">
        <div class="admin-item__title">${c.icon ? esc(c.icon) + ' ' : ''}${esc(c.name)}</div>
        <div class="admin-item__meta">${esc(c.code)}${c.description ? ' · ' + esc(c.description) : ''}</div>
      </div>
      <a class="btn-sm btn-secondary" href="#/admin/categories/${esc(c.code)}">✏️</a>
    </div>
  `).join('');

  render(`
    <div class="screen-header">
      <div class="screen-header__row">
        <h1>📁 Категории</h1>
        <a class="btn-sm btn-primary" href="#/admin/categories/new">+ Создать</a>
      </div>
    </div>
    <div class="list">${rows || '<p class="hint-text">Нет категорий</p>'}</div>
  `);
}

// ── Admin: Category form (create / edit) ──────────────────────
async function showAdminCategoryForm(code) {
  adminBack('#/admin/categories');
  const isNew = !code;
  let cat = null;

  if (!isNew) {
    spinner();
    try {
      const cats = await fetchAdminCategories();
      cat = cats.find(c => c.code === code);
      if (!cat) { showError('Категория не найдена', () => location.hash = '#/admin/categories'); return; }
    } catch (e) { showError(e.message, () => showAdminCategoryForm(code)); return; }
  }

  render(`
    <div class="screen-header">
      <h1>${isNew ? '➕ Новая категория' : '✏️ ' + esc(cat.name)}</h1>
    </div>
    <div class="admin-form">
      <div id="admin-error" class="admin-error" hidden></div>
      <div class="form-group">
        <label>Код</label>
        <input id="f-code" class="form-input" type="text" value="${esc(cat?.code ?? '')}" ${!isNew ? 'readonly' : ''} placeholder="school">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Название</label>
          <input id="f-name" class="form-input" type="text" value="${esc(cat?.name ?? '')}" placeholder="Школа">
        </div>
        <div class="form-group" style="max-width:90px">
          <label>Иконка</label>
          <input id="f-icon" class="form-input" type="text" value="${esc(cat?.icon ?? '')}" placeholder="📚">
        </div>
      </div>
      <div class="form-group">
        <label>Описание</label>
        <textarea id="f-desc" class="form-textarea" placeholder="Краткое описание">${esc(cat?.description ?? '')}</textarea>
      </div>
      <button class="btn-primary" id="btn-save">Сохранить</button>
    </div>
  `);

  document.getElementById('btn-save').onclick = async () => {
    hideAdminError();
    const data = {
      code: document.getElementById('f-code').value.trim(),
      name: document.getElementById('f-name').value.trim(),
      description: document.getElementById('f-desc').value.trim() || null,
      icon: document.getElementById('f-icon').value.trim() || null,
    };
    if (!data.name) { showAdminError('Введите название'); return; }
    try {
      if (isNew) {
        if (!data.code) { showAdminError('Введите код'); return; }
        await createCategory(data);
      } else {
        await updateCategory(code, { name: data.name, description: data.description, icon: data.icon });
      }
      location.hash = '#/admin/categories';
    } catch (e) { showAdminError(e.message); }
  };
}

// ── Admin: Achievements list ──────────────────────────────────
async function showAdminAchievements() {
  adminBack('#/admin');
  spinner();
  let achs;
  try { achs = await fetchAdminAchievements(); }
  catch (e) { showError(e.message, showAdminAchievements); return; }

  const rows = achs.map(a => `
    <div class="admin-item ${a.is_active ? '' : 'admin-item--inactive'}">
      <div class="admin-item__info">
        <div class="admin-item__title">
          ${a.icon ? esc(a.icon) + ' ' : ''}${esc(a.title)}
          ${!a.is_active ? '<span class="badge-inactive">неактивна</span>' : ''}
        </div>
        <div class="admin-item__meta">
          <span class="badge badge-${esc(a.rarity)}">${esc(RARITY_LABEL[a.rarity] || a.rarity)}</span>
          ${a.category_code ? ' · ' + esc(a.category_code) : ''}
          ${a.points ? ' · ' + a.points + '⭐' : ''}
        </div>
      </div>
      <a class="btn-sm btn-secondary" href="#/admin/achievements/${esc(a.code)}">✏️</a>
    </div>
  `).join('');

  render(`
    <div class="screen-header">
      <div class="screen-header__row">
        <h1>🏆 Ачивки</h1>
        <a class="btn-sm btn-primary" href="#/admin/achievements/new">+ Создать</a>
      </div>
    </div>
    <div class="list">${rows || '<p class="hint-text">Нет ачивок</p>'}</div>
  `);
}

// ── Admin: Achievement form (create / edit) ───────────────────
async function showAdminAchievementForm(code) {
  adminBack('#/admin/achievements');
  const isNew = !code;

  spinner();
  let ach = null, cats = [], allAchs = [];
  try {
    [cats, allAchs] = await Promise.all([fetchAdminCategories(), fetchAdminAchievements()]);
    if (!isNew) {
      ach = allAchs.find(a => a.code === code);
      if (!ach) { showError('Ачивка не найдена', () => location.hash = '#/admin/achievements'); return; }
    }
  } catch (e) { showError(e.message, () => showAdminAchievementForm(code)); return; }

  const catOptions = cats.map(c =>
    `<option value="${esc(c.code)}" ${ach?.category_code === c.code ? 'selected' : ''}>${esc(c.name)}</option>`
  ).join('');

  const rarityOptions = RARITIES.map(r =>
    `<option value="${r}" ${(ach?.rarity ?? 'COMMON') === r ? 'selected' : ''}>${esc(RARITY_LABEL[r])}</option>`
  ).join('');

  const prereqSection = isNew ? '' : renderPrereqSection(ach, allAchs);

  render(`
    <div class="screen-header">
      <h1>${isNew ? '➕ Новая ачивка' : '✏️ ' + esc(ach.title)}</h1>
    </div>
    <div class="admin-form">
      <div id="admin-error" class="admin-error" hidden></div>

      <div class="form-group">
        <label>Код</label>
        <input id="f-code" class="form-input" value="${esc(ach?.code ?? '')}" ${!isNew ? 'readonly' : ''} placeholder="school_finish_quarter">
      </div>
      <div class="form-group">
        <label>Название</label>
        <input id="f-title" class="form-input" value="${esc(ach?.title ?? '')}" placeholder="Четверть на 4–5">
      </div>
      <div class="form-group">
        <label>Описание</label>
        <textarea id="f-desc" class="form-textarea">${esc(ach?.description ?? '')}</textarea>
      </div>
      <div class="form-group">
        <label>Иконка</label>
        <input id="f-icon" class="form-input" value="${esc(ach?.icon ?? '')}" placeholder="📘">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Категория</label>
          <select id="f-cat" class="form-select">${catOptions}</select>
        </div>
        <div class="form-group">
          <label>Редкость</label>
          <select id="f-rarity" class="form-select">${rarityOptions}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Очки</label>
          <input id="f-points" class="form-input" type="number" value="${ach?.points ?? ''}" placeholder="0">
        </div>
        <div class="form-group">
          <label>Порядок</label>
          <input id="f-order" class="form-input" type="number" value="${ach?.sort_order ?? 0}">
        </div>
      </div>
      <div class="form-row">
        <label class="form-check">
          <input id="f-repeat" type="checkbox" ${ach?.repeatable ? 'checked' : ''}> Повторяемая
        </label>
        <div class="form-group">
          <label>Макс. уровень</label>
          <input id="f-maxlvl" class="form-input" type="number" value="${ach?.max_level ?? ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Cooldown (ч)</label>
          <input id="f-cooldown" class="form-input" type="number" min="1" value="${ach?.cooldown_hours ?? ''}" placeholder="—">
        </div>
      </div>
      ${!isNew ? `<label class="form-check"><input id="f-active" type="checkbox" ${ach.is_active ? 'checked' : ''}> Активна</label>` : ''}

      <button class="btn-primary" id="btn-save">Сохранить</button>
      ${!isNew ? `<button class="btn-danger" id="btn-deactivate" style="${ach.is_active ? '' : 'display:none'}">Деактивировать</button>` : ''}

      ${prereqSection}
    </div>
  `);

  document.getElementById('btn-save').onclick = async () => {
    hideAdminError();
    const data = {
      title: document.getElementById('f-title').value.trim(),
      description: document.getElementById('f-desc').value.trim(),
      icon: document.getElementById('f-icon').value.trim() || null,
      category_code: document.getElementById('f-cat').value,
      rarity: document.getElementById('f-rarity').value,
      points: parseInt(document.getElementById('f-points').value) || null,
      sort_order: parseInt(document.getElementById('f-order').value) || 0,
      repeatable: document.getElementById('f-repeat').checked,
      max_level: parseInt(document.getElementById('f-maxlvl').value) || null,
      cooldown_hours: parseInt(document.getElementById('f-cooldown').value) || null,
    };
    if (!data.title) { showAdminError('Введите название'); return; }
    try {
      if (isNew) {
        const code = document.getElementById('f-code').value.trim();
        if (!code) { showAdminError('Введите код'); return; }
        await createAchievement({ ...data, code });
        location.hash = '#/admin/achievements';
      } else {
        if (!isNew) data.is_active = document.getElementById('f-active').checked;
        await updateAchievement(code, data);
        location.hash = '#/admin/achievements';
      }
    } catch (e) { showAdminError(e.message); }
  };

  if (!isNew) {
    document.getElementById('btn-deactivate')?.addEventListener('click', async () => {
      if (!confirm(`Деактивировать «${ach.title}»?`)) return;
      try { await deactivateAchievement(code); location.hash = '#/admin/achievements'; }
      catch (e) { showAdminError(e.message); }
    });

    // Prereq add button
    document.getElementById('btn-add-prereq')?.addEventListener('click', async () => {
      const sel = document.getElementById('prereq-select');
      const minLvlEl = document.getElementById('prereq-min-level');
      const prereqCode = sel?.value;
      const minLevel = parseInt(minLvlEl?.value) || 1;
      if (!prereqCode) return;
      hideAdminError();
      try {
        await addPrerequisite(code, prereqCode, minLevel);
        showAdminAchievementForm(code);  // reload
      } catch (e) { showAdminError(e.message); }
    });

    // Prereq remove buttons
    document.querySelectorAll('.btn-remove-prereq').forEach(btn => {
      btn.addEventListener('click', async () => {
        const prereqCode = btn.dataset.prereq;
        hideAdminError();
        try {
          await removePrerequisite(code, prereqCode);
          showAdminAchievementForm(code);  // reload
        } catch (e) { showAdminError(e.message); }
      });
    });
  }
}

function renderPrereqSection(ach, allAchs) {
  const existing = new Set(ach.prerequisites.map(p => p.prereq_code));
  const prereqRows = ach.prerequisites.map(p => `
    <div class="admin-item admin-item--prereq">
      <div class="admin-item__info">
        <div class="admin-item__title">${esc(p.prereq_title)}</div>
        <div class="admin-item__meta">${esc(p.prereq_code)} · мин.ур.${p.min_level}</div>
      </div>
      <button class="btn-sm btn-danger btn-remove-prereq" data-prereq="${esc(p.prereq_code)}">✕</button>
    </div>
  `).join('');

  // Only show achievements that are not self and not already a prereq
  const available = allAchs.filter(a => a.code !== ach.code && !existing.has(a.code));
  const options = available.map(a =>
    `<option value="${esc(a.code)}">${esc(a.title)} (${esc(a.code)})</option>`
  ).join('');

  return `
    <div class="form-section">
      <div class="form-section__title">⛓ Пресквизиты</div>
      ${prereqRows || '<p class="hint-text">Нет пресквизитов</p>'}
      <div class="form-row">
        <select id="prereq-select" class="form-select">${options}</select>
        <input id="prereq-min-level" class="form-input form-input--sm" type="number" value="1" min="1" placeholder="ур.">
      </div>
      <button class="btn-secondary btn-sm" id="btn-add-prereq">+ Добавить пресквизит</button>
    </div>
  `;
}
