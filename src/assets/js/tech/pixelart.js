// pixelart (tech, replaces "colorbook"): turns a game/device image into 8-bit pixel art (palette-quantised) to download or share — for gaming stores.
import { T, sheet, pdp, d } from './kit';
import { load, canvasOf } from './imaging';
const PAL = [[15, 15, 27], [86, 108, 134], [148, 176, 194], [244, 244, 244], [255, 205, 117], [239, 125, 87], [177, 62, 83], [93, 39, 93], [56, 183, 100], [37, 113, 121], [41, 54, 111], [59, 93, 201], [65, 166, 246], [115, 239, 247]];
export function pixelate(img, cells = 48) { const s = canvasOf(img, 512), sm = d.createElement('canvas'); sm.width = cells; sm.height = Math.round(cells * s.height / s.width);
  const x = sm.getContext('2d'); x.drawImage(s, 0, 0, sm.width, sm.height); const D = x.getImageData(0, 0, sm.width, sm.height), p = D.data;
  for (let o = 0; o < p.length; o += 4) { let b = PAL[0], bd = 1e9; for (const c of PAL) { const dd = (c[0] - p[o]) ** 2 + (c[1] - p[o + 1]) ** 2 + (c[2] - p[o + 2]) ** 2; if (dd < bd) { bd = dd; b = c; } } p[o] = b[0]; p[o + 1] = b[1]; p[o + 2] = b[2]; }
  x.putImageData(D, 0, 0); const out = d.createElement('canvas'); out.width = sm.width * 10; out.height = sm.height * 10; const o2 = out.getContext('2d'); o2.imageSmoothingEnabled = false; o2.drawImage(sm, 0, 0, out.width, out.height); return out; }
export default async function open() { const p = pdp(); if (!p) return; const src = await load(p.img).catch(() => null); if (!src) return;
  const w = sheet(T({ ar: 'نسخة بكسل 8-بت', en: '8-bit pixel art' }), `<div class="tk-stage"></div><div class="tk-row"><input type="range" min="24" max="96" value="48"><a class="tk-dl" download="pixel.png">⬇︎ ${T({ ar: 'تحميل', en: 'Download' })}</a></div>`);
  const st = w.querySelector('.tk-stage'), a = w.querySelector('.tk-dl'), r = () => { const c = pixelate(src, +w.querySelector('input').value); st.replaceChildren(c); a.href = c.toDataURL('image/png'); };
  w.querySelector('input').addEventListener('input', r); r(); }
