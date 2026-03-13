import React from 'react';
import { View, Pressable, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { ToastProvider } from './toast-provider';
import { toast } from './toast';
import { LinkButton } from '../link-button';
import type { ToastVariant, ToastPosition } from './types';

interface ToastStoryProps {
  title: string;
  description: string;
  variant: ToastVariant;
  position: ToastPosition;
  duration: number;
  showAction: boolean;
}

const storyStyles = StyleSheet.create({
  wrapper: { flex: 1, padding: 16, gap: 12 },
  button: {
    backgroundColor: '#7158F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  destructiveButton: {
    backgroundColor: '#E75030',
  },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  section: { gap: 8 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  sectionObj: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const getActionLinkColorForVariant = (variant: ToastVariant) => {
  if (variant === 'default') return 'primary';
  if (variant === 'warning') return 'secondary';
  return 'light';
};

const ToastStory = ({
  title,
  description,
  variant,
  position,
  duration,
  showAction,
}: ToastStoryProps) => {
  const handleShow = () => {
    toast({
      title,
      description: description || undefined,
      variant,
      position,
      duration,
      action: showAction ? (
        <LinkButton
          size="sm"
          color={getActionLinkColorForVariant(variant)}
          variant="bold"
          onPress={() => toast.dismiss()}
        >
          Undo
        </LinkButton>
      ) : undefined,
    });
  };

  return (
    <View style={storyStyles.wrapper}>
      <Pressable style={storyStyles.button} onPress={handleShow}>
        <RNText style={storyStyles.buttonText}>Show Toast</RNText>
      </Pressable>
    </View>
  );
};

const meta = {
  title: 'Components/Toast',
  component: ToastStory,
  decorators: [
    (Story: React.FC) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'success',
        'error',
        'warning',
        'loading',
      ] as ToastVariant[],
      description: 'Visual variant that controls colors and default icon',
    },
    title: {
      control: 'text',
      description: 'Primary text shown in the toast',
    },
    description: {
      control: 'text',
      description: 'Secondary text below the title',
    },
    position: {
      control: 'select',
      options: [
        'top-center',
        'bottom-center',
      ] as ToastPosition[],
      description: 'Display position',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in ms',
    },
    showAction: {
      control: 'boolean',
      description: 'Show an action LinkButton on the right',
    },
  },
  args: {
    variant: 'success',
    title: 'Process successful!',
    description: '',
    position: 'bottom-center',
    duration: 4000,
    showAction: true,
  },
} satisfies Meta<ToastStoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Toast</RNText>
      <RNText style={docsStyles.description}>
        Non-blocking notification messages with stacking support. Use the
        imperative toast() API or the useToast() hook. Supports top-center and
        bottom-center positions, swipe-to-dismiss, and simultaneous toasts.
      </RNText>
      <View style={docsStyles.sectionObj}>
        <RNText style={docsStyles.sectionTitle}>Props (toast options)</RNText>
        <RNText style={docsStyles.prop}>
          • variant — 'default' | 'secondary' | 'success' | 'error' | 'warning' | 'loading'
        </RNText>
        <RNText style={docsStyles.prop}>• title — primary text</RNText>
        <RNText style={docsStyles.prop}>• description — secondary text</RNText>
        <RNText style={docsStyles.prop}>
          • position — 'top-center' | 'bottom-center'
        </RNText>
        <RNText style={docsStyles.prop}>
          • duration — auto-dismiss in ms (default: 4000)
        </RNText>
        <RNText style={docsStyles.prop}>
          • action — ReactElement for action button
        </RNText>
      </View>
      <View style={docsStyles.sectionObj}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <Pressable
          style={storyStyles.button}
          onPress={() =>
            toast({ title: 'Hello!', variant: 'success' })
          }
        >
          <RNText style={storyStyles.buttonText}>Show Toast</RNText>
        </Pressable>
      </View>
    </View>
  ),
};

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => {
    const variants: ToastVariant[] = [
      'default',
      'secondary',
      'success',
      'error',
      'warning',
      'loading',
    ];

    return (
      <View style={storyStyles.wrapper}>
        {variants.map((variant) => (
          <View key={variant} style={storyStyles.section}>
            <RNText style={storyStyles.sectionTitle}>{variant}</RNText>
            <Pressable
              style={storyStyles.button}
              onPress={() =>
                toast({
                  title:
                    variant === 'loading'
                      ? 'Processing...'
                      : `${variant} toast`,
                  variant,
                  action:
                    variant !== 'loading' ? (
                      <LinkButton
                        size="sm"
                        color={getActionLinkColorForVariant(variant)}
                        variant="bold"
                        onPress={() => toast.dismiss()}
                      >
                        Label
                      </LinkButton>
                    ) : undefined,
                })
              }
            >
              <RNText style={storyStyles.buttonText}>Show {variant}</RNText>
            </Pressable>
          </View>
        ))}
        <Pressable
          style={[storyStyles.button, storyStyles.destructiveButton]}
          onPress={() => toast.dismiss()}
        >
          <RNText style={storyStyles.buttonText}>Dismiss all</RNText>
        </Pressable>
      </View>
    );
  },
};

export const StackedToasts: Story = {
  render: () => {
    const showStacked = () => {
      toast.success('File uploaded');
      setTimeout(() => toast.success('Processing complete'), 300);
      setTimeout(() => toast.success('Email sent'), 600);
    };

    return (
      <View style={storyStyles.wrapper}>
        <View style={storyStyles.section}>
          <RNText style={storyStyles.sectionTitle}>Stacking</RNText>
          <Pressable style={storyStyles.button} onPress={showStacked}>
            <RNText style={storyStyles.buttonText}>
              Show 3 stacked toasts
            </RNText>
          </Pressable>
        </View>
        <Pressable
          style={[storyStyles.button, storyStyles.destructiveButton]}
          onPress={() => toast.dismiss()}
        >
          <RNText style={storyStyles.buttonText}>Dismiss all</RNText>
        </Pressable>
      </View>
    );
  },
};

export const AllPositions: Story = {
  render: () => {
    const positions: ToastPosition[] = [
      'top-center',
      'bottom-center',
    ];

    return (
      <View style={storyStyles.wrapper}>
        {positions.map((position) => (
          <View key={position} style={storyStyles.section}>
            <Pressable
              style={storyStyles.button}
              onPress={() =>
                toast({
                  title: position,
                  variant: 'default',
                  position,
                })
              }
            >
              <RNText style={storyStyles.buttonText}>{position}</RNText>
            </Pressable>
          </View>
        ))}
        <Pressable
          style={[storyStyles.button, storyStyles.destructiveButton]}
          onPress={() => toast.dismiss()}
        >
          <RNText style={storyStyles.buttonText}>Dismiss all</RNText>
        </Pressable>
      </View>
    );
  },
};

export const LoadingToUpdate: Story = {
  render: () => {
    const handleLoadingFlow = () => {
      const { id } = toast.loading('Uploading file...');

      setTimeout(() => {
        toast.update(id, {
          title: 'Upload complete!',
          variant: 'success',
          duration: 3000,
        });
      }, 2000);
    };

    return (
      <View style={storyStyles.wrapper}>
        <View style={storyStyles.section}>
          <RNText style={storyStyles.sectionTitle}>
            Loading → Success
          </RNText>
          <Pressable style={storyStyles.button} onPress={handleLoadingFlow}>
            <RNText style={storyStyles.buttonText}>
              Start upload flow
            </RNText>
          </Pressable>
        </View>
      </View>
    );
  },
};
