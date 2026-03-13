import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Avatar } from './avatar';
import type { AvatarProps } from './types';

const SAMPLE_AVATAR_URL =
  'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=512&h=512&dpr=2&q=80';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
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
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
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
  },
  args: {
    name: 'John Doe',
    size: 'sm',
    rounded: 'full',
    imageSrc: SAMPLE_AVATAR_URL,
    isAnonymous: false,
  },
} satisfies Meta<AvatarProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Avatar</RNText>
      <RNText style={docsStyles.description}>
        Displays a user avatar with image, initials fallback, or anonymous placeholder. Supports
        multiple sizes and rounded shapes.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>
          • size — 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
        </RNText>
        <RNText style={docsStyles.prop}>• name — name for initials fallback</RNText>
        <RNText style={docsStyles.prop}>• imageSrc — image URL</RNText>
        <RNText style={docsStyles.prop}>• isAnonymous — anonymous placeholder (default: false)</RNText>
        <RNText style={docsStyles.prop}>
          • rounded — 'xs' ... '3xl' | 'full' (default: 'full')
        </RNText>
        <RNText style={docsStyles.prop}>• backgroundColor / textColor — custom colors</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Avatar name="John Doe" size="lg" imageSrc={SAMPLE_AVATAR_URL} />
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Avatar name="A" size="xxs" />
        <Avatar name="B" size="xs" />
        <Avatar name="C" size="sm" />
        <Avatar name="D" size="md" />
        <Avatar name="E" size="lg" />
        <Avatar name="F" size="xl" />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Avatar name="Image" size="md" imageSrc={SAMPLE_AVATAR_URL} />
        <Avatar name="Initials" size="md" />
        <Avatar name="Anonymous" size="md" isAnonymous />
        <Avatar name="Squircle" size="md" rounded="md" imageSrc={SAMPLE_AVATAR_URL} />
      </View>
    </View>
  ),
};
