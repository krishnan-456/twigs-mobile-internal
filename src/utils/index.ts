import type { ReactNode } from 'react';
import type { AccessibilityRole, ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { SvgProps, PathProps } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

/**
 * Aligned with React Native accessibility API:
 * @see https://reactnative.dev/docs/accessibility
 */
export interface BaseAccessibilityProps {
  accessible?: boolean;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
  /** iOS only */
  accessibilityViewIsModal?: boolean;
  /** iOS only */
  accessibilityElementsHidden?: boolean;
  /** Android only */
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
  /** iOS only */
  accessibilityIgnoresInvertColors?: boolean;
  /** Android only */
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
}

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

/**
 * Returns a hex color string with the given opacity applied as an alpha channel.
 *
 * @param color  Hex color (#RGB, #RRGGBB, or #RRGGBBAA — existing alpha is stripped)
 * @param opacity  Opacity between 0 (fully transparent) and 1 (fully opaque)
 * @returns Hex color with alpha channel (#RRGGBBAA)
 *
 * @example
 * colorOpacity('#00828D', 0.1)  // '#00828D1A'
 * colorOpacity('#64748B', 0.8)  // '#64748BCC'
 */
export const colorOpacity = (color: string, opacity: number): string => {
  const raw = color.replace(/^#/, '');

  // Strip existing alpha to get the base RGB hex
  let base: string;
  if (raw.length === 8) {
    base = raw.slice(0, 6);
  } else if (raw.length === 4) {
    base = raw.slice(0, 3);
  } else {
    base = raw;
  }

  // Expand shorthand (#RGB → #RRGGBB)
  const fullHex =
    base.length === 3
      ? base
          .split('')
          .map((c) => c + c)
          .join('')
      : base;

  const alpha = Math.round(Math.min(1, Math.max(0, opacity)) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return `#${fullHex}${alpha}`;
};

export const createTextStyle = (
  fontFamily: string,
  fontWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 'normal'
    | 'bold'
): Pick<TextStyle, 'fontFamily' | 'fontWeight'> => {
  const style: Pick<TextStyle, 'fontFamily' | 'fontWeight'> = { fontFamily };

  if (fontFamily === 'System' && fontWeight) {
    style.fontWeight = fontWeight;
  }

  return style;
};
