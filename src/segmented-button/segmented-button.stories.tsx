import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SegmentedButton } from './segmented-button';
import type { SegmentedButtonProps } from './types';

const storyStyles = StyleSheet.create({
  wrapper: {
    padding: 16,
    gap: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#64748B',
  },
});

const DEFAULT_OPTIONS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

const THREE_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const meta = {
  title: 'Components/SegmentedButton',
  component: SegmentedButton,
  argTypes: {
    rounded: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius of the container and segments',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the entire segmented button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the component stretches to fill parent width',
    },
    value: {
      control: 'text',
      description: 'Currently selected value (controlled)',
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value (uncontrolled)',
    },
  },
  args: {
    options: DEFAULT_OPTIONS,
    defaultValue: 'option1',
    rounded: 'full',
    disabled: false,
    fullWidth: true,
  },
} satisfies Meta<SegmentedButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MediumRounded: Story = {
  args: {
    rounded: 'md',
  },
};

export const ThreeOptions: Story = {
  args: {
    options: THREE_OPTIONS,
    defaultValue: 'weekly',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'option1',
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Enabled' },
      { value: 'option2', label: 'Disabled', disabled: true },
    ],
    defaultValue: 'option1',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <View style={storyStyles.wrapper}>
        <Text style={storyStyles.label}>Selected: {value}</Text>
        <SegmentedButton options={DEFAULT_OPTIONS} value={value} onChange={setValue} />
        <SegmentedButton
          options={DEFAULT_OPTIONS}
          value={value}
          onChange={setValue}
          rounded="md"
        />
      </View>
    );
  },
};

export const InteractiveThreeOptions: Story = {
  render: () => {
    const [value, setValue] = useState('daily');
    return (
      <View style={storyStyles.wrapper}>
        <Text style={storyStyles.label}>Selected: {value}</Text>
        <SegmentedButton options={THREE_OPTIONS} value={value} onChange={setValue} />
        <SegmentedButton
          options={THREE_OPTIONS}
          value={value}
          onChange={setValue}
          rounded="md"
        />
      </View>
    );
  },
};
