function findChains(achList, edges) {
  const codes = new Set(achList.map(a => a.code));
  const achByCode = Object.fromEntries(achList.map(a => [a.code, a]));

  // Keep only edges within this category
  const catEdges = edges.filter(e => codes.has(e.from_code) && codes.has(e.to_code));

  // Undirected adjacency for connected components
  const adj = {};
  achList.forEach(a => { adj[a.code] = []; });
  catEdges.forEach(e => {
    adj[e.from_code].push(e.to_code);
    adj[e.to_code].push(e.from_code);
  });

  // BFS connected components
  const visited = new Set();
  const chains = [];
  achList.forEach(a => {
    if (visited.has(a.code)) return;
    const component = [];
    const queue = [a.code];
    while (queue.length) {
      const code = queue.shift();
      if (visited.has(code)) continue;
      visited.add(code);
      component.push(achByCode[code]);
      adj[code].forEach(nb => { if (!visited.has(nb)) queue.push(nb); });
    }
    chains.push(component);
  });

  // Topological sort within each multi-node chain
  const dirAdj = {};
  const indegree = {};
  achList.forEach(a => { dirAdj[a.code] = []; indegree[a.code] = 0; });
  catEdges.forEach(e => { dirAdj[e.from_code].push(e.to_code); indegree[e.to_code]++; });

  return chains.map(chain => {
    if (chain.length <= 1) return chain;
    const inDeg = Object.fromEntries(chain.map(a => [a.code, indegree[a.code]]));
    const queue = chain.filter(a => inDeg[a.code] === 0).map(a => a.code);
    const sorted = [];
    while (queue.length) {
      const code = queue.shift();
      sorted.push(achByCode[code]);
      dirAdj[code].forEach(nb => { if (--inDeg[nb] === 0) queue.push(nb); });
    }
    return sorted.length === chain.length ? sorted : chain;
  });
}
