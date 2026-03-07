/** API wrappers for the mobile SPA. */

let _token = null;
let _isAdminUser = false;

function isAdminUser() { return _isAdminUser; }

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
  _isAdminUser = data.is_admin ?? false;
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

// ── Admin API ──────────────────────────────────────────────────

async function apiAdmin(method, path, body) {
  await ensureAuth();
  const res = await fetch(`/api/admin${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ..._token ? { Authorization: `Bearer ${_token}` } : {},
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
  return data;
}

// ── Personal (me) API ──────────────────────────────────────────

async function apiPost(path, body) {
  await ensureAuth();
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ..._token ? { Authorization: `Bearer ${_token}` } : {},
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
  return data;
}

async function apiDelete(path) {
  await ensureAuth();
  const res = await fetch(path, {
    method: 'DELETE',
    headers: _token ? { Authorization: `Bearer ${_token}` } : {},
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
  return data;
}

/** GET /api/groups/{groupId}/users/me/tree → TreeResponse */
function fetchMyTree(groupId) {
  return apiFetch(`/api/groups/${groupId}/users/me/tree`);
}

/** GET /api/groups/{groupId}/claims/me → list[WebClaimOut] */
function fetchMyClaims(groupId) {
  return apiFetch(`/api/groups/${groupId}/claims/me`);
}

/** POST /api/groups/{groupId}/claims → WebClaimOut */
function submitClaim(groupId, achCode, evidenceText) {
  return apiPost(`/api/groups/${groupId}/claims`, {
    achievement_code: achCode,
    evidence_text: evidenceText || null,
  });
}

/** DELETE /api/groups/{groupId}/claims/{claimId} */
function cancelClaim(groupId, claimId) {
  return apiDelete(`/api/groups/${groupId}/claims/${claimId}`);
}

// ── Admin API ──────────────────────────────────────────────────

function fetchAdminCategories()         { return apiAdmin('GET',    '/categories'); }
function createCategory(data)           { return apiAdmin('POST',   '/categories', data); }
function updateCategory(code, data)     { return apiAdmin('PATCH',  `/categories/${code}`, data); }

function fetchAdminAchievements()                    { return apiAdmin('GET',    '/achievements'); }
function createAchievement(data)                     { return apiAdmin('POST',   '/achievements', data); }
function updateAchievement(code, data)               { return apiAdmin('PATCH',  `/achievements/${code}`, data); }
function deactivateAchievement(code)                 { return apiAdmin('DELETE', `/achievements/${code}`); }
function addPrerequisite(code, prereq_code, min_level) { return apiAdmin('POST', `/achievements/${code}/prerequisites`, { prereq_code, min_level }); }
function removePrerequisite(code, prereq_code)       { return apiAdmin('DELETE', `/achievements/${code}/prerequisites/${prereq_code}`); }
