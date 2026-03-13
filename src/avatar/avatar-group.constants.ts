import type { AvatarSize, AvatarSizeProp } from './types';

export interface AvatarGroupSizeConfig {
  /** Negative margin overlap between avatars (dp). */
  overlap: number;
  /** White border width around each avatar (dp). */
  borderWidth: number;
  /** Font size for the overflow "+N" label (dp). */
  overlayFontSize: number;
  /** Line height for the overflow "+N" label (dp). */
  overlayLineHeight: number;
  /** Letter spacing for the overflow "+N" label. */
  overlayLetterSpacing: number;
}

export const DEFAULT_AVATAR_GROUP_LIMIT = 0;
export const DEFAULT_AVATAR_GROUP_SIZE: AvatarSizeProp = 'xs';
export const DEFAULT_AVATAR_GROUP_ROUNDED: AvatarSize = 'full';

export const AVATAR_GROUP_SIZE_CONFIG: Record<AvatarSizeProp, AvatarGroupSizeConfig> = {
  xxs: {
    overlap: 8,
    borderWidth: 1,
    overlayFontSize: 8,
    overlayLineHeight: 12,
    overlayLetterSpacing: 0.06,
  },
  xs: {
    overlap: 12,
    borderWidth: 1,
    overlayFontSize: 10,
    overlayLineHeight: 14,
    overlayLetterSpacing: 0.06,
  },
  sm: {
    overlap: 16,
    borderWidth: 1.5,
    overlayFontSize: 12,
    overlayLineHeight: 16,
    overlayLetterSpacing: 0.048,
  },
  md: {
    overlap: 20,
    borderWidth: 2,
    overlayFontSize: 14,
    overlayLineHeight: 20,
    overlayLetterSpacing: 0.028,
  },
  lg: {
    overlap: 24,
    borderWidth: 2,
    overlayFontSize: 16,
    overlayLineHeight: 24,
    overlayLetterSpacing: 0,
  },
  xl: {
    overlap: 32,
    borderWidth: 2,
    overlayFontSize: 18,
    overlayLineHeight: 26,
    overlayLetterSpacing: 0,
  },
  '2xl': {
    overlap: 40,
    borderWidth: 2,
    overlayFontSize: 24,
    overlayLineHeight: 32,
    overlayLetterSpacing: 0,
  },
  '3xl': {
    overlap: 48,
    borderWidth: 2,
    overlayFontSize: 28,
    overlayLineHeight: 36,
    overlayLetterSpacing: 0,
  },
};
