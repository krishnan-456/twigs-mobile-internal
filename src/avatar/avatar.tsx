import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { Box } from '../box';
import { Text } from '../text';
import { useTheme } from '../context';
import type { AvatarProps } from './types';
import {
  AVATAR_ANONYMOUS_BORDER_WIDTHS,
  AVATAR_DIMENSIONS,
  AVATAR_FONT_SIZES,
  DEFAULT_AVATAR_NAME,
} from './constants';
import { getAvatarBorderRadius, getFallbackInitials } from './helpers';
import { avatarStyles } from './styles';

/** Displays a user avatar with image, initials fallback, or anonymous placeholder. */
export const Avatar = React.forwardRef<View, AvatarProps>(
  (
    {
      imageSrc,
      isAnonymous = false,
      name = DEFAULT_AVATAR_NAME,
      textColor,
      textSize,
      backgroundColor,
      width,
      height,
      rounded = 'full',
      size,
      children,
      css,
      style,
      accessible = true,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const [imageLoadFailed, setImageLoadFailed] = useState(false);

    const resolvedImageSrc = imageSrc ?? '';
    const avatarWidth = size ? AVATAR_DIMENSIONS[size].width : (width ?? 32);
    const avatarHeight = size ? AVATAR_DIMENSIONS[size].height : (height ?? 32);
    const avatarFontSize = textSize ?? (size ? AVATAR_FONT_SIZES[size] : 14);
    const avatarBorderRadius = getAvatarBorderRadius(rounded);
    const anonymousBorderWidth = size ? AVATAR_ANONYMOUS_BORDER_WIDTHS[size] : 1.5;
    const shouldUseImage = Boolean(resolvedImageSrc) && !imageLoadFailed && !isAnonymous;

    useEffect(() => {
      setImageLoadFailed(false);
    }, [resolvedImageSrc]);

    const dynamicStyles: ViewStyle = useMemo(
      () => ({
        width: avatarWidth,
        height: avatarHeight,
        borderRadius: avatarBorderRadius,
        backgroundColor:
          backgroundColor ?? (isAnonymous ? theme.colors.neutral50 : theme.colors.neutral100),
        ...(isAnonymous && {
          borderWidth: anonymousBorderWidth,
          borderStyle: 'dashed',
          borderColor: theme.colors.neutral500,
        }),
      }),
      [
        avatarWidth,
        avatarHeight,
        avatarBorderRadius,
        backgroundColor,
        isAnonymous,
        anonymousBorderWidth,
        theme.colors.neutral50,
        theme.colors.neutral100,
        theme.colors.neutral500,
      ]
    );

    const containerStyles: ViewStyle = useMemo(
      () => StyleSheet.flatten([avatarStyles.avatarBase, dynamicStyles, css]) || {},
      [dynamicStyles, css]
    );

    const imageStyle = useMemo(
      () => ({
        width: avatarWidth,
        height: avatarHeight,
        borderRadius: avatarBorderRadius,
      }),
      [avatarWidth, avatarHeight, avatarBorderRadius]
    );

    const fallbackText = isAnonymous ? '?' : getFallbackInitials(name);
    const resolvedAccessibilityLabel =
      accessibilityLabel ??
      (isAnonymous ? 'Anonymous avatar' : name !== DEFAULT_AVATAR_NAME ? name : undefined);

    return (
      <Box
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? 'image'}
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={accessibilityState}
        css={containerStyles}
        style={style}
        {...rest}
      >
        {shouldUseImage ? (
          <Image
            source={{ uri: resolvedImageSrc }}
            style={imageStyle}
            accessibilityIgnoresInvertColors
            onError={() => setImageLoadFailed(true)}
          />
        ) : (
          <Text
            fontSize={avatarFontSize}
            fontFamily={theme.fonts.bold}
            color={textColor ?? theme.colors.neutral600}
            textAlign="center"
          >
            {fallbackText}
          </Text>
        )}
        {children}
      </Box>
    );
  }
);

Avatar.displayName = 'Avatar';
