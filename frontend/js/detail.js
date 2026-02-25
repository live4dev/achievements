/**
 * detail.js — render the right-panel detail view.
 *
 * Public API:
 *   renderDetail(nodeData, currentData)
 *   clearDetail()
 */

const RARITY_LABEL = {
  COMMON:    'Common',
  UNCOMMON:  'Uncommon',
  RARE:      'Rare',
  EPIC:      'Epic',
  LEGENDARY: 'Legendary',
};

const STATUS_LABEL = {
  ACHIEVED:  '✅ Получено',
  AVAILABLE: '🔵 Доступно',
  LOCKED:    '🔒 Заблокировано',
};

export function clearDetail() {
  document.getElementById('detail-placeholder').classList.remove('hidden');
  document.getElementById('detail-content').classList.add('hidden');
  document.getElementById('detail-content').innerHTML = '';
}

/**
 * @param {object} nodeData   — Cytoscape node data object
 * @param {object} currentData — { achievements, user_state|aggregate_state, mode }
 */
export function renderDetail(nodeData, currentData) {
  if (!nodeData) { clearDetail(); return; }

  const placeholder = document.getElementById('detail-placeholder');
  const content = document.getElementById('detail-content');
  placeholder.classList.add('hidden');
  content.classList.remove('hidden');

  if (currentData.mode === 'aggregate') {
    content.innerHTML = _renderAggregate(nodeData, currentData);
  } else {
    content.innerHTML = _renderParticipant(nodeData, currentData);
  }

  // Bind copy-link button
  content.querySelector('.detail-copy-btn')?.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('focus', nodeData.id);
    navigator.clipboard.writeText(url.toString());
    const btn = content.querySelector('.detail-copy-btn');
    btn.textContent = '✅ Скопировано!';
    setTimeout(() => { btn.textContent = '🔗 Скопировать ссылку на ачивку'; }, 1500);
  });
}

/* ── Participant mode ──────────────────────────────────────────── */

function _renderParticipant(d, data) {
  const ach = data.achievements.find((a) => a.code === d.id);
  if (!ach) return '';

  const st = data.user_state?.[d.id] || { status: 'LOCKED', level: 0 };
  const statusBadge = _statusBadge(st.status);
  const rarityBadge = _rarityBadge(ach.rarity);

  let levelHtml = '';
  if (ach.repeatable) {
    const maxTxt = ach.max_level ? ach.max_level : '∞';
    levelHtml = `<div class="detail-section">
      <div class="detail-section-title">Уровень</div>
      <div style="font-size:15px">${st.level} / ${maxTxt}</div>
    </div>`;
  }

  // Prerequisites
  const prereqEdges = data.edges.filter((e) => e.to_code === ach.code);
  let prereqHtml = '';
  if (prereqEdges.length > 0) {
    const items = prereqEdges.map((e) => {
      const prereqAch = data.achievements.find((a) => a.code === e.from_code);
      const prereqSt = data.user_state?.[e.from_code] || { status: 'LOCKED', level: 0 };
      const icon = prereqSt.status === 'ACHIEVED' ? '✅' : prereqSt.status === 'AVAILABLE' ? '🔵' : '🔒';
      const title = prereqAch ? prereqAch.title : e.from_code;
      const lvlNote = e.min_level > 1 ? ` <span style="color:#7c84a8">мин. ур. ${e.min_level}</span>` : '';
      return `<li class="prereq-item">
        <span class="prereq-icon">${icon}</span>
        <span>${title}${lvlNote}</span>
      </li>`;
    }).join('');
    prereqHtml = `<div class="detail-section">
      <div class="detail-section-title">Условия (пресеты)</div>
      <ul class="prereq-list">${items}</ul>
    </div>`;
  }

  const achievedAt = st.achieved_at
    ? `<div class="detail-section">
        <div class="detail-section-title">Получено</div>
        <div style="font-size:12px;color:#7c84a8">${_fmtDate(st.achieved_at)}</div>
       </div>`
    : '';

  return `
    <div class="detail-icon">${ach.icon || '🏅'}</div>
    <div class="detail-title">${_esc(ach.title)}</div>
    <div class="detail-badges">
      ${statusBadge}
      ${rarityBadge}
      ${ach.repeatable ? '<span class="badge" style="background:#1e293b;color:#94a3b8">♻️ Повтор.</span>' : ''}
    </div>
    <div class="detail-desc">${_esc(ach.description)}</div>
    ${levelHtml}
    ${prereqHtml}
    ${achievedAt}
    <button class="detail-copy-btn">🔗 Скопировать ссылку на ачивку</button>
  `;
}

/* ── Aggregate mode ────────────────────────────────────────────── */

function _renderAggregate(d, data) {
  const ach = data.achievements.find((a) => a.code === d.id);
  if (!ach) return '';

  const agg = data.aggregate_state?.[d.id] || { achieved_count: 0, available_count: 0, locked_count: 0, total: 0 };
  const total = agg.total || 1; // avoid div by zero

  const achPct   = Math.round((agg.achieved_count  / total) * 100);
  const avlPct   = Math.round((agg.available_count / total) * 100);
  const lockPct  = 100 - achPct - avlPct;

  const rarityBadge = _rarityBadge(ach.rarity);

  const prereqEdges = data.edges.filter((e) => e.to_code === ach.code);
  let prereqHtml = '';
  if (prereqEdges.length > 0) {
    const items = prereqEdges.map((e) => {
      const prereqAch = data.achievements.find((a) => a.code === e.from_code);
      const title = prereqAch ? prereqAch.title : e.from_code;
      const lvlNote = e.min_level > 1 ? ` <span style="color:#7c84a8">мин. ур. ${e.min_level}</span>` : '';
      return `<li class="prereq-item"><span class="prereq-icon">→</span><span>${title}${lvlNote}</span></li>`;
    }).join('');
    prereqHtml = `<div class="detail-section">
      <div class="detail-section-title">Условия (пресеты)</div>
      <ul class="prereq-list">${items}</ul>
    </div>`;
  }

  return `
    <div class="detail-icon">${ach.icon || '🏅'}</div>
    <div class="detail-title">${_esc(ach.title)}</div>
    <div class="detail-badges">${rarityBadge}</div>
    <div class="detail-desc">${_esc(ach.description)}</div>
    <div class="detail-section">
      <div class="detail-section-title">Прогресс группы (${total} уч.)</div>
      <div class="agg-row">
        <span>✅ ${agg.achieved_count}</span>
        <span>🔵 ${agg.available_count}</span>
        <span>🔒 ${agg.locked_count}</span>
      </div>
      <div class="progress-track">
        <div class="progress-seg achieved"  style="width:${achPct}%"></div>
        <div class="progress-seg available" style="width:${avlPct}%"></div>
        <div class="progress-seg locked"    style="width:${Math.max(0, lockPct)}%"></div>
      </div>
    </div>
    ${prereqHtml}
    <button class="detail-copy-btn">🔗 Скопировать ссылку на ачивку</button>
  `;
}

/* ── Helpers ───────────────────────────────────────────────────── */

function _statusBadge(status) {
  const cls = `badge badge-${status.toLowerCase()}`;
  return `<span class="${cls}">${STATUS_LABEL[status] || status}</span>`;
}

function _rarityBadge(rarity) {
  const cls = `badge badge-rarity-${rarity.toLowerCase()}`;
  return `<span class="${cls}">${RARITY_LABEL[rarity] || rarity}</span>`;
}

function _fmtDate(iso) {
  try {
    return new Intl.DateTimeFormat('ru', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
