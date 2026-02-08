import React, { memo, useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BottomSheetHandle } from '@gorhom/bottom-sheet';
import { Flex } from '../flex';
import { Text } from '../text';
import { useTheme } from '../context';
import type { BottomSheetHeaderProps } from './types';

const BottomSheetHeaderComponent: React.FC<BottomSheetHeaderProps> = ({
  animatedIndex,
  animatedPosition,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [style, theme]
  );

  const mergedIndicatorStyle = useMemo(
    () => StyleSheet.flatten([defaultIndicatorStyle, indicatorStyle]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [indicatorStyle, theme]
  );

  const mergedHeaderStyle = useMemo(
    () => StyleSheet.flatten([defaultHeaderStyle, headerStyle]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headerStyle, theme]
  );

  return (
    <BottomSheetHandle
      animatedIndex={animatedIndex}
      animatedPosition={animatedPosition}
      style={mergedHandleStyle}
      indicatorStyle={mergedIndicatorStyle}
    >
      {title && (
        <Flex direction="row" align="center" paddingTop={8} css={mergedHeaderStyle}>
          <Text color={theme.colors.secondary700} fontFamily={theme.fonts.medium}>
            {title}
          </Text>
        </Flex>
      )}
    </BottomSheetHandle>
  );
};

export const BottomSheetHeader = memo(BottomSheetHeaderComponent);
BottomSheetHeader.displayName = 'BottomSheetHeader';
