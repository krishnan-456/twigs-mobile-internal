import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { ToastVariant, ToastPosition } from './types';
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
} from './constants';

/** Returns variant-dependent container styles (background, shadow) */
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  };
}

/** Returns the icon fill color for a given variant */
export function getIconColor(
  theme: TwigsTheme,
  variant: ToastVariant,
): string {
  const colorKey = VARIANT_COLORS[variant].icon as keyof typeof theme.colors;
  return theme.colors[colorKey];
}

/** Returns the background color for a given variant (used as innerColor for info icon) */
export function getBackgroundColor(
  theme: TwigsTheme,
  variant: ToastVariant,
): string {
  const colorKey = VARIANT_COLORS[variant]
    .background as keyof typeof theme.colors;
  return theme.colors[colorKey];
}

/** Returns title text styles for a given variant */
export function getTitleStyles(
  theme: TwigsTheme,
  variant: ToastVariant,
): TextStyle {
  const colorKey = VARIANT_COLORS[variant].text as keyof typeof theme.colors;
  return {
    color: theme.colors[colorKey],
    fontSize: TOAST_TITLE_FONT_SIZE,
    lineHeight: TOAST_TITLE_LINE_HEIGHT,
    fontWeight: '700',
  };
}

/** Returns description text styles for a given variant */
export function getDescriptionStyles(
  theme: TwigsTheme,
  variant: ToastVariant,
): TextStyle {
  const colorKey = VARIANT_COLORS[variant].text as keyof typeof theme.colors;
  return {
    color: theme.colors[colorKey],
    fontSize: TOAST_DESCRIPTION_FONT_SIZE,
    lineHeight: TOAST_DESCRIPTION_LINE_HEIGHT,
    fontWeight: '400',
  };
}

/** Returns positioning styles for the toast stack container */
export function getPositionContainerStyle(
  position: ToastPosition,
  offset: number,
): ViewStyle {
  const { vertical, horizontal } = POSITION_STYLES[position];

  const style: ViewStyle = {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    [vertical]: offset,
    alignItems:
      horizontal === 'center'
        ? 'center'
        : horizontal === 'left'
          ? 'flex-start'
          : 'flex-end',
  };

  return style;
}

/** Returns the initial translateY for toast entry based on position */
export function getEntryTranslateY(position: ToastPosition): number {
  return position.startsWith('top') ? -50 : 50;
}