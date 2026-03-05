import { StyleSheet } from 'react-native';
import type { TwigsTheme } from '../theme';

export const createRadioStyles = (theme: TwigsTheme) =>
  StyleSheet.create({
    outerCircle: {
      borderRadius: theme.radii.round,
      borderWidth: theme.borderWidths.xs,
      backgroundColor: theme.colors.white900,
    },
    innerCircle: {
      backgroundColor: theme.colors.secondary500,
      borderRadius: theme.radii.round,
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
