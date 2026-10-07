import test from 'node:test';
import assert from 'node:assert/strict';
import {buildConstellation} from '../constellation.mjs';
import {nodes, path} from '../story.mjs';

const build = (seed = 7) => buildConstellation({seed, nodes, path});

test('same seed gives the same layout, different seed differs', () => {
  assert.deepEqual(build(), build());
  assert.notDeepEqual(build().points[50], build(8).points[50]);
});
test('has the requested number of points with named nodes first', () => {
  const c = build();
  assert.equal(c.points.length, 320);
  nodes.forEach((n, i) => {
    assert.equal(c.points[i].name, n.name);
    assert.equal(c.index[n.name], i);
    assert.deepEqual([c.points[i].x, c.points[i].y, c.points[i].z], n.pos);
  });
  assert.equal(c.points[nodes.length].name, null);
});
test('the path is linked end to end', () => {
  const c = build();
  assert.deepEqual(c.pathLinks, path.slice(1).map((name, i) => [c.index[path[i]], c.index[name]]));
});
test('every point has a link and links are valid, unique and not self-links', () => {
  const c = build();
  const linked = new Set(), seen = new Set();
  for (const [a, b] of c.links) {
    assert.ok(a !== b && a >= 0 && b >= 0 && a < 320 && b < 320);
    const key = Math.min(a, b) + ':' + Math.max(a, b);
    assert.ok(!seen.has(key)); seen.add(key);
    linked.add(a); linked.add(b);
  }
  assert.equal(linked.size, 320);
});
test('unnamed points keep clear of Ostrel so it reads as the centre', () => {
  const c = build();
  for (const p of c.points.slice(nodes.length)) assert.ok(Math.hypot(p.x, p.y, p.z) > 1.2);
});
