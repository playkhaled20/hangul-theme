import { idhafatinaT, lz } from '../i18n';
import { $, esc, ls, latest, card, famsOf, isBag, materialOf, FAM_HEX, AR, waShare, brand } from './kit';

const T = s => `${s.name || ''}`;
export const traits = p => {
  const n = T(p), m = materialOf(p);
  return {
    carry: /كلتش|محفظة|ظرف|إطار/.test(n) ? 'clutch' : /سلسلة|حزام|كروس|كتف/.test(n) ? 'shoulder' : 'hand',
    size: /ميني|صغيرة|جوال/.test(n) ? 'mini' : /توت|كبيرة/.test(n) ? 'big' : 'mid',
    style: m === 'crystal' ? 'glam' : m === 'pearl' || /لؤلؤ/.test(n) ? 'soft'
      : /ملوّن|متعددة|فيروزي|أزرق|وردي|بنفسجي|أرجواني|عنابي|تراثي|منقّط|مقلّم|ليلكي/.test(n) ? 'playful' : 'classic',
    fams: famsOf(p)
  };
};
const Q = lz(Object.assign(() => ([
  { k: 'occ', q: idhafatinaT('quiz.s1'), o: [
    { v: 'wed', t: idhafatinaT('quiz.s2') }, { v: 'coffee', t: idhafatinaT('quiz.s3') }, { v: 'daily', t: idhafatinaT('quiz.s4') }, { v: 'travel', t: idhafatinaT('quiz.s5') }] },
  { k: 'col', q: idhafatinaT('quiz.s6'), o: [
    { v: 'warm', t: idhafatinaT('quiz.s7'), f: ['gold', 'brown'] }, { v: 'pearl', t: idhafatinaT('quiz.s8'), f: ['white', 'clear'] }, { v: 'cool', t: idhafatinaT('quiz.s9'), f: ['silver', 'blue'] },
    { v: 'fun', t: idhafatinaT('quiz.s10'), f: ['pink', 'purple', 'green', 'red'] }, { v: 'dark', t: idhafatinaT('quiz.s11'), f: ['black', 'red'] }] },
  { k: 'sty', q: idhafatinaT('quiz.s12'), o: [
    { v: 'soft', t: idhafatinaT('quiz.s13') }, { v: 'glam', t: idhafatinaT('quiz.s14') }, { v: 'playful', t: idhafatinaT('quiz.s15') }, { v: 'classic', t: idhafatinaT('quiz.s16') }] },
  { k: 'size', q: idhafatinaT('quiz.s17'), o: [
    { v: 'mini', t: idhafatinaT('quiz.s18') }, { v: 'mid', t: idhafatinaT('quiz.s19') }, { v: 'big', t: idhafatinaT('quiz.s20') }] },
  { k: 'carry', q: idhafatinaT('quiz.s21'), o: [
    { v: 'hand', t: idhafatinaT('quiz.s22') }, { v: 'shoulder', t: idhafatinaT('quiz.s23') }, { v: 'clutch', t: idhafatinaT('quiz.s24') }] }
]), { a: 1 }));
export const PERSONA = lz(() => ({
  glam: { n: idhafatinaT('quiz.s25'), l: 'The Evening Queen', d: idhafatinaT('quiz.s26') },
  soft: { n: idhafatinaT('quiz.s27'), l: 'The Soft Pearl', d: idhafatinaT('quiz.s28') },
  playful: { n: idhafatinaT('quiz.s29'), l: 'The Statement', d: idhafatinaT('quiz.s30') },
  classic: { n: idhafatinaT('quiz.s31'), l: 'The Timeless Classic', d: idhafatinaT('quiz.s32') }
}));
const OCC = { wed: { style: ['glam', 'soft'], carry: ['clutch', 'hand'] }, coffee: { style: ['soft', 'classic', 'playful'], carry: ['hand'] },
  daily: { size: ['mid', 'big'], carry: ['shoulder', 'hand'] }, travel: { carry: ['shoulder'], size: ['mini', 'mid'] } };
export function score(p, a) {
  const t = traits(p), col = Q[1].o.find(o => o.v === a.col), occ = OCC[a.occ] || {};
  let s = 0;
  if (t.style === a.sty) s += 4;
  if (col && t.fams[0] && col.f.includes(t.fams[0])) s += 3; else if (col && t.fams.some(f => col.f.includes(f))) s += 1.5;
  if (t.size === a.size) s += 2;
  if (t.carry === a.carry) s += 2;
  if ((occ.style || []).includes(t.style)) s += 1; if ((occ.carry || []).includes(t.carry)) s += 1; if ((occ.size || []).includes(t.size)) s += 1;
  return s;
}
const optionMatch = (k, v, p) => { const t = traits(p); if (k === 'sty') return t.style === v; if (k === 'size') return t.size === v; if (k === 'carry') return t.carry === v;
  if (k === 'occ') { const o = OCC[v]; return (!o.style || o.style.includes(t.style)) && (!o.carry || o.carry.includes(t.carry)) && (!o.size || o.size.includes(t.size)); } return false; };

export default async function initQuiz(el) {
  const ui = $('.idhafatina-quiz-ui', el);
  const bags = (await latest(96)).filter(p => isBag(p) && materialOf(p) !== 'kids');
  let step = 0, ans = {};
  const used = new Set();
  const pic = (k, v) => { const c = bags.filter(p => optionMatch(k, v, p)); const p = c.find(x => !used.has(x.id)) || c[0]; if (p) used.add(p.id); return p; };
  const ask = () => {
    const q = Q[step]; used.clear();
    ui.innerHTML = `<div class="idhafatina-quiz-top"><span>${idhafatinaT('quiz.s33')} ${AR(step + 1)} ${idhafatinaT('quiz.s34')} ${AR(Q.length)}</span><div class="idhafatina-quiz-bar"><i style="width:${(step + 1) / Q.length * 100}%"></i></div>${step ? ('<button type="button" class="idhafatina-quiz-back" data-back>' + idhafatinaT('quiz.s35') + '</button>') : ''}</div>
      <h3 class="idhafatina-quiz-q">${q.q}</h3>
      <div class="idhafatina-quiz-opts n${q.o.length}">${q.o.map(o => {
        const p = o.f ? null : pic(q.k, o.v);
        const vis = o.f ? `<span class="idhafatina-quiz-sw">${o.f.map(f => `<i style="background:${FAM_HEX[f]}"></i>`).join('')}</span>` : p ? `<img src="${esc(p.image && p.image.url)}" alt="" loading="lazy">` : '';
        return `<button type="button" class="idhafatina-quiz-o${ans[q.k] === o.v ? ' on' : ''}" data-v="${o.v}"><figure>${vis}</figure><b>${o.t}</b></button>`; }).join('')}</div>`;
  };
  const result = () => {
    const P = PERSONA[ans.sty] || PERSONA.classic;
    const top = bags.map(p => [score(p, ans), p]).sort((a, b) => b[0] - a[0]).slice(0, 4).map(x => x[1]);
    ls.set('quiz', { ans, at: Date.now() });
    ui.innerHTML = `<div class="idhafatina-quiz-res"><div class="idhafatina-quiz-persona"><small>${P.l}</small><span>${idhafatinaT('quiz.s36')}</span><h3>${P.n}</h3><p>${P.d}</p>
        <div class="idhafatina-quiz-acts"><a class="idhafatina-btn-gold" target="_blank" rel="noopener" href="${esc(waShare(`${idhafatinaT('quiz.s41')} ${brand()} «${P.n}${idhafatinaT('quiz.s42')} ${location.origin}/#idhafatina-quiz`))}">${idhafatinaT('quiz.s37')}</a>
        <button type="button" class="idhafatina-btn-line" data-again>${idhafatinaT('quiz.s38')}</button></div></div>
      <h4 class="idhafatina-quiz-h">${idhafatinaT('quiz.s39')}</h4><div class="idhafatina-quiz-picks">${top.map(p => card(p)).join('')}</div>
      <p class="idhafatina-fine">${idhafatinaT('quiz.s40')}</p></div>`;
  };
  ui.addEventListener('click', e => {
    const o = e.target.closest('[data-v]');
    if (o) { ans[Q[step].k] = o.dataset.v; o.classList.add('on'); setTimeout(() => { step++; step < Q.length ? ask() : result(); ui.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 260); return; }
    if (e.target.closest('[data-back]')) { step = Math.max(0, step - 1); ask(); }
    if (e.target.closest('[data-again]')) { step = 0; ans = {}; ask(); }
  });
  const saved = ls.get('quiz', null);
  if (saved && saved.ans && saved.ans.sty) { ans = saved.ans; step = Q.length; result(); } else ask();
}
