---
name: implement-component
description: >
  Create all component source files following project conventions.
  Runs on main agent due to file dependencies.
  Called by master-orchestrator during Phase 3.
---

# Implement Component

This skill creates all component source files. It runs on the **main agent**
because files have dependencies (types.ts must exist before component.tsx).

## Input

From master orchestrator context:
- `componentName`, `dirName`, `workspacePath`
- `webApiSummary`: props, variants, tokens, accessibility
- `rnPatternRecommendation`: file structure, similar component
- `classification`, `deviations`: from feasibility check

## Output

Return to master orchestrator:
- `filesCreated`: list of file paths
- `propsInterface`: the full props interface (for test skill)

---

## File Creation Order

Create files in this order (dependencies flow top-down):

```
1.   types.ts                  → props interface (no dependencies)
2.   constants.ts              → size maps, configs (imports types) [if medium/large]
3.   helpers.ts                → style functions (imports types, constants) [if medium/large]
4.   styles.ts                 → StyleSheet.create [if medium/large]
5.   <dir-name>.tsx            → main component (imports all above)
5.5. <dir-name>.stories.tsx    → Storybook story with interactive controls
6.   index.ts                  → barrel exports
7.   Update src/index.ts       → wire to root barrel
```

### File Structure Decision

Based on `rnPatternRecommendation.fileStructure`:

| Structure | Files | When to use |
|-----------|-------|-------------|
| small | 3 files | < 250 LOC, simple props, no variants |
| medium | 5-6 files | 250-500 LOC, multiple variants, theme-dependent styles |
| large | 7+ files | 500+ LOC, sub-components, complex logic |

---

## File Templates

### types.ts

```typescript
import type { ViewProps } from 'react-native';  // or PressableProps
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

/** <Description from webApiSummary.purpose> */

// Size variants (if applicable)
export type <ComponentName>Size = '<size1>' | '<size2>' | '<size3>';

// Other variant types from webApiSummary.variants
export type <ComponentName>Variant = '<var1>' | '<var2>';

/** Props for the <ComponentName> component */
export interface <ComponentName>Props
  extends Omit<ViewProps, 'style'>,
    CommonStyleProps,
    BaseAccessibilityProps {
  // From webApiSummary.props:
  /** <prop description> */
  <propName>?: <PropType>;
  // ... all props
}
```

**Rules:**
- Use `interface`, never `type` for props
- Always extend `CommonStyleProps` and `BaseAccessibilityProps`
- `Omit<ViewProps, 'style'>` to avoid conflict
- JSDoc comment for every prop
- Union types for variants, not enums

### constants.ts (medium/large only)

```typescript
import type { <ComponentName>Size } from './types';

interface SizeConfig {
  height: number;
  paddingHorizontal: number;
  paddingVertical: number;
  fontSize: number;
  // ... component-specific dimensions
}

export const SIZE_CONFIG: Record<<ComponentName>Size, SizeConfig> = {
  sm: { height: 24, paddingHorizontal: 8, paddingVertical: 4, fontSize: 12 },
  md: { height: 32, paddingHorizontal: 12, paddingVertical: 6, fontSize: 14 },
  lg: { height: 40, paddingHorizontal: 16, paddingVertical: 8, fontSize: 16 },
};

// Other constants from webApiSummary
export const DEFAULT_SIZE: <ComponentName>Size = 'md';
```

### helpers.ts (medium/large only)

```typescript
import type { ViewStyle, TextStyle } from 'react-native';
import type { TwigsTheme } from '../theme';
import type { <ComponentName>Size, <ComponentName>Variant } from './types';
import { SIZE_CONFIG } from './constants';
import { colorOpacity } from '../utils';

export function getSizeStyles(size: <ComponentName>Size): ViewStyle {
  const config = SIZE_CONFIG[size];
  return {
    height: config.height,
    paddingHorizontal: config.paddingHorizontal,
    paddingVertical: config.paddingVertical,
  };
}

export function getColorStyles(
  theme: TwigsTheme,
  variant: <ComponentName>Variant,
  disabled: boolean
): ViewStyle {
  // Map from webApiSummary.tokens
  const colors = {
    default: theme.colors.neutral200,
    primary: theme.colors.primary500,
    // ...
  };
  
  return {
    backgroundColor: disabled 
      ? colorOpacity(colors[variant], 0.5) 
      : colors[variant],
  };
}
```

**Rules:**
- Pure functions only (no hooks, no side effects)
- Take theme as parameter, not from hook
- Use `colorOpacity()` for alpha variants
- Return typed style objects

### styles.ts (medium/large only)

```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  // Static styles only — no theme values here
});
```

### <dir-name>.tsx

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context';
import type { <ComponentName>Props } from './types';
// If medium/large:
// import { getSizeStyles, getColorStyles } from './helpers';
// import { styles } from './styles';

const styles = StyleSheet.create({
  base: { /* static styles */ },
  disabled: { opacity: 0.5 },
});

export const <ComponentName> = React.forwardRef<View, <ComponentName>Props>(
  (
    {
      // Destructure all props with defaults
      size = 'md',
      disabled = false,
      css,
      style,
      accessible = true,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();

    // Compute dynamic styles
    // If medium/large: use helper functions
    // If small: inline computation

    return (
      <View
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole ?? '<ROLE_FROM_WEB>'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{
          disabled,
          ...accessibilityState,
        }}
        style={[
          styles.base,
          // dynamic styles
          disabled && styles.disabled,
          css,
          style,  // ALWAYS LAST
        ]}
        {...rest}
      />
    );
  }
);
<ComponentName>.displayName = '<ComponentName>';
```

**Critical Rules:**
- `React.forwardRef` + `displayName` — MANDATORY
- `useTheme()` for all colors — NO hardcoded hex
- `colorOpacity()` for alpha — NO #RRGGBBAA
- `accessible={true}` on interactive components
- `accessibilityRole` from webApiSummary.accessibility.role
- `accessibilityState` with disabled, checked (not selected), busy
- `css` then `style` LAST in style array
- `...rest` spread for consumer overrides
- `// Mobile deviation: <reason>` comments for any web differences

### <dir-name>.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { <ComponentName> } from './<dir-name>';

const meta: Meta<typeof <ComponentName>> = {
  title: '<ComponentName>',
  component: <ComponentName>,
  argTypes: {
    // Map every public prop to an argType with a control
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],  // from <ComponentName>Size union
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    // ... all other props from types.ts
    // Use 'color' control for color props
    // Use 'text' control for string props
    // Use 'select' control for union type props
    // Use 'boolean' control for boolean props
    // Use 'number' control for numeric props
  },
  args: {
    // Default values matching the component defaults
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof <ComponentName>>;

export const Default: Story = {};

// Add one story per meaningful variant combination
export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
```

**Story file rules:**
- Co-locate with the component: `src/<dir-name>/<dir-name>.stories.tsx`
- Use CSF3 format (`Meta`, `StoryObj`)
- Every public prop gets an `argType` with an appropriate control
- `args` provides sensible defaults
- Include stories for: Default, each size, each variant, disabled, and any notable state
- Story files are excluded from the library build by bob's `exclude` config

### index.ts

```typescript
export { <ComponentName> } from './<dir-name>';
export type { <ComponentName>Props, <ComponentName>Size } from './types';
```

---

## Wire to Root Barrel

Add to `src/index.ts` in **alphabetical order**:

```typescript
// <ComponentName>
export { <ComponentName> } from './<dir-name>';
export type { <ComponentName>Props, <ComponentName>Size } from './<dir-name>';
```

Find the correct alphabetical position among existing component exports.

---

## Output Format

Return to master orchestrator:

```typescript
{
  filesCreated: [
    'src/<dir-name>/types.ts',
    'src/<dir-name>/<dir-name>.tsx',
    'src/<dir-name>/<dir-name>.stories.tsx',
    'src/<dir-name>/index.ts',
  ],
  propsInterface: `
    export interface <ComponentName>Props ... {
      // full interface for test skill
    }
  `,
  accessibilityRole: '<role>',
  accessibilityStates: ['disabled', ...],
  variants: {
    size: ['sm', 'md', 'lg'],
    // ...
  }
}
```
