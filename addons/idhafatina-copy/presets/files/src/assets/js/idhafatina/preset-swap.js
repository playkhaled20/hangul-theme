import { FAMS } from './presets';
import { BODY } from './bodymap';
import { resolveType, demoType } from './detect';
export { resolveType };
import { ICONS } from './preset-icons';
import { KAT } from './kind';
Object.assign(FAMS.atelier, KAT); Object.assign(BODY.atelier, KAT, { jewelry: 'kj', gifts: 'kg', shoesbags: 'sb' });
import { idhafatinaT, idhafatinaSlots, langReady, isBeady, genderize } from './i18n';

const NO_ICON = ['general', 'gifts'];
const isDemoT = () => document.body.dataset.idhafatinaDemo === '1' && !!demoType();
const MO = new WeakMap(), MA = new WeakMap(), MI = new WeakMap(), HO = new WeakMap();
const isF = el => /^(INPUT|TEXTAREA)$/.test(el.tagName);
const setF = (el, v) => { el.value = v; if (el.tagName === 'INPUT') el.setAttribute('value', v); else el.textContent = v; el.dispatchEvent(new Event('input', { bubbles: true })); };
const kAr = el => { if (el.classList.contains('latin')) el.classList.toggle('k-ar', !/[A-Za-z]/.test(el.textContent)); };
function setTxt(el, v) {
  if (el.dataset.m != null && !MO.has(el)) MO.set(el, isF(el) ? el.value : el.innerHTML);
  if (isF(el)) setF(el, v);
  else if (el.dataset.split) el.innerHTML = v.trim().split(/\s+/).map((w, i) => `<span class="w"><span style="--i:${i}">${w.replace(/</g, '&lt;')}</span></span>`).join(' ');
  else el.textContent = v;
  kAr(el);
}
function unM(el) {
  if (MO.has(el)) { const o = MO.get(el); MO.delete(el); if (isF(el)) setF(el, o); else el.innerHTML = o; kAr(el); }
  if (MA.has(el)) { const o = MA.get(el); MA.delete(el); Object.keys(o).forEach(a => (o[a] == null ? el.removeAttribute(a) : el.setAttribute(a, o[a]))); }
}


export function swapPreset(home, force) {
  const t = force || resolveType(); if (!t) return;
  const secs = [...home.querySelectorAll('[data-idhafatina-p]')].filter(s => s.dataset.idhafatinaP !== t);
  document.body.dataset.idhafatinaP = document.body.dataset.idhafatinaT = t;
  if (!secs.length) return;
  secs.forEach(s => { s.dataset.idhafatinaP = t; });
  const demo = isDemoT();
  const mh = secs.find(s => s.matches('.idhafatina-hero') && s.dataset.mimg != null && !demo && HO.has(s));
  if (mh) { const o = HO.get(mh), q = mh.querySelector('.idhafatina-h-bag-in'); HO.delete(mh); if (q) q.innerHTML = o[0]; if (o[1] == null) mh.removeAttribute('style'); else mh.setAttribute('style', o[1]); }
  const hero = secs.find(s => s.matches('.idhafatina-hero') && s.dataset.presetArt && (s.dataset.mimg == null || demo));
  const inner = hero && hero.querySelector('.idhafatina-h-bag-in');
  if (inner && hero.dataset.mimg != null && !HO.has(hero)) HO.set(hero, [inner.innerHTML, hero.getAttribute('style')]);
  if (inner) {
    if (!NO_ICON.includes(t) && ICONS[t]) {
      inner.innerHTML = `<div class="idhafatina-h-icon" role="img"><svg class="idhafatina-p-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[t]}</svg></div>`;
      hero.style.removeProperty('--idhafatina-hero-img');
    } else if (!inner.querySelector('img') || hero.dataset.mimg != null) {
      const src = hero.dataset.presetArt;
      inner.innerHTML = `<img src="${src}" alt="" width="622" height="629"><i class="sheen"></i>`;
      hero.style.setProperty('--idhafatina-hero-img', `url('${src}')`);
    }
  }
  langReady().then(() => {
    secs.forEach(s => s.querySelectorAll('[data-pk]').forEach(el => {
      if (el.dataset.m != null && !demo) { unM(el); return; }
      const v = idhafatinaT(`preset.${t}_${el.dataset.pk}`); if (v) setTxt(el, v);
    }));
    if (hero) {
      const w1 = hero.querySelector('[data-pk="w1"]'), w2 = hero.querySelector('[data-pk="w2"]'), h = hero.querySelector('.idhafatina-h-title');
      if (h && (w1 || w2)) {
        const a = (hero.querySelector('.ht-r .mask span') || {}).textContent || '', b = (hero.querySelector('.ht-l .mask span') || {}).textContent || '';
        h.setAttribute('aria-label', `${a} ${b}`.trim());
        h.style.setProperty('--hl', Math.max(a.length, b.length, 5)); h.style.setProperty('--ht', Math.max(a.length + b.length, 10));
      }
      const ic = hero.querySelector('.idhafatina-h-icon'); const nm = idhafatinaT(`preset.${t}_name`); if (ic && nm) ic.setAttribute('aria-label', nm);
    }
  });
}

export function swapFam(root, force) {
  const t = force || resolveType(); if (!t) return;
  if (force) document.body.dataset.idhafatinaP = t;
  const els = [...root.querySelectorAll('[data-fk],[data-bk],[data-bka],[data-tp],[data-dv]')]; if (!els.length) return;
  const demo = isDemoT();
  const one = (k, MAP) => { const variant = (MAP[k.split('_')[0]] || {})[t] || 'gen'; return idhafatinaT(`fam.${variant}_${k}`) || idhafatinaT(`fam.gen_${k}`); };
  langReady().then(() => els.forEach(el => {
    const m = el.dataset.m != null && !el.dataset.tp;
    if (m && !demo) { unM(el); return; }
    if (el.dataset.bka) el.dataset.bka.split(';').forEach(pr => { const [a, k] = pr.split('|'), v = one(k, BODY); if (!v) return; if (m) { const o = MA.get(el) || {}; if (!(a in o)) o[a] = el.getAttribute(a); MA.set(el, o); } el.setAttribute(a, v); });
    if (el.dataset.dv != null && m && !el.dataset.bk) { setTxt(el, el.dataset.dv); return; }
    if (!el.dataset.fk && !el.dataset.bk && !el.dataset.tp) return;
    const v = el.dataset.tp ? idhafatinaSlots(el.dataset.tp) : el.dataset.fk ? one(el.dataset.fk, FAMS) : one(el.dataset.bk, BODY); if (!v) return;
    setTxt(el, v);
  })).then(() => {
    root.querySelectorAll('img[data-mimg]').forEach(img => {
      if (demo) { if (!MI.has(img)) MI.set(img, [img.getAttribute('src'), img.getAttribute('alt')]); img.dataset.mo = MI.get(img)[0] || ''; img.src = img.dataset.mimg; img.alt = ''; if (img.closest('.bd')) img.hidden = !isBeady(); }
      else if (MI.has(img)) { const o = MI.get(img); MI.delete(img); delete img.dataset.mo; img.setAttribute('src', o[0]); img.setAttribute('alt', o[1] || ''); img.hidden = false; }
    });
    root.querySelectorAll('[data-mhide]').forEach(e => { e.hidden = demo; });
    svSwap(root, t);
    genderPass(root);
    const beady = isBeady();
    root.querySelectorAll('[data-bead-img]').forEach(e => { e.hidden = !beady; });
    root.querySelectorAll('[data-img-bead]').forEach(e => { e.dataset.img = beady ? e.dataset.imgBead : e.dataset.imgPlain; });
    window.dispatchEvent(new Event('idhafatina-reword'));
  });
}

// services: gift sections read as service vouchers (fam.sv_<sec> = '|' list in SVQ order; merchant text wins)
const SVO = new WeakMap(), SVQ = '.idhafatina-eyebrow>span,h2,h2+p,.idhafatina-fld>span,[data-g=msg],[data-g=reveal]>span,[data-g=wa],[data-g=buy]';
function svSwap(root, t) {
  ['gift', 'giftfinder', 'giftlog', 'thanks'].forEach(s => {
    const r = document.getElementById('idhafatina-' + s); if (!r || !(root.contains(r) || r.contains(root))) return;
    const v = t === 'services' && idhafatinaT('fam.sv_' + s).split('|');
    r.querySelectorAll(SVQ).forEach((e, i) => {
      if (e.dataset.m != null || e.dataset.tp) return;
      if (v && v[i]) { if (!SVO.has(e)) SVO.set(e, isF(e) ? e.value : e.innerHTML); setTxt(e, v[i]); }
      else if (SVO.has(e)) { const o = SVO.get(e); SVO.delete(e); if (isF(e)) setF(e, o); else e.innerHTML = o; }
    });
  });
}

const ATTRS = ['placeholder', 'aria-label', 'title'];
const G_TXT = new WeakMap(), G_ATTR = new WeakMap(), G_SPL = new WeakMap();
export function genderPass(root) {
  const secs = root.querySelectorAll ? root.querySelectorAll('.idhafatina-sec,[data-idhafatina],[data-idhafatina-feature]') : [];
  secs.forEach(sec => {
    const w = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) {
      const g = G_TXT.get(n), mine = g && n.nodeValue === g[1], v = mine ? g[0] : n.nodeValue, t = v.trim(); if (t.length < 2) continue; const f = genderize(t);
      if (f !== t) { const nv = v.replace(t, f); G_TXT.set(n, [v, nv]); n.nodeValue = nv; } else if (mine) { n.nodeValue = v; G_TXT.delete(n); }
    }
    sec.querySelectorAll('[data-split]').forEach(h => {
      const sp = [...h.querySelectorAll('.w>span')], cur = sp.map(x => x.textContent).join(' '), o = G_SPL.get(h), mine = o && cur === o[1], v = mine ? o[0] : cur, f = genderize(v), fw = f.split(' ');
      if (f !== v && fw.length === sp.length) { sp.forEach((x, i) => { x.textContent = fw[i]; }); G_SPL.set(h, [v, f]); } else if (mine) { v.split(' ').forEach((w, i) => { sp[i].textContent = w; }); G_SPL.delete(h); }
    });
    sec.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el => ATTRS.forEach(a => {
      const o = G_ATTR.get(el) || {}, mine = o[a] && el.getAttribute(a) === o[a][1], v = mine ? o[a][0] : el.getAttribute(a); if (!v) return; const f = genderize(v.trim());
      if (f !== v.trim()) { o[a] = [v, f]; G_ATTR.set(el, o); el.setAttribute(a, f); } else if (mine) { el.setAttribute(a, v); delete o[a]; }
    }));
  });
}
