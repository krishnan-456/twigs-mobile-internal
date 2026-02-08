import { StyleSheet } from 'react-native';

export const checkboxStyles = StyleSheet.create({
  checkboxBase: {
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  checkboxSm: {
    width: 16,
    height: 16,
  },
  checkboxMd: {
    width: 20,
    height: 20,
  },
  checkboxDisabled: {
    opacity: 0.4,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
