/**
 * app.js — main orchestrator.
 *
 * URL params:
 *   ?group=<uuid>
 *   ?user=<uuid>
 *   ?mode=participant|aggregate
 *   ?focus=<achievement_code>
 */

import { fetchTree, fetchMembers, fetchAggregate } from './api.js';
import { initGraph, loadParticipant, loadAggregate, applyVisibility, focusNode, onNodeSelect, setDirection, fitGraph, zoomIn, zoomOut, getCurrentData } from './graph.js';
import { initFilters, resetFilters, buildFilterFn } from './filters.js';
import { renderDetail, clearDetail } from './detail.js';

// ── State ────────────────────────────────────────────────────────
let _groupId = null;
let _userId = null;
let _mode = 'participant'; // 'participant' | 'aggregate'
let _membersData = null;
let _layoutDir = 'TB';

// ── Boot ─────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  _bindControls();

  const params = new URLSearchParams(window.location.search);
  _groupId = params.get('group');
  _userId  = params.get('user');
  _mode    = params.get('mode') || 'participant';

  if (!_groupId) {
    showSetup();
    return;
  }

  _launchApp(params.get('focus'));
});

// ── Setup form ───────────────────────────────────────────────────
function showSetup() {
  document.getElementById('setup-overlay').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}

function hideSetup() {
  document.getElementById('setup-overlay').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

document.getElementById('setup-participant-btn').addEventListener('click', () => {
  const g = document.getElementById('setup-group').value.trim();
  const u = document.getElementById('setup-user').value.trim();
  if (!g) { _setupError('Введите Group ID'); return; }
  if (!u) { _setupError('Введите User ID для режима "Участник"'); return; }
  _navigate({ group: g, user: u, mode: 'participant' });
});

document.getElementById('setup-aggregate-btn').addEventListener('click', () => {
  const g = document.getElementById('setup-group').value.trim();
  if (!g) { _setupError('Введите Group ID'); return; }
  _navigate({ group: g, mode: 'aggregate' });
});

function _setupError(msg) {
  const el = document.getElementById('setup-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

// ── Launch app ───────────────────────────────────────────────────
async function _launchApp(focusCode) {
  hideSetup();
  initGraph(document.getElementById('cy'));
  onNodeSelect((nodeData) => {
    renderDetail(nodeData, getCurrentData());
  });

  _bindGraphControls();

  await _loadData();

  if (focusCode) {
    setTimeout(() => focusNode(focusCode), 300);
  }
}

// ── Load data ─────────────────────────────────────────────────────
async function _loadData() {
  _showLoading(true);
  clearDetail();

  try {
    if (_mode === 'aggregate') {
      await _loadAggregate();
    } else {
      await _loadParticipant();
    }

    // Load members for selector (always, so admin can switch)
    if (!_membersData) {
      _membersData = await fetchMembers(_groupId).catch(() => ({ members: [] }));
    }
    _populateMemberSelect(_membersData.members);
    _syncModeButtons();

  } catch (err) {
    _showError(err.message);
  } finally {
    _showLoading(false);
  }
}

async function _loadParticipant() {
  if (!_userId) {
    _showError('User ID не задан. Вернитесь к настройкам.');
    return;
  }
  const data = await fetchTree(_groupId, _userId);
  document.getElementById('group-title').textContent = data.group?.title || '';
  initFilters(data.categories || [], (fn) => {
    const visible = applyVisibility(fn);
    document.getElementById('graph-empty').classList.toggle('hidden', visible > 0);
  });
  loadParticipant(data);
}

async function _loadAggregate() {
  const data = await fetchAggregate(_groupId);
  document.getElementById('group-title').textContent = data.group?.title || '';
  initFilters(data.categories || [], (fn) => {
    const visible = applyVisibility(fn);
    document.getElementById('graph-empty').classList.toggle('hidden', visible > 0);
  });
  loadAggregate(data);
}

// ── Member selector ───────────────────────────────────────────────
function _populateMemberSelect(members) {
  const sel = document.getElementById('member-select');
  if (_mode === 'aggregate' || members.length === 0) {
    sel.style.display = 'none';
    return;
  }
  sel.style.display = '';
  sel.innerHTML = '';
  members.forEach((m) => {
    const opt = document.createElement('option');
    opt.value = m.user_id;
    opt.textContent = m.display_name + (m.role === 'ADMIN' ? ' 👑' : '');
    if (m.user_id === _userId) opt.selected = true;
    sel.appendChild(opt);
  });

  sel.addEventListener('change', () => {
    _userId = sel.value;
    _updateUrl();
    _loadData();
  });
}

// ── Mode switch ───────────────────────────────────────────────────
function _syncModeButtons() {
  document.getElementById('mode-participant').classList.toggle('active', _mode === 'participant');
  document.getElementById('mode-aggregate').classList.toggle('active', _mode === 'aggregate');
}

// ── Controls ──────────────────────────────────────────────────────
function _bindControls() {
  document.getElementById('mode-participant').addEventListener('click', () => {
    if (_mode === 'participant') return;
    _mode = 'participant';
    _updateUrl();
    _loadData();
  });

  document.getElementById('mode-aggregate').addEventListener('click', () => {
    if (_mode === 'aggregate') return;
    _mode = 'aggregate';
    _updateUrl();
    _loadData();
  });

  document.getElementById('settings-btn').addEventListener('click', () => {
    showSetup();
  });
}

function _bindGraphControls() {
  document.getElementById('fit-btn').addEventListener('click', fitGraph);
  document.getElementById('zoom-in-btn').addEventListener('click', zoomIn);
  document.getElementById('zoom-out-btn').addEventListener('click', zoomOut);
  document.getElementById('layout-dir-btn').addEventListener('click', () => {
    _layoutDir = _layoutDir === 'TB' ? 'LR' : 'TB';
    document.getElementById('layout-dir-btn').textContent = _layoutDir === 'TB' ? '↕' : '↔';
    setDirection(_layoutDir);
  });
}

// ── URL helpers ───────────────────────────────────────────────────
function _updateUrl() {
  const params = new URLSearchParams();
  if (_groupId) params.set('group', _groupId);
  if (_userId && _mode === 'participant') params.set('user', _userId);
  params.set('mode', _mode);
  const url = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', url);
}

function _navigate(overrides) {
  const params = new URLSearchParams();
  const merged = { group: _groupId, user: _userId, mode: _mode, ...overrides };
  if (merged.group) params.set('group', merged.group);
  if (merged.user && merged.mode !== 'aggregate') params.set('user', merged.user);
  if (merged.mode) params.set('mode', merged.mode);

  window.history.pushState({}, '', `?${params.toString()}`);
  _groupId = merged.group;
  _userId  = merged.user || null;
  _mode    = merged.mode || 'participant';
  _membersData = null; // force reload

  _launchApp(null);
}

// ── UI helpers ────────────────────────────────────────────────────
function _showLoading(on) {
  document.getElementById('graph-loading').style.display = on ? 'flex' : 'none';
}

function _showError(msg) {
  const el = document.getElementById('graph-loading');
  el.innerHTML = `<p style="color:#f87171;text-align:center;padding:20px">${msg}<br><br>
    <button class="btn btn-secondary" onclick="location.reload()">Обновить</button></p>`;
  el.style.display = 'flex';
}
