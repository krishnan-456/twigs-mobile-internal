import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from './switch';
import type { SwitchProps } from './types';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 24,
    marginRight: 12,
  },
});

const meta = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    value: {
      control: 'boolean',
      description: 'Legacy controlled state API',
    },
    checked: {
      control: 'boolean',
      description: 'Web parity controlled state API (takes precedence over value)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial state for uncontrolled mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Accepted for web API parity (no native Pressable behavior)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Switch size variant',
    },
  },
  args: {
    value: false,
    disabled: false,
    size: 'md',
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

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const CheckedWebApi: Story = {
  args: {
    checked: true,
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
      <View style={styles.row}>
        <Text style={styles.label}>{value ? 'On' : 'Off'}</Text>
        <Switch value={value} onValueChange={setValue} />
      </View>
    );
  },
};

export const InteractiveWebApi: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{checked ? 'On' : 'Off'}</Text>
        <Switch checked={checked} onChange={setChecked} />
      </View>
    );
  },
};
