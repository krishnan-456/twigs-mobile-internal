import React from 'react';
import { render } from '@testing-library/react-native';
import { Separator } from '../separator';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

describe('Separator', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByTestId } = wrap(<Separator testID="separator" />);
    expect(getByTestId('separator')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = wrap(<Separator testID="custom-separator" />);
    expect(getByTestId('custom-separator')).toBeTruthy();
  });

  // ── Variants ──

  describe('orientation', () => {
    it('renders horizontal separator by default', () => {
      const { getByTestId } = wrap(<Separator testID="sep" />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.height).toBe(1);
      expect(flatStyle.width).toBe('100%');
    });

    it('renders horizontal separator when orientation="horizontal"', () => {
      const { getByTestId } = wrap(<Separator testID="sep" orientation="horizontal" />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.height).toBe(1);
      expect(flatStyle.width).toBe('100%');
    });

    it('renders vertical separator when orientation="vertical"', () => {
      const { getByTestId } = wrap(<Separator testID="sep" orientation="vertical" />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.width).toBe(1);
      expect(flatStyle.height).toBe('100%');
    });
  });

  describe('color', () => {
    it('uses default color from theme when color prop is not provided', () => {
      const { getByTestId } = wrap(<Separator testID="sep" />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      // Theme color should be applied (we can't check exact value without theme access, but we verify it's set)
      expect(flatStyle.backgroundColor).toBeDefined();
    });

    it('applies custom color prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" color="#FF0000" />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.backgroundColor).toBe('#FF0000');
    });

    it('custom color overrides default theme color', () => {
      const { getByTestId } = wrap(<Separator testID="sep" color="#00FF00" />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.backgroundColor).toBe('#00FF00');
    });
  });

  // ── Accessibility ──

  describe('accessibility', () => {
    it('has accessible behavior when decorative={false} (default)', () => {
      const { getByTestId } = wrap(<Separator testID="sep" />);
      const separator = getByTestId('sep');
      // accessible should be passed through (undefined by default, but can be set)
      expect(separator.props.accessibilityRole).toBe('none');
    });

    it('forwards accessible prop when not decorative', () => {
      const { getByTestId } = wrap(<Separator testID="sep" accessible />);
      const separator = getByTestId('sep');
      expect(separator.props.accessible).toBe(true);
      expect(separator.props.accessibilityRole).toBe('none');
    });

    it('hides from assistive tech when decorative={true}', () => {
      const { toJSON } = wrap(<Separator testID="sep" decorative />);
      const separator = toJSON() as any;
      expect(separator.props.accessible).toBe(false);
      expect(separator.props.accessibilityElementsHidden).toBe(true);
      expect(separator.props.importantForAccessibility).toBe('no-hide-descendants');
      expect(separator.props.accessibilityRole).toBeUndefined();
    });

    it('forwards accessibilityLabel when not decorative', () => {
      const { getByTestId } = wrap(<Separator testID="sep" accessibilityLabel="Section divider" />);
      const separator = getByTestId('sep');
      expect(separator.props.accessibilityLabel).toBe('Section divider');
    });

    it('does not forward accessibilityLabel when decorative', () => {
      const { toJSON } = wrap(
        <Separator testID="sep" decorative accessibilityLabel="Section divider" />
      );
      const separator = toJSON() as any;
      expect(separator.props.accessibilityLabel).toBeUndefined();
    });

    it('forwards accessibilityHint when not decorative', () => {
      const { getByTestId } = wrap(
        <Separator testID="sep" accessibilityHint="Separates content sections" />
      );
      const separator = getByTestId('sep');
      expect(separator.props.accessibilityHint).toBe('Separates content sections');
    });

    it('does not forward accessibilityHint when decorative', () => {
      const { toJSON } = wrap(
        <Separator testID="sep" decorative accessibilityHint="Separates content sections" />
      );
      const separator = toJSON() as any;
      expect(separator.props.accessibilityHint).toBeUndefined();
    });

    it('forwards accessibilityState when not decorative', () => {
      const { getByTestId } = wrap(
        <Separator testID="sep" accessibilityState={{ disabled: false }} />
      );
      const separator = getByTestId('sep');
      expect(separator.props.accessibilityState).toEqual({ disabled: false });
    });

    it('does not forward accessibilityState when decorative', () => {
      const { toJSON } = wrap(
        <Separator testID="sep" decorative accessibilityState={{ disabled: false }} />
      );
      const separator = toJSON() as any;
      expect(separator.props.accessibilityState).toBeUndefined();
    });

    it('transitions from non-decorative to decorative via rerender', () => {
      const { getByTestId, rerender, toJSON } = wrap(<Separator testID="sep" />);
      const separatorBefore = getByTestId('sep');
      expect(separatorBefore.props.accessibilityRole).toBe('none');
      expect(separatorBefore.props.accessible).toBeUndefined();

      rerender(
        <TwigsProvider>
          <Separator testID="sep" decorative />
        </TwigsProvider>
      );
      const separatorAfter = toJSON() as any;
      expect(separatorAfter.props.accessible).toBe(false);
      expect(separatorAfter.props.accessibilityElementsHidden).toBe(true);
      expect(separatorAfter.props.importantForAccessibility).toBe('no-hide-descendants');
    });
  });

  // ── Style ──

  describe('style props', () => {
    it('applies css prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" css={{ opacity: 0.5 }} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.opacity).toBe(0.5);
    });

    it('applies style prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" style={{ opacity: 0.7 }} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.opacity).toBe(0.7);
    });

    it('style prop overrides css prop (applied last)', () => {
      const { getByTestId } = wrap(
        <Separator testID="sep" css={{ opacity: 0.5 }} style={{ opacity: 0.9 }} />
      );
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.opacity).toBe(0.9);
    });

    it('applies both css and style props together', () => {
      const { getByTestId } = wrap(
        <Separator testID="sep" css={{ opacity: 0.5 }} style={{ borderRadius: 4 }} />
      );
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.opacity).toBe(0.5);
      expect(flatStyle.borderRadius).toBe(4);
    });
  });

  describe('margin props', () => {
    it('applies margin prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" margin={10} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginTop).toBe(10);
      expect(flatStyle.marginBottom).toBe(10);
      expect(flatStyle.marginLeft).toBe(10);
      expect(flatStyle.marginRight).toBe(10);
    });

    it('applies marginTop prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" marginTop={12} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginTop).toBe(12);
    });

    it('applies marginBottom prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" marginBottom={8} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginBottom).toBe(8);
    });

    it('applies marginLeft prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" marginLeft={6} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginLeft).toBe(6);
    });

    it('applies marginRight prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" marginRight={14} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginRight).toBe(14);
    });

    it('applies marginHorizontal prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" marginHorizontal={16} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginLeft).toBe(16);
      expect(flatStyle.marginRight).toBe(16);
    });

    it('applies marginVertical prop', () => {
      const { getByTestId } = wrap(<Separator testID="sep" marginVertical={20} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginTop).toBe(20);
      expect(flatStyle.marginBottom).toBe(20);
    });

    it('individual margin props take precedence over margin', () => {
      const { getByTestId } = wrap(<Separator testID="sep" margin={10} marginTop={20} />);
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginTop).toBe(20);
      expect(flatStyle.marginBottom).toBe(10);
      expect(flatStyle.marginLeft).toBe(10);
      expect(flatStyle.marginRight).toBe(10);
    });

    it('individual margin props take precedence over horizontal/vertical', () => {
      const { getByTestId } = wrap(
        <Separator
          testID="sep"
          marginVertical={8}
          marginTop={12}
          marginHorizontal={6}
          marginLeft={4}
        />
      );
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginTop).toBe(12);
      expect(flatStyle.marginBottom).toBe(8);
      expect(flatStyle.marginLeft).toBe(4);
      expect(flatStyle.marginRight).toBe(6);
    });
  });

  // ── Edge cases ──

  describe('edge cases', () => {
    it('explicit accessible={false} is respected when not decorative', () => {
      const { getByTestId } = wrap(<Separator testID="sep" accessible={false} />);
      const separator = getByTestId('sep');
      expect(separator.props.accessible).toBe(false);
      expect(separator.props.accessibilityRole).toBe('none');
    });

    it('all margin props work together', () => {
      const { getByTestId } = wrap(
        <Separator testID="sep" marginTop={1} marginBottom={2} marginLeft={3} marginRight={4} />
      );
      const separator = getByTestId('sep');
      const flatStyle = Array.isArray(separator.props.style)
        ? Object.assign({}, ...separator.props.style.filter(Boolean))
        : separator.props.style;
      expect(flatStyle.marginTop).toBe(1);
      expect(flatStyle.marginBottom).toBe(2);
      expect(flatStyle.marginLeft).toBe(3);
      expect(flatStyle.marginRight).toBe(4);
    });

    it('orientation change via rerender updates dimensions', () => {
      const { getByTestId, rerender } = wrap(<Separator testID="sep" orientation="horizontal" />);
      const separatorBefore = getByTestId('sep');
      const styleBefore = Array.isArray(separatorBefore.props.style)
        ? Object.assign({}, ...separatorBefore.props.style.filter(Boolean))
        : separatorBefore.props.style;
      expect(styleBefore.height).toBe(1);
      expect(styleBefore.width).toBe('100%');

      rerender(
        <TwigsProvider>
          <Separator testID="sep" orientation="vertical" />
        </TwigsProvider>
      );
      const separatorAfter = getByTestId('sep');
      const styleAfter = Array.isArray(separatorAfter.props.style)
        ? Object.assign({}, ...separatorAfter.props.style.filter(Boolean))
        : separatorAfter.props.style;
      expect(styleAfter.width).toBe(1);
      expect(styleAfter.height).toBe('100%');
    });

    it('color change via rerender updates backgroundColor', () => {
      const { getByTestId, rerender } = wrap(<Separator testID="sep" color="#FF0000" />);
      const separatorBefore = getByTestId('sep');
      const styleBefore = Array.isArray(separatorBefore.props.style)
        ? Object.assign({}, ...separatorBefore.props.style.filter(Boolean))
        : separatorBefore.props.style;
      expect(styleBefore.backgroundColor).toBe('#FF0000');

      rerender(
        <TwigsProvider>
          <Separator testID="sep" color="#00FF00" />
        </TwigsProvider>
      );
      const separatorAfter = getByTestId('sep');
      const styleAfter = Array.isArray(separatorAfter.props.style)
        ? Object.assign({}, ...separatorAfter.props.style.filter(Boolean))
        : separatorAfter.props.style;
      expect(styleAfter.backgroundColor).toBe('#00FF00');
    });
  });
});
