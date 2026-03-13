import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert } from './alert';
import type { AlertProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Visual status variant',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    children: {
      control: 'text',
      description: 'Alert message content',
    },
  },
  args: {
    status: 'info',
    closable: false,
    children: 'This is an alert message.',
  },
} satisfies Meta<AlertProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Alert</RNText>
      <RNText style={docsStyles.description}>
        Displays a callout message to the user with contextual status styling and an optional dismiss
        button.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>
          • status — 'default' | 'info' | 'success' | 'warning' | 'error' (default: 'info')
        </RNText>
        <RNText style={docsStyles.prop}>• closable — boolean (default: false)</RNText>
        <RNText style={docsStyles.prop}>• onClose — callback when dismiss is pressed</RNText>
        <RNText style={docsStyles.prop}>• children — alert message content</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Alert status="info">This is an informational alert.</Alert>
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Alert status="default">A FYI message here</Alert>
        <Alert status="info">An info message here</Alert>
        <Alert status="success">A success message here</Alert>
        <Alert status="warning">A cautionary message here</Alert>
        <Alert status="error">A warning message here</Alert>
      </View>
      <View style={{ gap: 8 }}>
        <Alert status="info" closable>
          Closable info alert
        </Alert>
        <Alert status="error" closable>
          Closable error alert
        </Alert>
      </View>
    </View>
  ),
};
