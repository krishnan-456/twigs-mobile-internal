import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SegmentedButton } from '../segmented-button';
import { TwigsProvider } from '../context';
import { wrap } from './test-utils';

const defaultOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('SegmentedButton', () => {
  describe('Render', () => {
    it('renders without crashing', () => {
      const { getByTestId } = wrap(
        <SegmentedButton options={defaultOptions} testID="segmented-button" />
      );
      expect(getByTestId('segmented-button')).toBeTruthy();
    });

    it('renders all option labels', () => {
      const { getByText } = wrap(
        <SegmentedButton options={defaultOptions} testID="segmented-button" />
      );
      expect(getByText('Option A')).toBeTruthy();
      expect(getByText('Option B')).toBeTruthy();
      expect(getByText('Option C')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('renders with rounded="full" (default)', () => {
      const { getByTestId } = wrap(
        <SegmentedButton options={defaultOptions} rounded="full" testID="segmented-button" />
      );
      expect(getByTestId('segmented-button')).toBeTruthy();
    });

    it('renders with rounded="md"', () => {
      const { getByTestId } = wrap(
        <SegmentedButton options={defaultOptions} rounded="md" testID="segmented-button" />
      );
      expect(getByTestId('segmented-button')).toBeTruthy();
    });

    const roundedOptions = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const;

    roundedOptions.forEach((rounded) => {
      it(`renders with rounded="${rounded}"`, () => {
        const { getByTestId } = wrap(
          <SegmentedButton options={defaultOptions} rounded={rounded} testID="segmented-button" />
        );
        expect(getByTestId('segmented-button')).toBeTruthy();
      });
    });

    it('renders with fullWidth={false}', () => {
      const { getByTestId } = wrap(
        <SegmentedButton options={defaultOptions} fullWidth={false} testID="segmented-button" />
      );
      expect(getByTestId('segmented-button')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has accessibilityRole="radiogroup" on container', () => {
      const { getByRole } = wrap(
        <SegmentedButton options={defaultOptions} testID="segmented-button" />
      );
      const container = getByRole('radiogroup');
      expect(container).toBeTruthy();
      expect(container.props.accessibilityRole).toBe('radiogroup');
    });

    it('each segment has accessibilityRole="radio"', () => {
      const { getAllByRole } = wrap(<SegmentedButton options={defaultOptions} />);
      const radios = getAllByRole('radio');
      expect(radios).toHaveLength(3);
    });

    it('segments have accessibilityState.checked reflecting selection', () => {
      const { getAllByRole } = wrap(<SegmentedButton options={defaultOptions} value="b" />);
      const radios = getAllByRole('radio');
      expect(radios[0].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: false })
      );
      expect(radios[1].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true })
      );
      expect(radios[2].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: false })
      );
    });

    it('segments have accessibilityState.disabled when disabled', () => {
      const { getAllByRole } = wrap(<SegmentedButton options={defaultOptions} disabled />);
      const radios = getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio.props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
      });
    });

    it('individual disabled option has accessibilityState.disabled', () => {
      const optionsWithDisabled = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' },
      ];
      const { getAllByRole } = wrap(<SegmentedButton options={optionsWithDisabled} />);
      const radios = getAllByRole('radio');
      expect(radios[1].props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true })
      );
    });

    it('segments have accessibilityLabel matching their label text', () => {
      const { getAllByRole } = wrap(<SegmentedButton options={defaultOptions} />);
      const radios = getAllByRole('radio');
      expect(radios[0].props.accessibilityLabel).toBe('Option A');
      expect(radios[1].props.accessibilityLabel).toBe('Option B');
      expect(radios[2].props.accessibilityLabel).toBe('Option C');
    });
  });

  describe('Interaction', () => {
    it('calls onChange when a segment is pressed', () => {
      const onChange = jest.fn();
      const { getByText } = wrap(<SegmentedButton options={defaultOptions} onChange={onChange} />);
      fireEvent.press(getByText('Option B'));
      expect(onChange).toHaveBeenCalledWith('b');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', () => {
      const onChange = jest.fn();
      const { getByText } = wrap(
        <SegmentedButton options={defaultOptions} disabled onChange={onChange} />
      );
      fireEvent.press(getByText('Option B'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when pressing a disabled individual option', () => {
      const optionsWithDisabled = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' },
      ];
      const onChange = jest.fn();
      const { getByText } = wrap(
        <SegmentedButton options={optionsWithDisabled} onChange={onChange} />
      );
      fireEvent.press(getByText('Option B'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not throw when pressed with no onChange handler', () => {
      const { getByText } = wrap(<SegmentedButton options={defaultOptions} />);
      expect(() => fireEvent.press(getByText('Option A'))).not.toThrow();
    });
  });

  describe('State transitions', () => {
    it('updates checked states when value changes via rerender (controlled)', () => {
      const ControlledWrapper = () => {
        const [value, setValue] = useState('a');
        return (
          <SegmentedButton options={defaultOptions} value={value} onChange={(v) => setValue(v)} />
        );
      };
      const { getAllByRole, getByText } = wrap(
        <TwigsProvider>
          <ControlledWrapper />
        </TwigsProvider>
      );

      let radios = getAllByRole('radio');
      expect(radios[0].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true })
      );

      fireEvent.press(getByText('Option B'));

      radios = getAllByRole('radio');
      expect(radios[0].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: false })
      );
      expect(radios[1].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true })
      );
    });

    it('rerender with new value updates checked states', () => {
      const { getAllByRole, rerender } = wrap(
        <SegmentedButton options={defaultOptions} value="a" />
      );

      let radios = getAllByRole('radio');
      expect(radios[0].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true })
      );

      rerender(
        <TwigsProvider>
          <SegmentedButton options={defaultOptions} value="c" />
        </TwigsProvider>
      );

      radios = getAllByRole('radio');
      expect(radios[0].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: false })
      );
      expect(radios[2].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true })
      );
    });

    it('defaultValue works for uncontrolled mode', () => {
      const { getAllByRole } = wrap(<SegmentedButton options={defaultOptions} defaultValue="b" />);
      const radios = getAllByRole('radio');
      expect(radios[1].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true })
      );
    });

    it('uncontrolled mode updates selection on press', () => {
      const { getAllByRole, getByText } = wrap(
        <SegmentedButton options={defaultOptions} defaultValue="a" />
      );

      let radios = getAllByRole('radio');
      expect(radios[0].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true })
      );

      fireEvent.press(getByText('Option C'));

      radios = getAllByRole('radio');
      expect(radios[0].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: false })
      );
      expect(radios[2].props.accessibilityState).toEqual(
        expect.objectContaining({ checked: true })
      );
    });
  });
});
