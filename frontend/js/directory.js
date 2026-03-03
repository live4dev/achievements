/* Directory page: groups list → members list → achievement tree */

let _selectedGroupId = null;

async function loadGroups() {
  const listEl = document.getElementById('groups-list');
  try {
    const res = await fetch('/api/groups');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const groups = await res.json();

    if (groups.length === 0) {
      listEl.innerHTML = '<p class="dir-empty-hint">Нет групп</p>';
      return;
    }

    listEl.innerHTML = '';
    for (const g of groups) {
      const card = document.createElement('div');
      card.className = 'dir-group-card';
      card.dataset.id = g.id;
      card.innerHTML = `
        <div class="dir-group-name">${_esc(g.title)}</div>
        <div class="dir-group-meta">${g.member_count} ${_plural(g.member_count, 'участник', 'участника', 'участников')}</div>
      `;
      card.addEventListener('click', () => selectGroup(g.id, g.title));
      listEl.appendChild(card);
    }
  } catch (e) {
    listEl.innerHTML = `<p class="dir-empty-hint" style="color:#f87171">Ошибка загрузки: ${e.message}</p>`;
  }
}

async function selectGroup(groupId, groupTitle) {
  _selectedGroupId = groupId;

  // Highlight selected card
  document.querySelectorAll('.dir-group-card').forEach(c => {
    c.classList.toggle('active', c.dataset.id === groupId);
  });

  // Update members header
  document.getElementById('members-group-title').textContent = groupTitle;
  document.getElementById('aggregate-link').href = `/?group=${groupId}&mode=aggregate`;

  const membersEl = document.getElementById('members-list');
  membersEl.innerHTML = '<div class="dir-loading">Загрузка…</div>';
  document.getElementById('members-empty').classList.add('hidden');
  document.getElementById('members-content').classList.remove('hidden');

  try {
    const res = await fetch(`/api/groups/${groupId}/members`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (data.members.length === 0) {
      membersEl.innerHTML = '<p class="dir-empty-hint">В группе нет участников</p>';
      return;
    }

    membersEl.innerHTML = '';
    for (const m of data.members) {
      const row = document.createElement('a');
      row.className = 'dir-member-row';
      row.href = `/?group=${groupId}&user=${m.user_id}&mode=participant`;
      row.innerHTML = `
        <span class="dir-member-name">${_esc(m.display_name)}</span>
        <span class="dir-member-role ${m.role === 'ADMIN' ? 'dir-role-admin' : 'dir-role-member'}">${m.role === 'ADMIN' ? 'Админ' : 'Участник'}</span>
        <span class="dir-member-arrow">→</span>
      `;
      membersEl.appendChild(row);
    }
  } catch (e) {
    membersEl.innerHTML = `<p class="dir-empty-hint" style="color:#f87171">Ошибка: ${e.message}</p>`;
  }
}

function _esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function _plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} ${one}`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} ${few}`;
  return `${n} ${many}`;
}

loadGroups();
