# AvatarGroup

Displays a row of overlapping avatars with optional overflow aggregation (`+N`).

## Web Reference

- **Web source**: `packages/react-components/src/avatar/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Partially replicated

## Props

| Prop                 | Type                                                                       | Default   | Required | Description                                                                   |
| -------------------- | -------------------------------------------------------------------------- | --------- | -------- | ----------------------------------------------------------------------------- |
| `children`           | `ReactElement<AvatarProps> \| ReactElement<AvatarProps>[]`                 | —         | Yes      | Avatar elements rendered in the group                                         |
| `limit`              | `number \| null`                                                           | `0`       | No       | Maximum visible avatars; extra avatars are collapsed into one overflow avatar |
| `limitExceededLabel` | `string`                                                                   | auto `+N` | No       | Custom overflow label text                                                    |
| `size`               | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl'` | `'sm'`    | No       | Group-level avatar size (child props can override)                            |
| `rounded`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'`         | `'full'`  | No       | Group-level avatar border radius (child props can override)                   |
| `css`                | `ViewStyle`                                                                | —         | No       | Style override applied before `style`                                         |
| `style`              | `ViewStyle`                                                                | —         | No       | Style override applied last                                                   |
| `accessibilityLabel` | `string`                                                                   | —         | No       | Custom screen reader label for the group                                      |
| `accessibilityHint`  | `string`                                                                   | —         | No       | Custom screen reader hint for the group                                       |

The component also forwards React Native `View` props (for example `testID`).

## Variants

### Size

- **xs / sm** — compact stack, `-12` overlap
- **md** — medium stack, `-16` overlap
- **lg** — large stack, `-20` overlap
- **xl / 2xl / 3xl / 4xl / 5xl** — extra overlap, `-24`

### Rounded

- Supports all avatar rounded variants: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`

## Usage

```tsx
import { Avatar, AvatarGroup } from 'testing-twigs';

function Example() {
  return (
    <AvatarGroup size="md" limit={4}>
      <Avatar name="Ava Smith" imageSrc="https://i.pravatar.cc/150?img=1" />
      <Avatar name="Noah Brown" imageSrc="https://i.pravatar.cc/150?img=2" />
      <Avatar name="Mia Davis" imageSrc="https://i.pravatar.cc/150?img=3" />
      <Avatar name="Liam Wilson" imageSrc="https://i.pravatar.cc/150?img=4" />
      <Avatar name="Emma Taylor" imageSrc="https://i.pravatar.cc/150?img=5" />
    </AvatarGroup>
  );
}
```

### Custom overflow label

```tsx
<AvatarGroup limit={3} limitExceededLabel="Team">
  <Avatar name="A" />
  <Avatar name="B" />
  <Avatar name="C" />
  <Avatar name="D" />
  <Avatar name="E" />
</AvatarGroup>
```

## Accessibility

- **accessibilityRole**: `'none'` by default (RN does not support web `group`)
- **accessibilityState**: forwarded from props when provided
- **Overflow avatar label**: announces `limitExceededLabel` or computed `+N`

## Mobile Deviations from Web

| Web Behavior                                                | Mobile Behavior                             | Reason                                                                 |
| ----------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| Uses `role="group"` on root container                       | Uses `accessibilityRole="none"` by default  | React Native accessibility roles do not include `group`                |
| Uses `src` on Avatar children                               | Uses existing mobile Avatar `imageSrc` prop | Keeps API consistent with current mobile Avatar                        |
| Includes web `fallbackDelay` passthrough (via Avatar props) | Not exposed on mobile AvatarGroup           | Mobile Avatar implementation does not currently support fallback delay |

## Dependencies

None (uses built-in React Native components and existing Twigs mobile primitives).
