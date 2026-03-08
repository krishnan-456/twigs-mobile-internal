/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'react-native',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          module: 'commonjs',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          moduleResolution: 'node',
          isolatedModules: true,
        },
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-svg|react-native-screens|react-native-safe-area-context|react-native-gesture-handler|@gorhom|@testing-library|@floating-ui)/)',
  ],
  moduleNameMapper: {
    'react-native-reanimated': '<rootDir>/src/__tests__/__mocks__/react-native-reanimated.ts',
    'react-native-svg': '<rootDir>/src/__tests__/__mocks__/react-native-svg.ts',
    'react-native-screens': '<rootDir>/src/__tests__/__mocks__/react-native-screens.ts',
    'react-native-safe-area-context': '<rootDir>/src/__tests__/__mocks__/react-native-safe-area-context.ts',
    'react-native-gesture-handler': '<rootDir>/src/__tests__/__mocks__/react-native-gesture-handler.tsx',
  },
};
