import { CommonStyleProps } from '../utils';

/**
 * Size variants for LineLoader.
 * Aligned with web twigs: sm, md, lg, xl.
 */
export type LineLoaderSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Size variants for CircleLoader.
 * Aligned with web twigs: xs, sm, md, lg, xl, 2xl, 3xl.
 */
export type CircleLoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Color variants for loaders.
 * Aligned with web twigs: primary, secondary, bright, negative, accent.
 */
export type LoaderColor = 'primary' | 'secondary' | 'bright' | 'negative' | 'accent';

export interface LineLoaderProps extends CommonStyleProps {
  /** Size preset. @default 'sm' */
  size?: LineLoaderSize;
  /** Color preset. @default 'primary' */
  color?: LoaderColor;
}

export interface CircleLoaderProps extends CommonStyleProps {
  /** Size preset. @default 'md' */
  size?: CircleLoaderSize;
  /** Color preset. @default 'primary' */
  color?: LoaderColor;
}
