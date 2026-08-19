import React, { useEffect, useRef } from "react";
import { useHackerMode } from "../context/HackerModeContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

export interface OrbitBody {
  name: string;
  icon: string;
  level: number;
  hue: number;
}

interface Props {
  bodies: OrbitBody[];
  onHover: (index: number | null) => void;
  hovered: number | null;
}

const CAM_TILT = 0.45; // radians — flattens the orbital plane into ellipses
const FOCAL = 5.2;
const TRAIL = 16;

interface Orbit {
  radius: number;
  speed: number;
  inclination: number;
  node: number;
  phase: number;
}

/**
 * The hobbies rendered as an orbital system: each interest circles a core on its
 * own inclined orbit, projected with a real perspective divide and depth-sorted
 * so bodies pass visibly behind the core. Stronger interests orbit tighter and
 * faster, the way a closer body actually would.
 */
const HobbyOrbit: React.FC<Props> = ({ bodies, onHover, hovered }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef<number | null>(hovered);
  const screenPos = useRef<{ x: number; y: number; r: number }[]>([]);
  const { isHackerMode } = useHackerMode();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const orbits: Orbit[] = bodies.map((b, i) => {
      const radius = 1.62 - (b.level / 100) * 0.86;
      return {
        radius,
        // Keplerian-ish: tighter orbits sweep faster.
        speed: 0.34 / Math.pow(radius, 1.5),
        inclination: (i % 2 === 0 ? 1 : -1) * (0.1 + (i % 3) * 0.075),
        node: (i / bodies.length) * Math.PI * 2,
        phase: (i / bodies.length) * Math.PI * 2 + i * 0.7,
      };
    });

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = true;

    const resize = () => {
      const parent = canvas.parentElement;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent?.clientWidth || 600;
      h = parent?.clientHeight || 400;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // World position for body `i` at orbital angle `a`, projected to screen.
    const project = (o: Orbit, a: number, cx: number, cy: number, s: number) => {
      let x = Math.cos(a) * o.radius;
      let z = Math.sin(a) * o.radius;
      let y = 0;

      // Inclination, then the ascending node, then the camera tilt.
      const ci = Math.cos(o.inclination);
      const si = Math.sin(o.inclination);
      const y1 = y * ci - z * si;
      const z1 = y * si + z * ci;
      y = y1;
      z = z1;

      const cn = Math.cos(o.node);
      const sn = Math.sin(o.node);
      const x2 = x * cn - z * sn;
      const z2 = x * sn + z * cn;
      x = x2;
      z = z2;

      const ct = Math.cos(CAM_TILT);
      const st = Math.sin(CAM_TILT);
      const y3 = y * ct - z * st;
      const z3 = y * st + z * ct;

      const persp = FOCAL / (FOCAL - z3);
      return {
        x: cx + x * persp * s,
        y: cy + y3 * persp * s,
        z: z3,
        persp,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      let best: number | null = null;
      let bestDist = Infinity;
      screenPos.current.forEach((p, i) => {
        const d = Math.hypot(p.x - px, p.y - py);
        if (d < Math.max(30, p.r * 1.9) && d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (best !== hoveredRef.current) {
        hoveredRef.current = best;
        onHover(best);
      }
    };
    const onPointerLeave = () => {
      if (hoveredRef.current !== null) {
        hoveredRef.current = null;
        onHover(null);
      }
    };
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    let last = performance.now();
    const start = last;
    const angles = orbits.map((o) => o.phase);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;

      const t = reducedMotion ? 4 : (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const s = Math.min(w / 3.4, h / 1.7);
      // Bodies shrink with the system so a phone-sized map doesn't turn into
      // overlapping blobs; labels drop out entirely once there's no room.
      const bodyScale = Math.max(0.55, Math.min(1, s / 230));
      const showLabels = s > 130;
      const hot = hoveredRef.current;

      // --- orbit paths, alpha graded by depth so the near arc reads closer ---
      const SAMPLES = 56;
      orbits.forEach((o, i) => {
        const hue = isHackerMode ? 152 : bodies[i].hue;
        const emphasis = hot === i ? 1 : hot === null ? 0.55 : 0.22;
        ctx.lineWidth = hot === i ? 1.6 : 1;
        let prev = project(o, 0, cx, cy, s);
        for (let k = 1; k <= SAMPLES; k++) {
          const a = (k / SAMPLES) * Math.PI * 2;
          const p = project(o, a, cx, cy, s);
          const depth = (p.z + prev.z) * 0.5;
          const alpha = (0.1 + Math.max(0, depth + 1.6) * 0.13) * emphasis;
          ctx.strokeStyle = `hsla(${hue}, 90%, 65%, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          prev = p;
        }
      });

      // --- advance and place the bodies -----------------------------------
      const placed = orbits.map((o, i) => {
        if (!reducedMotion) {
          // Hovered body eases to a near-stop so it can be read.
          angles[i] += o.speed * dt * (hot === i ? 0.12 : 1);
        }
        const p = project(o, angles[i], cx, cy, s);
        const size = (7 + (bodies[i].level / 100) * 10) * p.persp * bodyScale;
        return { ...p, i, size };
      });

      screenPos.current = placed.map((p) => ({ x: p.x, y: p.y, r: p.size }));

      // Core sits at z = 0; sorting everything together gives real occlusion.
      const coreHue = isHackerMode ? 152 : 190;
      const drawables: { z: number; draw: () => void }[] = placed.map((p) => ({
        z: p.z,
        draw: () => {
          const b = bodies[p.i];
          const hue = isHackerMode ? 152 : b.hue;
          const focused = hot === p.i;
          const dim = hot === null || focused ? 1 : 0.32;

          // Comet trail along the orbit behind the body.
          for (let k = TRAIL; k > 0; k--) {
            const tp = project(
              orbits[p.i],
              angles[p.i] - k * 0.045,
              cx,
              cy,
              s
            );
            const a = (1 - k / TRAIL) * 0.32 * dim;
            ctx.fillStyle = `hsla(${hue}, 92%, 68%, ${a})`;
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, p.size * 0.22 * (1 - k / TRAIL) + 0.6, 0, 7);
            ctx.fill();
          }

          const glow = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 2.6
          );
          glow.addColorStop(0, `hsla(${hue}, 95%, 70%, ${0.85 * dim})`);
          glow.addColorStop(0.42, `hsla(${hue}, 92%, 55%, ${0.28 * dim})`);
          glow.addColorStop(1, `hsla(${hue}, 90%, 50%, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.6, 0, 7);
          ctx.fill();

          ctx.fillStyle = `hsla(${hue}, 30%, 8%, ${0.85 * dim})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, 7);
          ctx.fill();

          ctx.strokeStyle = `hsla(${hue}, 95%, ${focused ? 80 : 65}%, ${dim})`;
          ctx.lineWidth = focused ? 2 : 1.2;
          ctx.stroke();

          ctx.globalAlpha = dim;
          ctx.font = `${p.size * 1.15}px "Apple Color Emoji", "Segoe UI Emoji", system-ui`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(b.icon, p.x, p.y + p.size * 0.06);

          if (showLabels || focused) {
            ctx.font = `600 ${Math.max(10, p.size * 0.6)}px ui-monospace, "SFMono-Regular", Menlo, monospace`;
            ctx.shadowColor = "rgba(0,0,0,0.85)";
            ctx.shadowBlur = 6;
            ctx.fillStyle = `hsla(${hue}, 90%, ${focused ? 88 : 72}%, ${dim})`;
            ctx.fillText(
              focused ? `${b.name.toUpperCase()} ${b.level}%` : b.name,
              p.x,
              p.y + p.size * 2.3
            );
            ctx.shadowBlur = 0;
          }
          ctx.globalAlpha = 1;
        },
      }));

      drawables.push({
        z: 0,
        draw: () => {
          const beat = 1 + Math.sin(t * 1.6) * 0.06;
          const r = s * 0.15 * beat;

          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.4);
          g.addColorStop(0, `hsla(${coreHue}, 95%, 76%, 0.7)`);
          g.addColorStop(0.3, `hsla(${coreHue}, 92%, 58%, 0.24)`);
          g.addColorStop(1, `hsla(${coreHue}, 90%, 50%, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 2.4, 0, 7);
          ctx.fill();

          // Two counter-rotating rings give the core its own volume.
          for (let k = 0; k < 2; k++) {
            const spin = t * (k ? -0.5 : 0.7) + k * 1.1;
            ctx.strokeStyle = `hsla(${coreHue}, 95%, 72%, ${0.5 - k * 0.18})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.ellipse(
              cx,
              cy,
              r * (1.5 + k * 0.42),
              r * (1.5 + k * 0.42) * Math.abs(Math.sin(spin)) * 0.55 + 2,
              0,
              0,
              7
            );
            ctx.stroke();
          }

          ctx.fillStyle = `hsla(${coreHue}, 100%, 92%, 0.9)`;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 0.3, 0, 7);
          ctx.fill();
        },
      });

      drawables.sort((a, b) => a.z - b.z).forEach((d) => d.draw());
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [bodies, isHackerMode, reducedMotion, onHover]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-crosshair"
      role="img"
      aria-label="Orbital map of hobbies and interests"
    />
  );
};

export default HobbyOrbit;
