---
name: Twigs-mobile hardening
overview: Tighten npm publishing (compiled-only), refactor oversized components, fix theme token units + exports, add accessibility coverage, and establish a minimal test + docs + versioning foundation.
todos:
  - id: publish-cleanup
    content: Fix `package.json` publishing/exports for compiled-only; remove `.npmignore`; align `tsconfig` outDir.
    status: completed
  - id: refactor-button
    content: Split `packages/button/button.tsx` into loader/styles/helpers/modules while preserving exports.
    status: completed
  - id: refactor-textinput
    content: Split `packages/text-input/text-input.tsx` (styles + size config) and keep behavior intact.
    status: completed
  - id: theme-units-and-types
    content: Convert theme tokens from rem/px strings to numbers; export Theme* subtypes at top-level.
    status: completed
  - id: theming-hardcoded-colors
    content: Remove hardcoded colors in `Switch`, `Avatar`, `Button` via theme tokens + opacity helper.
    status: completed
  - id: accessibility-baseline
    content: Add baseline accessibility props/roles/states for Switch/Button/TextInput + error announcements.
    status: completed
  - id: testing-setup
    content: Add Jest + RN testing tooling and a minimal unit/render/integration test suite.
    status: completed
  - id: docs-folder
    content: Create `docs/` folder and add initial markdown documentation file.
    status: completed
  - id: versioning-changesets
    content: Add Changesets + CHANGELOG workflow and scripts.
    status: completed
isProject: false
---

## Scope decisions (locked)

- Publish **compiled-only** output (no `packages/` in the npm tarball).
- Convert theme tokens (`space`, `fontSizes`, etc.) to **React Native numbers (dp)**.

## 1) Package configuration & publishing

- Update `[/Users/krishnank/surveysparrow/npm-package/twigs-mobile/package.json](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/package.json)`
  - **Stop shipping raw TS sources**: remove `"packages"` from `files` so only built output ships.
  - **Fix broken subpath export** for `./theme` (currently points at non-existent `lib/*/theme.js` and `lib/typescript/.../theme.d.ts`). Change to:
    - `./lib/module/theme/index.js`
    - `./lib/commonjs/theme/index.js`
    - `./lib/typescript/packages/theme/index.d.ts`
  - **Align entrypoints with compiled-only**:
    - Remove `"source"` and repoint/remove `"react-native"` (currently `./packages/index.ts`, which won’t exist in the published package).
    - Recommended: set `"react-native"` to `"./lib/commonjs/index.js"` (Metro-friendly), keep `main/module/types` as-is.
  - (Optional but recommended) Add a small `npm pack` smoke-check script (e.g. `pack:check`) to verify the tarball contains only `lib/**` and correct entrypoints.
- Delete `[/Users/krishnank/surveysparrow/npm-package/twigs-mobile/.npmignore](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/.npmignore)`
  - It’s currently ignored anyway because `files` is present, and it’s inconsistent (`dist/` vs `lib/`).
- Update `[/Users/krishnank/surveysparrow/npm-package/twigs-mobile/tsconfig.json](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/tsconfig.json)`
  - Remove `compilerOptions.outDir` or align it to `./lib` (bob outputs to `lib/`; `dist/` is misleading).

## 2) Component architecture (split oversized files)

- Refactor `[/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/button/button.tsx](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/button/button.tsx)` (~690 LOC) into focused modules, keeping the public API stable via `[packages/button/index.ts](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/button/index.ts)`:
  - `packages/button/line-loader.tsx`: move `LineLoader`
  - `packages/button/styles.ts`: static `StyleSheet.create(...)`
  - `packages/button/style-helpers.ts`: `getButtonStyles`, `getSizeStyles`, `getColorStyles`, text/icon helpers
  - `packages/button/button.tsx`: thin component composition + prop plumbing
- Refactor `[/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/text-input/text-input.tsx](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/text-input/text-input.tsx)` (~413 LOC):
  - `packages/text-input/styles.ts`: move `createStyles(theme)`
  - `packages/text-input/size-config.ts`: move `getSizeConfig` + `SizeConfig`
  - Keep `text-input.tsx` focused on rendering + behavior

## 3) Theme system fixes

- Convert theme token units to RN-friendly **numbers** in `[/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/theme/default-theme.ts](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/theme/default-theme.ts)`
  - `space`: from `'0.125rem'` etc → `2`, `4`, … (dp)
  - `fontSizes`, `lineHeights`, `radii`, `sizes`, `borderWidths`: from `'rem'/'px'/'%'` strings → numbers
  - Keep `colors` as strings.
- Export theme subtypes for consumer typing:
  - Add (and export) `ThemeColors`, `ThemeSpace`, `ThemeFontSizes`, etc. from `default-theme.ts`
  - Re-export from `[packages/theme/index.ts](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/theme/index.ts)` and top-level `[packages/index.ts](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/index.ts)`

## 4) Remove hardcoded colors (theming consistency)

- Fix `Switch` hardcoded color in `[/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/switch/switch.tsx](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/switch/switch.tsx)` (`#448E97` → theme token).
- Fix `Avatar` hardcoded palette in `[/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/avatar/avatar.tsx](/Users/krishnank/surveysparrow/npm-package/twigs-mobile/packages/avatar/avatar.tsx)`
  - Replace `AVATAR_COLORS` with a theme-derived palette (e.g. based on `primary*/accent*/secondary*`)
  - Keep deterministic “same name → same color” behavior.
- Fix `Button` hardcoded pressed/border colors in `getColorStyles` by using theme colors + a small utility (e.g. `withOpacity(hex, opacity)` in `packages/utils`).

## 5) Accessibility pass (library-wide baseline)

- `Switch`:
  - Add `accessibilityRole="switch"`
  - Add `accessibilityState={{ checked: value, disabled }}`
- `Button`:
  - Default `accessibilityRole="button"`
  - Add `accessibilityState={{ disabled, busy: loading }}`
  - Expand props to accept standard a11y props by extending `PressableProps` (similar to `SwitchProps`).
- `TextInput`:
  - Add/propagate `accessibilityLabel` (and optionally `accessibilityHint`)
  - Add error announcement: render error message with `accessibilityLiveRegion="polite"` and set input `accessibilityState={{ invalid: !!errorMessage }}`
  - Add a11y labeling for password visibility toggle `Pressable`.
- Quick audit of remaining components for obvious roles/labels (Checkbox/Radio already have roles).

## 6) Testing foundation (minimum viable)

- Add Jest + RN testing tooling:
  - Dev deps: `jest`, `@testing-library/react-native`, `react-test-renderer`, `@types/jest` (and any required Babel/Jest preset packages).
  - Add `test` script and `jest.config.*` + setup file.
- Add tests:
  - **Unit**: `resolveMargin`, `resolvePadding`, any new color helper.
  - **Render/behavior**: `Switch` role/state, `Button` disabled/loading states, `TextInput` error a11y.
  - **Integration**: `TwigsProvider` merges theme and `useTheme()` returns overrides.

## 7) Documentation & developer experience

- Create `docs/` folder with an initial markdown doc (e.g. `docs/architecture.md`) covering:
  - Publishing/entrypoints (`main/module/types/exports/react-native`)
  - Theme token conventions (numbers, no `rem`)
  - Accessibility expectations per component
  - Testing commands
- (Optional follow-up) Add Storybook or an example app; I’d stage this after tests + a11y so we have stable stories/tests.

## 8) Versioning

- Add Changesets
  - Initialize `.changeset/`, add scripts (`changeset`, `version`, `release`), and generate/maintain `CHANGELOG.md`.
  - Decide semver policy once you approach `1.0` (breaking changes: theme token type/unit changes likely warrant a minor/major depending on current consumers).

