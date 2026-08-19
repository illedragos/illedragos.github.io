import { useEffect, useRef, useState } from "react";

/**
 * Latches true once the element is meaningfully on screen.
 *
 * Deliberately threshold-free. An intersection *ratio* is visible-area over
 * total-area, so an element taller than the viewport can never reach a high
 * ratio — a 2400px section in a 600px viewport tops out at 25% — and a
 * `threshold: 0.3` observer on it simply never fires. That silently left whole
 * sections un-animated on phones. A bottom root-margin triggers on position
 * instead, which is height-independent.
 */
export function useInView<T extends Element>(
  rootMargin = "0px 0px -12% 0px"
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Ancient WebViews without the API: just show the content.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
