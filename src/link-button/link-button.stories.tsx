import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { LinkButton } from './link-button';
import type { LinkButtonProps } from './types';

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

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small link',
  },
};

export const Bold: Story = {
  args: {
    variant: 'bold',
    children: 'Bold link',
  },
};

export const DefaultColor: Story = {
  args: {
    color: 'default',
    children: 'Default color',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled link',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <LinkButton size="sm" color="primary" variant="medium">
          SM Primary
        </LinkButton>
        <LinkButton size="sm" color="primary" variant="bold">
          SM Bold
        </LinkButton>
        <LinkButton size="sm" color="default" variant="medium">
          SM Default
        </LinkButton>
        <LinkButton size="sm" color="default" variant="bold">
          SM Bold Default
        </LinkButton>
      </View>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <LinkButton size="md" color="primary" variant="medium">
          MD Primary
        </LinkButton>
        <LinkButton size="md" color="primary" variant="bold">
          MD Bold
        </LinkButton>
        <LinkButton size="md" color="default" variant="medium">
          MD Default
        </LinkButton>
        <LinkButton size="md" color="default" variant="bold">
          MD Bold Default
        </LinkButton>
      </View>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <LinkButton disabled size="md" color="primary">
          Disabled Primary
        </LinkButton>
        <LinkButton disabled size="md" color="default">
          Disabled Default
        </LinkButton>
      </View>
    </View>
  ),
};
