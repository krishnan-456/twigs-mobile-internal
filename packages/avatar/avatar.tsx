import React, { useMemo } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { CommonStyleProps } from '../utils';
import { Flex } from '../flex';
import { Text } from '../text';
import { useTheme } from '../context';

interface AvatarColor {
  bg: string;
  text: string;
}

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface AvatarProps extends CommonStyleProps {
  imageSrc?: string;
  name?: string;
  email?: string;
  textColor?: string;
  textSize?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
  rounded?: AvatarSize;
}

const styles = StyleSheet.create({
  avatarBase: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const avatarColors: AvatarColor[] = [
  { bg: '#F4BEB44D', text: '#AB857E' },
  { bg: '#A65E6E4D', text: '#74424D' },
  { bg: '#C083D84D', text: '#865C97' },
  { bg: '#5F5CB04D', text: '#43407B' },
  { bg: '#7158F54D', text: '#4F3EAC' },
  { bg: '#84BCEF4D', text: '#5C84A7' },
];

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

export const Avatar: React.FC<AvatarProps> = ({
  imageSrc,
  name,
  email,
  textColor,
  textSize,
  backgroundColor,
  width = 32,
  height = 32,
  rounded = 'full',
  css,
  style,
}) => {
  const theme = useTheme();
  const randomColor = useMemo(() => {
    const firstLetter = name?.charAt(0).toUpperCase() ?? '?';
    return (
      avatarColors[(firstLetter.charCodeAt(0) % 65) % avatarColors.length] || {
        bg: '#64748B14',
        text: '#64748B',
      }
    );
  }, [name]);

  const cleanedName = useMemo(() => name?.replace(/[^\p{L}\p{N}]/gu, '') || email, [name, email]);

  const avatarStyles: ViewStyle = {
    width,
    height,
    borderRadius: getAvatarSize(rounded),
    backgroundColor: backgroundColor ? backgroundColor : randomColor?.bg,
  };

  return (
    <Flex css={StyleSheet.flatten([styles.avatarBase, avatarStyles, css, style])}>
      {imageSrc ? (
        <Image
          source={{ uri: imageSrc }}
          style={{
            height: height,
            width: width,
            borderRadius: getAvatarSize(rounded),
          }}
        />
      ) : (
        <Text
          fontSize={textSize ? textSize : 14}
          fontFamily={theme.fonts.bold}
          fontWeight="700"
          color={textColor ? textColor : randomColor?.text}
        >
          {cleanedName?.charAt(0)?.toUpperCase()}
        </Text>
      )}
    </Flex>
  );
};
