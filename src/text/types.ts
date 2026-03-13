import { ReactNode } from 'react';
import { AccessibilityRole, TextStyle } from 'react-native';
import { MarginProps, PaddingProps } from '../utils';

/**
 * Props for the Text component.
 * Extends `MarginProps` and `PaddingProps` for spacing shorthand.
 * `css` is applied before `style` for layered text style overrides.
 */
export interface TextProps extends MarginProps, PaddingProps {
  children?: ReactNode;
  /** Text styles applied before `style`. */
  css?: TextStyle;
  /** Text styles applied last for final overrides. */
  style?: TextStyle;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textDecoration?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  fontStyle?: 'normal' | 'italic';
  lineHeight?: number;
  letterSpacing?: number;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  accessible?: boolean;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
}
