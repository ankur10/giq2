/** Active highlights are shared per element so repeated updates restart cleanly. */
const activeHighlights = new WeakMap();

/**
 * Briefly highlight an updated DOM element without moving it or changing its text.
 * Framework independent; no CSS, React, or animation-library dependency.
 * Call after the updated content and focus state have been applied.
 * @param {HTMLElement | null} element
 * @param {{background?: string, border?: string, duration?: number,
 *   reducedMotionDuration?: number}} [options]
 * @returns {() => void} Cancel function, suitable for React effect cleanup.
 */
export function highlightUpdate(element, options = {}) {
  const noop = () => {};
  if (!element) return noop;
  activeHighlights.get(element)?.();
  const view = element.ownerDocument?.defaultView;
  if (!view || typeof element.animate !== 'function') return noop;

  const {
    background = '#FFF2BF',
    border = '#C9AE60',
    duration = 4400,
    reducedMotionDuration = 1400,
  } = options;
  const reducedMotion = view.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const milliseconds = reducedMotion ? reducedMotionDuration : duration;
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) return noop;

  // Read the receiving app's actual focused/theme colors; never assume white.
  const style = view.getComputedStyle(element);
  const resting = {
    backgroundColor: style.backgroundColor,
    borderColor: style.borderColor,
  };
  const highlighted = { backgroundColor: background, borderColor: border };
  const animation = element.animate([
    { ...resting, offset: 0 },
    { ...highlighted, offset: 0.12 },
    { ...highlighted, offset: 0.38 },
    { ...resting, offset: 1 },
  ], { duration: milliseconds, easing: 'linear', fill: 'none' });

  const cancel = () => {
    animation.cancel();
    if (activeHighlights.get(element) === cancel) activeHighlights.delete(element);
  };
  activeHighlights.set(element, cancel);
  animation.onfinish = cancel;
  return cancel;
}
