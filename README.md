# Twigs Mobile

React Native component library for [SurveySparrow](https://surveysparrow.com), the mobile counterpart of [@sparrowengg/twigs-react](https://github.com/surveysparrow/twigs).

## Installation

```bash
npm install testing-twigs
```

### Peer Dependencies

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-svg react-native-safe-area-context react-native-screens @gorhom/bottom-sheet
```

## Quick Start

Wrap your app with `TwigsProvider` to enable theming:

```tsx
import { TwigsProvider, Button, TextInput, Flex } from 'testing-twigs';

export default function App() {
  return (
    <TwigsProvider>
      <Flex gap={16} css={{ padding: 24 }}>
        <TextInput placeholder="Email" size="lg" />
        <Button color="primary" size="lg" onPress={() => {}}>
          Sign In
        </Button>
      </Flex>
    </TwigsProvider>
  );
}
```

## Components

### Form Controls

| Component | Description |
|---|---|
| `Button` | Pressable button with variants (solid, ghost, outline), sizes, loading state |
| `IconButton` | Icon-only button with rounded variant, sizes, and loading state |
| `LinkButton` | Text-only pressable with link styling |
| `TextInput` | Text field with icons, elements, error states, password toggle |
| `Checkbox` | Animated checkbox with indeterminate state |
| `Radio` | Radio button with size variants |
| `SegmentedButton` | Single-select toggle button group |
| `Switch` | Toggle switch for binary on/off with size variants |

### Layout

| Component | Description |
|---|---|
| `Box` | Basic layout container |
| `Flex` | Flexbox layout container |
| `Separator` | Visual divider with horizontal and vertical orientations |

### Data Display

| Component | Description |
|---|---|
| `Text` | Themed text component |
| `Avatar` | User avatar with image or initials fallback |
| `AvatarGroup` | Overlapping avatar stack with optional overflow indicator |
| `Badge` | Compact pill-shaped element for labels, tags, and status indicators |
| `Chip` | Compact interactive element for tags, filters, and selectable items |

### Feedback

| Component | Description |
|---|---|
| `Alert` | Contextual feedback messages with status variants and optional close |
| `Toast` | Imperative toast notifications with variant-based styling and action support |
| `LineLoader` | Animated horizontal bar loader |
| `CircleLoader` | Animated circular spinner |

### Overlay

| Component | Description |
|---|---|
| `Modal` | Composable modal dialog with sub-components (title, description, body, footer) |
| `Tooltip` | Floating content bubble anchored to a trigger element |
| `BottomSheet` | Gorhom bottom sheet wrapper with themed header |
| `BottomSheetModal` | Modal variant of bottom sheet |

## Toast

The toast system uses an imperative API that works inside and outside React components:

```tsx
import { TwigsProvider, ToastProvider, toast } from 'testing-twigs';

function App() {
  return (
    <TwigsProvider>
      <ToastProvider>
        {/* Your app */}
      </ToastProvider>
    </TwigsProvider>
  );
}

// Anywhere in your code
toast({ title: 'Saved!', variant: 'success' });
toast.success('Changes saved');
toast.error('Something went wrong');
toast.warning('Check your input');
toast.loading('Processing...');
toast.dismiss();
```

## Bottom Sheet

Built on [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/):

```tsx
import {
  BottomSheet,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from 'testing-twigs';

<BottomSheet ref={sheetRef} snapPoints={['50%']} title="Settings">
  <BottomSheetView style={{ padding: 16 }}>
    <Text>Content here</Text>
  </BottomSheetView>
</BottomSheet>

sheetRef.current?.expand();
sheetRef.current?.close();
```

## Theming

Pass a partial theme to override defaults:

```tsx
import { TwigsProvider, useTheme } from 'testing-twigs';

<TwigsProvider
  theme={{
    colors: { primary500: '#1A73E8', primary600: '#1565C0' },
    fonts: { regular: 'Inter-Regular', medium: 'Inter-Medium', bold: 'Inter-Bold' },
  }}
>
  {/* App */}
</TwigsProvider>

// Access theme in any component
const theme = useTheme();
theme.colors.primary500; // '#1A73E8'
```

### Theme Tokens

| Token | Type | Example |
|---|---|---|
| `colors` | `string` (hex) | `'#00828D'` |
| `space` | `number` (dp) | `8` |
| `fontSizes` | `number` (dp) | `14` |
| `lineHeights` | `number` (dp) | `20` |
| `radii` | `number` (dp) | `8` |
| `borderWidths` | `number` (dp) | `1` |
| `transitions` | `number` (ms) | `200` |
| `fontWeights` | `string` | `'400'` |
| `fonts` | `string` | `'System'` |

## Accessibility

All interactive components include baseline accessibility attributes:

- **Button / IconButton / LinkButton**: `accessibilityRole="button"`, `accessibilityState={{ disabled, busy }}`
- **Switch**: `accessibilityRole="switch"`, `accessibilityState={{ checked, disabled }}`
- **Checkbox**: `accessibilityRole="checkbox"`, `accessibilityState={{ checked, disabled }}`
- **Radio**: `accessibilityRole="radio"`, `accessibilityState={{ checked, disabled }}`
- **TextInput**: Error messages use `accessibilityRole="alert"` with `accessibilityLiveRegion="polite"`
- **Toast**: `accessibilityRole="alert"` with `accessibilityLiveRegion="polite"`
- **Avatar**: `accessibilityRole="image"` with auto-derived label from name

Pass `accessibilityLabel` and `accessibilityHint` via props for custom screen reader context.

## Utilities

```tsx
import { colorOpacity } from 'testing-twigs';

colorOpacity('#00828D', 0.1); // '#00828D1A'
colorOpacity('#64748B', 0.8); // '#64748BCC'
```

## Requirements

- React Native >= 0.71.0
- React >= 18.0.0

## Web Library Reference

This library mirrors the web [twigs-react](https://github.com/surveysparrow/twigs) library. Prop names, variants, and color tokens are aligned where possible.

## License

MIT
