import type { AlertStatus } from './types';

export const ALERT_PADDING_LEFT = 12;
export const ALERT_PADDING_RIGHT = 8;
export const ALERT_PADDING_VERTICAL = 8;
export const ALERT_GAP = 8;
export const ALERT_BORDER_RADIUS = 8;
export const ALERT_FONT_SIZE = 14;
export const ALERT_LINE_HEIGHT = 20;
export const ALERT_ICON_SIZE = 20;
export const ALERT_CLOSE_ICON_SIZE = 16;
export const ALERT_MIN_HEIGHT = 40;
export const ALERT_TEXT_COLOR = 'neutral900';

export const DEFAULT_STATUS: AlertStatus = 'info';

export const STATUS_BG_COLORS: Record<AlertStatus, string> = {
  default: 'neutral50',
  info: 'accent50',
  success: 'positive50',
  warning: 'warning100',
  error: 'negative100',
};

export const STATUS_BORDER_COLORS: Record<AlertStatus, string> = {
  default: 'neutral200',
  info: 'accent200',
  success: 'positive200',
  warning: 'warning200',
  error: 'negative200',
};

export const STATUS_ICON_COLORS: Record<AlertStatus, string> = {
  default: 'neutral600',
  info: 'accent800',
  success: 'positive800',
  warning: 'warning800',
  error: 'negative800',
};
