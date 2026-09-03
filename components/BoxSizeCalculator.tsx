'use client';

import { useState, useCallback, type FormEvent } from 'react';
import {
  calculate,
  validateInput,
  fmt,
  type Unit,
  type CalcInput,
  type CalcResult,
} from '../lib/box-calculator';

const UNITS: { value: Unit; label: string }[] = [
  { value: 'mm', label: 'mm' },
  { value: 'cm', label: 'cm' },
  { value: 'inch', label: 'inch' },
];

const EMPTY = { length: '', width: '', height: '', clearance: '3', boardThickness: '2' };

export default function BoxSizeCalculator() {
  const [fields, setFields] = useState(EMPTY);
  const [unit, setUnit] = useState<Unit>('mm');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setError(null);
  };

  const num = (v: string) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : NaN;
  };

  const handleCalc = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setCopied(false);
      const input: Partial<CalcInput> = {
        length: num(fields.length),
        width: num(fields.width),
        height: num(fields.height),
        clearance: num(fields.clearance),
        boardThickness: num(fields.boardThickness),
        unit,
      };
      const err = validateInput(input);
      if (err) { setError(err); setResult(null); return; }
      setError(null);
      setResult(calculate(input as CalcInput));
    },
    [fields, unit],
  );

  const handleReset = useCallback(() => {
    setFields(EMPTY);
    setUnit('mm');
    setResult(null);
    setError(null);
    setCopied(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (!result) return;
    const u = result.unit;
    const text = [
      'MTT Box Size Calculator',
      `Product Size: ${fmt(result.internal.l - 2 * num(fields.clearance))} × ${fmt(result.internal.w - 2 * num(fields.clearance))} × ${fmt(result.internal.h - 2 * num(fields.clearance))} ${u}`,
      `Recommended Internal Box Size: ${fmt(result.internal.l)} × ${fmt(result.internal.w)} × ${fmt(result.internal.h)} ${u}`,
      `Estimated External Size: ${fmt(result.external.l)} × ${fmt(result.external.w)} × ${fmt(result.external.h)} ${u}`,
      `Clearance: ${fields.clearance} ${u} per side`,
      `Board Thickness: ${fields.boardThickness} ${u}`,
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result, fields]);

  return (
    <div className="calc-layout">
      {/* ─── Inputs ─── */}
      <form onSubmit={handleCalc} className="calc-form" noValidate>
        <fieldset className="calc-fieldset">
          <legend>Product Dimensions</legend>
          <div className="calc-grid-3">
            <label className="calc-label">
              <span>Length</span>
              <input type="number" inputMode="decimal" step="any" min="0.01"
                value={fields.length} onChange={set('length')}
                placeholder="120" className="calc-input" required aria-required="true" />
            </label>
            <label className="calc-label">
              <span>Width</span>
              <input type="number" inputMode="decimal" step="any" min="0.01"
                value={fields.width} onChange={set('width')}
                placeholder="60" className="calc-input" required aria-required="true" />
            </label>
            <label className="calc-label">
              <span>Height</span>
              <input type="number" inputMode="decimal" step="any" min="0.01"
                value={fields.height} onChange={set('height')}
                placeholder="40" className="calc-input" required aria-required="true" />
            </label>
          </div>
        </fieldset>

        <fieldset className="calc-fieldset">
          <legend>Packaging Parameters</legend>
          <div className="calc-grid-2">
            <label className="calc-label">
              <span>Clearance per side</span>
              <input type="number" inputMode="decimal" step="any" min="0"
                value={fields.clearance} onChange={set('clearance')}
                placeholder="3" className="calc-input" />
            </label>
            <label className="calc-label">
              <span>Board thickness</span>
              <input type="number" inputMode="decimal" step="any" min="0.01"
                value={fields.boardThickness} onChange={set('boardThickness')}
                placeholder="2" className="calc-input" />
            </label>
          </div>
        </fieldset>

        <fieldset className="calc-fieldset">
          <legend>Unit</legend>
          <div className="calc-units">
            {UNITS.map((u) => (
              <label key={u.value} className={`calc-unit-btn${unit === u.value ? ' calc-unit-active' : ''}`}>
                <input type="radio" name="unit" value={u.value}
                  checked={unit === u.value} onChange={() => setUnit(u.value)} />
                {u.label}
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="calc-error" role="alert">{error}</p>}

        <div className="calc-actions">
          <button type="submit" className="button calc-submit">Calculate Box Size</button>
          <button type="button" className="calc-reset" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {/* ─── Results ─── */}
      <div className="calc-results" aria-live="polite">
        {result ? (
          <>
            <div className="calc-result-primary">
              <p className="calc-result-label">Recommended Internal Box Size</p>
              <p className="calc-result-dims">
                {fmt(result.internal.l)} × {fmt(result.internal.w)} × {fmt(result.internal.h)}
                <span className="calc-result-unit">{result.unit}</span>
              </p>
            </div>

            <div className="calc-result-secondary">
              <div className="calc-result-row">
                <span>Estimated External Size</span>
                <b>{fmt(result.external.l)} × {fmt(result.external.w)} × {fmt(result.external.h)} {result.unit}</b>
              </div>
              <div className="calc-result-row">
                <span>Internal Volume</span>
                <b>{result.internalVolumeDisplay}</b>
              </div>
              <div className="calc-result-row">
                <span>Clearance per Side</span>
                <b>{fields.clearance} {result.unit}</b>
              </div>
              <div className="calc-result-row">
                <span>Board Thickness</span>
                <b>{fields.boardThickness} {result.unit}</b>
              </div>
            </div>

            <button type="button" className="calc-copy" onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy Results'}
            </button>

            <p className="calc-disclaimer">
              Estimated dimensions for preliminary packaging planning. Final dimensions may vary
              by box structure, material thickness, inserts and manufacturing tolerances.
            </p>

            {/* CTA */}
            <div className="calc-cta">
              <h3>Need a Custom Box in This Size?</h3>
              <p>Send us your product dimensions, quantity and packaging requirements. Our team can help develop the box structure, materials, inserts and finishing.</p>
              <a className="button" href="/request-a-quote">Get a Custom Packaging Quote</a>
            </div>
          </>
        ) : (
          <div className="calc-placeholder">
            <div className="calc-placeholder-icon">📦</div>
            <p>Enter your product dimensions and click <b>Calculate Box Size</b> to see recommended packaging dimensions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
