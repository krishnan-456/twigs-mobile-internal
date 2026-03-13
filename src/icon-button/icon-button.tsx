import React, {
  useMemo,
  useCallback,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Pressable, type PressableProps, StyleSheet, View } from 'react-native';
import { useTheme } from '../context';
import { LineLoader, CircleLoader } from '../loader';
import type { IconButtonProps } from './types';
import {
  getIconButtonStyles,
  getIconButtonPressedStyles,
  getIconColor,
  getIconSize,
  getLoaderColor,
  getLineLoaderSize,
  getLineLoaderWidth,
  getCircleLoaderSize,
} from './helpers';
import { ROUNDED_RADII, DEFAULT_ROUNDED, DISABLED_OPACITY } from './constants';

const styles = StyleSheet.create({
  disabled: { opacity: DISABLED_OPACITY },
});

/** Icon-only pressable button with size, color, variant, and loading presets. */
export const IconButton = React.forwardRef<View, IconButtonProps>(
  (
    {
      icon,
      size = 'md',
      color = 'primary',
      variant = 'solid',
      rounded = DEFAULT_ROUNDED,
      disabled = false,
      loading = false,
      loader = 'line',
      css,
      style,
      accessibilityLabel,
      onPress,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();

    const baseStyles = useMemo(
      () => getIconButtonStyles(color, variant, size, theme),
      [color, variant, size, theme]
    );

    const pressedStyles = useMemo(
      () => getIconButtonPressedStyles(color, variant, theme),
      [color, variant, theme]
    );

    const radiusOverride = useMemo(
      () => ({ borderRadius: ROUNDED_RADII[rounded] }),
      [rounded]
    );

    const iconSize = useMemo(() => getIconSize(size), [size]);

    const regularIconColor = useMemo(
      () => getIconColor(color, variant, theme, false),
      [color, variant, theme]
    );

    const pressedIconColor = useMemo(
      () => getIconColor(color, variant, theme, true),
      [color, variant, theme]
    );

    const loaderColor = useMemo(
      () => getLoaderColor(color, variant),
      [color, variant]
    );

    const handlePress = useCallback<NonNullable<PressableProps['onPress']>>(
      (event) => {
        if (!disabled && !loading && onPress) {
          onPress(event);
        }
      },
      [disabled, loading, onPress]
    );

    const renderIcon = useCallback(
      (pressed: boolean) => {
        if (!React.isValidElement(icon)) return null;

        const currentIconColor =
          pressed && !disabled && !loading
            ? pressedIconColor
            : regularIconColor;

        return React.cloneElement(
          icon as ReactElement<{ color?: string; size?: number }>,
          { color: currentIconColor, size: iconSize }
        );
      },
      [icon, iconSize, regularIconColor, pressedIconColor, disabled, loading]
    );

    const lineLoaderWidthStyle = useMemo(
      () => ({ width: getLineLoaderWidth(size) }),
      [size]
    );

    const renderLoader = useCallback((): ReactNode => {
      if (React.isValidElement(loader)) return loader;
      if (loader === 'circle') {
        return <CircleLoader color={loaderColor} size={getCircleLoaderSize(size)} />;
      }
      return (
        <LineLoader
          color={loaderColor}
          size={getLineLoaderSize(size)}
          css={lineLoaderWidthStyle}
        />
      );
    }, [loader, loaderColor, size, lineLoaderWidthStyle]);

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        accessible
        accessibilityRole="button"
        accessibilityState={{ disabled, busy: loading }}
        accessibilityLabel={accessibilityLabel ?? 'Icon button'}
        style={({ pressed }: { pressed: boolean }) => [
          baseStyles,
          radiusOverride,
          disabled && styles.disabled,
          pressed && !disabled && !loading && pressedStyles,
          css,
          style,
        ]}
        {...rest}
      >
        {({ pressed }: { pressed: boolean }) =>
          loading ? renderLoader() : renderIcon(pressed)
        }
      </Pressable>
    );
  }
);

IconButton.displayName = 'IconButton';
