import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Props {
  /** Higher = denser, brighter rain. */
  intensity?: number;
  className?: string;
  green?: boolean;
}

const GLYPHS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF<>/\\[]{}=+*$#@!?";

interface Column {
  x: number;
  y: number;
  depth: number; // 0..1 — fakes distance: near columns are big, fast and bright
  speed: number;
  size: number;
  gap: number;
  glyph: string;
}

/**
 * Falling glyph rain with a depth axis, so columns read as layered in space
 * rather than painted flat. Trails are erased with `destination-out` instead of
 * a solid fill, which keeps the canvas transparent over the page behind it.
 */
const MatrixRain: React.FC<Props> = ({
  intensity = 1,
  className = "",
  green = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let columns: Column[] = [];
    let visible = true;

    const build = () => {
      const parent = canvas.parentElement;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width / 26) * intensity);
      columns = Array.from({ length: count }, () => {
        const depth = 0.3 + Math.random() * 0.7;
        const size = 9 + depth * 12;
        return {
          x: Math.random() * width,
          y: Math.random() * height * -1.5,
          depth,
          speed: 22 + depth * 95,
          size,
          gap: size * 1.05,
          glyph: GLYPHS[(Math.random() * GLYPHS.length) | 0],
        };
      }).sort((a, b) => a.depth - b.depth);
    };

    build();
    const ro = new ResizeObserver(build);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;

      // Erase alpha rather than painting over it, so trails fade to transparent.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${reducedMotion ? 1 : 0.1})`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      for (const col of columns) {
        if (!reducedMotion) col.y += col.speed * dt;

        if (col.y - 24 * col.gap > height) {
          col.y = -Math.random() * height * 0.5;
          col.x = Math.random() * width;
        }

        ctx.font = `${col.size}px "SFMono-Regular", Menlo, monospace`;

        // Leading glyph is the bright head; the rest are the fading tail.
        if (Math.random() < 0.35) {
          col.glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        ctx.fillStyle = green
          ? `rgba(190,255,220,${0.55 + col.depth * 0.45})`
          : `rgba(190,245,255,${0.5 + col.depth * 0.45})`;
        ctx.fillText(col.glyph, col.x, col.y);

        const tail = 3 + Math.round(col.depth * 5);
        for (let t = 1; t <= tail; t++) {
          const alpha = (1 - t / (tail + 1)) * 0.42 * col.depth;
          ctx.fillStyle = green
            ? `rgba(0,255,150,${alpha})`
            : `rgba(0,214,255,${alpha})`;
          ctx.fillText(
            GLYPHS[((col.x + col.y + t * 37) | 0) % GLYPHS.length],
            col.x,
            col.y - t * col.gap
          );
        }
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [intensity, reducedMotion, green]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default MatrixRain;
