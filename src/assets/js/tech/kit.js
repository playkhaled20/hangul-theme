// Tech kit — standalone helpers shared by tech features (no fashion code).
export const d = document;
export const $ = (s, c = d) => c.querySelector(s);
export const $$ = (s, c = d) => [...c.querySelectorAll(s)];
export const lang = () => ((d.documentElement.lang || 'ar').slice(0, 2) === 'en' ? 'en' : 'ar');
export const T = o => o[lang()] || o.ar;
export const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const norm = s => String(s || '').toLowerCase().replace(/[\u064B-\u0652\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
  .replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/\s+/g, ' ').trim();
export const cfg = () => d.body.dataset;
export const enabled = id => ` ${cfg().techF || ''} `.includes(` ${id} `);
export const price = p => Number((p.sale_price && p.sale_price.amount) || (p.price && p.price.amount) || p.price || 0);
export const img = p => (p.image && p.image.url) || (p.images && p.images[0] && p.images[0].url) || p.thumbnail || '';
export const money = n => `${Math.round(n).toLocaleString('en-US')} ${T({ ar: 'ر.س', en: 'SAR' })}`;
export const text = p => norm([p.name, p.subtitle, p.category && p.category.name, (p.description || '').replace(/<[^>]+>/g, ' ')].join(' '));
let cache;
export const products = (limit = 60) => cache || (cache = new Promise(res => {
  try { salla.product.fetch({ source: 'latest', limit }).then(r => res((r && r.data) || [])).catch(() => res([])); } catch (e) { res([]); }
}));
export const card = (p, note = '') => `<a class="tk-card" href="${esc(p.url)}"><img loading="lazy" src="${esc(img(p))}" alt=""><b>${esc(p.name)}</b><span>${money(price(p))}</span>${note ? `<small>${esc(note)}</small>` : ''}</a>`;
export function sheet(title, body) {
  const w = d.createElement('div'); w.className = 'tk-sheet'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true');
  w.innerHTML = `<div class="tk-sheet__box"><header><h3>${esc(title)}</h3><button type="button" class="tk-x" aria-label="${T({ ar: 'إغلاق', en: 'Close' })}">×</button></header><div class="tk-sheet__body">${body}</div></div>`;
  const close = () => w.remove(); w.addEventListener('click', e => { if (e.target === w || e.target.closest('.tk-x')) close(); });
  d.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); d.removeEventListener('keydown', k); } });
  d.body.appendChild(w); return w;
}
export function fab(id, icon, label, fn) {
  let bar = $('.tk-fabs'); if (!bar) { bar = d.createElement('div'); bar.className = 'tk-fabs'; d.body.appendChild(bar); }
  const b = d.createElement('button'); b.type = 'button'; b.className = `tk-fab tk-fab--${id}`; b.innerHTML = `<span aria-hidden="true">${icon}</span><em>${esc(label)}</em>`;
  b.setAttribute('aria-label', label); b.addEventListener('click', fn); bar.appendChild(b); return b;
}
export const pdp = () => { const el = $('[data-tech-pdp]'); return el ? { id: el.dataset.id, name: el.dataset.name, img: el.dataset.img, desc: ($('.product__description') || {}).innerText || '' } : null; };
// Tech vocabulary used across features
export const CAT = {
  phones: /(جوال|جوالات|هاتف|موبايل|ايفون|iphone|galaxy|جالكسي|سامسونج|شاومي|redmi|pixel|phone|smartphone)/,
  computers: /(لابتوب|لاب توب|كمبيوتر|حاسب|ماك بوك|macbook|laptop|pc|desktop|معالج|كرت شاشه|gpu|ssd)/,
  gaming: /(بلايستيشن|بلاستيشن|ps5|ps4|playstation|xbox|اكس بوكس|نينتندو|nintendo|switch|العاب|لعبه|قيمنق|gaming|controller|يد تحكم)/,
  cards: /(بطاقه|بطاقات|كود|شحن|رصيد|ايتونز|itunes|psn|steam|ستيم|google play|قوقل بلاي|stc|موبايلي|زين|gift card|voucher|نتفلكس|netflix)/,
  audio: /(سماعه|سماعات|ايربودز|airpods|headphone|earbuds|سبيكر|speaker|صوت)/,
  wearables: /(ساعه ذكيه|apple watch|smart ?watch|سوار ذكي|band)/,
  accessories: /(شاحن|كيبل|كفر|حمايه|باور بنك|power ?bank|charger|cable|case|adapter|محول|ماوس|كيبورد|keyboard|mouse)/,
  smarthome: /(ذكي للمنزل|smart home|كاميرا مراقبه|راوتر|router|wifi|اليكسا|alexa|لمبه ذكيه)/,
  cameras: /(كاميرا|camera|عدسه|lens|gopro|درون|drone)/,
  software: /(برنامج|اشتراك|ترخيص|license|windows|office|antivirus|software|subscription)/
};
export const CAT_N = { phones: { ar: 'جوالات', en: 'Phones' }, computers: { ar: 'كمبيوتر ولابتوب', en: 'Computers' }, gaming: { ar: 'ألعاب إلكترونية', en: 'Gaming' }, cards: { ar: 'بطاقات رقمية', en: 'Digital cards' }, audio: { ar: 'صوتيات', en: 'Audio' }, wearables: { ar: 'أجهزة قابلة للارتداء', en: 'Wearables' }, accessories: { ar: 'إكسسوارات', en: 'Accessories' }, smarthome: { ar: 'المنزل الذكي', en: 'Smart home' }, cameras: { ar: 'كاميرات', en: 'Cameras' }, software: { ar: 'برامج واشتراكات', en: 'Software' } };
export const catOf = p => { const t = typeof p === 'string' ? norm(p) : text(p); return Object.keys(CAT).find(k => CAT[k].test(t)) || ''; };
export const specs = s => { const t = norm(s); const g = (re) => { const m = t.match(re); return m ? Number(m[1]) : 0; };
  return { storage: g(/(\d{2,4}) ?(gb|جيجا|قيقا)(?! ?رام)/) || (g(/(\d) ?(tb|تيرا)/) * 1024), ram: g(/(\d{1,2}) ?(gb|جيجا)? ?(ram|رام)/), inch: g(/(\d{1,2}(?:\.\d)?) ?(inch|انش|بوصه|")/), mah: g(/(\d{4,5}) ?mah/) }; };
export const budgetOf = s => { const m = norm(s).match(/(\d{2,6})/); return m ? Number(m[1]) : 0; };
