import React, { useState } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Modal } from './modal';
import { ModalContent } from './modal-content';
import { ModalHeader } from './modal-header';
import { ModalTitle } from './modal-title';
import { ModalDescription } from './modal-description';
import { ModalBody } from './modal-body';
import { ModalFooter } from './modal-footer';
import { Button } from '../button';
import { Text } from '../text';
import type { ModalProps } from './types';

const ModalDemo = (args: ModalProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
      <Modal {...args} visible={visible} onClose={() => setVisible(false)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Delete?</ModalTitle>
            <ModalDescription>
              This action cannot be undone. This will permanently delete your account and remove your
              data from our servers.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button size="xl" color="default" variant="solid" onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button size="xl" color="error" variant="solid" onPress={() => setVisible(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};

const docsStyles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  prop: { fontSize: 13, color: '#444', lineHeight: 18 },
});

const meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    closeOnBackdropPress: {
      control: 'boolean',
      description: 'Whether pressing the backdrop closes the modal',
    },
  },
  args: {
    closeOnBackdropPress: true,
  },
} satisfies Meta<ModalProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <View style={docsStyles.container}>
      <RNText style={docsStyles.title}>Modal</RNText>
      <RNText style={docsStyles.description}>
        A dialog overlay with backdrop. Composed of ModalContent, ModalHeader, ModalTitle,
        ModalDescription, ModalBody, and ModalFooter sub-components.
      </RNText>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Props</RNText>
        <RNText style={docsStyles.prop}>• visible — boolean (controlled)</RNText>
        <RNText style={docsStyles.prop}>• onClose — callback when dismissed</RNText>
        <RNText style={docsStyles.prop}>
          • closeOnBackdropPress — boolean (default: true)
        </RNText>
      </View>
      <View style={docsStyles.section}>
        <RNText style={docsStyles.sectionTitle}>Usage</RNText>
        <RNText style={docsStyles.prop}>Tap the button below to open a modal.</RNText>
        <ModalDemo closeOnBackdropPress animationType="fade" />
      </View>
    </View>
  ),
};

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
};

export const AllVariants: Story = {
  render: () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
      <View style={{ gap: 12 }}>
        <Button onPress={() => setActiveModal('confirm')}>Confirmation Modal</Button>
        <Button onPress={() => setActiveModal('body')}>Modal with Body</Button>

        <Modal
          visible={activeModal === 'confirm'}
          onClose={() => setActiveModal(null)}
          animationType="fade"
        >
          <ModalContent size="sm">
            <ModalHeader>
              <ModalTitle>Confirm</ModalTitle>
              <ModalDescription>Are you sure?</ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button size="xl" color="default" onPress={() => setActiveModal(null)}>No</Button>
              <Button size="xl" color="primary" onPress={() => setActiveModal(null)}>Yes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          visible={activeModal === 'body'}
          onClose={() => setActiveModal(null)}
          animationType="fade"
        >
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Profile</ModalTitle>
              <ModalDescription>Make changes to your profile here.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <Text>Form fields would go here.</Text>
            </ModalBody>
            <ModalFooter>
              <Button size="xl" color="default" onPress={() => setActiveModal(null)}>Cancel</Button>
              <Button size="xl" color="primary" onPress={() => setActiveModal(null)}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </View>
    );
  },
};
