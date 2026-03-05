import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import { useTheme } from '../context';
import type { SegmentedButtonProps } from './types';
import { DEFAULT_ROUNDED, SLIDE_DURATION } from './constants';
import { getContainerStyles, getIndicatorStyles, getSegmentTextStyles } from './helpers';
import { styles } from './styles';

export const SegmentedButton = React.forwardRef<View, SegmentedButtonProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      rounded = DEFAULT_ROUNDED,
      disabled = false,
      fullWidth = true,
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

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const resolvedValue = isControlled ? value : internalValue;

    const [containerWidth, setContainerWidth] = useState(0);
    const segmentWidth = options.length > 0 ? containerWidth / options.length : 0;

    const selectedIndex = useMemo(
      () =>
        Math.max(
          0,
          options.findIndex((o) => o.value === resolvedValue)
        ),
      [options, resolvedValue]
    );

    const translateX = useSharedValue(selectedIndex * segmentWidth);

    useEffect(() => {
      translateX.value = withTiming(selectedIndex * segmentWidth, {
        duration: SLIDE_DURATION,
        easing: Easing.out(Easing.cubic),
      });
    }, [selectedIndex, segmentWidth, translateX]);

    const indicatorAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
      width: segmentWidth,
    }));

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setContainerWidth(width);
    }, []);

    const handleSelect = useCallback(
      (optionValue: string) => {
        if (!isControlled) {
          setInternalValue(optionValue);
        }
        onChange?.(optionValue);
      },
      [isControlled, onChange]
    );

    const containerDynamicStyles = useMemo(
      () => getContainerStyles(theme, rounded, fullWidth),
      [theme, rounded, fullWidth]
    );

    const indicatorDynamicStyles = useMemo(
      () => getIndicatorStyles(theme, rounded),
      [theme, rounded]
    );

    return (
      <View
        ref={ref}
        onLayout={handleLayout}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? 'radiogroup'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{
          disabled,
          ...accessibilityState,
        }}
        style={[styles.container, containerDynamicStyles, disabled && styles.disabled, css, style]}
        {...rest}
      >
        {containerWidth > 0 && (
          <AnimatedView
            style={[styles.indicator, indicatorDynamicStyles, indicatorAnimatedStyle]}
          />
        )}
        {options.map((option) => {
          const isSelected = resolvedValue === option.value;
          const isSegmentDisabled = disabled || !!option.disabled;

          return (
            <Segment
              key={option.value}
              label={option.label}
              selected={isSelected}
              disabled={isSegmentDisabled}
              onSelect={() => handleSelect(option.value)}
            />
          );
        })}
      </View>
    );
  }
);

SegmentedButton.displayName = 'SegmentedButton';

interface SegmentInternalProps {
  label: string;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}

const Segment: React.FC<SegmentInternalProps> = ({ label, selected, disabled, onSelect }) => {
  const theme = useTheme();

  const textDynamicStyles = useMemo(() => getSegmentTextStyles(theme, selected), [theme, selected]);

  return (
    <Pressable
      style={styles.segment}
      onPress={onSelect}
      disabled={disabled}
      accessible
      accessibilityRole="radio"
      accessibilityState={{
        checked: selected,
        disabled,
      }}
      accessibilityLabel={label}
      accessibilityHint="Double tap to select"
    >
      <Text style={textDynamicStyles} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </Pressable>
  );
};
