import { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import { MarginProps, PaddingProps, CommonStyleProps, BaseAccessibilityProps } from '../utils';

/** Props for the Box layout container. */
export interface BoxProps
  extends
    Omit<ViewProps, 'style'>,
    MarginProps,
    PaddingProps,
    CommonStyleProps,
    BaseAccessibilityProps {
  children?: ReactNode;
}
