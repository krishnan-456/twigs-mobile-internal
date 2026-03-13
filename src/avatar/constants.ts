import type { AvatarSize, AvatarSizeProp } from './types';

export const AVATAR_DIMENSIONS: Record<AvatarSizeProp, { width: number; height: number }> = {
  xxs: { width: 20, height: 20 },
  xs: { width: 24, height: 24 },
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
  xl: { width: 56, height: 56 },
  '2xl': { width: 80, height: 80 },
  '3xl': { width: 120, height: 120 },
};

export const AVATAR_FONT_SIZES: Record<AvatarSizeProp, number> = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
};

export const AVATAR_ANONYMOUS_BORDER_WIDTHS: Record<AvatarSizeProp, number> = {
  xxs: 1,
  xs: 1,
  sm: 1,
  md: 1.5,
  lg: 1.5,
  xl: 1.5,
  '2xl': 2,
  '3xl': 2,
};

export const AVATAR_BORDER_RADII: Record<AvatarSize, number> = {
  xxs: 4,
  xs: 4,
  sm: 8,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 32,
  full: 999,
};

export const DEFAULT_AVATAR_NAME = '?';
