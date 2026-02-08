import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Radio } from '../radio';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

describe('Radio', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByRole } = wrap(<Radio />);
    expect(getByRole('radio')).toBeTruthy();
  });

  it('renders with string children as label', () => {
    const { getByRole } = wrap(<Radio>Option A</Radio>);
    expect(getByRole('radio')).toBeTruthy();
  });

  it('renders with ReactNode children', () => {
    const { getByRole, getByText } = wrap(
      <Radio>
        <Text>Custom Label</Text>
      </Radio>
    );
    expect(getByRole('radio')).toBeTruthy();
    expect(getByText('Custom Label')).toBeTruthy();
  });

  // ── Sizes ──

  it('renders with size="sm" (default)', () => {
    const { getByRole } = wrap(<Radio size="sm" />);
    expect(getByRole('radio')).toBeTruthy();
  });

  it('renders with size="md"', () => {
    const { getByRole } = wrap(<Radio size="md" />);
    expect(getByRole('radio')).toBeTruthy();
  });

  it('supports custom width/height overrides', () => {
    const { getByRole } = wrap(<Radio width={30} height={30} innerWidth={14} innerHeight={14} />);
    expect(getByRole('radio')).toBeTruthy();
  });

  // ── Accessibility ──

  it('has accessible=true and accessibilityRole="radio"', () => {
    const { getByRole } = wrap(<Radio />);
    const radio = getByRole('radio');
    expect(radio.props.accessible).toBe(true);
  });

  it('uses checked (not selected) in accessibilityState when selected', () => {
    const { getByRole } = wrap(<Radio selected />);
    const radio = getByRole('radio');
    expect(radio.props.accessibilityState).toEqual(expect.objectContaining({ checked: true }));
    expect(radio.props.accessibilityState.selected).toBeUndefined();
  });

  it('reflects unselected as checked=false', () => {
    const { getByRole } = wrap(<Radio selected={false} />);
    expect(getByRole('radio').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );
  });

  it('reflects disabled in accessibilityState', () => {
    const { getByRole } = wrap(<Radio disabled />);
    expect(getByRole('radio').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('derives accessibilityLabel from string children', () => {
    const { getByRole } = wrap(<Radio>Option A</Radio>);
    expect(getByRole('radio').props.accessibilityLabel).toBe('Option A');
  });

  it('does not derive accessibilityLabel from non-string children', () => {
    const { getByRole } = wrap(
      <Radio>
        <Text>Node</Text>
      </Radio>
    );
    expect(getByRole('radio').props.accessibilityLabel).toBeUndefined();
  });

  it('has accessibilityHint for tap guidance', () => {
    const { getByRole } = wrap(<Radio />);
    expect(getByRole('radio').props.accessibilityHint).toBe('Double tap to select');
  });

  // ── Interactions ──

  it('calls onSelect(true) when unselected radio is pressed', () => {
    const onSelect = jest.fn();
    const { getByRole } = wrap(<Radio selected={false} onSelect={onSelect} />);
    fireEvent.press(getByRole('radio'));
    expect(onSelect).toHaveBeenCalledWith(true);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect(false) when selected radio is pressed', () => {
    const onSelect = jest.fn();
    const { getByRole } = wrap(<Radio selected onSelect={onSelect} />);
    fireEvent.press(getByRole('radio'));
    expect(onSelect).toHaveBeenCalledWith(false);
  });

  it('does not call onSelect when disabled', () => {
    const onSelect = jest.fn();
    const { getByRole } = wrap(<Radio selected={false} onSelect={onSelect} disabled />);
    fireEvent.press(getByRole('radio'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not throw when pressed with no onSelect handler', () => {
    const { getByRole } = wrap(<Radio selected={false} />);
    expect(() => fireEvent.press(getByRole('radio'))).not.toThrow();
  });

  // ── State transitions ──

  it('updates accessibilityState when selected changes via rerender', () => {
    const { getByRole, rerender } = wrap(<Radio selected={false} />);
    expect(getByRole('radio').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );

    rerender(
      <TwigsProvider>
        <Radio selected />
      </TwigsProvider>
    );
    expect(getByRole('radio').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  // ── Inner dot rendering ──

  it('renders inner dot when selected', () => {
    const tree = wrap(<Radio selected />).toJSON() as any;
    const pressable = tree;
    const outerCircle = pressable.children[0];
    expect(outerCircle.children).not.toBeNull();
    expect(outerCircle.children.length).toBeGreaterThan(0);
  });

  it('does not render inner dot when unselected', () => {
    const tree = wrap(<Radio selected={false} />).toJSON() as any;
    const pressable = tree;
    const outerCircle = pressable.children[0];
    expect(outerCircle.children).toBeNull();
  });
});
