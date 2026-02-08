---
name: Implement Jest Testing
overview: Install missing test dependencies, fix Jest configuration for React Native, and add component render tests covering rendering, accessibility attributes, and user interactions.
todos:
  - id: install-deps
    content: Install jest, ts-jest, @types/jest, @testing-library/react-native, @testing-library/jest-native, react-test-renderer
    status: completed
  - id: fix-config
    content: Fix jest.config.js (preset, setup file, transforms)
    status: completed
  - id: jest-setup
    content: Create jest.setup.ts with extended matchers
    status: completed
  - id: fix-mocks
    content: Update reanimated/svg mocks to work with render tests
    status: completed
  - id: test-button
    content: Add button.test.tsx (render, a11y, interactions)
    status: completed
  - id: test-switch
    content: Add switch.test.tsx
    status: completed
  - id: test-checkbox
    content: Add checkbox.test.tsx
    status: completed
  - id: test-radio
    content: Add radio.test.tsx
    status: completed
  - id: test-avatar
    content: Add avatar.test.tsx
    status: completed
  - id: test-textinput
    content: Add text-input.test.tsx
    status: completed
  - id: test-primitives
    content: Add text.test.tsx, box.test.tsx, flex.test.tsx
    status: completed
  - id: verify-run
    content: Run yarn test and ensure all tests pass
    status: completed
  - id: update-rules
    content: Update cursor rules with testing conventions
    status: completed
isProject: false
---

# Implement Jest Testing

## Current State

- [jest.config.js](jest.config.js) exists with `ts-jest` preset and `testEnvironment: 'node'`
- 3 unit test files already exist in `src/__tests__/`: `utils.test.ts`, `theme.test.ts`, `button-helpers.test.ts`
- 2 mocks exist: `react-native-reanimated.ts`, `react-native-svg.ts`
- Test scripts defined in [package.json](package.json): `"test": "jest"`, `"test:watch": "jest --watch"`
- **No test dependencies installed** (jest, ts-jest, @types/jest, @testing-library/react-native all missing from devDependencies)

## Step 1 -- Install Dependencies

```bash
yarn add -D jest ts-jest @types/jest @testing-library/react-native @testing-library/jest-native react-test-renderer @types/react-test-renderer --ignore-scripts
```

## Step 2 -- Fix Jest Configuration

Update [jest.config.js](jest.config.js):

- Keep `ts-jest` preset (avoids needing the full `@react-native/jest-preset` Metro setup)
- Add `setupFilesAfterSetup` pointing to a new `jest.setup.ts`
- Add `@testing-library/jest-native` extended matchers
- Fix `moduleNameMapper` to also mock `react-native` core (View, Text, Pressable, etc.) -- `ts-jest` in `node` env needs a manual RN mock
- Alternatively, switch to `preset: 'react-native'` if the react-native devDep already includes its jest preset (it should)

Best approach: use `preset: 'react-native'` (comes with react-native 0.76) + `ts-jest` as a transform override. This gives us proper RN mocking out of the box.

## Step 3 -- Create Jest Setup File

New file `jest.setup.ts`:

- Import `@testing-library/jest-native/extend-expect` for matchers like `toBeDisabled()`, `toHaveAccessibilityState()`, etc.

## Step 4 -- Update Mocks

The existing reanimated mock at [src/**tests**/**mocks**/react-native-reanimated.ts](src/__tests__/__mocks__/react-native-reanimated.ts) returns strings for `Animated.View` -- this breaks render tests. Update to return actual React elements or use `reanimated`'s official Jest mock.

## Step 5 -- Add Component Tests

One test file per component in `src/__tests__/`, focusing on three areas:

**a) Render tests** -- component mounts without crashing

**b) Accessibility tests** -- validates the a11y attributes we just added:

- Button: `accessibilityRole="button"`, `accessibilityState={{ disabled, busy }}`
- Switch: `accessibilityRole="switch"`, `accessibilityState={{ checked }}`, `accessibilityValue`
- Checkbox: `accessibilityRole="checkbox"`, `accessibilityState` with `mixed`
- Radio: `accessibilityRole="radio"`, `accessibilityState={{ checked }}`
- Avatar: `accessibilityRole="image"`, `accessibilityLabel`
- TextInput: `accessibilityLabel` from placeholder, `accessibilityState={{ disabled }}`

**c) Interaction tests** -- `fireEvent.press` triggers callbacks, disabled prevents calls

### Test files to create:

- `src/__tests__/button.test.tsx`
- `src/__tests__/switch.test.tsx`
- `src/__tests__/checkbox.test.tsx`
- `src/__tests__/radio.test.tsx`
- `src/__tests__/avatar.test.tsx`
- `src/__tests__/text-input.test.tsx`
- `src/__tests__/text.test.tsx`
- `src/__tests__/box.test.tsx`
- `src/__tests__/flex.test.tsx`

Each test file will follow this pattern:

```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../button';
import { TwigsProvider } from '../context';

const wrap = (ui: React.ReactElement) => render(<TwigsProvider>{ui}</TwigsProvider>);

describe('Button', () => {
  it('renders without crashing', () => { ... });
  it('has accessibilityRole="button"', () => { ... });
  it('reflects disabled in accessibilityState', () => { ... });
  it('calls onPress when tapped', () => { ... });
  it('does not call onPress when disabled', () => { ... });
});
```

## Step 6 -- Verify

Run `yarn test` and confirm all tests pass (existing unit tests + new component tests).

## Step 7 -- Update Cursor Rules

Add a minimal testing convention to [.cursor/rules/project-overview.mdc](.cursor/rules/project-overview.mdc) covering file placement and the `TwigsProvider` wrapper pattern.