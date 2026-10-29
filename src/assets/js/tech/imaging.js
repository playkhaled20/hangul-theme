// Standalone canvas helpers for tech image features.
export const load = src => new Promise((res, rej) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = rej; i.src = src; });
export const fileImg = f => load(URL.createObjectURL(f));
export function canvasOf(img, max = 640) { const k = Math.min(1, max / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
  const c = document.createElement('canvas'); c.width = Math.round((img.naturalWidth || img.width) * k); c.height = Math.round((img.naturalHeight || img.height) * k);
  c.getContext('2d', { willReadFrequently: true }).drawImage(img, 0, 0, c.width, c.height); return c; }
// background removal by flood from edges (works for studio/white backgrounds typical of device photos)
export function cutout(img, tol = 38) { const c = canvasOf(img), x = c.getContext('2d'), D = x.getImageData(0, 0, c.width, c.height), p = D.data, W = c.width, H = c.height;
  const seen = new Uint8Array(W * H), st = []; const bg = [p[0], p[1], p[2]];
  for (let i = 0; i < W; i++) st.push(i, (H - 1) * W + i); for (let j = 0; j < H; j++) st.push(j * W, j * W + W - 1);
  while (st.length) { const k = st.pop(); if (seen[k]) continue; seen[k] = 1; const o = k * 4;
    if (Math.abs(p[o] - bg[0]) + Math.abs(p[o + 1] - bg[1]) + Math.abs(p[o + 2] - bg[2]) > tol * 3) continue; p[o + 3] = 0;
    const X = k % W; if (X > 0) st.push(k - 1); if (X < W - 1) st.push(k + 1); if (k >= W) st.push(k - W); if (k < W * (H - 1)) st.push(k + W); }
  x.putImageData(D, 0, 0); return c; }
export const rgb2hsl = (r, g, b) => { r /= 255; g /= 255; b /= 255; const M = Math.max(r, g, b), m = Math.min(r, g, b), l = (M + m) / 2; let h = 0, s = 0;
  if (M !== m) { const dd = M - m; s = l > .5 ? dd / (2 - M - m) : dd / (M + m); h = M === r ? (g - b) / dd + (g < b ? 6 : 0) : M === g ? (b - r) / dd + 2 : (r - g) / dd + 4; h *= 60; } return [h, s, l]; };
export const hsl2rgb = (h, s, l) => { const f = n => { const k = (n + h / 30) % 12, a = s * Math.min(l, 1 - l); return 255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))); }; return [f(0), f(8), f(4)]; };
export const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
