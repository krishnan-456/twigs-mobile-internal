# Alert

Displays contextual feedback messages with status indicators and optional close functionality.

## Web Reference

- **Web source**: `/Users/krishnank/surveysparrow/twigs/packages/react-components/src/alert/`
- **Web component name**: Alert
- **Status**: Aligned with web Alert

## Props

| Prop     | Type                                                       | Default  | Required | Description                                                           |
| -------- | ---------------------------------------------------------- | -------- | -------- | --------------------------------------------------------------------- |
| status   | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | No       | Visual status variant                                                 |
| size     | `'sm' \| 'md'`                                             | `'sm'`   | No       | Size of the alert                                                     |
| icon     | `React.ReactElement`                                       | —        | No       | Custom icon. If not provided, a default icon based on status is shown |
| closable | `boolean`                                                  | `false`  | No       | Whether the alert can be dismissed                                    |
| onClose  | `() => void`                                               | —        | No       | Callback when close button is pressed                                 |
| children | `React.ReactNode`                                          | —        | Yes      | Alert content                                                         |
| css      | `ViewStyle`                                                | —        | No       | Style override object                                                 |
| style    | `ViewStyle`                                                | —        | No       | Additional style                                                      |

## Variants

### Status

- **default** — Neutral gray background with info icon (Figma "FYI" variant)
- **info** — Accent/purple tint with info icon (default)
- **success** — Green tint with check icon
- **warning** — Amber tint with warning icon
- **error** — Red tint with alert triangle icon

### Size

- **sm** — 8px horizontal, 6px vertical padding; 14px text (default)
- **md** — 16px horizontal and vertical padding; 16px text

## Usage

```tsx
import { Alert } from '@anthropic/twigs-mobile';

// Basic usage
<Alert>An info message here</Alert>

// With status
<Alert status="success">Operation completed successfully</Alert>

// Neutral FYI variant
<Alert status="default">A FYI message here</Alert>

// Closable
<Alert closable onClose={() => console.log('closed')}>
  This alert can be dismissed
</Alert>
```

## Accessibility

- **accessibilityRole**: `'alert'` (default)
- **accessible**: `true` (default)
- **accessibilityLiveRegion**: `'polite'` for error/warning, `'none'` for others
- Close button has `accessibilityLabel="Close alert"` and `accessibilityHint="Dismisses this alert"`

## Mobile Deviations from Web

| Web Behavior                 | Mobile Behavior                         | Reason                                     |
| ---------------------------- | --------------------------------------- | ------------------------------------------ |
| Text color varies per status | Dark text (`black900`) for all variants | Figma design spec for better readability   |
| No `default` status          | Added `default` status (neutral gray)   | Figma "FYI" variant with no web equivalent |
| Uses `IconButton` for close  | Uses `Button` in icon mode              | Mobile primitive parity                    |
| Uses `aria-live`             | Uses `accessibilityLiveRegion`          | React Native accessibility API             |

## Dependencies

None (uses only built-in React Native components and project utilities).

## What's Changed

- Added `default` status variant (neutral gray, maps to Figma "FYI")
- Unified text color to dark (`black900`) for all variants per Figma design spec
- Previously text colors were status-specific (e.g. accent700 for info, positive700 for success)
