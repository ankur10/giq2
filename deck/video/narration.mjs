// The GrowthIQ 2.0 video: one spoken line per beat. The voice sets the length of each beat.
//   text: the line as spoken.  at: seconds into the beat at which it starts (default 0.5).
export {VOICE} from '../../stage/narration.mjs';
export const lines = {
  open: {text: 'Monday. Chevron’s strategy lead has until Friday to answer one question.', at: 1},
  ask: {text: 'What is our next big move, and does it set us apart by 2035?', at: 1.6},
  answer: {text: 'She gets a position. A clear recommendation, with the numbers behind it.', at: 0.9},
  sources: {text: 'She can defend it. Every figure is traced to its source.', at: 0.8},
  assumptions: {text: 'And she can see where it might break. Two assumptions carry the whole case.', at: 0.8},
  interviews: {text: 'So on Tuesday she tests them, with a panel of AI experts.', at: 0.8},
  experts: {text: 'The hardest one goes to a human analyst.', at: 0.8},
  opportunities: {text: 'By Wednesday the answer is a shortlist. Each opportunity sized, with the case for winning it.', at: 0.8},
  studio: {text: 'Agents build the rest. A market model. A company profile. A SWOT analysis.', at: 0.9},
  field: {text: 'All of it grounded in her markets, her competitors and her customers.', at: 0.8},
  work: {text: 'On Friday it is all in one place. And GrowthIQ keeps watching.', at: 0.8},
  close: {text: 'GrowthIQ 2.0. We see growth before it happens.', at: 1.4},
};
