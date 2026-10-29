// Tech features loader. Merchant toggles via body[data-tech-f]="stylist voice …"; per-store defaults from stores.js.
import { T, d, enabled, fab, pdp } from './kit';
import { detect } from './presets';
import { DEFAULTS } from './stores';
import '../../styles/tech/tech.scss';
const SVG = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const F = {
  stylist: [SVG('<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>'), { ar: 'مستشارك التقني', en: 'Tech advisor' }, () => import('./stylist')],
  voice: [SVG('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'), { ar: 'اطلب بصوتك', en: 'Voice search' }, () => import('./voice')],
  giftfinder: [SVG('<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1 6 2 6-1-4-3-6 1"/>'), { ar: 'هدية تقنية', en: 'Tech gift' }, () => import('./giftfinder')],
  quiz: [SVG('<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 5-4 1 2-5z"/>'), { ar: 'أي جهاز يناسبك؟', en: 'Which device?' }, () => import('./quiz')],
  setupmatch: [SVG('<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="10" r="1"/>'), { ar: 'طابق ستايلك', en: 'Match setup' }, () => import('./setupmatch')],
  photocoach: [SVG('<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>'), { ar: 'فحص الصورة', en: 'Photo check' }, () => import('./photocoach')]
};
const PDP = { listen: [SVG('<path d="M4 9h4l5-4v14l-5-4H4zM17 9a4 4 0 0 1 0 6"/>'), { ar: 'اسمع المواصفات', en: 'Hear specs' }, () => import('./listen')], recolour: [SVG('<circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/>'), { ar: 'ألوان الجهاز', en: 'Finishes' }, () => import('./recolour')],
  tryon: [SVG('<rect x="2" y="4" width="20" height="13" rx="1"/><path d="M9 21h6"/>'), { ar: 'على مكتبك', en: 'On your desk' }, () => import('./tryon')], pixelart: [SVG('<path d="M5 5h3v3h8V5h3v8h-2v3h-3v3h-4v-3H7v-3H5z"/>'), { ar: 'بكسل آرت', en: 'Pixel art' }, () => import('./pixelart')] };
const run = imp => imp().then(m => m.default()).catch(e => console.warn('[tech]', e));
async function boot() { const type = await detect(); const off = ` ${d.body.dataset.techOff || ''} `; d.body.dataset.techF = (DEFAULTS[type] || DEFAULTS.electronics).filter(x => !off.includes(` ${x} `)).join(' ');
  for (const [id, [i, l, imp]] of Object.entries(F)) if (enabled(id)) fab(id, i, T(l), () => run(imp));
  if (pdp()) { for (const [id, [i, l, imp]] of Object.entries(PDP)) if (enabled(id)) fab(id, i, T(l), () => run(imp)); if (enabled('bundle')) run(() => import('./bundle')); } }
d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', boot) : boot();
