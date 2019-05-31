# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.11.1](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.11.1) (2019-05-30)

**Note:** Version bump only for package @ui5/webcomponents-core





# [0.11.0](https://github.com/SAP/ui5-webcomponents/compare/v0.10.1...v0.11.0) (2019-05-22)


### Features

* fetch ui5-datepicker assets from CDN ([#420](https://github.com/SAP/ui5-webcomponents/issues/420)) ([1f62dda](https://github.com/SAP/ui5-webcomponents/commit/1f62dda))





## [0.10.1](https://github.com/SAP/ui5-webcomponents/compare/v0.10.0...v0.10.1) (2019-04-24)

**Note:** Version bump only for package @ui5/webcomponents-core





# [0.10.0](https://github.com/SAP/ui5-webcomponents/compare/v0.9.0...v0.10.0) (2019-04-22)

**Note:** Version bump only for package @ui5/webcomponents-core





# [0.9.0](https://github.com/SAP/ui5-webcomponents/compare/v0.8.0...v0.9.0) (2019-03-18)


### Bug Fixes

* correct calling unexisting method ([#157](https://github.com/SAP/ui5-webcomponents/issues/157)) ([0a8c8cd](https://github.com/SAP/ui5-webcomponents/commit/0a8c8cd))
* correct device detection error on mobile ([#143](https://github.com/SAP/ui5-webcomponents/issues/143)) ([857754e](https://github.com/SAP/ui5-webcomponents/commit/857754e))





# [0.8.0](https://github.com/SAP/ui5-webcomponents/compare/v0.7.0...v0.8.0) (2019-03-01)


### Features

* load Web Components polyfill on demand ([#96](https://github.com/SAP/ui5-webcomponents/issues/96)) ([98b5174](https://github.com/SAP/ui5-webcomponents/commit/98b5174))


### BREAKING CHANGES

* any applications that wants to support Edge and/or IE11 should now import the respective browser support module. For details, see the [README.md](/README.md#browser-support)
* addCustomCSS is no longer on the Core object. Use Theming instead. [#58](https://github.com/SAP/ui5-webcomponents/pull/58)
