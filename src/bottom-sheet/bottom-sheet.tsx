import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Keyboard, StatusBar } from 'react-native';
import { useTheme } from '../context';
import { BottomSheetHeader } from './bottom-sheet-header';
import type { BottomSheetProps, BottomSheetHeaderProps } from './types';
import { getDefaultSheetStyle } from './styles';

export const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>(
  ({ title, children, style, handleStyle, handleIndicatorStyle, headerStyle, ...props }, ref) => {
    const theme = useTheme();

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
      () => getDefaultSheetStyle(theme, style),
      [style, theme]
    );

    return (
      <GorhomBottomSheet
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
      </GorhomBottomSheet>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
