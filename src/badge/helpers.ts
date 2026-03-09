import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { BadgeSize, BadgeColor, BadgeRounded } from './types';
import {
  SIZE_CONFIG,
  ROUNDED_RADII,
  COLOR_BG_MAP,
  COLOR_TEXT_MAP,
  COLOR_BORDER_MAP,
} from './constants';

/** Returns size-dependent container styles */
export function getSizeStyles(size: BadgeSize, rounded: BadgeRounded): ViewStyle {
  const config = SIZE_CONFIG[size];
  return {
    height: config.height,
    paddingHorizontal: config.paddingHorizontal,
    borderRadius: ROUNDED_RADII[rounded],
    gap: config.gap,
  };
}

/** Returns color-dependent container styles (background + optional border) */
export function getColorStyles(theme: TwigsTheme, color: BadgeColor): ViewStyle {
  const bgKey = COLOR_BG_MAP[color] as keyof typeof theme.colors;
  const borderKey = COLOR_BORDER_MAP[color];

  const result: ViewStyle = {
    backgroundColor: theme.colors[bgKey],
  };

  if (borderKey) {
    result.borderWidth = 1;
    result.borderColor = theme.colors[borderKey as keyof typeof theme.colors];
  }

  return result;
}

/** Returns text styles for the badge label */
export function getTextStyles(theme: TwigsTheme, color: BadgeColor, size: BadgeSize): TextStyle {
  const textKey = COLOR_TEXT_MAP[color] as keyof typeof theme.colors;
  const config = SIZE_CONFIG[size];

  return {
    color: theme.colors[textKey],
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    fontFamily: theme.fonts.medium,
  };
}

/** Returns the icon size for a given badge size */
export function getIconSize(size: BadgeSize): number {
  return SIZE_CONFIG[size].iconSize;
}

/** Returns the icon/side-element color for a given badge color */
export function getIconColor(theme: TwigsTheme, color: BadgeColor): string {
  const textKey = COLOR_TEXT_MAP[color] as keyof typeof theme.colors;
  return theme.colors[textKey];
}
