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

    document.getElementById('btn-add-prereq')?.addEventListener('click', async () => {
      const sel = document.getElementById('prereq-select');
      const minLvlEl = document.getElementById('prereq-min-level');
      const prereqCode = sel?.value;
      const minLevel = parseInt(minLvlEl?.value) || 1;
      if (!prereqCode) return;
      hideAdminError();
      try {
        await addPrerequisite(code, prereqCode, minLevel);
        showAdminAchievementForm(code);
      } catch (e) { showAdminError(e.message); }
    });

    document.querySelectorAll('.btn-remove-prereq').forEach(btn => {
      btn.addEventListener('click', async () => {
        const prereqCode = btn.dataset.prereq;
        hideAdminError();
        try {
          await removePrerequisite(code, prereqCode);
          showAdminAchievementForm(code);
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
