import { defaultTheme } from '../theme';
import { getSizeStyles, getButtonTextStyles, getLoadingSpinnerColor } from '../button/helpers';

describe('Button helpers', () => {
  const theme = defaultTheme;

  describe('getSizeStyles', () => {
    it('returns correct height for sm size', () => {
      const styles = getSizeStyles('sm', false);
      expect(styles.height).toBe(24);
      expect(styles.borderRadius).toBe(4);
    });

    it('returns width for icon mode', () => {
      const styles = getSizeStyles('md', true);
      expect(styles.width).toBe(32);
      expect(styles.height).toBe(32);
    });

    it('does not set width for non-icon mode', () => {
      const styles = getSizeStyles('md', false);
      expect(styles.width).toBeUndefined();
    });

    it('returns correct values for 2xl size', () => {
      const styles = getSizeStyles('2xl', false);
      expect(styles.height).toBe(64);
      expect(styles.borderRadius).toBe(16);
    });
  });

  describe('getButtonTextStyles', () => {
    it('returns correct fontSize for sm', () => {
      const textStyles = getButtonTextStyles({ size: 'sm', color: 'primary', variant: 'solid', theme });
      expect(textStyles.fontSize).toBe(14);
    });

    it('uses white text for solid primary', () => {
      const textStyles = getButtonTextStyles({ size: 'md', color: 'primary', variant: 'solid', theme });
      expect(textStyles.color).toBe(theme.colors.white900);
    });

    it('uses primary500 text for ghost primary', () => {
      const textStyles = getButtonTextStyles({ size: 'md', color: 'primary', variant: 'ghost', theme });
      expect(textStyles.color).toBe(theme.colors.primary500);
    });
  });

  describe('getLoadingSpinnerColor', () => {
    it('returns white for solid variant (non-default color)', () => {
      expect(getLoadingSpinnerColor('primary', 'solid', theme)).toBe(theme.colors.white900);
      expect(getLoadingSpinnerColor('negative', 'solid', theme)).toBe(theme.colors.white900);
    });

    it('returns color-specific value for default solid', () => {
      expect(getLoadingSpinnerColor('default', 'solid', theme)).toBe(theme.colors.secondary600);
    });

    it('returns primary500 for ghost primary', () => {
      expect(getLoadingSpinnerColor('primary', 'ghost', theme)).toBe(theme.colors.primary500);
    });
  });
});
