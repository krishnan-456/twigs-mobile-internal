import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import { useTheme } from '../context';
import type { LineLoaderProps } from './types';
import { LINE_LOADER_DIMENSIONS } from './constants';
import { getLoaderColors } from './helpers';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
});

/** Animated horizontal line loader with a sliding dot indicator. */
export const LineLoader = React.forwardRef<View, LineLoaderProps>(
  ({ size = 'sm', color = 'primary', css, style }, ref) => {
    const theme = useTheme();
    const progress = useSharedValue(0);

    const colors = useMemo(() => getLoaderColors(theme, color), [theme, color]);
    const { width, height } = LINE_LOADER_DIMENSIONS[size] ?? LINE_LOADER_DIMENSIONS.sm;

    useEffect(() => {
      progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, false);
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => {
      const p = progress.value;
      const translateX = (p - 0.5) * width * 1.4;
      const opacity = p < 0.1 ? p * 10 : p > 0.9 ? (1 - p) * 10 : 1;

      return {
        transform: [{ translateX }],
        opacity,
        width: width * 0.4,
        height,
        backgroundColor: colors.fg,
        borderRadius: height / 2,
      };
    }, [width, height, colors.fg]);

    const containerStyle = useMemo(
      () => ({
        width,
        height,
        backgroundColor: colors.bg,
        borderRadius: height / 2,
      }),
      [width, height, colors.bg]
    );

    return (
      <View
        ref={ref}
        style={[styles.container, containerStyle, css, style]}
        accessibilityRole="progressbar"
        accessible
      >
        <AnimatedView style={animatedStyle} />
      </View>
    );
  }
);

LineLoader.displayName = 'LineLoader';
