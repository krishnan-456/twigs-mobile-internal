import React, { useState } from 'react';
import { View, Text as RNText, StyleSheet, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Switch } from './switch';
import type { SwitchProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
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
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Switch size variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color variant',
    },
  },
  args: {
    value: false,
    disabled: false,
    size: 'md',
    color: 'primary',
  },
} satisfies Meta<SwitchProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Switch</RNText>
      <RNText style={docsStyles.description}>
        A toggle switch for on/off states. Supports both legacy (value/onValueChange) and web parity
        (checked/onChange) APIs.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• value / checked — controlled state</RNText>
        <RNText style={docsStyles.prop}>• onValueChange / onChange — state callback</RNText>
        <RNText style={docsStyles.prop}>• size — 'sm' | 'md' (default: 'md')</RNText>
        <RNText style={docsStyles.prop}>• color — 'primary' | 'secondary' (default: 'primary')</RNText>
        <RNText style={docsStyles.prop}>• disabled — boolean (default: false)</RNText>
        <RNText style={docsStyles.prop}>• defaultChecked — initial uncontrolled state</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Switch defaultChecked />
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => {
    const [value, setValue] = useState(false);
    return (
      <View style={{ gap: 16 }}>
        <RNText style={docsStyles.sectionTitle}>Primary</RNText>
        <View style={docsStyles.row}>
          <Switch size="sm" value={false} />
          <Switch size="sm" value={true} />
          <Switch size="sm" value={false} disabled />
          <Switch size="sm" value={true} disabled />
        </View>
        <View style={docsStyles.row}>
          <Switch size="md" value={false} />
          <Switch size="md" value={true} />
          <Switch size="md" value={false} disabled />
          <Switch size="md" value={true} disabled />
        </View>
        <RNText style={docsStyles.sectionTitle}>Secondary</RNText>
        <View style={docsStyles.row}>
          <Switch size="sm" color="secondary" value={false} />
          <Switch size="sm" color="secondary" value={true} />
          <Switch size="sm" color="secondary" value={false} disabled />
          <Switch size="sm" color="secondary" value={true} disabled />
        </View>
        <View style={docsStyles.row}>
          <Switch size="md" color="secondary" value={false} />
          <Switch size="md" color="secondary" value={true} />
          <Switch size="md" color="secondary" value={false} disabled />
          <Switch size="md" color="secondary" value={true} disabled />
        </View>
        <View style={docsStyles.row}>
          <Text>{value ? 'On' : 'Off'}</Text>
          <Switch value={value} onValueChange={setValue} />
        </View>
      </View>
    );
  },
};
