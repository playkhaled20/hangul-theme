/* Hangul · preview demo skin.
   Salla previews every theme on its own demo store, which sells fashion. In PREVIEW ONLY (Salla theme preview /
   salla.design / ?oc_preview) this swaps the demo store's product cards, header menu and store read for tech demo
   content of the chosen store type, using the theme's bundled real photos. A live store is never touched. */
import { VERTICALS, vt } from './verticals';

const B = document.body, ar = () => (document.documentElement.lang || 'ar').startsWith('ar');
export const isPreview = () => { const h = location.hostname, q = new URLSearchParams(location.search);
  return q.has('oc_preview') || B.dataset.ocMode === 'preview' || /(^|\.)salla\.design$/.test(h) || h === 'localhost' || !!window.salla?.config?.get?.('store.preview'); };

const P = { // name ar | name en | price | old price (0 = none) | photo that shows this very product
  electronics: 'شاشة OLED ‏65 بوصة|65" OLED TV|6499|7299|electronics-bestsellers;نظام مسرح منزلي 5.1|5.1 home theatre|4299|0|audio-bundle;تابلت مع لوحة مفاتيح وقلم|Tablet with keyboard & pen|2899|3199|electronics-bundle;باقة جوال وساعة وسماعات|Phone, watch & earbuds set|6199|0|electronics-featured;سماعة رأس بعزل الضوضاء|Noise-cancelling headphones|1199|1399|audio-featured;لابتوب 14 بوصة|14" laptop|5799|0|computers-featured;طقم أمان منزلي ذكي|Smart home security kit|899|999|smarthome-bestsellers;ساعة ذكية رياضية|Sport smartwatch|1399|0|watches-bestsellers',
  phones: 'آيفون 17 برو ماكس 256GB|iPhone 17 Pro Max 256GB|5399|5899|phones-featured;آيفون 17 برو — أربعة ألوان|iPhone 17 Pro — four finishes|4699|0|phones-bestsellers;جوال برو مع سماعة لاسلكية|Pro phone with wireless earbuds|5199|5599|phones-bundle;جالكسي S26 ألترا|Galaxy S26 Ultra|4899|0|phones-featured;كفرات حماية وحماية شاشة|Cases & screen protectors|129|159|accessories-bestsellers;شاحن سريع جداري وسيارة|Wall & car fast charger|179|0|accessories-bundle;باور بانك وشاحن لاسلكي|Power bank & wireless charger|249|299|accessories-featured;سماعة إيربودز برو|AirPods Pro|999|0|audio-bestsellers',
  watches: 'ساعة ذكية رياضية — ثلاثة ألوان|Sport smartwatch — three finishes|1399|1599|watches-bestsellers;ساعة كلاسيكية ذهبية وردية|Rose-gold classic watch|2499|0|watches-featured;ساعة مع أحزمة جلد إضافية|Watch with spare leather straps|1899|2199|watches-bundle;ساعة أبل ألترا 3|Apple Watch Ultra 3|3499|0|watches-bestsellers;جالكسي ووتش 8|Galaxy Watch 8|1299|1499|watches-bestsellers;سير ساعة جلد|Leather watch strap|149|0|watches-bundle;باقة جوال وساعة وسماعات|Phone, watch & earbuds set|6199|0|electronics-featured;شاحن لاسلكي مغناطيسي|Magnetic wireless charger|99|0|accessories-featured',
  computers: 'ماك بوك برو M5 ‏14 بوصة|MacBook Pro M5 14"|8499|0|computers-featured;كمبيوتر قيمنق مع شاشة|Gaming PC with monitor|7999|8799|computers-bestsellers;طقم مكتبي: ماوس وكيبورد وموزع|Desk set: mouse, keyboard & hub|599|699|computers-bundle;كيبورد ميكانيكي RGB|RGB mechanical keyboard|399|0|gaming-bestsellers;آيباد مع كيبورد وقلم|iPad with keyboard & pencil|3299|0|electronics-bundle;لابتوب للمبرمجين|Developer laptop|6499|6999|software-featured;موزع USB-C ‏7 في 1|7-in-1 USB-C hub|179|0|computers-bundle;شاشة 27 بوصة 4K|27" 4K monitor|1899|0|computers-bestsellers',
  gaming: 'بلايستيشن 5 برو مع يدين|PlayStation 5 Pro with two controllers|2999|3299|gaming-featured;جهاز ألعاب محمول مع قاعدة|Handheld console with dock|1899|0|gaming-bundle;طقم قيمنق: سماعة وكيبورد وماوس|Gaming set: headset, keyboard & mouse|899|999|gaming-bestsellers;يد تحكم لاسلكية|Wireless controller|299|0|gaming-featured;بطاقة PSN ‏100 ريال|PSN card SAR 100|100|0|digital_cards-bundle;كمبيوتر قيمنق|Gaming PC|7999|0|computers-bestsellers;سماعة قيمنق|Gaming headset|499|599|gaming-bestsellers;حقيبة جهاز الألعاب المحمول|Handheld console case|149|0|gaming-bundle',
  audio: 'سماعة رأس فاخرة|Premium headphones|1499|1699|audio-featured;إيربودز ومكبر صوت محمول|Earbuds & portable speaker|1199|0|audio-bestsellers;مسرح منزلي 5.1|5.1 home theatre|4299|4799|audio-bundle;مكبر صوت محمول|Portable speaker|599|0|audio-bestsellers;جوال مع سماعة لاسلكية|Phone with wireless earbuds|5199|0|phones-bundle;سماعة لاسلكية للمكتب|Wireless office headphones|699|799|electronics-bundle;مكبر صوت ذكي|Smart speaker|349|0|smarthome-featured;سماعة قيمنق|Gaming headset|499|0|gaming-bestsellers',
  digital_cards: 'بطاقة iTunes ‏100 ريال|iTunes card SAR 100|100|0|digital_cards-featured;بطاقة PSN ‏200 ريال|PSN card SAR 200|200|0|digital_cards-bundle;بطاقة Steam ‏50$|Steam card $50|195|0|digital_cards-featured;بطاقة هدية رقمية|Digital gift card|150|0|digital_cards-bestsellers;اشتراك Xbox Game Pass|Xbox Game Pass|89|0|digital_cards-bundle;بطاقة Google Play|Google Play card|50|0|digital_cards-bestsellers;اشتراك نتفليكس|Netflix subscription|56|0|digital_cards-featured;بطاقة نينتندو eShop|Nintendo eShop card|100|0|gaming-bundle',
  smarthome: 'طقم كاميرا وجرس ومقبس ذكي|Camera, doorbell & smart plug kit|899|999|smarthome-bestsellers;كاميرا مراقبة ذكية|Smart security camera|299|349|smarthome-bestsellers;منظم حرارة ذكي|Smart thermostat|749|0|smarthome-bundle;مكبر صوت ذكي مع إضاءة|Smart speaker with lighting|449|0|smarthome-featured;حساس حركة ذكي|Smart motion sensor|99|0|smarthome-bundle;لمبة ذكية|Smart bulb|69|89|smarthome-featured;جرس باب بكاميرا|Video doorbell|549|0|smarthome-bestsellers;مقبس ذكي|Smart plug|79|0|smarthome-bestsellers',
  cameras: 'كاميرا احترافية مع عدسة|Pro camera with lens|9999|10999|cameras-featured;كاميرا ميرورليس مع عدستين|Mirrorless camera with two lenses|8499|0|cameras-bundle;كاميرا أكشن|Action camera|1799|0|cameras-bestsellers;درون ميني|Mini drone|2899|3199|cameras-bestsellers;كاميرا كومباكت|Compact camera|1499|0|cameras-bestsellers;عدسة 50mm f/1.8|50mm f/1.8 lens|899|0|cameras-bundle;بطاقة ذاكرة 256GB|256GB memory card|189|0|cameras-bundle;حقيبة كاميرا|Camera bag|249|0|cameras-bundle',
  accessories: 'كفرات حماية وحماية شاشة|Cases & screen protectors|129|159|accessories-bestsellers;شاحن سريع جداري وسيارة|Wall & car fast charger|179|0|accessories-bundle;كيبل USB-C مضفر|Braided USB-C cable|59|0|accessories-featured;باور بانك 20000|20000mAh power bank|149|199|accessories-featured;شاحن لاسلكي|Wireless charger|129|0|accessories-featured;حماية شاشة زجاجية|Glass screen protector|59|0|accessories-bestsellers;موزع USB-C|USB-C hub|179|0|computers-bundle;حقيبة شواحن وأسلاك|Charger & cable pouch|99|0|accessories-bundle',
  software: 'ترخيص Windows 11 برو|Windows 11 Pro license|299|399|software-bundle;اشتراك Microsoft 365|Microsoft 365|349|0|software-featured;ترخيص أدوبي|Adobe license|899|0|software-bestsellers;مضاد فيروسات 3 أجهزة|Antivirus, 3 devices|149|199|software-bundle;برنامج VPN سنة|VPN, 1 year|129|0|software-featured;برنامج تحليل بيانات|Data analytics software|599|0|software-bestsellers;ترخيص Windows 11 هوم|Windows 11 Home license|199|0|software-bundle;برنامج تصميم|Design software|599|0|software-bestsellers'
};
const MODES = ['featured', 'bestsellers', 'bundle'];
const asset = name => (B.dataset.ocImg || '').replace(/[^/]*\.webp(\?.*)?$/, `${name}.webp$1`);

export function demoPack(v) {
  const V = VERTICALS[v] ? v : 'electronics';
  const ps = (P[V] || P.electronics).split(';').map((s, i) => { const [a, e, p, w, k] = s.split('|'); const price = +p, was = +w || null;
    return { id: 9000 + i, name: ar() ? a : e, url: '#', img: asset(k), price, was, sale: !!was, out: false, stars: [4.8, 4.6, 4.7, 4.5, 4.9, 4.4, 4.6, 4.7][i], reviews: [214, 162, 88, 301, 120, 64, 45, 140][i], sold: [320, 180, 90, 260, 140, 60, 40, 150][i], digital: V === 'digital_cards' || V === 'software' }; });
  const cats = (VERTICALS[V].cats || [V]).map((c, i) => ({ id: null, name: ar() ? VERTICALS[c].ar : VERTICALS[c].en, url: '#', img: asset(`${c}-${MODES[i % 3]}`), sub: [], v: c }));
  return { v: V, ps, cats };
}

const money = n => `${Math.round(n).toLocaleString('en-US')} ${ar() ? 'ر.س' : 'SAR'}`;
/* keep the demo store's own price format (currency symbol, position) and swap only the number */
const like = (el, n) => { const t = (el && el.textContent || '').trim(); return /[\d٠-٩]/.test(t) ? t.replace(/[\d٠-٩][\d٠-٩.,]*/, Math.round(n).toLocaleString('en-US')) : money(n); };
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
    /* each top item is keyed by its ORIGINAL label (or id), so Salla's mobile + desktop twins get the same tech category;
       «تخفيضات»/«المزيد» and any extra item are hidden with !important (the mobile drawer's own CSS would show them again) */
    const orig = li => { if (!li.dataset.ocOrig) li.dataset.ocOrig = li.id || (li.querySelector(':scope > a, :scope > span') || li).textContent.trim(); return li.dataset.ocOrig; };
    const special = li => li.id === 'offers' || li.id === 'more-menu-dropdown' || /^(تخفيضات|العروض|المزيد|offers|more)$/i.test(orig(li));
    const items = [...menu.children].filter(li => li.tagName === 'LI'), keys = [];
    items.forEach(li => { if (!special(li) && orig(li) && !keys.includes(orig(li))) keys.push(orig(li)); });
    items.forEach(li => {
      const c = special(li) ? null : pack.cats[keys.indexOf(orig(li))];
      if (!c) { li.classList.add('oc-hide'); return; }
      li.classList.remove('oc-hide');
      const label = li.querySelector(':scope > a span') || li.querySelector(':scope > span') || li.querySelector(':scope > a');
      if (label && label.textContent !== c.name) label.textContent = c.name;
      const a = li.querySelector(':scope > a'); if (a) a.setAttribute('aria-label', c.name);
      li.querySelectorAll(':scope > ul, :scope .sub-menu').forEach(u => u.classList.add('oc-hide')); // fashion sub-categories / products
      li.querySelectorAll('img').forEach(i => { if (i.getAttribute('src') !== c.img) { i.src = c.img; i.alt = c.name; } });
    });
  });
}
/* the demo store's fashion logo (a clothes hanger) → a HANGUL wordmark with the chosen type */
function skinLogo(pack) {
  const V = VERTICALS[pack.v] || VERTICALS.electronics;
  document.querySelectorAll('.navbar-brand, footer .store-logo, footer a[href] > img[alt*="logo"]').forEach(a => {
    const img = a.tagName === 'IMG' ? a : a.querySelector('img'); if (!img || img.dataset.ocLogo) return; img.dataset.ocLogo = '1';
    img.classList.add('oc-hide');
    const w = document.createElement('span'); w.className = 'oc-demo-logo'; w.innerHTML = `<b>HANGUL</b><small>${ar() ? V.ar : V.en}</small>`;
    img.insertAdjacentElement('afterend', w);
  });
}

/* everything else the fashion demo store shows (Salla banners / sliders / category blocks / section titles / product page)
   is swept in preview: fashion words → the type's own wording, store photos → the theme's tech photos. */
const FASHION = /(فستان|فساتين|بلوز|بلايز|عباي|جاكيت|بنطلون|بناطيل|تنور|تنانير|أزياء|ازياء|ملابس|قميص|قمصان|شنط|حقائب|أحذية|احذية|كعب|طرح|شيل|لانجري|dress|blouse|fashion|jacket|abaya|skirt|pants|trouser|shirt|cloth|outfit|heels|handbag)/i;
const OWN = '.main-menu, #mobile-menu, .oc-demo-logo, .oc-pk, .oc-ai, .oc-cc, .oc-dock, [data-oc-sec], .oc-hero, .oc-cats, .oc-smart-host, .oc-vsec, .oc-trust, custom-salla-product-card, .s-product-card-entry, script, style, noscript';
const themeImg = src => !src || /\/images\/oc\/|placeholder|data:image|sicon|\.svg(\?|$)/.test(src);
function sweep(pack) {
  const V = VERTICALS[pack.v] || VERTICALS.electronics, nm = ar() ? V.ar : V.en; let ci = 0, pi = 0;
  const nextCat = () => pack.cats[ci++ % pack.cats.length].name, nextPic = () => { const p = pack.ps[pi++ % pack.ps.length]; return p.img; };
  const root = document.querySelector('#main-content, main') || B;
  /* texts */
  const tw = document.createTreeWalker(B, NodeFilter.SHOW_TEXT); const hits = [];
  while (tw.nextNode()) { const n = tw.currentNode, el = n.parentElement; if (!el || el.closest(OWN) || !FASHION.test(n.textContent)) continue; hits.push(n); }
  hits.forEach(n => { const el = n.parentElement, t = n.textContent.trim();
    n.textContent = el.closest('h1, h2, h3, h4, .banner__title, .s-block__title') ? (t.length < 26 ? nextCat() : `${ar() ? 'مختارات' : 'Featured'} ${nm}`) : t.length < 26 ? nextCat() : vt(V.hero); });
  /* photos and background photos from the demo store */
  root.querySelectorAll('img').forEach(img => { if (img.closest(OWN) || img.dataset.ocSwept) return; const src = img.currentSrc || img.getAttribute('src') || img.dataset.src || '';
    if (themeImg(src) || img.closest('.store-header, header, footer')) return; img.dataset.ocSwept = '1'; const n = nextPic(); img.src = n; img.removeAttribute('srcset'); if (img.dataset.src) img.dataset.src = n; });
  root.querySelectorAll('[data-bg], .banner-entry, .swiper-slide [style*="background-image"]').forEach(e => { if (e.closest(OWN) || e.dataset.ocSwept) return;
    const bg = e.dataset.bg || e.style.backgroundImage || ''; if (!bg || themeImg(bg)) return; e.dataset.ocSwept = '1'; const n = nextPic(); if (e.dataset.bg) e.dataset.bg = n; e.style.backgroundImage = `url("${n}")`; });
}
/* product page in preview: one tech demo product (stable per URL) */
function skinProduct(pack) {
  const h1 = document.querySelector('[data-testid="store-product-title"], .product-single h1, .product-entry__title, main h1'); if (!h1 || !document.querySelector('salla-add-product-button, .product-form, [class*="product-single"]')) return;
  const once = e => !e || e.dataset.ocDemo ? false : (e.dataset.ocDemo = '1', true); // each element is skinned once (late renders still get theirs)
  let h = 0; for (const ch of location.pathname) h = (h * 31 + ch.charCodeAt(0)) >>> 0; const k = h % pack.ps.length, p = pack.ps[k], V = VERTICALS[pack.v] || VERTICALS.electronics;
  if (once(h1)) { h1.textContent = p.name; document.title = p.name; }
  const gal = document.querySelector('salla-slider.details-slider, .details-slider, .product-single__images, .product-single salla-slider, .product__images') || document.querySelector('main');
  let i = 0; gal.querySelectorAll('img').forEach(img => { if (themeImg(img.getAttribute('src'))) return; img.src = pack.ps[(k + i++) % pack.ps.length].img; img.removeAttribute('srcset'); img.alt = p.name; img.dataset.ocSwept = '1'; });
  /* prices: the title price block, the form / sticky bar prices; old price only when the demo product has an offer */
  document.querySelectorAll('[data-testid="store-product-price"] p, .total-price, .product-entry__price, .sticky-product-bar .total-price').forEach(e => { if (once(e)) e.textContent = like(e, p.price); });
  document.querySelectorAll('[data-testid="store-product-price"] .line-through, .before-price').forEach(e => { if (once(e)) { if (p.was) e.textContent = like(e, p.was); else e.style.display = 'none'; } });
  /* sub-title / sku / sizes copied from the fashion product */
  document.querySelectorAll('.product-entry__sub-title').forEach(e => { if (once(e)) e.textContent = vt(V.hero); });
  const desc = document.querySelector('.product__description .article--main, .product__description, .product-single__description');
  if (once(desc)) desc.innerHTML = `<p>${vt(V.hero)}</p><ul>${(V.specs || []).map(([l]) => `<li>${vt(l)}</li>`).join('')}</ul>`;
  document.querySelectorAll('salla-product-options, .s-product-options-wrapper, .product-options, [data-size-guide]').forEach(e => { e.style.display = 'none'; });
}

export function initDemo() {
  if (!isPreview()) return;
  B.classList.add('oc-demo');
  if (!document.getElementById('oc-demo-css')) { const st = document.createElement('style'); st.id = 'oc-demo-css';
    st.textContent = '.oc-demo .oc-hide{display:none!important}.oc-demo-logo{display:inline-grid;line-height:1;text-align:center;gap:3px}.oc-demo-logo b{font-weight:900;letter-spacing:.32em;font-size:20px;background:linear-gradient(180deg,#f3e2bd,#d9b779 55%,#8a6a3a);-webkit-background-clip:text;background-clip:text;color:transparent}.oc-demo-logo small{font-size:10px;letter-spacing:.12em;opacity:.75}';
    document.head.appendChild(st); }
  let t = 0; const run = () => { const pack = demoPack(vOf()); skinLogo(pack); skinCards(pack); skinMenu(pack); try { skinProduct(pack); sweep(pack); } catch (e) {  } };
  run(); setTimeout(run, 600); setTimeout(run, 2000);
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(run, 160); }).observe(B, { childList: true, subtree: true });
  /* a different type picked in the preview picker: reload so every section reads the new demo store cleanly */
  document.addEventListener('oc:type', () => setTimeout(() => location.reload(), 350));
}
