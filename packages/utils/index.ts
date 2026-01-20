import type { ReactNode } from 'react';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { SvgProps, PathProps } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

export interface MarginProps {
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export interface PaddingProps {
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export interface ResolvedSpacing {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface CommonStyleProps {
  css?: ViewStyle;
  style?: ViewStyle;
}

type AnimatedViewComponent = React.FC<AnimatedProps<ViewProps>>;
type SvgComponentType = React.FC<SvgProps & { children?: ReactNode }>;
type PathComponentType = React.FC<PathProps>;

export const AnimatedView: AnimatedViewComponent = Animated.View as unknown as React.FC<
  AnimatedProps<ViewProps>
>;

export const SvgComponent: SvgComponentType = Svg as unknown as SvgComponentType;

export const PathComponent: PathComponentType = Path as unknown as PathComponentType;

export const resolveMargin = (props: MarginProps, defaultSpacing = 0): ResolvedSpacing => ({
  top: props.marginTop ?? props.marginVertical ?? props.margin ?? defaultSpacing,
  bottom: props.marginBottom ?? props.marginVertical ?? props.margin ?? defaultSpacing,
  left: props.marginLeft ?? props.marginHorizontal ?? props.margin ?? defaultSpacing,
  right: props.marginRight ?? props.marginHorizontal ?? props.margin ?? defaultSpacing,
});

export const resolvePadding = (props: PaddingProps, defaultSpacing = 0): ResolvedSpacing => ({
  top: props.paddingTop ?? props.paddingVertical ?? props.padding ?? defaultSpacing,
  bottom: props.paddingBottom ?? props.paddingVertical ?? props.padding ?? defaultSpacing,
  left: props.paddingLeft ?? props.paddingHorizontal ?? props.padding ?? defaultSpacing,
  right: props.paddingRight ?? props.paddingHorizontal ?? props.padding ?? defaultSpacing,
});

export const createTextStyle = (
  fontFamily: string,
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold'
): Pick<TextStyle, 'fontFamily' | 'fontWeight'> => {
  const style: Pick<TextStyle, 'fontFamily' | 'fontWeight'> = { fontFamily };
  
  if (fontFamily === 'System' && fontWeight) {
    style.fontWeight = fontWeight;
  }
  
  return style;
};
