import React, { useEffect } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import { useTheme } from '../context';
import type { CheckboxProps } from './types';
import { checkboxStyles as styles } from './styles';
import { TickIcon, HorizontalLineIcon } from './icons';

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
      css,
      style,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const opacity = useSharedValue(checked ? 1 : 0);

    useEffect(() => {
      opacity.value = withSpring(checked ? 1 : 0, {
        damping: 15,
        stiffness: 80,
      });
    }, [checked, opacity]);

    const handlePress = () => {
      if (!disabled && onChange) {
        if (checked === 'indeterminate') {
          onChange(true);
        } else {
          onChange(!checked);
        }
      }
    };

    const iconStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    const isIndeterminate = checked === 'indeterminate';
    const isChecked = checked === true || checked === 'indeterminate';

    const checkboxDynamicStyles: ViewStyle = {
      borderColor: isChecked ? 'transparent' : theme.colors.neutral700,
      backgroundColor: isChecked ? theme.colors.secondary500 : theme.colors.white900,
    };

    return (
      <Pressable
        ref={containerRef || ref}
        style={[styles.container, disabled && styles.containerDisabled, css, style]}
        disabled={disabled}
        onPress={handlePress}
        accessible
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: checked === 'indeterminate' ? 'mixed' : checked,
          disabled,
        }}
        accessibilityLabel={typeof children === 'string' ? children : undefined}
        accessibilityHint="Double tap to toggle"
        {...rest}
      >
        <View
          style={[
            styles.checkboxBase,
            size === 'md' ? styles.checkboxMd : styles.checkboxSm,
            checkboxDynamicStyles,
            disabled && styles.checkboxDisabled,
            checkboxStyle,
          ]}
        >
          <AnimatedView style={[styles.iconContainer, iconStyle]}>
            {isIndeterminate ? (
              <HorizontalLineIcon color={theme.colors.white900} />
            ) : (
              <TickIcon color={theme.colors.white900} />
            )}
          </AnimatedView>
        </View>
        {children && <View style={[styles.labelContainer, labelStyle]}>{children}</View>}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';
