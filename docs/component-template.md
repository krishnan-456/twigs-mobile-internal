<!-- 
  Component Documentation Template
  
  Copy this file to docs/components/<dir-name>.md when creating a new component.
  Fill in all <PLACEHOLDER> sections. Delete this comment block.
  
  Used by: .cursor/skills/create-component/SKILL.md (Phase 4, Agent D)
-->

# <ComponentName>

<One-sentence description of what this component does and when to use it.>

## Web Reference

- **Web source**: `packages/react-components/src/<web-dir-name>/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Fully replicated | Partially replicated | Mobile-only

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Component size variant |
| disabled | `boolean` | `false` | No | Whether the component is disabled |
| css | `StyleProp<ViewStyle>` | — | No | Style override (applied before `style`) |
| style | `StyleProp<ViewStyle>` | — | No | Style override (applied last) |
| accessibilityLabel | `string` | — | No | Custom accessibility label |
| accessibilityHint | `string` | — | No | Custom accessibility hint |
<!-- Add all component-specific props above this line -->

## Variants

### Size

- **sm** — <description of small variant, dimensions, font sizes>
- **md** — <description of medium variant> (default)
- **lg** — <description of large variant>

<!-- Add other variant axes (color, variant, etc.) as sub-sections -->

## Usage

```tsx
import { <ComponentName> } from 'testing-twigs';

function Example() {
  return (
    <ComponentName
      size="md"
      // add typical props
    />
  );
}
```

### With custom theme

```tsx
import { TwigsProvider, <ComponentName> } from 'testing-twigs';

function ThemedExample() {
  return (
    <TwigsProvider theme={{ colors: { primary500: '#1A73E8' } }}>
      <ComponentName />
    </TwigsProvider>
  );
}
```

## Accessibility

- **accessibilityRole**: `'<role>'`
- **accessibilityState**: `{ disabled, <other-states> }`
- **Screen reader behavior**: <describe what VoiceOver/TalkBack announces>
- **Additional notes**: <any special accessibility considerations>

## Mobile Deviations from Web

<!-- List intentional differences from the web component -->

| Web Behavior | Mobile Behavior | Reason |
|-------------|----------------|--------|
| `<web-feature>` | `<mobile-equivalent>` | `<why>` |

<!-- If no deviations, use this line instead: -->
<!-- This component is a 1:1 match with the web implementation. -->

## Dependencies

<!-- List any additional dependencies this component requires beyond the standard peer deps -->

None (uses only built-in React Native components and project utilities).

<!-- Or if dependencies exist:
- `<package-name>` — <what it's used for>
-->
