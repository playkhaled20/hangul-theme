import { idhafatinaT } from '../i18n';
import { d, $, esc, sheet, toast, download, brand } from './kit';

import { cutout } from './cutout';
const loadCors = src => new Promise((res, rej) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = rej; i.src = src; });

export function openTryOn(product) {
  const sh = sheet({
    cls: 'idhafatina-tryon', latin: 'Try it on', title: idhafatinaT('tryon.s1'),
    body: `<div class="idhafatina-to-stage">
        <video playsinline muted autoplay></video><img class="idhafatina-to-photo" alt="" hidden>
        <canvas class="idhafatina-to-bag" aria-label="${idhafatinaT('tryon.s2')}"></canvas>
        <div class="idhafatina-to-wait"><i></i><span>${idhafatinaT('tryon.s3')}</span></div>
      </div>
      <p class="idhafatina-to-tip">${idhafatinaT('tryon.s4')}</p>
      <div class="idhafatina-to-ctrl">
        <label>${idhafatinaT('tryon.s5')}<input type="range" min="20" max="250" value="100" data-k="scale"></label>
        <label>${idhafatinaT('tryon.s6')}<input type="range" min="-180" max="180" value="0" data-k="rot"></label>
        <label>${idhafatinaT('tryon.s7')}<input type="range" min="0" max="80" value="34" data-k="tol"></label>
      </div>
      <div class="idhafatina-to-actions">
        <button type="button" class="idhafatina-btn-gold" data-a="shot">${idhafatinaT('tryon.s8')}</button>
        <label class="idhafatina-btn-line idhafatina-to-up">${idhafatinaT('tryon.s9')}<input type="file" accept="image/*" hidden></label>
        <button type="button" class="idhafatina-btn-line" data-a="flip" hidden>${idhafatinaT('tryon.s10')}</button>
      </div>
      <div class="idhafatina-to-result" hidden><img alt="${idhafatinaT('tryon.s11')}"><div><button type="button" class="idhafatina-btn-gold" data-a="share">${idhafatinaT('tryon.s12')}</button><button type="button" class="idhafatina-btn-line" data-a="save">${idhafatinaT('tryon.s13')}</button><button type="button" class="idhafatina-btn-line" data-a="again">${idhafatinaT('tryon.s14')}</button></div></div>
      <p class="idhafatina-fine">${idhafatinaT('tryon.s15')}</p>`,
    onClose: () => stop()
  });
  const st = $('.idhafatina-to-stage', sh), video = $('video', sh), photo = $('.idhafatina-to-photo', sh), bagC = $('.idhafatina-to-bag', sh), wait = $('.idhafatina-to-wait', sh);
  const T = { x: .5, y: .62, scale: 1, rot: 0 }; let stream = null, facing = 'environment', srcImg = null, bagW = 0.42;
  const stop = () => { if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; };
  const place = () => {
    const r = st.getBoundingClientRect(), w = r.width * bagW * T.scale;
    bagC.style.width = w + 'px';
    bagC.style.transform = `translate(-50%,-50%) translate(${T.x * r.width}px,${T.y * r.height}px) rotate(${T.rot}deg)`;
    $('[data-k=scale]', sh).value = Math.round(T.scale * 100); $('[data-k=rot]', sh).value = Math.round(T.rot);
  };
  const drawBag = tol => { if (!srcImg) return; const c = cutout(srcImg, tol); bagC.width = c.width; bagC.height = c.height; bagC.getContext('2d').drawImage(c, 0, 0); place(); };
  const startCam = async () => {
    stop();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('nocam');
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
    video.srcObject = stream; video.hidden = false; photo.hidden = true; await video.play().catch(() => {});
    $('[data-a=flip]', sh).hidden = false;
  };
  (async () => {
    try { srcImg = await loadCors(product.image.url); drawBag(34); } catch (e) { wait.querySelector('span').textContent = idhafatinaT('tryon.s16'); }
    try { await startCam(); wait.hidden = true; }
    catch (e) { wait.querySelector('span').textContent = idhafatinaT('tryon.s17'); st.classList.add('nocam'); }
  })();
  const pts = new Map(); let g0 = null;
  const snap = () => { const a = [...pts.values()]; if (a.length === 2) { const dx = a[1].x - a[0].x, dy = a[1].y - a[0].y; return { dist: Math.hypot(dx, dy), ang: Math.atan2(dy, dx) * 180 / Math.PI, scale: T.scale, rot: T.rot }; } return null; };
  bagC.addEventListener('pointerdown', e => { bagC.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); g0 = snap(); });
  bagC.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return; const prev = pts.get(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const r = st.getBoundingClientRect();
    if (pts.size === 1) { T.x = Math.min(1, Math.max(0, T.x + (e.clientX - prev.x) / r.width)); T.y = Math.min(1, Math.max(0, T.y + (e.clientY - prev.y) / r.height)); }
    else if (g0) { const n = snap(); T.scale = Math.min(2.5, Math.max(.2, g0.scale * n.dist / g0.dist)); T.rot = g0.rot + (n.ang - g0.ang); }
    place();
  });
  const up = e => { pts.delete(e.pointerId); g0 = snap(); };
  bagC.addEventListener('pointerup', up); bagC.addEventListener('pointercancel', up);
  st.addEventListener('wheel', e => { e.preventDefault(); if (e.shiftKey) T.rot += e.deltaY > 0 ? 5 : -5; else T.scale = Math.min(2.5, Math.max(.2, T.scale * (e.deltaY > 0 ? .94 : 1.06))); place(); }, { passive: false });
  sh.addEventListener('input', e => { const k = e.target.dataset.k; if (!k) return; if (k === 'scale') T.scale = e.target.value / 100; if (k === 'rot') T.rot = +e.target.value; if (k === 'tol') drawBag(+e.target.value); place(); });
  addEventListener('resize', place);
  $('.idhafatina-to-up input', sh).addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return; stop(); const u = URL.createObjectURL(f);
    photo.onload = () => { wait.hidden = true; st.classList.remove('nocam'); place(); }; photo.src = u; photo.hidden = false; video.hidden = true; $('[data-a=flip]', sh).hidden = true;
  });
  let lastBlob = null;
  const shot = () => {
    const r = st.getBoundingClientRect(), k = 2, out = d.createElement('canvas'); out.width = Math.round(r.width * k); out.height = Math.round(r.height * k);
    const x = out.getContext('2d'); x.fillStyle = '#F6EEE1'; x.fillRect(0, 0, out.width, out.height);
    const src = !video.hidden && video.videoWidth ? video : (!photo.hidden && photo.naturalWidth ? photo : null);
    if (src) { const sw = src.videoWidth || src.naturalWidth, shh = src.videoHeight || src.naturalHeight, s = Math.max(out.width / sw, out.height / shh); x.drawImage(src, (out.width - sw * s) / 2, (out.height - shh * s) / 2, sw * s, shh * s); }
    const w = r.width * bagW * T.scale * k, h = w * bagC.height / bagC.width;
    x.save(); x.translate(T.x * out.width, T.y * out.height); x.rotate(T.rot * Math.PI / 180); x.shadowColor = 'rgba(0,0,0,.28)'; x.shadowBlur = 24; x.shadowOffsetY = 12; x.drawImage(bagC, -w / 2, -h / 2, w, h); x.restore();
    x.font = `${14 * k}px "El Messiri", serif`; x.fillStyle = 'rgba(255,253,248,.92)'; x.textAlign = 'center'; x.fillText(`${brand()} · ${product.name}`, out.width / 2, out.height - 14 * k);
    out.toBlob(b => { lastBlob = b; const res = $('.idhafatina-to-result', sh); $('img', res).src = URL.createObjectURL(b); res.hidden = false; res.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 'image/jpeg', .92);
  };
  sh.addEventListener('click', async e => {
    const a = e.target.closest('[data-a]'); if (!a) return;
    if (a.dataset.a === 'shot') shot();
    if (a.dataset.a === 'again') $('.idhafatina-to-result', sh).hidden = true;
    if (a.dataset.a === 'flip') { facing = facing === 'user' ? 'environment' : 'user'; startCam().catch(() => toast(idhafatinaT('tryon.s18'))); }
    if (a.dataset.a === 'save' && lastBlob) download(lastBlob, 'idhafatina-try-on.jpg');
    if (a.dataset.a === 'share' && lastBlob) {
      const file = new File([lastBlob], 'idhafatina-try-on.jpg', { type: 'image/jpeg' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: product.name, text: `${idhafatinaT('tryon.s19')} ${product.name} ${idhafatinaT('tryon.s20')} ${brand()} 🤍 ${product.url}` }); } catch (er) {  } }
      else { download(lastBlob, 'idhafatina-try-on.jpg'); toast(idhafatinaT('tryon.s21')); }
    }
  });
  return sh;
}
