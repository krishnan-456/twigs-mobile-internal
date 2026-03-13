import React, { useMemo, useState, useCallback } from 'react';
import { View, Text as RNText, Pressable } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useTheme } from '../context';
import type { ChipProps } from './types';
import { DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_ROUNDED } from './constants';
import {
  getSizeStyles,
  getRegularStyles,
  getPressedStyles,
  getActiveStyles,
  getTextStyles,
  getIconSize,
  getIconColor,
} from './helpers';
import { styles } from './styles';

/** Selectable pill for filters, tags, and selections with normal/pressed/active states. */
export const Chip = React.forwardRef<View, ChipProps>(
  (
    {
      size = DEFAULT_SIZE,
      color = DEFAULT_COLOR,
      rounded = DEFAULT_ROUNDED,
      leftElement,
      rightElement,
      active,
      defaultActive,
      onActiveStateChange,
      disabled = false,
      onPress,
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
    const [isActive, setIsActive] = useState(defaultActive ?? false);
    const resolvedActive = active ?? isActive;

    const sizeStyles = useMemo(() => getSizeStyles(size, rounded), [size, rounded]);
    const regularStyle = useMemo(() => getRegularStyles(theme, color), [theme, color]);
    const pressedStyle = useMemo(() => getPressedStyles(theme, color), [theme, color]);
    const activeStyle = useMemo(() => getActiveStyles(theme, color), [theme, color]);
    const textStyles = useMemo(
      () => getTextStyles(theme, color, size, resolvedActive),
      [theme, color, size, resolvedActive]
    );
    const iconSize = useMemo(() => getIconSize(size), [size]);
    const iconColor = useMemo(
      () => getIconColor(theme, color, resolvedActive),
      [theme, color, resolvedActive]
    );

    const handlePress = useCallback(() => {
      if (disabled) return;

      if (onPress) {
        onPress();
        return;
      }

      if (typeof active === 'boolean') {
        onActiveStateChange?.(!active);
        return;
      }

      onActiveStateChange?.(!isActive);
      setIsActive(!isActive);
    }, [active, isActive, disabled, onPress, onActiveStateChange]);

    const renderSideElement = useCallback(
      (element: React.ReactNode) => {
        if (!element) return null;

        if (React.isValidElement(element)) {
          return React.cloneElement(element as React.ReactElement<Record<string, unknown>>, {
            size: iconSize,
            width: iconSize,
            height: iconSize,
            color: iconColor,
          });
        }

        return element;
      },
      [iconSize, iconColor]
    );

    const mergedA11yState = {
      ...accessibilityState,
      selected: resolvedActive,
      ...(disabled && { disabled: true }),
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? 'button'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={mergedA11yState}
        style={({ pressed }) =>
          [
            styles.container,
            sizeStyles,
            regularStyle,
            pressed && !disabled && !resolvedActive && pressedStyle,
            resolvedActive && activeStyle,
            disabled && styles.disabled,
            css,
            style,
          ] as ViewStyle[]
        }
        {...rest}
      >
        {leftElement && (
          <View style={styles.sideElement}>{renderSideElement(leftElement)}</View>
        )}

        <View style={styles.contentWrap}>
          {typeof children === 'string' ? (
            <RNText style={textStyles} numberOfLines={1}>
              {children}
            </RNText>
          ) : (
            children
          )}
        </View>

        {rightElement && (
          <View style={styles.sideElement}>{renderSideElement(rightElement)}</View>
        )}
      </Pressable>
    );
  }
);

Chip.displayName = 'Chip';
