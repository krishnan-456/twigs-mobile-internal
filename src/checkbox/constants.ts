import type { CheckboxSize } from './types';

export interface CheckboxSizeConfig {
  width: number;
  height: number;
  iconSize: number;
}

export const CHECKBOX_SIZE_CONFIGS: Record<CheckboxSize, CheckboxSizeConfig> = {
  sm: {
    width: 16,
    height: 16,
    iconSize: 14,
  },
  md: {
    width: 20,
    height: 20,
    iconSize: 16,
  },
};

/** Returns resolved size config for the checkbox variant. */
export const getCheckboxSizeConfig = (size: CheckboxSize): CheckboxSizeConfig =>
  CHECKBOX_SIZE_CONFIGS[size] || CHECKBOX_SIZE_CONFIGS.sm;
