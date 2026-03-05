import { StyleSheet } from 'react-native';

export const avatarGroupStyles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    zIndex: 0,
    overflow: 'hidden',
  },
  overflowOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
