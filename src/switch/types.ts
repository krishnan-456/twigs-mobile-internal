import type { PressableProps } from 'react-native';
import type { BaseAccessibilityProps, CommonStyleProps } from '../utils';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps
  extends Omit<PressableProps, 'onPress' | 'style'>, CommonStyleProps, BaseAccessibilityProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
}
