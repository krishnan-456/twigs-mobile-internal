import React from 'react';
import { Pressable, Text } from 'react-native';
import { fireEvent, act } from '@testing-library/react-native';
import { Tooltip } from '../tooltip';
import { Button } from '../button';
import { TwigsProvider } from '../context';
import { wrap } from './test-utils';
import {
  toPlacement,
  getCrossAxisOffset,
  getArrowPath,
  getArrowDimensions,
  getArrowPositionStyle,
} from '../tooltip/helpers';
import { ARROW_EDGE_OFFSET, ARROW_SIZE } from '../tooltip/constants';
import type { TooltipSide } from '../tooltip/types';

const renderTooltip = (props?: Partial<React.ComponentProps<typeof Tooltip>>) =>
  wrap(
    <Tooltip content="Tooltip text" testID="tooltip" {...props}>
      <Button testID="trigger">Trigger</Button>
    </Tooltip>
  );

const getTriggerPressable = (result: ReturnType<typeof render>) => {
  const pressables = result.UNSAFE_getAllByType(Pressable);
  return pressables.find(
    (p) => p.props.accessibilityHint != null && p.props.accessibilityHint.includes('tooltip')
  )!;
};

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ── Render ──

  describe('render', () => {
    it('renders trigger without crashing', () => {
      const { getByTestId } = renderTooltip();
      expect(getByTestId('trigger')).toBeTruthy();
    });

    it('does not show tooltip content initially', () => {
      const { queryByText } = renderTooltip();
      expect(queryByText('Tooltip text')).toBeNull();
    });

    it('shows tooltip content when opened via press', () => {
      const result = renderTooltip();
      const trigger = getTriggerPressable(result);
      fireEvent.press(trigger);
      expect(result.getByText('Tooltip text')).toBeTruthy();
    });

    it('renders string content as Text', () => {
      const result = renderTooltip({ content: 'Simple text' });
      fireEvent.press(getTriggerPressable(result));
      expect(result.getByText('Simple text')).toBeTruthy();
    });

    it('renders ReactNode content', () => {
      const result = renderTooltip({ content: <Text>Custom content</Text> });
      fireEvent.press(getTriggerPressable(result));
      expect(result.getByText('Custom content')).toBeTruthy();
    });

    it('renders nothing when content is empty', () => {
      const { getByTestId } = wrap(
        <Tooltip content="">
          <Button testID="trigger">Trigger</Button>
        </Tooltip>
      );
      expect(getByTestId('trigger')).toBeTruthy();
    });

    it('renders with defaultOpen={true}', () => {
      const { getByText } = renderTooltip({ defaultOpen: true });
      expect(getByText('Tooltip text')).toBeTruthy();
    });
  });

  // ── Variants ──

  describe('variants', () => {
    describe('side', () => {
      const sides = ['top', 'right', 'bottom', 'left'] as const;

      sides.forEach((side) => {
        it(`renders with side="${side}"`, () => {
          const { getByText } = renderTooltip({
            side,
            defaultOpen: true,
          });
          expect(getByText('Tooltip text')).toBeTruthy();
        });
      });
    });

    describe('align', () => {
      const aligns = ['start', 'center', 'end'] as const;

      aligns.forEach((align) => {
        it(`renders with align="${align}"`, () => {
          const { getByText } = renderTooltip({
            align,
            defaultOpen: true,
          });
          expect(getByText('Tooltip text')).toBeTruthy();
        });
      });
    });

    describe('hasArrow', () => {
      it('renders with hasArrow={true} by default', () => {
        const { getByText } = renderTooltip({ defaultOpen: true });
        expect(getByText('Tooltip text')).toBeTruthy();
      });

      it('renders with hasArrow={false}', () => {
        const { getByText } = renderTooltip({
          hasArrow: false,
          defaultOpen: true,
        });
        expect(getByText('Tooltip text')).toBeTruthy();
      });
    });
  });

  // ── Accessibility ──

  describe('accessibility', () => {
    it('trigger has accessibilityHint', () => {
      const { UNSAFE_getAllByType } = renderTooltip();
      const pressables = UNSAFE_getAllByType(Pressable);
      const trigger = pressables.find((p) => p.props.accessibilityHint != null);
      expect(trigger).toBeDefined();
      expect(trigger!.props.accessibilityHint).toBe('Tap to show tooltip');
    });

    it('allows custom accessibilityHint on trigger', () => {
      const { UNSAFE_getAllByType } = renderTooltip({
        accessibilityHint: 'Shows details',
      });
      const pressables = UNSAFE_getAllByType(Pressable);
      const trigger = pressables.find((p) => p.props.accessibilityHint === 'Shows details');
      expect(trigger).toBeDefined();
    });

    it('tooltip content has accessibilityLiveRegion="polite"', () => {
      const { getByTestId } = renderTooltip({ defaultOpen: true });
      const tooltip = getByTestId('tooltip');
      expect(tooltip.props.accessibilityLiveRegion).toBe('polite');
    });

    it('derives accessibilityLabel from string content', () => {
      const { getByTestId } = renderTooltip({
        content: 'Label text',
        defaultOpen: true,
      });
      const tooltip = getByTestId('tooltip');
      expect(tooltip.props.accessibilityLabel).toBe('Label text');
    });

    it('allows custom accessibilityLabel override', () => {
      const { getByTestId } = renderTooltip({
        accessibilityLabel: 'Custom label',
        defaultOpen: true,
      });
      const tooltip = getByTestId('tooltip');
      expect(tooltip.props.accessibilityLabel).toBe('Custom label');
    });
  });

  // ── Interaction ──

  describe('interaction', () => {
    it('toggles tooltip on press', () => {
      const result = renderTooltip();
      const trigger = getTriggerPressable(result);

      fireEvent.press(trigger);
      expect(result.getByText('Tooltip text')).toBeTruthy();

      fireEvent.press(trigger);
      expect(result.queryByText('Tooltip text')).toBeNull();
    });

    it('dismisses tooltip on backdrop press', () => {
      const result = renderTooltip();
      fireEvent.press(getTriggerPressable(result));
      expect(result.getByText('Tooltip text')).toBeTruthy();

      const pressables = result.UNSAFE_getAllByType(Pressable);
      const backdrop = pressables.find((p) => p.props.accessible === false);
      expect(backdrop).toBeDefined();
      fireEvent.press(backdrop!);
      expect(result.queryByText('Tooltip text')).toBeNull();
    });

    it('calls onOpenChange when tooltip opens', () => {
      const onOpenChange = jest.fn();
      const result = renderTooltip({ onOpenChange });
      fireEvent.press(getTriggerPressable(result));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('calls onOpenChange when tooltip closes', () => {
      const onOpenChange = jest.fn();
      const result = renderTooltip({ onOpenChange, defaultOpen: true });
      fireEvent.press(getTriggerPressable(result));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('respects controlled open prop', () => {
      const { getByText, queryByText, rerender } = wrap(
        <Tooltip content="Controlled" open={false}>
          <Button testID="trigger">Trigger</Button>
        </Tooltip>
      );
      expect(queryByText('Controlled')).toBeNull();

      rerender(
        <TwigsProvider>
          <Tooltip content="Controlled" open={true}>
            <Button testID="trigger">Trigger</Button>
          </Tooltip>
        </TwigsProvider>
      );
      expect(getByText('Controlled')).toBeTruthy();
    });

    it('uses longPress trigger when triggerAction="longPress"', () => {
      const result = renderTooltip({ triggerAction: 'longPress' });
      const trigger = getTriggerPressable(result);

      fireEvent.press(trigger);
      expect(result.queryByText('Tooltip text')).toBeNull();

      fireEvent(trigger, 'longPress');
      expect(result.getByText('Tooltip text')).toBeTruthy();
    });

    it('auto-hides after autoHideDuration', () => {
      const onOpenChange = jest.fn();
      const result = renderTooltip({ autoHideDuration: 3000, onOpenChange });
      fireEvent.press(getTriggerPressable(result));
      expect(result.getByText('Tooltip text')).toBeTruthy();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('does not auto-hide when autoHideDuration is 0', () => {
      const onOpenChange = jest.fn();
      const result = renderTooltip({ autoHideDuration: 0, onOpenChange });
      fireEvent.press(getTriggerPressable(result));
      expect(result.getByText('Tooltip text')).toBeTruthy();

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  // ── State transitions ──

  describe('state transitions', () => {
    it('shows content when open changes from false to true', () => {
      const { queryByText, getByText, rerender } = wrap(
        <Tooltip content="Tooltip text" open={false}>
          <Button testID="trigger">Trigger</Button>
        </Tooltip>
      );
      expect(queryByText('Tooltip text')).toBeNull();

      rerender(
        <TwigsProvider>
          <Tooltip content="Tooltip text" open={true}>
            <Button testID="trigger">Trigger</Button>
          </Tooltip>
        </TwigsProvider>
      );
      expect(getByText('Tooltip text')).toBeTruthy();
    });

    it('hides content when open changes from true to false', () => {
      const { getByText, queryByText, rerender } = wrap(
        <Tooltip content="Tooltip text" open={true}>
          <Button testID="trigger">Trigger</Button>
        </Tooltip>
      );
      expect(getByText('Tooltip text')).toBeTruthy();

      rerender(
        <TwigsProvider>
          <Tooltip content="Tooltip text" open={false}>
            <Button testID="trigger">Trigger</Button>
          </Tooltip>
        </TwigsProvider>
      );
      expect(queryByText('Tooltip text')).toBeNull();
    });

    it('updates content when content prop changes', () => {
      const { getByText, queryByText, rerender } = wrap(
        <Tooltip content="First" open={true}>
          <Button testID="trigger">Trigger</Button>
        </Tooltip>
      );
      expect(getByText('First')).toBeTruthy();

      rerender(
        <TwigsProvider>
          <Tooltip content="Second" open={true}>
            <Button testID="trigger">Trigger</Button>
          </Tooltip>
        </TwigsProvider>
      );
      expect(queryByText('First')).toBeNull();
      expect(getByText('Second')).toBeTruthy();
    });
  });
});

// ── Helper unit tests ──

describe('tooltip helpers', () => {
  describe('toPlacement', () => {
    it('returns bare side for center alignment', () => {
      const sides: TooltipSide[] = ['top', 'right', 'bottom', 'left'];
      sides.forEach((side) => {
        expect(toPlacement(side, 'center')).toBe(side);
      });
    });

    it('appends -start for start alignment', () => {
      expect(toPlacement('top', 'start')).toBe('top-start');
      expect(toPlacement('right', 'start')).toBe('right-start');
      expect(toPlacement('bottom', 'start')).toBe('bottom-start');
      expect(toPlacement('left', 'start')).toBe('left-start');
    });

    it('appends -end for end alignment', () => {
      expect(toPlacement('top', 'end')).toBe('top-end');
      expect(toPlacement('right', 'end')).toBe('right-end');
      expect(toPlacement('bottom', 'end')).toBe('bottom-end');
      expect(toPlacement('left', 'end')).toBe('left-end');
    });
  });

  describe('getCrossAxisOffset', () => {
    it('returns 0 for center alignment', () => {
      expect(getCrossAxisOffset('left', 'center', 40)).toBe(0);
      expect(getCrossAxisOffset('right', 'center', 40)).toBe(0);
      expect(getCrossAxisOffset('top', 'center', 120)).toBe(0);
    });

    it('returns 0 for top/bottom sides regardless of alignment', () => {
      expect(getCrossAxisOffset('top', 'start', 120)).toBe(0);
      expect(getCrossAxisOffset('top', 'end', 120)).toBe(0);
      expect(getCrossAxisOffset('bottom', 'start', 80)).toBe(0);
      expect(getCrossAxisOffset('bottom', 'end', 80)).toBe(0);
    });

    it('computes negative offset for left/right + start with trigger taller than arrow offset', () => {
      const arrowCenter = ARROW_EDGE_OFFSET + ARROW_SIZE.width / 2;
      const refHeight = 40;
      const expected = -(arrowCenter - refHeight / 2);
      expect(getCrossAxisOffset('right', 'start', refHeight)).toBe(expected);
      expect(getCrossAxisOffset('left', 'start', refHeight)).toBe(expected);
    });

    it('computes positive offset for left/right + end', () => {
      const arrowCenter = ARROW_EDGE_OFFSET + ARROW_SIZE.width / 2;
      const refHeight = 40;
      const expected = arrowCenter - refHeight / 2;
      expect(getCrossAxisOffset('right', 'end', refHeight)).toBe(expected);
      expect(getCrossAxisOffset('left', 'end', refHeight)).toBe(expected);
    });

    it('returns 0 when trigger center equals arrow center', () => {
      const arrowCenter = ARROW_EDGE_OFFSET + ARROW_SIZE.width / 2;
      const refHeight = arrowCenter * 2;
      expect(getCrossAxisOffset('right', 'start', refHeight)).toBeCloseTo(0);
    });

    it('start and end offsets are symmetric (equal magnitude, opposite sign)', () => {
      const ref = 50;
      const startOffset = getCrossAxisOffset('right', 'start', ref);
      const endOffset = getCrossAxisOffset('right', 'end', ref);
      expect(startOffset).toBe(-endOffset);
    });
  });

  describe('getArrowPath', () => {
    it('returns a valid SVG path for each side', () => {
      const sides: TooltipSide[] = ['top', 'right', 'bottom', 'left'];
      sides.forEach((side) => {
        const path = getArrowPath(side);
        expect(path).toMatch(/^M[\d.,\s]+L[\d.,\s]+L[\d.,\s]+Z$/);
      });
    });
  });

  describe('getArrowDimensions', () => {
    it('returns normal dimensions for top/bottom', () => {
      expect(getArrowDimensions('top')).toEqual({ width: 10, height: 6 });
      expect(getArrowDimensions('bottom')).toEqual({ width: 10, height: 6 });
    });

    it('swaps dimensions for left/right', () => {
      expect(getArrowDimensions('left')).toEqual({ width: 6, height: 10 });
      expect(getArrowDimensions('right')).toEqual({ width: 6, height: 10 });
    });
  });

  describe('getArrowPositionStyle', () => {
    const hDims = { width: 10, height: 6 };
    const vDims = { width: 6, height: 10 };

    describe('center alignment', () => {
      it('uses middleware x for top/bottom', () => {
        const style = getArrowPositionStyle('top', 'center', hDims, { x: 25 });
        expect(style).toEqual({ left: 25, bottom: -6 });
      });

      it('uses middleware y for left/right', () => {
        const style = getArrowPositionStyle('left', 'center', vDims, { y: 15 });
        expect(style).toEqual({ top: 15, right: -6 });
      });

      it('handles undefined middleware gracefully', () => {
        const style = getArrowPositionStyle('top', 'center', hDims, undefined);
        expect(style).toEqual({ bottom: -6 });
      });
    });

    describe('start alignment', () => {
      it('pins arrow left for top side', () => {
        const style = getArrowPositionStyle('top', 'start', hDims, undefined);
        expect(style).toEqual({ left: ARROW_EDGE_OFFSET, bottom: -6 });
      });

      it('pins arrow left for bottom side', () => {
        const style = getArrowPositionStyle('bottom', 'start', hDims, undefined);
        expect(style).toEqual({ left: ARROW_EDGE_OFFSET, top: -6 });
      });

      it('pins arrow top for left side', () => {
        const style = getArrowPositionStyle('left', 'start', vDims, undefined);
        expect(style).toEqual({ top: ARROW_EDGE_OFFSET, right: -6 });
      });

      it('pins arrow top for right side', () => {
        const style = getArrowPositionStyle('right', 'start', vDims, undefined);
        expect(style).toEqual({ top: ARROW_EDGE_OFFSET, left: -6 });
      });
    });

    describe('end alignment', () => {
      it('pins arrow right for top side', () => {
        const style = getArrowPositionStyle('top', 'end', hDims, undefined);
        expect(style).toEqual({
          right: ARROW_EDGE_OFFSET,
          left: undefined,
          bottom: -6,
        });
      });

      it('pins arrow right for bottom side', () => {
        const style = getArrowPositionStyle('bottom', 'end', hDims, undefined);
        expect(style).toEqual({
          right: ARROW_EDGE_OFFSET,
          left: undefined,
          top: -6,
        });
      });

      it('pins arrow bottom for left side', () => {
        const style = getArrowPositionStyle('left', 'end', vDims, undefined);
        expect(style).toEqual({
          bottom: ARROW_EDGE_OFFSET,
          top: undefined,
          right: -6,
        });
      });

      it('pins arrow bottom for right side', () => {
        const style = getArrowPositionStyle('right', 'end', vDims, undefined);
        expect(style).toEqual({
          bottom: ARROW_EDGE_OFFSET,
          top: undefined,
          left: -6,
        });
      });
    });
  });
});
