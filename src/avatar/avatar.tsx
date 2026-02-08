import React, { useMemo } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { Flex } from '../flex';
import { Text } from '../text';
import { useTheme } from '../context';
import type { AvatarProps } from './types';
import { AVATAR_DIMENSIONS, AVATAR_FONT_SIZES } from './constants';
import { getAvatarBorderRadius, getFallbackInitials } from './helpers';
import { avatarStyles } from './styles';

/** Avatar displaying an image or fallback initials, aligned with the web twigs library. */
export const Avatar: React.FC<AvatarProps> = ({
  imageSrc,
  name = '?',
  textColor,
  textSize,
  backgroundColor,
  width,
  height,
  rounded = 'full',
  size,
  css,
  style,
}) => {
  const theme = useTheme();

  const avatarWidth = size ? AVATAR_DIMENSIONS[size].width : (width ?? 32);
  const avatarHeight = size ? AVATAR_DIMENSIONS[size].height : (height ?? 32);
  const avatarFontSize = textSize ?? (size ? AVATAR_FONT_SIZES[size] : 14);
  const avatarBorderRadius = getAvatarBorderRadius(rounded);

  const dynamicStyles: ViewStyle = useMemo(
    () => ({
      width: avatarWidth,
      height: avatarHeight,
      borderRadius: avatarBorderRadius,
      backgroundColor: backgroundColor ?? theme.colors.neutral100,
    }),
    [avatarWidth, avatarHeight, avatarBorderRadius, backgroundColor, theme.colors.neutral100]
  );

  const imageStyle = useMemo(
    () => ({
      width: avatarWidth,
      height: avatarHeight,
      borderRadius: avatarBorderRadius,
    }),
    [avatarWidth, avatarHeight, avatarBorderRadius]
  );

  return (
    <Flex
      accessible
      accessibilityRole="image"
      accessibilityLabel={name !== '?' ? name : undefined}
      css={StyleSheet.flatten([avatarStyles.avatarBase, dynamicStyles, css, style])}
    >
      {imageSrc ? (
        <Image
          source={{ uri: imageSrc }}
          style={imageStyle}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <Text
          fontSize={avatarFontSize}
          fontFamily={theme.fonts.bold}
          color={textColor ?? theme.colors.neutral600}
        >
          {getFallbackInitials(name)}
        </Text>
      )}
    </Flex>
  );
};
