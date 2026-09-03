/**
 * MTT Packaging Calculator V2 — core dimension math, sheet layout, CBM.
 *
 * Formulas implemented independently for MTT Packaging tools.
 * Sheet layout uses simple independent-orientation geometry.
 * CBM uses standard volume mathematics (L × W × H).
 *
 * CBM formula concept is common domain knowledge; if any logic
 * is derived from AccioWork/cbm-calculator (MIT), the MIT notice
 * is preserved below.
 *
 * MIT License — AccioWork/cbm-calculator (MIT © Accio)
 * https://github.com/AccioWork/cbm-calculator
 * Only standard CBM volume math is referenced: CBM = L_m × W_m × H_m.
 */

/* ─── Units ─── */

export type Unit = 'mm' | 'cm' | 'inch';

export const UNITS: { value: Unit; label: string; hint: string }[] = [
  { value: 'mm', label: 'mm', hint: 'Millimetres' },
  { value: 'cm', label: 'cm', hint: 'Centimetres' },
  { value: 'inch', label: 'inch', hint: 'Inches (25.4 mm)' },
];

/** Conversion factors to mm */
const TO_MM: Record<Unit, number> = { mm: 1, cm: 10, inch: 25.4 };

/** Convert a value from the given unit to mm */
export function toMm(value: number, unit: Unit): number {
  return value * TO_MM[unit];
}

/** Convert a value in mm to the given unit */
export function fromMm(mm: number, unit: Unit): number {
  return mm / TO_MM[unit];
}

/** Format a dimension value: up to 2 decimals, strip trailing zeros */
export function fmt(n: number): string {
  return Number(n.toFixed(2)).toString();
}

/* ─── Product & Packaging Types ─── */

export type ProductType =
  | 'perfume'
  | 'cosmetics'
  | 'jewelry'
  | 'gift'
  | 'other'
  | '';

export type PackagingType =
  | 'rigid'
  | 'folding'
  | 'corrugated'
  | 'not_sure'
  | '';

export type InsertOption = 'yes' | 'no' | 'not_sure' | '';

export const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'perfume', label: 'Perfume' },
  { value: 'cosmetics', label: 'Cosmetics / Skincare' },
  { value: 'jewelry', label: 'Jewelry / Watch' },
  { value: 'gift', label: 'Gift / PR Kit' },
  { value: 'other', label: 'Other' },
];

export const PACKAGING_TYPES: { value: PackagingType; label: string }[] = [
  { value: 'rigid', label: 'Rigid Box' },
  { value: 'folding', label: 'Folding Carton' },
  { value: 'corrugated', label: 'Corrugated Box' },
  { value: 'not_sure', label: 'Not Sure' },
];

export const INSERT_OPTIONS: { value: InsertOption; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not_sure', label: 'Not Sure' },
];

/** Default clearance and board thickness by packaging type */
export const PACKAGING_DEFAULTS: Record<string, { clearance: string; boardThickness: string }> = {
  rigid: { clearance: '3', boardThickness: '2' },
  folding: { clearance: '2', boardThickness: '0.5' },
  corrugated: { clearance: '3', boardThickness: '3' },
  not_sure: { clearance: '3', boardThickness: '2' },
};

/* ─── Warnings ─── */

export interface CalcWarning {
  field: string;
  message: string;
}

const BOARD_WARN_THRESHOLD_MM = 20; // above this, warn

/**
 * Generate non-blocking sanity warnings.
 * Warnings are advisory — they never prevent calculation.
 */
export function getWarnings(
  boardThicknessRaw: string,
  boardThicknessUnit: Unit,
): CalcWarning[] {
  const warnings: CalcWarning[] = [];
  const btMm = toMm(parseFloat(boardThicknessRaw) || 0, boardThicknessUnit);

  if (btMm > BOARD_WARN_THRESHOLD_MM) {
    const display = fmt(fromMm(btMm, boardThicknessUnit));
    const unitLabel = boardThicknessUnit;
    warnings.push({
      field: 'boardThickness',
      message: `Please check this value — ${display} ${unitLabel} (${fmt(btMm)} mm) is unusually thick for most paper-based packaging.`,
    });
  }

  return warnings;
}

/* ─── Core Calculation ─── */

export interface CalcInput {
  length: number;
  width: number;
  height: number;
  clearance: number;   // per side
  boardThickness: number;
  unit: Unit;
}

export interface CalcResult {
  internal: { l: number; w: number; h: number };
  external: { l: number; w: number; h: number };
  internalVolume: number;      // in unit³
  internalVolumeDisplay: string;
  unit: Unit;
}

/**
 * Main calculation.
 *
 * For each dimension:
 *   internal  = product + (2 × clearance)
 *   external  = internal + (2 × boardThickness)
 */
export function calculate(input: CalcInput): CalcResult {
  const { length, width, height, clearance, boardThickness, unit } = input;

  const il = length + 2 * clearance;
  const iw = width + 2 * clearance;
  const ih = height + 2 * clearance;

  const el = il + 2 * boardThickness;
  const ew = iw + 2 * boardThickness;
  const eh = ih + 2 * boardThickness;

  const volCubicUnits = il * iw * ih;
  const internalVolumeDisplay = formatVolume(volCubicUnits, unit);

  return {
    internal: { l: il, w: iw, h: ih },
    external: { l: el, w: ew, h: eh },
    internalVolume: volCubicUnits,
    internalVolumeDisplay,
    unit,
  };
}

/** Format volume intelligently based on unit */
function formatVolume(vol: number, unit: Unit): string {
  if (unit === 'mm') {
    const cm3 = vol / 1000;
    if (cm3 >= 1000) {
      const liters = cm3 / 1000;
      return `${fmt(liters)} L (${fmt(cm3)} cm³)`;
    }
    return `${fmt(cm3)} cm³`;
  }
  if (unit === 'cm') {
    if (vol >= 1000) {
      const liters = vol / 1000;
      return `${fmt(liters)} L (${fmt(vol)} cm³)`;
    }
    return `${fmt(vol)} cm³`;
  }
  // inch
  return `${fmt(vol)} in³`;
}

/** Validate a single dimension value */
export function isValidDimension(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v > 0;
}

/** Validate all required inputs */
export function validateInput(input: Partial<CalcInput>): string | null {
  if (!isValidDimension(input.length)) return 'Length must be a positive number.';
  if (!isValidDimension(input.width)) return 'Width must be a positive number.';
  if (!isValidDimension(input.height)) return 'Height must be a positive number.';
  if (input.clearance == null || !Number.isFinite(input.clearance) || input.clearance < 0)
    return 'Clearance must be zero or a positive number.';
  if (!isValidDimension(input.boardThickness))
    return 'Board thickness must be a positive number.';
  return null;
}

/* ─── Sheet Layout Calculator ─── */

export interface SheetLayoutInput {
  sheetW: number;
  sheetH: number;
  dieW: number;
  dieH: number;
  quantity: number;
}

export interface SheetLayoutResult {
  bestUps: number;
  bestOrientation: '0°' | '90°';
  ups0: number;
  ups90: number;
  utilization: number; // percentage
  waste: number;       // percentage
  sheetsRequired: number;
}

/**
 * Calculate sheet layout ups (units per sheet) for 0° and 90° orientations.
 * Uses simple floor-based calculation — no nesting.
 */
export function calculateSheetLayout(input: SheetLayoutInput): SheetLayoutResult | null {
  const { sheetW, sheetH, dieW, dieH, quantity } = input;
  if (sheetW <= 0 || sheetH <= 0 || dieW <= 0 || dieH <= 0 || quantity <= 0) return null;

  // 0° orientation: dieW along sheetW, dieH along sheetH
  const cols0 = Math.floor(sheetW / dieW);
  const rows0 = Math.floor(sheetH / dieH);
  const ups0 = cols0 * rows0;

  // 90° orientation: dieH along sheetW, dieW along sheetH
  const cols90 = Math.floor(sheetW / dieH);
  const rows90 = Math.floor(sheetH / dieW);
  const ups90 = cols90 * rows90;

  const bestUps = Math.max(ups0, ups90);
  if (bestUps === 0) return null;

  const bestOrientation: '0°' | '90°' = ups90 > ups0 ? '90°' : '0°';
  const sheetArea = sheetW * sheetH;
  const dieArea = dieW * dieH;
  const utilization = (bestUps * dieArea / sheetArea) * 100;
  const waste = 100 - utilization;
  const sheetsRequired = Math.ceil(quantity / bestUps);

  return {
    bestUps,
    bestOrientation,
    ups0,
    ups90,
    utilization,
    waste,
    sheetsRequired,
  };
}

/* ─── CBM Calculator ─── */

export interface CbmInput {
  cartonL: number;
  cartonW: number;
  cartonH: number;
  cartonUnit: Unit;
  numCartons: number;
}

export interface CbmResult {
  cbmPerCarton: number;
  totalCbm: number;
  cartonVolumeDisplay: string;
}

/**
 * Calculate CBM (cubic metres) for shipping.
 * Standard formula: CBM = (L_m × W_m × H_m).
 *
 * Derived from common CBM calculation methodology.
 * If referencing AccioWork/cbm-calculator (MIT © Accio):
 *   https://github.com/AccioWork/cbm-calculator — MIT License.
 */
export function calculateCbm(input: CbmInput): CbmResult | null {
  const { cartonL, cartonW, cartonH, cartonUnit, numCartons } = input;
  if (cartonL <= 0 || cartonW <= 0 || cartonH <= 0 || numCartons <= 0) return null;

  // Convert to metres
  const lM = toMm(cartonL, cartonUnit) / 1000;
  const wM = toMm(cartonW, cartonUnit) / 1000;
  const hM = toMm(cartonH, cartonUnit) / 1000;

  const cbmPerCarton = lM * wM * hM;
  const totalCbm = cbmPerCarton * numCartons;

  return {
    cbmPerCarton,
    totalCbm,
    cartonVolumeDisplay: `${fmt(cbmPerCarton)} m³`,
  };
}

/* ─── Handoff to Quote Form ─── */

/** Data shape passed from calculator to quote form via sessionStorage */
export const CALC_HANDOFF_KEY = 'mtt_calc_handoff';

export interface CalcHandoff {
  // Product info
  productType: string;
  productLength: string;
  productWidth: string;
  productHeight: string;
  unit: Unit;
  // Packaging
  packagingType: string;
  clearance: string;
  boardThickness: string;
  insert: string;
  quantity: string;
  // Results
  internalL: string;
  internalW: string;
  internalH: string;
  externalL: string;
  externalW: string;
  externalH: string;
  volumeDisplay: string;
  // Advanced: Sheet Layout (optional)
  sheetLayoutUsed: boolean;
  sheetParentW?: string;
  sheetParentH?: string;
  sheetDieW?: string;
  sheetDieH?: string;
  bestUps?: number;
  bestOrientation?: string;
  utilization?: number;
  waste?: number;
  sheetsRequired?: number;
  // Advanced: CBM (optional)
  cbmUsed: boolean;
  cartonL?: string;
  cartonW?: string;
  cartonH?: string;
  cartonUnit?: Unit;
  numCartons?: number;
  cbmPerCarton?: number;
  totalCbm?: number;
}

/** Build a handoff object from current calculator state */
export function buildHandoff(
  fields: {
    productType: string;
    length: string;
    width: string;
    height: string;
    packagingType: string;
    clearance: string;
    boardThickness: string;
    insert: string;
    quantity: string;
  },
  result: CalcResult,
): CalcHandoff {
  return {
    productType: fields.productType,
    productLength: fmt(result.internal.l - 2 * parseFloat(fields.clearance)),
    productWidth: fmt(result.internal.w - 2 * parseFloat(fields.clearance)),
    productHeight: fmt(result.internal.h - 2 * parseFloat(fields.clearance)),
    unit: result.unit,
    packagingType: fields.packagingType,
    clearance: fields.clearance,
    boardThickness: fields.boardThickness,
    insert: fields.insert,
    quantity: fields.quantity,
    internalL: fmt(result.internal.l),
    internalW: fmt(result.internal.w),
    internalH: fmt(result.internal.h),
    externalL: fmt(result.external.l),
    externalW: fmt(result.external.w),
    externalH: fmt(result.external.h),
    volumeDisplay: result.internalVolumeDisplay,
    sheetLayoutUsed: false,
    cbmUsed: false,
  };
}

/** Format a handoff into the text block for Formspree / copy */
export function formatHandoffText(h: CalcHandoff): string {
  const lines = [
    '— MTT Packaging Calculator Result —',
    h.productType ? `Product Type: ${getProductTypeLabel(h.productType)}` : null,
    `Product Size: ${h.productLength} × ${h.productWidth} × ${h.productHeight} ${h.unit}`,
    `Packaging Type: ${getPackagingTypeLabel(h.packagingType)}`,
    `Recommended Internal Box Size: ${h.internalL} × ${h.internalW} × ${h.internalH} ${h.unit}`,
    `Estimated External Box Size: ${h.externalL} × ${h.externalW} × ${h.externalH} ${h.unit}`,
    `Clearance: ${h.clearance} ${h.unit} per side`,
    `Board Thickness: ${h.boardThickness} ${h.unit}`,
    `Insert: ${getInsertLabel(h.insert)}`,
    h.quantity ? `Quantity: ${h.quantity}` : null,
    `Volume: ${h.volumeDisplay}`,
  ];

  if (h.sheetLayoutUsed) {
    lines.push('— Sheet Layout —');
    lines.push(`Parent Sheet: ${h.sheetParentW} × ${h.sheetParentH} ${h.unit}`);
    lines.push(`Dieline: ${h.sheetDieW} × ${h.sheetDieH} ${h.unit}`);
    lines.push(`Best UPS: ${h.bestUps} (${h.bestOrientation})`);
    lines.push(`Utilization: ${h.utilization ? fmt(h.utilization) : '—'}%`);
    lines.push(`Sheets Required: ${h.sheetsRequired}`);
  }

  if (h.cbmUsed) {
    lines.push('— Shipping / CBM —');
    lines.push(`Master Carton: ${h.cartonL} × ${h.cartonW} × ${h.cartonH} ${h.cartonUnit}`);
    lines.push(`Cartons: ${h.numCartons}`);
    lines.push(`CBM per Carton: ${h.cbmPerCarton ? fmt(h.cbmPerCarton) : '—'} m³`);
    lines.push(`Total CBM: ${h.totalCbm ? fmt(h.totalCbm) : '—'} m³`);
  }

  return lines.filter(Boolean).join('\n');
}

/** Lookup helpers */
export function getProductTypeLabel(v: string): string {
  return PRODUCT_TYPES.find((t) => t.value === v)?.label || v || 'Not specified';
}

export function getPackagingTypeLabel(v: string): string {
  return PACKAGING_TYPES.find((t) => t.value === v)?.label || v || 'Not specified';
}

export function getInsertLabel(v: string): string {
  return INSERT_OPTIONS.find((t) => t.value === v)?.label || v || 'Not specified';
}
