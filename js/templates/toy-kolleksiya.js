/* Toy: minimalist, nostalji, klassik, çiçəkli, milli kolleksiya */
"use strict";

Object.assign(TEMPLATES,{
  /* ===== Minimalist ===== */
  monoqram:mkT({kinds:["toy"],cat:"minimal",name:"Monoqram",nameFont:"Cormorant Garamond",textFont:"Montserrat",border:false,areaF:[.2,.91,.7],
    pal:{bg1:"#fdfcf9",bg2:"#f2efe8",text:"#2b2b2b",muted:"#777370",accent:"#9c8a6b"},
    deco(ctx,W,H,pal,p,b){
      const cx=W/2,cy=H*.115,r=100*b;drawPath(ctx,()=>ctx.arc(cx,cy,r,-Math.PI/2,Math.PI*1.5),Math.PI*2*r*1.05,p,1.4*b,pal.accent);
      const q=clamp((p-.4)/.6);if(q<=0)return;const ini=initials(),nf=nameFontObj();ctx.globalAlpha=q;ctx.fillStyle=pal.text;
      ctx.font=fnt(nf.style,nf.weight,82*b*nf.adj,nf.family);
      if(ini.length>1){ctx.fillText(ini[0],cx-40*b,cy+4*b);ctx.fillText(ini[1],cx+40*b,cy+4*b);ctx.strokeStyle=pal.accent;ctx.lineWidth=1.2*b;ctx.beginPath();ctx.moveTo(cx,cy-45*b);ctx.lineTo(cx,cy+45*b);ctx.stroke()}
      else ctx.fillText(ini[0]||"",cx,cy+4*b);
      ctx.fillStyle=pal.accent;ctx.fillRect(cx-30*b,H*.955,60*b*q,1.2*b);ctx.globalAlpha=1;
    }}),
  editorial:mkT({kinds:["toy"],cat:"minimal",name:"Editorial",nameFont:"Noto Serif Display",textFont:"Montserrat",border:false,areaF:[.08,.92,.8],
    pal:{bg1:"#f4efe6",bg2:"#ebe3d5",text:"#1d1d1b",muted:"#6b645a",accent:"#1d1d1b"},
    deco(ctx,W,H,pal,p,b){const m=W*.07,w=(W-2*m)*easeInOut(p);ctx.fillStyle=pal.accent;ctx.fillRect(m,H*.045,w,2*b);ctx.fillRect(W-m-w,H*.955,w,2*b);ctx.fillRect(m,H*.045+8*b,w*.25,1*b);ctx.fillRect(W-m-w*.25,H*.955-8*b,w*.25,1*b)}}),
  qaraag:mkT({kinds:["toy"],cat:"minimal",name:"Qara-ağ",nameFont:"Playfair Display",textFont:"Montserrat",borderA:.45,borderW:1.2,areaF:[.09,.91,.7],
    pal:{bg1:"#1a1a1a",bg2:"#0b0b0b",text:"#f4f1ea",muted:"#a8a39a",accent:"#d8d2c4",panel:"#141414"}}),
  zeytun:mkT({kinds:["toy"],cat:"minimal",name:"Zeytun budağı",nameFont:"Allura",textFont:"Lora",border:false,areaF:[.15,.88,.72],
    pal:{bg1:"#f7f5ee",bg2:"#ebe8db",text:"#3d4433",muted:"#6e7564",accent:"#7d8b6a"},
    deco(ctx,W,H,pal,p,b){
      const e=easeInOut(p),o={leaves:6,lw:1.8*b,size:.2,curve:.12};
      sprig(ctx,W/2-6*b,H*.09,190*b,Math.PI+.25,pal.accent,e,o);sprig(ctx,W/2+6*b,H*.09,190*b,-.25,pal.accent,e,o);
      sprig(ctx,W/2-4*b,H*.93,110*b,Math.PI-.15,pal.accent,e,{...o,leaves:4});sprig(ctx,W/2+4*b,H*.93,110*b,.15,pal.accent,e,{...o,leaves:4});
      if(e>.3){ctx.globalAlpha=clamp((e-.3)*2);ctx.fillStyle="#56603f";for(const [dx,dy] of [[-60,22],[70,-26]]){ctx.beginPath();ctx.ellipse(W/2+dx*b,H*.09+dy*b,9*b,12*b,.4,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1}
    }}),
  terrakota:mkT({kinds:["toy"],cat:"minimal",name:"Terrakota tağ",nameFont:"Ephesis",textFont:"Josefin Sans",border:false,areaF:[.18,.88,.64],
    pal:{bg1:"#ecdcc8",bg2:"#e1cbb2",text:"#4a3326",muted:"#7d6250",accent:"#b8673f"},
    deco(ctx,W,H,pal,p,b){
      const e=easeOut(p);ctx.save();ctx.globalAlpha=e;ctx.translate(0,(1-e)*40*b);
      ctx.fillStyle="#f8f0e6";ctx.beginPath();archPath(ctx,W*.1,W*.9,H*.06,H*.94);ctx.fill();
      ctx.strokeStyle=hexA(pal.accent,.6);ctx.lineWidth=1.4*b;ctx.beginPath();archPath(ctx,W*.13,W*.87,H*.06+W*.03,H*.94-W*.03);ctx.stroke();
      ctx.fillStyle=pal.accent;ctx.beginPath();ctx.arc(W/2,H*.06+W*.12,26*b,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=pal.accent;ctx.lineWidth=2*b;for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(W/2,H*.06+W*.12,(42+k*14)*b,Math.PI*1.1,Math.PI*1.9);ctx.stroke()}
      ctx.restore();
    }}),

  /* ===== Nostalji / vintage ===== */
  mohur:mkT({kinds:["toy"],cat:"vintage",name:"Möhürlü məktub",nameFont:"Pinyon Script",textFont:"EB Garamond",border:false,areaF:[.17,.9,.72],
    pal:{bg1:"#f4e9d2",bg2:"#e0cca4",text:"#3e2f1f",muted:"#6f5a40",accent:"#8b2e2a",panel:"#d9c39b",panelEdge:"#8b2e2a"},
    bg(ctx,W,H,pal){
      const b=W/1080,m=W*.035;ctx.fillStyle="#4a3a2a";ctx.fillRect(0,0,W,H);grain(ctx,W,H,.6);
      ctx.save();ctx.beginPath();const st_=16*b;let i=0;
      for(let x=m;x<=W-m;x+=st_)ctx.lineTo(x,m+rnd(i++)*9*b);
      for(let y=m;y<=H-m;y+=st_)ctx.lineTo(W-m-rnd(i++)*9*b,y);
      for(let x=W-m;x>=m;x-=st_)ctx.lineTo(x,H-m-rnd(i++)*9*b);
      for(let y=H-m;y>=m;y-=st_)ctx.lineTo(m+rnd(i++)*9*b,y);
      ctx.closePath();ctx.shadowColor="rgba(0,0,0,.5)";ctx.shadowBlur=40*b;const g=ctx.createRadialGradient(W/2,H*.45,0,W/2,H/2,H*.7);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fill();
      ctx.shadowColor="transparent";ctx.clip();grain(ctx,W,H,.7);vignette(ctx,W,H,"#7a5a30",.35);ctx.restore();
    },
    deco(ctx,W,H,pal,p,b){
      const e=easeOut(p);ctx.strokeStyle="#a88452";ctx.lineWidth=3*b;ctx.globalAlpha=e;
      ctx.beginPath();ctx.moveTo(W*.035,H*.085);ctx.lineTo(W*.965,H*.09);ctx.moveTo(W*.035,H*.095);ctx.lineTo(W*.965,H*.1);ctx.stroke();ctx.globalAlpha=1;
      const q=clamp((p-.35)/.65);if(q<=0)return;const s=1+(1-easeOut(q))*.5;ctx.save();ctx.globalAlpha=clamp(q*2);ctx.translate(W/2,H*.092);ctx.scale(s,s);
      waxSeal(ctx,0,0,78*b,pal.accent,initials().join(""),nameFontObj());ctx.restore();
    }}),
  sepiya:mkT({kinds:["toy"],cat:"vintage",name:"Köhnə foto",nameFont:"Imperial Script",textFont:"Libre Baskerville",border:false,areaF:[.1,.9,.7],bgType:"rad",
    pal:{bg1:"#ebdfc6",bg2:"#c9ae86",text:"#3b2a1a",muted:"#6a5236",accent:"#7a5a32"},
    bgExtra(ctx,W,H){grain(ctx,W,H,.9);vignette(ctx,W,H,"#3b2a1a",.45)},
    deco(ctx,W,H,pal,p,b,t){
      const m=W*.06;drawPath(ctx,()=>ctx.rect(m,m,W-2*m,H-2*m),2*(W+H)*1.05,p,1.6*b,pal.accent);drawPath(ctx,()=>ctx.rect(m+10*b,m+10*b,W-2*m-20*b,H-2*m-20*b),2*(W+H)*1.05,p,.8*b,pal.accent);
      const q=clamp((p-.5)/.5);if(q>0){ctx.globalAlpha=q;const c=m+22*b,s=46*b;
        scrollCorner(ctx,c,c,s,1,1,pal.accent,1.6*b);scrollCorner(ctx,W-c,c,s,-1,1,pal.accent,1.6*b);scrollCorner(ctx,c,H-c,s,1,-1,pal.accent,1.6*b);scrollCorner(ctx,W-c,H-c,s,-1,-1,pal.accent,1.6*b);ctx.globalAlpha=1}
      const f=Math.floor(t*12);ctx.fillStyle=`rgba(40,25,10,${.04*rnd(f)})`;ctx.fillRect(0,0,W,H);
      if(rnd(f+7)>.55){ctx.strokeStyle="rgba(60,40,20,.18)";ctx.lineWidth=1.5*b;const x=rnd(f+3)*W;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+rnd(f+5)*20*b,H);ctx.stroke()}
    }}),
  dantel:mkT({kinds:["toy"],cat:"vintage",name:"Dantel və fiyonk",nameFont:"Alex Brush",textFont:"Cormorant Garamond",border:false,areaF:[.14,.88,.66],
    pal:{bg1:"#fbf6ef",bg2:"#f1e4da",text:"#5a4040",muted:"#8a7070",accent:"#c49a9a"},
    bgExtra(ctx,W,H){grain(ctx,W,H,.35)},
    deco(ctx,W,H,pal,p,b){
      const e=clamp(p*1.4);if(e<=0)return;const m=W*.075,rs=18*b;ctx.save();ctx.globalAlpha=e;
      const pts=[];for(let x=m;x<=W-m;x+=rs*1.6){pts.push([x,m]);pts.push([x,H-m])}for(let y=m+rs*1.6;y<H-m;y+=rs*1.6){pts.push([m,y]);pts.push([W-m,y])}
      ctx.fillStyle="#ffffff";for(const [x,y] of pts){ctx.beginPath();ctx.arc(x,y,rs,0,Math.PI*2);ctx.fill()}
      ctx.strokeStyle=hexA(pal.accent,.8);ctx.lineWidth=1.2*b;for(const [x,y] of pts){ctx.beginPath();ctx.arc(x,y,rs,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(x,y,rs*.35,0,Math.PI*2);ctx.stroke()}
      ctx.fillStyle="#ffffff";ctx.fillRect(m,m,W-2*m,rs*.9);ctx.fillRect(m,H-m-rs*.9,W-2*m,rs*.9);ctx.fillRect(m,m,rs*.9,H-2*m);ctx.fillRect(W-m-rs*.9,m,rs*.9,H-2*m);
      ctx.setLineDash([2*b,6*b]);ctx.strokeRect(m+rs*1.4,m+rs*1.4,W-2*m-rs*2.8,H-2*m-rs*2.8);ctx.restore();
      const q=clamp((p-.45)/.55);if(q>0){ctx.save();ctx.translate(W/2,m+4*b);ctx.scale(easeBack(q),easeBack(q));bow(ctx,0,0,70*b,"#d9a5a8");ctx.restore()}
    }}),
  retro:mkT({kinds:["toy"],cat:"vintage",name:"Retro 70-lər",nameFont:"Fraunces",textFont:"Fraunces",border:false,areaF:[.15,.86,.7],
    pal:{bg1:"#f7ecd7",bg2:"#efdcb9",text:"#4a2c1a",muted:"#7a5a40",accent:"#c8551b"},
    bgExtra(ctx,W,H){grain(ctx,W,H,.4)},
    deco(ctx,W,H,pal,p,b){
      const cols=["#c8551b","#e07a2e","#e6a532","#8c4a2a"],e=easeInOut(p),lw=34*b;
      for(const [cx,cy,a0] of [[0,0,0],[W,H,Math.PI]]){cols.forEach((c,k)=>{ctx.strokeStyle=c;ctx.lineWidth=lw+1;ctx.beginPath();ctx.arc(cx,cy,(150+k*lw/b)*b,a0,a0+Math.PI/2*e);ctx.stroke()})}
      const q=clamp((p-.5)/.5);if(q>0){const s=easeBack(q);flower(ctx,W*.86,H*.09,48*b*s,"#ffffff","#fff6e6","#e6a532",0);flower(ctx,W*.14,H*.92,40*b*s,"#ffffff","#fff6e6","#e6a532",1)}
    }}),
  poct:mkT({kinds:["toy"],cat:"vintage",name:"Poçt məktubu",nameFont:"Petit Formal Script",textFont:"Libre Baskerville",border:false,areaF:[.2,.9,.7],
    pal:{bg1:"#fbf7ee",bg2:"#efe6d3",text:"#2f3a4a",muted:"#5f6b7a",accent:"#c0392b"},
    bgExtra(ctx,W,H){grain(ctx,W,H,.35)},
    deco(ctx,W,H,pal,p,b,t){
      const m=W*.04,e=easeOut(p);ctx.save();ctx.globalAlpha=e;ctx.beginPath();ctx.rect(0,0,W,H);ctx.rect(m,m,W-2*m,H-2*m);ctx.clip("evenodd");
      const sw=34*b;for(let i=-H/sw;i<(W+H)/sw;i++){ctx.fillStyle=i%2?"#c0392b":"#2c4a7a";const x=i*sw*2;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+sw,0);ctx.lineTo(x+sw-H,H);ctx.lineTo(x-H,H);ctx.closePath();ctx.fill()}ctx.restore();
      const q=clamp((p-.4)/.6);if(q<=0)return;
      ctx.save();ctx.translate(W*.79,H*.1);ctx.rotate(.07);ctx.globalAlpha=q;const sw2=150*b,sh=180*b;
      ctx.fillStyle="#ffffff";ctx.shadowColor="rgba(0,0,0,.15)";ctx.shadowBlur=10*b;ctx.fillRect(-sw2/2,-sh/2,sw2,sh);ctx.shadowColor="transparent";
      ctx.fillStyle=pal.bg1;for(let x=-sw2/2;x<=sw2/2;x+=16*b){for(const y of [-sh/2,sh/2]){ctx.beginPath();ctx.arc(x,y,5*b,0,Math.PI*2);ctx.fill()}}
      for(let y=-sh/2;y<=sh/2;y+=16*b){for(const x of [-sw2/2,sw2/2]){ctx.beginPath();ctx.arc(x,y,5*b,0,Math.PI*2);ctx.fill()}}
      ctx.fillStyle="#e9d4ae";ctx.fillRect(-sw2/2+14*b,-sh/2+14*b,sw2-28*b,sh-28*b);
      ctx.fillStyle=pal.accent;ctx.beginPath();heartPath(ctx,0,-6*b,40*b);ctx.fill();
      ctx.fillStyle=pal.text;ctx.font=fnt("normal",700,17*b,"Libre Baskerville");drawSpaced(ctx,"SEVGİ",0,sh/2-34*b,3*b);ctx.restore();
      ctx.save();ctx.globalAlpha=q*.55;ctx.strokeStyle="#2c4a7a";ctx.lineWidth=2.5*b;const px=W*.64,py=H*.125;
      ctx.beginPath();ctx.arc(px,py,62*b,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(px,py,48*b,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle="#2c4a7a";ctx.font=fnt("normal",700,15*b,"Libre Baskerville");ctx.fillText((st.date||"").slice(0,4)||"TOY",px,py);
      for(let k=0;k<4;k++){ctx.beginPath();for(let x=0;x<=200*b;x+=6*b){const y=py-30*b+k*20*b+Math.sin(x/(18*b))*5*b;x?ctx.lineTo(px-70*b-x,y):ctx.moveTo(px-70*b,y)}ctx.stroke()}ctx.restore();
    }}),

  /* ===== Klassik və zərif ===== */
  bordo:mkT({kinds:["toy"],cat:"klassik",name:"Tünd romantika",nameFont:"Pinyon Script",textFont:"Cormorant Garamond",particles:"dust",bgType:"rad",borderA:.7,borderW:1.4,areaF:[.15,.86,.7],
    pal:{bg1:"#3d0f1b",bg2:"#14050a",text:"#f3e3d3",muted:"#cbb3a3",accent:"#c9a063",panel:"#2a0a12"},
    deco(ctx,W,H,pal,p,b){
      const q=clamp((p-.2)/.8);if(q<=0)return;const s=easeBack(q);
      const cl=()=>{for(const [x,y,l,a] of [[W*.14,W*.06,150,.35],[W*.05,W*.2,140,1.3],[W*.3,W*.04,100,.1]])leaf(ctx,x,y,l*b*s,a,"#2f3d2a");
        rose(ctx,W*.08,W*.07,80*b*s,["#5c0e1c","#7a1426","#9e2236","#b8384c"],0);rose(ctx,W*.25,W*.035,52*b*s,["#6b1121","#8c1c30","#a92c40"],1);rose(ctx,W*.035,W*.24,48*b*s,["#5c0e1c","#7a1426","#9e2236"],2)};
      cl();ctx.save();ctx.translate(W,H);ctx.rotate(Math.PI);cl();ctx.restore();
    }}),
  vellum:mkT({kinds:["toy"],cat:"klassik",name:"Vellum və lent",nameFont:"Allura",textFont:"Cormorant Garamond",border:false,areaF:[.19,.9,.66],
    pal:{bg1:"#ebe6de",bg2:"#ddd4c6",text:"#3a3632",muted:"#6d675f",accent:"#b9a07a"},
    bgExtra(ctx,W,H){const b=W/1080;blob(ctx,W*.2,H*.2,380*b,"#e8b4b8",1);blob(ctx,W*.85,H*.75,420*b,"#b7c9b0",5);blob(ctx,W*.7,H*.15,260*b,"#d9c7e8",9);grain(ctx,W,H,.3)},
    deco(ctx,W,H,pal,p,b){
      const e=easeOut(p);if(e<=0)return;const m=W*.08;ctx.save();ctx.globalAlpha=e;ctx.translate(0,(1-e)*30*b);
      ctx.fillStyle="rgba(255,255,255,.62)";ctx.strokeStyle="rgba(255,255,255,.9)";ctx.lineWidth=2*b;ctx.fillRect(m,m,W-2*m,H-2*m);ctx.strokeRect(m,m,W-2*m,H-2*m);
      const ry=H*.12,g=ctx.createLinearGradient(0,ry-22*b,0,ry+22*b);g.addColorStop(0,"#d8c3a5");g.addColorStop(.5,"#efe2cf");g.addColorStop(1,"#c8b08d");
      ctx.fillStyle=g;ctx.fillRect(m-6*b,ry-20*b,W-2*m+12*b,40*b);ctx.restore();
      const q=clamp((p-.5)/.5);if(q>0){ctx.save();ctx.translate(W/2,H*.12);ctx.scale(easeBack(q),easeBack(q));bow(ctx,0,0,78*b,"#d2b893");ctx.restore()}
    }}),

  /* ===== Çiçəkli ===== */
  akvarel:mkT({kinds:["toy"],cat:"cicek",name:"Akvarel",nameFont:"Alex Brush",textFont:"Lora",border:false,areaF:[.12,.88,.72],
    pal:{bg1:"#fcfcfe",bg2:"#f2f0f7",text:"#3f3a55",muted:"#77718c",accent:"#8f86c9"},
    bgExtra(ctx,W,H){grain(ctx,W,H,.3)},
    deco(ctx,W,H,pal,p,b){
      const e=easeOut(p);if(e<=0)return;const r=e*1;
      blob(ctx,W*.05,H*.04,420*b*r,"#b9a7e8",2);blob(ctx,W*.2,H*.02,260*b*r,"#f2b6c9",4);blob(ctx,W*.02,H*.17,240*b*r,"#9fc4ef",6);
      blob(ctx,W*.95,H*.96,420*b*r,"#9fc4ef",8);blob(ctx,W*.8,H*.98,260*b*r,"#b9a7e8",10);blob(ctx,W*.98,H*.83,240*b*r,"#f2b6c9",12);
      ctx.fillStyle=hexA("#c9a45c",.7*e);for(let k=0;k<26;k++){const c=k<13;ctx.beginPath();ctx.arc((c?.03+rnd(k)*.3:.67+rnd(k)*.3)*W,(c?.02+rnd(k+40)*.18:.8+rnd(k+40)*.18)*H,(1.5+rnd(k+80)*4)*b,0,Math.PI*2);ctx.fill()}
    }}),
  evkalipt:mkT({kinds:["toy"],cat:"cicek",name:"Evkalipt",nameFont:"Great Vibes",textFont:"EB Garamond",border:false,areaF:[.15,.86,.72],
    pal:{bg1:"#fbfaf6",bg2:"#edf0e8",text:"#33402f",muted:"#66725f",accent:"#7c9a84"},
    deco(ctx,W,H,pal,p,b){
      const e=easeInOut(p),o={leaves:9,lw:2.2*b,size:.13,style:"round",alpha:.85,curve:.14};
      const cl=()=>{sprig(ctx,-10*b,H*.03,W*.48,.22,"#8fae98",e,o);sprig(ctx,-10*b,H*.07,W*.36,.6,"#6f8f7a",e,{...o,leaves:7});sprig(ctx,W*.02,-10*b,W*.3,1.1,"#a5bfae",e,{...o,leaves:6})};
      cl();ctx.save();ctx.translate(W,H);ctx.rotate(Math.PI);cl();ctx.restore();
    }}),

  /* ===== Milli naxışlar ===== */
  xalca:mkT({kinds:["toy"],cat:"milli",name:"Xalça haşiyəsi",nameFont:"Imperial Script",textFont:"EB Garamond",border:false,areaF:[.16,.87,.66],
    pal:{bg1:"#f6eddd",bg2:"#ead9bd",text:"#3b1f1a",muted:"#6e4a3e",accent:"#9c2a22",panelEdge:"#9c2a22"},
    bgExtra(ctx,W,H){grain(ctx,W,H,.3)},
    deco(ctx,W,H,pal,p,b){
      const e=easeOut(p);if(e<=0)return;const m=W*.035,bw=66*b,navy="#1f2f4f",cream="#f3e6c8";ctx.save();ctx.globalAlpha=e;
      ctx.fillStyle=navy;ctx.beginPath();ctx.rect(m,m,W-2*m,H-2*m);ctx.rect(m+bw,m+bw,W-2*m-2*bw,H-2*m-2*bw);ctx.fill("evenodd");
      ctx.strokeStyle=pal.accent;ctx.lineWidth=4*b;ctx.strokeRect(m+3*b,m+3*b,W-2*m-6*b,H-2*m-6*b);ctx.strokeRect(m+bw-3*b,m+bw-3*b,W-2*m-2*bw+6*b,H-2*m-2*bw+6*b);
      const cell=bw*1.1,dm=(cx,cy)=>{ctx.fillStyle=pal.accent;poly(ctx,cx,cy,bw*.34,4,0);ctx.fill();ctx.fillStyle=cream;poly(ctx,cx,cy,bw*.17,4,0);ctx.fill();
        ctx.fillStyle=cream;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){ctx.beginPath();ctx.arc(cx+dx*bw*.42,cy+dy*bw*.42,bw*.05,0,Math.PI*2);ctx.fill()}};
      const nx=Math.floor((W-2*m-2*bw)/cell),ox=(W-2*m-2*bw-nx*cell)/2;for(let i=0;i<nx;i++){const x=m+bw+ox+cell*(i+.5);dm(x,m+bw/2);dm(x,H-m-bw/2)}
      const ny=Math.floor((H-2*m-2*bw)/cell),oy=(H-2*m-2*bw-ny*cell)/2;for(let i=0;i<ny;i++){const y=m+bw+oy+cell*(i+.5);dm(m+bw/2,y);dm(W-m-bw/2,y)}
      for(const [x,y] of [[m+bw/2,m+bw/2],[W-m-bw/2,m+bw/2],[m+bw/2,H-m-bw/2],[W-m-bw/2,H-m-bw/2]])star8(ctx,x,y,bw*.36,cream,1,true);
      ctx.restore();
      const q=clamp((p-.4)/.6);if(q<=0)return;const s=easeBack(q);ctx.save();ctx.translate(W/2,m+bw+80*b);ctx.scale(s,s);
      ctx.fillStyle=pal.accent;poly(ctx,0,0,64*b,8,Math.PI/8);ctx.fill();ctx.fillStyle=navy;poly(ctx,0,0,48*b,8,Math.PI/8);ctx.fill();
      for(let k=0;k<8;k++){const a=k*Math.PI/4;ctx.fillStyle=pal.accent;poly(ctx,Math.cos(a)*74*b,Math.sin(a)*74*b,9*b,4,a);ctx.fill()}
      star8(ctx,0,0,26*b,cream,1,true);ctx.restore();
    }}),
  kelaghayi:mkT({kinds:["toy"],cat:"milli",name:"Kəlağayı",nameFont:"Imperial Script",textFont:"Cormorant Garamond",border:false,areaF:[.15,.88,.68],
    pal:{bg1:"#fbf7f2",bg2:"#f1e6d8",text:"#3d2620",muted:"#735a50",accent:"#b23a2e"},
    bgExtra(ctx,W,H,pal){ctx.save();ctx.globalAlpha=.1;ctx.drawImage(kelPattern(W,H,pal.accent),0,0,W,H);ctx.restore();
      const g=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.55);g.addColorStop(0,hexA(pal.bg1,.95));g.addColorStop(1,hexA(pal.bg1,0));ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    deco(ctx,W,H,pal,p,b){
      const m=W*.05;drawPath(ctx,()=>ctx.rect(m,m,W-2*m,H-2*m),2*(W+H)*1.05,p,3*b,pal.accent);drawPath(ctx,()=>ctx.rect(m+12*b,m+12*b,W-2*m-24*b,H-2*m-24*b),2*(W+H)*1.05,p,1*b,pal.accent);
      const q=clamp((p-.45)/.55);if(q<=0)return;ctx.globalAlpha=q;const n=7;
      for(let i=0;i<n;i++){const x=m+(W-2*m)*(i+.5)/n;buta(ctx,x,m+50*b,22*b,Math.PI/2,i%2===0,pal.accent,1.4*b);buta(ctx,x,H-m-50*b,22*b,-Math.PI/2,i%2===1,pal.accent,1.4*b)}
      ctx.save();ctx.translate(W/2,H*.105);ctx.rotate(Math.PI/4);ctx.strokeStyle=pal.accent;ctx.lineWidth=2*b;ctx.strokeRect(-48*b,-48*b,96*b,96*b);ctx.strokeRect(-38*b,-38*b,76*b,76*b);ctx.restore();
      buta(ctx,W/2,H*.105,30*b,0,false,pal.accent,1.6*b);ctx.globalAlpha=1;
    }}),
});
