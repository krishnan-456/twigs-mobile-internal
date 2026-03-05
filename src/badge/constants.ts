import type { BadgeSize, BadgeColor, BadgeRounded } from './types';

interface SizeConfig {
  height: number;
  paddingHorizontal: number;
  fontSize: number;
  lineHeight: number;
  iconSize: number;
  gap: number;
}

/** Size configuration from Figma BadgePill spec */
export const SIZE_CONFIG: Record<BadgeSize, SizeConfig> = {
  sm: {
    height: 24,
    paddingHorizontal: 8,
    fontSize: 12,
    lineHeight: 16,
    iconSize: 12,
    gap: 0,
  },
  md: {
    height: 32,
    paddingHorizontal: 8,
    fontSize: 14,
    lineHeight: 20,
    iconSize: 16,
    gap: 0,
  },
};

/** Border radius per rounded variant (aligned with Avatar tokens). */
export const ROUNDED_RADII: Record<BadgeRounded, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

/** Background color token keys per color variant (solid fill) */
export const COLOR_BG_MAP: Record<BadgeColor, string> = {
  default: 'neutral100',
  white: 'white900',
  primary: 'primary50',
  secondary: 'secondary600',
  accent: 'accent100',
  positive: 'positive100',
  negative: 'negative100',
  attention: 'warning100',
};

/** Text color token keys per color variant */
export const COLOR_TEXT_MAP: Record<BadgeColor, string> = {
  default: 'neutral900',
  white: 'neutral900',
  primary: 'primary700',
  secondary: 'white900',
  accent: 'accent800',
  positive: 'positive800',
  negative: 'negative800',
  attention: 'warning800',
};

/** Border color token keys — only 'white' has a visible border */
export const COLOR_BORDER_MAP: Record<BadgeColor, string | null> = {
  default: null,
  white: 'neutral200',
  primary: null,
  secondary: null,
  accent: null,
  positive: null,
  negative: null,
  attention: null,
};

export const DEFAULT_SIZE: BadgeSize = 'sm';
export const DEFAULT_COLOR: BadgeColor = 'default';
export const DEFAULT_ROUNDED: BadgeRounded = 'full';
