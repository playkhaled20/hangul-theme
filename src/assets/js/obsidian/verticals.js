// Obsidian Cinema verticals: each is a distinct skin of the same theme (accent, hero art, section order, copy).
// Art is inline SVG (no image files, keeps zip < 1MB).
const S = (p) => `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
export const ICONS = {
  phones: S('<rect x="38" y="12" width="44" height="96" rx="9"/><path d="M54 20h12M56 98h8"/>'),
  watches: S('<rect x="36" y="34" width="48" height="52" rx="14"/><path d="M46 34l4-22h20l4 22M46 86l4 22h20l4-22M60 48v12l8 6"/>'),
  computers: S('<rect x="20" y="24" width="80" height="54" rx="5"/><path d="M8 92h104l-8-14H16z"/>'),
  gaming: S('<path d="M30 46h60a20 20 0 0 1 19 26l-6 18a10 10 0 0 1-17 4L76 82H44L34 94a10 10 0 0 1-17-4l-6-18a20 20 0 0 1 19-26z"/><path d="M38 60v14M31 67h14"/><circle cx="80" cy="62" r="3"/><circle cx="90" cy="72" r="3"/>'),
  audio: S('<path d="M22 70v-8a38 38 0 0 1 76 0v8"/><rect x="16" y="66" width="18" height="32" rx="7"/><rect x="86" y="66" width="18" height="32" rx="7"/>'),
  digital_cards: S('<rect x="14" y="30" width="92" height="60" rx="9"/><path d="M14 48h92M28 74h24"/><circle cx="88" cy="72" r="6"/>'),
  electronics: S('<rect x="14" y="22" width="92" height="60" rx="6"/><path d="M44 100h32M60 82v18"/><path d="M40 52l12 10 28-22"/>'),
  smarthome: S('<path d="M16 60L60 22l44 38M28 50v50h64V50"/><path d="M50 74a14 14 0 0 1 20 0M44 66a24 24 0 0 1 32 0"/><circle cx="60" cy="84" r="3"/>'),
  cameras: S('<rect x="12" y="36" width="96" height="64" rx="9"/><path d="M40 36l8-14h24l8 14"/><circle cx="60" cy="68" r="18"/><circle cx="60" cy="68" r="8"/>'),
  accessories: S('<path d="M40 16v26M80 16v26M30 42h60v18a30 30 0 0 1-60 0z"/><path d="M60 90v18"/>'),
  software: S('<rect x="14" y="20" width="92" height="80" rx="7"/><path d="M14 38h92M44 58l-12 12 12 12M76 58l12 12-12 12M66 54l-12 34"/>'),
};
export const VERTICALS = {
  electronics:  { ar:'الإلكترونيات', en:'Electronics', acc:'#d9b779', kw:['تلفزيون','شاشه','شاشات','tv','oled','qled','الكترونيات','electronic','جهاز عرض','بروجكتر','projector'], hero:'تقنية سينمائية بمعايير لا تُضاهى', specs:[["دقة 4K HDR", 96], ["تباين OLED", 92], ["كفاءة الطاقة", 84]], cats:['electronics','audio','cameras','smarthome','accessories','computers'] },
  phones:       { ar:'الجوالات', en:'Phones', acc:'#c9ccd1', kw:['iphone','ايفون','جوال','جوالات','هاتف','هواتف','galaxy','جالكسي','جالاكسي','phone','pixel','بكسل','سامسونج','شاومي','هواوي','redmi'], hero:'أحدث الجوالات بضمان الوكيل', specs:[["أداء المعالج", 97], ["ثبات الكاميرا", 93], ["عمر البطارية", 88]], cats:['phones','accessories','watches','audio'] },
  watches:      { ar:'الساعات الذكية', en:'Smart watches', acc:'#e0a98f', kw:['ساعه','ساعات','watch','سوار ذكي','باند','smartwatch','band'], hero:'الوقت، بذكاء فاخر', specs:[["دقة النبض", 95], ["مقاومة الماء", 90], ["البطارية", 82]], cats:['watches','accessories','phones'] },
  computers:    { ar:'الكمبيوتر', en:'Computers', acc:'#9fd4ff', kw:['لابتوب','laptop','macbook','ماك بوك','كمبيوتر','حاسب','pc','معالج','ssd','ram','رام','شاشه العاب','كرت شاشه','gpu','ipad','ايباد','تابلت','tablet'], hero:'أداء احترافي لكل مهمة', specs:[["أداء المعالج", 96], ["سرعة SSD", 94], ["التبريد", 86]], cats:['computers','accessories','software','gaming'] },
  gaming:       { ar:'الألعاب', en:'Gaming', acc:'#8cff7a', kw:['playstation','بلايستيشن','بلاي ستيشن','ps5','xbox','اكس بوكس','nintendo','نينتندو','العاب','gaming','قيمنق','جيمنج','يد تحكم','controller','dualsense'], hero:'ادخل اللعبة بمستوى آخر', specs:[["معدل الإطارات", 98], ["زمن الاستجابة", 95], ["التبريد", 87]], cats:['gaming','audio','computers','digital_cards'] },
  audio:        { ar:'الصوتيات', en:'Audio', acc:'#d9b779', kw:['سماعه','سماعات','headphone','earbuds','airpods','ايربودز','speaker','مكبر','سبيكر','ساوند بار','soundbar','صوتيات'], hero:'صوت مرجعي بلا تنازلات', specs:[["عزل الضوضاء", 96], ["نقاء الصوت", 94], ["البطارية", 89]], cats:['audio','accessories','smarthome'] },
  digital_cards:{ ar:'البطاقات الرقمية', en:'Digital cards', acc:'#b48cff', kw:['بطاقه','بطاقات','card','gift card','itunes','ايتونز','steam','ستيم','psn','شحن رصيد','رصيد','اشتراك','اشتراكات','code','كود'], hero:'بطاقاتك الرقمية، فوراً', specs:[["تسليم فوري",99],["أكواد أصلية",100],["دعم المناطق",91]], cats:['digital_cards','gaming','software'] },
  smarthome:    { ar:'المنزل الذكي', en:'Smart home', acc:'#7ae0d0', kw:['منزل ذكي','المنزل الذكي','smart home','مراقبه','alexa','اليكسا','اضاءه ذكيه','plug','قفل ذكي','جرس','حساس','tapo','aqara'], hero:'منزلك يفكّر معك', specs:[["توافق Matter", 93], ["الأمان", 95], ["توفير الطاقة", 88]], cats:['smarthome','cameras','accessories'] },
  cameras:      { ar:'الكاميرات', en:'Cameras', acc:'#d9b779', kw:['كاميرا','كاميرات','camera','canon','كانون','sony alpha','nikon','نيكون','عدسه','lens','gopro','جو برو','dji','درون','drone','جيمبال'], hero:'احترافية سينمائية في يدك', specs:[["حجم المستشعر", 95], ["المدى الديناميكي", 93], ["ثبات الصورة", 90]], cats:['cameras','accessories','audio'] },
  accessories:  { ar:'الإكسسوارات', en:'Accessories', acc:'#c9ccd1', kw:['شاحن','شواحن','كفر','كفرات','cable','كيبل','charger','case','حمايه','باور بانك','power bank','ملحقات','اكسسوارات','حامل'], hero:'كل ما يكمّل أجهزتك', specs:[["سرعة الشحن", 94], ["جودة الخامة", 92], ["التوافق", 96]], cats:['accessories','phones','audio'] },
  software:     { ar:'البرمجيات', en:'Software', acc:'#9fd4ff', kw:['windows','ويندوز','office','اوفيس','ترخيص','تراخيص','license','antivirus','برنامج','برامج','vpn','adobe','ادوبي'], hero:'تراخيص أصلية فورية', specs:[["ترخيص أصلي", 100], ["تفعيل فوري", 98], ["التحديثات", 95]], cats:['software','digital_cards','computers'] },
};
/* keyword scoring on normalised Arabic/English text; a keyword counts only at the start of a word
   (optionally after ال/وال/بال), so «سوار» no longer matches inside «إكسسوارات». */
export const norm = s => String(s || '').toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[^\p{L}\p{N}]+/gu, ' ');
const RX = {};
const rx = w => RX[w] || (RX[w] = new RegExp('(?:^|\\s)(?:ال|وال|بال)?' + norm(w).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
export function scores(texts){
  const t = ' ' + norm(texts.join(' | ')) + ' ', out = {};
  for (const [k, v] of Object.entries(VERTICALS)) out[k] = v.kw.reduce((n, w) => n + (t.match(rx(w)) || []).length, 0);
  return out;
}
/* one type when the store is focused; a broad multi-department store reads as "electronics" (general tech) */
export function detect(texts, fallback = 'electronics'){
  const sc = scores(texts), list = Object.entries(sc).filter(([, n]) => n).sort((a, b) => b[1] - a[1]);
  if (!list.length) return fallback;
  const tot = list.reduce((n, [, x]) => n + x, 0);
  if (list.length >= 4 && list[0][1] / tot < .34) return 'electronics';
  return list[0][0];
}

export const VT_EN = {"أحدث الجوالات بضمان الوكيل": "The latest phones with official warranty", "أداء احترافي لكل مهمة": "Pro performance for every task", "احترافية سينمائية في يدك": "Cinematic craft in your hands", "ادخل اللعبة بمستوى آخر": "Enter the game on another level", "الوقت، بذكاء فاخر": "Time, with luxurious intelligence", "بطاقاتك الرقمية، فوراً": "Your digital cards, instantly", "تراخيص أصلية فورية": "Genuine licenses, instantly", "تقنية سينمائية بمعايير لا تُضاهى": "Cinematic technology, uncompromised", "صوت مرجعي بلا تنازلات": "Reference sound, no compromise", "كل ما يكمّل أجهزتك": "Everything that completes your devices", "منزلك يفكّر معك": "A home that thinks with you", "أداء المعالج": "CPU performance", "أكواد أصلية": "Genuine codes", "الأمان": "Security", "البطارية": "Battery", "التبريد": "Cooling", "التحديثات": "Updates", "التوافق": "Compatibility", "المدى الديناميكي": "Dynamic range", "تباين OLED": "OLED contrast", "ترخيص أصلي": "Genuine license", "تسليم فوري": "Instant delivery", "تفعيل فوري": "Instant activation", "توافق Matter": "Matter support", "توفير الطاقة": "Energy saving", "ثبات الصورة": "Image stabilization", "ثبات الكاميرا": "Camera stability", "جودة الخامة": "Build quality", "حجم المستشعر": "Sensor size", "دعم المناطق": "Region support", "دقة 4K HDR": "4K HDR resolution", "دقة النبض": "Heart-rate accuracy", "زمن الاستجابة": "Response time", "سرعة SSD": "SSD speed", "سرعة الشحن": "Charging speed", "عزل الضوضاء": "Noise cancelling", "عمر البطارية": "Battery life", "كفاءة الطاقة": "Power efficiency", "معدل الإطارات": "Frame rate", "مقاومة الماء": "Water resistance", "نقاء الصوت": "Sound clarity"};
export const vt = (s) => ((document.documentElement.lang||'ar').startsWith('ar') ? s : (VT_EN[s]||s));
