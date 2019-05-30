# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.11.1](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.11.1) (2019-05-30)

**Note:** Version bump only for package @ui5/webcomponents





# [0.11.0](https://github.com/SAP/ui5-webcomponents/compare/v0.10.1...v0.11.0) (2019-05-22)


### Bug Fixes

* **ui5-checkbox:** correct default values of the boolean props  ([#408](https://github.com/SAP/ui5-webcomponents/issues/408)) ([9bdd2c5](https://github.com/SAP/ui5-webcomponents/commit/9bdd2c5))
* **ui5-messagestrip:** remove height 100% on element tag ([#387](https://github.com/SAP/ui5-webcomponents/issues/387)) ([4b64a9c](https://github.com/SAP/ui5-webcomponents/commit/4b64a9c))
* **ui5-panel:** add missing dependency for ui5-icon ([#406](https://github.com/SAP/ui5-webcomponents/issues/406)) ([650bcb0](https://github.com/SAP/ui5-webcomponents/commit/650bcb0))


### Code Refactoring

* **ui5-datepicker:** rename event 'liveChange' to 'input' ([#394](https://github.com/SAP/ui5-webcomponents/pull/394))
* **ui5-panel:** remove backgroundDesign property ([#384](https://github.com/SAP/ui5-webcomponents/pull/384))
* **ui5-panel:** remove backgroundDesign property ([#383](https://github.com/SAP/ui5-webcomponents/pull/383))
* **ui5-checkbox:** rename "readOnly" to "readonly" ([#413](https://github.com/SAP/ui5-webcomponents/pull/413))


### Features

* **ui5-list:** selectionChange event provides previousSelection items ([#418](https://github.com/SAP/ui5-webcomponents/issues/418)) ([f0fc8f2](https://github.com/SAP/ui5-webcomponents/commit/f0fc8f2))
* **ui5-multi-combobox:** initial implementation ([#379](https://github.com/SAP/ui5-webcomponents/issues/379)) ([115900b](https://github.com/SAP/ui5-webcomponents/commit/115900b))
* **ui5-shellbar:** API improvements ([#421](https://github.com/SAP/ui5-webcomponents/issues/421)) ([e0ff36d](https://github.com/SAP/ui5-webcomponents/commit/e0ff36d))


### BREAKING CHANGES

* **ui5-list:** the "selectionChange" event param "items" has been renamed to "selectedItems".
* **ui5-list:** the "backgroundDesign" property has been removed, use the corresponding
CSS variable (--_ui5_listitem_background_color) to alter the list items` background.
* **ui5-panel:** the "backgroundDesign" property has been removed, use the corresponding
CSS variables (--_ui5_panel_background_color) to alter the panel background.
* **ui5-datepicker:** 'liveChange' event has been renamed to 'input'.
* **ui5-checkbox:** property "readOnly" has been renamed to "readonly".
* **ui5-radiobutton:** property "readOnly" has been renamed to "readonly".





## [0.10.1](https://github.com/SAP/ui5-webcomponents/compare/v0.10.0...v0.10.1) (2019-04-24)


### Bug Fixes

* **ui5-li:** fix styles import extension ([#351](https://github.com/SAP/ui5-webcomponents/issues/351)) ([4fae1ff](https://github.com/SAP/ui5-webcomponents/commit/4fae1ff))
* **ui5-messagestrip:** fix layout in ie ([#353](https://github.com/SAP/ui5-webcomponents/issues/353)) ([ca5f62c](https://github.com/SAP/ui5-webcomponents/commit/ca5f62c))
* switch theme for single imported components ([#356](https://github.com/SAP/ui5-webcomponents/issues/356)) ([dcd64a9](https://github.com/SAP/ui5-webcomponents/commit/dcd64a9))
* **ui5-radiobutton:** fix single selection within group ([#355](https://github.com/SAP/ui5-webcomponents/issues/355)) ([371fb88](https://github.com/SAP/ui5-webcomponents/commit/371fb88))
* **ui5-select:** preselect first item if none is selected ([#358](https://github.com/SAP/ui5-webcomponents/issues/358)) ([3d18420](https://github.com/SAP/ui5-webcomponents/commit/3d18420))
* **ui5-togglebutton:** add base styles ([#352](https://github.com/SAP/ui5-webcomponents/issues/352)) ([f4dee1c](https://github.com/SAP/ui5-webcomponents/commit/f4dee1c))


### Code Refactoring

* **ui5-radiobutton:** improve group handling ([#348](https://github.com/SAP/ui5-webcomponents/issues/348)) ([4d7d9c3](https://github.com/SAP/ui5-webcomponents/commit/4d7d9c3))
* **ui5-radiobutton:** enable radio button form support ([#357](https://github.com/SAP/ui5-webcomponents/issues/357)) ([96a0517](https://github.com/SAP/ui5-webcomponents/commit/96a0517))


### BREAKING CHANGES

* **ui5-radiobutton:** the property "group" is replaced by the "name" property.





# [0.10.0](https://github.com/SAP/ui5-webcomponents/compare/v0.9.0...v0.10.0) (2019-04-22)


### Bug Fixes

* **docs:** fix card sample page ([#305](https://github.com/SAP/ui5-webcomponents/issues/305)) ([d91f237](https://github.com/SAP/ui5-webcomponents/commit/d91f237))
* **ui5-button:** fix height ([#331](https://github.com/SAP/ui5-webcomponents/issues/331)) ([98a2c4e](https://github.com/SAP/ui5-webcomponents/commit/98a2c4e))
* **ui5-button:** fix width in ie11 ([#325](https://github.com/SAP/ui5-webcomponents/issues/325)) ([b00ab52](https://github.com/SAP/ui5-webcomponents/commit/b00ab52))
* **ui5-button:** removes active state after tabbing on an pressed button ([#335](https://github.com/SAP/ui5-webcomponents/issues/335)) ([0776e01](https://github.com/SAP/ui5-webcomponents/commit/0776e01))
* **ui5-checkbox:** correct setting of aria-readonly ([#220](https://github.com/SAP/ui5-webcomponents/issues/220)) ([c1f98a3](https://github.com/SAP/ui5-webcomponents/commit/c1f98a3))
* **ui5-checkbox:** fIx checkbox width in ie11 ([d58320b](https://github.com/SAP/ui5-webcomponents/commit/d58320b))
* **ui5-checkbox:** fixes issues with focus outline and wrapping ([#238](https://github.com/SAP/ui5-webcomponents/issues/238)) ([02bb56e](https://github.com/SAP/ui5-webcomponents/commit/02bb56e))
* **ui5-checkbox:** remove background from touchable area ([#226](https://github.com/SAP/ui5-webcomponents/issues/226)) ([3412ef3](https://github.com/SAP/ui5-webcomponents/commit/3412ef3))
* **ui5-li:** fix delete list item button height ([#221](https://github.com/SAP/ui5-webcomponents/issues/221)) ([a008022](https://github.com/SAP/ui5-webcomponents/commit/a008022))
* make fallback script work with multiple variables per line ([#252](https://github.com/SAP/ui5-webcomponents/issues/252)) ([298a165](https://github.com/SAP/ui5-webcomponents/commit/298a165))
* **ui5-li:** fix description text in compact mode ([#211](https://github.com/SAP/ui5-webcomponents/issues/211)) ([cadf996](https://github.com/SAP/ui5-webcomponents/commit/cadf996))
* **ui5-li-custom:** enable setting height of the custom content ([#311](https://github.com/SAP/ui5-webcomponents/issues/311)) ([76bf9f3](https://github.com/SAP/ui5-webcomponents/commit/76bf9f3))
* prevent merging of :host(tag) and tag css rules ([#349](https://github.com/SAP/ui5-webcomponents/issues/349)) ([f23085c](https://github.com/SAP/ui5-webcomponents/commit/f23085c))
* **ui5-li:** fix typo ([#224](https://github.com/SAP/ui5-webcomponents/issues/224)) ([cb781f1](https://github.com/SAP/ui5-webcomponents/commit/cb781f1))
* **ui5-link:** noreferrer for cross-origin links ([#202](https://github.com/SAP/ui5-webcomponents/issues/202)) ([5902704](https://github.com/SAP/ui5-webcomponents/commit/5902704))
* **ui5-panel:** correct inon size on small screens ([#213](https://github.com/SAP/ui5-webcomponents/issues/213)) ([a98f544](https://github.com/SAP/ui5-webcomponents/commit/a98f544))
* **ui5-radiobutton:** fix focus in ie11 ([#327](https://github.com/SAP/ui5-webcomponents/issues/327)) ([b59abd6](https://github.com/SAP/ui5-webcomponents/commit/b59abd6))
* **ui5-radiobutton:** fix keyboard handling on TAB/SHIFT+TAB ([#231](https://github.com/SAP/ui5-webcomponents/issues/231)) ([f2a18cf](https://github.com/SAP/ui5-webcomponents/commit/f2a18cf))
* **ui5-shellbar:** add missing dependency to ui5-popover ([#234](https://github.com/SAP/ui5-webcomponents/issues/234)) ([912f434](https://github.com/SAP/ui5-webcomponents/commit/912f434))
* **ui5-shellbar:** pass correct values for events details ([#298](https://github.com/SAP/ui5-webcomponents/issues/298)) ([2641ec6](https://github.com/SAP/ui5-webcomponents/commit/2641ec6))
* **ui5-shellbar:** set correct font-family to primary title ([#228](https://github.com/SAP/ui5-webcomponents/issues/228)) ([839a66e](https://github.com/SAP/ui5-webcomponents/commit/839a66e))
* **ui5-switch:** fix layouting on IE ([#223](https://github.com/SAP/ui5-webcomponents/issues/223)) ([1111dbf](https://github.com/SAP/ui5-webcomponents/commit/1111dbf))
* **ui5-togglebutton:** correct default btn hover and text hover ([#332](https://github.com/SAP/ui5-webcomponents/issues/332)) ([280f85d](https://github.com/SAP/ui5-webcomponents/commit/280f85d))
* select correctly opens on click ([#235](https://github.com/SAP/ui5-webcomponents/issues/235)) ([a4915df](https://github.com/SAP/ui5-webcomponents/commit/a4915df))
* transform css files to es6 modules ([#306](https://github.com/SAP/ui5-webcomponents/issues/306)) ([dbb98c8](https://github.com/SAP/ui5-webcomponents/commit/dbb98c8))


### Code Refactoring

* remove ui5-toolbar ([#198](https://github.com/SAP/ui5-webcomponents/issues/198)) ([2e14428](https://github.com/SAP/ui5-webcomponents/commit/2e14428))
* **base:** flatten project structure ([#227](https://github.com/SAP/ui5-webcomponents/issues/227)) ([0e8e460](https://github.com/SAP/ui5-webcomponents/commit/0e8e460))
* **ui5-panel:** rename the expand event to toggle ([#216](https://github.com/SAP/ui5-webcomponents/issues/216)) ([2608100](https://github.com/SAP/ui5-webcomponents/commit/2608100))
* **ui5-shellbar:** rename press handlers param ([#300](https://github.com/SAP/ui5-webcomponents/issues/300)) ([5d1c920](https://github.com/SAP/ui5-webcomponents/commit/5d1c920))
* **ui5-tabcontainer:** refactor the component ([#318](https://github.com/SAP/ui5-webcomponents/issues/318)) ([aa516ff](https://github.com/SAP/ui5-webcomponents/commit/aa516ff))
* **ui5-timeline:** change timestamp property to subtitleText ([#321](https://github.com/SAP/ui5-webcomponents/issues/321)) ([287548e](https://github.com/SAP/ui5-webcomponents/commit/287548e))


### Features

* adds static method styles to base class ([#345](https://github.com/SAP/ui5-webcomponents/issues/345)) ([b61860f](https://github.com/SAP/ui5-webcomponents/commit/b61860f))
* **ui5-select:** selection can be changed with arrows while closed ([#254](https://github.com/SAP/ui5-webcomponents/issues/254)) ([bb46034](https://github.com/SAP/ui5-webcomponents/commit/bb46034))
* enable form support and name attribute for inputs ([#337](https://github.com/SAP/ui5-webcomponents/issues/337)) ([188d231](https://github.com/SAP/ui5-webcomponents/commit/188d231))
* framework-level support for CSS Custom Properties ([#196](https://github.com/SAP/ui5-webcomponents/issues/196)) ([291829a](https://github.com/SAP/ui5-webcomponents/commit/291829a))
* make css vars fallback script work with embedded vars ([#251](https://github.com/SAP/ui5-webcomponents/issues/251)) ([f81c117](https://github.com/SAP/ui5-webcomponents/commit/f81c117))
* **ui5-card:** fires headerPress event upon header click ([#250](https://github.com/SAP/ui5-webcomponents/issues/250)) ([59b80be](https://github.com/SAP/ui5-webcomponents/commit/59b80be))
* **ui5-panel:** make the header clickable ([#204](https://github.com/SAP/ui5-webcomponents/issues/204)) ([c5c1786](https://github.com/SAP/ui5-webcomponents/commit/c5c1786))
* **ui5-select:** select opens with space ([#245](https://github.com/SAP/ui5-webcomponents/issues/245)) ([a6c4d29](https://github.com/SAP/ui5-webcomponents/commit/a6c4d29))
* provide named exports for some base modules ([#347](https://github.com/SAP/ui5-webcomponents/issues/347)) ([2e2439a](https://github.com/SAP/ui5-webcomponents/commit/2e2439a))
* **ui5-shellbar:** adds logoPress and coPilotPress events ([#301](https://github.com/SAP/ui5-webcomponents/issues/301)) ([f221123](https://github.com/SAP/ui5-webcomponents/commit/f221123))
* **ui5-shellbar:** menuItems slot and menuItemPress event ([#317](https://github.com/SAP/ui5-webcomponents/issues/317)) ([f24f78b](https://github.com/SAP/ui5-webcomponents/commit/f24f78b))


### BREAKING CHANGES

* **ui5-timeline:** 'timestamp' and 'timeFormat'  properties are removed.
Instead use subtitle-text property and directly format the text as
desired.
* the ui5-toolbar component is removed, we recommend using div or similar HTML tag in combination with flex instead.
* **ui5-panel:** the expand event is removed, use the toggle event instead.
* **ui5-tabcontainer:** 'headerMode' property is removed. All Tabs by Fiori guidelines are rendered in
inline mode
* **ui5-tabcontainer:** 'headerBackgroundDesign' property is removed
* **ui5-tabcontainer:** 'backgroundDesign' property is removed
* **ui5-tabcontainer:** 'content' property is removed. Instead if you want to use the TabContainer as
a filter just use it with 'collapsed' set to true and 'fixed' set to true
* **ui5-tabcontainer:** 'TabContainerDensityMode' is deleted. To set different size modes use ?sap-ui-compactSize=true
* **ui5-tabcontainer:** 'selectedIndex' property is removed. Instead use 'selected' property of the Tab
* **ui5-tabcontainer:** Tab's 'count' property is removed. Instead use the additional-text property
* **ui5-tabcontainer:** Tab's 'design' property is removed
* **ui5-shellbar:** titlePress event is removed and replaced by menuItems slot.
* **base:** All files required from the base now have different
path. sap/ui/webcomponents/base/ is removed.

old: @ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent
new: @ui5/webcomponents-base/src/WebComponent




# [0.9.0](https://github.com/SAP/ui5-webcomponents/compare/v0.8.0...v0.9.0) (2019-03-18)


### Features

* **ui5-messagestrip:** initial implementation ([#80](https://github.com/SAP/ui5-webcomponents/issues/80)) ([cbc9c75](https://github.com/SAP/ui5-webcomponents/commit/cbc9c75))


### Bug Fixes

* fix HCB colours for Icon, TextArea and TableCell content ([#128](https://github.com/SAP/ui5-webcomponents/issues/128)) ([9fb7dc5](https://github.com/SAP/ui5-webcomponents/commit/9fb7dc5))
* **ui5-datepicker:** enable day selection in IE ([#162](https://github.com/SAP/ui5-webcomponents/issues/162)) ([18a3c43](https://github.com/SAP/ui5-webcomponents/commit/18a3c43))
* **ui5-icon:** correct icon graphic vertical alignment in IE ([#142](https://github.com/SAP/ui5-webcomponents/issues/142)) ([98be562](https://github.com/SAP/ui5-webcomponents/commit/98be562))
* **ui5-input:** fire change in sync with the native input ([#168](https://github.com/SAP/ui5-webcomponents/issues/168)) ([55fa533](https://github.com/SAP/ui5-webcomponents/commit/55fa533))
* **ui5-label:** enable text truncation in IE ([#136](https://github.com/SAP/ui5-webcomponents/issues/136)) ([ef00170](https://github.com/SAP/ui5-webcomponents/commit/ef00170))
* fix source maps ([#181](https://github.com/SAP/ui5-webcomponents/issues/181)) ([7084c96](https://github.com/SAP/ui5-webcomponents/commit/7084c96))
* **ui5-list:** correct backward navigation with SHIFT+TAB ([#193](https://github.com/SAP/ui5-webcomponents/issues/193)) ([037409d](https://github.com/SAP/ui5-webcomponents/commit/037409d))


### Code Refactoring

* **ui5-input:** fire input, instead of liveChange ([#159](https://github.com/SAP/ui5-webcomponents/issues/159)) ([b8d978a](https://github.com/SAP/ui5-webcomponents/commit/b8d978a))


### BREAKING CHANGES

* **ui5-input:** liveChange event is no longer fired, listen for the input event instead.





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
* **ui5-checkbox:** wait for ui5-label definition ([#115](https://github.com/SAP/ui5-webcomponents/issues/115)) ([14067bd](https://github.com/SAP/ui5-webcomponents/commit/14067bd))
* **ui5-checkbox:** show default cursor over text ([#9](https://github.com/SAP/ui5-webcomponents/issues/9)) ([28d5ac0](https://github.com/SAP/ui5-webcomponents/commit/28d5ac0))
* **ui5-checkbox:** fix focus outline appearance in Compact + RTL ([#23](https://github.com/SAP/ui5-webcomponents/issues/23)) ([9b18490](https://github.com/SAP/ui5-webcomponents/commit/9b18490))
* **ui5-datepicker:** display extreme values correctly ([#75](https://github.com/SAP/ui5-webcomponents/issues/75)) ([d1c7259](https://github.com/SAP/ui5-webcomponents/commit/d1c7259))
* **ui5-datepicker:** fix icon color in pressed state ([#63](https://github.com/SAP/ui5-webcomponents/issues/63)) ([a03a51a](https://github.com/SAP/ui5-webcomponents/commit/a03a51a))
* **ui5-input:** fix slotted icon default size ([#105](https://github.com/SAP/ui5-webcomponents/issues/105)) ([0cfe254](https://github.com/SAP/ui5-webcomponents/commit/0cfe254))
* **ui5-li:** fix height with title and description in Compact ([#70](https://github.com/SAP/ui5-webcomponents/issues/70)) ([db17c71](https://github.com/SAP/ui5-webcomponents/commit/db17c71))
* **ui5-popover:** fix appearance on ios within iframe ([#60](https://github.com/SAP/ui5-webcomponents/issues/60)) ([a62c198](https://github.com/SAP/ui5-webcomponents/commit/a62c198))
* **ui5-popover:** fix bottom border radius ([#34](https://github.com/SAP/ui5-webcomponents/issues/34)) ([2daefc1](https://github.com/SAP/ui5-webcomponents/commit/2daefc1))
* **ui5-radiobutton:** fix focus lost upon text click in IE ([#24](https://github.com/SAP/ui5-webcomponents/issues/24)) ([7a00caf](https://github.com/SAP/ui5-webcomponents/commit/7a00caf))
* **ui5-radiobutton:** fix focus outline in Compact & RTL ([#18](https://github.com/SAP/ui5-webcomponents/issues/18)) ([9afa81b](https://github.com/SAP/ui5-webcomponents/commit/9afa81b))
* **ui5-select:** prevent scrolling upon ALt+ArrowDown/Up/F4 ([#7](https://github.com/SAP/ui5-webcomponents/issues/7)) ([c22eae1](https://github.com/SAP/ui5-webcomponents/commit/c22eae1))
* **ui5-select:** fix selection, styling and playground sample ([#4](https://github.com/SAP/ui5-webcomponents/issues/4)) ([f0a90b7](https://github.com/SAP/ui5-webcomponents/commit/f0a90b7))
* **ui5-tabcontainer:** wait for ui5-popover definition ([#46](https://github.com/SAP/ui5-webcomponents/issues/46)) ([a6f5c2b](https://github.com/SAP/ui5-webcomponents/commit/a6f5c2b))
* **ui5-tabcontainer:** click on left arrow correctly scrolls to left in textOnly ([#97](https://github.com/SAP/ui5-webcomponents/issues/97)) ([a89de1a](https://github.com/SAP/ui5-webcomponents/commit/a89de1a))
* **ui5-textarea:** focus outline with character counter ([#32](https://github.com/SAP/ui5-webcomponents/issues/32)) ([0900483](https://github.com/SAP/ui5-webcomponents/commit/0900483))


### BREAKING CHANGES

* any applications that wants to support Edge and/or IE11 should now import the respective browser support module. For details, see the [README.md](/README.md#browser-support)
* **ui5-tabcontainer:** The TabContainer "selected-key" and Tab "key" properties are removed. Use TabContainer "selectedIndex" property (selected-index attribute) to set and get the selected tab.
* addCustomCSS is no longer on the Core object. Use Theming instead. [#58](https://github.com/SAP/ui5-webcomponents/pull/58)
