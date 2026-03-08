---
name: master-orchestrator
description: >
  Main workflow controller for component creation, enhancement, and publishing.
  Routes to specialized skills based on the current phase.
  Use when user says "create <component>", "enhance <component>", or "publish".
---

# Master Orchestrator

This skill coordinates the full component lifecycle by delegating to specialized
skills. It tracks state, handles transitions, and ensures the workflow completes.

## Commands

| Trigger | Workflow |
|---------|----------|
| `create <component>` | Component Creation Workflow |
| `enhance <component>` | Component Enhancement Workflow |
| `publish` / `release` | Publishing Workflow |

## .cursor-Only Modification Mode

For workflow-maintenance requests (commands/skills/rules/agents updates):

- Restrict edits to `.cursor/` files only
- Do not modify `src/`, `docs/`, `lib/`, or runtime component code
- Keep existing quality gates unchanged unless explicitly requested
- Return changed `.cursor` files, phase diagram, and open maintainer decisions

## Environment Notes

- **Figma MCP and Cursor Figma plugin are pre-enabled.**
- Use existing Figma integrations only; do not introduce external MCP providers.

---

## Component Creation Workflow

When user says `create <component>`, execute these phases in order:

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT CREATION FLOW                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Phase 1: DISCOVER                                              │
│  ├── Read: .cursor/skills/discover-web-source.md                │
│  ├── Execute: Main agent + 2 parallel explore agents            │
│  └── Output: Discovery summary (web + figma + RN patterns)      │
│       │                                                         │
│       ▼                                                         │
│  Phase 2: FEASIBILITY                                           │
│  ├── Read: .cursor/skills/feasibility-check.md                  │
│  ├── Execute: Main agent (needs user interaction)               │
│  └── Output: Classification + decision to proceed               │
│       │                                                         │
│       ▼                                                         │
│  Phase 3: DESIGN RECONCILIATION                                 │
│  ├── Compare: Figma vs Twigs Web output                         │
│  ├── Apply: source-of-truth policy + reuse-first mapping        │
│  └── Output: resolved implementation spec + conflict log         │
│       │                                                         │
│       ▼                                                         │
│  Phase 4: IMPLEMENT                                             │
│  ├── Read: .cursor/skills/implement-component.md                │
│  ├── Execute: Main agent (file dependencies)                    │
│  └── Output: Component files created + wired to barrel          │
│       │                                                         │
│       ▼                                                         │
│  Phase 4.5: STORY                                               │
│  ├── Created by implement skill (step 5.5)                      │
│  ├── Execute: Main agent (needs component + types)              │
│  └── Output: src/<name>/<name>.stories.tsx with controls        │
│       │                                                         │
│       ▼                                                         │
│  Phase 5: TESTS                                                 │
│  ├── Read: .cursor/skills/write-tests.md                        │
│  ├── Launch: 1 generalPurpose agent                             │
│  └── Output: Test file at src/__tests__/<name>.test.tsx         │
│       │                                                         │
│       ▼                                                         │
│  Phase 6: DOCS                                                  │
│  ├── Read: .cursor/skills/write-docs.md                         │
│  ├── Launch: 1 generalPurpose agent                             │
│  └── Output: docs/components/<name>.md + getting-started update │
│       │                                                         │
│       ▼                                                         │
│  Phase 7: QUALITY GATE                                          │
│  ├── Read: .cursor/skills/quality-gate.md                       │
│  ├── Launch: 1 shell agent                                      │
│  └── Output: format ✓ lint ✓ test ✓ build ✓                     │
│       │                                                         │
│       ▼                                                         │
│  Phase 8: FINALIZE                                              │
│  ├── Run final checklist                                        │
│  └── Report to user                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Source of Truth Policy

When design and web sources disagree:

1. API/props/variants/accessibility/interaction behavior -> **Twigs Web wins**
2. Layout/spacing/sizing/visual structure -> **Figma wins** unless it breaks web behavior intent
3. Composition -> **reuse existing twigs-mobile components first**

### Phase Execution Rules

1. **Execute phases sequentially** — each phase depends on the previous.
2. **Read the skill file** at the start of each phase.
3. **Track state** between phases:
   - After Phase 1: Store `discoverySummary`, `webApiSummary`, `figmaDesignSummary`, `rnPatternRecommendation`
   - After Phase 2: Store `classification`, `deviations`, `depsNeeded`
   - After Phase 3: Store `comparisonTable`, `conflictLog`, `resolvedImplementationSpec`, `reusePlan`
   - After Phase 4: Store `filesCreated`, `propsInterface`
4. **Pass context forward** — each skill receives data from previous phases.
5. **Handle failures** — if a phase fails, fix and retry before proceeding.
6. **Stop-and-ask** — if `conflictLog` contains unresolved conflicts after Phase 3, stop and ask user before Phase 4.

### Parallel Execution Points

- **Phase 1**: Run Figma extraction on main agent + launch 2 explore agents simultaneously
- **Phase 4 + 4.5**: Story file is created at the end of Phase 4 (same agent)
- **Phase 5 + 6**: Can run in parallel (tests + docs are independent)
- All other phases: Sequential

### Design Reconciliation Output Template

Phase 3 must produce this exact structure:

1. **Discovery Summary**
2. **Figma vs Web Comparison**
3. **Reconciliation Notes**
4. **Reuse Plan**
5. **Implementation Plan**
6. **Validation Plan**

---

## Component Enhancement Workflow

When user says `enhance <component>`, use `.cursor/commands/enhance.md` as the
workflow contract and execute these phases in order:

1. Baseline audit of current mobile component API/behavior/tests/docs
2. Discover web + figma + RN patterns (same discovery inputs as create)
3. Feasibility + impact classification
4. Design reconciliation (current vs web vs figma)
5. Implement enhancement with backward-compatible defaults
6. Update tests with regression coverage + enhancement coverage
7. Update docs with "What's changed" notes
8. Run quality gate (format, lint, test, build)
9. Finalize with migration notes if any change is breaking

### Enhancement-Specific Rules

- Preserve existing public API by default.
- Stop and ask user before any breaking API/behavior change.
- Stop and ask user before introducing new dependencies.
- Keep existing stories/tests and extend them; do not replace coverage.

---

## Publishing Workflow

When user says `publish` or `release`:

```
┌─────────────────────────────────────────────────────────────────┐
│                      PUBLISHING FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1: QUALITY GATE                                           │
│  ├── Read: .cursor/skills/quality-gate.md                       │
│  └── Must pass: lint ✓ test ✓ build ✓                           │
│       │                                                         │
│       ▼                                                         │
│  Step 2-7: PUBLISH                                              │
│  ├── Read: .cursor/skills/publish.md                            │
│  └── Execute: release-it (version → changelog → build →         │
│       pack dry-run → publish)                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Context Object

Maintain a context object throughout the workflow:

```typescript
interface WorkflowContext {
  // Input
  workflow: 'create' | 'enhance' | 'publish';
  componentName: string;       // PascalCase: "Separator"
  dirName: string;             // kebab-case: "separator"
  workspacePath: string;       // absolute path
  
  // Phase 1 output (discover for create, baseline for enhance)
  baselineAudit?: {
    props: string[];
    variants: string[];
    accessibility: string[];
    testsCovered: string[];
    docsSections: string[];
  };
  discoverySummary?: string;
  webApiSummary?: {
    purpose: string;
    props: Array<{ name: string; type: string; default?: string }>;
    variants: string[];
    tokens: string[];
    accessibility: { role: string; states: string[] };
    dependencies: string[];
  };
  figmaDesignSummary?: {
    sourceNode?: string;
    layout: string[];
    spacing: string[];
    sizing: string[];
    visualNotes: string[];
  };
  rnPatternRecommendation?: {
    similarComponent: string;
    fileStructure: 'small' | 'medium' | 'large';
    patterns: string[];
  };
  
  // Phase 2 output
  classification?: 'pure-ui' | 'needs-rn-alt' | 'platform-adapt' | 'not-feasible';
  deviations?: string[];
  newDepsNeeded?: string[];
  compatibilityImpact?: 'non-breaking' | 'soft-breaking' | 'breaking';
  
  // Phase 3 output (Design Reconciliation)
  comparisonTable?: Array<{
    concern: string;
    figma: string;
    web: string;
    decision: 'figma' | 'web' | 'hybrid';
    rationale: string;
  }>;
  conflictLog?: Array<{ conflict: string; resolution?: string }>;
  resolvedImplementationSpec?: string;
  reusePlan?: Array<{ primitive: string; target: string; note?: string }>;
  breakingChanges?: string[];

  // Phase 4 + 4.5 output
  filesCreated?: string[];
  filesModified?: string[];
  propsInterface?: string;
  storyFileCreated?: boolean;
  
  // Phase 5-6 output
  testFileCreated?: boolean;
  docsFileCreated?: boolean;
  
  // Phase 7 output
  qualityGatePassed?: boolean;
  
  // Final / publish flow
  migrationNotes?: string[];
  releaseVersion?: string;
}
```

---

## Skill Invocation Pattern

When reading a skill, pass the current context:

```
"I am executing the <SKILL_NAME> skill.

Current context:
- Component: <componentName> (dir: <dirName>)
- Workspace: <workspacePath>
- Previous phase output: <relevant data>

Following the skill instructions now..."
```

---

## Error Recovery

| Error | Action |
|-------|--------|
| Phase 1 returns NOT_FOUND | Ask user: different name or new mobile-only component? |
| Phase 2 classifies as not-feasible | Tell user, propose fallback, get confirmation |
| Enhancement impact is `breaking` | Stop and ask user before implementation |
| Phase 3 has unresolved conflicts | Stop and ask user before implementation |
| Phase 4 implementation error | Fix code, retry |
| Phase 5 test failures | Read output, fix component (not test), retry |
| Phase 6 docs issue | Minor — fix and continue |
| Phase 7 quality gate fails | Read error, fix source, re-run failed step |

---

## Completion Report Template

For create runs, after all phases complete:

```
✅ Component <ComponentName> created successfully.

Files created:
  - src/<dir-name>/types.ts
  - src/<dir-name>/<dir-name>.tsx
  - src/<dir-name>/<dir-name>.stories.tsx
  - src/<dir-name>/index.ts
  - src/__tests__/<dir-name>.test.tsx
  - docs/components/<dir-name>.md
Files modified:
  - src/index.ts (added exports)
  - docs/getting-started.md (updated component table)

Quality gate: All passed
  - Format: ✓
  - Lint: ✓
  - Test: ✓
  - Build: ✓

Web parity: <Fully replicated / Deviations: list>
Design reconciliation: <Resolved spec summary / conflicts escalated>

Ready for your review.
```

For enhancement runs, report in this format:

```
✅ Component <ComponentName> enhanced successfully.

Files modified:
  - src/<dir-name>/<dir-name>.tsx
  - src/<dir-name>/types.ts (if props changed)
  - src/<dir-name>/<dir-name>.stories.tsx
  - src/__tests__/<dir-name>.test.tsx
  - docs/components/<dir-name>.md
  - src/index.ts (only if exports changed)

Compatibility impact: <non-breaking / soft-breaking / breaking>
Breaking changes approved: <yes/no>
Migration notes: <none or list>

Quality gate: All passed
  - Format: ✓
  - Lint: ✓
  - Test: ✓
  - Build: ✓

Ready for your review.
```
