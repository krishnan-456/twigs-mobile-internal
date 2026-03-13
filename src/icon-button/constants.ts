import type { IconButtonRounded, IconButtonSize } from './types';
import type { LoaderColor, LineLoaderSize, CircleLoaderSize } from '../loader';

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

export interface IconButtonSizeConfig {
  /** Container height/width (square) in dp */
  containerSize: number;
  /** Icon size in dp */
  iconSize: number;
  /** Default squircle border radius in dp */
  borderRadius: number;
}

export const SIZE_CONFIG: Record<IconButtonSize, IconButtonSizeConfig> = {
  sm: { containerSize: 24, iconSize: 16, borderRadius: 4 },
  md: { containerSize: 32, iconSize: 16, borderRadius: 8 },
  lg: { containerSize: 40, iconSize: 20, borderRadius: 8 },
  xl: { containerSize: 48, iconSize: 24, borderRadius: 12 },
  '2xl': { containerSize: 56, iconSize: 32, borderRadius: 16 },
};

export const OUTLINE_BORDER_WIDTH = 1;

export const DISABLED_OPACITY = 0.4;

export const LOADER_COLOR_MAP: Record<string, LoaderColor> = {
  'primary-solid': 'bright',
  'secondary-solid': 'bright',
  'error-solid': 'bright',
  'light-solid': 'bright',
  'default-solid': 'secondary',
  'primary-ghost': 'primary',
  'primary-outline': 'primary',
  'secondary-ghost': 'secondary',
  'secondary-outline': 'secondary',
  'default-ghost': 'secondary',
  'default-outline': 'secondary',
  'error-ghost': 'negative',
  'error-outline': 'negative',
  'light-ghost': 'bright',
  'light-outline': 'bright',
};

export const LINE_LOADER_SIZE_MAP: Record<IconButtonSize, LineLoaderSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'sm',
  xl: 'md',
  '2xl': 'md',
};

export const LINE_LOADER_WIDTH_MAP: Record<IconButtonSize, number> = {
  sm: 16,
  md: 16,
  lg: 20,
  xl: 20,
  '2xl': 24,
};

export const CIRCLE_LOADER_SIZE_MAP: Record<IconButtonSize, CircleLoaderSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'md',
  '2xl': 'lg',
};
