// The film's timing as data. Everything is measured in beats; every cue lands on one.
export const BPM = 100;
export const BEAT = 60 / BPM;
export const BEATS = 160;
export const DURATION = BEATS * BEAT;

export const sections = [
  {id: 'line', from: 0, to: 8},
  {id: 'noise', from: 8, to: 32},
  {id: 'signal', from: 32, to: 48},
  {id: 'run', from: 48, to: 88},
  {id: 'stillness', from: 88, to: 120},
  {id: 'work', from: 120, to: 144},
  {id: 'close', from: 144, to: 160},
];
export const beatAt = seconds => Math.max(0, Math.min(BEATS, seconds / BEAT));
export const sectionAt = beat => sections.find(s => beat < s.to) ?? sections.at(-1);

// Words that sit on the screen itself. `place` picks a position in film.css.
export const words = [
  {id: 'moving', from: 12, to: 20, text: 'Everything is moving.', place: 'centre'},
  {id: 'atonce', from: 22, to: 30, text: 'All at once.', place: 'centre'},
  {id: 'matters', from: 34, to: 46, text: 'This one matters.', place: 'low'},
  {id: 'number', from: 80, to: 88, text: '25% a year', place: 'number'},
  {id: 'mark', from: 148, to: 154, text: 'GrowthIQ', place: 'mark'},
  {id: 'closing', from: 153, to: 160, text: 'We see growth before it happens.', place: 'closing'},
];
export const card = {from: 40, to: 47.5, text: 'A rival buys a cooling start-up.'};
// The run: the line reaches each of these on its beat. The first four are the chain of
// reasoning; the next five are product areas it passes through.
export const stops = [
  {at: 52, text: 'AI data centres run hot.', kind: 'chain'},
  {at: 56, text: 'Heat needs cooling.', kind: 'chain'},
  {at: 60, text: 'Cooling needs pumps.', kind: 'chain'},
  {at: 64, text: 'You make pumps.', kind: 'chain'},
  {at: 66, text: 'Radar', kind: 'station'},
  {at: 68, text: 'Briefing', kind: 'station'},
  {at: 70, text: 'Markets', kind: 'station'},
  {at: 72, text: 'Competitors', kind: 'station'},
  {at: 74, text: 'Customers', kind: 'station'},
];
export const climb = [78, 81, 84];
// The question clears a beat before the answer, so the two are never on screen together.
export const question = {text: 'Should we enter?', from: 96, to: 103, leave: 106.6};
export const answer = {text: 'Yes. Start with components.', from: 108, to: 120};
export const evidence = [
  {at: 112, text: 'From your briefing'}, {at: 113, text: 'From your markets'}, {at: 114, text: 'From your competitors'},
  {at: 116, text: 'One question sent to an expert'},
];
export const pages = [{at: 124, word: 'Model.'}, {at: 128, word: 'Profile.'}, {at: 132, word: 'Plan.'}];

export const clamp = t => Math.max(0, Math.min(1, t));
export const span = (b, from, to) => clamp((b - from) / (to - from));
export const inOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const out = t => 1 - Math.pow(1 - t, 3);
export const mix = (a, b, t) => a + (b - a) * t;
