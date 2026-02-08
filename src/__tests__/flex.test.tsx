import React from 'react';
import { render } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';
import { Flex } from '../flex';

describe('Flex', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByText } = render(
      <Flex>
        <RNText>content</RNText>
      </Flex>
    );
    expect(getByText('content')).toBeTruthy();
  });

  it('renders with no children', () => {
    const { toJSON } = render(<Flex />);
    expect(toJSON()).toBeTruthy();
  });

  // ── Layout props ──

  it('defaults to column direction', () => {
    const tree = render(
      <Flex>
        <RNText>Col</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.flexDirection).toBe('column');
  });

  it('applies direction="row"', () => {
    const tree = render(
      <Flex direction="row">
        <RNText>Row</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.flexDirection).toBe('row');
  });

  it('applies align and justify', () => {
    const tree = render(
      <Flex align="center" justify="space-between">
        <RNText>Aligned</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.alignItems).toBe('center');
    expect(flatStyle.justifyContent).toBe('space-between');
  });

  it('applies gap', () => {
    const tree = render(
      <Flex gap={12}>
        <RNText>A</RNText>
        <RNText>B</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.gap).toBe(12);
  });

  it('applies wrap', () => {
    const tree = render(
      <Flex wrap="wrap">
        <RNText>Wrap</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.flexWrap).toBe('wrap');
  });

  it('applies flex, flexGrow, flexShrink, flexBasis', () => {
    const tree = render(
      <Flex flex={1} flexGrow={2} flexShrink={0} flexBasis="auto">
        <RNText>Flex</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.flex).toBe(1);
    expect(flatStyle.flexGrow).toBe(2);
    expect(flatStyle.flexShrink).toBe(0);
    expect(flatStyle.flexBasis).toBe('auto');
  });

  it('applies alignSelf', () => {
    const tree = render(
      <Flex alignSelf="stretch">
        <RNText>Self</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.alignSelf).toBe('stretch');
  });

  // ── Accessibility forwarding ──

  it('forwards accessibilityRole', () => {
    const tree = render(
      <Flex accessibilityRole="summary">
        <RNText>Summary</RNText>
      </Flex>
    ).toJSON() as any;
    expect(tree.props.accessibilityRole).toBe('summary');
  });

  it('forwards accessibilityLabel', () => {
    const { getByLabelText } = render(
      <Flex accessibilityLabel="container" accessible>
        <RNText>Inner</RNText>
      </Flex>
    );
    expect(getByLabelText('container')).toBeTruthy();
  });

  it('forwards accessibilityState', () => {
    const tree = render(
      <Flex accessibilityState={{ expanded: true }}>
        <RNText>Expanded</RNText>
      </Flex>
    ).toJSON() as any;
    expect(tree.props.accessibilityState).toEqual({ expanded: true });
  });

  // ── Spacing ──

  it('applies margin props', () => {
    const tree = render(
      <Flex marginVertical={12} marginHorizontal={8}>
        <RNText>Spaced</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.marginTop).toBe(12);
    expect(flatStyle.marginBottom).toBe(12);
    expect(flatStyle.marginLeft).toBe(8);
    expect(flatStyle.marginRight).toBe(8);
  });

  it('applies padding props', () => {
    const tree = render(
      <Flex padding={16}>
        <RNText>Padded</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.paddingTop).toBe(16);
    expect(flatStyle.paddingBottom).toBe(16);
    expect(flatStyle.paddingLeft).toBe(16);
    expect(flatStyle.paddingRight).toBe(16);
  });

  // ── Style overrides ──

  it('applies css and style overrides', () => {
    const tree = render(
      <Flex css={{ backgroundColor: 'blue' }} style={{ borderWidth: 1 }}>
        <RNText>Styled</RNText>
      </Flex>
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.backgroundColor).toBe('blue');
    expect(flatStyle.borderWidth).toBe(1);
  });
});
