/* Hangul · Store Brain — the theme's "understanding" of the merchant's store.
   Runs once per visit in the visitor's browser, from Salla's own storefront SDK + the rendered page only:
   store config → categories/menus → a sample of real products (latest + offers) → footer policy pages.
   Everything it reports is MEASURED, never invented: a figure with no data behind it is null and the UI hides it.
   Cached in sessionStorage for 20 minutes per store so navigation stays instant. No external calls, no tracking. */
import { VERTICALS, detect } from './verticals';

const TTL = 20 * 60 * 1000;
const B = document.body;
const cfg = k => { try { return window.salla?.config?.get?.(k); } catch (e) { return null; } };
export const num = x => { if (x && typeof x === 'object') x = x.amount ?? x.value; const n = parseFloat(String(x == null ? '' : x).replace(/[^\d.]/g, '')); return isNaN(n) ? null : n; };

/* brand dictionary: [display, ...aliases] — matched against real product/category names only */
const BRANDS = [
  ['Apple','apple','أبل','ابل','iphone','آيفون','ايفون','ipad','آيباد','macbook','ماك بوك','airpods','ايربودز','apple watch'],
  ['Samsung','samsung','سامسونج','سامسونق','galaxy','جالكسي','جالاكسي'],['Huawei','huawei','هواوي'],['Xiaomi','xiaomi','شاومي','redmi','ريدمي'],
  ['Google','google','جوجل','pixel','بكسل'],['OnePlus','oneplus','ون بلس'],['Honor','honor','هونر'],['Oppo','oppo','أوبو','اوبو'],['Realme','realme','ريلمي'],
  ['Nothing','nothing phone'],['Sony','sony','سوني','playstation','بلايستيشن','بلاي ستيشن','ps5'],['Microsoft','microsoft','مايكروسوفت','xbox','اكس بوكس','windows','office'],
  ['Nintendo','nintendo','نينتندو','switch'],['Lenovo','lenovo','لينوفو'],['HP','hp ','اتش بي'],['Dell','dell','ديل','alienware'],['Asus','asus','أسوس','اسوس','rog'],
  ['Acer','acer','ايسر','آيسر'],['MSI','msi'],['LG','lg ','ال جي'],['Philips','philips','فيليبس'],['Anker','anker','انكر','أنكر'],['Belkin','belkin','بلكن'],
  ['Ugreen','ugreen','يوجرين'],['Baseus','baseus','باسيوس'],['JBL','jbl'],['Bose','bose','بوز'],['Beats','beats','بيتس'],['Sennheiser','sennheiser','سنهايزر'],
  ['Marshall','marshall','مارشال'],['Logitech','logitech','لوجيتك'],['Razer','razer','ريزر'],['Corsair','corsair','كورسير'],['SteelSeries','steelseries'],['HyperX','hyperx'],
  ['Canon','canon','كانون'],['Nikon','nikon','نيكون'],['Fujifilm','fujifilm','فوجي'],['DJI','dji','دي جي اي'],['GoPro','gopro','جو برو'],['Insta360','insta360'],
  ['Garmin','garmin','جارمن'],['Amazfit','amazfit','امازفت'],['Huawei Watch','huawei watch'],['TP-Link','tp-link','tapo','تابو'],['Aqara','aqara'],['Ring','ring doorbell'],
  ['Eufy','eufy','يوفي'],['Ezviz','ezviz'],['Amazon','amazon','أمازون','alexa','أليكسا','echo'],['Netflix','netflix','نتفليكس'],['Steam','steam','ستيم'],
  ['iTunes','itunes','آيتونز'],['Google Play','google play','قوقل بلاي'],['Adobe','adobe','أدوبي','ادوبي'],['Kaspersky','kaspersky','كاسبرسكي'],['Norton','norton']
];
export function brandsIn(texts){
  const t = ' ' + texts.join(' | ').toLowerCase() + ' ', out = [];
  for (const [name, ...al] of BRANDS) { const n = al.reduce((c, a) => c + (t.split(a).length - 1), 0); if (n) out.push({ name, n }); }
  return out.sort((a, b) => b.n - a.n);
}

/* store policy pages: the theme only LINKS to what the merchant wrote — it never paraphrases terms */
const POLICY = { returns:/استرجاع|استبدال|إرجاع|ارجاع|return|refund|exchange/i, warranty:/ضمان|warrant|guarantee/i, shipping:/شحن|توصيل|delivery|shipping/i,
  privacy:/خصوصية|privacy/i, terms:/الشروط|الأحكام|شروط|terms|conditions/i, payment:/دفع|تقسيط|payment|installment|tabby|tamara|تابي|تمارا/i, about:/من نحن|about/i, contact:/تواصل|اتصل|contact/i };
export function policies(){
  const out = {};
  document.querySelectorAll('footer a[href], .store-footer a[href], salla-menu a[href], .top-navbar a[href]').forEach(a => {
    const tx = (a.textContent || '').trim(); if (!tx || tx.length > 60) return;
    for (const [k, re] of Object.entries(POLICY)) if (!out[k] && re.test(tx)) out[k] = { title: tx, url: a.href };
  });
  return out;
}

async function categories(){
  try { const r = await salla.api.request('categories', {}, 'get'); const d = (r?.data || []).filter(c => c?.name); if (d.length) return d.map(c => ({ id: c.id, name: c.name, url: c.url, img: c.image || c.icon || null, sub: (c.sub_categories || c.children || []).map(s => s.name).filter(Boolean) })); } catch (e) {}
  try { const m = await salla.api.component?.getMenus?.('header'); const d = (m?.data || []).filter(x => x?.title); if (d.length) return d.map(x => ({ id: x.type === 'category' ? x.type_id : null, name: x.title, url: x.url, img: x.image || null, sub: (x.children || []).map(s => s.title) })); } catch (e) {}
  return [...document.querySelectorAll('.main-menu > li > a')].map(a => ({ id: null, name: a.textContent.trim(), url: a.href, img: null, sub: [] })).filter(c => c.name);
}
async function products(source, limit){
  try { const r = await salla.product.fetch({ source, limit }); return r?.data || []; } catch (e) { return []; }
}
const slim = p => ({ id: p.id, name: p.name || '', url: p.url, img: p.image?.url || p.thumbnail || p.image || null,
  price: num(p.sale_price && p.is_on_sale ? p.sale_price : p.price), was: p.is_on_sale ? num(p.regular_price ?? p.price_before) : null,
  sale: !!p.is_on_sale, out: !!p.is_out_of_stock, stars: num(p.rating?.stars), reviews: num(p.rating?.count) || 0,
  sold: num(p.sold_quantity) || 0, digital: /digital|codes|service/.test(p.type || '') });
const quant = (a, q) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(q * (s.length - 1)))]; };

export function measure(list){
  const P = list.filter(p => p.name), priced = P.map(p => p.price).filter(n => n > 0);
  const rated = P.filter(p => p.stars && p.reviews), revs = rated.reduce((n, p) => n + p.reviews, 0);
  const sales = P.filter(p => p.sale && p.was && p.price && p.was > p.price);
  return {
    sampled: P.length,
    min: priced.length ? Math.min(...priced) : null, max: priced.length ? Math.max(...priced) : null,
    median: quant(priced, .5), q: [.2, .45, .7, .9].map(x => quant(priced, x)).filter(Boolean),
    inStock: P.length ? Math.round(100 * P.filter(p => !p.out).length / P.length) : null,
    onSale: P.length ? Math.round(100 * P.filter(p => p.sale).length / P.length) : null,
    avgOff: sales.length ? Math.round(sales.reduce((n, p) => n + 100 * (1 - p.price / p.was), 0) / sales.length) : null,
    rating: revs ? +(rated.reduce((n, p) => n + p.stars * p.reviews, 0) / revs).toFixed(2) : null, reviews: revs || null,
    digital: P.length ? Math.round(100 * P.filter(p => p.digital).length / P.length) : null
  };
}

let pending = null;
export function brain(){
  if (pending) return pending;
  pending = (async () => {
    const key = 'oc_brain:' + (cfg('store.id') || location.host);
    if (!/[?&]oc_fresh/.test(location.search)) { try { const c = JSON.parse(sessionStorage.getItem(key) || 'null'); if (c && Date.now() - c.t < TTL) return publish(c); } catch (e) {} }
    const [cats, latest, offers] = await Promise.all([categories(), products('latest', 30), products('offers', 12)]);
    const seen = new Set(), all = [...latest, ...offers].map(slim).filter(p => p.id != null && !seen.has(p.id) && seen.add(p.id));
    const onPage = [...document.querySelectorAll('.s-product-card-content-title')].map(e => e.textContent.trim());
    const names = [...all.map(p => p.name), ...onPage];
    const typed = cats.map(c => ({ ...c, v: detect([c.name, ...c.sub]) }));
    const mix = {}; [...typed.map(c => detect([c.name, ...c.sub], null)), ...names.map(n => detect([n], null))].filter(Boolean).forEach(v => mix[v] = (mix[v] || 0) + 1);
    const tot = Object.values(mix).reduce((a, b) => a + b, 0) || 1;
    const sig = { name: cfg('store.name') || B.dataset.ocStore || '', desc: cfg('store.description') || B.dataset.ocDesc || '',
      currency: cfg('user.currency_code') || cfg('store.currency') || B.dataset.ocCur || 'SAR' };
    const main = detect([sig.name, sig.desc, ...cats.map(c => c.name), ...names]);
    const c = { t: Date.now(), sig, cats: typed, main,
      present: [...new Set(typed.map(c => c.v))].length ? [...new Set(typed.map(c => c.v))] : [main],
      mix: Object.entries(mix).map(([v, n]) => ({ v, pct: Math.round(100 * n / tot) })).sort((a, b) => b.pct - a.pct).slice(0, 6),
      brands: brandsIn([...names, ...cats.map(c => c.name)]).slice(0, 12),
      stats: measure(all), top: all.filter(p => !p.out).sort((a, b) => (b.sold - a.sold) || ((b.reviews || 0) - (a.reviews || 0))).slice(0, 12),
      deals: all.filter(p => p.sale && !p.out).slice(0, 12) };
    if (all.length || cats.length) { try { sessionStorage.setItem(key, JSON.stringify(c)); } catch (e) {} }
    return publish(c);
  })();
  return pending;
}
function publish(c){
  c.policies = policies();
  window.ocStore = c; B.dataset.ocMain = c.main;
  document.dispatchEvent(new CustomEvent('oc:store', { detail: c }));
  return c;
}

/* formatting in the store's own currency + the store's numbering preference */
export function money(n, cur){
  if (n == null) return '';
  const ar = (document.documentElement.lang || 'ar').startsWith('ar'), arNum = B.dataset.ocArnum === '1';
  const s = Math.round(n).toLocaleString(arNum ? 'ar-SA' : 'en-US');
  const sym = { SAR: ar ? 'ر.س' : 'SAR', AED: ar ? 'د.إ' : 'AED', KWD: ar ? 'د.ك' : 'KWD', QAR: ar ? 'ر.ق' : 'QAR', BHD: ar ? 'د.ب' : 'BHD', OMR: ar ? 'ر.ع' : 'OMR', EGP: ar ? 'ج.م' : 'EGP', USD: '$' }[cur] || cur;
  return `${s} ${sym}`;
}
export const vname = (v, ar) => { const V = VERTICALS[v] || VERTICALS.electronics; return ar ? V.ar : V.en; };
