import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View, Alert } from 'react-native';
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

const ChevronDownIcon = ({ size = 16, color = '#111' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9L12 15L18 9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

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

export const Default: Story = {};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Chip',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Pill: Story = {
  args: {
    rounded: 'full',
    children: 'Pill Shape',
  },
};

export const Closable: Story = {
  args: {
    closable: true,
    children: 'Closable',
  },
  render: (args) => <Chip {...args} onClose={() => Alert.alert('Closed')} />,
};

export const WithIcons: Story = {
  render: (args) => (
    <Chip {...args} leftElement={<PlusIcon />} rightElement={<ChevronDownIcon />}>
      Content
    </Chip>
  ),
};

export const Selectable: Story = {
  render: () => {
    const SelectableChip = () => {
      const [active, setActive] = useState(false);
      return (
        <Chip
          selectable
          active={active}
          onActiveStateChange={setActive}
          color="primary"
          variant="solid"
        >
          {active ? 'Active' : 'Tap to select'}
        </Chip>
      );
    };
    return <SelectableChip />;
  },
};

export const SelectableOutline: Story = {
  render: () => {
    const SelectableOutlineChip = () => {
      const [active, setActive] = useState(false);
      return (
        <Chip
          selectable
          active={active}
          onActiveStateChange={setActive}
          color="primary"
          variant="outline"
        >
          {active ? 'Selected' : 'Outline selectable'}
        </Chip>
      );
    };
    return <SelectableOutlineChip />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    selectable: true,
    children: 'Disabled',
  },
};

export const AllColors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip color="default">Default</Chip>
        <Chip color="primary">Primary</Chip>
        <Chip color="secondary">Secondary</Chip>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip color="error">Error</Chip>
        <Chip color="warning">Warning</Chip>
        <Chip color="success">Success</Chip>
        <Chip color="accent">Accent</Chip>
      </View>
    </View>
  ),
};

export const AllOutlineColors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip variant="outline" color="default">
          Default
        </Chip>
        <Chip variant="outline" color="primary">
          Primary
        </Chip>
        <Chip variant="outline" color="secondary">
          Secondary
        </Chip>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip variant="outline" color="error">
          Error
        </Chip>
        <Chip variant="outline" color="warning">
          Warning
        </Chip>
        <Chip variant="outline" color="success">
          Success
        </Chip>
        <Chip variant="outline" color="accent">
          Accent
        </Chip>
      </View>
    </View>
  ),
};

export const AllSizesAndShapes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Chip size="sm" rounded="full">
          SM Pill
        </Chip>
        <Chip size="sm" rounded="sm">
          SM Squircle
        </Chip>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Chip size="md" rounded="full">
          MD Pill
        </Chip>
        <Chip size="md" rounded="sm">
          MD Squircle
        </Chip>
      </View>
    </View>
  ),
};

export const FigmaReference: Story = {
  name: 'Figma: Selected Pill',
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip
          size="sm"
          variant="outline"
          color="default"
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="sm"
          variant="solid"
          color="primary"
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="sm"
          variant="outline"
          color="primary"
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip
          size="md"
          rounded="full"
          variant="outline"
          color="default"
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="md"
          rounded="full"
          variant="solid"
          color="primary"
          leftElement={<PlusIcon />}
          rightElement={<ChevronDownIcon />}
        >
          Content
        </Chip>
        <Chip
          size="md"
          rounded="full"
          variant="solid"
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
