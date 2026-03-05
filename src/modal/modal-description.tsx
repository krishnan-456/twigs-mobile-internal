import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useTheme } from '../context';
import type { ModalDescriptionProps } from './types';
import { getDescriptionStyles } from './helpers';

/**
 * ModalDescription renders secondary descriptive text below the title.
 */
export const ModalDescription: React.FC<ModalDescriptionProps> = ({
  children,
  css,
  style,
  testID,
}) => {
  const theme = useTheme();
  const descriptionStyles = useMemo(() => getDescriptionStyles(theme), [theme]);

  return (
    <Text testID={testID} style={[descriptionStyles, css, style]}>
      {children}
    </Text>
  );
};

ModalDescription.displayName = 'ModalDescription';
