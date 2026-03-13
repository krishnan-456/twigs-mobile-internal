import React, { useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../context';
import { Text } from '../text';
import { colorOpacity } from '../utils';
import { Avatar } from './avatar';
import {
  DEFAULT_AVATAR_GROUP_LIMIT,
  DEFAULT_AVATAR_GROUP_ROUNDED,
  DEFAULT_AVATAR_GROUP_SIZE,
} from './avatar-group.constants';
import {
  getAvatarChildren,
  getAvatarGroupItemStyles,
  getAvatarGroupOverlayTextStyles,
} from './avatar-group.helpers';
import { avatarGroupStyles } from './avatar-group.styles';
import type { AvatarGroupProps } from './avatar-group.types';
import type { AvatarProps } from './types';

/** Overlapping avatar stack with optional "+N" overflow indicator. */
export const AvatarGroup = React.forwardRef<View, AvatarGroupProps>(
  (
    {
      limit = DEFAULT_AVATAR_GROUP_LIMIT,
      limitExceededLabel,
      size = DEFAULT_AVATAR_GROUP_SIZE,
      rounded = DEFAULT_AVATAR_GROUP_ROUNDED,
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
    const avatars = useMemo(() => getAvatarChildren(children), [children]);

    const avatarCount = avatars.length;
    const avatarLimit =
      limit == null || limit <= 0 ? avatarCount : Math.min(Math.floor(limit), avatarCount);
    const extraAvatarsCount = avatarCount - avatarLimit;

    const visibleAvatars = avatars.slice(0, avatarLimit);
    const overflowAvatar = extraAvatarsCount > 0 ? avatars[avatarLimit] : undefined;
    const overflowLabel =
      limitExceededLabel ?? (extraAvatarsCount > 0 ? `+${extraAvatarsCount}` : '');

    const overflowOverlayStyle: ViewStyle = useMemo(
      () => ({
        backgroundColor: colorOpacity(theme.colors.black900, 0.4),
      }),
      [theme.colors.black900]
    );

    const overflowLabelStyle = useMemo(
      () => getAvatarGroupOverlayTextStyles(size),
      [size]
    );

    return (
      <View
        ref={ref}
        accessible={accessible}
        // Mobile deviation: React Native does not support a "group" accessibilityRole.
        accessibilityRole={accessibilityRole ?? 'none'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={accessibilityState}
        style={[avatarGroupStyles.group, css, style]}
        {...rest}
      >
        {visibleAvatars.map((avatar, index) => {
          const childProps: AvatarProps = {
            size,
            rounded,
            ...avatar.props,
          };

          return (
            <View
              key={avatar.key != null ? String(avatar.key) : `avatar-group-item-${index}`}
              style={[
                avatarGroupStyles.item,
                getAvatarGroupItemStyles(theme, size, rounded, index === 0),
              ]}
            >
              {React.cloneElement(avatar, childProps)}
            </View>
          );
        })}

        {extraAvatarsCount > 0 && overflowAvatar ? (
          <View
            style={[avatarGroupStyles.item, getAvatarGroupItemStyles(theme, size, rounded, false)]}
          >
            <Avatar
              imageSrc={overflowAvatar.props.imageSrc}
              name={overflowAvatar.props.name}
              size={size}
              rounded={rounded}
              accessibilityLabel={overflowLabel}
            >
              <View style={[avatarGroupStyles.overflowOverlay, overflowOverlayStyle]}>
                <Text
                  color={theme.colors.white900}
                  fontFamily={theme.fonts.bold}
                  fontSize={overflowLabelStyle.fontSize}
                  lineHeight={overflowLabelStyle.lineHeight}
                  letterSpacing={overflowLabelStyle.letterSpacing}
                  textAlign="center"
                >
                  {overflowLabel}
                </Text>
              </View>
            </Avatar>
          </View>
        ) : null}
      </View>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
