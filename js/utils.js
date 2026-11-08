/* Köməkçi funksiyalar: animasiya əyriləri, rəng, mətn, Azərbaycan böyük hərfləri */
"use strict";

const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const easeOut=p=>1-Math.pow(1-p,3);
const easeInOut=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
const easeBack=p=>{const c=1.7;return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2)};
function rnd(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)}
// JS "i".toUpperCase() → "I" verir; Azərbaycan dilində "İ" olmalıdır
const upperAz=s=>s.replace(/i/g,"İ").replace(/ı/g,"I").toUpperCase();
function hexA(hex,a){const h=hex.replace("#","");const n=parseInt(h.length===3?h.split("").map(c=>c+c).join(""):h,16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`}
function fnt(style,weight,size,family){return `${style} ${weight} ${Math.round(size*10)/10}px "${family}", serif`}
function fill(text){
  return text.replace(/\{bəy\}/g,st.groom||"").replace(/\{gəlin\}/g,st.bride||"")
             .replace(/\{qonaq\}/g,st.guest.trim()||"qonağımız").replace(/\{ailə\}/g,st.family||"").replace(/\{ad\}/g,st.person||"");
}
function wrap(ctx,text,maxW){
  const out=[];
  for(const para of text.split("\n")){
    const words=para.split(/\s+/).filter(Boolean);
    if(!words.length){continue}
    let line=words[0];
    for(let i=1;i<words.length;i++){
      const test=line+" "+words[i];
      if(ctx.measureText(test).width<=maxW) line=test; else {out.push(line);line=words[i]}
    }
    out.push(line);
  }
  return out;
}
function spacedW(ctx,s,sp){let w=0;const ch=[...s];for(const c of ch)w+=ctx.measureText(c).width;return w+sp*Math.max(0,ch.length-1)}
function drawSpaced(ctx,s,cx,y,sp){
  let x=cx-spacedW(ctx,s,sp)/2; ctx.textAlign="left";
  for(const c of [...s]){ctx.fillText(c,x,y);x+=ctx.measureText(c).width+sp}
  ctx.textAlign="center";
}
function slug(s){
  const m={"ə":"e","Ə":"e","ğ":"g","Ğ":"g","ı":"i","I":"i","İ":"i","ö":"o","Ö":"o","ü":"u","Ü":"u","ç":"c","Ç":"c","ş":"s","Ş":"s"};
  return (s||"").replace(/[əƏğĞıIİöÖüÜçÇşŞ]/g,c=>m[c]).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function shade(hex,amt){const n=parseInt(hex.slice(1),16);const f=v=>clamp(Math.round(v+255*amt),0,255);return`rgb(${f(n>>16&255)},${f(n>>8&255)},${f(n&255)})`}
