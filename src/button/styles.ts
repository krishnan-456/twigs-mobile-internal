import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  buttonBase: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
