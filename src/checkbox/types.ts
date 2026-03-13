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
  /** Current checked state: true, false, or 'indeterminate'. @default false */
  checked?: CheckedState;
  /** Called with the next boolean value when toggled. */
  onChange?: (checked: boolean) => void;
  /** Whether the checkbox is disabled. @default false */
  disabled?: boolean;
  /** Optional label rendered beside the checkbox. */
  children?: ReactNode;
  /** Size preset. @default 'sm' */
  size?: CheckboxSize;
  id?: string;
  /** Ref forwarded to the outer Pressable container. */
  containerRef?: RefObject<View>;
  /** Style overrides for the label container. */
  labelStyle?: StyleProp<ViewStyle>;
  /** Style overrides for the checkbox box itself. */
  checkboxStyle?: StyleProp<ViewStyle>;
}
