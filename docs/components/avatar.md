# Avatar

User avatar that renders a profile image, initials fallback, or an anonymous placeholder.

## Web Reference

- **Web source**: `packages/react-components/src/avatar/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Partially replicated

## Props

| Prop                 | Type                                                                       | Default      | Required | Description                                            |
| -------------------- | -------------------------------------------------------------------------- | ------------ | -------- | ------------------------------------------------------ |
| `imageSrc`           | `string`                                                                   | —            | No       | Image URL for the avatar                               |
| `name`               | `string`                                                                   | `'?'`        | No       | Name used for initials and default accessibility label |
| `isAnonymous`        | `boolean`                                                                  | `false`      | No       | Renders anonymous state with dashed border and `?`     |
| `size`               | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl'` | —            | No       | Size preset for avatar dimensions                      |
| `rounded`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'`         | `'full'`     | No       | Border radius style                                    |
| `width`              | `number`                                                                   | `32`         | No       | Custom width (used when `size` is not provided)        |
| `height`             | `number`                                                                   | `32`         | No       | Custom height (used when `size` is not provided)       |
| `backgroundColor`    | `string`                                                                   | token-based  | No       | Custom fallback background color                       |
| `textColor`          | `string`                                                                   | token-based  | No       | Custom initials/anonymous text color                   |
| `textSize`           | `number`                                                                   | token-based  | No       | Custom fallback text size                              |
| `css`                | `ViewStyle`                                                                | —            | No       | Style override applied before `style`                  |
| `style`              | `ViewStyle`                                                                | —            | No       | Style override applied last                            |
| `accessibilityLabel` | `string`                                                                   | auto-derived | No       | Custom screen reader label                             |
| `accessibilityHint`  | `string`                                                                   | —            | No       | Custom screen reader hint                              |

The component also forwards React Native `View` props (for example `testID`).

## Variants

### Size

- **xs** — `20x20`
- **sm** — `24x24`
- **md** — `32x32`
- **lg** — `40x40`
- **xl** — `48x48`
- **2xl** — `56x56`
- **3xl** — `64x64`
- **4xl** — `72x72`
- **5xl** — `120x120`

### Visual state

- **Image** — renders when `imageSrc` is available and load succeeds
- **Initials fallback** — renders initials from `name`
- **Anonymous** — renders dashed border with `?` when `isAnonymous` is true

## Usage

```tsx
import { Avatar } from 'testing-twigs';

function Example() {
  return <Avatar imageSrc="https://example.com/user.jpg" name="Jane Doe" size="lg" />;
}
```

### Anonymous state

```tsx
<Avatar isAnonymous size="xl" />
```

## Accessibility

- **accessibilityRole**: `'image'`
- **Default accessibilityLabel**:
  - `name` when provided and not `'?'`
  - `'Anonymous avatar'` when `isAnonymous` is true
- **Accessible by default**: `accessible={true}`

## What's Changed

- Simplified image API to use `imageSrc` only
- Added `isAnonymous` visual state (dashed border + `?`)
- Refactored Avatar to `React.forwardRef`, Box-based container, and improved accessibility prop forwarding
- Expanded story and test coverage for new and legacy behavior

## Mobile Deviations from Web

| Web Behavior                        | Mobile Behavior                                        | Reason                                   |
| ----------------------------------- | ------------------------------------------------------ | ---------------------------------------- |
| Uses Radix Avatar primitives        | Uses Twigs `Box` + React Native `Image` + Twigs `Text` | Radix primitives are web-only            |
| Uses `src` only                     | Uses `imageSrc`                                        | Aligns with existing mobile API          |
| Fallback lifecycle managed by Radix | Fallback lifecycle handled via image error state       | Platform-specific implementation details |

## Dependencies

None (uses built-in React Native components and existing project utilities).
