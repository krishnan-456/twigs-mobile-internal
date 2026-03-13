# Changelog

## [0.4.4](https://github.com/krishnan-456/twigs-mobile-internal/compare/v0.4.3...v0.4.4) (2026-03-13)

### Bug Fixes

* uats comments ([af09f09](https://github.com/krishnan-456/twigs-mobile-internal/commit/af09f09342a39675349b7461be416f3ab91bd343))

### Refactoring

* enhance TextInput styles for better layout and responsiveness ([4933163](https://github.com/krishnan-456/twigs-mobile-internal/commit/4933163c2b1e129ca1bf00f30290d6e39629818b))
* optimize component styles using useMemo for performance improvements in Checkbox, Flex, CircleLoader, LineLoader, Radio, Switch, Text, and TextInput ([0b08e27](https://github.com/krishnan-456/twigs-mobile-internal/commit/0b08e2710c61fa23183e443e7505f26201912fda))
* replace inline wrap function with shared test-utils for consistent component rendering in tests ([35129ac](https://github.com/krishnan-456/twigs-mobile-internal/commit/35129ac28120096d742710f1b9b5ff2eb24490fb))

## [0.4.3](https://github.com/krishnan-456/twigs-mobile-internal/compare/v0.4.2...v0.4.3) (2026-03-09)

### Bug Fixes

* font family ([3c39632](https://github.com/krishnan-456/twigs-mobile-internal/commit/3c39632259ec8bd8b6eb3e6d711c785f103b5787))

## [0.4.2](https://github.com/krishnan-456/twigs-mobile-internal/compare/v0.4.1...v0.4.2) (2026-03-09)

### Features

* enhance toast functionality with improved swipe gestures and animation configurations; introduce new constants for swipe behavior and update icon props ([d96ef36](https://github.com/krishnan-456/twigs-mobile-internal/commit/d96ef36aa0c040b2d6c1a7656a12050efd6d37e4))

### Bug Fixes

* update gesture handler and reanimated mocks for toast swipe gestures ([d0152d9](https://github.com/krishnan-456/twigs-mobile-internal/commit/d0152d9a38695a93750390a856570ee4c71142a6))

### Refactoring

* simplify Toast component positions and styles, reducing options to top-center and bottom-center; update documentation accordingly ([e34e3a0](https://github.com/krishnan-456/twigs-mobile-internal/commit/e34e3a073a5eaf630f115e41bd83003a668a956e))

## [0.4.1](https://github.com/krishnan-456/twigs-mobile-internal/compare/v0.4.0...v0.4.1) (2026-03-08)

## [0.4.0](https://github.com/krishnan-456/twigs-mobile-internal/compare/v0.3.1...v0.4.0) (2026-03-08)

### Features

* enhance component library with new AvatarGroup, Badge, Chip, and IconButton components, and update existing Avatar and Alert components with additional features and tests ([1b8e4f9](https://github.com/krishnan-456/twigs-mobile-internal/commit/1b8e4f955d83adb23ce8c8339ce3da8e6d0fb890))

### Bug Fixes

* lock ([e217464](https://github.com/krishnan-456/twigs-mobile-internal/commit/e2174649de99a26d684ef60e892c2bf63e24598d))

### Refactoring

* bottomsheet, radio & checkbox ([83e898a](https://github.com/krishnan-456/twigs-mobile-internal/commit/83e898ad02febed577579812b66a1ee531cbd95a))

## [0.3.1](https://github.com/krishnan-456/twigs-mobile-internal/compare/v0.3.0...v0.3.1) (2026-02-23)

## 0.3.0 (2026-02-23)

### Features

* add code-reviewer and web-source-analyzer agents for enhanced component auditing and API extraction ([0d0e508](https://github.com/krishnan-456/twigs-mobile-internal/commit/0d0e508a28cd9036b2b052e89296d865019d5373))
* add loader components and enhance button functionality with customizable loaders ([4f9d995](https://github.com/krishnan-456/twigs-mobile-internal/commit/4f9d995ea7d13302f77d083085ac28e818c4d978))
* enhance Avatar component with size and dimension handling ([951a725](https://github.com/krishnan-456/twigs-mobile-internal/commit/951a7255197dda9e03ae7c7f756ba37c10294d99))
* introduced custom theme context, modified fonts weights ([69e504a](https://github.com/krishnan-456/twigs-mobile-internal/commit/69e504add390808c1aedb6e8c4a1f4bca81aacff))

### Bug Fixes

* added test cases, improved accessibility, resolve pr review comments ([93234ad](https://github.com/krishnan-456/twigs-mobile-internal/commit/93234adda4b24428403c418859385c1ad39f0c29))
* enhanced bottomsheet ([4280e18](https://github.com/krishnan-456/twigs-mobile-internal/commit/4280e180730f1949d8fcc82dba1e167d5eabf0be))
* eslint ([3733640](https://github.com/krishnan-456/twigs-mobile-internal/commit/373364060219c03bfbdf48bbdafd2d0ab3eb4dbf))
* gitignore ([6d90cb5](https://github.com/krishnan-456/twigs-mobile-internal/commit/6d90cb5ccdcff833bb17cdd5d6118f93d86f72c3))
* publish command ([40e790a](https://github.com/krishnan-456/twigs-mobile-internal/commit/40e790a346a1e8d9e6ac6b46b4b9856ea3f99fc6))
* readme ([abdde61](https://github.com/krishnan-456/twigs-mobile-internal/commit/abdde615caf1cf6475f2b8538230d7bbfb0c682c))

### Refactoring

* update exports in index files for tree shaking imports/exports ([a0552c3](https://github.com/krishnan-456/twigs-mobile-internal/commit/a0552c3794d5398d5f300394a343891c9f01ed3d))
* update README for package name change and add new hooks for accessibility and formatting checks ([05cdcb4](https://github.com/krishnan-456/twigs-mobile-internal/commit/05cdcb4281243e1c352e6a9c8d698297993da9eb))

# testing-twigs

## 0.2.0

### Minor Changes

- Add Separator component with horizontal/vertical orientation and theme-aware colors
- Fix CircleLoader spinner not rotating on Android by switching from borderTopColor to SVG strokeDasharray
- Fix Radio accessibility: restore `checked` in accessibilityState (was incorrectly using `selected`)
- Add Storybook example app with interactive controls for all components
- Add react-native-reanimated/plugin to babel.config.js for proper workletization in library build
- Configure react-native-builder-bob to use project babel config (configFile: true)
- Migrate from Yarn v1 to npm for package management
