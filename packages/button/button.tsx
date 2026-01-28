import React, { ReactElement, ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { AnimatedView, createTextStyle } from '../utils';
import { Flex } from '../flex';
import { useTheme } from '../context';
import type { TwigsTheme } from '../theme';
import type { ButtonProps, ButtonSize, ButtonColor, ButtonVariant } from './types';

interface SizeConfig {
  padding: string;
  height: number;
  width?: number | string;
  borderRadius: number;
  fontSize: number;
  iconSize: number;
}

interface ColorConfig {
  background: string;
  text: string;
  pressedBackground: string;
  border?: string;
}

interface ColorConfigMap {
  [key: string]: {
    [variant in ButtonVariant]: ColorConfig;
  };
}

interface LineLoaderProps {
  color: string;
  size: ButtonSize;
}

interface ButtonSideElementProps {
  icon?: ReactElement;
  loading?: boolean;
  position: 'left' | 'right' | 'center';
  size: ButtonSize;
  spinnerColor: string;
  containerStyle?: ViewStyle;
}

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  lineLoaderContainer: {
    overflow: 'hidden',
  },
});

export const LineLoader: React.FC<LineLoaderProps> = ({ color, size }) => {
  const progress = useSharedValue(0);

  const { width, height, backgroundColor } = React.useMemo(() => {
    const sizeMap: Record<ButtonSize, { width: number; height: number }> = {
      xxs: { width: 12, height: 3 },
      xs: { width: 14, height: 3 },
      sm: { width: 16, height: 3 },
      md: { width: 20, height: 4 },
      lg: { width: 20, height: 4 },
      xl: { width: 24, height: 4 },
      '2xl': { width: 24, height: 4 },
    };
    const dimensions = sizeMap[size] || sizeMap.sm;
    return {
      ...dimensions,
      backgroundColor: color + '26',
    };
  }, [size, color]);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, false);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const animationProgress = progress.value;

    const translateX = (animationProgress - 0.5) * width * 1.4;

    const opacity =
      animationProgress < 0.1
        ? animationProgress * 10
        : animationProgress > 0.9
          ? (1 - animationProgress) * 10
          : 1;

    return {
      transform: [{ translateX }],
      opacity,
      width: width * 0.4,
      height: height,
      backgroundColor: color,
      borderRadius: height / 2,
    };
  }, [width, height, color]);

  const loaderContainerStyles = {
    width,
    height,
    backgroundColor,
    borderRadius: height / 2,
  };

  return (
    <View style={[styles.lineLoaderContainer, loaderContainerStyles]}>
      <AnimatedView style={animatedStyle} />
    </View>
  );
};

const getButtonStyles = ({
  size,
  color,
  variant,
  isIcon,
  theme,
}: {
  size: ButtonSize;
  color: ButtonColor;
  variant: ButtonVariant;
  isIcon: boolean;
  theme: TwigsTheme;
}): ViewStyle => {
  const sizeStyles = getSizeStyles(size, isIcon);
  const colorStyles = getColorStyles(color, variant, theme);

  return {
    ...sizeStyles,
    ...colorStyles,
  };
};

const getSizeStyles = (size: ButtonSize = 'sm', isIcon: boolean = false): ViewStyle => {
  const sizes: Record<ButtonSize, SizeConfig> = {
    xxs: {
      padding: isIcon ? '0px' : '2px 4px',
      height: 16,
      width: isIcon ? 16 : 'auto',
      borderRadius: 4,
      fontSize: 10,
      iconSize: 14,
    },
    xs: {
      padding: isIcon ? '0px' : '2px 6px',
      height: 20,
      width: isIcon ? 20 : 'auto',
      borderRadius: 4,
      fontSize: 12,
      iconSize: 14,
    },
    sm: {
      padding: isIcon ? '0px' : '2px 8px',
      height: 24,
      width: isIcon ? 24 : 'auto',
      borderRadius: 4,
      fontSize: 14,
      iconSize: 16,
    },
    md: {
      padding: isIcon ? '0px' : '6px 12px',
      height: 32,
      width: isIcon ? 32 : 'auto',
      borderRadius: 8,
      fontSize: 14,
      iconSize: 20,
    },
    lg: {
      padding: isIcon ? '0px' : '8px 16px',
      height: 40,
      width: isIcon ? 40 : 'auto',
      borderRadius: 8,
      fontSize: 16,
      iconSize: 20,
    },
    xl: {
      padding: isIcon ? '0px' : '10px 20px',
      height: 44,
      width: isIcon ? 48 : 'auto',
      borderRadius: 12,
      fontSize: 16,
      iconSize: 24,
    },
    '2xl': {
      padding: isIcon ? '0px' : '18px 28px',
      height: 64,
      width: isIcon ? 64 : 'auto',
      borderRadius: 16,
      fontSize: 16,
      iconSize: 24,
    },
  };

  const config = sizes[size];
  const paddingValues = config.padding.split(' ').map((p) => parseInt(p));

  const styleObj: ViewStyle = {
    height: config.height,
    borderRadius: config.borderRadius,
  };

  if (paddingValues.length === 2) {
    styleObj.paddingVertical = paddingValues[0];
    styleObj.paddingHorizontal = paddingValues[1];
  } else {
    styleObj.padding = paddingValues[0];
  }

  if (isIcon && typeof config.width === 'number') {
    styleObj.width = config.width;
  }

  return styleObj;
};

const getColorStyles = (
  color: ButtonColor = 'primary',
  variant: ButtonVariant = 'solid',
  theme: TwigsTheme
): ViewStyle => {
  const colorConfig: ColorConfigMap = {
    primary: {
      solid: {
        background: theme.colors.primary500,
        text: theme.colors.white900,
        pressedBackground: theme.colors.primary600,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.primary500,
        pressedBackground: '#00828D1A',
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.primary500,
        border: '#00828D66',
        pressedBackground: '#00828D0D',
      },
    },
    secondary: {
      solid: {
        background: theme.colors.secondary500,
        text: theme.colors.white900,
        pressedBackground: theme.colors.secondary600,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.secondary500,
        pressedBackground: '#64748B1A',
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.secondary500,
        border: '#64748B33',
        pressedBackground: '#64748B0D',
      },
    },
    default: {
      solid: {
        background: '#64748B14',
        text: theme.colors.secondary600,
        pressedBackground: '#64748B33',
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.secondary600,
        pressedBackground: '#64748B26',
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.secondary600,
        border: '#64748B33',
        pressedBackground: '#64748B14',
      },
    },
    negative: {
      solid: {
        background: theme.colors.negative600,
        text: theme.colors.white900,
        pressedBackground: theme.colors.negative700,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.negative600,
        pressedBackground: '#E750301A',
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.negative600,
        border: theme.colors.negative600,
        pressedBackground: '#E750300D',
      },
    },
    neutral: {
      solid: {
        background: theme.colors.neutral500,
        text: theme.colors.white900,
        pressedBackground: theme.colors.neutral600,
      },
      ghost: {
        background: 'transparent',
        text: theme.colors.neutral500,
        pressedBackground: '#9191911A',
      },
      outline: {
        background: theme.colors.white900,
        text: theme.colors.neutral500,
        border: theme.colors.neutral500,
        pressedBackground: '#9191910D',
      },
    },
  };

  const config = colorConfig[color]?.[variant] || colorConfig.primary.solid;

  const styleObj: ViewStyle = {
    backgroundColor: config.background,
  };

  if (config.border) {
    styleObj.borderWidth = 1.5;
    styleObj.borderColor = config.border;
  }

  return styleObj;
};

const getButtonTextStyles = ({
  size,
  color,
  variant,
  theme,
}: {
  size: ButtonSize;
  color: ButtonColor;
  variant: ButtonVariant;
  theme: TwigsTheme;
}): TextStyle => {
  const sizes: Record<
    ButtonSize,
    { fontSize: number; fontFamily: string; fontWeight: '500' | '700' }
  > = {
    xxs: { fontSize: 10, fontFamily: theme.fonts.medium, fontWeight: '500' },
    xs: { fontSize: 12, fontFamily: theme.fonts.medium, fontWeight: '500' },
    sm: { fontSize: 14, fontFamily: theme.fonts.medium, fontWeight: '500' },
    md: { fontSize: 14, fontFamily: theme.fonts.bold, fontWeight: '700' },
    lg: { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
    xl: { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
    '2xl': { fontSize: 16, fontFamily: theme.fonts.bold, fontWeight: '700' },
  };

  const colorConfig: Record<ButtonColor, Record<ButtonVariant, string>> = {
    primary: {
      solid: theme.colors.white900,
      ghost: theme.colors.primary500,
      outline: theme.colors.primary500,
    },
    secondary: {
      solid: theme.colors.white900,
      ghost: theme.colors.secondary500,
      outline: theme.colors.secondary500,
    },
    default: {
      solid: theme.colors.secondary600,
      ghost: theme.colors.secondary600,
      outline: theme.colors.secondary600,
    },
    negative: {
      solid: theme.colors.white900,
      ghost: theme.colors.negative600,
      outline: theme.colors.negative600,
    },
    neutral: {
      solid: theme.colors.white900,
      ghost: theme.colors.neutral500,
      outline: theme.colors.neutral500,
    },
  };

  const sizeConfig = sizes[size] || sizes.sm;
  const textColor = colorConfig[color]?.[variant] || colorConfig.primary.solid;

  return {
    fontSize: sizeConfig.fontSize,
    color: textColor,
    ...createTextStyle(sizeConfig.fontFamily, sizeConfig.fontWeight),
  };
};

const getIconContainerStyles = ({
  position,
  size,
}: {
  position: 'left' | 'right' | 'center';
  size: ButtonSize;
}): ViewStyle => {
  const spacing: Record<ButtonSize, number> = {
    xxs: 2,
    xs: 2,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 6,
    '2xl': 8,
  };

  const margin = spacing[size] || spacing.sm;

  if (position === 'left') {
    return { marginRight: margin };
  } else if (position === 'right') {
    return { marginLeft: margin };
  }
  return {};
};

const getIconSize = (size: ButtonSize): number => {
  const sizes: Record<ButtonSize, number> = {
    xxs: 14,
    xs: 14,
    sm: 16,
    md: 24,
    lg: 24,
    xl: 24,
    '2xl': 24,
  };
  return sizes[size] || sizes.sm;
};

const getLoadingSpinnerColor = (
  color: ButtonColor,
  variant: ButtonVariant,
  theme: TwigsTheme
): string => {
  if (variant === 'solid' && color !== 'default') {
    return theme.colors.white900;
  }

  const colors: Record<ButtonColor, string> = {
    primary: theme.colors.primary500,
    secondary: theme.colors.secondary500,
    default: theme.colors.secondary600,
    negative: theme.colors.negative700,
    neutral: theme.colors.neutral500,
  };

  return colors[color] || colors.primary;
};

const ButtonSideElement: React.FC<ButtonSideElementProps> = ({
  icon,
  loading,
  position,
  size,
  spinnerColor,
  containerStyle,
}) => {
  const iconSize = getIconSize(size);
  const iconContainerStyles = getIconContainerStyles({ position, size });

  if (loading) {
    return (
      <View style={[iconContainerStyles, containerStyle]}>
        <LineLoader color={spinnerColor} size={size} />
      </View>
    );
  }

  if (icon) {
    return (
      <View style={[iconContainerStyles, containerStyle]}>
        {React.cloneElement(icon, {
          size: iconSize,
          ...(icon.props || {}),
        })}
      </View>
    );
  }

  return null;
};

// Type-safe wrapper for AnimatedView with children support
const AnimatedContentWrapper = AnimatedView as unknown as React.FC<
  React.ComponentProps<typeof AnimatedView> & { children: ReactNode }
>;

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
    const spinnerColor = getLoadingSpinnerColor(color, variant, theme);
    const hasNoIcon = !(leftIcon || rightIcon || icon);

    const opacity = useSharedValue(1);

    React.useEffect(() => {
      if (loading) {
        opacity.value = withRepeat(withTiming(0.7, { duration: 600 }), -1, true);
      } else {
        opacity.value = withTiming(1, { duration: 150 });
      }
    }, [loading, opacity]);

    const animatedContentStyle = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      []
    );

    const buttonLoaderMargin = React.useMemo(() => {
      const spacing: Record<ButtonSize, number> = {
        xxs: 2,
        xs: 2,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        '2xl': 8,
      };
      return spacing[size] || spacing.sm;
    }, [size]);

    const handlePress = React.useCallback<NonNullable<PressableProps['onPress']>>(
      (event) => {
        if (!disabled && !loading && onPress) {
          onPress(event);
        }
      },
      [disabled, loading, onPress]
    );

    const pressedStyle = React.useMemo(() => {
      const colorConfig: Record<ButtonColor, Record<ButtonVariant, ViewStyle>> = {
        primary: {
          solid: { backgroundColor: theme.colors.primary600 },
          ghost: { backgroundColor: '#00828D26' },
          outline: { backgroundColor: '#00828D0D', borderColor: '#00828DCC' },
        },
        secondary: {
          solid: { backgroundColor: theme.colors.secondary600 },
          ghost: { backgroundColor: '#64748B26' },
          outline: { backgroundColor: '#64748B0D', borderColor: '#64748BCC' },
        },
        default: {
          solid: { backgroundColor: '#64748B33' },
          ghost: { backgroundColor: '#0000000A' },
          outline: { backgroundColor: '#0000000A', borderColor: '#64748BCC' },
        },
        negative: {
          solid: { backgroundColor: theme.colors.negative700 },
          ghost: { backgroundColor: '#E7503026' },
          outline: { backgroundColor: '#E750300D', borderColor: '#E75030CC' },
        },
        neutral: {
          solid: { backgroundColor: theme.colors.neutral600 },
          ghost: { backgroundColor: '#91919126' },
          outline: { backgroundColor: '#9191910D', borderColor: '#919191CC' },
        },
      };
      return colorConfig[color]?.[variant] || colorConfig.primary.solid;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color, variant]);

    const buttonDynamicStyles = getButtonStyles({ size, color, variant, isIcon, theme });
    const buttonTextStyles = getButtonTextStyles({ size, color, variant, theme });

    const renderContent = React.useCallback(() => {
      if (isIcon) {
        return (
          <ButtonSideElement
            icon={icon}
            loading={loading}
            position="center"
            size={size}
            spinnerColor={spinnerColor}
          />
        );
      }

      return (
        <Flex direction="row" align="center" justify="center">
          {(leftIcon || (hasNoIcon && loading)) && (
            <ButtonSideElement
              icon={leftIcon}
              loading={loading && (!!leftIcon || hasNoIcon)}
              position="left"
              size={size}
              spinnerColor={spinnerColor}
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
              position="right"
              size={size}
              spinnerColor={spinnerColor}
              containerStyle={{
                marginLeft: buttonLoaderMargin,
              }}
            />
          )}
        </Flex>
      );
    }, [
      isIcon,
      icon,
      loading,
      size,
      spinnerColor,
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
        style={({ pressed }: { pressed: boolean }) => [
          styles.buttonBase,
          buttonDynamicStyles,
          disabled && styles.buttonDisabled,
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
