import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedView, colorOpacity } from '../utils';
import { useTheme } from '../context';
import type { CircleLoaderProps } from './types';
import { CIRCLE_LOADER_DIAMETERS, CIRCLE_STROKE_WIDTHS } from './constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Animated circular spinner with size and color variants.
 * Aligned with the web twigs library's CircleLoader component.
 */
export const CircleLoader: React.FC<CircleLoaderProps> = ({
  size = 'md',
  color = 'primary',
  css,
  style,
}) => {
  const theme = useTheme();
  const rotation = useSharedValue(0);

  const colorMap: Record<string, { ring: string; dot: string }> = {
    primary: {
      ring: colorOpacity(theme.colors.primary800, 0.25),
      dot: theme.colors.primary800,
    },
    secondary: {
      ring: colorOpacity(theme.colors.secondary700, 0.4),
      dot: theme.colors.secondary700,
    },
    bright: {
      ring: colorOpacity(theme.colors.white900, 0.5),
      dot: theme.colors.white900,
    },
    negative: {
      ring: colorOpacity(theme.colors.negative500, 0.4),
      dot: theme.colors.negative700,
    },
    accent: {
      ring: colorOpacity(theme.colors.accent500, 0.2),
      dot: theme.colors.accent500,
    },
  };

  const diameter = CIRCLE_LOADER_DIAMETERS[size] ?? 12;
  const strokeWidth = CIRCLE_STROKE_WIDTHS[size] ?? 2;
  const colors = colorMap[color] ?? colorMap.primary;

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }),
    []
  );

  const loaderStyle = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    borderWidth: strokeWidth,
    borderColor: colors.ring,
    borderTopColor: colors.dot,
  };

  return (
    <View
      style={[styles.container, { width: diameter, height: diameter }, css, style]}
      accessibilityRole="progressbar"
      accessible
    >
      <AnimatedView style={[loaderStyle, animatedStyle]} />
    </View>
  );
};
