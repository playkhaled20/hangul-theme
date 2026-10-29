// bundle (tech, replaces "look"): "Complete your setup" on a product page — finds COMPATIBLE accessories (charger, case, controller, cards for the same platform).
import { T, d, $, products, card, pdp, catOf, norm, text } from './kit';
const NEEDS = { phones: [/(كفر|case|حمايه|screen protector)/, /(شاحن|charger|كيبل|cable)/, /(سماع|airpods|earbuds)/], computers: [/(ماوس|mouse)/, /(كيبورد|keyboard)/, /(شنطه|sleeve|bag)/, /(ssd|هارد)/],
  gaming: [/(يد تحكم|controller)/, /(بطاقه|psn|xbox|nintendo eshop|gift)/, /(headset|سماعه)/], audio: [/(كيبل|case|adapter)/], cameras: [/(ذاكره|sd card|memory)/, /(ترايبود|tripod)/], cards: [/(بطاقه|card)/] };
const PLAT = ['iphone', 'ايفون', 'samsung', 'سامسونج', 'ps5', 'بلايستيشن', 'xbox', 'nintendo', 'macbook', 'usb-c', 'lightning', 'magsafe'];
export function compatible(main, list) { const mt = norm(main.name + ' ' + main.desc), c = catOf(mt), plats = PLAT.filter(x => mt.includes(x)), N = NEEDS[c] || [];
  return list.filter(p => String(p.id) !== String(main.id)).map(p => { const t = text(p); let s = N.findIndex(re => re.test(t)); s = s < 0 ? 0 : 5 - s; plats.forEach(x => { if (t.includes(x)) s += 3; }); return { p, s }; })
    .filter(x => x.s > 2).sort((a, b) => b.s - a.s).slice(0, 4); }
export default async function mount() { const main = pdp(); if (!main) return; const r = compatible(main, await products()); if (!r.length) return;
  const sec = d.createElement('section'); sec.className = 'tk-bundle';
  sec.innerHTML = `<h3>${T({ ar: 'كمّل جهازك — متوافق معه', en: 'Complete your setup — compatible' })}</h3><div class="tk-grid">${r.map(x => card(x.p)).join('')}</div>`;
  ($('.product-single, main') || d.body).appendChild(sec); }
