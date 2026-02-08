# Getting Started with Twigs Mobile

Twigs Mobile is a React Native component library for [SurveySparrow](https://surveysparrow.com), the mobile counterpart of [@sparrowengg/twigs-react](https://github.com/surveysparrow/twigs).

## Installation

```bash
yarn add testing-twigs
# or
npm install testing-twigs
```

### Peer Dependencies

Ensure these peer dependencies are installed in your React Native project:

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-svg @gorhom/bottom-sheet
```

## Setup

Wrap your app with `TwigsProvider` to enable theming:

```tsx
import { TwigsProvider } from 'testing-twigs';

export default function App() {
  return (
    <TwigsProvider>
      {/* Your app content */}
    </TwigsProvider>
  );
}
```

### Custom Theme

Pass a partial theme to override defaults:

```tsx
import { TwigsProvider } from 'testing-twigs';

const customTheme = {
  colors: {
    primary500: '#1A73E8',
    primary600: '#1565C0',
  },
  fonts: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
  },
};

export default function App() {
  return (
    <TwigsProvider theme={customTheme}>
      {/* Your app content */}
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
| `Avatar` | User avatar with image or initials fallback |
| `Box` | Basic layout container |
| `Flex` | Flexbox layout container |
| `Text` | Themed text component |
| `BottomSheet` | Gorhom bottom sheet wrapper with themed header |
| `BottomSheetModal` | Modal variant of bottom sheet |

## Usage Example

```tsx
import { Button, TextInput, Switch, Flex } from 'testing-twigs';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <Flex gap={16} css={{ padding: 24 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        size="lg"
      />
      <Switch value={remember} onValueChange={setRemember} />
      <Button color="primary" size="lg" onPress={handleLogin}>
        Sign In
      </Button>
    </Flex>
  );
}
```

## Theme Tokens

All dimension tokens use React Native dp (density-independent pixels), not CSS strings:

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

- **Button**: `accessibilityRole="button"`, `accessibilityState={{ disabled, busy }}`
- **Switch**: `accessibilityRole="switch"`, `accessibilityState={{ checked, disabled }}`
- **Checkbox**: `accessibilityRole="checkbox"`, `accessibilityState={{ checked, disabled }}`
- **Radio**: `accessibilityRole="radio"`, `accessibilityState={{ selected, disabled }}`
- **TextInput**: Error messages use `accessibilityRole="alert"` with `accessibilityLiveRegion="polite"`

Pass `accessibilityLabel` and `accessibilityHint` via props for custom labels.

## Utilities

```tsx
import { colorOpacity } from 'testing-twigs';

// Apply alpha to any hex color
colorOpacity('#00828D', 0.1);  // '#00828D1A'
colorOpacity('#64748B', 0.8);  // '#64748BCC'
```

## Web Library Reference

This library mirrors the web [twigs-react](https://github.com/surveysparrow/twigs) library. Prop names, variants, and color tokens are aligned where possible.
