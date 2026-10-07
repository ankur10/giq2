// Holds which beat is showing and how far its animation has run. Only input moves the beat,
// except in autoplay (recording) mode.
export function createDirector({beats, autoplay = false, start = 0, startProgress = 0}) {
  const last = beats.length - 1;
  let beat = Math.max(0, Math.min(last, start));
  let elapsed = startProgress * beats[beat].duration;
  const listeners = new Set();
  const state = () => ({beat, id: beats[beat].id, progress: Math.min(1, elapsed / beats[beat].duration), count: beats.length});
  const emit = () => listeners.forEach(fn => fn(state()));
  function go(target) {
    const next = Math.max(0, Math.min(last, target));
    if (next === beat) return false;
    beat = next; elapsed = 0; emit();
    return true;
  }
  return {
    state,
    next: () => go(beat + 1),
    back: () => go(beat - 1),
    jump: go,
    restart() { beat = 0; elapsed = 0; emit(); },
    tick(seconds) {
      elapsed += seconds;
      if (autoplay && beat < last && elapsed >= beats[beat].duration) go(beat + 1);
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };
}

export function actionForKey(key) {
  if (key === 'PageDown' || key === 'ArrowRight' || key === ' ') return {type: 'next'};
  if (key === 'PageUp' || key === 'ArrowLeft') return {type: 'back'};
  if (key === 'r' || key === 'R') return {type: 'restart'};
  if (key === 'f' || key === 'F') return {type: 'fullscreen'};
  if (/^[1-6]$/.test(key)) return {type: 'jump', beat: Number(key) - 1};
  return null;
}
