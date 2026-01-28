import React from 'react';
import { View, ViewStyle } from 'react-native';
import { resolveMargin, resolvePadding } from '../utils';
import type { FlexProps } from './types';

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
  if (rest.flexBasis !== undefined) dynamicStyles.flexBasis = rest.flexBasis;
  if (rest.alignSelf) dynamicStyles.alignSelf = rest.alignSelf;
  if (rest.gap !== undefined) dynamicStyles.gap = rest.gap;

  return <View style={[dynamicStyles, css, style]}>{children}</View>;
};
