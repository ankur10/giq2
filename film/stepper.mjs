// Lets an export script step a piece one frame at a time instead of recording it live, so the
// exported video is frame-exact and its sound cannot drift from its picture.
// CSS transitions run on wall time, so each one is paused when first seen and then moved by hand
// to wherever the stepped clock says it should be.
export function installStepper(setTime) {
  const born = new WeakMap(), frame = () => new Promise(requestAnimationFrame);
  window.seekTo = async seconds => {
    setTime(seconds);
    await frame(); await frame(); await frame();       // clock read, React update, paint
    for (const animation of document.getAnimations()) {
      if (!born.has(animation)) { born.set(animation, seconds); animation.pause(); }
      animation.currentTime = Math.max(0, (seconds - born.get(animation)) * 1000);
    }
    await frame();
  };
}
