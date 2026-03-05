import React, { forwardRef } from 'react';
import { View, ViewStyle } from 'react-native';
import { resolveMargin, resolvePadding } from '../utils';
import type { BoxProps } from './types';

export const Box = forwardRef<View, BoxProps>(({ css, style, children, ...rest }, ref) => {
  const {
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...viewProps
  } = rest;

  const marginProps = {
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  };
  const paddingProps = {
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  };

  const resolvedMargin = resolveMargin(marginProps);
  const resolvedPadding = resolvePadding(paddingProps);

  const dynamicStyles: ViewStyle = {
    marginTop: resolvedMargin.top,
    marginBottom: resolvedMargin.bottom,
    marginLeft: resolvedMargin.left,
    marginRight: resolvedMargin.right,
    paddingTop: resolvedPadding.top,
    paddingBottom: resolvedPadding.bottom,
    paddingLeft: resolvedPadding.left,
    paddingRight: resolvedPadding.right,
  };

  return (
    <View ref={ref} style={[dynamicStyles, css, style]} {...viewProps}>
      {children}
    </View>
  );
});

Box.displayName = 'Box';
