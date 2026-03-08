import React, { useEffect, useCallback, useRef } from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { AnimatedView } from '../utils';
import { ToastContent } from './toast-content';
import type { ToastItemProps } from './types';
import {
  ANIMATION_DURATION,
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
} from './constants';
import { getEntryTranslateY } from './helpers';
import { styles } from './styles';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const ELASTIC_RESISTANCE = 0.4;

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
    const entryY = getEntryTranslateY(position);
    // Dismiss direction: top-positioned toasts swipe up, bottom-positioned swipe down
    const dismissDirection = isTopPosition ? -1 : 1;

    const swipeY = useSharedValue(0);
    const translateY = useSharedValue(entryY);
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.85);
    const isDragging = useRef(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const dismiss = useCallback(() => {
      onDismissCallback?.();
      onRemove(id);
    }, [id, onRemove, onDismissCallback]);

    useEffect(() => {
      opacity.value = withTiming(1, { duration: ANIMATION_DURATION });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
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
        // Allow free movement in dismiss direction, apply resistance in opposite direction
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
          swipeY.value = withTiming(
            dismissDirection * WINDOW_HEIGHT * 0.5,
            { duration: 200 },
            (finished) => {
              if (finished) runOnJS(dismiss)();
            },
          );
          opacity.value = withTiming(0, { duration: 200 });
        } else {
          swipeY.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
          });
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
      const swipeOpacity = interpolate(
        Math.abs(swipeY.value),
        [0, SWIPE_THRESHOLD],
        [1, 0.5],
        Extrapolation.CLAMP,
      );

      return {
        opacity: opacity.value * swipeOpacity,
        transform: [
          { translateY: translateY.value + swipeY.value },
          { scale: scale.value },
        ],
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
