// Holds which step is showing and how long it has run. Only input moves the step,
// except in autoplay (recording) mode.
export function createDirector({steps, autoplay = false, start = 0, startProgress = 0}) {
  const last = steps.length - 1;
  let step = Math.max(0, Math.min(last, start));
  let elapsed = startProgress * steps[step].duration;
  const listeners = new Set();
  const state = () => ({step, id: steps[step].id, act: steps[step].act, seconds: Math.min(elapsed, steps[step].duration), progress: Math.min(1, elapsed / steps[step].duration), count: steps.length});
  const emit = () => listeners.forEach(fn => fn(state()));
  function go(target) {
    const next = Math.max(0, Math.min(last, target));
    if (next === step) return false;
    step = next; elapsed = 0; emit();
    return true;
  }
  const firstOf = act => steps.findIndex(s => s.act === act);
  return {
    state,
    next: () => go(step + 1),
    back: () => go(step - 1),
    jump: go,
    // Start of the next act, or the start of this act (then the previous one) going back.
    skip(direction) {
      const act = steps[step].act;
      if (direction > 0) { const target = firstOf(act + 1); return target < 0 ? false : go(target); }
      return go(step === firstOf(act) ? Math.max(0, firstOf(act - 1)) : firstOf(act));
    },
    act(index) { const target = firstOf(index); return target < 0 ? false : go(target); },
    restart() { step = 0; elapsed = 0; emit(); },
    // Puts the demo where a clock says it should be: used when sound sets the pace.
    seek(seconds) {
      let index = 0, left = Math.max(0, seconds);
      while (index < last && left >= steps[index].duration) left -= steps[index++].duration;
      const changed = index !== step;
      step = index; elapsed = left;
      if (changed) emit();
      return changed;
    },
    tick(seconds) {
      elapsed += seconds;
      if (autoplay && step < last && elapsed >= steps[step].duration) go(step + 1);
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };
}

export function actionForKey(key) {
  if (key === 'PageDown' || key === 'ArrowRight' || key === ' ') return {type: 'next'};
  if (key === 'PageUp' || key === 'ArrowLeft') return {type: 'back'};
  if (key === ']') return {type: 'skip', direction: 1};
  if (key === '[') return {type: 'skip', direction: -1};
  if (key === 'r' || key === 'R') return {type: 'restart'};
  if (key === 'f' || key === 'F') return {type: 'fullscreen'};
  if (/^[1-7]$/.test(key)) return {type: 'act', act: Number(key) - 1};
  return null;
}
