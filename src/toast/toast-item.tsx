import React, { useEffect, useCallback, useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { ToastContent } from './toast-content';
import type { ToastItemProps } from './types';
import {
  ANIMATION_DURATION,
  TOAST_MIN_HEIGHT,
  SWIPE_THRESHOLD,
  SWIPE_DISMISS_OFFSET,
  ENTRY_SPRING_CONFIG,
  PAN_ACTIVE_OFFSET_Y,
  PAN_FAIL_OFFSET_X,
} from './constants';
import { elasticResistance } from './helpers';
import { styles } from './styles';

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
    const isBottomPosition = !isTopPosition;
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

    const onSwipeBegin = useCallback(() => {
      isDragging.current = true;
    }, []);

    const onSwipeFinalize = useCallback(() => {
      isDragging.current = false;
    }, []);

    useEffect(() => {
      progress.value = withSpring(1, ENTRY_SPRING_CONFIG);
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

    const pan = Gesture.Pan()
      .activeOffsetY(PAN_ACTIVE_OFFSET_Y)
      .failOffsetX(PAN_FAIL_OFFSET_X)
      .onBegin(() => {
        'worklet';
        runOnJS(onSwipeBegin)();
      })
      .onChange((event) => {
        'worklet';
        const raw = event.translationY * (isBottomPosition ? -1 : 1);
        const isCorrectDirection = raw < 0;

        if (isCorrectDirection) {
          swipeY.value = raw;
        } else {
          swipeY.value = elasticResistance(raw);
        }
      })
      .onFinalize(() => {
        'worklet';
        const shouldDismiss = swipeY.value < -SWIPE_THRESHOLD;
        const isWrongDirection = swipeY.value > 0;

        if (isWrongDirection) {
          swipeY.value = withTiming(0, {
            easing: Easing.elastic(0.8),
            duration: 400,
          });
        } else if (shouldDismiss) {
          swipeY.value = withTiming(
            SWIPE_DISMISS_OFFSET,
            { easing: Easing.inOut(Easing.ease) },
            (isDone) => {
              if (isDone) runOnJS(dismiss)();
            },
          );
        } else {
          swipeY.value = withTiming(0, {
            easing: Easing.elastic(0.8),
          });
        }

        runOnJS(onSwipeFinalize)();
      });

    const tap = Gesture.Tap().onEnd(() => {
      'worklet';
      if (onPress) {
        runOnJS(onPress)();
      }
    });

    const composed = Gesture.Race(pan, tap);

    const animatedStyle = useAnimatedStyle(() => {
      const entryTranslateY = interpolate(
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

      const swipeTranslateY = swipeY.value * (isBottomPosition ? -1 : 1);

      return {
        opacity,
        transform: [{ translateY: entryTranslateY + swipeTranslateY }],
      };
    });

    return (
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.toastWrapper, animatedStyle]}>
          <ToastContent
            title={title}
            description={description}
            variant={variant}
            icon={icon}
            action={action}
          />
        </Animated.View>
      </GestureDetector>
    );
  },
);

ToastItem.displayName = 'ToastItem';
