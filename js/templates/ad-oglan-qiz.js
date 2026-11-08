/* Ad günü: oğlan və qız şablonları */
"use strict";

Object.assign(TEMPLATES,{
  /* ===== Oğlanlar ===== */
  kosmos:mkT({who:["oglan"],name:"Kosmos",nameFont:"Baloo 2",textFont:"Nunito",particles:"stars",border:false,areaF:[.19,.88,.72],
    pal:{bg1:"#0b1026",bg2:"#1f2a5c",text:"#eef2ff",muted:"#b8c0e0",accent:"#ffb547"},
    deco(ctx,W,H,pal,p,b,t){
      if(p<=0)return;const e=easeOut(p);ctx.save();ctx.globalAlpha=e;
      planet(ctx,W*.84,H*.08-(1-e)*120*b,115*b,"#ffb38a","#d9534f",true);
      planet(ctx,W*.12,H*.94+(1-e)*120*b,72*b,"#7ef0e6","#2e86de",false);ctx.restore();
      rocket(ctx,-W*.1+(W*.27)*e,H*.55-(H*.43)*e+Math.sin(t*2)*6*b,72*b,.55,t);
    }}),
  futbol:mkT({who:["oglan"],name:"Futbol",nameFont:"Lobster",textFont:"Montserrat",particles:"confetti",border:false,areaF:[.13,.85,.72],
    pal:{bg1:"#34974c",bg2:"#1f6b33",text:"#ffffff",muted:"#dcf2e1",accent:"#ffe14d",conf:["#ffffff","#ffe14d","#c8f7c5"],confA:.6},
    bgExtra(ctx,W,H){ctx.fillStyle="rgba(255,255,255,.05)";for(let i=0;i<12;i+=2)ctx.fillRect(0,i*H/12,W,H/12)},
    deco(ctx,W,H,pal,p,b,t){
      const m=W*.06;ctx.save();ctx.globalAlpha=clamp(p*1.3);ctx.strokeStyle="rgba(255,255,255,.4)";ctx.lineWidth=3*b;
      ctx.strokeRect(m,m,W-2*m,H-2*m);ctx.strokeRect(W*.22,m,W*.56,H*.085);ctx.strokeRect(W*.22,H-m-H*.085,W*.56,H*.085);
      ctx.strokeRect(W*.37,m,W*.26,H*.035);ctx.strokeRect(W*.37,H-m-H*.035,W*.26,H*.035);
      ctx.strokeStyle="rgba(255,255,255,.14)";ctx.beginPath();ctx.moveTo(m,H/2);ctx.lineTo(W-m,H/2);ctx.stroke();ctx.beginPath();ctx.arc(W/2,H/2,W*.2,0,Math.PI*2);ctx.stroke();ctx.restore();
      const e=easeOut(p),x=-W*.1+W*.9*e;if(p>0)football(ctx,x,H*.915,58*b,x/(58*b));
    }}),
  yaris:mkT({who:["oglan"],name:"Yarış",nameFont:"Kaushan Script",textFont:"Montserrat",particles:"confetti",border:false,areaF:[.12,.88,.74],
    pal:{bg1:"#26262e",bg2:"#121216",text:"#ffffff",muted:"#c9c9d1",accent:"#ff3b30",conf:["#ff3b30","#ffffff","#ffd400"],confA:.55},
    deco(ctx,W,H,pal,p,b,t){
      for(let i=0;i<14;i++){const y=H*.1+rnd(i)*H*.8,len=(90+rnd(i+1)*220)*b,x=W-((rnd(i+3)*W+t*(400+rnd(i+5)*700)*b)%(W+len));
        ctx.strokeStyle="rgba(255,255,255,.08)";ctx.lineWidth=3*b;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+len,y);ctx.stroke()}
      const e=easeOut(p),sq=34*b;
      for(const [y0,dir] of [[H*.03,1],[H*.97-2*sq,-1]]){const off=dir*(1-e)*W;
        for(let c=-1;c<W/sq+1;c++)for(let r=0;r<2;r++){ctx.fillStyle=(c+r)%2?"#ffffff":"#111111";ctx.fillRect(c*sq+off,y0+r*sq,sq+.5,sq+.5)}}
      ctx.fillStyle=pal.accent;ctx.fillRect(0,H*.03+2*sq,W*e,5*b);ctx.fillRect(W*(1-e),H*.97-2*sq-5*b,W*e,5*b);
    }}),
  deniz:mkT({who:["oglan"],name:"Dəniz",nameFont:"Pacifico",textFont:"Nunito",particles:"none",border:false,areaF:[.12,.79,.72],
    pal:{bg1:"#e9f8ff",bg2:"#a9dcf5",text:"#123a5c",muted:"#3f6788",accent:"#ff8a3d",panel:"#bfe6fa"},
    deco(ctx,W,H,pal,p,b,t){
      const e=easeOut(p);ctx.save();ctx.globalAlpha=e;ctx.translate(W*.14,H*.07);ctx.rotate(t*.2);ctx.strokeStyle="#ffd166";ctx.lineWidth=5*b;
      for(let k=0;k<12;k++){const a=k*Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*70*b,Math.sin(a)*70*b);ctx.lineTo(Math.cos(a)*92*b,Math.sin(a)*92*b);ctx.stroke()}
      ctx.fillStyle="#ffd166";ctx.beginPath();ctx.arc(0,0,55*b,0,Math.PI*2);ctx.fill();ctx.restore();
      ctx.save();ctx.globalAlpha=e;ctx.strokeStyle="#3f6788";ctx.lineWidth=4*b;ctx.lineCap="round";
      [[.74,.07],[.84,.1],[.67,.12]].forEach(([fx,fy],i)=>{const x=fx*W+Math.sin(t*.5+i)*20*b,y=fy*H,f=12*b*(1+.4*Math.sin(t*6+i));ctx.beginPath();ctx.moveTo(x-22*b,y-f);ctx.quadraticCurveTo(x-10*b,y-f*.2,x,y);ctx.quadraticCurveTo(x+10*b,y-f*.2,x+22*b,y-f);ctx.stroke()});ctx.restore();
      const cols=["#7cc6ec","#3d9ad1","#1f6fa8"],rise=(1-e)*H*.2;
      const surf=(L,x)=>H*(.865+L*.035)+rise+Math.sin(x/W*Math.PI*4+t*(1+L*.3)+L*2)*(14-L*3)*b;
      for(let L=0;L<3;L++){
        if(L===1){const bx=W*.8;boat(ctx,bx,surf(0,bx)-4*b,68*b,Math.sin(t*1.3)*.06)}
        ctx.fillStyle=cols[L];ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=20*b)ctx.lineTo(x,surf(L,x));ctx.lineTo(W,H);ctx.closePath();ctx.fill();
      }
    }}),
  qehreman:mkT({who:["oglan"],name:"Super qəhrəman",nameFont:"Baloo 2",textFont:"Baloo 2",particles:"none",borderW:7,borderA:1,areaF:[.17,.87,.72],
    pal:{bg1:"#2459e0",bg2:"#0e2f8f",text:"#ffffff",muted:"#dbe5ff",accent:"#ffd400",panel:"#1a44b8"},bgType:"rad",
    bgExtra(ctx,W,H){ctx.save();ctx.translate(W/2,H*.45);ctx.fillStyle="rgba(255,255,255,.05)";for(let k=0;k<24;k+=2){ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,H,k*Math.PI/12,(k+1)*Math.PI/12);ctx.closePath();ctx.fill()}ctx.restore();
      ctx.fillStyle="rgba(0,0,0,.09)";const g=28*W/1080;for(let y=0;y<H;y+=g)for(let x=(y/g)%2?g/2:0;x<W;x+=g){ctx.beginPath();ctx.arc(x,y,(1+3*y/H)*W/1080,0,Math.PI*2);ctx.fill()}},
    deco(ctx,W,H,pal,p,b,t){
      const q=clamp((p-.3)/.7);if(q<=0)return;const s=easeBack(q)*(1+Math.sin(t*3)*.03);
      ctx.save();ctx.translate(W*.21,H*.085);ctx.scale(s,s);ctx.rotate(-.12);burst(ctx,0,0,105*b,14,"#ffd400","#111",5*b);
      ctx.fillStyle="#e63946";ctx.font=fnt("normal",800,52*b,"Baloo 2");ctx.fillText("BUM!",0,6*b);ctx.restore();
      ctx.save();ctx.translate(W*.82,H*.075);ctx.scale(s,s);ctx.rotate(.15);burst(ctx,0,0,82*b,12,"#e63946","#111",5*b);
      ctx.fillStyle="#fff";ctx.font=fnt("normal",800,40*b,"Baloo 2");ctx.fillText("VAY!",0,5*b);ctx.restore();
      ctx.save();ctx.translate(W*.86,H*.91);ctx.scale(s,s);ctx.fillStyle="#ffd400";ctx.strokeStyle="#111";ctx.lineWidth=5*b;ctx.beginPath();
      ctx.moveTo(10*b,-80*b);ctx.lineTo(-40*b,8*b);ctx.lineTo(-4*b,8*b);ctx.lineTo(-18*b,80*b);ctx.lineTo(42*b,-14*b);ctx.lineTo(6*b,-14*b);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
    }}),
  mavisar:mkT({who:["oglan"],name:"Mavi şarlar",nameFont:"Lobster",textFont:"Nunito",particles:"confetti",border:false,areaF:[.2,.93,.72],
    pal:{bg1:"#f4f9ff",bg2:"#d8e9fb",text:"#1d3557",muted:"#4f6d8f",accent:"#2f80ed",panel:"#cfe2f7",confA:.5,
         balloons:["#5aa9e6","#7fc8f8","#3d5a80","#98c1d9","#ffe66d"],conf:["#5aa9e6","#3d5a80","#ffe66d","#98c1d9"]},
    frame(...a){TEMPLATES.sar.frame(...a)}}),
  neon:mkT({who:["oglan"],name:"Neon oyun",nameFont:"Baloo 2",textFont:"Lexend",particles:"stars",borderA:.9,areaF:[.08,.7,.74],
    pal:{bg1:"#0a0420",bg2:"#22104a",text:"#f2f2ff",muted:"#b9b3e6",accent:"#00e5ff"},
    deco(ctx,W,H,pal,p,b,t){
      if(p<=0)return;const hz=H*.8,e=easeOut(p);
      ctx.save();const r=W*.15;ctx.beginPath();ctx.rect(0,0,W,hz);ctx.clip();
      const sg=ctx.createLinearGradient(0,hz-r,0,hz);sg.addColorStop(0,"#ffd319");sg.addColorStop(1,"#ff2bd6");
      ctx.globalAlpha=e;ctx.fillStyle=sg;ctx.beginPath();ctx.arc(W/2,hz+(1-e)*r,r,Math.PI,0);ctx.fill();
      ctx.fillStyle=bgGrad(ctx,H,pal);for(let k=0;k<5;k++){const y=hz-r*.12-k*r*.17;ctx.fillRect(W/2-r,y,2*r,(5-k)*1.6*b+2*b)}ctx.restore();
      ctx.save();ctx.beginPath();ctx.rect(0,hz,W,H-hz);ctx.clip();ctx.strokeStyle=hexA("#ff2bd6",.6*e);ctx.lineWidth=2*b;
      for(let k=-12;k<=12;k++){ctx.beginPath();ctx.moveTo(W/2+k*W*.012,hz);ctx.lineTo(W/2+k*W*.2,H);ctx.stroke()}
      for(let j=0;j<10;j++){const z=(j+(t*.8)%1)/10,y=hz+(H-hz)*z*z;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}ctx.restore();
      ctx.save();ctx.shadowColor="#ff2bd6";ctx.shadowBlur=20*b;ctx.strokeStyle="#ff2bd6";ctx.lineWidth=3*b;ctx.globalAlpha=e;ctx.beginPath();ctx.moveTo(0,hz);ctx.lineTo(W,hz);ctx.stroke();ctx.restore();
    }}),

  /* ===== Qızlar ===== */
  sahzade:mkT({who:["qiz"],name:"Şahzadə",nameFont:"Great Vibes",textFont:"Lora",particles:"hearts",borderA:.7,areaF:[.16,.9,.72],
    pal:{bg1:"#fff2f8",bg2:"#f5d3e6",text:"#5a2a4a",muted:"#8e6683",accent:"#d4a24c",conf:["#f7a1c4","#e8a0bf","#f9c6d9"]},bgType:"rad",
    deco(ctx,W,H,pal,p,b,t){
      const m=W*.045+16*b;drawPath(ctx,()=>ctx.roundRect?ctx.roundRect(m,m,W-2*m,H-2*m,24*b):ctx.rect(m,m,W-2*m,H-2*m),2*(W+H),p,1*b,hexA(pal.accent,.5));
      const q=clamp((p-.35)/.65);if(q<=0)return;ctx.save();ctx.translate(W/2,H*.085+Math.sin(t*1.5)*4*b);ctx.scale(easeBack(q),easeBack(q));crown(ctx,0,0,72*b);ctx.restore();
      ctx.globalAlpha=q;for(const [fx,fy,r] of [[.36,.07,16],[.64,.07,16],[.3,.11,10],[.7,.11,10]])sparkle(ctx,fx*W,fy*H,r*b*(1+.3*Math.sin(t*3+fx*9)),"#d4a24c");ctx.globalAlpha=1;
    }}),
  pembesar:mkT({who:["qiz"],name:"Çəhrayı şarlar",nameFont:"Pacifico",textFont:"Nunito",particles:"confetti",border:false,areaF:[.2,.93,.72],
    pal:{bg1:"#fff6fa",bg2:"#fde0ec",text:"#5b2c4b",muted:"#8f6382",accent:"#e05a9c",panel:"#f9cfe0",confA:.5,
         balloons:["#f7a1c4","#f9c6d9","#d7b5f0","#ffd6a5","#ffffff"],conf:["#f7a1c4","#d7b5f0","#ffd6a5","#e05a9c"]},
    frame(...a){TEMPLATES.sar.frame(...a)}}),
  kepenek:mkT({who:["qiz"],name:"Kəpənəklər",nameFont:"Dancing Script",textFont:"Nunito",particles:"dust",borderA:.45,areaF:[.11,.89,.7],
    pal:{bg1:"#f5fcf7",bg2:"#e6f0fb",text:"#3b3355",muted:"#7d7698",accent:"#b57edc"},bgType:"diag",
    deco(ctx,W,H,pal,p,b,t){
      const C=[["#c39bd3","#f7a1c4"],["#7fc8f8","#b5e3ff"],["#ffb3c6","#ffd6a5"],["#95d5b2","#b8e0d2"],["#d7b5f0","#f9c6d9"],["#ffd166","#ffb3c6"]];
      [[.13,.07,80],[.86,.12,66],[.08,.5,52],[.92,.58,58],[.84,.92,76],[.16,.9,58]].forEach(([fx,fy,s],i)=>{
        const q=clamp(p*1.6-i*.1);if(q<=0)return;ctx.globalAlpha=q;
        butterfly(ctx,fx*W+Math.sin(t*.6+i*2)*28*b,fy*H+Math.cos(t*.8+i)*18*b,s*b,.3+.7*Math.abs(Math.sin(t*6+i)),C[i][0],C[i][1],Math.sin(t*.6+i)*.3);
      });ctx.globalAlpha=1;
    }}),
  goyqursagi:mkT({who:["qiz"],name:"Göy qurşağı",nameFont:"Caveat",textFont:"Comfortaa",particles:"confetti",borderA:.4,areaF:[.235,.92,.74],
    pal:{bg1:"#fffdf5",bg2:"#fdeef6",text:"#4a4060",muted:"#867c99",accent:"#ff8fab",conf:["#ffadad","#ffd6a5","#caffbf","#9bf6ff","#bdb2ff"],confA:.55},
    deco(ctx,W,H,pal,p,b,t){
      const cols=["#ffadad","#ffd6a5","#fdffb6","#caffbf","#9bf6ff","#bdb2ff"],cx=W/2,cy=H*.205,R0=300*b,lw=24*b,e=easeInOut(p);
      if(e<=0)return;ctx.lineWidth=lw+1;cols.forEach((c,k)=>{ctx.strokeStyle=c;ctx.beginPath();ctx.arc(cx,cy,R0-k*lw,Math.PI,Math.PI+Math.PI*e);ctx.stroke()});
      const q=clamp(p*2);cloud(ctx,cx-R0+lw*2.5-40*b*(1-q),cy+14*b,72*b,"rgba(255,255,255,.97)");cloud(ctx,cx+R0-lw*2.5+40*b*(1-q),cy+14*b,72*b,"rgba(255,255,255,.97)");
    }}),
  aygece:mkT({who:["qiz"],name:"Ay və ulduzlar",nameFont:"Allura",textFont:"Josefin Sans",particles:"stars",borderA:.35,areaF:[.16,.9,.72],
    pal:{bg1:"#2a1f4f",bg2:"#7a58a8",text:"#fff6fb",muted:"#e6d8f2",accent:"#ffd6e8",panel:"#3b2b66"},
    deco(ctx,W,H,pal,p,b,t){
      const e=easeOut(p);if(e<=0)return;const x=W*.8,y=H*.09,r=72*b;
      ctx.save();ctx.globalAlpha=e;ctx.shadowColor="#fff1c1";ctx.shadowBlur=40*b;ctx.fillStyle="#fff1c1";ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.restore();
      ctx.fillStyle=bgGrad(ctx,H,pal);ctx.beginPath();ctx.arc(x+30*b,y-20*b,r*.86,0,Math.PI*2);ctx.fill();
      [[.1,.1],[.19,.16],[.28,.07]].forEach(([fx,fl],i)=>{
        const L=fl*H*e;ctx.save();ctx.translate(fx*W,0);ctx.rotate(Math.sin(t*1.2+i)*.06);
        ctx.strokeStyle="rgba(255,240,200,.5)";ctx.lineWidth=1.5*b;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,L);ctx.stroke();
        sparkle(ctx,0,L+18*b,22*b,"#ffe8a3");ctx.restore();
      });
    }}),
  sirin:mkT({who:["qiz"],name:"Şirin dünya",nameFont:"Lobster",textFont:"Nunito",particles:"confetti",borderA:.45,areaF:[.15,.85,.72],
    pal:{bg1:"#fff8f0",bg2:"#ffe1ec",text:"#5b3a2e",muted:"#94736a",accent:"#ff6f91",conf:["#ff6f91","#ffc75f","#7fd1ae","#6fb7ff","#c39bd3"],confA:.55},
    deco(ctx,W,H,pal,p,b,t){
      const q=clamp(p*1.3);if(q<=0)return;const s=easeBack(q);
      icecream(ctx,W*.13,H*.875+Math.sin(t*1.4)*5*b,96*b*s,-.25,["#ffc2d4","#fff1c1"]);
      icecream(ctx,W*.86,H*.1+Math.sin(t*1.4+1)*5*b,82*b*s,.3,["#b8e0d2","#ffc2d4"]);
    }}),
  rosegold:mkT({who:["qiz"],name:"Zərif çəhrayı",nameFont:"Pinyon Script",textFont:"Cormorant Garamond",particles:"dust",bgType:"rad",areaF:[.085,.915,.72],
    pal:{bg1:"#fdf3f0",bg2:"#efd5cf",text:"#5c3b3b",muted:"#8f6f6c",accent:"#b76e79",panel:"#ecd0ca"},
    frame(...a){TEMPLATES.klassik.frame(...a)}}),
});
