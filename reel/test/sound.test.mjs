import test from 'node:test';
import assert from 'node:assert/strict';
import {events} from '../sound.mjs';
import {shots, wall, close, BEATS} from '../shots.mjs';

const list = events();
const starts = kind => list.filter(e => e.kind === kind).map(e => e.at);

test('every sound starts inside the reel', () => { for (const e of list) assert.ok(e.at >= -0.5 && e.at < BEATS, e.kind + ' at ' + e.at); });
test('a sound marks each panel lifting', () => {
  for (const shot of shots) for (const panel of shot.panels) assert.ok(starts('thump').includes(shot.from + panel.at), shot.id);
});
test('the pulse runs under every shot and stops for the close', () => {
  const kicks = starts('kick');
  for (let b = shots[0].from; b < wall.to; b++) assert.ok(kicks.includes(b), 'beat ' + b);
  assert.deepEqual(kicks.filter(b => b > close.from), []);
});
test('the motif opens unresolved and closes resolved', () => {
  const bells = list.filter(e => e.kind === 'bell' && e.gain === 0.2).map(e => e.note);
  assert.deepEqual([bells[2], bells[5]], [76, 78]);
});
