import React, { useMemo } from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { resolveMargin, resolvePadding, createTextStyle } from '../utils';
import { useTheme } from '../context';
import type { TextProps } from './types';

const DEFAULT_FONT_SIZE = 14;

export const Text = React.forwardRef<RNText, TextProps>(
  ({ children, css, style, ...rest }, ref) => {
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

    const dynamicStyles: TextStyle = useMemo(() => {
      const s: TextStyle = {
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
      if (rest.textAlign) s.textAlign = rest.textAlign;
      if (rest.textDecoration) s.textDecorationLine = rest.textDecoration;
      if (rest.textTransform) s.textTransform = rest.textTransform;
      if (rest.fontStyle) s.fontStyle = rest.fontStyle;
      if (rest.lineHeight !== undefined) s.lineHeight = rest.lineHeight;
      if (rest.letterSpacing !== undefined) s.letterSpacing = rest.letterSpacing;
      return s;
    }, [
      rest.fontSize,
      rest.color,
      rest.textAlign,
      rest.textDecoration,
      rest.textTransform,
      rest.fontStyle,
      rest.lineHeight,
      rest.letterSpacing,
      fontFamily,
      fontWeight,
      theme,
      resolvedMargin.top,
      resolvedMargin.bottom,
      resolvedMargin.left,
      resolvedMargin.right,
      resolvedPadding.top,
      resolvedPadding.bottom,
      resolvedPadding.left,
      resolvedPadding.right,
    ]);

    return (
      <RNText
        ref={ref}
        style={[dynamicStyles, css, style]}
        numberOfLines={rest.numberOfLines}
        ellipsizeMode={rest.ellipsizeMode}
        accessible={rest.accessible}
        accessibilityRole={rest.accessibilityRole}
        accessibilityLabel={rest.accessibilityLabel}
        accessibilityHint={rest.accessibilityHint}
        accessibilityState={rest.accessibilityState}
      >
        {children}
      </RNText>
    );
  }
);

Text.displayName = 'Text';
