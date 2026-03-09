import type { ReactElement, ReactNode } from 'react';

/** Toast variant determines the visual appearance and default icon */
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'loading';

/** Toast display position */
export type ToastPosition = 'top-center' | 'bottom-center';

/** Options for the imperative toast() function */
export interface ToastOptions {
  /** Unique identifier — auto-generated if omitted, pass to update an existing toast */
  id?: string;
  /** Primary text shown in the toast */
  title: string;
  /** Secondary text below the title */
  description?: string;
  /** Visual variant that controls colors and default icon */
  variant?: ToastVariant;
  /** Custom icon element — overrides the default variant icon */
  icon?: ReactElement;
  /** Action element rendered on the right side (e.g. LinkButton, IconButton) */
  action?: ReactElement;
  /** Auto-dismiss duration in milliseconds (Infinity for no auto-dismiss) */
  duration?: number;
  /** Display position */
  position?: ToastPosition;
  /** Callback when the toast body is pressed */
  onPress?: () => void;
  /** Callback when the toast becomes visible */
  onShow?: () => void;
  /** Callback when the toast is dismissed */
  onDismiss?: () => void;
}

/** Internal toast state tracked by the provider */
export interface ToastState
  extends Required<
    Omit<ToastOptions, 'icon' | 'action' | 'onPress' | 'onShow' | 'onDismiss'>
  > {
  id: string;
  icon: ReactElement | null;
  action: ReactElement | null;
  createdAt: number;
  onPress?: () => void;
  onShow?: () => void;
  onDismiss?: () => void;
}

/** Props for the ToastProvider component */
export interface ToastProviderProps {
  children: ReactNode;
  /** Default position for all toasts */
  defaultPosition?: ToastPosition;
  /** Default auto-dismiss duration in milliseconds */
  defaultDuration?: number;
  /** Maximum number of visible toasts per position */
  maxToasts?: number;
  /** Gap between stacked toasts in dp */
  gap?: number;
  /** Offset from the screen edge in dp */
  offset?: number;
}

/** Context type for toast operations */
export interface ToastContextType {
  add: (options: ToastOptions) => { id: string; dismiss: () => void };
  dismiss: (id?: string) => void;
  update: (id: string, options: Partial<ToastOptions>) => void;
  toasts: ToastState[];
}

/** Props for individual ToastItem component */
export interface ToastItemProps extends ToastState {
  onRemove: (id: string) => void;
}

/** Return type of the useToast hook */
export interface UseToastReturn {
  show: (options: ToastOptions) => { id: string; dismiss: () => void };
  success: (
    arg: string | Omit<ToastOptions, 'variant'>,
  ) => { id: string; dismiss: () => void };
  error: (
    arg: string | Omit<ToastOptions, 'variant'>,
  ) => { id: string; dismiss: () => void };
  warning: (
    arg: string | Omit<ToastOptions, 'variant'>,
  ) => { id: string; dismiss: () => void };
  loading: (
    arg: string | Omit<ToastOptions, 'variant'>,
  ) => { id: string; dismiss: () => void };
  dismiss: (id?: string) => void;
  update: (id: string, options: Partial<ToastOptions>) => void;
}
