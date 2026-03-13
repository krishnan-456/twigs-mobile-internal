import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type ChipSize = 'sm' | 'md' | 'lg';

export type ChipColor = 'secondary' | 'primary';

export type ChipRounded = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface ChipProps
  extends Omit<ViewProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** Size of the chip */
  size?: ChipSize;
  /** Color variant */
  color?: ChipColor;
  /** Border radius variant. @default 'full' */
  rounded?: ChipRounded;
  /** Element rendered before the label (e.g. a plus icon) */
  leftElement?: ReactNode;
  /** Element rendered after the label (e.g. a chevron icon) */
  rightElement?: ReactNode;
  /** Controlled active state */
  active?: boolean;
  /** Initial active state for uncontrolled usage */
  defaultActive?: boolean;
  /** Called when active state changes */
  onActiveStateChange?: (active: boolean) => void;
  /** Called when the chip body is pressed */
  onPress?: () => void;
  /** Disables press interactions */
  disabled?: boolean;
  /** Chip content (label) */
  children?: ReactNode;
}
