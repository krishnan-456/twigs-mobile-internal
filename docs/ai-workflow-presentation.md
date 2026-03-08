# AI-Powered Component Library Workflow

How we turned Cursor into an autonomous component factory that evaluates Figma designs, cross-references a web library for props and accessibility, generates production code, and self-validates -- all from a single slash command.

---

## The Problem

Building a React Native component library based on Figma designs -- using the web design system ([@sparrowengg/twigs-react](https://github.com/surveysparrow/twigs)) as a secondary reference for API and accessibility -- involves a painful, repetitive cycle:

1. **Figma interpretation overhead** -- Every new mobile component starts with a Figma design. Developers must manually extract measurements, spacing, sizing, colors, and layout constraints from Figma nodes and translate them into React Native styles.
2. **Web cross-referencing for API parity** -- After understanding the visual design, developers then read the web counterpart's source code to extract props interfaces, variant names, accessibility roles, and interaction patterns. These two sources rarely align perfectly.
3. **Figma-to-code drift** -- Even with Figma as the primary source, subtle spacing, color, and sizing mismatches accumulate when developers interpret specs by hand.
4. **Convention fatigue** -- The library has strict conventions (theme tokens only, forwardRef + displayName, accessibility roles, barrel exports, style override order). Developers forget at least one per component. Reviewers catch them days later.
5. **Multi-file boilerplate** -- Each component requires 7-9 coordinated files (types, component, stories, tests, docs, barrel exports, root index). Missing any one breaks the build or the consumer API.
6. **Inconsistent quality** -- Accessibility, test coverage, and documentation completeness vary wildly between components based on who wrote them and how rushed they were.

**The core tension:** Figma is the visual source of truth, the web library is the API/accessibility source of truth, and developers must reconcile both while remembering 25+ rules across 9 files for every single component.

---

## The Solution: An AI Agent Harness Inside Cursor

Instead of writing components manually and hoping developers remember every rule, we built a **multi-layered agent system** inside Cursor that:

- **Evaluates the Figma component first** -- extracts measurements, spacing, sizing, layout, and visual structure via MCP
- **Cross-references the web library second** -- reads props interfaces, variant definitions, and accessibility patterns from local source
- Reconciles both sources using a clear priority policy (Figma for measurements, web for props/a11y)
- Generates all component files following strict conventions
- Self-validates with automated hooks and quality gates
- Produces documentation and tests in parallel

The developer's job shifts from *manually interpreting Figma and cross-referencing web code* to *reviewing AI output and making design decisions*.

---

## AI Stack (The Agent Harness)

### Core IDE

**Cursor** -- AI-native code editor (fork of VS Code) that provides:
- Agent mode with tool access (file read/write, terminal, search)
- Sub-agent spawning (parallel task execution)
- Hooks system (post-edit automation)
- Slash commands (workflow entry points)
- Custom rules/skills/agents (persistent AI context)

### Model

**Claude** (Anthropic) -- via Cursor's agent mode. Different models for different tasks:
- Full model for orchestration, implementation, and design decisions
- Fast model for parallelized subtasks (tests, docs, shell commands)

### External Integrations

**Custom MCP Server (twigs-ai-mcp)** -- Model Context Protocol server that bridges Figma and the Twigs design system:

| Tool | Purpose |
|------|---------|
| `get_figma_json` | Fetches structured UI spec from a Figma node (layout, hierarchy, constraints, styles, typography) |
| `get_figma_screenshot` | Returns a visual screenshot of a Figma node for visual comparison |
| `get_twigs_components_list` | Lists all available Twigs design system components |
| `get_twigs_guidelines` | Retrieves design system principles and usage patterns |
| `get_twigs_component_docs` | Fetches documentation for a specific Twigs component |
| `download_figma_images` | Downloads SVG/PNG assets from Figma by node ID |

### Local Multi-Workspace Setup

The Cursor workspace includes both the **mobile library** and the **web library** checked out locally. The AI reads the web source directly from the filesystem -- no API calls, no GitHub fetching, no stale documentation.

```
workspace/
  twigs-mobile/     <-- React Native library (the project)
  twigs/            <-- Web library (read-only reference)
```

---

## Architecture: The Five Layers

```
┌─────────────────────────────────────────────────────┐
│  Layer 5: SLASH COMMANDS  (user entry points)       │
│  /create <component>  /enhance <component>  /publish│
├─────────────────────────────────────────────────────┤
│  Layer 4: SKILLS  (phase-specific workflows)        │
│  master-orchestrator, discover, feasibility,        │
│  implement, write-tests, write-docs, quality-gate   │
├─────────────────────────────────────────────────────┤
│  Layer 3: RULES  (always-on constraints)            │
│  project conventions, common pitfalls, a11y,        │
│  web-library-reference, MCP integration rules       │
├─────────────────────────────────────────────────────┤
│  Layer 2: AGENTS  (specialized sub-agents)          │
│  web-source-analyzer, code-reviewer                 │
├─────────────────────────────────────────────────────┤
│  Layer 1: HOOKS  (post-edit automated checks)       │
│  format, hardcoded-colors, displayName, a11y-role,  │
│  barrel-export                                      │
└─────────────────────────────────────────────────────┘
```

### Layer 1: Hooks (Automated Post-Edit Guardrails)

Shell scripts that run automatically **every time the AI (or human) edits a file**. They catch the most common mistakes instantly, before the code even reaches review.

| Hook | Trigger | What It Catches |
|------|---------|-----------------|
| `format.sh` | Any `.ts`/`.tsx` edit | Runs Prettier automatically |
| `check-hardcoded-colors.sh` | Any `.tsx` edit | Hardcoded hex colors (`#00828D`) instead of `theme.colors.*` |
| `check-displayname.sh` | Any `.tsx` edit | `React.forwardRef` used without `.displayName` |
| `check-a11y-role.sh` | Any `.tsx` edit | `<Pressable>` without `accessibilityRole`; deprecated `TouchableOpacity` |
| `check-barrel-export.sh` | Any `index.ts` edit | Component folder exists but isn't exported from root `src/index.ts` |

**Why this matters:** These hooks enforce rules *on the AI itself*. The AI sees the warning output and self-corrects before moving to the next step.

### Layer 2: Agents (Specialized Sub-Agents)

Pre-configured agent personas that can be spawned as sub-agents for parallel work:

| Agent | Mode | Purpose |
|-------|------|---------|
| `web-source-analyzer` | Read-only | Extracts the complete API surface (props, variants, tokens, accessibility, composition) from the web library source code |
| `code-reviewer` | Read-only | Audits generated code against all 25 project conventions and known pitfalls |

### Layer 3: Rules (Always-On Constraints)

Markdown files that are automatically injected into the AI's context. The AI reads these before every action and treats them as hard constraints.

| Rule | Scope | What It Enforces |
|------|-------|-----------------|
| `project-overview.mdc` | All files | Folder layout, file naming, theme system, animation library, build config, accessibility requirements |
| `common-pitfalls.mdc` | `src/**` | 25 documented anti-patterns with wrong/correct code examples (hardcoded colors, missing forwardRef, wrong a11y states, inline styles, etc.) |
| `web-library-reference.mdc` | `src/**` | How to cross-reference the web library, Stitches-to-StyleSheet token mapping, CSS-to-RN property translation |
| `dev-rules.mdc` | All files | TypeScript standards, naming conventions, performance patterns |
| `a11y-rule.mdc` | All files | Every button needs aria-label, every clickable element needs testID |
| `twigs-ai-mcp.mdc` | Figma flows | Required MCP tool call sequence, source-of-truth policy, reconciliation requirements |
| `component-commands.mdc` | Workflow | Sub-agent strategy, feasibility decision tree, quality gate checklist |

### Layer 4: Skills (Phase-Specific Workflows)

Detailed procedural instructions for each phase of component creation. Each skill is a markdown file that the orchestrator reads and follows step-by-step.

| Skill | Phase | What It Does |
|-------|-------|-------------|
| `master-orchestrator.md` | All | Routes between phases, tracks state via a typed context object, handles error recovery |
| `discover-web-source.md` | 1 | Extracts Figma design spec (measurements, layout) first, then launches parallel agents for web API/a11y + RN patterns |
| `feasibility-check.md` | 2 | Classifies component (pure-ui / needs-rn-alt / platform-adapt / not-feasible), vets dependencies |
| `implement-component.md` | 4 | Generates types.ts, component.tsx, index.ts, stories.tsx following all conventions |
| `write-tests.md` | 5 | Generates test file covering 5 areas: render, variants, accessibility, interaction, state transitions |
| `write-docs.md` | 6 | Generates component documentation with props table, usage examples, accessibility notes |
| `quality-gate.md` | 7 | Runs format, lint, test, build -- fixes any failures and re-runs |

### Layer 5: Slash Commands (User Entry Points)

The developer types a single command. Everything else is automated.

| Command | What Happens |
|---------|-------------|
| `/create Tooltip` | Full 8-phase workflow: evaluate Figma design first, cross-reference web for props/a11y, feasibility check, design reconciliation, implement all files, generate tests + docs in parallel, run quality gate |
| `/enhance Checkbox` | 9-phase workflow: baseline audit of existing code, discover improvements from web/Figma, implement backward-compatible changes, update tests + docs, quality gate |
| `/publish` | Quality gate + release-it (version bump, changelog, build, npm publish) |

---

## How `/create` Works End-to-End

Here's what happens when a developer types `/create Tooltip`:

```
Phase 1: DISCOVER (Figma-first)
├── [Main Agent]   Extracts Figma design spec via MCP (JSON + screenshot)
│   └── Returns: measurements, spacing, sizing, colors, layout, typography
├── [Explore Agent A]  Reads web tooltip source for props & accessibility
│   └── Returns: props interface, variant names, a11y roles/states, interaction patterns
└── [Explore Agent B]  Analyzes existing mobile components for reuse patterns
    └── Returns: similar component, file structure, primitive mapping

Phase 2: FEASIBILITY
└── [Main Agent]  Classifies as "needs-rn-alt" (tooltip needs absolute positioning)
    ├── Identifies @floating-ui/react-native as the RN approach
    ├── Vets the package (recency, downloads, RN compat, maintenance)
    └── Asks user for confirmation if new dependency needed

Phase 3: DESIGN RECONCILIATION (Figma-first)
└── [Main Agent]  Produces comparison table:
    ├── Figma measurements as baseline: spacing, sizing, radii, typography
    ├── Web props/a11y overlay: maps web API surface onto Figma structure
    ├── Conflict resolution: Figma wins for measurements, web wins for props/a11y
    ├── Reuse plan: which existing mobile primitives to compose
    └── Stops and asks user if unresolved conflicts remain

Phase 4: IMPLEMENT
└── [Main Agent]  Creates files sequentially (dependency order):
    ├── src/tooltip/types.ts       (props interface)
    ├── src/tooltip/tooltip.tsx     (component with forwardRef)
    ├── src/tooltip/constants.ts    (size configs)
    ├── src/tooltip/index.ts        (barrel exports)
    ├── src/tooltip/tooltip.stories.tsx  (interactive Storybook story)
    ├── src/index.ts               (add root exports, alphabetical)
    │
    │   [Hooks fire after each file edit]
    │   ├── format.sh → auto-formats
    │   ├── check-hardcoded-colors.sh → warns if hex found
    │   ├── check-displayname.sh → warns if missing
    │   ├── check-a11y-role.sh → warns if Pressable lacks role
    │   └── check-barrel-export.sh → warns if not in root index

Phase 5+6: TESTS + DOCS (parallel)
├── [GeneralPurpose Agent C]  Writes src/__tests__/tooltip.test.tsx
│   └── Covers: render, variants, accessibility, interaction, state transitions
└── [GeneralPurpose Agent D]  Writes docs/components/tooltip.md
    └── Covers: props table, usage examples, a11y notes, mobile deviations

Phase 7: QUALITY GATE
└── [Shell Agent]  Runs sequentially:
    ├── npm run format   (Prettier)
    ├── npm run lint     (ESLint)
    ├── npm test         (Jest + Testing Library)
    └── npm run build    (react-native-builder-bob)
    If any step fails → reads error → fixes source → re-runs

Phase 8: FINALIZE
└── [Main Agent]  Reports completion with file list and quality gate results
```

**Total: 8 phases, up to 5 parallel agents, 7-9 files created, 25+ conventions enforced, 5 hooks firing continuously.**

---

## Source of Truth Policy

We don't mirror the web component directly. Instead, the **Figma component is the primary source** -- it defines what the mobile component looks like and how it's measured. The **web component is the secondary source** -- it provides the prop API surface and accessibility patterns. When these sources disagree (which happens often), the system follows a deterministic resolution policy:

### Priority 1: Figma (Visual Design & Measurements)

| Concern | Source | Rationale |
|---------|--------|-----------|
| Layout / Spacing / Sizing | **Figma** | Figma designs are optimized for mobile viewport and touch targets |
| Visual structure / Hierarchy | **Figma** | The design defines what the component looks like |
| Typography / Font sizes | **Figma** | Designers specify mobile-appropriate text sizing |
| Color tokens / Visual states | **Figma** | Visual design drives the look-and-feel |
| Border radii / Dimensions | **Figma** | Measurements come from the design, not web CSS |

### Priority 2: Web Library (Props & Accessibility)

| Concern | Source | Rationale |
|---------|--------|-----------|
| API / Props / Variants | **Web library** | Consumers expect API parity between web and mobile |
| Accessibility / ARIA roles | **Web library** | A11y semantics must be consistent across platforms |
| Interaction behavior | **Web library** | Behavioral contracts shouldn't diverge |
| Prop naming / Type signatures | **Web library** | Consistent developer experience across platforms |
| Composition | Reuse mobile primitives | Don't recreate what already exists |

### When They Conflict

- **Measurements differ** (e.g., Figma says 8px padding, web uses 12px) → **Figma wins**. The mobile design is intentionally different.
- **Prop names differ** (e.g., Figma labels vs web prop names) → **Web wins**. API consistency matters more.
- **A variant exists in web but not Figma** → Include the variant with web's behavior, but flag it for design review.
- **A variant exists in Figma but not web** → Include it as a mobile-specific variant with `// Mobile deviation: <reason>`.
- **Unresolvable conflict** → The system **stops and asks the developer** before writing any code.

---

## Measurable Impact

### Before (Manual Component Creation)

| Metric | Value |
|--------|-------|
| Time per component (code + tests + docs + story) | 4-6 hours |
| Convention violations caught in PR review | 3-5 per component |
| Files forgotten (missing exports, docs, stories) | 1-2 per component |
| Accessibility gaps found post-merge | Frequent |
| Web parity drift (prop naming, token usage) | Gradual, hard to catch |

### After (AI-Assisted Workflow)

| Metric | Value |
|--------|-------|
| Time per component (review + approval) | 30-60 minutes |
| Convention violations at PR time | 0 (hooks + quality gate catch everything) |
| Files forgotten | 0 (orchestrator tracks all 9 required artifacts) |
| Accessibility gaps | 0 (rules + hooks + dedicated test coverage) |
| Web parity | Verified automatically against local source |

### Specific Wins

- **22 components** built with this workflow, all passing the same quality bar
- **Zero hardcoded colors** in the entire codebase (hook catches them on every edit)
- **100% accessibility coverage** -- every interactive component has role, state, label, and hint
- **Parallel test + doc generation** saves ~40% of the total workflow time
- **Self-healing quality gate** -- if lint or test fails, the AI reads the error, fixes the code, and re-runs

---

## How to Adapt This for Your Project

This architecture is not Twigs-specific. The pattern works for any project where AI needs to produce code that meets strict, repeatable standards.

### Step 1: Identify Your Conventions

What are the rules your team already has (or wishes it had) that people forget?

- File naming conventions
- Required patterns (e.g., forwardRef, error boundaries, logging)
- Import restrictions (e.g., no importing from internals)
- Style conventions (e.g., all colors from theme, no inline styles)
- A11y requirements

Write each as a rule file in `.cursor/rules/`. Use `alwaysApply: true` for universal rules, or `globs` for file-specific rules.

### Step 2: Document Your Anti-Patterns

What mistakes does your team make repeatedly? Create a `common-pitfalls.mdc` with:
- The wrong pattern (exact code)
- The correct pattern (exact code)
- Why it matters

The AI reads this before every edit and avoids these patterns proactively.

### Step 3: Add Hooks for Your Top 3 Mistakes

Write simple shell scripts that grep for known bad patterns. They run after every file edit and give the AI (and developers) instant feedback.

```json
{
  "version": 1,
  "hooks": {
    "afterFileEdit": [
      {
        "command": ".cursor/hooks/your-check.sh",
        "matcher": "\\.tsx?$"
      }
    ]
  }
}
```

### Step 4: Build Skills for Repetitive Workflows

If you have a multi-step process that's always the same (e.g., "create API endpoint", "add database migration", "build new page"), encode it as a skill with:
- Input requirements
- Step-by-step execution instructions
- Output format
- Error handling

### Step 5: Create Slash Commands as Entry Points

Wrap your skills in slash commands so developers can trigger complex workflows with a single command:

```
/create <component>    -- runs the full creation pipeline
/enhance <component>   -- runs the enhancement pipeline
/publish               -- runs quality gate + release
```

### Step 6: Connect External Data Sources via MCP

If your workflow needs external data (Figma, Jira, Confluence, Storybook, etc.), set up an MCP server. The AI can then fetch structured data during workflow execution instead of relying on screenshots or copy-paste.

---

## Key Design Decisions

### Why rules, not prompts?

Rules persist across conversations. A prompt is forgotten after the chat ends. Rules ensure every AI interaction follows the same standards, regardless of which developer is prompting.

### Why hooks, not just rules?

Rules are advisory -- the AI *should* follow them but sometimes doesn't. Hooks are enforcement -- they run automatically and produce visible warnings that the AI self-corrects on. Hooks catch the 20% of mistakes that rules miss.

### Why sub-agents instead of one big prompt?

Parallelism and specialization. A test-writing agent doesn't need the full implementation context. A doc-writing agent doesn't need to know about Figma. Splitting work across agents lets us:
- Run tests + docs generation in parallel
- Use faster/cheaper models for mechanical tasks
- Keep each agent's context focused and accurate

### Why Figma first, web second?

Figma designs are the designer's intent for mobile -- they account for touch targets, mobile viewport constraints, and platform-specific visual patterns. The web component was designed for mouse/keyboard interactions and desktop viewports. We take the **visual spec from Figma** (measurements, spacing, sizing, layout) and the **behavioral spec from the web library** (props API, accessibility roles, interaction contracts). This gives us components that look right on mobile and behave consistently with the web platform.

### Why local web source instead of documentation?

Documentation is often stale. Source code is always current. By mounting the web library locally, the AI reads the actual props interface, actual token usage, and actual accessibility patterns -- not what someone wrote in a README six months ago.

### Why a stop-and-ask policy?

The AI should automate mechanical decisions but escalate architectural ones. When Figma says "8px padding" but the web library says "12px", the AI can follow the resolution policy. But when a component requires a new npm dependency or a breaking API change, the human decides.

---

## Tech Stack Summary

| Layer | Technology | Role |
|-------|-----------|------|
| IDE | Cursor | Agent mode, hooks, slash commands, rules, skills |
| AI Model | Claude (Anthropic) | Code generation, analysis, decision-making |
| MCP Server | Custom (twigs-ai-mcp) | Figma extraction, design system data |
| Design Tool | Figma | Primary source: measurements, layout, spacing, visual structure, assets |
| Web Reference | Local twigs-react checkout | Secondary source: props API, accessibility, interaction behavior |
| Animation | react-native-reanimated | All animations (enforced by rules) |
| Testing | Jest + Testing Library/RN | Component testing |
| Storybook | @storybook/react-native | Interactive component browsing |
| Build | react-native-builder-bob | Library compilation |
| Release | release-it | Version, changelog, npm publish |
| Formatting | Prettier | Auto-format via hooks |
| Linting | ESLint | Code quality enforcement |

---

## File Structure Reference

```
.cursor/
├── commands/                    # Slash command entry points
│   ├── create.md               # /create <component>
│   ├── enhance.md              # /enhance <component>
│   └── publish.md              # /publish
├── skills/                      # Phase-specific workflow instructions
│   ├── master-orchestrator.md   # Routes between all phases
│   ├── discover-web-source.md   # Phase 1: Figma-first discovery + web API/a11y
│   ├── feasibility-check.md     # Phase 2: RN feasibility classification
│   ├── implement-component.md   # Phase 4: Code generation
│   ├── write-tests.md           # Phase 5: Test generation
│   ├── write-docs.md            # Phase 6: Documentation generation
│   ├── quality-gate.md          # Phase 7: Format/lint/test/build
│   └── publish.md               # Release workflow
├── agents/                      # Specialized sub-agent personas
│   ├── web-source-analyzer.md   # Extracts API from web library
│   └── code-reviewer.md         # Audits code against conventions
├── rules/                       # Always-on constraints
│   ├── project-overview.mdc     # Core project conventions
│   ├── common-pitfalls.mdc      # 25 documented anti-patterns
│   ├── web-library-reference.mdc# Web parity + token mapping
│   ├── dev-rules.mdc            # TypeScript/RN coding standards
│   ├── a11y-rule.mdc            # Accessibility requirements
│   ├── component-commands.mdc   # Sub-agent strategy + quality gate
│   └── twigs-ai-mcp.mdc        # Figma MCP integration rules
├── hooks/                       # Post-edit automated checks
│   ├── format.sh                # Auto-format with Prettier
│   ├── check-hardcoded-colors.sh# Catch theme violations
│   ├── check-displayname.sh     # Catch missing displayName
│   ├── check-a11y-role.sh       # Catch missing a11y roles
│   └── check-barrel-export.sh   # Catch missing exports
└── hooks.json                   # Hook configuration
```

---

## TL;DR

We built a 5-layer AI agent system inside Cursor that turns component creation from a 4-6 hour manual process into a 30-60 minute review process. The system evaluates the **Figma design first** for measurements and visual structure, then cross-references the **web library for props and accessibility**. It enforces 25+ conventions through rules and hooks, generates all required files in parallel, and self-validates before presenting the result.

The key insight: we're not mirroring the web component -- we're building a mobile component that looks like the Figma design and behaves like the web component.

The pattern is generic: **Rules** (what to follow) + **Pitfalls** (what to avoid) + **Hooks** (automated enforcement) + **Skills** (procedural workflows) + **Commands** (user entry points). Any team can adapt this for their own conventions and workflows.
