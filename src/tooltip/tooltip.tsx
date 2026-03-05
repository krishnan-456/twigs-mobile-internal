import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Pressable, Modal } from 'react-native';
import { useFloating, offset, flip, shift, arrow } from '@floating-ui/react-native';
import type { Placement } from '@floating-ui/react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../context';
import { Text } from '../text';
import { AnimatedView } from '../utils';
import type { TooltipProps } from './types';
import { DEFAULT_SIZE, DEFAULT_SIDE, DEFAULT_SIDE_OFFSET, ANIMATION_DURATION } from './constants';
import { getContentStyles, getTextStyles, getArrowPath, getArrowDimensions } from './helpers';
import { styles } from './styles';

function toPlacement(
  side: NonNullable<TooltipProps['side']>,
  align: NonNullable<TooltipProps['align']>
): Placement {
  if (align === 'center') return side;
  return `${side}-${align === 'start' ? 'start' : 'end'}`;
}

export const Tooltip = React.forwardRef<View, TooltipProps>(
  (
    {
      content,
      children,
      size = DEFAULT_SIZE,
      side = DEFAULT_SIDE,
      align = 'center',
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      sideOffset = DEFAULT_SIDE_OFFSET,
      autoHideDuration = 0,
      hasArrow = true,
      triggerAction = 'press',
      css,
      style,
      testID,
      accessible = true,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
    },
    ref
  ) => {
    const theme = useTheme();
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const arrowRef = useRef<View>(null);

    const placement = useMemo(() => toPlacement(side, align), [side, align]);

    const { refs, floatingStyles, middlewareData } = useFloating({
      sameScrollView: false,
      placement,
      middleware: [
        offset(sideOffset + (hasArrow ? getArrowDimensions(size, side).height : 0)),
        flip(),
        shift({ padding: 8 }),
        ...(hasArrow ? [arrow({ element: arrowRef })] : []),
      ],
    });

    const opacity = useSharedValue(0);
    const translateY = useSharedValue(side === 'bottom' ? -4 : side === 'top' ? 4 : 0);
    const translateX = useSharedValue(side === 'right' ? -4 : side === 'left' ? 4 : 0);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
    }));

    useEffect(() => {
      if (isOpen) {
        opacity.value = withTiming(1, { duration: ANIMATION_DURATION });
        translateY.value = withTiming(0, { duration: ANIMATION_DURATION });
        translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      } else {
        opacity.value = withTiming(0, { duration: ANIMATION_DURATION });
      }
    }, [isOpen, opacity, translateY, translateX]);

    useEffect(() => {
      if (isOpen && autoHideDuration > 0) {
        autoHideTimerRef.current = setTimeout(() => {
          handleClose();
        }, autoHideDuration);
      }
      return () => {
        if (autoHideTimerRef.current) {
          clearTimeout(autoHideTimerRef.current);
          autoHideTimerRef.current = null;
        }
      };
    }, [isOpen, autoHideDuration]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleOpen = useCallback(() => {
      if (!isControlled) setInternalOpen(true);
      onOpenChange?.(true);
    }, [isControlled, onOpenChange]);

    const handleClose = useCallback(() => {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }, [isControlled, onOpenChange]);

    const handleToggle = useCallback(() => {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [isOpen, handleClose, handleOpen]);

    const contentStyle = useMemo(() => getContentStyles(theme, size), [theme, size]);
    const textStyle = useMemo(() => getTextStyles(theme, size), [theme, size]);

    const triggerProps = useMemo(() => {
      if (triggerAction === 'longPress') {
        return { onLongPress: handleToggle };
      }
      return { onPress: handleToggle };
    }, [triggerAction, handleToggle]);

    const arrowDims = useMemo(() => getArrowDimensions(size, side), [size, side]);
    const arrowPathD = useMemo(() => getArrowPath(size, side), [size, side]);

    const arrowPositionStyle = useMemo(() => {
      const arrowData = middlewareData.arrow;
      if (!arrowData) return {};
      const { x, y } = arrowData;
      const result: Record<string, number> = {};
      if (x != null) result.left = x;
      if (y != null) result.top = y;

      switch (side) {
        case 'top':
          result.bottom = -arrowDims.height;
          break;
        case 'bottom':
          result.top = -arrowDims.height;
          break;
        case 'left':
          result.right = -arrowDims.width;
          break;
        case 'right':
          result.left = (x ?? 0) > 0 ? x! : -arrowDims.width;
          break;
      }
      return result;
    }, [middlewareData.arrow, side, arrowDims]);

    if (!content) return <>{children}</>;

    return (
      <>
        <Pressable
          ref={refs.setReference}
          collapsable={false}
          {...triggerProps}
          accessible={true}
          accessibilityHint={accessibilityHint ?? 'Tap to show tooltip'}
          testID={testID ? `${testID}-trigger` : undefined}
        >
          <View pointerEvents="none">{children}</View>
        </Pressable>

        <Modal
          visible={isOpen}
          transparent
          animationType="none"
          onRequestClose={handleClose}
          statusBarTranslucent
        >
          <View style={styles.overlay}>
            <Pressable style={styles.backdropPressable} onPress={handleClose} accessible={false} />

            <View
              ref={(node) => {
                refs.setFloating(node);
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  (ref as React.MutableRefObject<View | null>).current = node;
                }
              }}
              collapsable={false}
              style={[styles.contentWrapper, floatingStyles]}
              testID={testID}
              accessible={accessible}
              accessibilityRole="none"
              accessibilityLabel={
                accessibilityLabel ?? (typeof content === 'string' ? content : undefined)
              }
              accessibilityState={accessibilityState}
              accessibilityLiveRegion="polite"
            >
              <AnimatedView style={[animatedStyle, css, style]}>
                <View style={contentStyle}>
                  {typeof content === 'string' ? <Text style={textStyle}>{content}</Text> : content}
                </View>

                {hasArrow && (
                  <View
                    ref={arrowRef}
                    style={[styles.arrowContainer, arrowPositionStyle]}
                    collapsable={false}
                  >
                    <Svg
                      width={arrowDims.width}
                      height={arrowDims.height}
                      viewBox={`0 0 ${arrowDims.width} ${arrowDims.height}`}
                    >
                      <Path d={arrowPathD} fill={theme.colors.neutral900} />
                    </Svg>
                  </View>
                )}
              </AnimatedView>
            </View>
          </View>
        </Modal>
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';
