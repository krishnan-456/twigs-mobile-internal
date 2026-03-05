import type { ReactElement } from 'react';
import type { PressableProps } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';
import type { ButtonSize, ButtonColor, ButtonVariant } from '../button';

/** IconButton border radius variants (aligned with Avatar rounded tokens) */
export type IconButtonRounded = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

/** Re-export Button types used as IconButton aliases */
export type IconButtonSize = ButtonSize;
export type IconButtonColor = ButtonColor;
export type IconButtonVariant = ButtonVariant;

/**
 * Props for the IconButton component.
 * A focused icon-only button that wraps Button internally.
 * Supports size, color, variant, rounded, loading state, and full accessibility.
 */
export interface IconButtonProps
  extends Omit<PressableProps, 'style' | 'children'>, CommonStyleProps, BaseAccessibilityProps {
  /** Icon element rendered inside the button. Required. */
  icon: ReactElement;
  /** Size preset. @default 'md' */
  size?: IconButtonSize;
  /** Color preset. @default 'primary' */
  color?: IconButtonColor;
  /** Visual variant. @default 'solid' */
  variant?: IconButtonVariant;
  /** Border radius of the button container. @default 'full' */
  rounded?: IconButtonRounded;
  /** Whether the button is disabled. @default false */
  disabled?: boolean;
  /** Whether the button is in a loading state. @default false */
  loading?: boolean;
  /**
   * Loader indicator shown during loading state.
   * - `'line'` (default) — animated line loader
   * - `'circle'` — spinning circle indicator
   * - `ReactElement` — custom loader component
   */
  loader?: ReactElement | 'line' | 'circle';
}
