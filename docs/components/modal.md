# Modal

Composable modal dialog for React Native with customizable content, similar to twigs-web Dialog and AlertDialog.

## Web Reference

- **Web source**: `packages/react-components/src/dialog/` and `packages/react-components/src/alert-dialog/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: Partially replicated (Dialog + AlertDialog combined into Modal with composable API)

## Overview

The Modal component wraps React Native's Modal with a backdrop overlay, centered layout, and composable sub-components. Use it for confirmation dialogs, content dialogs, and custom modal layouts.

### Sub-components

| Component         | Description                                |
| ----------------- | ------------------------------------------ |
| `Modal`           | Root component wrapping RN Modal           |
| `ModalContent`    | White card container with size variants    |
| `ModalHeader`     | Header section for title and description   |
| `ModalTitle`      | Title text                                 |
| `ModalDescription`| Description text below the title            |
| `ModalBody`       | Main content area (optionally scrollable)  |
| `ModalFooter`     | Action area with horizontally laid buttons |

## Props

### Modal (root)

| Prop                 | Type                                       | Default  | Required | Description                                              |
| -------------------- | ------------------------------------------ | -------- | -------- | -------------------------------------------------------- |
| visible              | `boolean`                                  | —        | Yes      | Whether the modal is visible                             |
| onClose              | `() => void`                               | —        | No       | Called when the modal should close (backdrop, back btn)  |
| closeOnBackdropPress | `boolean`                                  | `true`   | No       | Whether pressing the backdrop closes the modal           |
| animationType        | `'none' \| 'fade' \| 'slide'`              | `'fade'` | No       | Animation type for the modal                             |
| children             | `React.ReactNode`                          | —        | Yes      | Modal content (typically ModalContent with sub-components) |
| testID               | `string`                                   | —        | No       | Test ID for the overlay container                        |
| accessibilityLabel   | `string`                                   | —        | No       | Custom accessibility label                               |
| accessibilityHint    | `string`                                   | —        | No       | Custom accessibility hint                                 |

### ModalContent

| Prop     | Type                                      | Default | Required | Description                                              |
| -------- | ----------------------------------------- | ------- | -------- | -------------------------------------------------------- |
| size     | `'sm' \| 'md' \| 'lg' \| 'full'`          | `'md'`  | No       | Size variant (sm narrower, md default, lg wider, full)    |
| children | `React.ReactNode`                         | —       | Yes      | Content children                                         |
| css      | `ViewStyle`                               | —       | No       | Style override object                                    |
| style    | `ViewStyle`                               | —       | No       | Additional style                                         |

### ModalHeader

| Prop     | Type              | Default | Required | Description         |
| -------- | ----------------- | ------- | -------- | ------------------- |
| children | `React.ReactNode`  | —       | Yes      | Header children      |
| css      | `ViewStyle`       | —       | No       | Style override       |
| style    | `ViewStyle`       | —       | No       | Additional style     |

### ModalTitle

| Prop     | Type              | Default | Required | Description         |
| -------- | ----------------- | ------- | -------- | ------------------- |
| children | `React.ReactNode`  | —       | Yes      | Title text           |
| css      | `TextStyle`       | —       | No       | Style override       |
| style    | `TextStyle`       | —       | No       | Additional style     |
| testID   | `string`          | —       | No       | Test ID              |

### ModalDescription

| Prop     | Type              | Default | Required | Description         |
| -------- | ----------------- | ------- | -------- | ------------------- |
| children | `React.ReactNode`  | —       | Yes      | Description text     |
| css      | `TextStyle`       | —       | No       | Style override       |
| style    | `TextStyle`       | —       | No       | Additional style     |
| testID   | `string`          | —       | No       | Test ID              |

### ModalBody

| Prop       | Type              | Default | Required | Description                      |
| ---------- | ----------------- | ------- | -------- | -------------------------------- |
| children   | `React.ReactNode`  | —       | Yes      | Body content                     |
| scrollable | `boolean`         | `false` | No       | Whether the body is scrollable   |
| css        | `ViewStyle`       | —       | No       | Style override                   |
| style      | `ViewStyle`       | —       | No       | Additional style                 |

### ModalFooter

| Prop     | Type              | Default | Required | Description                         |
| -------- | ----------------- | ------- | -------- | ----------------------------------- |
| children | `React.ReactNode`  | —       | Yes      | Footer children (typically Buttons) |
| css      | `ViewStyle`       | —       | No       | Style override                      |
| style    | `ViewStyle`       | —       | No       | Additional style                    |

## Variants

### ModalContent size

- **sm** — Narrower content width
- **md** — Default width (~92% screen width)
- **lg** — Wider content width
- **full** — Full screen

## Usage

### Basic alert dialog (title, description, cancel/confirm buttons)

```tsx
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Button } from 'testing-twigs';

function AlertExample() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setVisible(true)}>Open</Button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Delete item?</ModalTitle>
            <ModalDescription>
              This action cannot be undone.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button color="negative" onPress={() => { /* confirm */ setVisible(false); }}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

### Dialog with body content

```tsx
<Modal visible={visible} onClose={() => setVisible(false)}>
  <ModalContent size="md">
    <ModalHeader>
      <ModalTitle>Edit profile</ModalTitle>
      <ModalDescription>Make changes to your profile.</ModalDescription>
    </ModalHeader>
    <ModalBody scrollable>
      {/* Form fields or long content */}
    </ModalBody>
    <ModalFooter>
      <Button variant="outline" onPress={() => setVisible(false)}>Cancel</Button>
      <Button onPress={handleSave}>Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Fully custom children (without sub-components)

```tsx
<Modal visible={visible} onClose={() => setVisible(false)}>
  <ModalContent size="lg">
    <View style={{ padding: 24 }}>
      <Text>Any custom layout here</Text>
      <Button onPress={() => setVisible(false)}>Close</Button>
    </View>
  </ModalContent>
</Modal>
```

### Different sizes

```tsx
<Modal visible={visible} onClose={onClose}>
  <ModalContent size="sm">
    {/* Small modal */}
  </ModalContent>
</Modal>

<Modal visible={visible} onClose={onClose}>
  <ModalContent size="full">
    {/* Full screen modal */}
  </ModalContent>
</Modal>
```

### Non-dismissible modal (closeOnBackdropPress=false)

```tsx
<Modal
  visible={visible}
  onClose={() => setVisible(false)}
  closeOnBackdropPress={false}
>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Required action</ModalTitle>
      <ModalDescription>You must choose an option below.</ModalDescription>
    </ModalHeader>
    <ModalFooter>
      <Button onPress={() => setVisible(false)}>Continue</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### With custom theme

```tsx
import { TwigsProvider, Modal, ModalContent, ModalHeader, ModalTitle, Button } from 'testing-twigs';

function ThemedExample() {
  return (
    <TwigsProvider theme={{ colors: { primary500: '#1A73E8' } }}>
      <Modal visible={true} onClose={() => {}}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Themed modal</ModalTitle>
          </ModalHeader>
          <ModalFooter>
            <Button>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TwigsProvider>
  );
}
```

## Accessibility

- **accessibilityViewIsModal**: `true` on the RN Modal — ensures proper focus trapping and screen reader behavior
- **BaseAccessibilityProps**: All `ModalProps` and sub-component props extend `BaseAccessibilityProps`; pass `accessibilityLabel`, `accessibilityHint`, and other a11y props as needed
- **Android back button**: Triggers `onClose` via RN Modal's `onRequestClose`
- **Screen reader behavior**: Title and description are announced; ensure buttons in the footer have appropriate `accessibilityLabel` and `accessibilityHint` values

## Mobile Deviations from Web

| Web Behavior                          | Mobile Behavior                          | Reason                                      |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------- |
| Radix Trigger/Close pattern           | `visible` prop for controlled visibility | RN uses imperative visibility control       |
| DialogTrigger, DialogClose wrappers    | `onClose` callback + Button `onPress`    | No Radix primitives on mobile               |
| Radix overlay click behavior          | `closeOnBackdropPress` prop              | Explicit control for RN Modal               |
| Portal component                      | None — RN Modal handles overlay natively | React Native Modal is native overlay        |
| AlertDialogAction/Cancel wrappers      | Use Button with `onPress`                | Composition with existing Button component  |

## Dependencies

None (uses only built-in React Native Modal and project utilities).

## Related Components

- **Button** — Used for footer actions (cancel, confirm)
- **BottomSheetModal** — Alternative overlay pattern for bottom-up content
