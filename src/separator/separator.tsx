import React, { forwardRef, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { resolveMargin } from '../utils';
import { useTheme } from '../context';
import type { SeparatorProps } from './types';

export const Separator = forwardRef<View, SeparatorProps>(
  ({ orientation = 'horizontal', color, decorative = false, css, style, testID, ...rest }, ref) => {
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

    const resolvedMargin = resolveMargin(marginProps);

    const dynamicStyles: ViewStyle = useMemo(
      () => ({
        marginTop: resolvedMargin.top,
        marginBottom: resolvedMargin.bottom,
        marginLeft: resolvedMargin.left,
        marginRight: resolvedMargin.right,
        backgroundColor: color ?? theme.colors.neutral200,
        ...(orientation === 'horizontal'
          ? { height: 1, width: '100%' as const }
          : { width: 1, height: '100%' as const }),
      }),
      [resolvedMargin, color, theme.colors.neutral200, orientation]
    );

    return (
      <View
        ref={ref}
        testID={testID}
        style={[dynamicStyles, css, style]}
        accessible={decorative ? false : rest.accessible}
        accessibilityRole={decorative ? undefined : 'none'}
        accessibilityLabel={decorative ? undefined : rest.accessibilityLabel}
        accessibilityHint={decorative ? undefined : rest.accessibilityHint}
        accessibilityState={decorative ? undefined : rest.accessibilityState}
        accessibilityValue={decorative ? undefined : rest.accessibilityValue}
        accessibilityViewIsModal={rest.accessibilityViewIsModal}
        accessibilityElementsHidden={decorative ? true : rest.accessibilityElementsHidden}
        accessibilityLiveRegion={rest.accessibilityLiveRegion}
        importantForAccessibility={
          decorative ? 'no-hide-descendants' : rest.importantForAccessibility
        }
      />
    );
  }
);

Separator.displayName = 'Separator';
