# Radio

A selectable radio control for single-choice options, with optional label content.

## Web Reference

- **Web source**: `packages/react-components/src/radio/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Partially replicated

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| selected | `boolean` | `false` | No | Whether the radio is selected |
| onSelect | `(selected: boolean) => void` | — | No | Called on press with next selected state |
| disabled | `boolean` | `false` | No | Disables interaction and applies disabled visual state |
| size | `'sm' \| 'md'` | `'sm'` | No | Radio size variant |
| children | `ReactNode` | — | No | Optional label content shown to the right |
| containerRef | `RefObject<View>` | — | No | Ref attached to root pressable |
| labelStyle | `ViewStyle` | — | No | Style overrides for label wrapper |
| radioStyle | `ViewStyle` | — | No | Style overrides for outer radio circle |
| css | `StyleProp<ViewStyle>` | — | No | Style override (applied before `style`) |
| style | `StyleProp<ViewStyle>` | — | No | Style override (applied last) |

## Variants

### Size

- **sm** — Outer `16x16`, inner `8x8`
- **md** — Outer `20x20`, inner `12x12`

## Usage

```tsx
import { useState } from 'react';
import { Radio, Text } from 'testing-twigs';

function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Radio selected={selected} onSelect={setSelected}>
      <Text>Email updates</Text>
    </Radio>
  );
}
```

## Accessibility

- **accessibilityRole**: `'radio'`
- **accessibilityState**: `{ checked: selected, disabled }`
- **Label behavior**: Derives `accessibilityLabel` from string children
- **Hint**: Defaults to `"Double tap to select"` (can be overridden)

## What's Changed

- Updated visual sizing to match Figma control matrix (`sm: 16`, `md: 20`)
- Synced unchecked border token to web parity (`neutral700`)
- Kept checked border/dot on `secondary500` for web behavior parity
- Simplified disabled visuals to a single container opacity treatment
- Added explicit Storybook matrix coverage for all Figma states
- Added regression tests for size, color, and disabled visuals

## Mobile Deviations from Web

| Web Behavior | Mobile Behavior | Reason |
|-------------|----------------|--------|
| Uses `RadioGroup` + `value` semantics from Radix | Uses standalone `Radio` with `selected` + `onSelect` | Keeps API consistent with existing twigs-mobile checkable controls |
| Hover/focus-visible visual states | No hover state, touch-first interaction | Mobile platform interaction model |

## Dependencies

None (uses only built-in React Native components and project utilities).
