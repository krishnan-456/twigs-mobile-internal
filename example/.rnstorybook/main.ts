import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-ondevice-controls'],
};

export default main;
