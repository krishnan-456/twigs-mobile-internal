import { defaultTheme } from '../theme';
import {
  getSizeStyles,
  getButtonTextStyles,
  getLoaderColorFromButton,
  getLineLoaderSizeFromButton,
  getCircleLoaderSizeFromButton,
} from '../button/helpers';

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
      const textStyles = getButtonTextStyles({
        size: 'sm',
        color: 'primary',
        variant: 'solid',
        theme,
      });
      expect(textStyles.fontSize).toBe(14);
    });

    it('uses white text for solid primary', () => {
      const textStyles = getButtonTextStyles({
        size: 'md',
        color: 'primary',
        variant: 'solid',
        theme,
      });
      expect(textStyles.color).toBe(theme.colors.white900);
    });

    it('uses primary500 text for ghost primary', () => {
      const textStyles = getButtonTextStyles({
        size: 'md',
        color: 'primary',
        variant: 'ghost',
        theme,
      });
      expect(textStyles.color).toBe(theme.colors.primary500);
    });
  });

  describe('getLoaderColorFromButton', () => {
    it('returns bright for primary-solid (white bg needs bright loader)', () => {
      expect(getLoaderColorFromButton('primary', 'solid')).toBe('bright');
    });

    it('returns bright for secondary-solid', () => {
      expect(getLoaderColorFromButton('secondary', 'solid')).toBe('bright');
    });

    it('returns secondary for default color', () => {
      expect(getLoaderColorFromButton('default', 'solid')).toBe('secondary');
    });

    it('returns negative for error color', () => {
      expect(getLoaderColorFromButton('error', 'solid')).toBe('negative');
    });

    it('returns primary for primary-ghost', () => {
      expect(getLoaderColorFromButton('primary', 'ghost')).toBe('primary');
    });

    it('returns bright for light-ghost', () => {
      expect(getLoaderColorFromButton('light', 'ghost')).toBe('bright');
    });

    it('returns secondary for bright-solid', () => {
      expect(getLoaderColorFromButton('bright', 'solid')).toBe('secondary');
    });
  });

  describe('getLineLoaderSizeFromButton', () => {
    it('maps small button sizes to sm loader', () => {
      expect(getLineLoaderSizeFromButton('xxs')).toBe('sm');
      expect(getLineLoaderSizeFromButton('xs')).toBe('sm');
      expect(getLineLoaderSizeFromButton('sm')).toBe('sm');
    });

    it('maps larger button sizes to larger loader sizes', () => {
      expect(getLineLoaderSizeFromButton('xl')).toBe('md');
      expect(getLineLoaderSizeFromButton('2xl')).toBe('lg');
    });
  });

  describe('getCircleLoaderSizeFromButton', () => {
    it('maps small button sizes to small circle sizes', () => {
      expect(getCircleLoaderSizeFromButton('xxs')).toBe('xs');
      expect(getCircleLoaderSizeFromButton('sm')).toBe('sm');
    });

    it('maps larger button sizes to larger circle sizes', () => {
      expect(getCircleLoaderSizeFromButton('md')).toBe('md');
      expect(getCircleLoaderSizeFromButton('lg')).toBe('lg');
    });
  });
});
