/* Hangul · preview demo skin.
   Salla previews every theme on its own demo store, which sells fashion. In PREVIEW ONLY (Salla theme preview /
   salla.design / ?oc_preview) this swaps the demo store's product cards, header menu and store read for tech demo
   content of the chosen store type, using the theme's bundled real photos. A live store is never touched. */
import { VERTICALS, vt } from './verticals';

const B = document.body, ar = () => (document.documentElement.lang || 'ar').startsWith('ar');
/* Salla's demo hosts (never a merchant's live store): once a preview was opened there, the pages it links to stay in preview */
const demoHost = h => /(^|\.)salla\.design$/.test(h) || h === 'demostore.salla.sa';
export const isPreview = () => { const h = location.hostname, q = new URLSearchParams(location.search);
  const on = q.has('oc_preview') || q.has('oc_p') || B.dataset.ocMode === 'preview' || /(^|\.)salla\.design$/.test(h) || h === 'localhost' || !!window.salla?.config?.get?.('store.preview');
  try { if (on && demoHost(h)) sessionStorage.setItem('oc_preview', '1'); return on || (demoHost(h) && sessionStorage.getItem('oc_preview') === '1'); } catch (e) { return on; } };

const P = { // name ar | name en | price | old price (0 = none) | photo that shows this very product — each photo once per type
  electronics: 'شاشة OLED ‏65 بوصة|65" OLED TV|6499|7299|electronics-bestsellers;نظام مسرح منزلي 5.1|5.1 home theatre|4299|0|audio-bundle;تابلت مع سماعة وكيبورد وقلم|Tablet with headphones, keyboard & pen|2899|3199|electronics-bundle;باقة جوال وساعة وسماعات وتابلت|Phone, watch, earbuds & tablet set|6199|0|electronics-featured;سماعة رأس بعزل الضوضاء|Noise-cancelling headphones|1199|1399|audio-featured;لابتوب 14 بوصة|14" laptop|5799|0|computers-featured;طقم كاميرا وجرس ومقبس ذكي|Camera, doorbell & smart plug kit|899|999|smarthome-bestsellers;ساعات ذكية رياضية|Sport smartwatches|1399|0|watches-bestsellers',
  phones: 'آيفون 17 برو ماكس 256GB|iPhone 17 Pro Max 256GB|5399|5899|phones-featured;آيفون 17 برو — أربعة ألوان|iPhone 17 Pro — four finishes|4699|0|phones-bestsellers;جوال برو مع سماعة لاسلكية|Pro phone with wireless earbuds|5199|5599|phones-bundle;كفرات حماية وحماية شاشة|Cases & screen protectors|129|159|accessories-bestsellers;شاحن سريع جداري وسيارة مع حقيبة|Wall & car fast charger with pouch|179|0|accessories-bundle;باور بانك وشاحن لاسلكي وكيابل|Power bank, wireless charger & cables|249|299|accessories-featured;إيربودز ومكبر صوت محمول|Earbuds & portable speaker|999|0|audio-bestsellers;باقة جوال وساعة وسماعات|Phone, watch & earbuds set|6199|0|electronics-featured',
  watches: 'ساعات ذكية رياضية — ثلاثة ألوان|Sport smartwatches — three finishes|1399|1599|watches-bestsellers;ساعة كلاسيكية ذهبية وردية|Rose-gold classic watch|2499|0|watches-featured;ساعة مع أحزمة جلد إضافية|Watch with spare leather straps|1899|2199|watches-bundle;باقة جوال وساعة وسماعات|Phone, watch & earbuds set|6199|0|electronics-featured;شاحن لاسلكي وباور بانك وكيابل|Wireless charger, power bank & cables|249|0|accessories-featured;إيربودز ومكبر صوت محمول|Earbuds & portable speaker|999|1099|audio-bestsellers',
  computers: 'ماك بوك برو M5 ‏14 بوصة|MacBook Pro M5 14"|8499|0|computers-featured;كمبيوتر قيمنق مع شاشة|Gaming PC with monitor|7999|8799|computers-bestsellers;طقم مكتبي: لابتوب وماوس وكيبورد وموزع|Desk set: laptop, mouse, keyboard & hub|5999|6499|computers-bundle;طقم قيمنق: سماعة وكيبورد RGB وماوس|Gaming set: headset, RGB keyboard & mouse|899|0|gaming-bestsellers;تابلت مع كيبورد وقلم|Tablet with keyboard & pen|3299|0|electronics-bundle;لابتوب للمبرمجين|Developer laptop|6499|6999|software-featured;تراخيص برامج بعلب أصلية مع ذاكرة USB|Boxed software licenses with USB drive|299|0|software-bundle',
  gaming: 'جهاز ألعاب منزلي مع يدي تحكم|Home console with two controllers|2999|3299|gaming-featured;جهاز ألعاب محمول مع قاعدة وحقيبة|Handheld console with dock & case|1899|0|gaming-bundle;طقم قيمنق: سماعة وكيبورد RGB وماوس|Gaming set: headset, RGB keyboard & mouse|899|999|gaming-bestsellers;بطاقات شحن ألعاب مع يد تحكم|Game top-up cards with controller|300|0|digital_cards-bundle;كمبيوتر قيمنق مع شاشة|Gaming PC with monitor|7999|0|computers-bestsellers;سماعة رأس فاخرة|Premium headphones|1499|1699|audio-featured',
  audio: 'سماعة رأس فاخرة|Premium headphones|1499|1699|audio-featured;إيربودز ومكبر صوت محمول|Earbuds & portable speaker|1199|0|audio-bestsellers;مسرح منزلي 5.1|5.1 home theatre|4299|4799|audio-bundle;جوال مع سماعة لاسلكية|Phone with wireless earbuds|5199|0|phones-bundle;مكبر صوت ذكي مع لمبة|Smart speaker with bulb|349|0|smarthome-featured;سماعة قيمنق مع كيبورد وماوس|Gaming headset with keyboard & mouse|899|999|gaming-bestsellers',
  digital_cards: 'بطاقات هدايا مسبقة الدفع|Prepaid gift cards|100|0|digital_cards-featured;بطاقات شحن ألعاب في ظروف إهداء مع يد تحكم|Game top-up cards in gift envelopes with controller|200|0|digital_cards-bundle;بطاقة هدية مع جوال وعلبة إهداء|Gift card with phone & gift box|150|0|digital_cards-bestsellers;تراخيص برامج بعلب أصلية مع ذاكرة USB|Boxed software licenses with USB drive|299|399|software-bundle',
  smarthome: 'طقم كاميرا وجرس ومقبس ذكي|Camera, doorbell & smart plug kit|899|999|smarthome-bestsellers;منظم حرارة ذكي مع حساسات|Smart thermostat with sensors|749|0|smarthome-bundle;مكبر صوت ذكي مع لمبة|Smart speaker with bulb|449|0|smarthome-featured;شاشة ذكية OLED ‏65 بوصة|65" smart OLED TV|6499|7299|electronics-bestsellers',
  cameras: 'كاميرا احترافية مع عدسة زووم|Pro camera with zoom lens|9999|10999|cameras-featured;طقم ميرورليس: عدستان وبطاقات ذاكرة وحقيبة|Mirrorless kit: two lenses, memory cards & bag|8499|0|cameras-bundle;كاميرا أكشن وكومباكت ودرون ميني|Action cam, compact camera & mini drone|2899|3199|cameras-bestsellers;كاميرا مراقبة ذكية مع جرس|Smart security camera with doorbell|549|0|smarthome-bestsellers',
  accessories: 'كفرات حماية وحماية شاشة|Cases & screen protectors|129|159|accessories-bestsellers;شاحن سريع جداري وسيارة مع حقيبة|Wall & car fast charger with pouch|179|0|accessories-bundle;كيابل مضفرة وباور بانك وشاحن لاسلكي|Braided cables, power bank & wireless charger|249|299|accessories-featured;إيربودز ومكبر صوت محمول|Earbuds & portable speaker|999|0|audio-bestsellers;جوال مع سماعة لاسلكية|Phone with wireless earbuds|5199|0|phones-bundle',
  software: 'تراخيص برامج بعلب أصلية مع ذاكرة USB|Boxed software licenses with USB drive|299|399|software-bundle;بيئة تطوير برمجية على لابتوب|Developer suite on a laptop|349|0|software-featured;برنامج لوحات تحليل بيانات للتابلت والجوال|Analytics dashboards for tablet & phone|599|0|software-bestsellers;بطاقات اشتراك مسبقة الدفع|Prepaid subscription cards|150|0|digital_cards-featured'
};
const MODES = ['featured', 'bestsellers', 'bundle'];
const asset = name => (B.dataset.ocImg || '').replace(/[^/]*\.webp(\?.*)?$/, `${name}.webp$1`);

export function demoPack(v) {
  const V = VERTICALS[v] ? v : 'electronics';
  const ps = (P[V] || P.electronics).split(';').map((s, i) => { const [a, e, p, w, k] = s.split('|'); const price = +p, was = +w || null;
    return { id: 9000 + i, name: ar() ? a : e, slug: e.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), url: '#', img: asset(k), price, was, sale: !!was, out: false, stars: [4.8, 4.6, 4.7, 4.5, 4.9, 4.4, 4.6, 4.7][i], reviews: [214, 162, 88, 301, 120, 64, 45, 140][i], sold: [320, 180, 90, 260, 140, 60, 40, 150][i], digital: V === 'digital_cards' || V === 'software' }; });
  const cats = (VERTICALS[V].cats || [V]).map((c, i) => ({ id: null, name: ar() ? VERTICALS[c].ar : VERTICALS[c].en, url: '#', img: asset(`${c}-${MODES[i % 3]}`), sub: [], v: c }));
  return { v: V, ps, cats };
}

/* demo prices are always Saudi riyals (the demo store may show a visitor's local currency) */
const money = n => `${Math.round(n).toLocaleString('en-US')} ${ar() ? 'ر.س' : 'SAR'}`;
/* the preview's store type: picker choice (?oc_type / session) → merchant setting → electronics. Never the fashion demo store's own words. */
export const demoV = () => { let v = ''; try { v = new URLSearchParams(location.search).get('oc_type') || sessionStorage.getItem('oc_type') || ''; } catch (e) {  }
  const set = B.dataset.ocVertical; return VERTICALS[v] ? v : VERTICALS[set] ? set : 'electronics'; };
const vOf = () => (isPreview() ? demoV() : B.dataset.ocV) || 'electronics';

/* a card's link stays inside the preview: same origin + the preview's own query (preview=true, oc_type…) + which demo product (oc_p) */
function demoHref(href, v, i, slug) {
  const here = new URL(location.href); let u; try { u = new URL(href || here.href, here.href); } catch (e) { u = here; }
  let path = u.pathname; const dev = here.pathname.match(/^\/dev-[^/]+/);
  if (u.origin !== here.origin && dev) path = dev[0] + path.replace(/^\/dev-[^/]+/, ''); // the demostore's link → the same product path inside this preview
  if (slug) path = path.replace(/\/[^/]+(\/p\d+\/?)$/, `/${slug}$1`);
  const out = new URL(path, here.origin); here.searchParams.forEach((val, k) => out.searchParams.set(k, val));
  out.searchParams.set('oc_type', v); out.searchParams.set('oc_p', i); out.hash = ''; return out.href;
}
function skinCards(pack) {
  const cards = [...document.querySelectorAll('custom-salla-product-card, .s-product-card-entry')].filter(c => !c.parentElement?.closest('custom-salla-product-card'));
  const seen = new Map(); // each product list / slider counts its own cards: one demo product each, the rest hidden (never the same photo twice)
  cards.forEach(c => {
    const g = c.closest('salla-products-slider, salla-products-list, .s-products-slider, .s-products-list, section') || B, i = seen.get(g) || 0; seen.set(g, i + 1);
    const box = c.closest('.swiper-slide') || c;
    if (i >= pack.ps.length) { box.classList.add('oc-hide'); return; } box.classList.remove('oc-hide');
    const p = pack.ps[i], url = demoHref(c.querySelector('a[href]')?.getAttribute('href'), pack.v, i, p.slug);
    c.querySelectorAll('a[href]').forEach(a => { if (a.href !== url) a.href = url; });
    if (c.dataset.ocDemo === pack.v + i) return;
    const img = c.querySelector('.s-product-card-image img, .s-product-card-image-full img'); if (img) { img.src = p.img; img.alt = p.name; img.removeAttribute('srcset'); img.className = img.className.replace(/s-product-card-image-contain/, 's-product-card-image-cover'); }
    const t = c.querySelector('.s-product-card-content-title a') || c.querySelector('.s-product-card-content-title'); if (t) t.textContent = p.name; // the title link itself, so it keeps its href
    c.querySelectorAll('.s-product-card-content-subtitle').forEach(e => e.remove());
    const pr = c.querySelector('.s-product-card-sale-price, .s-product-card-price, .s-product-card-starting-price');
    if (pr) { const h = document.createElement('div'); h.innerHTML = p.was ? `<div class="s-product-card-sale-price"><h4>${money(p.price)}</h4><span>${money(p.was)}</span></div>` : `<h4 class="s-product-card-price">${money(p.price)}</h4>`; pr.replaceWith(h.firstElementChild); }
    if (c.product) c.product = { ...c.product, url, name: p.name, price: p.price, sale_price: p.price, regular_price: p.was || p.price, is_on_sale: !!p.was, is_out_of_stock: false, rating: { stars: p.stars, count: p.reviews }, sold_quantity: p.sold, quantity: null };
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
      if (!c) { li.remove(); return; } // «تخفيضات» / «المزيد» / extra fashion items leave the menu entirely
      const label = li.querySelector(':scope > a span') || li.querySelector(':scope > span') || li.querySelector(':scope > a');
      if (label && label.textContent !== c.name) label.textContent = c.name;
      const a = li.querySelector(':scope > a'); if (a) a.setAttribute('aria-label', c.name);
      li.querySelectorAll(':scope > ul, :scope .sub-menu').forEach(u => u.remove()); // fashion sub-categories / products
      li.classList.remove('has-children', 'dropdown'); li.querySelectorAll(':scope > a .sicon-keyboard_arrow_down, :scope > a .sicon-arrow-down').forEach(e => e.remove());
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
  /* the product the shopper clicked (?oc_p from the card), else stable per URL */
  let h = 0; for (const ch of location.pathname) h = (h * 31 + ch.charCodeAt(0)) >>> 0; const q = parseInt(new URLSearchParams(location.search).get('oc_p'), 10);
  const k = q >= 0 && q < pack.ps.length ? q : h % pack.ps.length, p = pack.ps[k], V = VERTICALS[pack.v] || VERTICALS.electronics;
  if (once(h1)) { h1.textContent = p.name; document.title = p.name; }
  const gal = document.querySelector('salla-slider.details-slider, .details-slider, .product-single__images, .product-single salla-slider, .product__images') || document.querySelector('main');
  /* every slide and thumb shows this very product */
  gal.querySelectorAll('img').forEach(img => { if (themeImg(img.getAttribute('src'))) return; img.src = p.img; img.removeAttribute('srcset'); img.alt = p.name; img.dataset.ocSwept = '1'; });
  /* prices: the title price block, the form / sticky bar prices; old price only when the demo product has an offer */
  document.querySelectorAll('[data-testid="store-product-price"] p, .total-price, .product-entry__price, .sticky-product-bar .total-price').forEach(e => { if (once(e)) e.textContent = money(p.price); });
  document.querySelectorAll('[data-testid="store-product-price"] .line-through, .before-price').forEach(e => { if (once(e)) { if (p.was) e.textContent = money(p.was); else e.style.display = 'none'; } });
  /* sub-title / sku / sizes copied from the fashion product */
  document.querySelectorAll('.product-entry__sub-title').forEach(e => { if (once(e)) e.textContent = vt(V.hero); });
  const desc = document.querySelector('.product__description .article--main, .product__description, .product-single__description');
  /* breadcrumb: home › the type › this product (never the demo store's fashion category) */
  const crumbs = [...document.querySelectorAll('salla-breadcrumb .s-breadcrumb-item')];
  if (crumbs.length > 1 && !crumbs[0].closest('salla-breadcrumb').dataset.ocDemo) { crumbs[0].closest('salla-breadcrumb').dataset.ocDemo = '1';
    const last = crumbs[crumbs.length - 1], mid = crumbs.slice(1, -1);
    mid.slice(1).forEach(li => { const arrow = li.previousElementSibling; if (arrow && arrow.classList.contains('s-breadcrumb-arrow')) arrow.remove(); li.remove(); });
    if (mid[0]) { const a = mid[0].querySelector('a') || mid[0]; a.textContent = ar() ? V.ar : V.en; if (a.href) a.href = demoHref(crumbs[0].querySelector('a')?.getAttribute('href') || '/', pack.v, 0).replace(/[?&]oc_p=\d+/, ''); }
    (last.querySelector('a, span') || last).textContent = p.name; }
  /* the address bar names the tech product too (same /p<id>, so a reload still opens this page) */
  if (/\/[^/]+\/p\d+\/?$/.test(location.pathname) && !location.pathname.includes(`/${p.slug}/`)) try { history.replaceState(history.state, '', location.pathname.replace(/\/[^/]+(\/p\d+\/?)$/, `/${p.slug}$1`) + location.search + location.hash); } catch (e) {  }
  if (once(desc)) desc.innerHTML = `<p>${vt(V.hero)}</p><ul>${(V.specs || []).map(([l]) => `<li>${vt(l)}</li>`).join('')}</ul>`;
  document.querySelectorAll('salla-product-options, .s-product-options-wrapper, .product-options, [data-size-guide]').forEach(e => { e.style.display = 'none'; });
}

function skinFooter() {
  document.querySelectorAll('footer salla-menu').forEach(m => { if (m.querySelector('a') || m.parentElement.querySelector('.oc-demo-links')) return;
    const L = ar() ? ['الشحن والتوصيل', 'الاستبدال والاسترجاع', 'الضمان', 'تواصل معنا'] : ['Shipping & delivery', 'Returns & exchanges', 'Warranty', 'Contact us'];
    m.insertAdjacentHTML('afterend', `<ul class="oc-demo-links">${L.map(t => `<li><a href="#">${t}</a></li>`).join('')}</ul>`); });
}
export function initDemo() {
  if (!isPreview()) return;
  B.classList.add('oc-demo');
  if (!document.getElementById('oc-demo-css')) { const st = document.createElement('style'); st.id = 'oc-demo-css';
    st.textContent = '.oc-demo .oc-hide{display:none!important}.oc-demo-logo{display:inline-grid;line-height:1;text-align:center;gap:3px}.oc-demo-logo b{font-weight:900;letter-spacing:.32em;font-size:20px;background:linear-gradient(180deg,#f3e2bd,#d9b779 55%,#8a6a3a);-webkit-background-clip:text;background-clip:text;color:transparent}.oc-demo-logo small{font-size:10px;letter-spacing:.12em;opacity:.75}.oc-demo{padding-bottom:88px}.oc-demo-links{display:grid;gap:.6rem;margin:0;padding:0;list-style:none}.oc-demo.product-single salla-breadcrumb:not([data-oc-demo]){visibility:hidden}';
    document.head.appendChild(st); }
  let t = 0; const run = () => { const pack = demoPack(vOf()); skinLogo(pack); skinCards(pack); skinMenu(pack); try { skinFooter(); skinProduct(pack); sweep(pack); } catch (e) {  } };
  run(); setTimeout(run, 600); setTimeout(run, 2000);
  setTimeout(() => document.querySelectorAll('salla-breadcrumb').forEach(b => { b.dataset.ocDemo = b.dataset.ocDemo || '1'; }), 4000); // never keep a breadcrumb hidden
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(run, 160); }).observe(B, { childList: true, subtree: true });
  /* a different type picked in the preview picker: reload so every section reads the new demo store cleanly */
  document.addEventListener('oc:type', () => setTimeout(() => location.reload(), 350));
}
