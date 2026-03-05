import { StyleSheet } from 'react-native';
import {
  HEADER_PADDING_TOP,
  HEADER_PADDING_HORIZONTAL,
  HEADER_GAP,
  BODY_PADDING_HORIZONTAL,
  BODY_PADDING_VERTICAL,
  FOOTER_PADDING_HORIZONTAL,
  FOOTER_PADDING_BOTTOM,
  FOOTER_PADDING_TOP,
  FOOTER_GAP,
} from './constants';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    overflow: 'hidden',
  },
  header: {
    paddingTop: HEADER_PADDING_TOP,
    paddingHorizontal: HEADER_PADDING_HORIZONTAL,
    gap: HEADER_GAP,
    alignItems: 'center',
  },
  body: {
    paddingHorizontal: BODY_PADDING_HORIZONTAL,
    paddingVertical: BODY_PADDING_VERTICAL,
  },
  footer: {
    paddingHorizontal: FOOTER_PADDING_HORIZONTAL,
    paddingBottom: FOOTER_PADDING_BOTTOM,
    paddingTop: FOOTER_PADDING_TOP,
    flexDirection: 'row',
    gap: FOOTER_GAP,
  },
  footerChild: {
    flex: 1,
  },
});
