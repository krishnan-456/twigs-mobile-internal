import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Box } from '../box';
import { Flex } from '../flex';
import { useTheme } from '../context';
import type { CheckboxProps } from './types';
import { getCheckboxSizeConfig } from './constants';
import { createCheckboxStyles } from './styles';
import { TickIcon, HorizontalLineIcon } from './icons';

/** Checkbox with checked, unchecked, and indeterminate states, supporting an optional label. */
export const Checkbox = React.forwardRef<View, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      disabled = false,
      children,
      size = 'sm',
      containerRef,
      labelStyle,
      checkboxStyle,
      accessible = true,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint = 'Double tap to toggle',
      accessibilityState,
      css,
      style,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = createCheckboxStyles(theme);

    const handlePress = () => {
      if (disabled) return;
      const nextChecked = checked === 'indeterminate' ? true : !checked;
      // Mobile deviation: keep boolean callback payload for backward compatibility.
      onChange?.(nextChecked);
    };

    const isIndeterminate = checked === 'indeterminate';
    const isChecked = checked !== false;
    const sizeConfig = getCheckboxSizeConfig(size);

    const checkboxDynamicStyles = useMemo(
      () => ({
        width: sizeConfig.width,
        height: sizeConfig.height,
        borderColor: isChecked ? 'transparent' : theme.colors.neutral400,
        backgroundColor: isChecked ? theme.colors.secondary600 : theme.colors.white900,
      }),
      [sizeConfig.width, sizeConfig.height, isChecked, theme]
    );

    return (
      <Pressable
        ref={containerRef || ref}
        style={[styles.container, disabled && styles.containerDisabled, css, style]}
        disabled={disabled}
        onPress={handlePress}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? 'checkbox'}
        accessibilityState={{
          checked: isIndeterminate ? 'mixed' : checked,
          disabled,
          ...accessibilityState,
        }}
        accessibilityLabel={
          accessibilityLabel ?? (typeof children === 'string' ? children : undefined)
        }
        accessibilityHint={accessibilityHint}
        {...rest}
      >
        <Flex
          align="center"
          justify="center"
          css={StyleSheet.flatten([styles.checkboxBase, checkboxDynamicStyles, checkboxStyle])}
        >
          {isChecked && (
            <View style={styles.iconContainer}>
              {isIndeterminate ? (
                <HorizontalLineIcon size={sizeConfig.iconSize} color={theme.colors.white900} />
              ) : (
                <TickIcon size={sizeConfig.iconSize} color={theme.colors.white900} />
              )}
            </View>
          )}
        </Flex>
        {children && (
          <Box css={StyleSheet.flatten([styles.labelContainer, labelStyle])}>{children}</Box>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';
