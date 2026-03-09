import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { LinkButton } from '../link-button';
import { TwigsProvider } from '../context';
import { wrap } from './test-utils';

describe('LinkButton', () => {
  it('has displayName "LinkButton"', () => {
    expect(LinkButton.displayName).toBe('LinkButton');
  });

  // ── Render ──

  it('renders without crashing', () => {
    const { getByRole } = wrap(<LinkButton>Press me</LinkButton>);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders text content correctly', () => {
    const { getByText } = wrap(<LinkButton>Submit</LinkButton>);
    expect(getByText('Submit')).toBeTruthy();
  });

  it('renders text with textDecorationLine underline', () => {
    const { getByText } = wrap(<LinkButton>Link text</LinkButton>);
    const textEl = getByText('Link text');
    const flatStyle = Array.isArray(textEl.props.style)
      ? Object.assign({}, ...textEl.props.style.filter(Boolean))
      : textEl.props.style;
    expect(flatStyle.textDecorationLine).toBe('underline');
  });

  // ── Variants ──

  describe('sizes', () => {
    const sizes = ['sm', 'md'] as const;

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const { getByRole } = wrap(
          <LinkButton size={size} testID="link-btn">
            Tap
          </LinkButton>
        );
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  describe('colors', () => {
    const colors = ['primary', 'default'] as const;

    colors.forEach((color) => {
      it(`renders with color="${color}"`, () => {
        const { getByRole } = wrap(
          <LinkButton color={color} testID="link-btn">
            Tap
          </LinkButton>
        );
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  describe('variants', () => {
    const variants = ['medium', 'bold'] as const;

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        const { getByRole } = wrap(
          <LinkButton variant={variant} testID="link-btn">
            Tap
          </LinkButton>
        );
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  it('renders all size+color+variant combinations without crashing', () => {
    const sizes = ['sm', 'md'] as const;
    const colors = ['primary', 'default'] as const;
    const variants = ['medium', 'bold'] as const;
    sizes.forEach((size) => {
      colors.forEach((color) => {
        variants.forEach((variant) => {
          const { unmount } = wrap(
            <LinkButton size={size} color={color} variant={variant}>
              Link
            </LinkButton>
          );
          unmount();
        });
      });
    });
  });

  // ── Accessibility ──

  it('has accessible=true and accessibilityRole="button"', () => {
    const { getByRole } = wrap(<LinkButton>OK</LinkButton>);
    const btn = getByRole('button');
    expect(btn.props.accessible).toBe(true);
    expect(btn.props.accessibilityRole).toBe('button');
  });

  it('reflects disabled in accessibilityState', () => {
    const { getByRole } = wrap(<LinkButton disabled>Disabled</LinkButton>);
    expect(getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('auto-derives accessibilityLabel from string children', () => {
    const { getByRole } = wrap(<LinkButton>Learn more</LinkButton>);
    expect(getByRole('button').props.accessibilityLabel).toBe('Learn more');
  });

  it('uses explicit accessibilityLabel over auto-derived', () => {
    const { getByRole } = wrap(
      <LinkButton accessibilityLabel="Custom label">Link text</LinkButton>
    );
    expect(getByRole('button').props.accessibilityLabel).toBe('Custom label');
  });

  // ── Interaction ──

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(<LinkButton onPress={onPress}>Tap</LinkButton>);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(
      <LinkButton onPress={onPress} disabled>
        Tap
      </LinkButton>
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('calls onPress multiple times on repeated taps', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(<LinkButton onPress={onPress}>Tap</LinkButton>);
    const btn = getByRole('button');
    fireEvent.press(btn);
    fireEvent.press(btn);
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalledTimes(3);
  });

  // ── State transitions ──

  it('transitions from enabled to disabled via rerender updates accessibilityState', () => {
    const { getByRole, rerender } = wrap(<LinkButton>Save</LinkButton>);
    const btn = getByRole('button');
    expect(btn.props.accessibilityState).toEqual(expect.objectContaining({ disabled: false }));

    rerender(
      <TwigsProvider>
        <LinkButton disabled>Save</LinkButton>
      </TwigsProvider>
    );
    const btnAfter = getByRole('button');
    expect(btnAfter.props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
  });

  it('updates accessibilityLabel when children change via rerender', () => {
    const { getByRole, rerender } = wrap(<LinkButton>Initial</LinkButton>);
    expect(getByRole('button').props.accessibilityLabel).toBe('Initial');

    rerender(
      <TwigsProvider>
        <LinkButton>Updated</LinkButton>
      </TwigsProvider>
    );
    expect(getByRole('button').props.accessibilityLabel).toBe('Updated');
  });

  // ── Disabled opacity ──

  it('applies 0.5 opacity when disabled', () => {
    const tree = wrap(<LinkButton disabled>Disabled</LinkButton>);
    const btn = tree.getByRole('button');
    const flatStyle = Array.isArray(btn.props.style)
      ? Object.assign({}, ...btn.props.style.filter(Boolean))
      : btn.props.style;
    expect(flatStyle.opacity).toBe(0.5);
  });

  // ── Style overrides ──

  it('applies custom textStyle', () => {
    const { getByText } = wrap(<LinkButton textStyle={{ letterSpacing: 2 }}>Styled</LinkButton>);
    const textEl = getByText('Styled');
    const flatStyle = Array.isArray(textEl.props.style)
      ? Object.assign({}, ...textEl.props.style.filter(Boolean))
      : textEl.props.style;
    expect(flatStyle.letterSpacing).toBe(2);
  });
});
