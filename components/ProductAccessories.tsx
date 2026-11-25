'use client';
import Image from 'next/image';
import {createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction} from 'react';
const options=[['card','Greeting card','定制贺卡'],['bag','Matching paper bag','配套纸袋'],['ribbon','Ribbon','定制丝带'],['tissue','Tissue paper','薄页纸'],['tag','Tag / sticker','吊牌 / 贴纸'],['pouch','Fabric pouch','收纳布袋'],['cloth','Care cloth','护理擦拭布'],['sleeve','Paper sleeve / envelope','纸套 / 信封']];
const EnquiryContext=createContext<{chosen:string[];setChosen:Dispatch<SetStateAction<string[]>>;href:string}|null>(null);
export function ProductEnquiryProvider({code,name,family,zh=false,children}:{code:string;name:string;family:string;zh?:boolean;children:ReactNode}){
 const [chosen,setChosen]=useState<string[]>([]);
 const labels=options.filter(o=>chosen.includes(o[0])).map(o=>o[zh?2:1]);
 const query=new URLSearchParams({product:code+' '+name,product_family:family,...(labels.length?{accessories:labels.join(', ')}:{})});
 return <EnquiryContext.Provider value={{chosen,setChosen,href:(zh?'/zh':'')+'/request-a-quote?'+query}}>{children}</EnquiryContext.Provider>;
}
function useEnquiry(){const value=useContext(EnquiryContext);if(!value)throw new Error('Product enquiry provider required');return value;}
export function ProductEnquiryLink({children}:{children:ReactNode}){const {href}=useEnquiry();return <a className="button" href={href}>{children}</a>;}
export default function ProductAccessories({zh=false,code,productImage}:{zh?:boolean;code:string;productImage:string}){
 const {chosen,setChosen}=useEnquiry();
 const common=['card','bag','ribbon','tissue','tag','sleeve'];
 const allowed:Record<string,string[]>={'MTT-R1312':common,'MTT-R1313':common,'MTT-R1301':common,'MTT-R1302':common,'MTT-R1303':[...common,'pouch','cloth'],'MTT-C0131':common,'MTT-R1304':common,'MTT-R1305':common};
 const accessoryIds = /^MTT-R14(?:0[1-9]|1[0-9]|2[0-5])$/.test(code) ? ['tag', 'sleeve'] : allowed[code];
 const offered = accessoryIds ? options.filter(([id]) => accessoryIds.includes(id)) : options;
 const selected=offered.filter(([id])=>chosen.includes(id));
 return <section className="product-accessories"><h2>{zh?'配成一套，更方便采购':'Complete your packaging set'}</h2><p>{zh?'配件均可定制、自由选配，数量及费用单独确认。内装产品用于展示适配，不随包装提供；图中配件也非默认包含。图片为 AI 生成的定制示意，颜色、图案、客户 Logo 和尺寸可按要求定制，最终以确认样品为准。':'Choose optional custom accessories. Quantities and costs are confirmed separately. Contents demonstrate product fit and are not supplied; pictured accessories are not automatically included. AI-generated examples show illustrative colors and logos. Colors, patterns, your logo and sizes can be customized to your requirements and confirmed with a physical sample.'}</p><div>{offered.map(([id,en,cn])=><label key={id}><img src={`/accessories/responsive/${id}.webp`} alt={zh?`${cn}示意图`:`${en} illustration`} aria-hidden="true" width="96" height="96" loading="lazy"/><input type="checkbox" checked={chosen.includes(id)} onChange={()=>setChosen(previous=>previous.includes(id)?previous.filter(x=>x!==id):[...previous,id])}/><strong>{zh?cn:en}</strong></label>)}</div><div className="selected-set-preview" data-testid="selected-set" aria-live="polite"><h3>{zh?'当前选择':'Your selected set'}</h3><p>{zh?'下方并列显示所选包装和配件示意图，并非实时合成效果；颜色、尺寸与最终搭配以样品确认为准。':'The packaging and selected accessories are shown side by side as references, not a composited preview. Colours, dimensions and the final combination are confirmed with a sample.'}</p><div className="selected-set-items"><figure><Image unoptimized src={productImage.replace('.webp','-0.webp')} alt={zh?'所选包装示意':'Selected packaging concept'} width="96" height="96"/><figcaption>{zh?'所选包装':'Packaging'}</figcaption></figure>{selected.map(([id,en,cn])=><figure key={id}><Image unoptimized src={`/accessories/responsive/${id}.webp`} alt={zh?`${cn}示意图`:`${en} illustration`} width="96" height="96"/><figcaption>{zh?cn:en}</figcaption></figure>)}</div>{selected.length===0&&<p>{zh?'尚未选择配件。':'No accessories selected yet.'}</p>}</div><ProductEnquiryLink>{zh?'询价所选包装与配件 →':'Enquire about this packaging set →'}</ProductEnquiryLink></section>
}
