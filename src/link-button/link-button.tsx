import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context';
import type { LinkButtonProps } from './types';
import { getLinkButtonTextStyles, getLinkButtonPressedStyle } from './helpers';
import { DISABLED_OPACITY } from './constants';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'baseline',
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
});

/**
 * A text-only pressable element styled as a hyperlink with underline decoration.
 * Supports size, color, and variant options with pressed/disabled states.
 */
export const LinkButton = React.forwardRef<View, LinkButtonProps>(
  (
    {
      children,
      size = 'md',
      color = 'primary',
      variant = 'medium',
      disabled = false,
      onPress,
      css,
      style,
      textStyle,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();

    const handlePress = useCallback<NonNullable<typeof onPress>>(
      (event) => {
        if (!disabled && onPress) {
          onPress(event);
        }
      },
      [disabled, onPress]
    );

    const pressedStyle = useMemo(
      () => getLinkButtonPressedStyle(color, theme),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [color]
    );

    const labelStyles = useMemo(
      () => getLinkButtonTextStyles({ size, color, variant, theme }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [size, color, variant]
    );

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        accessible
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityLabel={
          rest.accessibilityLabel ?? (typeof children === 'string' ? children : undefined)
        }
        style={({ pressed }: { pressed: boolean }) => [
          styles.base,
          pressed && !disabled && pressedStyle,
          disabled && styles.disabled,
          css,
          style,
        ]}
        {...rest}
      >
        <Text style={[labelStyles, textStyle]}>{children}</Text>
      </Pressable>
    );
  }
);

LinkButton.displayName = 'LinkButton';
