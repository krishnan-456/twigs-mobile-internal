import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, ReactNode } from 'react';
import { Keyboard, StatusBar, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import type { AnimateStyle } from 'react-native-reanimated';
import { Flex } from '../flex';
import { Text } from '../text';
import { theme } from '../theme';

type AnimatedViewStyle = StyleProp<
  AnimateStyle<
    Omit<
      ViewStyle,
      'left' | 'right' | 'top' | 'bottom' | 'position' | 'opacity' | 'flexDirection' | 'transform'
    >
  >
>;

interface TwigsBottomSheetProps extends Omit<
  BottomSheetProps,
  'children' | 'style' | 'handleStyle' | 'handleIndicatorStyle'
> {
  title?: string;
  children?: ReactNode;
  style?: ViewStyle;
  handleStyle?: ViewStyle;
  handleIndicatorStyle?: ViewStyle;
  headerStyle?: ViewStyle;
}

export const TwigsBottomSheet = forwardRef<BottomSheet, TwigsBottomSheetProps>(
  ({ title, children, style, handleStyle, handleIndicatorStyle, headerStyle, ...props }, ref) => {
    const renderBackdrop = useCallback((props: any) => {
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
            {...props}
          />
        </>
      );
    }, []);

    const defaultBottomSheetStyle: ViewStyle = {
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

    const mergedBottomSheetStyle = StyleSheet.flatten([
      defaultBottomSheetStyle,
      style,
    ]) as AnimatedViewStyle;
    const mergedHandleStyle = StyleSheet.flatten([
      defaultHandleStyle,
      handleStyle,
    ]) as StyleProp<ViewStyle>;
    const mergedHandleIndicatorStyle = StyleSheet.flatten([
      defaultHandleIndicatorStyle,
      handleIndicatorStyle,
    ]) as StyleProp<ViewStyle>;
    const mergedHeaderStyle = StyleSheet.flatten([defaultHeaderStyle, headerStyle]);

    const BottomSheetComponent = BottomSheet as any;
    const BottomSheetViewComponent = BottomSheetView as any;

    return (
      <BottomSheetComponent
        ref={ref}
        detached
        enablePanDownToClose
        bottomInset={16}
        index={-1}
        backdropComponent={renderBackdrop}
        keyboardBlurBehavior="restore"
        handleIndicatorStyle={mergedHandleIndicatorStyle}
        handleStyle={mergedHandleStyle}
        style={mergedBottomSheetStyle}
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
              <Text color={theme.colors.secondary700} fontFamily="DMSans_500Medium">
                {title}
              </Text>
            </Flex>
          )}
          {children}
        </BottomSheetViewComponent>
      </BottomSheetComponent>
    );
  }
);

TwigsBottomSheet.displayName = 'TwigsBottomSheet';
