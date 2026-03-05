import type { TwigsTheme } from '../theme';
import type { IconButtonColor, IconButtonVariant } from './types';

/**
 * Returns the icon color that matches the Button text color for a given
 * color + variant combination.
 *
 * Mobile deviation: Web SVG icons use CSS `currentColor` to automatically
 * inherit the button's text color. React Native has no equivalent, so we
 * must compute and pass the color explicitly.
 */
export const getIconColor = (
  color: IconButtonColor,
  variant: IconButtonVariant,
  theme: TwigsTheme
): string => {
  const colorMap: Record<IconButtonColor, Record<IconButtonVariant, string>> = {
    default: {
      solid: theme.colors.secondary600,
      ghost: theme.colors.neutral800,
      outline: theme.colors.secondary600,
    },
    primary: {
      solid: theme.colors.white900,
      ghost: theme.colors.primary500,
      outline: theme.colors.primary500,
    },
    secondary: {
      solid: theme.colors.white900,
      ghost: theme.colors.secondary600,
      outline: theme.colors.secondary500,
    },
    bright: {
      solid: theme.colors.secondary500,
      ghost: theme.colors.white900,
      outline: theme.colors.white900,
    },
    light: {
      solid: theme.colors.white900,
      ghost: theme.colors.white900,
      outline: theme.colors.white900,
    },
    error: {
      solid: theme.colors.negative800,
      ghost: theme.colors.negative800,
      outline: theme.colors.negative800,
    },
  };

  return colorMap[color]?.[variant] ?? theme.colors.white900;
};
