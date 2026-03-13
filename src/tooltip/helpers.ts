import type { Placement } from '@floating-ui/react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { TooltipSide, TooltipAlign } from './types';
import {
  TOOLTIP_CONFIG,
  ARROW_SIZE,
  ARROW_OFFSET_HORIZONTAL,
  ARROW_OFFSET_VERTICAL,
} from './constants';

/** Converts side + align props to a floating-ui Placement string. */
export function toPlacement(
  side: TooltipSide,
  align: TooltipAlign
): Placement {
  if (align === 'center') return side;
  return `${side}-${align === 'start' ? 'start' : 'end'}`;
}

export function getContentStyles(theme: TwigsTheme): ViewStyle {
  return {
    backgroundColor: theme.colors.neutral900,
    paddingHorizontal: TOOLTIP_CONFIG.paddingHorizontal,
    paddingVertical: TOOLTIP_CONFIG.paddingVertical,
    borderRadius: TOOLTIP_CONFIG.borderRadius,
    maxWidth: TOOLTIP_CONFIG.maxWidth,
  };
}

export function getTextStyles(theme: TwigsTheme): TextStyle {
  return {
    color: theme.colors.white900,
    fontSize: TOOLTIP_CONFIG.fontSize,
    lineHeight: TOOLTIP_CONFIG.lineHeight,
    fontFamily: theme.fonts[TOOLTIP_CONFIG.fontFamily],
  };
}

/**
 * Returns the SVG path for the tooltip arrow triangle.
 * Points toward the trigger element based on side.
 */
export function getArrowPath(side: TooltipSide): string {
  const { width, height } = ARROW_SIZE;

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
  side: TooltipSide
): { width: number; height: number } {
  if (side === 'left' || side === 'right') {
    return { width: ARROW_SIZE.height, height: ARROW_SIZE.width };
  }
  return ARROW_SIZE;
}

/**
 * Computes the arrow position style.
 *
 * For `center` alignment the arrow is placed at the floating-ui computed
 * coordinate. For `start`/`end` alignments the arrow is pinned to a fixed
 * offset from the tooltip edge — matching the web twigs library which uses
 * `!important` overrides to force arrow positions at `$4` / `$5` tokens.
 */
export function getArrowPositionStyle(
  side: TooltipSide,
  align: TooltipAlign,
  arrowDims: { width: number; height: number },
  arrowMiddleware: { x?: number; y?: number } | undefined
): ViewStyle {
  const result: Record<string, number | undefined> = {};
  const isHorizontalSide = side === 'top' || side === 'bottom';

  if (align === 'center') {
    if (arrowMiddleware) {
      if (arrowMiddleware.x != null) result.left = arrowMiddleware.x;
      if (arrowMiddleware.y != null) result.top = arrowMiddleware.y;
    }
  } else if (align === 'start') {
    if (isHorizontalSide) {
      result.left = ARROW_OFFSET_HORIZONTAL;
    } else {
      result.top = ARROW_OFFSET_VERTICAL;
    }
  } else {
    if (isHorizontalSide) {
      result.right = ARROW_OFFSET_HORIZONTAL;
      result.left = undefined;
    } else {
      result.bottom = ARROW_OFFSET_VERTICAL;
      result.top = undefined;
    }
  }

  switch (side) {
    case 'top':
      result.bottom = -arrowDims.height;
      break;
    case 'bottom':
      result.top = -arrowDims.height;
      break;
    case 'left':
      result.right = -arrowDims.width;
      break;
    case 'right':
      if (align === 'center') {
        const x = arrowMiddleware?.x;
        result.left = (x ?? 0) > 0 ? x! : -arrowDims.width;
      } else {
        result.left = -arrowDims.width;
      }
      break;
  }

  return result as ViewStyle;
}
