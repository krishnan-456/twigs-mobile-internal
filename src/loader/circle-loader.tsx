import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
import { useTheme } from '../context';
import type { CircleLoaderProps } from './types';
import { CIRCLE_LOADER_DIAMETERS, CIRCLE_STROKE_WIDTHS } from './constants';
import { getLoaderColors } from './helpers';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/** Animated circular spinner using SVG arcs with a rotating quarter-circle indicator. */
export const CircleLoader = React.forwardRef<View, CircleLoaderProps>(
  ({ size = 'md', color = 'primary', css, style }, ref) => {
    const theme = useTheme();
    const rotation = useSharedValue(0);

    const colors = useMemo(() => getLoaderColors(theme, color), [theme, color]);
    const diameter = CIRCLE_LOADER_DIAMETERS[size] ?? 12;
    const strokeWidth = CIRCLE_STROKE_WIDTHS[size] ?? 2;
    const radius = (diameter - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
      rotation.value = withRepeat(
        withTiming(360, { duration: 800, easing: Easing.linear }),
        -1,
        false
      );
    }, [rotation]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const sizeStyle = useMemo(
      () => ({ width: diameter, height: diameter }),
      [diameter]
    );

    return (
      <View
        ref={ref}
        style={[styles.container, sizeStyle, css, style]}
        accessibilityRole="progressbar"
        accessible
      >
        <Animated.View style={[sizeStyle, animatedStyle]}>
          <Svg width={diameter} height={diameter}>
            <Circle
              cx={diameter / 2}
              cy={diameter / 2}
              r={radius}
              stroke={colors.bg}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={diameter / 2}
              cy={diameter / 2}
              r={radius}
              stroke={colors.fg}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
              strokeLinecap="round"
            />
          </Svg>
        </Animated.View>
      </View>
    );
  }
);

CircleLoader.displayName = 'CircleLoader';
