import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { TwigsProvider, useTheme } from '../context';
import { defaultTheme } from '../theme';

function ThemeConsumer({ testID = 'consumer' }: { testID?: string }) {
  const theme = useTheme();
  return <Text testID={testID}>{`${theme.colors.primary500}|${theme.fontSizes.md}`}</Text>;
}

describe('Context', () => {
  // ── TwigsProvider ──

  describe('TwigsProvider', () => {
    it('renders children', () => {
      const { getByText } = render(
        <TwigsProvider>
          <Text>Child</Text>
        </TwigsProvider>
      );
      expect(getByText('Child')).toBeTruthy();
    });

    it('provides default theme when no custom theme passed', () => {
      const { getByTestId } = render(
        <TwigsProvider>
          <ThemeConsumer testID="theme-consumer" />
        </TwigsProvider>
      );
      const text = getByTestId('theme-consumer').props.children;
      expect(text).toBe(`${defaultTheme.colors.primary500}|${defaultTheme.fontSizes.md}`);
    });
  });

  // ── useTheme ──

  describe('useTheme', () => {
    it('returns default theme when used outside provider', () => {
      const { getByTestId } = render(<ThemeConsumer testID="outside" />);
      const text = getByTestId('outside').props.children;
      expect(text).toBe(`${defaultTheme.colors.primary500}|${defaultTheme.fontSizes.md}`);
    });

    it('returns merged theme when custom theme is passed', () => {
      const customPrimary = '#FF0000';
      const { getByTestId } = render(
        <TwigsProvider theme={{ colors: { primary500: customPrimary } }}>
          <ThemeConsumer testID="custom" />
        </TwigsProvider>
      );
      const text = getByTestId('custom').props.children;
      expect(text).toContain(customPrimary);
      expect(text).toContain('16');
    });
  });

  // ── Deep merge ──

  describe('Deep merge', () => {
    it('custom theme partially overrides colors while keeping other tokens', () => {
      const customPrimary = '#123456';
      const { getByTestId } = render(
        <TwigsProvider theme={{ colors: { primary500: customPrimary } }}>
          <ThemeConsumer testID="partial" />
        </TwigsProvider>
      );
      const text = getByTestId('partial').props.children;
      expect(text).toContain(customPrimary);
      expect(text).toContain(String(defaultTheme.fontSizes.md));
    });

    it('nested overrides work (override only primary500 keeps all other colors)', () => {
      const customPrimary = '#ABCDEF';
      function FullThemeConsumer() {
        const theme = useTheme();
        return (
          <Text testID="full">{`${theme.colors.primary500}|${theme.colors.neutral200}|${theme.colors.secondary500}`}</Text>
        );
      }
      const { getByTestId } = render(
        <TwigsProvider theme={{ colors: { primary500: customPrimary } }}>
          <FullThemeConsumer />
        </TwigsProvider>
      );
      const text = getByTestId('full').props.children;
      expect(text).toContain(customPrimary);
      expect(text).toContain(defaultTheme.colors.neutral200);
      expect(text).toContain(defaultTheme.colors.secondary500);
    });
  });

  // ── Theme context update ──

  describe('Theme context update', () => {
    it('rerendering with different theme updates context values', () => {
      const firstPrimary = '#111111';
      const secondPrimary = '#222222';
      const { getByTestId, rerender } = render(
        <TwigsProvider theme={{ colors: { primary500: firstPrimary } }}>
          <ThemeConsumer testID="rerender" />
        </TwigsProvider>
      );
      expect(getByTestId('rerender').props.children).toContain(firstPrimary);

      rerender(
        <TwigsProvider theme={{ colors: { primary500: secondPrimary } }}>
          <ThemeConsumer testID="rerender" />
        </TwigsProvider>
      );
      expect(getByTestId('rerender').props.children).toContain(secondPrimary);
    });
  });
});
