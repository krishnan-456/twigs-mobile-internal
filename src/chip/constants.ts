import type { ThemeColors } from '../theme';
import type { ChipSize, ChipColor, ChipVariant, ChipRounded } from './types';

interface SizeConfig {
  height: number;
  paddingHorizontal: number;
  fontSize: number;
  lineHeight: number;
  iconSize: number;
  closeIconSize: number;
}


interface SolidColorTokens {
  bg: keyof ThemeColors;
  text: keyof ThemeColors;
  close: keyof ThemeColors;
}

interface OutlineBorderTokens {
  baseColor: keyof ThemeColors;
  opacity: number;
  close: keyof ThemeColors;
}

interface SelectableTokens {
  baseColor: keyof ThemeColors;
  activeBorder: keyof ThemeColors;
}

/** Size configuration from Figma mobile design */
export const SIZE_CONFIG: Record<ChipSize, SizeConfig> = {
  sm: {
    height: 24,
    paddingHorizontal: 8,
    fontSize: 12,
    lineHeight: 16,
    iconSize: 16,
    closeIconSize: 14,
  },
  md: {
    height: 32,
    paddingHorizontal: 8,
    fontSize: 14,
    lineHeight: 20,
    iconSize: 16,
    closeIconSize: 16,
  },
};

/** Border radius per rounded variant (aligned with Avatar tokens). */
export const ROUNDED_RADII: Record<ChipRounded, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

/** Solid variant color tokens (from twigs-web Chip) */
export const SOLID_COLORS: Record<ChipColor, SolidColorTokens> = {
  default: { bg: 'neutral100', text: 'neutral900', close: 'neutral500' },
  primary: { bg: 'primary50', text: 'primary700', close: 'primary400' },
  secondary: { bg: 'secondary500', text: 'white900', close: 'white800' },
  error: { bg: 'negative100', text: 'negative800', close: 'negative600' },
  warning: { bg: 'warning100', text: 'warning800', close: 'warning700' },
  success: { bg: 'positive100', text: 'positive800', close: 'positive600' },
  accent: { bg: 'accent100', text: 'accent800', close: 'accent500' },
};

/** Outline variant border + close tokens (from twigs-web Chip compound variants) */
export const OUTLINE_COLORS: Record<ChipColor, OutlineBorderTokens> = {
  default: { baseColor: 'black900', opacity: 0.15, close: 'black500' },
  primary: { baseColor: 'primary500', opacity: 0.2, close: 'primary500' },
  secondary: { baseColor: 'secondary500', opacity: 0.2, close: 'secondary500' },
  error: { baseColor: 'negative500', opacity: 0.2, close: 'negative500' },
  warning: { baseColor: 'warning500', opacity: 0.2, close: 'warning500' },
  success: { baseColor: 'positive500', opacity: 0.2, close: 'positive500' },
  accent: { baseColor: 'accent500', opacity: 0.2, close: 'accent500' },
};

/** Selectable state tokens for pressed/active backgrounds (from twigs-web compound variants) */
export const SELECTABLE_COLORS: Record<ChipColor, SelectableTokens> = {
  default: { baseColor: 'black900', activeBorder: 'black400' },
  primary: { baseColor: 'primary500', activeBorder: 'primary400' },
  secondary: { baseColor: 'secondary500', activeBorder: 'secondary400' },
  error: { baseColor: 'negative600', activeBorder: 'negative400' },
  warning: { baseColor: 'warning600', activeBorder: 'warning400' },
  success: { baseColor: 'positive500', activeBorder: 'positive400' },
  accent: { baseColor: 'accent500', activeBorder: 'accent400' },
};

export const DEFAULT_SIZE: ChipSize = 'sm';
export const DEFAULT_COLOR: ChipColor = 'default';
export const DEFAULT_VARIANT: ChipVariant = 'solid';
export const DEFAULT_ROUNDED: ChipRounded = 'sm';
