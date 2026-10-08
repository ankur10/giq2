import test from 'node:test';
import assert from 'node:assert/strict';
import {hero, camera, headOnRoute, N} from '../line.mjs';
import {BEATS, stops} from '../score.mjs';

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

test('the line is always N finite points', () => {
  for (let b = 0; b <= BEATS; b += 0.25) {
    const {positions} = hero(b);
    assert.equal(positions.length, N * 3);
    assert.ok(positions.every(Number.isFinite), 'finite at beat ' + b);
  }
});
test('the head never jumps: the line is one continuous object from first frame to last', () => {
  // Checked from the spike onwards, when the line has a head that the eye follows.
  const step = 1 / 60;
  let worst = 0, where = 0;
  for (let b = 32; b < BEATS - step; b += step) {
    const jump = distance(hero(b).head, hero(b + step).head);
    if (jump > worst) { worst = jump; where = b; }
  }
  assert.ok(worst < 1.2, `largest jump ${worst.toFixed(2)} at beat ${where.toFixed(2)}`);
});
test('the camera never jumps', () => {
  const step = 1 / 60;
  for (let b = 0; b < BEATS - step; b += step) {
    const a = camera(b), c = camera(b + step);
    assert.ok(distance(a.position, c.position) < 0.6, 'position at beat ' + b.toFixed(2));
    assert.ok(distance(a.look, c.look) < 0.6, 'look at beat ' + b.toFixed(2));
  }
});
test('the head arrives at each stop exactly on its beat', () => {
  stops.forEach((stop, i) => assert.ok(Math.abs(headOnRoute(stop.at) * 12 - (i + 1)) < 1e-9, stop.text));
  assert.equal(headOnRoute(0), 0);
  assert.equal(headOnRoute(BEATS), 1);
});
