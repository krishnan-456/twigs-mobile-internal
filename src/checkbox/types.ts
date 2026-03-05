import type { ReactNode, RefObject } from 'react';
import type { PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import type { BaseAccessibilityProps, CommonStyleProps } from '../utils';

export type CheckboxSize = 'sm' | 'md';
export type CheckedState = boolean | 'indeterminate';

export interface CheckboxProps
  extends
    Omit<PressableProps, 'style' | 'onPress' | 'children'>,
    CommonStyleProps,
    BaseAccessibilityProps {
  checked?: CheckedState;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
  size?: CheckboxSize;
  id?: string;
  containerRef?: RefObject<View>;
  labelStyle?: StyleProp<ViewStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
}
