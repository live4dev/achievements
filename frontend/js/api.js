/** API wrappers for the mobile SPA. */

let _token = null;

async function ensureAuth() {
  if (_token) return;
  const initData = window.Telegram?.WebApp?.initData || '';
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ init_data: initData }),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail || `Auth failed: HTTP ${res.status}`);
  }
  const data = await res.json();
  _token = data.token;
}

async function apiFetch(path) {
  await ensureAuth();
  const res = await fetch(path, {
    headers: _token ? { Authorization: `Bearer ${_token}` } : {},
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

/** GET /api/groups → list<GroupDirectoryItem> */
function fetchGroups() {
  return apiFetch('/api/groups');
}

/** GET /api/groups/{groupId}/tree/aggregate → AggregateTreeResponse */
function fetchAggregate(groupId) {
  return apiFetch(`/api/groups/${groupId}/tree/aggregate`);
}
