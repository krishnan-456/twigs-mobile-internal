import {
  BottomSheetBackdrop,
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetModalProps as GorhomBottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, ReactNode, useCallback, useMemo } from 'react';
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
      (backdropProps: any) => {
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

    const BottomSheetModalComponent = GorhomBottomSheetModal as any;

    return (
      <BottomSheetModalComponent
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
      </BottomSheetModalComponent>
    );
  }
);

BottomSheetModal.displayName = 'BottomSheetModal';
