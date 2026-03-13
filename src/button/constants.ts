import type { ButtonSize, ButtonVariant } from './types';

export interface SizeConfig {
  paddingHorizontal: number;
  height: number;
  width: number | 'auto';
  borderRadius: number;
  fontSize: number;
  iconSize: number;
  labelPaddingHorizontal: number;
}

export interface ColorConfig {
  background: string;
  text: string;
  pressedBackground: string;
  pressedText: string;
  border?: string;
  pressedBorder?: string;
}

export interface ColorConfigMap {
  [key: string]: {
    [variant in ButtonVariant]: ColorConfig;
  };
}

const buildSizeConfig = (
  pH: number,
  height: number,
  iconWidth: number,
  borderRadius: number,
  fontSize: number,
  iconSize: number,
  labelPH: number
): { normal: SizeConfig; icon: SizeConfig } => ({
  normal: {
    paddingHorizontal: pH,
    height,
    width: 'auto',
    borderRadius,
    fontSize,
    iconSize,
    labelPaddingHorizontal: labelPH,
  },
  icon: {
    paddingHorizontal: 0,
    height,
    width: iconWidth,
    borderRadius,
    fontSize,
    iconSize,
    labelPaddingHorizontal: 0,
  },
});

const SIZE_DATA = {
  sm: buildSizeConfig(4, 24, 24, 4, 12, 16, 2),
  md: buildSizeConfig(8, 32, 32, 8, 12, 16, 2),
  lg: buildSizeConfig(8, 40, 40, 8, 14, 16, 4),
  xl: buildSizeConfig(16, 48, 48, 12, 16, 20, 4),
  '2xl': buildSizeConfig(20, 56, 56, 16, 18, 24, 8),
} as const;

export const getButtonSizeConfig = (size: ButtonSize, isIcon: boolean): SizeConfig =>
  isIcon ? SIZE_DATA[size].icon : SIZE_DATA[size].normal;

export const ICON_SIZES: Record<ButtonSize, number> = {
  sm: 16,
  md: 16,
  lg: 16,
  xl: 20,
  '2xl': 24,
};

export const ICON_ONLY_SIZES: Record<ButtonSize, number> = {
  sm: 16,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
};

export const ICON_SPACING: Record<ButtonSize, number> = {
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
  '2xl': 8,
};

export const LINE_LOADER_WIDTH_MAP: Record<ButtonSize, number> = {
  sm: 16,
  md: 16,
  lg: 20,
  xl: 20,
  '2xl': 24,
};

export const OUTLINE_BORDER_WIDTH = 1;
