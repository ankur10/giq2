// The GrowthIQ 2.0 video: one spoken line per beat. The voice sets the length of each beat.
//   text: the line as spoken.  at: seconds into the beat at which it starts (default 0.5).
export {VOICE} from '../../stage/narration.mjs';
export const lines = {
  open: {text: 'Every growth decision starts with a question.', at: 1.2},
  ask: {text: 'This one is Chevron’s. What is our next big move, and does it set us apart by 2035?', at: 0.6},
  answer: {text: 'GrowthIQ answers with a position. A clear recommendation, and the size of the prize behind it.', at: 0.8},
  sources: {text: 'Every figure is traced to its source, down to the table it came from.'},
  assumptions: {text: 'And it tells you what it is assuming. What it takes as true, and what changes if it is wrong.'},
  interviews: {text: 'So test it. Put those assumptions in front of a panel of AI experts, and get a verdict on each one.'},
  experts: {text: 'Or ask a human analyst, when the question needs a person.'},
  opportunities: {text: 'The answer becomes a set of opportunities. Each one sized, with the case for why you can win it.'},
  studio: {text: 'Then agents do the building. A market model. A company profile. A SWOT analysis.'},
  field: {text: 'All of it grounded in your markets, your competitors and your customers.'},
  work: {text: 'Your work is kept in one place. And GrowthIQ keeps watching.'},
  close: {text: 'GrowthIQ 2.0. We see growth before it happens.', at: 1.4},
};
