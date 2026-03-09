import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import { useTheme } from '../context';
import type { SwitchProps } from './types';
import { DEFAULT_SWITCH_SIZE, getSwitchSizeConfig } from './constants';
import { createSwitchStyles } from './styles';

export const Switch = React.forwardRef<View, SwitchProps>(
  (
    {
      value,
      onValueChange,
      checked,
      defaultChecked = false,
      onChange,
      disabled = false,
      size = DEFAULT_SWITCH_SIZE,
      css,
      style,
      accessible = true,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      accessibilityValue,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = createSwitchStyles(theme);
    const sizeConfig = getSwitchSizeConfig(size);
    const isControlled = checked !== undefined || value !== undefined;
    const [internalChecked, setInternalChecked] = useState(checked ?? value ?? defaultChecked);
    const resolvedChecked = checked ?? value ?? internalChecked;
    const translateX = useSharedValue(
      resolvedChecked ? sizeConfig.thumb.onPosition : sizeConfig.thumb.offPosition
    );

    useEffect(() => {
      translateX.value = withTiming(
        resolvedChecked ? sizeConfig.thumb.onPosition : sizeConfig.thumb.offPosition,
        {
          duration: 150,
          easing: Easing.out(Easing.cubic),
        }
      );
    }, [resolvedChecked, sizeConfig.thumb.offPosition, sizeConfig.thumb.onPosition, translateX]);

    const handlePress = () => {
      if (disabled) {
        return;
      }

      const nextChecked = !resolvedChecked;

      if (!isControlled) {
        setInternalChecked(nextChecked);
      }

      onChange?.(nextChecked);
      onValueChange?.(nextChecked);
    };

    const thumbAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    const switchSizeStyles = useMemo(
      () => ({
        width: sizeConfig.track.width,
        height: sizeConfig.track.height,
      }),
      [sizeConfig.track.width, sizeConfig.track.height]
    );

    const thumbSizeStyles = useMemo(
      () => ({
        width: sizeConfig.thumb.size,
        height: sizeConfig.thumb.size,
      }),
      [sizeConfig.thumb.size]
    );

    const switchStateStyles = useMemo(
      () => ({
        backgroundColor: disabled
          ? resolvedChecked
            ? theme.colors.primary100
            : theme.colors.neutral200
          : resolvedChecked
            ? theme.colors.primary500
            : theme.colors.neutral400,
      }),
      [disabled, resolvedChecked, theme]
    );

    const resolvedAccessibilityState = {
      ...accessibilityState,
      checked: resolvedChecked,
      disabled,
    };

    const resolvedAccessibilityValue = {
      ...accessibilityValue,
      text: accessibilityValue?.text ?? (resolvedChecked ? 'On' : 'Off'),
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? 'switch'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={resolvedAccessibilityState}
        accessibilityValue={resolvedAccessibilityValue}
        style={[styles.switchBase, switchSizeStyles, switchStateStyles, css, style]}
        {...rest}
      >
        <AnimatedView style={[styles.thumbBase, thumbSizeStyles, thumbAnimatedStyle]} />
      </Pressable>
    );
  }
);

Switch.displayName = 'Switch';
