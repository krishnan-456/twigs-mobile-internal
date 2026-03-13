import { colorOpacity } from '../utils';
import type { TwigsTheme } from '../theme';
import type { LoaderColor } from './types';

export interface LoaderColorPair {
  bg: string;
  fg: string;
}

/** Resolves a LoaderColor preset to background (track/ring) and foreground (dot/arc) hex values. */
export function getLoaderColors(theme: TwigsTheme, color: LoaderColor): LoaderColorPair {
  switch (color) {
    case 'primary':
      return { bg: colorOpacity(theme.colors.primary800, 0.25), fg: theme.colors.primary800 };
    case 'secondary':
      return { bg: colorOpacity(theme.colors.secondary700, 0.4), fg: theme.colors.secondary700 };
    case 'bright':
      return { bg: colorOpacity(theme.colors.white900, 0.5), fg: theme.colors.white900 };
    case 'negative':
      return { bg: colorOpacity(theme.colors.negative500, 0.4), fg: theme.colors.negative700 };
    case 'accent':
      return { bg: colorOpacity(theme.colors.accent500, 0.2), fg: theme.colors.accent500 };
    default:
      return { bg: colorOpacity(theme.colors.primary800, 0.25), fg: theme.colors.primary800 };
  }
}
