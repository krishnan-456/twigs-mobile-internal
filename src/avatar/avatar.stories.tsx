import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Avatar } from './avatar';
import type { AvatarProps } from './types';

const SAMPLE_AVATAR_URL =
  'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=512&h=512&dpr=2&q=80';

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
    isAnonymous: {
      control: 'boolean',
      description: 'Show anonymous avatar style with dashed border and question mark',
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
    imageSrc: SAMPLE_AVATAR_URL,
    isAnonymous: false,
  },
} satisfies Meta<AvatarProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitialsFallback: Story = {
  args: {
    imageSrc: undefined,
    name: 'Jane Smith',
    size: 'lg',
  },
};

export const Anonymous: Story = {
  args: {
    isAnonymous: true,
    name: 'Anonymous User',
    imageSrc: undefined,
    size: '2xl',
  },
};

export const Squircle: Story = {
  args: {
    name: 'Squircle',
    size: 'lg',
    rounded: 'lg',
  },
};

export const CustomColors: Story = {
  args: {
    imageSrc: undefined,
    name: 'Custom',
    size: 'lg',
    backgroundColor: '#EAE9FE',
    textColor: '#4622B5',
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
