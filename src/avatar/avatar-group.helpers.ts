import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import { AVATAR_BORDER_RADII } from './constants';
import { AVATAR_GROUP_SIZE_CONFIG } from './avatar-group.constants';
import type { AvatarGroupProps } from './avatar-group.types';
import type { AvatarProps, AvatarSize, AvatarSizeProp } from './types';

export const isAvatarElement = (child: React.ReactNode): child is React.ReactElement<AvatarProps> =>
  React.isValidElement<AvatarProps>(child);

export const getAvatarChildren = (
  children: AvatarGroupProps['children']
): React.ReactElement<AvatarProps>[] => React.Children.toArray(children).filter(isAvatarElement);

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
    borderWidth: sizeConfig.borderWidth,
    marginLeft: isFirst ? 0 : -sizeConfig.overlap,
    borderRadius: AVATAR_BORDER_RADII[rounded] ?? AVATAR_BORDER_RADII.full,
  };
};

/** Typography for the overflow label rendered on top of the last avatar. */
export const getAvatarGroupOverlayTextStyles = (
  size: AvatarSizeProp
): TextStyle => {
  const sizeConfig = AVATAR_GROUP_SIZE_CONFIG[size];

  return {
    fontSize: sizeConfig.overlayFontSize,
    lineHeight: sizeConfig.overlayLineHeight,
    letterSpacing: sizeConfig.overlayLetterSpacing,
  };
};
