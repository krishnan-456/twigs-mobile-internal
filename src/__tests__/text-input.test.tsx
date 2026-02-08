import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { TextInput } from '../text-input';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) =>
  render(<TwigsProvider>{ui}</TwigsProvider>);

describe('TextInput', () => {
  // ── Render ──

  it('renders without crashing', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Enter text" />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with defaultValue', () => {
    const { getByDisplayValue } = wrap(
      <TextInput placeholder="Name" defaultValue="John" />
    );
    expect(getByDisplayValue('John')).toBeTruthy();
  });

  it('renders with controlled value', () => {
    const { getByDisplayValue } = wrap(
      <TextInput placeholder="Name" value="Controlled" onChangeText={() => {}} />
    );
    expect(getByDisplayValue('Controlled')).toBeTruthy();
  });

  // ── Size variants ──

  describe('size prop', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        const { getByPlaceholderText } = wrap(
          <TextInput placeholder="Test" size={size} />
        );
        expect(getByPlaceholderText('Test')).toBeTruthy();
      });
    });
  });

  // ── Variant ──

  it('renders with variant="filled"', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Filled" variant="filled" />
    );
    expect(getByPlaceholderText('Filled')).toBeTruthy();
  });

  it('renders with variant="default"', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Default" variant="default" />
    );
    expect(getByPlaceholderText('Default')).toBeTruthy();
  });

  // ── Icons and elements ──

  it('renders with leftIcon', () => {
    const icon = <Text testID="left-icon">L</Text>;
    const { getByTestId, getByPlaceholderText } = wrap(
      <TextInput placeholder="Search" leftIcon={icon} />
    );
    expect(getByTestId('left-icon')).toBeTruthy();
    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  it('renders with rightIcon', () => {
    const icon = <Text testID="right-icon">R</Text>;
    const { getByTestId } = wrap(
      <TextInput placeholder="Search" rightIcon={icon} />
    );
    expect(getByTestId('right-icon')).toBeTruthy();
  });

  it('renders with leftElement', () => {
    const el = <View testID="left-element" />;
    const { getByTestId } = wrap(
      <TextInput placeholder="Amount" leftElement={el} />
    );
    expect(getByTestId('left-element')).toBeTruthy();
  });

  it('renders with rightElement', () => {
    const el = <View testID="right-element" />;
    const { getByTestId } = wrap(
      <TextInput placeholder="Amount" rightElement={el} />
    );
    expect(getByTestId('right-element')).toBeTruthy();
  });

  // ── Error message ──

  it('renders error message text', () => {
    const { getByText } = wrap(
      <TextInput placeholder="Name" errorMessage="Required field" />
    );
    expect(getByText('Required field')).toBeTruthy();
  });

  it('does not render error section when errorMessage is undefined', () => {
    const { queryByText } = wrap(
      <TextInput placeholder="Name" />
    );
    expect(queryByText('Required field')).toBeNull();
  });

  it('renders error message with icon layout', () => {
    const icon = <Text testID="icon">I</Text>;
    const { getByText } = wrap(
      <TextInput
        placeholder="Email"
        leftIcon={icon}
        errorMessage="Invalid email"
      />
    );
    expect(getByText('Invalid email')).toBeTruthy();
  });

  // ── Password toggle ──

  it('renders as password input when secureTextEntry is true', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Password" secureTextEntry />
    );
    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('password toggle shows password when showPassword is true', () => {
    const icon = <Text>Eye</Text>;
    const { getByPlaceholderText } = wrap(
      <TextInput
        placeholder="Password"
        secureTextEntry
        showPassword={true}
        setShowPassword={() => {}}
        rightIcon={icon}
      />
    );
    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(false);
  });

  it('password toggle hides password when showPassword is false', () => {
    const icon = <Text>Eye</Text>;
    const { getByPlaceholderText } = wrap(
      <TextInput
        placeholder="Password"
        secureTextEntry
        showPassword={false}
        setShowPassword={() => {}}
        rightIcon={icon}
      />
    );
    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  // ── Accessibility ──

  it('derives accessibilityLabel from placeholder', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Email address" />
    );
    expect(
      getByPlaceholderText('Email address').props.accessibilityLabel
    ).toBe('Email address');
  });

  it('uses explicit accessibilityLabel over placeholder', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput
        placeholder="Enter email"
        accessibilityLabel="Email field"
      />
    );
    expect(
      getByPlaceholderText('Enter email').props.accessibilityLabel
    ).toBe('Email field');
  });

  it('reflects disabled in accessibilityState', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Disabled" disabled />
    );
    expect(
      getByPlaceholderText('Disabled').props.accessibilityState
    ).toEqual(expect.objectContaining({ disabled: true }));
  });

  it('input has accessible=true', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="test" />
    );
    expect(getByPlaceholderText('test').props.accessible).toBe(true);
  });

  it('forwards accessibilityHint to input', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput
        placeholder="Search"
        accessibilityHint="Enter search term"
      />
    );
    expect(
      getByPlaceholderText('Search').props.accessibilityHint
    ).toBe('Enter search term');
  });

  // ── Interactions ──

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Type here" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByPlaceholderText('Type here'), 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');
    expect(onChangeText).toHaveBeenCalledTimes(1);
  });

  it('input is not editable when disabled', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Disabled" disabled />
    );
    expect(getByPlaceholderText('Disabled').props.editable).toBe(false);
  });

  // ── State transitions ──

  it('updates disabled state via rerender', () => {
    const { getByPlaceholderText, rerender } = wrap(
      <TextInput placeholder="Field" />
    );
    expect(
      getByPlaceholderText('Field').props.accessibilityState
    ).toEqual(expect.objectContaining({ disabled: false }));

    rerender(
      <TwigsProvider>
        <TextInput placeholder="Field" disabled />
      </TwigsProvider>
    );
    expect(
      getByPlaceholderText('Field').props.accessibilityState
    ).toEqual(expect.objectContaining({ disabled: true }));
  });

  // ── Edge cases ──

  it('renders with errorBorder styling', () => {
    const { getByPlaceholderText } = wrap(
      <TextInput placeholder="Error" errorBorder />
    );
    expect(getByPlaceholderText('Error')).toBeTruthy();
  });

  it('renders children (helper text slot)', () => {
    const { getByText } = wrap(
      <TextInput placeholder="Name">
        <Text>Helper text</Text>
      </TextInput>
    );
    expect(getByText('Helper text')).toBeTruthy();
  });
});
