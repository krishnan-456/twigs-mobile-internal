import type { AlertSize, AlertStatus } from './types';

interface SizeConfig {
  paddingHorizontal: number;
  paddingVertical: number;
  fontSize: number;
  lineHeight: number;
  iconSize: number;
  gap: number;
  borderRadius: number;
}

/** Size configuration for alert variants */
export const SIZE_CONFIG: Record<AlertSize, SizeConfig> = {
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    lineHeight: 20,
    iconSize: 20,
    gap: 8,
    borderRadius: 8,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    lineHeight: 24,
    iconSize: 24,
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
  info: 'accent100',
  success: 'positive100',
  warning: 'warning100',
  error: 'negative100',
};

/** Status to theme color key mapping for borders */
export const STATUS_BORDER_COLORS: Record<AlertStatus, string> = {
  info: 'accent200',
  success: 'positive200',
  warning: 'warning200',
  error: 'negative200',
};

/** Status to theme color key mapping for icons */
export const STATUS_ICON_COLORS: Record<AlertStatus, string> = {
  info: 'accent500',
  success: 'positive500',
  warning: 'warning600',
  error: 'negative500',
};

/** Status to theme color key mapping for text */
export const STATUS_TEXT_COLORS: Record<AlertStatus, string> = {
  info: 'accent700',
  success: 'positive700',
  warning: 'warning700',
  error: 'negative700',
};
