import React from 'react';
import { StyleSheet, View } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { Chip } from '../chip';
import { TwigsProvider } from '../context';
import { wrap } from './test-utils';

function flattenStyle(props: { style?: unknown }) {
  const style = props.style;
  if (!style) return {};
  return StyleSheet.flatten(Array.isArray(style) ? style : [style]) ?? {};
}

describe('Chip', () => {
  // ── Render ──

  describe('Render', () => {
    it('mounts without crashing', () => {
      const { getByTestId } = wrap(<Chip testID="chip">Label</Chip>);
      expect(getByTestId('chip')).toBeOnTheScreen();
    });

    it('renders children text', () => {
      const { getByText } = wrap(<Chip testID="chip">Chip label</Chip>);
      expect(getByText('Chip label')).toBeOnTheScreen();
    });

    it('renders with leftElement', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" leftElement={<View testID="left-element" />}>
          Label
        </Chip>
      );
      expect(getByTestId('chip')).toBeOnTheScreen();
      expect(getByTestId('left-element')).toBeOnTheScreen();
    });

    it('renders with rightElement', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" rightElement={<View testID="right-element" />}>
          Label
        </Chip>
      );
      expect(getByTestId('chip')).toBeOnTheScreen();
      expect(getByTestId('right-element')).toBeOnTheScreen();
    });

    it('renders both leftElement and rightElement', () => {
      const { getByTestId } = wrap(
        <Chip
          testID="chip"
          leftElement={<View testID="left-element" />}
          rightElement={<View testID="right-element" />}
        >
          Label
        </Chip>
      );
      expect(getByTestId('left-element')).toBeOnTheScreen();
      expect(getByTestId('right-element')).toBeOnTheScreen();
    });
  });

  // ── Variants ──

  describe('Variants', () => {
    it('size="sm" gives height 24', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" size="sm">Label</Chip>
      );
      const flatStyle = flattenStyle(getByTestId('chip').props);
      expect(flatStyle?.height).toBe(24);
    });

    it('size="md" gives height 32', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" size="md">Label</Chip>
      );
      const flatStyle = flattenStyle(getByTestId('chip').props);
      expect(flatStyle?.height).toBe(32);
    });

    it('size="lg" gives height 40', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" size="lg">Label</Chip>
      );
      const flatStyle = flattenStyle(getByTestId('chip').props);
      expect(flatStyle?.height).toBe(40);
    });

    it('renders with color="secondary"', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" color="secondary">Label</Chip>
      );
      expect(getByTestId('chip')).toBeOnTheScreen();
    });

    it('renders with color="primary"', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" color="primary">Label</Chip>
      );
      expect(getByTestId('chip')).toBeOnTheScreen();
    });

    it('rounded="xs" has borderRadius 4', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" rounded="xs">Label</Chip>
      );
      const flatStyle = flattenStyle(getByTestId('chip').props);
      expect(flatStyle?.borderRadius).toBe(4);
    });

    it('rounded="sm" has borderRadius 8', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" rounded="sm">Label</Chip>
      );
      const flatStyle = flattenStyle(getByTestId('chip').props);
      expect(flatStyle?.borderRadius).toBe(8);
    });

    it('rounded="lg" has borderRadius 12', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" rounded="lg">Label</Chip>
      );
      const flatStyle = flattenStyle(getByTestId('chip').props);
      expect(flatStyle?.borderRadius).toBe(12);
    });

    it('rounded="full" has borderRadius 999', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" rounded="full">Label</Chip>
      );
      const flatStyle = flattenStyle(getByTestId('chip').props);
      expect(flatStyle?.borderRadius).toBe(999);
    });

    it('regular state has borderWidth 1', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip">Label</Chip>
      );
      const flatStyle = flattenStyle(getByTestId('chip').props);
      expect(flatStyle?.borderWidth).toBe(1);
    });
  });

  // ── Accessibility ──

  describe('Accessibility', () => {
    it('has accessibilityRole="button"', () => {
      const { getByTestId } = wrap(<Chip testID="chip">Label</Chip>);
      expect(getByTestId('chip').props.accessibilityRole).toBe('button');
    });

    it('accessibilityState includes selected when active', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" active onActiveStateChange={() => {}}>
          Label
        </Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: true });
    });

    it('accessibilityState includes selected: false when not active', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" active={false} onActiveStateChange={() => {}}>
          Label
        </Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: false });
    });

    it('accessibilityState includes disabled when disabled', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" disabled>Label</Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ disabled: true });
    });
  });

  // ── Interaction ──

  describe('Interaction', () => {
    it('press calls onActiveStateChange', () => {
      const onActiveStateChange = jest.fn();
      const { getByTestId } = wrap(
        <Chip testID="chip" onActiveStateChange={onActiveStateChange}>Label</Chip>
      );
      fireEvent.press(getByTestId('chip'));
      expect(onActiveStateChange).toHaveBeenCalledWith(true);
      fireEvent.press(getByTestId('chip'));
      expect(onActiveStateChange).toHaveBeenCalledWith(false);
    });

    it('disabled chip press does NOT call onActiveStateChange', () => {
      const onActiveStateChange = jest.fn();
      const { getByTestId } = wrap(
        <Chip testID="chip" disabled onActiveStateChange={onActiveStateChange}>Label</Chip>
      );
      fireEvent.press(getByTestId('chip'));
      expect(onActiveStateChange).not.toHaveBeenCalled();
    });

    it('onPress callback fires when provided', () => {
      const onPress = jest.fn();
      const { getByTestId } = wrap(
        <Chip testID="chip" onPress={onPress}>Label</Chip>
      );
      fireEvent.press(getByTestId('chip'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  // ── State transitions ──

  describe('State transitions', () => {
    it('toggling active prop updates accessibilityState.selected', () => {
      const { getByTestId, rerender } = wrap(
        <Chip testID="chip" active={false} onActiveStateChange={() => {}}>Label</Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: false });

      rerender(
        <TwigsProvider>
          <Chip testID="chip" active onActiveStateChange={() => {}}>Label</Chip>
        </TwigsProvider>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: true });
    });

    it('toggling disabled prop updates accessibilityState.disabled', () => {
      const { getByTestId, rerender } = wrap(
        <Chip testID="chip" disabled>Label</Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ disabled: true });

      rerender(
        <TwigsProvider>
          <Chip testID="chip">Label</Chip>
        </TwigsProvider>
      );
      expect(getByTestId('chip').props.accessibilityState?.disabled).toBeFalsy();
    });

    it('uncontrolled mode: defaultActive sets initial state', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" defaultActive onActiveStateChange={() => {}}>Label</Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: true });
    });

    it('uncontrolled mode: press toggles active state', () => {
      const onActiveStateChange = jest.fn();
      const { getByTestId } = wrap(
        <Chip testID="chip" defaultActive={false} onActiveStateChange={onActiveStateChange}>
          Label
        </Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: false });

      fireEvent.press(getByTestId('chip'));
      expect(onActiveStateChange).toHaveBeenCalledWith(true);
    });
  });
});
