import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { Alert } from '../alert';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

describe('Alert', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByTestId } = wrap(<Alert testID="alert">Alert message</Alert>);
    expect(getByTestId('alert')).toBeTruthy();
  });

  it('renders string children correctly', () => {
    const { getByText } = wrap(<Alert>This is an alert message</Alert>);
    expect(getByText('This is an alert message')).toBeTruthy();
  });

  it('renders element children correctly', () => {
    const { getByTestId } = wrap(
      <Alert>
        <View testID="custom-content">
          <Text>Custom content</Text>
        </View>
      </Alert>
    );
    expect(getByTestId('custom-content')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = wrap(<Alert testID="custom-alert">Message</Alert>);
    expect(getByTestId('custom-alert')).toBeTruthy();
  });

  // ── Variants ──

  describe('status', () => {
    const statuses: Array<'info' | 'success' | 'warning' | 'error'> = [
      'info',
      'success',
      'warning',
      'error',
    ];

    statuses.forEach((status) => {
      it(`renders with status="${status}"`, () => {
        const { getByTestId } = wrap(
          <Alert testID="alert" status={status}>
            Alert message
          </Alert>
        );
        expect(getByTestId('alert')).toBeTruthy();
      });
    });

    it('uses default status="info" when status prop is not provided', () => {
      const { getByTestId } = wrap(<Alert testID="alert">Alert message</Alert>);
      const alert = getByTestId('alert');
      expect(alert).toBeTruthy();
      // Verify it renders (default status should work)
      expect(alert.props.accessibilityRole).toBe('alert');
    });
  });

  describe('size', () => {
    const sizes: Array<'sm' | 'md'> = ['sm', 'md'];

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const { getByTestId } = wrap(
          <Alert testID="alert" size={size}>
            Alert message
          </Alert>
        );
        expect(getByTestId('alert')).toBeTruthy();
      });
    });

    it('uses default size="sm" when size prop is not provided', () => {
      const { getByTestId } = wrap(<Alert testID="alert">Alert message</Alert>);
      expect(getByTestId('alert')).toBeTruthy();
    });
  });

  // ── Accessibility ──

  describe('accessibility', () => {
    it('has accessibilityRole="alert" by default', () => {
      const { getByTestId } = wrap(<Alert testID="alert">Alert message</Alert>);
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityRole).toBe('alert');
    });

    it('allows custom accessibilityRole override', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" accessibilityRole="banner">
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityRole).toBe('banner');
    });

    it('sets accessibilityLiveRegion="polite" for error status', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" status="error">
          Error message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityLiveRegion).toBe('polite');
    });

    it('sets accessibilityLiveRegion="polite" for warning status', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" status="warning">
          Warning message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityLiveRegion).toBe('polite');
    });

    it('sets accessibilityLiveRegion="none" for info status', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" status="info">
          Info message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityLiveRegion).toBe('none');
    });

    it('sets accessibilityLiveRegion="none" for success status', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" status="success">
          Success message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityLiveRegion).toBe('none');
    });

    it('allows custom accessibilityLiveRegion override', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" status="error" accessibilityLiveRegion="assertive">
          Error message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityLiveRegion).toBe('assertive');
    });

    it('forwards accessibilityLabel', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" accessibilityLabel="Important notification">
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityLabel).toBe('Important notification');
    });

    it('forwards accessibilityHint', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" accessibilityHint="This alert provides important information">
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityHint).toBe('This alert provides important information');
    });

    it('forwards accessibilityState', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" accessibilityState={{ disabled: false }}>
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessibilityState).toEqual({ disabled: false });
    });

    it('has accessible={true} by default', () => {
      const { getByTestId } = wrap(<Alert testID="alert">Alert message</Alert>);
      const alert = getByTestId('alert');
      expect(alert.props.accessible).toBe(true);
    });

    it('allows accessible={false} override', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" accessible={false}>
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      expect(alert.props.accessible).toBe(false);
    });
  });

  // ── Interaction ──

  describe('interaction', () => {
    it('does not render close button when closable={false} (default)', () => {
      const { queryByLabelText } = wrap(<Alert>Alert message</Alert>);
      expect(queryByLabelText('Close alert')).toBeNull();
    });

    it('does not render close button when closable={true} but onClose is not provided', () => {
      const { queryByLabelText } = wrap(<Alert closable>Alert message</Alert>);
      expect(queryByLabelText('Close alert')).toBeNull();
    });

    it('renders close button when closable={true} and onClose is provided', () => {
      const onClose = jest.fn();
      const { getByLabelText } = wrap(
        <Alert closable onClose={onClose}>
          Alert message
        </Alert>
      );
      expect(getByLabelText('Close alert')).toBeTruthy();
    });

    it('calls onClose when close button is pressed', () => {
      const onClose = jest.fn();
      const { getByLabelText } = wrap(
        <Alert closable onClose={onClose}>
          Alert message
        </Alert>
      );
      const closeButton = getByLabelText('Close alert');
      fireEvent.press(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('close button has accessibilityRole="button"', () => {
      const onClose = jest.fn();
      const { getByLabelText } = wrap(
        <Alert closable onClose={onClose}>
          Alert message
        </Alert>
      );
      const closeButton = getByLabelText('Close alert');
      expect(closeButton.props.accessibilityRole).toBe('button');
    });

    it('close button has accessibilityLabel="Close alert"', () => {
      const onClose = jest.fn();
      const { getByLabelText } = wrap(
        <Alert closable onClose={onClose}>
          Alert message
        </Alert>
      );
      const closeButton = getByLabelText('Close alert');
      expect(closeButton.props.accessibilityLabel).toBe('Close alert');
    });

    it('close button has accessibilityHint', () => {
      const onClose = jest.fn();
      const { getByLabelText } = wrap(
        <Alert closable onClose={onClose}>
          Alert message
        </Alert>
      );
      const closeButton = getByLabelText('Close alert');
      expect(closeButton.props.accessibilityHint).toBe('Dismisses this alert');
    });
  });

  // ── State transitions ──

  describe('state transitions', () => {
    it('updates accessibilityLiveRegion when status changes from info to error', () => {
      const { getByTestId, rerender } = wrap(
        <Alert testID="alert" status="info">
          Alert message
        </Alert>
      );
      const alertBefore = getByTestId('alert');
      expect(alertBefore.props.accessibilityLiveRegion).toBe('none');

      rerender(
        <TwigsProvider>
          <Alert testID="alert" status="error">
            Alert message
          </Alert>
        </TwigsProvider>
      );
      const alertAfter = getByTestId('alert');
      expect(alertAfter.props.accessibilityLiveRegion).toBe('polite');
    });

    it('updates accessibilityLiveRegion when status changes from error to success', () => {
      const { getByTestId, rerender } = wrap(
        <Alert testID="alert" status="error">
          Alert message
        </Alert>
      );
      const alertBefore = getByTestId('alert');
      expect(alertBefore.props.accessibilityLiveRegion).toBe('polite');

      rerender(
        <TwigsProvider>
          <Alert testID="alert" status="success">
            Alert message
          </Alert>
        </TwigsProvider>
      );
      const alertAfter = getByTestId('alert');
      expect(alertAfter.props.accessibilityLiveRegion).toBe('none');
    });

    it('updates when size changes via rerender', () => {
      const { getByTestId, rerender } = wrap(
        <Alert testID="alert" size="sm">
          Alert message
        </Alert>
      );
      const alertBefore = getByTestId('alert');
      expect(alertBefore).toBeTruthy();

      rerender(
        <TwigsProvider>
          <Alert testID="alert" size="md">
            Alert message
          </Alert>
        </TwigsProvider>
      );
      const alertAfter = getByTestId('alert');
      expect(alertAfter).toBeTruthy();
    });

    it('shows close button when closable changes from false to true', () => {
      const onClose = jest.fn();
      const { queryByLabelText, rerender } = wrap(<Alert onClose={onClose}>Alert message</Alert>);
      expect(queryByLabelText('Close alert')).toBeNull();

      rerender(
        <TwigsProvider>
          <Alert closable onClose={onClose}>
            Alert message
          </Alert>
        </TwigsProvider>
      );
      expect(queryByLabelText('Close alert')).toBeTruthy();
    });

    it('hides close button when closable changes from true to false', () => {
      const onClose = jest.fn();
      const { queryByLabelText, rerender } = wrap(
        <Alert closable onClose={onClose}>
          Alert message
        </Alert>
      );
      expect(queryByLabelText('Close alert')).toBeTruthy();

      rerender(
        <TwigsProvider>
          <Alert onClose={onClose}>Alert message</Alert>
        </TwigsProvider>
      );
      expect(queryByLabelText('Close alert')).toBeNull();
    });
  });

  // ── Style overrides ──

  describe('style props', () => {
    it('applies css prop', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" css={{ opacity: 0.5 }}>
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      const flatStyle = Array.isArray(alert.props.style)
        ? Object.assign({}, ...alert.props.style.filter(Boolean))
        : alert.props.style;
      expect(flatStyle.opacity).toBe(0.5);
    });

    it('applies style prop', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" style={{ opacity: 0.7 }}>
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      const flatStyle = Array.isArray(alert.props.style)
        ? Object.assign({}, ...alert.props.style.filter(Boolean))
        : alert.props.style;
      expect(flatStyle.opacity).toBe(0.7);
    });

    it('style prop overrides css prop (applied last)', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" css={{ opacity: 0.5 }} style={{ opacity: 0.9 }}>
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      const flatStyle = Array.isArray(alert.props.style)
        ? Object.assign({}, ...alert.props.style.filter(Boolean))
        : alert.props.style;
      expect(flatStyle.opacity).toBe(0.9);
    });

    it('applies both css and style props together', () => {
      const { getByTestId } = wrap(
        <Alert testID="alert" css={{ opacity: 0.5 }} style={{ borderRadius: 4 }}>
          Alert message
        </Alert>
      );
      const alert = getByTestId('alert');
      const flatStyle = Array.isArray(alert.props.style)
        ? Object.assign({}, ...alert.props.style.filter(Boolean))
        : alert.props.style;
      expect(flatStyle.opacity).toBe(0.5);
      expect(flatStyle.borderRadius).toBe(4);
    });
  });
});
