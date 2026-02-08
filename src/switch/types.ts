import { PressableProps } from 'react-native';
import { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export interface SwitchProps
  extends Omit<PressableProps, 'onPress' | 'style'>, CommonStyleProps, BaseAccessibilityProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
}
