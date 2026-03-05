import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useTheme } from '../context';
import type { ModalTitleProps } from './types';
import { getTitleStyles } from './helpers';

/**
 * ModalTitle renders the modal title text with bold typography.
 */
export const ModalTitle: React.FC<ModalTitleProps> = ({ children, css, style, testID }) => {
  const theme = useTheme();
  const titleStyles = useMemo(() => getTitleStyles(theme), [theme]);

  return (
    <Text testID={testID} numberOfLines={1} style={[titleStyles, css, style]}>
      {children}
    </Text>
  );
};

ModalTitle.displayName = 'ModalTitle';
