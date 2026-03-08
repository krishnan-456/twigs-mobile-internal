# Create Component

Create a new twigs-mobile component end-to-end: discover web + design inputs,
assess feasibility, reconcile conflicts, implement source files with a Storybook
story, write tests/docs, and run the quality gate.

## Objective

Create the component named in the user's message (e.g., `/create Tooltip` creates
`Tooltip` in `src/tooltip/`) with:

- Figma-driven extraction when a Figma URL/node is provided
- Twigs Web source as behavior/API source of truth
- Reuse-first composition using existing twigs-mobile primitives

## Environment

- **Figma MCP and Cursor Figma plugin are pre-enabled.**
- Twigs Web local source is available at:
  `/Users/krishnank/surveysparrow/twigs/packages/react-components/src/`

## .cursor-Only Modification Mode

When the user asks for workflow maintenance (commands/skills/rules/agents):

- Modify files under `.cursor/` only
- Do not edit `src/`, `docs/`, `lib/`, or runtime component code
- Keep quality gates intact (do not weaken lint/test/build standards)

## Source of Truth Policy

When sources conflict:

1. API/props/variants/accessibility/interaction behavior -> **Twigs Web wins**
2. Layout/spacing/sizing/visual structure -> **Figma wins** unless it breaks web behavior intent
3. Composition choices -> **reuse existing twigs-mobile components first**

## Workflow

1. **Read the master orchestrator skill** at `.cursor/skills/master-orchestrator.md`.
2. Execute all phases in order. Do not skip any phase.

### Phase Summary

| Phase | Skill | Agent | Output |
|-------|-------|-------|--------|
| 1. Discover | `discover-web-source.md` | Main + 2 parallel explore agents | Discovery summary (web API, figma extraction, RN patterns) |
| 2. Feasibility | `feasibility-check.md` | Main agent (needs user input) | Classification + deviations + deps |
| 3. Design Reconciliation | Master orchestrator + rules | Main agent | Comparison table + conflict log + resolved spec + reuse plan |
| 4. Implement | `implement-component.md` | Main agent (file dependencies) | `types.ts`, component `.tsx`, `index.ts` |
| 4.5. Story | Part of implement skill | Main agent | `<name>.stories.tsx` with interactive controls |
| 5. Tests | `write-tests.md` | generalPurpose sub-agent | `src/__tests__/<name>.test.tsx` |
| 6. Docs | `write-docs.md` | generalPurpose sub-agent | `docs/components/<name>.md` + getting-started update |
| 7. Quality Gate | `quality-gate.md` | shell sub-agent | format, lint, test, build |
| 8. Finalize | Master orchestrator | Main agent | Completion report |

### Phase 5 + 6 run in parallel (tests and docs are independent).

## Reconciliation Output Template

Phase 3 must produce this exact structure:

1. **Discovery Summary**
2. **Figma vs Web Comparison**
3. **Reconciliation Notes**
4. **Reuse Plan**
5. **Implementation Plan**
6. **Validation Plan**

## Stop-And-Ask Rule

If unresolved conflicts remain after Design Reconciliation, stop and ask the
user before implementing code.

## Quality Gate Checklist

Before the command is complete, every item must pass:

- Uses `useTheme()` for all colors -- no hardcoded hex
- Uses `colorOpacity()` for alpha variants -- no `#RRGGBBAA` literals
- Extends `CommonStyleProps` and `BaseAccessibilityProps` in props interface
- Has `React.forwardRef` + `displayName`
- Appropriate `accessibilityRole` and `accessibilityState` set
- `css` and `style` props applied last in the style array
- Types exported from `src/<name>/index.ts`
- Component + types exported from root `src/index.ts` (alphabetical order)
- Story file at `src/<name>/<name>.stories.tsx` with interactive controls for all props
- Test file at `src/__tests__/<name>.test.tsx` with 5 test areas
- Docs file at `docs/components/<name>.md` with all sections
- `docs/getting-started.md` component table updated
- `npm run format` -- no formatting issues
- `npm run lint` -- no lint errors
- `npm test` -- all tests pass
- `npm run build` -- build succeeds

## References

- `.cursor/skills/master-orchestrator.md` -- full workflow with context object
- `.cursor/rules/component-commands.mdc` -- sub-agent strategy, reconciliation, quality gate
- `.cursor/rules/common-pitfalls.mdc` -- known mistakes to avoid
- `.cursor/rules/web-library-reference.mdc` -- web parity and source-of-truth guidance
- `.cursor/rules/twigs-ai-mcp.mdc` -- figma extraction and reconciliation handoff
- `.cursor/rules/project-overview.mdc` -- conventions, folder layout, theme system
