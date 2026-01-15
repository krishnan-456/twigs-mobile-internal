import React, { useEffect } from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AnimatedView, CommonStyleProps } from '../utils';
import { theme } from '../theme';

const SWITCH_WIDTH = 40;
const SWITCH_HEIGHT = 20;
const THUMB_SIZE = 18;
const THUMB_MARGIN = 1;

const THUMB_OFF_POSITION = THUMB_MARGIN;
const THUMB_ON_POSITION = SWITCH_WIDTH - THUMB_SIZE - THUMB_MARGIN;

const styles = StyleSheet.create({
  switch: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: 100,
    justifyContent: 'center',
  },
  switchDisabled: {
    opacity: 0.5,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 100,
    backgroundColor: theme.colors.white900,
  },
});

export interface SwitchProps extends Omit<PressableProps, 'onPress' | 'style'>, CommonStyleProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
}

export const Switch = React.forwardRef<View, SwitchProps>(
  ({ value = false, onValueChange, disabled = false, css, style, ...rest }, ref) => {
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
      backgroundColor: value ? '#448E97' : theme.colors.neutral400,
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        style={[styles.switch, switchDynamicStyles, disabled && styles.switchDisabled, css, style]}
        {...rest}
      >
        <AnimatedView style={[styles.thumb, thumbStyle]} />
      </Pressable>
    );
  }
);

Switch.displayName = 'Switch';
