---
name: write-tests
description: >
  Create comprehensive test file for a component.
  Can run as sub-agent (generalPurpose) in parallel with write-docs.
  Called by master-orchestrator during Phase 4.
---

# Write Tests

This skill creates the test file for a component. It can run as a **generalPurpose
sub-agent** in parallel with write-docs.

## Input

From master orchestrator context:
- `componentName`, `dirName`, `workspacePath`
- `propsInterface`: full TypeScript interface
- `accessibilityRole`: the component's a11y role
- `accessibilityStates`: list of a11y states used
- `variants`: object with all variant types

## Output

Return to master orchestrator:
- `testFilePath`: path to created test file
- `testCount`: number of tests written

---

## Sub-Agent Prompt Template

When launching as sub-agent, use this prompt:

```
Create a test file at <WORKSPACE>/src/__tests__/<DIR_NAME>.test.tsx

Component: <COMPONENT_NAME>
Import from: '../<DIR_NAME>'

Props interface:
<PASTE FULL PROPS INTERFACE>

Accessibility:
- accessibilityRole: '<ROLE>'
- accessibilityState keys: [<LIST>]

Variants to test:
- size: [<sizes>]
- <other>: [<values>]

Follow the EXACT structure below. Wrap ALL renders in TwigsProvider.
Reference src/__tests__/button.test.tsx for patterns.

<TEST_TEMPLATE>
```

Agent settings: `subagent_type: "generalPurpose"`, `model: "fast"`

---

## Test File Template

```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TwigsProvider } from '../context';
import { <ComponentName> } from '../<dir-name>';

// Wrapper to provide theme context
const wrap = (ui: React.ReactElement) =>
  render(<TwigsProvider>{ui}</TwigsProvider>);

describe('<ComponentName>', () => {
  // ═══════════════════════════════════════════════════════════════
  // 1. RENDER — Basic mounting and content
  // ═══════════════════════════════════════════════════════════════
  describe('Render', () => {
    it('renders without crashing', () => {
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" />
      );
      expect(getByTestId('test-component')).toBeTruthy();
    });

    it('renders with default props', () => {
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" />
      );
      const component = getByTestId('test-component');
      // Verify default prop values are applied
      expect(component).toBeTruthy();
    });

    // If component accepts children:
    it('renders children correctly', () => {
      const { getByText } = wrap(
        <<ComponentName>>Child Content</<ComponentName>>
      );
      expect(getByText('Child Content')).toBeTruthy();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 2. VARIANTS — All size/color/variant props
  // ═══════════════════════════════════════════════════════════════
  describe('Variants', () => {
    // Size variants
    it.each(['sm', 'md', 'lg'] as const)('renders size="%s"', (size) => {
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" size={size} />
      );
      expect(getByTestId('test-component')).toBeTruthy();
    });

    // Add tests for each variant axis from input
  });

  // ═══════════════════════════════════════════════════════════════
  // 3. ACCESSIBILITY — Role, state, labels
  // ═══════════════════════════════════════════════════════════════
  describe('Accessibility', () => {
    it('has correct accessibilityRole', () => {
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" />
      );
      expect(getByTestId('test-component').props.accessibilityRole).toBe(
        '<ROLE>'
      );
    });

    it('has correct accessibilityState when enabled', () => {
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" />
      );
      expect(
        getByTestId('test-component').props.accessibilityState
      ).toMatchObject({
        disabled: false,
      });
    });

    it('has correct accessibilityState when disabled', () => {
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" disabled />
      );
      expect(
        getByTestId('test-component').props.accessibilityState
      ).toMatchObject({
        disabled: true,
      });
    });

    it('forwards accessibilityLabel', () => {
      const label = 'Custom label';
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" accessibilityLabel={label} />
      );
      expect(getByTestId('test-component').props.accessibilityLabel).toBe(
        label
      );
    });

    it('forwards accessibilityHint', () => {
      const hint = 'Custom hint';
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" accessibilityHint={hint} />
      );
      expect(getByTestId('test-component').props.accessibilityHint).toBe(hint);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 4. INTERACTION — Press handlers, disabled state
  // (Include only if component is interactive)
  // ═══════════════════════════════════════════════════════════════
  describe('Interaction', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" onPress={onPress} />
      );
      fireEvent.press(getByTestId('test-component'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" onPress={onPress} disabled />
      );
      fireEvent.press(getByTestId('test-component'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 5. STATE TRANSITIONS — Rerender with new props
  // ═══════════════════════════════════════════════════════════════
  describe('State transitions', () => {
    it('updates accessibilityState when disabled changes', () => {
      const { getByTestId, rerender } = wrap(
        <<ComponentName> testID="test-component" disabled={false} />
      );

      expect(
        getByTestId('test-component').props.accessibilityState?.disabled
      ).toBe(false);

      rerender(
        <TwigsProvider>
          <<ComponentName> testID="test-component" disabled={true} />
        </TwigsProvider>
      );

      expect(
        getByTestId('test-component').props.accessibilityState?.disabled
      ).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // 6. STYLE OVERRIDES — css and style props
  // ═══════════════════════════════════════════════════════════════
  describe('Style overrides', () => {
    it('applies css prop', () => {
      const customStyle = { backgroundColor: 'red' };
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" css={customStyle} />
      );
      const flatStyle = getByTestId('test-component').props.style.flat();
      expect(flatStyle).toContainEqual(
        expect.objectContaining(customStyle)
      );
    });

    it('applies style prop', () => {
      const customStyle = { marginTop: 20 };
      const { getByTestId } = wrap(
        <<ComponentName> testID="test-component" style={customStyle} />
      );
      const flatStyle = getByTestId('test-component').props.style.flat();
      expect(flatStyle).toContainEqual(
        expect.objectContaining(customStyle)
      );
    });

    it('style prop overrides css prop', () => {
      const { getByTestId } = wrap(
        <<ComponentName>
          testID="test-component"
          css={{ padding: 10 }}
          style={{ padding: 20 }}
        />
      );
      // style should come after css in the array
      const styleArray = getByTestId('test-component').props.style;
      expect(Array.isArray(styleArray)).toBe(true);
    });
  });
});
```

---

## Test Customization by Component Type

### For checkable components (checkbox, radio, switch)

Add to Accessibility section:
```tsx
it('has checked state when checked', () => {
  const { getByTestId } = wrap(
    <<ComponentName> testID="test-component" checked />
  );
  expect(
    getByTestId('test-component').props.accessibilityState?.checked
  ).toBe(true);
});
```

### For display-only components (separator, avatar)

Remove Interaction section entirely (no onPress).

### For components with loading state

Add to Accessibility section:
```tsx
it('has busy state when loading', () => {
  const { getByTestId } = wrap(
    <<ComponentName> testID="test-component" loading />
  );
  expect(
    getByTestId('test-component').props.accessibilityState?.busy
  ).toBe(true);
});
```

---

## Output Format

Return to master orchestrator:

```typescript
{
  testFilePath: 'src/__tests__/<dir-name>.test.tsx',
  testCount: 15  // number of it() blocks
}
```
