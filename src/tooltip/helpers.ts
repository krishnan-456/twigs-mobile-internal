import type { TextStyle, ViewStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { TooltipSize, TooltipSide } from './types';
import { SIZE_CONFIG, ARROW_SIZE } from './constants';
import { createTextStyle } from '../utils';

export function getContentStyles(theme: TwigsTheme, size: TooltipSize): ViewStyle {
  const config = SIZE_CONFIG[size];
  return {
    backgroundColor: theme.colors.neutral900,
    paddingHorizontal: config.paddingHorizontal,
    paddingVertical: config.paddingVertical,
    borderRadius: config.borderRadius,
    maxWidth: config.maxWidth,
  };
}

export function getTextStyles(theme: TwigsTheme, size: TooltipSize): TextStyle {
  const config = SIZE_CONFIG[size];
  return {
    color: theme.colors.white900,
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    ...createTextStyle(
      theme.fonts.medium,
      config.fontWeight as '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
    ),
  };
}

/**
 * Returns the SVG path for the tooltip arrow triangle.
 * Points toward the trigger element based on side.
 */
export function getArrowPath(size: TooltipSize, side: TooltipSide): string {
  const { width, height } = ARROW_SIZE[size];

  switch (side) {
    case 'top':
      return `M0,0 L${width / 2},${height} L${width},0 Z`;
    case 'bottom':
      return `M0,${height} L${width / 2},0 L${width},${height} Z`;
    case 'left':
      return `M0,0 L${height},${width / 2} L0,${width} Z`;
    case 'right':
      return `M${height},0 L0,${width / 2} L${height},${width} Z`;
  }
}

/**
 * Returns { width, height } for the arrow SVG viewBox, accounting for
 * horizontal (top/bottom) vs vertical (left/right) sides.
 */
export function getArrowDimensions(
  size: TooltipSize,
  side: TooltipSide
): { width: number; height: number } {
  const dims = ARROW_SIZE[size];
  if (side === 'left' || side === 'right') {
    return { width: dims.height, height: dims.width };
  }
  return dims;
}
