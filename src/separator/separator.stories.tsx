import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';
import { Separator } from './separator';
import type { SeparatorProps } from './types';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the separator line',
    },
    color: {
      control: 'color',
      description: 'Custom color for the separator line',
    },
    decorative: {
      control: 'boolean',
      description: 'When true, hidden from assistive technologies',
    },
    margin: {
      control: 'number',
      description: 'Margin around the separator',
    },
    marginHorizontal: {
      control: 'number',
      description: 'Horizontal margin',
    },
    marginVertical: {
      control: 'number',
      description: 'Vertical margin',
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: false,
  },
} satisfies Meta<SeparatorProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <View style={{ padding: 16 }}>
      <Text>Content above</Text>
      <Separator {...args} css={{ marginVertical: 12 }} />
      <Text>Content below</Text>
    </View>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 }}>
      <Text>Left</Text>
      <Separator {...args} css={{ height: 24 }} />
      <Text>Right</Text>
    </View>
  ),
};

export const CustomColor: Story = {
  args: {
    color: '#6366f1',
  },
  render: (args) => (
    <View style={{ padding: 16 }}>
      <Text>Above</Text>
      <Separator {...args} css={{ marginVertical: 12 }} />
      <Text>Below</Text>
    </View>
  ),
};
