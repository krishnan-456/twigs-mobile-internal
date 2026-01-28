import { CommonStyleProps } from '../utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface AvatarProps extends CommonStyleProps {
  imageSrc?: string;
  name?: string;
  email?: string;
  textColor?: string;
  textSize?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
  rounded?: AvatarSize;
}
