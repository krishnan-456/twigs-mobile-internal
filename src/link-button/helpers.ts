import type { TextStyle, ViewStyle } from 'react-native';
import { colorOpacity } from '../utils';
import type { TwigsTheme } from '../theme';
import type { LinkButtonSize, LinkButtonColor, LinkButtonVariant } from './types';
import { SIZE_CONFIG, VARIANT_CONFIG, PRESSED_BG_OPACITY } from './constants';

interface LinkButtonColorConfig {
  text: string;
  pressedText: string;
}

const getColorConfig = (
  color: LinkButtonColor,
  theme: TwigsTheme
): LinkButtonColorConfig => {
  const map: Record<LinkButtonColor, LinkButtonColorConfig> = {
    primary: {
      text: theme.colors.primary500,
      pressedText: theme.colors.primary600,
    },
    secondary: {
      text: theme.colors.secondary600,
      pressedText: theme.colors.secondary700,
    },
    light: {
      text: theme.colors.white900,
      pressedText: theme.colors.white900,
    },
  };
  return map[color];
};

export const getLinkButtonTextStyles = ({
  size,
  color,
  variant,
  pressed,
  theme,
}: {
  size: LinkButtonSize;
  color: LinkButtonColor;
  variant: LinkButtonVariant;
  pressed: boolean;
  theme: TwigsTheme;
}): TextStyle => {
  const sizeConfig = SIZE_CONFIG[size];
  const variantConfig = VARIANT_CONFIG[variant];
  const colorConfig = getColorConfig(color, theme);

  const fontSize = theme.fontSizes[sizeConfig.fontSize as keyof typeof theme.fontSizes];
  const lineHeight = theme.lineHeights[sizeConfig.lineHeight as keyof typeof theme.lineHeights];
  const fontFamily = theme.fonts[variantConfig.fontFamily as keyof typeof theme.fonts];

  return {
    fontSize,
    lineHeight,
    letterSpacing: sizeConfig.letterSpacing || undefined,
    color: pressed ? colorConfig.pressedText : colorConfig.text,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily,
  };
};

export const getLinkButtonPressedStyle = (color: LinkButtonColor, theme: TwigsTheme): ViewStyle => {
  const bgColorMap: Record<LinkButtonColor, string> = {
    primary: colorOpacity(theme.colors.primary500, PRESSED_BG_OPACITY),
    secondary: colorOpacity(theme.colors.secondary500, PRESSED_BG_OPACITY),
    light: colorOpacity(theme.colors.white900, PRESSED_BG_OPACITY),
  };
  return { backgroundColor: bgColorMap[color] };
};
