/**
 * generate-fingerprints.mjs — procedurally generate the Exhibit 4 fingerprints
 * for the State v. Reed mock-trial case.
 *
 * Method (SFinGe-style synthetic fingerprints):
 *   1. Build a ridge ORIENTATION FIELD with a zero-pole (Sherlock–Monro) model:
 *      one loop core + one delta → a realistic loop flow.
 *   2. Grow ridges by iteratively convolving a seeded noise image with a Gabor
 *      filter aligned to the local orientation, binarizing between passes. After
 *      a few passes, continuous, naturally-spaced ridges emerge — with real
 *      minutiae (endings/bifurcations) — that follow the flow.
 *   3. The base ridge pattern is generated ONCE and shared, so all three prints
 *      "match"; only the per-print wear (dropouts, partial regions, contrast)
 *      changes which areas survive.
 *
 * Outputs (transparent PNG, dark ridges):
 *   exhibit-4-latent-a.png   — recovered latent A
 *   exhibit-4-latent-b.png   — recovered latent B (same finger, worn elsewhere)
 *   exhibit-4-reed-thumb.png — Reed's known right-thumb roll (clean, complete)
 *
 * Re-run any time:  node scripts/generate-fingerprints.mjs
 */

import sharp from "sharp";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const outDir = join(projectRoot, "public/images/mocktrial");

// ── Canvas / pattern geometry ──
const W = 360;
const H = 456;
const cx = W / 2;
const oval = { cx, cy: 230, rx: 150, ry: 210 };
const core = { x: cx - 4, y: 205 }; // loop core (upper-center)
const delta = { x: cx + 34, y: 358 }; // delta (lower-right of core → loop)
const THETA0 = 0; // horizontal background flow (loop opens downward)

const PERIOD = 8.2; // ridge spacing in px
const FREQ = 1 / PERIOD;
const SIGMA_S = 3.0; // Gabor envelope across ridges
const SIGMA_T = 4.6; // Gabor envelope along ridges (longer → connected ridges)
const KR = 8; // kernel radius
const N_ORI = 32; // quantized orientations
const ITERS = 5; // Gabor refinement passes

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const idx = (x, y) => y * W + x;
function inOval(x, y, scale = 1) {
  const dx = (x - oval.cx) / (oval.rx * scale);
  const dy = (y - oval.cy) / (oval.ry * scale);
  return dx * dx + dy * dy <= 1;
}

// ── Orientation field (zero-pole loop model) ──
// θ(z) = θ0 + ½·( arg(z−delta) − arg(z−core) )   (orientation, mod π)
function orientationAt(x, y) {
  const aCore = Math.atan2(y - core.y, x - core.x);
  const aDelta = Math.atan2(y - delta.y, x - delta.x);
  return THETA0 + 0.5 * (aDelta - aCore);
}

const oriField = new Float32Array(W * H);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) oriField[idx(x, y)] = orientationAt(x, y);

// ── Precompute Gabor kernels per quantized orientation (zero-mean) ──
const kernels = [];
for (let o = 0; o < N_ORI; o++) {
  const theta = (Math.PI * o) / N_ORI; // ridge-flow direction
  const ca = Math.cos(theta + Math.PI / 2); // across-ridge axis
  const sa = Math.sin(theta + Math.PI / 2);
  const ct = Math.cos(theta); // along-ridge axis
  const st = Math.sin(theta);
  const offs = [];
  let mean = 0;
  for (let dy = -KR; dy <= KR; dy++) {
    for (let dx = -KR; dx <= KR; dx++) {
      const s = dx * ca + dy * sa; // across ridges
      const t = dx * ct + dy * st; // along ridges
      const env = Math.exp(
        -(((s * s) / (2 * SIGMA_S * SIGMA_S)) + ((t * t) / (2 * SIGMA_T * SIGMA_T))),
      );
      const w = env * Math.cos(2 * Math.PI * FREQ * s);
      offs.push({ dx, dy, w });
      mean += w;
    }
  }
  mean /= offs.length;
  for (const k of offs) k.w -= mean; // remove DC so ridges emerge from noise
  kernels.push(offs);
}

function oriIndex(theta) {
  let a = theta % Math.PI;
  if (a < 0) a += Math.PI;
  return Math.min(N_ORI - 1, Math.round((a / Math.PI) * N_ORI) % N_ORI);
}

// ── Grow the shared base ridge field (seeded once → identical for all prints) ──
function buildBaseField() {
  const rng = mulberry32(0x5eed1234);
  let img = new Float32Array(W * H);
  for (let i = 0; i < img.length; i++) img[i] = rng() * 2 - 1;

  for (let iter = 0; iter < ITERS; iter++) {
    const out = new Float32Array(W * H);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (!inOval(x, y, 1.04)) continue;
        const k = kernels[oriIndex(oriField[idx(x, y)])];
        let s = 0;
        for (let m = 0; m < k.length; m++) {
          const xx = x + k[m].dx;
          const yy = y + k[m].dy;
          if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
          s += k[m].w * img[idx(xx, yy)];
        }
        out[idx(x, y)] = s;
      }
    }
    if (iter < ITERS - 1) {
      for (let i = 0; i < out.length; i++) img[i] = out[i] > 0 ? 1 : -1;
    } else {
      img = out;
    }
  }

  // Normalize the final soft field to ~[-1, 1].
  let max = 1e-6;
  for (let i = 0; i < img.length; i++) max = Math.max(max, Math.abs(img[i]));
  for (let i = 0; i < img.length; i++) img[i] /= max;
  return img;
}

// Smooth fingertip-edge alpha (soft vignette so ridges fade at the rim).
function edgeAlpha(x, y) {
  const dx = (x - oval.cx) / oval.rx;
  const dy = (y - oval.cy) / oval.ry;
  const r = Math.sqrt(dx * dx + dy * dy);
  if (r >= 1) return 0;
  if (r <= 0.86) return 1;
  return (1 - r) / 0.14;
}

// ── Render one print: apply per-print wear to the shared base field ──
async function renderPrint(base, { file, wearSeed, latent, ink, inkAlpha, contrast }) {
  const rng = mulberry32(wearSeed);

  // Worn patches (ridge dropouts), placed differently per seed.
  const patches = [];
  const count = latent ? 6 : 3;
  for (let i = 0; i < count; i++) {
    patches.push({
      x: oval.cx + (rng() - 0.5) * oval.rx * 1.7,
      y: oval.cy + (rng() - 0.5) * oval.ry * 1.7,
      rx: 18 + rng() * 40,
      ry: 18 + rng() * 40,
    });
  }
  // Latents are partial: one large faded region, located differently per print.
  if (latent) {
    const ang = rng() * Math.PI * 2;
    patches.push({
      x: oval.cx + Math.cos(ang) * oval.rx * 0.7,
      y: oval.cy + Math.sin(ang) * oval.ry * 0.7,
      rx: 80 + rng() * 36,
      ry: 80 + rng() * 36,
      soft: true,
    });
  }

  // Per-pixel low-frequency "pressure" mottle so ink density varies naturally.
  const mott = mulberry32(wearSeed ^ 0x9e3779b9);
  const mp = [];
  for (let i = 0; i < 6; i++)
    mp.push({ fx: 0.5 + mott() * 2, fy: 0.5 + mott() * 2, ph: mott() * 6.28, a: mott() });

  function wearFactor(x, y) {
    let f = 1;
    for (const p of patches) {
      const dx = (x - p.x) / p.rx;
      const dy = (y - p.y) / p.ry;
      const d = dx * dx + dy * dy;
      if (d < 1) {
        if (p.soft) f *= 0.25 + 0.75 * d; // faded, not fully gone
        else if (rng() < (1 - d)) return 0; // hard dropout (speckled edge)
      }
    }
    // gentle pressure mottle
    let m = 0;
    for (const w of mp)
      m += w.a * Math.sin((x / W) * w.fx * 6.28 + (y / H) * w.fy * 6.28 + w.ph);
    m = 0.82 + 0.18 * (m / mp.length + 0.5);
    return f * Math.max(0, Math.min(1, m));
  }

  const buf = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = idx(x, y);
      const ea = edgeAlpha(x, y);
      let a = 0;
      if (ea > 0) {
        // ridge ink: soft-threshold the field so ridge crests are dark
        const v = base[i];
        let ridge = 0.5 + contrast * v;
        ridge = Math.max(0, Math.min(1, ridge));
        ridge = Math.pow(ridge, 1.4); // crisp up the ridges
        a = ridge * inkAlpha * ea * wearFactor(x, y);
      }
      const o = i * 4;
      buf[o] = ink[0];
      buf[o + 1] = ink[1];
      buf[o + 2] = ink[2];
      buf[o + 3] = Math.max(0, Math.min(255, Math.round(a * 255)));
    }
  }

  let img = sharp(buf, { raw: { width: W, height: H, channels: 4 } });
  if (latent) img = img.blur(0.6); // lifted prints are slightly soft
  await img.png().toFile(join(outDir, file));
  console.log(`Created: ${join(outDir, file)}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  console.log("Growing base ridge field…");
  const base = buildBaseField();

  await renderPrint(base, {
    file: "exhibit-4-latent-a.png",
    wearSeed: 4011,
    latent: true,
    ink: [26, 24, 22],
    inkAlpha: 0.95,
    contrast: 2.4,
  });
  await renderPrint(base, {
    file: "exhibit-4-latent-b.png",
    wearSeed: 7307,
    latent: true,
    ink: [26, 24, 22],
    inkAlpha: 0.95,
    contrast: 2.4,
  });
  await renderPrint(base, {
    file: "exhibit-4-reed-thumb.png",
    wearSeed: 9521,
    latent: false,
    ink: [60, 58, 56],
    inkAlpha: 0.82,
    contrast: 2.1,
  });
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
