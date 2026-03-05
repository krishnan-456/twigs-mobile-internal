import type { RadioSize } from './types';

export interface RadioSizeConfig {
  outer: { width: number; height: number };
  inner: { width: number; height: number };
}

export const RADIO_SIZE_CONFIGS: Record<RadioSize, RadioSizeConfig> = {
  sm: {
    outer: { width: 16, height: 16 },
    inner: { width: 8, height: 8 },
  },
  md: {
    outer: { width: 20, height: 20 },
    inner: { width: 12, height: 12 },
  },
};

/** Resolved size config for a given radio size. */
export const getRadioSizeConfig = (size: RadioSize): RadioSizeConfig =>
  RADIO_SIZE_CONFIGS[size] || RADIO_SIZE_CONFIGS.sm;
