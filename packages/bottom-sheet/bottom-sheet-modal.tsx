import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, ReactNode, useCallback } from 'react';
import { Keyboard, StatusBar, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import type { AnimateStyle } from 'react-native-reanimated';
import { useTheme } from '../context';
import { Flex } from '../flex';
import { Text } from '../text';

type AnimatedViewStyle = StyleProp<
  AnimateStyle<
    Omit<
      ViewStyle,
      'left' | 'right' | 'top' | 'bottom' | 'position' | 'opacity' | 'flexDirection' | 'transform'
    >
  >
>;

interface TwigsBottomSheetModalProps extends Omit<
  BottomSheetModalProps,
  'children' | 'style' | 'handleStyle' | 'handleIndicatorStyle'
> {
  title?: string;
  children?: ReactNode;
  style?: ViewStyle;
  handleStyle?: ViewStyle;
  handleIndicatorStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  pressBehavior?: 'none' | 'close' | 'collapse' | number;
}

export const TwigsBottomSheetModal = forwardRef<BottomSheetModal, TwigsBottomSheetModalProps>(
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
      (props: any) => {
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
              {...props}
            />
          </>
        );
      },
      [pressBehavior]
    );

    const defaultModalStyle: ViewStyle = {
      borderRadius: 16,
      backgroundColor: theme.colors.white900,
      marginHorizontal: 8,
      borderWidth: 1,
      borderColor: theme.colors.neutral100,
      overflow: 'hidden',
    };

    const defaultHandleStyle: ViewStyle = {
      height: 20,
      backgroundColor: theme.colors.secondary50,
    };

    const defaultHandleIndicatorStyle: ViewStyle = {
      width: 50,
      backgroundColor: theme.colors.secondary200,
    };

    const defaultHeaderStyle: ViewStyle = {
      backgroundColor: theme.colors.secondary50,
      borderBottomWidth: 1,
      borderColor: theme.colors.neutral200,
    };

    const mergedModalStyle = StyleSheet.flatten([defaultModalStyle, style]) as AnimatedViewStyle;
    const mergedHandleStyle = StyleSheet.flatten([
      defaultHandleStyle,
      handleStyle,
    ]) as StyleProp<ViewStyle>;
    const mergedHandleIndicatorStyle = StyleSheet.flatten([
      defaultHandleIndicatorStyle,
      handleIndicatorStyle,
    ]) as StyleProp<ViewStyle>;
    const mergedHeaderStyle = StyleSheet.flatten([defaultHeaderStyle, headerStyle]);

    const BottomSheetModalComponent = BottomSheetModal as any;
    const BottomSheetViewComponent = BottomSheetView as any;

    return (
      <BottomSheetModalComponent
        ref={ref}
        detached
        enablePanDownToClose
        bottomInset={24}
        backdropComponent={renderBackdrop}
        keyboardBlurBehavior="restore"
        handleIndicatorStyle={mergedHandleIndicatorStyle}
        handleStyle={mergedHandleStyle}
        style={mergedModalStyle}
        {...props}
      >
        <BottomSheetViewComponent>
          {title && (
            <Flex
              direction="row"
              align="center"
              paddingHorizontal={16}
              paddingBottom={16}
              css={mergedHeaderStyle}
            >
              <Text color={theme.colors.secondary700} fontFamily={theme.fonts.medium}>
                {title}
              </Text>
            </Flex>
          )}
          {children}
        </BottomSheetViewComponent>
      </BottomSheetModalComponent>
    );
  }
);

TwigsBottomSheetModal.displayName = 'TwigsBottomSheetModal';
