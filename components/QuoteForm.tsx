'use client';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import {resources} from '../lib/locales/interface.mjs';
import { trackEvent } from '../lib/analytics';
import { CALC_HANDOFF_KEY } from '../lib/box-calculator';

export default function QuoteForm({locale='en',...props}: ComponentProps<'form'> & {locale?:'en'|'zh'}) {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(()=>{
    const family=new URLSearchParams(location.search).get('product_family')||'';
    const types:Record<string,string>={rigid:'Rigid Box',carton:'Folding Carton',corrugated:'Corrugated Box',bag:'Paper Bag'};
    const field=formRef.current?.elements.namedItem('packagingType') as HTMLSelectElement|null;
    if(field && !field.value && types[family]) field.value=types[family];
  },[]);
  const [product,setProduct]=useState('');
 const [accessories,setAccessories]=useState('');
 const [hasAccessories,setHasAccessories]=useState(false);
 useEffect(()=>{const value=new URLSearchParams(location.search).get('accessories')?.slice(0,500)||'';setAccessories(value);setHasAccessories(Boolean(value))},[]);
  useEffect(()=>{setProduct(new URLSearchParams(location.search).get('product')?.slice(0,250)||'')},[]);
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return <form {...props} ref={formRef} aria-busy={busy} onSubmit={async event => {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    pending.current = true; setBusy(true); setError('');
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const result = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) throw new Error('Request not accepted');
      if (form.querySelector('[name=calculator_summary]')) {
        try { sessionStorage.removeItem(CALC_HANDOFF_KEY); } catch { /* A storage failure must not invalidate an accepted enquiry. */ }
      }
      trackEvent('generate_lead', { form_id: location.pathname === '/' ? 'homepage' : 'request_a_quote' });
      location.assign(locale==='zh'?'/zh/thank-you':'/thank-you');
    } catch {
      trackEvent('quote_error', {form_id:location.pathname==='/'?'homepage':'request_a_quote',error_type:'submission_failed'});
      setError(resources[locale].translation.sendError);
      pending.current = false; setBusy(false);
    }
  }}>
    {product && <label>{locale==='zh'?'所选产品':'Selected product'}<input name="selected_product" value={product} readOnly/></label>}
    {hasAccessories && <label>{locale==='zh'?'所选配件（可修改）':'Selected accessories (editable)'}<input name="selected_accessories" value={accessories} onChange={e=>setAccessories(e.target.value)}/></label>}
{props.children}
    {busy && <p role="status">{resources[locale].translation.sending}</p>}
    {error && <p role="alert">{error}</p>}
  </form>;
}
