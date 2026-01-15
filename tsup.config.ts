import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['packages/index.ts', 'packages/theme.ts'],
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      skipLibCheck: true,
      skipDefaultLibCheck: true,
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-native',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'react-native-svg',
    '@gorhom/bottom-sheet',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
