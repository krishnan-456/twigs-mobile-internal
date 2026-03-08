# Badge

Compact pill-shaped element for labels, tags, and status indicators.

## Web Reference

- **Web source**: N/A (mobile-only)
- **Web docs**: N/A
- **Status**: Mobile-only

There is no direct web counterpart. The web library has a `Chip` component which is functionally different (interactive, closable, selectable).

## Props

| Prop         | Type                                                                                                      | Default     | Required | Description                                             |
| ------------ | --------------------------------------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------------------- |
| size         | `'sm' \| 'md'`                                                                                            | `'sm'`      | No       | Size of the badge                                       |
| color        | `'default' \| 'white' \| 'primary' \| 'secondary' \| 'accent' \| 'positive' \| 'negative' \| 'attention'` | `'default'` | No       | Color variant                                           |
| rounded      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'`                                      | `'full'`    | No       | Border radius variant                                   |
| leftElement  | `React.ReactNode`                                                                                         | —           | No       | Element rendered before the label                       |
| rightElement | `React.ReactNode`                                                                                         | —           | No       | Element rendered after the label                        |
| children     | `React.ReactNode`                                                                                         | —           | Yes      | Badge content (label)                                   |
| css          | `ViewStyle`                                                                                               | —           | No       | Style override object                                   |
| style        | `ViewStyle`                                                                                               | —           | No       | Additional style                                        |

## Variants

### Size

- **sm** — 24dp height, 12px text (default)
- **md** — 32dp height, 14px text

### Color

- **default** — Neutral background
- **white** — White background with border
- **primary** — Brand tint
- **secondary** — Dark background, white text
- **accent** — Purple tint
- **positive** — Green tint
- **negative** — Red tint
- **attention** — Amber tint

### Rounded

Aligned with Avatar rounded tokens:

- **xs** — 4dp
- **sm** — 8dp
- **md** — 12dp
- **lg** — 16dp
- **xl** — 20dp
- **2xl** — 24dp
- **3xl** — 32dp
- **full** — Pill (9999dp) (default)

## Usage

```tsx
import { Badge } from '@anthropic/twigs-mobile';

// Basic usage
<Badge>Label</Badge>

// With color and size
<Badge color="primary" size="md">Primary</Badge>

// Squircle (small radius)
<Badge rounded="sm" color="accent">Accent</Badge>

// With icons
<Badge leftElement={<PlusIcon />} rightElement={<PlusIcon />}>
  Pill content
</Badge>
```

### With custom theme

```tsx
import { TwigsProvider, Badge } from '@anthropic/twigs-mobile';

function ThemedExample() {
  return (
    <TwigsProvider theme={{ colors: { primary500: '#1A73E8' } }}>
      <Badge color="primary">Primary Badge</Badge>
    </TwigsProvider>
  );
}
```

## Accessibility

- **accessibilityRole**: `'text'` (default)
- **accessible**: `true` (default)
- **Screen reader behavior**: Badge content is announced as static text
- **Additional notes**: Badge is a display component (non-interactive). All `BaseAccessibilityProps` are forwarded.

## Mobile Deviations from Web

| Web Behavior                                             | Mobile Behavior                          | Reason                                                |
| -------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| N/A — Chip component (interactive, closable, selectable) | Badge is display-only, pill-shaped label | Mobile-only component based on Figma BadgePill design |
| Web Chip color names                                     | Figma design spec color names            | Design system alignment                               |

## Dependencies

None (uses only built-in React Native components and project utilities).
