import type { ViewProps } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

export type AvatarSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type AvatarSizeProp = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface AvatarProps
  extends Omit<ViewProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** URL of the avatar image. Falls back to initials when absent or on load failure. */
  imageSrc?: string;
  /** Full name used to derive initials and the default accessibilityLabel. */
  name?: string;
  /** Override color for the initials text. */
  textColor?: string;
  /** Override font size for the initials text. */
  textSize?: number;
  /** Override background color for the initials fallback. */
  backgroundColor?: string;
  /** Explicit width in dp (overrides the size preset). */
  width?: number;
  /** Explicit height in dp (overrides the size preset). */
  height?: number;
  /** Border radius variant. @default 'full' */
  rounded?: AvatarSize;
  /** Size preset controlling width, height, and font size. @default 'md' */
  size?: AvatarSizeProp;
  /** When true, renders an anonymous "?" fallback with a dashed border. */
  isAnonymous?: boolean;
}
