# Enhance Component

Enhance an existing twigs-mobile component end-to-end: baseline current behavior,
discover web + design inputs, reconcile conflicts, implement improvements, update
stories/tests/docs, and run the quality gate.

## Objective

Enhance the component named in the user's message (for example,
`/enhance Checkbox`) in `src/<name>/` while preserving existing public behavior
by default unless the user explicitly asks for a breaking change.

The enhancement workflow should support:

- Figma-driven extraction when a Figma URL/node is provided
- Twigs Web source as behavior/API source of truth
- Reuse-first composition using existing twigs-mobile primitives
- Backward-compatible changes by default

## Environment

- **Figma MCP and Cursor Figma plugin are pre-enabled.**
- Twigs Web local source is available at:
  `/Users/krishnank/surveysparrow/twigs/packages/react-components/src/`

## .cursor-Only Modification Mode

When the user asks for workflow maintenance (commands/skills/rules/agents):

- Modify files under `.cursor/` only
- Do not edit `src/`, `docs/`, `lib/`, or runtime component code
- Keep quality gates intact (do not weaken lint/test/build standards)

## Source of Truth + Compatibility Policy

When sources conflict:

1. API/props/variants/accessibility/interaction behavior -> **Twigs Web wins**
2. Existing twigs-mobile public API stability -> **preserve by default**
3. Layout/spacing/sizing/visual structure -> **Figma wins** unless it breaks web behavior intent
4. Composition choices -> **reuse existing twigs-mobile components first**

If a change is breaking (prop removal/rename, behavior contract change, variant
removal), stop and ask the user before implementing.

## Workflow

1. Read and follow these skills in phase order:
   - `.cursor/skills/discover-web-source.md`
   - `.cursor/skills/feasibility-check.md`
   - `.cursor/skills/implement-component.md`
   - `.cursor/skills/write-tests.md`
   - `.cursor/skills/write-docs.md`
   - `.cursor/skills/quality-gate.md`
2. Execute all phases in order. Do not skip any phase.

### Phase Summary

| Phase | Skill | Agent | Output |
|-------|-------|-------|--------|
| 1. Baseline Audit | n/a | Main agent | Current API/variants/a11y/tests/docs snapshot |
| 2. Discover | `discover-web-source.md` | Main + 2 parallel explore agents | Web API + Figma extraction + RN pattern notes |
| 3. Feasibility + Impact | `feasibility-check.md` | Main agent (needs user input) | Classification + deviations + deps + impact level |
| 4. Design Reconciliation | Rules + policy | Main agent | Comparison table + conflict log + resolved enhancement spec |
| 5. Implement | `implement-component.md` | Main agent (file dependencies) | Updated component files with backward-compatible defaults |
| 5.5 Story Updates | Part of implement skill | Main agent | `<name>.stories.tsx` updated with existing + enhanced states |
| 6. Tests | `write-tests.md` | generalPurpose sub-agent | Updated `src/__tests__/<name>.test.tsx` with regression coverage |
| 7. Docs | `write-docs.md` | generalPurpose sub-agent | Updated `docs/components/<name>.md` with enhancement notes |
| 8. Quality Gate | `quality-gate.md` | shell sub-agent | format, lint, test, build |
| 9. Finalize | n/a | Main agent | Enhancement report + migration notes (if needed) |

### Phases 6 + 7 run in parallel (tests and docs are independent).

## Required Baseline Audit (Phase 1)

Before implementing enhancements, capture:

- Existing props interface and defaults (`src/<name>/types.ts`)
- Existing behavior and a11y outputs (`src/<name>/<name>.tsx`)
- Story coverage (`src/<name>/<name>.stories.tsx`)
- Current tests (`src/__tests__/<name>.test.tsx`)
- Current docs (`docs/components/<name>.md`)
- Public exports (`src/<name>/index.ts`, root `src/index.ts`)

## Reconciliation Output Template

Phase 4 must produce this exact structure:

1. **Discovery Summary**
2. **Current vs Web vs Figma Comparison**
3. **Reconciliation Notes**
4. **Compatibility Impact**
5. **Reuse Plan**
6. **Implementation Plan**
7. **Validation Plan**

## Stop-And-Ask Rule

Stop and ask the user before implementation if either of these is true:

- unresolved conflicts remain after Design Reconciliation
- enhancement requires a breaking API/behavior change or a new dependency

## Quality Gate Checklist

Before the command is complete, every item must pass:

- Uses `useTheme()` for all colors -- no hardcoded hex
- Uses `colorOpacity()` for alpha variants -- no `#RRGGBBAA` literals
- Extends `CommonStyleProps` and `BaseAccessibilityProps` in props interface
- Has `React.forwardRef` + `displayName`
- Appropriate `accessibilityRole` and `accessibilityState` set
- `css` and `style` props applied last in the style array
- Existing public props/variants are preserved unless user approved a break
- New props/variants are additive and have backward-compatible defaults
- Types exported from `src/<name>/index.ts`
- Component + types remain exported from root `src/index.ts` (alphabetical order)
- Story file keeps existing states and adds enhanced coverage
- Test file includes regression checks for previous behavior + new enhancement tests
- Docs include updated usage and a "What's changed" section (plus migration notes if breaking)
- `npm run format` -- no formatting issues
- `npm run lint` -- no lint errors
- `npm test` -- all tests pass
- `npm run build` -- build succeeds

## References

- `.cursor/commands/create.md` -- baseline greenfield workflow
- `.cursor/skills/discover-web-source.md` -- web + figma discovery
- `.cursor/skills/feasibility-check.md` -- feasibility + dependency vetting
- `.cursor/skills/implement-component.md` -- implementation pattern
- `.cursor/skills/write-tests.md` -- test updates and conventions
- `.cursor/skills/write-docs.md` -- docs update conventions
- `.cursor/skills/quality-gate.md` -- format/lint/test/build execution
- `.cursor/rules/component-commands.mdc` -- shared workflow strategy
- `.cursor/rules/common-pitfalls.mdc` -- known mistakes to avoid
- `.cursor/rules/web-library-reference.mdc` -- web parity guidance
- `.cursor/rules/twigs-ai-mcp.mdc` -- figma extraction and reconciliation handoff
- `.cursor/rules/project-overview.mdc` -- conventions, folder layout, theme system
