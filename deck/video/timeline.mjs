// Each beat with its place in time: as long as its line needs, and never less than its picture needs.
export function timeline(beats, lines, voice) {
  let start = 0;
  return beats.map(beat => {
    const line = lines[beat.id], voiceAt = line.at ?? 0.8, spoken = voice[beat.id] ?? 0;
    const duration = Math.round(Math.max(beat.min, voiceAt + spoken + 1) * 10) / 10, placed = {...beat, text: line.text, voiceAt, voice: spoken, start, duration};
    start = Math.round((start + duration) * 10) / 10;
    return placed;
  });
}
export const TAIL = 2;   // seconds the last picture holds after the final beat
