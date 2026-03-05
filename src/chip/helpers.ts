import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import { colorOpacity } from '../utils';
import type { ChipSize, ChipColor, ChipVariant, ChipRounded } from './types';
import {
  SIZE_CONFIG,
  ROUNDED_RADII,
  SOLID_COLORS,
  OUTLINE_COLORS,
  SELECTABLE_COLORS,
} from './constants';

/** Returns size-dependent container styles */
export function getSizeStyles(size: ChipSize, rounded: ChipRounded): ViewStyle {
  const config = SIZE_CONFIG[size];
  return {
    height: config.height,
    paddingHorizontal: config.paddingHorizontal,
    borderRadius: ROUNDED_RADII[rounded],
  };
}

/** Returns base container color styles (background, border) */
export function getColorStyles(
  theme: TwigsTheme,
  color: ChipColor,
  variant: ChipVariant,
  selectable: boolean
): ViewStyle {
  if (selectable) {
    return getSelectableBaseStyles(theme, color, variant);
  }

  if (variant === 'outline') {
    const tokens = OUTLINE_COLORS[color];
    return {
      backgroundColor: theme.colors.white900,
      borderWidth: 1,
      borderColor: colorOpacity(theme.colors[tokens.baseColor], tokens.opacity),
    };
  }

  const tokens = SOLID_COLORS[color];
  return {
    backgroundColor: theme.colors[tokens.bg],
  };
}

function getSelectableBaseStyles(
  theme: TwigsTheme,
  color: ChipColor,
  variant: ChipVariant
): ViewStyle {
  const selTokens = SELECTABLE_COLORS[color];

  if (variant === 'outline') {
    const outlineTokens = OUTLINE_COLORS[color];
    return {
      backgroundColor: theme.colors.white900,
      borderWidth: 1,
      borderColor: colorOpacity(theme.colors[outlineTokens.baseColor], outlineTokens.opacity),
    };
  }

  return {
    backgroundColor: colorOpacity(theme.colors[selTokens.baseColor], 0.1),
  };
}

/** Returns styles applied when the chip is pressed (mobile equivalent of hover) */
export function getPressedStyles(
  theme: TwigsTheme,
  color: ChipColor,
  variant: ChipVariant
): ViewStyle {
  const selTokens = SELECTABLE_COLORS[color];

  if (variant === 'outline') {
    return {
      backgroundColor: colorOpacity(theme.colors[selTokens.baseColor], 0.05),
    };
  }

  return {
    backgroundColor: colorOpacity(theme.colors[selTokens.baseColor], 0.15),
  };
}

/** Returns styles applied when the chip is active/selected */
export function getActiveStyles(
  theme: TwigsTheme,
  color: ChipColor,
  variant: ChipVariant
): ViewStyle {
  const selTokens = SELECTABLE_COLORS[color];

  if (variant === 'outline') {
    return {
      backgroundColor: colorOpacity(theme.colors[selTokens.baseColor], 0.1),
      borderColor: theme.colors[selTokens.activeBorder],
    };
  }

  return {
    backgroundColor: colorOpacity(theme.colors[selTokens.baseColor], 0.2),
  };
}

/** Returns text styles for the chip label */
export function getTextStyles(
  theme: TwigsTheme,
  color: ChipColor,
  variant: ChipVariant,
  selectable: boolean,
  size: ChipSize
): TextStyle {
  const config = SIZE_CONFIG[size];
  const textColor = getTextColor(theme, color, variant, selectable);

  return {
    color: textColor,
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    fontFamily: theme.fonts.medium,
    fontWeight: '500',
  };
}

function getTextColor(
  theme: TwigsTheme,
  color: ChipColor,
  variant: ChipVariant,
  selectable: boolean
): string {
  if (selectable || variant === 'outline') {
    return theme.colors.secondary800;
  }

  const tokens = SOLID_COLORS[color];
  return theme.colors[tokens.text];
}

/** Returns the close icon color */
export function getCloseColor(theme: TwigsTheme, color: ChipColor, variant: ChipVariant): string {
  if (variant === 'outline') {
    return theme.colors[OUTLINE_COLORS[color].close];
  }

  return theme.colors[SOLID_COLORS[color].close];
}

/** Returns the side element icon size for a given chip size */
export function getIconSize(size: ChipSize): number {
  return SIZE_CONFIG[size].iconSize;
}

/** Returns the close icon size for a given chip size */
export function getCloseIconSize(size: ChipSize): number {
  return SIZE_CONFIG[size].closeIconSize;
}

/** Returns the icon/side-element color */
export function getIconColor(
  theme: TwigsTheme,
  color: ChipColor,
  variant: ChipVariant,
  selectable: boolean
): string {
  return getTextColor(theme, color, variant, selectable);
}
