import type { ReactElement } from 'react';
import type { ViewProps } from 'react-native';
import type { BaseAccessibilityProps, CommonStyleProps } from '../utils';
import type { AvatarProps, AvatarSize, AvatarSizeProp } from './types';

/** Props for the AvatarGroup component. */
export interface AvatarGroupProps
  extends Omit<ViewProps, 'style' | 'children'>, CommonStyleProps, BaseAccessibilityProps {
  /** Maximum number of avatars to show before rendering a "+N" overflow avatar. */
  limit?: number | null;
  /** Custom label for the overflow avatar. Defaults to "+N". */
  limitExceededLabel?: string;
  /** Size applied to all avatars in the group unless overridden by child props. */
  size?: AvatarSizeProp;
  /** Border radius variant applied to all avatars in the group unless overridden by child props. */
  rounded?: AvatarSize;
  /** Avatar children to render in the group. */
  children: ReactElement<AvatarProps> | ReactElement<AvatarProps>[];
}
