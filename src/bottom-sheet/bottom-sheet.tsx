import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Keyboard, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context';
import { BottomSheetHeader } from './bottom-sheet-header';
import type { BottomSheetProps, BottomSheetHeaderProps } from './types';
import { getDefaultSheetStyle } from './styles';

/** Themed wrapper around @gorhom/bottom-sheet with a built-in drag handle and optional title. */
export const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>(
  ({ title, children, style, handleStyle, handleIndicatorStyle, headerStyle, ...props }, ref) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const renderBackdrop = useCallback((backdropProps: BottomSheetBackdropProps) => {
      return (
        <>
          <StatusBar translucent backgroundColor="transparent" />
          <BottomSheetBackdrop
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
      () => getDefaultSheetStyle(theme, insets.bottom, style),
      [insets.bottom, style, theme]
    );

    return (
      <GorhomBottomSheet
        ref={ref}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        keyboardBlurBehavior="restore"
        handleComponent={renderHandle}
        style={mergedBottomSheetStyle}
        {...props}
      >
        {children}
      </GorhomBottomSheet>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
