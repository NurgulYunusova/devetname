/* Şablon yaratmaq üçün mkT köməkçisi */
"use strict";

function mkT(o){
  const t={kinds:["ad"],particles:"none",...o};
  t.pal={panel:o.pal.bg2,panelEdge:o.pal.accent,...o.pal};
  const A=o.areaF||[.1,.9,.72];
  t.area=o.area||((W,H)=>({top:H*A[0],bottom:H*A[1],maxW:W*A[2]}));
  t.bg=o.bg||function(ctx,W,H,pal){
    const g=o.bgType==="rad"?ctx.createRadialGradient(W/2,H*.45,0,W/2,H*.5,H*.75):o.bgType==="diag"?ctx.createLinearGradient(0,0,W,H):ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,pal.bg1);g.addColorStop(1,pal.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);o.bgExtra&&o.bgExtra(ctx,W,H,pal);
  };
  t.frame=o.frame||function(ctx,W,H,pal,p,b,tt){
    if(o.border!==false){const m=W*.045;drawPath(ctx,()=>ctx.roundRect?ctx.roundRect(m,m,W-2*m,H-2*m,32*b):ctx.rect(m,m,W-2*m,H-2*m),2*(W+H-4*m),p,(o.borderW||1.8)*b,hexA(pal.accent,o.borderA??.6))}
    o.deco&&o.deco(ctx,W,H,pal,p,b,tt);
  };
  return t;
}
