import React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { Switch } from '../switch';
import { TwigsProvider } from '../context';
import { wrap } from './test-utils';

const getSwitchStyle = (switchElement: ReturnType<typeof render>['getByRole']) => {
  const el = switchElement('switch');
  const style = el.props.style;
  return StyleSheet.flatten(Array.isArray(style) ? style : [style]);
};

// From switch constants: sm track 28x14, md track 40x20
const SM_TRACK = { width: 28, height: 14 };
const MD_TRACK = { width: 40, height: 20 };

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

  it('renders with checked prop (web parity API)', () => {
    const { getByRole } = wrap(<Switch checked />);
    expect(getByRole('switch')).toBeTruthy();
  });

  it('renders with defaultChecked (uncontrolled)', () => {
    const { getByRole } = wrap(<Switch defaultChecked />);
    expect(getByRole('switch')).toBeTruthy();
    expect(getByRole('switch').props.accessibilityState.checked).toBe(true);
  });

  // ── Variants ──

  it('renders size="sm" with correct dimensions', () => {
    const { getByRole } = wrap(<Switch size="sm" />);
    const style = getSwitchStyle(getByRole);
    expect(style.width).toBe(SM_TRACK.width);
    expect(style.height).toBe(SM_TRACK.height);
  });

  it('renders size="md" with correct dimensions', () => {
    const { getByRole } = wrap(<Switch size="md" />);
    const style = getSwitchStyle(getByRole);
    expect(style.width).toBe(MD_TRACK.width);
    expect(style.height).toBe(MD_TRACK.height);
  });

  it('defaults to size="md"', () => {
    const { getByRole } = wrap(<Switch />);
    const style = getSwitchStyle(getByRole);
    expect(style.width).toBe(MD_TRACK.width);
    expect(style.height).toBe(MD_TRACK.height);
  });

  // ── Accessibility ──

  it('has accessible=true and accessibilityRole="switch"', () => {
    const { getByRole } = wrap(<Switch />);
    const sw = getByRole('switch');
    expect(sw.props.accessible).toBe(true);
    expect(sw.props.accessibilityRole).toBe('switch');
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

  // ── Interaction ──

  describe('backward-compatible API (value + onValueChange)', () => {
    it('calls onValueChange(true) when toggling off -> on', () => {
      const onValueChange = jest.fn();
      const { getByRole } = wrap(<Switch value={false} onValueChange={onValueChange} />);
      fireEvent.press(getByRole('switch'));
      expect(onValueChange).toHaveBeenCalledWith(true);
      expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    it('calls onValueChange(false) when toggling on -> off', () => {
      const onValueChange = jest.fn();
      const { getByRole } = wrap(<Switch value onValueChange={onValueChange} />);
      fireEvent.press(getByRole('switch'));
      expect(onValueChange).toHaveBeenCalledWith(false);
    });
  });

  describe('web parity API (checked + onChange)', () => {
    it('calls onChange(true) when toggling off -> on', () => {
      const onChange = jest.fn();
      const { getByRole } = wrap(<Switch checked={false} onChange={onChange} />);
      fireEvent.press(getByRole('switch'));
      expect(onChange).toHaveBeenCalledWith(true);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('calls onChange(false) when toggling on -> off', () => {
      const onChange = jest.fn();
      const { getByRole } = wrap(<Switch checked onChange={onChange} />);
      fireEvent.press(getByRole('switch'));
      expect(onChange).toHaveBeenCalledWith(false);
    });
  });

  it('calls both onChange and onValueChange when both are provided', () => {
    const onChange = jest.fn();
    const onValueChange = jest.fn();
    const { getByRole } = wrap(
      <Switch value={false} onChange={onChange} onValueChange={onValueChange} />
    );
    fireEvent.press(getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange or onChange when disabled', () => {
    const onValueChange = jest.fn();
    const onChange = jest.fn();
    const { getByRole } = wrap(
      <Switch value={false} onValueChange={onValueChange} onChange={onChange} disabled />
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not throw when pressed with no handler provided', () => {
    const { getByRole } = wrap(<Switch value={false} />);
    expect(() => fireEvent.press(getByRole('switch'))).not.toThrow();
  });

  describe('uncontrolled mode', () => {
    it('toggles internal state on press when using defaultChecked', () => {
      const { getByRole } = wrap(<Switch defaultChecked={false} />);
      expect(getByRole('switch').props.accessibilityState.checked).toBe(false);

      fireEvent.press(getByRole('switch'));
      expect(getByRole('switch').props.accessibilityState.checked).toBe(true);

      fireEvent.press(getByRole('switch'));
      expect(getByRole('switch').props.accessibilityState.checked).toBe(false);
    });

    it('calls onChange when provided in uncontrolled mode', () => {
      const onChange = jest.fn();
      const { getByRole } = wrap(<Switch defaultChecked={false} onChange={onChange} />);
      fireEvent.press(getByRole('switch'));
      expect(onChange).toHaveBeenCalledWith(true);
      fireEvent.press(getByRole('switch'));
      expect(onChange).toHaveBeenCalledWith(false);
    });
  });

  // ── State transitions ──

  it('updates accessibilityState when value changes via rerender', () => {
    const { getByRole, rerender } = wrap(<Switch value={false} />);
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );

    rerender(
      <TwigsProvider>
        <Switch value />
      </TwigsProvider>
    );
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  it('updates accessibilityValue when value changes via rerender', () => {
    const { getByRole, rerender } = wrap(<Switch value={false} />);
    expect(getByRole('switch').props.accessibilityValue).toEqual({
      text: 'Off',
    });

    rerender(
      <TwigsProvider>
        <Switch value />
      </TwigsProvider>
    );
    expect(getByRole('switch').props.accessibilityValue).toEqual({
      text: 'On',
    });
  });

  it('checked takes precedence over value when both provided', () => {
    const { getByRole } = wrap(<Switch value={false} checked />);
    expect(getByRole('switch').props.accessibilityState.checked).toBe(true);
    expect(getByRole('switch').props.accessibilityValue.text).toBe('On');
  });

  it('updates accessibilityState when checked changes via rerender', () => {
    const { getByRole, rerender } = wrap(<Switch checked={false} />);
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );

    rerender(
      <TwigsProvider>
        <Switch checked />
      </TwigsProvider>
    );
    expect(getByRole('switch').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  // ── Style overrides ──

  it('applies css prop without crashing', () => {
    const { getByRole } = wrap(<Switch css={{ opacity: 0.9 }} />);
    const style = getSwitchStyle(getByRole);
    expect(style.opacity).toBe(0.9);
    expect(getByRole('switch')).toBeTruthy();
  });

  it('applies style prop without crashing', () => {
    const { getByRole } = wrap(<Switch style={{ opacity: 0.8 }} />);
    const style = getSwitchStyle(getByRole);
    expect(style.opacity).toBe(0.8);
    expect(getByRole('switch')).toBeTruthy();
  });

  it('applies both css and style props (style overrides css)', () => {
    const { getByRole } = wrap(<Switch css={{ opacity: 0.9 }} style={{ opacity: 0.7 }} />);
    const style = getSwitchStyle(getByRole);
    expect(style.opacity).toBe(0.7);
    expect(getByRole('switch')).toBeTruthy();
  });
});
