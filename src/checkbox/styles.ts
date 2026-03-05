import { StyleSheet } from 'react-native';
import type { TwigsTheme } from '../theme';

export const createCheckboxStyles = (theme: TwigsTheme) =>
  StyleSheet.create({
    checkboxBase: {
      borderRadius: theme.radii.sm,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: theme.borderWidths.xs,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
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
