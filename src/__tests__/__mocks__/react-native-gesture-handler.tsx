import React from 'react';
import { View } from 'react-native';

export const GestureHandlerRootView = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  style?: any;
}) => React.createElement(View, props, children);

const NoopGesture = {
  Pan: () => ({
    activeOffsetX: () => NoopGesture.Pan(),
    activeOffsetY: () => NoopGesture.Pan(),
    failOffsetX: () => NoopGesture.Pan(),
    failOffsetY: () => NoopGesture.Pan(),
    onBegin: () => NoopGesture.Pan(),
    onUpdate: () => NoopGesture.Pan(),
    onEnd: () => NoopGesture.Pan(),
    onFinalize: () => NoopGesture.Pan(),
  }),
  Tap: () => ({
    maxDuration: () => NoopGesture.Tap(),
    onEnd: () => NoopGesture.Tap(),
  }),
  Race: (..._args: any[]) => ({}),
};

export const Gesture = NoopGesture;

export const GestureDetector = ({
  children,
}: {
  gesture: any;
  children: React.ReactNode;
}) => React.createElement(React.Fragment, null, children);
