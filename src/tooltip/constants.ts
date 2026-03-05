import type { TooltipSize, TooltipSide } from './types';

interface SizeConfig {
  paddingHorizontal: number;
  paddingVertical: number;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  borderRadius: number;
  maxWidth: number;
}

export const SIZE_CONFIG: Record<TooltipSize, SizeConfig> = {
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    borderRadius: 4,
    maxWidth: 250,
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    borderRadius: 8,
    maxWidth: 250,
  },
  lg: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    borderRadius: 8,
    maxWidth: 250,
  },
};

interface ArrowDimensions {
  width: number;
  height: number;
}

export const ARROW_SIZE: Record<TooltipSize, ArrowDimensions> = {
  sm: { width: 10, height: 6 },
  md: { width: 14, height: 8 },
  lg: { width: 20, height: 12 },
};

export const DEFAULT_SIZE: TooltipSize = 'sm';
export const DEFAULT_SIDE: TooltipSide = 'top';
export const DEFAULT_SIDE_OFFSET = 6;
export const ANIMATION_DURATION = 150;
