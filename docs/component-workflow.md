# Component Workflow

This document describes the automated workflow for creating and publishing components in Twigs Mobile.

## Overview

Twigs Mobile replicates components from the Twigs Web React library into React Native. Two Cursor chat commands drive the lifecycle:

- `create <component>` - discovers the web component, replicates it in RN, adds docs + tests, runs format/lint/test/build.
- `publish <component>` - runs the release checklist, creates a changeset, bumps the version, updates the changelog, and publishes to npm.

## Create Workflow

When you type `create <component>` in Cursor chat:

1. Discover - The agent fetches the Twigs Web component source from GitHub.
2. Feasibility check - Classifies the component and asks for guidance if needed.
3. Dependency vetting - If a new npm package is required, the agent verifies recency, popularity, RN compatibility, and maintenance.
4. Implement - Creates the component in `src/<component>/` following project conventions.
5. Wire exports - Adds exports to `src/<component>/index.ts` and `src/index.ts`.
6. Document - Creates `docs/components/<component>.md`.
7. Test - Creates `src/__tests__/<component>.test.tsx` covering render, variants, accessibility, interaction, and state transitions.
8. Quality gate - Runs `yarn format`, `yarn lint:fix`, `yarn test`, `yarn build`.

## Publish Workflow

When you type `publish <component>` in Cursor chat:

1. Verify - Confirms the component exists and is exported.
2. Quality gate - Runs format, lint, test, build.
3. Verify exports - Checks barrel files and build output.
4. Verify docs - Ensures `docs/components/<component>.md` is present.
5. Verify tests - Runs component-specific tests.
6. Changeset - Creates a changeset with appropriate semver level.
7. Version - Bumps version and updates CHANGELOG.md.
8. Publish - Runs `yarn release` to build and publish to npm.

## Component Documentation Convention

Each component gets a documentation file at: `docs/components/<component-name>.md`

The file includes:
- Component name and brief description
- Web Reference (source path and docs URL)
- Props table (prop, type, default, description)
- Variants description
- Mobile Deviations from web component
- Usage code example

## Dependency Vetting

When a component needs a new npm package, verify:

1. Last published within 12 months
2. Weekly downloads >= 10,000
3. React Native compatible - no DOM assumptions
4. Actively maintained - recent commits, issues triaged
5. Bundle size - reasonable for mobile, no bloated web-only deps

If a package fails any check, an RN-native alternative is proposed or the user is asked for a decision.

## Related Files

- `.cursor/rules/component-commands.mdc` - Protocol definition
- `.cursor/rules/project-overview.mdc` - Project conventions
- `.cursor/rules/web-library-reference.mdc` - Web cross-reference rules
- `.cursor/rules/dev-rules.mdc` - Coding standards
- `.cursor/skills/create-component/SKILL.md` - Detailed create steps
- `.cursor/skills/publish-component/SKILL.md` - Detailed publish steps
