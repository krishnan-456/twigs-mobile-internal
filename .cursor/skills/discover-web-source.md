---
name: discover-web-source
description: >
  Fetch and analyze the Twigs Web component source from GitHub.
  Also analyze existing RN components for patterns.
  Called by master-orchestrator during Phase 1.
---

# Discover Web Source

This skill fetches the web component source and analyzes existing RN patterns.
It runs **two parallel explore agents** for speed.

## Input

From master orchestrator context:
- `componentName`: PascalCase name (e.g., "Separator")
- `dirName`: kebab-case directory name (e.g., "separator")
- `workspacePath`: absolute path to project root

## Output

Return to master orchestrator:
- `webApiSummary`: Extracted web component API
- `rnPatternRecommendation`: Recommended RN implementation approach
- `status`: "found" | "not_found" | "error"

---

## Execution

Launch **TWO explore agents simultaneously**:

### Agent A — Fetch Web Source

```
Prompt:

"Fetch the Twigs Web component '<COMPONENT_NAME>' from GitHub.

Steps:
1. WebFetch to list the component directory:
   https://api.github.com/repos/surveysparrow/twigs/contents/packages/react-components/src/<DIR_NAME>

2. For each .tsx and .ts file in the response, WebFetch the raw content:
   https://raw.githubusercontent.com/surveysparrow/twigs/master/packages/react-components/src/<DIR_NAME>/<filename>

3. Analyze and return this EXACT structure:

PURPOSE: <one sentence description>

PROPS:
- <propName>: <TypeScript type> (default: <value or 'required'>)
- ... (list ALL props)

VARIANTS:
- size: <union type or 'none'>
- color: <union type or 'none'>
- variant: <union type or 'none'>

TOKENS:
- colors: <list of color tokens used, e.g., primary500, neutral200>
- space: <list of spacing tokens used>
- radii: <list of radius tokens used>
- other: <any other tokens>

ACCESSIBILITY:
- role: <aria role>
- states: <list of aria states>
- keyboard: <keyboard interactions>

DEPENDENCIES:
- <package name>: <what it's used for>
- ... or 'none'

STYLING:
- hover: <what happens on hover>
- focus: <what happens on focus>
- transitions: <list of animated properties>

CHILDREN:
- accepts: <yes/no>
- usage: <how children are rendered>

If the GitHub API returns 404, return exactly: NOT_FOUND"
```

Agent settings: `subagent_type: "explore"`, `readonly: true`

### Agent B — Analyze RN Patterns

```
Prompt:

"In the project at <WORKSPACE_PATH>, analyze existing components to recommend
patterns for implementing '<COMPONENT_NAME>'.

Steps:
1. List all component directories under src/ (exclude __tests__, utils, context, theme)
2. Categorize <COMPONENT_NAME>:
   - layout: box, flex
   - form: button, checkbox, radio, switch, text-input
   - feedback: loader
   - display: avatar, text
   - overlay: bottom-sheet
3. Read 1-2 components from the same category (types.ts, main .tsx, index.ts)
4. Return this EXACT structure:

SIMILAR_COMPONENT: <name of most similar existing component>

FILE_STRUCTURE: <small | medium | large>
- small: 3 files (types.ts, component.tsx, index.ts)
- medium: 5-6 files (adds constants.ts, helpers.ts, styles.ts)
- large: 7+ files (adds sub-components, variants)

PATTERNS:
- style organization: <how styles are structured>
- helper functions: <what helpers exist>
- constants: <what's in constants.ts>

A11Y_PATTERN:
- accessibilityRole: '<role used>'
- accessibilityState: { <states used> }
- additional: <any special a11y handling>

RECOMMENDATION:
- file structure: <small/medium/large for this component>
- reference component: <which existing component to use as template>
- special considerations: <anything unique about this component>"
```

Agent settings: `subagent_type: "explore"`, `readonly: true`

---

## After Both Agents Complete

### If Agent A returns NOT_FOUND

Return to master orchestrator:
```
{
  status: "not_found",
  message: "Component '<DIR_NAME>' not found in twigs-web."
}
```

Master will ask user: design as new mobile-only component or try different name?

### If Agent A returns name variations to try

If the exact name fails, check these variations:
- `separator` ↔ `divider`
- `tag` ↔ `chip` ↔ `badge`
- `input` ↔ `text-input` ↔ `textinput`
- `modal` ↔ `dialog`
- `spinner` ↔ `loader`
- `toggle` ↔ `switch`

### If both agents succeed

Combine outputs and return to master orchestrator:
```
{
  status: "found",
  webApiSummary: { <Agent A output parsed> },
  rnPatternRecommendation: { <Agent B output parsed> }
}
```

---

## Error Handling

| Error | Action |
|-------|--------|
| GitHub API rate limit | Wait 60s, retry once |
| Network error | Report to master, let it retry |
| Malformed response | Return partial data with warning |
| Agent B fails | Continue with Agent A data only (patterns are optional) |
