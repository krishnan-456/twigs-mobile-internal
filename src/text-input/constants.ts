import type { TextInputSize } from './types';

export interface TextInputSizeConfig {
  height: number;
  borderRadius: number;
  fontSize: number;
  paddingHorizontal: number;
  leftIconPadding: number;
  rightIconPadding: number;
  iconSize: number;
}

const SIZE_CONFIGS: Record<TextInputSize, TextInputSizeConfig> = {
  sm: {
    height: 32,
    borderRadius: 6,
    fontSize: 12,
    paddingHorizontal: 8,
    leftIconPadding: 40,
    rightIconPadding: 40,
    iconSize: 20,
  },
  md: {
    height: 40,
    borderRadius: 8,
    fontSize: 14,
    paddingHorizontal: 10,
    leftIconPadding: 40,
    rightIconPadding: 40,
    iconSize: 20,
  },
  lg: {
    height: 44,
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 12,
    leftIconPadding: 40,
    rightIconPadding: 40,
    iconSize: 20,
  },
  xl: {
    height: 48,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 14,
    leftIconPadding: 42,
    rightIconPadding: 42,
    iconSize: 22,
  },
  '2xl': {
    height: 56,
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 16,
    leftIconPadding: 42,
    rightIconPadding: 42,
    iconSize: 24,
  },
};

/** Resolved size config for a given text-input size. */
export const getSizeConfig = (size: TextInputSize): TextInputSizeConfig => SIZE_CONFIGS[size];
