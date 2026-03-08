import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { TextInput } from './text-input';
import type { TextInputProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size preset',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Visual variant',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    editable: {
      control: 'boolean',
      description: 'Whether the input is editable',
    },
    secureTextEntry: {
      control: 'boolean',
      description: 'Password mode (dots)',
    },
    errorBorder: {
      control: 'boolean',
      description: 'Show error border styling',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below input',
    },
    multiline: {
      control: 'boolean',
      description: 'Multi-line text input',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
  },
  args: {
    placeholder: 'Type something...',
    size: 'md',
    variant: 'default',
    disabled: false,
    editable: true,
    secureTextEntry: false,
    errorBorder: false,
    multiline: false,
  },
} satisfies Meta<TextInputProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>TextInput</RNText>
      <RNText style={docsStyles.description}>
        A styled text input with size and variant presets, error states, password toggle, and
        multiline support.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>
          • size — 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
        </RNText>
        <RNText style={docsStyles.prop}>• variant — 'default' | 'filled' (default: 'default')</RNText>
        <RNText style={docsStyles.prop}>• errorBorder / errorMessage — error state</RNText>
        <RNText style={docsStyles.prop}>• secureTextEntry — password mode</RNText>
        <RNText style={docsStyles.prop}>• multiline / numberOfLines — multiline support</RNText>
        <RNText style={docsStyles.prop}>• disabled — boolean (default: false)</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <TextInput placeholder="Type something..." />
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <TextInput size="sm" placeholder="Small" />
      <TextInput size="md" placeholder="Medium (default)" />
      <TextInput size="lg" placeholder="Large" />
      <TextInput size="xl" placeholder="Extra Large" />
      <TextInput variant="filled" placeholder="Filled variant" />
      <TextInput errorBorder errorMessage="This field is required" placeholder="Error state" />
      <TextInput secureTextEntry placeholder="Password" />
      <TextInput multiline numberOfLines={3} placeholder="Multiline..." />
      <TextInput disabled editable={false} placeholder="Disabled" />
    </View>
  ),
};
