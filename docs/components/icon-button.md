# IconButton

A focused icon-only button that wraps Button internally, adding a `rounded` prop for border radius control. Supports size, color, variant, loading state, and full accessibility.

## Web Reference

- **Web source**: `twigs-react` — `src/button/icon-button.tsx` (wraps `<Button icon={...}>`)
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Web parity (wraps Button; adds `rounded` variant aligned with Avatar tokens)

## Props

| Prop               | Type                                                                 | Default     | Required | Description                                           |
| ------------------ | -------------------------------------------------------------------- | ----------- | -------- | ----------------------------------------------------- |
| icon               | `ReactElement`                                                       | —           | Yes      | Icon element rendered inside the button               |
| size               | `'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`             | `'md'`      | No       | Size preset                                           |
| color              | `'default' \| 'primary' \| 'secondary' \| 'bright' \| 'light' \| 'error'` | `'primary'` | No       | Color preset                                          |
| variant            | `'solid' \| 'ghost' \| 'outline'`                                    | `'solid'`   | No       | Visual variant                                        |
| rounded            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'` | `'full'`    | No       | Border radius of the button container                 |
| disabled           | `boolean`                                                            | `false`     | No       | Whether the button is disabled                        |
| loading            | `boolean`                                                            | `false`     | No       | Whether the button is in loading state                |
| loader             | `ReactElement \| 'line' \| 'circle'`                                 | `'line'`    | No       | Loader indicator during loading state                 |
| css                | `ViewStyle`                                                          | —           | No       | Additional container styles                           |
| style              | `ViewStyle`                                                          | —           | No       | Additional container styles (applied after css)       |

## Variants

### Size

- **xxs** — 16dp
- **xs** — 20dp
- **sm** — 24dp
- **md** — 32dp (default)
- **lg** — 40dp
- **xl** — 48dp
- **2xl** — 56dp

### Color

- **default** — Gray (neutral)
- **primary** — Teal (theme primary color, default)
- **secondary** — Dark
- **bright** — White on dark backgrounds
- **light** — White with transparency
- **error** — Red (negative state)

### Variant

- **solid** — Filled background (default)
- **ghost** — Transparent background
- **outline** — Border only

### Rounded

Aligned with Avatar rounded tokens:

- **xs** — 4dp
- **sm** — 8dp
- **md** — 12dp
- **lg** — 16dp
- **xl** — 20dp
- **2xl** — 24dp
- **3xl** — 32dp
- **full** — Circle (9999dp) (default)

## States

- **Default** — Base appearance per variant
- **Pressed** — Darker/highlighted background
- **Disabled** — 0.4 opacity
- **Loading** — Animated loader replaces icon

## Usage

```tsx
import { IconButton } from '@anthropic/twigs-mobile';
import { PlusIcon } from './icons';

function Example() {
  return (
    <IconButton
      icon={<PlusIcon size={20} />}
      onPress={() => {}}
    />
  );
}
```

### Circular button (full rounded)

```tsx
import { IconButton } from '@anthropic/twigs-mobile';
import { SettingsIcon } from './icons';

function CircularExample() {
  return (
    <IconButton
      icon={<SettingsIcon size={20} />}
      rounded="full"
      variant="ghost"
      onPress={() => {}}
    />
  );
}
```

### With loading state

```tsx
import { IconButton } from '@anthropic/twigs-mobile';
import { RefreshIcon } from './icons';

function LoadingExample() {
  const [loading, setLoading] = useState(false);

  return (
    <IconButton
      icon={<RefreshIcon size={20} />}
      loading={loading}
      loader="circle"
      onPress={() => setLoading(true)}
    />
  );
}
```

## Accessibility

- **accessibilityRole**: `'button'`
- **accessibilityState**: `{ disabled, busy: loading }`
- **accessibilityLabel**: Defaults to `'Icon button'`, can be overridden
- **accessible**: `true`
- **Screen reader behavior**: Announces the label (or custom label) as a button; when disabled, announces disabled state; when loading, announces busy state

## Mobile Deviations from Web

- **aria-label vs accessibilityLabel**: Web uses `aria-label`; mobile uses `accessibilityLabel` (React Native accessibility API).
- **Rounded implementation**: Web uses Stitches styled variant (`borderRadius: '$round'`); mobile uses `css` prop override with token-based radius values from `ROUNDED_RADII`.
- **Default accessibilityLabel**: Mobile defaults to `'Icon button'` when no label is provided; web has no equivalent default (relies on explicit `aria-label`).

## Dependencies

None (wraps existing Button component).
