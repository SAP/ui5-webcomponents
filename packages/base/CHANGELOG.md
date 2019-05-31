# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.11.1](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.11.1) (2019-05-30)

**Note:** Version bump only for package @ui5/webcomponents-base





# [0.11.0](https://github.com/SAP/ui5-webcomponents/compare/v0.10.1...v0.11.0) (2019-05-22)


### Bug Fixes

* broken child property observation ([#423](https://github.com/SAP/ui5-webcomponents/issues/423)) ([b3e3b3f](https://github.com/SAP/ui5-webcomponents/commit/b3e3b3f))
* prevent dual event dispatching in no conflict mode ([#363](https://github.com/SAP/ui5-webcomponents/issues/363)) ([4cbe3de](https://github.com/SAP/ui5-webcomponents/commit/4cbe3de))


### Code Refactoring

* make custom CSS theme independent ([#386](https://github.com/SAP/ui5-webcomponents/issues/386)) ([d6b4ab5](https://github.com/SAP/ui5-webcomponents/commit/d6b4ab5))


### BREAKING CHANGES

* the signature of the addCustomCSS method exported by "@ui5/webcomponents-base/Theming.js" is changed from addCustomCSS(tag, theme, css) to addCustomCSS(tag, css)





## [0.10.1](https://github.com/SAP/ui5-webcomponents/compare/v0.10.0...v0.10.1) (2019-04-24)

**Note:** Version bump only for package @ui5/webcomponents-base





# [0.10.0](https://github.com/SAP/ui5-webcomponents/compare/v0.9.0...v0.10.0) (2019-04-22)


### Bug Fixes

* add missing dependency to jquery-shim in resource bundle ([#242](https://github.com/SAP/ui5-webcomponents/issues/242)) ([3c5bd6f](https://github.com/SAP/ui5-webcomponents/commit/3c5bd6f))
* checks navigator language for rtl enabling ([#253](https://github.com/SAP/ui5-webcomponents/issues/253)) ([c29d970](https://github.com/SAP/ui5-webcomponents/commit/c29d970))
* correct constructable stylesheet feature detection ([#271](https://github.com/SAP/ui5-webcomponents/issues/271)) ([816e6de](https://github.com/SAP/ui5-webcomponents/commit/816e6de))
* make fallback script work with multiple variables per line ([#252](https://github.com/SAP/ui5-webcomponents/issues/252)) ([298a165](https://github.com/SAP/ui5-webcomponents/commit/298a165))
* slots work in Safari ([#230](https://github.com/SAP/ui5-webcomponents/issues/230)) ([79445d0](https://github.com/SAP/ui5-webcomponents/commit/79445d0))
* **configuration:** fix map literals ([#324](https://github.com/SAP/ui5-webcomponents/issues/324)) ([515121f](https://github.com/SAP/ui5-webcomponents/commit/515121f))


### Code Refactoring

* **base:** flatten project structure ([#227](https://github.com/SAP/ui5-webcomponents/issues/227)) ([0e8e460](https://github.com/SAP/ui5-webcomponents/commit/0e8e460))


### Features

* adds static method styles to base class ([#345](https://github.com/SAP/ui5-webcomponents/issues/345)) ([b61860f](https://github.com/SAP/ui5-webcomponents/commit/b61860f))
* framework-level support for CSS Custom Properties ([#196](https://github.com/SAP/ui5-webcomponents/issues/196)) ([291829a](https://github.com/SAP/ui5-webcomponents/commit/291829a))
* provide named exports for some base modules ([#347](https://github.com/SAP/ui5-webcomponents/issues/347)) ([2e2439a](https://github.com/SAP/ui5-webcomponents/commit/2e2439a))


### BREAKING CHANGES

* **base:** All files required from the base now have different
path. sap/ui/webcomponents/base/ is removed.

old: @ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent
new: @ui5/webcomponents-base/src/WebComponent





# [0.9.0](https://github.com/SAP/ui5-webcomponents/compare/v0.8.0...v0.9.0) (2019-03-18)

**Note:** Version bump only for package @ui5/webcomponents-base





# [0.8.0](https://github.com/SAP/ui5-webcomponents/compare/v0.7.0...v0.8.0) (2019-03-01)


### Features

* **ui5-card:** add avatar property ([#45](https://github.com/SAP/ui5-webcomponents/issues/45)) ([cdaf549](https://github.com/SAP/ui5-webcomponents/commit/cdaf549))
* **ui5-li:** add description property ([#54](https://github.com/SAP/ui5-webcomponents/issues/54)) ([fe79710](https://github.com/SAP/ui5-webcomponents/commit/fe79710))
* **ui5-select:** initial implementation
* **ui5-shellbar:** initial implementation and improvements ([#72](https://github.com/SAP/ui5-webcomponents/issues/72)) ([fdc743d](https://github.com/SAP/ui5-webcomponents/commit/fdc743d))
* **ui5-switch:** initial implementation ([#102](https://github.com/SAP/ui5-webcomponents/issues/102)) ([280d35a](https://github.com/SAP/ui5-webcomponents/commit/280d35a))
* **ui5-timeline:** initial implementation
* load Web Components polyfill on demand ([#96](https://github.com/SAP/ui5-webcomponents/issues/96)) ([98b5174](https://github.com/SAP/ui5-webcomponents/commit/98b5174))


### Bug Fixes

* **eventing:** remove unnecessary tag name check ([#16](https://github.com/SAP/ui5-webcomponents/issues/16)) ([3e39a70](https://github.com/SAP/ui5-webcomponents/commit/3e39a70))
* **ui5-datepicker:** display extreme values correctly ([#75](https://github.com/SAP/ui5-webcomponents/issues/75)) ([d1c7259](https://github.com/SAP/ui5-webcomponents/commit/d1c7259))
* fix broken bundle on Edge [#64](https://github.com/SAP/ui5-webcomponents/issues/64) ([73117c7](https://github.com/SAP/ui5-webcomponents/commit/73117c7))
* do not modify the HTML tag ([#49](https://github.com/SAP/ui5-webcomponents/issues/49)) ([17f30b7](https://github.com/SAP/ui5-webcomponents/commit/17f30b7))
* fix playground theme switch ([#62](https://github.com/SAP/ui5-webcomponents/issues/62)) ([5212a87](https://github.com/SAP/ui5-webcomponents/commit/5212a87))
* prevent throwing exception if slotted child does not have listenFor ([#92](https://github.com/SAP/ui5-webcomponents/issues/92)) ([4ffce64](https://github.com/SAP/ui5-webcomponents/commit/4ffce64))
* unknown slots no longer cause an error ([#90](https://github.com/SAP/ui5-webcomponents/issues/90)) ([a033326](https://github.com/SAP/ui5-webcomponents/commit/a033326))


### BREAKING CHANGES

* any applications that wants to support Edge and/or IE11 should now import the respective browser support module. For details, see the [README.md](/README.md#browser-support)
* addCustomCSS is no longer on the Core object. Use Theming instead. [#58](https://github.com/SAP/ui5-webcomponents/pull/58)
