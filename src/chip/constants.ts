import type { ThemeColors } from '../theme';
import type { ChipSize, ChipColor, ChipRounded } from './types';

interface SizeConfig {
  height: number;
  paddingHorizontal: number;
  fontSize: number;
  lineHeight: number;
  iconSize: number;
}

interface ChipColorTokens {
  regularBg: keyof ThemeColors;
  regularBorder: keyof ThemeColors;
  regularText: keyof ThemeColors;
  pressedBgBase: keyof ThemeColors;
  pressedBgOpacity: number;
  pressedBorder: keyof ThemeColors;
  pressedText: keyof ThemeColors;
  activeBg: keyof ThemeColors | null;
  activeBgBase: keyof ThemeColors | null;
  activeBgOpacity: number;
  activeBorder: keyof ThemeColors | null;
  activeText: keyof ThemeColors;
}

export const SIZE_CONFIG: Record<ChipSize, SizeConfig> = {
  sm: {
    height: 24,
    paddingHorizontal: 8,
    fontSize: 12,
    lineHeight: 16,
    iconSize: 16,
  },
  md: {
    height: 32,
    paddingHorizontal: 8,
    fontSize: 14,
    lineHeight: 20,
    iconSize: 16,
  },
  lg: {
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 20,
    iconSize: 16,
  },
};

export const ROUNDED_RADII: Record<ChipRounded, number> = {
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

export const COLOR_TOKENS: Record<ChipColor, ChipColorTokens> = {
  secondary: {
    regularBg: 'white900',
    regularBorder: 'secondary100',
    regularText: 'secondary800',
    pressedBgBase: 'secondary500',
    pressedBgOpacity: 0.08,
    pressedBorder: 'secondary200',
    pressedText: 'secondary800',
    activeBg: 'secondary700',
    activeBgBase: null,
    activeBgOpacity: 0,
    activeBorder: null,
    activeText: 'white900',
  },
  primary: {
    regularBg: 'white900',
    regularBorder: 'secondary100',
    regularText: 'secondary800',
    pressedBgBase: 'secondary500',
    pressedBgOpacity: 0.08,
    pressedBorder: 'secondary200',
    pressedText: 'secondary800',
    activeBg: null,
    activeBgBase: 'primary500',
    activeBgOpacity: 0.08,
    activeBorder: 'primary500',
    activeText: 'primary500',
  },
};

export const DEFAULT_SIZE: ChipSize = 'sm';
export const DEFAULT_COLOR: ChipColor = 'secondary';
export const DEFAULT_ROUNDED: ChipRounded = 'xs';
