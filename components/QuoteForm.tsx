'use client';
import { useRef, useState, type ComponentProps } from 'react';
import {resources} from '../lib/locales/interface.mjs';
import { trackEvent } from '../lib/analytics';

export default function QuoteForm({locale='en',...props}: ComponentProps<'form'> & {locale?:'en'|'zh'}) {
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return <form {...props} aria-busy={busy} onSubmit={async event => {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    pending.current = true; setBusy(true); setError('');
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Request not accepted');
      trackEvent('generate_lead', { form_id: location.pathname === '/' ? 'homepage' : 'request_a_quote' });
      location.assign(locale==='zh'?'/zh/thank-you':'/thank-you');
    } catch {
      setError(resources[locale].translation.sendError);
      pending.current = false; setBusy(false);
    }
  }}>
    {props.children}
    {busy && <p role="status">{resources[locale].translation.sending}</p>}
    {error && <p role="alert">{error}</p>}
  </form>;
}
