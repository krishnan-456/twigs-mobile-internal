import React, { useMemo } from 'react';
import { View, Text as RNText, Dimensions } from 'react-native';
import type { ReactElement } from 'react';
import { useTheme } from '../context';
import { CircleLoader } from '../loader';
import type { ToastVariant } from './types';
import { TOAST_ICON_SIZE, TOAST_MAX_WIDTH, DEFAULT_VARIANT, VARIANT_COLORS } from './constants';
import {
  getVariantContainerStyles,
  getIconColor,
  getBackgroundColor,
  getTitleStyles,
  getDescriptionStyles,
} from './helpers';
import { styles } from './styles';
import { VARIANT_ICONS, InfoCircleFilledIcon } from './icons';

const screenWidth = Dimensions.get('window').width;

interface ToastContentProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  icon?: ReactElement | null;
  action?: ReactElement | null;
}

/**
 * Visual content renderer for a single toast. Consumed by ToastItem.
 * Not exported from the public API — consumers interact via toast() and ToastProvider.
 */
export const ToastContent = ({ title, description, variant: variantProp, icon, action }: ToastContentProps) => {
  const theme = useTheme();
  const variant: ToastVariant = variantProp ?? DEFAULT_VARIANT;

  const containerStyles = useMemo(
    () => getVariantContainerStyles(theme, variant),
    [theme, variant],
  );
  const iconColor = useMemo(() => getIconColor(theme, variant), [theme, variant]);
  const titleStyles = useMemo(() => getTitleStyles(theme, variant), [theme, variant]);
  const descriptionStyles = useMemo(
    () => getDescriptionStyles(theme, variant),
    [theme, variant],
  );

  const renderIcon = () => {
    if (icon) {
      return React.cloneElement(icon, {
        width: TOAST_ICON_SIZE,
        height: TOAST_ICON_SIZE,
        color: iconColor,
      });
    }

    if (variant === 'loading') {
      const loaderColor =
        VARIANT_COLORS[variant].icon === 'white900' ? 'bright' : 'accent';
      return <CircleLoader size="md" color={loaderColor} />;
    }

    if (variant === 'warning') {
      const bgColor = getBackgroundColor(theme, variant);
      return (
        <InfoCircleFilledIcon
          size={TOAST_ICON_SIZE}
          color={iconColor}
          innerColor={bgColor}
        />
      );
    }

    const DefaultIcon = VARIANT_ICONS[variant];
    if (DefaultIcon) {
      return <DefaultIcon size={TOAST_ICON_SIZE} color={iconColor} />;
    }

    return null;
  };

  return (
    <View
      accessible
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={[title, description].filter(Boolean).join('. ')}
      style={[styles.container, containerStyles, { width: screenWidth - 32, maxWidth: TOAST_MAX_WIDTH }]}
    >
      <View style={styles.contentSection}>
        <View style={styles.iconContainer}>{renderIcon()}</View>
        <View style={styles.textContainer}>
          {title ? (
            <RNText
              style={[styles.title, titleStyles]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </RNText>
          ) : null}
          {description ? (
            <RNText
              style={[styles.description, descriptionStyles]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description}
            </RNText>
          ) : null}
        </View>
      </View>

      {action ? <View style={styles.actionContainer}>{action}</View> : null}
    </View>
  );
};
