import type { AlertSize, AlertStatus } from './types';

interface SizeConfig {
  paddingHorizontal: number;
  paddingVertical: number;
  fontSize: number;
  lineHeight: number;
  statusIconSize: number;
  closeIconSize: number;
  gap: number;
  borderRadius: number;
}

/** Size configuration for alert variants */
export const SIZE_CONFIG: Record<AlertSize, SizeConfig> = {
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    lineHeight: 20,
    statusIconSize: 20,
    closeIconSize: 14,
    gap: 8,
    borderRadius: 8,
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    lineHeight: 24,
    statusIconSize: 24,
    closeIconSize: 16,
    gap: 12,
    borderRadius: 12,
  },
};

/** Default size for the alert component */
export const DEFAULT_SIZE: AlertSize = 'sm';

/** Default status for the alert component */
export const DEFAULT_STATUS: AlertStatus = 'info';

/** Status to theme color key mapping for backgrounds */
export const STATUS_BG_COLORS: Record<AlertStatus, string> = {
  default: 'neutral100',
  info: 'accent100',
  success: 'positive100',
  warning: 'warning100',
  error: 'negative100',
};

/** Status to theme color key mapping for borders */
export const STATUS_BORDER_COLORS: Record<AlertStatus, string> = {
  default: 'neutral200',
  info: 'accent200',
  success: 'positive200',
  warning: 'warning200',
  error: 'negative200',
};

/** Status to theme color key mapping for icons */
export const STATUS_ICON_COLORS: Record<AlertStatus, string> = {
  default: 'neutral600',
  info: 'accent800',
  success: 'positive800',
  warning: 'warning800',
  error: 'negative800',
};

/** Text color token — all variants use dark text per Figma spec */
export const ALERT_TEXT_COLOR = 'black900';
