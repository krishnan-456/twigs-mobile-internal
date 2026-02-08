import { ReactNode, RefObject } from 'react';
import { View, ViewStyle } from 'react-native';
import { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type CheckboxSize = 'sm' | 'md';
export type CheckedState = boolean | 'indeterminate';

export interface CheckboxProps extends CommonStyleProps, BaseAccessibilityProps {
  checked?: CheckedState;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
  size?: CheckboxSize;
  id?: string;
  containerRef?: RefObject<View>;
  labelStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
}
