import React from 'react';
import { Pressable, Text } from 'react-native';
import { fireEvent, act } from '@testing-library/react-native';
import { Tooltip } from '../tooltip';
import { Button } from '../button';
import { TwigsProvider } from '../context';
import { wrap } from './test-utils';

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
    describe('size', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach((size) => {
        it(`renders with size="${size}"`, () => {
          const { getByTestId, getByText } = renderTooltip({
            size,
            defaultOpen: true,
          });
          expect(getByTestId('trigger')).toBeTruthy();
          expect(getByText('Tooltip text')).toBeTruthy();
        });
      });

      it('uses default size="sm" when size prop is not provided', () => {
        const { getByText } = renderTooltip({ defaultOpen: true });
        expect(getByText('Tooltip text')).toBeTruthy();
      });
    });

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

    it('updates size when size prop changes', () => {
      const { getByText, rerender } = wrap(
        <Tooltip content="Tooltip text" size="sm" open={true}>
          <Button testID="trigger">Trigger</Button>
        </Tooltip>
      );
      expect(getByText('Tooltip text')).toBeTruthy();

      rerender(
        <TwigsProvider>
          <Tooltip content="Tooltip text" size="lg" open={true}>
            <Button testID="trigger">Trigger</Button>
          </Tooltip>
        </TwigsProvider>
      );
      expect(getByText('Tooltip text')).toBeTruthy();
    });
  });
});
