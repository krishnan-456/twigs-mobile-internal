import React, { useState } from 'react';
import { View } from 'react-native';
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
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button size="lg" color="default" variant="solid" onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button size="lg" color="error" variant="solid" onPress={() => setVisible(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};

const meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    closeOnBackdropPress: {
      control: 'boolean',
      description: 'Whether pressing the backdrop closes the modal',
    },
    animationType: {
      control: 'select',
      options: ['none', 'fade', 'slide'],
      description: 'Animation type for the modal',
    },
  },
  args: {
    closeOnBackdropPress: true,
    animationType: 'fade',
  },
} satisfies Meta<ModalProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
};

export const NoBackdropDismiss: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    closeOnBackdropPress: false,
  },
};

export const SlideAnimation: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    animationType: 'slide',
  },
};

export const SmallSize: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button onPress={() => setVisible(true)}>Small Modal</Button>
        <Modal {...args} visible={visible} onClose={() => setVisible(false)}>
          <ModalContent size="sm">
            <ModalHeader>
              <ModalTitle>Confirm</ModalTitle>
              <ModalDescription>Are you sure?</ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button size="xl" color="default" variant="solid" onPress={() => setVisible(false)}>
                No
              </Button>
              <Button size="xl" color="primary" variant="solid" onPress={() => setVisible(false)}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </View>
    );
  },
};

export const WithBody: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button onPress={() => setVisible(true)}>Dialog Modal</Button>
        <Modal {...args} visible={visible} onClose={() => setVisible(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Profile</ModalTitle>
              <ModalDescription>Make changes to your profile here.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <Text>Form fields would go here.</Text>
            </ModalBody>
            <ModalFooter>
              <Button size="lg" color="default" variant="solid" onPress={() => setVisible(false)}>
                Cancel
              </Button>
              <Button size="lg" color="primary" variant="solid" onPress={() => setVisible(false)}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </View>
    );
  },
};

export const CustomChildren: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button onPress={() => setVisible(true)}>Custom Modal</Button>
        <Modal {...args} visible={visible} onClose={() => setVisible(false)}>
          <ModalContent>
            <View style={{ padding: 24, alignItems: 'center', gap: 16 }}>
              <Text fontSize={20} fontWeight="700">
                Fully Custom Content
              </Text>
              <Text textAlign="center">
                You can put any content here without using sub-components.
              </Text>
              <Button color="primary" variant="solid" onPress={() => setVisible(false)}>
                Got it
              </Button>
            </View>
          </ModalContent>
        </Modal>
      </View>
    );
  },
};
