import {useEffect, useState} from 'react';
import {steps} from '../story.mjs';

export const order = id => steps.findIndex(step => step.id === id);

// True once `seconds` have passed since `active` became true; immediately when settled.
export function useAfter(active, seconds, settled) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDone(false); return; }
    if (settled) { setDone(true); return; }
    const timer = setTimeout(() => setDone(true), seconds * 1000);
    return () => clearTimeout(timer);
  }, [active, seconds, settled]);
  return active && done;
}

// Text typed one character at a time while `typing`; all of it when `complete`.
export function useTyped(text, typing, complete, perSecond = 22) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!typing) { setCount(0); return; }
    const timer = setInterval(() => setCount(n => { if (n >= text.length) clearInterval(timer); return Math.min(text.length, n + 1); }), 1000 / perSecond);
    return () => clearInterval(timer);
  }, [typing, text, perSecond]);
  return complete ? text : text.slice(0, count);
}
