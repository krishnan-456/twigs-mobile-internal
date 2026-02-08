import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import { useTheme } from '../context';
import type { SwitchProps } from './types';
import { THUMB_OFF_POSITION, THUMB_ON_POSITION } from './constants';
import { createSwitchStyles } from './styles';

export const Switch = React.forwardRef<View, SwitchProps>(
  ({ value = false, onValueChange, disabled = false, css, style, ...rest }, ref) => {
    const theme = useTheme();
    const styles = createSwitchStyles(theme);
    const translateX = useSharedValue(value ? THUMB_ON_POSITION : THUMB_OFF_POSITION);

    useEffect(() => {
      translateX.value = withTiming(value ? THUMB_ON_POSITION : THUMB_OFF_POSITION, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handlePress = () => {
      if (!disabled && onValueChange) {
        onValueChange(!value);
      }
    };

    const thumbStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    const switchDynamicStyles = {
      backgroundColor: value ? theme.colors.primary500 : theme.colors.neutral400,
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        accessible
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        accessibilityValue={{ text: value ? 'On' : 'Off' }}
        style={[styles.switch, switchDynamicStyles, disabled && styles.switchDisabled, css, style]}
        {...rest}
      >
        <AnimatedView style={[styles.thumb, thumbStyle]} />
      </Pressable>
    );
  }
);

Switch.displayName = 'Switch';
