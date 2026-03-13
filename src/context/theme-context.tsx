import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { defaultTheme, TwigsTheme } from '../theme/default-theme';

/** Recursively makes all properties optional — used for partial theme overrides. */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  const result = { ...target } as T;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key as keyof T];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        (result as Record<string, unknown>)[key] = deepMerge(
          targetValue,
          sourceValue as DeepPartial<typeof targetValue>
        );
      } else if (sourceValue !== undefined) {
        (result as Record<string, unknown>)[key] = sourceValue;
      }
    }
  }

  return result;
}

export const ThemeContext = createContext<TwigsTheme>(defaultTheme);

export interface TwigsProviderProps {
  /** Partial theme overrides deep-merged with the default theme. */
  theme?: DeepPartial<TwigsTheme>;
  children: ReactNode;
}

/** Provides the Twigs theme context to all child components. */
export function TwigsProvider({ theme: customTheme, children }: TwigsProviderProps) {
  const mergedTheme = useMemo(() => {
    if (!customTheme) {
      return defaultTheme;
    }
    return deepMerge(defaultTheme, customTheme);
  }, [customTheme]);

  return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
}

/** Returns the current Twigs theme from the nearest TwigsProvider. */
export function useTheme(): TwigsTheme {
  const contextTheme = useContext(ThemeContext);
  return contextTheme || defaultTheme;
}
