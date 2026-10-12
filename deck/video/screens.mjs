// The product screens the GrowthIQ 2.0 videos are built from, and how each one is shown.
// A story (stories/<name>/shots.mjs) puts these in order and gives each beat its line.
//   min: seconds the picture needs, whatever the line's length.
//   screen: an image in ../assets/video/, with its size in pixels.
//   panels: regions of that image [x, y, width, height] that lift off it, `at` seconds into the beat
//     (`grow`: how much larger a lifted panel becomes; 0.09 unless given).
//   overs: further screens that arrive over the first, each in its own `box` on the stage.
//   label: the name of the product screen, shown above it.   stamp: the time or day, top right.
export const QUESTION = 'What’s our next big move, and does it make Chevron different from ExxonMobil in 2035?';

export const clock = {kind: 'clock', time: '6:42', day: 'Monday', note: ['GrowthIQ', '5 new signals in your briefing']};
export const briefings = {label: 'My Briefings', screen: 'briefings', size: [2000, 1080], panels: [{rect: [50, 285, 1945, 375], at: 1.6}]};
export const ask = {kind: 'question', label: 'Ask GrowthIQ'};
export const answer = {label: 'Ask GrowthIQ · Answer', screen: 'answer', size: [2000, 868], panels: [{rect: [30, 257, 1960, 180], at: 1.6}, {rect: [30, 472, 1960, 165], at: 4}, {rect: [30, 673, 1960, 120], at: 6.2}],
  overs: [{screen: 'framework', size: [544, 740], label: 'Apply a framework', at: 8, box: {left: 1230, top: 190, width: 500, height: 680}}]};
export const sources = {label: 'Sources', screen: 'sources', size: [2000, 1058], panels: [{rect: [20, 300, 1650, 60], at: 1.4}, {rect: [90, 508, 1556, 492], at: 3}]};
export const assumptions = {label: 'Assumptions', screen: 'assumptions', size: [1360, 560], panels: [{rect: [0, 100, 1360, 60], at: 1.4}, {rect: [0, 179, 1360, 160], at: 3.2}, {rect: [0, 381, 1360, 160], at: 6}]};
export const interviews = {label: 'Synthetic Interviews', screen: 'interviews', size: [2000, 1080], panels: [{rect: [136, 579, 496, 104], at: 1.6}, {rect: [1230, 425, 706, 655], at: 4}]};
// The same screen, held on the line that promises a verdict for each assumption.
export const verdict = {label: 'Synthetic Interviews', screen: 'interviews', size: [2000, 1080], panels: [{rect: [1262, 828, 640, 74], at: 1, grow: 0.5}]};
export const experts = {label: 'Ask Domain Experts', screen: 'experts', size: [2000, 1080], panels: [{rect: [56, 212, 1325, 307], at: 2}]};
export const opportunities = {label: 'Growth Opportunities', screen: 'opportunities', size: [1290, 560], panels: [{rect: [0, 101, 1290, 114], at: 1.4}, {rect: [0, 218, 1290, 116], at: 3.4}, {rect: [1077, 54, 213, 506], at: 5.6}]};
// For a shortlist that has been re-ranked: a later row rises in place of the first.
export const reshuffled = {...opportunities, panels: [{rect: [0, 101, 1290, 114], at: 1.2}, {rect: [0, 446, 1290, 114], at: 3.2}]};
export const studio = {label: 'Intelligence Studio', screen: 'studio', size: [2000, 1102], panels: [{rect: [56, 222, 635, 262], at: 1.4}, {rect: [60, 738, 1936, 128], at: 3.4}, {rect: [60, 882, 1936, 121], at: 5.2}, {rect: [60, 1018, 1936, 84], at: 7}]};
export const field = {kind: 'trio', screens: [['markets', 'Markets'], ['competitors', 'Competitors'], ['customers', 'Customers']]};
export const work = {label: 'My Work', screen: 'work', size: [2000, 1096], panels: [{rect: [0, 330, 2000, 150], at: 1.6}],
  overs: [{screen: 'tracker', size: [556, 552], label: 'Tracker', at: 4, box: {left: 1250, top: 330, width: 520, height: 516}}]};
export const close = {kind: 'close'};
