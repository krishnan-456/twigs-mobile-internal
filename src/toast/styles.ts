import { StyleSheet } from 'react-native';
import { TOAST_CONTENT_GAP } from './constants';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gestureRoot: {
    flex: 1,
  },
  stackContainer: {
    width: '100%',
  },
  toastWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    gap: TOAST_CONTENT_GAP,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    flexShrink: 1,
  },
  description: {
    flexShrink: 1,
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
