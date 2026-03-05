import type { TextStyle, ViewStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import { AVATAR_BORDER_RADII } from './constants';
import { AVATAR_GROUP_SIZE_CONFIG } from './avatar-group.constants';
import type { AvatarSize, AvatarSizeProp } from './types';

/** Dynamic wrapper style for each avatar item in the group. */
export const getAvatarGroupItemStyles = (
  theme: TwigsTheme,
  size: AvatarSizeProp,
  rounded: AvatarSize,
  isFirst: boolean
): ViewStyle => {
  const sizeConfig = AVATAR_GROUP_SIZE_CONFIG[size];

  return {
    borderColor: theme.colors.white900,
    borderStyle: 'solid',
    borderWidth: theme.borderWidths[sizeConfig.borderWidthKey],
    marginLeft: isFirst ? 0 : -theme.sizes[sizeConfig.overlapSizeKey],
    borderRadius: AVATAR_BORDER_RADII[rounded] ?? AVATAR_BORDER_RADII.full,
  };
};

/** Typography for the overflow label rendered on top of the last avatar. */
export const getAvatarGroupOverlayTextStyles = (
  theme: TwigsTheme,
  size: AvatarSizeProp
): TextStyle => {
  const sizeConfig = AVATAR_GROUP_SIZE_CONFIG[size];

  return {
    fontSize: theme.fontSizes[sizeConfig.overlayFontSizeKey],
    lineHeight: theme.lineHeights[sizeConfig.overlayLineHeightKey],
    letterSpacing: sizeConfig.overlayLetterSpacing,
  };
};
