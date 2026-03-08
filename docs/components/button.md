# Button

A pressable button with size, color, and variant presets, supporting icons and loading states.

## Web Reference

- **Web source**: `packages/react-components/src/button/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Partially replicated

## Props

| Prop               | Type                                                                      | Default            | Required | Description                                       |
| ------------------ | ------------------------------------------------------------------------- | ------------------ | -------- | ------------------------------------------------- |
| children           | `ReactNode`                                                               | —                  | No       | Label/content rendered inside the button          |
| size               | `'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                  | `'sm'`             | No       | Size preset                                       |
| color              | `'default' \| 'primary' \| 'secondary' \| 'bright' \| 'light' \| 'error'` | `'primary'`        | No       | Semantic color preset                             |
| variant            | `'solid' \| 'ghost' \| 'outline'`                                         | `'solid'`          | No       | Visual variant                                    |
| disabled           | `boolean`                                                                 | `false`            | No       | Disables interaction and applies disabled visuals |
| loading            | `boolean`                                                                 | `false`            | No       | Shows loader and blocks interaction               |
| leftIcon           | `ReactElement`                                                            | —                  | No       | Icon shown before label                           |
| rightIcon          | `ReactElement`                                                            | —                  | No       | Icon shown after label                            |
| icon               | `ReactElement`                                                            | —                  | No       | Icon-only button content                          |
| loader             | `ReactElement \| 'line' \| 'circle'`                                      | `'line'`           | No       | Loader shown while `loading` is true              |
| onPress            | `PressableProps['onPress']`                                               | —                  | No       | Press callback                                    |
| textStyle          | `TextStyle`                                                               | —                  | No       | Label text style override                         |
| accessibilityLabel | `string`                                                                  | auto for icon-only | No       | Accessibility label for screen readers            |
| accessibilityHint  | `string`                                                                  | —                  | No       | Additional accessibility hint                     |
| css                | `StyleProp<ViewStyle>`                                                    | —                  | No       | Style override (applied before `style`)           |
| style              | `StyleProp<ViewStyle>`                                                    | —                  | No       | Style override (applied last)                     |

## Variants

### Size

- **xxs**, **xs**, **sm**, **md**, **lg**, **xl**, **2xl**
- Includes icon and loader size mapping per button size.

### Color

- **default**, **primary**, **secondary**, **bright**, **light**, **error**

### Variant

- **solid** — Filled surface
- **ghost** — Transparent surface
- **outline** — Border-only surface

## Usage

```tsx
import { Button } from 'testing-twigs';

function Example() {
  return (
    <Button color="primary" size="md" onPress={() => {}}>
      Save changes
    </Button>
  );
}
```

### Loading + Icon

```tsx
<Button variant="outline" color="secondary" loading loader="circle" leftIcon={<SomeIcon />}>
  Updating
</Button>
```

## Accessibility

- **accessibilityRole**: `'button'`
- **accessibilityState**: `{ disabled, busy: loading }`
- **Icon-only fallback label**: defaults to `"Button"` when no explicit `accessibilityLabel` is provided

## What's Changed

- Standardized pressed shade overlays to use `colorOpacity()` for overlay-style shades.
- Added Storybook coverage for all color presets and disabled-state combinations.
- Added regression tests for shade mappings that now rely on `colorOpacity()`.

## Mobile Deviations from Web

| Web Behavior                                                      | Mobile Behavior                        | Reason                                                              |
| ----------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------- |
| Default color variant is `default`                                | Default color remains `primary`        | Backward compatibility with existing twigs-mobile usage             |
| Hover/focus/active states are separate                            | Touch uses pressed-state approximation | Mobile interaction model has no hover and different focus treatment |
| CSS transitions and `CSSTransition`-driven side element animation | Reanimated + RN render flow            | Platform and rendering model differences                            |

## Dependencies

- Uses internal Twigs primitives (`Flex`, loaders) and `react-native-reanimated`.
