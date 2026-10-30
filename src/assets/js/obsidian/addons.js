/* Idhafatina add-ons — ADAPTED COPY for electronics (originals in github.com/playkhaled20/idhafatina are untouched;
   a provenance copy lives in /addons/idhafatina-copy). Same 12 feature ids, re-written per store type.
   Each add-on can be switched off by the merchant (oc_addon_<id>) and adapts to the types the store really sells. */
import { VERTICALS } from './verticals';
const A = {
 stylist:   ['مستشار الإعداد','Setup advisor'],
 voice:     ['البحث الصوتي','Voice search'],
 listen:    ['استمع للمواصفات','Listen to specs'],
 tryon:     ['جرّبه بالحجم الحقيقي','True-size try'],
 recolour:  ['معاينة الألوان','Finish preview'],
 photocoach:['مدرب التصوير','Photo coach'],
 colorbook: ['دليل التشطيبات','Finish lookbook'],
 look:      ['أكمل الطقم','Complete the kit'],
 quiz:      ['اختبار احتياجك','Needs quiz'],
 undertone: ['فاحص التوافق','Compatibility check'],
 giftfinder:['مكتشف الهدايا','Gift finder'],
 presets:   ['باقات جاهزة','Ready presets']
};
/* per-type adapted content: quiz questions → search keywords, kit pieces, compat ecosystems, finishes, try-size */
const T = {
 phones:{q:[['ايش أهم شي؟','Top priority?',[['كاميرا','Camera','camera'],['بطارية','Battery','battery'],['ألعاب','Gaming','gaming']]],['الميزانية؟','Budget?',[['اقتصادي','Value','lite'],['متوسط','Mid','plus'],['فلاجشب','Flagship','pro max']]]],kit:['كفر','شاحن سريع','سماعة','حماية شاشة'],eco:['iOS','Android'],fin:['تيتانيوم','أسود','فضي','ذهبي'],size:'6.1–6.9"'},
 watches:{q:[['استخدامك؟','Use?',[['رياضة','Sport','sport'],['رسمي','Formal','classic'],['يومي','Daily','smart']]],['حجم المعصم؟','Wrist?',[['صغير','Small','40mm'],['متوسط','Medium','44mm'],['كبير','Large','46mm']]]],kit:['سير جلد','سير معدن','شاحن','علبة حفظ'],eco:['iPhone','Android'],fin:['ذهبي وردي','فضي','أسود','ستيل'],size:'40–46mm'},
 computers:{q:[['لأي شغل؟','For?',[['دراسة','Study','laptop'],['تصميم','Design','creator'],['برمجة','Coding','pro']]],['النوع؟','Type?',[['لابتوب','Laptop','laptop'],['مكتبي','Desktop','desktop'],['آل إن ون','All-in-one','aio']]]],kit:['ماوس','كيبورد','هب USB-C','شنطة'],eco:['Windows','macOS'],fin:['فضي','رمادي','أسود'],size:'13–16"'},
 gaming:{q:[['منصتك؟','Platform?',[['بلايستيشن','PlayStation','ps5'],['إكسبوكس','Xbox','xbox'],['PC','PC','gaming pc']]],['أسلوبك؟','Style?',[['تنافسي','Competitive','pro'],['قصصي','Story','edition'],['جماعي','Party','controller']]]],kit:['يد إضافية','سماعة','شاحن يد','بطاقة شحن'],eco:['PS5','Xbox','PC','Switch'],fin:['أسود','أبيض','بنفسجي'],size:'—'},
 audio:{q:[['تسمع وين؟','Where?',[['تنقل','Commute','earbuds'],['بيت','Home','speaker'],['ستوديو','Studio','headphones']]],['أهم ميزة؟','Key?',[['عزل','ANC','anc'],['بيس','Bass','bass'],['صفاء','Clarity','hi-res']]]],kit:['حافظة','كيبل','مضخم','حامل'],eco:['Bluetooth','AUX','Wi-Fi'],fin:['شامبين','أسود','فضي'],size:'—'},
 cameras:{q:[['تصور ايش؟','Shoot?',[['أشخاص','Portraits','portrait'],['سفر','Travel','compact'],['فيديو','Video','4k']]],['مستواك؟','Level?',[['مبتدئ','Beginner','kit'],['هاوي','Enthusiast','mirrorless'],['محترف','Pro','full frame']]]],kit:['عدسة','بطاقة ذاكرة','بطارية','حقيبة'],eco:['E-mount','RF','Z'],fin:['أسود','فضي'],size:'—'},
 smarthome:{q:[['تبي تتحكم في؟','Control?',[['إضاءة','Lights','bulb'],['أمان','Security','camera'],['مناخ','Climate','thermostat']]],['منصتك؟','Platform?',[['Alexa','Alexa','alexa'],['Google','Google','google'],['HomeKit','HomeKit','homekit']]]],kit:['هب','حساس','قابس ذكي','لمبة'],eco:['Alexa','Google Home','HomeKit','Matter'],fin:['أبيض','أسود'],size:'—'},
 digital_cards:{q:[['البطاقة لـ؟','For?',[['ألعاب','Games','psn'],['تسوق','Shopping','gift'],['اشتراكات','Subscriptions','subscription']]],['القيمة؟','Value?',[['50','50','50'],['100','100','100'],['250+','250+','250']]]],kit:['بطاقة إضافية','اشتراك','قسيمة'],eco:['SA','US','UAE'],fin:['رقمية'],size:'—'},
 software:{q:[['تحتاج لـ؟','Need?',[['مكتب','Office','office'],['حماية','Security','antivirus'],['تصميم','Design','creative']]],['المستخدمين؟','Users?',[['1','1','1 user'],['عائلة','Family','family'],['شركة','Business','business']]]],kit:['ترخيص إضافي','دعم','سحابة'],eco:['Windows','macOS','iOS','Android'],fin:['رقمي'],size:'—'},
 accessories:{q:[['لجهاز؟','For?',[['جوال','Phone','phone'],['لابتوب','Laptop','laptop'],['سيارة','Car','car']]],['تحتاج؟','Need?',[['شحن','Charging','charger'],['حماية','Protection','case'],['تنظيم','Organise','stand']]]],kit:['كيبل','باور بانك','شاحن','حامل'],eco:['USB-C','Lightning','MagSafe','Qi'],fin:['أسود','شامبين','فضي'],size:'—'},
 electronics:{q:[['تدور على؟','Looking for?',[['جوال','Phone','phone'],['صوتيات','Audio','headphones'],['شاشة','TV','tv']]],['الميزانية؟','Budget?',[['اقتصادي','Value','basic'],['متوسط','Mid','plus'],['فاخر','Premium','pro']]]],kit:['ضمان','شاحن','كيبل','حماية'],eco:['iOS','Android','Windows'],fin:['أسود','فضي','ذهبي'],size:'—'}
};
const SKIP={digital_cards:['tryon','recolour','photocoach','colorbook'],software:['tryon','recolour','photocoach','colorbook']};
export const adaptFor = v => ({...(T[v]||T.electronics), skip:SKIP[v]||(v==='cameras'?[]:['photocoach'])});
async function search(kw){ try{ const r=await salla.product.fetch({source:'search',source_value:kw,limit:4}); return r?.data||[]; }catch(e){ return []; } }
export function mountAddons(st, isAr){
  const B=document.body; if(B.dataset.ocAddons!=='1' || document.querySelector('.oc-ai')) return;
  const on=(B.dataset.ocAddonOff||'').split(',');
  const types=st?.present?.length?st.present:[B.dataset.ocV||'electronics'];
  let v=B.dataset.ocV&&types.includes(B.dataset.ocV)?B.dataset.ocV:types[0];
  const t=(a,e)=>isAr?a:e, cur=st?.sig?.currency||'SAR';
  const el=document.createElement('div'); el.className='oc-ai'; el.dir=isAr?'rtl':'ltr'; B.appendChild(el);
  const render=()=>{ const D=adaptFor(v), V=VERTICALS[v];
    const ids=Object.keys(A).filter(k=>!on.includes(k)&&!D.skip.includes(k));
    el.innerHTML=`<button class="oc-ai__fab">✦ ${t('إضافاتي الذكية','Smart add-ons')}</button><div class="oc-ai__p"><header><b>${t('مساعد','Assistant')} ${isAr?V.ar:V.en}</b>${types.length>1?`<select>${types.map(x=>`<option value="${x}"${x===v?' selected':''}>${isAr?VERTICALS[x].ar:VERTICALS[x].en}</option>`).join('')}</select>`:''}</header>
    <nav>${ids.map(k=>`<button data-a="${k}">${t(...A[k])}</button>`).join('')}</nav><div class="oc-ai__body">${t('اختر أداة — المحتوى مخصص لقسم','Pick a tool — tailored to')} ${isAr?V.ar:V.en}</div></div>`;
    const body=el.querySelector('.oc-ai__body');
    el.querySelector('.oc-ai__fab').onclick=()=>el.classList.toggle('is-open');
    el.querySelector('select')?.addEventListener('change',e=>{v=e.target.value;render();el.classList.add('is-open');});
    const show=async kw=>{ body.innerHTML=`<p>${t('نبحث في متجرك…','Searching your store…')}</p>`; const r=await search(kw);
      body.innerHTML=r.length?r.map(p=>`<a href="${p.url}">${p.name}</a>`).join(''):`<a href="/search?q=${encodeURIComponent(kw)}">${t('اعرض النتائج لـ','See results for')} “${kw}”</a>`; };
    const V2={
      quiz:()=>{ let ans=[]; const step=i=>{ if(i>=D.q.length) return show(ans.join(' ')); const [qa,qe,o]=D.q[i]; body.innerHTML=`<b>${t(qa,qe)}</b>`+o.map(x=>`<button data-k="${x[2]}">${t(x[0],x[1])}</button>`).join(''); body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ans.push(b.dataset.k);step(i+1);}); }; step(0); },
      stylist:()=>V2.quiz(),
      voice:()=>{ const R=window.SpeechRecognition||window.webkitSpeechRecognition; if(!R){body.textContent=t('المتصفح لا يدعم البحث الصوتي','Voice not supported');return;} const r=new R(); r.lang=isAr?'ar-SA':'en-US'; body.textContent=t('تكلم الحين…','Speak now…'); r.onresult=e=>show(e.results[0][0].transcript); r.start(); },
      listen:()=>{ const s=document.querySelector('.product-single__description, .product__description, main h1'); const u=new SpeechSynthesisUtterance((s?.textContent||document.title).slice(0,600)); u.lang=isAr?'ar-SA':'en-US'; speechSynthesis.speak(u); body.textContent=t('يتم القراءة…','Reading…'); },
      tryon:()=>{ body.innerHTML=`<b>${t('المقاس المرجعي','Reference size')}: ${D.size}</b><div class="oc-ai__ruler" style="--w:${v==='watches'?44:68}%"></div><small>${t('قارن مع جهازك الحالي على الشاشة بمقياس 1:1 تقريبي','Compare against your device at approx 1:1')}</small>`; },
      recolour:()=>{ body.innerHTML=D.fin.map(f=>`<button data-k="${f}">${f}</button>`).join(''); body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>show(b.dataset.k)); },
      colorbook:()=>V2.recolour(),
      photocoach:()=>{ body.innerHTML=t('<b>نصائح</b><p>ثبّت ISO منخفض، استخدم f/1.8 للبورتريه، وقاعدة الأثلاث.</p>','<b>Tips</b><p>Low ISO, f/1.8 for portraits, rule of thirds.</p>'); },
      look:()=>{ body.innerHTML=`<b>${t('أكمل طقمك','Complete your kit')}</b>`+D.kit.map(k=>`<button data-k="${k}">+ ${k}</button>`).join(''); body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>show(b.dataset.k)); },
      presets:()=>V2.look(),
      undertone:()=>{ body.innerHTML=`<b>${t('جهازك/نظامك؟','Your platform?')}</b>`+D.eco.map(k=>`<button data-k="${k}">${k}</button>`).join(''); body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>show(b.dataset.k)); },
      giftfinder:()=>{ body.innerHTML=`<b>${t('ميزانية الهدية','Gift budget')} (${cur})</b>`+[200,500,1000,3000].map(n=>`<button data-k="${n}">≤ ${n}</button>`).join(''); body.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>show(`${isAr?V.ar:V.en}`)); }
    };
    el.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{el.querySelectorAll('[data-a]').forEach(x=>x.classList.toggle('is-on',x===b)); V2[b.dataset.a]();});
  };
  render();
}
