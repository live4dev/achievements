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

  const catName = {};
  const catIcon = {};
  (categories || []).forEach(c => { catName[c.code] = c.name; catIcon[c.code] = c.icon; });

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

  const pendingClaims = {};
  claimsData.filter(c => c.status === 'SUBMITTED').forEach(c => {
    pendingClaims[c.achievement_code] = c.id;
  });

  function achMyCardHtml(a) {
    const state = user_state[a.code] || { status: 'LOCKED', level: 0 };
    const icon = a.icon ? `<span class="ach-card__icon">${esc(a.icon)}</span>` : '';
    const pts = a.points ? `<span class="ach-card__points">${a.points}⭐</span>` : '';
    const rarityLabel = RARITY_LABEL[a.rarity] || a.rarity;
    const autoBadge = a.auto_grant ? `<span class="badge badge-auto">⚡ Auto</span>` : '';
    const burnableBadge = a.burnable
      ? `<span class="badge badge-burnable">🔥 ${a.required_count}× за ${a.period_days}д.</span>`
      : '';
    let statusBadge = '';
    let actionBtn = '';
    const onCooldown = state.cooldown_until && new Date(state.cooldown_until) > new Date();
    if (a.burnable && state.burnable_progress > 0 && state.period_expires_at) {
      const exp = new Date(state.period_expires_at);
      const ddmm = exp.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
      const hhmm = exp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      statusBadge = `<span class="status-badge status-burnable-progress">🔥 ${state.burnable_progress}/${a.required_count} до ${ddmm} ${hhmm}</span>`;
    } else if (state.status === 'ACHIEVED' && !onCooldown) {
      statusBadge = `<span class="status-badge status-achieved">✓ Получена${state.level > 1 ? ' ур.' + state.level : ''}</span>`;
    } else if (onCooldown) {
      const until = new Date(state.cooldown_until);
      const hhmm = until.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const ddmm = until.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
      statusBadge = `<span class="status-badge status-achieved">✓ ур.${state.level}</span>`;
      actionBtn = `<span class="status-badge status-cooldown">⏳ до ${ddmm} ${hhmm}</span>`;
    } else if (state.status === 'AVAILABLE') {
      if (a.auto_grant) {
        actionBtn = `<span class="status-badge status-auto">⚡ Выдаётся автоматически</span>`;
      } else if (pendingClaims[a.code]) {
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
              ${autoBadge}
              ${burnableBadge}
              ${statusBadge}
            </div>
            ${actionBtn ? `<div class="ach-card__actions">${actionBtn}</div>` : ''}
          </div>
        </div>
        <div class="ach-card__detail">
          <p class="ach-card__desc">${esc(a.description)}</p>
          ${a.burnable ? (() => {
            if (state.period_expires_at) {
              const exp = new Date(state.period_expires_at);
              const ddmm = exp.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
              const hhmm = exp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return `<p class="ach-card__burnable-hint">🔥 Прогресс: <b>${state.burnable_progress}/${a.required_count}</b> — период до ${ddmm} ${hhmm}</p>`;
            }
            return `<p class="ach-card__burnable-hint">🔥 Нужно выполнить <b>${a.required_count}</b> раз за <b>${a.period_days}</b> дн. — прогресс сгорает!</p>`;
          })() : ''}
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

  document.querySelectorAll('.ach-card--my').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('button') || e.target.closest('textarea')) return;
      card.classList.toggle('open');
    });
  });

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

  document.querySelectorAll('.btn-cancel-form').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const code = btn.dataset.code;
      document.getElementById(`claim-form-${code}`).hidden = true;
      const card = btn.closest('.ach-card--my');
      card.querySelector('.ach-card__actions').style.display = '';
    });
  });

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
        showMyPage(groupId);
      } catch (err) {
        errEl.textContent = err.message;
        errEl.hidden = false;
        btn.disabled = false;
      }
    });
  });

  document.querySelectorAll('.btn-cancel-claim').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      try {
        await cancelClaim(groupId, btn.dataset.claim);
        showMyPage(groupId);
      } catch (err) {
        alert(err.message);
      }
    });
  });

  document.querySelectorAll('.btn-cancel-claim-row').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await cancelClaim(groupId, btn.dataset.claim);
        showMyPage(groupId);
      } catch (err) {
        alert(err.message);
      }
    });
  });
}
