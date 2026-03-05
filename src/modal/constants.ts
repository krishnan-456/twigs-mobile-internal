import type { ModalSize, ModalAnimationType } from './types';

interface ContentSizeConfig {
  /** Horizontal margin from screen edge (applied to each side) */
  horizontalMargin: number;
}

export const CONTENT_SIZE_CONFIG: Record<ModalSize, ContentSizeConfig> = {
  sm: { horizontalMargin: 40 },
  md: { horizontalMargin: 8 },
  lg: { horizontalMargin: 0 },
  full: { horizontalMargin: 0 },
};

export const DEFAULT_SIZE: ModalSize = 'md';
export const DEFAULT_ANIMATION_TYPE: ModalAnimationType = 'fade';

export const CONTENT_BORDER_RADIUS = 16;
export const CONTENT_PADDING_HORIZONTAL = 16;

export const HEADER_PADDING_TOP = 32;
export const HEADER_PADDING_HORIZONTAL = 16;
export const HEADER_GAP = 4;

export const BODY_PADDING_HORIZONTAL = 16;
export const BODY_PADDING_VERTICAL = 16;

export const FOOTER_PADDING_HORIZONTAL = 16;
export const FOOTER_PADDING_BOTTOM = 16;
export const FOOTER_PADDING_TOP = 24;
export const FOOTER_GAP = 8;

export const TITLE_FONT_SIZE = 18;
export const TITLE_LINE_HEIGHT = 26;

export const DESCRIPTION_FONT_SIZE = 16;
export const DESCRIPTION_LINE_HEIGHT = 24;

export const BACKDROP_OPACITY = 0.5;
