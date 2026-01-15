# Twigs React Native

In house React Native component library built for Surveysparrow.

[![npm version](https://img.shields.io/npm/v/@sparrowengg/twigs-react-native.svg)](https://www.npmjs.com/package/@sparrowengg/twigs-react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Installation

```bash
npm install @sparrowengg/twigs-react-native

# Install peer dependencies
npm install react-native-reanimated react-native-gesture-handler react-native-svg @gorhom/bottom-sheet
```

## Quick Setup

### 1. Configure Babel

Add to your `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be last
  ],
};
```

### 2. Wrap Your App

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>{/* Your app */}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
```

---

## Components

### Flex

A powerful flexbox container for building layouts.

```tsx
import { Flex } from '@sparrowengg/twigs-react-native';

<Flex direction="row" align="center" justify="space-between" gap={16} padding={20}>
  {/* Your content */}
</Flex>;
```

**Props:**

| Prop        | Type                                                                                                      | Default    |
| ----------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| `direction` | `'row'` \| `'column'` \| `'row-reverse'` \| `'column-reverse'`                                            | `'column'` |
| `align`     | `'flex-start'` \| `'flex-end'` \| `'center'` \| `'stretch'` \| `'baseline'`                               | -          |
| `justify`   | `'flex-start'` \| `'flex-end'` \| `'center'` \| `'space-between'` \| `'space-around'` \| `'space-evenly'` | -          |
| `wrap`      | `'nowrap'` \| `'wrap'` \| `'wrap-reverse'`                                                                | -          |
| `gap`       | `number`                                                                                                  | -          |
| `padding`   | `number`                                                                                                  | -          |
| `margin`    | `number`                                                                                                  | -          |

Plus all standard margin/padding props (`paddingHorizontal`, `marginTop`, etc.)

**Examples:**

```tsx
// Horizontal layout
<Flex direction="row" gap={12}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Flex>

// Centered content
<Flex align="center" justify="center" flex={1}>
  <Text>Centered</Text>
</Flex>

// Spaced items
<Flex direction="row" justify="space-between" padding={16}>
  <Text>Left</Text>
  <Text>Right</Text>
</Flex>
```

### Button

A versatile button with multiple variants, sizes, and loading states.

```tsx
import { Button } from '@sparrowengg/twigs-react-native';

<Button size="md" color="primary" variant="solid" onPress={() => {}}>
  Click Me
</Button>;
```

**Props:**

| Prop        | Type                                                                       | Default     |
| ----------- | -------------------------------------------------------------------------- | ----------- |
| `size`      | `'xxs'` \| `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'`       | `'sm'`      |
| `color`     | `'primary'` \| `'secondary'` \| `'default'` \| `'negative'` \| `'neutral'` | `'primary'` |
| `variant`   | `'solid'` \| `'ghost'` \| `'outline'`                                      | `'solid'`   |
| `disabled`  | `boolean`                                                                  | `false`     |
| `loading`   | `boolean`                                                                  | `false`     |
| `leftIcon`  | `ReactElement`                                                             | -           |
| `rightIcon` | `ReactElement`                                                             | -           |
| `icon`      | `ReactElement` (for icon-only button)                                      | -           |
| `onPress`   | `(event: any) => void`                                                     | -           |

**Examples:**

```tsx
// Basic buttons
<Button size="lg" color="primary">Primary Button</Button>
<Button size="md" color="secondary" variant="outline">Secondary</Button>
<Button size="sm" color="negative" variant="ghost">Delete</Button>

// With icons
<Button leftIcon={<Icon name="plus" />}>Create</Button>
<Button rightIcon={<Icon name="arrow-right" />}>Next</Button>

// Loading state
<Button loading={true}>Processing...</Button>

// Icon-only
<Button icon={<Icon name="search" />} variant="ghost" />

// Disabled
<Button disabled={true}>Disabled</Button>
```

### Other Components

**Layout:** `Box`, `Flex`  
**Typography:** `Text`  
**Forms:** `TextInput`, `Checkbox`, `Radio`, `Switch`  
**Media:** `Avatar`  
**Overlays:** `TwigsBottomSheet`, `TwigsBottomSheetModal`

```tsx
import {
  Box,
  Text,
  TextInput,
  Checkbox,
  Radio,
  Switch,
  Avatar,
} from '@sparrowengg/twigs-react-native';
```

---

## Theming

```tsx
import { theme } from '@sparrowengg/twigs-react-native/theme';

// Use theme colors
<Box css={{ backgroundColor: theme.colors.primary500 }}>
  <Text color={theme.colors.white900}>Themed Text</Text>
</Box>;
```

**Available theme tokens:**

- `theme.colors` - Primary, secondary, neutral, negative colors
- `theme.borderRadius` - xs, sm, md, lg, xl, 2xl, 3xl

---

## Requirements

- React Native >= 0.71.0
- React >= 18.0.0
- Node >= 18.20.1

---

## TypeScript

Fully typed with TypeScript for optimal developer experience.

```tsx
import type { ButtonProps, FlexProps } from '@sparrowengg/twigs-react-native';
```

---

## License

MIT © [SurveySparrow](https://surveysparrow.com)

---

## Links

- [GitHub Repository](https://github.com/surveysparrow/happytap)
- [Report Issues](https://github.com/surveysparrow/happytap/issues)

---

**Made with ❤️ by the SurveySparrow Team**
