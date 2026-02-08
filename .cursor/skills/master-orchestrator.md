---
name: master-orchestrator
description: >
  Main workflow controller for component creation and publishing.
  Routes to specialized skills based on the current phase.
  Use when user says "create <component>" or "publish".
---

# Master Orchestrator

This skill coordinates the full component lifecycle by delegating to specialized
skills. It tracks state, handles transitions, and ensures the workflow completes.

## Commands

| Trigger | Workflow |
|---------|----------|
| `create <component>` | Component Creation Workflow |
| `publish` / `release` | Publishing Workflow |

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
│  ├── Launch: 2 parallel explore agents                          │
│  └── Output: Web API extraction + RN pattern recommendation     │
│       │                                                         │
│       ▼                                                         │
│  Phase 2: FEASIBILITY                                           │
│  ├── Read: .cursor/skills/feasibility-check.md                  │
│  ├── Execute: Main agent (needs user interaction)               │
│  └── Output: Classification + decision to proceed               │
│       │                                                         │
│       ▼                                                         │
│  Phase 3: IMPLEMENT                                             │
│  ├── Read: .cursor/skills/implement-component.md                │
│  ├── Execute: Main agent (file dependencies)                    │
│  └── Output: Component files created + wired to barrel          │
│       │                                                         │
│       ▼                                                         │
│  Phase 4: TESTS                                                 │
│  ├── Read: .cursor/skills/write-tests.md                        │
│  ├── Launch: 1 generalPurpose agent                             │
│  └── Output: Test file at src/__tests__/<name>.test.tsx         │
│       │                                                         │
│       ▼                                                         │
│  Phase 5: DOCS                                                  │
│  ├── Read: .cursor/skills/write-docs.md                         │
│  ├── Launch: 1 generalPurpose agent                             │
│  └── Output: docs/components/<name>.md + getting-started update │
│       │                                                         │
│       ▼                                                         │
│  Phase 6: QUALITY GATE                                          │
│  ├── Read: .cursor/skills/quality-gate.md                       │
│  ├── Launch: 1 shell agent                                      │
│  └── Output: format ✓ lint ✓ test ✓ build ✓                     │
│       │                                                         │
│       ▼                                                         │
│  Phase 7: FINALIZE                                              │
│  ├── Create changeset                                           │
│  ├── Run final checklist                                        │
│  └── Report to user                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Phase Execution Rules

1. **Execute phases sequentially** — each phase depends on the previous.
2. **Read the skill file** at the start of each phase.
3. **Track state** between phases:
   - After Phase 1: Store `webApiSummary`, `rnPatternRecommendation`
   - After Phase 2: Store `classification`, `deviations`, `depsNeeded`
   - After Phase 3: Store `filesCreated`, `propsInterface`
4. **Pass context forward** — each skill receives data from previous phases.
5. **Handle failures** — if a phase fails, fix and retry before proceeding.

### Parallel Execution Points

- **Phase 1**: Launch 2 explore agents simultaneously
- **Phase 4 + 5**: Can run in parallel (tests + docs are independent)
- All other phases: Sequential

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
│  └── Execute: changeset → version → build → publish             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Context Object

Maintain a context object throughout the workflow:

```typescript
interface WorkflowContext {
  // Input
  componentName: string;       // PascalCase: "Separator"
  dirName: string;             // kebab-case: "separator"
  workspacePath: string;       // absolute path
  
  // Phase 1 output
  webApiSummary?: {
    purpose: string;
    props: Array<{ name: string; type: string; default?: string }>;
    variants: string[];
    tokens: string[];
    accessibility: { role: string; states: string[] };
    dependencies: string[];
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
  
  // Phase 3 output
  filesCreated?: string[];
  propsInterface?: string;
  
  // Phase 4-5 output
  testFileCreated?: boolean;
  docsFileCreated?: boolean;
  
  // Phase 6 output
  qualityGatePassed?: boolean;
  
  // Final
  changesetId?: string;
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
| Phase 3 implementation error | Fix code, retry |
| Phase 4 test failures | Read output, fix component (not test), retry |
| Phase 5 docs issue | Minor — fix and continue |
| Phase 6 quality gate fails | Read error, fix source, re-run failed step |

---

## Completion Report Template

After all phases complete:

```
✅ Component <ComponentName> created successfully.

Files created:
  - src/<dir-name>/types.ts
  - src/<dir-name>/<dir-name>.tsx
  - src/<dir-name>/index.ts
  - src/__tests__/<dir-name>.test.tsx
  - docs/components/<dir-name>.md
  - .changeset/<id>.md

Files modified:
  - src/index.ts (added exports)
  - docs/getting-started.md (updated component table)

Quality gate: All passed
  - Format: ✓
  - Lint: ✓
  - Test: ✓
  - Build: ✓

Web parity: <Fully replicated / Deviations: list>

Ready for your review.
```
