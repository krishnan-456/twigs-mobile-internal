import type { AvatarSize } from './types';
import { AVATAR_BORDER_RADII } from './constants';

/** Border radius for a given rounded variant. */
export const getAvatarBorderRadius = (rounded: AvatarSize): number =>
  AVATAR_BORDER_RADII[rounded] ?? 999;

/** Extract initials from a full name (first + last). */
export const getFallbackInitials = (name: string): string => {
  const parts = name?.trim()?.split(/\s+/) ?? [];
  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts[parts.length - 1] : undefined;
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${firstInitial}${lastInitial}`;
};
