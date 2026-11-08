/* Canvas bəzəkləri: buta, çiçək, şar, tac, möhür, fiyonk və s. */
"use strict";

function butaPath(ctx,s){
  ctx.moveTo(0,.95*s);
  ctx.bezierCurveTo(-.6*s,.95*s,-.62*s,.25*s,-.22*s,-.02*s);
  ctx.bezierCurveTo(.08*s,-.24*s,.16*s,-.55*s,-.06*s,-.88*s);
  ctx.bezierCurveTo(.4*s,-.68*s,.6*s,-.2*s,.52*s,.3*s);
  ctx.bezierCurveTo(.47*s,.74*s,.26*s,.95*s,0,.95*s);
}
function buta(ctx,x,y,s,rot,flip,color,lw){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(flip?-1:1,1);
  ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.lineJoin="round";
  ctx.beginPath();butaPath(ctx,s);ctx.stroke();
  ctx.save();ctx.translate(.02*s,.3*s);ctx.beginPath();butaPath(ctx,s*.5);ctx.stroke();ctx.restore();
  ctx.fillStyle=color;ctx.beginPath();ctx.arc(.02*s,.52*s,s*.07,0,Math.PI*2);ctx.fill();
  // kənar nöqtələr
  for(let k=0;k<7;k++){const a=Math.PI*.15+k*Math.PI*.17;ctx.beginPath();ctx.arc(Math.cos(a)*s*.66,.3*s+Math.sin(a)*s*.72,s*.035,0,Math.PI*2);ctx.fill()}
  ctx.restore();
}
function star8(ctx,x,y,r,color,lw,fillIt){
  ctx.save();ctx.translate(x,y);ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=lw;
  for(const a of [0,Math.PI/4]){ctx.save();ctx.rotate(a);ctx.beginPath();ctx.rect(-r*.7,-r*.7,r*1.4,r*1.4);fillIt?ctx.fill():ctx.stroke();ctx.restore()}
  ctx.beginPath();ctx.arc(0,0,r*.22,0,Math.PI*2);ctx.fill();ctx.restore();
}
function sparkle(ctx,x,y,r,color){
  ctx.fillStyle=color;ctx.beginPath();
  ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.quadraticCurveTo(x,y,x,y+r);
  ctx.quadraticCurveTo(x,y,x-r,y);ctx.quadraticCurveTo(x,y,x,y-r);ctx.fill();
}
function diamond(ctx,x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x,y-r);ctx.lineTo(x+r*.7,y);ctx.lineTo(x,y+r);ctx.lineTo(x-r*.7,y);ctx.closePath();ctx.fill()}
function flower(ctx,x,y,r,c1,c2,center,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  for(let k=0;k<5;k++){ctx.save();ctx.rotate(k*Math.PI*2/5);ctx.fillStyle=c1;ctx.beginPath();ctx.ellipse(0,-r*.52,r*.4,r*.58,0,0,Math.PI*2);ctx.fill();ctx.restore()}
  for(let k=0;k<5;k++){ctx.save();ctx.rotate(k*Math.PI*2/5+Math.PI/5);ctx.fillStyle=c2;ctx.beginPath();ctx.ellipse(0,-r*.3,r*.22,r*.36,0,0,Math.PI*2);ctx.fill();ctx.restore()}
  ctx.fillStyle=center;ctx.beginPath();ctx.arc(0,0,r*.18,0,Math.PI*2);ctx.fill();ctx.restore();
}
function leaf(ctx,x,y,len,ang,color){
  ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.fillStyle=color;ctx.beginPath();
  ctx.moveTo(0,0);ctx.quadraticCurveTo(len*.5,-len*.32,len,0);ctx.quadraticCurveTo(len*.5,len*.32,0,0);ctx.fill();
  ctx.strokeStyle="rgba(255,255,255,.35)";ctx.lineWidth=len*.02;ctx.beginPath();ctx.moveTo(len*.05,0);ctx.lineTo(len*.9,0);ctx.stroke();ctx.restore();
}
function balloon(ctx,x,y,r,color,strLen,sway,b){
  ctx.save();
  ctx.strokeStyle="rgba(90,70,80,.45)";ctx.lineWidth=1.6*b;ctx.beginPath();ctx.moveTo(x,y+r*1.2);
  ctx.bezierCurveTo(x+sway,y+r*1.2+strLen*.33,x-sway,y+r*1.2+strLen*.66,x+sway*.5,y+r*1.2+strLen);ctx.stroke();
  const g=ctx.createRadialGradient(x-r*.35,y-r*.45,r*.1,x,y,r*1.25);
  g.addColorStop(0,"rgba(255,255,255,.85)");g.addColorStop(.25,color);g.addColorStop(1,shade(color,-.12));
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,r,r*1.18,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=shade(color,-.1);ctx.beginPath();ctx.moveTo(x,y+r*1.14);ctx.lineTo(x-r*.12,y+r*1.3);ctx.lineTo(x+r*.12,y+r*1.3);ctx.closePath();ctx.fill();
  ctx.restore();
}
function cloud(ctx,x,y,s,color){
  ctx.fillStyle=color;ctx.beginPath();
  for(const [dx,dy,r] of [[0,0,.5],[.45,-.18,.42],[.85,.02,.38],[-.42,.05,.36]])ctx.moveTo(x+dx*s+r*s,y+dy*s),ctx.arc(x+dx*s,y+dy*s,r*s,0,Math.PI*2);
  ctx.fill();
}
function bunting(ctx,W,y0,sag,n,cols,p,b,t){
  const x0=W*.06,x1=W*.94;
  const yAt=x=>{const u=(x-x0)/(x1-x0);return y0+4*sag*u*(1-u)};
  ctx.strokeStyle="rgba(255,255,255,.55)";ctx.lineWidth=2*b;ctx.beginPath();
  for(let k=0;k<=40;k++){const x=x0+(x1-x0)*k/40*p;k?ctx.lineTo(x,yAt(x)):ctx.moveTo(x,yAt(x))}ctx.stroke();
  for(let i=0;i<n;i++){
    const u=(i+.5)/n;if(u>p)break;const x=x0+(x1-x0)*u,y=yAt(x),w=(x1-x0)/n*.42,sw=Math.sin(t*2+i)*.06;
    ctx.save();ctx.translate(x,y);ctx.rotate(sw);ctx.fillStyle=cols[i%cols.length];
    ctx.beginPath();ctx.moveTo(-w,0);ctx.lineTo(w,0);ctx.lineTo(0,w*1.7);ctx.closePath();ctx.fill();ctx.restore();
  }
}
function drawPath(ctx,build,L,p,lw,color){
  if(p<=0)return;
  ctx.save();ctx.strokeStyle=color;ctx.lineWidth=lw;
  if(p<1)ctx.setLineDash([L*p,L*3]);
  ctx.beginPath();build();ctx.stroke();ctx.restore();
}
const bgGrad=(ctx,H,pal)=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);return g};
function poly(ctx,x,y,r,n,rot){ctx.beginPath();for(let k=0;k<n;k++){const a=rot+k*Math.PI*2/n;k?ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):ctx.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}ctx.closePath()}
function burst(ctx,x,y,r,n,fillC,strokeC,lw){ctx.beginPath();for(let k=0;k<n*2;k++){const a=k*Math.PI/n-Math.PI/2,rr=k%2?r*.68:r;k?ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):ctx.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}ctx.closePath();ctx.fillStyle=fillC;ctx.fill();ctx.strokeStyle=strokeC;ctx.lineWidth=lw;ctx.stroke()}
function planet(ctx,x,y,r,c1,c2,ring){
  if(ring){ctx.save();ctx.translate(x,y);ctx.rotate(-.35);ctx.strokeStyle="rgba(255,228,196,.85)";ctx.lineWidth=r*.1;ctx.beginPath();ctx.ellipse(0,0,r*1.65,r*.4,0,Math.PI,Math.PI*2);ctx.stroke();ctx.restore()}
  const g=ctx.createRadialGradient(x-r*.4,y-r*.4,r*.1,x,y,r);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="rgba(255,255,255,.12)";ctx.beginPath();ctx.ellipse(x,y-r*.2,r*.95,r*.12,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(x,y+r*.3,r*.85,r*.08,0,0,Math.PI*2);ctx.fill();
  if(ring){ctx.save();ctx.translate(x,y);ctx.rotate(-.35);ctx.strokeStyle="rgba(255,228,196,.85)";ctx.lineWidth=r*.1;ctx.beginPath();ctx.ellipse(0,0,r*1.65,r*.4,0,0,Math.PI);ctx.stroke();ctx.restore()}
}
function rocket(ctx,x,y,s,rot,t){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  const f=1.25+.18*Math.sin(t*22);
  ctx.fillStyle="#ffb547";ctx.beginPath();ctx.moveTo(-s*.22,s*.6);ctx.quadraticCurveTo(0,s*(.6+f*.7),s*.22,s*.6);ctx.fill();
  ctx.fillStyle="#fff3b0";ctx.beginPath();ctx.moveTo(-s*.12,s*.6);ctx.quadraticCurveTo(0,s*(.6+f*.4),s*.12,s*.6);ctx.fill();
  ctx.fillStyle="#ff5d5d";for(const d of [-1,1]){ctx.beginPath();ctx.moveTo(d*s*.3,s*.15);ctx.lineTo(d*s*.62,s*.75);ctx.lineTo(d*s*.28,s*.6);ctx.closePath();ctx.fill()}
  ctx.fillStyle="#f1f3f8";ctx.beginPath();ctx.moveTo(0,-s);ctx.bezierCurveTo(s*.45,-s*.6,s*.42,s*.3,s*.3,s*.6);ctx.lineTo(-s*.3,s*.6);ctx.bezierCurveTo(-s*.42,s*.3,-s*.45,-s*.6,0,-s);ctx.fill();
  ctx.fillStyle="#ff5d5d";ctx.beginPath();ctx.moveTo(0,-s);ctx.bezierCurveTo(s*.3,-s*.75,s*.36,-s*.55,s*.38,-s*.45);ctx.lineTo(-s*.38,-s*.45);ctx.bezierCurveTo(-s*.36,-s*.55,-s*.3,-s*.75,0,-s);ctx.fill();
  ctx.fillStyle="#5ec8ff";ctx.strokeStyle="#c9d0dc";ctx.lineWidth=s*.06;ctx.beginPath();ctx.arc(0,-s*.1,s*.16,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.restore();
}
function football(ctx,x,y,r,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.save();ctx.clip();
  ctx.fillStyle="#222";poly(ctx,0,0,r*.36,5,-Math.PI/2);ctx.fill();
  ctx.strokeStyle="#222";ctx.lineWidth=r*.05;
  for(let k=0;k<5;k++){const a=-Math.PI/2+k*Math.PI*2/5;
    ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.36,Math.sin(a)*r*.36);ctx.lineTo(Math.cos(a)*r*.7,Math.sin(a)*r*.7);ctx.stroke();
    const a2=a+Math.PI/5;poly(ctx,Math.cos(a2)*r*1.02,Math.sin(a2)*r*1.02,r*.36,5,a2);ctx.fill();}
  ctx.restore();ctx.strokeStyle="#222";ctx.lineWidth=r*.05;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();ctx.restore();
}
function boat(ctx,x,y,s,tilt){
  ctx.save();ctx.translate(x,y);ctx.rotate(tilt);
  ctx.strokeStyle="#5b4636";ctx.lineWidth=s*.06;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-s*1.6);ctx.stroke();
  ctx.fillStyle="#ffffff";ctx.beginPath();ctx.moveTo(s*.06,-s*1.5);ctx.lineTo(s*.06,-s*.12);ctx.lineTo(s*.85,-s*.12);ctx.closePath();ctx.fill();
  ctx.fillStyle="#fff3e0";ctx.beginPath();ctx.moveTo(-s*.06,-s*1.2);ctx.lineTo(-s*.06,-s*.12);ctx.lineTo(-s*.62,-s*.12);ctx.closePath();ctx.fill();
  ctx.fillStyle="#e63946";ctx.beginPath();ctx.moveTo(0,-s*1.6);ctx.lineTo(s*.3,-s*1.5);ctx.lineTo(0,-s*1.4);ctx.fill();
  ctx.fillStyle="#e76f51";ctx.beginPath();ctx.moveTo(-s,0);ctx.lineTo(s,0);ctx.lineTo(s*.7,s*.35);ctx.lineTo(-s*.7,s*.35);ctx.closePath();ctx.fill();
  ctx.restore();
}
function crown(ctx,x,y,s){
  ctx.save();ctx.translate(x,y);
  const g=ctx.createLinearGradient(0,-s*.6,0,s*.6);g.addColorStop(0,"#ffe08a");g.addColorStop(1,"#d4a24c");
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-s,s*.35);ctx.lineTo(-s,-s*.25);ctx.lineTo(-s*.5,s*.05);ctx.lineTo(0,-s*.55);ctx.lineTo(s*.5,s*.05);ctx.lineTo(s,-s*.25);ctx.lineTo(s,s*.35);ctx.closePath();ctx.fill();
  ctx.fillStyle="#c08a35";ctx.fillRect(-s,s*.3,s*2,s*.22);
  ctx.fillStyle="#f472b6";for(const [jx,jy] of [[-s,-s*.25],[0,-s*.55],[s,-s*.25]]){ctx.beginPath();ctx.arc(jx,jy,s*.11,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle="#a78bfa";for(const jx of [-s*.55,0,s*.55]){ctx.beginPath();ctx.arc(jx,s*.41,s*.07,0,Math.PI*2);ctx.fill()}
  ctx.restore();
}
function butterfly(ctx,x,y,s,flap,c1,c2,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  for(const d of [-1,1]){ctx.save();ctx.scale(d*flap,1);
    ctx.fillStyle=c1;ctx.beginPath();ctx.ellipse(s*.45,-s*.28,s*.5,s*.36,-.5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=c2;ctx.beginPath();ctx.ellipse(s*.33,s*.28,s*.32,s*.24,.5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.55)";ctx.beginPath();ctx.arc(s*.5,-s*.3,s*.1,0,Math.PI*2);ctx.fill();ctx.restore()}
  ctx.fillStyle="#4a3b5c";ctx.beginPath();ctx.ellipse(0,0,s*.07,s*.42,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle="#4a3b5c";ctx.lineWidth=s*.035;ctx.beginPath();ctx.moveTo(0,-s*.38);ctx.quadraticCurveTo(-s*.1,-s*.7,-s*.25,-s*.75);ctx.moveTo(0,-s*.38);ctx.quadraticCurveTo(s*.1,-s*.7,s*.25,-s*.75);ctx.stroke();
  ctx.restore();
}
function icecream(ctx,x,y,s,rot,cols){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  ctx.fillStyle="#e8b77a";ctx.beginPath();ctx.moveTo(-s*.42,0);ctx.lineTo(s*.42,0);ctx.lineTo(0,s*1.25);ctx.closePath();ctx.fill();
  ctx.save();ctx.clip();ctx.strokeStyle="#c98f4d";ctx.lineWidth=s*.04;for(let k=-4;k<=4;k++){ctx.beginPath();ctx.moveTo(k*s*.2-s*.6,0);ctx.lineTo(k*s*.2+s*.6,s*1.25);ctx.moveTo(k*s*.2+s*.6,0);ctx.lineTo(k*s*.2-s*.6,s*1.25);ctx.stroke()}ctx.restore();
  ctx.fillStyle=cols[0];ctx.beginPath();ctx.arc(0,-s*.12,s*.46,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=cols[1];ctx.beginPath();ctx.arc(0,-s*.68,s*.4,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#e63946";ctx.beginPath();ctx.arc(0,-s*1.12,s*.12,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle="#5b8c3a";ctx.lineWidth=s*.04;ctx.beginPath();ctx.moveTo(0,-s*1.2);ctx.quadraticCurveTo(s*.1,-s*1.4,s*.22,-s*1.42);ctx.stroke();
  const sp=["#ffffff","#ffd166","#6fb7ff","#7fd1ae"];for(let k=0;k<8;k++){ctx.save();ctx.translate(Math.cos(k*2.4)*s*.25,-s*.7+Math.sin(k*1.7)*s*.2);ctx.rotate(k);ctx.fillStyle=sp[k%4];ctx.fillRect(-s*.05,-s*.015,s*.1,s*.03);ctx.restore()}
  ctx.restore();
}
function initials(){const a=[st.groom,st.bride].map(x=>(x||"").trim().charAt(0)).filter(Boolean);if(st.order==="bride")a.reverse();return a}
let _noise=null;
function noiseCanvas(){if(_noise)return _noise;const c=document.createElement("canvas");c.width=c.height=256;const x=c.getContext("2d"),d=x.createImageData(256,256);
  for(let i=0;i<256*256;i++){const v=rnd(i*.731)*255;d.data[i*4]=d.data[i*4+1]=d.data[i*4+2]=v;d.data[i*4+3]=26}x.putImageData(d,0,0);return _noise=c}
function grain(ctx,W,H,a){ctx.save();ctx.globalAlpha=a;ctx.fillStyle=ctx.createPattern(noiseCanvas(),"repeat");ctx.fillRect(0,0,W,H);ctx.restore()}
function vignette(ctx,W,H,col,a){const g=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);g.addColorStop(0,hexA(col,0));g.addColorStop(1,hexA(col,a));ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
function sprig(ctx,x,y,len,ang,color,p,o={}){
  if(p<=0)return;const n=o.leaves||7,c=-len*(o.curve??.1),lw=o.lw||2;
  ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=lw;ctx.lineCap="round";
  ctx.save();if(p<1)ctx.setLineDash([len*1.1*p,len*3]);ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(len/2,c,len,0);ctx.stroke();ctx.restore();
  for(let k=1;k<=n+1;k++){const u=k/(n+1);if(u>p+.001)break;
    const px=u*len,py=2*u*(1-u)*c,side=k===n+1?0:(k%2?1:-1),L=len*(o.size||.16)*(1-u*.3);
    ctx.save();ctx.translate(px,py);ctx.rotate(side*-.8+(side?0:-.05));ctx.globalAlpha=o.alpha||1;ctx.beginPath();
    if(o.style==="round"){ctx.ellipse(L*.55,0,L*.5,L*.42,0,0,Math.PI*2);ctx.fill()}
    else{ctx.moveTo(0,0);ctx.quadraticCurveTo(L*.5,-L*.3,L,0);ctx.quadraticCurveTo(L*.5,L*.3,0,0);o.style==="fill"?ctx.fill():ctx.stroke()}
    ctx.restore()}
  ctx.restore();
}
function bow(ctx,x,y,s,color){
  ctx.save();ctx.translate(x,y);
  for(const d of [-1,1]){ctx.save();ctx.scale(d,1);
    ctx.fillStyle=shade(color,-.08);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(s*.5,s*1.15);ctx.lineTo(s*.3,s*1.08);ctx.lineTo(s*.2,s*1.22);ctx.closePath();ctx.fill();
    ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(s*.9,-s*.75,s*1.15,s*.45,0,0);ctx.fill();
    ctx.strokeStyle=shade(color,.12);ctx.lineWidth=s*.05;ctx.beginPath();ctx.moveTo(s*.1,-s*.05);ctx.quadraticCurveTo(s*.6,-s*.4,s*.75,-s*.1);ctx.stroke();ctx.restore()}
  ctx.fillStyle=shade(color,-.12);ctx.beginPath();ctx.arc(0,0,s*.15,0,Math.PI*2);ctx.fill();ctx.restore();
}
function rose(ctx,x,y,r,cols,rot){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  for(let L=0;L<4;L++){const n=5+L,rr=r*(1-L*.22);ctx.fillStyle=cols[L%cols.length];
    for(let k=0;k<n;k++){const a=k*Math.PI*2/n+L*.6;ctx.beginPath();ctx.ellipse(Math.cos(a)*rr*.42,Math.sin(a)*rr*.42,rr*.55,rr*.4,a,0,Math.PI*2);ctx.fill()}}
  ctx.strokeStyle=shade(cols[0],.15);ctx.lineWidth=r*.05;ctx.beginPath();ctx.arc(0,0,r*.16,0,Math.PI*1.6);ctx.stroke();ctx.beginPath();ctx.arc(r*.03,0,r*.07,Math.PI,Math.PI*2.5);ctx.stroke();
  ctx.restore();
}
function spiral(ctx,cx,cy,r0,a0,turns,dir){for(let i=0;i<=60;i++){const f=i/60,a=a0+dir*f*turns*Math.PI*2,r=r0*(1-f*.85);ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}}
function scrollCorner(ctx,x,y,s,sx,sy,color,lw){
  ctx.save();ctx.translate(x,y);ctx.scale(sx,sy);ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.beginPath();
  ctx.moveTo(s*2.4,0);ctx.lineTo(s*.5,0);spiral(ctx,s*.5,s*.5,s*.5,-Math.PI/2,1.5,-1);
  ctx.moveTo(0,s*2.4);ctx.lineTo(0,s*.5);spiral(ctx,s*.5,s*.5,s*.5,Math.PI,1.5,1);ctx.stroke();
  diamond(ctx,s*1.3,s*1.3,s*.22,color);ctx.restore();
}
function waxSeal(ctx,x,y,r,color,text,nf){
  ctx.save();ctx.beginPath();for(let k=0;k<=40;k++){const a=k/40*Math.PI*2,rr=r*(1+.06*Math.sin(k*3.1)+.05*rnd(k+3));ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}ctx.closePath();
  const g=ctx.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r*1.1);g.addColorStop(0,shade(color,.14));g.addColorStop(1,shade(color,-.1));
  ctx.shadowColor="rgba(0,0,0,.35)";ctx.shadowBlur=r*.25;ctx.shadowOffsetY=r*.08;ctx.fillStyle=g;ctx.fill();ctx.restore();
  ctx.strokeStyle=shade(color,-.14);ctx.lineWidth=r*.07;ctx.beginPath();ctx.arc(x,y,r*.74,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle=shade(color,-.2);ctx.font=fnt(nf.style,nf.weight,r*.62*nf.adj,nf.family);ctx.fillText(text,x,y+r*.04);
  ctx.fillStyle="rgba(255,255,255,.18)";ctx.beginPath();ctx.ellipse(x-r*.35,y-r*.45,r*.25,r*.1,-.6,0,Math.PI*2);ctx.fill();
}
function archPath(ctx,x0,x1,yt,yb){const r=(x1-x0)/2;ctx.moveTo(x0,yb);ctx.lineTo(x0,yt+r);ctx.arc((x0+x1)/2,yt+r,r,Math.PI,0);ctx.lineTo(x1,yb);ctx.closePath()}
function blob(ctx,x,y,r,color,seed){for(let k=0;k<7;k++){const cx=x+Math.cos(k*1.9+seed)*r*.45*rnd(seed+k),cy=y+Math.sin(k*1.3+seed)*r*.45*rnd(seed+k+9),rr=r*(.45+rnd(seed+k+20)*.5);
  const g=ctx.createRadialGradient(cx,cy,0,cx,cy,rr);g.addColorStop(0,hexA(color,.38));g.addColorStop(.7,hexA(color,.16));g.addColorStop(1,hexA(color,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,rr,0,Math.PI*2);ctx.fill()}}
const _kel=new Map();
function kelPattern(W,H,color){const key=W+"x"+H+color;if(_kel.has(key))return _kel.get(key);const c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d"),b=W/1080,sp=150*b;
  for(let j=0,y=sp*.6;y<H;y+=sp*.8,j++)for(let xx=(j%2?sp/2:0)+sp*.3;xx<W;xx+=sp)buta(x,xx,y,30*b,(j%2?.5:-.5),!!(j%2),color,1.6*b);_kel.set(key,c);return c}
