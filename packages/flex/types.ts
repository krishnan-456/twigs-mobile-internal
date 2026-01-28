import { ReactNode } from 'react';
import { DimensionValue } from 'react-native';
import { MarginProps, PaddingProps, CommonStyleProps } from '../utils';

export interface FlexProps extends MarginProps, PaddingProps, CommonStyleProps {
  children?: ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
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
  gap?: number;
}
