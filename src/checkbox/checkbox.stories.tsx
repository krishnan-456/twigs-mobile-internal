import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from './checkbox';
import type { CheckboxProps } from './types';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: 'radio',
      options: [false, true, 'indeterminate'],
      description: 'Checked state (false/true/indeterminate)',
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
  },
  args: {
    checked: false,
    disabled: false,
    size: 'sm',
  },
} satisfies Meta<CheckboxProps>;

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
    children: <Text>Accept terms and conditions</Text>,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: <Text>Checked by default</Text>,
  },
};

export const MediumSize: Story = {
  args: {
    size: 'md',
    children: <Text>Medium checkbox</Text>,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Text>Disabled checkbox</Text>,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    children: <Text>Disabled checked</Text>,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox checked={checked} onChange={setChecked}>
        <Text>Tap to toggle</Text>
      </Checkbox>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    const [state, setState] = useState<boolean | 'indeterminate'>('indeterminate');
    return (
      <Checkbox
        checked={state}
        onChange={() => setState((prev) => (prev === 'indeterminate' ? true : !prev))}
      >
        <Text>Indeterminate state</Text>
      </Checkbox>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <View style={styles.stack}>
      <Checkbox checked={false}>
        <Text>Unchecked</Text>
      </Checkbox>
      <Checkbox checked={true}>
        <Text>Checked</Text>
      </Checkbox>
      <Checkbox checked="indeterminate">
        <Text>Indeterminate</Text>
      </Checkbox>
      <Checkbox checked={false} disabled>
        <Text>Disabled unchecked</Text>
      </Checkbox>
      <Checkbox checked={true} disabled>
        <Text>Disabled checked</Text>
      </Checkbox>
      <Checkbox checked="indeterminate" disabled>
        <Text>Disabled indeterminate</Text>
      </Checkbox>
    </View>
  ),
};

export const FigmaStateMatrix: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.row}>
        <Checkbox size="sm" checked={false} />
        <Checkbox size="sm" checked={true} />
        <Checkbox size="sm" checked="indeterminate" />
        <Checkbox size="sm" checked={false} disabled />
        <Checkbox size="sm" checked={true} disabled />
        <Checkbox size="sm" checked="indeterminate" disabled />
      </View>
      <View style={styles.row}>
        <Checkbox size="md" checked={false} />
        <Checkbox size="md" checked={true} />
        <Checkbox size="md" checked="indeterminate" />
        <Checkbox size="md" checked={false} disabled />
        <Checkbox size="md" checked={true} disabled />
        <Checkbox size="md" checked="indeterminate" disabled />
      </View>
    </View>
  ),
};
