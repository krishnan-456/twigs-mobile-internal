import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import { colorOpacity } from '../utils';
import type { BadgeSize, BadgeColor, BadgeRounded } from './types';
import {
  SIZE_CONFIG,
  ROUNDED_RADII,
  COLOR_BG_MAP,
  COLOR_TEXT_MAP,
  COLOR_BORDER_MAP,
  PRIMARY_BG_OPACITY,
} from './constants';

export function getSizeStyles(size: BadgeSize, rounded: BadgeRounded): ViewStyle {
  const config = SIZE_CONFIG[size];
  return {
    height: config.height,
    paddingHorizontal: config.paddingHorizontal,
    borderRadius: ROUNDED_RADII[rounded],
    gap: config.gap,
  };
}

export function getColorStyles(theme: TwigsTheme, color: BadgeColor): ViewStyle {
  const bgKey = COLOR_BG_MAP[color];
  const borderKey = COLOR_BORDER_MAP[color];

  const result: ViewStyle = {};

  if (bgKey) {
    result.backgroundColor = theme.colors[bgKey as keyof typeof theme.colors];
  } else if (color === 'primary') {
    result.backgroundColor = colorOpacity(theme.colors.primary500, PRIMARY_BG_OPACITY);
  }

  if (borderKey) {
    result.borderWidth = 1;
    result.borderColor = theme.colors[borderKey as keyof typeof theme.colors];
  }

  return result;
}

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

export function getIconSize(size: BadgeSize): number {
  return SIZE_CONFIG[size].iconSize;
}

export function getIconColor(theme: TwigsTheme, color: BadgeColor): string {
  const textKey = COLOR_TEXT_MAP[color] as keyof typeof theme.colors;
  return theme.colors[textKey];
}
