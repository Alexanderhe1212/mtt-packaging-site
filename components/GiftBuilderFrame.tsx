'use client';
import {useEffect,useRef} from 'react';
import {trackEvent} from '../lib/analytics';
const events=new Set(['gift_builder_start','gift_builder_solution_selected','gift_builder_design_completed','gift_builder_email_submit','gift_builder_whatsapp_click']);
export default function GiftBuilderFrame(){const frame=useRef<HTMLIFrameElement>(null);useEffect(()=>{const listener=(event:MessageEvent)=>{if(event.origin!==location.origin||event.source!==frame.current?.contentWindow||event.data?.source!=='mtt-gift-builder'||!events.has(event.data.event))return;trackEvent(event.data.event)};window.addEventListener('message',listener);return()=>window.removeEventListener('message',listener)},[]);return <iframe ref={frame} title="MTT Gift Box Solution Builder" src="/tools/gift-box-solution-builder/app.html" style={{display:'block',width:'100%',height:'calc(100dvh - 160px)',minHeight:650,border:'1px solid #dce1da',borderRadius:12,marginTop:20}}/>}
