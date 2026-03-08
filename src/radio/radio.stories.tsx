import React, { useState } from 'react';
import { View, Text as RNText, StyleSheet, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Radio } from './radio';
import type { RadioProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
  stack: { gap: 16 },
  row: { flexDirection: 'row', gap: 16, alignItems: 'center' },
});

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
    children: {
      control: 'text',
      description: 'Radio label content',
    },
  },
  args: {
    selected: false,
    disabled: false,
    size: 'sm',
    children: 'Radio option',
  },
} satisfies Meta<RadioProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Radio</RNText>
      <RNText style={docsStyles.description}>
        Single-selection control used in a radio group. Supports selected and disabled states with
        size variants.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• selected — boolean (default: false)</RNText>
        <RNText style={docsStyles.prop}>• size — 'sm' | 'md' (default: 'sm')</RNText>
        <RNText style={docsStyles.prop}>• disabled — boolean (default: false)</RNText>
        <RNText style={docsStyles.prop}>• onSelect — (selected: boolean) callback</RNText>
        <RNText style={docsStyles.prop}>• children — label content</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Radio selected>
          <Text>Selected option</Text>
        </Radio>
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => {
    const [selected, setSelected] = useState(0);

    return (
      <View style={docsStyles.stack}>
        <View style={docsStyles.row}>
          <Radio size="sm" />
          <Radio size="sm" selected />
          <Radio size="sm" disabled />
          <Radio size="sm" selected disabled />
        </View>
        <View style={docsStyles.row}>
          <Radio size="md" />
          <Radio size="md" selected />
          <Radio size="md" disabled />
          <Radio size="md" selected disabled />
        </View>

        <View style={docsStyles.section}>
          <RNText style={docsStyles.sectionTitle}>Group example</RNText>
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
      </View>
    );
  },
};
