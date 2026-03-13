import { ReactNode } from 'react';
import { DimensionValue } from 'react-native';
import { MarginProps, PaddingProps, CommonStyleProps, BaseAccessibilityProps } from '../utils';

/** Props for the Flex layout container. */
export interface FlexProps
  extends MarginProps, PaddingProps, CommonStyleProps, BaseAccessibilityProps {
  children?: ReactNode;
  /** Flex direction. @default 'column' */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Cross-axis alignment (alignItems). */
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Main-axis alignment (justifyContent). */
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: DimensionValue;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Gap between children in dp. */
  gap?: number;
}
