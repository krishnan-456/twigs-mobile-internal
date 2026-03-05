import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

interface IconProps {
  size: number;
  color: string;
}

/** Default info icon */
export const InfoIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M9.16667 12.9167H11.0911M10.1325 12.9167V9.375H9.17417M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="9.78125" cy="7.03125" r="0.78125" fill={color} />
  </Svg>
);

/** Default success icon */
export const SuccessIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M7.03667 10.2825L8.8425 12.0883L8.83083 12.0767L12.905 8.0025M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/** Default warning icon */
export const WarningIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10.8333 6.66667L8.33332 9.16667L11.6667 10.8333L9.16665 13.3333M5.66667 16.5L3.41667 14.25C2.83333 13.6667 2.5 12.8333 2.5 11.9167V8.08333C2.5 7.16667 2.83333 6.33333 3.5 5.75L5.75 3.5C6.33333 2.83333 7.16667 2.5 8.08333 2.5H12C12.9167 2.5 13.75 2.83333 14.3333 3.5L16.5833 5.75C17.1667 6.33333 17.5 7.16667 17.5 8.08333V12C17.5 12.9167 17.1667 13.75 16.5 14.3333L14.25 16.5833C13.5833 17.25 12.75 17.5833 11.9167 17.5833H8.08333C7.16667 17.5 6.33333 17.1667 5.66667 16.5Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/** Default error icon */
export const ErrorIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 10.9333V7.81666M11.6908 3.44916L18.0733 14.6192C18.815 15.9175 17.8775 17.5333 16.3825 17.5333H3.61751C2.12167 17.5333 1.18417 15.9175 1.92667 14.6192L8.30917 3.44916C9.05667 2.13999 10.9433 2.13999 11.6908 3.44916Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="10" cy="13.3333" r="0.75" fill={color} stroke={color} strokeWidth={0.166667} />
  </Svg>
);

/** Close icon */
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

/** Map status to default icon component */
export const STATUS_ICONS = {
  default: InfoIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};
