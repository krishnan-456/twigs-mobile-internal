import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { LineLoader } from './line-loader';
import type { LineLoaderProps } from './types';

const meta = {
  title: 'Components/LineLoader',
  component: LineLoader,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size preset (width x height)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'bright', 'negative', 'accent'],
      description: 'Color variant',
    },
  },
  args: {
    size: 'sm',
    color: 'primary',
  },
} satisfies Meta<LineLoaderProps>;

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
    <View style={{ gap: 16 }}>
      <LineLoader size="sm" />
      <LineLoader size="md" />
      <LineLoader size="lg" />
      <LineLoader size="xl" />
    </View>
  ),
};
