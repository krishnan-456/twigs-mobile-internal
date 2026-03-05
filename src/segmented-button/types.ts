import type { ViewProps } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

/** Individual option in a segmented button group. */
export interface SegmentedButtonOption {
  /** Unique value identifying this option. */
  value: string;
  /** Display label for this option. */
  label: string;
  /** Whether this individual option is disabled. */
  disabled?: boolean;
}

/** Border radius of the segmented button container and segments (aligned with Avatar tokens). */
export type SegmentedButtonRounded = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

/** Props for the SegmentedButton component. */
export interface SegmentedButtonProps
  extends Omit<ViewProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** Array of options to display as segments. */
  options: SegmentedButtonOption[];
  /** Currently selected value (controlled). */
  value?: string;
  /** Default selected value (uncontrolled). */
  defaultValue?: string;
  /** Called when the selected value changes. */
  onChange?: (value: string) => void;
  /** Border radius variant of the container and segments. */
  rounded?: SegmentedButtonRounded;
  /** Whether the entire segmented button is disabled. */
  disabled?: boolean;
  /** Whether the component should stretch to fill its parent width. */
  fullWidth?: boolean;
}
