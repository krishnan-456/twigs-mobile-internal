import React, { ReactNode, RefObject, useEffect } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { AnimatedView, SvgComponent, PathComponent, CommonStyleProps } from '../utils';
import { useTheme } from '../context';
import type { TwigsTheme } from '../theme';

type CheckboxSize = 'sm' | 'md';
type CheckedState = boolean | 'indeterminate';

interface TickIconProps {
  color?: string;
}

interface HorizontalLineIconProps {
  color?: string;
}

export interface CheckboxProps extends CommonStyleProps {
  checked?: CheckedState;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
  size?: CheckboxSize;
  id?: string;
  containerRef?: RefObject<any>;
  labelStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
}

const TickIcon: React.FC<TickIconProps> = ({ color }) => {
  return (
    <SvgComponent width="10" height="8" viewBox="0 0 10 8">
      <PathComponent
        d="M9 1.25L3.5 6.75L1 4.25"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgComponent>
  );
};

const HorizontalLineIcon: React.FC<HorizontalLineIconProps> = ({ color }) => {
  return (
    <SvgComponent width="10" height="2" viewBox="0 0 10 2">
      <PathComponent
        d="M9 1H1"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgComponent>
  );
};

const createStyles = () =>
  StyleSheet.create({
    checkboxBase: {
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    checkboxSm: {
      width: 16,
      height: 16,
    },
    checkboxMd: {
      width: 20,
      height: 20,
    },
    checkboxDisabled: {
      opacity: 0.4,
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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

export const Checkbox = React.forwardRef<any, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      disabled = false,
      children,
      size = 'sm',
      id,
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
    const styles = createStyles();
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
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: checked === 'indeterminate' ? 'mixed' : checked,
          disabled,
        }}
        accessibilityLabel={typeof children === 'string' ? children : undefined}
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
