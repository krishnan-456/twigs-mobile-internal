---
"testing-twigs": minor
---

Add Separator component, fix CircleLoader, and set up Storybook example app

- Add Separator component with horizontal/vertical orientation and theme-aware colors
- Fix CircleLoader spinner not rotating on Android by switching from borderTopColor to SVG strokeDasharray
- Fix Radio accessibility: restore `checked` in accessibilityState (was incorrectly using `selected`)
- Add Storybook example app with interactive controls for all components
- Add react-native-reanimated/plugin to babel.config.js for proper workletization in library build
- Configure react-native-builder-bob to use project babel config (configFile: true)
