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
