// listen (tech): reads the product's KEY SPECS aloud (storage, RAM, screen, battery, warranty, region/platform for cards) instead of marketing text.
import { T, sheet, pdp, specs, catOf, norm } from './kit';
export function brief(p) { const s = specs(p.name + ' ' + p.desc), c = catOf(p.name + ' ' + p.desc), L = [];
  L.push(p.name);
  if (s.storage) L.push(T({ ar: `سعة التخزين ${s.storage} جيجا`, en: `${s.storage} GB storage` })); if (s.ram) L.push(T({ ar: `الرام ${s.ram} جيجا`, en: `${s.ram} GB RAM` }));
  if (s.inch) L.push(T({ ar: `الشاشة ${s.inch} إنش`, en: `${s.inch}-inch screen` })); if (s.mah) L.push(T({ ar: `البطارية ${s.mah} ملي أمبير`, en: `${s.mah} mAh battery` }));
  const t = norm(p.desc); if (/ضمان|warranty/.test(t)) L.push(T({ ar: 'يشمل ضمان', en: 'Includes warranty' }));
  if (c === 'cards') { const r = t.match(/(سعودي|امريكي|امارات|ksa|usa|uae)/); L.push(T({ ar: `بطاقة رقمية${r ? ' للمتجر ' + r[1] : ''}، توصلك فورًا بالإيميل`, en: `Digital card${r ? ' (' + r[1] + ' region)' : ''}, delivered instantly by email` })); }
  return L; }
export default function open() { const p = pdp(); if (!p || !window.speechSynthesis) return;
  const L = brief(p); const w = sheet(T({ ar: 'اسمع المواصفات', en: 'Hear the specs' }), `<ol class="tk-specs">${L.map(x => `<li>${x}</li>`).join('')}</ol><button type="button" class="tk-play">▶︎ ${T({ ar: 'تشغيل', en: 'Play' })}</button>`);
  w.querySelector('.tk-play').addEventListener('click', () => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(L.join('. ')); u.lang = T({ ar: 'ar-SA', en: 'en-US' }); u.rate = 1.05; speechSynthesis.speak(u); }); }
