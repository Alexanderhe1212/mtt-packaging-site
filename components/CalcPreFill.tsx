'use client';

import { useEffect } from 'react';
import { CALC_HANDOFF_KEY, type CalcHandoff } from '../lib/box-calculator';

/**
 * Maps calculator quantity strings to the quote form's <select> option values.
 *
 * Calculator format:  "1,000–2,999 pcs"
 * Quote form option:  "1000-2999"
 */
function mapQuantityToQuoteOption(calcQty: string): string {
  const q = calcQty.toLowerCase();
  if (q.startsWith('500')) return '500-999';
  if (q.startsWith('1,000') || q.startsWith('1000')) return '1,000-2,999';
  if (q.startsWith('3,000') || q.startsWith('3000')) return '3,000-4,999';
  if (q.startsWith('5,000') || q.startsWith('5000')) return '5,000-9,999';
  if (q.startsWith('10,000') || q.startsWith('10000')) return '10,000+';
  return '';
}

/**
 * Maps calculator packaging type keys to the quote form's <select> option values.
 */
function mapPackagingToQuoteOption(calcKey: string): string {
  const map: Record<string, string> = {
    rigid: 'Rigid Box',
    folding: 'Folding Carton',
    corrugated: 'Other',
    not_sure: '',
  };
  return map[calcKey] || '';
}

/**
 * Pre-fills the visible quote form fields from calculator sessionStorage data.
 *
 * - Sets initial values on visible form inputs
 * - User edits override these values (native form behavior)
 * - Does NOT render any hidden fields (CalcQuoteSummary handles those)
 * - Cleans up sessionStorage on form submit (refresh persistence preserved)
 */
export default function CalcPreFill() {
  useEffect(() => {
    let data: CalcHandoff | null = null;

    try {
      const raw = sessionStorage.getItem(CALC_HANDOFF_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CalcHandoff;
        if (parsed.internalL && parsed.unit) data = parsed;
      }
    } catch {}

    if (!data) return;

    const productSize = `${data.productLength} × ${data.productWidth} × ${data.productHeight} ${data.unit}`;
    const internalSize = `${data.internalL} × ${data.internalW} × ${data.internalH} ${data.unit}`;

    // Set a field value and dispatch events so React controlled components update
    const setField = (name: string, value: string) => {
      if (!value) return;
      const el = document.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement | null;
      if (!el) return;
      const nativeSet = Object.getOwnPropertyDescriptor(
        el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype,
        'value',
      )?.set;
      if (nativeSet) nativeSet.call(el, value);
      else (el as HTMLInputElement).value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };

    // Pre-fill visible quote form fields
    if (data.packagingType) {
      const mapped = mapPackagingToQuoteOption(data.packagingType);
      if (mapped) setField('packagingType', mapped);
    }
    if (data.quantity) {
      const mapped = mapQuantityToQuoteOption(data.quantity);
      if (mapped) setField('quantity', mapped);
    }
    setField('productDimensions', productSize);
    setField('boxDimensions', internalSize);

    // Clear sessionStorage on form submit (preserves refresh persistence)
    const form = document.querySelector('form[action*="formspree"]') as HTMLFormElement | null;
    if (form) {
      const onSubmit = () => {
        try { sessionStorage.removeItem(CALC_HANDOFF_KEY); } catch {}
      };
      form.addEventListener('submit', onSubmit);
      return () => form.removeEventListener('submit', onSubmit);
    }
  }, []);

  return null;
}
