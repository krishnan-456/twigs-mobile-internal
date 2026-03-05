import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { Avatar } from './avatar';
import { AvatarGroup } from './avatar-group';
import type { AvatarGroupProps } from './avatar-group.types';

const SAMPLE_AVATARS = [
  { name: 'Ava Smith', imageSrc: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Noah Brown', imageSrc: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Mia Davis', imageSrc: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Liam Wilson', imageSrc: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Emma Taylor', imageSrc: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Leo Thomas', imageSrc: 'https://i.pravatar.cc/150?img=6' },
  { name: 'Zoe Clark', imageSrc: 'https://i.pravatar.cc/150?img=7' },
];

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
});

const DEFAULT_STORY_CHILDREN = SAMPLE_AVATARS.slice(0, 4).map((avatar) => (
  <Avatar key={`default-${avatar.name}`} name={avatar.name} imageSrc={avatar.imageSrc} />
));

const renderGroup = (args: AvatarGroupProps, count = SAMPLE_AVATARS.length) => (
  <AvatarGroup {...args}>
    {SAMPLE_AVATARS.slice(0, count).map((avatar) => (
      <Avatar key={avatar.name} name={avatar.name} imageSrc={avatar.imageSrc} />
    ))}
  </AvatarGroup>
);

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  argTypes: {
    limit: {
      control: 'number',
      description: 'Maximum visible avatars before showing an overflow avatar',
    },
    limitExceededLabel: {
      control: 'text',
      description: 'Custom overflow text label',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      description: 'Avatar size applied to all children',
    },
    rounded: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius variant',
    },
    children: {
      control: false,
      description: 'Avatar children',
    },
  },
  args: {
    size: 'sm',
    rounded: 'full',
    limit: 4,
    children: DEFAULT_STORY_CHILDREN,
  },
} satisfies Meta<AvatarGroupProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => renderGroup(args),
};

export const NoLimit: Story = {
  args: {
    limit: 0,
  },
  render: (args) => renderGroup(args, 5),
};

export const CustomOverflowLabel: Story = {
  args: {
    limit: 3,
    limitExceededLabel: 'Team',
  },
  render: (args) => renderGroup(args),
};

export const RoundedLarge: Story = {
  args: {
    size: 'lg',
    rounded: 'lg',
    limit: 4,
  },
  render: (args) => renderGroup(args),
};

export const AllSizes: Story = {
  render: () => (
    <View style={styles.stack}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <AvatarGroup key={size} size={size} limit={4}>
          {SAMPLE_AVATARS.slice(0, 6).map((avatar) => (
            <Avatar key={`${size}-${avatar.name}`} name={avatar.name} imageSrc={avatar.imageSrc} />
          ))}
        </AvatarGroup>
      ))}
    </View>
  ),
};
