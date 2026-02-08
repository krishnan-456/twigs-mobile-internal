import { defaultTheme } from '../theme';

describe('defaultTheme', () => {
  describe('colors', () => {
    it('has primary500 as a hex string', () => {
      expect(defaultTheme.colors.primary500).toBe('#00828D');
    });

    it('has all black scale tokens as hex strings with alpha', () => {
      expect(defaultTheme.colors.black50).toBe('#0000000A');
      expect(defaultTheme.colors.black900).toBe('#000000');
    });

    it('has white900 as pure white', () => {
      expect(defaultTheme.colors.white900).toBe('#FFFFFF');
    });
  });

  describe('space', () => {
    it('has numeric values (dp, not strings)', () => {
      expect(typeof defaultTheme.space['1']).toBe('number');
      expect(defaultTheme.space['1']).toBe(2);
      expect(defaultTheme.space['8']).toBe(16);
      expect(defaultTheme.space['50']).toBe(100);
    });
  });

  describe('fontSizes', () => {
    it('has numeric values (dp)', () => {
      expect(typeof defaultTheme.fontSizes.md).toBe('number');
      expect(defaultTheme.fontSizes.md).toBe(16);
      expect(defaultTheme.fontSizes.xxs).toBe(10);
    });
  });

  describe('lineHeights', () => {
    it('has numeric values (dp)', () => {
      expect(typeof defaultTheme.lineHeights.md).toBe('number');
      expect(defaultTheme.lineHeights.md).toBe(24);
    });
  });

  describe('radii', () => {
    it('has numeric values (dp)', () => {
      expect(defaultTheme.radii.none).toBe(0);
      expect(defaultTheme.radii.round).toBe(9999);
      expect(defaultTheme.radii.pill).toBe(9999);
      expect(typeof defaultTheme.radii.md).toBe('number');
    });
  });

  describe('borderWidths', () => {
    it('has numeric values (dp)', () => {
      expect(defaultTheme.borderWidths.xs).toBe(1);
      expect(defaultTheme.borderWidths.xl).toBe(5);
    });
  });

  describe('transitions', () => {
    it('has numeric values (ms)', () => {
      expect(defaultTheme.transitions['1']).toBe(100);
      expect(defaultTheme.transitions['3']).toBe(300);
    });
  });

  describe('fonts', () => {
    it('defaults to System font', () => {
      expect(defaultTheme.fonts.regular).toBe('System');
      expect(defaultTheme.fonts.medium).toBe('System');
      expect(defaultTheme.fonts.bold).toBe('System');
    });
  });

  describe('fontWeights', () => {
    it('are string values (RN requirement)', () => {
      expect(typeof defaultTheme.fontWeights['4']).toBe('string');
      expect(defaultTheme.fontWeights['7']).toBe('700');
    });
  });
});
