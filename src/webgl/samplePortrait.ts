export interface PointCloud {
  positions: Float32Array;
  colors: Float32Array;
  randoms: Float32Array;
  count: number;
}

/**
 * Turns an image into a 3D point cloud: one particle per sampled pixel, laid out
 * on the XY plane with Z lifted by that pixel's luminance so the photo gains
 * relief.
 *
 * Particles are weighted by *local contrast* rather than raw brightness. A
 * defocused background has almost no gradient, so it dims and falls back, while
 * eyes, glasses and the plaid shirt light up — the face stays legible instead of
 * drowning in a blown-out wall behind it.
 */
export function samplePortrait(
  image: HTMLImageElement,
  targetWidth = 200,
  spread = 1.62,
  depth = 0.62
): PointCloud | null {
  const aspect = image.naturalWidth / image.naturalHeight;
  const w = targetWidth;
  const h = Math.max(1, Math.round(targetWidth / aspect));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(image, 0, 0, w, h);

  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, w, h).data;
  } catch {
    // Cross-origin image would taint the canvas; caller falls back to a plain <img>.
    return null;
  }

  // Luminance plane, then a Sobel pass over it for local contrast.
  const lum = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const p = i * 4;
    lum[i] =
      (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2]) / 255;
  }

  const at = (x: number, y: number) =>
    lum[Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))];

  const edge = new Float32Array(w * h);
  let edgeMax = 1e-6;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const gx =
        at(x - 1, y - 1) +
        2 * at(x - 1, y) +
        at(x - 1, y + 1) -
        (at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1));
      const gy =
        at(x - 1, y - 1) +
        2 * at(x, y - 1) +
        at(x + 1, y - 1) -
        (at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1));
      const m = Math.sqrt(gx * gx + gy * gy);
      edge[y * w + x] = m;
      if (m > edgeMax) edgeMax = m;
    }
  }

  const positions: number[] = [];
  const colors: number[] = [];
  const randoms: number[] = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / (w - 1);
      const v = y / (h - 1);

      // Soft circular crop, feathered so the rim dissolves into loose points.
      const dx = (u - 0.5) * aspect;
      const dy = v - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0.5) continue;
      if (dist > 0.44 && Math.random() < (dist - 0.44) / 0.06) continue;

      const idx = y * w + x;
      const i = idx * 4;
      const l = lum[idx];
      // Gamma-lifted contrast: 0 on flat gradients, ~1 on hard detail.
      const contrast = Math.min(1, Math.pow(edge[idx] / edgeMax, 0.55) * 1.35);

      // Blown highlights get rolled off so the wall stops shouting.
      const rolloff = 1 - 0.45 * Math.max(0, (l - 0.72) / 0.28);
      const weight = (0.44 + 0.72 * contrast) * rolloff;

      const centre = 1 - Math.min(1, dist / 0.5);
      // Brightness is biased toward the face rather than the frame centre, so
      // the high-contrast plaid shirt doesn't outshine the subject.
      const fx = (u - 0.48) * aspect;
      const fy = v - 0.34;
      const focus = 1 - Math.min(1, Math.sqrt(fx * fx + fy * fy) / 0.52);
      const vignette = 0.42 + 0.58 * focus;

      const gain = weight * vignette;
      // Points that carry no information at all aren't worth drawing.
      if (gain < 0.075) continue;

      const r = (data[i] / 255) * gain;
      const g = (data[i + 1] / 255) * gain;
      const b = (data[i + 2] / 255) * gain;

      // Relief from luminance, plus a push that seats the background further back.
      const z = (l - 0.5) * depth * (0.45 + 0.55 * contrast) + (centre - 0.62) * 0.3;

      positions.push(dx * spread, -dy * spread, z);
      colors.push(r, g, b);
      randoms.push(
        Math.random(),
        Math.random(),
        Math.min(1, 0.12 + contrast * 1.15 + Math.random() * 0.2)
      );
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    randoms: new Float32Array(randoms),
    count: positions.length / 3,
  };
}
