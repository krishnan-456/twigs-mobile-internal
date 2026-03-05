import type { AvatarSize, AvatarSizeProp } from './types';

type AvatarGroupOverlapSizeKey = '3' | '4' | '5' | '6';
type AvatarGroupBorderWidthKey = 'xs' | 'sm';
type AvatarGroupFontSizeKey = 'xxs' | 'xs' | 'md' | '3xl';

export interface AvatarGroupSizeConfig {
  overlapSizeKey: AvatarGroupOverlapSizeKey;
  borderWidthKey: AvatarGroupBorderWidthKey;
  overlayFontSizeKey: AvatarGroupFontSizeKey;
  overlayLineHeightKey: AvatarGroupFontSizeKey;
  overlayLetterSpacing: number;
}

export const DEFAULT_AVATAR_GROUP_LIMIT = 0;
export const DEFAULT_AVATAR_GROUP_SIZE: AvatarSizeProp = 'sm';
export const DEFAULT_AVATAR_GROUP_ROUNDED: AvatarSize = 'full';

export const AVATAR_GROUP_SIZE_CONFIG: Record<AvatarSizeProp, AvatarGroupSizeConfig> = {
  xs: {
    overlapSizeKey: '3',
    borderWidthKey: 'xs',
    overlayFontSizeKey: 'xxs',
    overlayLineHeightKey: 'xxs',
    overlayLetterSpacing: 0.6,
  },
  sm: {
    overlapSizeKey: '3',
    borderWidthKey: 'xs',
    overlayFontSizeKey: 'xxs',
    overlayLineHeightKey: 'xxs',
    overlayLetterSpacing: 0.6,
  },
  md: {
    overlapSizeKey: '4',
    borderWidthKey: 'sm',
    overlayFontSizeKey: 'xs',
    overlayLineHeightKey: 'xs',
    overlayLetterSpacing: 0.4,
  },
  lg: {
    overlapSizeKey: '5',
    borderWidthKey: 'sm',
    overlayFontSizeKey: 'md',
    overlayLineHeightKey: 'md',
    overlayLetterSpacing: 0,
  },
  xl: {
    overlapSizeKey: '6',
    borderWidthKey: 'sm',
    overlayFontSizeKey: 'md',
    overlayLineHeightKey: 'md',
    overlayLetterSpacing: 0,
  },
  '2xl': {
    overlapSizeKey: '6',
    borderWidthKey: 'sm',
    overlayFontSizeKey: 'md',
    overlayLineHeightKey: 'md',
    overlayLetterSpacing: 0,
  },
  '3xl': {
    overlapSizeKey: '6',
    borderWidthKey: 'sm',
    overlayFontSizeKey: '3xl',
    overlayLineHeightKey: '3xl',
    overlayLetterSpacing: 0,
  },
  '4xl': {
    overlapSizeKey: '6',
    borderWidthKey: 'sm',
    overlayFontSizeKey: '3xl',
    overlayLineHeightKey: '3xl',
    overlayLetterSpacing: 0,
  },
  '5xl': {
    overlapSizeKey: '6',
    borderWidthKey: 'sm',
    overlayFontSizeKey: '3xl',
    overlayLineHeightKey: '3xl',
    overlayLetterSpacing: 0,
  },
};
