// recolour (tech): preview a device in its official finish colours (Titanium, Midnight, Starlight…) — recolours the body, keeps screen/black glass.
import { T, sheet, pdp, esc } from './kit';
import { load, cutout, rgb2hsl, hsl2rgb, hex2rgb } from './imaging';
export const FINISHES = [[{ ar: 'تيتانيوم طبيعي', en: 'Natural titanium' }, '#BEB8AE'], [{ ar: 'أسود ميدنايت', en: 'Midnight' }, '#2B2F36'], [{ ar: 'ستارلايت', en: 'Starlight' }, '#EDE4D3'],
  [{ ar: 'أزرق', en: 'Blue' }, '#3D5A80'], [{ ar: 'بنفسجي', en: 'Purple' }, '#7D6B9E'], [{ ar: 'أخضر', en: 'Green' }, '#5B7B65'], [{ ar: 'أحمر', en: 'Red' }, '#B0302E'], [{ ar: 'أبيض', en: 'White' }, '#F4F4F2']];
export function recolour(src, hex) { const c = cutout(src), x = c.getContext('2d'), D = x.getImageData(0, 0, c.width, c.height), p = D.data, [th, ts, tl] = rgb2hsl(...hex2rgb(hex));
  for (let o = 0; o < p.length; o += 4) { if (!p[o + 3]) continue; const [, s, l] = rgb2hsl(p[o], p[o + 1], p[o + 2]); if (l < .12 || l > .96) continue; // keep screen glass & highlights
    const [r, g, b] = hsl2rgb(th, Math.min(1, ts * .9 + s * .1), Math.max(.05, Math.min(.95, l * .55 + tl * .45))); p[o] = r; p[o + 1] = g; p[o + 2] = b; }
  x.putImageData(D, 0, 0); return c; }
export default async function open() { const p = pdp(); if (!p) return; const src = await load(p.img).catch(() => null); if (!src) return;
  const w = sheet(T({ ar: 'شوفه بلون ثاني', en: 'See other finishes' }), `<div class="tk-stage"></div><div class="tk-chips">${FINISHES.map(([n, h], i) => `<button type="button" data-i="${i}" style="--c:${h}"><i></i>${esc(T(n))}</button>`).join('')}</div><small>${T({ ar: 'معاينة تقريبية؛ تأكد من الألوان المتوفرة بالخيارات.', en: 'Approximate preview; check available options.' })}</small>`);
  const st = w.querySelector('.tk-stage'); st.appendChild(src.cloneNode());
  w.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (!b) return; st.replaceChildren(recolour(src, FINISHES[b.dataset.i][1])); }); }
