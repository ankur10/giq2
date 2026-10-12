// "The answer that changed": the pitch is rigour. One assumption fails, and Maya walks into
// the board with a different answer from the one she had at seven.
//   text: the line as spoken.  at: seconds into the beat at which it starts (default 0.8).
export {VOICE} from '../../../../stage/narration.mjs';
export const lines = {
  open: {text: 'Monday, 6:42. Maya runs strategy at Chevron, and five things moved overnight.', at: 1.2},
  briefings: {text: 'On Friday she faces the board. This morning she has one question.'},
  ask: {text: 'What is our next big move, and does it set us apart by 2035?', at: 1.4},
  answer: {text: 'Minutes later she has a position. A clear recommendation, with the numbers behind it.'},
  sources: {text: 'She can defend it. Every figure is traced to its source.'},
  assumptions: {text: 'But a recommendation is only as strong as what it assumes. Two assumptions carry the whole case.'},
  interviews: {text: 'So she tests them, with a panel of AI experts.'},
  verdict: {text: 'One holds. One doesn’t.', pause: 1.1, at: 1.2},
  opportunities: {text: 'The shortlist changes.', at: 1.2},
  studio: {text: 'Agents rebuild the case around what survived. A market model. A company profile. A SWOT analysis.'},
  nine: {text: 'It is nine o’clock.', at: 1.6},
  experts: {text: 'The assumption that broke goes to a human analyst.'},
  work: {text: 'On Friday she walks in with a different answer. And she can defend every line of it.'},
  close: {text: 'GrowthIQ 2.0. We see growth before it happens.', at: 1.4},
};
