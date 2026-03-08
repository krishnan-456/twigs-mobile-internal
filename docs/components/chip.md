# Chip

Compact interactive element for tags, filters, and selectable items. Mobile counterpart of `@sparrowengg/twigs-react` Chip.

## Web Reference

- **Web source**: `packages/react-components/src/chip/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Partially replicated (2 sizes vs 6 on web; mobile-optimized interactions)

## Props

| Prop                  | Type                                                                        | Default   | Required | Description                                    |
| --------------------- | --------------------------------------------------------------------------- | --------- | -------- | ---------------------------------------------- |
| size                  | `'sm' \| 'md'`                                                              | `'sm'`    | No       | Size of the chip                               |
| color                 | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'warning' \| 'success' \| 'accent'` | `'default'` | No    | Color variant                                  |
| variant               | `'solid' \| 'outline'`                                                      | `'solid'` | No       | Visual variant                                 |
| rounded               | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'`        | `'sm'`    | No       | Border radius variant                          |
| closable              | `boolean`                                                                   | `false`   | No       | Shows close/remove button                      |
| onClose               | `() => void`                                                                | —         | No       | Called when close button pressed               |
| leftElement           | `React.ReactNode`                                                           | —         | No       | Element before label                           |
| rightElement          | `React.ReactNode`                                                           | —         | No       | Element after label                            |
| active                | `boolean`                                                                   | —         | No       | Controlled active state                        |
| defaultActive         | `boolean`                                                                   | `false`   | No       | Uncontrolled initial active state              |
| onActiveStateChange   | `(active: boolean) => void`                                                 | —         | No       | Called on active toggle                        |
| selectable            | `boolean`                                                                   | `false`   | No       | Enables toggle behavior                        |
| disabled              | `boolean`                                                                   | `false`   | No       | Disables interactions                          |
| onPress               | `() => void`                                                                | —         | No       | Press handler                                  |
| children              | `React.ReactNode`                                                           | —         | No       | Chip label content                             |
| css                   | `ViewStyle`                                                                 | —         | No       | Style override (applied before style)          |
| style                 | `ViewStyle`                                                                 | —         | No       | Style override (applied last)                  |

## Variants

### Size

- **sm** — 24dp height, 12px font size, 16px line height (default)
- **md** — 32dp height, 14px font size, 20px line height

### Color

- **default** — Neutral background
- **primary** — Brand primary
- **secondary** — Secondary tint
- **error** — Error/negative
- **warning** — Warning/attention
- **success** — Success/positive
- **accent** — Accent tint

### Visual (variant)

- **solid** — Colored background
- **outline** — White background with colored border

### Rounded

Aligned with Avatar rounded tokens:

- **xs** — 4dp
- **sm** — 8dp (default)
- **md** — 12dp
- **lg** — 16dp
- **xl** — 20dp
- **2xl** — 24dp
- **3xl** — 32dp
- **full** — Pill (9999dp)

## Usage

```tsx
import { Chip } from '@anthropic/twigs-mobile';

// Basic
<Chip>Label</Chip>

// With icons and close
<Chip closable onClose={handleClose} leftElement={<PlusIcon />}>
  Tag
</Chip>

// Selectable
<Chip selectable active={isActive} onActiveStateChange={setIsActive} color="primary">
  Filter
</Chip>
```

### With custom theme

```tsx
import { TwigsProvider, Chip } from '@anthropic/twigs-mobile';

function ThemedExample() {
  return (
    <TwigsProvider theme={{ colors: { primary500: '#1A73E8' } }}>
      <Chip color="primary">Primary Chip</Chip>
    </TwigsProvider>
  );
}
```

## Accessibility

- **Non-interactive chip**: `accessibilityRole="text"`
- **Interactive chip** (selectable or onPress): `accessibilityRole="button"`, `accessibilityState={{ selected, disabled }}`
- **Close button**: `accessibilityRole="button"`, `accessibilityLabel="Remove"`
- **Screen reader behavior**: Content and state are announced; close/remove action is labeled

## Mobile Deviations from Web

| Web Behavior                          | Mobile Behavior                              | Reason                                      |
| ------------------------------------- | --------------------------------------------- | ------------------------------------------- |
| 6 sizes (2xs–xl)                      | 2 sizes (sm, md)                              | Optimized for mobile touch targets          |
| Filled circle-X close icon            | Stroke X close icon                           | Consistent with mobile Alert                |
| Click always binds interaction        | `selectable` prop must be set for toggling    | Explicit opt-in for interactive behavior    |
| No disabled prop                      | `disabled` prop added                         | Mobile form/flow requirements               |
| Hover state                           | Pressed state                                 | Mobile touch feedback                       |

## Dependencies

None (uses only built-in React Native components and project utilities).
