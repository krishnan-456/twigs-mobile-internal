import { StyleSheet } from 'react-native';
import type { TwigsTheme } from '../theme';
import { SWITCH_WIDTH, SWITCH_HEIGHT, THUMB_SIZE } from './constants';

export const createSwitchStyles = (theme: TwigsTheme) =>
  StyleSheet.create({
    switch: {
      width: SWITCH_WIDTH,
      height: SWITCH_HEIGHT,
      borderRadius: 100,
      justifyContent: 'center',
    },
    switchDisabled: {
      opacity: 0.5,
    },
    thumb: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: 100,
      backgroundColor: theme.colors.white900,
    },
  });
