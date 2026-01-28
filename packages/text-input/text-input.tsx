import React, { forwardRef, useRef, useState } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { createTextStyle } from '../utils';
import { useTheme } from '../context';
import type { TwigsTheme } from '../theme';
import { Box } from '../box';
import { Flex } from '../flex';
import { Text } from '../text';
import type { TextInputProps, TextInputSize, TextInputVariant } from './types';

interface SizeConfig {
  height: number;
  borderRadius: number;
  fontSize: number;
  paddingHorizontal: number;
  leftIconPadding: number;
  rightIconPadding: number;
  iconSize: number;
}

const createStyles = (theme: TwigsTheme) => {
  return StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
    },
    containerDisabled: {
      opacity: 0.6,
    },
    inputWrapper: {
      position: 'relative',
      width: '100%',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    inputWrapperDisabled: {
      backgroundColor: theme.colors.neutral50,
      opacity: 0.6,
    },
    textInput: {
      flex: 1,
      margin: 0,
      padding: 0,
      color: theme.colors.neutral900,
      ...createTextStyle(theme.fonts.regular, '400'),
      borderWidth: 0,
      backgroundColor: 'transparent',
      textAlignVertical: 'center',
    },
    iconContainer: {
      position: 'absolute',
      height: '100%',
      zIndex: 1,
    },
    iconContainerLeft: {
      left: 12,
    },
    iconContainerLeftElement: {
      left: 0,
    },
    iconContainerRight: {
      right: 12,
    },
    iconContainerRightElement: {
      right: 0,
    },
  });
};

const getSizeConfig = (size: TextInputSize): SizeConfig => {
  const configs: Record<TextInputSize, SizeConfig> = {
    sm: {
      height: 32,
      borderRadius: 6,
      fontSize: 12,
      paddingHorizontal: 8,
      leftIconPadding: 40,
      rightIconPadding: 40,
      iconSize: 20,
    },
    md: {
      height: 40,
      borderRadius: 8,
      fontSize: 14,
      paddingHorizontal: 10,
      leftIconPadding: 40,
      rightIconPadding: 40,
      iconSize: 20,
    },
    lg: {
      height: 44,
      borderRadius: 12,
      fontSize: 16,
      paddingHorizontal: 12,
      leftIconPadding: 40,
      rightIconPadding: 40,
      iconSize: 20,
    },
    xl: {
      height: 48,
      borderRadius: 8,
      fontSize: 16,
      paddingHorizontal: 14,
      leftIconPadding: 42,
      rightIconPadding: 42,
      iconSize: 22,
    },
    '2xl': {
      height: 56,
      borderRadius: 12,
      fontSize: 16,
      paddingHorizontal: 16,
      leftIconPadding: 42,
      rightIconPadding: 42,
      iconSize: 24,
    },
  };
  return configs[size];
};

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
      // Margin props
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      // Padding props
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      // RN TextInput props
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
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = createStyles(theme);
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
      inputWrapperStyles.borderTopColor = isFocused ? theme.colors.neutral500 : theme.colors.black300;
      inputWrapperStyles.borderRightColor = isFocused ? theme.colors.neutral500 : theme.colors.black300;
      inputWrapperStyles.borderLeftColor = isFocused ? theme.colors.neutral500 : theme.colors.black300;
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
      />
    );

    // Extract margin/padding props for container
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
            <Text color={theme.colors.negative500} fontSize={12}>
              {errorMessage}
            </Text>
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
          <Text color={theme.colors.negative500} fontSize={12}>
            {errorMessage}
          </Text>
        )}
      </Flex>
    );
  }
);

TextInput.displayName = 'TextInput';
