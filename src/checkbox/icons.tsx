import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface IconProps {
  color?: string;
}

export const TickIcon: React.FC<IconProps> = ({ color }) => (
  <Svg width="10" height="8" viewBox="0 0 10 8">
    <Path
      d="M9 1.25L3.5 6.75L1 4.25"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const HorizontalLineIcon: React.FC<IconProps> = ({ color }) => (
  <Svg width="10" height="2" viewBox="0 0 10 2">
    <Path
      d="M9 1H1"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
