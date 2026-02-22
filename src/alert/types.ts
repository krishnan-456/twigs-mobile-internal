import type { ViewProps } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

/** Alert status variants for visual appearance */
export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

/** Alert size variants */
export type AlertSize = 'sm' | 'md';

/**
 * Props for the Alert component.
 * Displays contextual feedback messages with status indicators and optional close functionality.
 */
export interface AlertProps
  extends Omit<ViewProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** The status/type of alert which determines colors and icon */
  status?: AlertStatus;
  /** The size of the alert */
  size?: AlertSize;
  /** Custom icon to display. If not provided, a default icon based on status is shown */
  icon?: React.ReactElement;
  /** Whether the alert can be dismissed */
  closable?: boolean;
  /** Callback when the close button is pressed */
  onClose?: () => void;
  /** The alert content */
  children: React.ReactNode;
}
