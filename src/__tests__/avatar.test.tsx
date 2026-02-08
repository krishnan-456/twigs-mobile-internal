import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from '../avatar';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) =>
  render(<TwigsProvider>{ui}</TwigsProvider>);

describe('Avatar', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByRole } = wrap(<Avatar name="John Doe" />);
    expect(getByRole('image')).toBeTruthy();
  });

  it('renders with default props (no name)', () => {
    const { getByRole } = wrap(<Avatar />);
    expect(getByRole('image')).toBeTruthy();
  });

  // ── Fallback initials ──

  it('renders initials from full name (first + last)', () => {
    const { getByText } = wrap(<Avatar name="John Doe" />);
    expect(getByText('JD')).toBeTruthy();
  });

  it('renders single initial for single-word name', () => {
    const { getByText } = wrap(<Avatar name="John" />);
    expect(getByText('J')).toBeTruthy();
  });

  it('renders "?" fallback initial for default name', () => {
    const { getByText } = wrap(<Avatar />);
    expect(getByText('?')).toBeTruthy();
  });

  it('renders initials in uppercase', () => {
    const { getByText } = wrap(<Avatar name="jane smith" />);
    expect(getByText('JS')).toBeTruthy();
  });

  it('handles names with extra spaces', () => {
    const { getByText } = wrap(<Avatar name="  Alice   Bob  " />);
    expect(getByText('AB')).toBeTruthy();
  });

  // ── Image rendering ──

  it('does not render initials when imageSrc is provided', () => {
    const { queryByText } = wrap(
      <Avatar name="John Doe" imageSrc="https://example.com/avatar.jpg" />
    );
    expect(queryByText('JD')).toBeNull();
  });

  it('renders Image element when imageSrc is provided', () => {
    const tree = wrap(
      <Avatar name="John" imageSrc="https://example.com/avatar.jpg" />
    ).toJSON() as any;
    const flex = tree;
    const imageChild = flex.children[0];
    expect(imageChild.type).toBe('Image');
    expect(imageChild.props.source).toEqual({
      uri: 'https://example.com/avatar.jpg',
    });
  });

  it('sets accessibilityIgnoresInvertColors on Image', () => {
    const tree = wrap(
      <Avatar name="A" imageSrc="https://example.com/a.png" />
    ).toJSON() as any;
    const imageChild = tree.children[0];
    expect(imageChild.props.accessibilityIgnoresInvertColors).toBe(true);
  });

  // ── Size variants ──

  describe('size prop', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const { getByRole } = wrap(<Avatar name="A" size={size} />);
        expect(getByRole('image')).toBeTruthy();
      });
    });
  });

  it('uses custom width/height when no size prop', () => {
    const tree = wrap(
      <Avatar name="X" width={60} height={60} />
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.width).toBe(60);
    expect(flatStyle.height).toBe(60);
  });

  // ── Rounded variants ──

  describe('rounded prop', () => {
    const roundedValues = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const;

    roundedValues.forEach((rounded) => {
      it(`renders with rounded="${rounded}"`, () => {
        const { getByRole } = wrap(<Avatar name="A" rounded={rounded} />);
        expect(getByRole('image')).toBeTruthy();
      });
    });
  });

  // ── Accessibility ──

  it('has accessible=true and accessibilityRole="image"', () => {
    const { getByRole } = wrap(<Avatar name="Jane" />);
    const avatar = getByRole('image');
    expect(avatar.props.accessible).toBe(true);
  });

  it('sets accessibilityLabel to the name', () => {
    const { getByRole } = wrap(<Avatar name="John Doe" />);
    expect(getByRole('image').props.accessibilityLabel).toBe('John Doe');
  });

  it('does not set accessibilityLabel for default "?" name', () => {
    const { getByRole } = wrap(<Avatar />);
    expect(getByRole('image').props.accessibilityLabel).toBeUndefined();
  });

  // ── Custom styling ──

  it('applies custom backgroundColor', () => {
    const tree = wrap(
      <Avatar name="A" backgroundColor="#FF0000" />
    ).toJSON() as any;
    const flatStyle = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style.filter(Boolean))
      : tree.props.style;
    expect(flatStyle.backgroundColor).toBe('#FF0000');
  });
});
