import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Flex } from '../flex';
import { useTheme } from '../context';
import type { RadioProps } from './types';
import { getRadioSizeConfig } from './constants';
import { createRadioStyles } from './styles';

/** Radio button with outer ring and inner dot, supporting an optional label. */
export const Radio = React.forwardRef<View, RadioProps>(
  (
    {
      selected = false,
      onSelect,
      disabled = false,
      children,
      size = 'sm',
      containerRef,
      labelStyle,
      radioStyle,
      css,
      style,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = createRadioStyles(theme);

    const handlePress = () => {
      if (!disabled && onSelect) {
        onSelect(!selected);
      }
    };

    const { outerSize, innerSize } = getRadioSizeConfig(size);

    const outerCircleDynamicStyles = useMemo(
      () => ({
        width: outerSize,
        height: outerSize,
        borderRadius: outerSize / 2,
        borderColor: selected ? theme.colors.secondary600 : theme.colors.neutral400,
      }),
      [outerSize, selected, theme]
    );

    const innerCircleSizeStyles = useMemo(
      () => ({
        width: innerSize,
        height: innerSize,
        borderRadius: innerSize / 2,
      }),
      [innerSize]
    );

    return (
      <Pressable
        ref={containerRef || ref}
        style={[styles.container, disabled && styles.containerDisabled, css, style]}
        disabled={disabled}
        onPress={handlePress}
        accessible
        accessibilityRole="radio"
        accessibilityState={{
          checked: selected,
          disabled,
        }}
        accessibilityLabel={typeof children === 'string' ? children : undefined}
        accessibilityHint="Double tap to select"
        {...rest}
      >
        <Flex
          align="center"
          justify="center"
          css={StyleSheet.flatten([styles.outerCircle, outerCircleDynamicStyles, radioStyle])}
        >
          {selected && (
            <View
              style={[
                styles.innerCircle,
                innerCircleSizeStyles,
              ]}
            />
          )}
        </Flex>
        {children && <View style={[styles.labelContainer, labelStyle]}>{children}</View>}
      </Pressable>
    );
  }
);

Radio.displayName = 'Radio';
