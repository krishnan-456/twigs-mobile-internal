import React from 'react';
import { render } from '@testing-library/react-native';
import { TwigsProvider } from '../context';

/**
 * Wraps the given UI element in TwigsProvider for testing components
 * that depend on the theme context.
 */
export const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);
