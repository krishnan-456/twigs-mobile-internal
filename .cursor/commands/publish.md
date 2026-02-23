# Publish to npm

Run the full release workflow using `release-it`: quality gate, version bump, changelog generation, build, and publish to npm.

## Objective

Publish the `testing-twigs` package to npm with automated versioning and changelog.

## Workflow

1. **Read the publish skill** at `.cursor/skills/publish.md`.
2. Execute all steps in order. Do not skip any step.

### Step Summary

| Step | What | Command |
|------|------|---------|
| 1. Pre-Flight | Verify clean working directory on `main` | `git status` |
| 2. Dry Run | Preview version bump, changelog, hooks | `npm run release:dry` |
| 3. Release | **Wait for user confirmation**, then release | `npm run release` |
| 4. Post-Release | Push tags to remote, verify on npm | `git push origin main --follow-tags` |

## What `release-it` Does Automatically

1. Runs lint, test, build (pre-release hooks)
2. Prompts for semver bump (patch/minor/major)
3. Bumps `package.json` version
4. Generates `CHANGELOG.md` from conventional commits
5. Rebuilds with new version
6. Runs `npm pack --dry-run`
7. Creates git commit + tag
8. Publishes to npm

## Safety Rules

- **NEVER** release without running dry-run first (Step 2).
- **NEVER** release without explicit user confirmation at Step 3.
- **ALWAYS** verify the working directory is clean before starting.
- **WARN** if not on `main` branch.

## Conventional Commits

For changelog generation, commit messages should follow the format:
- `feat: <description>` -- new features (appears in changelog)
- `fix: <description>` -- bug fixes (appears in changelog)
- `chore: <description>` -- maintenance (hidden from changelog)

## References

- `.cursor/skills/publish.md` -- full workflow with error recovery
- `.release-it.json` -- release-it configuration
