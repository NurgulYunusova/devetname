/* Vəziyyət, panel, şablon şəbəkəsi, yükləmə (PNG, video, PDF) və başlanğıc */
"use strict";

let STATE=load(), KIND=STATE.kind, st=STATE[KIND];
// Yoxlama üçün: ?t=3 animasiyanı o saniyədə dondurur, ?tpl=gece şablonu açır
const QS=new URLSearchParams(location.search), DEBUG_T=QS.has("t")?+QS.get("t"):null;
if(QS.get("kind")==="ad"||QS.get("kind")==="toy"){KIND=STATE.kind=QS.get("kind");st=STATE[KIND]}
if(QS.get("tpl")&&TEMPLATES[QS.get("tpl")]){if(!TEMPLATES[QS.get("tpl")].kinds.includes(KIND)){KIND=STATE.kind=TEMPLATES[QS.get("tpl")].kinds[0];st=STATE[KIND]}const t=TEMPLATES[QS.get("tpl")];if(t.who&&!t.who.includes(st.gender))st.gender=t.who[0];st={...st,template:QS.get("tpl"),nameFont:t.nameFont,textFont:t.textFont,accent:""}}
if(QS.get("size")&&SIZES[QS.get("size")])st.size=QS.get("size");
function load(){
  const S={kind:"toy",toy:defaultState(),ad:defaultAdState()};
  try{
    const v2=JSON.parse(localStorage.getItem("devetname-v2"));
    if(v2){S.kind=v2.kind==="ad"?"ad":"toy";Object.assign(S.toy,v2.toy||{});Object.assign(S.ad,v2.ad||{})}
    else{const v1=JSON.parse(localStorage.getItem("toy-devetname-v1"));if(v1)Object.assign(S.toy,v1)}
  }catch(e){}
  return S;
}
function save(){try{localStorage.setItem("devetname-v2",JSON.stringify(STATE))}catch(e){}}

const view=document.getElementById("view"), vctx=view.getContext("2d");
let W,H,layout=null,fontsVer=0,layoutKey="";
let clockStart=performance.now(), mode="idle", recording=null;

function getLayout(ctx,w,h,tplId){
  const tpl=TEMPLATES[tplId||st.template], pal={...tpl.pal,accent:(tplId?"":st.accent)||tpl.pal.accent};
  return computeLayout(ctx,w,h,tpl,pal);
}
function setSize(){[W,H]=SIZES[st.size];if(view.width!==W||view.height!==H){view.width=W;view.height=H}}
function refreshLayout(){
  setSize();const key=JSON.stringify(st)+fontsVer;
  if(key!==layoutKey){layoutKey=key;layout=getLayout(vctx,W,H)}
}
function curEnd(){return timeline(layout?layout.length:10).end}
function tick(now){
  refreshLayout();
  let t=(now-clockStart)/1000;
  if(mode==="idle")t+=curEnd();
  if(recording){t=(now-recording.start)/1000;recording.onFrame(t)}
  if(DEBUG_T!==null&&!recording)t=DEBUG_T;
  renderFrame(vctx,W,H,t,layout);
  requestAnimationFrame(tick);
}
function showFinal(){mode="idle";clockStart=performance.now()}
function play(){mode="play";clockStart=performance.now()}

async function ensureFonts(){
  const nf=nameFontObj(), tf=textFontObj().family;
  try{
    await Promise.all([
      document.fonts.load(`${nf.style} ${nf.weight} 80px "${nf.family}"`,SAMPLE),
      document.fonts.load(`normal 400 40px "${tf}"`,SAMPLE),
      document.fonts.load(`italic 400 40px "${tf}"`,SAMPLE),
      document.fonts.load(`normal 600 40px "${tf}"`,SAMPLE),
    ]);
  }catch(e){}
  fontsVer++;
}

/* ================= Panel ================= */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function invitePresets(){if(KIND==="ad")return st.side==="valideyn"?[...AD_INVITE_G[st.gender||"qiz"],...AD_INVITE.valideyn,...AD_INVITE.any]:[...(AD_INVITE[st.side]||AD_INVITE.valideyn),...AD_INVITE.any];const e=INVITE[st.event];return[...e[st.side],...e.any]}
function allInvites(){return[...Object.values(INVITE).flatMap(e=>Object.values(e).flat()),...Object.values(AD_INVITE).flat(),...Object.values(AD_INVITE_G).flat()]}
const PRESETS={greeting:()=>KIND==="ad"?AD_GREETINGS:GREETINGS,invite:invitePresets,note:()=>KIND==="ad"?[...AD_NOTES,...AD_NOTES_G[st.gender||"qiz"]]:NOTES,closing:()=>KIND==="ad"?AD_CLOSINGS:CLOSINGS};
function fillPresetSelects(){
  $$("[data-preset]").forEach(sel=>{
    const k=sel.dataset.preset;
    sel.innerHTML=`<option value="">Hazır cümlə seçin…</option>`+PRESETS[k]().map((p,i)=>`<option value="${i}">${p.length>58?p.slice(0,56)+"…":p}</option>`).join("");
  });
}
function syncInputs(){
  $$("[data-k]").forEach(el=>{const k=el.dataset.k;if(el.type==="checkbox")el.checked=!!st[k];else el.value=st[k]??""});
  $$("[data-seg]").forEach(seg=>seg.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===(seg.dataset.seg==="kind"?KIND:st[seg.dataset.seg]))));
  document.body.dataset.kind=KIND;$("#brandEm").textContent=KIND==="ad"?"Ad günü":"Toy";
  renderTplGrid();
  $$(".tpl").forEach(b=>b.classList.toggle("on",b.dataset.id===st.template));
  $$(".tpl").forEach(b=>b.classList.toggle("on",b.dataset.id===st.template));
  $$("#nameFonts .font").forEach(b=>b.classList.toggle("on",b.dataset.f===st.nameFont));
  $$("#textFonts .font").forEach(b=>b.classList.toggle("on",b.dataset.f===st.textFont));
  buildSwatches();updateFontSamples();
}
let thumbTimer;
function changed(opts={}){
  save();showFinal();
  if(opts.fonts)ensureFonts();
  clearTimeout(thumbTimer);thumbTimer=setTimeout(drawThumbs,350);
}

$$("[data-k]").forEach(el=>el.addEventListener("input",()=>{
  const k=el.dataset.k;st[k]=el.type==="checkbox"?el.checked:el.value;
  if(["groom","bride","person","age"].includes(k))updateFontSamples();
  changed();
}));
$$("[data-preset]").forEach(sel=>sel.addEventListener("change",()=>{
  if(sel.value==="")return;const k=sel.dataset.preset;st[k]=PRESETS[k]()[+sel.value];sel.value="";syncInputs();changed();
}));
$$("[data-seg]").forEach(seg=>seg.addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;const k=seg.dataset.seg;
  if(k==="kind"){if(KIND===b.dataset.v)return;KIND=STATE.kind=b.dataset.v;st=STATE[KIND];fillPresetSelects();syncInputs();changed({fonts:true});play();return}
  const prevG=st.gender; st[k]=b.dataset.v;
  if(k==="gender"&&prevG!==st.gender){
    if(!st.person.trim()||st.person===DEF_NAMES[prevG])st.person=DEF_NAMES[st.gender];
    const cur=TEMPLATES[st.template];
    if(!cur.who||!cur.who.includes(st.gender)){
      const id=Object.keys(TEMPLATES).find(i=>{const t=TEMPLATES[i];return t.kinds.includes("ad")&&t.who&&t.who.length===1&&t.who[0]===st.gender});
      const t=TEMPLATES[id];st.template=id;st.nameFont=t.nameFont;st.textFont=t.textFont;st.accent="";
    }
    ensureFonts();play();
  }
  if(k==="event"||k==="side"||k==="gender"){
    if(!st.invite.trim()||allInvites().includes(st.invite))st.invite=invitePresets()[0];
    const titles=[...Object.values(TITLE),...Object.values(AD_TITLE)];
    if(!st.title.trim()||titles.includes(st.title))st.title=KIND==="ad"?AD_TITLE[st.side]:TITLE[st.event];
    fillPresetSelects();
  }
  syncInputs();changed();
  if(k==="intro"&&st.intro!=="none")play();
}));
$("#reset").addEventListener("click",()=>{if(!confirm("Bu dəvətnamənin bütün ayarları ilkin vəziyyətə qayıtsın?"))return;st=STATE[KIND]=KIND==="ad"?defaultAdState():defaultState();fillPresetSelects();syncInputs();changed({fonts:true});play()});

// Fontlar
function buildFontLists(){
  $("#nameFonts").innerHTML=NAME_FONTS.map(f=>`<button class="font" data-f="${f.family}"><span style="font-family:'${f.family}';font-style:${f.style};font-weight:${f.weight}"></span><small>${f.family}</small></button>`).join("");
  $("#textFonts").innerHTML=TEXT_FONTS.map(f=>`<button class="font" data-f="${f.family}"><span style="font-family:'${f.family}';font-size:19px">Toy mərasimi — Şənbə, İyun</span><small>${f.family}</small></button>`).join("");
  $("#nameFonts").addEventListener("click",e=>{const b=e.target.closest(".font");if(!b)return;st.nameFont=b.dataset.f;syncInputs();changed({fonts:true})});
  $("#textFonts").addEventListener("click",e=>{const b=e.target.closest(".font");if(!b)return;st.textFont=b.dataset.f;syncInputs();changed({fonts:true})});
}
function updateFontSamples(){
  let txt;
  if(KIND==="ad")txt=(st.person||"Aylin")+(st.age?" · "+st.age:"");
  else{const s=[st.groom||"Elvin",st.bride||"Aynur"];if(st.order==="bride")s.reverse();txt=s.join(st.connector?` ${st.connector} `:" ")}
  $$("#nameFonts .font span").forEach(sp=>sp.textContent=txt);
}
// Rənglər
let SWATCHES_TOY=["#b08d4a","#d9b871","#8c6d3f","#b5677a","#c98b8b","#7a8f6a","#2f4a6d","#5e1a26","#2a2a2a","#f3ead7"];
function buildSwatches(){
  const def=TEMPLATES[st.template].pal.accent, cur=st.accent||def;
  const SWATCHES=KIND==="ad"?SWATCHES_G[st.gender||"qiz"]:SWATCHES_TOY;
  $("#swatches").innerHTML=SWATCHES.map(c=>`<button data-c="${c}" title="${c}" style="background:${c}" class="${c===cur?"on":""}"></button>`).join("")+
    `<input type="color" value="${cur}" title="Öz rənginiz">`+(st.accent?`<button class="link" data-c="" style="width:auto;height:auto;border:0;box-shadow:none">şablonun rəngi</button>`:"");
}
$("#swatches").addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(!b)return;st.accent=b.dataset.c;buildSwatches();changed()});
$("#swatches").addEventListener("input",e=>{if(e.target.type==="color"){st.accent=e.target.value;changed()}});
$("#swatches").addEventListener("change",e=>{if(e.target.type==="color")buildSwatches()});

// Şablon kiçik şəkilləri
let gridKey="", tplCat="all";
const CATS=[["minimal","Minimalist"],["vintage","Nostalji / vintage"],["klassik","Klassik və zərif"],["cicek","Çiçəkli"],["milli","Milli naxışlar"]];
function renderTplGrid(){
  const key=KIND+(KIND==="ad"?st.gender:tplCat);if(key===gridKey)return;gridKey=key;
  const card=([id,t])=>`<button class="tpl" data-id="${id}"><canvas width="216" height="384"></canvas>${t.name}</button>`;
  const E=Object.entries(TEMPLATES);let html;
  if(KIND==="toy"){
    const T=E.filter(([,t])=>t.kinds.includes("toy"));
    html=`<div class="chips">${[["all","Hamısı · "+T.length],...CATS.map(([c,l])=>[c,l])].map(([c,l])=>`<button data-cat="${c}" class="${c===tplCat?"on":""}">${l}</button>`).join("")}</div>`;
    for(const [c,l] of CATS){if(tplCat!=="all"&&tplCat!==c)continue;const g=T.filter(([,t])=>t.cat===c);html+=`<div class="tgh">${l} · ${g.length}</div><div class="tpls">${g.map(card).join("")}</div>`}
  }
  else{
    const g=st.gender||"qiz";
    const own=E.filter(([,t])=>t.kinds.includes("ad")&&t.who&&t.who.length===1&&t.who[0]===g);
    const com=E.filter(([,t])=>t.kinds.includes("ad")&&t.who&&t.who.length>1);
    html=`<div class="tgh">${g==="oglan"?"Oğlanlar üçün":"Qızlar üçün"} · ${own.length}</div><div class="tpls">${own.map(card).join("")}</div><div class="tgh">Hər kəs üçün · ${com.length}</div><div class="tpls">${com.map(card).join("")}</div>`;
  }
  $("#tpls").innerHTML=html;
  clearTimeout(thumbTimer);thumbTimer=setTimeout(drawThumbs,20);
  loadGridFonts();
}
function loadGridFonts(){
  const ids=$$(".tpl").map(b=>b.dataset.id);
  Promise.all(ids.map(id=>{const t=TEMPLATES[id],nf=NAME_FONTS.find(f=>f.family===t.nameFont);return document.fonts.load(`${nf.style} ${nf.weight} 80px "${nf.family}"`,SAMPLE).then(()=>document.fonts.load(`normal 400 40px "${t.textFont}"`,SAMPLE))})).then(drawThumbs).catch(()=>{});
}
function buildTemplates(){
  $("#tpls").addEventListener("click",e=>{
    const ch=e.target.closest("[data-cat]");if(ch){tplCat=ch.dataset.cat;gridKey="";renderTplGrid();$$(".tpl").forEach(b=>b.classList.toggle("on",b.dataset.id===st.template));return}
    const b=e.target.closest(".tpl");if(!b)return;const t=TEMPLATES[b.dataset.id];
    st.template=b.dataset.id;st.nameFont=t.nameFont;st.textFont=t.textFont;st.accent="";
    syncInputs();changed({fonts:true});play();
  });
}
function drawThumbs(){
  const keep={nameFont:st.nameFont,textFont:st.textFont,intro:st.intro,size:st.size};
  $$(".tpl").forEach(btn=>{
    const id=btn.dataset.id,c=btn.querySelector("canvas"),x=c.getContext("2d"),t=TEMPLATES[id];
    st.nameFont=t.nameFont;st.textFont=t.textFont;st.intro="none";
    x.setTransform(216/1080,0,0,216/1080,0,0);
    const lay=getLayout(x,1080,1920,id);renderFrame(x,1080,1920,99,lay,id);
    Object.assign(st,keep);
  });
}

/* ================= Yükləmə ================= */
const status=$("#status");
function fileBase(){if(KIND==="ad")return "devetname-ad-gunu-"+(slug(st.person)||"dostlar")+(st.guest?"-"+slug(st.guest):"");const n=[st.groom,st.bride];if(st.order==="bride")n.reverse();return "devetname-"+(slug(n.join("-"))||"toy")+(st.guest?"-"+slug(st.guest):"")}
function finalCanvas(){
  const c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  x.textAlign="center";x.textBaseline="middle";
  const lay=getLayout(x,W,H);renderFrame(x,W,H,curEnd()+3,lay);return c;
}
function download(blob,name){
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);
}
const toBlob=(c,type,q)=>new Promise(r=>c.toBlob(r,type,q));

$("#play").addEventListener("click",play);
$("#dlPng").addEventListener("click",async()=>{
  await ensureFonts();const blob=await toBlob(finalCanvas(),"image/png");download(blob,fileBase()+".png");status.textContent="PNG yükləndi.";
});
$("#dlPdf").addEventListener("click",async()=>{
  if(!window.jspdf){status.textContent="PDF modulu yüklənmədi. İnternet bağlantısını yoxlayın.";return}
  await ensureFonts();const c=finalCanvas();
  const [w,h]=st.size==="card"?[148,210]:[90,160];
  const pdf=new window.jspdf.jsPDF({orientation:"portrait",unit:"mm",format:[w,h]});
  pdf.addImage(c.toDataURL("image/jpeg",.95),"JPEG",0,0,w,h);pdf.save(fileBase()+".pdf");status.textContent="PDF yükləndi.";
});
function pickMime(){
  const list=["video/mp4;codecs=avc1.42E01E","video/mp4;codecs=avc1","video/mp4","video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];
  return list.find(m=>window.MediaRecorder&&MediaRecorder.isTypeSupported(m))||"";
}
$("#dlVid").addEventListener("click",async()=>{
  if(!view.captureStream||!window.MediaRecorder){status.textContent="Bu brauzer video yazmağı dəstəkləmir. Chrome və ya Safari-də açın.";return}
  await ensureFonts();refreshLayout();
  const mime=pickMime(), dur=curEnd()+2.5, btns=$$(".bar .btn");
  const stream=view.captureStream(30);
  const rec=new MediaRecorder(stream,mime?{mimeType:mime,videoBitsPerSecond:8e6}:{videoBitsPerSecond:8e6});
  const chunks=[];rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  const prog=$("#prog");prog.style.display="block";btns.forEach(b=>b.disabled=true);
  status.textContent=`Video yazılır… (${Math.ceil(dur)} saniyə, bu səhifədən çıxmayın)`;
  rec.onstop=()=>{
    const type=rec.mimeType||mime||"video/webm",ext=type.includes("mp4")?"mp4":"webm";
    download(new Blob(chunks,{type}),fileBase()+"."+ext);
    lastVideo=new File(chunks,fileBase()+"."+ext,{type});
    prog.style.display="none";btns.forEach(b=>b.disabled=false);recording=null;showFinal();
    status.textContent=ext==="mp4"?"Video (MP4) yükləndi.":"Video WebM kimi yükləndi. WhatsApp üçün MP4 lazımdırsa, Safari və ya Chrome-un yeni versiyasında yükləyin.";
  };
  mode="play";
  recording={start:performance.now(),onFrame(t){prog.firstChild.style.width=clamp(t/dur)*100+"%";if(t>=dur&&rec.state==="recording")rec.stop()}};
  rec.start(250);
});
let lastVideo=null;
if(navigator.canShare&&navigator.canShare({files:[new File(["x"],"x.png",{type:"image/png"})]})){
  const sb=$("#share");sb.hidden=false;
  sb.addEventListener("click",async()=>{
    try{
      await ensureFonts();
      const file=lastVideo||new File([await toBlob(finalCanvas(),"image/png")],fileBase()+".png",{type:"image/png"});
      await navigator.share({files:[file],title:"Dəvətnamə"});
    }catch(e){}
  });
}

/* ================= Başlanğıc ================= */
buildTemplates();buildFontLists();fillPresetSelects();syncInputs();setSize();
(async()=>{
  await ensureFonts();
  try{await Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,2500))])}catch(e){}
  fontsVer++;drawThumbs();play();
  requestAnimationFrame(tick);
  // bütün şablon fontları yüklənəndə kiçik şəkilləri yenilə
  loadGridFonts();
})();
