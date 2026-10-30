import { idhafatinaT, lz } from '../i18n';
import '../../../styles/07-features/_undertone.scss';
import { $, esc, latest, card, famsOf, materialOf, FAM_HEX, FAM_AR, ls } from './kit';

export const QS = lz(Object.assign(() => ([
  { k: 'vein', q: idhafatinaT('undertone.s1'), a: [['w', idhafatinaT('undertone.s2')], ['c', idhafatinaT('undertone.s3')], ['n', idhafatinaT('undertone.s4')]] },
  { k: 'metal', q: idhafatinaT('undertone.s5'), a: [['w', idhafatinaT('undertone.s6')], ['c', idhafatinaT('undertone.s7')], ['n', idhafatinaT('undertone.s8')]] },
  { k: 'sun', q: idhafatinaT('undertone.s9'), a: [['w', idhafatinaT('undertone.s10')], ['c', idhafatinaT('undertone.s11')], ['n', idhafatinaT('undertone.s12')]] }
]), { a: 1 }));
export const TONES = lz(() => ({
  w: { n: idhafatinaT('undertone.s13'), em: '🌅', line: idhafatinaT('undertone.s14'), fam: ['gold', 'brown', 'white', 'red'], avoid: idhafatinaT('undertone.s15') },
  c: { n: idhafatinaT('undertone.s16'), em: '❄️', line: idhafatinaT('undertone.s17'), fam: ['silver', 'clear', 'blue', 'purple', 'pink', 'black'], avoid: idhafatinaT('undertone.s18') },
  n: { n: idhafatinaT('undertone.s19'), em: '🤍', line: idhafatinaT('undertone.s20'), fam: ['pink', 'white', 'brown', 'silver', 'gold'], avoid: idhafatinaT('undertone.s21') }
}));
export function toneOf(ans) { const c = { w: 0, c: 0, n: 0 }; Object.values(ans).forEach(v => { c[v]++; }); const best = Object.entries(c).sort((a, b) => b[1] - a[1]); return best[0][1] === best[1][1] && best[0][1] > 0 ? 'n' : best[0][0]; }
export function picks(all, t) {
  const F = TONES[t].fam;
  return all.map(p => { const f = famsOf(p), i = F.indexOf(f[0]); return i < 0 || materialOf(p) === 'kids' ? null : { p, s: F.length - i + (p.id % 7) / 10 }; })
    .filter(Boolean).sort((a, b) => b.s - a.s).slice(0, 4).map(x => x.p);
}
export default function initUndertone(el) {
  const ui = $('.idhafatina-ut-ui', el); if (!ui) return;
  const ans = Object.assign({}, ls.get('undertone', {})); let all = [];
  const draw = focus => {
    const done = QS.every(q => ans[q.k]), t = done ? toneOf(ans) : '', T = TONES[t];
    ui.innerHTML = `<div class="idhafatina-ut-qs">${QS.map((q, i) => `<div class="idhafatina-ut-q" role="group" aria-labelledby="idhafatina-utq${i}"><b id="idhafatina-utq${i}"><span>${'123'[i]}</span>${esc(q.q)}</b><div class="idhafatina-gf-row">${q.a.map(([v, n]) => `<button type="button" class="idhafatina-chip${ans[q.k] === v ? ' on' : ''}" aria-pressed="${ans[q.k] === v}" data-q="${q.k}" data-v="${v}">${esc(n)}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="idhafatina-ut-res" aria-live="polite">${T ? `<div class="idhafatina-ut-card"><div class="idhafatina-ut-pal">${T.fam.slice(0, 4).map(f => `<i style="background:${FAM_HEX[f]}"></i>`).join('')}</div>
        <div><small>${idhafatinaT('undertone.s23')}</small><h3>${T.em} ${T.n}</h3><p>${esc(T.line)}</p><div class="idhafatina-ss-fams">${T.fam.map(f => `<span><i style="background:${FAM_HEX[f]}"></i>${esc(FAM_AR[f])}</span>`).join('')}</div><p class="idhafatina-ut-avoid">💡 ${esc(T.avoid)}</p></div></div>
        <div class="idhafatina-gf-grid">${all.length ? picks(all, t).map(p => card(p)).join('') || ('<p class="idhafatina-fine">' + idhafatinaT('undertone.s25') + '</p>') : ('<p class="idhafatina-fine">' + idhafatinaT('undertone.s26') + '</p>')}</div>
        <button type="button" class="idhafatina-chip" data-reset>${idhafatinaT('undertone.s24')}</button>` : `<p class="idhafatina-ut-wait">${idhafatinaT('undertone.s27')}${'0123'[Object.keys(ans).length]} ${idhafatinaT('undertone.s28')}</p>`}</div>
      <p class="idhafatina-fine">${idhafatinaT('undertone.s22')}</p>`;
    if (focus) { const f = $(focus, ui); f && f.focus(); }
  };
  ui.addEventListener('click', e => {
    const b = e.target.closest('[data-q],[data-reset]'); if (!b) return;
    if (b.dataset.reset != null) { Object.keys(ans).forEach(k => delete ans[k]); ls.set('undertone', ans); draw('[data-q]'); return; }
    ans[b.dataset.q] = b.dataset.v; ls.set('undertone', ans); draw(`[data-q="${b.dataset.q}"][data-v="${b.dataset.v}"]`);
  });
  draw(); latest(60).then(p => { all = p; draw(); });
}
