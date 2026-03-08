import React from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Svg, Line } from 'react-native-svg';
import { IconButton } from './icon-button';

const PlusIcon = ({ size = 16, color = '#FFFFFF' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center', flexWrap: 'wrap' },
});

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size preset',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'bright', 'light', 'error'],
      description: 'Color preset',
    },
    variant: {
      control: 'select',
      options: ['solid', 'ghost', 'outline'],
      description: 'Visual variant',
    },
    rounded: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
  },
  args: {
    size: 'md',
    color: 'primary',
    variant: 'solid',
    rounded: 'full',
    disabled: false,
    loading: false,
    icon: <PlusIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>IconButton</RNText>
      <RNText style={docsStyles.description}>
        A button that renders only an icon. Supports the same variants, colors, and sizes as Button.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• icon — ReactElement (required)</RNText>
        <RNText style={docsStyles.prop}>
          • size — 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
        </RNText>
        <RNText style={docsStyles.prop}>
          • variant — 'solid' | 'ghost' | 'outline' (default: 'solid')
        </RNText>
        <RNText style={docsStyles.prop}>• color — same as Button</RNText>
        <RNText style={docsStyles.prop}>
          • rounded — 'xs' ... '3xl' | 'full' (default: 'full')
        </RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <IconButton icon={<PlusIcon />} color="primary" />
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <View style={{ gap: 16 }}>
      <View style={docsStyles.row}>
        {(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
          <IconButton key={s} {...args} size={s} icon={<PlusIcon />} />
        ))}
      </View>
      <View style={docsStyles.row}>
        {(['solid', 'ghost', 'outline'] as const).map((v) => (
          <IconButton key={v} {...args} variant={v} icon={<PlusIcon />} />
        ))}
      </View>
      <View style={docsStyles.row}>
        {(['default', 'primary', 'secondary', 'error'] as const).map((c) => (
          <IconButton key={c} {...args} color={c} icon={<PlusIcon />} />
        ))}
      </View>
      <View style={docsStyles.row}>
        <IconButton {...args} disabled icon={<PlusIcon />} />
        <IconButton {...args} loading icon={<PlusIcon />} />
      </View>
    </View>
  ),
};
