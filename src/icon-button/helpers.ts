import type { ViewStyle } from 'react-native';
import { colorOpacity } from '../utils';
import type { TwigsTheme } from '../theme';
import type { LoaderColor } from '../loader';
import type { IconButtonColor, IconButtonVariant, IconButtonSize } from './types';
import {
  SIZE_CONFIG,
  OUTLINE_BORDER_WIDTH,
  LOADER_COLOR_MAP,
  LINE_LOADER_SIZE_MAP,
  LINE_LOADER_WIDTH_MAP,
  CIRCLE_LOADER_SIZE_MAP,
} from './constants';

interface ColorSpec {
  background: string;
  iconColor: string;
  border?: string;
}

const getRegularColorSpec = (
  color: IconButtonColor,
  variant: IconButtonVariant,
  theme: TwigsTheme
): ColorSpec => {
  const map: Record<IconButtonColor, Record<IconButtonVariant, ColorSpec>> = {
    primary: {
      solid: { background: theme.colors.primary500, iconColor: theme.colors.white900 },
      ghost: { background: 'transparent', iconColor: theme.colors.primary500 },
      outline: { background: theme.colors.white900, iconColor: theme.colors.primary500, border: theme.colors.primary200 },
    },
    secondary: {
      solid: { background: theme.colors.secondary600, iconColor: theme.colors.white900 },
      ghost: { background: 'transparent', iconColor: theme.colors.secondary600 },
      outline: { background: theme.colors.white900, iconColor: theme.colors.secondary500, border: theme.colors.secondary200 },
    },
    default: {
      solid: { background: colorOpacity(theme.colors.secondary500, 0.08), iconColor: theme.colors.secondary600 },
      ghost: { background: 'transparent', iconColor: theme.colors.neutral800 },
      outline: { background: theme.colors.white900, iconColor: theme.colors.secondary600, border: colorOpacity(theme.colors.secondary500, 0.2) },
    },
    error: {
      solid: { background: theme.colors.negative600, iconColor: theme.colors.white900 },
      ghost: { background: 'transparent', iconColor: theme.colors.negative600 },
      outline: { background: theme.colors.white900, iconColor: theme.colors.negative600, border: theme.colors.negative200 },
    },
    light: {
      solid: { background: colorOpacity(theme.colors.white200, 0.1), iconColor: theme.colors.white900 },
      ghost: { background: 'transparent', iconColor: theme.colors.white900 },
      outline: { background: 'transparent', iconColor: theme.colors.white900, border: colorOpacity(theme.colors.white400, 0.2) },
    },
  };

  return map[color]?.[variant] ?? map.primary.solid;
};

const getPressedColorSpec = (
  color: IconButtonColor,
  variant: IconButtonVariant,
  theme: TwigsTheme
): ColorSpec => {
  const map: Record<IconButtonColor, Record<IconButtonVariant, ColorSpec>> = {
    primary: {
      solid: { background: theme.colors.primary700, iconColor: theme.colors.white900 },
      ghost: { background: colorOpacity(theme.colors.primary500, 0.15), iconColor: theme.colors.primary700 },
      outline: { background: theme.colors.white900, iconColor: theme.colors.primary700, border: theme.colors.primary400 },
    },
    secondary: {
      solid: { background: theme.colors.secondary800, iconColor: theme.colors.white900 },
      ghost: { background: colorOpacity(theme.colors.secondary500, 0.15), iconColor: theme.colors.secondary800 },
      outline: { background: theme.colors.white900, iconColor: theme.colors.secondary700, border: theme.colors.secondary400 },
    },
    default: {
      solid: { background: colorOpacity(theme.colors.secondary500, 0.2), iconColor: theme.colors.secondary600 },
      ghost: { background: colorOpacity(theme.colors.black900, 0.05), iconColor: theme.colors.neutral800 },
      outline: { background: colorOpacity(theme.colors.black900, 0.04), iconColor: theme.colors.secondary600, border: colorOpacity(theme.colors.secondary500, 0.2) },
    },
    error: {
      solid: { background: theme.colors.negative800, iconColor: theme.colors.white900 },
      ghost: { background: theme.colors.negative200, iconColor: theme.colors.negative800 },
      outline: { background: theme.colors.white900, iconColor: theme.colors.negative800, border: theme.colors.negative400 },
    },
    light: {
      solid: { background: colorOpacity(theme.colors.white900, 0.2), iconColor: theme.colors.white900 },
      ghost: { background: colorOpacity(theme.colors.white300, 0.2), iconColor: theme.colors.white900 },
      outline: { background: 'transparent', iconColor: theme.colors.white900, border: colorOpacity(theme.colors.white700, 0.7) },
    },
  };

  return map[color]?.[variant] ?? map.primary.solid;
};

export const getIconButtonStyles = (
  color: IconButtonColor,
  variant: IconButtonVariant,
  size: IconButtonSize,
  theme: TwigsTheme
): ViewStyle => {
  const spec = getRegularColorSpec(color, variant, theme);
  const sizeConfig = SIZE_CONFIG[size];

  const styles: ViewStyle = {
    width: sizeConfig.containerSize,
    height: sizeConfig.containerSize,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: spec.background,
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (variant === 'outline') {
    styles.borderWidth = OUTLINE_BORDER_WIDTH;
    styles.borderStyle = 'solid';
    styles.borderColor = spec.border;
  }

  return styles;
};

export const getIconButtonPressedStyles = (
  color: IconButtonColor,
  variant: IconButtonVariant,
  theme: TwigsTheme
): ViewStyle => {
  const spec = getPressedColorSpec(color, variant, theme);
  const styles: ViewStyle = { backgroundColor: spec.background };

  if (variant === 'outline' && spec.border) {
    styles.borderColor = spec.border;
  }

  return styles;
};

export const getIconColor = (
  color: IconButtonColor,
  variant: IconButtonVariant,
  theme: TwigsTheme,
  pressed: boolean
): string => {
  const spec = pressed
    ? getPressedColorSpec(color, variant, theme)
    : getRegularColorSpec(color, variant, theme);
  return spec.iconColor;
};

export const getIconSize = (size: IconButtonSize): number =>
  SIZE_CONFIG[size].iconSize;

export const getLoaderColor = (
  color: IconButtonColor,
  variant: IconButtonVariant
): LoaderColor =>
  LOADER_COLOR_MAP[`${color}-${variant}`] ?? 'primary';

export const getLineLoaderSize = (size: IconButtonSize) =>
  LINE_LOADER_SIZE_MAP[size];

export const getLineLoaderWidth = (size: IconButtonSize): number =>
  LINE_LOADER_WIDTH_MAP[size];

export const getCircleLoaderSize = (size: IconButtonSize) =>
  CIRCLE_LOADER_SIZE_MAP[size];
