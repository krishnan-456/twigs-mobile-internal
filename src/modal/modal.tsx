import React, { useMemo } from 'react';
import { Modal as RNModal, View, Pressable } from 'react-native';
import { useTheme } from '../context';
import type { ModalProps } from './types';
import { DEFAULT_ANIMATION_TYPE } from './constants';
import { getBackdropStyle } from './helpers';
import { styles } from './styles';

/**
 * Modal root component wrapping React Native Modal.
 * Provides a backdrop overlay and centers children.
 *
 * Mobile deviation: Uses `visible` prop instead of Radix Trigger/Close pattern.
 * Android back button triggers `onClose` via `onRequestClose`.
 */
export const Modal = React.forwardRef<View, ModalProps>(
  (
    {
      visible,
      onClose,
      closeOnBackdropPress = true,
      animationType = DEFAULT_ANIMATION_TYPE,
      children,
      testID,
      accessible = true,
      accessibilityViewIsModal,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();

    const backdropStyle = useMemo(() => getBackdropStyle(theme), [theme]);

    return (
      <RNModal
        visible={visible}
        transparent
        animationType={animationType}
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <View
          ref={ref}
          testID={testID}
          accessible={accessible}
          accessibilityViewIsModal={accessibilityViewIsModal ?? true}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityState={accessibilityState}
          style={[styles.overlay, backdropStyle]}
          {...rest}
        >
          <Pressable
            style={styles.backdropPressable}
            onPress={closeOnBackdropPress ? onClose : undefined}
            accessible={false}
          />
          {children}
        </View>
      </RNModal>
    );
  }
);

Modal.displayName = 'Modal';
