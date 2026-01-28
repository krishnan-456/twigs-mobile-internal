import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { resolveMargin, resolvePadding, createTextStyle } from '../utils';
import { useTheme } from '../context';
import type { TextProps } from './types';

const DEFAULT_FONT_SIZE = 14;

export const Text: React.FC<TextProps> = ({ children, css, style, ...rest }) => {
  const theme = useTheme();
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

  const fontFamily = rest.fontFamily ?? theme.fonts.regular;
  const fontWeight = rest.fontWeight ?? '400';

  const dynamicStyles: TextStyle = {
    fontSize: rest.fontSize ?? DEFAULT_FONT_SIZE,
    ...createTextStyle(fontFamily, fontWeight),
    color: rest.color ?? theme.colors.neutral900,
    marginTop: resolvedMargin.top,
    marginBottom: resolvedMargin.bottom,
    marginLeft: resolvedMargin.left,
    marginRight: resolvedMargin.right,
    paddingTop: resolvedPadding.top,
    paddingBottom: resolvedPadding.bottom,
    paddingLeft: resolvedPadding.left,
    paddingRight: resolvedPadding.right,
  };
  if (rest.textAlign) dynamicStyles.textAlign = rest.textAlign;
  if (rest.textDecoration) dynamicStyles.textDecorationLine = rest.textDecoration;
  if (rest.textTransform) dynamicStyles.textTransform = rest.textTransform;
  if (rest.fontStyle) dynamicStyles.fontStyle = rest.fontStyle;
  if (rest.lineHeight !== undefined) dynamicStyles.lineHeight = rest.lineHeight;
  if (rest.letterSpacing !== undefined) dynamicStyles.letterSpacing = rest.letterSpacing;

  return (
    <RNText
      style={[dynamicStyles, css, style]}
      numberOfLines={rest.numberOfLines}
      ellipsizeMode={rest.ellipsizeMode}
    >
      {children}
    </RNText>
  );
};
