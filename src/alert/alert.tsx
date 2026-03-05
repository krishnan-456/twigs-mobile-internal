import React, { useMemo } from 'react';
import { View, Text as RNText } from 'react-native';
import { useTheme } from '../context';
import { Button } from '../button';
import type { AlertProps } from './types';
import { DEFAULT_SIZE, DEFAULT_STATUS } from './constants';
import {
  getSizeStyles,
  getStatusContainerStyles,
  getIconColor,
  getTextStyles,
  getStatusIconSize,
  getCloseIconSize,
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
    const statusIconSize = useMemo(() => getStatusIconSize(size), [size]);
    const closeIconSize = useMemo(() => getCloseIconSize(size), [size]);

    // Render the appropriate icon
    const renderIcon = () => {
      if (icon) {
        return React.cloneElement(icon, {
          width: statusIconSize,
          height: statusIconSize,
          color: iconColor,
        });
      }

      const DefaultIcon = STATUS_ICONS[status];
      return <DefaultIcon size={statusIconSize} color={iconColor} />;
    };

    // Mobile deviation: Using accessibilityLiveRegion for dynamic alerts
    // instead of aria-live which is web-only
    const computedLiveRegion =
      accessibilityLiveRegion ?? (status === 'error' || status === 'warning' ? 'polite' : 'none');

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

        {closable && (
          <Button
            accessible
            accessibilityLabel="Close alert"
            accessibilityHint="Dismisses this alert"
            size={size === 'sm' ? 'xs' : 'sm'}
            color="default"
            variant="ghost"
            icon={<CloseIcon size={closeIconSize} color={theme.colors.neutral800} />}
            style={styles.closeButton}
            {...(onClose && { onPress: onClose })}
          />
        )}
      </View>
    );
  }
);

Alert.displayName = 'Alert';
