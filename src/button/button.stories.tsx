import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from './button';
import type { ButtonProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
  darkBg: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size preset',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Visual variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'light', 'error'],
      description: 'Color preset',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with loader indicator',
    },
    loader: {
      control: 'select',
      options: ['line', 'circle'],
      description: 'Loader type when loading is true',
    },
  },
  args: {
    children: 'Button',
    size: 'sm',
    variant: 'solid',
    color: 'primary',
    disabled: false,
    loading: false,
    loader: 'line',
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Button</RNText>
      <RNText style={docsStyles.description}>
        Primary action component with multiple variants, sizes, colors, and loading states.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>
          • size — 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'sm')
        </RNText>
        <RNText style={docsStyles.prop}>
          • variant — 'solid' | 'outline' | 'ghost' (default: 'solid')
        </RNText>
        <RNText style={docsStyles.prop}>
          • color — 'default' | 'primary' | 'secondary' | 'light' | 'error'
        </RNText>
        <RNText style={docsStyles.prop}>• disabled — boolean (default: false)</RNText>
        <RNText style={docsStyles.prop}>• loading — boolean (default: false)</RNText>
        <RNText style={docsStyles.prop}>• loader — 'line' | 'circle' (default: 'line')</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Button size="sm" color="primary">
          Button
        </Button>
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
        <Button size="xl">XL</Button>
        <Button size="2xl">2XL</Button>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="error">Error</Button>
      </View>
      <View style={docsStyles.darkBg}>
        <Button color="light" variant="solid">Light Solid</Button>
        <Button color="light" variant="outline">Light Outline</Button>
        <Button color="light" variant="ghost">Light Ghost</Button>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Button variant="solid" color="primary">Solid</Button>
        <Button variant="outline" color="primary">Outline</Button>
        <Button variant="ghost" color="primary">Ghost</Button>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button loading loader="circle">Circle</Button>
      </View>
    </View>
  ),
};
