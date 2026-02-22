import React, { useCallback, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Pressable, Text, View } from 'react-native';
import BottomSheetLib from '@gorhom/bottom-sheet';
import { BottomSheet } from './bottom-sheet';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetProps } from './types';

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
            <Text style={{ color: '#fff', fontWeight: '600' }}>Open Bottom Sheet</Text>
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
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              {args.title || 'Bottom Sheet'}
            </Text>
            <Text>This is the bottom sheet content. Drag down or tap close to dismiss.</Text>
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
              <Text style={{ color: '#00828D', fontWeight: '600' }}>Close</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheet>
      </View>
    );
  },
};
