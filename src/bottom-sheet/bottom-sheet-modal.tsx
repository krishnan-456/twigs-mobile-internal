import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as GorhomBottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Keyboard, StatusBar } from 'react-native';
import { useTheme } from '../context';
import { BottomSheetHeader } from './bottom-sheet-header';
import type { BottomSheetModalProps, BottomSheetHeaderProps } from './types';
import { getDefaultSheetStyle } from './styles';

export const BottomSheetModal = forwardRef<GorhomBottomSheetModal, BottomSheetModalProps>(
  (
    {
      title,
      children,
      style,
      handleStyle,
      handleIndicatorStyle,
      headerStyle,
      pressBehavior = 'close',
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => {
        return (
          <>
            <StatusBar translucent backgroundColor="transparent" />
            <BottomSheetBackdrop
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              onPress={() => {
                Keyboard.dismiss();
              }}
              pressBehavior={pressBehavior}
              {...backdropProps}
            />
          </>
        );
      },
      [pressBehavior]
    );

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

    const mergedModalStyle = useMemo(
      () => getDefaultSheetStyle(theme, style),
      [style, theme]
    );

    return (
      <GorhomBottomSheetModal
        ref={ref}
        detached
        enablePanDownToClose
        bottomInset={24}
        backdropComponent={renderBackdrop}
        keyboardBlurBehavior="restore"
        handleComponent={renderHandle}
        style={mergedModalStyle}
        {...props}
      >
        {children}
      </GorhomBottomSheetModal>
    );
  }
);

BottomSheetModal.displayName = 'BottomSheetModal';
