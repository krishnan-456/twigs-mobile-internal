import type { MarginProps, CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends MarginProps, CommonStyleProps, BaseAccessibilityProps {
  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  orientation?: SeparatorOrientation;
  /**
   * Custom color for the separator line.
   * @default theme.colors.neutral200
   */
  color?: string;
  /**
   * When true, the separator is purely decorative and will be hidden
   * from assistive technologies.
   * @default false
   */
  decorative?: boolean;
  /**
   * Test ID for testing purposes.
   */
  testID?: string;
}
