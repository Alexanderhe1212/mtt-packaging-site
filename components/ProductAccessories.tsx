'use client';
import {createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction} from 'react';
const options=[['card','Greeting card','定制贺卡'],['bag','Matching paper bag','配套纸袋'],['ribbon','Ribbon','定制丝带'],['tissue','Tissue paper','薄页纸'],['tag','Tag / sticker','吊牌 / 贴纸'],['pouch','Fabric pouch','收纳布袋'],['cloth','Care cloth','护理擦拭布'],['sleeve','Paper sleeve / envelope','纸套 / 信封']];
const EnquiryContext=createContext<{chosen:string[];setChosen:Dispatch<SetStateAction<string[]>>;href:string}|null>(null);
export function ProductEnquiryProvider({code,name,zh=false,children}:{code:string;name:string;zh?:boolean;children:ReactNode}){
 const [chosen,setChosen]=useState<string[]>([]);
 const labels=options.filter(o=>chosen.includes(o[0])).map(o=>o[zh?2:1]);
 const query=new URLSearchParams({product:code+' '+name,...(labels.length?{accessories:labels.join(', ')}:{})});
 return <EnquiryContext.Provider value={{chosen,setChosen,href:(zh?'/zh':'')+'/request-a-quote?'+query}}>{children}</EnquiryContext.Provider>;
}
function useEnquiry(){const value=useContext(EnquiryContext);if(!value)throw new Error('Product enquiry provider required');return value;}
export function ProductEnquiryLink({children}:{children:ReactNode}){const {href}=useEnquiry();return <a className="button" href={href}>{children}</a>;}
export default function ProductAccessories({zh=false}:{zh?:boolean}){
 const {chosen,setChosen}=useEnquiry();
 return <section className="product-accessories"><h2>{zh?'配成一套，更方便采购':'Complete your packaging set'}</h2><p>{zh?'配件均可定制、自由选配，数量及费用单独确认。内装产品用于展示适配，不随包装提供；图中配件也非默认包含。':'Choose optional custom accessories. Quantities and costs are confirmed separately. Contents demonstrate product fit and are not supplied; pictured accessories are not automatically included.'}</p><div>{options.map(([id,en,cn])=><label key={id}><input type="checkbox" checked={chosen.includes(id)} onChange={()=>setChosen(previous=>previous.includes(id)?previous.filter(x=>x!==id):[...previous,id])}/><strong>{zh?cn:en}</strong></label>)}</div><ProductEnquiryLink>{zh?'询价所选包装与配件 →':'Enquire about this packaging set →'}</ProductEnquiryLink></section>
}
