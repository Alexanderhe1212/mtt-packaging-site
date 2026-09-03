'use client';

import { useState, useCallback, type FormEvent } from 'react';
import {
  calculate,
  validateInput,
  fmt,
  buildHandoff,
  formatHandoffText,
  calculateSheetLayout,
  calculateCbm,
  getWarnings,
  getProductTypeLabel,
  getPackagingTypeLabel,
  getInsertLabel,
  PACKAGING_DEFAULTS,
  CALC_HANDOFF_KEY,
  PRODUCT_TYPES,
  PACKAGING_TYPES,
  INSERT_OPTIONS,
  UNITS,
  type Unit,
  type CalcInput,
  type CalcResult,
  type CalcHandoff,
  type CalcWarning,
  type SheetLayoutResult,
  type CbmResult,
  type PackagingType,
  type InsertOption,
} from '../lib/box-calculator';

const EMPTY_FIELDS = {
  productType: '' as string,
  length: '',
  width: '',
  height: '',
  packagingType: '' as string,
  clearance: '3',
  boardThickness: '2',
  insert: '' as string,
  quantity: '',
};

export default function BoxSizeCalculator() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [unit, setUnit] = useState<Unit>('mm');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<CalcWarning[]>([]);
  const [copied, setCopied] = useState(false);

  // Advanced: Sheet Layout
  const [sheetW, setSheetW] = useState('');
  const [sheetH, setSheetH] = useState('');
  const [dieW, setDieW] = useState('');
  const [dieH, setDieH] = useState('');
  const [sheetResult, setSheetResult] = useState<SheetLayoutResult | null>(null);
  const [sheetError, setSheetError] = useState<string | null>(null);

  // Advanced: CBM
  const [cartonL, setCartonL] = useState('');
  const [cartonW, setCartonW] = useState('');
  const [cartonH, setCartonH] = useState('');
  const [cartonUnit, setCartonUnit] = useState<Unit>('cm');
  const [numCartons, setNumCartons] = useState('');
  const [cbmResult, setCbmResult] = useState<CbmResult | null>(null);
  const [cbmError, setCbmError] = useState<string | null>(null);

  const set = (key: keyof typeof EMPTY_FIELDS) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setError(null);
  };

  const num = (v: string) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : NaN;
  };

  // Apply packaging type defaults
  const handlePackagingChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value as PackagingType;
      setFields((f) => {
        const defaults = PACKAGING_DEFAULTS[val] || PACKAGING_DEFAULTS.not_sure;
        return {
          ...f,
          packagingType: val,
          // Only set defaults if the user hasn't already customized
          clearance: f.clearance === '3' || f.clearance === '2' || f.clearance === '' ? defaults.clearance : f.clearance,
          boardThickness: f.boardThickness === '2' || f.boardThickness === '0.5' || f.boardThickness === '3' || f.boardThickness === '' ? defaults.boardThickness : f.boardThickness,
        };
      });
      setError(null);
    },
    [],
  );

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
      if (err) {
        setError(err);
        setResult(null);
        setWarnings([]);
        return;
      }
      setError(null);
      setResult(calculate(input as CalcInput));
      setWarnings(getWarnings(fields.boardThickness, unit));
    },
    [fields, unit],
  );

  const handleReset = useCallback(() => {
    setFields(EMPTY_FIELDS);
    setUnit('mm');
    setResult(null);
    setError(null);
    setWarnings([]);
    setCopied(false);
    // Reset advanced
    setSheetW(''); setSheetH(''); setDieW(''); setDieH('');
    setSheetResult(null); setSheetError(null);
    setCartonL(''); setCartonW(''); setCartonH(''); setCartonUnit('cm'); setNumCartons('');
    setCbmResult(null); setCbmError(null);
  }, []);

  const buildHandoffData = (): CalcHandoff => {
    if (!result) throw new Error('No result');
    const base = buildHandoff(fields, result);
    if (sheetResult) {
      base.sheetLayoutUsed = true;
      base.sheetParentW = sheetW;
      base.sheetParentH = sheetH;
      base.sheetDieW = dieW;
      base.sheetDieH = dieH;
      base.bestUps = sheetResult.bestUps;
      base.bestOrientation = sheetResult.bestOrientation;
      base.utilization = sheetResult.utilization;
      base.waste = sheetResult.waste;
      base.sheetsRequired = sheetResult.sheetsRequired;
    }
    if (cbmResult) {
      base.cbmUsed = true;
      base.cartonL = cartonL;
      base.cartonW = cartonW;
      base.cartonH = cartonH;
      base.cartonUnit = cartonUnit;
      base.numCartons = parseInt(numCartons) || 0;
      base.cbmPerCarton = cbmResult.cbmPerCarton;
      base.totalCbm = cbmResult.totalCbm;
    }
    return base;
  };

  const handleCopy = useCallback(() => {
    if (!result) return;
    const handoff = buildHandoffData();
    const text = ['MTT Packaging Calculator', formatHandoffText(handoff)].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result, fields, sheetResult, cbmResult, unit, cartonUnit, sheetW, sheetH, dieW, dieH, cartonL, cartonW, cartonH, numCartons]);

  const handleQuoteCta = useCallback(() => {
    if (!result) return;
    const handoff = buildHandoffData();
    try {
      sessionStorage.setItem(CALC_HANDOFF_KEY, JSON.stringify(handoff));
    } catch {}
    window.location.href = '/request-a-quote';
  }, [result, fields, sheetResult, cbmResult, unit, cartonUnit, sheetW, sheetH, dieW, dieH, cartonL, cartonW, cartonH, numCartons]);

  // Sheet layout handler
  const handleSheetCalc = useCallback(() => {
    const sw = num(sheetW), sh = num(sheetH), dw = num(dieW), dh = num(dieH);
    const qty = result ? parseInt(getQuantityNumber()) : 0;
    if (!isFinite(sw) || !isFinite(sh) || !isFinite(dw) || !isFinite(dh) || sw <= 0 || sh <= 0 || dw <= 0 || dh <= 0) {
      setSheetError('Please enter valid sheet and dieline dimensions.');
      setSheetResult(null);
      return;
    }
    if (!qty || qty <= 0) {
      setSheetError('Please enter a quantity above the calculator first.');
      setSheetResult(null);
      return;
    }
    setSheetError(null);
    const res = calculateSheetLayout({ sheetW: sw, sheetH: sh, dieW: dw, dieH: dh, quantity: qty });
    setSheetResult(res);
    if (!res) {
      setSheetError('Dieline does not fit on the parent sheet in either orientation.');
    }
  }, [sheetW, sheetH, dieW, dieH, fields.quantity, result]);

  // CBM handler
  const handleCbmCalc = useCallback(() => {
    const cl = num(cartonL), cw = num(cartonW), ch = num(cartonH);
    const nc = parseInt(numCartons);
    if (!isFinite(cl) || !isFinite(cw) || !isFinite(ch) || cl <= 0 || cw <= 0 || ch <= 0) {
      setCbmError('Please enter valid carton dimensions.');
      setCbmResult(null);
      return;
    }
    if (!nc || nc <= 0) {
      setCbmError('Please enter the number of cartons.');
      setCbmResult(null);
      return;
    }
    setCbmError(null);
    setCbmResult(calculateCbm({ cartonL: cl, cartonW: cw, cartonH: ch, cartonUnit, numCartons: nc }));
  }, [cartonL, cartonW, cartonH, cartonUnit, numCartons]);

  const getQuantityNumber = (): string => {
    if (!fields.quantity) return '';
    const match = fields.quantity.match(/[\d,]+/);
    if (!match) return '';
    return match[0].replace(/,/g, '');
  };

  const productDims = result
    ? `${fmt(result.internal.l - 2 * num(fields.clearance))} × ${fmt(result.internal.w - 2 * num(fields.clearance))} × ${fmt(result.internal.h - 2 * num(fields.clearance))}`
    : '';

  return (
    <div className="calc-v2-layout">
      {/* ─── Step-Based Form ─── */}
      <form onSubmit={handleCalc} className="calc-v2-form" noValidate>
        {/* Step 1: Product Input */}
        <div className="calc-v2-step">
          <div className="calc-v2-step-header">
            <span className="calc-v2-step-num">01</span>
            <div>
              <h3 className="calc-v2-step-title">Product Input</h3>
              <p className="calc-v2-step-desc">What are you packaging?</p>
            </div>
          </div>

          <div className="calc-v2-step-body">
            <label className="calc-v2-label">
              <span>Product Category</span>
              <select
                value={fields.productType}
                onChange={set('productType')}
                className="calc-v2-select"
              >
                <option value="">Select product type</option>
                {PRODUCT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </label>

            <div className="calc-v2-label">
              <span>Product Dimensions ({unit === 'inch' ? 'L × W × H (in)' : `L × W × H (${unit})`})</span>
              <div className="calc-v2-dims">
                <div className="calc-v2-dim-input">
                  <input type="number" inputMode="decimal" step="any" min="0.01"
                    value={fields.length} onChange={set('length')}
                    placeholder={unit === 'mm' ? '123' : unit === 'cm' ? '12.3' : '4.84'}
                    className="calc-v2-input" required aria-required="true" />
                  <span className="calc-v2-dim-unit">{unit === 'inch' ? 'in' : unit}</span>
                </div>
                <span className="calc-v2-dim-sep">×</span>
                <div className="calc-v2-dim-input">
                  <input type="number" inputMode="decimal" step="any" min="0.01"
                    value={fields.width} onChange={set('width')}
                    placeholder={unit === 'mm' ? '23' : unit === 'cm' ? '2.3' : '0.91'}
                    className="calc-v2-input" required aria-required="true" />
                  <span className="calc-v2-dim-unit">{unit === 'inch' ? 'in' : unit}</span>
                </div>
                <span className="calc-v2-dim-sep">×</span>
                <div className="calc-v2-dim-input">
                  <input type="number" inputMode="decimal" step="any" min="0.01"
                    value={fields.height} onChange={set('height')}
                    placeholder={unit === 'mm' ? '42' : unit === 'cm' ? '4.2' : '1.65'}
                    className="calc-v2-input" required aria-required="true" />
                  <span className="calc-v2-dim-unit">{unit === 'inch' ? 'in' : unit}</span>
                </div>
              </div>
            </div>

            <label className="calc-v2-label">
              <span>Quantity</span>
              <select value={fields.quantity} onChange={set('quantity')} className="calc-v2-select">
                <option value="">Not specified</option>
                <option value="500–999 pcs">500–999 pcs</option>
                <option value="1,000–2,999 pcs">1,000–2,999 pcs</option>
                <option value="3,000–4,999 pcs">3,000–4,999 pcs</option>
                <option value="5,000–9,999 pcs">5,000–9,999 pcs</option>
                <option value="10,000+ pcs">10,000+ pcs</option>
              </select>
            </label>
          </div>
        </div>

        {/* Step 2: Packaging */}
        <div className="calc-v2-step">
          <div className="calc-v2-step-header">
            <span className="calc-v2-step-num">02</span>
            <div>
              <h3 className="calc-v2-step-title">Packaging</h3>
              <p className="calc-v2-step-desc">Choose your packaging type and parameters</p>
            </div>
          </div>

          <div className="calc-v2-step-body">
            <label className="calc-v2-label">
              <span>Packaging Type</span>
              <select
                value={fields.packagingType}
                onChange={handlePackagingChange}
                className="calc-v2-select"
              >
                <option value="">Select packaging type</option>
                {PACKAGING_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </label>

            <div className="calc-v2-grid-2">
              <label className="calc-v2-label">
                <span>
                  Clearance per side
                  <span className="calc-v2-hint-icon" title="Space between your product and the inner wall of the box. Rigid boxes with inserts typically use 2–3 mm per side.">?</span>
                </span>
                <div className="calc-v2-dim-input">
                  <input type="number" inputMode="decimal" step="any" min="0"
                    value={fields.clearance} onChange={set('clearance')}
                    placeholder="3" className="calc-v2-input" />
                  <span className="calc-v2-dim-unit">{unit === 'inch' ? 'in' : unit}</span>
                </div>
              </label>
              <label className="calc-v2-label">
                <span>
                  Board Thickness
                  <span className="calc-v2-hint-icon" title="The material thickness of one wall of the box. Rigid boxes typically use 1.5–2.5 mm board; folding cartons use 0.3–0.6 mm.">?</span>
                </span>
                <div className="calc-v2-dim-input">
                  <input type="number" inputMode="decimal" step="any" min="0.01"
                    value={fields.boardThickness} onChange={set('boardThickness')}
                    placeholder="2" className="calc-v2-input" />
                  <span className="calc-v2-dim-unit">{unit === 'inch' ? 'in' : unit}</span>
                </div>
              </label>
            </div>

            <label className="calc-v2-label">
              <span>Insert</span>
              <div className="calc-v2-radio-row">
                {INSERT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`calc-v2-radio-btn${fields.insert === opt.value ? ' calc-v2-radio-active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="insert"
                      value={opt.value}
                      checked={fields.insert === opt.value}
                      onChange={set('insert')}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </label>
          </div>
        </div>

        {/* Step 3: Unit & Calculate */}
        <div className="calc-v2-step">
          <div className="calc-v2-step-header">
            <span className="calc-v2-step-num">03</span>
            <div>
              <h3 className="calc-v2-step-title">Unit</h3>
              <p className="calc-v2-step-desc">All dimensions will use this unit</p>
            </div>
          </div>

          <div className="calc-v2-step-body">
            <div className="calc-v2-unit-row">
              {UNITS.map((u) => (
                <label
                  key={u.value}
                  className={`calc-v2-unit-btn${unit === u.value ? ' calc-v2-unit-active' : ''}`}
                >
                  <input
                    type="radio"
                    name="unit"
                    value={u.value}
                    checked={unit === u.value}
                    onChange={() => setUnit(u.value)}
                  />
                  <strong>{u.label}</strong>
                  <small>{u.hint}</small>
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="calc-v2-error" role="alert">{error}</p>}

        {warnings.length > 0 && (
          <div className="calc-v2-warnings">
            {warnings.map((w, i) => (
              <p key={i} className="calc-v2-warning" role="status">
                <span className="calc-v2-warning-icon">⚠</span>
                {w.message}
              </p>
            ))}
          </div>
        )}

        <div className="calc-v2-actions">
          <button type="submit" className="button calc-v2-submit">Calculate Packaging Plan</button>
          <button type="button" className="calc-v2-reset" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {/* ─── Results Panel ─── */}
      <div className="calc-v2-results" aria-live="polite">
        {result ? (
          <>
            {/* Primary Result */}
            <div className="calc-v2-result-header">
              <p className="calc-v2-result-kicker">Your Packaging Plan</p>
              <p className="calc-v2-result-label">Recommended Internal Box Size</p>
              <p className="calc-v2-result-dims">
                {fmt(result.internal.l)} <span className="calc-v2-dim-sep-result">×</span> {fmt(result.internal.w)} <span className="calc-v2-dim-sep-result">×</span> {fmt(result.internal.h)}
                <span className="calc-v2-result-unit">{result.unit}</span>
              </p>
            </div>

            {/* Formula explanation */}
            <div className="calc-v2-formula-strip">
              <div className="calc-v2-formula-step">
                <span className="calc-v2-formula-label">Product</span>
                <span className="calc-v2-formula-value">{productDims} {result.unit}</span>
              </div>
              <span className="calc-v2-formula-arrow">+</span>
              <div className="calc-v2-formula-step">
                <span className="calc-v2-formula-label">Clearance</span>
                <span className="calc-v2-formula-value">{fields.clearance} {result.unit} /side</span>
              </div>
              <span className="calc-v2-formula-arrow">→</span>
              <div className="calc-v2-formula-step calc-v2-formula-highlight">
                <span className="calc-v2-formula-label">Internal</span>
                <span className="calc-v2-formula-value">{fmt(result.internal.l)} × {fmt(result.internal.w)} × {fmt(result.internal.h)} {result.unit}</span>
              </div>
              <span className="calc-v2-formula-arrow">+</span>
              <div className="calc-v2-formula-step">
                <span className="calc-v2-formula-label">Board</span>
                <span className="calc-v2-formula-value">{fields.boardThickness} {result.unit}</span>
              </div>
              <span className="calc-v2-formula-arrow">→</span>
              <div className="calc-v2-formula-step">
                <span className="calc-v2-formula-label">External</span>
                <span className="calc-v2-formula-value">{fmt(result.external.l)} × {fmt(result.external.w)} × {fmt(result.external.h)} {result.unit}</span>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="calc-v2-metrics">
              <div className="calc-v2-metric">
                <span>Product Size</span>
                <b>{productDims} {result.unit}</b>
              </div>
              <div className="calc-v2-metric">
                <span>Estimated External Size</span>
                <b>{fmt(result.external.l)} × {fmt(result.external.w)} × {fmt(result.external.h)} {result.unit}</b>
              </div>
              {fields.productType && (
                <div className="calc-v2-metric">
                  <span>Product Type</span>
                  <b>{getProductTypeLabel(fields.productType)}</b>
                </div>
              )}
              {fields.packagingType && (
                <div className="calc-v2-metric">
                  <span>Packaging Type</span>
                  <b>{getPackagingTypeLabel(fields.packagingType)}</b>
                </div>
              )}
              {fields.quantity && (
                <div className="calc-v2-metric">
                  <span>Quantity</span>
                  <b>{fields.quantity}</b>
                </div>
              )}
              {fields.insert && (
                <div className="calc-v2-metric">
                  <span>Insert</span>
                  <b>{getInsertLabel(fields.insert)}</b>
                </div>
              )}
              <div className="calc-v2-metric">
                <span>Clearance per Side</span>
                <b>{fields.clearance} {result.unit}</b>
              </div>
              <div className="calc-v2-metric">
                <span>Board Thickness</span>
                <b>{fields.boardThickness} {result.unit}</b>
              </div>
              <div className="calc-v2-metric">
                <span>Volume</span>
                <b>{result.internalVolumeDisplay}</b>
              </div>
            </div>

            {/* Copy */}
            <div className="calc-v2-result-actions">
              <button type="button" className="calc-v2-copy" onClick={handleCopy}>
                {copied ? '✓ Copied' : 'Copy Results'}
              </button>
            </div>

            {/* Advanced Planning (collapsed) */}
            <details className="calc-v2-advanced">
              <summary className="calc-v2-advanced-header">
                <div>
                  <span className="calc-v2-advanced-kicker">Optional</span>
                  <strong>Advanced Packaging Planning</strong>
                </div>
                <span className="calc-v2-advanced-chevron">▸</span>
              </summary>

              <div className="calc-v2-advanced-body">
                {/* A. Sheet Layout */}
                <div className="calc-v2-adv-section">
                  <h4 className="calc-v2-adv-title">A. Sheet Layout</h4>
                  <p className="calc-v2-adv-desc">Calculate how many dielines fit per parent sheet</p>

                  <div className="calc-v2-grid-2">
                    <label className="calc-v2-label">
                      <span>Parent Sheet W × H ({unit === 'inch' ? 'in' : unit})</span>
                      <div className="calc-v2-dims compact">
                        <input type="number" inputMode="decimal" step="any" min="0.01"
                          value={sheetW} onChange={(e) => setSheetW(e.target.value)}
                          placeholder={unit === 'mm' ? '720' : unit === 'cm' ? '72' : '28.35'}
                          className="calc-v2-input" />
                        <span className="calc-v2-dim-sep">×</span>
                        <input type="number" inputMode="decimal" step="any" min="0.01"
                          value={sheetH} onChange={(e) => setSheetH(e.target.value)}
                          placeholder={unit === 'mm' ? '1020' : unit === 'cm' ? '102' : '40.16'}
                          className="calc-v2-input" />
                      </div>
                    </label>
                    <label className="calc-v2-label">
                      <span>Dieline W × H ({unit === 'inch' ? 'in' : unit})</span>
                      <div className="calc-v2-dims compact">
                        <input type="number" inputMode="decimal" step="any" min="0.01"
                          value={dieW} onChange={(e) => setDieW(e.target.value)}
                          placeholder={unit === 'mm' ? '280' : unit === 'cm' ? '28' : '11.02'}
                          className="calc-v2-input" />
                        <span className="calc-v2-dim-sep">×</span>
                        <input type="number" inputMode="decimal" step="any" min="0.01"
                          value={dieH} onChange={(e) => setDieH(e.target.value)}
                          placeholder={unit === 'mm' ? '190' : unit === 'cm' ? '19' : '7.48'}
                          className="calc-v2-input" />
                      </div>
                    </label>
                  </div>

                  <button type="button" className="calc-v2-adv-btn" onClick={handleSheetCalc}>
                    Calculate Sheet Layout
                  </button>

                  {sheetError && <p className="calc-v2-error" role="alert">{sheetError}</p>}

                  {sheetResult && (
                    <div className="calc-v2-adv-result">
                      <div className="calc-v2-metric-grid">
                        <div className="calc-v2-adv-metric">
                          <span>Best UPS</span>
                          <b>{sheetResult.bestUps}</b>
                        </div>
                        <div className="calc-v2-adv-metric">
                          <span>Orientation</span>
                          <b>{sheetResult.bestOrientation}</b>
                        </div>
                        <div className="calc-v2-adv-metric">
                          <span>0° UPS</span>
                          <b>{sheetResult.ups0}</b>
                        </div>
                        <div className="calc-v2-adv-metric">
                          <span>90° UPS</span>
                          <b>{sheetResult.ups90}</b>
                        </div>
                        <div className="calc-v2-adv-metric">
                          <span>Utilization</span>
                          <b>{fmt(sheetResult.utilization)}%</b>
                        </div>
                        <div className="calc-v2-adv-metric">
                          <span>Waste</span>
                          <b>{fmt(sheetResult.waste)}%</b>
                        </div>
                        <div className="calc-v2-adv-metric">
                          <span>Sheets Required</span>
                          <b>{sheetResult.sheetsRequired}</b>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* B. Shipping / CBM */}
                <div className="calc-v2-adv-section">
                  <h4 className="calc-v2-adv-title">B. Shipping / CBM</h4>
                  <p className="calc-v2-adv-desc">Calculate cubic metres for freight planning</p>

                  <div className="calc-v2-grid-2">
                    <label className="calc-v2-label">
                      <span>Master Carton L × W × H</span>
                      <div className="calc-v2-dims compact">
                        <input type="number" inputMode="decimal" step="any" min="0.01"
                          value={cartonL} onChange={(e) => setCartonL(e.target.value)}
                          placeholder="60" className="calc-v2-input" />
                        <span className="calc-v2-dim-sep">×</span>
                        <input type="number" inputMode="decimal" step="any" min="0.01"
                          value={cartonW} onChange={(e) => setCartonW(e.target.value)}
                          placeholder="40" className="calc-v2-input" />
                        <span className="calc-v2-dim-sep">×</span>
                        <input type="number" inputMode="decimal" step="any" min="0.01"
                          value={cartonH} onChange={(e) => setCartonH(e.target.value)}
                          placeholder="30" className="calc-v2-input" />
                      </div>
                    </label>
                    <div className="calc-v2-grid-2" style={{ gap: '12px' }}>
                      <label className="calc-v2-label">
                        <span>Unit</span>
                        <select value={cartonUnit} onChange={(e) => setCartonUnit(e.target.value as Unit)} className="calc-v2-select">
                          {UNITS.map((u) => (
                            <option key={u.value} value={u.value}>{u.label}</option>
                          ))}
                        </select>
                      </label>
                      <label className="calc-v2-label">
                        <span>Number of Cartons</span>
                        <input type="number" inputMode="numeric" step="1" min="1"
                          value={numCartons} onChange={(e) => setNumCartons(e.target.value)}
                          placeholder="10" className="calc-v2-input" />
                      </label>
                    </div>
                  </div>

                  <button type="button" className="calc-v2-adv-btn" onClick={handleCbmCalc}>
                    Calculate CBM
                  </button>

                  {cbmError && <p className="calc-v2-error" role="alert">{cbmError}</p>}

                  {cbmResult && (
                    <div className="calc-v2-adv-result">
                      <div className="calc-v2-metric-grid">
                        <div className="calc-v2-adv-metric">
                          <span>CBM per Carton</span>
                          <b>{fmt(cbmResult.cbmPerCarton)} m³</b>
                        </div>
                        <div className="calc-v2-adv-metric">
                          <span>Total CBM</span>
                          <b>{fmt(cbmResult.totalCbm)} m³</b>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </details>

            {/* Quote CTA */}
            <div className="calc-v2-quote-cta">
              <p className="calc-v2-quote-cta-label">Ready to Produce?</p>
              <h4 className="calc-v2-quote-cta-title">Use This Packaging Plan for a Custom Quote</h4>
              <p className="calc-v2-quote-cta-desc">Your calculator results will be attached automatically.</p>
              <button type="button" className="button calc-v2-quote-btn" onClick={handleQuoteCta}>
                Get a Custom Quote →
              </button>
            </div>

            <p className="calc-v2-disclaimer">
              Estimated dimensions for preliminary packaging planning. Final dimensions may vary
              by box structure, material, inserts and manufacturing tolerances.
            </p>
          </>
        ) : (
          <div className="calc-v2-placeholder">
            <div className="calc-v2-placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="20" width="48" height="36" rx="2" stroke="#8a9a8d" strokeWidth="2" fill="none" />
                <path d="M8 26h48" stroke="#8a9a8d" strokeWidth="2" />
                <path d="M20 20v36M44 20v36" stroke="#8a9a8d" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M8 38h48" stroke="#8a9a8d" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
            <h4>Your Packaging Plan</h4>
            <p>Enter your product dimensions and packaging preferences, then click <b>Calculate Packaging Plan</b> to see your recommended box dimensions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
