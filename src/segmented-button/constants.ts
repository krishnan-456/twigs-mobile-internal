import type { SegmentedButtonRounded } from './types';
import { defaultTheme as theme } from '../theme';

export const CONTAINER_HEIGHT = 48;
export const SEGMENT_PADDING_HORIZONTAL = 20;
export const SEGMENT_FONT_SIZE = 14;
export const SEGMENT_LINE_HEIGHT = 20;
export const SEGMENT_LETTER_SPACING = 0.2;
export const SELECTED_BORDER_WIDTH = 1.5;

export const SELECTED_SHADOW = {
  shadowColor: theme.colors.black900,
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.04,
  shadowRadius: 5,
} as const;

/** Elevation for Android shadow on selected segment. */
export const SELECTED_ELEVATION = 2;

/** Container background opacity (Figma: neutral at 8% opacity). */
export const CONTAINER_BG_OPACITY = 0.08;

/** Border radius values per rounded variant (aligned with Avatar tokens). */
export const ROUNDED_RADII: Record<SegmentedButtonRounded, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const DEFAULT_ROUNDED: SegmentedButtonRounded = 'full';

/** Duration (ms) of the slide animation between segments. */
export const SLIDE_DURATION = 200;
