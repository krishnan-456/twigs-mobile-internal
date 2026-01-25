import React, { memo, useMemo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BottomSheetHandle } from '@gorhom/bottom-sheet';
import type { SharedValue } from 'react-native-reanimated';
import { Flex } from '../flex';
import { Text } from '../text';
import { useTheme } from '../context';

export interface BottomSheetHeaderProps {
  animatedIndex: SharedValue<number>;
  animatedPosition: SharedValue<number>;
  title?: string;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  headerStyle?: ViewStyle;
}

const BottomSheetHeaderComponent: React.FC<BottomSheetHeaderProps> = ({
  title,
  style,
  indicatorStyle,
  headerStyle,
}) => {
  const theme = useTheme();

  const defaultHandleStyle: ViewStyle = {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.secondary50,
    borderBottomWidth: 1,
    borderColor: theme.colors.neutral200,
  };

  const defaultIndicatorStyle: ViewStyle = {
    width: 50,
    backgroundColor: theme.colors.secondary200,
  };

  const defaultHeaderStyle: ViewStyle = {
    backgroundColor: theme.colors.secondary50,
  };

  const mergedHandleStyle = useMemo(
    () => StyleSheet.flatten([defaultHandleStyle, style]),
    [style, theme]
  );

  const mergedIndicatorStyle = useMemo(
    () => StyleSheet.flatten([defaultIndicatorStyle, indicatorStyle]),
    [indicatorStyle, theme]
  );

  const mergedHeaderStyle = useMemo(
    () => StyleSheet.flatten([defaultHeaderStyle, headerStyle]),
    [headerStyle, theme]
  );

  const HandleComponent = BottomSheetHandle as any;

  return (
    <HandleComponent style={mergedHandleStyle} indicatorStyle={mergedIndicatorStyle}>
      {title && (
        <Flex direction="row" align="center" paddingTop={8} css={mergedHeaderStyle}>
          <Text color={theme.colors.secondary700} fontFamily={theme.fonts.medium}>
            {title}
          </Text>
        </Flex>
      )}
    </HandleComponent>
  );
};

export const BottomSheetHeader = memo(BottomSheetHeaderComponent);
BottomSheetHeader.displayName = 'BottomSheetHeader';
