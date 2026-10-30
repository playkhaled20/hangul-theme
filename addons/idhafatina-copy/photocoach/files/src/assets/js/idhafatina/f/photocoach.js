import { idhafatinaT } from '../i18n';
import '../../../styles/07-features/_photocoach.scss';
import { d, $, esc, waLink, brand, download, AR } from './kit';
import { cutout } from './cutout';

export function measure(img) {
  const S = 220, k = Math.min(1, S / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
  const W = Math.round((img.naturalWidth || img.width) * k), H = Math.round((img.naturalHeight || img.height) * k);
  const c = d.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, W, H);
  const p = x.getImageData(0, 0, W, H).data, L = new Float32Array(W * H); let sum = 0, hi = 0, lo = 0;
  for (let i = 0; i < W * H; i++) { const l = .2126 * p[i * 4] + .7152 * p[i * 4 + 1] + .0722 * p[i * 4 + 2]; L[i] = l; sum += l; if (l > 250) hi++; if (l < 18) lo++; }
  const mean = sum / (W * H);
  let mask = null, fill = null;
  try { const cut = cutout(img, 30, S), mc = d.createElement('canvas'); mc.width = W; mc.height = H; mc.getContext('2d').drawImage(cut, 0, 0, W, H);
    const q = mc.getContext('2d').getImageData(0, 0, W, H).data; mask = new Uint8Array(W * H); let n = 0; for (let i = 0; i < W * H; i++) if (q[i * 4 + 3] > 40) { mask[i] = 1; n++; } fill = n / (W * H); } catch (e) {  }
  if (mask) { const g = new Uint8Array(W * H); for (let y = 0; y < H; y++) for (let xx = 0; xx < W; xx++) { if (!mask[y * W + xx]) continue;
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const yy = y + dy, x2 = xx + dx; if (yy >= 0 && yy < H && x2 >= 0 && x2 < W) g[yy * W + x2] = 1; } } mask = g; }
  let lap = 0, lapN = 0, edgeB = 0, nB = 0;
  for (let y = 1; y < H - 1; y++) for (let xx = 1; xx < W - 1; xx++) { const i = y * W + xx, v = 4 * L[i] - L[i - 1] - L[i + 1] - L[i - W] - L[i + W]; lap += v * v; lapN++;
    if (mask ? !mask[i] : (xx < W * .15 || xx > W * .85 || y < H * .15 || y > H * .85)) { edgeB += Math.abs(v) > 28 ? 1 : 0; nB++; } }
  return { mean, burnt: hi / (W * H), dark: lo / (W * H), sharp: lap / lapN, busy: nB > W * H * .05 ? edgeB / nB : 0, fill };
}
export function verdict(m) {
  const r = [];
  r.push([idhafatinaT('photocoach.s1'), m.mean < 85 || m.dark > .25 ? ['fix', idhafatinaT('photocoach.s2')] : m.burnt > .12 ? ['fix', idhafatinaT('photocoach.s3')] : ['ok', idhafatinaT('photocoach.s4')]]);
  r.push([idhafatinaT('photocoach.s5'), m.sharp < 150 ? ['fix', idhafatinaT('photocoach.s6')] : ['ok', idhafatinaT('photocoach.s7')]]);
  r.push([idhafatinaT('photocoach.s8'), m.busy > .3 ? ['fix', idhafatinaT('photocoach.s9')] : ['ok', idhafatinaT('photocoach.s10')]]);
  if (m.fill != null) r.push([idhafatinaT('photocoach.s11'), m.fill < .18 ? ['fix', idhafatinaT('photocoach.s12')] : m.fill > .85 ? ['fix', idhafatinaT('photocoach.s13')] : ['ok', idhafatinaT('photocoach.s14')]]);
  return r;
}
export default function initPhotoCoach(el) {
  const ui = $('.idhafatina-pc-ui', el); if (!ui) return;
  ui.innerHTML = `<div class="idhafatina-pc-tips"><span>${idhafatinaT('photocoach.s15')}</span><span>${idhafatinaT('photocoach.s16')}</span><span>${idhafatinaT('photocoach.s17')}</span><span>${idhafatinaT('photocoach.s18')}</span></div>
    <label class="idhafatina-btn-gold idhafatina-pc-pick">${idhafatinaT('photocoach.s19')}<input type="file" accept="image/*" capture="environment" class="idhafatina-sr"></label>
    <div class="idhafatina-pc-out" aria-live="polite"></div>
    <p class="idhafatina-fine">${idhafatinaT('photocoach.s20')}</p>`;
  const out = $('.idhafatina-pc-out', ui);
  $('input', ui).addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (!f) return;
    const url = URL.createObjectURL(f), img = new Image();
    img.onload = () => { const m = measure(img); const V = verdict(m), ok = V.filter(v => v[1][0] === 'ok').length;
      out.innerHTML = `<div class="idhafatina-pc-res"><img src="${url}" alt="${idhafatinaT('photocoach.s21')}"><div><strong>${ok === V.length ? idhafatinaT('photocoach.s24') : `${AR(ok)} ${idhafatinaT('photocoach.s25')} ${AR(V.length)} ${idhafatinaT('photocoach.s26')}`}</strong>
        <ul>${V.map(([n, [s, t]]) => `<li class="${s}"><b>${n}</b><span>${esc(t)}</span></li>`).join('')}</ul></div></div>
        <div class="idhafatina-hint-act"><button type="button" class="idhafatina-btn-gold" data-share>${idhafatinaT('photocoach.s22')}</button><a class="idhafatina-chip" target="_blank" rel="noopener" href="${esc(waLink(`${idhafatinaT('photocoach.s27')} ${brand()} ${idhafatinaT('photocoach.s28')}`))}">${idhafatinaT('photocoach.s23')}</a></div>`;
      $('[data-share]', out).addEventListener('click', async () => { const file = new File([f], 'idhafatina-my-bag.' + (f.type.split('/')[1] || 'jpg'), { type: f.type });
        if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], text: `${idhafatinaT('photocoach.s29')} ${brand()} 🤍` }); } catch (er) {  } } else download(file, file.name); }); };
    img.src = url; });
}
