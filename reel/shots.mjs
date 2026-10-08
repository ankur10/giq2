// The showcase reel as data: which product screens appear, in what order, and what is said
// about each. Images are captures of the deployed product (see capture.mjs); regions.json
// records where the named parts of each capture sit, as fractions of the image, and the
// background colour behind each.
import regions from './regions.json' with {type: 'json'};

export const BPM = 100;
export const BEAT = 60 / BPM;
const INTRO = 8, SHOT = 8, WALL = 8, CLOSE = 8;

// Each shot lifts one or two named parts of its capture towards the viewer.
//   entry: how the card arrives (from the side, rising from below, or out of the distance).
//   panels: the regions that lift, each starting `at` beats into the shot. A panel with `pan`
//   is a window onto a region too large to read at once, which slides across it.
const list = [
  {id: 'radar', image: 'radar', entry: 'side', name: 'Radar', line: 'The moves that matter, in your inbox before you ask.', panels: [{region: 'mail', at: 3}]},
  {id: 'briefing', image: 'briefing', entry: 'rise', name: 'Your Briefing', line: 'Every signal, with what it means for your business.', panels: [{region: 'index', at: 2.6}, {region: 'reader', at: 4}]},
  {id: 'signals', image: 'signals', entry: 'depth', name: 'Live Signals', line: 'Deals, launches and partnerships, as they happen.', panels: [{region: 'reader', at: 3}]},
  {id: 'markets', image: 'markets', entry: 'side', name: 'Markets', line: 'The markets around you, sized and ranked by growth.', panels: [{region: 'table', at: 2.6}, {region: 'inspector', at: 4}]},
  {id: 'competitors', image: 'competitors', entry: 'rise', name: 'Competitors', line: 'Who plays where, market by market.', panels: [{region: 'grid', at: 3, pan: {axis: 'x', view: 0.5}}]},
  {id: 'benchmark', image: 'benchmark', entry: 'depth', name: 'Benchmarking', line: 'Your rivals’ numbers, side by side.', panels: [{region: 'bars', at: 3}]},
  {id: 'answer', image: 'answer', entry: 'side', name: 'Ask GrowthIQ', line: 'A question in. A sourced answer out.', panels: [{region: 'answer', at: 3, pan: {axis: 'y', view: 0.5}}]},
  {id: 'expert', image: 'expert', entry: 'rise', name: 'Ask Domain Expert', line: 'When the question needs a person.', panels: [{region: 'form', at: 3}]},
  {id: 'studio', image: 'studio', entry: 'depth', name: 'Intelligence Studio', line: 'Models, profiles and strategies, ready to hand over.', panels: [{region: 'starts', at: 3}]},
];
export const shots = list.map((shot, i) => ({...shot, from: INTRO + i * SHOT, to: INTRO + (i + 1) * SHOT, side: i % 2 ? -1 : 1,
  panels: shot.panels.map(panel => ({...panel, rect: regions[shot.image][panel.region].rect, background: regions[shot.image][panel.region].bg}))}));
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

// Where a shot is in its own eight beats: arriving, holding, lifting its panels, leaving.
export function phase(shot, beat) {
  const l = beat - shot.from, settle = 1 - span(l, 7, 7.5);
  const lifts = shot.panels.map(panel => inOut(span(l, panel.at, panel.at + 1.2)) * settle);
  return {local: l, visible: l > -0.1 && l < SHOT + 0.1, enter: out(span(l, 0, 1.3)), leave: span(l, 7, 8) ** 2,
    lifts, lift: Math.max(...lifts), slide: inOut(span(l, 4.3, 6.9)), name: l >= 1 && l < 7, line: l >= 2 && l < 7};
}
