/* eslint-disable react-native/no-unused-styles */
import { StyleSheet } from 'react-native';
import { createTextStyle } from '../utils';
import type { TwigsTheme } from '../theme';

export const createTextInputStyles = (theme: TwigsTheme) =>
  StyleSheet.create({
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
