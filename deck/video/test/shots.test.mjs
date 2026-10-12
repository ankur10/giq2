import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {timeline} from '../timeline.mjs';

for (const story of ['morning', 'turn']) {
  const {beats, rests = []} = await import(`../stories/${story}/shots.mjs`), {lines} = await import(`../stories/${story}/narration.mjs`);
  const voice = JSON.parse(fs.readFileSync(new URL(`../stories/${story}/voice.json`, import.meta.url)));
  const placed = timeline(beats, lines, voice);

  test(`${story}: every beat has a line, and every line belongs to a beat`, () => {
    assert.deepEqual(Object.keys(lines).sort(), beats.map(b => b.id).sort());
    for (const id of Object.keys(lines)) assert.ok(voice[id] > 0, id + ' has a recorded length');
  });
  test(`${story}: each line ends before the next beat begins`, () => {
    placed.forEach((b, i) => { if (placed[i + 1]) assert.ok(b.start + b.voiceAt + b.voice + 0.5 < placed[i + 1].start, b.id); });
  });
  test(`${story}: panels lift inside their beat and inside their screen`, () => {
    for (const b of placed) for (const {rect: [x, y, w, h], at} of b.panels ?? []) {
      assert.ok(at + 1 < b.duration, b.id + ' panel lifts in time');
      assert.ok(x >= 0 && y >= 0 && x + w <= b.size[0] && y + h <= b.size[1], b.id + ' panel is on its screen');
    }
  });
  test(`${story}: the music only rests inside a beat that exists`, () => {
    for (const [id, from, length] of rests) { const b = placed.find(x => x.id === id); assert.ok(b && from + length <= b.duration + 6, id); }
  });
  test(`${story}: the video runs about two minutes`, () => {
    const total = placed.at(-1).start + placed.at(-1).duration;
    assert.ok(total > 105 && total < 130, 'total ' + total);
  });
}
