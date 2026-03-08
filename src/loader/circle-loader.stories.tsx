import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { CircleLoader } from './circle-loader';
import type { CircleLoaderProps } from './types';

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/CircleLoader',
  component: CircleLoader,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Diameter preset',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'bright', 'negative', 'accent'],
      description: 'Color variant',
    },
  },
  args: {
    size: 'md',
    color: 'primary',
  },
} satisfies Meta<CircleLoaderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>CircleLoader</RNText>
      <RNText style={docsStyles.description}>
        A spinning circular loading indicator. Uses SVG arcs for cross-platform consistency.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>
          • size — 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' (default: 'md')
        </RNText>
        <RNText style={docsStyles.prop}>
          • color — 'primary' | 'secondary' | 'bright' | 'negative' | 'accent'
        </RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <CircleLoader size="md" color="primary" />
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <CircleLoader size="xs" />
        <CircleLoader size="sm" />
        <CircleLoader size="md" />
        <CircleLoader size="lg" />
        <CircleLoader size="xl" />
      </View>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <CircleLoader color="primary" />
        <CircleLoader color="secondary" />
        <CircleLoader color="bright" />
        <CircleLoader color="negative" />
        <CircleLoader color="accent" />
      </View>
    </View>
  ),
};
