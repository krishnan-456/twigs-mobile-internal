import React, { forwardRef, useRef, useState } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../context';
import { Box } from '../box';
import { Flex } from '../flex';
import { Text } from '../text';
import type { TextInputProps } from './types';
import { getSizeConfig } from './constants';
import { createTextInputStyles } from './styles';

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      placeholder,
      value,
      defaultValue,
      onChangeText,
      leftIcon,
      rightIcon,
      rightElement,
      leftElement,
      disabled = false,
      errorBorder = false,
      secureTextEntry = false,
      showPassword,
      setShowPassword,
      css,
      style,
      inputStyle,
      cursorColor,
      onFocus,
      onBlur,
      errorMessage,
      children,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      readOnly,
      autoCapitalize,
      autoCorrect,
      autoFocus,
      blurOnSubmit,
      editable,
      keyboardType,
      maxLength,
      multiline,
      numberOfLines,
      onSubmitEditing,
      returnKeyType,
      textContentType,
      placeholderTextColor,
      accessibilityLabel: accessibilityLabelProp,
      accessibilityHint,
      ..._rest
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = createTextInputStyles(theme);
    const [isFocused, setIsFocused] = useState(false);
    const internalRef = useRef<RNTextInput>(null);
    const textInputRef = ref || internalRef;

    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;
    const hasRightElement = !!rightElement;
    const hasLeftElement = !!leftElement;

    const isPassword = secureTextEntry && showPassword !== undefined;
    const shouldShowPassword = isPassword && showPassword;

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const config = getSizeConfig(size);
    const hasLeftIconOrElement = hasLeftIcon || hasLeftElement;
    const hasRightIconOrElement = hasRightIcon || hasRightElement;

    const inputWrapperStyles: ViewStyle = {
      height: config.height,
      borderRadius: config.borderRadius,
      backgroundColor: variant === 'filled' ? theme.colors.neutral50 : theme.colors.white900,
    };

    if (errorBorder) {
      inputWrapperStyles.borderTopColor = isFocused
        ? theme.colors.neutral500
        : theme.colors.black300;
      inputWrapperStyles.borderRightColor = isFocused
        ? theme.colors.neutral500
        : theme.colors.black300;
      inputWrapperStyles.borderLeftColor = isFocused
        ? theme.colors.neutral500
        : theme.colors.black300;
      inputWrapperStyles.borderBottomColor = theme.colors.negative500;
    } else {
      inputWrapperStyles.borderColor = isFocused ? theme.colors.neutral500 : theme.colors.black300;
    }

    const textInputStyles: TextStyle = {
      fontSize: config.fontSize,
      paddingLeft: hasLeftIconOrElement ? config.leftIconPadding : config.paddingHorizontal,
      paddingRight: hasRightIconOrElement ? config.rightIconPadding : config.paddingHorizontal,
    };

    const renderInput = () => (
      <RNTextInput
        ref={textInputRef}
        style={[styles.textInput, textInputStyles, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? theme.colors.neutral500}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry && !shouldShowPassword}
        editable={!disabled && editable !== false}
        cursorColor={cursorColor ?? theme.colors.neutral900}
        readOnly={readOnly}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        blurOnSubmit={blurOnSubmit}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        textContentType={textContentType}
        accessible
        accessibilityLabel={accessibilityLabelProp ?? placeholder}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled }}
      />
    );

    const containerSpacingProps = {
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    };

    if (hasLeftIcon || hasRightIcon || hasLeftElement || hasRightElement) {
      return (
        <Flex gap={4} css={{ width: '100%' }}>
          <Box
            css={StyleSheet.flatten([
              styles.container,
              disabled && styles.containerDisabled,
              css,
              style,
            ])}
            {...containerSpacingProps}
          >
            <Box
              css={StyleSheet.flatten([
                styles.inputWrapper,
                inputWrapperStyles,
                disabled && styles.inputWrapperDisabled,
              ])}
            >
              {hasLeftIcon && React.isValidElement(leftIcon) && (
                <Flex
                  align="center"
                  justify="center"
                  css={StyleSheet.flatten([styles.iconContainer, styles.iconContainerLeft])}
                >
                  {React.cloneElement(leftIcon, {
                    size: config.iconSize,
                    color: disabled ? theme.colors.neutral500 : theme.colors.neutral800,
                  } as Partial<typeof leftIcon.props>)}
                </Flex>
              )}

              {hasLeftElement && (
                <Flex
                  align="center"
                  justify="center"
                  css={StyleSheet.flatten([styles.iconContainer, styles.iconContainerLeftElement])}
                >
                  {leftElement}
                </Flex>
              )}

              {renderInput()}

              {hasRightIcon && (
                <Pressable
                  onPress={() => isPassword && setShowPassword && setShowPassword(!showPassword)}
                  accessible={isPassword}
                  accessibilityRole={isPassword ? 'button' : undefined}
                  accessibilityLabel={
                    isPassword
                      ? shouldShowPassword
                        ? 'Hide password'
                        : 'Show password'
                      : undefined
                  }
                  style={StyleSheet.flatten([
                    styles.iconContainer,
                    styles.iconContainerRight,
                    {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ])}
                >
                  {React.isValidElement(rightIcon)
                    ? React.cloneElement(rightIcon, {
                        size: config.iconSize,
                        color: disabled ? theme.colors.neutral500 : theme.colors.neutral800,
                      } as Partial<typeof rightIcon.props>)
                    : rightIcon}
                </Pressable>
              )}

              {hasRightElement && (
                <Flex
                  align="center"
                  justify="center"
                  css={StyleSheet.flatten([styles.iconContainer, styles.iconContainerRightElement])}
                >
                  {rightElement}
                </Flex>
              )}
            </Box>
            {children}
          </Box>
          {errorMessage && (
            <View accessibilityRole="alert" accessibilityLiveRegion="polite">
              <Text color={theme.colors.negative500} fontSize={12}>
                {errorMessage}
              </Text>
            </View>
          )}
        </Flex>
      );
    }

    return (
      <Flex gap={4} css={{ width: '100%' }}>
        <Box
          css={StyleSheet.flatten([
            styles.container,
            disabled && styles.containerDisabled,
            css,
            style,
          ])}
          {...containerSpacingProps}
        >
          <Box
            css={StyleSheet.flatten([
              styles.inputWrapper,
              inputWrapperStyles,
              disabled && styles.inputWrapperDisabled,
            ])}
          >
            {renderInput()}
          </Box>
          {children}
        </Box>
        {errorMessage && (
          <View accessibilityRole="alert" accessibilityLiveRegion="polite">
            <Text color={theme.colors.negative500} fontSize={12}>
              {errorMessage}
            </Text>
          </View>
        )}
      </Flex>
    );
  }
);

TextInput.displayName = 'TextInput';
