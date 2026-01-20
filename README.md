# Twigs React Native

In house React Native component library built for Surveysparrow.

[![npm version](https://img.shields.io/npm/v/@sparrowengg/twigs-react-native.svg)](https://www.npmjs.com/package/@sparrowengg/twigs-react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Components

### Bottom Sheet

Modal and persistent bottom sheets with backdrop and snap points.

```tsx
import { TwigsBottomSheetModal, TwigsBottomSheet } from '@sparrowengg/twigs-react-native';
import { useRef } from 'react';

function MyComponent() {
  const bottomSheetRef = useRef(null);

  return (
    <TwigsBottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['50%', '90%']}
      title="Sheet Title"
    >
      {/* Your content */}
    </TwigsBottomSheetModal>
  );
}
```

**Props:**

| Prop                    | Type                                      | Default   |
| ----------------------- | ----------------------------------------- | --------- |
| `title`                 | `string`                                  | -         |
| `snapPoints`            | `(string \| number)[]`                    | Required  |
| `index`                 | `number`                                  | -         |
| `enablePanDownToClose`  | `boolean`                                 | `true`    |
| `pressBehavior`         | `'none'` \| `'close'` \| `'collapse'`     | `'close'` |
| `style`                 | `ViewStyle`                               | -         |
| `handleStyle`           | `ViewStyle`                               | -         |
| `handleIndicatorStyle`  | `ViewStyle`                               | -         |
| `headerStyle`           | `ViewStyle`                               | -         |

**Usage:**

```tsx
// Open/Close programmatically
bottomSheetRef.current?.present();
bottomSheetRef.current?.dismiss();

// Persistent bottom sheet (non-modal)
<TwigsBottomSheet
  ref={sheetRef}
  snapPoints={['25%', '50%']}
  title="Persistent Sheet"
>
  <Text>Always visible</Text>
</TwigsBottomSheet>
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
| `icon`      | `ReactElement`                                                             | -           |
| `onPress`   | `(event: any) => void`                                                     | -           |

**Examples:**

```tsx
// Button variants
<Button size="lg" color="primary">Primary Button</Button>
<Button size="md" color="secondary" variant="outline">Secondary</Button>
<Button size="sm" color="negative" variant="ghost">Delete</Button>

// With icons
<Button leftIcon={<Icon name="plus" />}>Create</Button>
<Button rightIcon={<Icon name="arrow-right" />}>Next</Button>

// Icon button
<Button icon={<Icon name="search" />} variant="ghost" />
```

---

## Theming

### Using Default Theme

```tsx
import { theme } from '@sparrowengg/twigs-react-native';

<Box css={{ backgroundColor: theme.colors.primary500 }}>
  <Text color={theme.colors.white900}>Themed Text</Text>
</Box>;
```

### Custom Theme

Override default theme values using `TwigsProvider`:

```tsx
import { TwigsProvider } from '@sparrowengg/twigs-react-native';

const customTheme = {
  colors: {
    primary500: '#FF6B6B',
    primary600: '#EE5A52',
  },
  fonts: {
    regular: 'CustomFont-Regular',
    bold: 'CustomFont-Bold',
  },
};

export default function App() {
  return (
    <TwigsProvider theme={customTheme}>
      {/* Your app - all components will use custom theme */}
    </TwigsProvider>
  );
}
```

### Access Theme in Components

```tsx
import { useTheme } from '@sparrowengg/twigs-react-native';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.primary500 }}>
      <Text style={{ color: theme.colors.white900 }}>Custom Themed</Text>
    </View>
  );
}
```

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
