import React, { isValidElement, useMemo, ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';
import { Button } from '../button';
import { useTheme } from '../context';
import type { IconButtonProps } from './types';
import { getIconColor } from './helpers';
import { ROUNDED_RADII, DEFAULT_ROUNDED } from './constants';

/**
 * A focused icon-only button that delegates to Button internally.
 * Uses a `rounded` prop for border radius control (aligned with Avatar tokens).
 * Web parity: mirrors twigs-react IconButton which wraps the web Button.
 */
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
      loader,
      css,
      style,
      accessibilityLabel,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();

    const iconColor = useMemo(
      () => getIconColor(color, variant, theme),
      [color, variant, theme]
    );

    const element = useMemo<ReactElement | undefined>(() => {
      if (!isValidElement(icon)) return undefined;
      return React.cloneElement(icon as ReactElement<{ color?: string }>, {
        color: iconColor,
      });
    }, [icon, iconColor]);

    const mergedCss = useMemo<ViewStyle | undefined>(() => {
      const radius = ROUNDED_RADII[rounded];
      return { borderRadius: radius, ...css };
    }, [rounded, css]);

    return (
      <Button
        ref={ref}
        icon={element}
        size={size}
        color={color}
        variant={variant}
        disabled={disabled}
        loading={loading}
        loader={loader}
        accessibilityLabel={accessibilityLabel ?? 'Icon button'}
        css={mergedCss}
        style={style}
        {...rest}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
