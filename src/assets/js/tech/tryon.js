// tryon (tech): "See it on your desk" — overlays the cut-out device on your camera/photo at true relative size (from screen inches) to judge fit.
import { T, sheet, pdp, specs } from './kit';
import { load, cutout, fileImg } from './imaging';
export default async function open() { const p = pdp(); if (!p) return; const src = await load(p.img).catch(() => null); if (!src) return; const dev = cutout(src);
  const w = sheet(T({ ar: 'شوفه على مكتبك', en: 'See it on your desk' }), `<div class="tk-ar"><video playsinline muted></video><canvas></canvas></div>
  <div class="tk-row"><button type="button" data-cam>📷 ${T({ ar: 'الكاميرا', en: 'Camera' })}</button><label>🖼️ ${T({ ar: 'صورة', en: 'Photo' })}<input type="file" accept="image/*" hidden></label>
  <input type="range" min="10" max="90" value="${Math.min(80, 20 + (specs(p.name + ' ' + p.desc).inch || 6) * 2)}" aria-label="size"></div><small>${T({ ar: 'اسحب الجهاز لتحريكه.', en: 'Drag the device to move it.' })}</small>`);
  const cv = w.querySelector('canvas'), cx = cv.getContext('2d'), v = w.querySelector('video'), rg = w.querySelector('[type=range]'); let bg = null, pos = { x: .5, y: .6 };
  const draw = () => { cv.width = 640; cv.height = 480; if (bg) cx.drawImage(bg, 0, 0, 640, 480); else { cx.fillStyle = '#eee'; cx.fillRect(0, 0, 640, 480); }
    const s = rg.value / 100 * 640, h = s * dev.height / dev.width; cx.drawImage(dev, pos.x * 640 - s / 2, pos.y * 480 - h / 2, s, h); if (v.srcObject && w.isConnected) requestAnimationFrame(draw); };
  w.querySelector('[data-cam]').addEventListener('click', async () => { try { v.srcObject = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); await v.play(); bg = v; draw(); } catch (e) {} });
  w.querySelector('[type=file]').addEventListener('change', async e => { if (e.target.files[0]) { bg = await fileImg(e.target.files[0]); draw(); } });
  rg.addEventListener('input', draw); cv.addEventListener('pointermove', e => { if (!e.buttons) return; const r = cv.getBoundingClientRect(); pos = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }; draw(); });
  new MutationObserver((_, o) => { if (!w.isConnected) { (v.srcObject && v.srcObject.getTracks() || []).forEach(t => t.stop()); o.disconnect(); } }).observe(document.body, { childList: true }); draw(); }
