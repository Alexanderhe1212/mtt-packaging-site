/**
 * Box Size Calculator — core dimension math.
 *
 * Formulas implemented independently for MTT Packaging tools.
 * Conceptually similar to Packrift/box-size-reference (MIT) but
 * written from first principles; no third-party code is copied.
 */

export type Unit = 'mm' | 'cm' | 'inch';

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
