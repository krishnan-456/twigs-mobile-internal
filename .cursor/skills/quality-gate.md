---
name: quality-gate
description: >
  Run format, lint, test, and build commands.
  Reports pass/fail for each step.
  Called by master-orchestrator during Phase 6, and by publish workflow.
---

# Quality Gate

This skill runs the quality gate commands. It can run as a **shell sub-agent**
to execute commands in sequence.

## Input

From master orchestrator context:
- `workspacePath`: absolute path to project root
- `dirName`: component directory name (for targeted runs)
- `mode`: "component" (targeted) or "full" (entire project)

## Output

Return to master orchestrator:
- `passed`: boolean — all steps passed
- `results`: object with pass/fail for each step
- `errors`: any error output (first 50 lines)

---

## Sub-Agent Prompt Template

When launching as sub-agent, use this prompt:

### For component mode (after creating a new component):

```
In the project at <WORKSPACE>, run these commands sequentially.
If any command fails, return the FULL error output (first 50 lines) and STOP.

0. Verify story file exists:
   ls src/<DIR_NAME>/<DIR_NAME>.stories.tsx
   If missing, report FAIL and STOP.

1. Format the new component files:
   npx prettier --write "src/<DIR_NAME>/**/*.{ts,tsx}" "src/__tests__/<DIR_NAME>.test.tsx" "docs/components/<DIR_NAME>.md"

2. Lint the new component files:
   npx eslint src/<DIR_NAME>/ src/__tests__/<DIR_NAME>.test.tsx --fix

3. Run tests for the new component:
   yarn test -- --testPathPattern='<DIR_NAME>'

4. Build the entire project:
   yarn build

For each command, report:
- Command: <the command>
- Status: PASS or FAIL
- Output: <relevant output, especially errors>

Final summary:
- Story file: PASS/FAIL
- Format: PASS/FAIL
- Lint: PASS/FAIL
- Test: PASS/FAIL
- Build: PASS/FAIL
- Overall: PASS/FAIL
```

### For full mode (publish workflow):

```
In the project at <WORKSPACE>, run these commands sequentially.
If any command fails, return the FULL error output (first 50 lines) and STOP.

1. Lint entire project:
   yarn lint

2. Run all tests:
   yarn test

3. Build project:
   yarn build

4. Dry-run pack verification:
   npm pack --dry-run 2>&1
   Verify: no *.stories.* files, no __tests__/ dirs, no src/ raw TS, only lib/ contents.
   Warn if package size > 500KB.

For each command, report:
- Command: <the command>
- Status: PASS or FAIL
- Duration: <time taken>
- Output: <relevant output, especially errors>

Final summary:
- Lint: PASS/FAIL
- Test: PASS/FAIL
- Build: PASS/FAIL
- Pack dry-run: PASS/FAIL
- Overall: PASS/FAIL
```

Agent settings: `subagent_type: "shell"`

---

## Command Details

### 1. Format (Prettier)

```bash
# Component mode
npx prettier --write "src/<dir-name>/**/*.{ts,tsx}" "src/__tests__/<dir-name>.test.tsx" "docs/components/<dir-name>.md"

# Full mode (handled by yarn format)
yarn format
```

**What it checks:**
- Code formatting (indentation, spacing, quotes)
- Line length
- Trailing commas

**Common fixes:** Auto-fixed by `--write` flag.

### 2. Lint (ESLint)

```bash
# Component mode
npx eslint src/<dir-name>/ src/__tests__/<dir-name>.test.tsx --fix

# Full mode
yarn lint
```

**What it checks:**
- TypeScript errors
- React hooks rules
- React Native best practices
- Unused variables
- Explicit `any` types

**Common errors and fixes:**

| Error | Fix |
|-------|-----|
| `@typescript-eslint/no-explicit-any` | Use proper types |
| `@typescript-eslint/no-unused-vars` | Remove or use the variable |
| `react-hooks/exhaustive-deps` | Add missing dependencies to array |
| `react-native/no-inline-styles` | Move to StyleSheet.create |

### 3. Test (Jest)

```bash
# Component mode
yarn test -- --testPathPattern='<dir-name>'

# Full mode
yarn test
```

**What it checks:**
- All test files pass
- No runtime errors
- Assertions are correct

**Common failures:**

| Failure | Action |
|---------|--------|
| Test assertion failed | Fix the component (not the test) |
| Component throws error | Fix the component |
| Missing mock | Add mock to `src/__tests__/__mocks__/` |
| Timeout | Increase timeout or fix async logic |

### 4. Build (react-native-builder-bob)

```bash
yarn build
```

**What it checks:**
- TypeScript compilation succeeds
- All exports are valid
- No circular dependencies

**Common errors:**

| Error | Fix |
|-------|-----|
| Type error | Fix the TypeScript issue |
| Cannot find module | Check import paths |
| Circular dependency | Refactor to break the cycle |
| Missing export | Add to index.ts barrel |

---

## Failure Handling

When a step fails:

1. **Return the error output** to the master orchestrator
2. **Include context**: which file, which line, what the error says
3. **Do NOT proceed** to the next step
4. Master orchestrator will:
   - Read the error
   - Fix the source code
   - Re-run from the failed step (not from the beginning)

### Re-run Strategy

After fixing an error, re-run only the failed step and subsequent steps:

```
If format fails:  re-run format → lint → test → build
If lint fails:    re-run lint → test → build
If test fails:    re-run test → build
If build fails:   re-run build only
```

---

## Output Format

Return to master orchestrator:

```typescript
{
  passed: boolean,
  results: {
    storyFile?: { passed: boolean, output?: string },  // component mode only
    format: { passed: boolean, output?: string },
    lint: { passed: boolean, output?: string },
    test: { passed: boolean, output?: string },
    build: { passed: boolean, output?: string },
    packDryRun?: { passed: boolean, output?: string },  // full mode only
  },
  errors: string | null,
  failedStep: 'storyFile' | 'format' | 'lint' | 'test' | 'build' | 'packDryRun' | null
}
```

Example success (component mode):
```typescript
{
  passed: true,
  results: {
    storyFile: { passed: true },
    format: { passed: true },
    lint: { passed: true },
    test: { passed: true, output: 'Tests: 15 passed, 15 total' },
    build: { passed: true },
  },
  errors: null,
  failedStep: null
}
```

Example success (full/publish mode):
```typescript
{
  passed: true,
  results: {
    format: { passed: true },
    lint: { passed: true },
    test: { passed: true, output: 'Tests: 15 passed, 15 total' },
    build: { passed: true },
    packDryRun: { passed: true, output: 'Tarball: 45 files, 120KB' },
  },
  errors: null,
  failedStep: null
}
```
