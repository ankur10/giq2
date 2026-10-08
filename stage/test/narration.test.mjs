import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {lines, narratedSteps, quickened, startTimes} from '../narration.mjs';
import {steps} from '../story.mjs';
import {music} from '../soundtrack.mjs';

const voice = JSON.parse(fs.readFileSync(new URL('../voice.json', import.meta.url)));
const script = narratedSteps(steps, voice);

test('every step has a line, and every line belongs to a step', () => {
  assert.deepEqual(Object.keys(lines).sort(), steps.map(s => s.id).sort());
  for (const id of Object.keys(lines)) assert.ok(voice[id] > 0, id + ' has a recorded length');
});
test('each narrated step is long enough for its line and for its own visuals', () => {
  for (const s of script) {
    assert.ok(s.duration >= s.voiceAt + s.voice + 0.8, s.id + ' holds its line');
    assert.ok(s.duration >= (steps.find(x => x.id === s.id).min ?? 5), s.id + ' finishes its visuals');
  }
});
test('lines never overlap: each one ends before the next step begins', () => {
  const starts = startTimes(script);
  script.forEach((s, i) => { if (i < script.length - 1) assert.ok(starts[i] + s.voiceAt + s.voice < starts[i + 1], s.id); });
});
test('the narrated demo runs between three and four and a half minutes', () => {
  const total = script.reduce((sum, s) => sum + s.duration, 0);
  assert.ok(total > 180 && total < 270, 'total ' + total);
});
test('the bed marks every step and resolves its motif only at the close', () => {
  const list = music(script);
  assert.equal(list.filter(e => e.kind === 'pluck').length, script.length);
  const bells = list.filter(e => e.kind === 'bell' && e.gain === 0.16).map(e => e.note);
  assert.deepEqual([bells[2], bells[5], bells[8]], [76, 76, 78]);
  assert.equal(list.filter(e => e.kind === 'kick').length, 0, 'no drum under the voice');
});
test('quickening the picture never squeezes a line or runs a step faster than asked', () => {
  const fast = quickened(script, 1.5), starts = startTimes(fast);
  fast.forEach((s, i) => {
    assert.ok(s.rate >= 1 && s.rate <= 1.52, s.id + ' rate ' + s.rate);
    if (i < fast.length - 1) assert.ok(starts[i] + s.voiceAt + s.voice + 0.5 < starts[i + 1], s.id + ' holds its line');
  });
  assert.ok(fast.reduce((sum, s) => sum + s.duration, 0) < script.reduce((sum, s) => sum + s.duration, 0) * 0.82);
});
