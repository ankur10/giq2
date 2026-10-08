import test from 'node:test';
import assert from 'node:assert/strict';
import {BEATS, DURATION, sections, words, card, stops, climb, question, answer, evidence, pages, beatAt, sectionAt} from '../score.mjs';

test('the film is 40 bars, about a minute and a half', () => {
  assert.equal(BEATS, 160);
  assert.ok(DURATION > 90 && DURATION < 120);
});
test('sections tile the film with no gaps, each starting on a bar', () => {
  assert.equal(sections[0].from, 0);
  assert.equal(sections.at(-1).to, BEATS);
  sections.forEach((s, i) => { assert.equal(s.from % 4, 0, s.id); if (i) assert.equal(s.from, sections[i - 1].to, s.id); });
});
test('time maps to beats and sections', () => {
  assert.equal(beatAt(0), 0);
  assert.equal(beatAt(6), 10);
  assert.equal(beatAt(1e6), BEATS);
  assert.equal(sectionAt(0).id, 'line');
  assert.equal(sectionAt(48).id, 'run');
  assert.equal(sectionAt(159.9).id, 'close');
});
test('every cue is inside the film and starts on a beat', () => {
  const starts = [...words.map(w => w.from), card.from, ...stops.map(s => s.at), ...climb, question.from, answer.from, ...evidence.map(e => e.at), ...pages.map(p => p.at)];
  for (const b of starts) { assert.ok(b >= 0 && b < BEATS, 'in range ' + b); assert.equal(b % 1, 0, 'on a beat ' + b); }
});
test('stops are reached in order', () => {
  const order = [...stops.map(s => s.at), ...climb];
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
});
