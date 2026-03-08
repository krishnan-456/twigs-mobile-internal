import React, { useState } from 'react';
import { View, Text as RNText, StyleSheet, Alert } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Svg, Path } from 'react-native-svg';
import { Chip } from './chip';
import type { ChipProps } from './types';

const PlusIcon = ({ size = 16, color = '#111' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'success', 'accent'],
      description: 'Color variant',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'Visual variant',
    },
    rounded: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius variant',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable toggle behavior',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interactions',
    },
    children: {
      control: 'text',
      description: 'Chip label text',
    },
  },
  args: {
    children: 'Content',
    size: 'sm',
    color: 'default',
    variant: 'solid',
    rounded: 'sm',
    closable: false,
    selectable: false,
    disabled: false,
  },
} satisfies Meta<ChipProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Chip</RNText>
      <RNText style={docsStyles.description}>
        Compact element for tags, filters, or selections. Supports solid/outline variants, closable
        state, selectable toggle, and icon elements.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• size — 'sm' | 'md' (default: 'sm')</RNText>
        <RNText style={docsStyles.prop}>
          • color — 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'success' |
          'accent'
        </RNText>
        <RNText style={docsStyles.prop}>• variant — 'solid' | 'outline' (default: 'solid')</RNText>
        <RNText style={docsStyles.prop}>• closable — show close button (default: false)</RNText>
        <RNText style={docsStyles.prop}>• selectable — enable toggle (default: false)</RNText>
        <RNText style={docsStyles.prop}>• disabled — boolean (default: false)</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Chip color="primary">Chip</Chip>
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip color="default">Default</Chip>
        <Chip color="primary">Primary</Chip>
        <Chip color="secondary">Secondary</Chip>
        <Chip color="error">Error</Chip>
        <Chip color="warning">Warning</Chip>
        <Chip color="success">Success</Chip>
        <Chip color="accent">Accent</Chip>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip variant="outline" color="default">Outline</Chip>
        <Chip variant="outline" color="primary">Primary</Chip>
        <Chip variant="outline" color="secondary">Secondary</Chip>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Chip size="sm">SM</Chip>
        <Chip size="md">MD</Chip>
        <Chip rounded="full">Pill</Chip>
        <Chip closable onClose={() => Alert.alert('Closed')}>Closable</Chip>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Chip leftElement={<PlusIcon />} rightElement={<PlusIcon />}>With Icons</Chip>
        <Chip disabled>Disabled</Chip>
      </View>
    </View>
  ),
};
