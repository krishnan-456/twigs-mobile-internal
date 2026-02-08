import React from 'react';
import { View } from 'react-native';

export const Svg = React.forwardRef((props: any, ref: any) =>
  React.createElement(View, { ...props, ref })
);
export const Path = React.forwardRef((props: any, ref: any) =>
  React.createElement(View, { ...props, ref })
);
export default Svg;
