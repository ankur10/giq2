// The showcase reel as data: which product screens appear, in what order, and what is said
// about each. Images are captures of the deployed product (see capture.mjs); regions.json
// records where the named parts of each capture sit, as fractions of the image, and the
// background colour behind each.
import regions from './regions.json' with {type: 'json'};

export const BPM = 100;
export const BEAT = 60 / BPM;
const INTRO = 8, SHOT = 8, WALL = 8, CLOSE = 8;

// focus: the named part of the capture that lifts off the card towards the viewer.
const list = [
  {id: 'radar', image: 'radar', focus: 'mail', name: 'Radar', line: 'What moved, in your inbox.'},
  {id: 'briefing', image: 'briefing', focus: 'reader', name: 'Your Briefing', line: 'Not just the news. What it means for you.'},
  {id: 'signals', image: 'signals', focus: 'reader', name: 'Live Signals', line: 'Every development, as it happens.'},
  {id: 'markets', image: 'markets', focus: 'inspector', name: 'Markets', line: 'Every market around your business, sized.'},
  {id: 'competitors', image: 'competitors', focus: 'presence', name: 'Competitors', line: 'Who is already there.'},
  {id: 'benchmark', image: 'benchmark', focus: 'chart', name: 'Benchmarking', line: 'How you compare.'},
  {id: 'answer', image: 'answer', focus: 'answer', name: 'Ask GrowthIQ', line: 'Ask the question. Get the answer, with its evidence.'},
  {id: 'expert', image: 'expert', focus: 'form', name: 'Ask Domain Expert', line: 'When the question needs a person.'},
  {id: 'studio', image: 'studio', focus: 'starts', name: 'Intelligence Studio', line: 'From an answer to a finished work product.'},
];
export const shots = list.map((shot, i) => ({...shot, from: INTRO + i * SHOT, to: INTRO + (i + 1) * SHOT, side: i % 2 ? -1 : 1,
  focusRect: regions[shot.image][shot.focus].rect, focusBackground: regions[shot.image][shot.focus].bg}));
export const wall = {from: INTRO + list.length * SHOT, to: INTRO + list.length * SHOT + WALL, images: Object.keys(regions)};
export const close = {from: wall.to, to: wall.to + CLOSE, mark: 'GrowthIQ', line: 'We see growth before it happens.'};
export const BEATS = close.to;
export const DURATION = BEATS * BEAT;
export const images = [...new Set([...list.map(s => s.image), ...wall.images])];

export const beatAt = seconds => Math.max(0, Math.min(BEATS, seconds / BEAT));
export const clamp = t => Math.max(0, Math.min(1, t));
export const span = (b, from, to) => clamp((b - from) / (to - from));
export const inOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const out = t => 1 - Math.pow(1 - t, 3);
export const mix = (a, b, t) => a + (b - a) * t;

// Where a shot is in its own eight beats: flying in, holding, lifting its focus, leaving.
export function phase(shot, beat) {
  const l = beat - shot.from;
  return {local: l, visible: l > -0.1 && l < SHOT + 0.1, enter: out(span(l, 0, 1.3)), leave: span(l, 7, 8) ** 2,
    lift: inOut(span(l, 3, 4.2)) * (1 - span(l, 7, 7.5)), name: l >= 1 && l < 7, line: l >= 2 && l < 7};
}
