import type { AvatarSize, AvatarSizeProp } from './types';

export const AVATAR_DIMENSIONS: Record<AvatarSizeProp, { width: number; height: number }> = {
  xs: { width: 20, height: 20 },
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 40, height: 40 },
  xl: { width: 48, height: 48 },
  '2xl': { width: 56, height: 56 },
  '3xl': { width: 64, height: 64 },
  '4xl': { width: 72, height: 72 },
  '5xl': { width: 120, height: 120 },
};

export const AVATAR_FONT_SIZES: Record<AvatarSizeProp, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 19.2,
  '2xl': 19.2,
  '3xl': 19.2,
  '4xl': 23.04,
  '5xl': 39.808,
};

/** Border radius per rounded variant. */
export const AVATAR_BORDER_RADII: Record<AvatarSize, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 999,
};
