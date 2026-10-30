/* «اضافاتنا» Salla AI features © 2026 خالد صالح الشمراني (Khalid Alshamrani). All rights reserved; proprietary, see LICENSE and THIRD-PARTY-NOTICES. */
import { TYPE_WORDS, TYPES, LEGACY } from './presets';
const AR = '\\u0621-\\u064A';
export const norm = s => String(s || '').toLowerCase().replace(/[\u064B-\u0652\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+/g, ' ');
const RE = {};
const regexFor = k => RE[k] || (RE[k] = (() => {
  const words = TYPE_WORDS[k].source.replace(/^\(|\)$/g, '').split('|');
  const ar = words.filter(w => /[\u0621-\u064A]/.test(w)), lat = words.filter(w => !/[\u0621-\u064A]/.test(w));
  const latShort = lat.filter(w => w.length <= 4), latStem = lat.filter(w => w.length > 4);
  const parts = [];
  const form = w => { const sp = w.replace(/ /g, ' (?:ال)?'); if (w.length < 4 || / /.test(w)) return sp; return w.endsWith('ه') ? `${sp.slice(0, -1)}(?:ه|ات|ين|ان)` : `${sp}(?:ات|ين|ان|ون)?`; };
  if (ar.length) parts.push(`(?:ال|لل|وال|بال|فال|و|ب|ل|ف)?(?:${ar.map(form).join('|')})(?![${AR}])`);
  if (latShort.length) parts.push(`(?:${latShort.join('|')})(?:s|es)?(?![a-z])`);
  if (latStem.length) parts.push(`(?:${latStem.join('|')})`);
  return new RegExp(`(?:^|[^${AR}a-z0-9])(?:${parts.join('|')})`, 'g');
})());
export const countWords = (txt, k) => { const m = txt.match(regexFor(k)); return m ? m.length : 0; };
export const bestType = txt => { let best = '', n = 0; for (const k of Object.keys(TYPE_WORDS)) { const c = countWords(txt, k); if (c > n) { n = c; best = k; } } return { best, n }; };
const PROD_SEL = '[data-idhafatina-pdp], .s-product-card-content-title, .product-entry__title, .s-product-card-entry h3';
export function guessFrom() {
  const d = document, take = sel => [...d.querySelectorAll(sel)].slice(0, 80).map(e => e.textContent || (e.dataset && e.dataset.name) || '').join(' ');
  const p = bestType(norm(take(PROD_SEL)));
  if (p.n >= 2) return { type: p.best, src: 'p' };
  const { best, n } = bestType(norm([d.body.dataset.idhafatinaStore, d.title, take('nav a, .main-menu a, h1'), take(PROD_SEL)].join(' ')));
  return n >= 2 ? { type: best, src: 'n' } : { type: 'general', src: '' };
}
export const guessType = () => guessFrom().type;

const pick = v => {
  if (v == null) return '';
  if (typeof v === 'string') return v.trim();
  if (Array.isArray(v)) return pick(v[0]);
  if (typeof v === 'object') return pick(v.value);
  return '';
};
export function resolveType() {
  const t = resolveType0(); if (t && document.body) document.body.dataset.idhafatinaP = t; return t;
}
export const demoType = () => {
  if (!document.body || document.body.dataset.idhafatinaDemo !== '1') return '';
  let v = '';
  try { v = (new URLSearchParams(location.search).get('store_type') || '').trim().toLowerCase(); if (TYPES.includes(v) || v === 'auto') sessionStorage.setItem('store:type', v); else v = sessionStorage.getItem('store:type') || ''; } catch (e) {  }
  return TYPES.includes(v) ? v : '';
};
function resolveType0() {
  const dt = demoType(); if (dt) return dt;
  let t = '';
  try { t = pick(window.salla && salla.config && salla.config.get && salla.config.get('theme.settings.idhafatina_store_type')); } catch (e) {  }
  if (!t) t = (document.body.dataset.idhafatinaType || 'auto').trim();
  t = LEGACY[t] || t;
  if (t === 'all') return 'general';
  if (t === 'auto' || !TYPES.includes(t)) {
    let g = '', src = '';
    try { g = localStorage.getItem('idhafatina:type') || ''; src = localStorage.getItem('idhafatina:type-src') || ''; } catch (e) {  }
    try {
      const f = guessFrom();
      if (f.type !== 'general' && (f.src === 'p' || !TYPES.includes(g) || g === 'general' || src !== 'p')) {
        g = f.type; localStorage.setItem('idhafatina:type', g); localStorage.setItem('idhafatina:type-src', f.src);
      }
    } catch (e) {  }
    return TYPES.includes(g) && g !== 'general' ? g : '';
  }
  return t;
}
