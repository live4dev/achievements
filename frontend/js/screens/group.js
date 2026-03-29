async function showGroup(groupId) {
  if (tg?.BackButton) {
    tg.BackButton.show();
    tg.BackButton.offClick();
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

  function achCardHtml(a) {
    const state = aggregate_state[a.code] || { achieved_by: [] };
    const icon = a.icon ? `<span class="ach-card__icon">${esc(a.icon)}</span>` : '';
    const pts = a.points ? `<span class="ach-card__points">${a.points} ⭐</span>` : '';
    const repeatBadge = a.repeatable
      ? `<span class="badge">♻️ повт${a.max_level ? ` до ур.${a.max_level}` : ''}</span>`
      : '';
    const burnableBadge = a.burnable
      ? `<span class="badge badge-burnable">🔥 ${a.required_count}× за ${a.period_days}д.</span>`
      : '';
    const autoBadge = a.auto_grant ? `<span class="badge badge-auto">⚡ Авто</span>` : '';
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
              ${burnableBadge}
              ${autoBadge}
            </div>
          </div>
        </div>
        <div class="ach-card__detail">
          <p class="ach-card__desc">${esc(a.description)}</p>
          ${a.burnable ? `<p class="ach-card__burnable-hint">🔥 Нужно выполнить <b>${a.required_count}</b> раз за <b>${a.period_days}</b> дн. — прогресс сгорает!</p>` : ''}
          ${achieversList}
        </div>
      </div>
    `;
  }

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

    const chains = findChains(byCategory[cat], edges || []);

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

  document.querySelectorAll('.ach-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('open'));
  });
}
