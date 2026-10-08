import test from 'node:test';
import assert from 'node:assert/strict';
import {acts, steps, screens} from '../story.mjs';

test('steps are flattened in order and know their act', () => {
  assert.equal(steps.length, acts.reduce((n, a) => n + a.steps.length, 0));
  assert.deepEqual(steps.map(s => s.act), acts.flatMap((a, i) => a.steps.map(() => i)));
});
test('step ids are unique', () => {
  assert.equal(new Set(steps.map(s => s.id)).size, steps.length);
});
test('every step looks at a known screen for a positive time', () => {
  for (const s of steps) {
    assert.ok(s.screen === 'all' || screens.includes(s.screen), s.id + ' screen');
    assert.ok(s.duration > 0, s.id + ' duration');
  }
});
test('cursor and carry targets name a known screen and fit inside the step', () => {
  const known = ref => screens.includes(ref.split(':')[0]) && ref.split(':')[1];
  for (const s of steps) {
    for (const c of s.cursor ?? []) { assert.ok(known(c.to), s.id + ' cursor ' + c.to); assert.ok(c.at >= 0 && c.at < s.duration, s.id + ' cursor time'); }
    if (s.carry) { assert.ok(known(s.carry.from), s.id); assert.ok(known(s.carry.to), s.id); }
  }
});
test('the whole demo runs for about five minutes', () => {
  const total = steps.reduce((sum, s) => sum + s.duration, 0);
  assert.ok(total >= 270 && total <= 320, 'total ' + total);
});
