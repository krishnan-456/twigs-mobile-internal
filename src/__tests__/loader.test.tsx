import React from 'react';
import { render } from '@testing-library/react-native';
import { LineLoader, CircleLoader } from '../loader';
import { TwigsProvider } from '../context';
import { LINE_LOADER_DIMENSIONS, CIRCLE_LOADER_DIAMETERS } from '../loader/constants';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

// ════════════════════════════════════════════════════════════════
// LineLoader
// ════════════════════════════════════════════════════════════════

describe('LineLoader', () => {
  // ── Render ──

  it('renders without crashing with defaults', () => {
    const tree = wrap(<LineLoader />);
    expect(tree.toJSON()).toBeTruthy();
  });

  // ── Variants: sizes ──

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const tree = wrap(<LineLoader size={size} />);
        const root = tree.toJSON() as any;
        const flatStyle = Array.isArray(root.props.style)
          ? Object.assign({}, ...root.props.style.filter(Boolean))
          : root.props.style;
        const expected = LINE_LOADER_DIMENSIONS[size];
        expect(flatStyle.width).toBe(expected.width);
        expect(flatStyle.height).toBe(expected.height);
      });
    });
  });

  // ── Variants: colors ──

  describe('colors', () => {
    const colors = ['primary', 'secondary', 'bright', 'negative', 'accent'] as const;

    colors.forEach((color) => {
      it(`renders with color="${color}" without crashing`, () => {
        const tree = wrap(<LineLoader color={color} />);
        expect(tree.toJSON()).toBeTruthy();
      });
    });
  });

  // ── Accessibility ──

  it('has accessibilityRole="progressbar"', () => {
    const tree = wrap(<LineLoader />);
    const root = tree.toJSON() as any;
    expect(root.props.accessibilityRole).toBe('progressbar');
  });

  it('has accessible=true', () => {
    const tree = wrap(<LineLoader />);
    const root = tree.toJSON() as any;
    expect(root.props.accessible).toBe(true);
  });

  // ── Style overrides ──

  it('applies css prop', () => {
    const tree = wrap(<LineLoader css={{ marginTop: 10 }} />);
    const root = tree.toJSON() as any;
    const flatStyle = Array.isArray(root.props.style)
      ? Object.assign({}, ...root.props.style.filter(Boolean))
      : root.props.style;
    expect(flatStyle.marginTop).toBe(10);
  });

  it('applies style prop', () => {
    const tree = wrap(<LineLoader style={{ opacity: 0.5 }} />);
    const root = tree.toJSON() as any;
    const flatStyle = Array.isArray(root.props.style)
      ? Object.assign({}, ...root.props.style.filter(Boolean))
      : root.props.style;
    expect(flatStyle.opacity).toBe(0.5);
  });

  // ── State transitions ──

  it('updates dimensions when size changes via rerender', () => {
    const { toJSON, rerender } = wrap(<LineLoader size="sm" />);
    const rootBefore = toJSON() as any;
    const styleBefore = Array.isArray(rootBefore.props.style)
      ? Object.assign({}, ...rootBefore.props.style.filter(Boolean))
      : rootBefore.props.style;
    expect(styleBefore.height).toBe(LINE_LOADER_DIMENSIONS.sm.height);

    rerender(
      <TwigsProvider>
        <LineLoader size="xl" />
      </TwigsProvider>
    );
    const rootAfter = toJSON() as any;
    const styleAfter = Array.isArray(rootAfter.props.style)
      ? Object.assign({}, ...rootAfter.props.style.filter(Boolean))
      : rootAfter.props.style;
    expect(styleAfter.height).toBe(LINE_LOADER_DIMENSIONS.xl.height);
  });
});

// ════════════════════════════════════════════════════════════════
// CircleLoader
// ════════════════════════════════════════════════════════════════

describe('CircleLoader', () => {
  // ── Render ──

  it('renders without crashing with defaults', () => {
    const tree = wrap(<CircleLoader />);
    expect(tree.toJSON()).toBeTruthy();
  });

  // ── Variants: sizes ──

  describe('sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const tree = wrap(<CircleLoader size={size} />);
        const root = tree.toJSON() as any;
        const flatStyle = Array.isArray(root.props.style)
          ? Object.assign({}, ...root.props.style.filter(Boolean))
          : root.props.style;
        const expected = CIRCLE_LOADER_DIAMETERS[size];
        expect(flatStyle.width).toBe(expected);
        expect(flatStyle.height).toBe(expected);
      });
    });
  });

  // ── Variants: colors ──

  describe('colors', () => {
    const colors = ['primary', 'secondary', 'bright', 'negative', 'accent'] as const;

    colors.forEach((color) => {
      it(`renders with color="${color}" without crashing`, () => {
        const tree = wrap(<CircleLoader color={color} />);
        expect(tree.toJSON()).toBeTruthy();
      });
    });
  });

  // ── Accessibility ──

  it('has accessibilityRole="progressbar"', () => {
    const tree = wrap(<CircleLoader />);
    const root = tree.toJSON() as any;
    expect(root.props.accessibilityRole).toBe('progressbar');
  });

  it('has accessible=true', () => {
    const tree = wrap(<CircleLoader />);
    const root = tree.toJSON() as any;
    expect(root.props.accessible).toBe(true);
  });

  // ── Style overrides ──

  it('applies css prop', () => {
    const tree = wrap(<CircleLoader css={{ marginTop: 20 }} />);
    const root = tree.toJSON() as any;
    const flatStyle = Array.isArray(root.props.style)
      ? Object.assign({}, ...root.props.style.filter(Boolean))
      : root.props.style;
    expect(flatStyle.marginTop).toBe(20);
  });

  it('applies style prop', () => {
    const tree = wrap(<CircleLoader style={{ opacity: 0.8 }} />);
    const root = tree.toJSON() as any;
    const flatStyle = Array.isArray(root.props.style)
      ? Object.assign({}, ...root.props.style.filter(Boolean))
      : root.props.style;
    expect(flatStyle.opacity).toBe(0.8);
  });

  // ── State transitions ──

  it('updates diameter when size changes via rerender', () => {
    const { toJSON, rerender } = wrap(<CircleLoader size="sm" />);
    const rootBefore = toJSON() as any;
    const styleBefore = Array.isArray(rootBefore.props.style)
      ? Object.assign({}, ...rootBefore.props.style.filter(Boolean))
      : rootBefore.props.style;
    expect(styleBefore.width).toBe(CIRCLE_LOADER_DIAMETERS.sm);

    rerender(
      <TwigsProvider>
        <CircleLoader size="2xl" />
      </TwigsProvider>
    );
    const rootAfter = toJSON() as any;
    const styleAfter = Array.isArray(rootAfter.props.style)
      ? Object.assign({}, ...rootAfter.props.style.filter(Boolean))
      : rootAfter.props.style;
    expect(styleAfter.width).toBe(CIRCLE_LOADER_DIAMETERS['2xl']);
  });
});
