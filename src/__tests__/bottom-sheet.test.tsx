import React from 'react';
import { Text } from 'react-native';
import {
  BottomSheet,
  BottomSheetModal,
  BottomSheetHeader,
} from '../bottom-sheet';
import type { SharedValue } from 'react-native-reanimated';
import { wrap } from './test-utils';

describe('BottomSheet', () => {
  // ── Render ──

  describe('Render', () => {
    it('renders with children', () => {
      const { getByText } = wrap(
        <BottomSheet snapPoints={['50%']}>
          <Text>Content</Text>
        </BottomSheet>
      );
      expect(getByText('Content')).toBeTruthy();
    });

    it('BottomSheetModal renders with children', () => {
      const { getByText } = wrap(
        <BottomSheetModal snapPoints={['50%']}>
          <Text>Modal Content</Text>
        </BottomSheetModal>
      );
      expect(getByText('Modal Content')).toBeTruthy();
    });
  });

  // ── Props ──

  describe('Props', () => {
    it('title prop renders header text', () => {
      const { getByText } = wrap(
        <BottomSheet snapPoints={['50%']} title="Sheet Title">
          <Text>Content</Text>
        </BottomSheet>
      );
      expect(getByText('Sheet Title')).toBeTruthy();
    });

    it('style prop is forwarded', () => {
      const customStyle = { backgroundColor: 'red' as const };
      const { getByText } = wrap(
        <BottomSheet snapPoints={['50%']} style={customStyle}>
          <Text>Content</Text>
        </BottomSheet>
      );
      expect(getByText('Content')).toBeTruthy();
      // Traverse up to find the BottomSheet container View that receives the merged style
      let node: ReturnType<typeof getByText> | null = getByText('Content');
      let foundStyle = false;
      while (node) {
        const style = node.props?.style;
        const flatStyle = Array.isArray(style)
          ? Object.assign({}, ...(style as object[]).filter(Boolean))
          : (style as object) ?? {};
        if (flatStyle && typeof flatStyle === 'object' && 'backgroundColor' in flatStyle) {
          foundStyle = true;
          expect(flatStyle).toMatchObject(customStyle);
          break;
        }
        node = node.parent as typeof node | null;
      }
      expect(foundStyle).toBe(true);
    });
  });

  // ── BottomSheetHeader ──

  describe('BottomSheetHeader', () => {
    it('renders title text', () => {
      const animatedIndex = { value: 0 } as unknown as SharedValue<number>;
      const animatedPosition = { value: 0 } as unknown as SharedValue<number>;
      const { getByText } = wrap(
        <BottomSheetHeader
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
          title="Header Title"
        />
      );
      expect(getByText('Header Title')).toBeTruthy();
    });

    it('renders without title (no crash)', () => {
      const animatedIndex = { value: 0 } as unknown as SharedValue<number>;
      const animatedPosition = { value: 0 } as unknown as SharedValue<number>;
      const { toJSON } = wrap(
        <BottomSheetHeader
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
        />
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  // ── Accessibility ──

  describe('Accessibility', () => {
    it('component mounts accessible', () => {
      const { getByText } = wrap(
        <BottomSheet snapPoints={['50%']}>
          <Text>Content</Text>
        </BottomSheet>
      );
      expect(getByText('Content')).toBeTruthy();
    });
  });

  // ── Ref forwarding ──

  describe('Ref forwarding', () => {
    it('BottomSheet forwards ref', () => {
      const ref = React.createRef();
      wrap(
        <BottomSheet ref={ref as React.Ref<unknown>} snapPoints={['50%']}>
          <Text>Content</Text>
        </BottomSheet>
      );
      expect(ref.current).toBeTruthy();
    });
  });
});
