import { idhafatinaT, lz } from '../i18n';
import { $, esc, latest, qWords, hasW, pText, card, famsOf, materialOf, FAM, FAM_AR, MAT_AR, AR, productPrice } from './kit';

const norm = s => String(s || '').replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/[إأآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase();
const SPOKEN = lz(() => ({ black: [idhafatinaT('voice.s1'), idhafatinaT('voice.s2'), idhafatinaT('voice.s3'), idhafatinaT('voice.s4')], white: [idhafatinaT('voice.s5'), idhafatinaT('voice.s6'), idhafatinaT('voice.s7'), idhafatinaT('voice.s8'), idhafatinaT('voice.s9')], pink: [idhafatinaT('voice.s10'), idhafatinaT('voice.s11'), idhafatinaT('voice.s12'), idhafatinaT('voice.s13')], blue: [idhafatinaT('voice.s14'), idhafatinaT('voice.s15'), idhafatinaT('voice.s16'), idhafatinaT('voice.s17')], purple: [idhafatinaT('voice.s18'), idhafatinaT('voice.s19'), idhafatinaT('voice.s20')], gold: [idhafatinaT('voice.s21'), idhafatinaT('voice.s22'), idhafatinaT('voice.s23')], silver: [idhafatinaT('voice.s24'), idhafatinaT('voice.s25'), idhafatinaT('voice.s26')], clear: [idhafatinaT('voice.s27'), idhafatinaT('voice.s28')], brown: [idhafatinaT('voice.s29'), idhafatinaT('voice.s30'), idhafatinaT('voice.s31'), idhafatinaT('voice.s32')], red: [idhafatinaT('voice.s33'), idhafatinaT('voice.s34'), idhafatinaT('voice.s35')], green: [idhafatinaT('voice.s36'), idhafatinaT('voice.s37'), idhafatinaT('voice.s38')] }));
const MATS = lz(() => ({ crystal: [idhafatinaT('voice.s39'), idhafatinaT('voice.s40'), idhafatinaT('voice.s41')], pearl: [idhafatinaT('voice.s42'), idhafatinaT('voice.s43'), idhafatinaT('voice.s44')], beads: [idhafatinaT('voice.s45')], tray: [idhafatinaT('voice.s46'), idhafatinaT('voice.s47'), idhafatinaT('voice.s48')], keychain: [idhafatinaT('voice.s49'), idhafatinaT('voice.s50'), idhafatinaT('voice.s51')], kids: [idhafatinaT('voice.s52'), idhafatinaT('voice.s53'), idhafatinaT('voice.s54'), idhafatinaT('voice.s55'), idhafatinaT('voice.s56')] }));
const OCCS = lz(() => ({ wed: [[idhafatinaT('voice.s57'), idhafatinaT('voice.s58'), idhafatinaT('voice.s59'), idhafatinaT('voice.s60'), idhafatinaT('voice.s61')], ['gold', 'white', 'clear', 'silver']], eid: [[idhafatinaT('voice.s62')], ['gold', 'pink', 'white']], work: [[idhafatinaT('voice.s63'), idhafatinaT('voice.s64'), idhafatinaT('voice.s65')], ['black', 'brown', 'white']], night: [[idhafatinaT('voice.s66'), idhafatinaT('voice.s67'), idhafatinaT('voice.s68')], ['black', 'gold', 'silver']] }));
const OCC_AR = lz(() => ({ wed: idhafatinaT('voice.s69'), eid: idhafatinaT('voice.s70'), work: idhafatinaT('voice.s71'), night: idhafatinaT('voice.s72') }));
export function parse(text) {
  const t = ' ' + norm(text) + ' ', q = { fams: [], mat: '', max: 0, min: 0, occ: '' };
  for (const [f, ws] of Object.entries(SPOKEN)) if (ws.concat(FAM[f] || []).some(w => t.includes(norm(w)))) q.fams.push(f);
  for (const [m, ws] of Object.entries(MATS)) if (ws.some(w => t.includes(norm(w)))) { q.mat = m; break; }
  for (const [o, [ws]] of Object.entries(OCCS)) if (ws.some(w => t.includes(w))) { q.occ = o; break; }
  const n = t.match(/(?:تحت|اقل من|ما يزيد عن|حدود|بـ?|ب|under|below|less than|max)\s*(\d{2,4})/) || t.match(/(\d{2,4})\s*(?:ريال|ر\.?س|sar|riyal)/);
  if (n) q.max = Number(n[1]); const m = t.match(/(?:فوق|اكثر من|over|above|more than)\s*(\d{2,4})/); if (m) { q.min = Number(m[1]); if (!/تحت|اقل|under|below|less/.test(t)) q.max = 0; }
  if (/رخيص|على قدي|اقتصادي|cheap|budget|affordable/.test(t)) { q.cheap = 1; if (!q.max) q.max = 150; }
  const voc = [...Object.values(SPOKEN), ...Object.values(FAM), ...Object.values(MATS), ...Object.values(OCCS).map(o => o[0])].flat().join(' ');
  q.words = qWords(text).filter(w => !hasW(voc, w) && !/^(قدي|بـ?|under|below|less|than|max|above|more|riyal)$/.test(w));
  return q;
}
export function search(all, q) {
  const want = q.fams.length ? q.fams : q.occ ? OCCS[q.occ][1] : [];
  return all.map(p => {
    const mat = materialOf(p), pr = productPrice(p), f = famsOf(p);
    const wh = (q.words || []).filter(w => hasW(pText(p), w)).length; if (q.words && q.words.length && !wh) return null;
    if (q.mat && mat !== q.mat) return null; if (!q.mat && mat === 'kids') return null;
    if (q.max && pr > q.max) return null; if (q.min && pr < q.min) return null;
    const hit = f.findIndex(x => want.includes(x)); const oh = q.occ && OCCS[q.occ][0].some(w => hasW(pText(p), w));
    if (want.length && hit < 0 && !(oh && !q.fams.length) && !q.fams.some(x => SPOKEN[x].some(w => hasW(p.name, w)))) return null;
    return { p, s: wh * 3 + (oh ? 2 : 0) + (hit === 0 ? 3 : hit > 0 ? 1 : 0) + (q.fams.length && f.every(x => q.fams.includes(x)) ? 1 : 0) + (q.cheap ? -pr / 1e4 : (p.id % 9) / 20) };
  }).filter(Boolean).sort((a, b) => b.s - a.s).map(x => x.p);
}
const chipsOf = q => [...q.fams.map(f => ['fam', f, FAM_AR[f]]), q.mat && ['mat', q.mat, MAT_AR[q.mat]], q.occ && ['occ', q.occ, OCC_AR[q.occ]], q.max && ['max', q.max, `${idhafatinaT('voice.s73')} ${AR(q.max)} ${idhafatinaT('voice.s74')}`], q.min && ['min', q.min, `${idhafatinaT('voice.s75')} ${AR(q.min)} ${idhafatinaT('voice.s74')}`]].filter(Boolean);
export default function initVoice(el) {
  const ui = $('.idhafatina-vc-ui', el); if (!ui) return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let all = [], q = null, rec = null;
  ui.innerHTML = `<form class="idhafatina-vc-box" role="search"><label for="idhafatina-vc-in" class="sr-only">${idhafatinaT('voice.s76')}</label>
      <input id="idhafatina-vc-in" class="idhafatina-input" type="search" maxlength="120" placeholder="${idhafatinaT('voice.s77')}" autocomplete="off">
      ${SR ? ('<button type="button" class="idhafatina-vc-mic" data-mic aria-label="' + idhafatinaT('voice.s81') + '" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1a7 7 0 0 0 6-6.9z"/></svg></button>') : ''}
      <button type="submit" class="idhafatina-btn-gold">${idhafatinaT('voice.s78')}</button></form>
    <div class="idhafatina-vc-try"><span>${idhafatinaT('voice.s79')}</span>${[idhafatinaT('voice.s82'), idhafatinaT('voice.s83'), idhafatinaT('voice.s84'), idhafatinaT('voice.s85')].map(x => `<button type="button" class="idhafatina-chip" data-try="${x}">${x}</button>`).join('')}</div>
    <div class="idhafatina-vc-out" aria-live="polite"></div>
    <p class="idhafatina-fine">${SR ? (idhafatinaT('voice.s86') + ' ') : ''}${idhafatinaT('voice.s80')}</p>`;
  const input = $('#idhafatina-vc-in', ui), out = $('.idhafatina-vc-out', ui), mic = $('[data-mic]', ui);
  const render = () => {
    const res = search(all, q), ch = chipsOf(q);
    out.innerHTML = `${ch.length ? `<div class="idhafatina-vc-chips"><span>${idhafatinaT('voice.s87')}</span>${ch.map(([k, v, n]) => `<button type="button" class="idhafatina-chip on" data-rm="${k}:${v}" aria-label="${idhafatinaT('voice.s88')} ${esc(n)}">${esc(n)} ×</button>`).join('')}</div>` : (q.words && q.words.length ? '' : ('<p class="idhafatina-vc-none">' + idhafatinaT('voice.s89') + '</p>'))}
      ${all.length ? (res.length ? `<p class="idhafatina-vc-n">${AR(res.length)} ${res.length > 2 && res.length < 11 ? idhafatinaT('voice.s91') : idhafatinaT('voice.s92')} ${idhafatinaT('voice.s90')}</p><div class="idhafatina-gf-grid">${res.slice(0, 6).map(p => card(p)).join('')}</div>` : ('<p class="idhafatina-vc-none">' + idhafatinaT('voice.s93') + '</p>')) : ('<p class="idhafatina-fine">' + idhafatinaT('voice.s94') + '</p>')}`;
  };
  const run = text => { q = parse(text); render(); };
  ui.addEventListener('submit', e => { e.preventDefault(); run(input.value); });
  ui.addEventListener('click', e => {
    const t = e.target.closest('[data-try]'); if (t) { input.value = t.dataset.try; run(input.value); return; }
    const r = e.target.closest('[data-rm]'); if (r && q) { const [k, v] = r.dataset.rm.split(':');
      if (k === 'fam') q.fams = q.fams.filter(x => x !== v); else q[k] = k === 'max' || k === 'min' ? 0 : '';
      render(); const f = $('[data-rm]', out) || input; f.focus(); return; }
    if (e.target.closest('[data-mic]')) listen();
  });
  const listen = () => {
    if (rec) { rec.stop(); return; }
    rec = new SR(); rec.lang = ((document.documentElement.lang || 'ar').slice(0, 2) === 'ar' ? 'ar-SA' : 'en-US'); rec.interimResults = true; rec.maxAlternatives = 1;
    mic.setAttribute('aria-pressed', 'true'); mic.classList.add('on'); input.placeholder = idhafatinaT('voice.s95');
    rec.onresult = e => { input.value = [...e.results].map(r => r[0].transcript).join(' '); if (e.results[e.results.length - 1].isFinal) run(input.value); };
    rec.onend = rec.onerror = () => { mic.setAttribute('aria-pressed', 'false'); mic.classList.remove('on'); input.placeholder = idhafatinaT('voice.s77'); rec = null; };
    try { rec.start(); } catch (err) { rec.onend(); }
  };
  latest(60).then(p => { all = p; if (q) render(); });
}
