import { idhafatinaT } from '../i18n';
import '../../../styles/07-features/_listen.scss';
import { $, esc, sheet, money, waShare } from './kit';

export function sentences(prod) {
  const desc = (($('.product__description') || {}).innerText || '').replace(/\s+/g, ' ').trim();
  const out = [`${prod.name}.`, prod.price ? `${idhafatinaT('listen.s1')} ${Math.round(prod.price)} ${idhafatinaT('listen.s2')}` : ''];
  desc.split(/(?<=[.!؟?،\n])\s+/).map(x => x.trim()).filter(x => x.length > 2).slice(0, 14).forEach(x => out.push(x));
  out.push(idhafatinaT('listen.s3'));
  return out.filter(Boolean);
}
export const arVoice = () => { const v = (window.speechSynthesis && speechSynthesis.getVoices()) || []; return v.find(x => /^ar(-SA)?/i.test(x.lang) && /SA/i.test(x.lang)) || v.find(x => /^ar/i.test(x.lang)) || null; };
function open(prod) {
  const S = sentences(prod), can = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let i = 0, rate = 0.9, playing = false;
  const s = sheet({ latin: 'Listen', title: idhafatinaT('listen.s4'), cls: 'idhafatina-ls-sheet', onClose: () => can && speechSynthesis.cancel(), body: `<div class="idhafatina-ls">
    <div class="idhafatina-ls-ctrl">${can ? `<button type="button" class="idhafatina-btn-gold" data-play aria-pressed="false">${idhafatinaT('listen.s9')}</button>
      <div class="idhafatina-gf-row" role="group" aria-label="${idhafatinaT('listen.s10')}">${[[0.75, idhafatinaT('listen.s11')], [0.9, idhafatinaT('listen.s12')], [1.15, idhafatinaT('listen.s13')]].map(([r, n]) => `<button type="button" class="idhafatina-chip" data-rate="${r}" aria-pressed="${r === rate}">${n}</button>`).join('')}</div>` : ''}
      <button type="button" class="idhafatina-chip" data-big aria-pressed="false">${idhafatinaT('listen.s5')}</button></div>
    <p class="idhafatina-ls-warn" ${can ? 'hidden' : ''}>${idhafatinaT('listen.s6')}</p>
    <ol class="idhafatina-ls-text">${S.map((x, k) => `<li data-s="${k}">${esc(x)}</li>`).join('')}</ol>
    <div class="idhafatina-hint-act"><a class="idhafatina-chip" target="_blank" rel="noopener" href="${esc(waShare(`${S.join(' ')}\n${prod.url || location.href}`))}">${idhafatinaT('listen.s7')}</a></div>
    <p class="idhafatina-fine">${idhafatinaT('listen.s8')}</p></div>` });
  const B = s.body, play = $('[data-play]', B);
  const mark = () => B.querySelectorAll('[data-s]').forEach(li => li.classList.toggle('now', +li.dataset.s === i && playing));
  const speak = () => {
    if (i >= S.length) { playing = false; i = 0; play.textContent = idhafatinaT('listen.s14'); play.setAttribute('aria-pressed', 'false'); mark(); return; }
    const u = new SpeechSynthesisUtterance(S[i]); u.lang = ((document.documentElement.lang || 'ar').slice(0, 2) === 'ar' ? 'ar-SA' : 'en-US'); u.rate = rate; const v = arVoice(); if (v) u.voice = v;
    u.onend = () => { if (playing) { i++; speak(); } }; u.onerror = () => { playing = false; mark(); };
    mark(); speechSynthesis.speak(u);
  };
  if (play) play.addEventListener('click', () => {
    playing = !playing; play.setAttribute('aria-pressed', String(playing)); play.textContent = playing ? idhafatinaT('listen.s15') : idhafatinaT('listen.s16');
    speechSynthesis.cancel(); if (playing) speak(); else mark();
  });
  B.addEventListener('click', e => { const r = e.target.closest('[data-rate]'), b = e.target.closest('[data-big]'), li = e.target.closest('[data-s]');
    if (r) { rate = +r.dataset.rate; B.querySelectorAll('[data-rate]').forEach(x => x.setAttribute('aria-pressed', x === r)); if (playing) { speechSynthesis.cancel(); speak(); } }
    if (b) { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); $('.idhafatina-ls-text', B).classList.toggle('big', on); }
    if (li && can) { i = +li.dataset.s; playing = true; play.setAttribute('aria-pressed', 'true'); play.textContent = idhafatinaT('listen.s15'); speechSynthesis.cancel(); speak(); } });
}
export const tap = prod => open(prod);
export default tap;
