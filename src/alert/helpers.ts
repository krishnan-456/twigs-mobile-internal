import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { AlertSize, AlertStatus } from './types';
import {
  SIZE_CONFIG,
  STATUS_BG_COLORS,
  STATUS_BORDER_COLORS,
  STATUS_ICON_COLORS,
  ALERT_TEXT_COLOR,
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

/** Returns text styles for the alert content — uses dark text for all variants per Figma */
export function getTextStyles(theme: TwigsTheme, _status: AlertStatus, size: AlertSize): TextStyle {
  const colorKey = ALERT_TEXT_COLOR as keyof typeof theme.colors;
  const config = SIZE_CONFIG[size];

  return {
    color: theme.colors[colorKey],
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    fontFamily: theme.fonts[config.fontKey],
    flex: 1,
  };
}

/** Returns the status icon size for a given alert size */
export function getStatusIconSize(size: AlertSize): number {
  return SIZE_CONFIG[size].statusIconSize;
}

/** Returns the close icon size for a given alert size */
export function getCloseIconSize(size: AlertSize): number {
  return SIZE_CONFIG[size].closeIconSize;
}
