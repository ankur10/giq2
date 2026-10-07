// Deterministic market network: the same seed always gives the same stage picture.
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildConstellation({seed = 7, count = 320, nodes, path}) {
  const random = mulberry32(seed);
  const points = nodes.map(n => ({x: n.pos[0], y: n.pos[1], z: n.pos[2], name: n.name, role: n.role}));
  const index = Object.fromEntries(nodes.map((n, i) => [n.name, i]));
  while (points.length < count) {
    // A wide, shallow cloud: a stage screen is 16:9 and depth should read as layers, not a ball.
    const p = {x: (random() * 2 - 1) * 11, y: (random() * 2 - 1) * 5.6, z: (random() * 2 - 1) * 4.5, name: null, role: 'market'};
    if (Math.hypot(p.x, p.y, p.z) > 1.2) points.push(p);
  }
  const links = [], seen = new Set();
  const add = (a, b) => {
    const key = Math.min(a, b) + ':' + Math.max(a, b);
    if (a === b || seen.has(key)) return;
    seen.add(key); links.push([a, b]);
  };
  const pathLinks = path.slice(1).map((name, i) => [index[path[i]], index[name]]);
  pathLinks.forEach(([a, b]) => add(a, b));
  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => [j, (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1]);
    add(i, nearest[0][0]);
    add(i, nearest[1][0]);
  });
  return {points, links, index, pathLinks};
}
