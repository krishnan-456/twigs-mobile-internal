import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Alert } from './alert';
import type { AlertProps } from './types';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
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

export const Default: Story = {
  args: {
    status: 'default',
    children: 'A FYI message here.',
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    children: 'An info message here.',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    children: 'A success message here.',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    children: 'A cautionary message here.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    children: 'A warning message here.',
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

export const AllStatuses: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert status="default">A FYI message here</Alert>
      <Alert status="info">An info message here</Alert>
      <Alert status="success">A success message here</Alert>
      <Alert status="warning">A cautionary message here</Alert>
      <Alert status="error">A warning message here</Alert>
    </View>
  ),
};

export const AllStatusesClosable: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert status="default" closable>
        A FYI message here
      </Alert>
      <Alert status="info" closable>
        An info message here
      </Alert>
      <Alert status="success" closable>
        A success message here
      </Alert>
      <Alert status="warning" closable>
        A cautionary message here
      </Alert>
      <Alert status="error" closable>
        A warning message here
      </Alert>
    </View>
  ),
};
