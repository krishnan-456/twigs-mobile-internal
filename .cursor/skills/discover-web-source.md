---
name: discover-web-source
description: >
  Read and analyze Twigs Web source, gather Figma design context when provided,
  and analyze existing RN component patterns.
  Called by master-orchestrator during Phase 1.
---

# Discover Web + Design Sources

This skill gathers all discovery inputs for `/create`:

1. Twigs Web API/behavior details (local source)
2. Figma layout/visual structure (when a Figma reference is provided)
3. Existing twigs-mobile reuse patterns

It runs **two parallel explore agents** for speed and uses the main agent for
Figma extraction.

## Environment

- **Figma MCP and Cursor Figma plugin are pre-enabled.**
- Web source is local at:
  `/Users/krishnank/surveysparrow/twigs/packages/react-components/src/<component-name>/`

Use local file tools (`Glob`, `Read`, `Grep`) for web/mobile code discovery.

## Input

From master orchestrator context:
- `componentName`: PascalCase name (e.g., `Separator`)
- `dirName`: kebab-case directory name (e.g., `separator`)
- `workspacePath`: absolute path to project root
- `figmaRef` (optional): Figma URL, node id, or file key + node id

## Output

Return to master orchestrator:
- `status`: `found` | `not_found` | `error`
- `discoverySummary`
- `webApiSummary`
- `figmaDesignSummary` (or `null` when no figma ref is provided)
- `rnPatternRecommendation`

---

## Execution

### Step 0 — Figma Extraction (main agent, optional)

If a Figma reference is provided:

1. Parse `fileKey` and `nodeId` from the URL/reference.
2. Call Figma MCP tools in this order:
   - `get_design_context` (primary extraction)
   - `get_screenshot` (visual confirmation)
   - `get_metadata` (if structure/details are still unclear)
3. Normalize into:
   - layout/structure notes
   - spacing/sizing notes
   - visual hierarchy notes
   - design constraints that may affect implementation
   - **icon comparison**: if the design contains icons, fetch each icon node
     individually and compare against existing SVG icons in the codebase
     (see common-pitfalls.mdc #24). Flag any mismatches (filled vs stroke,
     shape differences, viewBox sizing) before proceeding.

If no Figma reference exists, set `figmaDesignSummary = null`.

### Step 1 — Launch TWO explore agents in parallel

#### Agent A — Read Twigs Web Source (local)

```
Prompt:

"Read the Twigs Web component '<COMPONENT_NAME>' from the local workspace.

Source root:
  /Users/krishnank/surveysparrow/twigs/packages/react-components/src/

Steps:
1. Use Glob:
   /Users/krishnank/surveysparrow/twigs/packages/react-components/src/<DIR_NAME>/**/*.{ts,tsx}
2. If no files are found, try known name variations (separator↔divider, tag↔chip↔badge,
   input↔text-input↔textinput, modal↔dialog, spinner↔loader, toggle↔switch).
3. Read files in this order:
   a) index.ts/index.tsx
   b) main component file
   c) types file
   d) styles file
4. Return this EXACT structure:

PURPOSE: <one sentence>

PROPS:
- <prop>: <type> (default: <value or 'required'>)

VARIANTS:
- size: <union or 'none'>
- color: <union or 'none'>
- variant: <union or 'none'>

ACCESSIBILITY:
- role: <aria role>
- states: <aria states>
- keyboard: <keyboard interactions>

INTERACTION_BEHAVIOR:
- events: <onClick/onDismiss/etc behavior>
- state transitions: <what changes and when>

COMPOSITION:
- twigs_primitives: <Button/IconButton/Box/etc used by web component>
- structure_notes: <how primitives are composed>

TOKENS:
- colors: <tokens>
- space: <tokens>
- radii: <tokens>
- other: <tokens>

DEPENDENCIES:
- <package>: <usage> or 'none'

If no component directory exists after variations, return exactly: NOT_FOUND"
```

Agent settings: `subagent_type: "explore"`, `readonly: true`

#### Agent B — Analyze Existing twigs-mobile Reuse Patterns

```
Prompt:

"In <WORKSPACE_PATH>, analyze existing twigs-mobile components and return
reuse-first implementation guidance for '<COMPONENT_NAME>'.

Steps:
1. Inspect existing component directories in src/ (exclude infra folders).
2. Read 1-2 similar components from the same category.
3. Prefer Twigs primitive composition over raw RN primitives.
4. Return this EXACT structure:

SIMILAR_COMPONENT: <closest existing component>

FILE_STRUCTURE: <small | medium | large>

REUSE_CANDIDATES:
- web_primitive: <e.g., IconButton>
  mobile_target: <e.g., Button icon mode>
  rationale: <why>

PATTERNS:
- style organization: <patterns>
- helper functions: <patterns>
- constants: <patterns>
- a11y handling: <patterns>

RECOMMENDATION:
- reference component: <component>
- special considerations: <notes>"
```

Agent settings: `subagent_type: "explore"`, `readonly: true`

---

## Combine and Return

### If Agent A returns `NOT_FOUND`

Return:
```
{
  status: "not_found",
  message: "Component '<DIR_NAME>' not found in twigs-web."
}
```

### If discovery succeeds

Return:
```
{
  status: "found",
  discoverySummary: "<short synthesis of web + figma + reuse findings>",
  webApiSummary: { ... },
  figmaDesignSummary: { ... } | null,
  rnPatternRecommendation: { ... }
}
```

---

## Error Handling

| Error | Action |
|-------|--------|
| Web component directory missing | Try name variations, then return `not_found` |
| Figma extraction fails | Continue with web-only discovery + flag warning |
| File read error | Return partial data with explicit warning |
| Agent B fails | Continue with Agent A + figma data (reuse guidance becomes best-effort) |
