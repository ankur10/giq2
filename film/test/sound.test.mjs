import test from 'node:test';
import assert from 'node:assert/strict';
import {events} from '../sound.mjs';
import {BEATS, question, answer, stops, pages} from '../score.mjs';

const list = events();
const starts = kind => list.filter(e => e.kind === kind).map(e => e.at);

test('every sound starts inside the film, in order', () => {
  for (const e of list) assert.ok(e.at >= 0 && e.at < BEATS, e.kind + ' at ' + e.at);
  assert.deepEqual(list.map(e => e.at), [...list.map(e => e.at)].sort((a, b) => a - b));
});
test('the bar before the answer is silent apart from the room', () => {
  const quiet = list.filter(e => e.kind !== 'room' && e.kind !== 'voice' && e.at >= question.to && e.at < answer.from);
  assert.deepEqual(quiet, []);
  const pads = list.filter(e => e.kind === 'pad' && e.at < answer.from && e.to > question.from);
  assert.deepEqual(pads, [], 'no pad sounds through the question');
});
test('the motif is heard three times and only the last one resolves', () => {
  const bells = list.filter(e => e.kind === 'bell' && e.gain === 0.2).map(e => e.note);
  assert.equal(bells.length, 9);
  assert.deepEqual([bells[2], bells[5], bells[8]], [76, 76, 78]);
});
test('a note sounds as the line reaches each stop, and a thump as each page lands', () => {
  for (const stop of stops) assert.ok(starts('pluck').includes(stop.at), stop.text);
  assert.deepEqual(starts('thump'), pages.map(p => p.at));
});
test('one key sounds for each character typed', () => assert.equal(starts('tick').length, question.text.length));
test('the drive sits on every beat of the run and stops when it ends', () => {
  const kicks = starts('kick');
  for (let b = 48; b < 88; b++) assert.ok(kicks.includes(b), 'beat ' + b);
  assert.ok(!kicks.some(b => b >= 88 && b < 120), 'nothing through the stillness');
});
