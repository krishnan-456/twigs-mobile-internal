# Checkbox

An interactive checkbox control with unchecked, checked, and indeterminate states.

## Web Reference

- **Web source**: `packages/react-components/src/checkbox/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Partially replicated

## Props

| Prop          | Type                         | Default | Required | Description                                            |
| ------------- | ---------------------------- | ------- | -------- | ------------------------------------------------------ |
| checked       | `boolean \| 'indeterminate'` | `false` | No       | Current checkbox state                                 |
| onChange      | `(checked: boolean) => void` | —       | No       | Called on press with the next boolean state            |
| disabled      | `boolean`                    | `false` | No       | Disables interaction and applies disabled visual state |
| children      | `ReactNode`                  | —       | No       | Optional label content rendered to the right           |
| size          | `'sm' \| 'md'`               | `'sm'`  | No       | Checkbox size variant                                  |
| id            | `string`                     | —       | No       | Identifier for the checkbox                            |
| containerRef  | `RefObject<View>`            | —       | No       | Ref attached to root pressable                         |
| labelStyle    | `StyleProp<ViewStyle>`       | —       | No       | Style override for label wrapper                       |
| checkboxStyle | `StyleProp<ViewStyle>`       | —       | No       | Style override for checkbox box                        |
| css           | `StyleProp<ViewStyle>`       | —       | No       | Style override (applied before `style`)                |
| style         | `StyleProp<ViewStyle>`       | —       | No       | Style override (applied last)                          |

## Variants

### Size

- **sm** — Checkbox box `16x16`
- **md** — Checkbox box `20x20`

### State

- **unchecked** — White surface with neutral border
- **checked** — Filled support surface with tick icon
- **indeterminate** — Filled support surface with horizontal line icon

## Usage

```tsx
import { useState } from 'react';
import { Checkbox, Text } from 'testing-twigs';

function Example() {
  const [value, setValue] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <Checkbox checked={value} onChange={(next) => setValue(next)}>
      <Text>Accept terms and conditions</Text>
    </Checkbox>
  );
}
```

## Accessibility

- **accessibilityRole**: `'checkbox'`
- **accessibilityState**: `{ checked, disabled }`, with `'indeterminate'` mapped to `checked: 'mixed'`
- **Label behavior**: Derives `accessibilityLabel` from string children when no explicit label is provided
- **Hint**: Defaults to `"Double tap to toggle"` (can be overridden)

## What's Changed

- Added extracted size constants for `sm` and `md` to match the Figma state matrix
- Moved visual primitives to theme-backed styles (`radii`, `space`, `borderWidths`)
- Preserved animated check/indeterminate icon transitions with reanimated
- Added Storybook matrix coverage for all size/state/disabled combinations
- Added regression tests for size and state token mapping

## Mobile Deviations from Web

| Web Behavior                                             | Mobile Behavior                                         | Reason                                                      |
| -------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| `onChange` callback accepts `boolean \| 'indeterminate'` | `onChange` callback emits boolean next state only       | Backward compatibility with existing twigs-mobile consumers |
| Hover and focus-visible ring states                      | Touch-only interaction with no hover/focus ring visuals | Mobile interaction model differs from web                   |

## Dependencies

None (uses only built-in React Native components and project utilities).
