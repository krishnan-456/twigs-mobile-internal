import React from 'react';
import { render } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';
import { Box } from '../box';

describe('Box', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByText } = render(
      <Box>
        <RNText>content</RNText>
      </Box>
    );
    expect(getByText('content')).toBeTruthy();
  });

  it('renders with no children', () => {
    const { toJSON } = render(<Box />);
    expect(toJSON()).toBeTruthy();
  });

  // ── Accessibility forwarding ──

  it('forwards accessibilityRole', () => {
    const tree = render(
      <Box accessibilityRole="summary">
        <RNText>Summary</RNText>
      </Box>
    ).toJSON() as any;
    expect(tree.props.accessibilityRole).toBe('summary');
  });

  it('forwards accessibilityLabel', () => {
    const { getByLabelText } = render(
      <Box accessibilityLabel="card" accessible>
        <RNText>Card</RNText>
      </Box>
    );
    expect(getByLabelText('card')).toBeTruthy();
  });

  it('forwards accessibilityHint', () => {
    const tree = render(
      <Box accessibilityHint="Double tap to open">
        <RNText>Hint</RNText>
      </Box>
    ).toJSON() as any;
    expect(tree.props.accessibilityHint).toBe('Double tap to open');
  });

  it('forwards accessibilityState', () => {
    const tree = render(
      <Box accessibilityState={{ disabled: true }}>
        <RNText>Disabled</RNText>
      </Box>
    ).toJSON() as any;
    expect(tree.props.accessibilityState).toEqual({ disabled: true });
  });

  it('forwards accessibilityValue', () => {
    const tree = render(
      <Box accessibilityValue={{ min: 0, max: 100, now: 50 }}>
        <RNText>Progress</RNText>
      </Box>
    ).toJSON() as any;
    expect(tree.props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 50,
    });
  });

  it('forwards accessible prop', () => {
    const tree = render(
      <Box accessible>
        <RNText>Accessible</RNText>
      </Box>
    ).toJSON() as any;
    expect(tree.props.accessible).toBe(true);
  });

  // ── Spacing ──

  it('applies margin props', () => {
    const tree = render(
      <Box margin={10} marginTop={20}>
        <RNText>Spaced</RNText>
      </Box>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.marginTop).toBe(20);
    expect(flatStyle.marginBottom).toBe(10);
    expect(flatStyle.marginLeft).toBe(10);
    expect(flatStyle.marginRight).toBe(10);
  });

  it('applies padding props', () => {
    const tree = render(
      <Box padding={8} paddingHorizontal={16}>
        <RNText>Padded</RNText>
      </Box>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.paddingLeft).toBe(16);
    expect(flatStyle.paddingRight).toBe(16);
    expect(flatStyle.paddingTop).toBe(8);
    expect(flatStyle.paddingBottom).toBe(8);
  });

  // ── Style overrides ──

  it('applies css and style overrides', () => {
    const tree = render(
      <Box css={{ backgroundColor: 'red' }} style={{ opacity: 0.5 }}>
        <RNText>Styled</RNText>
      </Box>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.backgroundColor).toBe('red');
    expect(flatStyle.opacity).toBe(0.5);
  });
});
