import type { LineLoaderSize, CircleLoaderSize } from './types';

/** Line loader track dimensions per size (width × height in dp). */
export const LINE_LOADER_DIMENSIONS: Record<LineLoaderSize, { width: number; height: number }> = {
  sm: { width: 24, height: 4 },
  md: { width: 24, height: 5 },
  lg: { width: 24, height: 6 },
  xl: { width: 24, height: 8 },
};

/** Circle loader diameter per size (in dp). Aligned with web twigs token mapping. */
export const CIRCLE_LOADER_DIAMETERS: Record<CircleLoaderSize, number> = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
};

/** Stroke width for circle loader border, scaling slightly for larger sizes. */
export const CIRCLE_STROKE_WIDTHS: Record<CircleLoaderSize, number> = {
  xs: 1.5,
  sm: 1.5,
  md: 2,
  lg: 2,
  xl: 2.5,
  '2xl': 3,
  '3xl': 3,
};
