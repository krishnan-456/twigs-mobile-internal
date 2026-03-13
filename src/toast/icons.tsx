import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import type { ToastIconProps, ToastInfoIconProps } from './types';

/** Filled check-circle icon for success/default variants. */
export const CheckCircleFilledIcon = ({ size, color }: ToastIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 12C3 16.9699 7.03011 21 12 21C16.9699 21 21 16.9699 21 12C21 7.03011 16.9699 3 12 3C7.03011 3 3 7.03011 3 12ZM16.5055 10.7559C16.9071 10.3542 16.9071 9.70294 16.5055 9.30126C16.1038 8.89958 15.4525 8.89958 15.0508 9.30126L10.7782 13.5739L8.50611 11.3004C8.10456 10.8986 7.4533 10.8984 7.05149 11.3C6.64968 11.7015 6.64948 12.3528 7.05103 12.7546L10.0504 15.7559C10.2433 15.9489 10.5049 16.0573 10.7778 16.0574C11.0506 16.0574 11.3123 15.949 11.5052 15.7561L16.5055 10.7559Z"
      fill={color}
    />
  </Svg>
);

/** Filled alert-triangle icon for error variant. */
export const AlertFilledIcon = ({ size, color }: ToastIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.9023 4.62993L21.083 17.1968C21.9174 18.6575 20.8627 20.4754 19.1807 20.4754H4.81933C3.13643 20.4754 2.08169 18.6575 2.91705 17.1968L10.0977 4.62993C10.9387 3.15704 13.0613 3.15704 13.9023 4.62993ZM12 7.50002C12.5564 7.50002 13.0075 7.95113 13.0075 8.5076V12.1783C13.0075 12.7348 12.5564 13.1859 12 13.1859C11.4435 13.1859 10.9924 12.7348 10.9924 12.1783V8.5076C10.9924 7.95113 11.4435 7.50002 12 7.50002ZM12.0001 17.8C12.7733 17.8 13.4001 17.1732 13.4001 16.4C13.4001 15.6268 12.7733 15 12.0001 15C11.2269 15 10.6001 15.6268 10.6001 16.4C10.6001 17.1732 11.2269 17.8 12.0001 17.8Z"
      fill={color}
    />
  </Svg>
);

/** Filled info-circle icon with inner cutout color for the "i" glyph. */
export const InfoCircleFilledIcon = ({ size, color, innerColor }: ToastInfoIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      fill={color}
    />
    <Path
      d="M10.5 16.25H13.5M12.159 16.125V11.25H10.875"
      stroke={innerColor}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="11.8125" cy="8.4375" r="0.5" stroke={innerColor} strokeWidth={0.875} />
  </Svg>
);

export const VARIANT_ICONS: Record<string, React.FC<ToastIconProps>> = {
  default: CheckCircleFilledIcon,
  secondary: CheckCircleFilledIcon,
  success: CheckCircleFilledIcon,
  error: AlertFilledIcon,
};
