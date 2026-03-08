import React from 'react';
import { View, Text as RNText, StyleSheet, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Checkbox } from './checkbox';
import type { CheckboxProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

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

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Checkbox</RNText>
      <RNText style={docsStyles.description}>
        A toggleable checkbox supporting checked, unchecked, and indeterminate states. Can be
        controlled or uncontrolled.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>
          • checked — false | true | 'indeterminate' (default: false)
        </RNText>
        <RNText style={docsStyles.prop}>• size — 'sm' | 'md' (default: 'sm')</RNText>
        <RNText style={docsStyles.prop}>• disabled — boolean (default: false)</RNText>
        <RNText style={docsStyles.prop}>• onChange — (checked: boolean) callback</RNText>
        <RNText style={docsStyles.prop}>• children — label content</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Checkbox checked={true}>
          <Text>Accept terms</Text>
        </Checkbox>
      </View>
    </View>
  ),
};

export const Default: Story = {
  args: {
    children: <Text>Accept terms and conditions</Text>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 12 }}>
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
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <Checkbox size="sm" checked={true} />
        <Checkbox size="md" checked={true} />
        <Checkbox size="sm" checked="indeterminate" />
        <Checkbox size="md" checked="indeterminate" />
      </View>
    </View>
  ),
};
