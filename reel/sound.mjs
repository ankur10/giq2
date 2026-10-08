// The reel's score: the same generated instruments as the film (film/sound.mjs), driven by the
// reel's own shot list. A sketch to be replaced by composed stems; the timing stays.
import {shots, wall, close, BEATS} from './shots.mjs';

const D2 = 38, Bb2 = 46, C3 = 48, D3 = 50, F3 = 53, G3 = 55, A3 = 57, C4 = 60, D4 = 62, E4 = 64, F4 = 65, Fs4 = 66, A4 = 69, D5 = 74, E5 = 76, Fs5 = 78, A5 = 81;
const CHORDS = [[D3, A3, F4], [Bb2, F3, D4], [F3, C4, A4], [C3, G3, E4]];
// One rising step per shot, so the reel climbs as it goes.
const SCALE = [D4, E4, F4, G3 + 12, A4, 72, D5, E5, 77];

// The reel is busier than the film (a thump and a kick often land together), so it plays lower.
export const LEVEL = 1.05;

export function events() {
  const list = [];
  const add = (kind, at, more = {}) => list.push({kind, at, ...more});
  add('room', 0, {to: BEATS});

  // Opening: the wordmark, the motif left open.
  add('pad', 0, {to: 8, notes: CHORDS[0], gain: 0.07, attack: 3});
  [D5, A5, E5].forEach((note, i) => add('bell', 1 + i * 0.5, {note, gain: 0.2}));
  for (let b = 4; b < 8; b++) add('kick', b, {gain: 0.08 + 0.05 * (b - 4)});

  // Nine shots: a steady pulse, a chord per shot, and a sound for each move on screen.
  shots.forEach((shot, i) => {
    add('pad', shot.from, {to: shot.to, notes: CHORDS[i % CHORDS.length], gain: 0.08, attack: 0.5, bright: true});
    for (let b = shot.from; b < shot.to; b++) { add('kick', b, {gain: 0.3}); add('hat', b + 0.5, {gain: 0.045}); }
    add('wind', shot.from - 0.2, {to: shot.from + 1.3, gain: 0.07});          // the card arriving
    add('pluck', shot.from + 1, {note: SCALE[i], gain: 0.2});                 // its name
    shot.panels.forEach((panel, n) => { add('thump', shot.from + panel.at); add('pluck', shot.from + panel.at + 0.5, {note: SCALE[i] + 12 + n * 4, gain: 0.13}); });
  });

  // Every screen at once, then the close: the motif resolved.
  add('pad', wall.from, {to: wall.to, notes: [D3, A3, F4, A4], gain: 0.09, attack: 1, bright: true});
  wall.images.forEach((_, i) => add('pluck', wall.from + i * 0.4, {note: D4 + [0, 3, 7, 10, 12, 15, 19][i % 7] + (i > 6 ? 12 : 0), gain: 0.1}));
  for (let b = wall.from; b < wall.to; b++) add('kick', b, {gain: 0.3});
  add('pad', close.from, {to: close.to - 1, notes: [D3, A3, Fs4, A4], gain: 0.1, attack: 2, release: 4});
  [D5, A5, Fs5].forEach((note, i) => add('bell', close.from + 1 + i * 0.5, {note, gain: 0.2}));
  add('bell', close.from + 1, {note: D2 + 24, gain: 0.14});
  add('kick', close.from, {gain: 0.24});
  return list.sort((a, b) => a.at - b.at);
}
