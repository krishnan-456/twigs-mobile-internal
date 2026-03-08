# Theming DX Research

**Goal:** Evaluate approaches that eliminate the need for `useTheme()` in every component.

**Current approach:** `TwigsProvider` + `useTheme()` + `StyleSheet.create`

---

## Options Evaluated

| Approach | Used by | How it works | Why we can't adopt it now |
|----------|---------|-------------|---------------------------|
| **Utility-first (Tailwind/NativeWind)** | gluestack-ui, react-native-reusables | `className="bg-primary p-4"` — tokens resolve at build time, no theme object | Requires full architectural rewrite of every component. Adds NativeWind as a heavy build dependency all consumers must configure. Diverges from web twigs (Stitches + `$token`), making cross-platform maintenance harder. |
| **Global singletons** | react-native-ui-lib | `Colors.loadColors()` once at init, then `Colors.primary` anywhere — no context, no hooks | Global mutable state is unsafe in React 18 concurrent mode (stale/torn reads). Breaks nested/scoped themes (`TwigsProvider` nesting). Makes testing harder (global state leaks between tests). |
| **withTheme HOC** | react-native-paper | HOC injects `theme` as a prop — consumer doesn't call the hook | Adds an extra component wrapper per themed component. Deprecated pattern — React favors hooks over HOCs. Only helps external consumers; library internals still need the hook. Paper itself uses `useInternalTheme` internally. |
| **createStyleSheet (our prototype)** | — | Unistyles-like API: `createStyleSheet((theme) => ({...}))` backed by Proxy + global theme ref | Proxy overhead on every style access (500 intercepts/frame in a 100-item list). No `StyleSheet.create` native bridge optimization. Unsafe global mutation during render. Memory leak (registry never cleans up). Net negative over existing pattern. |

---

## What We're Keeping

**`useTheme()` + `StyleSheet.create`** because:

- **Concurrent-safe** — React context, no global mutation
- **Native-optimized** — `StyleSheet.create` sends integer IDs across the bridge, not full objects
- **Scoped themes** — `TwigsProvider` nesting works for per-section theming
- **Web parity** — same mental model as web twigs (theme object with token keys)
- **Zero consumer config** — no build plugins, no Tailwind setup, no global init

The cost is that consumers must call `useTheme()` when they need raw theme values outside of twigs components. This is acceptable because most consumer code uses twigs primitives (`Box`, `Button`, `Text`) that handle theme internally.

---

## Future Improvement: Token-Based Props

The highest-impact change that doesn't require architectural overhaul:

```tsx
// Today — consumer needs useTheme()
const theme = useTheme();
<Box style={{ backgroundColor: theme.colors.primary100, padding: theme.space[4] }}>

// Future — token-based props, no useTheme() needed
<Box backgroundColor="primary100" padding="4">
```

`Box`, `Flex`, `Text` would accept theme token keys for spacing/color props and resolve them internally via `useTheme()`. Consumers get a clean API without needing the hook themselves.

---

## References

- [react-native-paper Theming](https://callstack.github.io/react-native-paper/docs/guides/theming)
- [react-native-ui-lib Colors](https://wix.github.io/react-native-ui-lib/docs/foundation/colors)
- [gluestack-ui Theme Configuration](https://gluestack.io/ui/docs/home/theme-configuration/customizing-theme)
- [react-native-reusables](https://github.com/founded-labs/react-native-reusables)
- [NativeWind](https://www.nativewind.dev/)
