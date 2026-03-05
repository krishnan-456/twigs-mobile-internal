import React from 'react';
import { View, ScrollView } from 'react-native';
import type { ModalBodyProps } from './types';
import { styles } from './styles';

/**
 * ModalBody renders the main content area between header and footer.
 * Supports optional scrolling via the `scrollable` prop.
 */
export const ModalBody = React.forwardRef<View, ModalBodyProps>(
  ({ children, scrollable = false, css, style, ...rest }, ref) => {
    if (scrollable) {
      return (
        <ScrollView ref={ref as React.Ref<ScrollView>} style={[styles.body, css, style]} {...rest}>
          {children}
        </ScrollView>
      );
    }

    return (
      <View ref={ref} style={[styles.body, css, style]} {...rest}>
        {children}
      </View>
    );
  }
);

ModalBody.displayName = 'ModalBody';
