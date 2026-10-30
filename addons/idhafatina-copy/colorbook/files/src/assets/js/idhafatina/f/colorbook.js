import { idhafatinaT } from '../i18n';
import '../../../styles/07-features/_colorbook.scss';
import { d, $, esc, sheet, download } from './kit';

const loadCors = src => new Promise((res, rej) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = rej; i.src = src; });
export function lineArt(img, detail = 50) {
  const W = 900, s = Math.min(W / img.naturalWidth, W / img.naturalHeight), w = Math.round(img.naturalWidth * s), h = Math.round(img.naturalHeight * s);
  const c = d.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d', { willReadFrequently: true });
  x.filter = 'blur(1.2px)'; x.drawImage(img, 0, 0, w, h); x.filter = 'none';
  const src = x.getImageData(0, 0, w, h).data, g = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) g[i] = src[i * 4] * .3 + src[i * 4 + 1] * .59 + src[i * 4 + 2] * .11;
  const mag = new Float32Array(w * h); const hist = new Uint32Array(256);
  for (let yy = 1; yy < h - 1; yy++) for (let xx = 1; xx < w - 1; xx++) {
    const k = yy * w + xx, a = g[k - w - 1], b = g[k - w], cc = g[k - w + 1], dd = g[k - 1], f = g[k + 1], gg = g[k + w - 1], hh = g[k + w], ii = g[k + w + 1];
    const gx = cc + 2 * f + ii - a - 2 * dd - gg, gy = gg + 2 * hh + ii - a - 2 * b - cc, m = Math.min(255, Math.hypot(gx, gy) / 4); mag[k] = m; hist[m | 0]++;
  }
  const keep = .04 + detail / 100 * .14; let acc = 0, t = 255; for (; t > 0; t--) { acc += hist[t]; if (acc > w * h * keep) break; }
  const out = x.createImageData(w, h), o = out.data;
  for (let k = 0; k < w * h; k++) { const on = mag[k] >= t; const v = on ? 30 : 255; o[k * 4] = o[k * 4 + 1] = o[k * 4 + 2] = v; o[k * 4 + 3] = 255; }
  x.putImageData(out, 0, 0); return c;
}
export function page(art, name) {
  const P = d.createElement('canvas'); P.width = 1240; P.height = 1754; const x = P.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, P.width, P.height);
  x.strokeStyle = '#222'; x.lineWidth = 6; x.setLineDash([18, 14]); x.strokeRect(50, 50, P.width - 100, P.height - 100); x.setLineDash([]);
  x.direction = 'rtl'; x.textAlign = 'center'; x.font = '700 92px Tajawal, "Noto Naskh Arabic", sans-serif'; x.lineWidth = 3; x.strokeStyle = '#222';
  x.strokeText(name ? `${idhafatinaT('colorbook.s1')} ${name}` : idhafatinaT('colorbook.s2'), P.width / 2, 210);
  const s = Math.min((P.width - 200) / art.width, (P.height - 520) / art.height); const w = art.width * s, h = art.height * s;
  x.drawImage(art, (P.width - w) / 2, 290, w, h);
  x.font = '400 40px Tajawal, sans-serif'; x.fillStyle = '#444'; x.fillText((idhafatinaT('colorbook.s3') + '  ') + idhafatinaT('colorbook.s4'), P.width / 2, P.height - 110);
  return P;
}
function printIt(url) {
  const el = d.createElement('div'); el.className = 'idhafatina-cb-print';
  el.innerHTML = `<style>@media print { @page { size: A4; margin: 0; } body > *:not(.idhafatina-cb-print) { display: none !important; } .idhafatina-cb-print { display: block !important; } }
    .idhafatina-cb-print { display: none; } .idhafatina-cb-print img { width: 210mm; height: 297mm; display: block; }</style><img src="${url}" alt="">`;
  d.body.appendChild(el); const done = () => { el.remove(); removeEventListener('afterprint', done); }; addEventListener('afterprint', done); setTimeout(() => window.print(), 300); setTimeout(done, 60000);
}
function open(prod) {
  const st = { name: '', detail: 50 }; let img = null, P = null;
  const s = sheet({ latin: 'Colouring page', title: idhafatinaT('colorbook.s5'), cls: 'idhafatina-cb-sheet', body: `<div class="idhafatina-cb">
    <p class="idhafatina-cb-lead">${idhafatinaT('colorbook.s6')}</p>
    <div class="idhafatina-cb-stage" role="img" aria-label="${idhafatinaT('colorbook.s7')}"><span class="idhafatina-cb-wait">${idhafatinaT('colorbook.s8')}</span></div>
    <label><span class="idhafatina-label">${idhafatinaT('colorbook.s9')}</span><input class="idhafatina-input" data-name maxlength="14" placeholder="${idhafatinaT('colorbook.s10')}"></label>
    <label><span class="idhafatina-label">${idhafatinaT('colorbook.s11')}</span><input type="range" min="0" max="100" value="50" data-detail class="idhafatina-cb-range" aria-label="${idhafatinaT('colorbook.s12')}"></label>
    <div class="idhafatina-hint-act"><button type="button" class="idhafatina-btn-gold" data-print>${idhafatinaT('colorbook.s13')}</button><button type="button" class="idhafatina-chip" data-dl>${idhafatinaT('colorbook.s14')}</button></div>
    <p class="idhafatina-fine">${idhafatinaT('colorbook.s15')}</p></div>` });
  const B = s.body, stage = $('.idhafatina-cb-stage', B);
  const draw = () => { if (!img) return; P = page(lineArt(img, st.detail), st.name); stage.innerHTML = ''; stage.appendChild(P); };
  loadCors(prod.image.url).then(i => { img = i; draw(); }).catch(() => { stage.innerHTML = ('<span class="idhafatina-cb-wait">' + idhafatinaT('colorbook.s16') + '</span>'); });
  let t; $('[data-name]', B).addEventListener('input', e => { st.name = e.target.value.trim(); clearTimeout(t); t = setTimeout(draw, 250); });
  $('[data-detail]', B).addEventListener('change', e => { st.detail = +e.target.value; draw(); });
  B.addEventListener('click', e => { if (!P) return;
    if (e.target.closest('[data-print]')) printIt(P.toDataURL('image/png'));
    if (e.target.closest('[data-dl]')) P.toBlob(bl => bl && download(bl, 'idhafatina-colouring.png')); });
}
export const tap = prod => open(prod);
export default tap;
