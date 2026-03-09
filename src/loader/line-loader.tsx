import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { AnimatedView, colorOpacity } from '../utils';
import { useTheme } from '../context';
import type { LineLoaderProps } from './types';
import { LINE_LOADER_DIMENSIONS } from './constants';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
});

export const LineLoader = React.forwardRef<View, LineLoaderProps>(
  ({ size = 'sm', color = 'primary', css, style }, ref) => {
    const theme = useTheme();
    const progress = useSharedValue(0);

    const colorMap: Record<string, { track: string; dot: string }> = useMemo(
      () => ({
        primary: {
          track: colorOpacity(theme.colors.primary800, 0.25),
          dot: theme.colors.primary800,
        },
        secondary: {
          track: colorOpacity(theme.colors.secondary700, 0.4),
          dot: theme.colors.secondary700,
        },
        bright: {
          track: colorOpacity(theme.colors.white900, 0.5),
          dot: theme.colors.white900,
        },
        negative: {
          track: colorOpacity(theme.colors.negative500, 0.4),
          dot: theme.colors.negative700,
        },
        accent: {
          track: colorOpacity(theme.colors.accent500, 0.2),
          dot: theme.colors.accent500,
        },
      }),
      [theme]
    );

    const { width, height } = LINE_LOADER_DIMENSIONS[size] ?? LINE_LOADER_DIMENSIONS.sm;
    const colors = colorMap[color] ?? colorMap.primary;

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
        backgroundColor: colors.dot,
        borderRadius: height / 2,
      };
    }, [width, height, colors.dot]);

    const containerStyle = useMemo(
      () => ({
        width,
        height,
        backgroundColor: colors.track,
        borderRadius: height / 2,
      }),
      [width, height, colors.track]
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
