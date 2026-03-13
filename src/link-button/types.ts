import type { ReactNode } from 'react';
import type { PressableProps, TextStyle } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type LinkButtonSize = 'sm' | 'md';

export type LinkButtonColor = 'primary' | 'secondary' | 'light';

export type LinkButtonVariant = 'medium' | 'bold';

/**
 * Props for the LinkButton component.
 * A text-only pressable element styled as a hyperlink with underline decoration.
 */
export interface LinkButtonProps
  extends Omit<PressableProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** Text content rendered inside the link button. */
  children: ReactNode;
  /** Size preset controlling font size and line height. @default 'md' */
  size?: LinkButtonSize;
  /** Color preset. @default 'primary' */
  color?: LinkButtonColor;
  /** Visual variant controlling font weight. @default 'medium' */
  variant?: LinkButtonVariant;
  /** Whether the link button is disabled. @default false */
  disabled?: boolean;
  /** Override styles applied to the link text. */
  textStyle?: TextStyle;
}
