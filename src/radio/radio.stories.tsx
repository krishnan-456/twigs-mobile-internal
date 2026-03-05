import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Radio } from './radio';
import type { RadioProps } from './types';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Selected state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size preset',
    },
    width: {
      control: 'number',
      description: 'Custom outer circle width (overrides size)',
    },
    height: {
      control: 'number',
      description: 'Custom outer circle height (overrides size)',
    },
    innerWidth: {
      control: 'number',
      description: 'Custom inner circle width',
    },
    innerHeight: {
      control: 'number',
      description: 'Custom inner circle height',
    },
  },
  args: {
    selected: false,
    disabled: false,
    size: 'sm',
  },
} satisfies Meta<RadioProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
  stack: { gap: 16 },
  row: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});

export const Default: Story = {
  args: {
    children: <Text>Radio option</Text>,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    children: <Text>Selected option</Text>,
  },
};

export const MediumSize: Story = {
  args: {
    size: 'md',
    children: <Text>Medium radio</Text>,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Text>Disabled option</Text>,
  },
};

export const DisabledSelected: Story = {
  args: {
    selected: true,
    disabled: true,
    children: <Text>Disabled selected</Text>,
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState(0);
    return (
      <View style={styles.stack}>
        <Radio selected={selected === 0} onSelect={() => setSelected(0)}>
          <Text>Option A</Text>
        </Radio>
        <Radio selected={selected === 1} onSelect={() => setSelected(1)}>
          <Text>Option B</Text>
        </Radio>
        <Radio selected={selected === 2} onSelect={() => setSelected(2)}>
          <Text>Option C</Text>
        </Radio>
      </View>
    );
  },
};

export const FigmaStateMatrix: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.row}>
        <Radio size="sm" />
        <Radio size="sm" selected />
        <Radio size="sm" disabled />
        <Radio size="sm" selected disabled />
      </View>
      <View style={styles.row}>
        <Radio size="md" />
        <Radio size="md" selected />
        <Radio size="md" disabled />
        <Radio size="md" selected disabled />
      </View>
    </View>
  ),
};
