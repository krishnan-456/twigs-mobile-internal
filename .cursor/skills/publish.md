---
name: publish
description: >
  Handle changeset management, version bumping, and npm publishing.
  Called by master-orchestrator for the publish workflow.
---

# Publish

This skill handles the release workflow: changeset management, version bumping,
changelog generation, and publishing to npm.

## Input

From master orchestrator:
- `workspacePath`: absolute path to project root
- `qualityGatePassed`: must be true before proceeding

## Output

Return to master orchestrator:
- `published`: boolean
- `version`: the new version string
- `changelog`: the new changelog entry

---

## Workflow Steps

### Step 1 — Check Prerequisites

Verify quality gate has passed. If not, abort and tell master to run quality-gate first.

### Step 2 — Check for Existing Changesets

List changeset files:

```bash
ls .changeset/*.md 2>/dev/null | grep -v README.md | grep -v config.json
```

**If changesets exist:**
- Read each file to understand what's being released
- Show summary to user:
  ```
  Found <N> changeset(s):
  - <filename>: <package> <level> — <description>
  ```
- Proceed to Step 3

**If NO changesets exist:**
- Ask user what type of release:
  ```
  No changesets found. What type of release is this?
  - patch: Bug fixes, minor improvements
  - minor: New components, new features  
  - major: Breaking API changes
  ```
- After user responds, create changeset:
  ```
  .changeset/<random-8-chars>.md
  ---
  "testing-twigs": <level>
  ---
  
  <Description of changes>
  ```

### Step 3 — Version Bump

Run changeset version:

```bash
npx changeset version
```

This command:
- Consumes all `.changeset/*.md` files (except README, config)
- Updates `package.json` version field
- Updates `CHANGELOG.md` with release notes

**Verify:**
1. Read `package.json` — confirm new version
2. Read top of `CHANGELOG.md` — confirm new entry
3. Show user:
   ```
   Version bump: <old-version> → <new-version>
   Changelog entry added for <new-version>
   ```

### Step 4 — Post-Version Build

Run clean build with new version:

```bash
yarn build
```

This ensures `lib/` contains compiled output matching the new version.

### Step 5 — Publish Summary

Present comprehensive summary before publishing:

```
📦 Release Summary
─────────────────────────────────
Package: testing-twigs
Version: <old> → <new>
Level: <patch/minor/major>

Changes:
<List from CHANGELOG.md new entry>

Files modified:
- package.json (version bump)
- CHANGELOG.md (new entry)
- lib/ (rebuilt)

Pre-flight checks:
- Lint: ✓
- Tests: ✓  
- Build: ✓

Ready to publish to npm?
This will run: yarn release

⚠️  This action is irreversible. Confirm to proceed.
```

### Step 6 — Publish (User Confirmation Required)

**WAIT for explicit user confirmation.**

Only after user confirms:

```bash
yarn release
```

The `release` script runs `yarn build && changeset publish`.

**After publish:**
1. Verify exit code 0
2. Report success:
   ```
   ✅ Published testing-twigs@<new-version> to npm.
   
   Post-publish checklist:
   - [ ] Verify: https://www.npmjs.com/package/testing-twigs
   - [ ] Tag: git tag v<new-version>
   - [ ] Push tag: git push origin v<new-version>
   - [ ] Update consuming projects
   ```
3. Offer to create git tag:
   ```bash
   git tag v<new-version>
   git push origin v<new-version>
   ```

### Step 7 — Post-Publish Cleanup

1. Verify `.changeset/` only has README.md and config.json
2. If leftover changeset files exist, investigate
3. Commit version bump if not committed:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: release testing-twigs@<new-version>"
   ```

---

## Error Recovery

### Build fails after version bump
- Version already bumped in package.json and CHANGELOG.md
- Fix the build error
- Re-run `yarn build`
- Do NOT re-run `npx changeset version`

### Publish fails (network/auth)
- Version bump is local only — nothing published
- Fix issue (usually `npm login` or network)
- Re-run `yarn release`

### Wrong version level
- If BEFORE publishing: manually edit package.json version
- If AFTER publishing: create new changeset with correct level, publish again

### "No changesets found" during version
- Changesets already consumed by previous run
- Check CHANGELOG.md for entry
- If entry exists, proceed to build/publish
- If not, create new changeset manually

---

## Output Format

Return to master orchestrator:

```typescript
{
  published: boolean,
  version: string,
  previousVersion: string,
  changelog: string,  // new changelog entry text
  gitTagCreated: boolean,
  errors: string | null
}
```

Example:
```typescript
{
  published: true,
  version: '0.1.13',
  previousVersion: '0.1.12',
  changelog: '### Minor Changes\n\n- Add Separator component',
  gitTagCreated: true,
  errors: null
}
```
