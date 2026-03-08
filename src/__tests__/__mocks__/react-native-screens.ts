import React from 'react';
import { View } from 'react-native';

export const FullWindowOverlay = ({ children }: { children: React.ReactNode }) =>
  React.createElement(View, { testID: 'FullWindowOverlay' }, children);
