import { StyleSheet } from 'react-native';
import type { TwigsTheme } from '../theme';

export const createRadioStyles = (theme: TwigsTheme) =>
  StyleSheet.create({
    outerCircle: {
      borderRadius: 100,
      borderWidth: 1,
      backgroundColor: theme.colors.white900,
    },
    outerCircleDisabled: {
      opacity: 0.5,
    },
    innerCircle: {
      backgroundColor: theme.colors.secondary500,
      borderRadius: 100,
    },
    labelContainer: {
      marginLeft: 8,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    containerDisabled: {
      opacity: 0.4,
    },
  });
