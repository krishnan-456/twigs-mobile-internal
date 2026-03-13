import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Image, StyleSheet } from 'react-native';
import { Avatar } from '../avatar';
import { TwigsProvider } from '../context';
import { wrap } from './test-utils';

describe('Avatar', () => {
  // Render
  describe('Render', () => {
    it('renders without crashing', () => {
      const { getByTestId } = wrap(<Avatar name="John Doe" testID="avatar" />);
      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('renders initials from full name', () => {
      const { getByText } = wrap(<Avatar name="John Doe" />);
      expect(getByText('JD')).toBeTruthy();
    });

    it('renders image from legacy imageSrc prop', () => {
      const imageSrc = 'https://example.com/legacy-avatar.jpg';
      const { UNSAFE_getByType } = wrap(<Avatar name="Legacy" imageSrc={imageSrc} />);
      expect(UNSAFE_getByType(Image).props.source).toEqual({ uri: imageSrc });
    });
  });

  // Variants
  describe('Variants', () => {
    it.each(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const)(
      'renders size="%s"',
      (size) => {
        const { getByRole } = wrap(<Avatar name="A" size={size} />);
        expect(getByRole('image')).toBeTruthy();
      }
    );

    it.each(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const)(
      'renders rounded="%s"',
      (rounded) => {
        const { getByRole } = wrap(<Avatar name="A" rounded={rounded} />);
        expect(getByRole('image')).toBeTruthy();
      }
    );

    it('renders anonymous variant with dashed border and question mark', () => {
      const { getByTestId, getByText } = wrap(
        <Avatar testID="avatar" isAnonymous name="John Doe" />
      );
      const flatStyle = StyleSheet.flatten(getByTestId('avatar').props.style);

      expect(getByText('?')).toBeTruthy();
      expect(flatStyle.borderStyle).toBe('dashed');
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has default accessibility role "image"', () => {
      const { getByTestId } = wrap(<Avatar testID="avatar" name="Jane" />);
      expect(getByTestId('avatar').props.accessibilityRole).toBe('image');
    });

    it('uses name as accessibilityLabel by default', () => {
      const { getByTestId } = wrap(<Avatar testID="avatar" name="John Doe" />);
      expect(getByTestId('avatar').props.accessibilityLabel).toBe('John Doe');
    });

    it('uses anonymous accessibilityLabel by default', () => {
      const { getByTestId } = wrap(<Avatar testID="avatar" isAnonymous />);
      expect(getByTestId('avatar').props.accessibilityLabel).toBe('Anonymous avatar');
    });

    it('forwards custom accessibilityLabel and accessibilityHint', () => {
      const { getByTestId } = wrap(
        <Avatar
          testID="avatar"
          accessibilityLabel="Custom Avatar Label"
          accessibilityHint="Custom Avatar Hint"
        />
      );

      expect(getByTestId('avatar').props.accessibilityLabel).toBe('Custom Avatar Label');
      expect(getByTestId('avatar').props.accessibilityHint).toBe('Custom Avatar Hint');
    });
  });

  // State transitions
  describe('State transitions', () => {
    it('shows fallback initials when image fails to load', () => {
      const { UNSAFE_getByType, getByText } = wrap(
        <Avatar name="John Doe" imageSrc="https://example.com/avatar.jpg" />
      );

      fireEvent(UNSAFE_getByType(Image), 'error');
      expect(getByText('JD')).toBeTruthy();
    });

    it('updates to anonymous fallback on rerender', () => {
      const { queryByText, rerender, getByText } = wrap(
        <Avatar testID="avatar" name="John Doe" imageSrc="https://example.com/avatar.jpg" />
      );

      expect(queryByText('?')).toBeNull();

      rerender(
        <TwigsProvider>
          <Avatar
            testID="avatar"
            name="John Doe"
            imageSrc="https://example.com/avatar.jpg"
            isAnonymous
          />
        </TwigsProvider>
      );

      expect(getByText('?')).toBeTruthy();
    });
  });

  // Style overrides
  describe('Style overrides', () => {
    it('applies css and style in the expected order', () => {
      const css = { marginTop: 10 };
      const style = { marginTop: 20 };
      const { getByTestId } = wrap(<Avatar testID="avatar" name="A" css={css} style={style} />);
      const styleArray = getByTestId('avatar').props.style;

      expect(Array.isArray(styleArray)).toBe(true);
      expect(styleArray.at(-2)).toMatchObject(css);
      expect(styleArray.at(-1)).toMatchObject(style);
    });

    it('applies custom backgroundColor and textColor for fallback', () => {
      const { getByTestId, getByText } = wrap(
        <Avatar
          testID="avatar"
          name="A"
          backgroundColor="#123456"
          textColor="#FFFFFF"
          imageSrc={undefined}
        />
      );

      const avatarStyle = StyleSheet.flatten(getByTestId('avatar').props.style);
      const textStyle = StyleSheet.flatten(getByText('A').props.style);

      expect(avatarStyle.backgroundColor).toBe('#123456');
      expect(textStyle.color).toBe('#FFFFFF');
    });
  });
});
