/** GLSL ES 1.00 — kept in WebGL1 dialect so the effect runs on every device. */

export const PORTRAIT_VERT = `
precision highp float;

attribute vec3 a_pos;    // x, y in image space; z from pixel luminance
attribute vec3 a_col;    // source pixel colour
attribute vec3 a_rnd;    // per-particle noise: scatter dir, delay, size jitter

uniform float u_time;
uniform vec2  u_mouse;     // -1..1, eased pointer position
uniform float u_scatter;   // 0..1 dissolve amount
uniform float u_reveal;    // 0..1 assemble-on-scroll progress
uniform float u_aspect;    // canvas width / height
uniform float u_size;      // base point size in device pixels

varying vec3  v_col;
varying float v_alpha;
varying float v_scan;

mat3 rotY(float a) {
  float s = sin(a), c = cos(a);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

mat3 rotX(float a) {
  float s = sin(a), c = cos(a);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

void main() {
  vec3 p = a_pos;

  // Slow breathing ripple so the surface never sits perfectly still.
  p.z += 0.018 * sin(u_time * 1.1 + p.y * 7.0 + p.x * 3.0);

  // A scan band sweeps bottom-to-top, lifting and igniting the points it crosses.
  float scanY = fract(u_time * 0.17) * 1.9 - 0.95;
  float scan = smoothstep(0.05, 0.0, abs(p.y - scanY));
  p.z += scan * 0.09;

  // Dissolve direction: outward from the plane, biased toward the viewer.
  vec3 dir = normalize(a_rnd * 2.0 - 1.0 + vec3(0.0, 0.0, 0.65));
  p += dir * u_scatter * (0.35 + a_rnd.x * 1.5);

  // Assemble-in: each point flies home on its own staggered schedule.
  float rv = clamp((u_reveal - a_rnd.y * 0.4) / 0.6, 0.0, 1.0);
  rv = rv * rv * (3.0 - 2.0 * rv);
  p = mix(p + dir * 2.4, p, rv);

  // Idle drift plus pointer parallax.
  p = rotX(-u_mouse.y * 0.42 + cos(u_time * 0.19) * 0.07) *
      (rotY(u_mouse.x * 0.65 + sin(u_time * 0.23) * 0.17) * p);

  // Manual perspective divide — closer points spread out and grow.
  float focal = 2.6;
  float w = focal / (focal - p.z);

  gl_Position = vec4(p.x * w / u_aspect, p.y * w, 0.0, 1.0);
  gl_PointSize = u_size * w * (0.72 + a_rnd.z * 0.6) * (1.0 + scan * 0.85);

  v_col = a_col;
  v_scan = scan;
  v_alpha = clamp(w * 0.62, 0.22, 1.0) * rv * (1.0 - u_scatter * 0.4);
}
`;

export const PORTRAIT_FRAG = `
precision mediump float;

varying vec3  v_col;
varying float v_alpha;
varying float v_scan;

uniform float u_hacker;   // 0 = holo cyan, 1 = phosphor green

void main() {
  // Carve each square point into a soft round dot.
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25) discard;
  float a = smoothstep(0.25, 0.015, d);

  vec3 col = v_col;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));

  // Push the photo toward a cool holographic read, then optionally to green CRT.
  vec3 holo = mix(vec3(0.08, 0.55, 0.82) * lum * 2.1, col * 1.7, 0.45)
            + vec3(0.0, 0.42, 0.68) * lum;
  vec3 phosphor = vec3(lum * 0.22, lum * 1.95, lum * 0.68);

  col = mix(holo, phosphor, u_hacker);
  col += mix(vec3(0.25, 0.95, 1.0), vec3(0.3, 1.0, 0.55), u_hacker) * v_scan * 0.3;

  gl_FragColor = vec4(col, a * v_alpha);
}
`;
