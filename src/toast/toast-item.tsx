import React, { useEffect, useCallback, useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import { ToastContent } from './toast-content';
import type { ToastItemProps } from './types';
import {
  ANIMATION_DURATION,
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  TOAST_MIN_HEIGHT,
} from './constants';
import { styles } from './styles';

const ELASTIC_RESISTANCE = 0.4;

const SPRING_CONFIG = { damping: 20, stiffness: 170, mass: 1 };

function elasticResistance(distance: number): number {
  'worklet';
  const progressiveFactor = 1 / (1 + Math.abs(distance) * 0.02);
  return distance * ELASTIC_RESISTANCE * progressiveFactor;
}

export const ToastItem = React.memo<ToastItemProps>(
  ({
    id,
    title,
    description,
    variant,
    icon,
    action,
    position,
    duration,
    onPress,
    onShow,
    onDismiss: onDismissCallback,
    onRemove,
  }) => {
    const isTopPosition = position.startsWith('top');
    const dismissDirection = isTopPosition ? -1 : 1;
    const hiddenY = dismissDirection * (TOAST_MIN_HEIGHT * 2);
    const progress = useSharedValue(0);
    const swipeY = useSharedValue(0);
    const isDragging = useRef(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const dismiss = useCallback(() => {
      onDismissCallback?.();
      onRemove(id);
    }, [id, onRemove, onDismissCallback]);

    useEffect(() => {
      progress.value = withSpring(1, SPRING_CONFIG);
      onShow?.();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (duration === Infinity || duration <= 0) return;

      timerRef.current = setTimeout(() => {
        if (!isDragging.current) {
          dismiss();
        }
      }, duration + ANIMATION_DURATION);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [duration, dismiss]);

    const panGesture = Gesture.Pan()
      .activeOffsetY([-10, 10])
      .failOffsetX([-5, 5])
      .onBegin(() => {
        'worklet';
        runOnJS(() => {
          isDragging.current = true;
        })();
      })
      .onUpdate((event) => {
        'worklet';
        const raw = event.translationY;
        const isInDismissDirection = isTopPosition ? raw < 0 : raw > 0;
        swipeY.value = isInDismissDirection
          ? raw
          : elasticResistance(raw);
      })
      .onEnd((event) => {
        'worklet';
        const { translationY: ty, velocityY: vy } = event;
        const isInDismissDirection = isTopPosition ? ty < 0 : ty > 0;
        const shouldDismiss =
          isInDismissDirection &&
          (Math.abs(ty) > SWIPE_THRESHOLD ||
            Math.abs(vy) > SWIPE_VELOCITY_THRESHOLD);

        if (shouldDismiss) {
          progress.value = withSpring(0, SPRING_CONFIG, (finished) => {
            if (finished) runOnJS(dismiss)();
          });
          swipeY.value = withSpring(0, SPRING_CONFIG);
        } else {
          swipeY.value = withSpring(0, SPRING_CONFIG);
        }
      })
      .onFinalize(() => {
        'worklet';
        runOnJS(() => {
          isDragging.current = false;
        })();
      });

    const tapGesture = Gesture.Tap()
      .maxDuration(250)
      .onEnd(() => {
        'worklet';
        if (onPress) {
          runOnJS(onPress)();
        }
      });

    const composedGesture = Gesture.Race(panGesture, tapGesture);

    const animatedStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        progress.value,
        [0, 1],
        [hiddenY, 0],
        Extrapolation.CLAMP,
      );

      const opacity = interpolate(
        progress.value,
        [0, 0.7, 1],
        [0, 1, 1],
        Extrapolation.CLAMP,
      );

      return {
        opacity,
        transform: [{ translateY: translateY + swipeY.value }],
      };
    });

    return (
      <GestureDetector gesture={composedGesture}>
        <AnimatedView style={[styles.toastWrapper, animatedStyle]}>
          <ToastContent
            title={title}
            description={description}
            variant={variant}
            icon={icon}
            action={action}
          />
        </AnimatedView>
      </GestureDetector>
    );
  },
);

ToastItem.displayName = 'ToastItem';
