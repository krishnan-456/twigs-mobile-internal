import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from '../switch';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) =>
  render(<TwigsProvider>{ui}</TwigsProvider>);

describe('Switch', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByRole } = wrap(<Switch />);
    expect(getByRole('switch')).toBeTruthy();
  });

  it('renders with value=true', () => {
    const { getByRole } = wrap(<Switch value />);
    expect(getByRole('switch')).toBeTruthy();
  });

  it('renders with value=false', () => {
    const { getByRole } = wrap(<Switch value={false} />);
    expect(getByRole('switch')).toBeTruthy();
  });

  // ── Accessibility ──

  it('has accessible=true and accessibilityRole="switch"', () => {
    const { getByRole } = wrap(<Switch />);
    const sw = getByRole('switch');
    expect(sw.props.accessible).toBe(true);
  });

  it('reflects checked=true in accessibilityState', () => {
    const { getByRole } = wrap(<Switch value />);
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  it('reflects checked=false in accessibilityState', () => {
    const { getByRole } = wrap(<Switch value={false} />);
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );
  });

  it('reflects disabled in accessibilityState', () => {
    const { getByRole } = wrap(<Switch disabled />);
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('has accessibilityValue text "On" when checked', () => {
    const { getByRole } = wrap(<Switch value />);
    expect(getByRole('switch').props.accessibilityValue).toEqual({
      text: 'On',
    });
  });

  it('has accessibilityValue text "Off" when unchecked', () => {
    const { getByRole } = wrap(<Switch value={false} />);
    expect(getByRole('switch').props.accessibilityValue).toEqual({
      text: 'Off',
    });
  });

  // ── Interactions ──

  it('calls onValueChange(true) when toggling off -> on', () => {
    const onValueChange = jest.fn();
    const { getByRole } = wrap(
      <Switch value={false} onValueChange={onValueChange} />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(true);
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('calls onValueChange(false) when toggling on -> off', () => {
    const onValueChange = jest.fn();
    const { getByRole } = wrap(
      <Switch value onValueChange={onValueChange} />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByRole } = wrap(
      <Switch value={false} onValueChange={onValueChange} disabled />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('does not call onValueChange when no handler provided', () => {
    const { getByRole } = wrap(<Switch value={false} />);
    expect(() => fireEvent.press(getByRole('switch'))).not.toThrow();
  });

  // ── State transitions ──

  it('updates accessibilityState when value changes via rerender', () => {
    const { getByRole, rerender } = wrap(<Switch value={false} />);
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );

    rerender(<TwigsProvider><Switch value /></TwigsProvider>);
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  it('updates accessibilityValue when value changes via rerender', () => {
    const { getByRole, rerender } = wrap(<Switch value={false} />);
    expect(getByRole('switch').props.accessibilityValue).toEqual({
      text: 'Off',
    });

    rerender(<TwigsProvider><Switch value /></TwigsProvider>);
    expect(getByRole('switch').props.accessibilityValue).toEqual({
      text: 'On',
    });
  });
});
