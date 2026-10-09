'use client';
import {useEffect,useRef,useState} from 'react';
import {trackEvent} from '../lib/analytics';
const events=new Set(['gift_builder_start','gift_builder_solution_selected','gift_builder_design_completed','gift_builder_email_submit','gift_builder_whatsapp_click']);
export default function GiftBuilderFrame(){
 const frame=useRef<HTMLIFrameElement>(null),[height,setHeight]=useState(1100);
 useEffect(()=>{const listener=(event:MessageEvent)=>{
  if(event.origin!==location.origin||event.source!==frame.current?.contentWindow||event.data?.source!=='mtt-gift-builder')return;
  if(event.data.event==='resize'&&Number.isFinite(event.data.height)){setHeight(Math.max(600,Math.min(15000,event.data.height)));return}
  if(event.data.event==='step'){frame.current?.scrollIntoView({behavior:'smooth',block:'start'});return}
  if(events.has(event.data.event))trackEvent(event.data.event);
 };window.addEventListener('message',listener);return()=>window.removeEventListener('message',listener)},[]);
 return <><iframe ref={frame} title="Design Your Box by MTT Packaging" src="/tools/gift-box-solution-builder/app.html" style={{display:'block',width:'100%',height,border:0,background:'#f7f6f1'}}/><div style={{padding:'8px 5%',textAlign:'right',fontSize:12}}><a href="/tools/gift-box-solution-builder/app.html">Open the studio full screen ↗</a></div></>
}
