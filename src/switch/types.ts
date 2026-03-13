import type { PressableProps } from 'react-native';
import type { BaseAccessibilityProps, CommonStyleProps } from '../utils';

export type SwitchSize = 'sm' | 'md';

export type SwitchColor = 'primary' | 'secondary';

export interface SwitchProps
  extends Omit<PressableProps, 'onPress' | 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** Controlled toggle state (RN-style API). Alias for `checked`. */
  value?: boolean;
  /** Called with the next value when toggled (RN-style API). Alias for `onChange`. */
  onValueChange?: (value: boolean) => void;
  /** Controlled toggle state (web-style API). Takes precedence over `value`. */
  checked?: boolean;
  /** Initial state for uncontrolled usage. @default false */
  defaultChecked?: boolean;
  /** Called with the next checked value when toggled (web-style API). */
  onChange?: (checked: boolean) => void;
  /** Whether the switch is disabled. @default false */
  disabled?: boolean;
  /** Size preset. @default 'md' */
  size?: SwitchSize;
  /** Color preset. @default 'primary' */
  color?: SwitchColor;
}
