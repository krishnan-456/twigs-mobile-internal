# Publish to npm

Run the full release workflow: quality gate, changeset management, version bump, build, dry-run pack verification, and publish to npm.

## Objective

Publish the `testing-twigs` package to npm with proper versioning, changelog, and verification.

## Workflow

1. **Read the publish skill** at `.cursor/skills/publish.md`.
2. Execute all steps in order. Do not skip any step.

### Step Summary

| Step | What | Command |
|------|------|---------|
| 1. Quality Gate | Run lint, test, build | `yarn lint && yarn test && yarn build` |
| 2. Changesets | Check for existing `.changeset/*.md` files; create if none | `ls .changeset/*.md` |
| 3. Version Bump | Consume changesets, bump version, update CHANGELOG | `npx changeset version` |
| 4. Build | Clean build with new version | `yarn build` |
| 4.5. Dry-Run Pack | Verify tarball contents -- no stories, tests, or src files | `npm pack --dry-run` |
| 5. Summary | Present release summary to user | -- |
| 6. Publish | **Wait for user confirmation**, then publish | `yarn release` |
| 7. Cleanup | Git tag, commit version bump | `git tag v<version>` |

## Safety Rules

- **NEVER** publish without explicit user confirmation at Step 6.
- **STOP** if `npm pack --dry-run` shows unexpected files (stories, tests, raw TypeScript).
- **WARN** if `CHANGELOG.md` already has an entry for the current `package.json` version.
- **WARN** if package size exceeds 500KB.

## Pre-Flight Checks (Quality Gate)

Before proceeding to changesets, verify all checks pass:

- `yarn lint` -- no lint errors
- `yarn test` -- all tests pass
- `yarn build` -- build succeeds
- `npm pack --dry-run` -- only `lib/` contents, no leaked files

## References

- `.cursor/skills/publish.md` -- full publish workflow with error recovery
- `.cursor/skills/quality-gate.md` -- quality gate commands and failure handling
- `.cursor/skills/master-orchestrator.md` -- publishing flow diagram
