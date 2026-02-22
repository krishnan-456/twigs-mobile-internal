import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert } from './alert';
import type { AlertProps } from './types';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual status variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the alert',
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
    size: 'md',
    closable: false,
    children: 'This is an alert message.',
  },
} satisfies Meta<AlertProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Info: Story = {
  args: {
    status: 'info',
    children: 'Here is some useful information.',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    children: 'Operation completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    children: 'Please review your input.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    children: 'Something went wrong.',
  },
};

export const Closable: Story = {
  args: {
    status: 'info',
    closable: true,
    children: 'This alert can be dismissed.',
  },
};

export const Small: Story = {
  args: {
    status: 'info',
    size: 'sm',
    children: 'A small alert.',
  },
};
