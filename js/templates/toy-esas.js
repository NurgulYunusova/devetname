/* Toy: ilk 6 şablon (TEMPLATES burada yaradılır) */
"use strict";

const TEMPLATES={
  klassik:{
    cat:"klassik", kinds:["toy"], name:"Klassik krem", nameFont:"Great Vibes", textFont:"Cormorant Garamond", particles:"dust",
    pal:{bg1:"#fffaf1",bg2:"#efe1c6",text:"#4a3a28",muted:"#7c6a55",accent:"#b08d4a",panel:"#e9dac0",panelEdge:"#d9c49f"},
    area:(W,H)=>({top:H*.085,bottom:H*.915,maxW:W*.72}),
    bg(ctx,W,H,pal){const g=ctx.createRadialGradient(W/2,H*.42,0,W/2,H*.5,H*.75);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b){
      const m=W*.045,m2=m+22*b,R=46*b;
      drawPath(ctx,()=>ctx.rect(m,m,W-2*m,H-2*m),2*(W+H-4*m)*1.05,p,2.5*b,pal.accent);
      const L=2*(W-2*m2-2*R)+2*(H-2*m2-2*R)+2*Math.PI*R;
      drawPath(ctx,()=>{ctx.moveTo(m2+R,m2);ctx.lineTo(W-m2-R,m2);ctx.arc(W-m2,m2,R,Math.PI,Math.PI/2,true);ctx.lineTo(W-m2,H-m2-R);ctx.arc(W-m2,H-m2,R,-Math.PI/2,-Math.PI,true);ctx.lineTo(m2+R,H-m2);ctx.arc(m2,H-m2,R,0,-Math.PI/2,true);ctx.lineTo(m2,m2+R);ctx.arc(m2,m2,R,Math.PI/2,0,true)},L*1.05,p,1.4*b,pal.accent);
      const q=clamp((p-.7)/.3);if(q<=0)return;ctx.globalAlpha=q;
      for(const [x,y] of [[m2,m2],[W-m2,m2],[m2,H-m2],[W-m2,H-m2]]){diamond(ctx,x,y,12*b,pal.accent)}
      diamond(ctx,W/2,m,10*b,pal.accent);diamond(ctx,W/2,H-m,10*b,pal.accent);ctx.globalAlpha=1;
    }
  },
  gece:{
    cat:"klassik", kinds:["toy"], name:"Gecə mavisi", nameFont:"Pinyon Script", textFont:"Playfair Display", particles:"stars",
    pal:{bg1:"#0d1830",bg2:"#1e3158",text:"#f3ead7",muted:"#c7bda8",accent:"#d9b871",panel:"#14223f",panelEdge:"#d9b871"},
    area(W,H){const m=W*.075,r=(W-2*m)/2;return{top:m+r*.45,bottom:H-m-50*W/1080,maxW:W*.66}},
    bg(ctx,W,H,pal){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      const r=ctx.createRadialGradient(W/2,H*.45,0,W/2,H*.45,W*.8);r.addColorStop(0,"rgba(217,184,113,.10)");r.addColorStop(1,"rgba(217,184,113,0)");ctx.fillStyle=r;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b){
      for(const [ins,lw] of [[0,2.4],[16,1.2]]){
        const m=W*.075+ins*b,r=(W-2*m)/2,sy=m+r;
        const L=2*(H-m-sy)+Math.PI*r+(W-2*m);
        drawPath(ctx,()=>{ctx.moveTo(W/2,H-m);ctx.lineTo(m,H-m);ctx.lineTo(m,sy);ctx.arc(W/2,sy,r,Math.PI,0,false);ctx.lineTo(W-m,H-m);ctx.closePath()},L*1.05,p,lw*b,pal.accent);
      }
      const q=clamp((p-.6)/.4);if(q>0){ctx.globalAlpha=q;sparkle(ctx,W/2,W*.075+70*b,22*b*easeBack(q),pal.accent);ctx.globalAlpha=1}
    }
  },
  gul:{
    cat:"cicek", kinds:["toy","ad"], who:["qiz"], name:"Çiçək bağı", nameFont:"Alex Brush", textFont:"Lora", particles:"petals",
    pal:{bg1:"#fdf4f2",bg2:"#f6dedd",text:"#5b3a42",muted:"#8a6870",accent:"#b5677a",p1:"#eaa6b3",p2:"#f6cbd3",leaf:"#9db592",center:"#e0a35f",panel:"#f3d6d6",panelEdge:"#e2b4b9"},
    area:(W,H)=>({top:H*.15,bottom:H*.865,maxW:W*.72}),
    bg(ctx,W,H,pal){const g=ctx.createLinearGradient(0,0,W*.3,H);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b){
      const m=W*.05;
      drawPath(ctx,()=>ctx.roundRect?ctx.roundRect(m,m,W-2*m,H-2*m,30*b):ctx.rect(m,m,W-2*m,H-2*m),2*(W+H-4*m),p,1.6*b,hexA(pal.accent,.55));
      const q=clamp((p-.25)/.75);if(q<=0)return;
      const cluster=()=>{
        const s=easeBack(q);
        const F=[[W*.07,W*.06,82],[W*.24,W*.025,54],[W*.03,W*.22,52],[W*.2,W*.15,34],[W*.36,W*.05,26]];
        const Lv=[[W*.12,W*.1,140,.3],[W*.16,W*.05,120,-.25],[W*.05,W*.13,130,1.25],[W*.3,W*.06,90,.1],[W*.07,W*.3,90,1.45]];
        for(const [x,y,l,a] of Lv)leaf(ctx,x,y,l*b*s,a,pal.leaf);
        F.forEach(([x,y,r],i)=>flower(ctx,x,y,r*b*s,i%2?pal.p2:pal.p1,i%2?pal.p1:"#fbe3e7",pal.center,i));
        for(const [x,y] of [[W*.42,W*.03],[W*.04,W*.36],[W*.29,W*.13]]){ctx.fillStyle=pal.p1;ctx.beginPath();ctx.arc(x,y,9*b*s,0,Math.PI*2);ctx.fill()}
      };
      cluster();ctx.save();ctx.translate(W,H);ctx.rotate(Math.PI);cluster();ctx.restore();
    }
  },
  minimal:{
    cat:"minimal", kinds:["toy","ad"], who:["oglan","qiz"], name:"Sadə ağ", nameFont:"Cormorant Garamond", textFont:"Montserrat", particles:"none",
    pal:{bg1:"#fcfbf8",bg2:"#f4f2ec",text:"#2a2a2a",muted:"#6d6d6d",accent:"#2a2a2a",panel:"#efede7",panelEdge:"#d6d3cb"},
    area:(W,H)=>({top:H*.09,bottom:H*.91,maxW:W*.7}),
    bg(ctx,W,H,pal){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b){const m=W*.06;drawPath(ctx,()=>ctx.rect(m,m,W-2*m,H-2*m),2*(W+H-4*m)*1.02,p,1.2*b,hexA(pal.accent,.6))}
  },
  buta:{
    cat:"milli", kinds:["toy"], name:"Buta naxışı", nameFont:"Imperial Script", textFont:"EB Garamond", particles:"dust",
    pal:{bg1:"#7d2635",bg2:"#47111b",text:"#f7ead2",muted:"#dcc8a8",accent:"#d8b06a",panel:"#5a1623",panelEdge:"#d8b06a"},
    area:(W,H)=>({top:W*.04+W*.2,bottom:H-W*.04-W*.17,maxW:W*.72}),
    bg(ctx,W,H,pal){const g=ctx.createRadialGradient(W/2,H*.45,0,W/2,H*.5,H*.7);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b){
      const m=W*.04;
      drawPath(ctx,()=>ctx.rect(m,m,W-2*m,H-2*m),2*(W+H-4*m)*1.05,p,2.4*b,pal.accent);
      drawPath(ctx,()=>ctx.rect(m+14*b,m+14*b,W-2*m-28*b,H-2*m-28*b),2*(W+H-4*m)*1.05,p,1.1*b,pal.accent);
      const q=clamp((p-.45)/.55);if(q<=0)return;const s=easeBack(q);ctx.globalAlpha=clamp(q*2);
      const top=m+W*.1;
      buta(ctx,W/2-42*b,top,62*b*s,-.35,false,pal.accent,2.2*b);
      buta(ctx,W/2+42*b,top,62*b*s,.35,true,pal.accent,2.2*b);
      buta(ctx,W/2-42*b,H-top,62*b*s,Math.PI+.35,true,pal.accent,2.2*b);
      buta(ctx,W/2+42*b,H-top,62*b*s,Math.PI-.35,false,pal.accent,2.2*b);
      const c=m+70*b;
      buta(ctx,c,c,34*b*s,-Math.PI/4,false,pal.accent,1.6*b);buta(ctx,W-c,c,34*b*s,Math.PI/4,true,pal.accent,1.6*b);
      buta(ctx,c,H-c,34*b*s,-Math.PI*3/4,true,pal.accent,1.6*b);buta(ctx,W-c,H-c,34*b*s,Math.PI*3/4,false,pal.accent,1.6*b);
      ctx.globalAlpha=1;
    }
  },
  zumrud:{
    cat:"milli", kinds:["toy"], name:"Zümrüd tağ", nameFont:"Corinthia", textFont:"Cormorant Garamond", particles:"stars",
    pal:{bg1:"#15493f",bg2:"#0a2924",text:"#f2ead8",muted:"#c9c0a8",accent:"#d4b46e",panel:"#0f3a33",panelEdge:"#d4b46e"},
    area(W,H){const m=W*.075,s=W-2*m,h=s*.62;return{top:m+h*.62,bottom:H-m-50*W/1080,maxW:W*.66}},
    bg(ctx,W,H,pal){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b){
      for(const [ins,lw] of [[0,2.4],[16,1.2]]){
        const m=W*.075+ins*b,s=W-2*m,h=s*.62,sy=m+h+ins*b*.3,ay=m;
        const L=2*(H-m-sy)+s+2.8*h;
        drawPath(ctx,()=>{ctx.moveTo(W/2,H-m);ctx.lineTo(m,H-m);ctx.lineTo(m,sy);ctx.bezierCurveTo(m,sy-h*.55,W/2-s*.16,ay+h*.2,W/2,ay);ctx.bezierCurveTo(W/2+s*.16,ay+h*.2,W-m,sy-h*.55,W-m,sy);ctx.lineTo(W-m,H-m);ctx.closePath()},L*1.1,p,lw*b,pal.accent);
      }
      const q=clamp((p-.6)/.4);if(q>0){ctx.globalAlpha=q;star8(ctx,W/2,W*.075+115*b,30*b*easeBack(q),pal.accent,1.6*b,false);ctx.globalAlpha=1}
    }
  }
};
