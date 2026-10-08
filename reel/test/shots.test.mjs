import test from 'node:test';
import assert from 'node:assert/strict';
import {shots, wall, close, BEATS, DURATION, phase, images} from '../shots.mjs';

test('the reel is about a minute', () => assert.ok(DURATION > 50 && DURATION < 70, 'duration ' + DURATION));
test('shots follow one another with no gaps and start on a bar', () => {
  shots.forEach((s, i) => { assert.equal(s.from % 4, 0, s.id); if (i) assert.equal(s.from, shots[i - 1].to, s.id); });
  assert.equal(wall.from, shots.at(-1).to);
  assert.equal(close.to, BEATS);
});
test('every panel lifts a region that lies inside its capture and has a background colour', () => {
  for (const s of shots) {
    assert.ok(s.panels.length >= 1 && s.panels.length <= 2, s.id);
    for (const panel of s.panels) {
      const [x, y, w, h] = panel.rect;
      assert.ok(x >= 0 && y >= 0 && w > 0 && h > 0 && x + w <= 1.001 && y + h <= 1.001, s.id + ' ' + panel.rect);
      assert.match(panel.background, /^rgb/, s.id);
      assert.ok(panel.at >= 2 && panel.at + 1.2 <= 6, s.id + ' lifts while the card is settled');
    }
  }
});
test('a second panel lifts after the first', () => {
  for (const s of shots.filter(s => s.panels.length === 2)) {
    assert.ok(s.panels[1].at > s.panels[0].at, s.id);
    const early = phase(s, s.from + s.panels[0].at + 1.2);
    assert.ok(early.lifts[0] === 1 && early.lifts[1] < 1, s.id);
  }
});
test('the entries vary: no two neighbouring shots arrive the same way', () => {
  shots.forEach((s, i) => { assert.ok(['side', 'rise', 'depth'].includes(s.entry), s.id); if (i) assert.notEqual(s.entry, shots[i - 1].entry, s.id); });
});
test('a shot is hidden outside its eight beats and settled in the middle', () => {
  const s = shots[2];
  assert.equal(phase(s, s.from - 1).visible, false);
  assert.equal(phase(s, s.to + 1).visible, false);
  const mid = phase(s, s.from + 5);
  assert.deepEqual([mid.visible, mid.enter, mid.leave, mid.lift, mid.name, mid.line], [true, 1, 0, 1, true, true]);
  assert.ok(mid.slide > 0 && mid.slide < 1);
});
test('sides alternate and every image is listed once', () => {
  assert.deepEqual(shots.map(s => s.side), [1, -1, 1, -1, 1, -1, 1, -1, 1]);
  assert.equal(new Set(images).size, images.length);
});
