import React from 'react';
import { View } from 'react-native';
import type { ModalFooterProps } from './types';
import { styles } from './styles';

/**
 * ModalFooter renders the action area at the bottom of the modal.
 * Children (typically Buttons) are laid out in a row with equal width.
 */
export const ModalFooter = React.forwardRef<View, ModalFooterProps>(
  ({ children, css, style, ...rest }, ref) => {
    const wrappedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      return <View style={styles.footerChild}>{child}</View>;
    });

    return (
      <View ref={ref} style={[styles.footer, css, style]} {...rest}>
        {wrappedChildren}
      </View>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
