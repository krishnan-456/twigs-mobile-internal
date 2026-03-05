import { defaultTheme } from '../theme';
import {
  getSizeStyles,
  getButtonTextStyles,
  getIconSize,
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
      expect(styles.height).toBe(56);
      expect(styles.borderRadius).toBe(16);
    });

    it('returns correct height for xl size', () => {
      const styles = getSizeStyles('xl', false);
      expect(styles.height).toBe(48);
      expect(styles.borderRadius).toBe(12);
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

    it('uses bold typography for xxs size', () => {
      const textStyles = getButtonTextStyles({
        size: 'xxs',
        color: 'default',
        variant: 'solid',
        theme,
      });
      expect(textStyles.fontSize).toBe(theme.fontSizes.xxs);
      expect(textStyles.fontWeight).toBe('700');
    });

    it('uses lg fontSize token for xl and 2xl', () => {
      const xl = getButtonTextStyles({
        size: 'xl',
        color: 'default',
        variant: 'solid',
        theme,
      });
      const twoXl = getButtonTextStyles({
        size: '2xl',
        color: 'default',
        variant: 'solid',
        theme,
      });

      expect(xl.fontSize).toBe(theme.fontSizes.lg);
      expect(twoXl.fontSize).toBe(theme.fontSizes.lg);
    });
  });

  describe('getIconSize', () => {
    it('returns side icon sizes for left/right positions', () => {
      expect(getIconSize('sm', 'left')).toBe(16);
      expect(getIconSize('md', 'right')).toBe(20);
      expect(getIconSize('xl', 'left')).toBe(24);
    });

    it('returns icon-only sizes for center position', () => {
      expect(getIconSize('xs', 'center')).toBe(12);
      expect(getIconSize('sm', 'center')).toBe(20);
      expect(getIconSize('xl', 'center')).toBe(32);
      expect(getIconSize('2xl', 'center')).toBe(32);
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
