import type { TextStyle, ViewStyle } from 'react-native';
import { createTextStyle, colorOpacity } from '../utils';
import type { TwigsTheme } from '../theme';
import type { LinkButtonSize, LinkButtonColor, LinkButtonVariant } from './types';
import { SIZE_CONFIG, VARIANT_CONFIG, PRESSED_BG_OPACITY } from './constants';

/**
 * Returns the text color token for a given link button color.
 */
const getTextColor = (color: LinkButtonColor, theme: TwigsTheme): string => {
  const colorMap: Record<LinkButtonColor, string> = {
    primary: theme.colors.primary500,
    default: theme.colors.secondary600,
  };
  return colorMap[color];
};

/**
 * Builds text styles for the link button label.
 */
export const getLinkButtonTextStyles = ({
  size,
  color,
  variant,
  theme,
}: {
  size: LinkButtonSize;
  color: LinkButtonColor;
  variant: LinkButtonVariant;
  theme: TwigsTheme;
}): TextStyle => {
  const sizeConfig = SIZE_CONFIG[size];
  const variantConfig = VARIANT_CONFIG[variant];

  const fontSize = theme.fontSizes[sizeConfig.fontSize as keyof typeof theme.fontSizes];
  const lineHeight = theme.lineHeights[sizeConfig.lineHeight as keyof typeof theme.lineHeights];
  const fontFamily = theme.fonts[variantConfig.fontFamily as keyof typeof theme.fonts];

  return {
    fontSize,
    lineHeight,
    letterSpacing: sizeConfig.letterSpacing || undefined,
    color: getTextColor(color, theme),
    textDecorationLine: 'underline',
    textAlign: 'center',
    ...createTextStyle(fontFamily, variantConfig.fontWeight),
  };
};

/**
 * Builds the pressed-state background style for the link button.
 * Figma shows a 15% opacity fill of the respective color on press.
 */
export const getLinkButtonPressedStyle = (color: LinkButtonColor, theme: TwigsTheme): ViewStyle => {
  const bgColorMap: Record<LinkButtonColor, string> = {
    primary: colorOpacity(theme.colors.primary500, PRESSED_BG_OPACITY),
    default: colorOpacity(theme.colors.secondary500, PRESSED_BG_OPACITY),
  };
  return { backgroundColor: bgColorMap[color] };
};
