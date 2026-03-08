# Tooltip

Renders a floating content bubble anchored to a trigger element, providing contextual information on press.

## Web Reference

- **Web source**: `packages/react-components/src/tooltip/`
- **Web docs**: https://twigs.surveysparrow.com/docs/components/tooltip
- **Status**: Partially replicated (mobile uses press-based trigger instead of hover/focus)

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| content | `ReactNode` | — | Yes | Tooltip content — text string or ReactNode |
| children | `ReactNode` | — | Yes | Trigger element the tooltip anchors to |
| size | `'sm' \| 'md' \| 'lg'` | `'sm'` | No | Size variant |
| side | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | No | Which side of the trigger the tooltip appears on |
| align | `'start' \| 'center' \| 'end'` | `'center'` | No | Alignment along the side axis |
| open | `boolean` | — | No | Controlled open state |
| defaultOpen | `boolean` | `false` | No | Default open state for uncontrolled usage |
| onOpenChange | `(open: boolean) => void` | — | No | Called when open state changes |
| sideOffset | `number` | `6` | No | Distance in dp between tooltip and trigger |
| autoHideDuration | `number` | `0` | No | Auto-dismiss duration in ms (0 = no auto-dismiss) |
| hasArrow | `boolean` | `true` | No | Whether to show the arrow pointer |
| triggerAction | `'press' \| 'longPress'` | `'press'` | No | Trigger interaction type |
| css | `ViewStyle` | — | No | Style override (applied before `style`) |
| style | `ViewStyle` | — | No | Style override (applied last) |
| accessibilityLabel | `string` | — | No | Custom accessibility label (auto-derived from string content) |
| accessibilityHint | `string` | `'Tap to show tooltip'` | No | Custom accessibility hint for trigger |

## Variants

### Size

- **sm** — 12px font, 4px/8px padding, 4px radius, 10x6px arrow (default)
- **md** — 14px font, 6px/12px padding, 8px radius, 14x8px arrow
- **lg** — 14px font, 12px/16px padding, 8px radius, 20x12px arrow

### Side

- **top** — Tooltip appears above the trigger (default)
- **bottom** — Tooltip appears below the trigger
- **left** — Tooltip appears to the left of the trigger
- **right** — Tooltip appears to the right of the trigger

### Align

- **start** — Aligned to the start edge of the trigger
- **center** — Centered along the side axis (default)
- **end** — Aligned to the end edge of the trigger

## Usage

```tsx
import { Tooltip, Button } from 'testing-twigs';

function BasicExample() {
  return (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
}
```

### Controlled tooltip

```tsx
import { useState } from 'react';
import { Tooltip, Button } from 'testing-twigs';

function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip content="Controlled tooltip" open={open} onOpenChange={setOpen}>
      <Button>Tap me</Button>
    </Tooltip>
  );
}
```

### With placement

```tsx
import { Tooltip, Button } from 'testing-twigs';

function PlacementExample() {
  return (
    <Tooltip content="Bottom tooltip" side="bottom" align="start">
      <Button>Bottom Start</Button>
    </Tooltip>
  );
}
```

### Auto-dismiss

```tsx
import { Tooltip, Button } from 'testing-twigs';

function AutoDismissExample() {
  return (
    <Tooltip content="I disappear after 3 seconds" autoHideDuration={3000}>
      <Button>Tap me</Button>
    </Tooltip>
  );
}
```

### With custom content

```tsx
import { View, Text } from 'react-native';
import { Tooltip, Button } from 'testing-twigs';

function CustomContentExample() {
  return (
    <Tooltip
      content={
        <View style={{ padding: 4 }}>
          <Text style={{ color: '#FFF', fontWeight: '700' }}>Title</Text>
          <Text style={{ color: '#FFFFFFCC' }}>Description text</Text>
        </View>
      }
    >
      <Button>Rich tooltip</Button>
    </Tooltip>
  );
}
```

### With custom theme

```tsx
import { TwigsProvider, Tooltip, Button } from 'testing-twigs';

function ThemedExample() {
  return (
    <TwigsProvider theme={{ colors: { neutral900: '#1E293B' } }}>
      <Tooltip content="Themed tooltip">
        <Button>Tap me</Button>
      </Tooltip>
    </TwigsProvider>
  );
}
```

## Accessibility

- **accessibilityRole**: `"none"` on content container (tooltip role not available in RN)
- **accessibilityLiveRegion**: `"polite"` on tooltip content — screen reader announces when tooltip appears
- **accessibilityHint**: `"Tap to show tooltip"` on trigger (customizable)
- **accessibilityLabel**: Auto-derived from string content; customizable via prop
- **Screen reader behavior**: VoiceOver/TalkBack announces trigger hint, then reads tooltip content when visible

## Mobile Deviations from Web

| Web Behavior | Mobile Behavior | Reason |
|-------------|----------------|--------|
| Hover/focus trigger | Press/long press trigger | No hover on mobile |
| `delayDuration` (hover delay) | `autoHideDuration` (auto-dismiss) | Different interaction model |
| Radix portal | RN `Modal` (transparent) | No DOM portals in RN |
| Radix `aria-describedby` | `accessibilityLiveRegion="polite"` | RN accessibility API |
| CSS keyframe animations | `react-native-reanimated` fade + translate | Platform-appropriate animation |

## Dependencies

- `@floating-ui/react-native` — Anchor positioning (calculates tooltip placement relative to trigger)
- `react-native-reanimated` — Entry/exit animations (fade + slide)
- `react-native-svg` — Arrow triangle rendering
