import { ReactNode, RefObject } from 'react';
import { View, ViewStyle } from 'react-native';
import { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type RadioSize = 'sm' | 'md';

export interface RadioProps extends CommonStyleProps, BaseAccessibilityProps {
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
  size?: RadioSize;
  width?: number;
  height?: number;
  innerWidth?: number;
  innerHeight?: number;
  containerRef?: RefObject<View>;
  labelStyle?: ViewStyle;
  radioStyle?: ViewStyle;
}
