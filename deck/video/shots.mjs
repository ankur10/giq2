// The GrowthIQ 2.0 video, beat by beat: what is on screen while each line is spoken.
//   min: seconds the picture needs, whatever the line's length.
//   screen: an image in ../assets/video/, with its size in pixels.
//   panels: regions of that image [x, y, width, height] that lift off it, `at` seconds into the beat.
//   label: the name of the product screen, shown above it.
import {lines} from './narration.mjs';

export const QUESTION = 'What’s our next big move, and does it make Chevron different from ExxonMobil in 2035?';
export const beats = [
  {id: 'open', min: 7, kind: 'title', words: 'Every growth decision starts with a question.'},
  {id: 'ask', min: 9, kind: 'question', label: 'Ask GrowthIQ'},
  {id: 'answer', min: 12, label: 'Ask GrowthIQ · Answer', screen: 'answer', size: [1360, 650], panels: [{rect: [16, 101, 1328, 154], at: 2.2}, {rect: [16, 276, 1328, 116], at: 6}]},
  {id: 'sources', min: 9, label: 'Sources', screen: 'sources', size: [2000, 1084], panels: [{rect: [80, 499, 1570, 503], at: 2.4}]},
  {id: 'assumptions', min: 11, label: 'Assumptions', screen: 'assumptions', size: [1360, 560], panels: [{rect: [0, 179, 1360, 160], at: 2.2}, {rect: [0, 381, 1360, 160], at: 5.6}]},
  {id: 'interviews', min: 10, label: 'Synthetic Interviews', screen: 'interviews', size: [2000, 1080], panels: [{rect: [136, 579, 496, 104], at: 2.4}, {rect: [1230, 425, 706, 655], at: 5}]},
  {id: 'experts', min: 7, label: 'Ask Domain Experts', screen: 'experts', size: [2000, 1080], panels: []},
  {id: 'opportunities', min: 11, label: 'Growth Opportunities', screen: 'opportunities', size: [1360, 560], panels: [{rect: [0, 101, 1360, 114], at: 2.4}, {rect: [1081, 54, 204, 506], at: 6}]},
  {id: 'studio', min: 12, label: 'Intelligence Studio', screen: 'studio', size: [2000, 1102], panels: [{rect: [60, 738, 1936, 128], at: 3.2}, {rect: [60, 882, 1936, 121], at: 5.2}, {rect: [60, 1018, 1936, 84], at: 7}]},
  {id: 'field', min: 9, kind: 'trio', screens: [['markets', 'Markets'], ['competitors', 'Competitors'], ['customers', 'Customers']]},
  {id: 'work', min: 9, label: 'My Work', screen: 'work', size: [2000, 1096], panels: [], over: {screen: 'tracker', label: 'Tracker', at: 3.6}},
  {id: 'close', min: 8, kind: 'close'},
];

// Each beat with its place in time: as long as its line needs, and never less than its picture needs.
export function timeline(voice) {
  let start = 0;
  return beats.map(beat => {
    const line = lines[beat.id], voiceAt = line.at ?? 0.5, spoken = voice[beat.id] ?? 0;
    const duration = Math.round(Math.max(beat.min, voiceAt + spoken + 1) * 10) / 10, placed = {...beat, text: line.text, voiceAt, voice: spoken, start, duration};
    start = Math.round((start + duration) * 10) / 10;
    return placed;
  });
}
export const TAIL = 2;   // seconds the last picture holds after the final beat
