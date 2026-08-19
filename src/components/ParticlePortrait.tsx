import React, { useEffect, useRef, useState } from "react";
import { PORTRAIT_FRAG, PORTRAIT_VERT } from "../webgl/portraitShaders";
import { bindAttrib, link, makeBuffer } from "../webgl/glUtils";
import { samplePortrait } from "../webgl/samplePortrait";
import { useHackerMode } from "../context/HackerModeContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Props {
  src: string;
  alt: string;
}

/**
 * The photo, rebuilt in WebGL as ~25k free-floating particles: luminance becomes
 * depth, the pointer orbits the cloud, and a click blows it apart before it
 * reassembles. Falls back to the original <img> if WebGL is unavailable.
 */
const ParticlePortrait: React.FC<Props> = ({ src, alt }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  const { isHackerMode } = useHackerMode();
  const reducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [pointCount, setPointCount] = useState(0);

  // Live values the render loop reads without forcing React re-renders.
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scatter = useRef({ value: 0, hover: 0, burst: 0 });
  const hackerTarget = useRef(0);
  const inView = useRef(false);

  useEffect(() => {
    hackerTarget.current = isHackerMode ? 1 : 0;
  }, [isHackerMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const gl = (canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      setFailed(true);
      return;
    }

    let raf = 0;
    let disposed = false;
    let program: WebGLProgram | null = null;
    const buffers: WebGLBuffer[] = [];

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    let cleanupExtras: (() => void) | null = null;

    const image = new Image();
    image.src = src;

    image.onerror = () => setFailed(true);
    image.onload = () => {
      if (disposed) return;

      // Fewer particles on phones — the cloud still reads, the GPU cost drops ~50%.
      const cloud = samplePortrait(
        image,
        window.innerWidth < 640 ? 140 : 200
      );
      if (!cloud || cloud.count === 0) {
        setFailed(true);
        return;
      }
      setPointCount(cloud.count);

      program = link(gl, PORTRAIT_VERT, PORTRAIT_FRAG);
      if (!program) {
        setFailed(true);
        return;
      }

      const posBuf = makeBuffer(gl, cloud.positions);
      const colBuf = makeBuffer(gl, cloud.colors);
      const rndBuf = makeBuffer(gl, cloud.randoms);
      if (!posBuf || !colBuf || !rndBuf) {
        setFailed(true);
        return;
      }
      buffers.push(posBuf, colBuf, rndBuf);

      gl.useProgram(program);
      bindAttrib(gl, program, "a_pos", posBuf, 3);
      bindAttrib(gl, program, "a_col", colBuf, 3);
      bindAttrib(gl, program, "a_rnd", rndBuf, 3);

      const u = {
        time: gl.getUniformLocation(program, "u_time"),
        mouse: gl.getUniformLocation(program, "u_mouse"),
        scatter: gl.getUniformLocation(program, "u_scatter"),
        reveal: gl.getUniformLocation(program, "u_reveal"),
        aspect: gl.getUniformLocation(program, "u_aspect"),
        size: gl.getUniformLocation(program, "u_size"),
        hacker: gl.getUniformLocation(program, "u_hacker"),
      };

      // Additive blending is what sells the hologram: overlapping points bloom.
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      let dpr = 1;
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const { clientWidth: cw, clientHeight: ch } = wrap;
        canvas.width = Math.max(1, Math.round(cw * dpr));
        canvas.height = Math.max(1, Math.round(ch * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      const io = new IntersectionObserver(
        ([entry]) => {
          inView.current = entry.isIntersecting;
        },
        { threshold: 0.15 }
      );
      io.observe(wrap);

      let reveal = 0;
      let hacker = isHackerMode ? 1 : 0;
      let nextGlitch = 4000 + Math.random() * 5000;
      let last = performance.now();
      const start = last;
      let frames = 0;
      let fpsClock = last;

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;

        // Idle offscreen rather than burning GPU on an invisible canvas.
        if (!inView.current) return;

        const elapsed = (now - start) / 1000;

        reveal = Math.min(1, reveal + dt / (reducedMotion ? 0.01 : 1.6));
        hacker += (hackerTarget.current - hacker) * Math.min(1, dt * 6);

        // Random micro-glitch: the cloud stutters apart for a beat.
        if (!reducedMotion && now - start > nextGlitch) {
          scatter.current.burst = Math.max(scatter.current.burst, 0.055);
          nextGlitch = now - start + 4000 + Math.random() * 6000;
        }
        scatter.current.burst *= Math.pow(0.02, dt);
        const scatterTarget = Math.max(
          scatter.current.hover,
          scatter.current.burst
        );
        scatter.current.value +=
          (scatterTarget - scatter.current.value) * Math.min(1, dt * 9);

        pointer.current.x +=
          (pointer.current.tx - pointer.current.x) * Math.min(1, dt * 4);
        pointer.current.y +=
          (pointer.current.ty - pointer.current.y) * Math.min(1, dt * 4);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(u.time, reducedMotion ? 0 : elapsed);
        gl.uniform2f(u.mouse, pointer.current.x, pointer.current.y);
        gl.uniform1f(u.scatter, scatter.current.value);
        gl.uniform1f(u.reveal, reveal);
        gl.uniform1f(u.aspect, canvas.width / canvas.height);
        gl.uniform1f(u.size, 1.75 * dpr * (canvas.width / 640));
        gl.uniform1f(u.hacker, hacker);

        gl.drawArrays(gl.POINTS, 0, cloud.count);

        frames++;
        if (readoutRef.current && now - fpsClock > 500) {
          readoutRef.current.textContent = `${Math.round(
            (frames * 1000) / (now - fpsClock)
          )} fps`;
          frames = 0;
          fpsClock = now;
        }
      };
      raf = requestAnimationFrame(frame);

      cleanupExtras = () => {
        ro.disconnect();
        io.disconnect();
      };
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanupExtras?.();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      buffers.forEach((b) => gl.deleteBuffer(b));
      if (program) gl.deleteProgram(program);
      // Deliberately not calling loseContext(): the context belongs to this
      // canvas element, and StrictMode's double-mount would hand the remount a
      // permanently dead context.
    };
    // Re-running this would rebuild the whole cloud; the loop reads live refs instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  if (failed) {
    return (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-full ring-4 ring-primary-500/20"
      />
    );
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        scatter.current.hover = 0.015;
      }}
      onPointerLeave={() => {
        scatter.current.hover = 0;
        pointer.current.tx = 0;
        pointer.current.ty = 0;
      }}
      onPointerDown={() => {
        // Not a full 1.0 — a ghost of the silhouette should survive the blast.
        scatter.current.burst = 0.6;
      }}
      className="holo-chamber group relative aspect-square w-full cursor-crosshair overflow-hidden rounded-2xl"
      role="img"
      aria-label={alt}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* HUD: corner brackets, sweeping scan line, telemetry */}
      <span className="holo-bracket holo-bracket--tl" />
      <span className="holo-bracket holo-bracket--tr" />
      <span className="holo-bracket holo-bracket--bl" />
      <span className="holo-bracket holo-bracket--br" />
      <span className="holo-scanline" />

      <div className="holo-hud holo-hud--top">
        <span className="holo-dot" />
        SUBJECT: D.ILLE
      </div>
      <div className="holo-hud holo-hud--bottom">
        <span>PTS {pointCount.toLocaleString("en-US")}</span>
        <span ref={readoutRef}>-- fps</span>
      </div>

      <div className="holo-hint">click to destabilise</div>
    </div>
  );
};

export default ParticlePortrait;
