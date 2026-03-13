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

/** Arrow inset from tooltip edge for start/end alignments (Figma: 8dp). */
export const ARROW_EDGE_OFFSET = 8;

export const DEFAULT_SIDE: TooltipSide = 'top';
export const DEFAULT_SIDE_OFFSET = 6;
export const ANIMATION_DURATION = 150;
