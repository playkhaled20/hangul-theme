// stylist (tech): "Tech advisor" chat. Understands category, budget, brand, storage/RAM, use-case (gaming, study, photos) and ranks store products.
import { T, esc, norm, products, text, price, card, sheet, catOf, specs, budgetOf, CAT_N } from './kit';
const USE = { gaming: /(العاب|قيمنق|gaming|fps|ps5)/, study: /(دراسه|جامعه|طالب|study|student|office|شغل)/, photo: /(تصوير|كاميرا|photo|camera)/, battery: /(بطاريه|يطول|battery)/, cheap: /(ارخص|رخيص|اقتصادي|cheap|budget)/ };
const BRANDS = ['apple', 'samsung', 'xiaomi', 'huawei', 'sony', 'microsoft', 'nintendo', 'lenovo', 'hp', 'dell', 'asus', 'anker', 'jbl', 'logitech'];
const BR_AR = { 'ابل': 'apple', 'سامسونج': 'samsung', 'شاومي': 'xiaomi', 'هواوي': 'huawei', 'سوني': 'sony', 'لينوفو': 'lenovo', 'انكر': 'anker' };
export function understand(q) {
  const t = norm(q), brand = BRANDS.find(b => t.includes(b)) || Object.entries(BR_AR).find(([a]) => t.includes(a))?.[1] || '';
  return { cat: catOf(t), budget: budgetOf(t.replace(/\d+ ?(gb|جيجا|tb|mah|انش)/g, '')), brand, spec: specs(t), use: Object.keys(USE).filter(k => USE[k].test(t)) };
}
export function rank(list, need) {
  return list.filter(p => !need.cat || catOf(p) === need.cat).map(p => { const s = text(p), sp = specs(s); let sc = 0;
    if (need.cat && catOf(p) === need.cat) sc += 5; if (need.brand && s.includes(need.brand)) sc += 4;
    if (need.budget) sc += price(p) <= need.budget ? 3 : -4; if (need.spec.storage && sp.storage >= need.spec.storage) sc += 2; if (need.spec.ram && sp.ram >= need.spec.ram) sc += 2;
    need.use.forEach(u => { if (USE[u].test(s)) sc += 2; }); if (need.use.includes('cheap')) sc -= price(p) / 5000;
    return { p, sc }; }).filter(x => x.sc > 0).sort((a, b) => b.sc - a.sc).slice(0, 6);
}
const say = n => [n.cat && T(CAT_N[n.cat]), n.brand, n.budget && `≤ ${n.budget}`, n.spec.storage && `${n.spec.storage}GB`, n.spec.ram && `RAM ${n.spec.ram}GB`].filter(Boolean).join(' · ');
export default function open() {
  const w = sheet(T({ ar: 'مستشارك التقني', en: 'Tech advisor' }), `<div class="tk-chat" aria-live="polite"><p class="tk-bot">${T({ ar: 'وش تدور؟ مثال: «جوال سامسونج تصويره قوي تحت 2000» أو «بطاقة بلايستيشن 100»', en: 'What are you looking for? e.g. "Samsung phone, great camera, under 2000"' })}</p></div>
  <form class="tk-ask"><input name="q" autocomplete="off" placeholder="${T({ ar: 'اكتب طلبك…', en: 'Type your need…' })}"><button>${T({ ar: 'اقترح', en: 'Suggest' })}</button></form>`);
  const chat = w.querySelector('.tk-chat');
  w.querySelector('form').addEventListener('submit', async e => { e.preventDefault(); const q = e.target.q.value.trim(); if (!q) return; e.target.q.value = '';
    chat.insertAdjacentHTML('beforeend', `<p class="tk-me">${esc(q)}</p>`); const need = understand(q), res = rank(await products(), need);
    chat.insertAdjacentHTML('beforeend', `<div class="tk-bot"><small>${esc(say(need) || T({ ar: 'فهمت طلبك', en: 'Got it' }))}</small>${res.length ? `<div class="tk-grid">${res.map(x => card(x.p)).join('')}</div>` : T({ ar: 'ما لقيت تطابق كامل، جرّب ميزانية أعلى أو نوع ثاني.', en: 'No close match, try a higher budget or another category.' })}</div>`);
    chat.scrollTop = chat.scrollHeight; });
}
