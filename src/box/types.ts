import { ReactNode } from 'react';
import { MarginProps, PaddingProps, CommonStyleProps, BaseAccessibilityProps } from '../utils';

export interface BoxProps extends MarginProps, PaddingProps, CommonStyleProps, BaseAccessibilityProps {
  children?: ReactNode;
}
