---
name: publish
description: >
  Handle version bumping, changelog updates, and npm publishing using release-it.
---

# Publish

This skill handles the release workflow using **release-it** for automated version
management, changelog generation, and npm publishing.

## Tool: release-it

`release-it` automates the entire release lifecycle:
- Interactive prompt to pick semver bump (patch / minor / major)
- Bumps `version` in `package.json`
- Auto-generates `CHANGELOG.md` from conventional commits (via `@release-it/conventional-changelog`)
- Runs pre-release hooks (lint, test, build, pack dry-run)
- Publishes to npm (`--access public`)
- Creates git commit + annotated tag (`v<version>`)

Config: `.release-it.json`

## Conventional Commit Format

For changelog auto-generation, commit messages should follow
[Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Tooltip component
fix: CircleLoader not spinning on Android
perf: memoize button style calculations
refactor: extract loader constants
docs: update getting-started guide
chore: update dev dependencies
```

Commits prefixed with `feat` and `fix` appear in the changelog.
`chore`, `style`, `test`, `ci` are hidden.

---

## Workflow Steps

### Step 1 — Pre-Flight Check

Verify the working directory is clean and on `main`:

```bash
git status
git branch --show-current
```

If there are uncommitted changes, commit or stash them first.
`release-it` requires a clean working directory (`requireCleanWorkingDir: true`).

### Step 2 — Dry Run

Always run a dry run first to preview the release:

```bash
npm run release:dry
```

This shows:
- What version will be bumped to
- What changelog entries will be generated
- What hooks will run
- What will be published

Review the output with the user before proceeding.

### Step 3 — Release (User Confirmation Required)

**WAIT for explicit user confirmation.**

Only after user confirms:

```bash
npm run release
```

`release-it` will interactively:
1. Run lint, test, build (before:init hooks)
2. Prompt for version bump (patch/minor/major)
3. Bump `package.json` version
4. Update `CHANGELOG.md`
5. Rebuild with new version (after:bump hook)
6. Run `npm pack --dry-run` (before:release hook)
7. Create git commit: `chore: release v<version>`
8. Create git tag: `v<version>`
9. Publish to npm

### Step 4 — Post-Release

After successful publish:

1. Verify the tag was created:
   ```bash
   git tag -l 'v*' | tail -5
   ```

2. Push to remote (release-it does NOT auto-push by default):
   ```bash
   git push origin main --follow-tags
   ```

3. Verify on npm:
   ```bash
   npm view testing-twigs version
   ```

---

## Error Recovery

### Hooks fail (lint/test/build)
- `release-it` aborts before any version change
- Fix the issue, then re-run `npm run release`

### Publish fails (network/auth)
- Version is already bumped in `package.json` and tagged
- Fix auth: `npm login`
- Re-publish: `npm publish --access public`

### Wrong version bumped
- If NOT published yet: `git reset --hard HEAD~1 && git tag -d v<version>`
- If already published: publish a new corrected version

### Need to skip hooks
- Emergency release: `npx release-it --no-hooks`
- Skip only git: `npx release-it --no-git`

---

## Semver Policy

- **Pre-1.0 (current):** Minor = new features or breaking changes, Patch = bug fixes
- **Post-1.0:** Follow strict semver -- Major = breaking, Minor = features, Patch = fixes
