import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import {
  MarginProps,
  PaddingProps,
  CommonStyleProps,
  resolveMargin,
  resolvePadding,
} from '../utils';

export interface FlexProps extends MarginProps, PaddingProps, CommonStyleProps {
  children?: ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: number;
}

export const Flex: React.FC<FlexProps> = ({ css, style, children, ...rest }) => {
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
    flexDirection: rest.direction || 'column',
    marginTop: resolvedMargin.top,
    marginBottom: resolvedMargin.bottom,
    marginLeft: resolvedMargin.left,
    marginRight: resolvedMargin.right,
    paddingTop: resolvedPadding.top,
    paddingBottom: resolvedPadding.bottom,
    paddingLeft: resolvedPadding.left,
    paddingRight: resolvedPadding.right,
  };

  if (rest.align) dynamicStyles.alignItems = rest.align;
  if (rest.justify) dynamicStyles.justifyContent = rest.justify;
  if (rest.wrap) dynamicStyles.flexWrap = rest.wrap;
  if (rest.flex !== undefined) dynamicStyles.flex = rest.flex;
  if (rest.flexGrow !== undefined) dynamicStyles.flexGrow = rest.flexGrow;
  if (rest.flexShrink !== undefined) dynamicStyles.flexShrink = rest.flexShrink;
  if (rest.flexBasis !== undefined) {
    if (typeof rest.flexBasis === 'number') {
      dynamicStyles.flexBasis = rest.flexBasis;
    } else {
      dynamicStyles.flexBasis = rest.flexBasis as any;
    }
  }
  if (rest.alignSelf) dynamicStyles.alignSelf = rest.alignSelf;
  if (rest.gap !== undefined) dynamicStyles.gap = rest.gap;

  return <View style={[dynamicStyles, css, style]}>{children}</View>;
};
