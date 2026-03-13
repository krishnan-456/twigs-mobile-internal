import type { ReactElement, ReactNode } from 'react';
import type { TextInputProps as RNTextInputProps, TextStyle } from 'react-native';
import type { MarginProps, PaddingProps, CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type TextInputSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextInputVariant = 'default' | 'filled';

export interface TextInputProps extends MarginProps, PaddingProps, CommonStyleProps, BaseAccessibilityProps {
  /** Size preset controlling height, font size, and icon dimensions. @default 'md' */
  size?: TextInputSize;
  /** Visual variant. @default 'default' */
  variant?: TextInputVariant;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  /** Icon rendered inside the input on the left. */
  leftIcon?: ReactElement;
  /** Icon rendered inside the input on the right. Acts as password toggle when `secureTextEntry` is set. */
  rightIcon?: ReactElement;
  /** Arbitrary element rendered on the right (outside the icon slot). */
  rightElement?: ReactElement;
  /** Arbitrary element rendered on the left (outside the icon slot). */
  leftElement?: ReactElement;
  disabled?: boolean;
  /** When true, the bottom border turns red to indicate a validation error. */
  errorBorder?: boolean;
  placeholderTextColor?: string;
  cursorColor?: string;
  secureTextEntry?: boolean;
  /** Controlled password visibility state — pair with `setShowPassword`. */
  showPassword?: boolean;
  /** Toggle callback for password visibility. */
  setShowPassword?: (show: boolean) => void;
  /** Style overrides applied to the inner RNTextInput. */
  inputStyle?: TextStyle;
  readOnly?: boolean;
  autoCapitalize?: RNTextInputProps['autoCapitalize'];
  autoCorrect?: RNTextInputProps['autoCorrect'];
  autoFocus?: RNTextInputProps['autoFocus'];
  blurOnSubmit?: RNTextInputProps['blurOnSubmit'];
  editable?: RNTextInputProps['editable'];
  keyboardType?: RNTextInputProps['keyboardType'];
  maxLength?: RNTextInputProps['maxLength'];
  multiline?: RNTextInputProps['multiline'];
  numberOfLines?: RNTextInputProps['numberOfLines'];
  onBlur?: RNTextInputProps['onBlur'];
  onFocus?: RNTextInputProps['onFocus'];
  onSubmitEditing?: RNTextInputProps['onSubmitEditing'];
  returnKeyType?: RNTextInputProps['returnKeyType'];
  textContentType?: RNTextInputProps['textContentType'];
  /** Content rendered below the input (e.g. helper text). */
  children?: ReactNode;
  /** Error message shown below the input with `accessibilityRole="alert"`. */
  errorMessage?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}
