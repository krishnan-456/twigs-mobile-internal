import React, { ReactNode, RefObject } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { CommonStyleProps } from '../utils';
import { Box } from '../box';
import { Flex } from '../flex';
import { theme } from '../theme';

type RadioSize = 'sm' | 'md';

interface SizeConfig {
  outer: { width: number; height: number };
  inner: { width: number; height: number };
}

export interface RadioProps extends CommonStyleProps {
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
  size?: RadioSize;
  width?: number;
  height?: number;
  innerWidth?: number;
  innerHeight?: number;
  containerRef?: RefObject<any>;
  labelStyle?: ViewStyle;
  radioStyle?: ViewStyle;
}

const styles = StyleSheet.create({
  outerCircle: {
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: theme.colors.white900,
  },
  outerCircleDisabled: {
    opacity: 0.5,
  },
  innerCircle: {
    backgroundColor: theme.colors.secondary500,
    borderRadius: 100,
  },
  labelContainer: {
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  containerDisabled: {
    opacity: 0.4,
  },
});

export const Radio = React.forwardRef<any, RadioProps>(
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
    const handlePress = () => {
      if (!disabled && onSelect) {
        onSelect(!selected);
      }
    };

    const getSizeConfig = (): SizeConfig => {
      const sizeConfigs: Record<RadioSize, SizeConfig> = {
        sm: {
          outer: { width: 14, height: 14 },
          inner: { width: 8, height: 8 },
        },
        md: {
          outer: { width: 18, height: 18 },
          inner: { width: 12, height: 12 },
        },
      };
      return sizeConfigs[size] || sizeConfigs.sm;
    };

    const sizeConfig = getSizeConfig();
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
        accessibilityRole="radio"
        accessibilityState={{
          selected,
          disabled,
        }}
        accessibilityLabel={typeof children === 'string' ? children : undefined}
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
