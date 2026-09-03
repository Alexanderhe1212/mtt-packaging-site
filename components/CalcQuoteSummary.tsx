'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { CALC_HANDOFF_KEY, formatHandoffText, type CalcHandoff } from '../lib/box-calculator';

/**
 * Reads calculator handoff data from sessionStorage and renders:
 * 1. A visible summary for the user
 * 2. Hidden Formspree fields so the data is submitted with the enquiry
 *
 * If no data exists (direct quote-page visit), renders nothing.
 * Always safe — never blocks the form.
 */
export default function CalcQuoteSummary() {
  const [data, setData] = useState<CalcHandoff | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CALC_HANDOFF_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CalcHandoff;
        // Basic sanity check
        if (parsed.internalL && parsed.unit) setData(parsed);
      }
    } catch {}
    // Clean up after reading so it doesn't persist across unrelated visits
    try { sessionStorage.removeItem(CALC_HANDOFF_KEY); } catch {}
  }, []);

  if (!data) return null;

  const productSize = `${data.productLength} × ${data.productWidth} × ${data.productHeight} ${data.unit}`;
  const internalSize = `${data.internalL} × ${data.internalW} × ${data.internalH} ${data.unit}`;
  const externalSize = `${data.externalL} × ${data.externalW} × ${data.externalH} ${data.unit}`;
  const summaryText = formatHandoffText(data);

  return (
    <div className="calc-quote-summary">
      {/* Visible summary for the user */}
      <div className="calc-quote-header">
        <span className="calc-quote-badge">From Box Size Calculator</span>
        <h3>Box Size Calculator Result</h3>
      </div>
      <dl className="calc-quote-dl">
        <dt>Product Size</dt>
        <dd>{productSize}</dd>
        <dt>Recommended Internal Size</dt>
        <dd>{internalSize}</dd>
        <dt>Estimated External Size</dt>
        <dd>{externalSize}</dd>
        <dt>Clearance</dt>
        <dd>{data.clearance} {data.unit} per side</dd>
        <dt>Board Thickness</dt>
        <dd>{data.boardThickness} {data.unit}</dd>
        {data.quantity && (
          <>
            <dt>Quantity</dt>
            <dd>{data.quantity}</dd>
          </>
        )}
      </dl>

      {/* Hidden Formspree fields — included in the POST */}
      <input type="hidden" name="lead_source" value="box_size_calculator" />
      <input type="hidden" name="calculator_product_size" value={productSize} />
      <input type="hidden" name="calculator_internal_size" value={internalSize} />
      <input type="hidden" name="calculator_external_size" value={externalSize} />
      <input type="hidden" name="calculator_clearance" value={`${data.clearance} ${data.unit} per side`} />
      <input type="hidden" name="calculator_board_thickness" value={`${data.boardThickness} ${data.unit}`} />
      {data.quantity && <input type="hidden" name="calculator_quantity" value={data.quantity} />}
      <input type="hidden" name="calculator_summary" value={summaryText} />
    </div>
  );
}
