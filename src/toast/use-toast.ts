import { createContext, useContext, useCallback } from 'react';
import type {
  ToastOptions,
  ToastContextType,
  UseToastReturn,
} from './types';

export const ToastContext = createContext<ToastContextType | null>(null);

/** Returns the toast context — throws if called outside ToastProvider. */
export function useToastContext(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

type ShorthandArg = string | Omit<ToastOptions, 'variant'>;

function normalizeShorthand(
  arg: ShorthandArg,
): Omit<ToastOptions, 'variant'> {
  return typeof arg === 'string' ? { title: arg } : arg;
}

/** React hook providing the full toast API — must be used inside ToastProvider */
export function useToast(): UseToastReturn {
  const ctx = useToastContext();

  const show = useCallback(
    (options: ToastOptions) => ctx.add(options),
    [ctx],
  );

  const secondary = useCallback(
    (arg: ShorthandArg) =>
      ctx.add({ ...normalizeShorthand(arg), variant: 'secondary' }),
    [ctx],
  );

  const success = useCallback(
    (arg: ShorthandArg) =>
      ctx.add({ ...normalizeShorthand(arg), variant: 'success' }),
    [ctx],
  );

  const error = useCallback(
    (arg: ShorthandArg) =>
      ctx.add({ ...normalizeShorthand(arg), variant: 'error' }),
    [ctx],
  );

  const warning = useCallback(
    (arg: ShorthandArg) =>
      ctx.add({ ...normalizeShorthand(arg), variant: 'warning' }),
    [ctx],
  );

  const loading = useCallback(
    (arg: ShorthandArg) =>
      ctx.add({ ...normalizeShorthand(arg), variant: 'loading' }),
    [ctx],
  );

  const dismiss = useCallback(
    (id?: string) => ctx.dismiss(id),
    [ctx],
  );

  const update = useCallback(
    (id: string, options: Partial<ToastOptions>) => ctx.update(id, options),
    [ctx],
  );

  return { show, secondary, success, error, warning, loading, dismiss, update };
}

let globalAdd: ToastContextType['add'] | null = null;
let globalDismiss: ToastContextType['dismiss'] | null = null;
let globalUpdate: ToastContextType['update'] | null = null;

/** Registers global toast handlers — called internally by ToastProvider on mount. */
export function setGlobalToastHandlers(
  add: typeof globalAdd,
  dismiss: typeof globalDismiss,
  update: typeof globalUpdate,
): void {
  globalAdd = add;
  globalDismiss = dismiss;
  globalUpdate = update;
}

const noop = { id: '', dismiss: () => {} };

function showToast(
  options: ToastOptions,
): { id: string; dismiss: () => void } {
  if (!globalAdd) {
    if (__DEV__) {
      console.warn(
        'toast() called before ToastProvider mounted. Wrap your app with <ToastProvider>.',
      );
    }
    return noop;
  }
  return globalAdd(options);
}

function createVariantShorthand(variant: ToastOptions['variant']) {
  return (arg: ShorthandArg): { id: string; dismiss: () => void } => {
    return showToast({ ...normalizeShorthand(arg), variant });
  };
}

/**
 * Imperative toast API — works inside and outside React components.
 *
 * @example
 * toast({ title: 'Hello', variant: 'success' });
 * toast.secondary('Info');
 * toast.success('Saved!');
 * toast.error('Failed!');
 * toast.warning('Careful');
 * toast.loading('Processing...');
 * toast.dismiss();
 * toast.dismiss(id);
 * toast.update(id, { title: 'Updated!' });
 */
export const toast = Object.assign(showToast, {
  secondary: createVariantShorthand('secondary'),
  success: createVariantShorthand('success'),
  error: createVariantShorthand('error'),
  warning: createVariantShorthand('warning'),
  loading: createVariantShorthand('loading'),
  dismiss: (id?: string) => globalDismiss?.(id),
  update: (id: string, options: Partial<ToastOptions>) =>
    globalUpdate?.(id, options),
});
