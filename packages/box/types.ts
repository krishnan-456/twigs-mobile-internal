import { ReactNode } from 'react';
import { MarginProps, PaddingProps, CommonStyleProps } from '../utils';

export interface BoxProps extends MarginProps, PaddingProps, CommonStyleProps {
  children?: ReactNode;
}
