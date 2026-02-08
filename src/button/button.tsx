import React, { ReactElement, ReactNode } from 'react';
import { Pressable, PressableProps, Text, View, ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import { Flex } from '../flex';
import { useTheme } from '../context';
import { LineLoader, CircleLoader } from '../loader';
import type { LoaderColor } from '../loader';
import type { ButtonProps, ButtonSize } from './types';
import {
  getButtonStyles,
  getButtonTextStyles,
  getIconContainerStyles,
  getIconSize,
  getLoaderColorFromButton,
  getLineLoaderSizeFromButton,
  getCircleLoaderSizeFromButton,
  getPressedStyle,
  getButtonLoaderMargin,
} from './helpers';
import { buttonStyles } from './styles';

interface ButtonSideElementProps {
  icon?: ReactElement;
  loading?: boolean;
  loader?: ReactElement | 'line' | 'circle';
  position: 'left' | 'right' | 'center';
  size: ButtonSize;
  loaderColor: LoaderColor;
  containerStyle?: ViewStyle;
}

const ButtonSideElement: React.FC<ButtonSideElementProps> = ({
  icon,
  loading,
  loader = 'line',
  position,
  size,
  loaderColor,
  containerStyle,
}) => {
  const iconSize = getIconSize(size);
  const iconContainerStyle = getIconContainerStyles({ position, size });

  if (loading) {
    let loaderElement: ReactNode;

    if (React.isValidElement(loader)) {
      // Custom ReactElement loader
      loaderElement = loader;
    } else if (loader === 'circle') {
      loaderElement = (
        <CircleLoader color={loaderColor} size={getCircleLoaderSizeFromButton(size)} />
      );
    } else {
      // Default: line loader
      loaderElement = <LineLoader color={loaderColor} size={getLineLoaderSizeFromButton(size)} />;
    }

    return <View style={[iconContainerStyle, containerStyle]}>{loaderElement}</View>;
  }

  if (icon) {
    return (
      <View style={[iconContainerStyle, containerStyle]}>
        {React.cloneElement(icon, {
          size: iconSize,
          ...(icon.props || {}),
        })}
      </View>
    );
  }

  return null;
};

const AnimatedContentWrapper = AnimatedView as unknown as React.FC<
  React.ComponentProps<typeof AnimatedView> & { children: ReactNode }
>;

/**
 * Pressable button with multiple size, color, and variant presets.
 * Supports loading state, left/right icons, and icon-only mode.
 */
export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      size = 'sm',
      color = 'primary',
      variant = 'solid',
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      icon,
      loader = 'line',
      onPress,
      css,
      style,
      textStyle,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const isIcon = !!icon;
    const loaderColor = getLoaderColorFromButton(color, variant);
    const hasNoIcon = !(leftIcon || rightIcon || icon);

    const opacity = useSharedValue(1);

    React.useEffect(() => {
      if (loading) {
        opacity.value = withRepeat(withTiming(0.7, { duration: 600 }), -1, true);
      } else {
        opacity.value = withTiming(1, { duration: 150 });
      }
    }, [loading, opacity]);

    const animatedContentStyle = useAnimatedStyle(() => ({ opacity: opacity.value }), []);

    const buttonLoaderMargin = React.useMemo(() => getButtonLoaderMargin(size), [size]);

    const handlePress = React.useCallback<NonNullable<PressableProps['onPress']>>(
      (event) => {
        if (!disabled && !loading && onPress) {
          onPress(event);
        }
      },
      [disabled, loading, onPress]
    );

    const pressedStyle = React.useMemo(
      () => getPressedStyle(color, variant, theme),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [color, variant]
    );

    const buttonDynamicStyles = getButtonStyles({ size, color, variant, isIcon, theme });
    const buttonTextStyles = getButtonTextStyles({ size, color, variant, theme });

    const renderContent = React.useCallback(() => {
      if (isIcon) {
        return (
          <ButtonSideElement
            icon={icon}
            loading={loading}
            loader={loader}
            position="center"
            size={size}
            loaderColor={loaderColor}
          />
        );
      }

      return (
        <Flex direction="row" align="center" justify="center">
          {(leftIcon || (hasNoIcon && loading)) && (
            <ButtonSideElement
              icon={leftIcon}
              loading={loading && (!!leftIcon || hasNoIcon)}
              loader={loader}
              position="left"
              size={size}
              loaderColor={loaderColor}
              // eslint-disable-next-line react-native/no-inline-styles
              containerStyle={{
                marginRight: hasNoIcon && !loading ? 0 : buttonLoaderMargin,
              }}
            />
          )}

          {children && (
            <AnimatedContentWrapper style={animatedContentStyle}>
              <Text style={[buttonTextStyles, textStyle]}>{children}</Text>
            </AnimatedContentWrapper>
          )}

          {rightIcon && (
            <ButtonSideElement
              icon={rightIcon}
              loading={loading}
              loader={loader}
              position="right"
              size={size}
              loaderColor={loaderColor}
              containerStyle={{ marginLeft: buttonLoaderMargin }}
            />
          )}
        </Flex>
      );
    }, [
      isIcon,
      icon,
      loading,
      loader,
      size,
      loaderColor,
      leftIcon,
      hasNoIcon,
      buttonLoaderMargin,
      children,
      animatedContentStyle,
      buttonTextStyles,
      textStyle,
      rightIcon,
    ]);

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        accessible
        accessibilityRole="button"
        accessibilityState={{ disabled, busy: loading }}
        accessibilityLabel={rest.accessibilityLabel ?? (isIcon && !children ? 'Button' : undefined)}
        style={({ pressed }: { pressed: boolean }) => [
          buttonStyles.buttonBase,
          buttonDynamicStyles,
          disabled && buttonStyles.buttonDisabled,
          pressed && !disabled && !loading && pressedStyle,
          css,
          style,
        ]}
        {...rest}
      >
        {renderContent()}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';
