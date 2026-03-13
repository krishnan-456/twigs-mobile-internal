import { StyleSheet } from 'react-native';
import {
  ALERT_PADDING_LEFT,
  ALERT_PADDING_RIGHT,
  ALERT_PADDING_VERTICAL,
  ALERT_GAP,
  ALERT_BORDER_RADIUS,
  ALERT_MIN_HEIGHT,
} from './constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ALERT_PADDING_LEFT,
    paddingRight: ALERT_PADDING_RIGHT,
    paddingVertical: ALERT_PADDING_VERTICAL,
    gap: ALERT_GAP,
    borderRadius: ALERT_BORDER_RADIUS,
    overflow: 'hidden',
    minHeight: ALERT_MIN_HEIGHT,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
