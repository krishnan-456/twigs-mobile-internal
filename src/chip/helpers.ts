import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import { colorOpacity, createTextStyle } from '../utils';
import type { ChipSize, ChipColor, ChipRounded } from './types';
import {
  SIZE_CONFIG,
  ROUNDED_RADII,
  COLOR_TOKENS,
} from './constants';

export function getSizeStyles(size: ChipSize, rounded: ChipRounded): ViewStyle {
  const config = SIZE_CONFIG[size];
  return {
    height: config.height,
    paddingHorizontal: config.paddingHorizontal,
    borderRadius: ROUNDED_RADII[rounded],
  };
}

export function getRegularStyles(theme: TwigsTheme, color: ChipColor): ViewStyle {
  const t = COLOR_TOKENS[color];
  return {
    backgroundColor: theme.colors[t.regularBg],
    borderWidth: 1,
    borderColor: theme.colors[t.regularBorder],
  };
}

export function getPressedStyles(theme: TwigsTheme, color: ChipColor): ViewStyle {
  const t = COLOR_TOKENS[color];
  return {
    backgroundColor: colorOpacity(theme.colors[t.pressedBgBase], t.pressedBgOpacity),
    borderWidth: 1,
    borderColor: theme.colors[t.pressedBorder],
  };
}

export function getActiveStyles(theme: TwigsTheme, color: ChipColor): ViewStyle {
  const t = COLOR_TOKENS[color];
  const bg = t.activeBg
    ? theme.colors[t.activeBg]
    : colorOpacity(theme.colors[t.activeBgBase!], t.activeBgOpacity);

  return {
    backgroundColor: bg,
    borderWidth: t.activeBorder ? 1 : 0,
    ...(t.activeBorder && { borderColor: theme.colors[t.activeBorder] }),
  };
}

export function getTextStyles(
  theme: TwigsTheme,
  color: ChipColor,
  size: ChipSize,
  active: boolean
): TextStyle {
  const config = SIZE_CONFIG[size];
  const t = COLOR_TOKENS[color];

  return {
    color: active ? theme.colors[t.activeText] : theme.colors[t.regularText],
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    ...createTextStyle(theme.fonts.medium, '500'),
  };
}

export function getIconSize(size: ChipSize): number {
  return SIZE_CONFIG[size].iconSize;
}

export function getIconColor(
  theme: TwigsTheme,
  color: ChipColor,
  active: boolean
): string {
  const t = COLOR_TOKENS[color];
  return active ? theme.colors[t.activeText] : theme.colors[t.regularText];
}
