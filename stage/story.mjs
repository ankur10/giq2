// Every word the audience reads. Companies are the explainer film's fictional ones.
export const beats = [
  {id: 'question', name: 'The question', duration: 10},
  {id: 'world', name: 'The world', duration: 15},
  {id: 'lenses', name: 'Three lenses', duration: 25},
  {id: 'convergence', name: 'Convergence', duration: 20},
  {id: 'brief', name: 'The brief', duration: 18},
  {id: 'pullback', name: 'Pull back', duration: 12},
];
// Seconds each lens takes in beat 3: its sweep, what it lights, then its card.
export const lensSeconds = 5;
export const question = 'Where is Ostrel’s next growth?';
export const closing = 'We see growth before it happens.';
export const lenses = [
  {id: 'markets', label: 'Markets', card: 'Bigger battery packs need fire protection, and fire protection needs new coatings.'},
  {id: 'customers', label: 'Customers', card: 'Talmir Motors: 22% electric five years ago. 70% of today’s pipeline.'},
  {id: 'competitors', label: 'Competitors', card: 'Quendra Chemicals: hiring battery engineers, filing patents, building a pilot line.'},
];
export const answer = {
  heading: 'Battery fire-protection coatings',
  summary: 'A need created in electric-vehicle battery packs is reaching coatings. One of Ostrel’s customers is already moving towards it, and a competitor is building capability for it.',
};
export const brief = [
  {title: 'Where to play', text: 'Battery fire-protection coatings for electric-vehicle packs.'},
  {title: 'Why now', text: 'Talmir Motors’ pipeline is now mostly electric.'},
  {title: 'Competitor moves', text: 'Quendra Chemicals is hiring, patenting and piloting.'},
  {title: 'Recommended decision', text: 'Investigate fit with Talmir’s new battery-pack line before the specification is set.'},
];
// Named points in the constellation. Positions are in scene units; Ostrel is the origin.
export const nodes = [
  {name: 'Ostrel', role: 'company', pos: [0, 0, 0]},
  {name: 'Battery packs', role: 'market', pos: [-6.2, 1.9, -1.2]},
  {name: 'Fire protection', role: 'market', pos: [-4.1, 0.9, 0.6]},
  {name: 'New coatings', role: 'market', pos: [-2.0, 0.3, 0.1]},
  {name: 'Electric vehicles', role: 'market', pos: [-7.4, 3.2, 0.8]},
  {name: 'Wind energy', role: 'market', pos: [5.6, 2.6, -1.4]},
  {name: 'Heat pumps', role: 'market', pos: [4.4, -2.7, 1.1]},
  {name: 'Talmir Motors', role: 'customer', pos: [2.6, 1.5, 1.4]},
  {name: 'Quendra Chemicals', role: 'competitor', pos: [1.7, -1.9, -0.9]},
];
export const path = ['Battery packs', 'Fire protection', 'New coatings', 'Ostrel'];
export const faint = ['Wind energy', 'Heat pumps'];
