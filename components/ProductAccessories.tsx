'use client';
import {useState} from 'react';
const options=[['card','Greeting card','定制贺卡'],['bag','Matching paper bag','配套纸袋'],['ribbon','Ribbon','定制丝带'],['tissue','Tissue paper','薄页纸'],['tag','Tag / sticker','吊牌 / 贴纸']];
export default function ProductAccessories({code,name,zh=false}:{code:string;name:string;zh?:boolean}){
 const [chosen,setChosen]=useState<string[]>([]);
 const labels=options.filter(o=>chosen.includes(o[0])).map(o=>o[zh?2:1]);
 const query=new URLSearchParams({product:code+' '+name,...(labels.length?{accessories:labels.join(', ')}:{})});
 return <section className="product-accessories"><h2>{zh?'配成一套，更方便采购':'Complete your packaging set'}</h2><p>{zh?'配件均可定制、自由选配，数量及费用单独确认。图片中的配件不代表默认包含。':'Choose optional custom accessories. Quantities and costs are confirmed separately; pictured accessories are not automatically included.'}</p><div>{options.map(([id,en,cn])=><label key={id}><input type="checkbox" checked={chosen.includes(id)} onChange={()=>setChosen(chosen.includes(id)?chosen.filter(x=>x!==id):[...chosen,id])}/><strong>{zh?cn:en}</strong></label>)}</div><a className="button" href={(zh?'/zh':'')+'/request-a-quote?'+query}>{zh?'询价所选包装与配件 →':'Enquire about this packaging set →'}</a></section>
}
