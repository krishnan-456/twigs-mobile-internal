import { defaultTheme } from '../theme';
import {
  getSizeStyles,
  getButtonTextStyles,
  getIconSize,
  getLoaderColorFromButton,
  getLineLoaderSizeFromButton,
  getCircleLoaderSizeFromButton,
  getTextColor,
  getPressedTextColor,
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

    it('returns correct height for lg size', () => {
      const styles = getSizeStyles('lg', false);
      expect(styles.height).toBe(40);
      expect(styles.borderRadius).toBe(8);
    });
  });

  describe('getButtonTextStyles', () => {
    it('returns 12px fontSize for sm (Body/XS/Strong)', () => {
      const textStyles = getButtonTextStyles({
        size: 'sm',
        color: 'primary',
        variant: 'solid',
        theme,
      });
      expect(textStyles.fontSize).toBe(12);
    });

    it('returns 12px fontSize for md (Body/XS/Strong)', () => {
      const textStyles = getButtonTextStyles({
        size: 'md',
        color: 'primary',
        variant: 'solid',
        theme,
      });
      expect(textStyles.fontSize).toBe(12);
    });

    it('returns 14px fontSize for lg (Body/SM/Strong)', () => {
      const textStyles = getButtonTextStyles({
        size: 'lg',
        color: 'primary',
        variant: 'solid',
        theme,
      });
      expect(textStyles.fontSize).toBe(14);
    });

    it('returns 16px fontSize for xl (Body/MD/Strong)', () => {
      const textStyles = getButtonTextStyles({
        size: 'xl',
        color: 'primary',
        variant: 'solid',
        theme,
      });
      expect(textStyles.fontSize).toBe(16);
    });

    it('returns 18px fontSize for 2xl (Heading/H5/Strong)', () => {
      const textStyles = getButtonTextStyles({
        size: '2xl',
        color: 'primary',
        variant: 'solid',
        theme,
      });
      expect(textStyles.fontSize).toBe(18);
    });

    it('uses bold fontFamily for all sizes', () => {
      const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
      sizes.forEach((size) => {
        const textStyles = getButtonTextStyles({
          size,
          color: 'primary',
          variant: 'solid',
          theme,
        });
        expect(textStyles.fontFamily).toBe(theme.fonts.bold);
      });
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

    it('uses primary500 text for ghost primary (regular)', () => {
      const textStyles = getButtonTextStyles({
        size: 'md',
        color: 'primary',
        variant: 'ghost',
        theme,
      });
      expect(textStyles.color).toBe(theme.colors.primary500);
    });

    it('uses primary700 text for ghost primary (pressed)', () => {
      const textStyles = getButtonTextStyles({
        size: 'md',
        color: 'primary',
        variant: 'ghost',
        theme,
        pressed: true,
      });
      expect(textStyles.color).toBe(theme.colors.primary700);
    });

    it('uses secondary700 text for ghost secondary (pressed)', () => {
      const textStyles = getButtonTextStyles({
        size: 'md',
        color: 'secondary',
        variant: 'ghost',
        theme,
        pressed: true,
      });
      expect(textStyles.color).toBe(theme.colors.secondary700);
    });

    it('uses primary700 text for outline primary (pressed)', () => {
      const textStyles = getButtonTextStyles({
        size: 'md',
        color: 'primary',
        variant: 'outline',
        theme,
        pressed: true,
      });
      expect(textStyles.color).toBe(theme.colors.primary700);
    });

    it('uses secondary800 text for default solid (pressed)', () => {
      const textStyles = getButtonTextStyles({
        size: 'md',
        color: 'default',
        variant: 'solid',
        theme,
        pressed: true,
      });
      expect(textStyles.color).toBe(theme.colors.secondary800);
    });
  });

  describe('getTextColor / getPressedTextColor', () => {
    it('error solid: regular=white, pressed=white', () => {
      expect(getTextColor('error', 'solid', theme)).toBe(theme.colors.white900);
      expect(getPressedTextColor('error', 'solid', theme)).toBe(theme.colors.white900);
    });

    it('error ghost: regular=negative800, pressed=negative900', () => {
      expect(getTextColor('error', 'ghost', theme)).toBe(theme.colors.negative800);
      expect(getPressedTextColor('error', 'ghost', theme)).toBe(theme.colors.negative900);
    });

    it('error outline: regular=negative800, pressed=negative900', () => {
      expect(getTextColor('error', 'outline', theme)).toBe(theme.colors.negative800);
      expect(getPressedTextColor('error', 'outline', theme)).toBe(theme.colors.negative900);
    });

    it('default ghost: regular=neutral800, pressed=neutral900', () => {
      expect(getTextColor('default', 'ghost', theme)).toBe(theme.colors.neutral800);
      expect(getPressedTextColor('default', 'ghost', theme)).toBe(theme.colors.neutral900);
    });
  });

  describe('getIconSize', () => {
    it('returns side icon sizes for left/right positions', () => {
      expect(getIconSize('sm', 'left')).toBe(16);
      expect(getIconSize('md', 'right')).toBe(16);
      expect(getIconSize('xl', 'left')).toBe(20);
    });

    it('returns icon-only sizes for center position', () => {
      expect(getIconSize('sm', 'center')).toBe(16);
      expect(getIconSize('xl', 'center')).toBe(24);
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

    it('returns bright for error-solid (dark bg needs bright loader)', () => {
      expect(getLoaderColorFromButton('error', 'solid')).toBe('bright');
    });

    it('returns negative for error-ghost', () => {
      expect(getLoaderColorFromButton('error', 'ghost')).toBe('negative');
    });

    it('returns primary for primary-ghost', () => {
      expect(getLoaderColorFromButton('primary', 'ghost')).toBe('primary');
    });

    it('returns bright for light-ghost', () => {
      expect(getLoaderColorFromButton('light', 'ghost')).toBe('bright');
    });
  });

  describe('getLineLoaderSizeFromButton', () => {
    it('maps small button sizes to sm loader', () => {
      expect(getLineLoaderSizeFromButton('sm')).toBe('sm');
      expect(getLineLoaderSizeFromButton('md')).toBe('sm');
    });

    it('maps larger button sizes to larger loader sizes', () => {
      expect(getLineLoaderSizeFromButton('xl')).toBe('md');
      expect(getLineLoaderSizeFromButton('2xl')).toBe('lg');
    });
  });

  describe('getCircleLoaderSizeFromButton', () => {
    it('maps small button sizes to small circle sizes', () => {
      expect(getCircleLoaderSizeFromButton('sm')).toBe('sm');
    });

    it('maps larger button sizes to larger circle sizes', () => {
      expect(getCircleLoaderSizeFromButton('md')).toBe('md');
      expect(getCircleLoaderSizeFromButton('lg')).toBe('lg');
    });
  });
});
