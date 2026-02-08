import type { RadioSize } from './types';

export interface RadioSizeConfig {
  outer: { width: number; height: number };
  inner: { width: number; height: number };
}

export const RADIO_SIZE_CONFIGS: Record<RadioSize, RadioSizeConfig> = {
  sm: {
    outer: { width: 14, height: 14 },
    inner: { width: 8, height: 8 },
  },
  md: {
    outer: { width: 18, height: 18 },
    inner: { width: 12, height: 12 },
  },
};

/** Resolved size config for a given radio size. */
export const getRadioSizeConfig = (size: RadioSize): RadioSizeConfig =>
  RADIO_SIZE_CONFIGS[size] || RADIO_SIZE_CONFIGS.sm;
