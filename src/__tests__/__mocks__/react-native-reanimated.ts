import React from 'react';
import { View } from 'react-native';

export const useSharedValue = (initialValue: number) => ({ value: initialValue });
export const useAnimatedStyle = (fn: () => object) => fn();
export const withTiming = (value: number, _config?: object, callback?: (finished: boolean) => void) => {
  callback?.(true);
  return value;
};
export const withSpring = (value: number) => value;
export const withRepeat = (value: number) => value;
export const runOnJS = (fn: Function) => fn;
export const interpolate = (
  value: number,
  inputRange: number[],
  outputRange: number[],
) => {
  if (inputRange.length < 2 || outputRange.length < 2) return outputRange[0] ?? 0;
  const ratio = (value - inputRange[0]) / (inputRange[1] - inputRange[0]);
  const clamped = Math.max(0, Math.min(1, ratio));
  return outputRange[0] + clamped * (outputRange[1] - outputRange[0]);
};

export const Extrapolation = {
  CLAMP: 'clamp',
  EXTEND: 'extend',
  IDENTITY: 'identity',
};

export const Easing = {
  out: (fn: (t: number) => number) => fn,
  cubic: (t: number) => t,
};

const Animated = {
  View: React.forwardRef((props: any, ref: any) => React.createElement(View, { ...props, ref })),
};

export default Animated;
