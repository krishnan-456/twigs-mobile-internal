import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps as GorhomBottomSheetProps,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Keyboard, StatusBar, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import type { AnimateStyle } from 'react-native-reanimated';
import { useTheme } from '../context';
import { BottomSheetHeader, BottomSheetHeaderProps } from './bottom-sheet-header';

type AnimatedViewStyle = StyleProp<
  AnimateStyle<
    Omit<
      ViewStyle,
      'left' | 'right' | 'top' | 'bottom' | 'position' | 'opacity' | 'flexDirection' | 'transform'
    >
  >
>;

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

export const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>(
  ({ title, children, style, handleStyle, handleIndicatorStyle, headerStyle, ...props }, ref) => {
    const theme = useTheme();

    const renderBackdrop = useCallback((backdropProps: any) => {
      const BackdropComponent = BottomSheetBackdrop as any;
      return (
        <>
          <StatusBar translucent backgroundColor="transparent" />
          <BackdropComponent
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            onPress={() => {
              Keyboard.dismiss();
            }}
            {...backdropProps}
          />
        </>
      );
    }, []);

    const renderHandle = useCallback(
      (handleProps: BottomSheetHeaderProps) => (
        <BottomSheetHeader
          {...handleProps}
          title={title}
          style={handleStyle}
          indicatorStyle={handleIndicatorStyle}
          headerStyle={headerStyle}
        />
      ),
      [title, handleStyle, handleIndicatorStyle, headerStyle]
    );

    const mergedBottomSheetStyle = useMemo(
      () =>
        StyleSheet.flatten([
          {
            borderRadius: 16,
            backgroundColor: theme.colors.white900,
            marginHorizontal: 8,
            borderWidth: 1,
            borderColor: theme.colors.neutral100,
            overflow: 'hidden',
          },
          style,
        ]),
      [style, theme]
    ) as AnimatedViewStyle;

    const BottomSheetComponent = GorhomBottomSheet as any;

    return (
      <BottomSheetComponent
        ref={ref}
        detached
        enablePanDownToClose
        bottomInset={16}
        index={-1}
        backdropComponent={renderBackdrop}
        keyboardBlurBehavior="restore"
        handleComponent={renderHandle}
        style={mergedBottomSheetStyle}
        {...props}
      >
        {children}
      </BottomSheetComponent>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
