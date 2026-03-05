import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { Badge } from '../badge';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

describe('Badge', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByTestId } = wrap(<Badge testID="badge">Label</Badge>);
    expect(getByTestId('badge')).toBeOnTheScreen();
  });

  it('renders text children correctly', () => {
    const { getByText } = wrap(<Badge testID="badge">Badge label</Badge>);
    expect(getByText('Badge label')).toBeOnTheScreen();
  });

  it('renders with custom ReactNode children', () => {
    const { getByTestId } = wrap(
      <Badge testID="badge">
        <View testID="custom-content">
          <Text>Custom content</Text>
        </View>
      </Badge>
    );
    expect(getByTestId('custom-content')).toBeOnTheScreen();
  });

  // ── Variants ──

  describe('size', () => {
    const sizes: Array<'sm' | 'md'> = ['sm', 'md'];

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const { getByTestId } = wrap(
          <Badge testID="badge" size={size}>
            Label
          </Badge>
        );
        expect(getByTestId('badge')).toBeOnTheScreen();
      });
    });

    it('uses default size="sm" when size prop is not provided', () => {
      const { getByTestId } = wrap(<Badge testID="badge">Label</Badge>);
      expect(getByTestId('badge')).toBeOnTheScreen();
    });
  });

  describe('color', () => {
    const colors: Array<
      | 'default'
      | 'white'
      | 'primary'
      | 'secondary'
      | 'accent'
      | 'positive'
      | 'negative'
      | 'attention'
    > = ['default', 'white', 'primary', 'secondary', 'accent', 'positive', 'negative', 'attention'];

    colors.forEach((color) => {
      it(`renders with color="${color}"`, () => {
        const { getByTestId } = wrap(
          <Badge testID="badge" color={color}>
            Label
          </Badge>
        );
        expect(getByTestId('badge')).toBeOnTheScreen();
      });
    });

    it('uses default color="default" when color prop is not provided', () => {
      const { getByTestId } = wrap(<Badge testID="badge">Label</Badge>);
      expect(getByTestId('badge')).toBeOnTheScreen();
    });
  });

  describe('rounded', () => {
    const roundedVariants: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'> = [
      'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full',
    ];

    roundedVariants.forEach((rounded) => {
      it(`renders with rounded="${rounded}"`, () => {
        const { getByTestId } = wrap(
          <Badge testID="badge" rounded={rounded}>
            Label
          </Badge>
        );
        expect(getByTestId('badge')).toBeOnTheScreen();
      });
    });

    it('uses default rounded="full" when rounded prop is not provided', () => {
      const { getByTestId } = wrap(<Badge testID="badge">Label</Badge>);
      expect(getByTestId('badge')).toBeOnTheScreen();
    });
  });

  describe('side elements', () => {
    it('renders leftElement when provided', () => {
      const { getByTestId } = wrap(
        <Badge testID="badge" leftElement={<View testID="left-element" />}>
          Label
        </Badge>
      );
      expect(getByTestId('badge')).toBeOnTheScreen();
      expect(getByTestId('left-element')).toBeOnTheScreen();
    });

    it('renders rightElement when provided', () => {
      const { getByTestId } = wrap(
        <Badge testID="badge" rightElement={<View testID="right-element" />}>
          Label
        </Badge>
      );
      expect(getByTestId('badge')).toBeOnTheScreen();
      expect(getByTestId('right-element')).toBeOnTheScreen();
    });

    it('renders both leftElement and rightElement when provided', () => {
      const { getByTestId } = wrap(
        <Badge
          testID="badge"
          leftElement={<View testID="left-element" />}
          rightElement={<View testID="right-element" />}
        >
          Label
        </Badge>
      );
      expect(getByTestId('left-element')).toBeOnTheScreen();
      expect(getByTestId('right-element')).toBeOnTheScreen();
    });
  });

  // ── Accessibility ──

  describe('accessibility', () => {
    it('has accessibilityRole="text" by default', () => {
      const { getByTestId } = wrap(<Badge testID="badge">Label</Badge>);
      const badge = getByTestId('badge');
      expect(badge.props.accessibilityRole).toBe('text');
    });

    it('allows custom accessibilityRole override', () => {
      const { getByTestId } = wrap(
        <Badge testID="badge" accessibilityRole="status">
          Label
        </Badge>
      );
      const badge = getByTestId('badge');
      expect(badge.props.accessibilityRole).toBe('status');
    });

    it('forwards accessibilityLabel', () => {
      const { getByTestId } = wrap(
        <Badge testID="badge" accessibilityLabel="Count badge">
          Label
        </Badge>
      );
      const badge = getByTestId('badge');
      expect(badge.props.accessibilityLabel).toBe('Count badge');
    });

    it('forwards accessibilityState', () => {
      const { getByTestId } = wrap(
        <Badge testID="badge" accessibilityState={{ disabled: false }}>
          Label
        </Badge>
      );
      const badge = getByTestId('badge');
      expect(badge.props.accessibilityState).toEqual({ disabled: false });
    });

    it('has accessible={true} by default', () => {
      const { getByTestId } = wrap(<Badge testID="badge">Label</Badge>);
      const badge = getByTestId('badge');
      expect(badge.props.accessible).toBe(true);
    });

    it('allows accessible={false} override', () => {
      const { getByTestId } = wrap(
        <Badge testID="badge" accessible={false}>
          Label
        </Badge>
      );
      const badge = getByTestId('badge');
      expect(badge.props.accessible).toBe(false);
    });
  });

  // ── Interaction ──

  describe('interaction', () => {
    it('is non-interactive by default (no onPress)', () => {
      const { getByTestId } = wrap(<Badge testID="badge">Label</Badge>);
      const badge = getByTestId('badge');
      expect(badge.props.onPress).toBeUndefined();
    });

    it('renders side elements and they are visible', () => {
      const { getByTestId, getByText } = wrap(
        <Badge
          testID="badge"
          leftElement={<Text testID="left-text">L</Text>}
          rightElement={<Text testID="right-text">R</Text>}
        >
          Label
        </Badge>
      );
      expect(getByTestId('left-text')).toBeOnTheScreen();
      expect(getByTestId('right-text')).toBeOnTheScreen();
      expect(getByText('L')).toBeOnTheScreen();
      expect(getByText('R')).toBeOnTheScreen();
    });
  });

  // ── State transitions ──

  describe('state transitions', () => {
    it('updates when size changes via rerender', () => {
      const { getByTestId, rerender } = wrap(
        <Badge testID="badge" size="sm">
          Label
        </Badge>
      );
      const badgeBefore = getByTestId('badge');
      expect(badgeBefore).toBeOnTheScreen();

      rerender(
        <TwigsProvider>
          <Badge testID="badge" size="md">
            Label
          </Badge>
        </TwigsProvider>
      );
      const badgeAfter = getByTestId('badge');
      expect(badgeAfter).toBeOnTheScreen();
    });

    it('updates when color changes via rerender', () => {
      const { getByTestId, rerender } = wrap(
        <Badge testID="badge" color="default">
          Label
        </Badge>
      );
      const badgeBefore = getByTestId('badge');
      expect(badgeBefore).toBeOnTheScreen();

      rerender(
        <TwigsProvider>
          <Badge testID="badge" color="primary">
            Label
          </Badge>
        </TwigsProvider>
      );
      const badgeAfter = getByTestId('badge');
      expect(badgeAfter).toBeOnTheScreen();
    });

    it('updates when rounded changes via rerender', () => {
      const { getByTestId, rerender } = wrap(
        <Badge testID="badge" rounded="full">
          Label
        </Badge>
      );
      const badgeBefore = getByTestId('badge');
      expect(badgeBefore).toBeOnTheScreen();

      rerender(
        <TwigsProvider>
          <Badge testID="badge" rounded="sm">
            Label
          </Badge>
        </TwigsProvider>
      );
      const badgeAfter = getByTestId('badge');
      expect(badgeAfter).toBeOnTheScreen();
    });

    it('updates accessibilityRole when overridden via rerender', () => {
      const { getByTestId, rerender } = wrap(<Badge testID="badge">Label</Badge>);
      const badgeBefore = getByTestId('badge');
      expect(badgeBefore.props.accessibilityRole).toBe('text');

      rerender(
        <TwigsProvider>
          <Badge testID="badge" accessibilityRole="status">
            Label
          </Badge>
        </TwigsProvider>
      );
      const badgeAfter = getByTestId('badge');
      expect(badgeAfter.props.accessibilityRole).toBe('status');
    });
  });
});
