import type { ReactNode } from 'react';
import type { ViewProps, TextStyle } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

/** Modal size variants controlling content width */
export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

/** Modal animation type */
export type ModalAnimationType = 'none' | 'fade' | 'slide';

/**
 * Props for the Modal root component.
 * Wraps React Native Modal with a backdrop overlay and centers children.
 */
export interface ModalProps extends BaseAccessibilityProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Called when the modal should close (backdrop press, Android back button) */
  onClose?: () => void;
  /** Whether pressing the backdrop closes the modal (default: true) */
  closeOnBackdropPress?: boolean;
  /** Animation type for the modal (default: 'fade') */
  animationType?: ModalAnimationType;
  /** Modal content — typically a ModalContent with sub-components */
  children: ReactNode;
  /** Test ID for the overlay container */
  testID?: string;
}

/**
 * Props for the ModalContent component.
 * White card container with rounded corners and shadow.
 */
export interface ModalContentProps
  extends Omit<ViewProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** Size variant controlling width (default: 'md') */
  size?: ModalSize;
  /** Content children — ModalHeader, ModalBody, ModalFooter, or custom content */
  children: ReactNode;
}

/**
 * Props for the ModalHeader component.
 * Header section containing title and description.
 */
export interface ModalHeaderProps extends Omit<ViewProps, 'style'>, CommonStyleProps {
  /** Header children — typically ModalTitle and ModalDescription */
  children: ReactNode;
}

/** Common text style props for text-based sub-components */
export interface ModalTextStyleProps {
  /** Custom text styles (applied before style) */
  css?: TextStyle;
  /** Custom text styles (applied last for overrides) */
  style?: TextStyle;
}

/**
 * Props for the ModalTitle component.
 * Title text displayed in the modal header.
 */
export interface ModalTitleProps extends ModalTextStyleProps {
  /** Title text content */
  children: ReactNode;
  /** Test ID */
  testID?: string;
}

/**
 * Props for the ModalDescription component.
 * Description text displayed below the title.
 */
export interface ModalDescriptionProps extends ModalTextStyleProps {
  /** Description text content */
  children: ReactNode;
  /** Test ID */
  testID?: string;
}

/**
 * Props for the ModalBody component.
 * Main content area between header and footer.
 */
export interface ModalBodyProps extends Omit<ViewProps, 'style'>, CommonStyleProps {
  /** Body content */
  children: ReactNode;
  /** Whether the body content is scrollable (default: false) */
  scrollable?: boolean;
}

/**
 * Props for the ModalFooter component.
 * Action button area at the bottom of the modal.
 */
export interface ModalFooterProps extends Omit<ViewProps, 'style'>, CommonStyleProps {
  /** Footer children — typically Button components */
  children: ReactNode;
}
