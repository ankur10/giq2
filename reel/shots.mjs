// The showcase reel as data: which product screens appear, in what order, and what is said
// about each. Images are captures of the product screens; regions.json records where the
// named parts of each capture sit, as fractions of the image.
import regions from './regions.json' with {type: 'json'};

export const BPM = 100;
export const BEAT = 60 / BPM;
const INTRO = 8, SHOT = 8, WALL = 8, CLOSE = 8;

// crop: the part of the capture shown as the card (null for the whole screen).
// focus: the part that lifts off the card towards the viewer.
const list = [
  {id: 'radar', image: 'radar', crop: 'mail', focus: 'story-0', name: 'Radar', line: 'What moved overnight, in your inbox.'},
  {id: 'briefing', image: 'briefing', crop: null, focus: 'relevance', name: 'Your Briefing', line: 'Not just the news. What it means for you.'},
  {id: 'markets', image: 'markets', crop: null, focus: 'inspector', name: 'Markets', line: 'Every market around your business, sized.'},
  {id: 'competitors', image: 'competitors', crop: null, focus: 'presence', name: 'Competitors', line: 'Who is already there.'},
  {id: 'benchmark', image: 'benchmark', crop: null, focus: 'chart', name: 'Benchmarking', line: 'How you compare.'},
  {id: 'answer', image: 'answer', crop: null, focus: 'answer', name: 'Ask GrowthIQ', line: 'Ask the question. Get the answer, with its evidence.'},
  {id: 'expert', image: 'expert', crop: null, focus: 'expert-form', name: 'Ask Domain Expert', line: 'When the question needs a person.'},
  {id: 'customers', image: 'customers', crop: null, focus: 'customer-list', name: 'Customers', line: 'Which of your customers are moving.'},
  {id: 'studio', image: 'studio', crop: null, focus: 'starts', name: 'Intelligence Studio', line: 'From an answer to a finished work product.'},
];
const whole = [0, 0, 1, 1];
export const shots = list.map((shot, i) => ({...shot, from: INTRO + i * SHOT, to: INTRO + (i + 1) * SHOT, side: i % 2 ? -1 : 1,
  cropRect: shot.crop ? regions[shot.image][shot.crop] : whole, focusRect: regions[shot.image][shot.focus]}));
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
