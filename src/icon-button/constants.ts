import type { IconButtonRounded } from './types';

/** Border radius per rounded variant (aligned with Avatar tokens). */
export const ROUNDED_RADII: Record<IconButtonRounded, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const DEFAULT_ROUNDED: IconButtonRounded = 'full';
