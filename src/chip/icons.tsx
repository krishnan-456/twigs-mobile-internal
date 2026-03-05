import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface IconProps {
  size: number;
  color: string;
}

/** Close icon — stroke X, consistent with Alert component's mobile design language */
export const CloseIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M5.33331 5.33331L10.6666 10.6666M10.6666 5.33331L5.33331 10.6666"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
