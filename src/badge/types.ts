import type { ViewProps } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type BadgeSize = 'sm' | 'md';

export type BadgeColor =
  | 'default'
  | 'white'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'attention';

export type BadgeRounded = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

/**
 * Props for the Badge component.
 * Compact pill-shaped element for labels, tags, and status indicators.
 */
export interface BadgeProps
  extends Omit<ViewProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** Size of the badge */
  size?: BadgeSize;
  /** Color variant */
  color?: BadgeColor;
  /** Border radius variant */
  rounded?: BadgeRounded;
  /** Element rendered before the label */
  leftElement?: React.ReactNode;
  /** Element rendered after the label */
  rightElement?: React.ReactNode;
  /** Badge content (label) */
  children: React.ReactNode;
}
