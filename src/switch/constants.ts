import type { SwitchColor, SwitchSize } from './types';

export interface SwitchSizeConfig {
  track: {
    width: number;
    height: number;
  };
  thumb: {
    size: number;
    offPosition: number;
    onPosition: number;
  };
}

export const SWITCH_SIZE_CONFIGS: Record<SwitchSize, SwitchSizeConfig> = {
  sm: {
    track: {
      width: 28,
      height: 16,
    },
    thumb: {
      size: 14,
      offPosition: 1,
      onPosition: 13,
    },
  },
  md: {
    track: {
      width: 40,
      height: 20,
    },
    thumb: {
      size: 18,
      offPosition: 1,
      onPosition: 21,
    },
  },
};

export const DEFAULT_SWITCH_SIZE: SwitchSize = 'md';

export const CHECKED_COLOR_MAP: Record<SwitchColor, 'primary500' | 'secondary600'> = {
  primary: 'primary500',
  secondary: 'secondary600',
};

export const getSwitchSizeConfig = (size: SwitchSize): SwitchSizeConfig =>
  SWITCH_SIZE_CONFIGS[size] || SWITCH_SIZE_CONFIGS[DEFAULT_SWITCH_SIZE];
