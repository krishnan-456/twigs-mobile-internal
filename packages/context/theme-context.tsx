import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { defaultTheme, TwigsTheme } from '../theme/default-theme';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function deepMerge<T extends Record<string, any>>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue as any);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as any;
      }
    }
  }

  return result;
}

export const ThemeContext = createContext<TwigsTheme>(defaultTheme);

export interface TwigsProviderProps {
  theme?: DeepPartial<TwigsTheme>;
  children: ReactNode;
}

export function TwigsProvider({ theme: customTheme, children }: TwigsProviderProps) {
  const mergedTheme = useMemo(() => {
    if (!customTheme) {
      return defaultTheme;
    }
    return deepMerge(defaultTheme, customTheme);
  }, [customTheme]);

  return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): TwigsTheme {
  const contextTheme = useContext(ThemeContext);
  return contextTheme || defaultTheme;
}
