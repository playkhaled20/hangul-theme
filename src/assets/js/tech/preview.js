// Bahaa-style bottom preview bar (demo/preview hosts only): pick a tech store type and see it live
// using THIS store's own products — cards not matching the type are hidden; never stock/placeholder photos.
import { d, $, $$, T, esc, norm, products, catOf, CAT_N } from './kit';
import { TYPES } from './presets';
const TN = { auto: { ar: 'تلقائي', en: 'Auto' }, digital_cards: CAT_N.cards, electronics: { ar: 'إلكترونيات شاملة', en: 'Electronics' }, phones: CAT_N.phones, computers: CAT_N.computers, gaming: CAT_N.gaming, audio: CAT_N.audio, accessories: CAT_N.accessories, smarthome: CAT_N.smarthome, cameras: CAT_N.cameras, software: CAT_N.software };
const CAT_OF_TYPE = { digital_cards: 'cards', phones: 'phones', computers: 'computers', gaming: 'gaming', audio: 'audio', accessories: 'accessories', smarthome: 'smarthome', cameras: 'cameras', software: 'software' };
export const isPreview = () => /^(demostore\.salla\.sa|localhost|127\.0\.0\.1)$|(^|\.)salla\.design$/.test(location.hostname) || (location.hostname === 'salla.sa' && /^\/dev-/.test(location.pathname)) || d.body.classList.contains('preview-mode') || new URLSearchParams(location.search).has('tech_preview');
const cardName = c => norm((c.querySelector('.s-product-card-content-title, h3') || c).textContent);
function tag() { $$('custom-salla-product-card, salla-product-card').forEach(c => { const k = catOf(cardName(c)); if (k) c.dataset.techCat = k; }); }
function filter(type) { const cat = CAT_OF_TYPE[type]; const cards = $$('custom-salla-product-card, salla-product-card');
  const own = cat ? cards.filter(c => c.dataset.techCat === cat) : cards;
  cards.forEach(c => { c.hidden = !!cat && own.length > 0 && !own.includes(c); }); return own.length; }
export default async function preview(detected, onType) {
  if (!isPreview()) return;
  const list = await products(100), count = {}; list.forEach(p => { const k = catOf(p); if (k) count[k] = (count[k] || 0) + 1; });
  const bar = d.createElement('div'); bar.className = 'tk-pv'; bar.setAttribute('role', 'toolbar');
  const chip = t => { const n = t === 'auto' || t === 'electronics' ? list.length : count[CAT_OF_TYPE[t]] || 0;
    return `<button type="button" data-t="${t}" ${n ? '' : 'disabled'}>${esc(T(TN[t]))}${t === 'auto' ? ` · ${esc(T(TN[detected]))}` : ''}<small>${n}</small></button>`; };
  bar.innerHTML = `<b>${T({ ar: 'معاينة نوع المتجر', en: 'Preview store type' })}</b><div>${['auto', ...TYPES].map(chip).join('')}</div><small class="tk-pv__hint">${T({ ar: 'بمنتجات وصور متجرك نفسه · للاعتماد: إعدادات الثيم ← نوع المتجر', en: "Uses your store's own products · set it in Theme settings → Store type" })}</small>`;
  d.body.appendChild(bar); d.body.classList.add('tk-has-pv');
  const set = t => { $$('button', bar).forEach(b => b.classList.toggle('on', b.dataset.t === t)); const real = t === 'auto' ? detected : t;
    sessionStorage.setItem('tech_pv', t); d.body.dataset.techTypeNow = real; tag(); filter(t === 'auto' ? '' : real); onType(real); };
  bar.addEventListener('click', e => { const b = e.target.closest('button[data-t]'); if (b && !b.disabled) set(b.dataset.t); });
  new MutationObserver(() => { tag(); filter(d.body.dataset.techTypeNow && sessionStorage.getItem('tech_pv') !== 'auto' ? d.body.dataset.techTypeNow : ''); }).observe($('main') || d.body, { childList: true, subtree: true });
  set(sessionStorage.getItem('tech_pv') || 'auto');
}
