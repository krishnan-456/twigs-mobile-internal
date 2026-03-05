import React, { useMemo } from 'react';
import { View, Text as RNText } from 'react-native';
import { useTheme } from '../context';
import type { BadgeProps } from './types';
import { DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_ROUNDED } from './constants';
import { getSizeStyles, getColorStyles, getTextStyles, getIconSize, getIconColor } from './helpers';
import { styles } from './styles';

/**
 * Badge component displays compact pill-shaped labels, tags, and status indicators.
 * Mobile-only component based on the Figma BadgePill design.
 */
export const Badge = React.forwardRef<View, BadgeProps>(
  (
    {
      size = DEFAULT_SIZE,
      color = DEFAULT_COLOR,
      rounded = DEFAULT_ROUNDED,
      leftElement,
      rightElement,
      children,
      css,
      style,
      accessible = true,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();

    const sizeStyles = useMemo(() => getSizeStyles(size, rounded), [size, rounded]);
    const colorStyles = useMemo(() => getColorStyles(theme, color), [theme, color]);
    const textStyles = useMemo(() => getTextStyles(theme, color, size), [theme, color, size]);
    const iconSize = useMemo(() => getIconSize(size), [size]);
    const iconColor = useMemo(() => getIconColor(theme, color), [theme, color]);

    const renderSideElement = (element: React.ReactNode) => {
      if (!element) return null;

      if (React.isValidElement(element)) {
        return React.cloneElement(element as React.ReactElement<Record<string, unknown>>, {
          width: iconSize,
          height: iconSize,
          color: iconColor,
        });
      }

      return element;
    };

    return (
      <View
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? 'text'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={accessibilityState}
        style={[styles.container, sizeStyles, colorStyles, css, style]}
        {...rest}
      >
        {leftElement && <View style={styles.sideElement}>{renderSideElement(leftElement)}</View>}

        <View style={styles.contentWrap}>
          {typeof children === 'string' ? (
            <RNText style={textStyles} numberOfLines={1}>
              {children}
            </RNText>
          ) : (
            children
          )}
        </View>

        {rightElement && <View style={styles.sideElement}>{renderSideElement(rightElement)}</View>}
      </View>
    );
  }
);

Badge.displayName = 'Badge';
