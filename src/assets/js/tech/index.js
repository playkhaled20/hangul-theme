// Tech features loader. Merchant toggles via body[data-tech-f]="stylist voice …"; per-store defaults from stores.js.
import { T, d, enabled, fab, pdp } from './kit';
import { detect } from './presets';
import { DEFAULTS } from './stores';
import '../../styles/tech/tech.scss';
const F = {
  stylist: ['🤖', { ar: 'مستشارك التقني', en: 'Tech advisor' }, () => import('./stylist')],
  voice: ['🎙️', { ar: 'اطلب بصوتك', en: 'Voice search' }, () => import('./voice')],
  giftfinder: ['🎁', { ar: 'هدية تقنية', en: 'Tech gift' }, () => import('./giftfinder')],
  quiz: ['🧭', { ar: 'أي جهاز يناسبك؟', en: 'Which device?' }, () => import('./quiz')],
  setupmatch: ['🎨', { ar: 'طابق ستايلك', en: 'Match setup' }, () => import('./setupmatch')],
  photocoach: ['📸', { ar: 'فحص الصورة', en: 'Photo check' }, () => import('./photocoach')]
};
const PDP = { listen: ['🔊', { ar: 'اسمع المواصفات', en: 'Hear specs' }, () => import('./listen')], recolour: ['🌈', { ar: 'ألوان الجهاز', en: 'Finishes' }, () => import('./recolour')],
  tryon: ['🖥️', { ar: 'على مكتبك', en: 'On your desk' }, () => import('./tryon')], pixelart: ['👾', { ar: 'بكسل آرت', en: 'Pixel art' }, () => import('./pixelart')] };
const run = imp => imp().then(m => m.default()).catch(e => console.warn('[tech]', e));
async function boot() { const type = await detect(); const off = ` ${d.body.dataset.techOff || ''} `; d.body.dataset.techF = (DEFAULTS[type] || DEFAULTS.electronics).filter(x => !off.includes(` ${x} `)).join(' ');
  for (const [id, [i, l, imp]] of Object.entries(F)) if (enabled(id)) fab(id, i, T(l), () => run(imp));
  if (pdp()) { for (const [id, [i, l, imp]] of Object.entries(PDP)) if (enabled(id)) fab(id, i, T(l), () => run(imp)); if (enabled('bundle')) run(() => import('./bundle')); } }
d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', boot) : boot();
