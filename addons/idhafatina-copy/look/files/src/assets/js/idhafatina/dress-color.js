
const srgb2lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
export function rgb2lab(r, g, b) {
  const R = srgb2lin(r), G = srgb2lin(g), B = srgb2lin(b);
  let x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047, y = R * 0.2126 + G * 0.7152 + B * 0.0722, z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  x = f(x); y = f(y); z = f(z);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
export const hex2rgb = h => { h = String(h || '').replace('#', '').trim(); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return isNaN(n) ? [204, 204, 204] : [n >> 16 & 255, n >> 8 & 255, n & 255]; };
export const rgb2hex = ([r, g, b]) => '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const chroma = l => Math.hypot(l[1], l[2]);

export function loadImage(file) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); res(img); };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('decode')); };
    img.src = url;
  });
}

export function drawTo(canvas, img, max = 720) {
  const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  canvas.width = Math.max(1, Math.round(img.naturalWidth * s)); canvas.height = Math.max(1, Math.round(img.naturalHeight * s));
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return ctx;
}

export function sampleAt(ctx, x, y, r = 4) {
  const { width: W, height: H } = ctx.canvas;
  const x0 = Math.max(0, Math.round(x - r)), y0 = Math.max(0, Math.round(y - r));
  const w = Math.min(W - x0, r * 2 + 1), h = Math.min(H - y0, r * 2 + 1);
  const d = ctx.getImageData(x0, y0, w, h).data; let R = 0, G = 0, B = 0, n = 0;
  for (let i = 0; i < d.length; i += 4) { if (d[i + 3] < 128) continue; R += d[i]; G += d[i + 1]; B += d[i + 2]; n++; }
  return n ? [R / n, G / n, B / n] : [204, 204, 204];
}

export function dominantColor(img) {
  const c = document.createElement('canvas'), ctx = drawTo(c, img, 110), W = c.width, H = c.height;
  const d = ctx.getImageData(0, 0, W, H).data;
  const px = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4; if (d[i + 3] < 128) continue;
    const rgb = [d[i], d[i + 1], d[i + 2]];
    px.push({ x: x / (W - 1 || 1), y: y / (H - 1 || 1), rgb, lab: rgb2lab(...rgb) });
  }
  const edge = px.filter(p => p.x < .07 || p.x > .93 || p.y < .05 || p.y > .95);
  const bg = [];
  const buckets = new Map();
  edge.forEach(p => { const k = p.lab.map(v => Math.round(v / 8)).join(','); const b = buckets.get(k) || { n: 0, lab: [0, 0, 0] }; b.n++; b.lab = b.lab.map((v, j) => v + p.lab[j]); buckets.set(k, b); });
  [...buckets.values()].sort((a, b) => b.n - a.n).forEach(b => { if (b.n >= edge.length * .06 && bg.length < 6) bg.push(b.lab.map(v => v / b.n)); });
  const isBg = l => bg.some(b => dE(b, l) < 14);
  const neutral = l => (l[0] > 88 && chroma(l) < 10) || chroma(l) < 6;

  const central = px.map(p => { const dx = (p.x - .5) / .36, dy = (p.y - .52) / .44, r = dx * dx + dy * dy; return r <= 1 ? Object.assign(p, { w: 1.15 - r }) : null; }).filter(Boolean);
  let pool = central.filter(p => !isBg(p.lab));
  const coloured = pool.filter(p => !neutral(p.lab));
  if (coloured.length > pool.length * .18 && coloured.length > 40) pool = coloured;
  if (pool.length < 30) pool = central.length ? central : px.map(p => Object.assign(p, { w: 1 }));

  const k = Math.min(5, pool.length);
  let cent = Array.from({ length: k }, (_, j) => pool[Math.floor((j + .5) * pool.length / k)].lab.slice());
  let asg = new Array(pool.length).fill(0);
  for (let it = 0; it < 12; it++) {
    pool.forEach((p, i) => { let best = 0, bd = Infinity; cent.forEach((c2, j) => { const dd = dE(c2, p.lab); if (dd < bd) { bd = dd; best = j; } }); asg[i] = best; });
    const acc = cent.map(() => ({ w: 0, lab: [0, 0, 0] }));
    pool.forEach((p, i) => { const a = acc[asg[i]]; a.w += p.w; a.lab = a.lab.map((v, j) => v + p.lab[j] * p.w); });
    cent = cent.map((c2, j) => acc[j].w ? acc[j].lab.map(v => v / acc[j].w) : c2);
  }
  const stats = cent.map(() => ({ w: 0, rgb: [0, 0, 0], x: 0, y: 0, cx: 0 }));
  pool.forEach((p, i) => { const s = stats[asg[i]]; s.w += p.w; s.rgb = s.rgb.map((v, j) => v + p.rgb[j] * p.w); s.x += p.x * p.w; s.y += p.y * p.w; });
  let best = null;
  stats.forEach((s, j) => {
    if (!s.w) return; const x = s.x / s.w, y = s.y / s.w;
    const score = s.w * (1.2 - Math.hypot(x - .5, y - .52)) * (neutral(cent[j]) ? .85 : 1);
    if (!best || score > best.score) best = { score, rgb: s.rgb.map(v => v / s.w), lab: cent[j], x, y };
  });
  best.hex = rgb2hex(best.rgb);
  return best;
}

export function nearestOutfit(rgb, outfits) {
  const lab = rgb2lab(...rgb); let best = null, bd = Infinity;
  outfits.forEach(o => {
    const l2 = rgb2lab(...hex2rgb(o.hex));
    let dd = dE(lab, l2);
    if (chroma(lab) < 12 && chroma(l2) < 12) dd = Math.abs(lab[0] - l2[0]) * .9 + Math.abs(chroma(lab) - chroma(l2));
    if (dd < bd) { bd = dd; best = o; }
  });
  return best;
}
