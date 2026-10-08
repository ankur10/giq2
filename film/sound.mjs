// The film's score, generated in code. `events()` lists everything that sounds, in beats;
// `compose()` plays that list on any Web Audio context, live or offline. It is a working
// sketch: a composer's stems can replace the bed, and the timing stays as it is.
import {BEAT, BEATS, stops, climb, question, answer, evidence, pages} from './score.mjs';

const hz = note => 440 * 2 ** ((note - 69) / 12);
// MIDI note numbers.
const D2 = 38, Bb2 = 46, C3 = 48, D3 = 50, F3 = 53, G3 = 55, A3 = 57, C4 = 60, D4 = 62, E4 = 64, F4 = 65, Fs4 = 66, A4 = 69, C5 = 72, D5 = 74, E5 = 76, F5 = 77, Fs5 = 78, G5 = 79, A5 = 81, C6 = 84, D6 = 86;
// The note the line sounds as it reaches each stop of the run, then each step of the climb.
const RUN = [F4, A4, C5, D5, E5, F5, G5, A5, C6], CLIMB = [C6, C6 + 1, D6];
export const LEVEL = 1.35;
export const TAIL = 3;   // seconds the last chord rings after the picture ends

export function events() {
  const list = [];
  const add = (kind, at, more = {}) => list.push({kind, at, ...more});

  add('room', 0, {to: BEATS});
  // The three-note motif: left open twice, resolved at the close.
  [[32, E5], [answer.from, E5], [153, Fs5]].forEach(([at, last]) => [D5, A5, last].forEach((note, i) => add('bell', at + i * 0.5, {note, gain: 0.2})));

  // Noise: a wind that swells with the field, and a heartbeat that builds under it.
  add('wind', 8, {to: 32, gain: 0.13});
  add('wind', 32, {to: 46, gain: 0.03});
  for (let b = 16; b < 32; b++) add('kick', b, {gain: 0.05 + 0.2 * (b - 16) / 16});
  add('pad', 8, {to: 32, notes: [D3, A3, F4], gain: 0.07, attack: 8});

  // Signal: one hit, then space.
  add('kick', 32, {gain: 0.6});
  add('pad', 32, {to: 48, notes: [Bb2, F3, D4], gain: 0.09, attack: 0.3});
  for (let b = 34; b < 48; b += 2) add('kick', b, {gain: 0.18});

  // The run: drive, a chord change every two bars, and a note as the line reaches each stop.
  [[48, [D3, A3, F4]], [56, [Bb2, F3, D4]], [64, [F3, C4, A4]], [72, [C3, G3, E4]], [80, [D3, A3, F4, A4]]].forEach(([at, notes]) => add('pad', at, {to: at + 8, notes, gain: 0.085, attack: 0.5, bright: true}));
  for (let b = 48; b < 88; b++) { add('kick', b, {gain: 0.34}); add('hat', b + 0.5, {gain: 0.05}); }
  stops.forEach((stop, i) => add('pluck', stop.at, {note: RUN[i], gain: 0.2}));
  climb.forEach((at, i) => add('pluck', at, {note: CLIMB[i], gain: 0.22}));

  // Stillness: only the keys, then nothing at all, then the answer.
  [...question.text].forEach((_, i) => add('tick', question.from + i * (question.to - question.from) / question.text.length, {gain: 0.06}));
  add('pad', answer.from, {to: answer.to, notes: [Bb2, F3, A3, D4], gain: 0.085, attack: 1});
  evidence.forEach((item, i) => add('pluck', item.at, {note: [F5, G5, A5, D6][i], gain: 0.15}));

  // Work: the pulse returns and each page lands on a bar.
  [[120, [F3, C4, A4]], [128, [C3, G3, E4]], [136, [D3, A3, F4]]].forEach(([at, notes]) => add('pad', at, {to: at + 8, notes, gain: 0.08, attack: 0.5}));
  for (let b = 120; b < 144; b++) { add('kick', b, {gain: 0.28}); add('hat', b + 0.5, {gain: 0.04}); }
  pages.forEach(page => add('thump', page.at));
  add('wind', 135, {to: 137.5, gain: 0.06});

  // Close: resolved, thinning, a last pulse, then the tail.
  add('pad', 144, {to: 159, notes: [D3, A3, Fs4, A4], gain: 0.1, attack: 3, release: 4});
  add('bell', 153, {note: D2 + 24, gain: 0.14});
  add('kick', 144, {gain: 0.22}); add('kick', 148, {gain: 0.18});

  // The line's own voice: one tone whose pitch follows the line's height. [beat, note, gain]
  add('voice', 0, {points: [
    [0, D4, 0], [1.2, D4, 0.05], [4.1, D4, 0.05], [4.5, A4, 0.07], [5, D4, 0.05], [10, D4, 0.05], [20, D4, 0.012], [31.9, D4, 0.012],
    [32, D4, 0.1], [32.35, D6, 0.1], [33.6, D5, 0.07], [44, D5, 0.05], [48, D4, 0.05],
    ...stops.flatMap((stop, i) => [[stop.at - 0.35, RUN[Math.max(0, i - 1)], 0.05], [stop.at, RUN[i], 0.06]]),
    [78, C6, 0.06], [84, D6, 0.07], [88, D6, 0.06], [92, D4, 0],
    [108.4, A4, 0], [108.6, A4, 0.04], [111.5, D5, 0.04], [116, D5, 0],
    [144, D4, 0], [144.3, D4, 0.04], [148, A4, 0.04], [152, A4, 0.035], [156, D4, 0.04], [156.9, D4, 0.04], [157.3, A4, 0.06], [157.8, D4, 0.04], [159, D4, 0.03], [160, D4, 0],
  ]});
  return list.sort((a, b) => a.at - b.at);
}

export function compose(ctx, destination, start, list = events(), level = LEVEL) {
  const t = beat => start + beat * BEAT;
  const master = ctx.createGain(); master.gain.value = level;
  const limiter = ctx.createDynamicsCompressor(); limiter.threshold.value = -9; limiter.ratio.value = 6; limiter.attack.value = 0.004; limiter.release.value = 0.2;
  master.connect(limiter).connect(destination);
  // A generated room: decaying noise as the impulse response.
  const reverb = ctx.createConvolver(), length = Math.floor(ctx.sampleRate * 2.8), impulse = ctx.createBuffer(2, length, ctx.sampleRate);
  let seed = 7; const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 * 2 - 1; };
  for (let c = 0; c < 2; c++) { const data = impulse.getChannelData(c); for (let i = 0; i < length; i++) data[i] = random() * (1 - i / length) ** 3; }
  reverb.buffer = impulse;
  const wet = ctx.createGain(); wet.gain.value = 0.22; reverb.connect(wet).connect(master);
  const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  { const data = noise.getChannelData(0); for (let i = 0; i < data.length; i++) data[i] = random(); }
  const noiseSource = (at, to) => { const s = ctx.createBufferSource(); s.buffer = noise; s.loop = true; s.start(at); s.stop(to); return s; };
  // A gain that rises to `peak` and falls away, wired to the dry mix and optionally the room.
  const envelope = (at, peak, attack, decay, send = 0) => {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(peak, at + attack); g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
    g.connect(master); if (send) { const s = ctx.createGain(); s.gain.value = send; g.connect(s).connect(reverb); }
    return g;
  };
  const osc = (type, frequency, at, to) => { const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(frequency, at); o.start(at); o.stop(to); return o; };

  for (const e of list) {
    const at = t(e.at);
    if (e.kind === 'room') { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 380; const g = ctx.createGain(); g.gain.value = 0.012; noiseSource(at, t(e.to) + TAIL).connect(f).connect(g).connect(master); }
    if (e.kind === 'wind') {
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 620; f.Q.value = 0.6;
      const g = ctx.createGain(), end = t(e.to); g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(e.gain, at + (end - at) * 0.85); g.gain.linearRampToValueAtTime(0.0001, end);
      noiseSource(at, end + 0.05).connect(f).connect(g).connect(master);
    }
    if (e.kind === 'kick') { const o = osc('sine', 115, at, at + 0.4); o.frequency.exponentialRampToValueAtTime(44, at + 0.13); o.connect(envelope(at, e.gain, 0.004, 0.3)); }
    if (e.kind === 'hat') { const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000; noiseSource(at, at + 0.08).connect(f).connect(envelope(at, e.gain, 0.002, 0.05)); }
    if (e.kind === 'tick') { const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 3400; f.Q.value = 1.4; noiseSource(at, at + 0.05).connect(f).connect(envelope(at, e.gain, 0.001, 0.025)); }
    if (e.kind === 'thump') { const o = osc('sine', 96, at, at + 0.5); o.frequency.exponentialRampToValueAtTime(48, at + 0.2); o.connect(envelope(at, 0.4, 0.004, 0.36)); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900; noiseSource(at, at + 0.2).connect(f).connect(envelope(at, 0.1, 0.002, 0.12, 0.3)); }
    if (e.kind === 'pluck') { osc('triangle', hz(e.note), at, at + 1.2).connect(envelope(at, e.gain, 0.004, 0.7, 0.5)); }
    if (e.kind === 'bell') { const g = envelope(at, e.gain, 0.006, 2.6, 0.8); osc('sine', hz(e.note), at, at + 3).connect(g); const over = ctx.createGain(); over.gain.value = 0.18; osc('sine', hz(e.note) * 2, at, at + 3).connect(over).connect(g); }
    if (e.kind === 'pad') {
      const end = t(e.to), attack = (e.attack ?? 1) * BEAT, release = (e.release ?? 1.5) * BEAT;
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = e.bright ? 1500 : 900; f.Q.value = 0.4;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(e.gain, at + attack); g.gain.setValueAtTime(e.gain, end); g.gain.linearRampToValueAtTime(0.0001, end + release);
      f.connect(g); g.connect(master); const s = ctx.createGain(); s.gain.value = 0.5; g.connect(s).connect(reverb);
      for (const note of e.notes) for (const cents of [-7, 7]) { const o = osc('sawtooth', hz(note), at, end + release + 0.1); o.detune.value = cents; const each = ctx.createGain(); each.gain.value = 0.5 / e.notes.length; o.connect(each).connect(f); }
    }
    if (e.kind === 'voice') {
      const last = e.points.at(-1)[0], o = osc('sine', hz(e.points[0][1]), at, t(last) + 0.1), g = ctx.createGain();
      g.gain.setValueAtTime(0, at);
      for (const [beat, note, gain] of e.points) { o.frequency.exponentialRampToValueAtTime(hz(note), t(beat) + 0.0001); g.gain.linearRampToValueAtTime(gain, t(beat) + 0.0001); }
      o.connect(g); g.connect(master); const s = ctx.createGain(); s.gain.value = 0.6; g.connect(s).connect(reverb);
    }
  }
  return master;
}

// The whole score rendered to a 16-bit stereo WAV, for putting under an exported video.
export async function renderWav(sampleRate = 44100, list = events(), beats = BEATS, level = LEVEL) {
  const ctx = new OfflineAudioContext(2, Math.ceil((beats * BEAT + TAIL) * sampleRate), sampleRate);
  compose(ctx, ctx.destination, 0, list, level);
  return toWav(await ctx.startRendering());
}

// An audio buffer as a 16-bit stereo WAV file.
export function toWav(buffer) {
  const sampleRate = buffer.sampleRate, frames = buffer.length, view = new DataView(new ArrayBuffer(44 + frames * 4));
  const text = (offset, s) => [...s].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)));
  text(0, 'RIFF'); view.setUint32(4, 36 + frames * 4, true); text(8, 'WAVEfmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 2, true);
  view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 4, true); view.setUint16(32, 4, true); view.setUint16(34, 16, true); text(36, 'data'); view.setUint32(40, frames * 4, true);
  const left = buffer.getChannelData(0), right = buffer.getChannelData(buffer.numberOfChannels > 1 ? 1 : 0);
  for (let i = 0; i < frames; i++) { view.setInt16(44 + i * 4, Math.max(-1, Math.min(1, left[i])) * 32767, true); view.setInt16(46 + i * 4, Math.max(-1, Math.min(1, right[i])) * 32767, true); }
  return new Blob([view.buffer], {type: 'audio/wav'});
}
