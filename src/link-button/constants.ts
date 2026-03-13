import type { LinkButtonSize, LinkButtonVariant } from './types';

export interface LinkButtonSizeConfig {
  fontSize: string;
  lineHeight: string;
  letterSpacing: number;
}

/**
 * Size configuration keyed by theme token names.
 * fontSize/lineHeight are theme token keys resolved at render time.
 */
export const SIZE_CONFIG: Record<LinkButtonSize, LinkButtonSizeConfig> = {
  sm: { fontSize: 'sm', lineHeight: 'sm', letterSpacing: 0.028 },
  md: { fontSize: 'md', lineHeight: 'md', letterSpacing: 0 },
};

export interface LinkButtonVariantConfig {
  fontFamily: 'regular' | 'medium' | 'bold';
}

/**
 * Variant configuration keyed by theme font-family token names.
 * fontFamily is a theme token key resolved at render time.
 */
export const VARIANT_CONFIG: Record<LinkButtonVariant, LinkButtonVariantConfig> = {
  medium: { fontFamily: 'medium' },
  bold: { fontFamily: 'bold' },
};

export const PRESSED_BG_OPACITY = 0.15;

export const DISABLED_OPACITY = 0.5;
