import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { IconButton } from '../icon-button';
import { TwigsProvider } from '../context';
import { defaultTheme } from '../theme';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

describe('IconButton', () => {
  it('has displayName "IconButton"', () => {
    expect(IconButton.displayName).toBe('IconButton');
  });

  // ── Render ──

  it('renders without crashing', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders the icon element', () => {
    const icon = <Text testID="icon">+</Text>;
    const { getByTestId } = wrap(<IconButton icon={icon} />);
    expect(getByTestId('icon')).toBeTruthy();
  });

  // ── Variants ──

  describe('sizes', () => {
    const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} size={size} />);
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  describe('colors', () => {
    const colors = ['default', 'primary', 'secondary', 'bright', 'light', 'error'] as const;

    colors.forEach((color) => {
      it(`renders with color="${color}"`, () => {
        const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} color={color} />);
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  describe('variants', () => {
    const variants = ['solid', 'ghost', 'outline'] as const;

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} variant={variant} />);
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  describe('rounded', () => {
    const roundedOptions = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const;

    roundedOptions.forEach((rounded) => {
      it(`renders with rounded="${rounded}"`, () => {
        const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} rounded={rounded} />);
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  it('renders all size+color+variant combinations without crashing', () => {
    const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    const colors = ['default', 'primary', 'secondary', 'bright', 'light', 'error'] as const;
    const variants = ['solid', 'ghost', 'outline'] as const;
    sizes.forEach((size) => {
      colors.forEach((color) => {
        variants.forEach((variant) => {
          const { unmount } = wrap(
            <IconButton icon={<Text>+</Text>} size={size} color={color} variant={variant} />
          );
          unmount();
        });
      });
    });
  });

  // ── Rounded radius ──

  it('applies borderRadius 9999 when rounded is "full" (default)', () => {
    const tree = wrap(<IconButton icon={<Text>+</Text>} rounded="full" />);
    const btn = tree.getByRole('button');
    const resolvedStyle =
      typeof btn.props.style === 'function' ? btn.props.style({ pressed: false }) : btn.props.style;
    const flatStyle = Array.isArray(resolvedStyle)
      ? Object.assign({}, ...resolvedStyle.filter(Boolean))
      : resolvedStyle;
    expect(flatStyle.borderRadius).toBe(9999);
  });

  it('applies borderRadius 12 when rounded is "md"', () => {
    const tree = wrap(<IconButton icon={<Text>+</Text>} rounded="md" />);
    const btn = tree.getByRole('button');
    const resolvedStyle =
      typeof btn.props.style === 'function' ? btn.props.style({ pressed: false }) : btn.props.style;
    const flatStyle = Array.isArray(resolvedStyle)
      ? Object.assign({}, ...resolvedStyle.filter(Boolean))
      : resolvedStyle;
    expect(flatStyle.borderRadius).toBe(12);
  });

  // ── Icon color ──

  it('passes the correct icon color for primary+outline (not white)', () => {
    const icon = <Text testID="icon">+</Text>;
    const { getByTestId } = wrap(
      <IconButton icon={icon} color="primary" variant="outline" />
    );
    const iconEl = getByTestId('icon');
    expect(iconEl.props.color).toBe(defaultTheme.colors.primary500);
  });

  it('passes white icon color for primary+solid', () => {
    const icon = <Text testID="icon">+</Text>;
    const { getByTestId } = wrap(
      <IconButton icon={icon} color="primary" variant="solid" />
    );
    const iconEl = getByTestId('icon');
    expect(iconEl.props.color).toBe(defaultTheme.colors.white900);
  });

  it('passes the correct icon color for primary+ghost', () => {
    const icon = <Text testID="icon">+</Text>;
    const { getByTestId } = wrap(
      <IconButton icon={icon} color="primary" variant="ghost" />
    );
    const iconEl = getByTestId('icon');
    expect(iconEl.props.color).toBe(defaultTheme.colors.primary500);
  });

  // ── Accessibility ──

  it('has accessible=true and accessibilityRole="button"', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} />);
    const btn = getByRole('button');
    expect(btn.props.accessible).toBe(true);
    expect(btn.props.accessibilityRole).toBe('button');
  });

  it('reflects disabled in accessibilityState', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} disabled />);
    expect(getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('reflects loading as busy in accessibilityState', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} loading />);
    expect(getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({ busy: true })
    );
  });

  it('defaults accessibilityLabel to "Icon button"', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} />);
    expect(getByRole('button').props.accessibilityLabel).toBe('Icon button');
  });

  it('uses explicit accessibilityLabel over default', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} accessibilityLabel="Close" />);
    expect(getByRole('button').props.accessibilityLabel).toBe('Close');
  });

  // ── Interaction ──

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} onPress={onPress} disabled />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} onPress={onPress} loading />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('calls onPress multiple times on repeated taps', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} onPress={onPress} />);
    const btn = getByRole('button');
    fireEvent.press(btn);
    fireEvent.press(btn);
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalledTimes(3);
  });

  // ── State transitions ──

  it('transitions from enabled to disabled via rerender', () => {
    const { getByRole, rerender } = wrap(<IconButton icon={<Text>+</Text>} />);
    const btn = getByRole('button');
    expect(btn.props.accessibilityState).toEqual(expect.objectContaining({ disabled: false }));

    rerender(
      <TwigsProvider>
        <IconButton icon={<Text>+</Text>} disabled />
      </TwigsProvider>
    );
    const btnAfter = getByRole('button');
    expect(btnAfter.props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
  });

  it('transitions from default to loading via rerender', () => {
    const { getByRole, rerender } = wrap(<IconButton icon={<Text>+</Text>} />);
    const btn = getByRole('button');
    expect(btn.props.accessibilityState.busy).toBe(false);

    rerender(
      <TwigsProvider>
        <IconButton icon={<Text>+</Text>} loading />
      </TwigsProvider>
    );
    const btnAfter = getByRole('button');
    expect(btnAfter.props.accessibilityState.busy).toBe(true);
  });

  // ── Loading ──

  it('renders when loading prop is true', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} loading />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders with loader="circle" when loading', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} loading loader="circle" />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders with custom loader ReactElement when loading', () => {
    const customLoader = <Text testID="custom-loader">...</Text>;
    const { getByTestId } = wrap(
      <IconButton icon={<Text>+</Text>} loading loader={customLoader} />
    );
    expect(getByTestId('custom-loader')).toBeTruthy();
  });
});
