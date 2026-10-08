import test from 'node:test';
import assert from 'node:assert/strict';
import {shots, wall, close, BEATS, DURATION, phase, images} from '../shots.mjs';

test('the reel is about a minute', () => assert.ok(DURATION > 50 && DURATION < 70, 'duration ' + DURATION));
test('shots follow one another with no gaps and start on a bar', () => {
  shots.forEach((s, i) => { assert.equal(s.from % 4, 0, s.id); if (i) assert.equal(s.from, shots[i - 1].to, s.id); });
  assert.equal(wall.from, shots.at(-1).to);
  assert.equal(close.to, BEATS);
});
test('every shot lifts a region that lies inside its capture and has a background colour', () => {
  for (const s of shots) {
    const [x, y, w, h] = s.focusRect;
    assert.ok(x >= 0 && y >= 0 && w > 0 && h > 0 && x + w <= 1.001 && y + h <= 1.001, s.id + ' ' + s.focusRect);
    assert.match(s.focusBackground, /^rgb/, s.id);
  }
});
test('a shot is hidden outside its eight beats and settled in the middle', () => {
  const s = shots[2];
  assert.equal(phase(s, s.from - 1).visible, false);
  assert.equal(phase(s, s.to + 1).visible, false);
  const mid = phase(s, s.from + 5);
  assert.deepEqual([mid.visible, mid.enter, mid.leave, mid.lift, mid.name, mid.line], [true, 1, 0, 1, true, true]);
});
test('sides alternate and every image is listed once', () => {
  assert.deepEqual(shots.map(s => s.side), [1, -1, 1, -1, 1, -1, 1, -1, 1]);
  assert.equal(new Set(images).size, images.length);
});
