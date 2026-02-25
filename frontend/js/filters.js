/**
 * filters.js — filter panel state and apply logic.
 *
 * Public API:
 *   initFilters(categories, onChangeCallback)
 *   resetFilters()
 *   buildFilterFn()   → (nodeData) => bool
 */

let _onChange = null;
let _staticBound = false; // prevent stacking listeners on static elements

const _state = {
  search: '',
  categories: new Set(),   // empty = show all
  rarities: new Set(),      // empty = show all
  statuses: new Set(['ACHIEVED', 'AVAILABLE', 'LOCKED', 'aggregate']),
};

export function initFilters(categories, onChange) {
  _onChange = onChange;

  // Populate category chips (dynamic — rebuilt each load)
  const container = document.getElementById('category-filters');
  container.innerHTML = '';
  _state.categories.clear();
  if (categories.length === 0) {
    container.textContent = '—';
  } else {
    categories.forEach((cat) => {
      const label = document.createElement('label');
      label.className = 'chip';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = cat.code;
      cb.checked = true;
      cb.addEventListener('change', () => {
        if (cb.checked) _state.categories.delete(cat.code);
        else _state.categories.add(cat.code);
        _notify();
      });
      label.append(cb, ` ${cat.name}`);
      container.appendChild(label);
    });
  }

  // Static elements: bind only once
  if (_staticBound) return;
  _staticBound = true;

  document.getElementById('search-input').addEventListener('input', (e) => {
    _state.search = e.target.value.trim().toLowerCase();
    _notify();
  });

  document.querySelectorAll('#rarity-filters input[type=checkbox]').forEach((cb) => {
    cb.addEventListener('change', () => {
      if (cb.checked) _state.rarities.delete(cb.value);
      else _state.rarities.add(cb.value);
      _notify();
    });
  });

  document.querySelectorAll('#status-filters input[type=checkbox]').forEach((cb) => {
    cb.addEventListener('change', () => {
      if (cb.checked) {
        _state.statuses.add(cb.value);
        _state.statuses.add('aggregate');
      } else {
        _state.statuses.delete(cb.value);
      }
      _notify();
    });
  });

  document.getElementById('reset-filters-btn').addEventListener('click', resetFilters);
}

export function resetFilters() {
  _state.search = '';
  _state.categories.clear();
  _state.rarities.clear();
  _state.statuses = new Set(['ACHIEVED', 'AVAILABLE', 'LOCKED', 'aggregate']);

  document.getElementById('search-input').value = '';
  document.querySelectorAll('#category-filters input[type=checkbox]').forEach((cb) => { cb.checked = true; });
  document.querySelectorAll('#rarity-filters input[type=checkbox]').forEach((cb) => { cb.checked = true; });
  document.querySelectorAll('#status-filters input[type=checkbox]').forEach((cb) => { cb.checked = true; });

  _notify();
}

/**
 * Returns a predicate: nodeData → bool (true = show).
 */
export function buildFilterFn() {
  const { search, categories, rarities, statuses } = _state;
  return (d) => {
    // Search
    if (search && !d.title.toLowerCase().includes(search) && !d.id.toLowerCase().includes(search)) {
      return false;
    }
    // Category
    if (categories.size > 0 && d.category_code && categories.has(d.category_code)) {
      return false;
    }
    // Rarity
    if (rarities.size > 0 && rarities.has(d.rarity)) {
      return false;
    }
    // Status
    const nodeStatus = d.status || 'LOCKED';
    if (!statuses.has(nodeStatus)) {
      return false;
    }
    return true;
  };
}

function _notify() {
  if (_onChange) _onChange(buildFilterFn());
}
