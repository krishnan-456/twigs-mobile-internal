import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { resolveMargin, resolvePadding } from '../utils';
import type { FlexProps } from './types';

export const Flex = React.forwardRef<View, FlexProps>(
  ({ css, style, children, ...rest }, ref) => {
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

    const dynamicStyles: ViewStyle = useMemo(() => {
      const s: ViewStyle = {
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

      if (rest.align) s.alignItems = rest.align;
      if (rest.justify) s.justifyContent = rest.justify;
      if (rest.wrap) s.flexWrap = rest.wrap;
      if (rest.flex !== undefined) s.flex = rest.flex;
      if (rest.flexGrow !== undefined) s.flexGrow = rest.flexGrow;
      if (rest.flexShrink !== undefined) s.flexShrink = rest.flexShrink;
      if (rest.flexBasis !== undefined) s.flexBasis = rest.flexBasis;
      if (rest.alignSelf) s.alignSelf = rest.alignSelf;
      if (rest.gap !== undefined) s.gap = rest.gap;

      return s;
    }, [
      rest.direction,
      rest.align,
      rest.justify,
      rest.wrap,
      rest.flex,
      rest.flexGrow,
      rest.flexShrink,
      rest.flexBasis,
      rest.alignSelf,
      rest.gap,
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
      <View
        ref={ref}
        style={[dynamicStyles, css, style]}
        accessible={rest.accessible}
        accessibilityRole={rest.accessibilityRole}
        accessibilityLabel={rest.accessibilityLabel}
        accessibilityHint={rest.accessibilityHint}
        accessibilityState={rest.accessibilityState}
        accessibilityValue={rest.accessibilityValue}
        accessibilityViewIsModal={rest.accessibilityViewIsModal}
        accessibilityElementsHidden={rest.accessibilityElementsHidden}
        accessibilityLiveRegion={rest.accessibilityLiveRegion}
        importantForAccessibility={rest.importantForAccessibility}
      >
        {children}
      </View>
    );
  }
);

Flex.displayName = 'Flex';
