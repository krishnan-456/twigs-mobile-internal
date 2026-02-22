import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { AlertSize, AlertStatus } from './types';
import {
  SIZE_CONFIG,
  STATUS_BG_COLORS,
  STATUS_BORDER_COLORS,
  STATUS_ICON_COLORS,
  STATUS_TEXT_COLORS,
} from './constants';

/** Returns size-dependent styles for the alert container */
export function getSizeStyles(size: AlertSize): ViewStyle {
  const config = SIZE_CONFIG[size];
  return {
    paddingHorizontal: config.paddingHorizontal,
    paddingVertical: config.paddingVertical,
    borderRadius: config.borderRadius,
    gap: config.gap,
  };
}

/** Returns status-dependent background and border styles */
export function getStatusContainerStyles(theme: TwigsTheme, status: AlertStatus): ViewStyle {
  const bgColorKey = STATUS_BG_COLORS[status] as keyof typeof theme.colors;
  const borderColorKey = STATUS_BORDER_COLORS[status] as keyof typeof theme.colors;

  return {
    backgroundColor: theme.colors[bgColorKey],
    borderWidth: 1,
    borderColor: theme.colors[borderColorKey],
  };
}

/** Returns the icon color for a given status */
export function getIconColor(theme: TwigsTheme, status: AlertStatus): string {
  const colorKey = STATUS_ICON_COLORS[status] as keyof typeof theme.colors;
  return theme.colors[colorKey];
}

/** Returns text styles for the alert content */
export function getTextStyles(theme: TwigsTheme, status: AlertStatus, size: AlertSize): TextStyle {
  const colorKey = STATUS_TEXT_COLORS[status] as keyof typeof theme.colors;
  const config = SIZE_CONFIG[size];

  return {
    color: theme.colors[colorKey],
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    flex: 1,
  };
}

/** Returns the icon size for a given alert size */
export function getIconSize(size: AlertSize): number {
  return SIZE_CONFIG[size].iconSize;
}
