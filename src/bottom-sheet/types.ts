import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import {
  BottomSheetProps as GorhomBottomSheetProps,
  BottomSheetModalProps as GorhomBottomSheetModalProps,
} from '@gorhom/bottom-sheet';

/** Themed wrapper around @gorhom/bottom-sheet with a built-in header. */
export interface BottomSheetProps extends Omit<
  GorhomBottomSheetProps,
  'style' | 'handleStyle' | 'handleIndicatorStyle' | 'handleComponent'
> {
  /** Optional title displayed in the sheet header. */
  title?: string;
  style?: ViewStyle;
  handleStyle?: ViewStyle;
  handleIndicatorStyle?: ViewStyle;
  headerStyle?: ViewStyle;
}

/** Modal variant of BottomSheet that presents on top of a backdrop. */
export interface BottomSheetModalProps extends Omit<
  GorhomBottomSheetModalProps,
  'children' | 'style' | 'handleStyle' | 'handleIndicatorStyle' | 'handleComponent'
> {
  /** Optional title displayed in the sheet header. */
  title?: string;
  children?: ReactNode;
  style?: ViewStyle;
  handleStyle?: ViewStyle;
  handleIndicatorStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  /** Backdrop press behavior: 'none', 'close', 'collapse', or a snap point index. */
  pressBehavior?: 'none' | 'close' | 'collapse' | number;
}

/** Props for the themed BottomSheet drag handle and optional title row. */
export interface BottomSheetHeaderProps {
  animatedIndex: SharedValue<number>;
  animatedPosition: SharedValue<number>;
  title?: string;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  headerStyle?: ViewStyle;
}
