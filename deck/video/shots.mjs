// The GrowthIQ 2.0 video, beat by beat: what is on screen while each line is spoken.
//   min: seconds the picture needs, whatever the line's length.   day: where the story is in its week.
//   screen: an image in ../assets/video/, with its size in pixels.
//   panels: regions of that image [x, y, width, height] that lift off it, `at` seconds into the beat.
//   overs: further screens that arrive over the first, each in its own `box` on the stage.
//   label: the name of the product screen, shown above it.
import {lines} from './narration.mjs';

export const QUESTION = 'What’s our next big move, and does it make Chevron different from ExxonMobil in 2035?';
export const beats = [
  {id: 'open', min: 7, day: 'Monday', kind: 'title', words: 'One question. Due Friday.'},
  {id: 'ask', min: 9, day: 'Monday', kind: 'question', label: 'Ask GrowthIQ'},
  {id: 'answer', min: 12, day: 'Monday', label: 'Ask GrowthIQ · Answer', screen: 'answer', size: [2000, 868], panels: [{rect: [30, 257, 1960, 180], at: 1.6}, {rect: [30, 472, 1960, 165], at: 4}, {rect: [30, 673, 1960, 120], at: 6.2}],
    overs: [{screen: 'framework', size: [544, 740], label: 'Apply a framework', at: 8.4, box: {left: 1230, top: 190, width: 500, height: 680}}]},
  {id: 'sources', min: 9, day: 'Monday', label: 'Sources', screen: 'sources', size: [2000, 1058], panels: [{rect: [20, 300, 1650, 60], at: 1.5}, {rect: [90, 508, 1556, 492], at: 3.2}]},
  {id: 'assumptions', min: 11, day: 'Monday', label: 'Assumptions', screen: 'assumptions', size: [1360, 560], panels: [{rect: [0, 100, 1360, 60], at: 1.5}, {rect: [0, 179, 1360, 160], at: 3.4}, {rect: [0, 381, 1360, 160], at: 6.2}]},
  {id: 'interviews', min: 10, day: 'Tuesday', label: 'Synthetic Interviews', screen: 'interviews', size: [2000, 1080], panels: [{rect: [136, 579, 496, 104], at: 1.8}, {rect: [1230, 425, 706, 655], at: 4.2}]},
  {id: 'experts', min: 7, day: 'Tuesday', label: 'Ask Domain Experts', screen: 'experts', size: [2000, 1080], panels: [{rect: [56, 212, 1325, 307], at: 2.2}]},
  {id: 'opportunities', min: 11, day: 'Wednesday', label: 'Growth Opportunities', screen: 'opportunities', size: [1290, 560], panels: [{rect: [0, 101, 1290, 114], at: 1.6}, {rect: [0, 218, 1290, 116], at: 3.6}, {rect: [1077, 54, 213, 506], at: 6}]},
  {id: 'studio', min: 12, day: 'Wednesday', label: 'Intelligence Studio', screen: 'studio', size: [2000, 1102], panels: [{rect: [56, 222, 635, 262], at: 1.4}, {rect: [60, 738, 1936, 128], at: 3.4}, {rect: [60, 882, 1936, 121], at: 5.2}, {rect: [60, 1018, 1936, 84], at: 7}]},
  {id: 'field', min: 9, day: 'Wednesday', kind: 'trio', screens: [['markets', 'Markets'], ['competitors', 'Competitors'], ['customers', 'Customers']],
    overs: [{screen: 'connected', size: [800, 560], label: 'Connected markets', at: 4.6, box: {left: 600, top: 250, width: 720, height: 504}}]},
  {id: 'work', min: 9, day: 'Friday', label: 'My Work', screen: 'work', size: [2000, 1096], panels: [{rect: [0, 330, 2000, 150], at: 1.6}],
    overs: [{screen: 'tracker', size: [556, 552], label: 'Tracker', at: 4, box: {left: 1250, top: 330, width: 520, height: 516}}]},
  {id: 'close', min: 8, day: 'Friday', kind: 'close'},
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
