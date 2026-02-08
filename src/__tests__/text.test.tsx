import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from '../text';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

describe('Text', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByText } = wrap(<Text>Hello</Text>);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders empty text without crashing', () => {
    const { toJSON } = wrap(<Text />);
    expect(toJSON()).toBeTruthy();
  });

  // ── Typography props ──

  it('applies custom fontSize', () => {
    const { getByText } = wrap(<Text fontSize={24}>Big</Text>);
    const el = getByText('Big');
    const flatStyle = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    expect(flatStyle.fontSize).toBe(24);
  });

  it('applies default fontSize of 14', () => {
    const { getByText } = wrap(<Text>Default</Text>);
    const el = getByText('Default');
    const flatStyle = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    expect(flatStyle.fontSize).toBe(14);
  });

  it('applies custom color', () => {
    const { getByText } = wrap(<Text color="#FF0000">Red</Text>);
    const el = getByText('Red');
    const flatStyle = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    expect(flatStyle.color).toBe('#FF0000');
  });

  it('applies textAlign', () => {
    const { getByText } = wrap(<Text textAlign="center">Center</Text>);
    const el = getByText('Center');
    const flatStyle = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    expect(flatStyle.textAlign).toBe('center');
  });

  it('applies textDecoration', () => {
    const { getByText } = wrap(<Text textDecoration="underline">Underline</Text>);
    const el = getByText('Underline');
    const flatStyle = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    expect(flatStyle.textDecorationLine).toBe('underline');
  });

  it('applies textTransform', () => {
    const { getByText } = wrap(<Text textTransform="uppercase">upper</Text>);
    const el = getByText('upper');
    const flatStyle = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    expect(flatStyle.textTransform).toBe('uppercase');
  });

  it('applies fontStyle', () => {
    const { getByText } = wrap(<Text fontStyle="italic">Italic</Text>);
    const el = getByText('Italic');
    const flatStyle = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    expect(flatStyle.fontStyle).toBe('italic');
  });

  it('applies lineHeight and letterSpacing', () => {
    const { getByText } = wrap(
      <Text lineHeight={28} letterSpacing={1.5}>
        Spaced
      </Text>
    );
    const el = getByText('Spaced');
    const flatStyle = Array.isArray(el.props.style)
      ? Object.assign({}, ...el.props.style.filter(Boolean))
      : el.props.style;
    expect(flatStyle.lineHeight).toBe(28);
    expect(flatStyle.letterSpacing).toBe(1.5);
  });

  // ── Truncation ──

  it('forwards numberOfLines', () => {
    const { getByText } = wrap(<Text numberOfLines={2}>Truncated text</Text>);
    expect(getByText('Truncated text').props.numberOfLines).toBe(2);
  });

  it('forwards ellipsizeMode', () => {
    const { getByText } = wrap(
      <Text numberOfLines={1} ellipsizeMode="middle">
        Long text
      </Text>
    );
    expect(getByText('Long text').props.ellipsizeMode).toBe('middle');
  });

  // ── Accessibility ──

  it('forwards accessibilityRole', () => {
    const { getByText } = wrap(<Text accessibilityRole="header">Title</Text>);
    expect(getByText('Title').props.accessibilityRole).toBe('header');
  });

  it('forwards accessibilityLabel', () => {
    const { getByText } = wrap(<Text accessibilityLabel="greeting">Hi</Text>);
    expect(getByText('Hi').props.accessibilityLabel).toBe('greeting');
  });

  it('forwards accessibilityHint', () => {
    const { getByText } = wrap(<Text accessibilityHint="Tap to open">Link</Text>);
    expect(getByText('Link').props.accessibilityHint).toBe('Tap to open');
  });

  it('forwards accessibilityState', () => {
    const { getByText } = wrap(<Text accessibilityState={{ disabled: true }}>Disabled</Text>);
    expect(getByText('Disabled').props.accessibilityState).toEqual({
      disabled: true,
    });
  });

  // ── Style overrides ──

  it('applies css and style overrides', () => {
    const { getByText } = wrap(
      <Text css={{ opacity: 0.5 }} style={{ opacity: 1 }}>
        Styled
      </Text>
    );
    expect(getByText('Styled')).toBeTruthy();
  });
});
