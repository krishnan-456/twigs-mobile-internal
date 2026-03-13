import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Avatar, AvatarGroup } from '../avatar';
import { TwigsProvider } from '../context';
import { wrap } from './test-utils';

const createAvatars = (count: number, withTouchHandler?: (index: number) => () => void) =>
  Array.from({ length: count }).map((_, index) => (
    <Avatar
      key={`avatar-${index}`}
      testID={`avatar-${index}`}
      name={`User ${index + 1}`}
      imageSrc={`https://example.com/avatar-${index + 1}.png`}
      {...(withTouchHandler ? { onTouchEnd: withTouchHandler(index) } : undefined)}
    />
  ));

describe('AvatarGroup', () => {
  // Render
  describe('Render', () => {
    it('renders without crashing', () => {
      const { getByTestId } = wrap(
        <AvatarGroup testID="avatar-group">{createAvatars(4)}</AvatarGroup>
      );

      expect(getByTestId('avatar-group')).toBeTruthy();
    });

    it('renders all avatars when limit is 0 (default)', () => {
      const { getAllByRole, queryByText } = wrap(<AvatarGroup>{createAvatars(3)}</AvatarGroup>);

      expect(getAllByRole('image')).toHaveLength(3);
      expect(queryByText('+1')).toBeNull();
    });
  });

  // Variants
  describe('Variants', () => {
    it.each(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const)(
      'renders size="%s"',
      (size) => {
        const { getByTestId } = wrap(
          <AvatarGroup testID="avatar-group" size={size}>
            {createAvatars(4)}
          </AvatarGroup>
        );

        expect(getByTestId('avatar-group')).toBeTruthy();
      }
    );

    it.each(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const)(
      'renders rounded="%s"',
      (rounded) => {
        const { getByTestId } = wrap(
          <AvatarGroup testID="avatar-group" rounded={rounded}>
            {createAvatars(4)}
          </AvatarGroup>
        );

        expect(getByTestId('avatar-group')).toBeTruthy();
      }
    );

    it('shows overflow avatar and default +N label when limit is exceeded', () => {
      const { getByText, getAllByRole } = wrap(
        <AvatarGroup limit={3}>{createAvatars(6)}</AvatarGroup>
      );

      expect(getByText('+3')).toBeTruthy();
      expect(getAllByRole('image')).toHaveLength(4);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('uses accessibilityRole="none" by default', () => {
      const { getByTestId } = wrap(
        <AvatarGroup testID="avatar-group">{createAvatars(2)}</AvatarGroup>
      );

      expect(getByTestId('avatar-group').props.accessibilityRole).toBe('none');
    });

    it('forwards accessibilityLabel and accessibilityHint', () => {
      const { getByTestId } = wrap(
        <AvatarGroup
          testID="avatar-group"
          accessibilityLabel="Assignee group"
          accessibilityHint="Shows current assignees"
        >
          {createAvatars(2)}
        </AvatarGroup>
      );

      const group = getByTestId('avatar-group');
      expect(group.props.accessibilityLabel).toBe('Assignee group');
      expect(group.props.accessibilityHint).toBe('Shows current assignees');
    });

    it('supports overriding accessibilityRole', () => {
      const { getByTestId } = wrap(
        <AvatarGroup testID="avatar-group" accessibilityRole="image">
          {createAvatars(2)}
        </AvatarGroup>
      );

      expect(getByTestId('avatar-group').props.accessibilityRole).toBe('image');
    });
  });

  // Interaction
  describe('Interaction', () => {
    it('preserves child avatar interaction handlers', () => {
      const onTouchEnd = jest.fn();
      const { getByTestId } = wrap(<AvatarGroup>{createAvatars(2, () => onTouchEnd)}</AvatarGroup>);

      fireEvent(getByTestId('avatar-0'), 'touchEnd');
      expect(onTouchEnd).toHaveBeenCalledTimes(1);
    });

    it('supports custom overflow label', () => {
      const { getByText } = wrap(
        <AvatarGroup limit={2} limitExceededLabel="Team">
          {createAvatars(5)}
        </AvatarGroup>
      );

      expect(getByText('Team')).toBeTruthy();
    });
  });

  // State transitions
  describe('State transitions', () => {
    it('updates overflow label when limit changes on rerender', () => {
      const { queryByText, rerender } = wrap(<AvatarGroup>{createAvatars(5)}</AvatarGroup>);

      expect(queryByText('+3')).toBeNull();

      rerender(
        <TwigsProvider>
          <AvatarGroup limit={2}>{createAvatars(5)}</AvatarGroup>
        </TwigsProvider>
      );

      expect(queryByText('+3')).toBeTruthy();
    });
  });

  // Style overrides
  describe('Style overrides', () => {
    it('applies css and style props with style last', () => {
      const css = { opacity: 0.6 };
      const style = { opacity: 0.9 };
      const { getByTestId } = wrap(
        <AvatarGroup testID="avatar-group" css={css} style={style}>
          {createAvatars(2)}
        </AvatarGroup>
      );

      const styleArray = getByTestId('avatar-group').props.style;
      expect(Array.isArray(styleArray)).toBe(true);
      expect(styleArray.at(-2)).toMatchObject(css);
      expect(styleArray.at(-1)).toMatchObject(style);
    });
  });
});
