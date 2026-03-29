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

async function showAdminHome() {
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
    <p id="admin-version" style="text-align:center;font-size:0.75rem;color:var(--tg-hint);margin-top:24px;"></p>
  `);
  try {
    const data = await apiAdmin('GET', '/version');
    const el = document.getElementById('admin-version');
    if (el) el.textContent = `v${data.version}`;
  } catch (_) {}
}
