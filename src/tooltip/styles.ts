import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  contentWrapper: {
    position: 'absolute',
  },
  arrowContainer: {
    position: 'absolute',
  },
});
