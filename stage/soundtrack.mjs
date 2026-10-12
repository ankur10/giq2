// Sound for the narrated demo: the voice-over, one file per step, over a generated music bed.
// The bed uses the film's instruments (film/sound.mjs) and stays under the voice.
import {compose, toWav, TAIL} from '../film/sound.mjs';
import {BEAT} from '../film/score.mjs';
import {startTimes} from './narration.mjs';

export const MUSIC_LEVEL = 1.05, VOICE_LEVEL = 0.72;
export const TEMPO = 112;
const D5 = 74, E5 = 76, Fs5 = 78, A5 = 81;
// A bright, forward-moving bed in D major: I, V, vi, IV, two bars each. Each chord is
// [bass, then the notes the pulse plays].
const D = [38, 62, 66, 69, 74], A = [33, 61, 64, 69, 73], Bm = [35, 62, 66, 71, 74], G = [31, 62, 67, 71, 74];
const PROGRESSION = [D, A, Bm, G];
const PULSE = [0, 2, 1, 3, 2, 1, 3, 2];   // which chord note each eighth of a bar plays

// The bed for any narrated piece, in the film engine's units (beats of 0.6s) so it can be composed.
// The arrangement grows with the story: chords alone at first, the pulse from `pulseFrom`, bass
// and drums from `drumsFrom`, and one held chord from `close` to `end` (all in seconds).
// `motifs` are the moments the three-note motif is left open; it resolves at the close.
// `drive` is the fuller arrangement: a kick on every beat, a backbeat, and the pulse doubled an octave up.
export function bed({end, pulseFrom, drumsFrom, close, motifs = [], thumps = [], tempo = TEMPO, drive = false}) {
  const beats = seconds => seconds / BEAT;
  const list = [{kind: 'room', at: 0, to: beats(end)}];
  const add = (kind, seconds, more = {}) => list.push({kind, at: beats(seconds), ...more});
  const beat = 60 / tempo, bar = beat * 4;
  for (let n = 0; n * bar < close; n++) {
    const from = n * bar, chord = PROGRESSION[Math.floor(n / 2) % PROGRESSION.length], [bass, ...notes] = chord;
    if (n % 2 === 0) list.push({kind: 'pad', at: beats(from), to: beats(Math.min(from + bar * 2, close) - 0.15), notes: notes.slice(0, 3), gain: 0.06, attack: 0.4, release: 0.8, bright: true});
    for (let eighth = 0; eighth < 8; eighth++) {
      const when = from + eighth * beat / 2; if (when >= close) break;
      if (when >= pulseFrom) add('pluck', when, {note: notes[PULSE[eighth]] + (n % 4 === 3 && eighth > 5 ? 12 : 0), gain: eighth % 2 ? 0.05 : 0.075});
      if (when >= drumsFrom) {
        if (eighth === 0 || eighth === 3 || eighth === 6) add('pluck', when, {note: bass + 12, gain: 0.16});
        if (eighth === 0 || eighth === 4) add('kick', when, {gain: 0.2});
        if (eighth % 2) add('hat', when, {gain: 0.028});
        if (eighth === 2 || eighth === 6) add('tick', when, {gain: drive ? 0.13 : 0.05});
        if (drive) {
          if (eighth === 2 || eighth === 6) { add('kick', when, {gain: 0.2}); add('hat', when, {gain: 0.07}); }
          if (eighth % 2 === 0) add('hat', when, {gain: 0.02});
          add('pluck', when + beat / 4, {note: notes[PULSE[(eighth + 3) % 8]] + 12, gain: 0.032});
        }
      }
    }
  }
  thumps.forEach(seconds => add('thump', seconds));
  [...motifs.map(seconds => [seconds, E5]), [close, Fs5]].forEach(([seconds, lastNote]) => [D5, A5, lastNote].forEach((note, i) => add('bell', seconds + i * 0.3, {note, gain: 0.16})));
  list.push({kind: 'pad', at: beats(close), to: beats(end), notes: [50, 57, 66, 69], gain: 0.09, attack: 0.3, release: 3, bright: true});
  add('bell', close, {note: 62, gain: 0.12});
  return list.sort((a, b) => a.at - b.at);
}
// The stage demo's bed: the pulse from the notification, drums once she is inside the product,
// a low thump for each document that lands.
export function music(script) {
  const starts = startTimes(script), end = starts.at(-1) + script.at(-1).duration;
  // Moments inside a step keep their place in the picture when the step has been quickened.
  const at = (id, offset = 0) => { const i = script.findIndex(s => s.id === id); return starts[i] + offset / (script[i].rate ?? 1); };
  return bed({end, pulseFrom: at('notify'), drumsFrom: at('briefing'), close: at('end', 1.9), motifs: [at('notify', 0.3), at('answer', 2.5)], thumps: [1.6, 5.6, 9.6].map(offset => at('build', offset))});
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
