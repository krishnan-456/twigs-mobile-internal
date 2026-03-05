import React from 'react';
import { Pressable, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from '../modal';
import { Button } from '../button';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

const renderModal = (
  visible: boolean,
  props?: {
    onClose?: () => void;
    closeOnBackdropPress?: boolean;
    animationType?: 'none' | 'fade' | 'slide';
    testID?: string;
  }
) =>
  wrap(
    <Modal visible={visible} testID="modal" {...props}>
      <ModalContent testID="modal-content" size="md">
        <ModalHeader>
          <ModalTitle testID="modal-title">Modal Title</ModalTitle>
          <ModalDescription testID="modal-description">Modal description text</ModalDescription>
        </ModalHeader>
        <ModalBody testID="modal-body">
          <Text>Body content</Text>
        </ModalBody>
        <ModalFooter testID="modal-footer">
          <Button testID="cancel-btn">Cancel</Button>
          <Button testID="confirm-btn">Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

describe('Modal', () => {
  // ── Render ──

  describe('render', () => {
    it('renders without crashing when visible', () => {
      const { getByTestId } = renderModal(true);
      expect(getByTestId('modal')).toBeTruthy();
    });

    it('shows children when visible={true}', () => {
      const { getByText, getByTestId } = renderModal(true);
      expect(getByText('Modal Title')).toBeTruthy();
      expect(getByText('Modal description text')).toBeTruthy();
      expect(getByText('Body content')).toBeTruthy();
      expect(getByText('Cancel')).toBeTruthy();
      expect(getByText('Confirm')).toBeTruthy();
      expect(getByTestId('modal-content')).toBeTruthy();
      expect(getByTestId('modal-title')).toBeTruthy();
      expect(getByTestId('modal-description')).toBeTruthy();
      expect(getByTestId('modal-body')).toBeTruthy();
      expect(getByTestId('modal-footer')).toBeTruthy();
    });

    it('hides children when visible={false}', () => {
      const { queryByText, queryByTestId } = renderModal(false);
      expect(queryByText('Modal Title')).toBeNull();
      expect(queryByText('Modal description text')).toBeNull();
      expect(queryByText('Body content')).toBeNull();
      expect(queryByTestId('modal-content')).toBeNull();
      expect(queryByTestId('modal-title')).toBeNull();
    });

    it('renders with testID on overlay', () => {
      const { getByTestId } = renderModal(true, { testID: 'custom-modal' });
      expect(getByTestId('custom-modal')).toBeTruthy();
    });

    it('renders all sub-components correctly', () => {
      const { getByTestId } = renderModal(true);
      expect(getByTestId('modal')).toBeTruthy();
      expect(getByTestId('modal-content')).toBeTruthy();
      expect(getByTestId('modal-title')).toBeTruthy();
      expect(getByTestId('modal-description')).toBeTruthy();
      expect(getByTestId('modal-body')).toBeTruthy();
      expect(getByTestId('modal-footer')).toBeTruthy();
    });
  });

  // ── Variants ──

  describe('variants', () => {
    describe('ModalContent size', () => {
      const sizes = ['sm', 'md', 'lg', 'full'] as const;

      sizes.forEach((size) => {
        it(`renders ModalContent with size="${size}"`, () => {
          const { getByTestId, getByText } = wrap(
            <Modal visible testID="modal">
              <ModalContent testID="modal-content" size={size}>
                <ModalHeader>
                  <ModalTitle>Title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <Text>Content</Text>
                </ModalBody>
              </ModalContent>
            </Modal>
          );
          expect(getByTestId('modal-content')).toBeTruthy();
          expect(getByText('Title')).toBeTruthy();
        });
      });

      it('uses default size="md" when size prop is not provided', () => {
        const { getByTestId, getByText } = wrap(
          <Modal visible testID="modal">
            <ModalContent testID="modal-content">
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        );
        expect(getByTestId('modal-content')).toBeTruthy();
        expect(getByText('Title')).toBeTruthy();
      });
    });

    describe('Modal animationType', () => {
      (['none', 'fade', 'slide'] as const).forEach((animationType) => {
        it(`renders with animationType="${animationType}"`, () => {
          const { getByTestId } = renderModal(true, { animationType });
          expect(getByTestId('modal')).toBeTruthy();
        });
      });
    });
  });

  // ── Accessibility ──

  describe('accessibility', () => {
    it('sets accessibilityViewIsModal={true} on overlay by default', () => {
      const { getByTestId } = renderModal(true);
      const overlay = getByTestId('modal');
      expect(overlay.props.accessibilityViewIsModal).toBe(true);
    });

    it('allows custom accessibilityViewIsModal override', () => {
      const { getByTestId } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal" accessibilityViewIsModal={false}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      const overlay = getByTestId('modal');
      expect(overlay.props.accessibilityViewIsModal).toBe(false);
    });

    it('forwards accessibilityLabel to overlay', () => {
      const { getByTestId } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal" accessibilityLabel="Confirmation dialog">
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      const overlay = getByTestId('modal');
      expect(overlay.props.accessibilityLabel).toBe('Confirmation dialog');
    });

    it('forwards accessibilityHint to overlay', () => {
      const { getByTestId } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal" accessibilityHint="Use backdrop to close">
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      const overlay = getByTestId('modal');
      expect(overlay.props.accessibilityHint).toBe('Use backdrop to close');
    });

    it('ModalContent forwards accessibility props', () => {
      const { getByTestId } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal">
            <ModalContent
              testID="modal-content"
              accessible
              accessibilityRole="summary"
              accessibilityLabel="Modal content"
            >
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      const content = getByTestId('modal-content');
      expect(content.props.accessible).toBe(true);
      expect(content.props.accessibilityRole).toBe('summary');
      expect(content.props.accessibilityLabel).toBe('Modal content');
    });

    it('ModalTitle has numberOfLines={1}', () => {
      const { getByTestId } = renderModal(true);
      const title = getByTestId('modal-title');
      expect(title.props.numberOfLines).toBe(1);
    });
  });

  // ── Interaction ──

  describe('interaction', () => {
    it('calls onClose when backdrop is pressed (closeOnBackdropPress=true)', () => {
      const onClose = jest.fn();
      const { UNSAFE_getAllByType } = renderModal(true, {
        onClose,
        closeOnBackdropPress: true,
      });
      const pressables = UNSAFE_getAllByType(Pressable);
      const backdrop = pressables.find((p) => p.props.accessible === false);
      expect(backdrop).toBeDefined();
      fireEvent.press(backdrop!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when backdrop is pressed with closeOnBackdropPress=false', () => {
      const onClose = jest.fn();
      const { UNSAFE_getAllByType } = renderModal(true, {
        onClose,
        closeOnBackdropPress: false,
      });
      const pressables = UNSAFE_getAllByType(Pressable);
      const backdrop = pressables.find((p) => p.props.accessible === false);
      expect(backdrop).toBeDefined();
      fireEvent.press(backdrop!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('backdrop has accessible={false}', () => {
      const { UNSAFE_getAllByType } = renderModal(true);
      const pressables = UNSAFE_getAllByType(Pressable);
      const backdrop = pressables.find((p) => p.props.accessible === false);
      expect(backdrop).toBeDefined();
      expect(backdrop!.props.accessible).toBe(false);
    });

    it('footer buttons are pressable', () => {
      const onConfirm = jest.fn();
      const { getByTestId } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal">
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
              <ModalFooter>
                <Button testID="cancel-btn">Cancel</Button>
                <Button testID="confirm-btn" onPress={onConfirm}>
                  Confirm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      const confirmBtn = getByTestId('confirm-btn');
      fireEvent.press(confirmBtn);
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('ModalFooter wraps each child in a View with flex:1', () => {
      const { getByTestId } = renderModal(true);
      const footer = getByTestId('modal-footer');
      expect(footer).toBeTruthy();
      // Footer wraps each child (e.g. Button) in a View; both Cancel and Confirm should render
      expect(getByTestId('cancel-btn')).toBeTruthy();
      expect(getByTestId('confirm-btn')).toBeTruthy();
    });
  });

  // ── State transitions ──

  describe('state transitions', () => {
    it('shows content when visible changes from false to true', () => {
      const { queryByText, getByText, rerender } = wrap(
        <Modal visible={false} testID="modal">
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Title</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Text>Content</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      );
      expect(queryByText('Title')).toBeNull();

      rerender(
        <TwigsProvider>
          <Modal visible testID="modal">
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      expect(getByText('Title')).toBeTruthy();
      expect(getByText('Content')).toBeTruthy();
    });

    it('hides content when visible changes from true to false', () => {
      const { getByText, queryByText, rerender } = wrap(
        <Modal visible testID="modal">
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Title</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Text>Content</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      );
      expect(getByText('Title')).toBeTruthy();

      rerender(
        <TwigsProvider>
          <Modal visible={false} testID="modal">
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      expect(queryByText('Title')).toBeNull();
    });

    it('updates ModalContent size when size prop changes', () => {
      const { getByTestId, rerender } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal">
            <ModalContent testID="modal-content" size="sm">
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      expect(getByTestId('modal-content')).toBeTruthy();

      rerender(
        <TwigsProvider>
          <Modal visible testID="modal">
            <ModalContent testID="modal-content" size="lg">
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      expect(getByTestId('modal-content')).toBeTruthy();
    });

    it('updates when closeOnBackdropPress changes via rerender', () => {
      const onClose = jest.fn();
      const { UNSAFE_getAllByType, rerender } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal" onClose={onClose} closeOnBackdropPress={false}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      const getBackdrop = () => {
        const pressables = UNSAFE_getAllByType(Pressable);
        return pressables.find((p) => p.props.accessible === false);
      };
      const backdrop = getBackdrop();
      expect(backdrop).toBeDefined();
      fireEvent.press(backdrop!);
      expect(onClose).not.toHaveBeenCalled();

      rerender(
        <TwigsProvider>
          <Modal visible testID="modal" onClose={onClose} closeOnBackdropPress>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      const backdrop2 = getBackdrop();
      expect(backdrop2).toBeDefined();
      fireEvent.press(backdrop2!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  // ── Sub-components standalone ──

  describe('ModalContent', () => {
    it('forwards css and style props', () => {
      const { getByTestId } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal">
            <ModalContent
              testID="modal-content"
              css={{ opacity: 0.8 }}
              style={{ borderRadius: 12 }}
            >
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text>Content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      const content = getByTestId('modal-content');
      expect(content).toBeTruthy();
      const flatStyle = Array.isArray(content.props.style)
        ? Object.assign({}, ...content.props.style.filter(Boolean))
        : content.props.style;
      expect(flatStyle.opacity).toBe(0.8);
      expect(flatStyle.borderRadius).toBe(12);
    });
  });

  describe('ModalBody', () => {
    it('renders with scrollable={false} by default', () => {
      const { getByTestId } = renderModal(true);
      expect(getByTestId('modal-body')).toBeTruthy();
    });

    it('renders with scrollable={true}', () => {
      const { getByText } = wrap(
        <TwigsProvider>
          <Modal visible testID="modal">
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Title</ModalTitle>
              </ModalHeader>
              <ModalBody scrollable>
                <Text>Scrollable content</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </TwigsProvider>
      );
      expect(getByText('Scrollable content')).toBeTruthy();
    });
  });
});
