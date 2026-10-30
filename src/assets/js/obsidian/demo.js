/* Hangul · preview demo skin.
   Salla previews every theme on its own demo store, which sells fashion. In PREVIEW ONLY (Salla theme preview /
   salla.design / ?oc_preview) this swaps the demo store's product cards, header menu and store read for tech demo
   content of the chosen store type, using the theme's bundled real photos. A live store is never touched. */
import { VERTICALS } from './verticals';

const B = document.body, ar = () => (document.documentElement.lang || 'ar').startsWith('ar');
export const isPreview = () => { const h = location.hostname, q = new URLSearchParams(location.search);
  return q.has('oc_preview') || B.dataset.ocMode === 'preview' || /(^|\.)salla\.design$/.test(h) || h === 'localhost' || !!window.salla?.config?.get?.('store.preview'); };

/* name ar | name en | price | old price (0 = no offer) */
const P = {
  electronics: 'شاشة OLED ‏65 بوصة|65" OLED TV|6499|7299;جهاز عرض 4K|4K projector|3299|0;مكبر صوت ساوند بار|Soundbar|1299|1499;سماعة لاسلكية بعزل ضوضاء|ANC headphones|1199|0;جوال برو 256GB|Pro phone 256GB|4999|0;ساعة ذكية رياضية|Sport smartwatch|1399|1599;لابتوب 14 بوصة|14" laptop|5799|0;كاميرا مراقبة منزلية|Home security camera|299|349',
  phones: 'آيفون 17 برو ماكس 256GB|iPhone 17 Pro Max 256GB|5399|5899;جالكسي S26 ألترا|Galaxy S26 Ultra|4899|0;جوال بكسل 10 برو|Pixel 10 Pro|3999|4299;جالكسي Z فولد|Galaxy Z Fold|6999|0;شاحن سريع 45W|45W fast charger|149|0;كفر ماج سيف شفاف|Clear MagSafe case|129|159;حماية شاشة زجاجية|Glass screen protector|59|0;سماعة إيربودز برو|AirPods Pro|999|1099',
  watches: 'ساعة أبل ألترا 3|Apple Watch Ultra 3|3499|0;جالكسي ووتش 8|Galaxy Watch 8|1299|1499;ساعة جارمن فينكس|Garmin Fenix|2899|0;سوار ذكي رياضي|Smart fitness band|199|249;سير ساعة جلد|Leather watch strap|149|0;شاحن ساعة مغناطيسي|Magnetic watch charger|99|0;ساعة ذكية للأطفال|Kids smartwatch|399|0;حماية شاشة الساعة|Watch screen guard|49|0',
  computers: 'ماك بوك برو M5 ‏14 بوصة|MacBook Pro M5 14"|8499|0;لابتوب قيمنق RTX|RTX gaming laptop|6999|7799;شاشة 27 بوصة 4K|27" 4K monitor|1899|0;كيبورد ميكانيكي|Mechanical keyboard|399|449;ماوس لاسلكي|Wireless mouse|199|0;موزع USB-C|USB-C hub|179|0;قرص SSD ‏1TB|1TB SSD|449|529;آيباد إير|iPad Air|2799|0',
  gaming: 'بلايستيشن 5 برو|PlayStation 5 Pro|2999|0;يد تحكم DualSense|DualSense controller|299|349;نينتندو سويتش 2|Nintendo Switch 2|1899|0;سماعة قيمنق|Gaming headset|499|0;كرسي قيمنق|Gaming chair|1199|1399;كيبورد RGB|RGB keyboard|349|0;بطاقة PSN ‏100 ريال|PSN card SAR 100|100|0;شاشة قيمنق 165Hz|165Hz gaming monitor|1299|0',
  audio: 'سماعة سوني WH-1000XM6|Sony WH-1000XM6|1499|1699;إيربودز برو 3|AirPods Pro 3|999|0;مكبر صوت محمول|Portable speaker|599|699;ساوند بار 5.1|5.1 soundbar|2199|0;سماعة رياضية لاسلكية|Wireless sport earbuds|349|0;مضخم صوت منزلي|Home subwoofer|1499|0;ميكروفون بودكاست|Podcast mic|649|749;مشغل أسطوانات|Turntable|1299|0',
  digital_cards: 'بطاقة iTunes ‏100 ريال|iTunes card SAR 100|100|0;بطاقة PSN ‏200 ريال|PSN card SAR 200|200|0;بطاقة Steam ‏50$|Steam card $50|195|0;اشتراك Xbox Game Pass|Xbox Game Pass|89|0;بطاقة Google Play|Google Play card|50|0;اشتراك نتفليكس|Netflix subscription|56|0;بطاقة نينتندو|Nintendo eShop card|100|0;اشتراك سبوتيفاي|Spotify subscription|22|0',
  smarthome: 'كاميرا مراقبة ذكية|Smart security camera|299|349;جرس باب ذكي|Smart doorbell|549|0;قفل باب ذكي|Smart door lock|899|999;مكبر صوت ذكي|Smart speaker|349|0;إضاءة ذكية RGB|Smart RGB lights|149|0;حساس حركة|Motion sensor|99|0;مقبس ذكي|Smart plug|79|99;مكنسة روبوت|Robot vacuum|1499|0',
  cameras: 'كاميرا كانون R6 Mark III|Canon R6 Mark III|9999|10999;عدسة 50mm f/1.8|50mm f/1.8 lens|899|0;كاميرا GoPro 13|GoPro 13|1799|0;درون DJI ميني|DJI Mini drone|2899|3199;حامل جيمبال|Gimbal stabilizer|599|0;بطاقة ذاكرة 256GB|256GB memory card|189|0;حقيبة كاميرا|Camera bag|249|0;إضاءة تصوير LED|LED studio light|399|0',
  accessories: 'شاحن سريع 65W|65W fast charger|179|0;باور بانك 20000|20000mAh power bank|149|199;كيبل USB-C مضفر|Braided USB-C cable|59|0;حامل جوال للسيارة|Car phone mount|89|0;شاحن لاسلكي|Wireless charger|129|149;موزع USB-C|USB-C hub|179|0;حقيبة لابتوب|Laptop sleeve|149|0;كفر حماية|Protective case|99|0',
  software: 'ترخيص Windows 11 برو|Windows 11 Pro license|299|399;اشتراك Microsoft 365|Microsoft 365|349|0;ترخيص أدوبي|Adobe license|899|0;مضاد فيروسات 3 أجهزة|Antivirus, 3 devices|149|199;برنامج VPN سنة|VPN, 1 year|129|0;ترخيص Windows 11 هوم|Windows 11 Home license|199|0;اشتراك سحابة 1TB|1TB cloud|249|0;برنامج تصميم|Design software|599|0'
};
const MODES = ['featured', 'bestsellers', 'bundle'];
const asset = name => (B.dataset.ocImg || '').replace(/[^/]*\.webp(\?.*)?$/, `${name}.webp$1`);
/* photos for a type: its own three, then its related types' */
const pics = v => { const V = VERTICALS[v] || VERTICALS.electronics; const out = []; [v, ...V.cats.filter(c => c !== v)].forEach(k => MODES.forEach(m => out.push(asset(`${k}-${m}`)))); return out; };

export function demoPack(v) {
  const V = VERTICALS[v] ? v : 'electronics', im = pics(V);
  const ps = (P[V] || P.electronics).split(';').map((s, i) => { const [a, e, p, w] = s.split('|'); const price = +p, was = +w || null;
    return { id: 9000 + i, name: ar() ? a : e, url: '#', img: im[i % im.length], price, was, sale: !!was, out: false, stars: [4.8, 4.6, 4.7, 4.5, 4.9, 4.4, 4.6, 4.7][i], reviews: [214, 162, 88, 301, 120, 64, 45, 140][i], sold: [320, 180, 90, 260, 140, 60, 40, 150][i], digital: V === 'digital_cards' || V === 'software' }; });
  const cats = (VERTICALS[V].cats || [V]).map((c, i) => ({ id: null, name: ar() ? VERTICALS[c].ar : VERTICALS[c].en, url: '#', img: asset(`${c}-${MODES[i % 3]}`), sub: [], v: c }));
  return { v: V, ps, cats };
}

const money = n => `${Math.round(n).toLocaleString('en-US')} ${ar() ? 'ر.س' : 'SAR'}`;
/* the preview's store type: picker choice (?oc_type / session) → merchant setting → electronics. Never the fashion demo store's own words. */
export const demoV = () => { let v = ''; try { v = new URLSearchParams(location.search).get('oc_type') || sessionStorage.getItem('oc_type') || ''; } catch (e) {  }
  const set = B.dataset.ocVertical; return VERTICALS[v] ? v : VERTICALS[set] ? set : 'electronics'; };
const vOf = () => (isPreview() ? demoV() : B.dataset.ocV) || 'electronics';

function skinCards(pack) {
  const cards = [...document.querySelectorAll('custom-salla-product-card, .s-product-card-entry')].filter(c => !c.parentElement?.closest('custom-salla-product-card'));
  cards.forEach((c, i) => {
    const p = pack.ps[i % pack.ps.length]; if (c.dataset.ocDemo === pack.v + i) return;
    const img = c.querySelector('.s-product-card-image img, .s-product-card-image-full img'); if (img) { img.src = p.img; img.alt = p.name; img.removeAttribute('srcset'); img.className = img.className.replace(/s-product-card-image-contain/, 's-product-card-image-cover'); }
    const t = c.querySelector('.s-product-card-content-title a, .s-product-card-content-title'); if (t) t.textContent = p.name;
    c.querySelectorAll('.s-product-card-content-subtitle').forEach(e => e.remove());
    const pr = c.querySelector('.s-product-card-sale-price, .s-product-card-price, .s-product-card-starting-price');
    if (pr) { const h = document.createElement('div'); h.innerHTML = p.was ? `<div class="s-product-card-sale-price"><h4>${money(p.price)}</h4><span>${money(p.was)}</span></div>` : `<h4 class="s-product-card-price">${money(p.price)}</h4>`; pr.replaceWith(h.firstElementChild); }
    if (c.product) c.product = { ...c.product, name: p.name, price: p.price, sale_price: p.price, regular_price: p.was || p.price, is_on_sale: !!p.was, is_out_of_stock: false, rating: { stars: p.stars, count: p.reviews }, sold_quantity: p.sold, quantity: null };
    c.querySelectorAll('.oc-card-intel, .oc-badge').forEach(e => e.remove()); c.classList.remove('oc-urgent');
    c.dataset.ocDemo = pack.v + i;
  });
}
function skinMenu(pack) {
  document.querySelectorAll('.main-menu').forEach(menu => {
    const items = [...menu.children].filter(li => li.tagName === 'LI' && !li.id);
    let k = 0;
    items.forEach(li => { const c = pack.cats[k]; const label = li.querySelector(':scope > a span') || li.querySelector(':scope > span') || li.querySelector(':scope > a');
      if (!label || /more|المزيد/i.test(li.textContent) && li.querySelector('ul')) return;
      if (!c) { li.hidden = true; return; }
      label.textContent = c.name; li.hidden = false; li.querySelectorAll('img').forEach(i => { i.src = c.img; i.alt = c.name; }); k++; });
  });
}

export function initDemo() {
  if (!isPreview()) return;
  B.classList.add('oc-demo');
  let t = 0; const run = () => { const pack = demoPack(vOf()); skinCards(pack); skinMenu(pack); };
  run(); setTimeout(run, 600); setTimeout(run, 2000);
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(run, 160); }).observe(B, { childList: true, subtree: true });
  /* a different type picked in the preview picker: reload so every section reads the new demo store cleanly */
  document.addEventListener('oc:type', () => setTimeout(() => location.reload(), 350));
}
