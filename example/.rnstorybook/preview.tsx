import React from 'react';
import { View } from 'react-native';
import type { Preview } from '@storybook/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TwigsProvider } from 'testing-twigs';

const preview: Preview = {
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <TwigsProvider>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              width: '100%',
              maxWidth: 600,
              padding: 16,
            }}
          >
            <Story />
          </View>
        </TwigsProvider>
      </GestureHandlerRootView>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
