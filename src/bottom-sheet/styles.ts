import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import type { AnimateStyle } from 'react-native-reanimated';
import type { TwigsTheme } from '../theme';
import { SHEET_BORDER_RADIUS, SHEET_BORDER_WIDTH, SHEET_BOTTOM_PADDING } from './constants';

/**
 * Gorhom BottomSheet expects an animated-compatible style type.
 * We narrow the allowed keys to avoid conflicts with internal layout props.
 */
export type AnimatedViewStyle = StyleProp<
  AnimateStyle<
    Omit<
      ViewStyle,
      'left' | 'right' | 'top' | 'bottom' | 'position' | 'opacity' | 'flexDirection' | 'transform'
    >
  >
>;

/** Default container style shared by BottomSheet and BottomSheetModal. */
export const getDefaultSheetStyle = (
  theme: TwigsTheme,
  safeAreaBottomInset: number,
  overrides?: ViewStyle
): AnimatedViewStyle =>
  StyleSheet.flatten([
    {
      borderTopLeftRadius: SHEET_BORDER_RADIUS,
      borderTopRightRadius: SHEET_BORDER_RADIUS,
      backgroundColor: theme.colors.white900,
      borderWidth: SHEET_BORDER_WIDTH,
      borderColor: theme.colors.neutral100,
      paddingBottom: safeAreaBottomInset + SHEET_BOTTOM_PADDING,
      overflow: 'hidden' as const,
    },
    overrides,
  ]) as AnimatedViewStyle;
