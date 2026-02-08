import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import type { ButtonSize } from './types';
import { LOADER_SIZES } from './constants';

interface LineLoaderProps {
  color: string;
  size: ButtonSize;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export const LineLoader: React.FC<LineLoaderProps> = ({ color, size }) => {
  const progress = useSharedValue(0);

  const { width, height, backgroundColor } = React.useMemo(() => {
    const dimensions = LOADER_SIZES[size] || LOADER_SIZES.sm;
    return {
      ...dimensions,
      backgroundColor: color + '26',
    };
  }, [size, color]);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, false);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const animationProgress = progress.value;
    const translateX = (animationProgress - 0.5) * width * 1.4;
    const opacity =
      animationProgress < 0.1
        ? animationProgress * 10
        : animationProgress > 0.9
          ? (1 - animationProgress) * 10
          : 1;

    return {
      transform: [{ translateX }],
      opacity,
      width: width * 0.4,
      height: height,
      backgroundColor: color,
      borderRadius: height / 2,
    };
  }, [width, height, color]);

  const containerStyles = {
    width,
    height,
    backgroundColor,
    borderRadius: height / 2,
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <AnimatedView style={animatedStyle} />
    </View>
  );
};
