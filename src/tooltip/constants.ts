import type { TooltipSide } from './types';

export const TOOLTIP_CONFIG = {
  paddingHorizontal: 8,
  paddingVertical: 4,
  fontSize: 12,
  fontFamily: 'medium' as const,
  lineHeight: 16,
  borderRadius: 4,
  maxWidth: 250,
};

export const ARROW_SIZE = {
  width: 10,
  height: 6,
};

/**
 * Fixed arrow offsets from the tooltip edge for start/end alignments.
 * Matches web twigs: top/bottom sides use $4 (8dp), left/right sides use $5 (10dp).
 */
export const ARROW_OFFSET_HORIZONTAL = 8;
export const ARROW_OFFSET_VERTICAL = 10;

export const DEFAULT_SIDE: TooltipSide = 'top';
export const DEFAULT_SIDE_OFFSET = 6;
export const ANIMATION_DURATION = 150;
