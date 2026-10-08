// The narrated version of the demo: one spoken line per step, and how long each step must
// last to hold its line and finish what it shows.
//   text: the line as spoken.  pause: seconds of silence to leave between its sentences.
//   at: seconds into the step at which the line starts (default 0.5).
// tempo: the model speaks slowly for a demo this tight, so its speech is quickened a little (pitch kept).
export const VOICE = {model: 'gpt-4o-mini-tts', voice: 'ash', tempo: 1.1, instructions: 'A calm, warm, confident narrator for a product keynote. British English. Brisk, conversational pace with only short pauses between sentences. Clear, natural, understated; no salesman energy.'};
export const lines = {
  clock: {text: 'Meet Maya. She runs strategy at Norvane, a pump maker.', at: 0.6},
  notify: {text: 'This is how her Tuesday starts.'},
  digest: {text: 'Three things moved overnight. They found her.', at: 1},
  headline: {text: 'One: a rival has bought a liquid-cooling start-up.'},
  briefing: {text: 'In GrowthIQ, that isn’t just news.', at: 0.6},
  meaning: {text: 'It says why it matters: AI data centres need liquid cooling, and cooling runs on pumps.'},
  ecosystem: {text: 'This is Norvane’s world.', at: 1.4},
  field: {text: 'A need that starts in AI data centres travels straight to what Norvane makes.', at: 3},
  market: {text: 'That market is growing about six times faster than her core business.', at: 0.6},
  presence: {text: 'Kestrow is already in it. Norvane is not.', at: 1.8},
  benchmark: {text: 'And here is how those rivals compare.', at: 1.2},
  question: {text: 'So she asks what she would ask her smartest analyst.', at: 2.8},
  answer: {text: 'Yes. As a component supplier first.', at: 2.9},
  sources: {text: 'With the evidence attached: everything we have just looked at.', at: 1.8},
  research: {text: 'The full study is already scoped.', at: 2.8},
  flag: {text: 'And it is honest about what it doesn’t know.', at: 2.8},
  expert: {text: 'Some questions need a person. One click, and it is with an expert.', at: 1.6},
  customers: {text: 'One of Norvane’s own customers is already building data centres.', at: 2.6},
  studio: {text: 'Now she turns thinking into work.', at: 2.2},
  brief: {text: 'Her question comes with her.', at: 3},
  build: {text: 'A market model. A profile of Kestrow. A market-entry strategy.', pause: 1.6, at: 2.2},
  pack: {text: 'By nine, she has what used to take weeks.', at: 1.2},
  tracker: {text: 'And she asks it to keep watching.', at: 1.2},
  morning: {text: 'One morning. One decision.', at: 1.6},
  end: {text: 'GrowthIQ. We see growth before it happens.', pause: 0.3, at: 2.2},
};

// The demo's steps with each duration replaced by what narration needs: long enough for the
// line (plus a breath after it), and never shorter than the step's own visuals (`min`).
export function narratedSteps(steps, voice) {
  return steps.map(step => {
    const line = lines[step.id], spoken = voice[step.id] ?? 0, at = line?.at ?? 0.5;
    return {...step, voiceAt: at, voice: spoken, duration: Math.round(Math.max(step.min ?? 5, at + spoken + 0.9) * 10) / 10};
  });
}
// The narrated steps with the picture run faster (`speed` times) while the voice keeps its own
// pace: each step shrinks as far as its line allows. `rate` is how much faster that step's
// picture ends up running, between 1 and `speed`.
export function quickened(script, speed) {
  return script.map(step => {
    const voiceAt = step.voiceAt / speed;
    const duration = Math.round(Math.max(step.duration / speed, step.voice ? voiceAt + step.voice + 0.6 : 0) * 10) / 10;
    return {...step, voiceAt, duration, rate: step.duration / duration};
  });
}
// When each step starts, in seconds from the beginning.
export const startTimes = steps => steps.reduce((times, step, i) => [...times, i ? times[i - 1] + steps[i - 1].duration : 0], []);
