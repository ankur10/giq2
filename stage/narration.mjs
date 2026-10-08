// The narrated version of the demo: one spoken line per step, and how long each step must
// last to hold its line and finish what it shows.
//   text: the line as written.  say: the same line spelt for a speech synthesiser, where it differs.
//   at: seconds into the step at which the line starts (default 0.5).
export const VOICE = {name: 'Daniel', rate: 172};
export const lines = {
  clock: {text: 'This is Maya. She runs strategy at Norvane, a company that has made pumps for a hundred years.', say: 'This is Maya. She runs strategy at Norvane, a company that has made pumps for a hundred years.', at: 1.2},
  notify: {text: 'This is how her Tuesday starts.'},
  digest: {text: 'Three things moved overnight. She didn’t go looking. It found her.', at: 1.6},
  headline: {text: 'One of them: a rival has bought a liquid-cooling start-up.'},
  briefing: {text: 'In GrowthIQ, that isn’t just news.', say: 'In Growth I.Q., that isn’t just news.', at: 1.2},
  meaning: {text: 'It tells her why it matters to her company. AI data centres need liquid cooling, and liquid cooling runs on pumps.', say: 'It tells her why it matters to her company. A.I. data centres need liquid cooling, and liquid cooling runs on pumps.'},
  ecosystem: {text: 'So what is behind the headline? This is Norvane’s world.', at: 1.4},
  field: {text: 'A need that starts in AI data centres travels, through cooling, to exactly what Norvane makes.', say: 'A need that starts in A.I. data centres travels, through cooling, to exactly what Norvane makes.', at: 3},
  market: {text: 'Here is that market. It is growing about six times faster than her core business.', at: 1},
  presence: {text: 'Here is who is already in it. Kestrow, as of this week. Norvane is not.', at: 2.6},
  benchmark: {text: 'And here is how those rivals compare.', at: 1.2},
  question: {text: 'So she asks what she would ask her smartest analyst.', at: 2.8},
  answer: {text: 'Yes. As a component supplier first.', at: 2.9},
  sources: {text: 'With the evidence attached: everything we have just looked at.', at: 1.8},
  research: {text: 'And if she wants the full study, the scope is already drafted.', at: 2.8},
  flag: {text: 'The answer is honest about what it doesn’t know.', at: 3.2},
  expert: {text: 'Some questions need a person. One click, and it is with an expert.', at: 1.6},
  customers: {text: 'And it isn’t theoretical. One of Norvane’s own customers is already building data centres.', at: 2.6},
  studio: {text: 'Now she turns thinking into something she can hand over.', at: 2.6},
  brief: {text: 'Her question and its context come with her.', at: 3},
  build: {text: 'A market model. A profile of Kestrow. A market-entry strategy.', say: 'A market model. [[slnc 1900]] A profile of Kestrow. [[slnc 1900]] A market-entry strategy.', at: 2.2},
  pack: {text: 'By nine o’clock, she has what used to take weeks.', at: 1.6},
  tracker: {text: 'And she asks it to keep watching.', at: 1.2},
  morning: {text: 'One morning. One decision.', at: 1.6},
  end: {text: 'GrowthIQ. We see growth before it happens.', say: 'Growth I.Q. [[slnc 500]] We see growth before it happens.', at: 2.2},
};

// The demo's steps with each duration replaced by what narration needs: long enough for the
// line (plus a breath after it), and never shorter than the step's own visuals (`min`).
export function narratedSteps(steps, voice) {
  return steps.map(step => {
    const line = lines[step.id], spoken = voice[step.id] ?? 0, at = line?.at ?? 0.5;
    return {...step, voiceAt: at, voice: spoken, duration: Math.round(Math.max(step.min ?? 5, at + spoken + 0.9) * 10) / 10};
  });
}
// When each step starts, in seconds from the beginning.
export const startTimes = steps => steps.reduce((times, step, i) => [...times, i ? times[i - 1] + steps[i - 1].duration : 0], []);
