/**
 * graph.js — Cytoscape.js DAG initialisation and updates.
 *
 * Public API:
 *   initGraph(container)        — create cy instance (call once)
 *   loadParticipant(data)       — load TreeResponse, paint statuses
 *   loadAggregate(data)         — load AggregateTreeResponse, paint counts
 *   applyVisibility(filterFn)   — show/hide nodes; fn(node.data()) → bool
 *   focusNode(code)             — center + select a node
 *   getCurrentData()            — { achievements, edges, state, mode }
 *   onNodeSelect(cb)            — register tap callback
 *   setDirection(dir)           — 'TB' or 'LR'; re-runs layout
 *   fitGraph()                  — fit to viewport
 *   zoomIn() / zoomOut()
 */

const RARITY_COLOR = {
  COMMON:    '#9ca3af',
  UNCOMMON:  '#4ade80',
  RARE:      '#60a5fa',
  EPIC:      '#c084fc',
  LEGENDARY: '#fbbf24',
};

let cy = null;
let _selectCb = null;
let _layoutDir = 'TB';
let _currentData = null; // { achievements, edges, user_state|aggregate_state, mode }

export function initGraph(container) {
  cy = cytoscape({
    container,
    style: _buildStyle(),
    elements: [],
    minZoom: 0.1,
    maxZoom: 4,
    wheelSensitivity: 0.4,
  });

  cy.on('tap', 'node', (evt) => {
    const node = evt.target;
    _highlightNeighbours(node);
    if (_selectCb) _selectCb(node.data());
  });

  cy.on('tap', (evt) => {
    if (evt.target === cy) {
      _clearHighlight();
      if (_selectCb) _selectCb(null);
    }
  });
}

export function onNodeSelect(cb) {
  _selectCb = cb;
}

/* ── Load data ─────────────────────────────────────────────────── */

export function loadParticipant(data) {
  _currentData = { ...data, mode: 'participant' };
  const elements = _buildElements(data.achievements, data.edges, (ach) => {
    const st = data.user_state[ach.code] || { status: 'LOCKED', level: 0 };
    return { status: st.status, level: st.level, max_level: ach.max_level };
  });
  _setElements(elements);
}

export function loadAggregate(data) {
  _currentData = { ...data, mode: 'aggregate' };
  const elements = _buildElements(data.achievements, data.edges, (ach) => {
    const agg = data.aggregate_state[ach.code] || {};
    return { status: 'aggregate', ...agg };
  });
  _setElements(elements);
}

function _buildElements(achievements, edges, stateFn) {
  const nodes = achievements.map((ach) => {
    const state = stateFn(ach);
    const label = _nodeLabel(ach, state);
    return {
      data: {
        id: ach.code,
        label,
        icon: ach.icon || '',
        title: ach.title,
        rarity: ach.rarity,
        category_code: ach.category_code,
        repeatable: ach.repeatable,
        max_level: ach.max_level,
        ...state,
      },
    };
  });

  const edgeElems = edges.map((e) => ({
    data: {
      id: `${e.from_code}→${e.to_code}`,
      source: e.from_code,
      target: e.to_code,
      min_level: e.min_level,
    },
  }));

  return [...nodes, ...edgeElems];
}

function _nodeLabel(ach, state) {
  const icon = ach.icon ? `${ach.icon} ` : '';
  if (state.status === 'aggregate') {
    const { achieved_count = 0, available_count = 0, locked_count = 0 } = state;
    return `${icon}${ach.title}\n✅${achieved_count} 🔵${available_count} 🔒${locked_count}`;
  }
  if (ach.repeatable && state.level > 0) {
    const maxTxt = ach.max_level ? `/${ach.max_level}` : '/∞';
    return `${icon}${ach.title}\n×${state.level}${maxTxt}`;
  }
  return `${icon}${ach.title}`;
}

function _setElements(elements) {
  cy.batch(() => {
    cy.elements().remove();
    cy.add(elements);
    // assign classes
    cy.nodes().forEach((n) => {
      n.classes('');
      const d = n.data();
      if (d.status === 'aggregate') {
        n.addClass('aggregate');
      } else {
        n.addClass(d.status.toLowerCase());
      }
      if (d.repeatable) n.addClass('repeatable');
      n.addClass(`rarity-${d.rarity.toLowerCase()}`);
    });
  });
  _runLayout();
}

/* ── Layout ────────────────────────────────────────────────────── */

function _runLayout() {
  cy.layout({
    name: 'dagre',
    rankDir: _layoutDir,
    nodeSep: 60,
    rankSep: 80,
    padding: 30,
    animate: false,
  }).run();

  cy.fit(undefined, 40);
}

export function setDirection(dir) {
  _layoutDir = dir;
  if (cy && cy.elements().length) _runLayout();
}

/* ── Visibility ────────────────────────────────────────────────── */

export function applyVisibility(filterFn) {
  if (!cy) return;
  cy.batch(() => {
    cy.nodes().forEach((n) => {
      if (filterFn(n.data())) {
        n.show();
      } else {
        n.hide();
      }
    });
    // hide edges whose source or target is hidden
    cy.edges().forEach((e) => {
      if (e.source().hidden() || e.target().hidden()) {
        e.hide();
      } else {
        e.show();
      }
    });
  });

  const visible = cy.nodes(':visible');
  return visible.length;
}

/* ── Focus ─────────────────────────────────────────────────────── */

export function focusNode(code) {
  if (!cy) return;
  const node = cy.getElementById(code);
  if (!node || node.empty()) return;
  cy.animate({ fit: { eles: node, padding: 100 }, duration: 400 });
  node.select();
  _highlightNeighbours(node);
  if (_selectCb) _selectCb(node.data());
}

/* ── Highlight ─────────────────────────────────────────────────── */

function _highlightNeighbours(node) {
  cy.elements().removeClass('dimmed highlighted');
  const neighbourhood = node.closedNeighborhood();
  cy.elements().not(neighbourhood).addClass('dimmed');
  neighbourhood.addClass('highlighted');
}

function _clearHighlight() {
  cy.elements().removeClass('dimmed highlighted');
}

/* ── Controls ──────────────────────────────────────────────────── */

export function fitGraph() { cy && cy.fit(undefined, 40); }
export function zoomIn()   { cy && cy.zoom({ level: cy.zoom() * 1.3, renderedPosition: _center() }); }
export function zoomOut()  { cy && cy.zoom({ level: cy.zoom() / 1.3, renderedPosition: _center() }); }

function _center() {
  return { x: cy.width() / 2, y: cy.height() / 2 };
}

export function getCurrentData() { return _currentData; }

/* ── Cytoscape style ───────────────────────────────────────────── */

function _buildStyle() {
  return [
    {
      selector: 'node',
      style: {
        'shape': 'round-rectangle',
        'width': 'label',
        'height': 'label',
        'padding': '10px',
        'label': 'data(label)',
        'text-wrap': 'wrap',
        'text-max-width': '140px',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '12px',
        'color': '#e2e6f0',
        'background-color': '#21253a',
        'border-width': 2,
        'border-color': '#4b5563',
        'transition-property': 'opacity, border-color, background-color',
        'transition-duration': '0.15s',
      },
    },
    // Status classes
    {
      selector: 'node.achieved',
      style: {
        'background-color': '#14532d',
        'border-color': '#22c55e',
      },
    },
    {
      selector: 'node.available',
      style: {
        'background-color': '#1e3a5f',
        'border-color': '#3b82f6',
        'border-width': 2,
      },
    },
    {
      selector: 'node.locked',
      style: {
        'background-color': '#1f2937',
        'border-color': '#374151',
        'color': '#6b7280',
      },
    },
    {
      selector: 'node.aggregate',
      style: {
        'background-color': '#1a1d27',
        'border-color': '#5b7cfa',
        'font-size': '11px',
      },
    },
    // Repeatable: dashed border
    {
      selector: 'node.repeatable',
      style: { 'border-style': 'dashed' },
    },
    // Rarity border colour (overrides status when selected only — subtle glow)
    ...Object.entries(RARITY_COLOR).map(([r, c]) => ({
      selector: `node.rarity-${r.toLowerCase()}:selected`,
      style: { 'border-color': c, 'border-width': 3 },
    })),
    // Selection ring
    {
      selector: 'node:selected',
      style: { 'border-width': 3, 'overlay-opacity': 0 },
    },
    // Dimmed (neighbourhood highlight)
    {
      selector: '.dimmed',
      style: { 'opacity': 0.25 },
    },
    {
      selector: '.highlighted',
      style: { 'opacity': 1 },
    },
    // Edges
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#374151',
        'target-arrow-color': '#374151',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'arrow-scale': 0.9,
        'opacity': 0.8,
      },
    },
    {
      selector: 'edge.highlighted',
      style: { 'line-color': '#5b7cfa', 'target-arrow-color': '#5b7cfa', 'opacity': 1 },
    },
    {
      selector: 'edge.dimmed',
      style: { 'opacity': 0.15 },
    },
  ];
}
