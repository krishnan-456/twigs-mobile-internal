import type { RadioSize } from './types';

export interface RadioSizeConfig {
  outerSize: number;
  innerSize: number;
}

export const RADIO_SIZE_CONFIGS: Record<RadioSize, RadioSizeConfig> = {
  sm: { outerSize: 16, innerSize: 8 },
  md: { outerSize: 20, innerSize: 12 },
};

/** Resolved size config for a given radio size. */
export const getRadioSizeConfig = (size: RadioSize): RadioSizeConfig => RADIO_SIZE_CONFIGS[size] || RADIO_SIZE_CONFIGS.sm;
