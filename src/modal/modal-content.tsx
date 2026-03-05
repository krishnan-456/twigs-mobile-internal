import React, { useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context';
import type { ModalContentProps } from './types';
import { DEFAULT_SIZE } from './constants';
import { getContentStyles } from './helpers';
import { styles } from './styles';

/**
 * ModalContent renders the white card container with rounded corners and shadow.
 * Place inside Modal as the direct child.
 */
export const ModalContent = React.forwardRef<View, ModalContentProps>(
  (
    {
      size = DEFAULT_SIZE,
      children,
      css,
      style,
      accessible,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const { width: screenWidth } = useWindowDimensions();

    const contentStyles = useMemo(
      () => getContentStyles(theme, size, screenWidth),
      [theme, size, screenWidth]
    );

    return (
      <View
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={accessibilityState}
        style={[styles.content, contentStyles, css, style]}
        {...rest}
      >
        {children}
      </View>
    );
  }
);

ModalContent.displayName = 'ModalContent';
