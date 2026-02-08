import React from 'react';
import { View } from 'react-native';

export const useSharedValue = (initialValue: number) => ({ value: initialValue });
export const useAnimatedStyle = (fn: () => object) => fn();
export const withTiming = (value: number) => value;
export const withSpring = (value: number) => value;
export const withRepeat = (value: number) => value;
export const Easing = {
  out: (fn: (t: number) => number) => fn,
  cubic: (t: number) => t,
};

const Animated = {
  View: React.forwardRef((props: any, ref: any) => React.createElement(View, { ...props, ref })),
};

export default Animated;
