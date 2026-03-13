import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type LineLoaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type CircleLoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type LoaderColor = 'primary' | 'secondary' | 'bright' | 'negative' | 'accent';

/** Props for the LineLoader component. */
export interface LineLoaderProps extends CommonStyleProps, BaseAccessibilityProps {
  /** Size preset. @default 'sm' */
  size?: LineLoaderSize;
  /** Color preset. @default 'primary' */
  color?: LoaderColor;
}

/** Props for the CircleLoader component. */
export interface CircleLoaderProps extends CommonStyleProps, BaseAccessibilityProps {
  /** Size preset. @default 'md' */
  size?: CircleLoaderSize;
  /** Color preset. @default 'primary' */
  color?: LoaderColor;
}
