import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { StyleSheet, Text } from 'react-native';
import { Checkbox } from '../checkbox';
import { TwigsProvider } from '../context';
import { defaultTheme } from '../theme';
import { wrap } from './test-utils';

const getCheckboxBoxStyle = (tree: any) => {
  const checkboxBox = tree?.children?.[0];
  return StyleSheet.flatten(checkboxBox?.props?.style);
};

describe('Checkbox', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByRole } = wrap(<Checkbox />);
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('renders with string children as label', () => {
    const { getByRole } = wrap(<Checkbox>Accept terms</Checkbox>);
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('renders with ReactNode children', () => {
    const { getByRole, getByText } = wrap(
      <Checkbox>
        <Text>Custom Label</Text>
      </Checkbox>
    );
    expect(getByRole('checkbox')).toBeTruthy();
    expect(getByText('Custom Label')).toBeTruthy();
  });

  // ── Sizes ──

  it('renders with size="sm" (default)', () => {
    const { getByRole } = wrap(<Checkbox size="sm" />);
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('renders with size="md"', () => {
    const { getByRole } = wrap(<Checkbox size="md" />);
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('uses figma-aligned size configs for sm and md', () => {
    const smTree = wrap(<Checkbox size="sm" />).toJSON() as any;
    const mdTree = wrap(<Checkbox size="md" />).toJSON() as any;

    const smStyle = getCheckboxBoxStyle(smTree);
    const mdStyle = getCheckboxBoxStyle(mdTree);

    expect(smStyle.width).toBe(16);
    expect(smStyle.height).toBe(16);
    expect(mdStyle.width).toBe(20);
    expect(mdStyle.height).toBe(20);
  });

  // ── Accessibility ──

  it('has accessible=true and accessibilityRole="checkbox"', () => {
    const { getByRole } = wrap(<Checkbox />);
    const cb = getByRole('checkbox');
    expect(cb.props.accessible).toBe(true);
  });

  it('reflects checked=true in accessibilityState', () => {
    const { getByRole } = wrap(<Checkbox checked />);
    expect(getByRole('checkbox').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  it('reflects checked=false in accessibilityState', () => {
    const { getByRole } = wrap(<Checkbox checked={false} />);
    expect(getByRole('checkbox').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );
  });

  it('maps "indeterminate" to "mixed" in accessibilityState', () => {
    const { getByRole } = wrap(<Checkbox checked="indeterminate" />);
    expect(getByRole('checkbox').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: 'mixed' })
    );
  });

  it('reflects disabled in accessibilityState', () => {
    const { getByRole } = wrap(<Checkbox disabled />);
    expect(getByRole('checkbox').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('applies disabled opacity style to the container', () => {
    const { getByRole } = wrap(<Checkbox disabled />);
    const containerStyle = StyleSheet.flatten(getByRole('checkbox').props.style);
    expect(containerStyle.opacity).toBe(0.5);
  });

  it('derives accessibilityLabel from string children', () => {
    const { getByRole } = wrap(<Checkbox>Accept terms</Checkbox>);
    expect(getByRole('checkbox').props.accessibilityLabel).toBe('Accept terms');
  });

  it('does not derive accessibilityLabel from non-string children', () => {
    const { getByRole } = wrap(
      <Checkbox>
        <Text>Node</Text>
      </Checkbox>
    );
    expect(getByRole('checkbox').props.accessibilityLabel).toBeUndefined();
  });

  it('has accessibilityHint for tap guidance', () => {
    const { getByRole } = wrap(<Checkbox />);
    expect(getByRole('checkbox').props.accessibilityHint).toBe('Double tap to toggle');
  });

  // ── Interactions ──

  it('calls onChange(true) when unchecked checkbox is pressed', () => {
    const onChange = jest.fn();
    const { getByRole } = wrap(<Checkbox checked={false} onChange={onChange} />);
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange(false) when checked checkbox is pressed', () => {
    const onChange = jest.fn();
    const { getByRole } = wrap(<Checkbox checked onChange={onChange} />);
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('calls onChange(true) when indeterminate checkbox is pressed', () => {
    const onChange = jest.fn();
    const { getByRole } = wrap(<Checkbox checked="indeterminate" onChange={onChange} />);
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    const { getByRole } = wrap(<Checkbox checked={false} onChange={onChange} disabled />);
    fireEvent.press(getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not throw when pressed with no onChange handler', () => {
    const { getByRole } = wrap(<Checkbox checked={false} />);
    expect(() => fireEvent.press(getByRole('checkbox'))).not.toThrow();
  });

  // ── State transitions ──

  it('updates accessibilityState when checked changes via rerender', () => {
    const { getByRole, rerender } = wrap(<Checkbox checked={false} />);
    expect(getByRole('checkbox').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );

    rerender(
      <TwigsProvider>
        <Checkbox checked />
      </TwigsProvider>
    );
    expect(getByRole('checkbox').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
  });

  it('transitions from checked to indeterminate via rerender', () => {
    const { getByRole, rerender } = wrap(<Checkbox checked />);
    expect(getByRole('checkbox').props.accessibilityState.checked).toBe(true);

    rerender(
      <TwigsProvider>
        <Checkbox checked="indeterminate" />
      </TwigsProvider>
    );
    expect(getByRole('checkbox').props.accessibilityState.checked).toBe('mixed');
  });

  it('uses figma token colors for unchecked and checked states', () => {
    const uncheckedTree = wrap(<Checkbox checked={false} />).toJSON() as any;
    const checkedTree = wrap(<Checkbox checked />).toJSON() as any;
    const indeterminateTree = wrap(<Checkbox checked="indeterminate" />).toJSON() as any;

    const uncheckedStyle = getCheckboxBoxStyle(uncheckedTree);
    const checkedStyle = getCheckboxBoxStyle(checkedTree);
    const indeterminateStyle = getCheckboxBoxStyle(indeterminateTree);

    expect(uncheckedStyle.backgroundColor).toBe(defaultTheme.colors.white900);
    expect(uncheckedStyle.borderColor).toBe(defaultTheme.colors.neutral400);
    expect(checkedStyle.backgroundColor).toBe(defaultTheme.colors.secondary600);
    expect(checkedStyle.borderColor).toBe('transparent');
    expect(indeterminateStyle.backgroundColor).toBe(defaultTheme.colors.secondary600);
    expect(indeterminateStyle.borderColor).toBe('transparent');
  });
});
