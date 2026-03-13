import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { SegmentedButtonRounded } from './types';
import { colorOpacity } from '../utils';
import {
  CONTAINER_HEIGHT,
  CONTAINER_BG_OPACITY,
  ROUNDED_RADII,
  SEGMENT_FONT_SIZE,
  SEGMENT_LINE_HEIGHT,
  SEGMENT_LETTER_SPACING,
  SELECTED_BORDER_WIDTH,
  SELECTED_SHADOW,
  SELECTED_ELEVATION,
} from './constants';

export function getContainerStyles(
  theme: TwigsTheme,
  rounded: SegmentedButtonRounded,
  fullWidth: boolean
): ViewStyle {
  return {
    height: CONTAINER_HEIGHT,
    borderRadius: ROUNDED_RADII[rounded],
    backgroundColor: colorOpacity(theme.colors.secondary500, CONTAINER_BG_OPACITY),
    ...(fullWidth ? { alignSelf: 'stretch' as const } : {}),
  };
}

export function getIndicatorStyles(theme: TwigsTheme, rounded: SegmentedButtonRounded): ViewStyle {
  return {
    backgroundColor: theme.colors.white900,
    borderWidth: SELECTED_BORDER_WIDTH,
    borderColor: theme.colors.secondary100,
    borderRadius: ROUNDED_RADII[rounded],
    shadowColor: theme.colors.black900,
    ...SELECTED_SHADOW,
    elevation: SELECTED_ELEVATION,
  };
}

export function getSegmentTextStyles(theme: TwigsTheme, selected: boolean): TextStyle {
  return {
    fontSize: SEGMENT_FONT_SIZE,
    lineHeight: SEGMENT_LINE_HEIGHT,
    letterSpacing: SEGMENT_LETTER_SPACING,
    textAlign: 'center',
    color: selected ? theme.colors.secondary700 : theme.colors.secondary600,
    fontFamily: selected ? theme.fonts.bold : theme.fonts.medium,
  };
}

export function getSegmentPressedStyles(
  theme: TwigsTheme,
  rounded: SegmentedButtonRounded
): ViewStyle {
  return {
    backgroundColor: theme.colors.white900,
    borderRadius: ROUNDED_RADII[rounded],
  };
}
