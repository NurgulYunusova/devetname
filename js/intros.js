/* Açılış effektləri: saray qapısı, zərf, pərdə */
"use strict";

function sealText(){
  if(KIND==="ad")return ((st.person||"").trim().charAt(0))||String(st.age||"");
  const a=[st.groom,st.bride].map(x=>(x||"").trim().charAt(0)).filter(Boolean);if(st.order==="bride")a.reverse();return a.join(st.connector==="&"?"&":"");
}
/* ---------- Saray qapısı ---------- */
const _doorCache=new Map();
function doorTexture(w,h,b,gold){
  const key=Math.round(w)+"x"+Math.round(h)+gold;if(_doorCache.has(key))return _doorCache.get(key);
  const c=document.createElement("canvas");c.width=Math.ceil(w);c.height=Math.ceil(h);const x=c.getContext("2d"),r=w;
  const shape=()=>{x.beginPath();x.moveTo(0,h);x.lineTo(0,r);x.arc(w,r,r,Math.PI,Math.PI*1.5);x.lineTo(w,h);x.closePath()};
  shape();const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,"#efe4cf");g.addColorStop(.6,"#fffaf0");g.addColorStop(1,"#e9dcc2");x.fillStyle=g;x.fill();
  x.save();shape();x.clip();
  // tağ pəncərəsi (yelpik)
  x.fillStyle="rgba(255,236,170,.55)";x.beginPath();x.moveTo(w,r);x.arc(w,r,r*.86,Math.PI,Math.PI*1.5);x.closePath();x.fill();
  x.strokeStyle=gold;x.lineWidth=4*b;for(let k=0;k<=6;k++){const a=Math.PI+k*Math.PI/12;x.beginPath();x.moveTo(w,r);x.lineTo(w+Math.cos(a)*r*.86,r+Math.sin(a)*r*.86);x.stroke()}
  x.beginPath();x.arc(w,r,r*.86,Math.PI,Math.PI*1.5);x.stroke();x.beginPath();x.arc(w,r,r*.3,Math.PI,Math.PI*1.5);x.stroke();
  x.fillStyle=gold;x.fillRect(0,r-3*b,w,7*b);
  // panellər
  const pl=w*.16,pw=w*.68;x.lineWidth=3*b;
  for(const [y0,y1] of [[r+h*.05,h*.56],[h*.62,h*.92]]){x.strokeRect(pl,y0,pw,y1-y0);x.lineWidth=1.2*b;x.strokeRect(pl+12*b,y0+12*b,pw-24*b,y1-y0-24*b);x.lineWidth=3*b;
    diamond(x,pl+pw/2,(y0+y1)/2,26*b,gold);x.fillStyle=gold;for(const [dx,dy] of [[0,0],[1,0],[0,1],[1,1]]){x.beginPath();x.arc(pl+12*b+dx*(pw-24*b),y0+12*b+dy*(y1-y0-24*b),5*b,0,Math.PI*2);x.fill()}}
  // dəstək
  x.strokeStyle=gold;x.lineWidth=6*b;x.beginPath();x.arc(w-30*b,h*.59,22*b,0,Math.PI*2);x.stroke();x.fillStyle=gold;x.beginPath();x.arc(w-30*b,h*.59-22*b,7*b,0,Math.PI*2);x.fill();
  x.restore();shape();x.strokeStyle=gold;x.lineWidth=5*b;x.stroke();
  _doorCache.set(key,c);return c;
}
function drawDoor(ctx,tex,hinge,dir,a,yTop,w,h){
  const N=56,f=w*2.6,yMid=yTop+h*.62;
  const X=u=>{const z=u*w*Math.sin(a),k=f/(f+z);return[hinge+dir*u*w*Math.cos(a)*k,k]};
  for(let i=0;i<N;i++){
    const u0=i/N,u1=(i+1)/N,[x0,k0]=X(u0),[x1]=X(u1),k=X((u0+u1)/2)[1];
    const sx=dir>0?u0*tex.width:(1-u1)*tex.width,sw=tex.width/N;
    const dx=Math.min(x0,x1),dwid=Math.abs(x1-x0)+.8;if(dwid<.3)continue;
    ctx.drawImage(tex,sx,0,sw,tex.height,dx,yMid-(yMid-yTop)*k,dwid,h*k);
  }
}
function drawPalace(ctx,W,H,t,pal,b){
  const cx=W/2,dw=W*.5,r=dw/2,yb=H*.8,dh=Math.min(H*.47,dw*1.75),yt=yb-dh,gold="#c9a24f";
  const open=easeInOut(clamp((t-.8)/1.4)),zq=easeInOut(clamp((t-1.55)/1.25)),fade=clamp((t-2.45)/.55);
  if(fade>=1)return;
  const s=1+zq*2.8,zy=yb-dh*.45;
  ctx.save();ctx.globalAlpha=1-fade;ctx.translate(cx,zy);ctx.scale(s,s);ctx.translate(-cx,-zy);
  // divar (qapı yeri boş qalır)
  ctx.save();ctx.beginPath();ctx.rect(-W,-H,W*3,H*3);archPath(ctx,cx-r,cx+r,yt,yb);ctx.clip("evenodd");
  const wg=ctx.createLinearGradient(0,0,0,yb);wg.addColorStop(0,"#efe3cc");wg.addColorStop(1,"#f8f1e4");ctx.fillStyle=wg;ctx.fillRect(-W,-H,W*3,yb+H);
  ctx.strokeStyle="rgba(170,140,90,.18)";ctx.lineWidth=2*b;for(let y=yb-90*b;y>-H;y-=90*b){ctx.beginPath();ctx.moveTo(-W,y);ctx.lineTo(W*2,y);ctx.stroke()}
  const fg=ctx.createLinearGradient(0,yb,0,H);fg.addColorStop(0,"#d9c7a3");fg.addColorStop(1,"#b79f74");ctx.fillStyle=fg;ctx.fillRect(-W,yb,W*3,H*2);
  ctx.strokeStyle="rgba(255,255,255,.25)";for(let k=-10;k<=10;k++){ctx.beginPath();ctx.moveTo(cx+k*40*b,yb);ctx.lineTo(cx+k*260*b,H*1.4);ctx.stroke()}
  ctx.fillStyle="#9e1b32";ctx.beginPath();ctx.moveTo(cx-r*.62,yb);ctx.lineTo(cx+r*.62,yb);ctx.lineTo(cx+W*.42,H*1.3);ctx.lineTo(cx-W*.42,H*1.3);ctx.closePath();ctx.fill();
  ctx.strokeStyle=gold;ctx.lineWidth=4*b;ctx.beginPath();ctx.moveTo(cx-r*.62,yb);ctx.lineTo(cx-W*.42,H*1.3);ctx.moveTo(cx+r*.62,yb);ctx.lineTo(cx+W*.42,H*1.3);ctx.stroke();
  // sütunlar
  for(const d of [-1,1]){const x=cx+d*(r+105*b),cw=74*b;
    const cg=ctx.createLinearGradient(x-cw/2,0,x+cw/2,0);cg.addColorStop(0,"#e6d7b8");cg.addColorStop(.5,"#fffaf0");cg.addColorStop(1,"#d8c6a2");ctx.fillStyle=cg;ctx.fillRect(x-cw/2,yt-60*b,cw,dh+60*b);
    ctx.strokeStyle="rgba(170,140,90,.45)";ctx.lineWidth=2*b;for(let k=-2;k<=2;k++){ctx.beginPath();ctx.moveTo(x+k*12*b,yt-40*b);ctx.lineTo(x+k*12*b,yb-30*b);ctx.stroke()}
    ctx.fillStyle=gold;ctx.fillRect(x-cw/2-14*b,yt-84*b,cw+28*b,26*b);ctx.fillRect(x-cw/2-10*b,yb-26*b,cw+20*b,26*b);
    const lg=ctx.createRadialGradient(x,yt+dh*.25,0,x,yt+dh*.25,90*b);lg.addColorStop(0,"rgba(255,222,140,.9)");lg.addColorStop(1,"rgba(255,222,140,0)");ctx.fillStyle=lg;ctx.beginPath();ctx.arc(x,yt+dh*.25,90*b,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#fff6d8";ctx.beginPath();ctx.arc(x,yt+dh*.25,14*b,0,Math.PI*2);ctx.fill()}
  ctx.strokeStyle=gold;ctx.lineWidth=7*b;ctx.beginPath();archPath(ctx,cx-r-20*b,cx+r+20*b,yt-20*b,yb);ctx.stroke();
  ctx.lineWidth=2.5*b;ctx.beginPath();archPath(ctx,cx-r-36*b,cx+r+36*b,yt-36*b,yb);ctx.stroke();
  crown(ctx,cx,yt-100*b,46*b);
  ctx.restore();
  // qapı arasından işıq
  if(open<.02){const pl=.6+.4*Math.sin(t*5);const lg=ctx.createLinearGradient(cx-14*b,0,cx+14*b,0);lg.addColorStop(0,"rgba(255,240,190,0)");lg.addColorStop(.5,`rgba(255,240,190,${pl})`);lg.addColorStop(1,"rgba(255,240,190,0)");ctx.fillStyle=lg;ctx.fillRect(cx-14*b,yt+r*.3,28*b,dh-r*.3)}
  // qapılar
  const tex=doorTexture(r,dh,b,gold),a=open*1.42;
  drawDoor(ctx,tex,cx-r,1,a,yt,r,dh);
  ctx.save();ctx.translate(2*cx,0);ctx.scale(-1,1);drawDoor(ctx,tex,cx-r,1,a,yt,r,dh);ctx.restore();
  // işıq partlayışı
  const gl=open*(1-zq)*.75;
  if(gl>0){ctx.save();ctx.globalCompositeOperation="lighter";
    const rg=ctx.createRadialGradient(cx,zy,0,cx,zy,dw*1.1);rg.addColorStop(0,`rgba(255,236,180,${.38*gl})`);rg.addColorStop(1,"rgba(255,236,180,0)");ctx.fillStyle=rg;ctx.fillRect(cx-dw*1.2,zy-dw*1.2,dw*2.4,dw*2.4);
    ctx.fillStyle=`rgba(255,240,200,${.08*gl})`;for(let k=0;k<10;k++){const a0=t*.3+k*Math.PI/5;ctx.beginPath();ctx.moveTo(cx,zy);ctx.arc(cx,zy,dw*1.4,a0,a0+.12);ctx.closePath();ctx.fill()}
    ctx.restore()}
  for(let i=0;i<24;i++){const x=cx+(rnd(i)-.5)*W*.9,y=yb-((rnd(i+5)*dh*1.3+t*60*b*(1+rnd(i+9)))%(dh*1.4));ctx.globalAlpha=(1-fade)*(.3+.6*(.5+.5*Math.sin(t*4+i)));sparkle(ctx,x,y,(5+rnd(i+3)*9)*b,"#e8c66a")}
  ctx.restore();
}
/* ---------- Zərf ---------- */
let _snap=null;
function drawEnvelope(ctx,W,H,t,pal,b){
  const enter=easeOut(clamp(t/.6)),q1=easeInOut(clamp((t-.75)/.7)),q2=easeInOut(clamp((t-1.45)/.8)),q3=easeInOut(clamp((t-2.25)/.8));
  if(q3>=1)return;
  const cw0=ctx.canvas.width,ch0=ctx.canvas.height;
  if(!_snap||_snap.width!==cw0||_snap.height!==ch0){_snap=document.createElement("canvas");_snap.width=cw0;_snap.height=ch0}
  const sx=_snap.getContext("2d");sx.clearRect(0,0,cw0,ch0);sx.drawImage(ctx.canvas,0,0);
  const col=pal.panel,ew=W*.86,eh=ew*.7,ex=(W-ew)/2,ey=H*.5-eh*.3+(1-enter)*H*.25,tipY=ey+eh*.56;
  const cardW=Math.min(ew*.82,(ey+eh*.55-H*.04)*W/H),cardH=cardW*H/W,cardX=(W-cardW)/2;
  const cardTop0=ey+eh*.06,cardTop1=ey+eh*.55-cardH;
  // fon
  ctx.save();ctx.globalAlpha=1-q3;
  const bg=ctx.createRadialGradient(W/2,H*.45,0,W/2,H/2,H*.8);bg.addColorStop(0,shade(pal.bg2,.04));bg.addColorStop(1,shade(pal.bg2,-.14));ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  for(let i=0;i<30;i++){ctx.globalAlpha=(1-q3)*(.25+.4*(.5+.5*Math.sin(t*3+i)));sparkle(ctx,rnd(i)*W,rnd(i+50)*H,(4+rnd(i+7)*8)*b,pal.accent)}
  ctx.globalAlpha=(1-q3)*enter;ctx.translate(0,q3*H*1.1);
  // zərfin içi
  ctx.fillStyle=shade(col,-.16);ctx.fillRect(ex,ey,ew,eh);
  const flap=(behind)=>{const k=Math.cos(Math.PI*q1);if((k<0)!==behind)return;ctx.save();ctx.translate(0,ey);ctx.scale(1,k);
    ctx.fillStyle=k<0?shade(col,-.06):shade(col,-.04);ctx.beginPath();ctx.moveTo(ex,0);ctx.lineTo(ex+ew,0);ctx.lineTo(W/2,eh*.56);ctx.closePath();ctx.fill();
    if(k<0){ctx.save();ctx.clip();ctx.strokeStyle=hexA(pal.accent,.35);ctx.lineWidth=2*b;for(let i=-20;i<20;i++){ctx.beginPath();ctx.moveTo(W/2+i*30*b,0);ctx.lineTo(W/2+i*30*b+eh*.3,eh*.6);ctx.stroke()}ctx.restore()}
    ctx.strokeStyle=hexA(pal.accent,.5);ctx.lineWidth=2*b;ctx.stroke();ctx.restore()};
  flap(true);
  ctx.restore();
  // kart
  const drawCard=()=>{ctx.save();
  if(q3<=0){ctx.beginPath();ctx.rect(0,0,W,ey+eh*.98);ctx.clip()}
  const top=cardTop0+(cardTop1-cardTop0)*q2;
  const X=cardX*(1-q3),Y=top*(1-q3),CW=cardW+(W-cardW)*q3,CH=cardH+(H-cardH)*q3;
  if(q3<1){ctx.fillStyle=`rgba(0,0,0,${.07*(1-q3)})`;for(const d of [14,8,3])ctx.fillRect(X-d*b,Y-d*b*.3,CW+2*d*b,CH+d*b*1.6)}
  ctx.drawImage(_snap,0,0,cw0,ch0,X,Y,CW,CH);ctx.restore()};
  if(q3<=0)drawCard();
  // zərfin önü
  ctx.save();ctx.globalAlpha=(1-q3)*enter;ctx.translate(0,q3*H*1.1);
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(W/2,ey+eh*.5);ctx.lineTo(ex+ew,ey);ctx.lineTo(ex+ew,ey+eh);ctx.lineTo(ex,ey+eh);ctx.closePath();ctx.fill();
  ctx.fillStyle=shade(col,-.05);ctx.beginPath();ctx.moveTo(ex,ey+eh);ctx.lineTo(W/2,ey+eh*.45);ctx.lineTo(ex+ew,ey+eh);ctx.closePath();ctx.fill();
  ctx.strokeStyle=hexA(pal.accent,.45);ctx.lineWidth=2*b;ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(W/2,ey+eh*.5);ctx.lineTo(ex+ew,ey);ctx.moveTo(ex,ey+eh);ctx.lineTo(W/2,ey+eh*.45);ctx.lineTo(ex+ew,ey+eh);ctx.stroke();
  ctx.strokeRect(ex,ey,ew,eh);
  flap(false);
  const sa=1-clamp((t-.7)/.3);
  if(sa>0){const ps=easeBack(clamp((t-.2)/.4));ctx.save();ctx.globalAlpha*=sa;ctx.translate(W/2,tipY);ctx.scale(ps*(1+(1-sa)*.3),ps*(1+(1-sa)*.3));waxSeal(ctx,0,0,70*b,"#8b2e2a",sealText(),nameFontObj());ctx.restore()}
  ctx.restore();
  if(q3>0)drawCard();
}
function drawCurtain(ctx,W,H,t,pal,b){
  const q=easeInOut(clamp((t-.75)/1.05)), off=q*W*.52;
  for(const side of [-1,1]){
    ctx.save();ctx.translate(side*off,0);
    const x=side<0?0:W/2;
    const g=ctx.createLinearGradient(x,0,x+W/2,0);
    g.addColorStop(0,side<0?pal.panel:shade(pal.panel,-.06));g.addColorStop(1,side<0?shade(pal.panel,-.06):pal.panel);
    ctx.fillStyle=g;ctx.fillRect(x,0,W/2+1,H);
    ctx.strokeStyle=hexA(pal.panelEdge,.35);ctx.lineWidth=1*b;
    for(let i=-H;i<W;i+=70*b){ctx.beginPath();ctx.moveTo(x+i,0);ctx.lineTo(x+i+H*.5,H);ctx.moveTo(x+i+H*.5,0);ctx.lineTo(x+i,H);ctx.stroke()}
    ctx.fillStyle=pal.panelEdge;ctx.fillRect(side<0?W/2-6*b:W/2,0,6*b,H);
    if(q>0){ctx.fillStyle="rgba(0,0,0,.18)";ctx.fillRect(side<0?W/2:W/2-22*b,0,22*b,H)}
    ctx.restore();
  }
  const sa=1-clamp((t-.55)/.35);
  if(sa>0){
    const r=96*b*(1+(1-sa)*.25), cx=W/2, cy=H/2;
    ctx.save();ctx.globalAlpha=sa;
    ctx.fillStyle=pal.accent;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=hexA("#ffffff",.5);ctx.lineWidth=2*b;ctx.beginPath();ctx.arc(cx,cy,r*.82,0,Math.PI*2);ctx.stroke();
    const nf=nameFontObj(); let ini=KIND==="ad"?[(st.person||"").trim().charAt(0)||String(st.age||"")].filter(Boolean):[st.groom,st.bride].map(s=>(s||"").trim().charAt(0)).filter(Boolean);
    if(KIND!=="ad"&&st.order==="bride")ini.reverse();
    ctx.fillStyle=pal.panel;ctx.font=fnt(nf.style,nf.weight,r*.8*nf.adj,nf.family);
    ctx.fillText(ini.join(st.connector==="&"?"&":" "),cx,cy+r*.06);
    ctx.restore();
  }
}
