export function imagePlacement(iw,ih,cw,ch,size=100,fit='contain'){
 const bw=cw*size/100,bh=ch*size/100;
 const scale=fit==='width'?bw/iw:fit==='cover'?Math.max(bw/iw,bh/ih):Math.min(bw/iw,bh/ih);
 return {width:iw*scale,height:ih*scale,boxWidth:bw,boxHeight:bh};
}
export function availableFaces(type){return ['window_flip','double_door','rsc','paperbag'].includes(type)?['front','right','back','left','bottom']:['front','right','back','left','top','bottom'];}
// Remove only near-white background connected to an edge, preserving enclosed white details.
export function clearWhiteBackground(data,width,height){const out=new Uint8ClampedArray(data),seen=new Uint8Array(width*height),queue=new Int32Array(width*height);let head=0,tail=0;
 const add=i=>{if(seen[i])return;seen[i]=1;const p=i*4;if(out[p+3]===0||(Math.min(out[p],out[p+1],out[p+2])>=238&&Math.max(out[p],out[p+1],out[p+2])-Math.min(out[p],out[p+1],out[p+2])<18))queue[tail++]=i};
 for(let x=0;x<width;x++){add(x);add((height-1)*width+x)}for(let y=0;y<height;y++){add(y*width);add(y*width+width-1)}
 while(head<tail){const i=queue[head++],x=i%width;out[i*4+3]=0;if(x>0)add(i-1);if(x<width-1)add(i+1);if(i>=width)add(i-width);if(i<width*(height-1))add(i+width)}return out;
}
