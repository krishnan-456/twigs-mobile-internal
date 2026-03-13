import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Tooltip } from './tooltip';
import { Button } from '../button';
import { Text } from '../text';
import type { TooltipProps } from './types';

const TooltipDemo = (args: TooltipProps) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 80 }}>
    <Tooltip {...args}>
      <Button size="md" variant="outline">
        Hover me
      </Button>
    </Tooltip>
  </View>
);

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content text',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Placement side',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment along the side axis',
    },
    hasArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow pointer',
    },
    sideOffset: {
      control: 'number',
      description: 'Distance between tooltip and trigger',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Auto-dismiss duration in ms (0 = no auto-dismiss)',
    },
    triggerAction: {
      control: 'select',
      options: ['press', 'longPress'],
      description: 'Trigger interaction type',
    },
  },
  args: {
    content: 'Tooltip message will show up here',
    side: 'top',
    align: 'center',
    hasArrow: true,
    sideOffset: 6,
    autoHideDuration: 0,
    triggerAction: 'press',
  },
} satisfies Meta<TooltipProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Tooltip</RNText>
      <RNText style={docsStyles.description}>
        A floating label that appears on press or long press. Supports all four sides, arrow
        pointers, auto-dismiss, and custom rich content.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• content — string or ReactNode</RNText>
        <RNText style={docsStyles.prop}>
          • side — 'top' | 'right' | 'bottom' | 'left' (default: 'top')
        </RNText>
        <RNText style={docsStyles.prop}>
          • align — 'start' | 'center' | 'end' (default: 'center')
        </RNText>
        <RNText style={docsStyles.prop}>• hasArrow — boolean (default: true)</RNText>
        <RNText style={docsStyles.prop}>• triggerAction — 'press' | 'longPress'</RNText>
        <RNText style={docsStyles.prop}>• autoHideDuration — ms (0 = never)</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <RNText style={docsStyles.prop}>Tap the button to see the tooltip.</RNText>
        <View style={{ alignItems: 'center', paddingVertical: 40 }}>
          <Tooltip content="Hello!" side="top">
            <Button size="sm" variant="outline">Tap me</Button>
          </Tooltip>
        </View>
      </View>
    </View>
  ),
};

export const Default: Story = {
  render: (args) => <TooltipDemo {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 40, padding: 80 }}>
      <Tooltip content="Top tooltip" side="top">
        <Button size="sm" variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button size="sm" variant="outline">Bottom</Button>
      </Tooltip>
      <View style={{ flexDirection: 'row', gap: 60 }}>
        <Tooltip content="Left tooltip" side="left">
          <Button size="sm" variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <Button size="sm" variant="outline">Right</Button>
        </Tooltip>
      </View>
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Tooltip content="No arrow" hasArrow={false}>
          <Button size="sm" variant="outline">No Arrow</Button>
        </Tooltip>
        <Tooltip
          content={
            <View style={{ padding: 4 }}>
              <Text fontSize={14} fontWeight="700" color="#FFFFFF">Custom Title</Text>
              <Text fontSize={12} color="#FFFFFFCC">With rich content</Text>
            </View>
          }
        >
          <Button size="sm" variant="outline">Rich Content</Button>
        </Tooltip>
      </View>
    </View>
  ),
};
