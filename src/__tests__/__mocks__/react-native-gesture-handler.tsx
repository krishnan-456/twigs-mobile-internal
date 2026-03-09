import React from 'react';
import { View } from 'react-native';

export const GestureHandlerRootView = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  style?: any;
}) => React.createElement(View, props, children);

const makePan = (): any => {
  const self: any = {};
  const chain = () => self;
  self.activeOffsetX = chain;
  self.activeOffsetY = chain;
  self.failOffsetX = chain;
  self.failOffsetY = chain;
  self.onBegin = chain;
  self.onUpdate = chain;
  self.onChange = chain;
  self.onEnd = chain;
  self.onFinalize = chain;
  return self;
};

const makeTap = (): any => {
  const self: any = {};
  const chain = () => self;
  self.maxDuration = chain;
  self.onEnd = chain;
  return self;
};

const NoopGesture = {
  Pan: () => makePan(),
  Tap: () => makeTap(),
  Race: (..._args: any[]) => ({}),
};

export const Gesture = NoopGesture;

export const GestureDetector = ({
  children,
}: {
  gesture: any;
  children: React.ReactNode;
}) => React.createElement(React.Fragment, null, children);
