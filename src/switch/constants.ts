import type { SwitchSize } from './types';

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
      height: 14,
    },
    thumb: {
      size: 12,
      offPosition: 1,
      onPosition: 15,
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

export const getSwitchSizeConfig = (size: SwitchSize): SwitchSizeConfig =>
  SWITCH_SIZE_CONFIGS[size] || SWITCH_SIZE_CONFIGS[DEFAULT_SWITCH_SIZE];
