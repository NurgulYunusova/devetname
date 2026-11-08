/* Ad günü: hər kəs üçün şablonlar */
"use strict";

Object.assign(TEMPLATES,{
  sar:{
    kinds:["ad"], who:["oglan","qiz"], name:"Rəngli şarlar", nameFont:"Lobster", textFont:"Nunito", particles:"confetti",
    pal:{bg1:"#fffaf2",bg2:"#fde6d8",text:"#4a3346",muted:"#8a7184",accent:"#e2725b",panel:"#fbd9cf",panelEdge:"#e2a08f",confA:.55,
         balloons:["#f28b82","#f7c873","#8ecae6","#b5a1e6","#90d5b5"]},
    area:(W,H)=>({top:H*.2,bottom:H*.93,maxW:W*.72}),
    bg(ctx,W,H,pal){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b,t){
      if(p<=0)return;const e=easeOut(p),rise=(1-e)*H*.85,B=pal.balloons;
      const set=[[.11,.085,74,0,.17],[.22,.05,62,1,.2],[.07,.17,58,2,.1],[.89,.08,72,3,.16],[.78,.045,60,4,.2],[.93,.165,56,0,.1]];
      set.forEach(([fx,fy,r,c,sl],i)=>{
        const bob=Math.sin(t*1.3+i*1.7)*10*b;
        balloon(ctx,fx*W+Math.sin(t*.8+i)*6*b,fy*H+rise+bob,r*b,B[c],sl*H,14*b*Math.sin(t+i),b);
      });
    }
  },
  konfetti:{
    kinds:["ad"], who:["oglan","qiz"], name:"Konfetti", nameFont:"Kaushan Script", textFont:"Montserrat", particles:"confetti",
    pal:{bg1:"#3b1f66",bg2:"#1b0e33",text:"#fff4e6",muted:"#d6c8ea",accent:"#ffcf5c",panel:"#2a1650",panelEdge:"#ffcf5c",confA:.8},
    area:(W,H)=>({top:H*.17,bottom:H*.92,maxW:W*.74}),
    bg(ctx,W,H,pal){const g=ctx.createRadialGradient(W/2,H*.45,0,W/2,H*.5,H*.75);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b,t){
      const m=W*.045;
      drawPath(ctx,()=>ctx.roundRect?ctx.roundRect(m,m,W-2*m,H-2*m,36*b):ctx.rect(m,m,W-2*m,H-2*m),2*(W+H-4*m),p,2.2*b,hexA(pal.accent,.8));
      bunting(ctx,W,H*.045,H*.05,11,CONF,easeOut(p),b,t);
    }
  },
  qizili:{
    kinds:["ad"], who:["oglan","qiz"], name:"Qızılı gecə", nameFont:"Great Vibes", textFont:"Josefin Sans", particles:"dust", ageOutline:true,
    pal:{bg1:"#202020",bg2:"#070707",text:"#f5ecd7",muted:"#bfb49c",accent:"#d4af61",panel:"#141414",panelEdge:"#d4af61"},
    area:(W,H)=>({top:H*.09,bottom:H*.91,maxW:W*.72}),
    bg(ctx,W,H,pal){const g=ctx.createRadialGradient(W/2,H*.45,0,W/2,H*.5,H*.7);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b){
      const m=W*.05;
      drawPath(ctx,()=>ctx.rect(m,m,W-2*m,H-2*m),2*(W+H-4*m)*1.05,p,1.6*b,pal.accent);
      const q=clamp((p-.5)/.5);if(q<=0)return;ctx.globalAlpha=q;ctx.strokeStyle=pal.accent;ctx.lineWidth=1.6*b;
      for(const [sx,sy] of [[1,1],[-1,1],[1,-1],[-1,-1]]){
        const cx=sx>0?m:W-m, cy=sy>0?m:H-m;
        for(let k=1;k<=3;k++){const d=k*18*b,L=(150-k*30)*b;ctx.beginPath();ctx.moveTo(cx+sx*d,cy+sy*(d+L));ctx.lineTo(cx+sx*d,cy+sy*d);ctx.lineTo(cx+sx*(d+L),cy+sy*d);ctx.stroke()}
      }
      diamond(ctx,W/2,m,11*b,pal.accent);diamond(ctx,W/2,H-m,11*b,pal.accent);ctx.globalAlpha=1;
    }
  },
  pastel:{
    kinds:["ad"], who:["qiz"], name:"Pastel uşaq", nameFont:"Comfortaa", textFont:"Nunito", particles:"stars",
    pal:{bg1:"#e6f6f3",bg2:"#fde7ef",text:"#3f4a6b",muted:"#7a84a3",accent:"#f08fae",panel:"#f9dbe6",panelEdge:"#f2b3c8"},
    area:(W,H)=>({top:H*.1,bottom:H*.85,maxW:W*.74}),
    bg(ctx,W,H,pal){const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)},
    frame(ctx,W,H,pal,p,b,t){
      const m=W*.05;
      ctx.save();ctx.setLineDash([2*b,14*b]);ctx.lineCap="round";ctx.globalAlpha=clamp(p*1.5);
      ctx.strokeStyle=pal.accent;ctx.lineWidth=5*b;ctx.beginPath();ctx.roundRect?ctx.roundRect(m,m,W-2*m,H-2*m,44*b):ctx.rect(m,m,W-2*m,H-2*m);ctx.stroke();ctx.restore();
      const e=easeOut(clamp(p*1.2)),dx=(1-e)*W*.6;
      cloud(ctx,W*.16-dx+Math.sin(t*.4)*8*b,H*.93,120*b,"rgba(255,255,255,.92)");
      cloud(ctx,W*.86+dx+Math.sin(t*.4+2)*8*b,H*.905,95*b,"rgba(255,255,255,.85)");
      cloud(ctx,W*.5+Math.sin(t*.3+1)*10*b,H*.97+(1-e)*H*.1,140*b,"rgba(255,255,255,.95)");
    }
  }
});
