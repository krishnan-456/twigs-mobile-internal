import type { ToastVariant, ToastPosition } from './types';

interface VariantColorConfig {
  background: string;
  text: string;
  icon: string;
  actionText: string;
}

export const VARIANT_COLORS: Record<ToastVariant, VariantColorConfig> = {
  default: {
    background: 'accent100',
    text: 'neutral900',
    icon: 'accent500',
    actionText: 'primary500',
  },
  secondary: {
    background: 'secondary800',
    text: 'white900',
    icon: 'white900',
    actionText: 'white900',
  },
  success: {
    background: 'accent500',
    text: 'white900',
    icon: 'white900',
    actionText: 'white900',
  },
  error: {
    background: 'negative600',
    text: 'white900',
    icon: 'white900',
    actionText: 'white900',
  },
  warning: {
    background: 'warning200',
    text: 'neutral900',
    icon: 'neutral900',
    actionText: 'secondary600',
  },
  loading: {
    background: 'secondary800',
    text: 'white900',
    icon: 'white900',
    actionText: 'white900',
  },
};

export const TOAST_ICON_SIZE = 24;
export const TOAST_BORDER_RADIUS = 8;
export const TOAST_PADDING_HORIZONTAL = 16;
export const TOAST_PADDING_VERTICAL = 12;
export const TOAST_CONTAINER_GAP = 16;
export const TOAST_CONTENT_GAP = 8;
export const TOAST_MAX_WIDTH = 400;
export const TOAST_MIN_HEIGHT = 48;
export const TOAST_TITLE_FONT_SIZE = 14;
export const TOAST_TITLE_LINE_HEIGHT = 20;
export const TOAST_DESCRIPTION_FONT_SIZE = 12;
export const TOAST_DESCRIPTION_LINE_HEIGHT = 16;

export const DEFAULT_VARIANT: ToastVariant = 'default';
export const DEFAULT_DURATION = 4000;
export const DEFAULT_POSITION: ToastPosition = 'bottom-center';
export const DEFAULT_MAX_TOASTS = 3;
export const DEFAULT_GAP = 8;
export const DEFAULT_OFFSET = 40;

export const ANIMATION_DURATION = 300;
export const SWIPE_THRESHOLD = 24;
export const SWIPE_ELASTIC_RESISTANCE = 0.4;
export const SWIPE_DISMISS_OFFSET = -300;
export const ENTRY_SPRING_CONFIG = { damping: 20, stiffness: 170, mass: 1 };
export const PAN_ACTIVE_OFFSET_Y: [number, number] = [-10, 10];
export const PAN_FAIL_OFFSET_X: [number, number] = [-5, 5];

export const POSITION_STYLES: Record<
  ToastPosition,
  { vertical: 'top' | 'bottom' }
> = {
  'top-center': { vertical: 'top' },
  'bottom-center': { vertical: 'bottom' },
};
