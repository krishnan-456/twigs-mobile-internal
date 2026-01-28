import { CommonStyleProps } from '../utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type AvatarSizeProp = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

export interface AvatarProps extends CommonStyleProps {
  imageSrc?: string;
  name?: string;
  textColor?: string;
  textSize?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
  rounded?: AvatarSize;
  size?: AvatarSizeProp;
}
