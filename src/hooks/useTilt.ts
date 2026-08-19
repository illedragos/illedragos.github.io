import { useCallback, useRef } from "react";

interface TiltOptions {
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** How far the element lifts toward the viewer, in px. */
  lift?: number;
  perspective?: number;
}

/**
 * Mouse-driven 3D tilt. Writes the transform straight to the node (no re-render)
 * and exposes the pointer position as CSS vars so a glare layer can follow it.
 */
export function useTilt<T extends HTMLElement>({
  max = 10,
  lift = 18,
  perspective = 900,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        node.style.transform =
          `perspective(${perspective}px) ` +
          `rotateY(${(px - 0.5) * 2 * max}deg) ` +
          `rotateX(${(0.5 - py) * 2 * max}deg) ` +
          `translateZ(${lift}px)`;
        node.style.setProperty("--glare-x", `${px * 100}%`);
        node.style.setProperty("--glare-y", `${py * 100}%`);
        node.style.setProperty("--glare-opacity", "1");
      });
    },
    [max, lift, perspective]
  );

  const onPointerLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    cancelAnimationFrame(frame.current);
    node.style.transform = `perspective(${perspective}px) rotateY(0deg) rotateX(0deg) translateZ(0)`;
    node.style.setProperty("--glare-opacity", "0");
  }, [perspective]);

  return { ref, onPointerMove, onPointerLeave };
}
