import React from 'react';
import { View } from 'react-native';
import type { ModalHeaderProps } from './types';
import { styles } from './styles';

/**
 * ModalHeader renders a header section containing title and description.
 * Centered layout with gap between children.
 */
export const ModalHeader = React.forwardRef<View, ModalHeaderProps>(
  ({ children, css, style, ...rest }, ref) => {
    return (
      <View ref={ref} style={[styles.header, css, style]} {...rest}>
        {children}
      </View>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';
