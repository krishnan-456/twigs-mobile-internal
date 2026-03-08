import React, { useState, useCallback, useMemo, useEffect, useLayoutEffect } from 'react';
import { ToastContext, setGlobalToastHandlers } from './use-toast';
import { ToastContainer } from './toast-container';
import type {
  ToastProviderProps,
  ToastState,
  ToastOptions,
  ToastPosition,
} from './types';
import {
  DEFAULT_DURATION,
  DEFAULT_POSITION,
  DEFAULT_MAX_TOASTS,
  DEFAULT_GAP,
  DEFAULT_OFFSET,
  ANIMATION_DURATION,
} from './constants';

let idCounter = 0;
function generateId(): string {
  idCounter += 1;
  return `twigs-toast-${idCounter}`;
}

/**
 * Provides toast infrastructure for the app. Must be placed inside TwigsProvider
 * so toast renderers can access the theme.
 *
 * Manages the toast queue and renders stacked toast containers per position.
 */
export const ToastProvider = ({
  children,
  defaultPosition = DEFAULT_POSITION,
  defaultDuration = DEFAULT_DURATION,
  maxToasts = DEFAULT_MAX_TOASTS,
  gap = DEFAULT_GAP,
  offset = DEFAULT_OFFSET,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (toasts.length > 0) {
      setVisible(true);
      return;
    }
    const timer = setTimeout(() => setVisible(false), ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [toasts.length]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? generateId();

      setToasts((prev) => {
        const existingIdx = prev.findIndex((t) => t.id === id);

        const newToast: ToastState = {
          id,
          title: options.title,
          description: options.description ?? '',
          variant: options.variant ?? 'default',
          icon: options.icon ?? null,
          action: options.action ?? null,
          position: options.position ?? defaultPosition,
          duration: options.duration ?? defaultDuration,
          onPress: options.onPress,
          onShow: options.onShow,
          onDismiss: options.onDismiss,
          createdAt: Date.now(),
        };

        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = { ...updated[existingIdx], ...newToast };
          return updated;
        }

        const next = [...prev, newToast];
        const pos = newToast.position;
        const samePosition = next.filter((t) => t.position === pos);
        if (samePosition.length > maxToasts) {
          const oldest = samePosition[0];
          return next.filter((t) => t.id !== oldest.id);
        }
        return next;
      });

      return { id, dismiss: () => remove(id) };
    },
    [defaultPosition, defaultDuration, maxToasts, remove],
  );

  const dismiss = useCallback(
    (id?: string) => {
      if (id) {
        remove(id);
      } else {
        setToasts([]);
      }
    },
    [remove],
  );

  const update = useCallback(
    (id: string, options: Partial<ToastOptions>) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...options } : t)),
      );
    },
    [],
  );

  const contextValue = useMemo(
    () => ({ add, dismiss, update, toasts }),
    [add, dismiss, update, toasts],
  );

  useEffect(() => {
    setGlobalToastHandlers(add, dismiss, update);
    return () => setGlobalToastHandlers(null, null, null);
  }, [add, dismiss, update]);

  const toastsByPosition = useMemo(() => {
    const grouped: Record<string, ToastState[]> = {};
    for (const t of toasts) {
      const pos = t.position;
      if (!grouped[pos]) grouped[pos] = [];
      grouped[pos].push(t);
    }
    return grouped;
  }, [toasts]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {visible &&
        Object.entries(toastsByPosition).map(([pos, posToasts]) => (
          <ToastContainer
            key={pos}
            toasts={posToasts}
            position={pos as ToastPosition}
            offset={offset}
            gap={gap}
            onRemove={remove}
          />
        ))}
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';
