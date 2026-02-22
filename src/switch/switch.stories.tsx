import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';
import { Switch } from './switch';
import type { SwitchProps } from './types';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    value: {
      control: 'boolean',
      description: 'On/off state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    value: false,
    disabled: false,
  },
} satisfies Meta<SwitchProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const On: Story = {
  args: {
    value: true,
  },
};

export const DisabledOff: Story = {
  args: {
    disabled: true,
    value: false,
  },
};

export const DisabledOn: Story = {
  args: {
    disabled: true,
    value: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(false);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text>{value ? 'On' : 'Off'}</Text>
        <Switch value={value} onValueChange={setValue} />
      </View>
    );
  },
};
