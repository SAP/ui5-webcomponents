# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
