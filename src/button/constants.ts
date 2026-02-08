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
  normal: {
    paddingVertical: pV,
    paddingHorizontal: pH,
    height,
    width: 'auto',
    borderRadius,
    fontSize,
    iconSize,
  },
  icon: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height,
    width: iconWidth,
    borderRadius,
    fontSize,
    iconSize,
  },
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

/**
 * Border width for the outline variant, varying by size to match the web library.
 * Web uses `$xs` (1px) for xxs–sm, `1.5px` for md, and `$sm` (2px) for lg–2xl.
 */
export const OUTLINE_BORDER_WIDTHS: Record<ButtonSize, number> = {
  xxs: 1,
  xs: 1,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 2,
  '2xl': 2,
};
