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
