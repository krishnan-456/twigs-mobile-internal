import { PressableProps } from 'react-native';
import { CommonStyleProps } from '../utils';

export interface SwitchProps extends Omit<PressableProps, 'onPress' | 'style'>, CommonStyleProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
}
