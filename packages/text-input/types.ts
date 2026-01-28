import { ReactElement, ReactNode } from 'react';
import { TextInputProps as RNTextInputProps, TextStyle } from 'react-native';
import { MarginProps, PaddingProps, CommonStyleProps } from '../utils';

export type TextInputSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextInputVariant = 'default' | 'filled';

export interface TextInputProps extends MarginProps, PaddingProps, CommonStyleProps {
  size?: TextInputSize;
  variant?: TextInputVariant;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  rightElement?: ReactElement;
  leftElement?: ReactElement;
  disabled?: boolean;
  errorBorder?: boolean;
  placeholderTextColor?: string;
  cursorColor?: string;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
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
  children?: ReactNode;
  errorMessage?: string;
}
