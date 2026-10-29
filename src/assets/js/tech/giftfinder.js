// giftfinder (tech): picks a tech gift by recipient (gamer, student, pro, kid, parent), budget, and falls back to digital gift cards when unsure.
import { T, sheet, products, card, catOf, price, text } from './kit';
export const WHO = {
  gamer: { ar: 'قيمر', en: 'Gamer', cats: { gaming: 5, cards: 4, audio: 2, accessories: 1 }, kw: /(psn|xbox|steam|controller|يد تحكم|headset)/ },
  student: { ar: 'طالب', en: 'Student', cats: { computers: 4, audio: 3, accessories: 3, software: 2 }, kw: /(لابتوب|تابلت|ipad|سماعه|office)/ },
  pro: { ar: 'موظف/محترف', en: 'Professional', cats: { computers: 4, wearables: 3, audio: 3, accessories: 2 }, kw: /(ماوس|كيبورد|شاشه|watch|anc)/ },
  kid: { ar: 'طفل', en: 'Kid', cats: { gaming: 4, cards: 4, audio: 1 }, kw: /(nintendo|switch|roblox|روبلوكس|minecraft)/ },
  parent: { ar: 'أب/أم', en: 'Parent', cats: { phones: 4, wearables: 4, smarthome: 3 }, kw: /(ساعه|جوال|كاميرا|سبيكر)/ },
  anyone: { ar: 'ما أدري', en: 'Not sure', cats: { cards: 5, accessories: 2 }, kw: /(بطاقه|gift card)/ }
};
export function pick(list, who, budget) { const W = WHO[who];
  return list.map(p => { let s = (W.cats[catOf(p)] || 0) + (W.kw.test(text(p)) ? 3 : 0); if (budget) s += price(p) <= budget ? 2 : -6; return { p, s }; })
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 6); }
export default function open() {
  const w = sheet(T({ ar: 'هدية تقنية', en: 'Tech gift finder' }), `<p>${T({ ar: 'لمين الهدية؟', en: 'Who is it for?' })}</p><div class="tk-chips">${Object.entries(WHO).map(([k, v]) => `<button type="button" data-w="${k}">${T(v)}</button>`).join('')}</div>
  <p>${T({ ar: 'الميزانية', en: 'Budget' })}</p><div class="tk-chips" data-b>${[100, 300, 1000, 3000, 0].map(b => `<button type="button" data-b="${b}">${b ? '≤ ' + b : T({ ar: 'مفتوحة', en: 'Any' })}</button>`).join('')}</div><div class="tk-grid"></div>`);
  let who = '', bud = 0; const grid = w.querySelector('.tk-grid');
  const go = async () => { if (!who) return; const r = pick(await products(), who, bud);
    grid.innerHTML = r.map(x => card(x.p, catOf(x.p) === 'cards' ? T({ ar: 'تنرسل فورًا كهدية رقمية', en: 'Sent instantly as a digital gift' }) : '')).join('') || T({ ar: 'جرّب بطاقة رقمية — تناسب الكل.', en: 'Try a digital gift card — fits anyone.' }); };
  w.addEventListener('click', e => { const a = e.target.closest('[data-w]'), b = e.target.closest('button[data-b]');
    if (a) { who = a.dataset.w; w.querySelectorAll('[data-w]').forEach(x => x.classList.toggle('on', x === a)); go(); }
    if (b) { bud = +b.dataset.b; w.querySelectorAll('button[data-b]').forEach(x => x.classList.toggle('on', x === b)); go(); } });
}
