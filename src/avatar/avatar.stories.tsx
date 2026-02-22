import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Avatar } from './avatar';
import type { AvatarProps } from './types';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      description: 'Size preset',
    },
    name: {
      control: 'text',
      description: 'Name used for initials and accessibility label',
    },
    imageSrc: {
      control: 'text',
      description: 'Image URL for the avatar',
    },
    rounded: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius variant',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    textColor: {
      control: 'color',
      description: 'Custom text/initials color',
    },
    textSize: {
      control: 'number',
      description: 'Custom font size for initials',
    },
    width: {
      control: 'number',
      description: 'Custom width (overrides size)',
    },
    height: {
      control: 'number',
      description: 'Custom height (overrides size)',
    },
  },
  args: {
    name: 'John Doe',
    size: 'md',
    rounded: 'full',
  },
} satisfies Meta<AvatarProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    name: 'Jane Smith',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    name: 'Bob Wilson',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'Alice Cooper',
    size: 'xl',
  },
};

export const CustomColors: Story = {
  args: {
    name: 'Custom',
    size: 'lg',
    backgroundColor: '#6366f1',
    textColor: '#ffffff',
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Avatar name="A" size="xs" />
      <Avatar name="B" size="sm" />
      <Avatar name="C" size="md" />
      <Avatar name="D" size="lg" />
      <Avatar name="E" size="xl" />
    </View>
  ),
};
