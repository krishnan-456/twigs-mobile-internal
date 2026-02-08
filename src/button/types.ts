import { ReactElement, ReactNode } from 'react';
import { PressableProps, TextStyle } from 'react-native';
import { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonColor = 'default' | 'primary' | 'secondary' | 'bright' | 'light' | 'error';
export type ButtonVariant = 'solid' | 'ghost' | 'outline';

export interface ButtonProps extends CommonStyleProps, BaseAccessibilityProps {
  /** Content rendered inside the button. */
  children?: ReactNode;
  /** Size preset. @default 'sm' */
  size?: ButtonSize;
  /** Color preset. @default 'primary' */
  color?: ButtonColor;
  /** Visual variant. @default 'solid' */
  variant?: ButtonVariant;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether the button is in a loading state. */
  loading?: boolean;
  /** Icon element rendered to the left of the label. */
  leftIcon?: ReactElement;
  /** Icon element rendered to the right of the label. */
  rightIcon?: ReactElement;
  /** Icon element for icon-only buttons (no label). */
  icon?: ReactElement;
  /** Press handler. */
  onPress?: PressableProps['onPress'];
  /** Override styles applied to the button label text. */
  textStyle?: TextStyle;
  /**
   * Loader indicator shown during loading state.
   * - `'line'` (default) — animated line loader
   * - `'circle'` — spinning circle indicator
   * - `ReactElement` — custom loader component
   */
  loader?: ReactElement | 'line' | 'circle';
}
