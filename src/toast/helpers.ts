import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { ToastVariant, ToastPosition } from './types';

let idCounter = 0;

export function generateToastId(): string {
  idCounter += 1;
  return `twigs-toast-${idCounter}`;
}
import {
  VARIANT_COLORS,
  TOAST_BORDER_RADIUS,
  TOAST_PADDING_HORIZONTAL,
  TOAST_PADDING_VERTICAL,
  TOAST_CONTAINER_GAP,
  TOAST_MIN_HEIGHT,
  TOAST_TITLE_FONT_SIZE,
  TOAST_TITLE_LINE_HEIGHT,
  TOAST_DESCRIPTION_FONT_SIZE,
  TOAST_DESCRIPTION_LINE_HEIGHT,
  POSITION_STYLES,
  SWIPE_ELASTIC_RESISTANCE,
} from './constants';

export function getVariantContainerStyles(
  theme: TwigsTheme,
  variant: ToastVariant,
): ViewStyle {
  const config = VARIANT_COLORS[variant];
  const bgKey = config.background as keyof typeof theme.colors;

  return {
    backgroundColor: theme.colors[bgKey],
    borderRadius: TOAST_BORDER_RADIUS,
    paddingHorizontal: TOAST_PADDING_HORIZONTAL,
    paddingVertical: TOAST_PADDING_VERTICAL,
    minHeight: TOAST_MIN_HEIGHT,
    gap: TOAST_CONTAINER_GAP,
    shadowColor: theme.colors.black900,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  };
}

export function getIconColor(
  theme: TwigsTheme,
  variant: ToastVariant,
): string {
  const colorKey = VARIANT_COLORS[variant].icon as keyof typeof theme.colors;
  return theme.colors[colorKey];
}

export function getBackgroundColor(
  theme: TwigsTheme,
  variant: ToastVariant,
): string {
  const colorKey = VARIANT_COLORS[variant]
    .background as keyof typeof theme.colors;
  return theme.colors[colorKey];
}

export function getTitleStyles(
  theme: TwigsTheme,
  variant: ToastVariant,
): TextStyle {
  const colorKey = VARIANT_COLORS[variant].text as keyof typeof theme.colors;
  return {
    color: theme.colors[colorKey],
    fontSize: TOAST_TITLE_FONT_SIZE,
    lineHeight: TOAST_TITLE_LINE_HEIGHT,
    fontFamily: theme.fonts.medium,
  };
}

export function getDescriptionStyles(
  theme: TwigsTheme,
  variant: ToastVariant,
): TextStyle {
  const colorKey = VARIANT_COLORS[variant].text as keyof typeof theme.colors;
  return {
    color: theme.colors[colorKey],
    fontSize: TOAST_DESCRIPTION_FONT_SIZE,
    lineHeight: TOAST_DESCRIPTION_LINE_HEIGHT,
    fontFamily: theme.fonts.regular,
  };
}

/**
 * Applies elastic resistance to a swipe distance (Reanimated worklet).
 * Returns a dampened value that decreases progressively as distance grows.
 */
export function elasticResistance(distance: number): number {
  'worklet';
  const progressiveFactor = 1 / (1 + Math.abs(distance) * 0.02);
  return distance * SWIPE_ELASTIC_RESISTANCE * progressiveFactor;
}

export function getPositionContainerStyle(
  position: ToastPosition,
  offset: number,
): ViewStyle {
  const { vertical } = POSITION_STYLES[position];

  return {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    [vertical]: offset,
    alignItems: 'center',
  };
}