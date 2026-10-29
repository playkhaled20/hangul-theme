// photocoach (tech): checks a seller's DEVICE photo — sharpness (Laplacian), exposure, glare/reflections on screens, clean white background, centred framing.
import { T, sheet, esc } from './kit';
import { fileImg, canvasOf } from './imaging';
export function measure(img) { const c = canvasOf(img, 400), D = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, W = c.width, H = c.height;
  const L = new Float32Array(W * H); let sum = 0, glare = 0, edgeBg = 0, eN = 0;
  for (let i = 0; i < W * H; i++) { const o = i * 4, y = .299 * D[o] + .587 * D[o + 1] + .114 * D[o + 2]; L[i] = y; sum += y; if (y > 250) glare++; }
  let lap = 0; for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; const v = 4 * L[i] - L[i - 1] - L[i + 1] - L[i - W] - L[i + W]; lap += v * v; }
  for (let x = 0; x < W; x++) { edgeBg += L[x] + L[(H - 1) * W + x]; eN += 2; }
  let mx = 0, my = 0, mn = 0; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (L[y * W + x] < 200) { mx += x; my += y; mn++; }
  return { bright: sum / (W * H), sharp: lap / ((W - 2) * (H - 2)), glare: glare / (W * H), bg: edgeBg / eN, off: mn ? Math.hypot(mx / mn / W - .5, my / mn / H - .5) : 0 }; }
export function verdict(m) { const tips = [];
  if (m.sharp < 60) tips.push(T({ ar: 'الصورة مهزوزة — ثبّت الجوال أو استخدم مؤقت التصوير.', en: 'Blurry — steady the phone or use a timer.' }));
  if (m.bright < 90) tips.push(T({ ar: 'الإضاءة ضعيفة — صوّر قرب نافذة أو بإضاءة بيضاء.', en: 'Too dark — shoot near a window or white light.' }));
  if (m.glare > .08) tips.push(T({ ar: 'فيه لمعة/انعكاس على الشاشة — ميّل الجهاز أو استخدم إضاءة جانبية ناعمة.', en: 'Screen glare — tilt the device or use soft side light.' }));
  if (m.bg < 200) tips.push(T({ ar: 'الخلفية مو بيضاء — الأجهزة تبيع أكثر على خلفية بيضاء نظيفة.', en: 'Background not white — devices sell better on clean white.' }));
  if (m.off > .15) tips.push(T({ ar: 'الجهاز مو بالنص — وسّطه واترك مسافة حوله.', en: 'Device is off-centre — centre it with margin.' }));
  return tips.length ? tips : [T({ ar: 'صورة ممتازة للعرض ✅', en: 'Great listing photo ✅' })]; }
export default function open() { const w = sheet(T({ ar: 'فحص صورة الجهاز', en: 'Device photo check' }), `<input type="file" accept="image/*" capture="environment"><ul class="tk-tips"></ul>`);
  w.querySelector('input').addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; const m = measure(await fileImg(f));
    w.querySelector('.tk-tips').innerHTML = verdict(m).map(t => `<li>${esc(t)}</li>`).join(''); }); }
