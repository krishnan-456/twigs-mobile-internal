import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastItem } from './toast-item';
import type { ToastState, ToastPosition } from './types';
import { getPositionContainerStyle } from './helpers';
import { styles } from './styles';

let FullWindowOverlay: React.ComponentType<{ children: React.ReactNode }> | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const screens = require('react-native-screens');
  FullWindowOverlay = screens.FullWindowOverlay;
} catch {
  // react-native-screens not available — fall back to regular View
}

interface ToastContainerProps {
  toasts: ToastState[];
  position: ToastPosition;
  offset: number;
  gap: number;
  onRemove: (id: string) => void;
}

const PositionedStack = ({
  toasts,
  position,
  offset,
  gap,
  onRemove,
}: ToastContainerProps) => {
  const insets = useSafeAreaInsets();

  const adjustedOffset = useMemo(() => {
    const isTop = position.startsWith('top');
    const safeInset = isTop ? insets.top : insets.bottom;
    return offset + safeInset;
  }, [offset, position, insets]);

  const positionStyle = useMemo(
    () => getPositionContainerStyle(position, adjustedOffset),
    [position, adjustedOffset],
  );

  const orderedToasts = useMemo(() => {
    return position.startsWith('bottom')
      ? toasts
      : [...toasts].reverse();
  }, [toasts, position]);

  if (toasts.length === 0) return null;

  return (
    <View
      style={[styles.stackContainer, positionStyle]}
      pointerEvents="box-none"
    >
      {orderedToasts.map((t) => (
        <View key={t.id} style={{ marginBottom: gap }} pointerEvents="box-none">
          <ToastItem
            {...t}
            onRemove={onRemove}
          />
        </View>
      ))}
    </View>
  );
};

export const ToastContainer = (props: ToastContainerProps) => {
  if (Platform.OS === 'ios' && FullWindowOverlay) {
    return (
      <FullWindowOverlay>
        <GestureHandlerRootView
          style={styles.gestureRoot}
          pointerEvents="box-none"
        >
          <View style={styles.overlay} pointerEvents="box-none">
            <PositionedStack {...props} />
          </View>
        </GestureHandlerRootView>
      </FullWindowOverlay>
    );
  }

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <PositionedStack {...props} />
    </View>
  );
};
