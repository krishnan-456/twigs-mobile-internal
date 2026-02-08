import type { ViewStyle } from 'react-native';
import type { ButtonSize, ButtonVariant } from './types';

// ── Internal interfaces (not exported from index.ts) ──

export interface SizeConfig {
  paddingVertical: number;
  paddingHorizontal: number;
  height: number;
  width: number | 'auto';
  borderRadius: number;
  fontSize: number;
  iconSize: number;
}

export interface ColorConfig {
  background: string;
  text: string;
  pressedBackground: string;
  border?: string;
}

export interface ColorConfigMap {
  [key: string]: {
    [variant in ButtonVariant]: ColorConfig;
  };
}

// ── Static size data ──

const buildSizeConfig = (
  pV: number,
  pH: number,
  height: number,
  iconWidth: number,
  borderRadius: number,
  fontSize: number,
  iconSize: number
): { normal: SizeConfig; icon: SizeConfig } => ({
  normal: { paddingVertical: pV, paddingHorizontal: pH, height, width: 'auto', borderRadius, fontSize, iconSize },
  icon: { paddingVertical: 0, paddingHorizontal: 0, height, width: iconWidth, borderRadius, fontSize, iconSize },
});

const SIZE_DATA = {
  xxs: buildSizeConfig(2, 4, 16, 16, 4, 10, 14),
  xs: buildSizeConfig(2, 6, 20, 20, 4, 12, 14),
  sm: buildSizeConfig(2, 8, 24, 24, 4, 14, 16),
  md: buildSizeConfig(6, 12, 32, 32, 8, 14, 20),
  lg: buildSizeConfig(8, 16, 40, 40, 8, 16, 20),
  xl: buildSizeConfig(10, 20, 44, 48, 12, 16, 24),
  '2xl': buildSizeConfig(18, 28, 64, 64, 16, 16, 24),
} as const;

/** Resolved size config for a given button size + icon mode. */
export const getButtonSizeConfig = (size: ButtonSize, isIcon: boolean): SizeConfig =>
  isIcon ? SIZE_DATA[size].icon : SIZE_DATA[size].normal;

/** Loader bar dimensions per button size. */
export const LOADER_SIZES: Record<ButtonSize, { width: number; height: number }> = {
  xxs: { width: 12, height: 3 },
  xs: { width: 14, height: 3 },
  sm: { width: 16, height: 3 },
  md: { width: 20, height: 4 },
  lg: { width: 20, height: 4 },
  xl: { width: 24, height: 4 },
  '2xl': { width: 24, height: 4 },
};

/** Icon pixel size per button size. */
export const ICON_SIZES: Record<ButtonSize, number> = {
  xxs: 14,
  xs: 14,
  sm: 16,
  md: 24,
  lg: 24,
  xl: 24,
  '2xl': 24,
};

/** Spacing (margin) between icon/loader and text per button size. */
export const ICON_SPACING: Record<ButtonSize, number> = {
  xxs: 2,
  xs: 2,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  '2xl': 8,
};
