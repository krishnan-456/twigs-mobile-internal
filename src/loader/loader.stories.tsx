import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { LineLoader } from './line-loader';
import type { LineLoaderProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/LineLoader',
  component: LineLoader,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size preset (width x height)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'bright', 'negative', 'accent'],
      description: 'Color variant',
    },
  },
  args: {
    size: 'sm',
    color: 'primary',
  },
} satisfies Meta<LineLoaderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>LineLoader</RNText>
      <RNText style={docsStyles.description}>
        A horizontal animated loading bar. Commonly used inside buttons or at the top of containers.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• size — 'sm' | 'md' | 'lg' | 'xl' (default: 'sm')</RNText>
        <RNText style={docsStyles.prop}>
          • color — 'primary' | 'secondary' | 'bright' | 'negative' | 'accent'
        </RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <LineLoader size="sm" color="primary" />
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <LineLoader size="sm" />
      <LineLoader size="md" />
      <LineLoader size="lg" />
      <LineLoader size="xl" />
      <LineLoader size="md" color="secondary" />
      <LineLoader size="md" color="negative" />
      <LineLoader size="md" color="accent" />
    </View>
  ),
};
