import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { TextInput } from './text-input';
import type { TextInputProps } from './types';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size preset',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Visual variant',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    defaultValue: {
      control: 'text',
      description: 'Default value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (visual only, also set editable=false)',
    },
    editable: {
      control: 'boolean',
      description: 'Whether the input is editable',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only mode',
    },
    secureTextEntry: {
      control: 'boolean',
      description: 'Password mode (dots)',
    },
    errorBorder: {
      control: 'boolean',
      description: 'Show error border styling',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed below input',
    },
    multiline: {
      control: 'boolean',
      description: 'Multi-line text input',
    },
    numberOfLines: {
      control: 'number',
      description: 'Number of visible lines (when multiline)',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    keyboardType: {
      control: 'select',
      options: ['default', 'email-address', 'numeric', 'phone-pad', 'decimal-pad', 'url'],
      description: 'Keyboard type',
    },
    autoCapitalize: {
      control: 'select',
      options: ['none', 'sentences', 'words', 'characters'],
      description: 'Auto-capitalize behavior',
    },
    autoCorrect: {
      control: 'boolean',
      description: 'Auto-correct enabled',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus on mount',
    },
    returnKeyType: {
      control: 'select',
      options: ['done', 'go', 'next', 'search', 'send', 'default'],
      description: 'Return key label',
    },
  },
  args: {
    placeholder: 'Type something...',
    size: 'md',
    variant: 'default',
    disabled: false,
    editable: true,
    readOnly: false,
    secureTextEntry: false,
    errorBorder: false,
    multiline: false,
    autoCorrect: true,
    autoFocus: false,
  },
} satisfies Meta<TextInputProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled variant',
  },
};

export const WithError: Story = {
  args: {
    errorBorder: true,
    errorMessage: 'This field is required',
    placeholder: 'Error state',
  },
};

export const Password: Story = {
  args: {
    secureTextEntry: true,
    placeholder: 'Enter password',
  },
};

export const Multiline: Story = {
  args: {
    multiline: true,
    numberOfLines: 4,
    placeholder: 'Enter multiple lines...',
  },
};

export const WithMaxLength: Story = {
  args: {
    maxLength: 20,
    placeholder: 'Max 20 characters',
  },
};

export const NumericKeyboard: Story = {
  args: {
    keyboardType: 'numeric',
    placeholder: 'Numbers only',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    editable: false,
    placeholder: 'Cannot edit',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <View style={{ gap: 16 }}>
        <TextInput
          placeholder="Type here..."
          value={value}
          onChangeText={setValue}
        />
      </View>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <TextInput size="sm" placeholder="Small" />
      <TextInput size="md" placeholder="Medium" />
      <TextInput size="lg" placeholder="Large" />
      <TextInput size="xl" placeholder="Extra Large" />
    </View>
  ),
};
