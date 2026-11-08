/* Dəvətnamə mətninin düzəni və ölçüyə uyğunlaşdırma */
"use strict";

function nameFontObj(){return NAME_FONTS.find(f=>f.family===st.nameFont)||NAME_FONTS[0]}
function textFontObj(){return TEXT_FONTS.find(f=>f.family===st.textFont)||TEXT_FONTS[0]}

function makeItems(ctx,W,u,pal,area,tpl){
  const nf=nameFontObj(), tf=textFontObj(), T=tf.family, ta=tf.adj, maxW=area.maxW, cx=W/2;
  const items=[];
  const text=(str,style,weight,size,color,lh,gap,anim="fade")=>{
    if(!str||!str.trim())return;
    ctx.font=fnt(style,weight,size,T);const lines=wrap(ctx,str,maxW);
    items.push({gap,h:lines.length*size*lh,anim,draw(c,y){c.font=fnt(style,weight,size,T);c.fillStyle=color;lines.forEach((l,i)=>c.fillText(l,cx,y+size*lh*(i+.5)))}});
  };
  const spaced=(str,weight,size,color,gap)=>{
    if(!str||!str.trim())return;const s=upperAz(str),sp=size*.32;
    items.push({gap,h:size*1.5,anim:"fade",draw(c,y){c.font=fnt("normal",weight,size,T);c.fillStyle=color;drawSpaced(c,s,cx,y+size*.75,sp)}});
  };
  const divider=(gap)=>items.push({gap,h:26*u,anim:"grow",draw(c,y,p){
    const w=maxW*.22*p,yy=y+13*u;c.strokeStyle=pal.accent;c.lineWidth=1.4*u;
    c.beginPath();c.moveTo(cx-14*u-w,yy);c.lineTo(cx-14*u,yy);c.moveTo(cx+14*u,yy);c.lineTo(cx+14*u+w,yy);c.stroke();
    diamond(c,cx,yy,9*u*p,pal.accent);c.fillStyle=pal.accent;
    for(const d of [-1,1]){c.beginPath();c.arc(cx+d*(22*u+w),yy,2.6*u*p,0,Math.PI*2);c.fill()}
  }});

  text(fill(st.greeting),"italic",400,44*u*ta,pal.text,1.3,0);
  text(fill(st.invite),"normal",400,38*u*ta,pal.text,1.5,30*u);
  spaced(fill(st.title),600,26*u*ta,pal.accent,52*u);

  if(KIND==="ad"){
    const person=(st.person||"").trim();
    if(person){
      let ns=170*u*nf.adj; ctx.font=fnt(nf.style,nf.weight,ns,nf.family);
      const w=ctx.measureText(person).width; if(w>maxW)ns*=maxW/w;
      ctx.font=fnt(nf.style,nf.weight,ns,nf.family);
      items.push({gap:18*u,h:ns*1.15,anim:"wipe",width:ctx.measureText(person).width,pad:ns*.35,
        draw(c,y){c.font=fnt(nf.style,nf.weight,ns,nf.family);c.fillStyle=pal.text;c.fillText(person,cx,y+ns*.6)}});
    }
    const age=String(st.age||"").trim();
    if(age){
      const D=tf.digits||T, big=210*u, lab=28*u*ta, outline=tpl.ageOutline;
      items.push({gap:6*u,h:big*.95+lab*1.6,anim:"pop",draw(c,y){
        c.font=fnt("normal",600,big,D);
        if(outline){c.strokeStyle=pal.accent;c.lineWidth=3*u;c.strokeText(age,cx,y+big*.48)}else{c.fillStyle=pal.accent;c.fillText(age,cx,y+big*.48)}
        c.font=fnt("normal",600,lab,T);c.fillStyle=pal.text;drawSpaced(c,"YAŞ",cx,y+big*.95+lab*.6,lab*.5);
      }});
    }
  }
  // Adlar
  let first=st.groom, second=st.bride; if(st.order==="bride")[first,second]=[second,first];
  const names=KIND==="ad"?[]:[first,second].map(s=>(s||"").trim()).filter(Boolean);
  if(names.length){
    let ns=170*u*nf.adj; ctx.font=fnt(nf.style,nf.weight,ns,nf.family);
    const widest=Math.max(...names.map(n=>ctx.measureText(n).width));
    if(widest>maxW*1.02)ns*=maxW*1.02/widest;
    const nameItem=(n,gap)=>items.push({gap,h:ns*1.08,anim:"wipe",width:(ctx.font=fnt(nf.style,nf.weight,ns,nf.family),ctx.measureText(n).width),pad:ns*.35,
      draw(c,y){c.font=fnt(nf.style,nf.weight,ns,nf.family);c.fillStyle=pal.text;c.fillText(n,cx,y+ns*.56)}});
    nameItem(names[0],18*u);
    if(names[1]){
      if(st.connector){
        const isAmp=st.connector==="&";let cs=isAmp?ns*.5:44*u*ta;
        if(isAmp){ctx.font=fnt(nf.style,nf.weight,cs,nf.family);const m=ctx.measureText("&"),gh=(m.actualBoundingBoxAscent||0)+(m.actualBoundingBoxDescent||0);if(gh>0)cs*=clamp(ns*.36/gh,.6,2.6);cs*=nf.amp||1}
        items.push({gap:isAmp?-ns*.12:2*u,h:isAmp?cs*1.05:cs*1.4,anim:"fade",draw(c,y){
          c.font=isAmp?fnt(nf.style,nf.weight,cs,nf.family):fnt("italic",400,cs,T);c.fillStyle=pal.accent;c.fillText(st.connector,cx,y+(isAmp?cs*.55:cs*.7))}});
        nameItem(names[1],isAmp?-ns*.12:2*u);
      } else nameItem(names[1],-ns*.05);
    }
  }
  divider(34*u);

  // Tarix bloku
  if(st.date){
    const [Y,M,D]=st.date.split("-").map(Number), dt=new Date(Y,M-1,D);
    const big=118*u*ta, sm=24*u*ta, sp=sm*.3, col=maxW*.34, T=tf.digits||tf.family;
    const left=upperAz(AZ_DAYS[dt.getDay()]), right=st.time?("SAAT "+st.time):"", under=upperAz(AZ_MONTHS[M-1])+" "+Y;
    items.push({gap:30*u,h:big*1.02+sm*2.2,anim:"fade",draw(c,y){
      const mid=y+big*.52;
      c.font=fnt("normal",400,big,T);c.fillStyle=pal.text;c.fillText(String(D),cx,mid);
      c.font=fnt("normal",600,sm,T);c.fillStyle=pal.accent;drawSpaced(c,under,cx,y+big*1.02+sm*.9,sp);
      c.strokeStyle=hexA(pal.accent,.8);c.lineWidth=1.2*u;
      for(const [lbl,x] of [[left,cx-maxW*.34],[right,cx+maxW*.34]]){
        if(!lbl)continue;
        let fs=sm; c.font=fnt("normal",600,fs,T); const w0=spacedW(c,lbl,sp);
        if(w0>col*.95){fs*=col*.95/w0;c.font=fnt("normal",600,fs,T)}
        c.fillStyle=pal.text;drawSpaced(c,lbl,x,mid,fs*.3);
        const lw=col*.82;c.beginPath();c.moveTo(x-lw/2,mid-34*u);c.lineTo(x+lw/2,mid-34*u);c.moveTo(x-lw/2,mid+34*u);c.lineTo(x+lw/2,mid+34*u);c.stroke();
      }
    }});
  } else if(st.time){ items.push({gap:30*u,h:45*u,anim:"fade",draw(c,y){c.font=fnt("normal",600,30*u*ta,tf.digits||T);c.fillStyle=pal.text;drawSpaced(c,"SAAT "+st.time,cx,y+22*u,9*u)}}); }

  text(st.venue,"normal",600,40*u*ta,pal.text,1.3,40*u);
  text(st.address,"normal",400,30*u*ta,pal.muted,1.35,6*u);
  text(fill(st.note),"italic",400,30*u*ta,pal.muted,1.4,30*u);
  text(fill(st.closing),"italic",400,36*u*ta,pal.text,1.3,50*u);
  if(st.family&&st.family.trim()){
    const fs=78*u*nf.adj; ctx.font=fnt(nf.style,nf.weight,fs,nf.family);
    let s=fs; const w=ctx.measureText(st.family).width; if(w>maxW)s*=maxW/w;
    items.push({gap:4*u,h:s*1.1,anim:"wipe",width:(ctx.font=fnt(nf.style,nf.weight,s,nf.family),ctx.measureText(st.family).width),pad:s*.3,
      draw(c,y){c.font=fnt(nf.style,nf.weight,s,nf.family);c.fillStyle=pal.accent;c.fillText(st.family,cx,y+s*.58)}});
  }
  if(items.length)items[0].gap=0;
  return items;
}

function computeLayout(ctx,W,H,tpl,pal){
  const area=tpl.area(W,H), avail=area.bottom-area.top, b=W/1080;
  let k=1, items, total;
  for(let i=0;i<8;i++){
    items=makeItems(ctx,W,b*k,pal,area,tpl);
    total=items.reduce((s,it)=>s+it.h+it.gap,0);
    if(total<=avail)break; k*=Math.max(.75,avail/total*.99);
  }
  const posGaps=items.reduce((s,it)=>s+Math.max(0,it.gap),0);
  if(total<avail&&posGaps>0){
    const g=Math.min(1.8,1+(avail-total)/posGaps);
    items.forEach(it=>{if(it.gap>0)it.gap*=g});
    total=items.reduce((s,it)=>s+it.h+it.gap,0);
  }
  let y=area.top+(avail-total)/2;
  items.forEach(it=>{y+=it.gap;it.y=y;y+=it.h});
  return items;
}
