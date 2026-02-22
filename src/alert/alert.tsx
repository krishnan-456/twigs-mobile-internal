import React, { useMemo } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useTheme } from '../context';
import type { AlertProps } from './types';
import { DEFAULT_SIZE, DEFAULT_STATUS, SIZE_CONFIG } from './constants';
import {
  getSizeStyles,
  getStatusContainerStyles,
  getIconColor,
  getTextStyles,
  getIconSize,
} from './helpers';
import { styles } from './styles';
import { STATUS_ICONS, CloseIcon } from './icons';

/**
 * Alert component displays contextual feedback messages with status indicators.
 * Aligned with the web twigs library's Alert component.
 */
export const Alert = React.forwardRef<View, AlertProps>(
  (
    {
      status = DEFAULT_STATUS,
      size = DEFAULT_SIZE,
      icon,
      closable = false,
      onClose,
      children,
      css,
      style,
      accessible = true,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      accessibilityLiveRegion,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();

    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);
    const statusStyles = useMemo(() => getStatusContainerStyles(theme, status), [theme, status]);
    const textStyles = useMemo(() => getTextStyles(theme, status, size), [theme, status, size]);

    const iconColor = useMemo(() => getIconColor(theme, status), [theme, status]);
    const iconSize = useMemo(() => getIconSize(size), [size]);
    const closeIconSize = useMemo(() => SIZE_CONFIG[size].iconSize - 4, [size]);

    // Render the appropriate icon
    const renderIcon = () => {
      if (icon) {
        return React.cloneElement(icon, {
          width: iconSize,
          height: iconSize,
          color: iconColor,
        });
      }

      const DefaultIcon = STATUS_ICONS[status];
      return <DefaultIcon size={iconSize} color={iconColor} />;
    };

    // Mobile deviation: Using accessibilityLiveRegion for dynamic alerts
    // instead of aria-live which is web-only
    const computedLiveRegion = accessibilityLiveRegion ?? (status === 'error' || status === 'warning' ? 'polite' : 'none');

    return (
      <View
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? 'alert'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={accessibilityState}
        accessibilityLiveRegion={computedLiveRegion}
        style={[styles.container, sizeStyles, statusStyles, css, style]}
        {...rest}
      >
        <View style={styles.iconContainer}>{renderIcon()}</View>

        <View style={styles.contentContainer}>
          {typeof children === 'string' ? <RNText style={textStyles}>{children}</RNText> : children}
        </View>

        {closable && onClose && (
          <Pressable
            onPress={onClose}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Close alert"
            accessibilityHint="Dismisses this alert"
            style={styles.closeButton}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <CloseIcon size={closeIconSize} color={iconColor} />
          </Pressable>
        )}
      </View>
    );
  }
);

Alert.displayName = 'Alert';
