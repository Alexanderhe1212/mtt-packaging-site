'use client';
import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';

export default function ContactAnalytics() {
  useEffect(() => {
    const started = new WeakSet<HTMLFormElement>();
    const click = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.('a');
      if (!link) return;
      const url = new URL(link.href, location.href);
      const path=url.pathname.replace(/\/$/,'');
      if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') trackEvent('whatsapp_click');
      else if(url.protocol==='mailto:') trackEvent('email_click');
      else if (url.origin === location.origin && path === '/tools/gift-box-solution-builder') trackEvent('gift_builder_entry');
      else if (url.origin === location.origin && ['/request-a-quote','/zh/request-a-quote'].includes(path)) trackEvent('packaging_brief_click');
    };
    const focus = (event: FocusEvent) => {
      const form = (event.target as Element).closest?.('form');
      if (form?.action === 'https://formspree.io/f/xyeyzwpw' && !started.has(form)) {
        try { if (localStorage.getItem('mtt_cookie_consent') !== 'granted') return; } catch { return; }
        started.add(form); trackEvent('quote_start');
      }
    };
    document.addEventListener('click', click);
    document.addEventListener('focusin', focus);
    return () => { document.removeEventListener('click', click); document.removeEventListener('focusin', focus); };
  }, []);
  return null;
}
