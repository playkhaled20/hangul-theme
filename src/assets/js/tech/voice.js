// voice (tech): voice search tuned for tech names (ايفون 15 برو، بلايستيشن 5، 256 جيجا) using SpeechRecognition; reuses stylist understanding.
import { T, esc, sheet, products, card } from './kit';
import { understand, rank } from './stylist';
const FIX = [[/اي فون/g, 'ايفون'], [/بلاي ستيشن|بلي ستيشن/g, 'بلايستيشن'], [/جيجا بايت/g, 'جيجا'], [/برو ماكس/g, 'pro max'], [/خمسه/g, '5'], [/اربعه/g, '4']];
export const clean = s => FIX.reduce((t, [a, b]) => t.replace(a, b), s);
export default function open() {
  const R = window.SpeechRecognition || window.webkitSpeechRecognition;
  const w = sheet(T({ ar: 'اطلب بصوتك', en: 'Voice search' }), `<button type="button" class="tk-mic">🎙️ ${T({ ar: 'اضغط وتكلم', en: 'Tap and speak' })}</button><p class="tk-heard"></p><div class="tk-grid"></div>`);
  const heard = w.querySelector('.tk-heard'), grid = w.querySelector('.tk-grid');
  if (!R) { heard.textContent = T({ ar: 'متصفحك ما يدعم البحث الصوتي، جرّب كروم.', en: 'Your browser lacks voice search; try Chrome.' }); return; }
  w.querySelector('.tk-mic').addEventListener('click', () => { const r = new R(); r.lang = T({ ar: 'ar-SA', en: 'en-US' }); r.interimResults = false;
    r.onresult = async e => { const q = clean(e.results[0][0].transcript); heard.textContent = `«${q}»`; const res = rank(await products(), understand(q));
      grid.innerHTML = res.map(x => card(x.p)).join('') || esc(T({ ar: 'ما لقيت شي، جرّب تقول اسم الجهاز.', en: 'Nothing found, say the device name.' })); };
    r.onerror = () => { heard.textContent = T({ ar: 'ما سمعت زين، حاول مرة ثانية.', en: "Didn't catch that, try again." }); }; r.start(); });
}
