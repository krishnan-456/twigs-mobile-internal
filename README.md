# Twigs React Native

React Native component library for SurveySparrow.

## Installation

```bash
npm install testing-twigs
```

**Peer Dependencies:**

```bash
npm install @gorhom/bottom-sheet react-native-gesture-handler react-native-reanimated react-native-svg
```

## Quick Start

```tsx
import { TwigsProvider, Button, Text, Flex } from 'testing-twigs';

export default function App() {
  return (
    <TwigsProvider>
      <Flex padding={16}>
        <Text>Hello World</Text>
        <Button onPress={() => {}}>Click Me</Button>
      </Flex>
    </TwigsProvider>
  );
}
```

## Components

| Component | Description |
|---|---|
| `Button` | Pressable button with variants (solid, ghost, outline), sizes, loading state |
| `TextInput` | Text field with icons, elements, error states, password toggle |
| `Checkbox` | Animated checkbox with indeterminate state |
| `Radio` | Radio button with size variants |
| `Switch` | Animated toggle switch |
| `Separator` | Visual divider with horizontal and vertical orientations |
| `Alert` | Contextual feedback messages with status variants and optional close |
| `Avatar` | User avatar with image or initials fallback |
| `Box` | Basic layout container |
| `Flex` | Flexbox layout container |
| `Text` | Themed text component |
| `BottomSheet` | Gorhom bottom sheet wrapper with themed header |
| `BottomSheetModal` | Modal variant of bottom sheet |

## Bottom Sheet

Built on [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/).

```tsx
import { 
  BottomSheet, 
  BottomSheetView, 
  BottomSheetScrollView,
  BottomSheetTextInput 
} from 'testing-twigs';

// Basic usage
<BottomSheet ref={sheetRef} snapPoints={['50%']} title="Settings">
  <BottomSheetView style={{ padding: 16 }}>
    <Text>Content here</Text>
  </BottomSheetView>
</BottomSheet>

// Scrollable content
<BottomSheet ref={sheetRef} snapPoints={['50%', '90%']}>
  <BottomSheetScrollView>
    {/* Long content */}
  </BottomSheetScrollView>
</BottomSheet>

// With keyboard handling
<BottomSheet ref={sheetRef} snapPoints={['50%']}>
  <BottomSheetView>
    <BottomSheetTextInput placeholder="Type here..." />
  </BottomSheetView>
</BottomSheet>

// Control
sheetRef.current?.expand();
sheetRef.current?.close();
```

## Theming

```tsx
import { TwigsProvider, useTheme } from 'testing-twigs';

// Custom theme
<TwigsProvider theme={{ colors: { primary500: '#FF6B6B' } }}>
  {/* App */}
</TwigsProvider>

// Access theme
const theme = useTheme();
```

## Requirements

- React Native >= 0.71.0
- React >= 18.0.0

## License

MIT
