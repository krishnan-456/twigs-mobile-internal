import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { LinkButton } from './link-button';
import type { LinkButtonProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/LinkButton',
  component: LinkButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'default'],
      description: 'Color variant',
    },
    variant: {
      control: 'select',
      options: ['medium', 'bold'],
      description: 'Visual variant controlling font weight',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    children: {
      control: 'text',
      description: 'Link text content',
    },
  },
  args: {
    children: 'Link label',
    size: 'md',
    color: 'primary',
    variant: 'medium',
    disabled: false,
  },
} satisfies Meta<LinkButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>LinkButton</RNText>
      <RNText style={docsStyles.description}>
        A text-style pressable link with underline. Supports size, color, and weight variants.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• size — 'sm' | 'md' (default: 'md')</RNText>
        <RNText style={docsStyles.prop}>• color — 'primary' | 'default' (default: 'primary')</RNText>
        <RNText style={docsStyles.prop}>• variant — 'medium' | 'bold' (default: 'medium')</RNText>
        <RNText style={docsStyles.prop}>• disabled — boolean (default: false)</RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <LinkButton color="primary">Link label</LinkButton>
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <LinkButton size="sm" color="primary" variant="medium">SM Primary</LinkButton>
        <LinkButton size="sm" color="primary" variant="bold">SM Bold</LinkButton>
        <LinkButton size="sm" color="default" variant="medium">SM Default</LinkButton>
        <LinkButton size="sm" color="default" variant="bold">SM Bold Default</LinkButton>
      </View>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <LinkButton size="md" color="primary" variant="medium">MD Primary</LinkButton>
        <LinkButton size="md" color="primary" variant="bold">MD Bold</LinkButton>
        <LinkButton size="md" color="default" variant="medium">MD Default</LinkButton>
        <LinkButton size="md" color="default" variant="bold">MD Bold Default</LinkButton>
      </View>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <LinkButton disabled size="md" color="primary">Disabled Primary</LinkButton>
        <LinkButton disabled size="md" color="default">Disabled Default</LinkButton>
      </View>
    </View>
  ),
};
