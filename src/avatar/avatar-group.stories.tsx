import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
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

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

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

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>AvatarGroup</RNText>
      <RNText style={docsStyles.description}>
        Renders a stack of overlapping avatars with an overflow counter when the limit is exceeded.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• size — avatar size applied to all children</RNText>
        <RNText style={docsStyles.prop}>• limit — max visible before overflow (default: none)</RNText>
        <RNText style={docsStyles.prop}>• limitExceededLabel — custom overflow text</RNText>
        <RNText style={docsStyles.prop}>• rounded — border radius variant</RNText>
        <RNText style={docsStyles.prop}>• children — Avatar components</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <AvatarGroup size="sm" limit={3}>
          {SAMPLE_AVATARS.slice(0, 5).map((a) => (
            <Avatar key={a.name} name={a.name} imageSrc={a.imageSrc} />
          ))}
        </AvatarGroup>
      </View>
    </View>
  ),
};

export const Default: Story = {
  render: (args) => renderGroup(args),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
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
