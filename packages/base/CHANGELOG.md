# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.8](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2020-07-30)


### Bug Fixes

* **framework:** Allow for empty theme files ([#1639](https://github.com/SAP/ui5-webcomponents/issues/1639)) ([0cef140](https://github.com/SAP/ui5-webcomponents/commit/0cef140))
* **framework:** Allow users to override default language translations ([#1716](https://github.com/SAP/ui5-webcomponents/issues/1716)) ([4b10f4f](https://github.com/SAP/ui5-webcomponents/commit/4b10f4f))
* **framework:** Slotted children now invalidate parent upon slotchange ([#1649](https://github.com/SAP/ui5-webcomponents/issues/1649)) ([3ca4ae1](https://github.com/SAP/ui5-webcomponents/commit/3ca4ae1))
* **framework:** Fix openui5 css varaibles detection ([#1933](https://github.com/SAP/ui5-webcomponents/issues/1933)) ([bb5b724](https://github.com/SAP/ui5-webcomponents/commit/bb5b724)), closes [#1932](https://github.com/SAP/ui5-webcomponents/issues/1932)
* **framework:** Make renderImmediately sync ([#1929](https://github.com/SAP/ui5-webcomponents/issues/1929)) ([9141300](https://github.com/SAP/ui5-webcomponents/commit/9141300))
* **framework:** Update managedSlots effect ([#1952](https://github.com/SAP/ui5-webcomponents/issues/1952)) ([4a1be70](https://github.com/SAP/ui5-webcomponents/commit/4a1be70))
* **framework:** Remove ES6 code in IE polyfill ([#1923](https://github.com/SAP/ui5-webcomponents/issues/1923)) ([0a2ff88](https://github.com/SAP/ui5-webcomponents/commit/0a2ff88))
* **framework:** Take region into account for i18n assets ([#1985](https://github.com/SAP/ui5-webcomponents/issues/1985)) ([3b614ad](https://github.com/SAP/ui5-webcomponents/commit/3b614ad))
* **ui5-button:** Apply aria-expanded to inner button tag ([#1781](https://github.com/SAP/ui5-webcomponents/issues/1781)) ([df9e4e9](https://github.com/SAP/ui5-webcomponents/commit/df9e4e9))


### Features

* **framework:** Add dynamic language change and on-demand rerendering ([#1746](https://github.com/SAP/ui5-webcomponents/issues/1746)) ([1b568f2](https://github.com/SAP/ui5-webcomponents/commit/1b568f2))
* **framework:** CLDR location can now be specified ([#1687](https://github.com/SAP/ui5-webcomponents/issues/1687)) ([168e505](https://github.com/SAP/ui5-webcomponents/commit/168e505))
* **framework:** Create a global shared resources repo, share SVG Icons ([#1869](https://github.com/SAP/ui5-webcomponents/issues/1869)) ([7f5a198](https://github.com/SAP/ui5-webcomponents/commit/7f5a198))
* **framework:** Implement invalidateParent ([#1964](https://github.com/SAP/ui5-webcomponents/issues/1964)) ([104abcc](https://github.com/SAP/ui5-webcomponents/commit/104abcc))
* **framework:** Implement stable DOM Ref functionality ([#1868](https://github.com/SAP/ui5-webcomponents/issues/1868)) ([cfd4fa3](https://github.com/SAP/ui5-webcomponents/commit/cfd4fa3))
* **framework:** Make icons RTL aware ([#1833](https://github.com/SAP/ui5-webcomponents/issues/1833)) ([29a991f](https://github.com/SAP/ui5-webcomponents/commit/29a991f)), closes [#1831](https://github.com/SAP/ui5-webcomponents/issues/1831)
* **framework:** Support properties message bundles for i18n ([#1728](https://github.com/SAP/ui5-webcomponents/issues/1728)) ([d78d136](https://github.com/SAP/ui5-webcomponents/commit/d78d136))
* **framework:** Support several runtimes simultaneously ([#1691](https://github.com/SAP/ui5-webcomponents/issues/1691)) ([7a3261c](https://github.com/SAP/ui5-webcomponents/commit/7a3261c))


# [0.20.0](https://github.com/SAP/ui5-webcomponents/compare/v0.19.0...v0.20.0) (2020-04-30)


### Bug Fixes

* **framework:** allow the creation of components with static area content only ([#1450](https://github.com/SAP/ui5-webcomponents/issues/1450)) ([b0505ce](https://github.com/SAP/ui5-webcomponents/commit/b0505ce))
* **framework:** apply CSS Vars in Static Styles on IE11 ([#1440](https://github.com/SAP/ui5-webcomponents/issues/1440)) ([b8ae60e](https://github.com/SAP/ui5-webcomponents/commit/b8ae60e))
* **framework:** rendering is no longer delayed  ([#1552](https://github.com/SAP/ui5-webcomponents/issues/1552)) ([c26e8aa](https://github.com/SAP/ui5-webcomponents/commit/c26e8aa))
* **scroll enablement:** fix scrolling issue on scroll & mobile ([#1557](https://github.com/SAP/ui5-webcomponents/issues/1557)) ([e79482a](https://github.com/SAP/ui5-webcomponents/commit/e79482a))
* **scroll enablement:** fix scrolling on android devices ([#1491](https://github.com/SAP/ui5-webcomponents/issues/1491)) ([df19ede](https://github.com/SAP/ui5-webcomponents/commit/df19ede))



### Features

* **framework:** enable external themes support ([#1463](https://github.com/SAP/ui5-webcomponents/issues/1463)) ([b031782](https://github.com/SAP/ui5-webcomponents/commit/b031782))
* **framework:** register theme variables via CSS file ([#1451](https://github.com/SAP/ui5-webcomponents/issues/1451)) ([3173fb9](https://github.com/SAP/ui5-webcomponents/commit/3173fb9))




# [0.19.0](https://github.com/SAP/ui5-webcomponents/compare/v0.18.0...v0.19.0) (2020-03-27)


### Bug Fixes

* **framework:** fix travis build ([#1212](https://github.com/SAP/ui5-webcomponents/issues/1212)) ([7f30cf3](https://github.com/SAP/ui5-webcomponents/commit/7f30cf3))
* **framework:** openUI5 cldr support re-added ([#1207](https://github.com/SAP/ui5-webcomponents/issues/1207)) ([6bf40a2](https://github.com/SAP/ui5-webcomponents/commit/6bf40a2))
* **framework:** Provide a workaround for Firefox 74 shadow root bug ([#1347](https://github.com/SAP/ui5-webcomponents/issues/1347)) ([7cc67a7](https://github.com/SAP/ui5-webcomponents/commit/7cc67a7))
* **framework:** StaticArea and StaticAreaElement identify as UI5Element ([#1168](https://github.com/SAP/ui5-webcomponents/issues/1168)) ([28f827a](https://github.com/SAP/ui5-webcomponents/commit/28f827a))
* **framework:** prevent infinite loop when fetching i18n bundles ([#1333](https://github.com/SAP/ui5-webcomponents/issues/1333)) ([f605566](https://github.com/SAP/ui5-webcomponents/commit/f605566))
* **framework:** prevent error when deleting static area item ([#1335](https://github.com/SAP/ui5-webcomponents/issues/1335)) ([5a99536](https://github.com/SAP/ui5-webcomponents/commit/5a99536))
* **framework:** apply size "compact" for StaticArea items ([#1204](https://github.com/SAP/ui5-webcomponents/issues/1204)) ([c411774](https://github.com/SAP/ui5-webcomponents/commit/c411774))
* **framework:** merge metadata properly ([#1092](https://github.com/SAP/ui5-webcomponents/issues/1092)) ([6a29872](https://github.com/SAP/ui5-webcomponents/commit/6a29872))
* **framework:** create font face style tag only once ([#1090](https://github.com/SAP/ui5-webcomponents/issues/1090)) ([1a09e13](https://github.com/SAP/ui5-webcomponents/commit/1a09e13))


### Code Refactoring

* **framework:** propagate compact size when ui5-content-density-compact class is set ([#1136](https://github.com/SAP/ui5-webcomponents/issues/1136)) ([2db62ba](https://github.com/SAP/ui5-webcomponents/commit/2db62ba))


### Features

* **framework:** Allow the registration of custom themes ([#1109](https://github.com/SAP/ui5-webcomponents/issues/1109)) ([6a69521](https://github.com/SAP/ui5-webcomponents/commit/6a69521))
* **framework:** create getLocaleData API ([#1269](https://github.com/SAP/ui5-webcomponents/issues/1269)) ([c9253a6](https://github.com/SAP/ui5-webcomponents/commit/c9253a6))
* **framework:** OpenUI5 integration ([#1138](https://github.com/SAP/ui5-webcomponents/issues/1138)) ([5527990](https://github.com/SAP/ui5-webcomponents/commit/5527990))
* **Itemnavigation:** add paging behaviour ([#1116](https://github.com/SAP/ui5-webcomponents/issues/1116)) ([1cb0832](https://github.com/SAP/ui5-webcomponents/commit/1cb0832))
* **ScrollEnablement:** enhance implementation to work on desktop ([#1374](https://github.com/SAP/ui5-webcomponents/issues/1374)) ([2567bea](https://github.com/SAP/ui5-webcomponents/commit/2567bea))


### BREAKING CHANGES

* **framework:** remove `set/get` for compact size, use CSS class `ui5-content-density-compact` as a replacement.





# [0.18.0](https://github.com/SAP/ui5-webcomponents/compare/v0.17.0...v0.18.0) (2019-12-02)


### Bug Fixes

* **ItemNavigation:** fix Item Navigation cycling ([#985](https://github.com/SAP/ui5-webcomponents/issues/985)) ([3d46e2d](https://github.com/SAP/ui5-webcomponents/commit/3d46e2d))
* **Framework:** order slots in state as in Light DOM ([#874](https://github.com/SAP/ui5-webcomponents/issues/874)) ([b8efea0](https://github.com/SAP/ui5-webcomponents/commit/b8efea0)), closes [#873](https://github.com/SAP/ui5-webcomponents/issues/873)
* **Framework:** skip waiting for polyfill in case already loaded ([#851](https://github.com/SAP/ui5-webcomponents/issues/851)) ([d5e19f6](https://github.com/SAP/ui5-webcomponents/commit/d5e19f6))
* **Framework:** trigger dom mutation observer independent of insertion order ([#847](https://github.com/SAP/ui5-webcomponents/issues/847)) ([d7d96ec](https://github.com/SAP/ui5-webcomponents/commit/d7d96ec)), closes [#839](https://github.com/SAP/ui5-webcomponents/issues/839)


### Features

* **ItemNavigation:** introduce navigationMode property ([#910](https://github.com/SAP/ui5-webcomponents/issues/910)) ([9c43533](https://github.com/SAP/ui5-webcomponents/commit/9c43533))
* **Configuration:** add animationMode configuration ([#905](https://github.com/SAP/ui5-webcomponents/issues/905)) ([c90e3b0](https://github.com/SAP/ui5-webcomponents/commit/c90e3b0))
* **Framework:** render SVG content with lit svg` ([#904](https://github.com/SAP/ui5-webcomponents/issues/904)) ([59fead4](https://github.com/SAP/ui5-webcomponents/commit/59fead4))
* **Framework:** create Icon bundle ([#929](https://github.com/SAP/ui5-webcomponents/issues/929)) ([4634428](https://github.com/SAP/ui5-webcomponents/commit/4634428))





# [0.17.0](https://github.com/SAP/ui5-webcomponents/compare/v0.16.0...v0.17.0) (2019-10-11)

**Note:** Version bump only for package @ui5/webcomponents-base





# [0.16.0](https://github.com/SAP/ui5-webcomponents/compare/v0.15.0...v0.16.0) (2019-10-03)


### Bug Fixes

* **DOMEventHandler:** does not crash in edge cases ([#774](https://github.com/SAP/ui5-webcomponents/issues/774)) ([2576883](https://github.com/SAP/ui5-webcomponents/commit/2576883))
* **FocusHelper:** handles SVG's focus method on IE ([#721](https://github.com/SAP/ui5-webcomponents/issues/721)) ([52517c4](https://github.com/SAP/ui5-webcomponents/commit/52517c4))
* **CSS Transform:** host selector not removed when there is trailing whitespace ([#780](https://github.com/SAP/ui5-webcomponents/issues/780)) ([b5d8fde](https://github.com/SAP/ui5-webcomponents/commit/b5d8fde))
* **UI5Element:** parent elements properly await for children upgrade ([#645](https://github.com/SAP/ui5-webcomponents/issues/645)) ([0e976f8](https://github.com/SAP/ui5-webcomponents/commit/0e976f8))


### Code Refactoring

* **Configuration:** make configuration initial only ([#638](https://github.com/SAP/ui5-webcomponents/issues/638)) ([86ad25b](https://github.com/SAP/ui5-webcomponents/commit/86ad25b)))


### Features

* **Configuration:** add configuration for calendar first day of the week ([#627](https://github.com/SAP/ui5-webcomponents/issues/627)) ([9c6df48](https://github.com/SAP/ui5-webcomponents/commit/9c6df48))
* add support for angular two way data binding ([#706](https://github.com/SAP/ui5-webcomponents/issues/706)) ([16820e4](https://github.com/SAP/ui5-webcomponents/commit/16820e4))
* **Tooling:** add new component script ([#747](https://github.com/SAP/ui5-webcomponents/issues/747)) ([171a36f](https://github.com/SAP/ui5-webcomponents/commit/171a36f))


### BREAKING CHANGES

* **Theming:** Theming.js no longer has getTheme and setTheme methods, use the Configuration.js instead.


# [0.15.0](https://github.com/SAP/ui5-webcomponents/compare/v0.14.0...v0.15.0) (2019-07-04)


### Bug Fixes

* **framework:** fix redundant event dispatch ([#599](https://github.com/SAP/ui5-webcomponents/issues/599)) ([dc0cda2](https://github.com/SAP/ui5-webcomponents/commit/dc0cda2))





## [0.14.0](https://github.com/SAP/ui5-webcomponents/compare/v0.13.1...v0.14.0) (2019-06-28)

**Note:** Version bump only for package @ui5/webcomponents-base

## [0.13.1](https://github.com/SAP/ui5-webcomponents/compare/v0.13.0...v0.13.1) (2019-06-22)

**Note:** Version bump only for package @ui5/webcomponents-base





# [0.13.0](https://github.com/SAP/ui5-webcomponents/compare/v0.12.0...v0.13.0) (2019-06-21)


### Bug Fixes

* fix broken translations ([#548](https://github.com/SAP/ui5-webcomponents/issues/548)) ([37b2b07](https://github.com/SAP/ui5-webcomponents/commit/37b2b07))
* remove custom "falsy" checks from ifDefined ([#544](https://github.com/SAP/ui5-webcomponents/issues/544)) ([92a85fa](https://github.com/SAP/ui5-webcomponents/commit/92a85fa))


### Code Refactoring

* **ui5-select:** change default slot from list items to options ([#532](https://github.com/SAP/ui5-webcomponents/issues/532)) ([2e4486b](https://github.com/SAP/ui5-webcomponents/commit/2e4486b))


### BREAKING CHANGES

* **ui5-select:** Use ui5-option instead of ui5-li in ui5-select





# [0.12.0](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.12.0) (2019-06-10)


### Bug Fixes

* access DOM in connectedCallback instead of constructor ([#524](https://github.com/SAP/ui5-webcomponents/issues/524)) ([0f3b8e4](https://github.com/SAP/ui5-webcomponents/commit/0f3b8e4))
* do not use assignedElements ([#432](https://github.com/SAP/ui5-webcomponents/issues/432)) ([c54c812](https://github.com/SAP/ui5-webcomponents/commit/c54c812))


### Features

* inline english texts if no translation is fetched ([#479](https://github.com/SAP/ui5-webcomponents/issues/479)) ([abfb221](https://github.com/SAP/ui5-webcomponents/commit/abfb221))
* **base:** implement late validation ([#522](https://github.com/SAP/ui5-webcomponents/issues/522)) ([c452d60](https://github.com/SAP/ui5-webcomponents/commit/c452d60))





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
