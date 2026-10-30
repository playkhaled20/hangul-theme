/* «اضافاتنا» Salla AI features © 2026 خالد صالح الشمراني (Khalid Alshamrani). All rights reserved; proprietary, see LICENSE and THIRD-PARTY-NOTICES. */
import { idhafatinaT, lz } from '../i18n';
import '../../../styles/07-features/_stylist.scss';
import { d, $, esc, money, moneyText, waLink, toast, pageProduct, latest, qWords, hasW, pText, FAM, FAM_AR, FAM_HEX, AR_N } from './kit';
import { productImage, productPrice } from '../utils';
import { loadImage, dominantColor, nearestOutfit } from '../dress-color';

const KEY = 'idhafatina:sty', MAX_SAVED = 40;
const cfg = () => { const s = d.body.dataset;
  return { name: (s.idhafatinaStyName || '').trim() || `${idhafatinaT('stylist.s1')} ${s.idhafatinaStore || ''}`.trim(), tag: (s.idhafatinaStyTag || '').trim() || idhafatinaT('stylist.s2'),
    ship: (s.idhafatinaStyShip || '').trim(), ret: (s.idhafatinaStyRet || '').trim(), pay: (s.idhafatinaStyPay || '').trim(), note: (s.idhafatinaStyNote || '').trim() }; };
const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || '[]') || []; } catch (e) { return []; } };
const save = h => { try { sessionStorage.setItem(KEY, JSON.stringify(h.slice(-MAX_SAVED))); } catch (e) {  } };
const fmt = t => esc(t).replace(/\*\*([^*\n]{1,80})\*\*/g, '<b>$1</b>').replace(/(https:\/\/wa\.me\/[^\s<]+)/g, `<a href="$1" target="_blank" rel="noopener">${(document.documentElement.lang || 'ar').slice(0, 2) === 'en' ? 'WhatsApp' : 'واتساب'} ↗</a>`).replace(/\n/g, '<br>');
const FAMS = Object.entries(FAM_HEX).filter(([, h]) => h[0] === '#').map(([k, hex]) => ({ k, hex }));

const DIG = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
export const norm = s => String(s || '').toLowerCase().replace(/[\u064B-\u0652\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
  .replace(/[٠-٩]/g, c => DIG[c]).replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
const STOP = new Set(norm('ابي ابغى ابغي ودي وش ايش هل في من الى على عن مع او و يا لو اللي الي هذا هذي عندكم عندك ممكن كم انا انت حق لي لك فيه شي اريد اشتري ريال ر س the a an i want for with to of is are do you have me my').split(' '));
const GREET = new Set(norm('هلا هلا والله اهلين السلام عليكم وعليكم مرحبا اهلا صباح مساء الخير النور كيف حالك حالكم الحال شلونك شلونكم شخبارك hi hello hey good morning evening how are you').split(' '));
const INTENTS = [
  ['ship', /(شحن|توصيل|يوصل|توصل|تجهيز|متي يوصل|مده التوصيل|delivery|shipping|ship)/],
  ['ret', /(استرجاع|ارجاع|استبدال|ارجع|ابدل|refund|return|exchange)/],
  ['pay', /(دفع|ادفع|مدي|تابي|تمارا|ابل باي|فيزا|كاش|تقسيط|pay|payment|tabby|tamara)/],
  ['human', /(واتس|تواصل|موظف|خدمه العملاء|رقمكم|اكلمكم|whatsapp|contact|human)/],
  ['offer', /(عرض|عروض|خصم|خصوم|تخفيض|تنزيلات|كوبون|كود|sale|discount|offer|coupon)/],
  ['gift', /(هديه|هدايا|اهدي|اهداء|gift)/],
  ['cheap', /(رخيص|ارخص|اقتصادي|cheap|affordable)/],
  ['hello', /^(هلا|اهلين|السلام|مرحبا|اهلا|صباح|مساء|كيف حالك|شلونك|hi|hello|hey)(\s|$)/],
];
const FEM = { black: ['سوداء', 'سودا'], white: ['بيضاء', 'بيضا'], blue: ['زرقاء', 'زرقا'], red: ['حمراء', 'حمرا'], green: ['خضراء', 'خضرا'] };
const COLW = Object.fromEntries(Object.entries(FAM).map(([k, ws]) => [k, ws.concat(FEM[k] || []).map(norm)]));
const COLOUR_EN = { black: 'black', white: 'white', pink: 'pink', blue: 'blue', purple: 'purple', gold: 'gold', silver: 'silver', clear: 'clear', brown: 'brown', red: 'red', green: 'green' };
const textOf = p => norm([p.name, p.subtitle, p.category && p.category.name, (p.description || '').replace(/<[^>]+>/g, ' ').slice(0, 400)].join(' '));
const famOfText = t => { for (const [k, ws] of Object.entries(COLW)) if (ws.some(w => w && t.includes(w)) || t.includes(COLOUR_EN[k])) return k; return ''; };
const budgetOf = t => { const m = t.match(/(\d{2,6})/); return m && /(ريال|رس|ميزاني|حدود|تحت|اقل|اقصي|budget|under|sar|less)/.test(t) ? +m[1] : 0; };

export async function think(text, hint, C) {
  const t = norm(text), intents = INTENTS.filter(([, r]) => r.test(t)).map(([k]) => k);
  const all = await latest(60), out = { text: '', products: [] };
  const budget = budgetOf(t), fam = (hint && hint.fam) || famOfText(t);
  const words = t.split(' ').filter(w => w.length > 1 && !STOP.has(w) && !GREET.has(w) && !/^\d+$/.test(w));
  const cw = qWords(text).filter(w => !GREET.has(w) && !famOfText(norm(w)) && !INTENTS.some(([, r]) => r.test(w)) && !/^(ريال|رس|ميزاني|budget|under|sar|less)/.test(w));
  const info = intents.some(k => ['ship', 'ret', 'pay', 'human'].includes(k));
  const lines = [];
  if (intents.includes('hello') && words.length <= 1) lines.push(`${idhafatinaT('stylist.s3')}`);
  if (intents.includes('ship')) lines.push(C.ship || idhafatinaT('stylist.s4'));
  if (intents.includes('ret')) lines.push(C.ret || idhafatinaT('stylist.s5'));
  if (intents.includes('pay')) lines.push(C.pay || idhafatinaT('stylist.s6'));
  if (intents.includes('human')) lines.push(`${idhafatinaT('stylist.s7')} ${waLink(idhafatinaT('stylist.s8'))}`);
  const scored = all.map(p => { const pt = textOf(p), price = Number(productPrice(p)) || 0; let s = 0, why = [];
    const hit = cw.filter(w => hasW(pText(p), w)).length; if (cw.length && !hit) return { s: 0 }; s += hit * 3;
    if (fam && famOfText(pt) === fam) { s += 4; why.push(`${idhafatinaT('stylist.s9')} ${FAM_AR[fam]}`); }
    if (budget) { if (price && price <= budget) { s += 2; why.push(`${idhafatinaT('stylist.s10')}${moneyText(price)})`); } else s -= 6; }
    if (intents.includes('offer') && p.is_on_sale) { s += 4; why.push(idhafatinaT('stylist.s11')); }
    if (intents.includes('gift') || intents.includes('cheap')) s += 1;
    return { p, s, why: why.join(' · ') }; }).filter(x => x.s > 0).sort((a, b) => b.s - a.s || (intents.includes('cheap') ? (Number(productPrice(a.p)) || 0) - (Number(productPrice(b.p)) || 0) : 0));
  const wantsProducts = words.length || fam || budget || intents.includes('offer') || intents.includes('gift') || intents.includes('cheap');
  let pick = scored.slice(0, 3);
  if (cw.length && !pick.length && !info) lines.push(idhafatinaT('stylist.s13'));
  else if (wantsProducts && !pick.length && all.length && !info) { pick = (budget ? all.filter(p => (Number(productPrice(p)) || 0) <= budget) : all).slice(0, 3).map(p => ({ p, why: '' }));
    lines.push(!pick.length ? idhafatinaT('stylist.s13') : intents.includes('offer') && !all.some(p => p.is_on_sale) ? idhafatinaT('stylist.s51') : idhafatinaT('stylist.s12')); }
  else if (pick.length) lines.push(fam && hint ? `${idhafatinaT('stylist.s14')}${FAM_AR[fam]}${idhafatinaT('stylist.s15')}` : `${idhafatinaT('stylist.s16')} ${AR_N(pick.length)} ${idhafatinaT('stylist.s17')}`);
  if (!lines.length) lines.push(idhafatinaT('stylist.s18'));
  if (C.note && (intents.length || !pick.length)) lines.push(C.note);
  out.text = lines.join('\n');
  out.products = pick.map(({ p, why }) => ({ id: p.id, name: p.name, url: p.url, image: productImage(p), price: productPrice(p), why }));
  return out;
}

async function readPhoto(file) {
  const img = await loadImage(file), dc = dominantColor(img), f = nearestOutfit(dc.rgb, FAMS);
  const c = d.createElement('canvas'), s = Math.min(1, 240 / Math.max(img.naturalWidth, img.naturalHeight));
  c.width = Math.max(1, Math.round(img.naturalWidth * s)); c.height = Math.max(1, Math.round(img.naturalHeight * s)); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return { thumb: c.toDataURL('image/jpeg', .7), hint: { hex: dc.hex, fam: f.k, name: FAM_AR[f.k] } };
}

const cardHtml = p => `<li><a class="idhafatina-sty-pc" href="${esc(p.url)}">
  <img src="${esc(p.image)}" alt="" loading="lazy" width="76" height="96">
  <span class="t"><b>${esc(p.name)}</b><em>${money(p.price)}</em>${p.why ? `<small>${esc(p.why)}</small>` : ''}<span class="go">${idhafatinaT('stylist.s19')} <span aria-hidden="true">←</span></span></span></a></li>`;
const CHIPS = lz(Object.assign(() => ([['photo', '📷', idhafatinaT('stylist.s20')], ['ask', '🏷️', idhafatinaT('stylist.s21'), idhafatinaT('stylist.s22')], ['ask', '🎁', idhafatinaT('stylist.s23'), idhafatinaT('stylist.s24')], ['ask', '🚚', idhafatinaT('stylist.s25'), idhafatinaT('stylist.s26')]]), { a: 1 }));

let panel = null;
export default function openStylist(fab) {
  if (panel) { panel.open(); return; }
  const C = cfg(), hist = load();
  const el = d.createElement('section'); el.className = 'idhafatina-sty'; el.id = 'idhafatina-sty';
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-labelledby', 'idhafatina-sty-n'); el.setAttribute('aria-describedby', 'idhafatina-sty-tg'); el.setAttribute('aria-modal', 'false');
  el.innerHTML = `<div class="idhafatina-sty-bg" data-close></div><div class="idhafatina-sty-card" data-lenis-prevent>
    <header class="idhafatina-sty-hd"><span class="idhafatina-sty-av" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.8l1.9 5.6 5.6 1.9-5.6 1.9L12 17.8l-1.9-5.6-5.6-1.9 5.6-1.9z"/></svg></span>
      <span class="idhafatina-sty-who"><h2 id="idhafatina-sty-n">${esc(C.name)}</h2><p id="idhafatina-sty-tg">${esc(C.tag)}</p></span>
      <button type="button" class="idhafatina-sty-ic" data-new aria-label="${idhafatinaT('stylist.s27')}" title="${idhafatinaT('stylist.s27')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/></svg></button>
      <button type="button" class="idhafatina-sty-ic" data-close aria-label="${idhafatinaT('stylist.s28')}" title="${idhafatinaT('stylist.s29')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></header>
    <div class="idhafatina-sty-log" tabindex="0" aria-label="${idhafatinaT('stylist.s30')}"></div>
    <p class="idhafatina-sr" aria-live="polite" data-say></p>
    <div class="idhafatina-sty-chips" role="group" aria-label="${idhafatinaT('stylist.s31')}">${CHIPS.map(([k, i, l, qq]) => `<button type="button" class="idhafatina-chip" data-chip="${k}"${qq ? ` data-q="${esc(qq)}"` : ''}><span aria-hidden="true">${i}</span>${l}</button>`).join('')}</div>
    <form class="idhafatina-sty-form" novalidate>
      <div class="idhafatina-sty-pv" hidden><img alt="${idhafatinaT('stylist.s32')}" data-pvimg><span class="t"><b>${idhafatinaT('stylist.s33')}</b><span data-pvc></span></span><button type="button" class="idhafatina-sty-ic" data-unpic aria-label="${idhafatinaT('stylist.s34')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
      <div class="idhafatina-sty-row">
        <label class="idhafatina-sty-ic idhafatina-sty-pic" title="${idhafatinaT('stylist.s35')}"><input type="file" accept="image/*" data-file class="idhafatina-sr"><span class="idhafatina-sr">${idhafatinaT('stylist.s35')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5h3l1.6-2.5h6.8L17 8.5h3v10H4z"/><circle cx="12" cy="13" r="3.4"/></svg></label>
        <input type="file" accept="image/*" capture="environment" data-cam class="idhafatina-sr" tabindex="-1" aria-hidden="true">
        <label class="idhafatina-sr" for="idhafatina-sty-q">${idhafatinaT('stylist.s36')}</label>
        <textarea id="idhafatina-sty-q" class="idhafatina-sty-q" rows="1" maxlength="600" enterkeyhint="send" placeholder="${idhafatinaT('stylist.s37')}"></textarea>
        <button type="submit" class="idhafatina-sty-send" aria-label="${idhafatinaT('stylist.s38')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12L4 4.5l3 7.5-3 7.5z"/></svg></button>
      </div>
      <p class="idhafatina-sty-priv"><span aria-hidden="true">🔒</span> <span>${idhafatinaT('stylist.s39')}</span></p>
    </form></div>`;
  d.body.appendChild(el);
  const log = $('.idhafatina-sty-log', el), say = $('[data-say]', el), form = $('.idhafatina-sty-form', el), q = $('#idhafatina-sty-q', el), chips = $('.idhafatina-sty-chips', el);
  let pic = null, busy = false;
  const bubble = (role, html, cls = '') => { const b = d.createElement('div'); b.className = `idhafatina-sty-m ${role} ${cls}`; b.innerHTML = html; log.appendChild(b); return b; };
  const scroll = () => { log.scrollTop = log.scrollHeight; };
  const cards = (b, ps) => { if (!ps || !ps.length) return; const ul = d.createElement('ul'); ul.className = 'idhafatina-sty-cards'; ul.setAttribute('aria-label', idhafatinaT('stylist.s40')); ul.innerHTML = ps.map(cardHtml).join(''); b.appendChild(ul); };
  const renderMsg = m => { const b = bubble(m.role, (m.img ? `<span class="idhafatina-sty-ph">📷 ${idhafatinaT('stylist.s41')}</span>` : '') + (m.text ? `<p>${fmt(m.text)}</p>` : '')); if (m.role === 'assistant') cards(b, m.products); return b; };
  const greet = () => `${idhafatinaT('stylist.s42')} ${C.name}${idhafatinaT('stylist.s43')}`;
  const renderAll = () => { log.innerHTML = ''; bubble('assistant', `<p>${fmt(greet())}</p>`, 'hello'); hist.forEach(renderMsg); chips.hidden = hist.length > 0; scroll(); };
  renderAll();

  const mobile = () => matchMedia('(max-width: 820px)').matches;
  const key = e => {
    if (e.key === 'Escape') { e.preventDefault(); return close(); }
    if (e.key !== 'Tab' || !mobile()) return;
    const f = [...el.querySelectorAll('a[href],button:not([disabled]),textarea,input:not([tabindex="-1"]),[tabindex="0"]')].filter(x => x.offsetParent !== null && !x.closest('[hidden]'));
    if (!f.length) return; const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  function open() { el.hidden = false; el.setAttribute('aria-modal', mobile() ? 'true' : 'false'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('open')));
    if (mobile()) d.documentElement.classList.add('idhafatina-locked'); fab.setAttribute('aria-expanded', 'true'); d.body.classList.add('idhafatina-sty-on'); el.addEventListener('keydown', key);
    setTimeout(() => q.focus({ preventScroll: true }), 120); scroll(); }
  function close() { el.classList.remove('open'); d.documentElement.classList.remove('idhafatina-locked'); fab.setAttribute('aria-expanded', 'false'); d.body.classList.remove('idhafatina-sty-on');
    el.removeEventListener('keydown', key); setTimeout(() => { if (!el.classList.contains('open')) el.hidden = true; }, 380); fab.focus({ preventScroll: true }); }
  el.addEventListener('click', e => { if (e.target.closest('[data-close]')) close(); });
  panel = { open, close, el };
  open();

  const clearPic = () => { pic = null; const pv = $('.idhafatina-sty-pv', el); pv.hidden = true; $('[data-pvimg]', pv).removeAttribute('src'); el.querySelectorAll('[data-file],[data-cam]').forEach(i => { i.value = ''; }); };
  const setPic = async file => {
    if (!file || !/^image\//.test(file.type)) { toast(idhafatinaT('stylist.s44')); return; }
    const pv = $('.idhafatina-sty-pv', el); pv.hidden = false; $('[data-pvc]', pv).textContent = idhafatinaT('stylist.s45');
    try { pic = await readPhoto(file); } catch (e) { pv.hidden = true; pic = null; toast(idhafatinaT('stylist.s46')); return; }
    $('[data-pvimg]', pv).src = pic.thumb;
    $('[data-pvc]', pv).innerHTML = `${idhafatinaT('stylist.s47')}: <i class="sw" style="background:${esc(pic.hint.hex)}" aria-hidden="true"></i>${esc(pic.hint.name)}`;
    q.focus();
  };
  el.querySelectorAll('[data-file],[data-cam]').forEach(i => i.addEventListener('change', () => setPic(i.files && i.files[0])));
  $('[data-unpic]', el).addEventListener('click', () => { clearPic(); q.focus(); });

  async function send(text) {
    text = (text || '').trim(); if (busy) return; if (!text && !pic) { q.focus(); return; }
    const hint = pic && pic.hint, user = { role: 'user', text, img: !!pic }; hist.push(user); save(hist); renderMsg(user);
    chips.hidden = true; q.value = ''; q.style.height = ''; clearPic(); busy = true; form.classList.add('busy');
    const b = bubble('assistant', '<p class="typing" aria-hidden="true"><i></i><i></i><i></i></p>'); scroll();
    say.textContent = `${C.name} ${idhafatinaT('stylist.s48')}`;
    let out;
    try { out = await think(text, hint, C); } catch (e) { out = { text: idhafatinaT('stylist.s49'), products: [] }; }
    await new Promise(r => setTimeout(r, 350));
    const p = b.querySelector('p'); p.classList.remove('typing'); p.removeAttribute('aria-hidden'); p.innerHTML = fmt(out.text); cards(b, out.products);
    const m = { role: 'assistant', text: out.text, products: out.products }; hist.push(m); save(hist);
    say.textContent = `${C.name}: ${out.text}${out.products.length ? ` · ${out.products.map(x => x.name).join('، ')}` : ''}`;
    busy = false; form.classList.remove('busy'); scroll();
  }
  form.addEventListener('submit', e => { e.preventDefault(); send(q.value); });
  q.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); } });
  q.addEventListener('input', () => { q.style.height = ''; q.style.height = Math.min(q.scrollHeight, 120) + 'px'; });
  chips.addEventListener('click', e => { const c = e.target.closest('[data-chip]'); if (!c) return; if (c.dataset.chip === 'photo') $('[data-cam]', el).click(); else send(c.dataset.q); });
  $('[data-new]', el).addEventListener('click', () => { hist.length = 0; save(hist); clearPic(); renderAll(); say.textContent = idhafatinaT('stylist.s50'); q.focus(); });
}
