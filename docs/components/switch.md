# Switch

Toggle switch control for binary on/off states.

## Web Reference

- **Web source**: `packages/react-components/src/switch/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Partially replicated

## Props

| Prop               | Type                         | Default | Required | Description                                                 |
| ------------------ | ---------------------------- | ------- | -------- | ----------------------------------------------------------- |
| value              | `boolean`                    | —       | No       | Legacy: current controlled state                            |
| onValueChange      | `(value: boolean) => void`   | —       | No       | Legacy: called on press with next boolean                   |
| checked            | `boolean`                    | —       | No       | Web parity: current controlled state                        |
| defaultChecked     | `boolean`                    | `false` | No       | Web parity: initial state when uncontrolled                 |
| onChange           | `(checked: boolean) => void` | —       | No       | Web parity: called on press with next boolean               |
| disabled           | `boolean`                    | `false` | No       | Disables interaction and applies disabled visual state      |
| size               | `'sm' \| 'md'`               | `'md'`  | No       | Track and thumb size variant                                |
| css                | `StyleProp<ViewStyle>`       | —       | No       | Style override (applied before `style`)                     |
| style              | `StyleProp<ViewStyle>`       | —       | No       | Style override (applied last)                               |
| accessibilityLabel | `string`                     | —       | No       | Custom accessibility label                                  |
| accessibilityHint  | `string`                     | —       | No       | Custom accessibility hint                                   |

## Variants

### Size

- **sm** — Track `28×14`, thumb `12×12` (compact)
- **md** — Track `40×20`, thumb `18×18` (default, for backward compatibility)

### State

- **Unchecked** — `neutral400` track
- **Checked** — `primary500` track
- **Disabled unchecked** — `neutral200` track
- **Disabled checked** — `primary100` track

## Usage

```tsx
import { useState } from 'react';
import { Switch } from 'testing-twigs';

function Example() {
  const [value, setValue] = useState(false);

  return <Switch value={value} onValueChange={setValue} />;
}
```

### Web parity API (checked / onChange)

```tsx
import { useState } from 'react';
import { Switch } from 'testing-twigs';

function Example() {
  const [checked, setChecked] = useState(false);

  return <Switch checked={checked} onChange={setChecked} />;
}
```

### Uncontrolled (defaultChecked)

```tsx
import { Switch } from 'testing-twigs';

function Example() {
  return <Switch defaultChecked onChange={(checked) => console.log(checked)} />;
}
```

### Size variants

```tsx
import { Switch } from 'testing-twigs';

function Example() {
  return (
    <>
      <Switch size="sm" value={false} onValueChange={() => {}} />
      <Switch size="md" value={true} onValueChange={() => {}} />
    </>
  );
}
```

## Accessibility

- **accessibilityRole**: `'switch'`
- **accessibilityState**: `{ checked, disabled }`
- **accessibilityValue**: `{ text: 'On' | 'Off' }` — announces current state
- **accessible**: `true` by default
- Pass `accessibilityLabel` and `accessibilityHint` for custom screen reader context

## What's Changed

- Added size support (`sm`, `md`); mobile default remains `md` for backward compatibility
- Added checked / defaultChecked / onChange API for web parity
- Preserved value / onValueChange API for legacy compatibility
- Updated disabled color semantics to token-based tracks (`primary100`, `neutral200`)
- Improved story and test coverage

## Mobile Deviations from Web

| Web Behavior                                   | Mobile Behavior                                           | Reason                                         |
| ---------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------- |
| Default size `'sm'`                            | Default size `'md'`                                       | Backward compatibility with existing consumers |
| `checked` / `onChange` / `defaultChecked` only | Also supports `value` / `onValueChange`                   | Legacy RN Switch API preservation              |
| `required` has native form semantics           | Not supported | React Native has no built-in form validation   |

## Dependencies

None (uses only built-in React Native components and project utilities).
