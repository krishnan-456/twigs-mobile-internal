import type { TextStyle, ViewStyle } from 'react-native';
import { createTextStyle, colorOpacity } from '../utils';
import type { TwigsTheme } from '../theme';
import type { LoaderColor, LineLoaderSize, CircleLoaderSize } from '../loader';
import type { ButtonSize, ButtonColor, ButtonVariant } from './types';
import {
  getButtonSizeConfig,
  ICON_SIZES,
  ICON_SPACING,
  OUTLINE_BORDER_WIDTHS,
  type ColorConfigMap,
} from './constants';

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
    default: {
      solid: {
        background: colorOpacity(theme.colors.secondary500, 0.08),
        text: theme.colors.secondary600,
        pressedBackground: colorOpacity(theme.colors.secondary500, 0.2),
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.neutral800,
        pressedBackground: colorOpacity(theme.colors.black500, 0.08),
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.secondary600,
        border: colorOpacity(theme.colors.secondary500, 0.2),
        pressedBackground: colorOpacity(theme.colors.secondary500, 0.08),
      },
    },
    primary: {
      solid: {
        background: theme.colors.primary500,
        text: theme.colors.white900,
        pressedBackground: theme.colors.primary700,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.primary500,
        pressedBackground: colorOpacity(theme.colors.primary500, 0.15),
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.primary500,
        border: colorOpacity(theme.colors.primary500, 0.4),
        pressedBackground: theme.colors.white900,
      },
    },
    secondary: {
      solid: {
        background: theme.colors.secondary500,
        text: theme.colors.white900,
        pressedBackground: theme.colors.secondary800,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.secondary600,
        pressedBackground: colorOpacity(theme.colors.secondary500, 0.08),
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.secondary500,
        border: colorOpacity(theme.colors.secondary500, 0.2),
        pressedBackground: theme.colors.white900,
      },
    },
    bright: {
      solid: {
        background: theme.colors.white900,
        text: theme.colors.secondary500,
        pressedBackground: theme.colors.black100,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.white900,
        pressedBackground: colorOpacity(theme.colors.white200, 0.15),
      },
      outline: {
        background: 'transparent',
        text: theme.colors.white900,
        border: colorOpacity(theme.colors.white400, 0.2),
        pressedBackground: 'transparent',
      },
    },
    light: {
      solid: {
        background: colorOpacity(theme.colors.white200, 0.1),
        text: theme.colors.white900,
        pressedBackground: theme.colors.white400,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.white900,
        pressedBackground: colorOpacity(theme.colors.white300, 0.2),
      },
      outline: {
        background: 'transparent',
        text: theme.colors.white900,
        border: colorOpacity(theme.colors.white400, 0.2),
        pressedBackground: 'transparent',
      },
    },
    error: {
      solid: {
        background: theme.colors.negative100,
        text: theme.colors.negative800,
        pressedBackground: theme.colors.negative200,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.negative800,
        pressedBackground: theme.colors.negative100,
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.negative800,
        border: theme.colors.negative200,
        pressedBackground: theme.colors.white900,
      },
    },
  };

  const config = colorConfig[color]?.[variant] || colorConfig.primary.solid;
  const styleObj: ViewStyle = { backgroundColor: config.background };

  if (config.border) {
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
}): ViewStyle => {
  const sizeStyles = getSizeStyles(size, isIcon);
  const colorStyles = getColorStyles(color, variant, theme);

  // Apply size-aware outline border width (web uses different widths per size)
  if (variant === 'outline') {
    colorStyles.borderWidth = OUTLINE_BORDER_WIDTHS[size] ?? 1.5;
    colorStyles.borderStyle = 'solid';
  }

  return { ...sizeStyles, ...colorStyles };
};

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
  const sizes: Record<
    ButtonSize,
    { fontSize: number; fontFamily: string; fontWeight: '500' | '700' }
  > = {
    xxs: { fontSize: 10, fontFamily: theme.fonts.medium, fontWeight: '500' },
    xs: { fontSize: 12, fontFamily: theme.fonts.medium, fontWeight: '500' },
    sm: { fontSize: 14, fontFamily: theme.fonts.medium, fontWeight: '500' },
    md: { fontSize: 14, fontFamily: theme.fonts.bold, fontWeight: '700' },
    lg: { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
    xl: { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
    '2xl': { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
  };

  const colorConfig: Record<ButtonColor, Record<ButtonVariant, string>> = {
    default: {
      solid: theme.colors.secondary600,
      ghost: theme.colors.neutral800,
      outline: theme.colors.secondary600,
    },
    primary: {
      solid: theme.colors.white900,
      ghost: theme.colors.primary500,
      outline: theme.colors.primary500,
    },
    secondary: {
      solid: theme.colors.white900,
      ghost: theme.colors.secondary600,
      outline: theme.colors.secondary500,
    },
    bright: {
      solid: theme.colors.secondary500,
      ghost: theme.colors.white900,
      outline: theme.colors.white900,
    },
    light: {
      solid: theme.colors.white900,
      ghost: theme.colors.white900,
      outline: theme.colors.white900,
    },
    error: {
      solid: theme.colors.negative800,
      ghost: theme.colors.negative800,
      outline: theme.colors.negative800,
    },
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

export const getIconSize = (size: ButtonSize): number => ICON_SIZES[size] || ICON_SIZES.sm;

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

/**
 * Map a button's color + variant to a LoaderColor preset.
 * Aligned with the web twigs `getLoaderVariantFromButtonVariant` utility.
 */
export const getLoaderColorFromButton = (
  color: ButtonColor,
  variant: ButtonVariant
): LoaderColor => {
  // Compound keys take priority (e.g. primary-solid → bright loader on white bg)
  const compoundMap: Partial<Record<`${ButtonColor}-${ButtonVariant}`, LoaderColor>> = {
    'primary-solid': 'bright',
    'secondary-solid': 'bright',
    'secondary-outline': 'secondary',
    'secondary-ghost': 'secondary',
    'light-solid': 'bright',
    'light-ghost': 'bright',
    'light-outline': 'bright',
  };
  const compoundKey = `${color}-${variant}` as `${ButtonColor}-${ButtonVariant}`;
  if (compoundMap[compoundKey]) return compoundMap[compoundKey]!;

  // Fallback: simple color mapping
  const simpleMap: Record<ButtonColor, LoaderColor> = {
    default: 'secondary',
    primary: 'primary',
    secondary: 'secondary',
    bright: 'secondary',
    light: 'bright',
    error: 'negative',
  };
  return simpleMap[color] ?? 'primary';
};

/**
 * Map ButtonSize to LineLoaderSize.
 * Aligned with web's `buttonSizeToLineLoaderSizeMapping`.
 */
export const getLineLoaderSizeFromButton = (size: ButtonSize): LineLoaderSize => {
  const map: Record<ButtonSize, LineLoaderSize> = {
    xxs: 'sm',
    xs: 'sm',
    sm: 'sm',
    md: 'sm',
    lg: 'sm',
    xl: 'md',
    '2xl': 'lg',
  };
  return map[size] ?? 'sm';
};

/**
 * Map ButtonSize to CircleLoaderSize.
 * Aligned with web's `buttonSizeToCircleLoaderSizeMapping`.
 */
export const getCircleLoaderSizeFromButton = (size: ButtonSize): CircleLoaderSize => {
  const map: Record<ButtonSize, CircleLoaderSize> = {
    xxs: 'xs',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'lg',
    '2xl': 'lg',
  };
  return map[size] ?? 'md';
};

export const getPressedStyle = (
  color: ButtonColor,
  variant: ButtonVariant,
  theme: TwigsTheme
): ViewStyle => {
  const config: Record<ButtonColor, Record<ButtonVariant, ViewStyle>> = {
    default: {
      solid: { backgroundColor: colorOpacity(theme.colors.secondary500, 0.2) },
      ghost: { backgroundColor: colorOpacity(theme.colors.black500, 0.08) },
      outline: { backgroundColor: theme.colors.black50 },
    },
    primary: {
      solid: { backgroundColor: theme.colors.primary700 },
      ghost: { backgroundColor: colorOpacity(theme.colors.primary500, 0.15) },
      outline: {
        backgroundColor: theme.colors.white900,
        borderColor: colorOpacity(theme.colors.primary500, 0.8),
      },
    },
    secondary: {
      solid: { backgroundColor: theme.colors.secondary800 },
      ghost: { backgroundColor: colorOpacity(theme.colors.secondary500, 0.15) },
      outline: {
        backgroundColor: theme.colors.white900,
        borderColor: colorOpacity(theme.colors.secondary500, 0.8),
      },
    },
    bright: {
      solid: { backgroundColor: theme.colors.black100 },
      ghost: { backgroundColor: colorOpacity(theme.colors.white300, 0.2) },
      outline: {
        backgroundColor: 'transparent',
        borderColor: colorOpacity(theme.colors.white700, 0.7),
      },
    },
    light: {
      solid: { backgroundColor: theme.colors.white400 },
      ghost: { backgroundColor: colorOpacity(theme.colors.white300, 0.2) },
      outline: {
        backgroundColor: 'transparent',
        borderColor: colorOpacity(theme.colors.white700, 0.7),
      },
    },
    error: {
      solid: { backgroundColor: theme.colors.negative200 },
      ghost: { backgroundColor: theme.colors.negative200 },
      outline: { backgroundColor: theme.colors.white900, borderColor: theme.colors.negative400 },
    },
  };
  return config[color]?.[variant] || config.primary.solid;
};

export const getButtonLoaderMargin = (size: ButtonSize): number =>
  ICON_SPACING[size] || ICON_SPACING.sm;
