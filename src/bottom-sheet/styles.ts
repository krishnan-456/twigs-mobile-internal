import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import type { AnimateStyle } from 'react-native-reanimated';
import type { TwigsTheme } from '../theme';

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
export const getDefaultSheetStyle = (theme: TwigsTheme, overrides?: ViewStyle): AnimatedViewStyle =>
  StyleSheet.flatten([
    {
      borderRadius: 16,
      backgroundColor: theme.colors.white900,
      marginHorizontal: 8,
      borderWidth: 1,
      borderColor: theme.colors.neutral100,
      overflow: 'hidden' as const,
    },
    overrides,
  ]) as AnimatedViewStyle;
