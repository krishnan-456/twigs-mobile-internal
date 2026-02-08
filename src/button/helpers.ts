import type { TextStyle, ViewStyle } from 'react-native';
import { createTextStyle, colorOpacity } from '../utils';
import type { TwigsTheme } from '../theme';
import type { ButtonSize, ButtonColor, ButtonVariant } from './types';
import { getButtonSizeConfig, ICON_SIZES, ICON_SPACING, type ColorConfigMap } from './constants';

// ── Size helpers ──

export const getSizeStyles = (size: ButtonSize, isIcon: boolean): ViewStyle => {
  const config = getButtonSizeConfig(size, isIcon);

  const styleObj: ViewStyle = {
    height: config.height,
    borderRadius: config.borderRadius,
    paddingVertical: config.paddingVertical,
    paddingHorizontal: config.paddingHorizontal,
  };

  if (isIcon && typeof config.width === 'number') {
    styleObj.width = config.width;
  }

  return styleObj;
};

// ── Color helpers ──

export const getColorStyles = (
  color: ButtonColor,
  variant: ButtonVariant,
  theme: TwigsTheme
): ViewStyle => {
  const colorConfig: ColorConfigMap = {
    primary: {
      solid: { background: theme.colors.primary500, text: theme.colors.white900, pressedBackground: theme.colors.primary600 },
      ghost: { background: 'transparent', text: theme.colors.primary500, pressedBackground: colorOpacity(theme.colors.primary500, 0.10) },
      outline: { background: theme.colors.white900, text: theme.colors.primary500, border: colorOpacity(theme.colors.primary500, 0.40), pressedBackground: colorOpacity(theme.colors.primary500, 0.05) },
    },
    secondary: {
      solid: { background: theme.colors.secondary500, text: theme.colors.white900, pressedBackground: theme.colors.secondary600 },
      ghost: { background: 'transparent', text: theme.colors.secondary500, pressedBackground: colorOpacity(theme.colors.secondary500, 0.10) },
      outline: { background: theme.colors.white900, text: theme.colors.secondary500, border: colorOpacity(theme.colors.secondary500, 0.20), pressedBackground: colorOpacity(theme.colors.secondary500, 0.05) },
    },
    default: {
      solid: { background: colorOpacity(theme.colors.secondary500, 0.08), text: theme.colors.secondary600, pressedBackground: colorOpacity(theme.colors.secondary500, 0.20) },
      ghost: { background: 'transparent', text: theme.colors.secondary600, pressedBackground: colorOpacity(theme.colors.secondary500, 0.15) },
      outline: { background: theme.colors.white900, text: theme.colors.secondary600, border: colorOpacity(theme.colors.secondary500, 0.20), pressedBackground: colorOpacity(theme.colors.secondary500, 0.08) },
    },
    negative: {
      solid: { background: theme.colors.negative600, text: theme.colors.white900, pressedBackground: theme.colors.negative700 },
      ghost: { background: 'transparent', text: theme.colors.negative600, pressedBackground: colorOpacity(theme.colors.negative600, 0.10) },
      outline: { background: theme.colors.white900, text: theme.colors.negative600, border: theme.colors.negative600, pressedBackground: colorOpacity(theme.colors.negative600, 0.05) },
    },
    neutral: {
      solid: { background: theme.colors.neutral500, text: theme.colors.white900, pressedBackground: theme.colors.neutral600 },
      ghost: { background: 'transparent', text: theme.colors.neutral500, pressedBackground: colorOpacity(theme.colors.neutral500, 0.10) },
      outline: { background: theme.colors.white900, text: theme.colors.neutral500, border: theme.colors.neutral500, pressedBackground: colorOpacity(theme.colors.neutral500, 0.05) },
    },
  };

  const config = colorConfig[color]?.[variant] || colorConfig.primary.solid;
  const styleObj: ViewStyle = { backgroundColor: config.background };

  if (config.border) {
    styleObj.borderWidth = 1.5;
    styleObj.borderColor = config.border;
  }

  return styleObj;
};

// ── Composite helpers ──

export const getButtonStyles = ({
  size,
  color,
  variant,
  isIcon,
  theme,
}: {
  size: ButtonSize;
  color: ButtonColor;
  variant: ButtonVariant;
  isIcon: boolean;
  theme: TwigsTheme;
}): ViewStyle => ({
  ...getSizeStyles(size, isIcon),
  ...getColorStyles(color, variant, theme),
});

export const getButtonTextStyles = ({
  size,
  color,
  variant,
  theme,
}: {
  size: ButtonSize;
  color: ButtonColor;
  variant: ButtonVariant;
  theme: TwigsTheme;
}): TextStyle => {
  const sizes: Record<ButtonSize, { fontSize: number; fontFamily: string; fontWeight: '500' | '700' }> = {
    xxs: { fontSize: 10, fontFamily: theme.fonts.medium, fontWeight: '500' },
    xs: { fontSize: 12, fontFamily: theme.fonts.medium, fontWeight: '500' },
    sm: { fontSize: 14, fontFamily: theme.fonts.medium, fontWeight: '500' },
    md: { fontSize: 14, fontFamily: theme.fonts.bold, fontWeight: '700' },
    lg: { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
    xl: { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
    '2xl': { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
  };

  const colorConfig: Record<ButtonColor, Record<ButtonVariant, string>> = {
    primary: { solid: theme.colors.white900, ghost: theme.colors.primary500, outline: theme.colors.primary500 },
    secondary: { solid: theme.colors.white900, ghost: theme.colors.secondary500, outline: theme.colors.secondary500 },
    default: { solid: theme.colors.secondary600, ghost: theme.colors.secondary600, outline: theme.colors.secondary600 },
    negative: { solid: theme.colors.white900, ghost: theme.colors.negative600, outline: theme.colors.negative600 },
    neutral: { solid: theme.colors.white900, ghost: theme.colors.neutral500, outline: theme.colors.neutral500 },
  };

  const sizeConfig = sizes[size] || sizes.sm;
  const textColor = colorConfig[color]?.[variant] || colorConfig.primary.solid;

  return {
    fontSize: sizeConfig.fontSize,
    color: textColor,
    ...createTextStyle(sizeConfig.fontFamily, sizeConfig.fontWeight),
  };
};

// ── Icon / loader helpers ──

export const getIconSize = (size: ButtonSize): number =>
  ICON_SIZES[size] || ICON_SIZES.sm;

export const getIconContainerStyles = ({
  position,
  size,
}: {
  position: 'left' | 'right' | 'center';
  size: ButtonSize;
}): ViewStyle => {
  const margin = ICON_SPACING[size] || ICON_SPACING.sm;
  if (position === 'left') return { marginRight: margin };
  if (position === 'right') return { marginLeft: margin };
  return {};
};

export const getLoadingSpinnerColor = (
  color: ButtonColor,
  variant: ButtonVariant,
  theme: TwigsTheme
): string => {
  if (variant === 'solid' && color !== 'default') {
    return theme.colors.white900;
  }
  const colors: Record<ButtonColor, string> = {
    primary: theme.colors.primary500,
    secondary: theme.colors.secondary500,
    default: theme.colors.secondary600,
    negative: theme.colors.negative700,
    neutral: theme.colors.neutral500,
  };
  return colors[color] || colors.primary;
};

export const getPressedStyle = (
  color: ButtonColor,
  variant: ButtonVariant,
  theme: TwigsTheme
): ViewStyle => {
  const config: Record<ButtonColor, Record<ButtonVariant, ViewStyle>> = {
    primary: {
      solid: { backgroundColor: theme.colors.primary600 },
      ghost: { backgroundColor: colorOpacity(theme.colors.primary500, 0.15) },
      outline: { backgroundColor: colorOpacity(theme.colors.primary500, 0.05), borderColor: colorOpacity(theme.colors.primary500, 0.80) },
    },
    secondary: {
      solid: { backgroundColor: theme.colors.secondary600 },
      ghost: { backgroundColor: colorOpacity(theme.colors.secondary500, 0.15) },
      outline: { backgroundColor: colorOpacity(theme.colors.secondary500, 0.05), borderColor: colorOpacity(theme.colors.secondary500, 0.80) },
    },
    default: {
      solid: { backgroundColor: colorOpacity(theme.colors.secondary500, 0.20) },
      ghost: { backgroundColor: theme.colors.black50 },
      outline: { backgroundColor: theme.colors.black50, borderColor: colorOpacity(theme.colors.secondary500, 0.80) },
    },
    negative: {
      solid: { backgroundColor: theme.colors.negative700 },
      ghost: { backgroundColor: colorOpacity(theme.colors.negative600, 0.15) },
      outline: { backgroundColor: colorOpacity(theme.colors.negative600, 0.05), borderColor: colorOpacity(theme.colors.negative600, 0.80) },
    },
    neutral: {
      solid: { backgroundColor: theme.colors.neutral600 },
      ghost: { backgroundColor: colorOpacity(theme.colors.neutral500, 0.15) },
      outline: { backgroundColor: colorOpacity(theme.colors.neutral500, 0.05), borderColor: colorOpacity(theme.colors.neutral500, 0.80) },
    },
  };
  return config[color]?.[variant] || config.primary.solid;
};

export const getButtonLoaderMargin = (size: ButtonSize): number =>
  ICON_SPACING[size] || ICON_SPACING.sm;
