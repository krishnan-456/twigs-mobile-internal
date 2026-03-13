import React, { useState } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Svg, Path } from 'react-native-svg';
import { Chip } from './chip';
import type { ChipProps } from './types';

const PlusIcon = ({ size = 16, color = '#3D424D' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 3.33331V12.6666M3.33331 7.99998H12.6666"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronDownIcon = ({ size = 16, color = '#3D424D' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M4 6L8 10L12 6"
      stroke={color}
      strokeWidth={1.5}
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

interface StoryArgs extends ChipProps {
  leftIcon?: boolean;
  rightIcon?: boolean;
}

const meta = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    color: {
      control: 'select',
      options: ['secondary', 'primary'],
      description: 'Color variant',
    },
    rounded: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius variant',
    },
    leftIcon: {
      control: 'boolean',
      description: 'Show left icon (Plus)',
    },
    rightIcon: {
      control: 'boolean',
      description: 'Show right icon (Chevron)',
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
    color: 'secondary',
    rounded: 'xs',
    leftIcon: true,
    rightIcon: true,
    disabled: false,
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Chip</RNText>
      <RNText style={docsStyles.description}>
        Selectable pill for filters, tags, and selections. Supports secondary and primary color
        variants with left/right icon slots, and three interactive states: normal, pressed, and
        active.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>
          • size — 'sm' | 'md' | 'lg' (default: 'sm')
        </RNText>
        <RNText style={docsStyles.prop}>
          • color — 'secondary' | 'primary' (default: 'secondary')
        </RNText>
        <RNText style={docsStyles.prop}>
          • rounded — 'xxs' | 'xs' | ... | '3xl' | 'full' (default: 'xs')
        </RNText>
        <RNText style={docsStyles.prop}>• disabled — boolean (default: false)</RNText>
        <RNText style={docsStyles.prop}>
          • leftElement / rightElement — optional icon elements
        </RNText>
        <RNText style={docsStyles.prop}>
          • active / defaultActive / onActiveStateChange — toggle state
        </RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Chip
          color="secondary"
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
      </View>
    </View>
  ),
};

export const Default: Story = {
  render: (args) => {
    const { leftIcon, rightIcon, ...chipProps } = args as StoryArgs;
    return (
      <Chip
        {...chipProps}
        leftElement={leftIcon ? <PlusIcon /> : undefined}
        rightElement={rightIcon ? <ChevronDownIcon /> : undefined}
      />
    );
  },
};

const AllVariantsDemo = () => {
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);
  const [a3, setA3] = useState(false);
  const [a4, setA4] = useState(false);
  const [a5, setA5] = useState(false);
  const [a6, setA6] = useState(false);

  return (
    <View style={{ gap: 24 }}>
      <RNText style={{ fontSize: 14, fontWeight: '600' }}>
        Secondary — Squircle (tap to toggle)
      </RNText>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Chip
          size="sm"
          active={a1}
          onActiveStateChange={setA1}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="md"
          active={a2}
          onActiveStateChange={setA2}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="lg"
          active={a3}
          onActiveStateChange={setA3}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
      </View>

      <RNText style={{ fontSize: 14, fontWeight: '600' }}>
        Secondary — Full / Rounded (tap to toggle)
      </RNText>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Chip
          size="sm"
          rounded="full"
          active={a1}
          onActiveStateChange={setA1}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="md"
          rounded="full"
          active={a2}
          onActiveStateChange={setA2}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="lg"
          rounded="full"
          active={a3}
          onActiveStateChange={setA3}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
      </View>

      <RNText style={{ fontSize: 14, fontWeight: '600' }}>
        Primary — Squircle (tap to toggle)
      </RNText>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Chip
          size="sm"
          color="primary"
          active={a4}
          onActiveStateChange={setA4}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="md"
          color="primary"
          active={a5}
          onActiveStateChange={setA5}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="lg"
          color="primary"
          active={a6}
          onActiveStateChange={setA6}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
      </View>

      <RNText style={{ fontSize: 14, fontWeight: '600' }}>
        Primary — Full / Rounded (tap to toggle)
      </RNText>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Chip
          size="sm"
          color="primary"
          rounded="full"
          active={a4}
          onActiveStateChange={setA4}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="md"
          color="primary"
          rounded="full"
          active={a5}
          onActiveStateChange={setA5}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="lg"
          color="primary"
          rounded="full"
          active={a6}
          onActiveStateChange={setA6}
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
      </View>

      <RNText style={{ fontSize: 14, fontWeight: '600' }}>Disabled</RNText>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Chip disabled leftElement={<PlusIcon />} rightElement={<ChevronDownIcon />}>
          Content
        </Chip>
        <Chip
          color="primary"
          disabled
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
      </View>
    </View>
  );
};

export const AllVariants: Story = {
  render: () => <AllVariantsDemo />,
};
