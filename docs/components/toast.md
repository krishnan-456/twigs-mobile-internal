# Toast

Displays short-lived, stackable notification messages with variant-based styling, swipe-to-dismiss gestures, and an imperative API. Fully custom implementation using `react-native-reanimated`, `react-native-gesture-handler`, and `react-native-screens` for navigation-safe overlays.

## Web Reference

- **Web source**: `packages/react-components/src/toast/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Feature parity — supports stacking, 6 positions, swipe-to-dismiss, and `useToast()` hook

## Props

### ToastProvider

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | `React.ReactNode` | — | Yes | App content to wrap |
| defaultPosition | `ToastPosition` | `'bottom-center'` | No | Default display position for all toasts |
| defaultDuration | `number` | `4000` | No | Default auto-dismiss duration (ms) |
| maxToasts | `number` | `3` | No | Maximum visible toasts per position |
| gap | `number` | `8` | No | Gap between stacked toasts (dp) |
| offset | `number` | `40` | No | Offset from screen edge (dp) |

### toast() Options

| Option | Type | Default | Required | Description |
|--------|------|---------|----------|-------------|
| id | `string` | auto-generated | No | Unique ID — pass to update an existing toast |
| title | `string` | — | Yes | Primary text shown in the toast |
| description | `string` | — | No | Secondary text below the title |
| variant | `ToastVariant` | `'default'` | No | Visual variant (colors and default icon) |
| icon | `ReactElement` | — | No | Custom icon — overrides default variant icon |
| action | `ReactElement` | — | No | Action element on the right (e.g. LinkButton) |
| duration | `number` | `4000` | No | Auto-dismiss duration (ms). `Infinity` to persist |
| position | `ToastPosition` | `'bottom-center'` | No | Display position |
| onPress | `() => void` | — | No | Callback when toast body is pressed |
| onShow | `() => void` | — | No | Callback when toast becomes visible |
| onDismiss | `() => void` | — | No | Callback when toast is dismissed |

### ToastPosition

```typescript
type ToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';
```

## Variants

### variant

- **default** — Dark background (`secondary800`), white text/icons. General purpose notifications.
- **success** — Accent/purple background (`accent500`), white text/icons. Confirms successful actions.
- **error** — Red background (`negative600`), white text/icons. Reports failures or errors.
- **warning** — Yellow background (`warning200`), dark text/icons. Alerts about potential issues.
- **loading** — Dark background (`secondary800`), white text, CircleLoader icon. Shows async operations in progress.

## Usage

### Setup

Mount `ToastProvider` inside `TwigsProvider` at your app root:

```tsx
import { TwigsProvider, ToastProvider } from 'testing-twigs';

function App() {
  return (
    <TwigsProvider>
      <ToastProvider defaultPosition="bottom-center" maxToasts={3}>
        <MainApp />
      </ToastProvider>
    </TwigsProvider>
  );
}
```

### Basic usage (imperative API)

```tsx
import { toast } from 'testing-twigs';

toast({ title: 'Process successful!', variant: 'success' });

toast({
  title: 'Changes saved',
  description: 'Your settings have been updated.',
  variant: 'success',
});
```

### Convenience methods

```tsx
toast.success('Saved!');
toast.error('Something went wrong');
toast.warning('Please check your input');
toast.loading('Processing...');
toast.dismiss();       // dismiss all toasts
toast.dismiss(id);     // dismiss specific toast
```

### useToast hook (inside components)

```tsx
import { useToast } from 'testing-twigs';

function MyComponent() {
  const { show, success, error, dismiss, update } = useToast();

  const handleSave = async () => {
    const { id } = show({ title: 'Saving...', variant: 'loading' });
    try {
      await save();
      update(id, { title: 'Saved!', variant: 'success' });
    } catch {
      update(id, { title: 'Failed to save', variant: 'error' });
    }
  };

  return <Button onPress={handleSave}>Save</Button>;
}
```

### Stacking multiple toasts

Multiple toasts can appear simultaneously and stack vertically:

```tsx
toast.success('File uploaded');
toast.success('Processing complete');
toast.success('Email sent');
```

### Updating an existing toast

```tsx
const { id } = toast.loading('Uploading...');

// Later — update in-place:
toast.update(id, { title: 'Upload complete!', variant: 'success' });
```

### Position options

```tsx
toast({ title: 'Top left', position: 'top-left' });
toast({ title: 'Top center', position: 'top-center' });
toast({ title: 'Top right', position: 'top-right' });
toast({ title: 'Bottom left', position: 'bottom-left' });
toast({ title: 'Bottom center', position: 'bottom-center' });
toast({ title: 'Bottom right', position: 'bottom-right' });
```

### With action element

```tsx
import { toast, LinkButton } from 'testing-twigs';

toast({
  title: 'Item deleted',
  variant: 'error',
  action: (
    <LinkButton
      size="sm"
      color="light"
      variant="bold"
      onPress={() => {
        undoDelete();
        toast.dismiss();
      }}
    >
      Undo
    </LinkButton>
  ),
});
```

### With custom icon

```tsx
import { toast } from 'testing-twigs';
import { MyCustomIcon } from './icons';

toast({
  title: 'Custom notification',
  variant: 'default',
  icon: <MyCustomIcon />,
});
```

### Dismiss programmatically

```tsx
const { id, dismiss } = toast({ title: 'Processing...', variant: 'loading' });

// Dismiss this specific toast:
dismiss();

// Or by ID:
toast.dismiss(id);

// Or dismiss all:
toast.dismiss();
```

### Swipe to dismiss

Toasts support horizontal swipe gestures to dismiss. Swipe left or right past the threshold (100dp) or with sufficient velocity to dismiss a toast.

## Accessibility

- **accessibilityRole**: `'alert'` on each toast
- **accessibilityLiveRegion**: `'polite'` — screen readers announce toast content without interrupting
- **accessibilityLabel**: Auto-composed from title and description (`"Title. Description"`)
- **Screen reader behavior**: VoiceOver/TalkBack announces the toast title and description when it appears

## Mobile Deviations from Web

| Web Behavior | Mobile Behavior | Reason |
|-------------|----------------|--------|
| Radix Toast primitives (Provider, Root, Viewport) | Custom implementation with Reanimated + Gesture Handler | No Radix equivalent for React Native |
| Loading variant uses custom spinner | Loading variant uses CircleLoader from `../loader` | Same visual intent, mobile loader component |

## Architecture

### Navigation non-blocking

- **iOS**: Uses `FullWindowOverlay` from `react-native-screens` to render toasts in a separate native window layer, preventing interference with navigation gestures
- **Android**: Regular view hierarchy with `pointerEvents="box-none"` on the overlay; only toast items capture touches

### Stacking

- Toasts are grouped by position and render in stacked order
- Older toasts get reduced opacity and scale for visual depth
- Max toasts per position is configurable via `maxToasts` prop (default: 3)
- Excess toasts evict the oldest in that position

### Animation performance

- All animations run on the native UI thread via Reanimated worklets
- No JS bridge communication during animations
- `useSharedValue` for smooth 60fps transforms
- Spring animations for natural entry/exit motion

## Dependencies

- `react-native-reanimated` (>=3.0.0) — Native thread animations
- `react-native-gesture-handler` (>=2.0.0) — Swipe-to-dismiss gestures
- `react-native-screens` (>=3.0.0) — `FullWindowOverlay` for iOS
- `react-native-safe-area-context` (>=4.0.0) — Safe area insets

## Migration from v1 (react-native-toast-message)

### Breaking changes

| Before | After |
|--------|-------|
| `position: 'top' \| 'bottom'` | `position: 'top-center' \| 'bottom-center'` (6 options) |
| `toast.hide()` | `toast.dismiss()` (or `toast.dismiss(id)`) |
| `onHide` callback | `onDismiss` callback |
| `topOffset` / `bottomOffset` | `offset` prop on ToastProvider |
| `visibilityTime` on provider | `defaultDuration` on provider |

### New features (non-breaking)

- Multiple simultaneous toasts (stacking)
- 6 position options
- `useToast()` React hook
- `toast.update(id, options)` to modify existing toasts
- Swipe-to-dismiss with gesture handler
- Navigation-safe overlays (no more stuck navigation)
