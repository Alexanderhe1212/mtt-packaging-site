'use client';

import { useState, useEffect } from 'react';
import {
  CALC_HANDOFF_KEY,
  formatHandoffText,
  getProductTypeLabel,
  getPackagingTypeLabel,
  getInsertLabel,
  type CalcHandoff,
} from '../lib/box-calculator';

/**
 * Reads calculator handoff data from sessionStorage and renders:
 * 1. A visible summary for the user
 * 2. Hidden Formspree fields for calculator-only technical data
 *
 * Visible form fields (packagingType, quantity, productDimensions, boxDimensions)
 * are pre-filled by CalcPreFill — not duplicated here.
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
        if (parsed.internalL && parsed.unit) setData(parsed);
      }
    } catch {}
    // sessionStorage cleanup is handled by CalcPreFill on form submit.
  }, []);

  if (!data) return null;

  const externalSize = `${data.externalL} × ${data.externalW} × ${data.externalH} ${data.unit}`;
  const summaryText = formatHandoffText(data);

  return (
    <div className="calc-quote-summary">
      {/* Visible summary for the user */}
      <div className="calc-quote-header">
        <span className="calc-quote-badge">Packaging Calculator Result Attached</span>
        <h3>MTT Packaging Calculator Result</h3>
      </div>
      <dl className="calc-quote-dl">
        {data.productType && (
          <>
            <dt>Product Type</dt>
            <dd>{getProductTypeLabel(data.productType)}</dd>
          </>
        )}
        <dt>Product Size</dt>
        <dd>{`${data.productLength} × ${data.productWidth} × ${data.productHeight} ${data.unit}`}</dd>
        {data.packagingType && (
          <>
            <dt>Packaging Type</dt>
            <dd>{getPackagingTypeLabel(data.packagingType)}</dd>
          </>
        )}
        <dt>Recommended Internal Size</dt>
        <dd>{`${data.internalL} × ${data.internalW} × ${data.internalH} ${data.unit}`}</dd>
        <dt>Estimated External Size</dt>
        <dd>{externalSize}</dd>
        <dt>Clearance</dt>
        <dd>{data.clearance} {data.unit} per side</dd>
        <dt>Board Thickness</dt>
        <dd>{data.boardThickness} {data.unit}</dd>
        {data.insert && (
          <>
            <dt>Insert</dt>
            <dd>{getInsertLabel(data.insert)}</dd>
          </>
        )}
        {data.quantity && (
          <>
            <dt>Quantity</dt>
            <dd>{data.quantity}</dd>
          </>
        )}
      </dl>

      {/* Hidden Formspree fields — calculator-only technical data */}
      {/* Visible fields (packagingType, quantity, productDimensions, boxDimensions)
          are submitted by the pre-filled visible form inputs via CalcPreFill. */}
      <input type="hidden" name="lead_source" value="packaging_calculator" />
      {data.productType && <input type="hidden" name="calculator_product_type" value={getProductTypeLabel(data.productType)} />}
      {data.packagingType && <input type="hidden" name="calculator_packaging_type" value={getPackagingTypeLabel(data.packagingType)} />}
      <input type="hidden" name="calculator_external_size" value={externalSize} />
      <input type="hidden" name="calculator_clearance" value={`${data.clearance} ${data.unit} per side`} />
      <input type="hidden" name="calculator_board_thickness" value={`${data.boardThickness} ${data.unit}`} />
      {data.insert && <input type="hidden" name="calculator_insert" value={getInsertLabel(data.insert)} />}

      {/* Sheet layout hidden fields */}
      {data.sheetLayoutUsed && (
        <>
          <input type="hidden" name="calculator_sheet_parent" value={`${data.sheetParentW} × ${data.sheetParentH} ${data.unit}`} />
          <input type="hidden" name="calculator_sheet_dieline" value={`${data.sheetDieW} × ${data.sheetDieH} ${data.unit}`} />
          <input type="hidden" name="calculator_sheet_ups" value={String(data.bestUps)} />
          <input type="hidden" name="calculator_sheet_orientation" value={data.bestOrientation} />
          <input type="hidden" name="calculator_sheet_utilization" value={data.utilization ? `${data.utilization.toFixed(1)}%` : ''} />
          <input type="hidden" name="calculator_sheet_waste" value={data.waste ? `${data.waste.toFixed(1)}%` : ''} />
          <input type="hidden" name="calculator_sheet_count" value={String(data.sheetsRequired)} />
        </>
      )}

      {/* CBM hidden fields */}
      {data.cbmUsed && (
        <>
          <input type="hidden" name="calculator_carton_size" value={`${data.cartonL} × ${data.cartonW} × ${data.cartonH} ${data.cartonUnit}`} />
          <input type="hidden" name="calculator_num_cartons" value={String(data.numCartons)} />
          <input type="hidden" name="calculator_cbm_per_carton" value={data.cbmPerCarton ? `${data.cbmPerCarton.toFixed(4)} m³` : ''} />
          <input type="hidden" name="calculator_total_cbm" value={data.totalCbm ? `${data.totalCbm.toFixed(4)} m³` : ''} />
        </>
      )}

      <input type="hidden" name="calculator_summary" value={summaryText} />
    </div>
  );
}
