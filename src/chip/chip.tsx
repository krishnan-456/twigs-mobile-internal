import React, { useMemo, useState, useCallback } from 'react';
import { View, Text as RNText, Pressable } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useTheme } from '../context';
import type { ChipProps } from './types';
import { DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_VARIANT, DEFAULT_ROUNDED } from './constants';
import {
  getSizeStyles,
  getColorStyles,
  getPressedStyles,
  getActiveStyles,
  getTextStyles,
  getCloseColor,
  getIconSize,
  getCloseIconSize,
  getIconColor,
} from './helpers';
import { styles } from './styles';
import { CloseIcon } from './icons';

export const Chip = React.forwardRef<View, ChipProps>(
  (
    {
      size = DEFAULT_SIZE,
      color = DEFAULT_COLOR,
      variant = DEFAULT_VARIANT,
      rounded = DEFAULT_ROUNDED,
      closable,
      onClose,
      leftElement,
      rightElement,
      active,
      defaultActive,
      onActiveStateChange,
      selectable,
      disabled = false,
      onPress,
      children,
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
    const [isActive, setIsActive] = useState(defaultActive ?? false);
    const resolvedActive = active ?? isActive;

    const isInteractive = !!(selectable || onPress || onActiveStateChange);

    const sizeStyles = useMemo(() => getSizeStyles(size, rounded), [size, rounded]);
    const colorStyles = useMemo(
      () => getColorStyles(theme, color, variant, !!selectable),
      [theme, color, variant, selectable]
    );
    const pressedStyle = useMemo(
      () => (isInteractive ? getPressedStyles(theme, color, variant) : undefined),
      [theme, color, variant, isInteractive]
    );
    const activeStyle = useMemo(
      () => (isInteractive ? getActiveStyles(theme, color, variant) : undefined),
      [theme, color, variant, isInteractive]
    );
    const textStyles = useMemo(
      () => getTextStyles(theme, color, variant, !!selectable, size),
      [theme, color, variant, selectable, size]
    );
    const closeColor = useMemo(() => getCloseColor(theme, color, variant), [theme, color, variant]);
    const closeIconSize = useMemo(() => getCloseIconSize(size), [size]);
    const iconSize = useMemo(() => getIconSize(size), [size]);
    const iconColor = useMemo(
      () => getIconColor(theme, color, variant, !!selectable),
      [theme, color, variant, selectable]
    );

    const handleToggle = useCallback(() => {
      if (disabled) return;

      if (onPress) {
        onPress();
        return;
      }

      if (typeof active === 'boolean') {
        onActiveStateChange?.(!active);
        return;
      }

      onActiveStateChange?.(!isActive);
      setIsActive(!isActive);
    }, [active, isActive, disabled, onPress, onActiveStateChange]);

    const handleClose = useCallback(() => {
      if (disabled) return;
      onClose?.();
    }, [disabled, onClose]);

    const renderSideElement = useCallback(
      (element: React.ReactNode) => {
        if (!element) return null;

        if (React.isValidElement(element)) {
          return React.cloneElement(element as React.ReactElement<Record<string, unknown>>, {
            width: iconSize,
            height: iconSize,
            color: iconColor,
          });
        }

        return element;
      },
      [iconSize, iconColor]
    );

    const content = (
      <>
        {leftElement && <View style={styles.sideElement}>{renderSideElement(leftElement)}</View>}

        <View style={styles.contentWrap}>
          {typeof children === 'string' ? (
            <RNText style={textStyles} numberOfLines={1}>
              {children}
            </RNText>
          ) : (
            children
          )}
        </View>

        {closable && (
          <Pressable
            onPress={handleClose}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Remove"
            accessibilityHint="Removes this chip"
            hitSlop={4}
            style={styles.closeButton}
            disabled={disabled}
          >
            <CloseIcon size={closeIconSize} color={closeColor} />
          </Pressable>
        )}

        {rightElement && <View style={styles.sideElement}>{renderSideElement(rightElement)}</View>}
      </>
    );

    const mergedA11yState = {
      ...accessibilityState,
      ...(isInteractive && { selected: resolvedActive }),
      ...(disabled && { disabled: true }),
    };

    if (isInteractive) {
      return (
        <Pressable
          ref={ref}
          onPress={handleToggle}
          disabled={disabled}
          accessible={accessible}
          accessibilityRole={accessibilityRole ?? 'button'}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityState={mergedA11yState}
          style={({ pressed }) =>
            [
              styles.container,
              sizeStyles,
              colorStyles,
              pressed && !disabled && pressedStyle,
              resolvedActive && activeStyle,
              disabled && styles.disabled,
              css,
              style,
            ] as ViewStyle[]
          }
          {...rest}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <View
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? 'text'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={mergedA11yState}
        style={[styles.container, sizeStyles, colorStyles, disabled && styles.disabled, css, style]}
        {...rest}
      >
        {content}
      </View>
    );
  }
);

Chip.displayName = 'Chip';
