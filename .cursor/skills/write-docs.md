---
name: write-docs
description: >
  Create component documentation and update getting-started.
  Can run as sub-agent (generalPurpose) in parallel with write-tests.
  Called by master-orchestrator during Phase 5.
---

# Write Docs

This skill creates documentation for a component. It can run as a **generalPurpose
sub-agent** in parallel with write-tests.

## Input

From master orchestrator context:
- `componentName`, `dirName`, `workspacePath`
- `webApiSummary`: purpose, props, variants
- `deviations`: list of web-to-RN differences
- `accessibilityRole`, `accessibilityStates`

## Output

Return to master orchestrator:
- `docsFilePath`: path to component doc
- `gettingStartedUpdated`: boolean

---

## Sub-Agent Prompt Template

When launching as sub-agent, use this prompt:

```
Create documentation for the <COMPONENT_NAME> component.

Workspace: <WORKSPACE>
Component directory: src/<DIR_NAME>/

Create TWO files:

FILE 1: docs/components/<DIR_NAME>.md
Use the template from docs/component-template.md and fill in ALL sections.

Component info:
- Purpose: <FROM webApiSummary.purpose>
- Props: <FULL LIST with types, defaults, descriptions>
- Variants: <ALL variant options>
- Accessibility role: <ROLE>
- Accessibility states: <LIST>
- Deviations from web: <LIST or "none">

FILE 2: Update docs/getting-started.md
Find the Components table (markdown table with | Component | Description | columns).
Add a new row in ALPHABETICAL order:
| `<ComponentName>` | <ONE_SENTENCE_DESCRIPTION> |
```

Agent settings: `subagent_type: "generalPurpose"`, `model: "fast"`

---

## Component Doc Template

Create `docs/components/<dir-name>.md`:

```markdown
# <ComponentName>

<One-sentence description from webApiSummary.purpose>

## Web Reference

- **Web source**: `packages/react-components/src/<web-dir-name>/`
- **Web docs**: https://twigs.surveysparrow.com/
- **Status**: <Fully replicated / Partially replicated / Mobile-only>

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Component size |
| disabled | `boolean` | `false` | No | Disables the component |
| css | `StyleProp<ViewStyle>` | — | No | Style override (before style) |
| style | `StyleProp<ViewStyle>` | — | No | Style override (last) |
| accessibilityLabel | `string` | — | No | Custom a11y label |
| accessibilityHint | `string` | — | No | Custom a11y hint |
<!-- Add all component-specific props from webApiSummary -->

## Variants

### Size

- **sm** — Small variant, <dimensions>
- **md** — Medium variant (default), <dimensions>
- **lg** — Large variant, <dimensions>

<!-- Add other variant axes -->

## Usage

```tsx
import { <ComponentName> } from 'testing-twigs';

function Example() {
  return (
    <<ComponentName>
      size="md"
      // other common props
    />
  );
}
```

### With Custom Styling

```tsx
<<ComponentName>
  css={{ marginBottom: 16 }}
  style={{ opacity: 0.9 }}
/>
```

## Accessibility

- **accessibilityRole**: `'<role>'`
- **accessibilityState**: 
  - `disabled`: Reflects the `disabled` prop
  <!-- Add other states -->
- **Screen reader**: <What VoiceOver/TalkBack announces>

## Mobile Deviations from Web

<!-- If deviations exist, list them in a table: -->

| Web Behavior | Mobile Behavior | Reason |
|-------------|----------------|--------|
| <web feature> | <RN equivalent> | <why> |

<!-- If no deviations: -->
<!-- This component is a 1:1 match with the web implementation. -->

## Related Components

- [`<RelatedComponent1>`](./related-component1.md) — <relationship>
- [`<RelatedComponent2>`](./related-component2.md) — <relationship>
```

---

## Update Getting Started

In `docs/getting-started.md`, find the Components table:

```markdown
## Components

| Component | Description |
|---|---|
| `Avatar` | User avatar with image or initials fallback |
| `Box` | Basic layout container |
...
```

Add a new row in **alphabetical order**:

```markdown
| `<ComponentName>` | <One-sentence description> |
```

---

## Status Determination

Set the "Status" field based on:

- **Fully replicated**: All web props supported, same visual appearance, same behavior
- **Partially replicated**: Most props supported, some features omitted (list which)
- **Mobile-only**: Component doesn't exist in web library, designed specifically for mobile

---

## Output Format

Return to master orchestrator:

```typescript
{
  docsFilePath: 'docs/components/<dir-name>.md',
  gettingStartedUpdated: true
}
```
