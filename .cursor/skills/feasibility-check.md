---
name: feasibility-check
description: >
  Classify the web component and determine implementation approach.
  Handles dependency vetting and user interaction.
  Called by master-orchestrator during Phase 2.
---

# Feasibility Check

This skill classifies the web component and determines how to implement it in
React Native. It runs on the **main agent** because it may need user interaction.

## Input

From master orchestrator context:
- `componentName`, `dirName`, `workspacePath`
- `webApiSummary`: from discover-web-source skill
- `rnPatternRecommendation`: from discover-web-source skill

## Output

Return to master orchestrator:
- `classification`: component type
- `deviations`: list of web-to-RN deviations
- `newDepsNeeded`: any new packages required
- `proceed`: boolean — whether to continue to implementation

---

## Classification Decision Tree

Analyze `webApiSummary.dependencies` and `webApiSummary.styling`:

| Classification | Criteria | Action |
|---------------|---------|--------|
| **pure-ui** | No external deps, no complex CSS, View/Text/Pressable sufficient | Proceed directly |
| **needs-rn-alt** | Uses Radix, portals, complex positioning | Identify RN alternative, ask user |
| **platform-adapt** | Uses hover, CSS Grid, tables, complex transitions | Adapt patterns for mobile |
| **not-feasible** | Relies on browser APIs (iframe, document.body, window) | Tell user, propose fallback |

### Classification Examples

```
pure-ui:
  - separator (just a View with border)
  - chip/tag (View + Text + optional icon)
  - alert (View + icon + text + color variants)
  - avatar (Image with fallback)

needs-rn-alt:
  - tooltip → custom Pressable + absolute View
  - popover → BottomSheet or react-native-popover-view
  - dropdown → BottomSheet picker
  - dialog → RN Modal
  - slider → @react-native-community/slider
  - calendar → react-native-calendars

platform-adapt:
  - hover states → pressed states
  - CSS Grid → Flex with wrap
  - table → FlatList with header
  - CSS transitions → react-native-reanimated

not-feasible:
  - iframe embeds
  - document.body portals
  - window.matchMedia listeners
  - CSS @media queries (partial — use Dimensions API)
```

---

## Execution Steps

### Step 1 — Classify

Based on `webApiSummary`:

```typescript
function classify(summary: WebApiSummary): Classification {
  const { dependencies, styling, children } = summary;
  
  // Check for browser-only patterns
  if (dependencies.includes('iframe') || styling.includes('portal to body')) {
    return 'not-feasible';
  }
  
  // Check for dependencies needing RN alternatives
  if (dependencies.some(d => ['@radix-ui', 'popover', 'tooltip', 'dropdown'].includes(d))) {
    return 'needs-rn-alt';
  }
  
  // Check for CSS patterns needing adaptation
  if (styling.hover || styling.includes('grid') || styling.includes('table')) {
    return 'platform-adapt';
  }
  
  return 'pure-ui';
}
```

### Step 2 — Identify Deviations

Compare web patterns to RN capabilities:

```
For each web feature, determine RN equivalent:
- :hover → Pressable pressed state (or ignore for non-interactive)
- :focus-visible → RN accessibility focus
- aria-* → accessibility* props
- CSS transition → react-native-reanimated
- onClick → onPress
- className → style array
```

Document each deviation:
```
deviations: [
  "hover state: ignored (no hover on mobile)",
  "CSS transition on opacity: using withTiming from reanimated",
  "aria-label: mapped to accessibilityLabel"
]
```

### Step 3 — Check for New Dependencies

If `classification === 'needs-rn-alt'`:

1. Identify the RN package needed
2. Run **Dependency Vetting**:

```
For package <pkg>:
1. Check recency: npm view <pkg> time.modified
   - Must be within 12 months
2. Check popularity: npm view <pkg> or npmjs.com
   - Must have >= 10,000 weekly downloads
3. Check RN compatibility: README, issues
   - Must explicitly support React Native
4. Check maintenance: GitHub repo activity
   - Must have recent commits, triaged issues
5. Check bundle size: bundlephobia.com
   - Must be reasonable for mobile
```

If package fails any check:
- Propose alternative
- If no alternative, ask user

### Step 4 — User Confirmation (if needed)

**For needs-rn-alt:**
```
The component '<NAME>' uses <WEB_FEATURE> which requires an RN alternative.
Recommended: <PACKAGE_NAME>
- Last published: <date>
- Weekly downloads: <count>
- RN compatible: Yes

Install this package and proceed? [Yes / Suggest alternative / Skip component]
```

**For platform-adapt:**
```
The component '<NAME>' uses these web patterns that need mobile adaptation:
- <pattern 1> → <RN approach>
- <pattern 2> → <RN approach>

These are standard adaptations. Proceeding with implementation.
```

**For not-feasible:**
```
The component '<NAME>' uses <BROWSER_FEATURE> which cannot be replicated in React Native.

Options:
1. Skip this component
2. Implement a simplified mobile-only version (describe what would change)
3. Suggest an alternative component that achieves similar UX

Which option? [1 / 2 / 3]
```

---

## Output Format

Return to master orchestrator:

```typescript
{
  classification: 'pure-ui' | 'needs-rn-alt' | 'platform-adapt' | 'not-feasible',
  deviations: string[],
  newDepsNeeded: string[],  // empty array if none
  proceed: boolean,
  notes: string  // any special implementation notes
}
```

Example:
```
{
  classification: 'pure-ui',
  deviations: [
    "hover state: ignored (no hover on mobile)",
    "CSS border shorthand: expanded to borderWidth + borderColor"
  ],
  newDepsNeeded: [],
  proceed: true,
  notes: "Simple component, use small file structure"
}
```
