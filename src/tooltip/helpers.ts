import type { Placement } from '@floating-ui/react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { TooltipSide, TooltipAlign } from './types';
import {
  TOOLTIP_CONFIG,
  ARROW_SIZE,
  ARROW_EDGE_OFFSET,
} from './constants';

export function toPlacement(
  side: TooltipSide,
  align: TooltipAlign
): Placement {
  if (align === 'center') return side;
  return `${side}-${align === 'start' ? 'start' : 'end'}`;
}

/**
 * Calculates the cross-axis shift needed for the tooltip's arrow to point at the trigger's center,
 * used for left/right sides with start/end alignment.
 */
export function getCrossAxisOffset(
  side: TooltipSide,
  align: TooltipAlign,
  refSize: number
): number {
  if (align === 'center') return 0;

  const isHorizontalSide = side === 'top' || side === 'bottom';
  if (isHorizontalSide) return 0;

  const arrowCenter = ARROW_EDGE_OFFSET + ARROW_SIZE.width / 2;
  const refCenter = refSize / 2;

  if (align === 'start') {
    return -(arrowCenter - refCenter);
  }
  return arrowCenter - refCenter;
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

/** Swaps width/height for left/right sides since the arrow rotates 90°. */
export function getArrowDimensions(
  side: TooltipSide
): { width: number; height: number } {
  if (side === 'left' || side === 'right') {
    return { width: ARROW_SIZE.height, height: ARROW_SIZE.width };
  }
  return ARROW_SIZE;
}

/**
 * For `center` alignment, uses floating-ui's computed coordinate.
 * For `start`/`end`, pins the arrow at `ARROW_EDGE_OFFSET` from the
 * corresponding tooltip edge (Figma spec: 8dp).
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
      result.left = ARROW_EDGE_OFFSET;
    } else {
      result.top = ARROW_EDGE_OFFSET;
    }
  } else {
    if (isHorizontalSide) {
      result.right = ARROW_EDGE_OFFSET;
      result.left = undefined;
    } else {
      result.bottom = ARROW_EDGE_OFFSET;
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
      result.left = -arrowDims.width;
      break;
  }

  return result as ViewStyle;
}
