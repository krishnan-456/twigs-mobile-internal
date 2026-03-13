import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Svg, Path } from 'react-native-svg';
import { Badge } from './badge';
import type { BadgeProps } from './types';

const PlusIcon = ({ size = 16, color = '#111' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

interface BadgeStoryArgs extends BadgeProps {
  iconLeft?: boolean;
  iconRight?: boolean;
}

const meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge label text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant',
    },
    color: {
      control: 'select',
      options: [
        'default',
        'white',
        'primary',
        'secondary',
        'accent',
        'positive',
        'negative',
        'attention',
      ],
      description: 'Color variant',
    },
    rounded: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius variant',
    },
    iconLeft: {
      control: 'boolean',
      description: 'Show left icon',
    },
    iconRight: {
      control: 'boolean',
      description: 'Show right icon',
    },
  },
  args: {
    children: 'Badge',
    size: 'sm',
    color: 'default',
    rounded: 'full',
    iconLeft: false,
    iconRight: false,
  },
} satisfies Meta<BadgeStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Badge</RNText>
      <RNText style={docsStyles.description}>
        A compact label for categorization, status, or counts. Supports color variants, sizes, icon
        elements, and rounded shapes.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• size — 'sm' | 'md' (default: 'sm')</RNText>
        <RNText style={docsStyles.prop}>
          • color — 'default' | 'white' | 'primary' | 'secondary' | 'accent' | 'positive' |
          'negative' | 'attention'
        </RNText>
        <RNText style={docsStyles.prop}>
          • rounded — 'xs' ... '3xl' | 'full' (default: 'full')
        </RNText>
        <RNText style={docsStyles.prop}>• leftElement / rightElement — icon elements</RNText>
        <RNText style={docsStyles.prop}>• children — badge label text</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Badge color="primary">Badge</Badge>
      </View>
    </View>
  ),
};

export const Default: Story = {
  render: (args) => {
    const { iconLeft, iconRight, ...badgeProps } = args as BadgeStoryArgs;
    return (
      <Badge
        {...badgeProps}
        leftElement={iconLeft ? <PlusIcon /> : undefined}
        rightElement={iconRight ? <PlusIcon /> : undefined}
      />
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Badge color="default">Default</Badge>
        <Badge color="white">White</Badge>
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="accent">Accent</Badge>
        <Badge color="positive">Positive</Badge>
        <Badge color="negative">Negative</Badge>
        <Badge color="attention">Attention</Badge>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Badge size="sm" rounded="full">SM Rounded</Badge>
        <Badge size="sm" rounded="sm">SM Squircle</Badge>
        <Badge size="md" rounded="full">MD Rounded</Badge>
        <Badge size="md" rounded="sm">MD Squircle</Badge>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Badge color="default" leftElement={<PlusIcon />} rightElement={<PlusIcon />}>
          With Icons
        </Badge>
      </View>
    </View>
  ),
};
