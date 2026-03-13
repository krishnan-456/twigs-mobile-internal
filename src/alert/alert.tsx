import React, { useMemo } from 'react';
import { View, Text as RNText } from 'react-native';
import { useTheme } from '../context';
import { Button } from '../button';
import type { AlertProps } from './types';
import { DEFAULT_STATUS, ALERT_ICON_SIZE, ALERT_CLOSE_ICON_SIZE } from './constants';
import { getStatusContainerStyles, getIconColor, getTextStyles } from './helpers';
import { styles } from './styles';
import { STATUS_ICONS, CloseIcon } from './icons';

/** Contextual feedback banner with status icon, content, and optional close action. */
export const Alert = React.forwardRef<View, AlertProps>(
  (
    {
      status = DEFAULT_STATUS,
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

    const statusStyles = useMemo(() => getStatusContainerStyles(theme, status), [theme, status]);
    const textStyles = useMemo(() => getTextStyles(theme), [theme]);
    const iconColor = useMemo(() => getIconColor(theme, status), [theme, status]);

    const renderIcon = () => {
      if (icon) {
        return React.cloneElement(icon, {
          width: ALERT_ICON_SIZE,
          height: ALERT_ICON_SIZE,
          color: iconColor,
        });
      }

      const DefaultIcon = STATUS_ICONS[status];
      return <DefaultIcon size={ALERT_ICON_SIZE} color={iconColor} />;
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
        style={[styles.container, statusStyles, css, style]}
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
            size="sm"
            color="default"
            icon={<CloseIcon size={ALERT_CLOSE_ICON_SIZE} color={theme.colors.neutral800} />}
            style={styles.closeButton}
            {...(onClose && { onPress: onClose })}
          />
        )}
      </View>
    );
  }
);

Alert.displayName = 'Alert';
