const {JSDOM}=require('jsdom');const D=require('/workspace/hangul-full-work/hangul-theme/src/assets/js/obsidian/addons-data.js');
const types=Object.keys(require('fs').readFileSync('/workspace/hangul-full-work/hangul-theme/src/assets/js/obsidian/addons-data.js','utf8').match(/export default (.*)/s)[1].trim().replace(/;$/,'')&&JSON.parse(require('fs').readFileSync('/workspace/hangul-full-work/hangul-theme/src/assets/js/obsidian/addons-data.js','utf8').split('export default ')[1].trim().replace(/;$/,'')));
const BAN=['tryon','recolour','photocoach','colorbook'];let fail=0,runs=0;const fash=/عباي|فستان|بشرة|ثوب/;
(async()=>{for(const ty of types)for(const ar of [true,false]){
 const dom=new JSDOM('<body data-oc-addons="1" data-oc-v="'+ty+'"></body>',{pretendToBeVisual:true});const w=dom.window;
 global.window=w;global.speechSynthesis={cancel(){},speak(){}};global.document=w.document;global.salla={product:{fetch:async()=>({data:[{name:'X<b>',url:'/p',price:'500'},{name:'Y',url:'/q',price:'5000'}]})}};
 w.speechSynthesis={cancel(){},speak(){}};w.SpeechSynthesisUtterance=function(){};global.SpeechSynthesisUtterance=w.SpeechSynthesisUtterance;
 delete require.cache[require.resolve('./a.cjs')];const m=require('./a.cjs');
 m.mountAddons({present:[ty],sig:{currency:'SAR'}},ar);
 const ids=[...document.querySelectorAll('[data-a]')].map(b=>b.dataset.a);
 if(['digital_cards','software'].includes(ty)&&ids.some(i=>BAN.includes(i))){fail++;console.log('BAN',ty,ids)}
 for(const b of document.querySelectorAll('[data-a]')){runs++;try{b.click();await new Promise(r=>setTimeout(r,5));const sub=document.querySelector('.oc-ai__body [data-i],.oc-ai__body [data-k],.oc-ai__body [data-go]');if(sub){if(sub.dataset.go!==undefined)document.querySelector('.oc-ai__q').value='test';sub.click();await new Promise(r=>setTimeout(r,5));}
  const h=document.querySelector('.oc-ai__body').innerHTML;if(h.includes('<b>X<b>')){fail++;console.log('XSS',ty,b.dataset.a)}if(fash.test(h)){fail++;console.log('FASH',ty,b.dataset.a)}
  if(b.dataset.a==='giftfinder'&&h.includes('5000')){fail++;console.log('BUDGET',ty,h.slice(0,200))}}catch(e){fail++;console.log('ERR',ty,ar,b.dataset.a,e.message)}}
 if(ar)console.log(ty.padEnd(14),ids.length,ids.join(','));
 // off test
}
console.log('types',types.length,'runs',runs,'fail',fail)})();
