# Create Component

Create a new twigs-mobile component end-to-end: discover the web counterpart, assess feasibility, implement source files with a Storybook story, write tests and docs, run the quality gate, and create a changeset.

## Objective

Create the component named in the user's message (e.g., `/create Tooltip` creates a `Tooltip` component in `src/tooltip/`).

## Workflow

1. **Read the master orchestrator skill** at `.cursor/skills/master-orchestrator.md`.
2. Execute all phases in order. Do not skip any phase.

### Phase Summary

| Phase | Skill | Agent | Output |
|-------|-------|-------|--------|
| 1. Discover | `discover-web-source.md` | 2 parallel explore agents | Web API extraction + RN pattern recommendation |
| 2. Feasibility | `feasibility-check.md` | Main agent (needs user input) | Classification + deviations + deps |
| 3. Implement | `implement-component.md` | Main agent (file dependencies) | `types.ts`, component `.tsx`, `index.ts` |
| 3.5. Story | Part of implement skill | Main agent | `<name>.stories.tsx` with interactive controls |
| 4. Tests | `write-tests.md` | generalPurpose sub-agent | `src/__tests__/<name>.test.tsx` |
| 5. Docs | `write-docs.md` | generalPurpose sub-agent | `docs/components/<name>.md` + getting-started update |
| 6. Quality Gate | `quality-gate.md` | shell sub-agent | format, lint, test, build |
| 7. Finalize | Master orchestrator | Main agent | Changeset + completion report |

### Phase 4 + 5 run in parallel (tests and docs are independent).

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
- `yarn format` -- no formatting issues
- `yarn lint` -- no lint errors
- `yarn test` -- all tests pass
- `yarn build` -- build succeeds
- Changeset created in `.changeset/`

## References

- `.cursor/skills/master-orchestrator.md` -- full workflow with context object
- `.cursor/rules/component-commands.mdc` -- sub-agent strategy, feasibility tree, quality gate
- `.cursor/rules/common-pitfalls.mdc` -- 21 known mistakes to avoid
- `.cursor/rules/web-library-reference.mdc` -- web-to-RN token mapping
- `.cursor/rules/project-overview.mdc` -- conventions, folder layout, theme system
