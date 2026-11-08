/* Hərəkətli hissəciklər: ləçək, ulduz, parıltı, konfetti, ürək, qabarcıq */
"use strict";

const CONF=["#ff6b6b","#ffcf5c","#4ecdc4","#a78bfa","#f472b6","#60a5fa"];
function heartPath(ctx,x,y,s){ctx.moveTo(x,y+s*.35);ctx.bezierCurveTo(x-s*1.1,y-s*.3,x-s*.5,y-s*1.05,x,y-s*.45);ctx.bezierCurveTo(x+s*.5,y-s*1.05,x+s*1.1,y-s*.3,x,y+s*.35)}
const PARTICLES={
  hearts(ctx,W,H,t,pal,b,a){
    const cols=pal.conf||[pal.accent];
    for(let i=0;i<20;i++){
      const sp=(.02+rnd(i+30)*.03)*H,y=H*1.05-((rnd(i+7)*H*1.1+t*sp)%(H*1.1)),x=rnd(i)*W+Math.sin(t*.8+i)*25*b,s=(10+rnd(i+9)*16)*b;
      ctx.globalAlpha=a*(.35+rnd(i+3)*.3);ctx.fillStyle=cols[i%cols.length];ctx.beginPath();heartPath(ctx,x,y,s);ctx.fill();
    }
    ctx.globalAlpha=1;
  },
  bubbles(ctx,W,H,t,pal,b,a){
    for(let i=0;i<26;i++){
      const sp=(.03+rnd(i+30)*.04)*H,y=H-((rnd(i+7)*H+t*sp)%H),x=rnd(i)*W+Math.sin(t+i)*15*b,r=(5+rnd(i+11)*12)*b;
      ctx.globalAlpha=a*.6;ctx.strokeStyle="#ffffff";ctx.lineWidth=2*b;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.arc(x-r*.35,y-r*.35,r*.25,Math.PI,Math.PI*1.5);ctx.stroke();
    }
    ctx.globalAlpha=1;
  },
  confetti(ctx,W,H,t,pal,b,a){
    const cols=pal.conf||CONF;
    for(let i=0;i<46;i++){
      const sp=(.05+rnd(i+40)*.06)*H, y=((rnd(i+8)*H*1.2+t*sp)%(H*1.2))-H*.1;
      const x=rnd(i+1)*W+Math.sin(t*1.1+i)*30*b, r=t*(1+rnd(i+4)*2)+i;
      ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(1,Math.cos(t*3+i));
      ctx.globalAlpha=a*(pal.confA||.85);ctx.fillStyle=cols[i%cols.length];
      if(i%4===0){ctx.beginPath();ctx.arc(0,0,6*b,0,Math.PI*2);ctx.fill()}else ctx.fillRect(-9*b,-4.5*b,18*b,9*b);
      ctx.restore();
    }
  },
  petals(ctx,W,H,t,pal,b,a){
    for(let i=0;i<22;i++){
      const sp=(.035+rnd(i+50)*.04)*H, y=((rnd(i+9)*H*1.2+t*sp)%(H*1.2))-H*.1;
      const x=rnd(i)*W+Math.sin(t*.7+i)*40*b, r=t*(.6+rnd(i+3))+i;
      ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.globalAlpha=a*(.35+rnd(i+2)*.35);
      ctx.fillStyle=i%3?pal.p1:pal.p2;ctx.beginPath();ctx.ellipse(0,0,15*b,8*b*(.6+.4*Math.abs(Math.sin(t*2+i))),0,0,Math.PI*2);ctx.fill();ctx.restore();
    }
  },
  stars(ctx,W,H,t,pal,b,a){
    for(let i=0;i<46;i++){
      const x=rnd(i)*W,y=rnd(i+100)*H,s=(2+rnd(i+200)*5)*b;
      const inside=Math.abs(x-W/2)<W*.33&&y>H*.12&&y<H*.9;
      const al=(inside?.4:1)*a*(.2+.7*(.5+.5*Math.sin(t*(1+rnd(i+5)*2)+i*3)));
      ctx.globalAlpha=al;
      if(s>5*b)sparkle(ctx,x,y,s*2.2,pal.accent);else{ctx.fillStyle=pal.accent;ctx.beginPath();ctx.arc(x,y,s*.45,0,Math.PI*2);ctx.fill()}
    }
    ctx.globalAlpha=1;
  },
  dust(ctx,W,H,t,pal,b,a){
    for(let i=0;i<34;i++){
      const sp=(.02+rnd(i+30)*.03)*H,y=H-((rnd(i+7)*H+t*sp)%H),x=rnd(i)*W+Math.sin(t*.5+i)*24*b;
      const r=(1.5+rnd(i+11)*3)*b;ctx.globalAlpha=a*(.25+.45*(.5+.5*Math.sin(t*1.7+i)));
      const g=ctx.createRadialGradient(x,y,0,x,y,r*3);g.addColorStop(0,pal.accent);g.addColorStop(1,hexA(pal.accent,0));
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*3,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
  }
};
