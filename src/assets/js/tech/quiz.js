// quiz (tech): "Which device fits you?" — 4 quick questions build a usage profile and score devices.
import { T, sheet, products, card, text, price, specs } from './kit';
const Q = [
  { q: { ar: 'أكثر شي تستخدم الجهاز فيه؟', en: 'Main use?' }, a: [['gaming', { ar: 'ألعاب', en: 'Gaming' }], ['photo', { ar: 'تصوير', en: 'Photos' }], ['work', { ar: 'شغل ودراسة', en: 'Work/study' }], ['basic', { ar: 'تواصل وسوشال', en: 'Social' }]] },
  { q: { ar: 'البطارية؟', en: 'Battery?' }, a: [['bat', { ar: 'لازم تطوّل', en: 'Must last' }], ['', { ar: 'عادي', en: 'Normal' }]] },
  { q: { ar: 'التخزين؟', en: 'Storage?' }, a: [['big', { ar: '256 وفوق', en: '256GB+' }], ['', { ar: '128 تكفي', en: '128GB fine' }]] },
  { q: { ar: 'الميزانية؟', en: 'Budget?' }, a: [['b1500', { ar: 'أقل من 1500', en: '< 1500' }], ['b4000', { ar: 'أقل من 4000', en: '< 4000' }], ['', { ar: 'مفتوحة', en: 'Any' }]] }
];
const KW = { gaming: /(gaming|العاب|قيمنق|120hz|144hz|rtx|ps5|xbox)/, photo: /(كاميرا|camera|mp|ميجا|zoom)/, work: /(لابتوب|laptop|office|كيبورد|ipad|تابلت)/, basic: /(جوال|phone|lite|a\d\d)/, bat: /(\d{4,5} ?mah|بطاريه)/ };
export function score(p, ans) { const t = text(p), s = specs(t); let n = 0;
  ans.forEach(a => { if (KW[a] && KW[a].test(t)) n += 3; if (a === 'big' && s.storage >= 256) n += 2; if (a[0] === 'b' && a !== 'big' && a !== 'basic' && a !== 'bat') n += price(p) <= +a.slice(1) ? 2 : -5; }); return n; }
export default function open() { const ans = []; let i = 0;
  const w = sheet(T({ ar: 'أي جهاز يناسبك؟', en: 'Which device fits you?' }), '<div class="tk-quiz"></div>'), box = w.querySelector('.tk-quiz');
  const step = async () => { if (i < Q.length) { box.innerHTML = `<p><small>${i + 1}/${Q.length}</small> ${T(Q[i].q)}</p><div class="tk-chips">${Q[i].a.map(([k, l]) => `<button type="button" data-a="${k}">${T(l)}</button>`).join('')}</div>`; return; }
    const r = (await products()).map(p => ({ p, s: score(p, ans) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 4);
    box.innerHTML = `<p>${T({ ar: 'هذي أنسب الأجهزة لك:', en: 'Best matches for you:' })}</p><div class="tk-grid">${r.map(x => card(x.p)).join('') || T({ ar: 'ما فيه تطابق، كلمنا ونساعدك.', en: 'No match — contact us.' })}</div>`; };
  box.addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b) return; if (b.dataset.a) ans.push(b.dataset.a); i++; step(); }); step(); }
