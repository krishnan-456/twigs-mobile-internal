# SegmentedButton

A horizontal group of toggle buttons where exactly one option is selected at a time, similar to a radio group with a button-like visual.

## Web Reference

- **Web source**: N/A
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Mobile-only (no equivalent in @sparrowengg/twigs-react; inspired by Figma design)

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| options | `SegmentedButtonOption[]` | — | Yes | Array of options to display |
| value | `string` | — | No | Currently selected value (controlled) |
| defaultValue | `string` | — | No | Default selected value (uncontrolled) |
| onChange | `(value: string) => void` | — | No | Called when selection changes |
| rounded | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'` | `'full'` | No | Border radius variant |
| disabled | `boolean` | `false` | No | Disables the entire component |
| fullWidth | `boolean` | `true` | No | Stretches to fill parent width |
| css | `ViewStyle` | — | No | Style override (applied before `style`) |
| style | `ViewStyle` | — | No | Style override (applied last) |

### SegmentedButtonOption

| Prop | Type | Description |
|------|------|-------------|
| value | `string` | Unique value for the option |
| label | `string` | Display text |
| disabled | `boolean` | Disables individual option |

## Variants

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

### Controlled

```tsx
import { SegmentedButton } from 'testing-twigs';

function Example() {
  const [value, setValue] = useState('option1');
  return (
    <SegmentedButton
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}
```

### Medium rounded

```tsx
<SegmentedButton
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  value={value}
  onChange={setValue}
  rounded="md"
/>
```

### Three options

```tsx
<SegmentedButton
  options={[
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ]}
  value={value}
  onChange={setValue}
/>
```

### With custom theme

```tsx
import { TwigsProvider, SegmentedButton } from 'testing-twigs';

function ThemedExample() {
  const [value, setValue] = useState('option1');
  return (
    <TwigsProvider theme={{ colors: { primary500: '#1A73E8' } }}>
      <SegmentedButton
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
        value={value}
        onChange={setValue}
      />
    </TwigsProvider>
  );
}
```

## Accessibility

- **Container**: `accessibilityRole="radiogroup"`
- **Each segment**: `accessibilityRole="radio"`, `accessibilityState={{ checked, disabled }}`
- **accessibilityLabel**: Segments use their label text
- **accessibilityHint**: `"Double tap to select"`

## Mobile Deviations from Web

| Web Behavior | Mobile Behavior | Reason |
|-------------|-----------------|--------|
| No equivalent | SegmentedButton component | Mobile-first component inspired by Figma design |
| N/A | Uses `radiogroup`/`radio` semantics | Selection control, not tablist/tab content switcher |

## Dependencies

None (uses only built-in React Native components and project utilities).
