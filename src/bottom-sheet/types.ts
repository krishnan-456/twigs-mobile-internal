import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import {
  BottomSheetProps as GorhomBottomSheetProps,
  BottomSheetModalProps as GorhomBottomSheetModalProps,
} from '@gorhom/bottom-sheet';

export interface BottomSheetProps extends Omit<
  GorhomBottomSheetProps,
  'style' | 'handleStyle' | 'handleIndicatorStyle' | 'handleComponent'
> {
  title?: string;
  style?: ViewStyle;
  handleStyle?: ViewStyle;
  handleIndicatorStyle?: ViewStyle;
  headerStyle?: ViewStyle;
}

export interface BottomSheetModalProps extends Omit<
  GorhomBottomSheetModalProps,
  'children' | 'style' | 'handleStyle' | 'handleIndicatorStyle' | 'handleComponent'
> {
  title?: string;
  children?: ReactNode;
  style?: ViewStyle;
  handleStyle?: ViewStyle;
  handleIndicatorStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  pressBehavior?: 'none' | 'close' | 'collapse' | number;
}

export interface BottomSheetHeaderProps {
  animatedIndex: SharedValue<number>;
  animatedPosition: SharedValue<number>;
  title?: string;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  headerStyle?: ViewStyle;
}
