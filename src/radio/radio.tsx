import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Box } from '../box';
import { Flex } from '../flex';
import { useTheme } from '../context';
import type { RadioProps } from './types';
import { getRadioSizeConfig } from './constants';
import { createRadioStyles } from './styles';

export const Radio = React.forwardRef<View, RadioProps>(
  (
    {
      selected = false,
      onSelect,
      disabled = false,
      children,
      size = 'sm',
      width,
      height,
      innerWidth,
      innerHeight,
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

    const sizeConfig = getRadioSizeConfig(size);
    const outerCircleWidth = width || sizeConfig.outer.width;
    const outerCircleHeight = height || sizeConfig.outer.height;
    const innerCircleWidth = innerWidth || sizeConfig.inner.width;
    const innerCircleHeight = innerHeight || sizeConfig.inner.height;

    const outerCircleDynamicStyles: ViewStyle = {
      height: outerCircleHeight,
      width: outerCircleWidth,
      borderColor: selected ? theme.colors.secondary500 : theme.colors.neutral400,
    };

    const innerCircleDynamicStyles: ViewStyle = {
      height: innerCircleHeight,
      width: innerCircleWidth,
    };

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
          css={StyleSheet.flatten([
            styles.outerCircle,
            outerCircleDynamicStyles,
            disabled && styles.outerCircleDisabled,
            radioStyle,
          ])}
        >
          {selected && (
            <Box css={StyleSheet.flatten([styles.innerCircle, innerCircleDynamicStyles])} />
          )}
        </Flex>
        {children && <View style={[styles.labelContainer, labelStyle]}>{children}</View>}
      </Pressable>
    );
  }
);

Radio.displayName = 'Radio';
