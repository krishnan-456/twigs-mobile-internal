import React, { useMemo } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { Flex } from '../flex';
import { Text } from '../text';
import { useTheme } from '../context';
import type { AvatarProps, AvatarSize, AvatarSizeProp } from './types';

interface AvatarColor {
  bg: string;
  text: string;
}

const styles = StyleSheet.create({
  avatarBase: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AVATAR_COLORS: AvatarColor[] = [
  { bg: '#F4BEB44D', text: '#AB857E' },
  { bg: '#A65E6E4D', text: '#74424D' },
  { bg: '#C083D84D', text: '#865C97' },
  { bg: '#5F5CB04D', text: '#43407B' },
  { bg: '#7158F54D', text: '#4F3EAC' },
  { bg: '#84BCEF4D', text: '#5C84A7' },
];

const AVATAR_DIMENSIONS: Record<AvatarSizeProp, { width: number; height: number }> = {
  xs: { width: 20, height: 20 },
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 40, height: 40 },
  xl: { width: 48, height: 48 },
  '2xl': { width: 56, height: 56 },
  '3xl': { width: 64, height: 64 },
  '4xl': { width: 72, height: 72 },
  '5xl': { width: 120, height: 120 },
};

const AVATAR_FONT_SIZES: Record<AvatarSizeProp, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 19.2,
  '2xl': 19.2,
  '3xl': 19.2,
  '4xl': 23.04,
  '5xl': 39.808,
};

const getAvatarSize = (rounded: AvatarSize): number => {
  switch (rounded) {
    case 'xs':
      return 4;
    case 'sm':
      return 8;
    case 'md':
      return 12;
    case 'lg':
      return 16;
    case 'xl':
      return 20;
    case '2xl':
      return 24;
    case '3xl':
      return 32;
    case 'full':
      return 999;
    default:
      return 999;
  }
};

const getFallbackInitials = (name: string): string => {
  const [firstName, lastName] = name?.trim()?.split(' ') ?? [];
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${firstInitial}${lastInitial}`;
};

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
  const randomColor = useMemo(() => {
    const firstLetter = name.charAt(0).toUpperCase();
    return (
      AVATAR_COLORS[(firstLetter.charCodeAt(0) % 65) % AVATAR_COLORS.length] || {
        bg: '#64748B14',
        text: '#64748B',
      }
    );
  }, [name]);

  const avatarWidth = size ? AVATAR_DIMENSIONS[size].width : (width ?? 32);
  const avatarHeight = size ? AVATAR_DIMENSIONS[size].height : (height ?? 32);
  const avatarFontSize = textSize ?? (size ? AVATAR_FONT_SIZES[size] : 14);
  const avatarBorderRadius = getAvatarSize(rounded);

  const avatarStyles: ViewStyle = useMemo(
    () => ({
      width: avatarWidth,
      height: avatarHeight,
      borderRadius: avatarBorderRadius,
      backgroundColor: backgroundColor ?? randomColor.bg,
    }),
    [avatarWidth, avatarHeight, avatarBorderRadius, backgroundColor, randomColor.bg]
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
    <Flex css={StyleSheet.flatten([styles.avatarBase, avatarStyles, css, style])}>
      {imageSrc ? (
        <Image source={{ uri: imageSrc }} style={imageStyle} />
      ) : (
        <Text
          fontSize={avatarFontSize}
          fontFamily={theme.fonts.bold}
          color={textColor ?? randomColor.text}
        >
          {getFallbackInitials(name)}
        </Text>
      )}
    </Flex>
  );
};
