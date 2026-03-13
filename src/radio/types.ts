import { ReactNode, RefObject } from 'react';
import { View, ViewStyle } from 'react-native';
import { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type RadioSize = 'sm' | 'md';

export interface RadioProps extends CommonStyleProps, BaseAccessibilityProps {
  /** Whether this radio button is selected. @default false */
  selected?: boolean;
  /** Called with the toggled value when pressed. */
  onSelect?: (selected: boolean) => void;
  /** Whether the radio button is disabled. @default false */
  disabled?: boolean;
  /** Optional label rendered beside the radio circle. */
  children?: ReactNode;
  /** Size preset. @default 'sm' */
  size?: RadioSize;
  /** Ref forwarded to the outer Pressable container. */
  containerRef?: RefObject<View>;
  /** Style overrides for the label container. */
  labelStyle?: ViewStyle;
  /** Style overrides for the outer radio circle. */
  radioStyle?: ViewStyle;
}
