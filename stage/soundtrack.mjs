// Sound for the narrated demo: the voice-over, one file per step, over a quiet generated bed.
// The bed uses the film's instruments (film/sound.mjs) and stays well under the voice.
import {compose, toWav, TAIL} from '../film/sound.mjs';
import {BEAT} from '../film/score.mjs';
import {startTimes} from './narration.mjs';

export const MUSIC_LEVEL = 1.3, VOICE_LEVEL = 0.85;
const D2 = 38, Bb2 = 46, C3 = 48, D3 = 50, F3 = 53, G3 = 55, A3 = 57, C4 = 60, D4 = 62, E4 = 64, F4 = 65, Fs4 = 66, A4 = 69, D5 = 74, E5 = 76, Fs5 = 78, A5 = 81;
// One chord per act, so the bed moves with the story: unsettled at first, resolved at the close.
const CHORDS = [[D3, A3, F4], [Bb2, F3, D4], [F3, C4, A4], [C3, G3, E4], [D3, A3, F4], [F3, C4, A4], [D3, A3, Fs4, A4]];
const STEP_NOTES = [D4, F4, A4, C4 + 12, D5, A4, F4, E4];

// Everything the bed plays, in the film engine's units (beats of 0.6s) so it can be composed.
export function music(script) {
  const starts = startTimes(script), end = starts.at(-1) + script.at(-1).duration, beats = seconds => seconds / BEAT;
  const list = [{kind: 'room', at: 0, to: beats(end)}];
  const add = (kind, seconds, more = {}) => list.push({kind, at: beats(seconds), ...more});
  const acts = [...new Set(script.map(s => s.act))];
  acts.forEach(act => {
    const first = script.findIndex(s => s.act === act), last = script.findLastIndex(s => s.act === act);
    const from = starts[first], to = starts[last] + script[last].duration;
    list.push({kind: 'pad', at: beats(from), to: beats(to - 0.6), notes: CHORDS[act % CHORDS.length], gain: 0.07, attack: 4, release: 3});
  });
  // A soft note as each step begins, and a low thump for each document that lands.
  script.forEach((step, i) => add('pluck', starts[i] + 0.15, {note: STEP_NOTES[i % STEP_NOTES.length], gain: 0.085}));
  const at = id => starts[script.findIndex(s => s.id === id)];
  [1.6, 5.6, 9.6].forEach(offset => add('thump', at('build') + offset));
  // The three-note motif: left open at the notification and the answer, resolved at the close.
  [[at('notify') + 0.3, E5], [at('answer') + 2.5, E5], [at('end') + 1.9, Fs5]].forEach(([seconds, lastNote]) => [D5, A5, lastNote].forEach((note, i) => add('bell', seconds + i * 0.3, {note, gain: 0.16})));
  add('bell', at('end') + 1.9, {note: D2 + 24, gain: 0.12});
  return list.sort((a, b) => a.at - b.at);
}

// Fetches every voice file once. Decoding is done per audio context, since it consumes the bytes.
let files = null;
export function loadVoices(script) {
  files ??= Promise.all(script.filter(s => s.voice).map(async s => [s.id, await (await fetch(`assets/stage/voice/${s.id}.m4a`)).arrayBuffer()])).then(Object.fromEntries);
  return files;
}
async function schedule(ctx, start, script) {
  const bytes = await loadVoices(script), starts = startTimes(script);
  const voice = ctx.createGain(); voice.gain.value = VOICE_LEVEL; voice.connect(ctx.destination);
  await Promise.all(script.map(async (step, i) => {
    if (!bytes[step.id]) return;
    const source = ctx.createBufferSource(); source.buffer = await ctx.decodeAudioData(bytes[step.id].slice(0));
    source.connect(voice); source.start(start + starts[i] + step.voiceAt);
  }));
  return {voice, music: compose(ctx, ctx.destination, start, music(script), MUSIC_LEVEL)};
}

// Starts voice and bed on a live context; resolves with the moment (on the context's clock) the demo begins.
export async function play(ctx, script) {
  const start = ctx.currentTime + 0.6;
  const mix = await schedule(ctx, start, script);
  return {start, mix};
}
export const totalSeconds = script => script.reduce((sum, step) => sum + step.duration, 0);
// The whole soundtrack as a WAV file, for an exported video.
export async function render(script, sampleRate = 44100) {
  const ctx = new OfflineAudioContext(2, Math.ceil((totalSeconds(script) + TAIL) * sampleRate), sampleRate);
  await schedule(ctx, 0, script);
  return toWav(await ctx.startRendering());
}
