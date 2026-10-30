// Fills every empty .tg strip with the store's OWN product photos (keyword-matched, else any). Never stock images.
import { products, img, esc } from './kit';
const norm = s => (s || '').toLowerCase();
export default async function fill() {
  const strips = [...document.querySelectorAll('.tg')].filter(t => !t.querySelector('.tg-i')); if (!strips.length) return;
  const list = (await products(100)).filter(p => img(p)); if (!list.length) return strips.forEach(t => t.remove());
  const used = new Set();
  strips.forEach(t => { const n = Math.min(12, Math.max(6, +t.dataset.tgN || 8)), qs = norm(t.dataset.tgQ).split(',').map(s => s.trim()).filter(Boolean);
    const hit = qs.length ? list.filter(p => qs.some(q => norm(p.name).includes(q))) : [];
    const pool = [...hit, ...list.filter(p => !hit.includes(p) && !used.has(p.id)), ...list.filter(p => !hit.includes(p) && used.has(p.id))];
    const pick = [...new Set(pool)].slice(0, n); pick.forEach(p => used.add(p.id));
    t.innerHTML = pick.map(p => `<a class="tg-i" href="${esc(p.url)}"><img loading="lazy" src="${esc(img(p))}" alt=""><span>${esc(p.name)}</span></a>`).join(''); });
}
