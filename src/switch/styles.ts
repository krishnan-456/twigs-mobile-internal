import { StyleSheet } from 'react-native';
import type { TwigsTheme } from '../theme';

export const createSwitchStyles = (theme: TwigsTheme) =>
  StyleSheet.create({
    switchBase: {
      borderRadius: 100,
      justifyContent: 'center',
    },
    thumbBase: {
      borderRadius: 100,
      backgroundColor: theme.colors.white900,
    },
  });
