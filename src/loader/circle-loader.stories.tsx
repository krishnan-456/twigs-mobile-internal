import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { CircleLoader } from './circle-loader';
import type { CircleLoaderProps } from './types';

const meta = {
  title: 'Components/CircleLoader',
  component: CircleLoader,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Diameter preset',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'bright', 'negative', 'accent'],
      description: 'Color variant',
    },
  },
  args: {
    size: 'md',
    color: 'primary',
  },
} satisfies Meta<CircleLoaderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { color: 'secondary' },
};

export const Negative: Story = {
  args: { color: 'negative' },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <CircleLoader size="xs" />
      <CircleLoader size="sm" />
      <CircleLoader size="md" />
      <CircleLoader size="lg" />
      <CircleLoader size="xl" />
    </View>
  ),
};
