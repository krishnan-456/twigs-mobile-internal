import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { ModalSize } from './types';
import {
  CONTENT_SIZE_CONFIG,
  CONTENT_BORDER_RADIUS,
  TITLE_FONT_SIZE,
  TITLE_LINE_HEIGHT,
  DESCRIPTION_FONT_SIZE,
  DESCRIPTION_LINE_HEIGHT,
  BACKDROP_OPACITY,
} from './constants';
import { colorOpacity, createTextStyle } from '../utils';

export function getBackdropStyle(theme: TwigsTheme): ViewStyle {
  return {
    backgroundColor: colorOpacity(theme.colors.black900, BACKDROP_OPACITY),
  };
}

export function getContentStyles(
  theme: TwigsTheme,
  size: ModalSize,
  screenWidth: number
): ViewStyle {
  const config = CONTENT_SIZE_CONFIG[size];
  const width = screenWidth - config.horizontalMargin * 2;

  const baseStyles: ViewStyle = {
    backgroundColor: theme.colors.white900,
    borderRadius: size === 'full' ? 0 : CONTENT_BORDER_RADIUS,
    width,
    shadowColor: theme.colors.black900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  };

  if (size === 'full') {
    baseStyles.flex = 1;
    baseStyles.width = screenWidth;
  }

  return baseStyles;
}

export function getTitleStyles(theme: TwigsTheme): TextStyle {
  return {
    ...createTextStyle(theme.fonts.bold, '700'),
    fontSize: TITLE_FONT_SIZE,
    lineHeight: TITLE_LINE_HEIGHT,
    color: theme.colors.neutral900,
    textAlign: 'center',
  };
}

export function getDescriptionStyles(theme: TwigsTheme): TextStyle {
  return {
    ...createTextStyle(theme.fonts.regular, '400'),
    fontSize: DESCRIPTION_FONT_SIZE,
    lineHeight: DESCRIPTION_LINE_HEIGHT,
    color: theme.colors.neutral700,
    textAlign: 'center',
  };
}
