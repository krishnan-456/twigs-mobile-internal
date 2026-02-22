import React from 'react';
import type { Preview } from '@storybook/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TwigsProvider } from 'testing-twigs';

const preview: Preview = {
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TwigsProvider>
          <Story />
        </TwigsProvider>
      </GestureHandlerRootView>
    ),
  ],
  parameters: {},
};

export default preview;
