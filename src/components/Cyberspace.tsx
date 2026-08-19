import React, { useEffect, useRef } from "react";
import { useHackerMode } from "../context/HackerModeContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Node {
  x: number;
  y: number;
  z: number;
  pulse: number;
}

interface Edge {
  a: number;
  b: number;
}

interface Packet {
  edge: number;
  t: number;
  speed: number;
  dir: number;
}

const NODE_COUNT = 56;
const NEIGHBOURS = 3;
const FOCAL = 3.4;

/** Evenly scatters points over a sphere (Fibonacci lattice), then jitters the radius. */
function buildNodes(): Node[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const r = 0.62 + Math.random() * 0.38;
    return {
      x: Math.cos(theta) * radius * r * 1.35,
      y: y * r,
      z: Math.sin(theta) * radius * r * 1.35,
      pulse: Math.random() * Math.PI * 2,
    };
  });
}

function buildEdges(nodes: Node[]): Edge[] {
  const seen = new Set<string>();
  const edges: Edge[] = [];
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({
        j,
        d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 + (m.z - n.z) ** 2,
      }))
      .filter((c) => c.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBOURS);

    for (const c of near) {
      const key = i < c.j ? `${i}-${c.j}` : `${c.j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ a: i, b: c.j });
    }
  });
  return edges;
}

/**
 * The hero backdrop: a synthwave grid floor receding to the horizon, a drifting
 * starfield, and a neural network rotating in real 3D — every point is
 * perspective-projected by hand, no 3D library involved.
 */
const Cyberspace: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const { isHackerMode } = useHackerMode();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const accent = isHackerMode ? "0,255,150" : "14,165,233";
    const accent2 = isHackerMode ? "120,255,190" : "34,197,94";

    const nodes = buildNodes();
    const edges = buildEdges(nodes);
    const packets: Packet[] = Array.from({ length: 16 }, () => ({
      edge: (Math.random() * edges.length) | 0,
      t: Math.random(),
      speed: 0.18 + Math.random() * 0.35,
      dir: Math.random() < 0.5 ? 1 : -1,
    }));
    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
      s: Math.random(),
    }));

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = true;

    const resize = () => {
      const parent = canvas.parentElement;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent?.clientWidth || window.innerWidth;
      h = parent?.clientHeight || window.innerHeight;
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

    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // ---- grid floor ------------------------------------------------------
    const GRID_SPACING = 1.1;
    const GRID_ROWS = 26;
    const GRID_COLS = 16;
    const CAM_HEIGHT = 1.05;

    const drawGrid = (t: number) => {
      const horizon = h * 0.6;
      const f = h * 0.85;
      const offset = reducedMotion ? 0 : (t * 1.5) % GRID_SPACING;
      const halfW = GRID_COLS * GRID_SPACING * 0.5;

      ctx.lineWidth = 1;

      // Lines of constant depth marching toward the viewer.
      for (let i = 1; i <= GRID_ROWS; i++) {
        const z = i * GRID_SPACING - offset;
        if (z < 0.35) continue;
        const scale = f / z;
        const y = horizon + CAM_HEIGHT * scale;
        if (y > h + 40) continue;
        const fade = Math.max(0, 1 - z / (GRID_ROWS * GRID_SPACING)) * 0.85;
        ctx.strokeStyle = `rgba(${accent},${fade})`;
        ctx.beginPath();
        ctx.moveTo(w / 2 - halfW * scale, y);
        ctx.lineTo(w / 2 + halfW * scale, y);
        ctx.stroke();
      }

      // Rails running away from the viewer.
      const zNear = 0.42;
      const zFar = GRID_ROWS * GRID_SPACING;
      for (let c = -GRID_COLS / 2; c <= GRID_COLS / 2; c++) {
        const x = c * GRID_SPACING;
        const sNear = f / zNear;
        const sFar = f / zFar;
        const grad = ctx.createLinearGradient(
          0,
          horizon + CAM_HEIGHT * sFar,
          0,
          horizon + CAM_HEIGHT * sNear
        );
        grad.addColorStop(0, `rgba(${accent},0)`);
        grad.addColorStop(1, `rgba(${accent},0.55)`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(w / 2 + x * sFar, horizon + CAM_HEIGHT * sFar);
        ctx.lineTo(w / 2 + x * sNear, horizon + CAM_HEIGHT * sNear);
        ctx.stroke();
      }

      // Horizon bloom.
      const glow = ctx.createLinearGradient(0, horizon - 60, 0, horizon + 10);
      glow.addColorStop(0, `rgba(${accent},0)`);
      glow.addColorStop(1, `rgba(${accent},0.3)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, horizon - 60, w, 70);
    };

    // ---- 3D neural network ----------------------------------------------
    const project = (
      x: number,
      y: number,
      z: number,
      ry: number,
      rx: number,
      scale: number
    ) => {
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      let px = x * cy - z * sy;
      let pz = x * sy + z * cy;
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      let py = y * cx - pz * sx;
      pz = y * sx + pz * cx;
      const persp = FOCAL / (FOCAL - pz);
      px *= persp * scale;
      py *= persp * scale;
      return { x: w / 2 + px, y: h * 0.42 + py, depth: persp };
    };

    let last = performance.now();
    const start = last;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;

      const t = reducedMotion ? 6 : (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      pointer.current.x +=
        (pointer.current.tx - pointer.current.x) * Math.min(1, dt * 2.5);
      pointer.current.y +=
        (pointer.current.ty - pointer.current.y) * Math.min(1, dt * 2.5);

      drawGrid(t);

      // Starfield drifting behind the network.
      for (const s of stars) {
        const px = w / 2 + s.x * w * 0.55 + pointer.current.x * s.z * 26;
        const py = h * 0.42 + s.y * h * 0.5 + pointer.current.y * s.z * 18;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.7 + s.s * 9));
        ctx.fillStyle = `rgba(${accent2},${0.12 + s.z * 0.3 * tw})`;
        ctx.fillRect(px, py, 1 + s.z * 1.4, 1 + s.z * 1.4);
      }

      const scale = Math.min(w, h) * 0.33;
      const ry = t * 0.16 + pointer.current.x * 0.5;
      const rx = Math.sin(t * 0.13) * 0.22 - pointer.current.y * 0.3;

      const proj = nodes.map((n) => project(n.x, n.y, n.z, ry, rx, scale));

      // Edges first, dimmed by depth so the far side of the sphere recedes.
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = proj[e.a];
        const b = proj[e.b];
        const depth = (a.depth + b.depth) * 0.5;
        const alpha = Math.max(0, (depth - 0.72) * 0.55);
        if (alpha <= 0.005) continue;
        ctx.strokeStyle = `rgba(${accent},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Data packets riding the edges.
      for (const p of packets) {
        if (!reducedMotion) {
          p.t += p.speed * dt * p.dir;
          if (p.t > 1 || p.t < 0) {
            p.edge = (Math.random() * edges.length) | 0;
            p.dir = Math.random() < 0.5 ? 1 : -1;
            p.t = p.dir > 0 ? 0 : 1;
          }
        }
        const e = edges[p.edge];
        if (!e) continue;
        const a = proj[e.a];
        const b = proj[e.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const depth = a.depth + (b.depth - a.depth) * p.t;
        const r = Math.max(0.8, depth * 2.1);
        ctx.fillStyle = `rgba(${accent2},${Math.min(1, depth * 0.85)})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes on top, sorted so near ones overlap far ones.
      const order = proj
        .map((p, i) => ({ p, i }))
        .sort((m, n) => m.p.depth - n.p.depth);

      for (const { p, i } of order) {
        const beat = 0.6 + 0.4 * Math.sin(t * 2 + nodes[i].pulse);
        const r = Math.max(0.6, (p.depth - 0.55) * 5.2) * beat;
        if (r <= 0.2) continue;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4.5);
        g.addColorStop(0, `rgba(${accent2},${Math.min(0.9, p.depth * 0.8)})`);
        g.addColorStop(0.35, `rgba(${accent},${Math.min(0.4, p.depth * 0.3)})`);
        g.addColorStop(1, `rgba(${accent},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [isHackerMode, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

export default Cyberspace;
