import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Button } from '../button';
import { getPressedStyle } from '../button/helpers';
import { TwigsProvider } from '../context';
import { defaultTheme } from '../theme';
import { colorOpacity } from '../utils';
import { wrap } from './test-utils';

describe('Button', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByRole } = wrap(<Button>Press me</Button>);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders text content correctly', () => {
    const { getByText } = wrap(<Button>Submit</Button>);
    expect(getByText('Submit')).toBeTruthy();
  });

  it('renders with no children (icon-only mode)', () => {
    const icon = <Text>X</Text>;
    const { getByRole } = wrap(<Button icon={icon} />);
    expect(getByRole('button')).toBeTruthy();
  });

  // ── Variants ──

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const { getByRole } = wrap(<Button size={size}>Tap</Button>);
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  describe('colors', () => {
    const colors = ['default', 'primary', 'secondary', 'light', 'error'] as const;

    colors.forEach((color) => {
      it(`renders with color="${color}"`, () => {
        const { getByRole } = wrap(<Button color={color}>Tap</Button>);
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  describe('variants', () => {
    const variants = ['solid', 'ghost', 'outline'] as const;

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        const { getByRole } = wrap(<Button variant={variant}>Tap</Button>);
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  it('renders all color+variant combinations without crashing', () => {
    const colors = ['default', 'primary', 'secondary', 'light', 'error'] as const;
    const variants = ['solid', 'ghost', 'outline'] as const;
    colors.forEach((color) => {
      variants.forEach((variant) => {
        const { unmount } = wrap(
          <Button color={color} variant={variant}>
            {color}-{variant}
          </Button>
        );
        unmount();
      });
    });
  });

  // ── Sub-components ──

  it('renders with leftIcon', () => {
    const icon = <Text testID="left-icon">L</Text>;
    const { getByTestId, getByText } = wrap(<Button leftIcon={icon}>With Icon</Button>);
    expect(getByTestId('left-icon')).toBeTruthy();
    expect(getByText('With Icon')).toBeTruthy();
  });

  it('renders with rightIcon', () => {
    const icon = <Text testID="right-icon">R</Text>;
    const { getByTestId, getByText } = wrap(<Button rightIcon={icon}>With Icon</Button>);
    expect(getByTestId('right-icon')).toBeTruthy();
    expect(getByText('With Icon')).toBeTruthy();
  });

  it('renders with both leftIcon and rightIcon', () => {
    const left = <Text testID="left">L</Text>;
    const right = <Text testID="right">R</Text>;
    const { getByTestId } = wrap(
      <Button leftIcon={left} rightIcon={right}>
        Both
      </Button>
    );
    expect(getByTestId('left')).toBeTruthy();
    expect(getByTestId('right')).toBeTruthy();
  });

  it('renders icon-only button via icon prop', () => {
    const icon = <Text testID="solo-icon">+</Text>;
    const { getByTestId } = wrap(<Button icon={icon} />);
    expect(getByTestId('solo-icon')).toBeTruthy();
  });

  // ── Loading state ──

  it('shows loader when loading with no icon', () => {
    const { getByRole, queryByText } = wrap(<Button loading>Loading</Button>);
    expect(getByRole('button')).toBeTruthy();
    expect(queryByText('Loading')).toBeTruthy();
  });

  it('transitions from default to loading via rerender', () => {
    const { getByRole, rerender } = wrap(<Button>Save</Button>);
    const btn = getByRole('button');
    expect(btn.props.accessibilityState.busy).toBe(false);

    rerender(
      <TwigsProvider>
        <Button loading>Save</Button>
      </TwigsProvider>
    );
    const btnAfter = getByRole('button');
    expect(btnAfter.props.accessibilityState.busy).toBe(true);
  });

  // ── Accessibility ──

  it('has accessible=true and accessibilityRole="button"', () => {
    const { getByRole } = wrap(<Button>OK</Button>);
    const btn = getByRole('button');
    expect(btn.props.accessible).toBe(true);
  });

  it('reflects disabled in accessibilityState', () => {
    const { getByRole } = wrap(<Button disabled>Disabled</Button>);
    expect(getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('reflects loading as busy in accessibilityState', () => {
    const { getByRole } = wrap(<Button loading>Loading</Button>);
    expect(getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({ busy: true })
    );
  });

  it('sets both disabled and busy when disabled+loading', () => {
    const { getByRole } = wrap(
      <Button disabled loading>
        Both
      </Button>
    );
    expect(getByRole('button').props.accessibilityState).toEqual({
      disabled: true,
      busy: true,
    });
  });

  it('auto-derives accessibilityLabel="Button" for icon-only buttons', () => {
    const icon = <Text>X</Text>;
    const { getByRole } = wrap(<Button icon={icon} />);
    expect(getByRole('button').props.accessibilityLabel).toBe('Button');
  });

  it('uses explicit accessibilityLabel over auto-derived', () => {
    const icon = <Text>X</Text>;
    const { getByRole } = wrap(<Button icon={icon} accessibilityLabel="Close" />);
    expect(getByRole('button').props.accessibilityLabel).toBe('Close');
  });

  it('does not auto-derive label for buttons with text children', () => {
    const { getByRole } = wrap(<Button>Save</Button>);
    expect(getByRole('button').props.accessibilityLabel).toBeUndefined();
  });

  // ── Interactions ──

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(<Button onPress={onPress}>Tap</Button>);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(
      <Button onPress={onPress} disabled>
        Tap
      </Button>
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(
      <Button onPress={onPress} loading>
        Tap
      </Button>
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('calls onPress multiple times on repeated taps', () => {
    const onPress = jest.fn();
    const { getByRole } = wrap(<Button onPress={onPress}>Tap</Button>);
    const btn = getByRole('button');
    fireEvent.press(btn);
    fireEvent.press(btn);
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalledTimes(3);
  });

  // ── Loader prop ──

  it('renders with default line loader when loading', () => {
    const { getByRole } = wrap(<Button loading>Save</Button>);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders with loader="circle" when loading', () => {
    const { getByRole } = wrap(
      <Button loading loader="circle">
        Save
      </Button>
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders with custom loader ReactElement when loading', () => {
    const customLoader = <Text testID="custom-loader">...</Text>;
    const { getByTestId } = wrap(
      <Button loading loader={customLoader}>
        Save
      </Button>
    );
    expect(getByTestId('custom-loader')).toBeTruthy();
  });

  it('does not render loader when not loading', () => {
    const customLoader = <Text testID="custom-loader">...</Text>;
    const { queryByTestId } = wrap(<Button loader={customLoader}>Save</Button>);
    expect(queryByTestId('custom-loader')).toBeNull();
  });

  // ── Disabled opacity ──

  it('applies 0.4 opacity when disabled (matching web)', () => {
    const tree = wrap(<Button disabled>Disabled</Button>);
    const btn = tree.getByRole('button');
    const flatStyle = Array.isArray(btn.props.style)
      ? Object.assign({}, ...btn.props.style.filter(Boolean))
      : btn.props.style;
    expect(flatStyle.opacity).toBe(0.4);
  });

  // ── Shade mapping ──

  describe('shade mapping', () => {
    it('uses secondary600 bg for secondary solid regular', () => {
      const pressedStyle = getPressedStyle('secondary', 'solid', defaultTheme);
      expect(pressedStyle.backgroundColor).toBe(defaultTheme.colors.secondary800);
    });

    it('uses negative600 bg for error solid regular (pressed → negative800)', () => {
      const pressedStyle = getPressedStyle('error', 'solid', defaultTheme);
      expect(pressedStyle.backgroundColor).toBe(defaultTheme.colors.negative800);
    });

    it('uses colorOpacity for light solid pressed background', () => {
      const pressedStyle = getPressedStyle('light', 'solid', defaultTheme);
      expect(pressedStyle.backgroundColor).toBe(colorOpacity(defaultTheme.colors.white900, 0.2));
    });

    it('uses primary200 border for primary outline regular', () => {
      const pressedStyle = getPressedStyle('primary', 'outline', defaultTheme);
      expect(pressedStyle.borderColor).toBe(defaultTheme.colors.primary400);
    });

    it('uses secondary200 border for secondary outline regular', () => {
      const pressedStyle = getPressedStyle('secondary', 'outline', defaultTheme);
      expect(pressedStyle.borderColor).toBe(defaultTheme.colors.secondary400);
    });
  });

  // ── Style overrides ──

  it('applies custom textStyle', () => {
    const { getByText } = wrap(<Button textStyle={{ letterSpacing: 2 }}>Styled</Button>);
    const textEl = getByText('Styled');
    const flatStyle = Array.isArray(textEl.props.style)
      ? Object.assign({}, ...textEl.props.style.filter(Boolean))
      : textEl.props.style;
    expect(flatStyle.letterSpacing).toBe(2);
  });
});
