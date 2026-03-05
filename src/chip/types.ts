import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

/** Chip size variants (from Figma mobile design) */
export type ChipSize = 'sm' | 'md';

/** Chip color variants (from twigs-web Chip) */
export type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'success'
  | 'accent';

/** Chip visual variant */
export type ChipVariant = 'solid' | 'outline';

/** Chip border radius (aligned with Avatar rounded tokens) */
export type ChipRounded = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

/**
 * Props for the Chip component.
 * Compact interactive element for tags, filters, and selectable items.
 */
export interface ChipProps
  extends Omit<ViewProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** Size of the chip */
  size?: ChipSize;
  /** Color variant */
  color?: ChipColor;
  /** Visual variant */
  variant?: ChipVariant;
  /** Border radius variant */
  rounded?: ChipRounded;
  /** Whether to show a close/remove button */
  closable?: boolean;
  /** Called when the close button is pressed */
  onClose?: () => void;
  /** Element rendered before the label */
  leftElement?: ReactNode;
  /** Element rendered after the label */
  rightElement?: ReactNode;
  /** Controlled active state */
  active?: boolean;
  /** Initial active state for uncontrolled usage */
  defaultActive?: boolean;
  /** Called when active state changes */
  onActiveStateChange?: (active: boolean) => void;
  /** Enables toggle behavior and pressed visual feedback */
  selectable?: boolean;
  /** Disables press and close interactions */
  disabled?: boolean;
  /** Called when the chip body is pressed (also enables Pressable behavior) */
  onPress?: () => void;
  /** Chip content (label) */
  children?: ReactNode;
}
