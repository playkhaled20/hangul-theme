import { idhafatinaT, lz } from '../i18n';
import { $, $$, esc, latest, card, famsOf, materialOf, productPrice, waLink, brand, money } from './kit';

export const WHO = lz(() => ({
  mom: { n: idhafatinaT('giftfinder.s1'), fam: ['black', 'gold', 'brown', 'white'], mat: { tray: 3, pearl: 2, beads: 1, crystal: 1 } },
  sister: { n: idhafatinaT('giftfinder.s2'), fam: ['pink', 'purple', 'clear', 'silver'], mat: { crystal: 3, beads: 2, pearl: 1 } },
  friend: { n: idhafatinaT('giftfinder.s3'), fam: ['pink', 'gold', 'black', 'blue'], mat: { crystal: 2, beads: 2, keychain: 1 } },
  bride: { n: idhafatinaT('giftfinder.s4'), fam: ['white', 'gold', 'clear', 'silver'], mat: { pearl: 3, crystal: 2, tray: 2 } },
  girl: { n: idhafatinaT('giftfinder.s5'), fam: ['pink', 'purple', 'white'], mat: { kids: 5, keychain: 2 } },
  teacher: { n: idhafatinaT('giftfinder.s6'), fam: ['gold', 'white', 'black'], mat: { keychain: 3, tray: 3 } },
  me: { n: idhafatinaT('giftfinder.s7'), fam: [], mat: { crystal: 2, beads: 2, pearl: 2 } }
}));
export const OCC = lz(() => ({
  eid: { n: idhafatinaT('giftfinder.s8'), fam: ['gold', 'pink', 'white'], mat: {} },
  wedding: { n: idhafatinaT('giftfinder.s9'), fam: ['white', 'gold', 'clear'], mat: { pearl: 2, tray: 1 } },
  grad: { n: idhafatinaT('giftfinder.s10'), fam: ['black', 'gold'], mat: { crystal: 1, beads: 1 } },
  baby: { n: idhafatinaT('giftfinder.s11'), fam: ['pink', 'white'], mat: { kids: 3, tray: 2 } },
  thanks: { n: idhafatinaT('giftfinder.s12'), fam: [], mat: { keychain: 3, tray: 2 } },
  bday: { n: idhafatinaT('giftfinder.s13'), fam: ['pink', 'purple', 'gold'], mat: { crystal: 1 } }
}));
export const BUDGET = lz(() => ({ 100: idhafatinaT('giftfinder.s14'), 200: idhafatinaT('giftfinder.s15'), 300: idhafatinaT('giftfinder.s16'), 0: idhafatinaT('giftfinder.s17') }));
const MAT_WHY = lz(() => ({ tray: idhafatinaT('giftfinder.s18'), keychain: idhafatinaT('giftfinder.s19'), kids: idhafatinaT('giftfinder.s20'), pearl: idhafatinaT('giftfinder.s21'), crystal: idhafatinaT('giftfinder.s22'), beads: idhafatinaT('giftfinder.s23') }));

const realMat = p => p && p.m !== 'beads' ? true : /خرز|beads?/i.test(`${(p && p.p && p.p.name) || ''} ${(p && p.p && p.p.category && p.p.category.name) || ''}`);
export const why = (x, st) => realMat(x) ? (MAT_WHY[x.m] || '') : x.famHit ? idhafatinaT('giftfinder.s40') : Number(st && st.budget) > 0 ? idhafatinaT('giftfinder.s41') : '';

export function pick(products, who, occ, budget) {
  const W = WHO[who], O = OCC[occ];
  const scored = products.map(p => {
    const m = materialOf(p), f = famsOf(p), price = productPrice(p);
    if (budget && price > budget) return null;
    if (who !== 'girl' && occ !== 'baby' && m === 'kids') return null;
    if (who === 'girl' && !['kids', 'keychain'].includes(m)) return null;
    let s = (W.mat[m] || 0) * 2 + (O.mat[m] || 0) * 2;
    const famHit = f.find(x => W.fam.includes(x)) || f.find(x => O.fam.includes(x));
    if (famHit) s += 2; if (f.some(x => O.fam.includes(x))) s += 1;
    return { p, s: s + (p.id % 7) / 100, m, famHit };
  }).filter(Boolean).sort((a, b) => b.s - a.s);
  const out = [], seenM = {};
  for (const x of scored) { if ((seenM[x.m] || 0) >= 2) continue; seenM[x.m] = (seenM[x.m] || 0) + 1; out.push(x); if (out.length === 4) break; }
  return out;
}

const chips = (name, obj, cur) => `<div class="idhafatina-gf-row" role="radiogroup">${Object.entries(obj).map(([k, v]) => `<button type="button" class="idhafatina-chip${String(k) === String(cur) ? ' on' : ''}" data-${name}="${k}" role="radio" aria-checked="${String(k) === String(cur)}">${esc(typeof v === 'string' ? v : v.n)}</button>`).join('')}</div>`;

export default function initGiftFinder(el) {
  const ui = $('.idhafatina-gf-ui', el); if (!ui) return;
  const st = { who: 'mom', occ: 'eid', budget: 300 };
  let all = [];
  const draw = () => {
    const res = pick(all, st.who, st.occ, Number(st.budget));
    const W = WHO[st.who], O = OCC[st.occ];
    ui.innerHTML = `<div class="idhafatina-gf-q"><b>${idhafatinaT('giftfinder.s24')}</b>${chips('who', WHO, st.who)}</div>
      <div class="idhafatina-gf-q"><b>${idhafatinaT('giftfinder.s25')}</b>${chips('occ', OCC, st.occ)}</div>
      <div class="idhafatina-gf-q"><b>${idhafatinaT('giftfinder.s26')}</b>${chips('budget', BUDGET, st.budget)}</div>
      <div class="idhafatina-gf-res" aria-live="polite">${all.length ? (res.length ? `<p class="idhafatina-gf-lead">${idhafatinaT('giftfinder.s28')} ${esc(O.n)} ${idhafatinaT('giftfinder.s29')}${esc(W.n)}${idhafatinaT('giftfinder.s30')}</p><div class="idhafatina-gf-grid">${res.map(x => { const w = why(x, st); return card(x.p, w ? `<small class="idhafatina-gf-why">${esc(w)}</small>` : ''); }).join('')}</div>
        <a class="idhafatina-btn-gold idhafatina-gf-wa" target="_blank" rel="noopener" href="${esc(waLink(`${idhafatinaT('giftfinder.s32')} ${brand()} ${idhafatinaT('giftfinder.s33')} ${O.n} ${idhafatinaT('giftfinder.s29')}${W.n}${st.budget > 0 ? ` ${idhafatinaT('giftfinder.s36')} ${st.budget} ${idhafatinaT('giftfinder.s37')}` : ''}${idhafatinaT('giftfinder.s34')} ${res.map(x => x.p.name).join('، ')}${idhafatinaT('giftfinder.s35')}`))}">${idhafatinaT('giftfinder.s31')}</a>`
        : ('<p class="idhafatina-gf-lead">' + idhafatinaT('giftfinder.s38') + '</p>')) : ('<p class="idhafatina-gf-lead">' + idhafatinaT('giftfinder.s39') + '</p>')}</div>
      <p class="idhafatina-fine">${idhafatinaT('giftfinder.s27')}</p>`;
  };
  ui.addEventListener('click', e => {
    const b = e.target.closest('[data-who],[data-occ],[data-budget]'); if (!b) return;
    for (const k of ['who', 'occ', 'budget']) if (b.dataset[k] != null) st[k] = b.dataset[k];
    draw();
  });
  draw(); latest(60).then(ps => { all = ps; draw(); });
}
