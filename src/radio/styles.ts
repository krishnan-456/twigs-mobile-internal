import { StyleSheet } from 'react-native';
import type { TwigsTheme } from '../theme';

export const createRadioStyles = (theme: TwigsTheme) =>
  StyleSheet.create({
    outerCircle: {
      borderWidth: theme.borderWidths.xs,
      backgroundColor: theme.colors.white900,
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerCircle: {
      backgroundColor: theme.colors.secondary500,
    },
    labelContainer: {
      marginLeft: theme.space['4'],
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    containerDisabled: {
      opacity: 0.5,
    },
  });
