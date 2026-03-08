import React, { useCallback, useRef } from 'react';
import { View, Pressable, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import BottomSheetLib from '@gorhom/bottom-sheet';
import { BottomSheet } from './bottom-sheet';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed in the bottom sheet header',
    },
    enablePanDownToClose: {
      control: 'boolean',
      description: 'Allow closing by dragging down',
    },
  },
  args: {
    title: 'Bottom Sheet',
    enablePanDownToClose: true,
  },
} satisfies Meta<BottomSheetProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>BottomSheet</RNText>
      <RNText style={docsStyles.description}>
        A slide-up panel anchored to the bottom of the screen. Built on @gorhom/bottom-sheet with
        snap points, drag-to-close, and a customizable header.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• title — header title string</RNText>
        <RNText style={docsStyles.prop}>
          • enablePanDownToClose — boolean (default: true)
        </RNText>
        <RNText style={docsStyles.prop}>• snapPoints — array of snap points</RNText>
        <RNText style={docsStyles.prop}>• index — initial snap point index</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <RNText style={docsStyles.prop}>
          Use the Default story to interact with the bottom sheet.
        </RNText>
      </View>
    </View>
  ),
};

export const Default: Story = {
  render: (args) => {
    const ref = useRef<BottomSheetLib>(null);

    const handleOpen = useCallback(() => {
      ref.current?.expand();
    }, []);

    const handleClose = useCallback(() => {
      ref.current?.close();
    }, []);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Pressable
            onPress={handleOpen}
            style={{
              backgroundColor: '#00828D',
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <RNText style={{ color: '#fff', fontWeight: '600' }}>Open Bottom Sheet</RNText>
          </Pressable>
        </View>

        <BottomSheet
          ref={ref}
          index={-1}
          snapPoints={['25%', '50%']}
          enablePanDownToClose={args.enablePanDownToClose}
          title={args.title}
        >
          <BottomSheetView style={{ padding: 16 }}>
            <RNText style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              {args.title || 'Bottom Sheet'}
            </RNText>
            <RNText>This is the bottom sheet content. Drag down or tap close to dismiss.</RNText>
            <Pressable
              onPress={handleClose}
              style={{
                marginTop: 16,
                borderWidth: 1,
                borderColor: '#00828D',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <RNText style={{ color: '#00828D', fontWeight: '600' }}>Close</RNText>
            </Pressable>
          </BottomSheetView>
        </BottomSheet>
      </View>
    );
  },
};
