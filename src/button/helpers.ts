import type { TextStyle, ViewStyle } from 'react-native';
import { colorOpacity } from '../utils';
import type { TwigsTheme } from '../theme';
import type { LoaderColor, LineLoaderSize, CircleLoaderSize } from '../loader';
import type { ButtonSize, ButtonColor, ButtonVariant } from './types';
import {
  getButtonSizeConfig,
  ICON_SIZES,
  ICON_ONLY_SIZES,
  ICON_SPACING,
  LINE_LOADER_WIDTH_MAP,
  OUTLINE_BORDER_WIDTH,
  type ColorConfigMap,
} from './constants';

const buildColorConfig = (theme: TwigsTheme): ColorConfigMap => ({
  default: {
    solid: {
      background: colorOpacity(theme.colors.secondary500, 0.08),
      text: theme.colors.secondary600,
      pressedBackground: colorOpacity(theme.colors.secondary500, 0.2),
      pressedText: theme.colors.secondary800,
    },
    ghost: {
      background: 'transparent',
      text: theme.colors.neutral800,
      pressedBackground: colorOpacity(theme.colors.black900, 0.08),
      pressedText: theme.colors.neutral900,
    },
    outline: {
      background: theme.colors.white900,
      text: theme.colors.secondary600,
      border: colorOpacity(theme.colors.secondary500, 0.2),
      pressedBackground: theme.colors.white900,
      pressedText: theme.colors.secondary800,
      pressedBorder: colorOpacity(theme.colors.secondary500, 0.4),
    },
  },
  primary: {
    solid: {
      background: theme.colors.primary500,
      text: theme.colors.white900,
      pressedBackground: theme.colors.primary700,
      pressedText: theme.colors.white900,
    },
    ghost: {
      background: 'transparent',
      text: theme.colors.primary500,
      pressedBackground: colorOpacity(theme.colors.primary500, 0.15),
      pressedText: theme.colors.primary700,
    },
    outline: {
      background: theme.colors.white900,
      text: theme.colors.primary500,
      border: theme.colors.primary200,
      pressedBackground: theme.colors.white900,
      pressedText: theme.colors.primary700,
      pressedBorder: theme.colors.primary400,
    },
  },
  secondary: {
    solid: {
      background: theme.colors.secondary600,
      text: theme.colors.white900,
      pressedBackground: theme.colors.secondary800,
      pressedText: theme.colors.white900,
    },
    ghost: {
      background: 'transparent',
      text: theme.colors.secondary600,
      pressedBackground: colorOpacity(theme.colors.secondary500, 0.15),
      pressedText: theme.colors.secondary700,
    },
    outline: {
      background: theme.colors.white900,
      text: theme.colors.secondary600,
      border: theme.colors.secondary200,
      pressedBackground: theme.colors.white900,
      pressedText: theme.colors.secondary800,
      pressedBorder: theme.colors.secondary400,
    },
  },
  light: {
    solid: {
      background: colorOpacity(theme.colors.white200, 0.1),
      text: theme.colors.white900,
      pressedBackground: colorOpacity(theme.colors.white900, 0.2),
      pressedText: theme.colors.white900,
    },
    ghost: {
      background: 'transparent',
      text: theme.colors.white900,
      pressedBackground: colorOpacity(theme.colors.white300, 0.2),
      pressedText: theme.colors.white900,
    },
    outline: {
      background: 'transparent',
      text: theme.colors.white900,
      border: colorOpacity(theme.colors.white400, 0.2),
      pressedBackground: 'transparent',
      pressedText: theme.colors.white900,
      pressedBorder: colorOpacity(theme.colors.white700, 0.7),
    },
  },
  error: {
    solid: {
      background: theme.colors.negative600,
      text: theme.colors.white900,
      pressedBackground: theme.colors.negative800,
      pressedText: theme.colors.white900,
    },
    ghost: {
      background: 'transparent',
      text: theme.colors.negative800,
      pressedBackground: theme.colors.negative200,
      pressedText: theme.colors.negative900,
    },
    outline: {
      background: theme.colors.white900,
      text: theme.colors.negative800,
      border: theme.colors.negative200,
      pressedBackground: theme.colors.white900,
      pressedText: theme.colors.negative900,
      pressedBorder: theme.colors.negative400,
    },
  },
});

export const getSizeStyles = (size: ButtonSize, isIcon: boolean): ViewStyle => {
  const config = getButtonSizeConfig(size, isIcon);

  const styleObj: ViewStyle = {
    height: config.height,
    borderRadius: config.borderRadius,
    paddingHorizontal: config.paddingHorizontal,
  };

  if (isIcon && typeof config.width === 'number') {
    styleObj.width = config.width;
  }

  return styleObj;
};

export const getColorStyles = (
  color: ButtonColor,
  variant: ButtonVariant,
  theme: TwigsTheme
): ViewStyle => {
  const colorConfig = buildColorConfig(theme);
  const config = colorConfig[color]?.[variant] || colorConfig.primary.solid;
  const styleObj: ViewStyle = { backgroundColor: config.background };

  if (config.border) {
    styleObj.borderColor = config.border;
  }

  return styleObj;
};

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

  if (variant === 'outline') {
    colorStyles.borderWidth = OUTLINE_BORDER_WIDTH;
    colorStyles.borderStyle = 'solid';
  }

  return { ...sizeStyles, ...colorStyles };
};

export const getTextColor = (
  color: ButtonColor,
  variant: ButtonVariant,
  theme: TwigsTheme
): string => {
  const colorConfig = buildColorConfig(theme);
  return colorConfig[color]?.[variant]?.text || colorConfig.primary.solid.text;
};

export const getPressedTextColor = (
  color: ButtonColor,
  variant: ButtonVariant,
  theme: TwigsTheme
): string => {
  const colorConfig = buildColorConfig(theme);
  return colorConfig[color]?.[variant]?.pressedText || colorConfig.primary.solid.pressedText;
};

export const getButtonTextStyles = ({
  size,
  color,
  variant,
  theme,
  pressed = false,
}: {
  size: ButtonSize;
  color: ButtonColor;
  variant: ButtonVariant;
  theme: TwigsTheme;
  pressed?: boolean;
}): TextStyle => {
  const config = getButtonSizeConfig(size, false);

  const textColor = pressed
    ? getPressedTextColor(color, variant, theme)
    : getTextColor(color, variant, theme);

  return {
    fontSize: config.fontSize,
    color: textColor,
    fontFamily: theme.fonts.bold,
  };
};

export const getIconSize = (size: ButtonSize, position: 'left' | 'right' | 'center'): number => {
  if (position === 'center') {
    return ICON_ONLY_SIZES[size] || ICON_ONLY_SIZES.sm;
  }

  return ICON_SIZES[size] || ICON_SIZES.sm;
};

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
 * Maps a button color+variant combination to the appropriate LoaderColor.
 * Uses a compound key lookup first (e.g. 'primary-solid' → 'bright'),
 * then falls back to a simple color→loader mapping.
 */
export const getLoaderColorFromButton = (
  color: ButtonColor,
  variant: ButtonVariant
): LoaderColor => {
  const compoundMap: Partial<Record<`${ButtonColor}-${ButtonVariant}`, LoaderColor>> = {
    'primary-solid': 'bright',
    'secondary-solid': 'bright',
    'error-solid': 'bright',
    'secondary-outline': 'secondary',
    'secondary-ghost': 'secondary',
    'light-solid': 'bright',
    'light-ghost': 'bright',
    'light-outline': 'bright',
  };
  const compoundKey = `${color}-${variant}` as `${ButtonColor}-${ButtonVariant}`;
  if (compoundMap[compoundKey]) return compoundMap[compoundKey]!;

  const simpleMap: Record<ButtonColor, LoaderColor> = {
    default: 'secondary',
    primary: 'primary',
    secondary: 'secondary',
    light: 'bright',
    error: 'negative',
  };
  return simpleMap[color] ?? 'primary';
};

export const getLineLoaderSizeFromButton = (size: ButtonSize): LineLoaderSize => {
  const map: Record<ButtonSize, LineLoaderSize> = {
    sm: 'sm',
    md: 'sm',
    lg: 'sm',
    xl: 'md',
    '2xl': 'lg',
  };
  return map[size] ?? 'sm';
};

export const getLineLoaderWidthFromButton = (size: ButtonSize): number => LINE_LOADER_WIDTH_MAP[size] ?? 24;

export const getCircleLoaderSizeFromButton = (size: ButtonSize): CircleLoaderSize => {
  const map: Record<ButtonSize, CircleLoaderSize> = {
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
  const colorConfig = buildColorConfig(theme);
  const config = colorConfig[color]?.[variant] || colorConfig.primary.solid;
  const styles: ViewStyle = { backgroundColor: config.pressedBackground };

  if (variant === 'outline' && config.pressedBorder) {
    styles.borderColor = config.pressedBorder;
  }

  return styles;
};

export const getButtonLoaderMargin = (size: ButtonSize): number => ICON_SPACING[size] || ICON_SPACING.sm;
