/* Live smart binding: reads the merchant's real store (categories API → menus → product names → store info)
   and builds ONE section per real electronics category (2→2, 5→5, 15→15). Never needs a pre-picked vertical. */
import { VERTICALS, detect } from './verticals';
const MODES=['featured','bestsellers','bundle'];
export function img(v,i){ const b=document.body.dataset.ocImg||''; return b.replace(/[^/]*\.webp(\?.*)?$/, `${VERTICALS[v]?v:'electronics'}-${MODES[i%3]}.webp$1`); }
async function readCategories(){
  try{ const r=await salla.api.request('categories',{},'get'); const d=(r?.data||[]).filter(c=>c?.name); if(d.length) return d.map(c=>({id:c.id,name:c.name,url:c.url,sub:(c.sub_categories||[]).map(s=>s.name)})); }catch(e){}
  try{ const m=await salla.api.component?.getMenus?.('header'); const d=(m?.data||[]).filter(x=>x?.title); if(d.length) return d.map(x=>({id:x.type==='category'?x.type_id:null,name:x.title,url:x.url,sub:(x.children||[]).map(s=>s.title)})); }catch(e){}
  return [...document.querySelectorAll('.main-menu > li > a, nav a[href*="/c"]')].map(a=>({id:null,name:a.textContent.trim(),url:a.href,sub:[]})).filter(c=>c.name);
}
export function storeSignals(){
  const g=k=>{try{return window.salla?.config?.get?.(k)}catch(e){return null}};
  return { name:g('store.name')||'', desc:g('store.description')||'', currency:g('user.currency_code')||g('store.currency')||'SAR', digital:/بطاق|شحن|card|gift|code/i.test((g('store.description')||'')+document.title) };
}
export async function readStore(){
  const cats=await readCategories(), sig=storeSignals();
  const products=[...document.querySelectorAll('.s-product-card-content-title')].map(e=>e.textContent);
  const typed=cats.map(c=>({...c, v:detect([c.name,...c.sub])}));
  const present=[...new Set(typed.map(c=>c.v))];
  const main=detect([sig.name,sig.desc,...cats.map(c=>c.name),...products]);
  return {cats:typed, present:present.length?present:[main], main, sig};
}
export async function buildSmart(isAr){
  const hosts=document.querySelectorAll('[data-oc-smart]'); if(!hosts.length) return null;
  const st=await readStore();
  hosts.forEach(h=>{
    const max=+h.dataset.max||15, lim=+h.dataset.limit||8; const list=st.cats.slice(0,max);
    if(!list.length){ h.hidden=true; return; }
    const seen={};
    h.innerHTML=list.map(c=>{ const i=seen[c.v]=(seen[c.v]??-1)+1; const V=VERTICALS[c.v];
      return `<section class="s-block oc-products oc-vsec oc-smart-sec container" data-oc-v="${c.v}" style="--oc-v-acc:${document.body.dataset.ocInk==='1'?'var(--oc-ink)':V.acc}">
      <a class="oc-sbanner" href="${c.url||'#'}"><img loading="lazy" src="${img(c.v,i)}" alt="${c.name}" width="480" height="360"><span><small>${isAr?V.ar:V.en}</small><b>${c.name}</b>${c.sub.length?`<em>${c.sub.slice(0,4).join(' · ')}</em>`:''}</span></a>
      ${c.id?`<salla-products-list source="categories" source-value="[${c.id}]" limit="${lim}"></salla-products-list>`:''}</section>`; }).join('');
    h.dataset.count=list.length;
  });
  return st;
}
