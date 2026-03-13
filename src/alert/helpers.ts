import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { AlertStatus } from './types';
import {
  STATUS_BG_COLORS,
  STATUS_BORDER_COLORS,
  STATUS_ICON_COLORS,
  ALERT_TEXT_COLOR,
  ALERT_FONT_SIZE,
  ALERT_LINE_HEIGHT,
} from './constants';

export function getStatusContainerStyles(theme: TwigsTheme, status: AlertStatus): ViewStyle {
  const bgColorKey = STATUS_BG_COLORS[status] as keyof typeof theme.colors;
  const borderColorKey = STATUS_BORDER_COLORS[status] as keyof typeof theme.colors;

  return {
    backgroundColor: theme.colors[bgColorKey],
    borderWidth: 1,
    borderColor: theme.colors[borderColorKey],
  };
}

export function getIconColor(theme: TwigsTheme, status: AlertStatus): string {
  const colorKey = STATUS_ICON_COLORS[status] as keyof typeof theme.colors;
  return theme.colors[colorKey];
}

export function getTextStyles(theme: TwigsTheme): TextStyle {
  const colorKey = ALERT_TEXT_COLOR as keyof typeof theme.colors;

  return {
    color: theme.colors[colorKey],
    fontSize: ALERT_FONT_SIZE,
    lineHeight: ALERT_LINE_HEIGHT,
    fontFamily: theme.fonts.regular,
    flex: 1,
  };
}
