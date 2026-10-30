// presets (tech): detects which tech store type this is from product/category names; sets body[data-tech-type].
import { d, $$, norm, products, text } from './kit';
export const TYPES = ['electronics', 'digital_cards', 'phones', 'computers', 'gaming', 'audio', 'accessories', 'smarthome', 'cameras', 'software'];
export const WORDS = {
  electronics: /(الكترونيات|إلكترونيات|electronics|تلفزيون|شاشه سمارت|tv|ساعه ذكيه|smart watch|جهاز|اجهزه|ثلاجه|مكيف|غساله|appliance)/g,
  digital_cards: /(بطاقه|بطاقات|كود|شحن|رصيد|itunes|ايتونز|psn|steam|google play|gift card|voucher|netflix|stc pay|اشتراك)/g,
  phones: /(جوال|هاتف|ايفون|iphone|galaxy|جالكسي|سامسونج|شاومي|pixel|phone)/g,
  computers: /(لابتوب|كمبيوتر|حاسب|macbook|laptop|pc|معالج|gpu|ssd|شاشه)/g,
  gaming: /(بلايستيشن|ps5|playstation|xbox|nintendo|switch|لعبه|العاب|gaming|قيمنق|controller)/g,
  audio: /(سماعه|سماعات|airpods|headphone|speaker|سبيكر)/g,
  accessories: /(شاحن|كيبل|كفر|باور بنك|charger|cable|case|adapter|ماوس|كيبورد)/g,
  smarthome: /(smart home|منزل ذكي|راوتر|router|كاميرا مراقبه|alexa|لمبه ذكيه)/g,
  cameras: /(كاميرا|camera|عدسه|lens|gopro|درون|drone)/g,
  software: /(برنامج|ترخيص|license|windows|office|antivirus|software)/g
};
export function score(txt) { const t = norm(txt), s = {}; for (const k in WORDS) s[k] = (t.match(WORDS[k]) || []).length; return s; }
export function pick(s) { const top = Object.entries(s).sort((a, b) => b[1] - a[1]); if (!top[0] || !top[0][1]) return 'electronics';
  const kinds = top.filter(([, n]) => n >= top[0][1] * 0.5).length; return kinds >= 3 ? 'electronics' : top[0][0]; }
export async function detect() {
  const forced = d.body.dataset.techType; const q = new URLSearchParams(location.search).get('store_type');
  if (q && TYPES.includes(q)) return apply(q); if (forced && forced !== 'auto') return apply(forced);
  const menu = $$('nav a, .main-menu a').map(a => a.textContent).join(' ');
  const prods = (await products()).map(text).join(' ');
  return apply(pick(score(menu + ' ' + prods)));
}
const apply = t => { d.body.dataset.techTypeNow = t; d.dispatchEvent(new CustomEvent('tech:type', { detail: t })); return t; };
