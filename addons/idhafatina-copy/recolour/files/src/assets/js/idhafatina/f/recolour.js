import { idhafatinaT, lz } from '../i18n';
import '../../../styles/07-features/_recolour.scss';
import { d, $, esc, sheet, waLink, brand, download } from './kit';
import { cutout } from './cutout';

export const COLOURS = lz(Object.assign(() => ([[idhafatinaT('recolour.s1'), '#E9A9B8'], [idhafatinaT('recolour.s2'), '#C7367A'], [idhafatinaT('recolour.s3'), '#B39DD6'], [idhafatinaT('recolour.s4'), '#22325E'], [idhafatinaT('recolour.s5'), '#8EC5E8'], [idhafatinaT('recolour.s6'), '#2E9C9A'],
  [idhafatinaT('recolour.s7'), '#6B7444'], [idhafatinaT('recolour.s8'), '#6E1F2F'], [idhafatinaT('recolour.s9'), '#E2C99A'], [idhafatinaT('recolour.s10'), '#1B1A1A'], [idhafatinaT('recolour.s11'), '#F2EADB'], [idhafatinaT('recolour.s12'), '#BFC3C7']]), { a: 1 }));
const hex2hsl = h => { const n = parseInt(h.slice(1), 16), r = (n >> 16) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255; return rgb2hsl(r, g, b); };
function rgb2hsl(r, g, b) { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; if (mx === mn) return [0, 0, l];
  const dd = mx - mn, s = l > .5 ? dd / (2 - mx - mn) : dd / (mx + mn); let h = mx === r ? (g - b) / dd + (g < b ? 6 : 0) : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4; return [h * 60, s, l]; }
function hsl2rgb(h, s, l) { const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)); return [f(0) * 255, f(8) * 255, f(4) * 255]; }
export const isMetal = (h, s, l) => s > .28 && l > .3 && l < .85 && h >= 32 && h <= 56;
export function recolour(src, hex, keepMetal = true) {
  const W = src.width, H = src.height, c = d.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(src, 0, 0);
  const id = x.getImageData(0, 0, W, H), p = id.data, [th, ts, tl] = hex2hsl(hex);
  let sum = 0, n = 0; const hsl = new Float32Array(W * H * 3), skip = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) { if (p[i * 4 + 3] < 40) { skip[i] = 1; continue; }
    const v = rgb2hsl(p[i * 4] / 255, p[i * 4 + 1] / 255, p[i * 4 + 2] / 255); hsl.set(v, i * 3);
    if (keepMetal && isMetal(...v)) { skip[i] = 2; continue; } sum += v[2]; n++; }
  const shift = n ? tl - sum / n : 0;
  for (let i = 0; i < W * H; i++) { if (skip[i]) continue;
    const l = Math.max(0, Math.min(1, hsl[i * 3 + 2] + shift)), s = ts * (.75 + .25 * Math.min(1, hsl[i * 3 + 1] * 2));
    const [r, g, b] = hsl2rgb(th, s, l); p[i * 4] = r; p[i * 4 + 1] = g; p[i * 4 + 2] = b; }
  x.putImageData(id, 0, 0); return c;
}
const loadCors = src => new Promise((res, rej) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = rej; i.src = src; });
function open(prod) {
  const st = { c: 0, metal: true };
  const s = sheet({ latin: 'Your colour', title: idhafatinaT('recolour.s13'), cls: 'idhafatina-rc-sheet', body: `<div class="idhafatina-rc">
    <div class="idhafatina-rc-stage"><figure><img alt="${esc(prod.name)} ${idhafatinaT('recolour.s14')}" src="${esc(prod.image.url)}"><figcaption>${idhafatinaT('recolour.s15')}</figcaption></figure>
      <figure><div class="idhafatina-rc-out" role="img" aria-label="${idhafatinaT('recolour.s16')}"><span class="idhafatina-rc-wait">${idhafatinaT('recolour.s17')}</span></div><figcaption data-cap></figcaption></figure></div>
    <div class="idhafatina-rc-sw" role="group" aria-label="${idhafatinaT('recolour.s18')}">${COLOURS.map(([n, h], i) => `<button type="button" data-c="${i}" aria-label="${n}" title="${n}" style="--c:${h}"><i></i><span>${n}</span></button>`).join('')}</div>
    <label class="idhafatina-st-chk"><input type="checkbox" data-metal checked> ${idhafatinaT('recolour.s19')}</label>
    <div class="idhafatina-hint-act"><a class="idhafatina-btn-gold" target="_blank" rel="noopener" data-wa href="#">${idhafatinaT('recolour.s20')}</a><button type="button" class="idhafatina-chip" data-dl>${idhafatinaT('recolour.s21')}</button></div>
    <p class="idhafatina-fine">${idhafatinaT('recolour.s22')}</p></div>` });
  const B = s.body, out = $('.idhafatina-rc-out', B); let base = null, last = null;
  const draw = () => {
    const [n, h] = COLOURS[st.c];
    B.querySelectorAll('[data-c]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.c === st.c));
    $('[data-cap]', B).textContent = (idhafatinaT('recolour.s23') + ' ') + n;
    $('[data-wa]', B).href = waLink(`${idhafatinaT('recolour.s24')} ${brand()} ${idhafatinaT('recolour.s25')}${prod.name}${idhafatinaT('recolour.s26')} ${n}${st.metal ? (' ' + idhafatinaT('recolour.s28')) : ''}${idhafatinaT('recolour.s27')} ${prod.url || location.href}`);
    if (!base) return;
    last = recolour(base, h, st.metal); out.innerHTML = ''; out.appendChild(last);
  };
  B.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (b) { st.c = +b.dataset.c; draw(); }
    if (e.target.closest('[data-dl]') && last) last.toBlob(bl => bl && download(bl, `idhafatina-${COLOURS[st.c][0]}.png`)); });
  $('[data-metal]', B).addEventListener('change', e => { st.metal = e.target.checked; draw(); });
  draw();
  loadCors(prod.image.url).then(img => { base = cutout(img, 34, 520); draw(); })
    .catch(() => { out.innerHTML = ('<span class="idhafatina-rc-wait">' + idhafatinaT('recolour.s29') + '</span>'); });
}
export const tap = prod => open(prod);
export default tap;
