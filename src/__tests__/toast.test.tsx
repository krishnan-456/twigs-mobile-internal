import React from 'react';
import { act } from '@testing-library/react-native';
import { Text } from 'react-native';
import { TwigsProvider } from '../context';
import { ToastProvider } from '../toast/toast-provider';
import { toast } from '../toast/toast';
import { ToastContent } from '../toast/toast-content';
import { useToast } from '../toast/use-toast';
import type { ToastVariant } from '../toast/types';
import { VARIANT_COLORS } from '../toast/constants';
import { wrap } from './test-utils';

describe('Toast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ── Render ──

  describe('ToastProvider', () => {
    it('renders children without crashing', () => {
      const { getByText } = wrap(
        <ToastProvider>
          <Text>App Content</Text>
        </ToastProvider>,
      );
      expect(getByText('App Content')).toBeTruthy();
    });

    it('has displayName', () => {
      expect(ToastProvider.displayName).toBe('ToastProvider');
    });
  });

  describe('ToastContent', () => {
    it('renders title text', () => {
      const { getByText } = wrap(
        <ToastContent title="Test title" variant="success" />,
      );
      expect(getByText('Test title')).toBeTruthy();
    });

    it('renders description text when provided', () => {
      const { getByText } = wrap(
        <ToastContent
          title="Test title"
          variant="success"
          description="Test description"
        />,
      );
      expect(getByText('Test description')).toBeTruthy();
    });

    it('does not render description when not provided', () => {
      const { queryByText } = wrap(
        <ToastContent title="Test title" variant="success" />,
      );
      expect(queryByText('Test description')).toBeNull();
    });

    it('renders action element when provided', () => {
      const { getByText } = wrap(
        <ToastContent
          title="Test title"
          variant="success"
          action={<Text>Undo</Text>}
        />,
      );
      expect(getByText('Undo')).toBeTruthy();
    });

    it('does not render action container when action is not provided', () => {
      const { queryByText } = wrap(
        <ToastContent title="Test title" variant="success" />,
      );
      expect(queryByText('Undo')).toBeNull();
    });
  });

  // ── Variants ──

  describe('variants', () => {
    const variants: ToastVariant[] = [
      'default',
      'success',
      'error',
      'warning',
      'loading',
    ];

    variants.forEach((variant) => {
      it(`renders with variant="${variant}" without crashing`, () => {
        const { getByText } = wrap(
          <ToastContent title={`${variant} toast`} variant={variant} />,
        );
        expect(getByText(`${variant} toast`)).toBeTruthy();
      });
    });

    it('uses default variant when variant is not provided', () => {
      const { getByText } = wrap(
        <ToastContent title="Default toast" />,
      );
      expect(getByText('Default toast')).toBeTruthy();
    });

    it('has color config for all variants', () => {
      const allVariants: ToastVariant[] = [
        'default',
        'success',
        'error',
        'warning',
        'loading',
      ];
      allVariants.forEach((variant) => {
        const config = VARIANT_COLORS[variant];
        expect(config).toBeDefined();
        expect(config.background).toBeTruthy();
        expect(config.text).toBeTruthy();
        expect(config.icon).toBeTruthy();
        expect(config.actionText).toBeTruthy();
      });
    });
  });

  // ── Accessibility ──

  describe('accessibility', () => {
    it('has accessibilityRole="alert"', () => {
      const { getByRole } = wrap(
        <ToastContent title="Test toast" variant="success" />,
      );
      expect(getByRole('alert')).toBeTruthy();
    });

    it('has accessibilityLiveRegion="polite"', () => {
      const { getByRole } = wrap(
        <ToastContent title="Test toast" variant="success" />,
      );
      const toastEl = getByRole('alert');
      expect(toastEl.props.accessibilityLiveRegion).toBe('polite');
    });

    it('composes accessibilityLabel from title and description', () => {
      const { getByRole } = wrap(
        <ToastContent
          title="Save complete"
          variant="success"
          description="Your changes were saved"
        />,
      );
      const toastEl = getByRole('alert');
      expect(toastEl.props.accessibilityLabel).toBe(
        'Save complete. Your changes were saved',
      );
    });

    it('uses only title for accessibilityLabel when no description', () => {
      const { getByRole } = wrap(
        <ToastContent title="Save complete" variant="success" />,
      );
      const toastEl = getByRole('alert');
      expect(toastEl.props.accessibilityLabel).toBe('Save complete');
    });
  });

  // ── Imperative API (toast function) ──

  describe('toast() imperative API', () => {
    it('shows a toast via the imperative API', () => {
      const { getByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast({ title: 'Hello', variant: 'success' });
      });

      expect(getByText('Hello')).toBeTruthy();
    });

    it('returns an object with id and dismiss', () => {
      wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      let result: { id: string; dismiss: () => void } | undefined;
      act(() => {
        result = toast({ title: 'Hello' });
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('dismiss');
      expect(typeof result!.dismiss).toBe('function');
    });

    it('toast.success() shorthand works with string', () => {
      const { getByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast.success('Saved!');
      });

      expect(getByText('Saved!')).toBeTruthy();
    });

    it('toast.error() shorthand works with string', () => {
      const { getByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast.error('Failed!');
      });

      expect(getByText('Failed!')).toBeTruthy();
    });

    it('toast.warning() shorthand works with string', () => {
      const { getByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast.warning('Careful!');
      });

      expect(getByText('Careful!')).toBeTruthy();
    });

    it('toast.loading() shorthand works with string', () => {
      const { getByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast.loading('Processing...');
      });

      expect(getByText('Processing...')).toBeTruthy();
    });

    it('toast.success() shorthand works with options object', () => {
      const { getByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast.success({
          title: 'Saved!',
          description: 'Your changes were saved',
        });
      });

      expect(getByText('Saved!')).toBeTruthy();
      expect(getByText('Your changes were saved')).toBeTruthy();
    });

    it('toast.dismiss() clears all toasts', () => {
      const { getByText, queryByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast({ title: 'Hello' });
      });
      expect(getByText('Hello')).toBeTruthy();

      act(() => {
        toast.dismiss();
      });
      expect(queryByText('Hello')).toBeNull();
    });

    it('toast.dismiss(id) clears specific toast', () => {
      const { getByText, queryByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      let result: { id: string; dismiss: () => void } | undefined;
      act(() => {
        result = toast({ title: 'First' });
        toast({ title: 'Second' });
      });
      expect(getByText('First')).toBeTruthy();
      expect(getByText('Second')).toBeTruthy();

      act(() => {
        toast.dismiss(result!.id);
      });
      expect(queryByText('First')).toBeNull();
      expect(getByText('Second')).toBeTruthy();
    });
  });

  // ── Stacking ──

  describe('stacking', () => {
    it('shows multiple toasts simultaneously', () => {
      const { getByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast({ title: 'Toast 1' });
        toast({ title: 'Toast 2' });
        toast({ title: 'Toast 3' });
      });

      expect(getByText('Toast 1')).toBeTruthy();
      expect(getByText('Toast 2')).toBeTruthy();
      expect(getByText('Toast 3')).toBeTruthy();
    });

    it('respects maxToasts limit', () => {
      const { queryByText, getByText } = wrap(
        <ToastProvider maxToasts={2}>
          <Text>App</Text>
        </ToastProvider>,
      );

      act(() => {
        toast({ title: 'Toast 1' });
        toast({ title: 'Toast 2' });
        toast({ title: 'Toast 3' });
      });

      expect(queryByText('Toast 1')).toBeNull();
      expect(getByText('Toast 2')).toBeTruthy();
      expect(getByText('Toast 3')).toBeTruthy();
    });
  });

  // ── toast.update() ──

  describe('toast.update()', () => {
    it('updates an existing toast', () => {
      const { getByText, queryByText } = wrap(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      );

      let result: { id: string; dismiss: () => void } | undefined;
      act(() => {
        result = toast.loading('Processing...');
      });
      expect(getByText('Processing...')).toBeTruthy();

      act(() => {
        toast.update(result!.id, {
          title: 'Done!',
          variant: 'success',
        });
      });

      expect(getByText('Done!')).toBeTruthy();
      expect(queryByText('Processing...')).toBeNull();
    });
  });

  // ── useToast hook ──

  describe('useToast()', () => {
    it('throws when used outside ToastProvider', () => {
      const ThrowingComponent = () => {
        useToast();
        return null;
      };

      expect(() => wrap(<ThrowingComponent />)).toThrow(
        'useToastContext must be used within a ToastProvider',
      );
    });

    it('returns toast methods when inside ToastProvider', () => {
      let hookResult: ReturnType<typeof useToast> | undefined;

      const TestComponent = () => {
        hookResult = useToast();
        return null;
      };

      wrap(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      );

      expect(hookResult).toBeDefined();
      expect(typeof hookResult!.show).toBe('function');
      expect(typeof hookResult!.success).toBe('function');
      expect(typeof hookResult!.error).toBe('function');
      expect(typeof hookResult!.warning).toBe('function');
      expect(typeof hookResult!.loading).toBe('function');
      expect(typeof hookResult!.dismiss).toBe('function');
      expect(typeof hookResult!.update).toBe('function');
    });
  });

  // ── State transitions ──

  describe('state transitions', () => {
    it('re-renders with different variant', () => {
      const { rerender, getByText } = wrap(
        <ToastContent title="Toast message" variant="success" />,
      );
      expect(getByText('Toast message')).toBeTruthy();

      rerender(
        <TwigsProvider>
          <ToastContent title="Toast message" variant="error" />
        </TwigsProvider>,
      );
      expect(getByText('Toast message')).toBeTruthy();
    });

    it('updates text content on rerender', () => {
      const { rerender, getByText, queryByText } = wrap(
        <ToastContent title="Original" variant="success" />,
      );
      expect(getByText('Original')).toBeTruthy();

      rerender(
        <TwigsProvider>
          <ToastContent title="Updated" variant="success" />
        </TwigsProvider>,
      );
      expect(getByText('Updated')).toBeTruthy();
      expect(queryByText('Original')).toBeNull();
    });

    it('shows description when added via rerender', () => {
      const { rerender, queryByText, getByText } = wrap(
        <ToastContent title="Title" variant="success" />,
      );
      expect(queryByText('Description')).toBeNull();

      rerender(
        <TwigsProvider>
          <ToastContent
            title="Title"
            variant="success"
            description="Description"
          />
        </TwigsProvider>,
      );
      expect(getByText('Description')).toBeTruthy();
    });
  });
});
