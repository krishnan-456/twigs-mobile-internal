import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { Badge } from './badge';
import type { BadgeProps } from './types';

const PlusIcon = ({ size = 12, color = '#111' }: { size?: number; color?: string }) => (
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

const meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
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
    children: {
      control: 'text',
      description: 'Badge label text',
    },
  },
  args: {
    children: 'Badge',
    size: 'sm',
    color: 'default',
    rounded: 'full',
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium badge',
  },
};

export const Squircle: Story = {
  args: {
    rounded: 'sm',
    children: 'Squircle',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary',
  },
};

export const WithIcons: Story = {
  args: {
    color: 'default',
    children: 'Pill content',
  },
  render: (args) => <Badge {...args} leftElement={<PlusIcon />} rightElement={<PlusIcon />} />,
};

export const AllColors: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Badge color="default">Default</Badge>
        <Badge color="white">White</Badge>
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Badge color="accent">Accent</Badge>
        <Badge color="positive">Positive</Badge>
        <Badge color="negative">Negative</Badge>
        <Badge color="attention">Attention</Badge>
      </View>
    </View>
  ),
};

export const AllSizesAndShapes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Badge size="sm" rounded="full">
          SM Rounded
        </Badge>
        <Badge size="sm" rounded="sm">
          SM Squircle
        </Badge>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Badge size="md" rounded="full">
          MD Rounded
        </Badge>
        <Badge size="md" rounded="sm">
          MD Squircle
        </Badge>
      </View>
    </View>
  ),
};
