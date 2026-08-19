import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Eases a number from 0 up to `target` once `active` turns true. */
export function useCountUp(target: number, active: boolean, delay = 0) {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start = 0;
    const duration = 1100;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo — fast out of the gate, settles precisely on the value.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, active, delay, reducedMotion]);

  return value;
}
