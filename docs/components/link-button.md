# LinkButton

A text-only pressable element styled as a hyperlink with underline decoration. Supports size, color, and variant options with pressed/disabled states.

## Web Reference

- **Web source**: N/A (mobile-only)
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Mobile-only

## Props

| Prop      | Type                     | Default     | Required | Description                                       |
| --------- | ------------------------ | ----------- | -------- | ------------------------------------------------- |
| children  | `ReactNode`              | —           | Yes      | Text content rendered inside the link button      |
| size      | `'sm' \| 'md'`           | `'md'`      | No       | Size preset controlling font size and line height |
| color     | `'primary' \| 'default'` | `'primary'` | No       | Color preset                                      |
| variant   | `'medium' \| 'bold'`     | `'medium'`  | No       | Visual variant controlling font weight            |
| disabled  | `boolean`                | `false`     | No       | Whether the link button is disabled               |
| onPress   | `PressableProps['onPress']` | —           | No       | Press handler (inherited from PressableProps)     |
| textStyle | `TextStyle`              | —           | No       | Override styles for the link text                 |
| css       | `ViewStyle`              | —           | No       | Additional container styles                       |
| style     | `ViewStyle`              | —           | No       | Additional container styles (applied after css)   |

## Variants

### Size

- **sm** — 14px font size, 20px line height
- **md** — 16px font size, 24px line height (default)

### Color

- **primary** — Teal (theme primary color)
- **default** — Gray (neutral text color)

### Variant

- **medium** — Font weight 500 (default)
- **bold** — Font weight 700

## States

- **Default** — Transparent background, underlined text
- **Pressed** — 15% opacity background fill
- **Disabled** — 0.5 opacity

## Usage

```tsx
import { LinkButton } from '@anthropic/twigs-mobile';

function Example() {
  return (
    <LinkButton size="md" color="primary" onPress={() => {}}>
      Learn more
    </LinkButton>
  );
}
```

### With custom theme

```tsx
import { TwigsProvider, LinkButton } from '@anthropic/twigs-mobile';

function ThemedExample() {
  return (
    <TwigsProvider theme={{ colors: { primary500: '#1A73E8' } }}>
      <LinkButton>Custom primary link</LinkButton>
    </TwigsProvider>
  );
}
```

## Accessibility

- **accessibilityRole**: `'button'`
- **accessibilityState**: `{ disabled }`
- **accessibilityLabel**: Auto-derived from string children when available
- **Screen reader behavior**: Announces the link text (or custom label) as a button; when disabled, announces disabled state

## Mobile Deviations from Web

This component is mobile-only and does not exist in twigs-web. It was designed from Figma specifications.

## Dependencies

None (uses only built-in React Native components and project utilities).
