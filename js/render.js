/* Kadr çəkmə, animasiya vaxtları, fon keşi */
"use strict";

const INTRO_LEN={perde:1.6,saray:1.9,zerf:2.6,none:.15};
function timeline(n){if(st.intro==="zerf")return{intro:0,start:-100,end:3.8};const intro=INTRO_LEN[st.intro]??.15;return{intro,start:intro+.7,end:intro+.7+n*.3+1.4}}

function renderFrame(ctx,W,H,t,layout,tplId){
  const tpl=TEMPLATES[tplId||st.template], pal={...tpl.pal,accent:(tplId?"":st.accent)||tpl.pal.accent}, b=W/1080;
  const tl=timeline(layout.length);
  ctx.save();ctx.textAlign="center";ctx.textBaseline="middle";
  drawBg(ctx,W,H,tpl,pal,tplId||st.template);
  if(st.particles&&tpl.particles!=="none")PARTICLES[tpl.particles](ctx,W,H,t,pal,b,clamp((t-tl.intro)/1.5));
  tpl.frame(ctx,W,H,pal,easeInOut(clamp((t-tl.intro)/1.9)),b,t);
  layout.forEach((it,i)=>{
    const t0=tl.start+i*.3, dur=it.anim==="wipe"?1.3:.9, p=clamp((t-t0)/dur);
    if(p<=0)return;
    ctx.save();
    if(it.anim==="wipe"){
      const e=easeInOut(p), x0=W/2-it.width/2-it.pad, w=it.width+it.pad*2;
      ctx.beginPath();ctx.rect(x0-2,it.y-it.h,w*e,it.h*3);ctx.clip();ctx.globalAlpha=clamp(p*2.5);it.draw(ctx,it.y,1);
    } else if(it.anim==="grow"){it.draw(ctx,it.y,easeOut(p))}
    else if(it.anim==="pop"){const e=easeBack(p);ctx.globalAlpha=clamp(p*2);ctx.translate(W/2,it.y+it.h/2);ctx.scale(e,e);ctx.translate(-W/2,-(it.y+it.h/2));it.draw(ctx,it.y,1)}
    else{const e=easeOut(p);ctx.globalAlpha=e;ctx.translate(0,(1-e)*22*b);it.draw(ctx,it.y,1)}
    ctx.restore();
  });
  if(st.intro==="perde"&&t<tl.intro+.4)drawCurtain(ctx,W,H,t,pal,b);
  if(st.intro==="saray"&&t<3.4)drawPalace(ctx,W,H,t,pal,b);
  if(st.intro==="zerf"&&t<3.2)drawEnvelope(ctx,W,H,t,pal,b);
  ctx.restore();
}

// Fon dəyişmir: tam ölçüdə bir dəfə çəkilir, sonra hazır şəkil kimi qoyulur (animasiya axıcı qalsın)
const _bgCache=new Map();
function drawBg(ctx,W,H,tpl,pal,id){
  if(ctx.canvas.width!==W||ctx.canvas.height!==H){tpl.bg(ctx,W,H,pal);return}
  const key=id+W+"x"+H+pal.accent;let c=_bgCache.get(key);
  if(!c){c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");x.textAlign="center";x.textBaseline="middle";tpl.bg(x,W,H,pal);
    _bgCache.set(key,c);if(_bgCache.size>4)_bgCache.delete(_bgCache.keys().next().value)}
  ctx.drawImage(c,0,0);
}
