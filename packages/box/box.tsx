import React, { forwardRef, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import {
  MarginProps,
  PaddingProps,
  CommonStyleProps,
  resolveMargin,
  resolvePadding,
} from '../utils';

export interface BoxProps extends MarginProps, PaddingProps, CommonStyleProps {
  children?: ReactNode;
}

export const Box = forwardRef<View, BoxProps>(({ css, style, children, ...rest }, ref) => {
  const marginProps = {
    margin: rest.margin,
    marginHorizontal: rest.marginHorizontal,
    marginVertical: rest.marginVertical,
    marginTop: rest.marginTop,
    marginBottom: rest.marginBottom,
    marginLeft: rest.marginLeft,
    marginRight: rest.marginRight,
  };
  const paddingProps = {
    padding: rest.padding,
    paddingHorizontal: rest.paddingHorizontal,
    paddingVertical: rest.paddingVertical,
    paddingTop: rest.paddingTop,
    paddingBottom: rest.paddingBottom,
    paddingLeft: rest.paddingLeft,
    paddingRight: rest.paddingRight,
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
    <View ref={ref} style={[dynamicStyles, css, style]}>
      {children}
    </View>
  );
});

Box.displayName = 'Box';
