import React from 'react';
import { StyleSheet, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Chip } from '../chip';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

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
    const sizes: Array<'sm' | 'md'> = ['sm', 'md'];
    const colors: Array<
      'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'accent'
    > = ['default', 'primary', 'secondary', 'error', 'warning', 'success', 'accent'];
    const variants: Array<'solid' | 'outline'> = ['solid', 'outline'];
    const roundedOptions: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'> = [
      'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full',
    ];

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const { getByTestId } = wrap(
          <Chip testID="chip" size={size}>
            Label
          </Chip>
        );
        expect(getByTestId('chip')).toBeOnTheScreen();
      });
    });

    it('size="sm" gives height 24', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" size="sm">
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      const flatStyle = flattenStyle(chip.props);
      expect(flatStyle?.height).toBe(24);
    });

    it('size="md" gives height 32', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" size="md">
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      const flatStyle = flattenStyle(chip.props);
      expect(flatStyle?.height).toBe(32);
    });

    colors.forEach((color) => {
      it(`renders with color="${color}"`, () => {
        const { getByTestId } = wrap(
          <Chip testID="chip" color={color}>
            Label
          </Chip>
        );
        expect(getByTestId('chip')).toBeOnTheScreen();
      });
    });

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        const { getByTestId } = wrap(
          <Chip testID="chip" variant={variant}>
            Label
          </Chip>
        );
        expect(getByTestId('chip')).toBeOnTheScreen();
      });
    });

    it('variant="outline" has borderWidth 1', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" variant="outline">
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      const flatStyle = flattenStyle(chip.props);
      expect(flatStyle?.borderWidth).toBe(1);
    });

    roundedOptions.forEach((rounded) => {
      it(`renders with rounded="${rounded}"`, () => {
        const { getByTestId } = wrap(
          <Chip testID="chip" rounded={rounded}>
            Label
          </Chip>
        );
        expect(getByTestId('chip')).toBeOnTheScreen();
      });
    });

    it('rounded="full" has borderRadius 9999', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" rounded="full">
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      const flatStyle = flattenStyle(chip.props);
      expect(flatStyle?.borderRadius).toBe(9999);
    });
  });

  // ── Accessibility ──

  describe('Accessibility', () => {
    it('has accessibilityRole="text" when not interactive', () => {
      const { getByTestId } = wrap(<Chip testID="chip">Label</Chip>);
      const chip = getByTestId('chip');
      expect(chip.props.accessibilityRole).toBe('text');
    });

    it('has accessibilityRole="button" when selectable', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" selectable onActiveStateChange={() => {}}>
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      expect(chip.props.accessibilityRole).toBe('button');
    });

    it('has accessibilityRole="button" when onPress is provided', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" onPress={() => {}}>
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      expect(chip.props.accessibilityRole).toBe('button');
    });

    it('accessibilityState includes selected when selectable', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" selectable active onActiveStateChange={() => {}}>
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      expect(chip.props.accessibilityState).toMatchObject({ selected: true });
    });

    it('accessibilityState includes selected: false when selectable and not active', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" selectable active={false} onActiveStateChange={() => {}}>
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      expect(chip.props.accessibilityState).toMatchObject({ selected: false });
    });

    it('accessibilityState includes disabled when disabled', () => {
      const { getByTestId } = wrap(
        <Chip testID="chip" disabled>
          Label
        </Chip>
      );
      const chip = getByTestId('chip');
      expect(chip.props.accessibilityState).toMatchObject({ disabled: true });
    });

    it('close button has accessibilityRole="button" and accessibilityLabel="Remove"', () => {
      const { getByLabelText } = wrap(
        <Chip testID="chip" closable onClose={() => {}}>
          Label
        </Chip>
      );
      const closeButton = getByLabelText('Remove');
      expect(closeButton.props.accessibilityRole).toBe('button');
      expect(closeButton.props.accessibilityLabel).toBe('Remove');
    });
  });

  // ── Interaction ──

  describe('Interaction', () => {
    it('selectable chip press calls onActiveStateChange', () => {
      const onActiveStateChange = jest.fn();
      const { getByTestId } = wrap(
        <Chip testID="chip" selectable onActiveStateChange={onActiveStateChange}>
          Label
        </Chip>
      );
      fireEvent.press(getByTestId('chip'));
      expect(onActiveStateChange).toHaveBeenCalledWith(true);
      fireEvent.press(getByTestId('chip'));
      expect(onActiveStateChange).toHaveBeenCalledWith(false);
    });

    it('close button press calls onClose', () => {
      const onClose = jest.fn();
      const { getByLabelText } = wrap(
        <Chip testID="chip" closable onClose={onClose}>
          Label
        </Chip>
      );
      fireEvent.press(getByLabelText('Remove'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('disabled chip press does NOT call onActiveStateChange', () => {
      const onActiveStateChange = jest.fn();
      const { getByTestId } = wrap(
        <Chip testID="chip" selectable disabled onActiveStateChange={onActiveStateChange}>
          Label
        </Chip>
      );
      fireEvent.press(getByTestId('chip'));
      expect(onActiveStateChange).not.toHaveBeenCalled();
    });

    it('disabled chip close button does NOT call onClose', () => {
      const onClose = jest.fn();
      const { getByLabelText } = wrap(
        <Chip testID="chip" closable disabled onClose={onClose}>
          Label
        </Chip>
      );
      const closeButton = getByLabelText('Remove');
      expect(closeButton.props.accessibilityState?.disabled).toBe(true);
      fireEvent.press(closeButton);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('onPress callback fires when provided', () => {
      const onPress = jest.fn();
      const { getByTestId } = wrap(
        <Chip testID="chip" onPress={onPress}>
          Label
        </Chip>
      );
      fireEvent.press(getByTestId('chip'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  // ── State transitions ──

  describe('State transitions', () => {
    it('toggling active prop updates accessibilityState.selected', () => {
      const { getByTestId, rerender } = wrap(
        <Chip testID="chip" selectable active={false} onActiveStateChange={() => {}}>
          Label
        </Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: false });

      rerender(
        <TwigsProvider>
          <Chip testID="chip" selectable active onActiveStateChange={() => {}}>
            Label
          </Chip>
        </TwigsProvider>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: true });
    });

    it('toggling disabled prop updates accessibilityState.disabled', () => {
      const { getByTestId, rerender } = wrap(
        <Chip testID="chip" disabled>
          Label
        </Chip>
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
        <Chip testID="chip" selectable defaultActive onActiveStateChange={() => {}}>
          Label
        </Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: true });
    });

    it('uncontrolled mode: press toggles active state', () => {
      const onActiveStateChange = jest.fn();
      const { getByTestId } = wrap(
        <Chip
          testID="chip"
          selectable
          defaultActive={false}
          onActiveStateChange={onActiveStateChange}
        >
          Label
        </Chip>
      );
      expect(getByTestId('chip').props.accessibilityState).toMatchObject({ selected: false });

      fireEvent.press(getByTestId('chip'));
      expect(onActiveStateChange).toHaveBeenCalledWith(true);
    });
  });
});
