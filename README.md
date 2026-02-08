# Twigs React Native

React Native component library for SurveySparrow.

## Installation

```bash
yarn add testing-twigs
```

**Peer Dependencies:**

```bash
yarn add @gorhom/bottom-sheet react-native-gesture-handler react-native-reanimated react-native-svg
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
