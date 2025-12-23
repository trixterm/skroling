"use client";

import React, { useCallback, useMemo, useState } from "react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Corner configuration for a single grid cell.
 * Each boolean indicates whether that corner should be rounded.
 */
export type Corners = {
  tl: boolean; // top-left
  tr: boolean; // top-right
  br: boolean; // bottom-right
  bl: boolean; // bottom-left
};

/**
 * A grid cell with position and corner configuration.
 */
export type GridCell = {
  x: number;
  y: number;
} & Corners;

/**
 * Nullable cell target used for padding arrays.
 */
export type CellTarget = GridCell | null;

/**
 * Raw corner input that may come from external sources.
 * Supports partial corner definitions.
 */
export type RawCornerInput = {
  x: number;
  y: number;
  tl?: boolean;
  tr?: boolean;
  br?: boolean;
  bl?: boolean;
};

/**
 * Corner override keyed by "x,y" string.
 */
export type CornerOverrideMap = Record<string, Partial<Corners>>;

/**
 * Image analysis result from corner detection.
 */
export type ImageAnalysisResult = {
  gridCols: number;
  gridRows: number;
  cellSize: number;
  filledCells: Array<{ x: number; y: number }>;
  detectedCorners: CornerOverrideMap;
  confidence: number;
};

/**
 * Validation result for corner data.
 */
export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
  sanitized: CornerOverrideMap;
};

// ============================================================================
// CONSTANTS
// ============================================================================

const EPSILON = 1e-10;
const DEFAULT_GRID_COLS = 12;
const DEFAULT_GRID_ROWS = 12;

// ============================================================================
// UPDATED DIGIT DEFINITIONS WITH COMPLETE CORNER OVERRIDES
// ============================================================================

/**
 * Complete corner overrides for all digits 1-5.
 * Based on visual analysis of the uploaded images.
 */
export const DIGIT_CORNER_OVERRIDES: Record<number, CornerOverrideMap> = {
  1: {
    // Top of vertical stem - rounded top-right
    "6,0": { tl: false, tr: true, br: false, bl: false },
    // Base - rounded corners
    "2,10": { tl: true, tr: false, br: false, bl: false },
    "2,11": { tl: false, tr: false, br: false, bl: true },
    "9,10": { tl: false, tr: true, br: false, bl: false },
    "9,11": { tl: false, tr: false, br: true, bl: false },
  },
  2: {
    // Top horizontal bar - rounded top-right
    "7,0": { tl: false, tr: true, br: false, bl: false },
    // Right vertical segment - rounded bottom-right
    "9,4": { tl: false, tr: false, br: true, bl: false },
    // Middle bar - rounded top-left
    "4,5": { tl: true, tr: false, br: false, bl: false },
    // Left vertical segment - rounded corners
    "2,7": { tl: true, tr: false, br: false, bl: false },
    "2,9": { tl: false, tr: false, br: false, bl: true },
    // Bottom bar - rounded bottom-left
    "4,11": { tl: false, tr: false, br: false, bl: true },
  },
  3: {
    // Top bar - rounded top-right
    "7,0": { tl: false, tr: true, br: false, bl: false },
    // First right segment - rounded top-right
    "9,2": { tl: false, tr: true, br: false, bl: false },
    // Middle bar - rounded left corners
    "4,5": { tl: true, tr: false, br: false, bl: false },
    "4,6": { tl: false, tr: false, br: false, bl: true },
    // Bottom right segment - rounded top-right
    "9,7": { tl: false, tr: true, br: false, bl: false },
    // Bottom bar - rounded corners
    "2,10": { tl: true, tr: false, br: false, bl: false },
    "2,11": { tl: false, tr: false, br: false, bl: true },
    "7,11": { tl: false, tr: false, br: true, bl: false },
  },
  4: {
    // Left vertical bar - rounded top-left and bottom-left
    "2,0": { tl: true, tr: false, br: false, bl: false },
    "2,4": { tl: false, tr: false, br: false, bl: true },
    // Right vertical bar - rounded top-right and bottom-right
    "9,0": { tl: false, tr: true, br: false, bl: false },
    "9,11": { tl: false, tr: false, br: true, bl: false },
    // Middle horizontal bar - rounded top-left
    "4,5": { tl: true, tr: false, br: false, bl: false },
  },
  5: {
    // Top bar - rounded top-right
    "8,0": { tl: false, tr: true, br: false, bl: false },
    // Left vertical segment top - rounded top-left
    "4,0": { tl: true, tr: false, br: false, bl: false },
    // Left vertical segment bottom
    "2,4": { tl: false, tr: false, br: false, bl: true },
    // Middle bar connections
    "4,5": { tl: true, tr: false, br: false, bl: false },
    "8,6": { tl: false, tr: false, br: true, bl: false },
    // Right vertical segment
    "9,7": { tl: false, tr: true, br: false, bl: false },
    "9,9": { tl: false, tr: false, br: true, bl: false },
    // Bottom bar
    "3,10": { tl: true, tr: false, br: false, bl: false },
    "3,11": { tl: false, tr: false, br: false, bl: true },
    "7,11": { tl: false, tr: false, br: true, bl: false },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if a number is valid (finite and not NaN).
 */
function isValidNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n) && !Number.isNaN(n);
}

/**
 * Sanitize a coordinate value, returning null if invalid.
 */
function sanitizeCoordinate(
  value: unknown,
  min: number,
  max: number
): number | null {
  if (!isValidNumber(value)) return null;
  if (value < min - EPSILON || value > max + EPSILON) return null;
  return Math.round(value);
}

/**
 * Create a cell key string from coordinates.
 */
export function cellKey(x: number, y: number): string {
  return `${x},${y}`;
}

/**
 * Parse a cell key string back to coordinates.
 */
export function parseKey(key: string): { x: number; y: number } | null {
  const parts = key.split(",");
  if (parts.length !== 2) return null;
  const x = parseInt(parts[0], 10);
  const y = parseInt(parts[1], 10);
  if (!isValidNumber(x) || !isValidNumber(y)) return null;
  return { x, y };
}

/**
 * Create default corners (all false).
 */
export function defaultCorners(): Corners {
  return { tl: false, tr: false, br: false, bl: false };
}

/**
 * Merge partial corners with defaults.
 */
export function mergeCorners(
  base: Corners,
  override?: Partial<Corners>
): Corners {
  if (!override) return { ...base };
  return {
    tl: override.tl ?? base.tl,
    tr: override.tr ?? base.tr,
    br: override.br ?? base.br,
    bl: override.bl ?? base.bl,
  };
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate and sanitize corner input data.
 */
export function validateCornerInput(
  input: unknown,
  gridCols: number = DEFAULT_GRID_COLS,
  gridRows: number = DEFAULT_GRID_ROWS
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const sanitized: CornerOverrideMap = {};

  if (input === null || input === undefined) {
    return { valid: true, errors, warnings, sanitized };
  }

  if (typeof input !== "object") {
    errors.push("Corner input must be an object");
    return { valid: false, errors, warnings, sanitized };
  }

  const record = input as Record<string, unknown>;

  for (const [key, value] of Object.entries(record)) {
    const coords = parseKey(key);

    if (!coords) {
      errors.push(`Invalid key format: "${key}" (expected "x,y")`);
      continue;
    }

    const { x, y } = coords;

    // Validate coordinates are within grid bounds
    if (x < 0 || x >= gridCols) {
      errors.push(`X coordinate out of bounds: ${x} (0-${gridCols - 1})`);
      continue;
    }

    if (y < 0 || y >= gridRows) {
      errors.push(`Y coordinate out of bounds: ${y} (0-${gridRows - 1})`);
      continue;
    }

    if (value === null || value === undefined) {
      warnings.push(`Null/undefined value for key "${key}", skipping`);
      continue;
    }

    if (typeof value !== "object") {
      errors.push(`Invalid corner value for "${key}": expected object`);
      continue;
    }

    const cornerValue = value as Record<string, unknown>;
    const sanitizedCorner: Partial<Corners> = {};

    for (const corner of ["tl", "tr", "br", "bl"] as const) {
      if (corner in cornerValue) {
        const cv = cornerValue[corner];
        if (typeof cv === "boolean") {
          sanitizedCorner[corner] = cv;
        } else if (cv !== undefined && cv !== null) {
          warnings.push(
            `Non-boolean value for "${key}.${corner}", converting to boolean`
          );
          sanitizedCorner[corner] = Boolean(cv);
        }
      }
    }

    if (Object.keys(sanitizedCorner).length > 0) {
      sanitized[key] = sanitizedCorner;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    sanitized,
  };
}

/**
 * Validate a pattern array (string[] where each string is a row).
 */
export function validatePattern(
  pattern: unknown,
  expectedCols: number = DEFAULT_GRID_COLS,
  expectedRows: number = DEFAULT_GRID_ROWS
): { valid: boolean; errors: string[]; pattern: string[] } {
  const errors: string[] = [];

  if (!Array.isArray(pattern)) {
    errors.push("Pattern must be an array of strings");
    return { valid: false, errors, pattern: [] };
  }

  if (pattern.length !== expectedRows) {
    errors.push(
      `Pattern has ${pattern.length} rows, expected ${expectedRows}`
    );
  }

  const sanitizedPattern: string[] = [];

  for (let i = 0; i < pattern.length; i++) {
    const row = pattern[i];

    if (typeof row !== "string") {
      errors.push(`Row ${i} is not a string`);
      sanitizedPattern.push(".".repeat(expectedCols));
      continue;
    }

    if (row.length !== expectedCols) {
      errors.push(
        `Row ${i} has ${row.length} columns, expected ${expectedCols}`
      );
    }

    // Sanitize: only allow '.' and '#'
    let sanitizedRow = "";
    for (let j = 0; j < Math.max(row.length, expectedCols); j++) {
      const char = j < row.length ? row[j] : ".";
      sanitizedRow += char === "#" ? "#" : ".";
    }
    sanitizedPattern.push(sanitizedRow.substring(0, expectedCols));
  }

  // Pad with empty rows if needed
  while (sanitizedPattern.length < expectedRows) {
    sanitizedPattern.push(".".repeat(expectedCols));
  }

  return {
    valid: errors.length === 0,
    errors,
    pattern: sanitizedPattern,
  };
}

// ============================================================================
// PATTERN-TO-TARGETS CONVERSION
// ============================================================================

/**
 * Convert a pattern array to grid cell targets with corner data.
 */
export function patternToTargets(
  pattern: string[],
  cornerOverrides?: CornerOverrideMap
): GridCell[] {
  const overrides = cornerOverrides ?? {};
  const cells: GridCell[] = [];

  for (let y = 0; y < pattern.length; y++) {
    const row = pattern[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== "#") continue;

      const key = cellKey(x, y);
      const override = overrides[key];

      cells.push({
        x,
        y,
        ...mergeCorners(defaultCorners(), override),
      });
    }
  }

  // Sort by row then column for consistent ordering
  cells.sort((a, b) => a.y - b.y || a.x - b.x);

  return cells;
}

/**
 * Pad a cell array to a fixed length with nulls.
 */
export function padToLength(cells: GridCell[], length: number): CellTarget[] {
  const result: CellTarget[] = cells.slice(0, length);
  while (result.length < length) {
    result.push(null);
  }
  return result;
}

// ============================================================================
// CORNER DETECTION FROM PATTERN (Automatic Corner Detection)
// ============================================================================

/**
 * Check if a cell at (x, y) is filled in the pattern.
 */
function isFilled(pattern: string[], x: number, y: number): boolean {
  if (y < 0 || y >= pattern.length) return false;
  const row = pattern[y];
  if (x < 0 || x >= row.length) return false;
  return row[x] === "#";
}

/**
 * Automatically detect which corners should be rounded based on adjacency.
 * A corner is rounded if:
 * - The cell is filled
 * - The adjacent cells in both directions from that corner are NOT filled
 *
 * For example, top-left is rounded if cells to the left and above are empty.
 */
export function detectCornersFromPattern(pattern: string[]): CornerOverrideMap {
  const overrides: CornerOverrideMap = {};

  for (let y = 0; y < pattern.length; y++) {
    const row = pattern[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== "#") continue;

      const left = isFilled(pattern, x - 1, y);
      const right = isFilled(pattern, x + 1, y);
      const up = isFilled(pattern, x, y - 1);
      const down = isFilled(pattern, x, y + 1);

      const corners: Partial<Corners> = {};
      let hasRoundedCorner = false;

      // Top-left: rounded if no cell above and no cell to the left
      if (!up && !left) {
        corners.tl = true;
        hasRoundedCorner = true;
      }

      // Top-right: rounded if no cell above and no cell to the right
      if (!up && !right) {
        corners.tr = true;
        hasRoundedCorner = true;
      }

      // Bottom-right: rounded if no cell below and no cell to the right
      if (!down && !right) {
        corners.br = true;
        hasRoundedCorner = true;
      }

      // Bottom-left: rounded if no cell below and no cell to the left
      if (!down && !left) {
        corners.bl = true;
        hasRoundedCorner = true;
      }

      if (hasRoundedCorner) {
        overrides[cellKey(x, y)] = corners;
      }
    }
  }

  return overrides;
}

/**
 * Merge auto-detected corners with manual overrides.
 * Manual overrides take precedence.
 */
export function mergeCornerOverrides(
  auto: CornerOverrideMap,
  manual: CornerOverrideMap
): CornerOverrideMap {
  const merged: CornerOverrideMap = { ...auto };

  for (const [key, manualCorners] of Object.entries(manual)) {
    if (key in merged) {
      merged[key] = { ...merged[key], ...manualCorners };
    } else {
      merged[key] = manualCorners;
    }
  }

  return merged;
}

// ============================================================================
// GEOMETRIC TRANSFORMATIONS
// ============================================================================

/**
 * 2D point type.
 */
export type Point2D = { x: number; y: number };

/**
 * 3x3 transformation matrix (homogeneous coordinates).
 * Stored as [a, b, c, d, e, f, g, h, i] representing:
 * | a b c |
 * | d e f |
 * | g h i |
 */
export type Matrix3x3 = [
  number, number, number,
  number, number, number,
  number, number, number
];

/**
 * Create an identity matrix.
 */
export function identityMatrix(): Matrix3x3 {
  return [1, 0, 0, 0, 1, 0, 0, 0, 1];
}

/**
 * Create a translation matrix.
 */
export function translationMatrix(tx: number, ty: number): Matrix3x3 {
  return [1, 0, tx, 0, 1, ty, 0, 0, 1];
}

/**
 * Create a scale matrix.
 */
export function scaleMatrix(sx: number, sy: number): Matrix3x3 {
  return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
}

/**
 * Create a rotation matrix (angle in radians).
 */
export function rotationMatrix(angle: number): Matrix3x3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, -s, 0, s, c, 0, 0, 0, 1];
}

/**
 * Multiply two 3x3 matrices.
 */
export function multiplyMatrices(a: Matrix3x3, b: Matrix3x3): Matrix3x3 {
  return [
    a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
    a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
    a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
    a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
    a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
    a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
    a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
    a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
    a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
  ];
}

/**
 * Apply a transformation matrix to a point.
 */
export function transformPoint(m: Matrix3x3, p: Point2D): Point2D {
  const w = m[6] * p.x + m[7] * p.y + m[8];
  if (Math.abs(w) < EPSILON) {
    throw new Error("Division by zero in perspective transformation");
  }
  return {
    x: (m[0] * p.x + m[1] * p.y + m[2]) / w,
    y: (m[3] * p.x + m[4] * p.y + m[5]) / w,
  };
}

/**
 * Convert grid coordinates to pixel coordinates.
 */
export function gridToPixel(
  gridX: number,
  gridY: number,
  cellSize: number,
  offsetX: number = 0,
  offsetY: number = 0
): Point2D {
  return {
    x: gridX * cellSize + offsetX,
    y: gridY * cellSize + offsetY,
  };
}

/**
 * Convert pixel coordinates to grid coordinates.
 */
export function pixelToGrid(
  pixelX: number,
  pixelY: number,
  cellSize: number,
  offsetX: number = 0,
  offsetY: number = 0
): Point2D {
  if (cellSize < EPSILON) {
    throw new Error("Cell size must be greater than zero");
  }
  return {
    x: (pixelX - offsetX) / cellSize,
    y: (pixelY - offsetY) / cellSize,
  };
}

/**
 * Snap a point to the nearest grid intersection.
 */
export function snapToGrid(
  point: Point2D,
  cellSize: number,
  threshold: number = 0.5
): Point2D {
  const gridX = point.x / cellSize;
  const gridY = point.y / cellSize;

  const roundedX = Math.round(gridX);
  const roundedY = Math.round(gridY);

  // Only snap if within threshold
  const snapX =
    Math.abs(gridX - roundedX) < threshold ? roundedX * cellSize : point.x;
  const snapY =
    Math.abs(gridY - roundedY) < threshold ? roundedY * cellSize : point.y;

  return { x: snapX, y: snapY };
}

// ============================================================================
// IMAGE ANALYSIS (Canvas-based corner detection)
// ============================================================================

/**
 * Analyze an image to extract grid cells and detect corners.
 * This uses canvas-based pixel analysis.
 */
export async function analyzeImage(
  imageSource: string | HTMLImageElement | HTMLCanvasElement,
  options: {
    gridCols?: number;
    gridRows?: number;
    threshold?: number; // Darkness threshold (0-255), default 128
  } = {}
): Promise<ImageAnalysisResult> {
  const { gridCols = 12, gridRows = 12, threshold = 128 } = options;

  // Load image if needed
  let img: HTMLImageElement | HTMLCanvasElement;
  if (typeof imageSource === "string") {
    img = await loadImage(imageSource);
  } else {
    img = imageSource;
  }

  // Create canvas and draw image
  const canvas = document.createElement("canvas");
  const width =
    img instanceof HTMLCanvasElement ? img.width : (img as HTMLImageElement).naturalWidth;
  const height =
    img instanceof HTMLCanvasElement ? img.height : (img as HTMLImageElement).naturalHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, width, height);

  // Calculate cell size
  const cellWidth = width / gridCols;
  const cellHeight = height / gridRows;
  const cellSize = Math.min(cellWidth, cellHeight);

  // Detect filled cells
  const filledCells: Array<{ x: number; y: number }> = [];
  const pattern: string[] = [];

  for (let row = 0; row < gridRows; row++) {
    let rowPattern = "";
    for (let col = 0; col < gridCols; col++) {
      const isFilled = isCellFilled(
        imageData,
        col,
        row,
        cellWidth,
        cellHeight,
        threshold
      );

      if (isFilled) {
        filledCells.push({ x: col, y: row });
        rowPattern += "#";
      } else {
        rowPattern += ".";
      }
    }
    pattern.push(rowPattern);
  }

  // Auto-detect corners from the pattern
  const detectedCorners = detectCornersFromPattern(pattern);

  // Calculate confidence based on cell edge clarity
  const confidence = calculateConfidence(
    imageData,
    gridCols,
    gridRows,
    cellWidth,
    cellHeight
  );

  return {
    gridCols,
    gridRows,
    cellSize,
    filledCells,
    detectedCorners,
    confidence,
  };
}

/**
 * Load an image from a URL.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Check if a grid cell is filled (dark) in the image.
 */
function isCellFilled(
  imageData: ImageData,
  col: number,
  row: number,
  cellWidth: number,
  cellHeight: number,
  threshold: number
): boolean {
  const startX = Math.floor(col * cellWidth);
  const startY = Math.floor(row * cellHeight);
  const endX = Math.floor((col + 1) * cellWidth);
  const endY = Math.floor((row + 1) * cellHeight);

  let darkPixels = 0;
  let totalPixels = 0;

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const idx = (y * imageData.width + x) * 4;
      const r = imageData.data[idx];
      const g = imageData.data[idx + 1];
      const b = imageData.data[idx + 2];
      const brightness = (r + g + b) / 3;

      if (brightness < threshold) {
        darkPixels++;
      }
      totalPixels++;
    }
  }

  // Cell is filled if more than 50% of pixels are dark
  return darkPixels / totalPixels > 0.5;
}

/**
 * Calculate confidence score for grid detection.
 */
function calculateConfidence(
  imageData: ImageData,
  gridCols: number,
  gridRows: number,
  cellWidth: number,
  cellHeight: number
): number {
  // Simple heuristic: check edge sharpness at grid lines
  let edgeScore = 0;
  let edgeCount = 0;

  // Check vertical grid lines
  for (let col = 1; col < gridCols; col++) {
    const x = Math.floor(col * cellWidth);
    for (let y = 0; y < imageData.height; y += 10) {
      const idx1 = (y * imageData.width + x - 1) * 4;
      const idx2 = (y * imageData.width + x + 1) * 4;

      const b1 =
        (imageData.data[idx1] +
          imageData.data[idx1 + 1] +
          imageData.data[idx1 + 2]) /
        3;
      const b2 =
        (imageData.data[idx2] +
          imageData.data[idx2 + 1] +
          imageData.data[idx2 + 2]) /
        3;

      edgeScore += Math.abs(b1 - b2) / 255;
      edgeCount++;
    }
  }

  // Check horizontal grid lines
  for (let row = 1; row < gridRows; row++) {
    const y = Math.floor(row * cellHeight);
    for (let x = 0; x < imageData.width; x += 10) {
      const idx1 = ((y - 1) * imageData.width + x) * 4;
      const idx2 = ((y + 1) * imageData.width + x) * 4;

      const b1 =
        (imageData.data[idx1] +
          imageData.data[idx1 + 1] +
          imageData.data[idx1 + 2]) /
        3;
      const b2 =
        (imageData.data[idx2] +
          imageData.data[idx2 + 1] +
          imageData.data[idx2 + 2]) /
        3;

      edgeScore += Math.abs(b1 - b2) / 255;
      edgeCount++;
    }
  }

  return edgeCount > 0 ? Math.min(1, edgeScore / edgeCount) : 0;
}

// ============================================================================
// CORNER MAPPING API
// ============================================================================

/**
 * Main API for mapping corners to grid cells.
 */
export interface CornerMapper {
  /** Get all corner overrides for a digit */
  getCornerOverrides(digit: number): CornerOverrideMap;

  /** Convert a pattern to cell targets with corners */
  patternToCells(pattern: string[], digit?: number): GridCell[];

  /** Validate corner input data */
  validateInput(input: unknown): ValidationResult;

  /** Auto-detect corners from a pattern */
  detectCorners(pattern: string[]): CornerOverrideMap;

  /** Merge auto-detected with manual overrides */
  mergeOverrides(
    auto: CornerOverrideMap,
    manual: CornerOverrideMap
  ): CornerOverrideMap;

  /** Analyze an image to extract grid data */
  analyzeImage(
    source: string | HTMLImageElement | HTMLCanvasElement,
    options?: { gridCols?: number; gridRows?: number; threshold?: number }
  ): Promise<ImageAnalysisResult>;

  /** Transform coordinates */
  gridToPixel(
    x: number,
    y: number,
    cellSize: number,
    offset?: Point2D
  ): Point2D;
  pixelToGrid(
    x: number,
    y: number,
    cellSize: number,
    offset?: Point2D
  ): Point2D;
}

/**
 * Create a corner mapper instance.
 */
export function createCornerMapper(
  customOverrides?: Record<number, CornerOverrideMap>
): CornerMapper {
  const overrides = { ...DIGIT_CORNER_OVERRIDES, ...customOverrides };

  return {
    getCornerOverrides(digit: number): CornerOverrideMap {
      return overrides[digit] ?? {};
    },

    patternToCells(pattern: string[], digit?: number): GridCell[] {
      const cornerData = digit !== undefined ? overrides[digit] : undefined;
      return patternToTargets(pattern, cornerData);
    },

    validateInput(input: unknown): ValidationResult {
      return validateCornerInput(input);
    },

    detectCorners(pattern: string[]): CornerOverrideMap {
      return detectCornersFromPattern(pattern);
    },

    mergeOverrides(
      auto: CornerOverrideMap,
      manual: CornerOverrideMap
    ): CornerOverrideMap {
      return mergeCornerOverrides(auto, manual);
    },

    async analyzeImage(
      source: string | HTMLImageElement | HTMLCanvasElement,
      options?: { gridCols?: number; gridRows?: number; threshold?: number }
    ): Promise<ImageAnalysisResult> {
      return analyzeImage(source, options);
    },

    gridToPixel(
      x: number,
      y: number,
      cellSize: number,
      offset?: Point2D
    ): Point2D {
      return gridToPixel(x, y, cellSize, offset?.x ?? 0, offset?.y ?? 0);
    },

    pixelToGrid(
      x: number,
      y: number,
      cellSize: number,
      offset?: Point2D
    ): Point2D {
      return pixelToGrid(x, y, cellSize, offset?.x ?? 0, offset?.y ?? 0);
    },
  };
}

// ============================================================================
// DEBUG OVERLAY COMPONENT
// ============================================================================

interface DebugOverlayProps {
  pattern: string[];
  cornerOverrides?: CornerOverrideMap;
  cellSize?: number;
  showGrid?: boolean;
  showCorners?: boolean;
  showCoordinates?: boolean;
}

/**
 * Debug overlay component for visualizing grid cells and corners.
 */
export function DebugOverlay({
  pattern,
  cornerOverrides,
  cellSize = 40,
  showGrid = true,
  showCorners = true,
  showCoordinates = false,
}: DebugOverlayProps) {
  const rows = pattern.length;
  const cols = pattern[0]?.length ?? 0;

  const width = cols * cellSize;
  const height = rows * cellSize;

  const cells = useMemo(
    () => patternToTargets(pattern, cornerOverrides),
    [pattern, cornerOverrides]
  );

  const cornerRadius = cellSize * 0.45;

  return (
    <div
      className="relative bg-white border border-gray-300"
      style={{ width, height }}
    >
      {/* Grid lines */}
      {showGrid && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={height}
        >
          {/* Vertical lines */}
          {Array.from({ length: cols + 1 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={i * cellSize}
              y1={0}
              x2={i * cellSize}
              y2={height}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: rows + 1 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * cellSize}
              x2={width}
              y2={i * cellSize}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}
        </svg>
      )}

      {/* Filled cells */}
      {cells.map((cell) => (
        <div
          key={cellKey(cell.x, cell.y)}
          className="absolute bg-gray-800"
          style={{
            left: cell.x * cellSize,
            top: cell.y * cellSize,
            width: cellSize,
            height: cellSize,
            borderTopLeftRadius: cell.tl ? cornerRadius : 0,
            borderTopRightRadius: cell.tr ? cornerRadius : 0,
            borderBottomRightRadius: cell.br ? cornerRadius : 0,
            borderBottomLeftRadius: cell.bl ? cornerRadius : 0,
          }}
        >
          {showCoordinates && (
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-mono">
              {cell.x},{cell.y}
            </span>
          )}
        </div>
      ))}

      {/* Corner indicators */}
      {showCorners &&
        cells.map((cell) => (
          <React.Fragment key={`corners-${cellKey(cell.x, cell.y)}`}>
            {cell.tl && (
              <div
                className="absolute w-2 h-2 bg-blue-500 rounded-full"
                style={{
                  left: cell.x * cellSize - 4,
                  top: cell.y * cellSize - 4,
                }}
                title="TL"
              />
            )}
            {cell.tr && (
              <div
                className="absolute w-2 h-2 bg-green-500 rounded-full"
                style={{
                  left: (cell.x + 1) * cellSize - 4,
                  top: cell.y * cellSize - 4,
                }}
                title="TR"
              />
            )}
            {cell.br && (
              <div
                className="absolute w-2 h-2 bg-red-500 rounded-full"
                style={{
                  left: (cell.x + 1) * cellSize - 4,
                  top: (cell.y + 1) * cellSize - 4,
                }}
                title="BR"
              />
            )}
            {cell.bl && (
              <div
                className="absolute w-2 h-2 bg-yellow-500 rounded-full"
                style={{
                  left: cell.x * cellSize - 4,
                  top: (cell.y + 1) * cellSize - 4,
                }}
                title="BL"
              />
            )}
          </React.Fragment>
        ))}
    </div>
  );
}

// ============================================================================
// INTERACTIVE CORNER EDITOR COMPONENT
// ============================================================================

interface CornerEditorProps {
  pattern: string[];
  initialOverrides?: CornerOverrideMap;
  cellSize?: number;
  onChange?: (overrides: CornerOverrideMap) => void;
}

/**
 * Interactive corner editor component.
 */
export function CornerEditor({
  pattern,
  initialOverrides = {},
  cellSize = 40,
  onChange,
}: CornerEditorProps) {
  const [overrides, setOverrides] = useState<CornerOverrideMap>(() => ({
    ...initialOverrides,
  }));

  const [selectedCell, setSelectedCell] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const rows = pattern.length;
  const cols = pattern[0]?.length ?? 0;
  const width = cols * cellSize;
  const height = rows * cellSize;

  const cells = useMemo(
    () => patternToTargets(pattern, overrides),
    [pattern, overrides]
  );

  const filledSet = useMemo(() => {
    const set = new Set<string>();
    cells.forEach((c) => set.add(cellKey(c.x, c.y)));
    return set;
  }, [cells]);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (!filledSet.has(cellKey(x, y))) return;
      setSelectedCell({ x, y });
    },
    [filledSet]
  );

  const toggleCorner = useCallback(
    (corner: keyof Corners) => {
      if (!selectedCell) return;

      const key = cellKey(selectedCell.x, selectedCell.y);
      const currentOverride = overrides[key] ?? {};
      const currentValue = currentOverride[corner] ?? false;

      const newOverrides = {
        ...overrides,
        [key]: {
          ...currentOverride,
          [corner]: !currentValue,
        },
      };

      setOverrides(newOverrides);
      onChange?.(newOverrides);
    },
    [selectedCell, overrides, onChange]
  );

  const selectedCellData = selectedCell
    ? cells.find((c) => c.x === selectedCell.x && c.y === selectedCell.y)
    : null;

  const cornerRadius = cellSize * 0.45;

  return (
    <div className="flex gap-4">
      {/* Grid */}
      <div
        className="relative bg-white border border-gray-300 cursor-pointer"
        style={{ width, height }}
      >
        {/* Grid lines */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={height}
        >
          {Array.from({ length: cols + 1 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={i * cellSize}
              y1={0}
              x2={i * cellSize}
              y2={height}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: rows + 1 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * cellSize}
              x2={width}
              y2={i * cellSize}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}
        </svg>

        {/* Cells */}
        {cells.map((cell) => {
          const isSelected =
            selectedCell?.x === cell.x && selectedCell?.y === cell.y;

          return (
            <div
              key={cellKey(cell.x, cell.y)}
              className={`absolute transition-all ${
                isSelected ? "bg-blue-600" : "bg-gray-800"
              }`}
              style={{
                left: cell.x * cellSize,
                top: cell.y * cellSize,
                width: cellSize,
                height: cellSize,
                borderTopLeftRadius: cell.tl ? cornerRadius : 0,
                borderTopRightRadius: cell.tr ? cornerRadius : 0,
                borderBottomRightRadius: cell.br ? cornerRadius : 0,
                borderBottomLeftRadius: cell.bl ? cornerRadius : 0,
              }}
              onClick={() => handleCellClick(cell.x, cell.y)}
            />
          );
        })}
      </div>

      {/* Corner controls */}
      <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg min-w-48">
        <h3 className="font-semibold text-gray-700">Corner Editor</h3>

        {selectedCell ? (
          <>
            <p className="text-sm text-gray-600">
              Cell: ({selectedCell.x}, {selectedCell.y})
            </p>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                type="button"
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  selectedCellData?.tl
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
                onClick={() => toggleCorner("tl")}
              >
                TL
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  selectedCellData?.tr
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
                onClick={() => toggleCorner("tr")}
              >
                TR
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  selectedCellData?.bl
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
                onClick={() => toggleCorner("bl")}
              >
                BL
              </button>
              <button
                type="button"
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  selectedCellData?.br
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
                onClick={() => toggleCorner("br")}
              >
                BR
              </button>
            </div>

            <div className="mt-4 p-2 bg-white rounded border border-gray-200">
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(overrides, null, 2)}
              </pre>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">Click a cell to edit corners</p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  patternToTargets,
  padToLength,
  detectCornersFromPattern,
  mergeCornerOverrides,
  validateCornerInput,
  validatePattern,
  gridToPixel,
  pixelToGrid,
  snapToGrid,
  transformPoint,
  identityMatrix,
  translationMatrix,
  scaleMatrix,
  rotationMatrix,
  multiplyMatrices,
  analyzeImage,
  cellKey,
  parseKey,
  defaultCorners,
  mergeCorners,
};

// Default export: create a mapper with built-in digit overrides
export default createCornerMapper();