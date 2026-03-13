import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { IconButton } from '../icon-button';
import { TwigsProvider } from '../context';
import { defaultTheme } from '../theme';
import { colorOpacity } from '../utils';
import {
  getIconButtonStyles,
  getIconButtonPressedStyles,
  getIconColor,
  getIconSize,
  getLoaderColor,
  getLineLoaderSize,
  getCircleLoaderSize,
} from '../icon-button/helpers';
import { wrap } from './test-utils';

const flattenPressableStyle = (
  el: ReturnType<ReturnType<typeof wrap>['getByRole']>,
  pressed = false
) => {
  const raw =
    typeof el.props.style === 'function'
      ? el.props.style({ pressed })
      : el.props.style;
  return Array.isArray(raw)
    ? Object.assign({}, ...raw.filter(Boolean))
    : raw;
};

describe('IconButton', () => {
  // ── Render ──

  it('has displayName "IconButton"', () => {
    expect(IconButton.displayName).toBe('IconButton');
  });

  it('renders without crashing', () => {
    const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders the icon element', () => {
    const { getByTestId } = wrap(
      <IconButton icon={<Text testID="icon">+</Text>} />
    );
    expect(getByTestId('icon')).toBeTruthy();
  });

  it('renders all size+color+variant combinations without crashing', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
    const colors = ['default', 'primary', 'secondary', 'light', 'error'] as const;
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

  // ── Sizes ──

  describe('sizes', () => {
    const expected: Record<string, { container: number; icon: number; radius: number }> = {
      sm: { container: 24, icon: 16, radius: 4 },
      md: { container: 32, icon: 16, radius: 8 },
      lg: { container: 40, icon: 20, radius: 8 },
      xl: { container: 48, icon: 24, radius: 12 },
      '2xl': { container: 56, icon: 32, radius: 16 },
    };

    Object.entries(expected).forEach(([size, spec]) => {
      it(`size="${size}" has ${spec.container}dp container and ${spec.icon}dp icon`, () => {
        const { getByRole, getByTestId } = wrap(
          <IconButton
            icon={<Text testID="icon">+</Text>}
            size={size as any}
            rounded="sm"
          />
        );
        const btn = getByRole('button');
        const flat = flattenPressableStyle(btn);
        expect(flat.width).toBe(spec.container);
        expect(flat.height).toBe(spec.container);

        const iconEl = getByTestId('icon');
        expect(iconEl.props.size).toBe(spec.icon);
      });
    });
  });

  // ── Variants ──

  describe('variants', () => {
    (['solid', 'ghost', 'outline'] as const).forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        const { getByRole } = wrap(
          <IconButton icon={<Text>+</Text>} variant={variant} />
        );
        expect(getByRole('button')).toBeTruthy();
      });
    });
  });

  // ── Colors ──

  describe('colors', () => {
    (['default', 'primary', 'secondary', 'light', 'error'] as const).forEach(
      (color) => {
        it(`renders with color="${color}"`, () => {
          const { getByRole } = wrap(
            <IconButton icon={<Text>+</Text>} color={color} />
          );
          expect(getByRole('button')).toBeTruthy();
        });
      }
    );
  });

  // ── Rounded radius ──

  describe('rounded', () => {
    const roundedCases: [string, number][] = [
      ['xs', 4],
      ['sm', 8],
      ['md', 12],
      ['lg', 16],
      ['xl', 20],
      ['2xl', 24],
      ['3xl', 32],
      ['full', 9999],
    ];

    roundedCases.forEach(([rounded, expected]) => {
      it(`rounded="${rounded}" sets borderRadius ${expected}`, () => {
        const { getByRole } = wrap(
          <IconButton icon={<Text>+</Text>} rounded={rounded as any} />
        );
        const flat = flattenPressableStyle(getByRole('button'));
        expect(flat.borderRadius).toBe(expected);
      });
    });
  });

  // ── Solid variant: background colors ──

  describe('solid backgrounds', () => {
    it('primary solid has primary500 bg', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} color="primary" variant="solid" />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.backgroundColor).toBe(defaultTheme.colors.primary500);
    });

    it('secondary solid has secondary600 bg', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} color="secondary" variant="solid" />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.backgroundColor).toBe(defaultTheme.colors.secondary600);
    });

    it('error solid has negative600 bg', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} color="error" variant="solid" />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.backgroundColor).toBe(defaultTheme.colors.negative600);
    });

    it('default solid has secondary500 @ 8% bg', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} color="default" variant="solid" />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.backgroundColor).toBe(
        colorOpacity(defaultTheme.colors.secondary500, 0.08)
      );
    });
  });

  // ── Outline variant: border colors ──

  describe('outline borders', () => {
    it('primary outline has primary200 border and 1px width', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} color="primary" variant="outline" />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.borderColor).toBe(defaultTheme.colors.primary200);
      expect(flat.borderWidth).toBe(1);
    });

    it('secondary outline has secondary200 border', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} color="secondary" variant="outline" />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.borderColor).toBe(defaultTheme.colors.secondary200);
    });

    it('error outline has negative200 border', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} color="error" variant="outline" />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.borderColor).toBe(defaultTheme.colors.negative200);
    });

  });

  // ── Pressed state styles (tested via helper — Pressable resolves style at render time) ──

  describe('pressed styles (helper)', () => {
    it('primary solid pressed has primary700 bg', () => {
      const s = getIconButtonPressedStyles('primary', 'solid', defaultTheme);
      expect(s.backgroundColor).toBe(defaultTheme.colors.primary700);
    });

    it('secondary solid pressed has secondary800 bg', () => {
      const s = getIconButtonPressedStyles('secondary', 'solid', defaultTheme);
      expect(s.backgroundColor).toBe(defaultTheme.colors.secondary800);
    });

    it('error solid pressed has negative800 bg', () => {
      const s = getIconButtonPressedStyles('error', 'solid', defaultTheme);
      expect(s.backgroundColor).toBe(defaultTheme.colors.negative800);
    });

    it('default ghost pressed has rgba(black, 0.05) bg', () => {
      const s = getIconButtonPressedStyles('default', 'ghost', defaultTheme);
      expect(s.backgroundColor).toBe(
        colorOpacity(defaultTheme.colors.black900, 0.05)
      );
    });

    it('primary outline pressed has primary400 border', () => {
      const s = getIconButtonPressedStyles('primary', 'outline', defaultTheme);
      expect(s.borderColor).toBe(defaultTheme.colors.primary400);
    });

    it('secondary outline pressed has secondary400 border', () => {
      const s = getIconButtonPressedStyles('secondary', 'outline', defaultTheme);
      expect(s.borderColor).toBe(defaultTheme.colors.secondary400);
    });

    it('error outline pressed has negative400 border', () => {
      const s = getIconButtonPressedStyles('error', 'outline', defaultTheme);
      expect(s.borderColor).toBe(defaultTheme.colors.negative400);
    });
  });

  // ── Disabled state ──

  describe('disabled state', () => {
    it('applies opacity 0.4 when disabled', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} disabled />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.opacity).toBe(0.4);
    });

    it('does not apply pressed styles when disabled', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} color="primary" variant="solid" disabled />
      );
      const flat = flattenPressableStyle(getByRole('button'), true);
      expect(flat.backgroundColor).toBe(defaultTheme.colors.primary500);
    });
  });

  // ── Icon color (regular state) ──

  describe('icon colors (regular)', () => {
    const cases: [string, string, string, string][] = [
      ['primary', 'solid', 'white900', defaultTheme.colors.white900],
      ['primary', 'ghost', 'primary500', defaultTheme.colors.primary500],
      ['primary', 'outline', 'primary500', defaultTheme.colors.primary500],
      ['secondary', 'solid', 'white900', defaultTheme.colors.white900],
      ['secondary', 'ghost', 'secondary600', defaultTheme.colors.secondary600],
      ['secondary', 'outline', 'secondary500', defaultTheme.colors.secondary500],
      ['default', 'solid', 'secondary600', defaultTheme.colors.secondary600],
      ['default', 'ghost', 'neutral800', defaultTheme.colors.neutral800],
      ['error', 'solid', 'white900', defaultTheme.colors.white900],
      ['error', 'ghost', 'negative600', defaultTheme.colors.negative600],
      ['error', 'outline', 'negative600', defaultTheme.colors.negative600],
      ['light', 'solid', 'white900', defaultTheme.colors.white900],
    ];

    cases.forEach(([color, variant, label, expected]) => {
      it(`${color}+${variant} icon is ${label}`, () => {
        const { getByTestId } = wrap(
          <IconButton
            icon={<Text testID="icon">+</Text>}
            color={color as any}
            variant={variant as any}
          />
        );
        expect(getByTestId('icon').props.color).toBe(expected);
      });
    });
  });

  // ── Style override order ──

  describe('style overrides', () => {
    it('css prop overrides base styles', () => {
      const { getByRole } = wrap(
        <IconButton
          icon={<Text>+</Text>}
          css={{ backgroundColor: 'red' }}
        />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.backgroundColor).toBe('red');
    });

    it('style prop overrides css prop', () => {
      const { getByRole } = wrap(
        <IconButton
          icon={<Text>+</Text>}
          css={{ backgroundColor: 'red' }}
          style={{ backgroundColor: 'blue' }}
        />
      );
      const flat = flattenPressableStyle(getByRole('button'));
      expect(flat.backgroundColor).toBe('blue');
    });
  });

  // ── Accessibility ──

  describe('Accessibility', () => {
    it('has accessible=true and accessibilityRole="button"', () => {
      const btn = wrap(<IconButton icon={<Text>+</Text>} />).getByRole('button');
      expect(btn.props.accessible).toBe(true);
      expect(btn.props.accessibilityRole).toBe('button');
    });

    it('reflects disabled in accessibilityState', () => {
      const btn = wrap(<IconButton icon={<Text>+</Text>} disabled />).getByRole('button');
      expect(btn.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true })
      );
    });

    it('reflects loading as busy in accessibilityState', () => {
      const btn = wrap(<IconButton icon={<Text>+</Text>} loading />).getByRole('button');
      expect(btn.props.accessibilityState).toEqual(
        expect.objectContaining({ busy: true })
      );
    });

    it('defaults accessibilityLabel to "Icon button"', () => {
      const btn = wrap(<IconButton icon={<Text>+</Text>} />).getByRole('button');
      expect(btn.props.accessibilityLabel).toBe('Icon button');
    });

    it('uses explicit accessibilityLabel over default', () => {
      const btn = wrap(
        <IconButton icon={<Text>+</Text>} accessibilityLabel="Close" />
      ).getByRole('button');
      expect(btn.props.accessibilityLabel).toBe('Close');
    });
  });

  // ── Interaction ──

  describe('Interaction', () => {
    it('calls onPress when tapped', () => {
      const onPress = jest.fn();
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} onPress={onPress} />
      );
      fireEvent.press(getByRole('button'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} onPress={onPress} disabled />
      );
      fireEvent.press(getByRole('button'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('does not call onPress when loading', () => {
      const onPress = jest.fn();
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} onPress={onPress} loading />
      );
      fireEvent.press(getByRole('button'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('calls onPress multiple times on repeated taps', () => {
      const onPress = jest.fn();
      const btn = wrap(
        <IconButton icon={<Text>+</Text>} onPress={onPress} />
      ).getByRole('button');
      fireEvent.press(btn);
      fireEvent.press(btn);
      fireEvent.press(btn);
      expect(onPress).toHaveBeenCalledTimes(3);
    });
  });

  // ── State transitions ──

  describe('State transitions', () => {
    it('transitions from enabled to disabled via rerender', () => {
      const { getByRole, rerender } = wrap(<IconButton icon={<Text>+</Text>} />);
      expect(getByRole('button').props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: false })
      );

      rerender(
        <TwigsProvider>
          <IconButton icon={<Text>+</Text>} disabled />
        </TwigsProvider>
      );
      expect(getByRole('button').props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true })
      );
    });

    it('transitions from default to loading via rerender', () => {
      const { getByRole, rerender } = wrap(<IconButton icon={<Text>+</Text>} />);
      expect(getByRole('button').props.accessibilityState.busy).toBe(false);

      rerender(
        <TwigsProvider>
          <IconButton icon={<Text>+</Text>} loading />
        </TwigsProvider>
      );
      expect(getByRole('button').props.accessibilityState.busy).toBe(true);
    });
  });

  // ── Loading ──

  describe('Loading', () => {
    it('renders when loading prop is true', () => {
      const { getByRole } = wrap(<IconButton icon={<Text>+</Text>} loading />);
      expect(getByRole('button')).toBeTruthy();
    });

    it('renders with loader="circle" when loading', () => {
      const { getByRole } = wrap(
        <IconButton icon={<Text>+</Text>} loading loader="circle" />
      );
      expect(getByRole('button')).toBeTruthy();
    });

    it('renders with custom loader ReactElement when loading', () => {
      const { getByTestId } = wrap(
        <IconButton
          icon={<Text>+</Text>}
          loading
          loader={<Text testID="custom-loader">...</Text>}
        />
      );
      expect(getByTestId('custom-loader')).toBeTruthy();
    });
  });
});

// ── Pure helper unit tests ──

describe('IconButton helpers', () => {
  describe('getIconButtonStyles', () => {
    it('returns correct dimensions for each size', () => {
      const expected: Record<string, number> = {
        sm: 24, md: 32, lg: 40, xl: 48, '2xl': 56,
      };
      for (const [size, dim] of Object.entries(expected)) {
        const s = getIconButtonStyles('primary', 'solid', size as any, defaultTheme);
        expect(s.width).toBe(dim);
        expect(s.height).toBe(dim);
      }
    });

    it('includes borderWidth for outline variant', () => {
      const s = getIconButtonStyles('primary', 'outline', 'md', defaultTheme);
      expect(s.borderWidth).toBe(1);
      expect(s.borderStyle).toBe('solid');
      expect(s.borderColor).toBe(defaultTheme.colors.primary200);
    });

    it('does not include borderWidth for solid/ghost variants', () => {
      const solid = getIconButtonStyles('primary', 'solid', 'md', defaultTheme);
      const ghost = getIconButtonStyles('primary', 'ghost', 'md', defaultTheme);
      expect(solid.borderWidth).toBeUndefined();
      expect(ghost.borderWidth).toBeUndefined();
    });
  });

  describe('getIconColor', () => {
    it('returns pressed icon colors that differ from regular for ghost/outline', () => {
      const ghostReg = getIconColor('primary', 'ghost', defaultTheme, false);
      const ghostPressed = getIconColor('primary', 'ghost', defaultTheme, true);
      expect(ghostReg).toBe(defaultTheme.colors.primary500);
      expect(ghostPressed).toBe(defaultTheme.colors.primary700);
      expect(ghostReg).not.toBe(ghostPressed);
    });

    it('returns same white icon color for solid on both states', () => {
      const reg = getIconColor('primary', 'solid', defaultTheme, false);
      const pressed = getIconColor('primary', 'solid', defaultTheme, true);
      expect(reg).toBe(defaultTheme.colors.white900);
      expect(pressed).toBe(defaultTheme.colors.white900);
    });
  });

  describe('getIconSize', () => {
    it('maps each size to the correct icon dp', () => {
      expect(getIconSize('sm')).toBe(16);
      expect(getIconSize('md')).toBe(16);
      expect(getIconSize('lg')).toBe(20);
      expect(getIconSize('xl')).toBe(24);
      expect(getIconSize('2xl')).toBe(32);
    });
  });

  describe('getLoaderColor', () => {
    it('returns bright for primary+solid', () => {
      expect(getLoaderColor('primary', 'solid')).toBe('bright');
    });

    it('returns secondary for default+solid', () => {
      expect(getLoaderColor('default', 'solid')).toBe('secondary');
    });

    it('returns negative for error+ghost', () => {
      expect(getLoaderColor('error', 'ghost')).toBe('negative');
    });

    it('returns bright for light+outline', () => {
      expect(getLoaderColor('light', 'outline')).toBe('bright');
    });
  });

  describe('getLineLoaderSize', () => {
    it('returns sm for small sizes, md for large sizes', () => {
      expect(getLineLoaderSize('sm')).toBe('sm');
      expect(getLineLoaderSize('md')).toBe('sm');
      expect(getLineLoaderSize('lg')).toBe('sm');
      expect(getLineLoaderSize('xl')).toBe('md');
      expect(getLineLoaderSize('2xl')).toBe('md');
    });
  });

  describe('getCircleLoaderSize', () => {
    it('returns correct size for each button size', () => {
      expect(getCircleLoaderSize('sm')).toBe('sm');
      expect(getCircleLoaderSize('md')).toBe('sm');
      expect(getCircleLoaderSize('lg')).toBe('md');
      expect(getCircleLoaderSize('xl')).toBe('md');
      expect(getCircleLoaderSize('2xl')).toBe('lg');
    });
  });
});
