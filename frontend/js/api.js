/** Thin fetch wrappers for all three endpoints. */

async function apiFetch(path) {
  const res = await fetch(path);
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const msg = detail.detail || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return res.json();
}

/**
 * GET /api/groups/{groupId}/users/{userId}/tree
 * @returns {Promise<TreeResponse>}
 */
export function fetchTree(groupId, userId) {
  return apiFetch(`/api/groups/${groupId}/users/${userId}/tree`);
}

/**
 * GET /api/groups/{groupId}/members
 * @returns {Promise<MembersResponse>}
 */
export function fetchMembers(groupId) {
  return apiFetch(`/api/groups/${groupId}/members`);
}

/**
 * GET /api/groups/{groupId}/tree/aggregate
 * @returns {Promise<AggregateTreeResponse>}
 */
export function fetchAggregate(groupId) {
  return apiFetch(`/api/groups/${groupId}/tree/aggregate`);
}
