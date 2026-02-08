import { ReactElement, ReactNode } from 'react';
import { PressableProps, TextStyle } from 'react-native';
import { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonColor = 'primary' | 'secondary' | 'default' | 'negative' | 'neutral';
export type ButtonVariant = 'solid' | 'ghost' | 'outline';

export interface ButtonProps extends CommonStyleProps, BaseAccessibilityProps {
  children?: ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  icon?: ReactElement;
  onPress?: PressableProps['onPress'];
  textStyle?: TextStyle;
}
