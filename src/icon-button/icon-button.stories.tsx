import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { Svg, Line } from 'react-native-svg';
import { IconButton } from './icon-button';

const PlusIcon = ({ size = 16, color = '#FFFFFF' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const storyStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size preset',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'bright', 'light', 'error'],
      description: 'Color preset',
    },
    variant: {
      control: 'select',
      options: ['solid', 'ghost', 'outline'],
      description: 'Visual variant',
    },
    rounded: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
  },
  args: {
    size: 'md',
    color: 'primary',
    variant: 'solid',
    rounded: 'full',
    disabled: false,
    loading: false,
    icon: <PlusIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const FullRounded: Story = {
  args: { rounded: 'full' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const AllSizes: Story = {
  render: (args) => (
    <View style={storyStyles.row}>
      {(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
        <IconButton key={s} {...args} size={s} icon={<PlusIcon />} />
      ))}
    </View>
  ),
};

export const AllSizesFullRounded: Story = {
  render: (args) => (
    <View style={storyStyles.row}>
      {(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
        <IconButton key={s} {...args} size={s} rounded="full" icon={<PlusIcon />} />
      ))}
    </View>
  ),
};

export const AllColors: Story = {
  render: (args) => (
    <View style={storyStyles.row}>
      {(['default', 'primary', 'secondary', 'error'] as const).map((c) => (
        <IconButton key={c} {...args} color={c} icon={<PlusIcon />} />
      ))}
    </View>
  ),
};

export const AllVariants: Story = {
  render: (args) => (
    <View style={storyStyles.row}>
      {(['solid', 'ghost', 'outline'] as const).map((v) => (
        <IconButton key={v} {...args} variant={v} icon={<PlusIcon />} />
      ))}
    </View>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { loading: true },
};
