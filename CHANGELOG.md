# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.12](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2021-02-18)

### New package
**framework:** * introduce @ui5/webcomponents-ie11 package ([#2686](https://github.com/SAP/ui5-webcomponents/issues/2686)) ([1d3b37e](https://github.com/SAP/ui5-webcomponents/commit/1d3b37e))

### New Components

* **ui5-color-palette:** introduce new component ([#2731](https://github.com/SAP/ui5-webcomponents/issues/2731)) ([772424e](https://github.com/SAP/ui5-webcomponents/commit/772424e))
* **ui5-color-picker:** introduce new component ([#2769](https://github.com/SAP/ui5-webcomponents/issues/2769)) ([6a70e5a](https://github.com/SAP/ui5-webcomponents/commit/6a70e5a))
* **ui5-page:** introduce new component ([#2685](https://github.com/SAP/ui5-webcomponents/issues/2685)) ([bd09e17](https://github.com/SAP/ui5-webcomponents/commit/bd09e17)), closes [#2433](https://github.com/SAP/ui5-webcomponents/issues/2433)


### Bug Fixes


* **ui5-avatar:** correct icon color ([#2658](https://github.com/SAP/ui5-webcomponents/issues/2658)) ([5a85687](https://github.com/SAP/ui5-webcomponents/commit/5a85687)), closes [#2555](https://github.com/SAP/ui5-webcomponents/issues/2555)
* **ui5-calendar:** Today date is propertly calculated no matter what timezone ([#2660](https://github.com/SAP/ui5-webcomponents/issues/2660)) ([32dd0ef](https://github.com/SAP/ui5-webcomponents/commit/32dd0ef))
* **ui5-checkbox:** set "aria-hidden" to inner input ([#2828](https://github.com/SAP/ui5-webcomponents/issues/2828)) ([d237401](https://github.com/SAP/ui5-webcomponents/commit/d237401)), closes [#2786](https://github.com/SAP/ui5-webcomponents/issues/2786)
* **ui5-checkbox:** fix vertical aignment when "wrap" is true ([#2747](https://github.com/SAP/ui5-webcomponents/issues/2747)) ([9f027f1](https://github.com/SAP/ui5-webcomponents/commit/9f027f1))
* **ui5-combobox:** fix behaviour when "Enter: is clicked ([a10acc8](https://github.com/SAP/ui5-webcomponents/commit/a10acc8))
* **ui5-combobox:** cancel user action when pressing "X" on mobile ([#2742](https://github.com/SAP/ui5-webcomponents/issues/2742)) ([691c2e4](https://github.com/SAP/ui5-webcomponents/commit/691c2e4)), closes [#2449](https://github.com/SAP/ui5-webcomponents/issues/2449)
* **ui5-combobox, ui5-multicombobox:** center value state text ([#2733](https://github.com/SAP/ui5-webcomponents/issues/2733)) ([b2c770a](https://github.com/SAP/ui5-webcomponents/commit/b2c770a)), closes [#2274](https://github.com/SAP/ui5-webcomponents/issues/2274)
* **ui5-date-picker:** input type is now conveyed ([#2628](https://github.com/SAP/ui5-webcomponents/issues/2628)) ([70e3269](https://github.com/SAP/ui5-webcomponents/commit/70e3269)), closes [#2604](https://github.com/SAP/ui5-webcomponents/issues/2604)
* **ui5-icon:** alignment issue in Safari ([#2746](https://github.com/SAP/ui5-webcomponents/issues/2746)) ([daa51e7](https://github.com/SAP/ui5-webcomponents/commit/daa51e7))
* **ui5-icon:** remove vertical icon flip in RTL ([#2645](https://github.com/SAP/ui5-webcomponents/issues/2645)) ([0120960](https://github.com/SAP/ui5-webcomponents/commit/0120960)), closes [#2644](https://github.com/SAP/ui5-webcomponents/issues/2644)
* **ui5-icon:** ui5-icon i18n works for all packages ([#2816](https://github.com/SAP/ui5-webcomponents/issues/2816)) ([91e16a1](https://github.com/SAP/ui5-webcomponents/commit/91e16a1))
* **ui5-input:** enable centering of text ([#2788](https://github.com/SAP/ui5-webcomponents/issues/2788)) ([bd1bd6e](https://github.com/SAP/ui5-webcomponents/commit/bd1bd6e))
* **ui5-input:** focus is handled properly ([#2670](https://github.com/SAP/ui5-webcomponents/issues/2670)) ([2c033aa](https://github.com/SAP/ui5-webcomponents/commit/2c033aa))
* **ui5-input:** Obsolete accessibility API removed ([#2721](https://github.com/SAP/ui5-webcomponents/issues/2721)) ([014c985](https://github.com/SAP/ui5-webcomponents/commit/014c985)), closes [#2605](https://github.com/SAP/ui5-webcomponents/issues/2605)
* **ui5-input:** prevent selection of suggestion group item ([#2777](https://github.com/SAP/ui5-webcomponents/issues/2777)) ([6cc458b](https://github.com/SAP/ui5-webcomponents/commit/6cc458b)), closes [#2255](https://github.com/SAP/ui5-webcomponents/issues/2255)
* **ui5-input:** fix value state message width ([#2736](https://github.com/SAP/ui5-webcomponents/issues/2736)) ([1e8082d](https://github.com/SAP/ui5-webcomponents/commit/1e8082d))
* **ui5-li-notification:** now possible to not have a description ([#2744](https://github.com/SAP/ui5-webcomponents/issues/2744)) ([ef35f84](https://github.com/SAP/ui5-webcomponents/commit/ef35f84))
* **ui5-li-notification-group:** align priority icon ([#2584](https://github.com/SAP/ui5-webcomponents/issues/2584)) ([ff247f0](https://github.com/SAP/ui5-webcomponents/commit/ff247f0))
* **ui5-list:** fix JS error on focusin ([#2720](https://github.com/SAP/ui5-webcomponents/issues/2720)) ([b36e54e](https://github.com/SAP/ui5-webcomponents/commit/b36e54e))
* **ui5-list:** remove busy indicator DOM ([#2712](https://github.com/SAP/ui5-webcomponents/issues/2712)) ([fe76278](https://github.com/SAP/ui5-webcomponents/commit/fe76278))
* **ui5-list:** show busy indicator over the list ([#2684](https://github.com/SAP/ui5-webcomponents/issues/2684)) ([ad56eaa](https://github.com/SAP/ui5-webcomponents/commit/ad56eaa))
* **ui5-multi-combobox:** fix livechange behaviour ([#2656](https://github.com/SAP/ui5-webcomponents/issues/2656)) ([57820dd](https://github.com/SAP/ui5-webcomponents/commit/57820dd))
* **ui5-multi-combobox:** The initial focus is set on the ui5-dialog ([#2702](https://github.com/SAP/ui5-webcomponents/issues/2702)) ([aeed733](https://github.com/SAP/ui5-webcomponents/commit/aeed733))
* **ui5-multi-input:** fix appearance in RTL ([#2782](https://github.com/SAP/ui5-webcomponents/issues/2782)) ([e842f23](https://github.com/SAP/ui5-webcomponents/commit/e842f23)), closes [#2749](https://github.com/SAP/ui5-webcomponents/issues/2749)
* **ui5-multicombobox:** hide placeholder when tokens are present ([#2785](https://github.com/SAP/ui5-webcomponents/issues/2785)) ([d769a0d](https://github.com/SAP/ui5-webcomponents/commit/d769a0d)), closes [#2261](https://github.com/SAP/ui5-webcomponents/issues/2261)
* **ui5-multiinput:** hide placeholder when tokens are present ([#2789](https://github.com/SAP/ui5-webcomponents/issues/2789)) ([679dae3](https://github.com/SAP/ui5-webcomponents/commit/679dae3)), closes [#2261](https://github.com/SAP/ui5-webcomponents/issues/2261)
* **ui5-popover:** correctly position a popover if dynamically created ([#2679](https://github.com/SAP/ui5-webcomponents/issues/2679)) ([5a872b0](https://github.com/SAP/ui5-webcomponents/commit/5a872b0))
* **ui5-popover, ui5-dialog:** do not render empty headers ([#2770](https://github.com/SAP/ui5-webcomponents/issues/2770)) ([7f0bd6a](https://github.com/SAP/ui5-webcomponents/commit/7f0bd6a)), closes [#2694](https://github.com/SAP/ui5-webcomponents/issues/2694)
* **ui5-popup:** correct focus when there is no focusable content ([#2583](https://github.com/SAP/ui5-webcomponents/issues/2583)) ([bf8caaf](https://github.com/SAP/ui5-webcomponents/commit/bf8caaf))
* **ui5-popup:** prevent focus on elements below block layer ([#2800](https://github.com/SAP/ui5-webcomponents/issues/2800)) ([f2f3889](https://github.com/SAP/ui5-webcomponents/commit/f2f3889)), closes [#2626](https://github.com/SAP/ui5-webcomponents/issues/2626)
* **ui5-popup): fix(ui5-popup:** hide block layer if popup is closed ([#2799](https://github.com/SAP/ui5-webcomponents/issues/2799)) ([6f82e42](https://github.com/SAP/ui5-webcomponents/commit/6f82e42)), closes [#2696](https://github.com/SAP/ui5-webcomponents/issues/2696)
* **ui5-radiobutton:** fix tab order within group ([#2783](https://github.com/SAP/ui5-webcomponents/issues/2783)) ([d6a7b81](https://github.com/SAP/ui5-webcomponents/commit/d6a7b81)), closes [#2774](https://github.com/SAP/ui5-webcomponents/issues/2774)
* **ui5-select:** correct role and screen reader speech out ([#2587](https://github.com/SAP/ui5-webcomponents/issues/2587)) ([59497ee](https://github.com/SAP/ui5-webcomponents/commit/59497ee)), closes [#2485](https://github.com/SAP/ui5-webcomponents/issues/2485) [#2339](https://github.com/SAP/ui5-webcomponents/issues/2339) [#2142](https://github.com/SAP/ui5-webcomponents/issues/2142)
* **ui5-select:** fix popover opening ([#2687](https://github.com/SAP/ui5-webcomponents/issues/2687)) ([53418fb](https://github.com/SAP/ui5-webcomponents/commit/53418fb)), closes [#2682](https://github.com/SAP/ui5-webcomponents/issues/2682)
* **ui5-tabcontainer:** overflow menu button is added a title ([#2639](https://github.com/SAP/ui5-webcomponents/issues/2639)) ([943e4ce](https://github.com/SAP/ui5-webcomponents/commit/943e4ce)), closes [#2607](https://github.com/SAP/ui5-webcomponents/issues/2607)
* **ui5-tree:** accessibility improvements ([#2671](https://github.com/SAP/ui5-webcomponents/issues/2671)) ([849d052](https://github.com/SAP/ui5-webcomponents/commit/849d052)), closes [#2553](https://github.com/SAP/ui5-webcomponents/issues/2553)
* **ui5-upload-collection:** wrap noDataText/Desc text ([#2674](https://github.com/SAP/ui5-webcomponents/issues/2674)) ([c48bfe7](https://github.com/SAP/ui5-webcomponents/commit/c48bfe7)), closes [#2672](https://github.com/SAP/ui5-webcomponents/issues/2672)
* **ui5-upload-collection-item:** fix title behaviour on small screens ([#2699](https://github.com/SAP/ui5-webcomponents/issues/2699)) ([bb7c952](https://github.com/SAP/ui5-webcomponents/commit/bb7c952))
* **ui5-wizard:** observe content height changes ([#2801](https://github.com/SAP/ui5-webcomponents/issues/2801)) ([b4cbc43](https://github.com/SAP/ui5-webcomponents/commit/b4cbc43))
* **theming:** fix error message log ([#2818](https://github.com/SAP/ui5-webcomponents/issues/2818)) ([7a0732a](https://github.com/SAP/ui5-webcomponents/commit/7a0732a))

### Features

* **ui5-calendar:** Add declarative dates support added ([#2648](https://github.com/SAP/ui5-webcomponents/issues/2648)) ([6602fba](https://github.com/SAP/ui5-webcomponents/commit/6602fba))
* **ui5-li-notification*:** full-fill accessibility spec ([#2578](https://github.com/SAP/ui5-webcomponents/issues/2578)) ([20de5ae](https://github.com/SAP/ui5-webcomponents/commit/20de5ae))
* **ui5-multi-combobox:** support two column layout for items ([#2642](https://github.com/SAP/ui5-webcomponents/issues/2642)) ([7742590](https://github.com/SAP/ui5-webcomponents/commit/7742590)), closes [#2637](https://github.com/SAP/ui5-webcomponents/issues/2637)
* **ui5-multi-input:** Implement accessibility specifications ([#2761](https://github.com/SAP/ui5-webcomponents/issues/2761)) ([2e7b968](https://github.com/SAP/ui5-webcomponents/commit/2e7b968))
* **ui5-range-slider:** focus and keyboard handling implementation ([#2620](https://github.com/SAP/ui5-webcomponents/issues/2620)) ([8c71ca4](https://github.com/SAP/ui5-webcomponents/commit/8c71ca4))
* **ui5-select:** add support for disabled select options ([#2730](https://github.com/SAP/ui5-webcomponents/issues/2730)) ([e903164](https://github.com/SAP/ui5-webcomponents/commit/e903164)), closes [#2559](https://github.com/SAP/ui5-webcomponents/issues/2559)
* **ui5-slider:** focus and keyboard handling implementation ([#2614](https://github.com/SAP/ui5-webcomponents/issues/2614)) ([7b78c16](https://github.com/SAP/ui5-webcomponents/commit/7b78c16))
* **ui5-slider, ui5-range-slider:** implement a11y spec ([#2714](https://github.com/SAP/ui5-webcomponents/issues/2714)) ([cb76cf4](https://github.com/SAP/ui5-webcomponents/commit/cb76cf4)), closes [#2513](https://github.com/SAP/ui5-webcomponents/issues/2513)
* **ui5-table:** add growing on scroll ([#2593](https://github.com/SAP/ui5-webcomponents/issues/2593)) ([87520c2](https://github.com/SAP/ui5-webcomponents/commit/87520c2)), closes [#2589](https://github.com/SAP/ui5-webcomponents/issues/2589) [#2570](https://github.com/SAP/ui5-webcomponents/issues/2570)
* **ui5-tree-item:** implement info/infoState attributes ([#2711](https://github.com/SAP/ui5-webcomponents/issues/2711)) ([1f07d50](https://github.com/SAP/ui5-webcomponents/commit/1f07d50)), closes [#2633](https://github.com/SAP/ui5-webcomponents/issues/2633)
* **ui5-wizard:** improve progress navigator responsiveness ([#2590](https://github.com/SAP/ui5-webcomponents/issues/2590)) ([01cd6f9](https://github.com/SAP/ui5-webcomponents/commit/01cd6f9))
* **ui5-calendar:** new features for pickers ([#2598](https://github.com/SAP/ui5-webcomponents/issues/2598)) ([3e684b4](https://github.com/SAP/ui5-webcomponents/commit/3e684b4))
* **framework:** introduce dynamic imports for .json assets ([#2740](https://github.com/SAP/ui5-webcomponents/issues/2740)) ([46e38fb](https://github.com/SAP/ui5-webcomponents/commit/46e38fb))
* **framework:** introduce attachDirectionChange function ([#2646](https://github.com/SAP/ui5-webcomponents/issues/2646)) ([b4f836a](https://github.com/SAP/ui5-webcomponents/commit/b4f836a))
* **framework:** implement ItemNavigation cyclic behavior for multiple rows ([#2780](https://github.com/SAP/ui5-webcomponents/issues/2780)) ([b7ad1ea](https://github.com/SAP/ui5-webcomponents/commit/b7ad1ea))
* **framework:** distrobure icon assets as .svg files ([#2657](https://github.com/SAP/ui5-webcomponents/issues/2657)) ([5b79982](https://github.com/SAP/ui5-webcomponents/commit/5b79982))


### BREAKING CHANGES

* **framework:** introduce dynamic imports for .json assets ([#2740](https://github.com/SAP/ui5-webcomponents/issues/2740)) ([46e38fb](https://github.com/SAP/ui5-webcomponents/commit/46e38fb))

The method **registerI18nBundle** of the @ui5/webcomponents-base/asset-registries/i18n.js module is deprecated in favour of **registerI18nLoader**.

The framework no longer tries to convert .properties files internally and the PropertiesFormatSupport feature is removed. This has to be done by a custom loader using the **@ui5/webcomponents-base/dist/PropertiesFileFormat.js** module.

* **framework:** deprecate RenderScheduler in favor of Render.js ([#2728](https://github.com/SAP/ui5-webcomponents/issues/2728)) ([bc78857](https://github.com/SAP/ui5-webcomponents/commit/bc78857))

`RenderScheduler.js` deprecated. The file will be deleted in a future release. If you were using some of its methods, import these methods from the new `Render.js` module. For example, if you were using:
 ```js 
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
RenderScheduler.renderImmediately(myComponent);
RenderScheduler.renderDeferred(myComponent);
await RenderScheduler.whenFinished();
```
change to:
```js
import { renderFinished, renderImmediately, renderDeferred } from "@ui5/webcomponents-base/dist/Render.js";
renderImmediately(myComponent);
renderDeferred(myComponent);
await renderFinished();
```
`whenFinished` from `RenderScheduler.js` renamed to `renderFinished` and now exported by `Render.js`. For usage, see the previous example

* **framework:** create @ui5/webcomponents-ie11 package ([#2686](https://github.com/SAP/ui5-webcomponents/issues/2686)) ([1d3b37e](https://github.com/SAP/ui5-webcomponents/commit/1d3b37e))

**The legacy browser support is now moved to new ie11 package**. If you used them before add **@ui5/webcomponents-ie11** as a dependency to your project:

`npm i @ui5/webcomponents-ie11 --save`

or

`yarn add @ui5/webcomponents-ie11`

Change the following public imports:

`import "@ui5/webcomponents-base/dist/features/browsersupport/IE11.js";`

to

`import "@ui5/webcomponents-ie11/dist/features/IE11.js";`


and

`import "@ui5/webcomponents-base/dist/features/browsersupport/IE11WithWebComponentsPolyfill.js";`

to

`import "@ui5/webcomponents-ie11/dist/features/IE11WithWebComponentsPolyfill.js";`


**The Legacy Edge browser is no longer supported with the ES6 bundle**, therefore the following import has been removed:

`import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";`

Legacy Edge is still supported with the ES5 bundle. If your app needs to support Legacy Edge, treat it as IE11 and transpile the code to ES5 as you would for IE11.

* **ui5-calendar:** Add declarative dates support added ([#2648](https://github.com/SAP/ui5-webcomponents/issues/2648)) ([6602fba](https://github.com/SAP/ui5-webcomponents/commit/6602fba))

The property **selectedDates** is deprecated for **ui5-calendar**. Instead of setting **selectedDates** as an array of UTC timestamps, please provide instances of **ui5-date** as children of the **ui5-calendar**. Instead of reading the **selectedDates** property to find out which dates the user selected, please read the children of the **ui5-calendar** (instances of **ui5-date** with **value** property).

* **ui5-calendar:** new features for pickers ([#2598](https://github.com/SAP/ui5-webcomponents/issues/2598)) ([3e684b4](https://github.com/SAP/ui5-webcomponents/commit/3e684b4))

The **selection** property of **ui5-calendar** and **ui5-daypicker** has been renamed to **selectionMode**.


* **ui5-table:** add growing on scroll ([#2593](https://github.com/SAP/ui5-webcomponents/issues/2593)) ([87520c2](https://github.com/SAP/ui5-webcomponents/commit/87520c2)), closes [#2589](https://github.com/SAP/ui5-webcomponents/issues/2589) [#2570](https://github.com/SAP/ui5-webcomponents/issues/2570)

The property **hasMore** removed, use **growing** instead.
The **loadMoreText** has been renamed to **moreText**.
The **loadMoreSubtext** has been renamed to **moreSubtext**
# [1.0.0-rc.11](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.10...v1.0.0-rc.11) (2020-12-21)

### New components
* **ui5-avatar-group:** introduce new component ([#2524](https://github.com/SAP/ui5-webcomponents/issues/2524)) ([ae926ee](https://github.com/SAP/ui5-webcomponents/commit/ae926ee)), closes [#2409](https://github.com/SAP/ui5-webcomponents/issues/2409)
* **ui5-bar:** introduce new component ([#2533](https://github.com/SAP/ui5-webcomponents/issues/2533)) ([5c601cd](https://github.com/SAP/ui5-webcomponents/commit/5c601cd)), closes [#2434](https://github.com/SAP/ui5-webcomponents/issues/2434)
* **ui5-calendar:** introduce new component. ([#2424](https://github.com/SAP/ui5-webcomponents/issues/2424)) ([5470e23](https://github.com/SAP/ui5-webcomponents/commit/5470e23)), closes [#1730](https://github.com/SAP/ui5-webcomponents/issues/1730)
* **ui5-slider:** introduce new component ([#2349](https://github.com/SAP/ui5-webcomponents/issues/2349)) ([2b9008c](https://github.com/SAP/ui5-webcomponents/commit/2b9008c))
* **ui5-range-slider:** introduce new component ([#2310](https://github.com/SAP/ui5-webcomponents/issues/2310)) ([9dea3b3](https://github.com/SAP/ui5-webcomponents/commit/9dea3b3))

### Bug Fixes

* **ui5-avatar:** fix XS size ([#2582](https://github.com/SAP/ui5-webcomponents/issues/2582)) ([9661ab8](https://github.com/SAP/ui5-webcomponents/commit/9661ab8))
* **ui5-badge:** enable letter spacing overwrite ([#2493](https://github.com/SAP/ui5-webcomponents/issues/2493)) ([cca0d5d](https://github.com/SAP/ui5-webcomponents/commit/cca0d5d)), closes [#2451](https://github.com/SAP/ui5-webcomponents/issues/2451)
* **ui5-badge:** fix RTL appearance ([#2569](https://github.com/SAP/ui5-webcomponents/issues/2569)) ([5f6d8fc](https://github.com/SAP/ui5-webcomponents/commit/5f6d8fc))
* **ui5-button:** hide icon tooltip ([#2566](https://github.com/SAP/ui5-webcomponents/issues/2566)) ([1b07955](https://github.com/SAP/ui5-webcomponents/commit/1b07955))
* **ui5-calendar:** keyboard navigation in the picker grid now works properly ([#2532](https://github.com/SAP/ui5-webcomponents/issues/2532)) ([371d12d](https://github.com/SAP/ui5-webcomponents/commit/371d12d))
* **ui5-card:** correct aria-labelledBy to card and header ([#2577](https://github.com/SAP/ui5-webcomponents/issues/2577)) ([2647941](https://github.com/SAP/ui5-webcomponents/commit/2647941)), closes [#2426](https://github.com/SAP/ui5-webcomponents/issues/2426)
* **ui5-carousel:** add all visible items to tab chain ([#2530](https://github.com/SAP/ui5-webcomponents/issues/2530)) ([37ee83f](https://github.com/SAP/ui5-webcomponents/commit/37ee83f)), closes [#1996](https://github.com/SAP/ui5-webcomponents/issues/1996)
* **ui5-date-picker:** fixing the min and max date in timezones half hour difference ([#2544](https://github.com/SAP/ui5-webcomponents/issues/2544)) ([766bcc0](https://github.com/SAP/ui5-webcomponents/commit/766bcc0)), closes [#2542](https://github.com/SAP/ui5-webcomponents/issues/2542)
* **ui5-datepicker:** keyboard navigation works properly ([#2549](https://github.com/SAP/ui5-webcomponents/issues/2549)) ([66cd1d7](https://github.com/SAP/ui5-webcomponents/commit/66cd1d7))
* **ui5-daterange-picker:** all tests are now enabled ([#2506](https://github.com/SAP/ui5-webcomponents/issues/2506)) ([33442e9](https://github.com/SAP/ui5-webcomponents/commit/33442e9)), closes [#2475](https://github.com/SAP/ui5-webcomponents/issues/2475)
* **ui5-daterange-picker:** fix RenderScheduler import ([#2476](https://github.com/SAP/ui5-webcomponents/issues/2476)) ([13ff13e](https://github.com/SAP/ui5-webcomponents/commit/13ff13e))
* **ui5-dialog:** apply initial focus after rendering ([#2551](https://github.com/SAP/ui5-webcomponents/issues/2551)) ([dba0265](https://github.com/SAP/ui5-webcomponents/commit/dba0265)), closes [#2537](https://github.com/SAP/ui5-webcomponents/issues/2537)
* **ui5-input:** aria-required attribute removed ([#2552](https://github.com/SAP/ui5-webcomponents/issues/2552)) ([7456ab5](https://github.com/SAP/ui5-webcomponents/commit/7456ab5))
* **ui5-input:** don't render aria-describedby if not neccessary ([#2512](https://github.com/SAP/ui5-webcomponents/issues/2512)) ([e7dd012](https://github.com/SAP/ui5-webcomponents/commit/e7dd012))
* **ui5-li-custom:** prevent firing of events ([#2462](https://github.com/SAP/ui5-webcomponents/issues/2462)) ([3f66c06](https://github.com/SAP/ui5-webcomponents/commit/3f66c06))
* **ui5-list:** remove focus trap for empty list ([#2411](https://github.com/SAP/ui5-webcomponents/issues/2411)) ([5f8e0e2](https://github.com/SAP/ui5-webcomponents/commit/5f8e0e2))
* **ui5-popover:** correct arrow position on RTL ([#2488](https://github.com/SAP/ui5-webcomponents/issues/2488)) ([3b81ad8](https://github.com/SAP/ui5-webcomponents/commit/3b81ad8)), closes [#2387](https://github.com/SAP/ui5-webcomponents/issues/2387)
* **ui5-select:** remove aria-roledescription ([#2463](https://github.com/SAP/ui5-webcomponents/issues/2463)) ([973a80d](https://github.com/SAP/ui5-webcomponents/commit/973a80d)), closes [#2358](https://github.com/SAP/ui5-webcomponents/issues/2358)
* **ui5-shellbar:** fix overlapping of the search box over icons ([#2155](https://github.com/SAP/ui5-webcomponents/issues/2155)) ([3597902](https://github.com/SAP/ui5-webcomponents/commit/3597902)), closes [#2044](https://github.com/SAP/ui5-webcomponents/issues/2044)
* **ui5-slider:** fix input event and tickmarks display ([#2508](https://github.com/SAP/ui5-webcomponents/issues/2508)) ([0cbc0bd](https://github.com/SAP/ui5-webcomponents/commit/0cbc0bd))
* **ui5-table:** improve accessibility ([#2534](https://github.com/SAP/ui5-webcomponents/issues/2534)) ([e06d6f3](https://github.com/SAP/ui5-webcomponents/commit/e06d6f3))
* **ui5-textarea:** announce required textarea ([#2385](https://github.com/SAP/ui5-webcomponents/issues/2385)) ([c2baf6b](https://github.com/SAP/ui5-webcomponents/commit/c2baf6b))
* **ui5-tree:** make the height of tree adjustable ([#2546](https://github.com/SAP/ui5-webcomponents/issues/2546)) ([1fc3180](https://github.com/SAP/ui5-webcomponents/commit/1fc3180)), closes [#2545](https://github.com/SAP/ui5-webcomponents/issues/2545)
* **ui5-upload-collection:** fire drop only when files are dropped within dnd overlay ([#2527](https://github.com/SAP/ui5-webcomponents/issues/2527)) ([455f614](https://github.com/SAP/ui5-webcomponents/commit/455f614))
* **ui5-wizard:** correct phone breakpoint size ([#2596](https://github.com/SAP/ui5-webcomponents/issues/2596)) ([c98d9ba](https://github.com/SAP/ui5-webcomponents/commit/c98d9ba))
* **ui5-wizard:** fix styling issues ([#2547](https://github.com/SAP/ui5-webcomponents/issues/2547)) ([65cb42f](https://github.com/SAP/ui5-webcomponents/commit/65cb42f)), closes [#2523](https://github.com/SAP/ui5-webcomponents/issues/2523)
* build error on MacOS 11 from rollup-plugin-terser ([#2515](https://github.com/SAP/ui5-webcomponents/issues/2515)) ([0629fac](https://github.com/SAP/ui5-webcomponents/commit/0629fac))


### Features

* **framework:** Change child-parent invalidation API ([#2541](https://github.com/SAP/ui5-webcomponents/issues/2541)) ([a1a3f80](https://github.com/SAP/ui5-webcomponents/commit/a1a3f80))
* **ui5-button:** support title attribute ([#2492](https://github.com/SAP/ui5-webcomponents/issues/2492)) ([7ae9253](https://github.com/SAP/ui5-webcomponents/commit/7ae9253))
* **ui5-combobox:** аdd two-column layout support ([#2503](https://github.com/SAP/ui5-webcomponents/issues/2503)) ([679362d](https://github.com/SAP/ui5-webcomponents/commit/679362d)), closes [#2450](https://github.com/SAP/ui5-webcomponents/issues/2450)
* **ui5-date-picker:** component is now aligned with the specification ([#2304](https://github.com/SAP/ui5-webcomponents/issues/2304)) ([30d9d2b](https://github.com/SAP/ui5-webcomponents/commit/30d9d2b)), closes [#2151](https://github.com/SAP/ui5-webcomponents/issues/2151)
* **ui5-flexible-column-layout:** add start/mid/endColumnAccessibleName properties ([#2483](https://github.com/SAP/ui5-webcomponents/issues/2483)) ([fb0b24c](https://github.com/SAP/ui5-webcomponents/commit/fb0b24c))
* **ui5-mcb:** introduces filter property ([#2088](https://github.com/SAP/ui5-webcomponents/issues/2088)) ([03cae4b](https://github.com/SAP/ui5-webcomponents/commit/03cae4b))
* **ui5-mcb-item:** implement stable-dom-ref property ([#2418](https://github.com/SAP/ui5-webcomponents/issues/2418)) ([6e4a156](https://github.com/SAP/ui5-webcomponents/commit/6e4a156))
* **ui5-option:** provide stableDomRef ([#2366](https://github.com/SAP/ui5-webcomponents/issues/2366)) ([50304f5](https://github.com/SAP/ui5-webcomponents/commit/50304f5)), closes [#1718](https://github.com/SAP/ui5-webcomponents/issues/1718)
* **ui5-popover:** implement hide-block-layer property ([#2413](https://github.com/SAP/ui5-webcomponents/issues/2413)) ([3b2d6de](https://github.com/SAP/ui5-webcomponents/commit/3b2d6de))
* **ui5-side-navigation:** add "header" slot ([#2520](https://github.com/SAP/ui5-webcomponents/issues/2520)) ([b5c4a92](https://github.com/SAP/ui5-webcomponents/commit/b5c4a92)), closes [#2518](https://github.com/SAP/ui5-webcomponents/issues/2518)
* **ui5-side-navigation-item, ui5-side-navigation-sub-item:** introduce click event ([#2298](https://github.com/SAP/ui5-webcomponents/issues/2298)) ([d73ce38](https://github.com/SAP/ui5-webcomponents/commit/d73ce38))
* **ui5-table:** add "loadMore" capability ([#2589](https://github.com/SAP/ui5-webcomponents/issues/2589)) ([2e5d5cd](https://github.com/SAP/ui5-webcomponents/commit/2e5d5cd))


### BREAKING CHANGE

* **ui5-flexible-column-layout:** introduce accessibilityTexts property ([#2571](https://github.com/SAP/ui5-webcomponents/issues/2571)) ([a634532](https://github.com/SAP/ui5-webcomponents/commit/a634532))

The startColumnAccessibleName, midColumnAccessibleName and endColumnAccessibleName properties have been removed. Use the new accessibilityTexts property to provide these (as keys to the object).

* **ui5-timeline:** move ui5-timeline to fiori package ([#2498](https://github.com/SAP/ui5-webcomponents/issues/2498)) ([e0a32f4](https://github.com/SAP/ui5-webcomponents/commit/e0a32f4))

Timeline component has been moved to the "fiori" package. 

If previously had:
```js
import Timeline from "@ui5/webcomponents/dist/Timeline.js";
```
you have to change it to:
```js
import Timeline from "@ui5/webcomponents-fiori/dist/Timeline.js";
```

* **ui5-notification-action:** rename component ([#2580](https://github.com/SAP/ui5-webcomponents/issues/2580)) ([10a6b92](https://github.com/SAP/ui5-webcomponents/commit/10a6b92))

If you previously used `ui5-notification-overflow-action` and had the following import statement:
```js
import "@ui5/webcomponents-fiori/dist/NotificationOverflowAction.js";
```
now you have to  use the `ui5-notification-action` tag and import  the following module:
```js
import "@ui5/webcomponents-fiori/dist/NotificationAction.js";
```


# [1.0.0-rc.10](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.9...v1.0.0-rc.10) (2020-11-12)

### BREAKING CHANGE
* **icons:** refactor(icons): flatten dist directory([#2425](https://github.com/SAP/ui5-webcomponents/issues/2425)) ([c84bc8b](https://github.com/SAP/ui5-webcomponents/commit/c84bc8b))

Change the distribution path of all individual `icons`, which changes all icons' public imports, by bringing the icons' modules one level up.

If you previously had:
```js 
import "@ui5/webcomponents-icons/dist/icons/accept.js";
```

Now you should remove the `icons` folder:
```js
import "@ui5/webcomponents-icons/dist/accept.js";
```

### New Icons package

* **icons-tnt:** add new TNT icon collection ([#2414](https://github.com/SAP/ui5-webcomponents/issues/2414)) ([efb0d8e](https://github.com/SAP/ui5-webcomponents/commit/efb0d8e))

### New components

* **ui5-wizard:** introduce new component ([#2400](https://github.com/SAP/ui5-webcomponents/issues/2400)) ([bdec517](https://github.com/SAP/ui5-webcomponents/commit/bdec517)), closes [#2368](https://github.com/SAP/ui5-webcomponents/issues/2368)


### Features
* **framework:** add override font-family for glyphs with diacritics ([#2402](https://github.com/SAP/ui5-webcomponents/issues/2402)) ([5a550b8](https://github.com/SAP/ui5-webcomponents/commit/5a550b8))
* **framework:** make getStableDomRef search in the static area item ([#2363](https://github.com/SAP/ui5-webcomponents/issues/2363)) ([a68dfbb](https://github.com/SAP/ui5-webcomponents/commit/a68dfbb))
* **ui5-checkbox:** implement ariaLabelledby property ([#2272](https://github.com/SAP/ui5-webcomponents/issues/2272)) ([cbf2461](https://github.com/SAP/ui5-webcomponents/commit/cbf2461))
* **ui5-daterange-picker:** enhance keyboard handling ([#2179](https://github.com/SAP/ui5-webcomponents/issues/2179)) ([84eb484](https://github.com/SAP/ui5-webcomponents/commit/84eb484)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-dialog:** introduce resizable property ([#2301](https://github.com/SAP/ui5-webcomponents/issues/2301)) ([8be4048](https://github.com/SAP/ui5-webcomponents/commit/8be4048)), closes [#2082](https://github.com/SAP/ui5-webcomponents/issues/2082)
* **ui5-link:** add aria-label and aria-labelledby support ([#2357](https://github.com/SAP/ui5-webcomponents/issues/2357)) ([7e65e77](https://github.com/SAP/ui5-webcomponents/commit/7e65e77)), closes [#2356](https://github.com/SAP/ui5-webcomponents/issues/2356)


### Bug Fixes

* **framework:** fix JS error on setLanguage call ([#2328](https://github.com/SAP/ui5-webcomponents/issues/2328)) ([f9b9ead](https://github.com/SAP/ui5-webcomponents/commit/f9b9ead))
* **icons:** fix text-formatting icon ([#2326](https://github.com/SAP/ui5-webcomponents/issues/2326)) ([d69fbcb](https://github.com/SAP/ui5-webcomponents/commit/d69fbcb))
* **theming:** correct inavlid CSS vars ([#2427](https://github.com/SAP/ui5-webcomponents/issues/2427)) ([3674dbc](https://github.com/SAP/ui5-webcomponents/commit/3674dbc))
* **ui5-combobox:** allow typing in input on mobile devices ([#2412](https://github.com/SAP/ui5-webcomponents/issues/2412)) ([7bf44b5](https://github.com/SAP/ui5-webcomponents/commit/7bf44b5)), closes [#2324](https://github.com/SAP/ui5-webcomponents/issues/2324)
* **ui5-date-picker:**  hiding month button when month picker is shown ([#2331](https://github.com/SAP/ui5-webcomponents/issues/2331)) ([6454e29](https://github.com/SAP/ui5-webcomponents/commit/6454e29)), closes [#2244](https://github.com/SAP/ui5-webcomponents/issues/2244)
* **ui5-date-picker:** update navigation buttons upon typing ([#2307](https://github.com/SAP/ui5-webcomponents/issues/2307)) ([4f39aa4](https://github.com/SAP/ui5-webcomponents/commit/4f39aa4))
* **ui5-day-picker:** fix color contrast of selected day in HCB ([#2378](https://github.com/SAP/ui5-webcomponents/issues/2378)) ([ff67141](https://github.com/SAP/ui5-webcomponents/commit/ff67141)), closes [#2372](https://github.com/SAP/ui5-webcomponents/issues/2372)
* **ui5-dialog:** no longer gets clipped in short screen height in IE ([#2429](https://github.com/SAP/ui5-webcomponents/issues/2429)) ([03c8447](https://github.com/SAP/ui5-webcomponents/commit/03c8447)), closes [#2243](https://github.com/SAP/ui5-webcomponents/issues/2243)
* **ui5-dialog:** texts are no longer blurred in Chromium-based browsers ([#2417](https://github.com/SAP/ui5-webcomponents/issues/2417)) ([eac514b](https://github.com/SAP/ui5-webcomponents/commit/eac514b))
* **ui5-input:** prevent js error when element is removed from DOM ([#2405](https://github.com/SAP/ui5-webcomponents/issues/2405)) ([0e507eb](https://github.com/SAP/ui5-webcomponents/commit/0e507eb))
* **ui5-li:** correct truncation behaviour of info text ([#2330](https://github.com/SAP/ui5-webcomponents/issues/2330)) ([64fef90](https://github.com/SAP/ui5-webcomponents/commit/64fef90)), closes [#2317](https://github.com/SAP/ui5-webcomponents/issues/2317)
* **ui5-li:** fix title update when initially empty ([#2362](https://github.com/SAP/ui5-webcomponents/issues/2362)) ([682a25c](https://github.com/SAP/ui5-webcomponents/commit/682a25c))
* **ui5-messagestrip:** fix close button accessibility ([#2352](https://github.com/SAP/ui5-webcomponents/issues/2352)) ([2194b16](https://github.com/SAP/ui5-webcomponents/commit/2194b16))
* **ui5-multi-combobox:** make focus outline visible ([#2431](https://github.com/SAP/ui5-webcomponents/issues/2431)) ([cd5fad2](https://github.com/SAP/ui5-webcomponents/commit/cd5fad2)), closes [#2286](https://github.com/SAP/ui5-webcomponents/issues/2286)
* **ui5-switch:** fix focus border position ([#2319](https://github.com/SAP/ui5-webcomponents/issues/2319)) ([df6c972](https://github.com/SAP/ui5-webcomponents/commit/df6c972))
* **ui5-tab:** expand tab height to tabcontainer height ([#2360](https://github.com/SAP/ui5-webcomponents/issues/2360)) ([ea47cd3](https://github.com/SAP/ui5-webcomponents/commit/ea47cd3))
* **ui5-textarea:** set italic to placeholder only ([#2458](https://github.com/SAP/ui5-webcomponents/issues/2458)) ([aeb9316](https://github.com/SAP/ui5-webcomponents/commit/aeb9316))
* **components:** use locales in date/time components correctly ([#2440](https://github.com/SAP/ui5-webcomponents/issues/2440)) ([dd87a53](https://github.com/SAP/ui5-webcomponents/commit/dd87a53))
* **ui5-multi-combobox:** n-more popover in readonly fixed ([#2394](https://github.com/SAP/ui5-webcomponents/issues/2394)) ([d045ba2](https://github.com/SAP/ui5-webcomponents/commit/d045ba2)), closes [#2369](https://github.com/SAP/ui5-webcomponents/issues/2369)
* **ui5-textarea:** fix placeholder font-style ([#2340](https://github.com/SAP/ui5-webcomponents/issues/2340)) ([1fbb4f5](https://github.com/SAP/ui5-webcomponents/commit/1fbb4f5))




# [1.0.0-rc.9](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2020-10-08)

### New components
* **ui5-multi-input:** initial implementation ([#1942](https://github.com/SAP/ui5-webcomponents/issues/1942)) ([5d7e7df](https://github.com/SAP/ui5-webcomponents/commit/5d7e7df))

### Bug Fixes

* **components:** fix setting contentDensity styles ([#2094](https://github.com/SAP/ui5-webcomponents/issues/2094)) ([9454ab7](https://github.com/SAP/ui5-webcomponents/commit/9454ab7)), closes [#2093](https://github.com/SAP/ui5-webcomponents/issues/2093)
* **components:** fix aria-disabled usage ([#2056](https://github.com/SAP/ui5-webcomponents/issues/2056)) ([bb624ae](https://github.com/SAP/ui5-webcomponents/commit/bb624ae))
* **framework:** allow "role" as a property name ([#2290](https://github.com/SAP/ui5-webcomponents/issues/2290)) ([a816cef](https://github.com/SAP/ui5-webcomponents/commit/a816cef))
* **framework:** do not create IE styles with disabled ([#2284](https://github.com/SAP/ui5-webcomponents/issues/2284)) ([5ecc51e](https://github.com/SAP/ui5-webcomponents/commit/5ecc51e))
* **ui5-badge:** update colors to match the spec([#2216](https://github.com/SAP/ui5-webcomponents/issues/2216)) ([2ddc4e9](https://github.com/SAP/ui5-webcomponents/commit/2ddc4e9)), closes [#2210](https://github.com/SAP/ui5-webcomponents/issues/2210)
* **ui5-button:** prevent button with icons truncate in ie ([#2181](https://github.com/SAP/ui5-webcomponents/issues/2181)) ([31ca287](https://github.com/SAP/ui5-webcomponents/commit/31ca287))
* **ui5-calendar:** Year text is now right in all timezones ([#2209](https://github.com/SAP/ui5-webcomponents/issues/2209)) ([3427f35](https://github.com/SAP/ui5-webcomponents/commit/3427f35))
* **ui5-calendar-header:** prevent scrolling when month/year picker is selected ([#2276](https://github.com/SAP/ui5-webcomponents/issues/2276)) ([fac40a8](https://github.com/SAP/ui5-webcomponents/commit/fac40a8))
* **ui5-card:** apply focus to header properly in IE ([#2050](https://github.com/SAP/ui5-webcomponents/issues/2050)) ([00760e6](https://github.com/SAP/ui5-webcomponents/commit/00760e6)), closes [#2007](https://github.com/SAP/ui5-webcomponents/issues/2007)
* **ui5-combobox:** allow setting value with javascript ([#2253](https://github.com/SAP/ui5-webcomponents/issues/2253)) ([0742854](https://github.com/SAP/ui5-webcomponents/commit/0742854))
* **ui5-date-picker:** ensure min and max date are not disabled ([#2280](https://github.com/SAP/ui5-webcomponents/issues/2280)) ([f0473f0](https://github.com/SAP/ui5-webcomponents/commit/f0473f0))
* **ui5-date-picker:** select date with SPACE on keyup ([#2279](https://github.com/SAP/ui5-webcomponents/issues/2279)) ([9d83806](https://github.com/SAP/ui5-webcomponents/commit/9d83806)), closes [#2276](https://github.com/SAP/ui5-webcomponents/issues/2276) [#2268](https://github.com/SAP/ui5-webcomponents/issues/2268)
* **ui5-daterange-picker:** date selection is now correct in all timez… ([#2203](https://github.com/SAP/ui5-webcomponents/issues/2203)) ([2bca6f1](https://github.com/SAP/ui5-webcomponents/commit/2bca6f1))
* **ui5-daterange-picker:** enable selection of single day ([#2157](https://github.com/SAP/ui5-webcomponents/issues/2157)) ([66722b2](https://github.com/SAP/ui5-webcomponents/commit/66722b2))
* **ui5-daterange-picker:** fix firstDate/lastDate getters values ([#2277](https://github.com/SAP/ui5-webcomponents/issues/2277)) ([00f5ab5](https://github.com/SAP/ui5-webcomponents/commit/00f5ab5)), closes [#2221](https://github.com/SAP/ui5-webcomponents/issues/2221)
* **ui5-daterange-picker:** fix icon appearance in IE ([#2057](https://github.com/SAP/ui5-webcomponents/issues/2057)) ([dba7a2c](https://github.com/SAP/ui5-webcomponents/commit/dba7a2c)), closes [#2017](https://github.com/SAP/ui5-webcomponents/issues/2017)
* **ui5-daterange-picker:** fix js error when removed from the DOM ([#2180](https://github.com/SAP/ui5-webcomponents/issues/2180)) ([6cb2a71](https://github.com/SAP/ui5-webcomponents/commit/6cb2a71))
* **ui5-daterange-picker:** show value in input only when first & last… ([#2098](https://github.com/SAP/ui5-webcomponents/issues/2098)) ([f56cb66](https://github.com/SAP/ui5-webcomponents/commit/f56cb66))
* **ui5-datetime-picker:** fix scrollbar issue in IE11 ([#2154](https://github.com/SAP/ui5-webcomponents/issues/2154)) ([306572f](https://github.com/SAP/ui5-webcomponents/commit/306572f))
* **ui5-duration-picker:** fix incorrect data support ([#2097](https://github.com/SAP/ui5-webcomponents/issues/2097)) ([4bcd797](https://github.com/SAP/ui5-webcomponents/commit/4bcd797))
* **ui5-flexible-column-layout:** Fix arrow misplacement in IE ([#2032](https://github.com/SAP/ui5-webcomponents/issues/2032)) ([57be7c2](https://github.com/SAP/ui5-webcomponents/commit/57be7c2)), closes [#1998](https://github.com/SAP/ui5-webcomponents/issues/1998)
* **ui5-input:** announce custom valueStateMessage ([#2120](https://github.com/SAP/ui5-webcomponents/issues/2120)) ([8f8a0d4](https://github.com/SAP/ui5-webcomponents/commit/8f8a0d4))
* **ui5-input:** cancel suggestion selection with ESC ([#2289](https://github.com/SAP/ui5-webcomponents/issues/2289)) ([ef1fb40](https://github.com/SAP/ui5-webcomponents/commit/ef1fb40)), closes [#2254](https://github.com/SAP/ui5-webcomponents/issues/2254)
* **ui5-input:** deselect suggestion items on input ([#2285](https://github.com/SAP/ui5-webcomponents/issues/2285)) ([a98c6bd](https://github.com/SAP/ui5-webcomponents/commit/a98c6bd)), closes [#2256](https://github.com/SAP/ui5-webcomponents/issues/2256)
* **ui5-input:** fix value state msg appearance ([#2075](https://github.com/SAP/ui5-webcomponents/issues/2075)) ([edfe8ca](https://github.com/SAP/ui5-webcomponents/commit/edfe8ca))
* **ui5-input:** implement aria-required ([#2114](https://github.com/SAP/ui5-webcomponents/issues/2114)) ([0e0de82](https://github.com/SAP/ui5-webcomponents/commit/0e0de82))
* **ui5-input:** number input doesn't lose value ([#2130](https://github.com/SAP/ui5-webcomponents/issues/2130)) ([2c6139d](https://github.com/SAP/ui5-webcomponents/commit/2c6139d))
* **ui5-li:** correct image size ([5c51dc6](https://github.com/SAP/ui5-webcomponents/commit/5c51dc6)), closes [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** correct sizes ([2faad25](https://github.com/SAP/ui5-webcomponents/commit/2faad25)), closes [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** fix visual deviations from Fiori 3 ([#2314](https://github.com/SAP/ui5-webcomponents/issues/2314)) ([d430632](https://github.com/SAP/ui5-webcomponents/commit/d430632)), closes [#2297](https://github.com/SAP/ui5-webcomponents/issues/2297) [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** scale image properly ([#2059](https://github.com/SAP/ui5-webcomponents/issues/2059)) ([3aadc0e](https://github.com/SAP/ui5-webcomponents/commit/3aadc0e))
* **ui5-li-custom:** fix pointer-events inheritance ([#2196](https://github.com/SAP/ui5-webcomponents/issues/2196)) ([bfb9999](https://github.com/SAP/ui5-webcomponents/commit/bfb9999))
* **ui5-messagestrip:** close button now has the correct design ([#2029](https://github.com/SAP/ui5-webcomponents/issues/2029)) ([7f99be5](https://github.com/SAP/ui5-webcomponents/commit/7f99be5))
* **ui5-multi-combobox:** fix behavior of show all selected button ([#2100](https://github.com/SAP/ui5-webcomponents/issues/2100)) ([84362e0](https://github.com/SAP/ui5-webcomponents/commit/84362e0))
* **ui5-multi-combobox:** fix jumping parent div ([#2136](https://github.com/SAP/ui5-webcomponents/issues/2136)) ([ad1fbd7](https://github.com/SAP/ui5-webcomponents/commit/ad1fbd7))
* **ui5-multi-combobox:** fix width in IE ([#2104](https://github.com/SAP/ui5-webcomponents/issues/2104)) ([af0785c](https://github.com/SAP/ui5-webcomponents/commit/af0785c))
* **ui5-multiinput:** improve valueStateMessage in nMore popover ([#2225](https://github.com/SAP/ui5-webcomponents/issues/2225)) ([a03f2b3](https://github.com/SAP/ui5-webcomponents/commit/a03f2b3)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-popover:** fix arrow horizontal position ([#2129](https://github.com/SAP/ui5-webcomponents/issues/2129)) ([7a1c3eb](https://github.com/SAP/ui5-webcomponents/commit/7a1c3eb)), closes [#2111](https://github.com/SAP/ui5-webcomponents/issues/2111)
* **ui5-popover:** fix js errors if parent is removed from DOM ([#2178](https://github.com/SAP/ui5-webcomponents/issues/2178)) ([904da0e](https://github.com/SAP/ui5-webcomponents/commit/904da0e))
* **ui5-popup:** prevent interaction with the content under the popup ([#2119](https://github.com/SAP/ui5-webcomponents/issues/2119)) ([d6ffa48](https://github.com/SAP/ui5-webcomponents/commit/d6ffa48))
* **ui5-popup:** restore focus when block layer is clicked ([#2123](https://github.com/SAP/ui5-webcomponents/issues/2123)) ([c079722](https://github.com/SAP/ui5-webcomponents/commit/c079722))
* **ui5-popup, ui5-dialog:** remove closed instance from openedPopupsRegistry ([#2275](https://github.com/SAP/ui5-webcomponents/issues/2275)) ([443af29](https://github.com/SAP/ui5-webcomponents/commit/443af29))
* **ui5-select:** fix text color of disabled select in hcb/hcw ([#2248](https://github.com/SAP/ui5-webcomponents/issues/2248)) ([bc6dfec](https://github.com/SAP/ui5-webcomponents/commit/bc6dfec))
* **ui5-select:** make disabled select not focusable ([#2229](https://github.com/SAP/ui5-webcomponents/issues/2229)) ([960f927](https://github.com/SAP/ui5-webcomponents/commit/960f927))
* **ui5-shellbar:** remove width limitation of logo ([230cd7f](https://github.com/SAP/ui5-webcomponents/commit/230cd7f)), closes [#2066](https://github.com/SAP/ui5-webcomponents/issues/2066)
* **ui5-shellbar-item:** update count properly ([#2049](https://github.com/SAP/ui5-webcomponents/issues/2049)) ([2499c56](https://github.com/SAP/ui5-webcomponents/commit/2499c56)), closes [#2048](https://github.com/SAP/ui5-webcomponents/issues/2048)
* **ui5-tabcontainer:** fix ARIA posinset and setsize values ([#2046](https://github.com/SAP/ui5-webcomponents/issues/2046)) ([c6fcf69](https://github.com/SAP/ui5-webcomponents/commit/c6fcf69)), closes [#2035](https://github.com/SAP/ui5-webcomponents/issues/2035)
* **ui5-tabcontainer:** implement ACC for overflowed items ([#2047](https://github.com/SAP/ui5-webcomponents/issues/2047)) ([efe03bc](https://github.com/SAP/ui5-webcomponents/commit/efe03bc)), closes [#2036](https://github.com/SAP/ui5-webcomponents/issues/2036)
* **ui5-tabcontainer:** remove scroll from empty tabs ([#2148](https://github.com/SAP/ui5-webcomponents/issues/2148)) ([11af57e](https://github.com/SAP/ui5-webcomponents/commit/11af57e))
* **ui5-table-row:** announce entire row and columns ([#2164](https://github.com/SAP/ui5-webcomponents/issues/2164)) ([09863d8](https://github.com/SAP/ui5-webcomponents/commit/09863d8)), closes [#2160](https://github.com/SAP/ui5-webcomponents/issues/2160)
* **ui5-textarea:** add aria-required ([#2113](https://github.com/SAP/ui5-webcomponents/issues/2113)) ([4f35c92](https://github.com/SAP/ui5-webcomponents/commit/4f35c92))
* **ui5-textarea:** announce custom valueStateMessage ([#2122](https://github.com/SAP/ui5-webcomponents/issues/2122)) ([4d27065](https://github.com/SAP/ui5-webcomponents/commit/4d27065))


### Features

* **framework:** add API to subscribe/unsubscribe for theme loaded ([#2303](https://github.com/SAP/ui5-webcomponents/issues/2303)) ([c8ffb38](https://github.com/SAP/ui5-webcomponents/commit/c8ffb38))
* **framework:** dynamic custom elements scoping ([#2091](https://github.com/SAP/ui5-webcomponents/issues/2091)) ([3588542](https://github.com/SAP/ui5-webcomponents/commit/3588542))
* **framework:** Limited support for campact size on IE ([#2230](https://github.com/SAP/ui5-webcomponents/issues/2230)) ([4128216](https://github.com/SAP/ui5-webcomponents/commit/4128216))
* **framework:** make _property-change publicly available ([#2201](https://github.com/SAP/ui5-webcomponents/issues/2201)) ([0be4e10](https://github.com/SAP/ui5-webcomponents/commit/0be4e10))
* **framework:** make addCustomCSS dynamic ([#2083](https://github.com/SAP/ui5-webcomponents/issues/2083)) ([7b54b9b](https://github.com/SAP/ui5-webcomponents/commit/7b54b9b))
* **framework:** make assets path configurable ([#2214](https://github.com/SAP/ui5-webcomponents/issues/2214)) ([16c46da](https://github.com/SAP/ui5-webcomponents/commit/16c46da))
* **framework:** styles and staticAreaStyles may now be nested arrays ([#2058](https://github.com/SAP/ui5-webcomponents/issues/2058)) ([bb87e65](https://github.com/SAP/ui5-webcomponents/commit/bb87e65))
* **framework:** Support custom dynamic asset paths ([#2305](https://github.com/SAP/ui5-webcomponents/issues/2305)) ([ff245fa](https://github.com/SAP/ui5-webcomponents/commit/ff245fa))
* **tools:** ES5 build supports dynamic imports (inlined) ([#2063](https://github.com/SAP/ui5-webcomponents/issues/2063)) ([3fe5cac](https://github.com/SAP/ui5-webcomponents/commit/3fe5cac))
* **tools:** process HBS files in nested directories ([#2067](https://github.com/SAP/ui5-webcomponents/issues/2067)) ([13f1d2a](https://github.com/SAP/ui5-webcomponents/commit/13f1d2a)), closes [#2065](https://github.com/SAP/ui5-webcomponents/issues/2065)
* **ui5-card:** add ariaLabel and ariaLabelledby properties ([#2127](https://github.com/SAP/ui5-webcomponents/issues/2127)) ([7007f8e](https://github.com/SAP/ui5-webcomponents/commit/7007f8e))
* **ui5-carousel:** implement rtl support ([#2086](https://github.com/SAP/ui5-webcomponents/issues/2086)) ([f69ffa5](https://github.com/SAP/ui5-webcomponents/commit/f69ffa5))
* **ui5-combobox:** enable handling of arrow down/up keys ([974401b](https://github.com/SAP/ui5-webcomponents/commit/974401b)), closes [#1939](https://github.com/SAP/ui5-webcomponents/issues/1939)
* **ui5-combobox:** implement icon slot ([#2139](https://github.com/SAP/ui5-webcomponents/issues/2139)) ([8c98e80](https://github.com/SAP/ui5-webcomponents/commit/8c98e80))
* **ui5-combobox:** implement valueStateMessage slot ([#2099](https://github.com/SAP/ui5-webcomponents/issues/2099)) ([385bb0b](https://github.com/SAP/ui5-webcomponents/commit/385bb0b)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-combobox:** introduces selection-change event ([#2090](https://github.com/SAP/ui5-webcomponents/issues/2090)) ([43be0f6](https://github.com/SAP/ui5-webcomponents/commit/43be0f6))
* **ui5-date-picker:** add ariaLabel and ariaLabelledby properties ([#2126](https://github.com/SAP/ui5-webcomponents/issues/2126)) ([e0f93fa](https://github.com/SAP/ui5-webcomponents/commit/e0f93fa))
* **ui5-date-picker:** add screen reader support ([#2224](https://github.com/SAP/ui5-webcomponents/issues/2224)) ([e6a0cd8](https://github.com/SAP/ui5-webcomponents/commit/e6a0cd8)), closes [#1279](https://github.com/SAP/ui5-webcomponents/issues/1279)
* **ui5-date-picker:** keyboard handling improvement ([#2146](https://github.com/SAP/ui5-webcomponents/issues/2146)) ([19afe90](https://github.com/SAP/ui5-webcomponents/commit/19afe90)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-datepicker:** introduce required property ([#2117](https://github.com/SAP/ui5-webcomponents/issues/2117)) ([e282fc8](https://github.com/SAP/ui5-webcomponents/commit/e282fc8))
* **ui5-datetime-picker:** improve keyboard handling support ([#2137](https://github.com/SAP/ui5-webcomponents/issues/2137)) ([0ada41a](https://github.com/SAP/ui5-webcomponents/commit/0ada41a)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-dialog:** introduce draggable property ([#2269](https://github.com/SAP/ui5-webcomponents/issues/2269)) ([93772fb](https://github.com/SAP/ui5-webcomponents/commit/93772fb)), closes [#2082](https://github.com/SAP/ui5-webcomponents/issues/2082)
* **ui5-duration-picker:** implement keyboard handling support ([#2095](https://github.com/SAP/ui5-webcomponents/issues/2095)) ([7ec3c43](https://github.com/SAP/ui5-webcomponents/commit/7ec3c43)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-duration-picker:** implement valueStateMessage ([#2102](https://github.com/SAP/ui5-webcomponents/issues/2102)) ([ed3c393](https://github.com/SAP/ui5-webcomponents/commit/ed3c393)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-file-uploader:** implement custom valueStateMessage ([#2131](https://github.com/SAP/ui5-webcomponents/issues/2131)) ([023e236](https://github.com/SAP/ui5-webcomponents/commit/023e236)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-li, ui5-li-tree, ui5-li-custom, ui5-upload-collection-item:**  implement role property ([#2236](https://github.com/SAP/ui5-webcomponents/issues/2236)) ([01a1fb0](https://github.com/SAP/ui5-webcomponents/commit/01a1fb0))
* **ui5-multi-combobox:** implement icon slot ([#2140](https://github.com/SAP/ui5-webcomponents/issues/2140)) ([0fde573](https://github.com/SAP/ui5-webcomponents/commit/0fde573))
* **ui5-multi-combobox:** Implement valueStateMessage ([#2258](https://github.com/SAP/ui5-webcomponents/issues/2258)) ([793a29e](https://github.com/SAP/ui5-webcomponents/commit/793a29e)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-multi-input:** fire value-help-trigger with F4, ALT/OPTION + ARROW_UP/DOWN ([#2145](https://github.com/SAP/ui5-webcomponents/issues/2145)) ([8c473c3](https://github.com/SAP/ui5-webcomponents/commit/8c473c3)), closes [#2143](https://github.com/SAP/ui5-webcomponents/issues/2143)
* **ui5-multi-input:** initial implementation ([#1942](https://github.com/SAP/ui5-webcomponents/issues/1942)) ([5d7e7df](https://github.com/SAP/ui5-webcomponents/commit/5d7e7df))
* **ui5-multiinput, ui5-multi-combobox:** implement keyboard handling ([#2166](https://github.com/SAP/ui5-webcomponents/issues/2166)) ([dc2ae6d](https://github.com/SAP/ui5-webcomponents/commit/dc2ae6d))
* **ui5-panel:** implement headerAriaLabelledBy property ([#2200](https://github.com/SAP/ui5-webcomponents/issues/2200)) ([67c4d69](https://github.com/SAP/ui5-webcomponents/commit/67c4d69))
* **ui5-select:** add ariaLabel and ariaLabelledby properties ([#2125](https://github.com/SAP/ui5-webcomponents/issues/2125)) ([a58bf49](https://github.com/SAP/ui5-webcomponents/commit/a58bf49)), closes [#2107](https://github.com/SAP/ui5-webcomponents/issues/2107)
* **ui5-select:** implеment value state message ([4133a42](https://github.com/SAP/ui5-webcomponents/commit/4133a42)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-select:** introduce required property ([#2116](https://github.com/SAP/ui5-webcomponents/issues/2116)) ([f66875a](https://github.com/SAP/ui5-webcomponents/commit/f66875a))
* **ui5-shellbar:** implement root part ([#2299](https://github.com/SAP/ui5-webcomponents/issues/2299)) ([de2d07f](https://github.com/SAP/ui5-webcomponents/commit/de2d07f))
* **ui5-tab-container:** implement overflow-button slot ([#2192](https://github.com/SAP/ui5-webcomponents/issues/2192)) ([e91c200](https://github.com/SAP/ui5-webcomponents/commit/e91c200))
* **ui5-textarea:** add ariaLabel and ariaLabelledby properties ([#2124](https://github.com/SAP/ui5-webcomponents/issues/2124)) ([c005478](https://github.com/SAP/ui5-webcomponents/commit/c005478)), closes [#2107](https://github.com/SAP/ui5-webcomponents/issues/2107)
* **ui5-time-picker:** improve keyboard handling support ([#2092](https://github.com/SAP/ui5-webcomponents/issues/2092)) ([20c55ed](https://github.com/SAP/ui5-webcomponents/commit/20c55ed)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-token:** provide closeIcon slot ([#2193](https://github.com/SAP/ui5-webcomponents/issues/2193)) ([d19fa5f](https://github.com/SAP/ui5-webcomponents/commit/d19fa5f))





# [1.0.0-rc.8](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2020-07-30)

### New Components

* **ui5-daterange-picker:** Introduce new component ([#1785](https://github.com/SAP/ui5-webcomponents/issues/1785)) ([4c11286](https://github.com/SAP/ui5-webcomponents/commit/4c11286))
* **ui5-flexible-column-layout:** Introduce new component ([#1867](https://github.com/SAP/ui5-webcomponents/issues/1867)) ([7a68dd2](https://github.com/SAP/ui5-webcomponents/commit/7a68dd2))
* **ui5-li-notification, ui5-li-notification-group:** introduce new components ([#1576](https://github.com/SAP/ui5-webcomponents/issues/1576)) ([ef62f81](https://github.com/SAP/ui5-webcomponents/commit/ef62f81)), closes [#1478](https://github.com/SAP/ui5-webcomponents/issues/1478)
* **ui5-progress-indicator:** Introduce new component ([#1887](https://github.com/SAP/ui5-webcomponents/issues/1887)) ([e8009c9](https://github.com/SAP/ui5-webcomponents/commit/e8009c9)), closes [#1392](https://github.com/SAP/ui5-webcomponents/issues/1392)
* **ui5-rating-indicator:** Introduce new component ([#1729](https://github.com/SAP/ui5-webcomponents/issues/1729)) ([a28f201](https://github.com/SAP/ui5-webcomponents/commit/a28f201))
* **ui5-side-navigation:** Introduce new component ([#1889](https://github.com/SAP/ui5-webcomponents/issues/1889)) ([47b38cc](https://github.com/SAP/ui5-webcomponents/commit/47b38cc))
* **ui5-tree:** Introduce new component ([#1580](https://github.com/SAP/ui5-webcomponents/issues/1580)) ([2dd97cf](https://github.com/SAP/ui5-webcomponents/commit/2dd97cf))

### New Themes

* **theming:** Introduce sap_fiori_3_hcb and sap_fiori_3_hcw themes ([#1947](https://github.com/SAP/ui5-webcomponents/issues/1947)) ([81afb57](https://github.com/SAP/ui5-webcomponents/commit/81afb57))

### Bug Fixes

* **ui5-avatar:** Image URL may now contain special characters ([#1828](https://github.com/SAP/ui5-webcomponents/issues/1828)) ([3acab5a](https://github.com/SAP/ui5-webcomponents/commit/3acab5a))
* **ui5-avatar:** Correct colors are applied for acc themes ([#1786](https://github.com/SAP/ui5-webcomponents/issues/1786)) ([42f1766](https://github.com/SAP/ui5-webcomponents/commit/42f1766))
* **ui5-busyindicator:** Set bigger opacity for IE ([#2010](https://github.com/SAP/ui5-webcomponents/issues/2010)) ([ab3f92f](https://github.com/SAP/ui5-webcomponents/commit/ab3f92f)), closes [#2005](https://github.com/SAP/ui5-webcomponents/issues/2005)
* **ui5-button:** Align verticaly icon in IE ([#1823](https://github.com/SAP/ui5-webcomponents/issues/1823)) ([b003f05](https://github.com/SAP/ui5-webcomponents/commit/b003f05))
* **ui5-busy-indicator:** fix double focus issue ([#1779](https://github.com/SAP/ui5-webcomponents/issues/1779)) ([f7bc0aa](https://github.com/SAP/ui5-webcomponents/commit/f7bc0aa))
* **ui5-button:** Apply aria-expanded to inner button tag ([#1781](https://github.com/SAP/ui5-webcomponents/issues/1781)) ([df9e4e9](https://github.com/SAP/ui5-webcomponents/commit/df9e4e9))
* **ui5-busyindicator:** Prevent keyboard events propagation to controls ([#1607](https://github.com/SAP/ui5-webcomponents/issues/1607)) ([031b6ca](https://github.com/SAP/ui5-webcomponents/commit/031b6ca))
* **ui5-button:** Fetermine icon-only ignoring comment nodes ([#1679](https://github.com/SAP/ui5-webcomponents/issues/1679)) ([ba1ee78](https://github.com/SAP/ui5-webcomponents/commit/ba1ee78))
* **ui5-button:** Make buttons truncate ([#1586](https://github.com/SAP/ui5-webcomponents/issues/1586)) ([1044daa](https://github.com/SAP/ui5-webcomponents/commit/1044daa))
* **ui5-card:** Remove header outline ([#1891](https://github.com/SAP/ui5-webcomponents/issues/1891)) ([8f260f8](https://github.com/SAP/ui5-webcomponents/commit/8f260f8))
* **ui5-carousel:** Make content under the navigation arrows accessible ([#2014](https://github.com/SAP/ui5-webcomponents/issues/2014)) ([8123288](https://github.com/SAP/ui5-webcomponents/commit/8123288))
* **ui5-combo-box:** Close picker when no match ([#1926](https://github.com/SAP/ui5-webcomponents/issues/1926)) ([dcac133](https://github.com/SAP/ui5-webcomponents/commit/dcac133)), closes [#1920](https://github.com/SAP/ui5-webcomponents/issues/1920)
* **ui5-combobox:** Close popover on "Enter" key press ([f0e2bac](https://github.com/SAP/ui5-webcomponents/commit/f0e2bac)), closes [#1940](https://github.com/SAP/ui5-webcomponents/issues/1940)
* **ui5-combobox:** Close popup on focusout ([#2013](https://github.com/SAP/ui5-webcomponents/issues/2013)) ([2c95be4](https://github.com/SAP/ui5-webcomponents/commit/2c95be4)), closes [#2009](https://github.com/SAP/ui5-webcomponents/issues/2009)
* **ui5-combobox:** Corrected display of items in popover ([23fb8b7](https://github.com/SAP/ui5-webcomponents/commit/23fb8b7)), closes [#1925](https://github.com/SAP/ui5-webcomponents/issues/1925)
* **ui5-combobox:** Support aria-label/arial-labelledby and fix aria-expanded ([#1916](https://github.com/SAP/ui5-webcomponents/issues/1916)) ([99a0e81](https://github.com/SAP/ui5-webcomponents/commit/99a0e81))
* **ui5-datepicker:** Fix value state when min/max  set ([#1742](https://github.com/SAP/ui5-webcomponents/issues/1742)) ([681de1f](https://github.com/SAP/ui5-webcomponents/commit/681de1f)), closes [#1740](https://github.com/SAP/ui5-webcomponents/issues/1740)
* **ui5-datetime-picker:** Set min-width ([#1698](https://github.com/SAP/ui5-webcomponents/issues/1698)) ([7313838](https://github.com/SAP/ui5-webcomponents/commit/7313838))
* **ui5-dialog:** Position block layer fixed ([#1757](https://github.com/SAP/ui5-webcomponents/issues/1757)) ([377075a](https://github.com/SAP/ui5-webcomponents/commit/377075a))
* **ui5-dialog:** Restrict max height and width based on spec ([#1665](https://github.com/SAP/ui5-webcomponents/issues/1665)) ([a00225c](https://github.com/SAP/ui5-webcomponents/commit/a00225c))
* **ui5-dialog:** Unblock body scrolling when dialog is removed from DOM ([#1756](https://github.com/SAP/ui5-webcomponents/issues/1756)) ([6742295](https://github.com/SAP/ui5-webcomponents/commit/6742295))
* **ui5-dialog:** Fix behaviour on mobile when added to DOM on interaction ([#1830](https://github.com/SAP/ui5-webcomponents/issues/1830)) ([f95807d](https://github.com/SAP/ui5-webcomponents/commit/f95807d))
* **ui5-duration-picker:** Make maxValue work with values greater than 23:59:59 ([#1666](https://github.com/SAP/ui5-webcomponents/issues/1666)) ([da30bc1](https://github.com/SAP/ui5-webcomponents/commit/da30bc1))
* **ui5-file-uploader:** Setting the value to an empty string also resets the file input ([#1715](https://github.com/SAP/ui5-webcomponents/issues/1715)) ([f8b1b39](https://github.com/SAP/ui5-webcomponents/commit/f8b1b39))
* **ui5-file-uploader:** Fix JS error thrown in IE ([#2023](https://github.com/SAP/ui5-webcomponents/issues/2023)) ([61b0205](https://github.com/SAP/ui5-webcomponents/commit/61b0205))
* **ui5-flexible-column-layout:** Fix media breakpoints ([#1984](https://github.com/SAP/ui5-webcomponents/issues/1984)) ([f17cba3](https://github.com/SAP/ui5-webcomponents/commit/f17cba3)), closes [#1972](https://github.com/SAP/ui5-webcomponents/issues/1972)
* **ui5-icon:** Icon now has a correct role ([#1652](https://github.com/SAP/ui5-webcomponents/issues/1652)) ([d9933bd](https://github.com/SAP/ui5-webcomponents/commit/d9933bd))
* **ui5-input:** Fix input cursor movement in Safari ([#1983](https://github.com/SAP/ui5-webcomponents/issues/1983)) ([7a9e9a3](https://github.com/SAP/ui5-webcomponents/commit/7a9e9a3))
* **ui5-input:** Fix JS error on mouseover/out ([#1931](https://github.com/SAP/ui5-webcomponents/issues/1931)) ([7da7a54](https://github.com/SAP/ui5-webcomponents/commit/7da7a54)), closes [#1930](https://github.com/SAP/ui5-webcomponents/issues/1930)
* **ui5-input:** Fix JS errors when open/close popups ([#1811](https://github.com/SAP/ui5-webcomponents/issues/1811)) ([cbe8bb8](https://github.com/SAP/ui5-webcomponents/commit/cbe8bb8))
* **ui5-input:** Fix scrolling item into view ([#1848](https://github.com/SAP/ui5-webcomponents/issues/1848)) ([5438c66](https://github.com/SAP/ui5-webcomponents/commit/5438c66)), closes [#1847](https://github.com/SAP/ui5-webcomponents/issues/1847)
* **ui5-input:** Fix selection color and background ([#1954](https://github.com/SAP/ui5-webcomponents/issues/1954)) ([30c357a](https://github.com/SAP/ui5-webcomponents/commit/30c357a))
* **ui5-input:** Stop firing focusout on suggestion click ([#1857](https://github.com/SAP/ui5-webcomponents/issues/1857)) ([a33dd95](https://github.com/SAP/ui5-webcomponents/commit/a33dd95)), closes [#1846](https://github.com/SAP/ui5-webcomponents/issues/1846)
* **ui5-input:** Suggestions can now be arbitrary list items ([#1969](https://github.com/SAP/ui5-webcomponents/issues/1969)) ([aa6fde4](https://github.com/SAP/ui5-webcomponents/commit/aa6fde4))
* **ui5-input:** Sync width of suggestions popover and input ([#1979](https://github.com/SAP/ui5-webcomponents/issues/1979)) ([dd4633e](https://github.com/SAP/ui5-webcomponents/commit/dd4633e))
* **ui5-input:** Announce selected item ([#1578](https://github.com/SAP/ui5-webcomponents/issues/1578)) ([b28f7c4](https://github.com/SAP/ui5-webcomponents/commit/b28f7c4))
* **ui5-label:** Fix width for italic labels ([#1625](https://github.com/SAP/ui5-webcomponents/issues/1625)) ([14a48d1](https://github.com/SAP/ui5-webcomponents/commit/14a48d1))
* **ui5-link:** Fix "click twice" issue in Safari ([#1799](https://github.com/SAP/ui5-webcomponents/issues/1799)) ([#1800](https://github.com/SAP/ui5-webcomponents/issues/1800)) ([0f69b84](https://github.com/SAP/ui5-webcomponents/commit/0f69b84)), closes [#1796](https://github.com/SAP/ui5-webcomponents/issues/1796)
* **ui5-li:** Do not announce active list item type ([#1575](https://github.com/SAP/ui5-webcomponents/issues/1575)) ([ec14719](https://github.com/SAP/ui5-webcomponents/commit/ec14719))
* **ui5-list:** No longer show a dot on IE ([#2011](https://github.com/SAP/ui5-webcomponents/issues/2011)) ([77cabba](https://github.com/SAP/ui5-webcomponents/commit/77cabba))
* **ui5-list:** Fire itemClick after the selection ([#1618](https://github.com/SAP/ui5-webcomponents/issues/1618)) ([28326c5](https://github.com/SAP/ui5-webcomponents/commit/28326c5))
* **ui5-messagestrip:** Add RTL support ([#1741](https://github.com/SAP/ui5-webcomponents/issues/1741)) ([6172005](https://github.com/SAP/ui5-webcomponents/commit/6172005)), closes [#1739](https://github.com/SAP/ui5-webcomponents/issues/1739)
* **ui5-panel:** The expand/collapse button is not in the DOM when fixed ([#1793](https://github.com/SAP/ui5-webcomponents/issues/1793)) ([0b1dc52](https://github.com/SAP/ui5-webcomponents/commit/0b1dc52))
* **ui5-popover:** Close popup when no opener ([#1630](https://github.com/SAP/ui5-webcomponents/issues/1630)) ([bd46d7b](https://github.com/SAP/ui5-webcomponents/commit/bd46d7b))
* **ui5-popover:** Ensure offset from window borders ([#1690](https://github.com/SAP/ui5-webcomponents/issues/1690)) ([b673a0c](https://github.com/SAP/ui5-webcomponents/commit/b673a0c))
* **ui5-popover:** Fix closing order of popovers ([#1676](https://github.com/SAP/ui5-webcomponents/issues/1676)) ([14add07](https://github.com/SAP/ui5-webcomponents/commit/14add07))
* **ui5-segmentedbutton:** Add RTL support ([#1734](https://github.com/SAP/ui5-webcomponents/issues/1734)) ([1c6a9bb](https://github.com/SAP/ui5-webcomponents/commit/1c6a9bb))
* **ui5-segmentedbutton:** Fix measuring when parent is not displayed ([#1657](https://github.com/SAP/ui5-webcomponents/issues/1657)) ([d00b0be](https://github.com/SAP/ui5-webcomponents/commit/d00b0be))
* **ui5-segmentedbutton:** Fix rendering in ie ([#1622](https://github.com/SAP/ui5-webcomponents/issues/1622)) ([396993e](https://github.com/SAP/ui5-webcomponents/commit/396993e))
* **ui5-sebmentedbutton:** Fix intermittent JS error ([#1874](https://github.com/SAP/ui5-webcomponents/issues/1874)) ([c44d9aa](https://github.com/SAP/ui5-webcomponents/commit/c44d9aa))
* **ui5-segmentedbutton:** Buttons no longer shrink on click ([#2028](https://github.com/SAP/ui5-webcomponents/issues/2028)) ([7951adc](https://github.com/SAP/ui5-webcomponents/commit/7951adc))
* **ui5-select:** Improve keyboard handling ([#1771](https://github.com/SAP/ui5-webcomponents/issues/1771)) ([f555180](https://github.com/SAP/ui5-webcomponents/commit/f555180))
* **ui5-select:** Selection now changes instantly ([#2031](https://github.com/SAP/ui5-webcomponents/issues/2031)) ([88ceb83](https://github.com/SAP/ui5-webcomponents/commit/88ceb83))
* **ui5-select:** Fix use of ESC leads to wrong selection ([#1724](https://github.com/SAP/ui5-webcomponents/issues/1724)) ([095d6dc](https://github.com/SAP/ui5-webcomponents/commit/095d6dc))
* **ui5-shellbar:** Fix profile bg-color ([#1945](https://github.com/SAP/ui5-webcomponents/issues/1945)) ([a3207e5](https://github.com/SAP/ui5-webcomponents/commit/a3207e5)), closes [#1944](https://github.com/SAP/ui5-webcomponents/issues/1944)
* **ui5-shellbar:** Profile is styled correctly on IE ([#1807](https://github.com/SAP/ui5-webcomponents/issues/1807)) ([4198599](https://github.com/SAP/ui5-webcomponents/commit/4198599))
* **ui5-shellbar:** Fix open popup on notificationClick ([#1632](https://github.com/SAP/ui5-webcomponents/issues/1632)) ([04b44b4](https://github.com/SAP/ui5-webcomponents/commit/04b44b4))
* **ui5-shellbar:** Fix search field focus handling ([#1636](https://github.com/SAP/ui5-webcomponents/issues/1636)) ([c65010b](https://github.com/SAP/ui5-webcomponents/commit/c65010b))
* **ui5-shellbar:** Fix search field visual in IE ([#1643](https://github.com/SAP/ui5-webcomponents/issues/1643)) ([afec3fe](https://github.com/SAP/ui5-webcomponents/commit/afec3fe))
* **ui5-table:** Fire rowClick for popped in cells as well ([#1671](https://github.com/SAP/ui5-webcomponents/issues/1671)) ([c48f541](https://github.com/SAP/ui5-webcomponents/commit/c48f541))
* **ui5-table-cell:** Fix popin of long texts ([#1648](https://github.com/SAP/ui5-webcomponents/issues/1648)) ([61ce284](https://github.com/SAP/ui5-webcomponents/commit/61ce284))
* **ui5-table-column:** Fix sticky column overlaps dialogs ([#1609](https://github.com/SAP/ui5-webcomponents/issues/1609)) ([c80130d](https://github.com/SAP/ui5-webcomponents/commit/c80130d)), closes [#1602](https://github.com/SAP/ui5-webcomponents/issues/1602)
* **ui5-table-row:** Do not show the colon when there is no popin text ([#1620](https://github.com/SAP/ui5-webcomponents/issues/1620)) ([2785daf](https://github.com/SAP/ui5-webcomponents/commit/2785daf))
* **ui5-textarea:** Add missing dependency, extract .hbs partial ([#1909](https://github.com/SAP/ui5-webcomponents/issues/1909)) ([25ed25f](https://github.com/SAP/ui5-webcomponents/commit/25ed25f))
* **ui5-textarea:** Fix text vertical alignment ([#1668](https://github.com/SAP/ui5-webcomponents/issues/1668)) ([6790647](https://github.com/SAP/ui5-webcomponents/commit/6790647))
* **ui5-timepicker:** Adjust hours in 12hours format only ([#1752](https://github.com/SAP/ui5-webcomponents/issues/1752)) ([df0add4](https://github.com/SAP/ui5-webcomponents/commit/df0add4)), closes [#1714](https://github.com/SAP/ui5-webcomponents/issues/1714)
* **ui5-timepicker:** Fix firing "change" event for the same value ([#1764](https://github.com/SAP/ui5-webcomponents/issues/1764)) ([3a0c7d5](https://github.com/SAP/ui5-webcomponents/commit/3a0c7d5))
* **ui5-timepicker, ui5-duration-picker:** Enable  width customization ([#1669](https://github.com/SAP/ui5-webcomponents/issues/1669)) ([9cfcbbf](https://github.com/SAP/ui5-webcomponents/commit/9cfcbbf))
* **ui5-togglebutton:** Align icon in IE ([#1824](https://github.com/SAP/ui5-webcomponents/issues/1824)) ([2d5e84b](https://github.com/SAP/ui5-webcomponents/commit/2d5e84b))
* **ui5-tabcontainer:** aria-controls now points to an existing ID ([#1817](https://github.com/SAP/ui5-webcomponents/issues/1817)) ([4bd3604](https://github.com/SAP/ui5-webcomponents/commit/4bd3604))
* **ui5-tabcontainer:** Correct selected text color used for sap_belize ([#1876](https://github.com/SAP/ui5-webcomponents/issues/1876)) ([41d14f6](https://github.com/SAP/ui5-webcomponents/commit/41d14f6))
* **ui5-tabcontainer:** Fix accessibility of overflow button ([#1978](https://github.com/SAP/ui5-webcomponents/issues/1978)) ([a7488cd](https://github.com/SAP/ui5-webcomponents/commit/a7488cd))
* **ui5-tabcontainer:** Fix box-shadow ([#1829](https://github.com/SAP/ui5-webcomponents/issues/1829)) ([42998c7](https://github.com/SAP/ui5-webcomponents/commit/42998c7))
* **ui5-tabcontainer:** Fix ID duplication ([#1789](https://github.com/SAP/ui5-webcomponents/issues/1789)) ([511cb40](https://github.com/SAP/ui5-webcomponents/commit/511cb40))
* **ui5-tabcontainer:** Fix overflow visibility ([#1993](https://github.com/SAP/ui5-webcomponents/issues/1993)) ([d6c2cbc](https://github.com/SAP/ui5-webcomponents/commit/d6c2cbc))
* **ui5-tabcontainer:** Prevent the tabcontainer from setting the selected property on ui5-tab internally ([#1974](https://github.com/SAP/ui5-webcomponents/issues/1974)) ([0e8b5ea](https://github.com/SAP/ui5-webcomponents/commit/0e8b5ea))
* **ui5-upload-collection:** Set minimum height in no-data mode ([#1683](https://github.com/SAP/ui5-webcomponents/issues/1683)) ([549148d](https://github.com/SAP/ui5-webcomponents/commit/549148d))
* **ui5-upload-collection:** Provide min-height also when DND mode is on ([#1770](https://github.com/SAP/ui5-webcomponents/issues/1770)) ([33fa055](https://github.com/SAP/ui5-webcomponents/commit/33fa055))
* **ui5-upload-collection:** The component does not get stuck when dropping on the body ([#1897](https://github.com/SAP/ui5-webcomponents/issues/1897)) ([f236e0d](https://github.com/SAP/ui5-webcomponents/commit/f236e0d))
* **ui5-upload-collection-item:** Make component responsive ([#1579](https://github.com/SAP/ui5-webcomponents/issues/1579)) ([47d37c3](https://github.com/SAP/ui5-webcomponents/commit/47d37c3))
* **ui5-upload-collection-item:** Activate editing with SPACE ([#2024](https://github.com/SAP/ui5-webcomponents/issues/2024)) ([45de0f2](https://github.com/SAP/ui5-webcomponents/commit/45de0f2)), closes [#2003](https://github.com/SAP/ui5-webcomponents/issues/2003)
* **framework:** Allow for empty theme files ([#1639](https://github.com/SAP/ui5-webcomponents/issues/1639)) ([0cef140](https://github.com/SAP/ui5-webcomponents/commit/0cef140))
* **framework:** Fix openui5 css varaibles detection ([#1933](https://github.com/SAP/ui5-webcomponents/issues/1933)) ([bb5b724](https://github.com/SAP/ui5-webcomponents/commit/bb5b724)), closes [#1932](https://github.com/SAP/ui5-webcomponents/issues/1932)
* **framework:** Make renderImmediately sync, fix lifecycle issues ([#1929](https://github.com/SAP/ui5-webcomponents/issues/1929)) ([9141300](https://github.com/SAP/ui5-webcomponents/commit/9141300))
* **framework:** managedSlots: true always has effect ([#1952](https://github.com/SAP/ui5-webcomponents/issues/1952)) ([4a1be70](https://github.com/SAP/ui5-webcomponents/commit/4a1be70))
* **framework:** Take region into account for i18n assets ([#1985](https://github.com/SAP/ui5-webcomponents/issues/1985)) ([3b614ad](https://github.com/SAP/ui5-webcomponents/commit/3b614ad))
* **framework:** Allow users to override default language translations ([#1716](https://github.com/SAP/ui5-webcomponents/issues/1716)) ([4b10f4f](https://github.com/SAP/ui5-webcomponents/commit/4b10f4f))
* **framework:** Slotted children now invalidate parent upon slotchange ([#1649](https://github.com/SAP/ui5-webcomponents/issues/1649)) ([3ca4ae1](https://github.com/SAP/ui5-webcomponents/commit/3ca4ae1))
* **tools:** Remove white spaces from hbs parser ([#1613](https://github.com/SAP/ui5-webcomponents/issues/1613)) ([ec5a9cf](https://github.com/SAP/ui5-webcomponents/commit/ec5a9cf))
* **tools:** Strip whitespaces around < and > ([#1623](https://github.com/SAP/ui5-webcomponents/issues/1623)) ([0fcda38](https://github.com/SAP/ui5-webcomponents/commit/0fcda38))
* **tools:** Enables 3 or more levels of inheritance with templates ([#1593](https://github.com/SAP/ui5-webcomponents/issues/1593)) ([2a426dd](https://github.com/SAP/ui5-webcomponents/commit/2a426dd))
* **tools:** Building third-party packages no longer fails ([#1994](https://github.com/SAP/ui5-webcomponents/issues/1994)) ([07aebfa](https://github.com/SAP/ui5-webcomponents/commit/07aebfa))
* **tools:** Polyfill copied correctly in all scenarios ([#1783](https://github.com/SAP/ui5-webcomponents/issues/1783)) ([a04f483](https://github.com/SAP/ui5-webcomponents/commit/a04f483))
* **icons:** The overflow icon is now centered ([#1777](https://github.com/SAP/ui5-webcomponents/issues/1777)) ([36d0eca](https://github.com/SAP/ui5-webcomponents/commit/36d0eca))

### Features

* **ui5-card:** Add 'action' slot ([#1915](https://github.com/SAP/ui5-webcomponents/issues/1915)) ([97c299d](https://github.com/SAP/ui5-webcomponents/commit/97c299d))
* **ui5-carousel:** Introduce loadMore event ([#1667](https://github.com/SAP/ui5-webcomponents/issues/1667)) ([e7af480](https://github.com/SAP/ui5-webcomponents/commit/e7af480))
* **ui5-datepicker:** Add property to hide week numbers ([#1955](https://github.com/SAP/ui5-webcomponents/issues/1955)) ([d11c973](https://github.com/SAP/ui5-webcomponents/commit/d11c973)), closes [#1949](https://github.com/SAP/ui5-webcomponents/issues/1949)
* **ui5-datepicker:** Implement keyboard handling ([#1706](https://github.com/SAP/ui5-webcomponents/issues/1706)) ([15e915f](https://github.com/SAP/ui5-webcomponents/commit/15e915f))
* **ui5-datepicker:** Implement valuestatemessage slot ([#1476](https://github.com/SAP/ui5-webcomponents/issues/1476)) ([82b3d41](https://github.com/SAP/ui5-webcomponents/commit/82b3d41))
* **ui5-datepicker:** set value attribute through date object ([#1624](https://github.com/SAP/ui5-webcomponents/issues/1624)) ([4d7586d](https://github.com/SAP/ui5-webcomponents/commit/4d7586d))
* **ui5-duration-picker:** Implement hide-hours & hide-minutes propererties ([#1604](https://github.com/SAP/ui5-webcomponents/issues/1604)) ([0af9b00](https://github.com/SAP/ui5-webcomponents/commit/0af9b00))
* **ui5-duration-picker:** Implement seconds-step & minutes-step properties ([#1603](https://github.com/SAP/ui5-webcomponents/issues/1603)) ([37ee069](https://github.com/SAP/ui5-webcomponents/commit/37ee069))
* **ui5-fileuploader:** Implementing accessiblity specification ([#1585](https://github.com/SAP/ui5-webcomponents/issues/1585)) ([76943bc](https://github.com/SAP/ui5-webcomponents/commit/76943bc))
* **ui5-icon:** Introduce interactive property ([#1592](https://github.com/SAP/ui5-webcomponents/issues/1592)) ([b898cd3](https://github.com/SAP/ui5-webcomponents/commit/b898cd3))
* **ui5-input:** Add highlighting ([#1943](https://github.com/SAP/ui5-webcomponents/issues/1943)) ([673ed8d](https://github.com/SAP/ui5-webcomponents/commit/673ed8d))
* **ui5-input:** Add suggestion-item-preview event ([#1778](https://github.com/SAP/ui5-webcomponents/issues/1778)) ([e7f380e](https://github.com/SAP/ui5-webcomponents/commit/e7f380e)), closes [#1768](https://github.com/SAP/ui5-webcomponents/issues/1768)
* **ui5-input:** Add suggestion-scroll event ([#1856](https://github.com/SAP/ui5-webcomponents/issues/1856)) ([1d20ba8](https://github.com/SAP/ui5-webcomponents/commit/1d20ba8)), closes [#1846](https://github.com/SAP/ui5-webcomponents/issues/1846)
* **ui5-input:** Announce suggestions count ([#1975](https://github.com/SAP/ui5-webcomponents/issues/1975)) ([a7d216c](https://github.com/SAP/ui5-webcomponents/commit/a7d216c))
* **ui5-input:** Implement aria-label ([#1782](https://github.com/SAP/ui5-webcomponents/issues/1782)) ([a588ffe](https://github.com/SAP/ui5-webcomponents/commit/a588ffe))
* **ui5-input:** Support 'inactive' suggestions ([#1921](https://github.com/SAP/ui5-webcomponents/issues/1921)) ([eca3bd6](https://github.com/SAP/ui5-webcomponents/commit/eca3bd6)), closes [#1919](https://github.com/SAP/ui5-webcomponents/issues/1919)
* **ui5-input:** Support ariaLabelledBy ([#1873](https://github.com/SAP/ui5-webcomponents/issues/1873)) ([2356cd0](https://github.com/SAP/ui5-webcomponents/commit/2356cd0))
* **ui5-li:** Support 'Information' infoState ([#1997](https://github.com/SAP/ui5-webcomponents/issues/1997)) ([401b499](https://github.com/SAP/ui5-webcomponents/commit/401b499))
* **ui5-list:** Support aria-label and aria-labelledby ([#1899](https://github.com/SAP/ui5-webcomponents/issues/1899)) ([cacf5d8](https://github.com/SAP/ui5-webcomponents/commit/cacf5d8)), closes [#1886](https://github.com/SAP/ui5-webcomponents/issues/1886)
* **ui5-multicombobox:** Implement latest accessibility spec ([#1564](https://github.com/SAP/ui5-webcomponents/issues/1564)) ([b0917d5](https://github.com/SAP/ui5-webcomponents/commit/b0917d5))
* **ui5-panel:** Support aria-label and aria-labelledby ([#1910](https://github.com/SAP/ui5-webcomponents/issues/1910)) ([8cb7c48](https://github.com/SAP/ui5-webcomponents/commit/8cb7c48))
* **ui5-popup:** Support for aria-label ([#1898](https://github.com/SAP/ui5-webcomponents/issues/1898)) ([69d8ee4](https://github.com/SAP/ui5-webcomponents/commit/69d8ee4))
* **ui5-popover:** Prevent closing when no opener ([#1911](https://github.com/SAP/ui5-webcomponents/issues/1911)) ([e7c2518](https://github.com/SAP/ui5-webcomponents/commit/e7c2518)), closes [#1768](https://github.com/SAP/ui5-webcomponents/issues/1768)
* **ui5-popup:** Custom popups work with focusable elements in the shadow root ([#1844](https://github.com/SAP/ui5-webcomponents/issues/1844)) ([a109558](https://github.com/SAP/ui5-webcomponents/commit/a109558))
* **ui5-select:** Implement angular two way data binding ([#1583](https://github.com/SAP/ui5-webcomponents/issues/1583)) ([f1f3d4f](https://github.com/SAP/ui5-webcomponents/commit/f1f3d4f))
* **ui5-shellbar:** Add "logo" slot ([#1842](https://github.com/SAP/ui5-webcomponents/issues/1842)) ([08fc5f3](https://github.com/SAP/ui5-webcomponents/commit/08fc5f3))
* **ui5-shellbar:** Enable tooltips of custom icons ([#1863](https://github.com/SAP/ui5-webcomponents/issues/1863)) ([4338d56](https://github.com/SAP/ui5-webcomponents/commit/4338d56))
* **ui5-shellbar:** Implement accessibility spec ([#1553](https://github.com/SAP/ui5-webcomponents/issues/1553)) ([3b7b439](https://github.com/SAP/ui5-webcomponents/commit/3b7b439))
* **ui5-suggestion-item:** Enable mouseover|out events ([#1784](https://github.com/SAP/ui5-webcomponents/issues/1784)) ([4359b9a](https://github.com/SAP/ui5-webcomponents/commit/4359b9a))
* **ui5-tabcontainer:** Add expand/collapse animation ([#1617](https://github.com/SAP/ui5-webcomponents/issues/1617)) ([0c32950](https://github.com/SAP/ui5-webcomponents/commit/0c32950)), closes [#1540](https://github.com/SAP/ui5-webcomponents/issues/1540)
* **ui5-table:** Allow custom styling ([#1627](https://github.com/SAP/ui5-webcomponents/issues/1627)) ([232e7f5](https://github.com/SAP/ui5-webcomponents/commit/232e7f5))
* **ui5-timepicker:** Implement valuestatemessage slot ([#1482](https://github.com/SAP/ui5-webcomponents/issues/1482)) ([b1d30f3](https://github.com/SAP/ui5-webcomponents/commit/b1d30f3))
* **ui5-upload-collection-item:** Implement keyboard handling ([#1702](https://github.com/SAP/ui5-webcomponents/issues/1702)) ([37bf177](https://github.com/SAP/ui5-webcomponents/commit/37bf177))
* **framework:** Add dynamic language change and on-demand rerendering ([#1746](https://github.com/SAP/ui5-webcomponents/issues/1746)) ([1b568f2](https://github.com/SAP/ui5-webcomponents/commit/1b568f2))
* **framework:** CLDR location can now be specified ([#1687](https://github.com/SAP/ui5-webcomponents/issues/1687)) ([168e505](https://github.com/SAP/ui5-webcomponents/commit/168e505))
* **framework:** Create a global shared resources repo, share SVG Icons ([#1869](https://github.com/SAP/ui5-webcomponents/issues/1869)) ([7f5a198](https://github.com/SAP/ui5-webcomponents/commit/7f5a198))
* **framework:** Implement invalidateParent ([#1964](https://github.com/SAP/ui5-webcomponents/issues/1964)) ([104abcc](https://github.com/SAP/ui5-webcomponents/commit/104abcc))
* **framework:** Implement stable DOM Ref functionality ([#1868](https://github.com/SAP/ui5-webcomponents/issues/1868)) ([cfd4fa3](https://github.com/SAP/ui5-webcomponents/commit/cfd4fa3))
* **framework:** Make icons RTL aware ([#1833](https://github.com/SAP/ui5-webcomponents/issues/1833)) ([29a991f](https://github.com/SAP/ui5-webcomponents/commit/29a991f)), closes [#1831](https://github.com/SAP/ui5-webcomponents/issues/1831)
* **framework:** Support properties message bundles for i18n ([#1728](https://github.com/SAP/ui5-webcomponents/issues/1728)) ([d78d136](https://github.com/SAP/ui5-webcomponents/commit/d78d136))
* **framework:** Support several runtimes simultaneously ([#1691](https://github.com/SAP/ui5-webcomponents/issues/1691)) ([7a3261c](https://github.com/SAP/ui5-webcomponents/commit/7a3261c))
* **tools:** Add more commands to package.json ([#1908](https://github.com/SAP/ui5-webcomponents/issues/1908)) ([b0551b3](https://github.com/SAP/ui5-webcomponents/commit/b0551b3))
* **tools:** Templates can be imported from node_modules/ ([#1860](https://github.com/SAP/ui5-webcomponents/issues/1860)) ([6fa5847](https://github.com/SAP/ui5-webcomponents/commit/6fa5847))

### BREAKING CHANGES

* **components:** Rename event names to kebab case ([#1692](https://github.com/SAP/ui5-webcomponents/issues/1692)) ([af1cfbe](https://github.com/SAP/ui5-webcomponents/commit/af1cfbe))

All event names are renamed from camelCase to kebabCase.

For Example: "selectionChange" becomes "selection-change", "itemClose" becomes "item-close",
"afterOpen" becomes "after-open" and so on.

* **ui5-popover, ui5-dialog:** Events don't bubble ([#1981](https://github.com/SAP/ui5-webcomponents/issues/1981)) ([0ffca82](https://github.com/SAP/ui5-webcomponents/commit/0ffca82))

If you relied on before-open, before-close, after-open or after-close bubbling and registered event listeners on a parent element, you must register these event listeners on the popup (popover, dialog etc...) instances directly.

* **ui5-shellbar:** Add "logo" slot ([#1842](https://github.com/SAP/ui5-webcomponents/issues/1842)) ([08fc5f3](https://github.com/SAP/ui5-webcomponents/commit/08fc5f3))

The property "logo" has been removed, use the "logo" slot instead as follows:
```html
<ui5-shellbar>
	<img slot="logo" src="../../../assets/images/sap-logo-svg.svg"/>
</ui5-shellbar>
```

* **ui5-date-picker:** Rename component ([#1801](https://github.com/SAP/ui5-webcomponents/issues/1801)) ([d972ec2](https://github.com/SAP/ui5-webcomponents/commit/d972ec2))
Previously called  `ui5-datepicker`, now it is renamed to `ui5-date-picker`:
```html
<ui5-date-picker></ui5-date-picker>
```

* **ui5-time-picker:** Rename component ([#1802](https://github.com/SAP/ui5-webcomponents/issues/1802)) ([fcb2e9e](https://github.com/SAP/ui5-webcomponents/commit/fcb2e9e))
Previously called  `ui5-timepicker`, now it is renamed to `ui5-time-picker`:
```html
<ui5-time-picker></ui5-time-picker>
```

* **ui5-tabcontainer:** Prevent auto selection of ui5-tab ([#1974](https://github.com/SAP/ui5-webcomponents/issues/1974)) ([0e8b5ea](https://github.com/SAP/ui5-webcomponents/commit/0e8b5ea))

Tab Container will no longer automatically select the first tab, if no tab is selected. If you relied on this behavior, you should now explicitly set the selected property on the first tab.

* **tools:** Libraries can now control chromedriver version ([#1684](https://github.com/SAP/ui5-webcomponents/issues/1684)) ([2da6a34](https://github.com/SAP/ui5-webcomponents/commit/2da6a34))

If you are a UI5 Web Components third-party library author, you need to add a dev dependency to `chromedriver` in your project.

For example, if you had previously:
```json
  "devDependencies": {
    "@ui5/webcomponents-tools": "1.0.0-rc.7"
  }
```
with RC.8 you should change this to:
```json
  "devDependencies": {
    "@ui5/webcomponents-tools": "1.0.0-rc.8",
    "chromedriver": "latest"
  }
``` 
Feel free to choose a version that suits your specific use case best, or `latest` if in doubt.

# [1.0.0-rc.7](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2020-04-30)

### New Components
* **ui5-datetime-picker:** introduce new component ([#1437](https://github.com/SAP/ui5-webcomponents/issues/1437)) ([ef27ca1](https://github.com/SAP/ui5-webcomponents/commit/ef27ca1))
* **ui5-duration-picker:** initial implementation ([#1415](https://github.com/SAP/ui5-webcomponents/issues/1415)) ([e38392e](https://github.com/SAP/ui5-webcomponents/commit/e38392e))
* **ui5-upload-collection:** implement new webcomponent ([#1316](https://github.com/SAP/ui5-webcomponents/issues/1316)) ([54038e4](https://github.com/SAP/ui5-webcomponents/commit/54038e4))

### Features

* **ui5-avatar:** implement accessibility spec ([#1484](https://github.com/SAP/ui5-webcomponents/issues/1484)) ([501740e](https://github.com/SAP/ui5-webcomponents/commit/501740e))
* **ui5-busyindicator:** implement text property ([#1506](https://github.com/SAP/ui5-webcomponents/issues/1506)) ([4118c68](https://github.com/SAP/ui5-webcomponents/commit/4118c68))
* **ui5-button:** support aria-labelledby attribute([#1446](https://github.com/SAP/ui5-webcomponents/issues/1446)) ([e54111f](https://github.com/SAP/ui5-webcomponents/commit/e54111f))
* **ui5-carousel:** add navigate event ([#1454](https://github.com/SAP/ui5-webcomponents/issues/1454)) ([c55bcdc](https://github.com/SAP/ui5-webcomponents/commit/c55bcdc))
* **ui5-carousel:** allow different number of items per page based on component width ([#1434](https://github.com/SAP/ui5-webcomponents/issues/1434)) ([dec0d4d](https://github.com/SAP/ui5-webcomponents/commit/dec0d4d))
* **ui5-combobox:** implement accessibility spec ([#1560](https://github.com/SAP/ui5-webcomponents/issues/1560)) ([3d56b4d](https://github.com/SAP/ui5-webcomponents/commit/3d56b4d))
* **ui5-input:** implement valueStateMessage with suggestions ([#1390](https://github.com/SAP/ui5-webcomponents/issues/1390)) ([39068b3](https://github.com/SAP/ui5-webcomponents/commit/39068b3))
* **ui5-list:** implement accessibility spec ([#1461](https://github.com/SAP/ui5-webcomponents/issues/1461)) ([348bde9](https://github.com/SAP/ui5-webcomponents/commit/348bde9))
* **ui5-panel:** enable configuring the heading level ([#1504](https://github.com/SAP/ui5-webcomponents/issues/1504)) ([710053b](https://github.com/SAP/ui5-webcomponents/commit/710053b))
* **ui5-segmentedbutton:** implement accessibility spec ([#1475](https://github.com/SAP/ui5-webcomponents/issues/1475)) ([ae7b395](https://github.com/SAP/ui5-webcomponents/commit/ae7b395))
* **ui5-select:** implement accessibility spec ([#1485](https://github.com/SAP/ui5-webcomponents/issues/1485)) ([ede3635](https://github.com/SAP/ui5-webcomponents/commit/ede3635))
* **ui5-tabcontainer:** content can be displayed above the tab strip ([#1516](https://github.com/SAP/ui5-webcomponents/issues/1516)) ([fb38b2c](https://github.com/SAP/ui5-webcomponents/commit/fb38b2c))
* **ui5-textarea:** add "valueState" property ([#1411](https://github.com/SAP/ui5-webcomponents/issues/1411)) ([6710038](https://github.com/SAP/ui5-webcomponents/commit/6710038))
* **ui5-textarea:** add "valueStateMessage" slot ([#1419](https://github.com/SAP/ui5-webcomponents/issues/1419)) ([d323d51](https://github.com/SAP/ui5-webcomponents/commit/d323d51))
* **ui5-timeline:** implement acc spec ([#1471](https://github.com/SAP/ui5-webcomponents/issues/1471)) ([27435ee](https://github.com/SAP/ui5-webcomponents/commit/27435ee))
* **ui5-wheelslider:** add cyclic behaviour ([#1408](https://github.com/SAP/ui5-webcomponents/issues/1408)) ([ac97824](https://github.com/SAP/ui5-webcomponents/commit/ac97824))
* **ui5-wheelslider:** swipe feature implementation ([#1470](https://github.com/SAP/ui5-webcomponents/issues/1470)) ([3665193](https://github.com/SAP/ui5-webcomponents/commit/3665193))
* **framework:** enable external themes support ([#1463](https://github.com/SAP/ui5-webcomponents/issues/1463)) ([b031782](https://github.com/SAP/ui5-webcomponents/commit/b031782))
* **framework:** register theme variables via CSS file ([#1451](https://github.com/SAP/ui5-webcomponents/issues/1451)) ([3173fb9](https://github.com/SAP/ui5-webcomponents/commit/3173fb9))

### Bug Fixes

* **ui5-busyindicator:** fix component placement and appearance in IE ([#1505](https://github.com/SAP/ui5-webcomponents/issues/1505)) ([0e57d78](https://github.com/SAP/ui5-webcomponents/commit/0e57d78))
* **ui5-button:** make aria-label work for ui5-button ([#1445](https://github.com/SAP/ui5-webcomponents/issues/1445)) ([f0f8964](https://github.com/SAP/ui5-webcomponents/commit/f0f8964))
* **ui5-button:** make aria-labelledby work with numeric id ([#1500](https://github.com/SAP/ui5-webcomponents/issues/1500)) ([ac6e8d2](https://github.com/SAP/ui5-webcomponents/commit/ac6e8d2))
* **ui5-carousel:** resizing of content is done properly ([#1402](https://github.com/SAP/ui5-webcomponents/issues/1402)) ([0e26906](https://github.com/SAP/ui5-webcomponents/commit/0e26906))
* **ui5-carousel:** hide arrows and dots when single page ([#1414](https://github.com/SAP/ui5-webcomponents/issues/1414)) ([f6c46be](https://github.com/SAP/ui5-webcomponents/commit/f6c46be))
* **ui5-combobox:** translate accessibleName ([#1563](https://github.com/SAP/ui5-webcomponents/issues/1563)) ([6cd3da8](https://github.com/SAP/ui5-webcomponents/commit/6cd3da8))
* **ui5-datepicker:** fix the value validation ([#1465](https://github.com/SAP/ui5-webcomponents/issues/1465)) ([14fe357](https://github.com/SAP/ui5-webcomponents/commit/14fe357))
* **ui5-datetime-picker:** fix AM/PM selection ([#1551](https://github.com/SAP/ui5-webcomponents/issues/1551)) ([af9ff8a](https://github.com/SAP/ui5-webcomponents/commit/af9ff8a)), closes [#1530](https://github.com/SAP/ui5-webcomponents/issues/1530)
* **ui5-dialog:** improve accessibility ([#1477](https://github.com/SAP/ui5-webcomponents/issues/1477)) ([38ffd25](https://github.com/SAP/ui5-webcomponents/commit/38ffd25))
* **ui5-groupheade-li:** fix focus handling ([#1544](https://github.com/SAP/ui5-webcomponents/issues/1544)) ([b0f180d](https://github.com/SAP/ui5-webcomponents/commit/b0f180d))
* **ui5-information:** fix component visual ([#1498](https://github.com/SAP/ui5-webcomponents/issues/1498)) ([746f907](https://github.com/SAP/ui5-webcomponents/commit/746f907))
* **ui5-multi-combobox:** fix initial focus on mobile ([#1508](https://github.com/SAP/ui5-webcomponents/issues/1508)) ([77e6ab6](https://github.com/SAP/ui5-webcomponents/commit/77e6ab6))
* **ui5-popover:** allow opening if opener is not fully visible ([#1448](https://github.com/SAP/ui5-webcomponents/issues/1448)) ([a10fde5](https://github.com/SAP/ui5-webcomponents/commit/a10fde5))
* **ui5-popover:** set fallback placement when no place to popup ([#1467](https://github.com/SAP/ui5-webcomponents/issues/1467)) ([cfeed00](https://github.com/SAP/ui5-webcomponents/commit/cfeed00))
* **ui5-popover:** show arrow border ([#1528](https://github.com/SAP/ui5-webcomponents/issues/1528)) ([56e5ba7](https://github.com/SAP/ui5-webcomponents/commit/56e5ba7))
* **ui5-product-switch-item:** fix active state ([#1547](https://github.com/SAP/ui5-webcomponents/issues/1547)) ([0305da8](https://github.com/SAP/ui5-webcomponents/commit/0305da8)), closes [#1543](https://github.com/SAP/ui5-webcomponents/issues/1543)
* **ui5-responsive-popover:** add minimum sizes ([#1539](https://github.com/SAP/ui5-webcomponents/issues/1539)) ([c4ae309](https://github.com/SAP/ui5-webcomponents/commit/c4ae309))
* **ui5-responsive-popover:** implement default close button ([#1501](https://github.com/SAP/ui5-webcomponents/issues/1501)) ([c6868af](https://github.com/SAP/ui5-webcomponents/commit/c6868af))
* **ui5-segmentedbutton:** button can no longer be clicked when disabled ([#1393](https://github.com/SAP/ui5-webcomponents/issues/1393)) ([576d769](https://github.com/SAP/ui5-webcomponents/commit/576d769))
* **ui5-segmentedbutton:** import ui5-togglebutton by default ([#1549](https://github.com/SAP/ui5-webcomponents/issues/1549)) ([bccf03b](https://github.com/SAP/ui5-webcomponents/commit/bccf03b))
* **ui5-select:** prevent scrolling on Space ([#1418](https://github.com/SAP/ui5-webcomponents/issues/1418)) ([fb500fc](https://github.com/SAP/ui5-webcomponents/commit/fb500fc))
* **ui5-shellbar:** check for profile correctly ([#1438](https://github.com/SAP/ui5-webcomponents/issues/1438)) ([a4f502b](https://github.com/SAP/ui5-webcomponents/commit/a4f502b))
* **ui5-shellbar:** do not duplicate popover menu items ([#1456](https://github.com/SAP/ui5-webcomponents/issues/1456)) ([ae20272](https://github.com/SAP/ui5-webcomponents/commit/ae20272))
* **ui5-shellbar:** enable items keyboard handling ([#1473](https://github.com/SAP/ui5-webcomponents/issues/1473)) ([185851a](https://github.com/SAP/ui5-webcomponents/commit/185851a))
* **ui5-shellbar:** fix menuItems cloning ([#1457](https://github.com/SAP/ui5-webcomponents/issues/1457)) ([f4d2547](https://github.com/SAP/ui5-webcomponents/commit/f4d2547))
* **ui5-tabcontainer:** clicking a tab now always works ([#1567](https://github.com/SAP/ui5-webcomponents/issues/1567)) ([dc60609](https://github.com/SAP/ui5-webcomponents/commit/dc60609))
* **ui5-textarea:** stop showing valueStateMsg in value-state="None" ([#1568](https://github.com/SAP/ui5-webcomponents/issues/1568)) ([832c34e](https://github.com/SAP/ui5-webcomponents/commit/832c34e))
* **ui5-timepicker:** fix AM/PM selection ([#1569](https://github.com/SAP/ui5-webcomponents/issues/1569)) ([ad923a2](https://github.com/SAP/ui5-webcomponents/commit/ad923a2))
* **ui5-timepicker:** prevent setting valueState="Error" on empty value ([5a3d1b1](https://github.com/SAP/ui5-webcomponents/commit/5a3d1b1))
* **ui5-upload-collection:** ensure event.dataTransfer.types is array ([#1433](https://github.com/SAP/ui5-webcomponents/issues/1433)) ([28cc988](https://github.com/SAP/ui5-webcomponents/commit/28cc988))
* **framework:** escape quotes in translation texts ([#1511](https://github.com/SAP/ui5-webcomponents/issues/1511)) ([ee7f300](https://github.com/SAP/ui5-webcomponents/commit/ee7f300))
* **framework:** allow the creation of components with static area content only ([#1450](https://github.com/SAP/ui5-webcomponents/issues/1450)) ([b0505ce](https://github.com/SAP/ui5-webcomponents/commit/b0505ce))
* **framework:** CSS Vars in Static Styles work on IE11 ([#1440](https://github.com/SAP/ui5-webcomponents/issues/1440)) ([b8ae60e](https://github.com/SAP/ui5-webcomponents/commit/b8ae60e))
* **framework:** reliably re-render lists of DOM nodes ([#1519](https://github.com/SAP/ui5-webcomponents/issues/1519)) ([9edb5de](https://github.com/SAP/ui5-webcomponents/commit/9edb5de))
* **framework:** rendering is no longer delayed  ([#1552](https://github.com/SAP/ui5-webcomponents/issues/1552)) ([c26e8aa](https://github.com/SAP/ui5-webcomponents/commit/c26e8aa))
* **scroll enablement:** fix scrolling issue on scroll & mobile ([#1557](https://github.com/SAP/ui5-webcomponents/issues/1557)) ([e79482a](https://github.com/SAP/ui5-webcomponents/commit/e79482a))
* **scroll enablement:** fix scrolling on android devices ([#1491](https://github.com/SAP/ui5-webcomponents/issues/1491)) ([df19ede](https://github.com/SAP/ui5-webcomponents/commit/df19ede))





# [1.0.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2020-03-27)


### Features

* **ui5-avatar:** introduce new component ([#1135](https://github.com/SAP/ui5-webcomponents/issues/1135)) ([b1c8747](https://github.com/SAP/ui5-webcomponents/commit/b1c8747)):new:

* **ui5-combobox:** introduce new component ([#1123](https://github.com/SAP/ui5-webcomponents/issues/1123)) ([ca2fa23](https://github.com/SAP/ui5-webcomponents/commit/ca2fa23)):new:

* **ui5-carousel:** introduce new component ([#1159](https://github.com/SAP/ui5-webcomponents/issues/1159)) ([5b84d85](https://github.com/SAP/ui5-webcomponents/commit/5b84d85)):new:

* **ui5-file-uploader:** introduce new component ([#1184](https://github.com/SAP/ui5-webcomponents/issues/1184)) ([e628dbd](https://github.com/SAP/ui5-webcomponents/commit/e628dbd)):new:

* **ui5-segmentedbutton:** introduce new component ([#1164](https://github.com/SAP/ui5-webcomponents/issues/1164)) ([931fbe0](https://github.com/SAP/ui5-webcomponents/commit/931fbe0)):new:

* **ui5-timepicker:** implement new component ([#1172](https://github.com/SAP/ui5-webcomponents/issues/1172)) ([56e39bc](https://github.com/SAP/ui5-webcomponents/commit/56e39bc)):new:

* **ui5-toast:** introduce new component ([#1014](https://github.com/SAP/ui5-webcomponents/issues/1014)) ([48400cd](https://github.com/SAP/ui5-webcomponents/commit/48400cd)):new:

* **ui5-responsive-popover:** introduce new component ([#1014](https://github.com/SAP/ui5-webcomponents/issues/1144)) ([48400cd](https://github.com/SAP/ui5-webcomponents/commit/d7b117932cebab73e21365f222510034907f652e)):new:

* **ui5-cb-item:** introduce new component to serve as item of "ui5-combobox" ([#1254](https://github.com/SAP/ui5-webcomponents/issues/1254)) ([861a19b](https://github.com/SAP/ui5-webcomponents/commit/861a19b)):new:

* **ui5-mcb-item:** introduce new component to serve as item of "ui5-multi-combobox" ([#1254](https://github.com/SAP/ui5-webcomponents/issues/1254)) ([861a19b](https://github.com/SAP/ui5-webcomponents/commit/861a19b)):new:

* **ui5-suggestion-item:** introduce new component to serve as suggestion in "ui5-input" ([#1336](https://github.com/SAP/ui5-webcomponents/issues/1336)) ([786f4e9](https://github.com/SAP/ui5-webcomponents/commit/786f4e9)):new:

* **ui5-avatar:** add "initials", "imageFitType" and "backgroundColor" properties ([#1151](https://github.com/SAP/ui5-webcomponents/issues/1151)) ([5d27c7f](https://github.com/SAP/ui5-webcomponents/commit/5d27c7f))

* **ui5-datepicker:** add "minDate" and "maxDate" properties ([#1040](https://github.com/SAP/ui5-webcomponents/issues/1040)) ([35b2593](https://github.com/SAP/ui5-webcomponents/commit/35b2593))

* **ui5-dialog:** improve component accessibility ([#1288](https://github.com/SAP/ui5-webcomponents/issues/1288)) ([ef2886b](https://github.com/SAP/ui5-webcomponents/commit/ef2886b))

* **ui5-input, ui5-select, ui5-combobox, ui5-datepicker, ui5-multi-combobox:** open dialog on mobile ([#1144](https://github.com/SAP/ui5-webcomponents/issues/1144)) ([d7b1179](https://github.com/SAP/ui5-webcomponents/commit/d7b1179))

* **ui5-input:** add "valueStateMessage" slot ([#1297](https://github.com/SAP/ui5-webcomponents/issues/1297)) ([538a79a](https://github.com/SAP/ui5-webcomponents/commit/538a79a))

* **ui5-input:** add "Information" value state ([#1261](https://github.com/SAP/ui5-webcomponents/issues/1261)) ([77f7293](https://github.com/SAP/ui5-webcomponents/commit/77f7293))

* **ui5-li:** add "Detail" type ([#1323](https://github.com/SAP/ui5-webcomponents/issues/1323)) ([ac8f8ce](https://github.com/SAP/ui5-webcomponents/commit/ac8f8ce))

* **ui5-list:** add "infinite-scroll" capability ([#1220](https://github.com/SAP/ui5-webcomponents/issues/1220)) ([756b78b](https://github.com/SAP/ui5-webcomponents/commit/756b78b))

* **ui5-messagestrip:** remove "icon" property and introduce "icon" slot ([#1216](https://github.com/SAP/ui5-webcomponents/pull/1216)) ([7802ac1](https://github.com/SAP/ui5-webcomponents/commit/5d4e59437d41c49e3589632e7fa60cb807802ac1))

* **ui5-multi-combobox:** implement angular two-way data binding ([#1363](https://github.com/SAP/ui5-webcomponents/issues/1363)) ([33009db](https://github.com/SAP/ui5-webcomponents/commit/33009db))

* **ui5-radiobutton:** add "wrap" property ([#1006](https://github.com/SAP/ui5-webcomponents/issues/1006)) ([99dd6c4](https://github.com/SAP/ui5-webcomponents/commit/99dd6c4))

* **ui5-shellbar:** add "profile" slot ([#1222](https://github.com/SAP/ui5-webcomponents/issues/1222)) ([9dab18b](https://github.com/SAP/ui5-webcomponents/commit/9dab18b))

* **ui5-shellbar-item:** introduce "count" property ([#1221](https://github.com/SAP/ui5-webcomponents/issues/1221)) ([02ddd0d](https://github.com/SAP/ui5-webcomponents/commit/02ddd0d))

* **ui5-static-area-item:** implement lazy loading ([#1272](https://github.com/SAP/ui5-webcomponents/issues/1272)) ([1f76a71](https://github.com/SAP/ui5-webcomponents/commit/1f76a71))

* **ui5-tabcontainer:** add "tabLayout" property ([#1214](https://github.com/SAP/ui5-webcomponents/issues/1214)) ([e79dcc8](https://github.com/SAP/ui5-webcomponents/commit/e79dcc8))

* **ui5-table:** provide "rowClick" event ([#1186](https://github.com/SAP/ui5-webcomponents/issues/1186)) ([0ba6fdd](https://github.com/SAP/ui5-webcomponents/commit/0ba6fdd))

* **ui5-table:** introduce "popinChange" event ([#1166](https://github.com/SAP/ui5-webcomponents/issues/1166)) ([0979963](https://github.com/SAP/ui5-webcomponents/commit/0979963))

* **framework:** introduce "High Contrast White" theme ([#1215](https://github.com/SAP/ui5-webcomponents/issues/1215)) ([28ed69a](https://github.com/SAP/ui5-webcomponents/commit/28ed69a))

* **framework:** allow the registration of custom themes ([#1109](https://github.com/SAP/ui5-webcomponents/issues/1109)) ([6a69521](https://github.com/SAP/ui5-webcomponents/commit/6a69521))

* **framework:** fallback to Fiori 3 theme when non-existing theme is set ([#1039](https://github.com/SAP/ui5-webcomponents/issues/1039)) ([7f89c39](https://github.com/SAP/ui5-webcomponents/commit/29abb2a078b660b1e946f6311986a14df7f89c39))

* **framework:** create "getLocaleData" API ([#1269](https://github.com/SAP/ui5-webcomponents/issues/1269)) ([c9253a6](https://github.com/SAP/ui5-webcomponents/commit/c9253a6))

* **framework:** enable OpenUI5 integration ([#1138](https://github.com/SAP/ui5-webcomponents/issues/1138)) ([5527990](https://github.com/SAP/ui5-webcomponents/commit/5527990))

* **framework:** provide Web Components Polyfill as ES6 import ([#1322](https://github.com/SAP/ui5-webcomponents/issues/1322)) ([ddc19fa](https://github.com/SAP/ui5-webcomponents/commit/0c1e6764610f3a685ec225312344ddf07ddc19fa))

* **ItemNavigation:** add paging behaviour ([#1116](https://github.com/SAP/ui5-webcomponents/issues/1116)) ([1cb0832](https://github.com/SAP/ui5-webcomponents/commit/1cb0832))

* **ScrollEnablement:** enhance implementation to work on desktop ([#1374](https://github.com/SAP/ui5-webcomponents/issues/1374)) ([2567bea](https://github.com/SAP/ui5-webcomponents/commit/2567bea))

* **tools:** create init package script ([#1010](https://github.com/SAP/ui5-webcomponents/issues/1010)) ([d93ab87](https://github.com/SAP/ui5-webcomponents/commit/d93ab87))

* **tools:** generate JS docs with the create-ui5-script ([#987](https://github.com/SAP/ui5-webcomponents/issues/987)) ([f0f5ec5](https://github.com/SAP/ui5-webcomponents/commit/f0f5ec5))

### Bug Fixes

* **ui5-avatar:** remove "background-color" when no image set ([#1148](https://github.com/SAP/ui5-webcomponents/issues/1148)) ([2bd2204](https://github.com/SAP/ui5-webcomponents/commit/2bd2204))

* **ui5-avatar:** make styles attribute dependant ([#1360](https://github.com/SAP/ui5-webcomponents/issues/1360)) ([e2791b0](https://github.com/SAP/ui5-webcomponents/commit/e2791b0))

* **ui5-busyindicator:** adjust stylings to latest spec ([#1344](https://github.com/SAP/ui5-webcomponents/issues/1344)) ([0af6c3d](https://github.com/SAP/ui5-webcomponents/commit/0af6c3d))

* **ui5-busyindicator:** display dots with size=Large by default ([#1315](https://github.com/SAP/ui5-webcomponents/issues/1315)) ([743f0b3](https://github.com/SAP/ui5-webcomponents/commit/743f0b3))

* **ui5-busyindicator:** improve stylings ([#1350](https://github.com/SAP/ui5-webcomponents/issues/1350)) ([c3dd3f4](https://github.com/SAP/ui5-webcomponents/commit/c3dd3f4))

* **ui5-button:** prevent icon from shrinking ([#1258](https://github.com/SAP/ui5-webcomponents/issues/1258)) ([be943ba](https://github.com/SAP/ui5-webcomponents/commit/be943ba))

* **ui5-card:** fix content "box-sizing" ([#1165](https://github.com/SAP/ui5-webcomponents/issues/1165)) ([e463d23](https://github.com/SAP/ui5-webcomponents/commit/e463d23))

* **ui5-card:** update ACC support ([#1042](https://github.com/SAP/ui5-webcomponents/issues/1042)) ([3253555](https://github.com/SAP/ui5-webcomponents/commit/3253555))

* **ui5-carousel:** add missing icon imports ([#1365](https://github.com/SAP/ui5-webcomponents/issues/1365)) ([d6bb698](https://github.com/SAP/ui5-webcomponents/commit/d6bb698))

* **ui5-carousel:** add missing import ([#1321](https://github.com/SAP/ui5-webcomponents/issues/1321)) ([19445d1](https://github.com/SAP/ui5-webcomponents/commit/19445d1))

* **ui5-checkbox:** fix wrapping of a long word ([#1007](https://github.com/SAP/ui5-webcomponents/issues/1007)) ([2117ecc](https://github.com/SAP/ui5-webcomponents/commit/2117ecc))

* **ui5-combobox:** add busy indicator ([#1141](https://github.com/SAP/ui5-webcomponents/issues/1141)) ([e211227](https://github.com/SAP/ui5-webcomponents/commit/e211227))

* **ui5-datepicker:** fix calendar header width in IE ([#1205](https://github.com/SAP/ui5-webcomponents/issues/1205)) ([2d21ae0](https://github.com/SAP/ui5-webcomponents/commit/2d21ae0))

* **ui5-datepicker:** fix hover "bg-color" when readonly ([#1361](https://github.com/SAP/ui5-webcomponents/issues/1361)) ([1696cba](https://github.com/SAP/ui5-webcomponents/commit/1696cba))

* **ui5-daypicker:** show correct "today" date ([#1157](https://github.com/SAP/ui5-webcomponents/issues/1157)) ([6fb1dd6](https://github.com/SAP/ui5-webcomponents/commit/6fb1dd6))

* **ui5-dialog:** cycle focus within dialog ([#1213](https://github.com/SAP/ui5-webcomponents/issues/1213)) ([e899708](https://github.com/SAP/ui5-webcomponents/commit/e899708))

* **ui5-dialog:** provide "min-width" on desktop ([#1257](https://github.com/SAP/ui5-webcomponents/issues/1257)) ([05b208d](https://github.com/SAP/ui5-webcomponents/commit/05b208d))

* **ui5-dialog:** stretch content area of dialog [#920](https://github.com/SAP/ui5-webcomponents/issues/920) ([#1167](https://github.com/SAP/ui5-webcomponents/issues/1167)) ([894d457](https://github.com/SAP/ui5-webcomponents/commit/894d457))

* **ui5-dialog:** fix JS error when no header text set ([#1146](https://github.com/SAP/ui5-webcomponents/issues/1146)) ([44e631a](https://github.com/SAP/ui5-webcomponents/commit/44e631a))

* **ui5-icon:** remove promise rejection ([#1299](https://github.com/SAP/ui5-webcomponents/issues/1299)) ([902db58](https://github.com/SAP/ui5-webcomponents/commit/902db58))

* **ui5-icon:** remove unneccessary aria-label attribute ([#1284](https://github.com/SAP/ui5-webcomponents/issues/1284)) ([9f2e756](https://github.com/SAP/ui5-webcomponents/commit/9f2e756))

* **ui5-icon:** fix warning to show correct path ([#1140](https://github.com/SAP/ui5-webcomponents/issues/1140)) ([59c1e02](https://github.com/SAP/ui5-webcomponents/commit/59c1e02))

* **ui5-input:** fix "border-color" on hover ([#1154](https://github.com/SAP/ui5-webcomponents/issues/1154)) ([9393b50](https://github.com/SAP/ui5-webcomponents/commit/9393b50))

* **ui5-input:** fix JS error when keyboard handling is used ([#1301](https://github.com/SAP/ui5-webcomponents/issues/1301)) ([85f01d7](https://github.com/SAP/ui5-webcomponents/commit/85f01d7))

* **ui5-input:** fix JS error on mobile ([#1339](https://github.com/SAP/ui5-webcomponents/issues/1339)) ([c0ffbac](https://github.com/SAP/ui5-webcomponents/commit/c0ffbac))

* **ui5-label:** fix truncation when "show-colon" is set ([#1079](https://github.com/SAP/ui5-webcomponents/issues/1079)) ([9e84314](https://github.com/SAP/ui5-webcomponents/commit/9e84314))

* **ui5-li:** fix focus outline color when active ([#1143](https://github.com/SAP/ui5-webcomponents/issues/1143)) ([7c4ee77](https://github.com/SAP/ui5-webcomponents/commit/7c4ee77))

* **ui5-li:** prevent checkbox from shrinking ([#1142](https://github.com/SAP/ui5-webcomponents/issues/1142)) ([964dbc2](https://github.com/SAP/ui5-webcomponents/commit/964dbc2))

* **ui5-li:** fix active state on mobile ([#1169](https://github.com/SAP/ui5-webcomponents/issues/1169)) ([90223f8](https://github.com/SAP/ui5-webcomponents/commit/90223f8))|
* **ui5-link:** fix JS error when "href" is undefined ([#1373](https://github.com/SAP/ui5-webcomponents/issues/1373)) ([a7cf983](https://github.com/SAP/ui5-webcomponents/commit/a7cf983))

* **ui5-multi-cbx:** open correct popover from show more text ([#1371](https://github.com/SAP/ui5-webcomponents/issues/1371)) ([68cb73d](https://github.com/SAP/ui5-webcomponents/commit/68cb73d))

* **ui5-multi-cbx:** display token icon ([#1126](https://github.com/SAP/ui5-webcomponents/issues/1126)) ([59e5972](https://github.com/SAP/ui5-webcomponents/commit/59e5972))

* **ui5-multi-cbx:** remove horizontal scrollbar ([#1312](https://github.com/SAP/ui5-webcomponents/issues/1312)) ([05175c4](https://github.com/SAP/ui5-webcomponents/commit/05175c4))

* **ui5-popover:** sync "z-index" with all popups and dialogs ([#1209](https://github.com/SAP/ui5-webcomponents/issues/1209)) ([5f8ce93](https://github.com/SAP/ui5-webcomponents/commit/5f8ce93))

* **ui5-popover:** add header and footer to focus cycling ([#1298](https://github.com/SAP/ui5-webcomponents/issues/1298)) ([0e0344c](https://github.com/SAP/ui5-webcomponents/commit/0e0344c))

* **ui5-popover:** display API correctly ([#1064](https://github.com/SAP/ui5-webcomponents/issues/1064)) ([e1b5649](https://github.com/SAP/ui5-webcomponents/commit/e1b5649))

* **ui5-responsive-popover:** set "z-index" on phone ([#1303](https://github.com/SAP/ui5-webcomponents/issues/1303)) ([a38b605](https://github.com/SAP/ui5-webcomponents/commit/a38b605))

* **ui5-segmentedbutton:** adjust component size ([#1225](https://github.com/SAP/ui5-webcomponents/issues/1225)) ([1a8f8b0](https://github.com/SAP/ui5-webcomponents/commit/1a8f8b0))

* **ui5-select:** fix component baseline alignment ([#1075](https://github.com/SAP/ui5-webcomponents/issues/1075)) ([37b7891](https://github.com/SAP/ui5-webcomponents/commit/37b7891))

* **ui5-select:** prevent selection from cycling ([#1066](https://github.com/SAP/ui5-webcomponents/issues/1066)) ([d46be1f](https://github.com/SAP/ui5-webcomponents/commit/d46be1f))

* **ui5-shellbar:** change path in imports for playground ([#1008](https://github.com/SAP/ui5-webcomponents/issues/1008)) ([bfe36dd](https://github.com/SAP/ui5-webcomponents/commit/bfe36dd))

* **ui5-shellbar:** create CSS vars for active text color for "Belize" and "HCB" ([#1107](https://github.com/SAP/ui5-webcomponents/issues/1107)) ([06bc58b](https://github.com/SAP/ui5-webcomponents/commit/06bc58b))

* **ui5-shellbar:** fire "logoClick" on small size ([#1192](https://github.com/SAP/ui5-webcomponents/issues/1192)) ([b84b9d8](https://github.com/SAP/ui5-webcomponents/commit/b84b9d8))

* **ui5-shellbar:** fix search field behavior ([#1264](https://github.com/SAP/ui5-webcomponents/issues/1264)) ([2beb1c5](https://github.com/SAP/ui5-webcomponents/commit/2beb1c5))

* **ui5-shellbar:** provide correct target ref when item is in overflow popover ([#1334](https://github.com/SAP/ui5-webcomponents/issues/1334)) ([7636bb7](https://github.com/SAP/ui5-webcomponents/commit/7636bb7))

* **ui5-tabcontainer:** apply overflow items styles ([#1178](https://github.com/SAP/ui5-webcomponents/issues/1178)) ([63ca721](https://github.com/SAP/ui5-webcomponents/commit/63ca721))

* **ui5-tabcontainer:** fix tab sizes on compact ([#1364](https://github.com/SAP/ui5-webcomponents/issues/1364)) ([6a4738e](https://github.com/SAP/ui5-webcomponents/commit/6a4738e))

* **ui5-table-row:** fix first and "nodata" rows visual ([#1156](https://github.com/SAP/ui5-webcomponents/issues/1156)) ([991e546](https://github.com/SAP/ui5-webcomponents/commit/991e546))

* **ui5-tabcontainer:** fix tab content overflow and height calculation ([#1056](https://github.com/SAP/ui5-webcomponents/issues/1056)) ([6b65fa4](https://github.com/SAP/ui5-webcomponents/commit/6b65fa4))

* **ui5-table:** optimize non "popin" table rendering ([#1229](https://github.com/SAP/ui5-webcomponents/issues/1229)) ([872dcad](https://github.com/SAP/ui5-webcomponents/commit/872dcad))

* **ui5-textarea:** apply "border" and "bg-color" to native textarea ([#1250](https://github.com/SAP/ui5-webcomponents/issues/1250)) ([a804e30](https://github.com/SAP/ui5-webcomponents/commit/a804e30))

* **ui5-textarea:** fix "bg-color" in IE ([#1210](https://github.com/SAP/ui5-webcomponents/issues/1210)) ([c047da7](https://github.com/SAP/ui5-webcomponents/commit/c047da7))

* **ui5-timepicker:** fix JS Error and improve user XP([#1362](https://github.com/SAP/ui5-webcomponents/issues/1362)) ([f02477b](https://github.com/SAP/ui5-webcomponents/commit/f02477b))

* **ui5-toast:** prevent infinite loop ([#1320](https://github.com/SAP/ui5-webcomponents/issues/1320)) ([1c2a94a](https://github.com/SAP/ui5-webcomponents/commit/1c2a94a))

* **ui5-toast:** keep toast open when hovered ([#1294](https://github.com/SAP/ui5-webcomponents/issues/1294)) ([2f4fd6e](https://github.com/SAP/ui5-webcomponents/commit/2f4fd6e)), closes [#1292](https://github.com/SAP/ui5-webcomponents/issues/1292)

* **all components:** add missing icons imports ([#1319](https://github.com/SAP/ui5-webcomponents/issues/1319)) ([6bebdb5](https://github.com/SAP/ui5-webcomponents/commit/6bebdb5))

* **framework:** add OpenUI5 CLDR support ([#1207](https://github.com/SAP/ui5-webcomponents/issues/1207)) ([6bf40a2](https://github.com/SAP/ui5-webcomponents/commit/6bf40a2))

* **framework:** fix Firefox 74 shadow root bug ([#1347](https://github.com/SAP/ui5-webcomponents/issues/1347)) ([7cc67a7](https://github.com/SAP/ui5-webcomponents/commit/7cc67a7))

* **framework:** identify StaticArea and StaticAreaElement as UI5Element ([#1168](https://github.com/SAP/ui5-webcomponents/issues/1168)) ([28f827a](https://github.com/SAP/ui5-webcomponents/commit/28f827a))

* **framework:** prevent infinite loop when fetching i18n bundles ([#1333](https://github.com/SAP/ui5-webcomponents/issues/1333)) ([f605566](https://github.com/SAP/ui5-webcomponents/commit/f605566))

* **framework:** fix travis build ([#1212](https://github.com/SAP/ui5-webcomponents/issues/1212)) ([7f30cf3](https://github.com/SAP/ui5-webcomponents/commit/7f30cf3))

* **framework:** prevent error when deleting static area item ([#1335](https://github.com/SAP/ui5-webcomponents/issues/1335)) ([5a99536](https://github.com/SAP/ui5-webcomponents/commit/5a99536))

* **framework:** apply size "compact" for StaticArea items ([#1204](https://github.com/SAP/ui5-webcomponents/issues/1204)) ([c411774](https://github.com/SAP/ui5-webcomponents/commit/c411774))

* **framework:** merge components metadata properly ([#1092](https://github.com/SAP/ui5-webcomponents/issues/1092)) ([6a29872](https://github.com/SAP/ui5-webcomponents/commit/6a29872))

* **framework:** create the font face style tag only once ([#1090](https://github.com/SAP/ui5-webcomponents/issues/1090)) ([1a09e13](https://github.com/SAP/ui5-webcomponents/commit/1a09e13))

* **framework:** propagate compact size when ui5-content-density-compact class is set ([#1136](https://github.com/SAP/ui5-webcomponents/issues/1136)) ([2db62ba](https://github.com/SAP/ui5-webcomponents/commit/2db62ba))

* **tools:** The init package script now correctly has HCW ([#1293](https://github.com/SAP/ui5-webcomponents/issues/1293)) ([0c408d2](https://github.com/SAP/ui5-webcomponents/commit/0c408d2))

* **playground:** deploy all test pages to gh pages ([#1034](https://github.com/SAP/ui5-webcomponents/issues/1034)) ([ddb8fc2](https://github.com/SAP/ui5-webcomponents/commit/ddb8fc2))


### Code Refactoring

* **ui5-card:** update API and correct visual ([#1145](https://github.com/SAP/ui5-webcomponents/issues/1145)) ([6733de9](https://github.com/SAP/ui5-webcomponents/commit/6733de9))

* **ui5-tabcontainer:** provide "tabIndex" in "tabSelect" event ([d8d4fdb](https://github.com/SAP/ui5-webcomponents/commit/d8d4fdb))

* **ui5-textarea:** rename property "maxLength" to "maxlength" ([#1068](https://github.com/SAP/ui5-webcomponents/issues/1068)) ([b2ee6a3](https://github.com/SAP/ui5-webcomponents/commit/b2ee6a3))

* **project:** create "localization" package and deprecate "core" and "utils" packages ([#1296](https://github.com/SAP/ui5-webcomponents/pull/1296)) ([b5e1337](https://github.com/SAP/ui5-webcomponents/commit/b5e1337))


### BREAKING CHANGES

* **ui5-busyindicator:** change default `size` of busy dots to `Medium`.

* **ui5-icon:** `src` property is removed in favor of `name`.

* **ui5-messagestrip:** replace `icon` property with `icon` slot to allow setting arbitrary content by the user.

* **ui5-mcb-item:** - `ui5-multi-combobox` no longer accepts `ui5-li` for items, use `ui5-cb-item` instead.

* **ui5-shellbar:** `profile property` is removed in favour of `profile slot`.

* **ui5-tabcontainer:** `itemSelect` event is renamed to `tabSelect` and the `item` event parameter is renamed to `tab`.

* **ui5-card:** the property `subtitle` has been renamed to `subheading`.

* **ui5-textarea:** the property `maxLength` has been renamed to `maxlength`.
Also, the attribute name is changed from max-length to maxlength.

* **framework:** configuring of compact size is removed, use the `ui5-content-density-compact` CSS class to apply compact size.

* **project:** create "localization" package and deprecate "core" and "utils" packages. The "localization" provides date/time and CLDR functionality


# [1.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2019-12-02)

##  [Migration guide](https://github.com/SAP/ui5-webcomponents/blob/master/docs/Migration-guides.md) from v1.0.0-rc.4 to v1.0.0-rc.5
The current release includes several new npm packages, such as `@ui5/webcomponents-fiori` and `@ui5/webcomponents-icons`.
To make the transition from v1.0.0-rc.4 to v1.0.0-rc.5 smoother, we prepared this [migration guide](https://github.com/SAP/ui5-webcomponents/blob/master/docs/Migration-guides.md).

### Bug Fixes

* **ui5-button:** prevents setting 0 height to icons in IE ([#902](https://github.com/SAP/ui5-webcomponents/issues/902)) ([20511c6](https://github.com/SAP/ui5-webcomponents/commit/20511c6))
* **ui5-checkbox:** fix layouting in IE ([#926](https://github.com/SAP/ui5-webcomponents/issues/926)) ([ffdc271](https://github.com/SAP/ui5-webcomponents/commit/ffdc271))
* **ui5-checkbox:** fix truncation in compactSize ([#998](https://github.com/SAP/ui5-webcomponents/issues/998)) ([3cdcede](https://github.com/SAP/ui5-webcomponents/commit/3cdcede))
* **ui5-datepicker:** fix hover effect ([#999](https://github.com/SAP/ui5-webcomponents/issues/999)) ([44d6c27](https://github.com/SAP/ui5-webcomponents/commit/44d6c27))
* **ui5-datepicker:** enable setting an empty placeholder ([#997](https://github.com/SAP/ui5-webcomponents/issues/997)) ([3eca602](https://github.com/SAP/ui5-webcomponents/commit/3eca602))
* **ui5-input:** correct ACC implementation ([#846](https://github.com/SAP/ui5-webcomponents/issues/846)) ([7d547ec](https://github.com/SAP/ui5-webcomponents/commit/7d547ec))
* **ui5-input:** fix input pushed downward ([#891](https://github.com/SAP/ui5-webcomponents/issues/891)) ([bda9714](https://github.com/SAP/ui5-webcomponents/commit/bda9714))
* **ui5-multi-combobox:** close popover & empty value on selection ([#832](https://github.com/SAP/ui5-webcomponents/issues/832)) ([1b3e40d](https://github.com/SAP/ui5-webcomponents/commit/1b3e40d))
* **ui5-popover:** restrict max content height when overflowing the screen ([#908](https://github.com/SAP/ui5-webcomponents/issues/908)) ([6671793](https://github.com/SAP/ui5-webcomponents/commit/6671793))
* **ui5-select:** remove unsupported method in IE ([#919](https://github.com/SAP/ui5-webcomponents/issues/919)) ([f1bceea](https://github.com/SAP/ui5-webcomponents/commit/f1bceea))
* **ui5-tabcontainer:** adjust tabs to take 100% of TC height ([#895](https://github.com/SAP/ui5-webcomponents/issues/895)) ([6fcf259](https://github.com/SAP/ui5-webcomponents/commit/6fcf259))
* **ui5-tabcontainer:** fix overflow items default semantic color ([#989](https://github.com/SAP/ui5-webcomponents/issues/989)) ([a003189](https://github.com/SAP/ui5-webcomponents/commit/a003189)), closes [#988](https://github.com/SAP/ui5-webcomponents/issues/988)
* **ui5-tabcontainer:** fix overflow items appearance and selection  ([#988](https://github.com/SAP/ui5-webcomponents/issues/988)) ([8cd2a8b](https://github.com/SAP/ui5-webcomponents/commit/8cd2a8b))
* **ui5-list:** prevent item navigaion with Left/Right keys([#985](https://github.com/SAP/ui5-webcomponents/issues/985)) ([3d46e2d](https://github.com/SAP/ui5-webcomponents/commit/3d46e2d))
* **ui5-table:** pressing SPACE works for HTML elements inside ui5-table ([#964](https://github.com/SAP/ui5-webcomponents/issues/964)) ([2384236](https://github.com/SAP/ui5-webcomponents/commit/2384236))
* **ui5-table:** fix JS error when there are less cells than columns ([#841](https://github.com/SAP/ui5-webcomponents/issues/841)) ([fd3b690](https://github.com/SAP/ui5-webcomponents/commit/fd3b690))
* **ui5-table:** fix row navigation and focus handling ([#876](https://github.com/SAP/ui5-webcomponents/issues/876)) ([f69f42c](https://github.com/SAP/ui5-webcomponents/commit/f69f42c))
* **ItemNavigation:** fix Item Navigation cycling ([#985](https://github.com/SAP/ui5-webcomponents/issues/985)) ([3d46e2d](https://github.com/SAP/ui5-webcomponents/commit/3d46e2d))
* **Framework:** order slots in state as in Light DOM ([#874](https://github.com/SAP/ui5-webcomponents/issues/874)) ([b8efea0](https://github.com/SAP/ui5-webcomponents/commit/b8efea0)), closes [#873](https://github.com/SAP/ui5-webcomponents/issues/873)
* **Framework:** skip waiting for polyfill in case already loaded ([#851](https://github.com/SAP/ui5-webcomponents/issues/851)) ([d5e19f6](https://github.com/SAP/ui5-webcomponents/commit/d5e19f6))
* **Framework:** trigger DOM mutation observer independent of insertion order ([#847](https://github.com/SAP/ui5-webcomponents/issues/847)) ([d7d96ec](https://github.com/SAP/ui5-webcomponents/commit/d7d96ec)), closes [#839](https://github.com/SAP/ui5-webcomponents/issues/839)
* **JS Doc** enable release candidates versions to be displayed as since tags ([#983](https://github.com/SAP/ui5-webcomponents/issues/983)) ([3051d76](https://github.com/SAP/ui5-webcomponents/commit/3051d76))

### Features
* **ui5-product-switch:** introduce new component within @ui5/webcomponents-fiori package([#971](https://github.com/SAP/ui5-webcomponents/pull/971)) ([4646fcd](https://github.com/SAP/ui5-webcomponents/commit/70d44b1ebf4b47c7e99ebf96feb19e5c04646fcd))
* **ui5-input:** introduce maxlength property ([#976](https://github.com/SAP/ui5-webcomponents/issues/976)) ([c149f5f](https://github.com/SAP/ui5-webcomponents/commit/c149f5f))
* **ui5-label:** introduce showColon property ([#965](https://github.com/SAP/ui5-webcomponents/issues/965)) ([ae95a8d](https://github.com/SAP/ui5-webcomponents/commit/ae95a8d))
* **ui5-multicombobox:** implement ACC support ([#937](https://github.com/SAP/ui5-webcomponents/issues/937)) ([0a44a92](https://github.com/SAP/ui5-webcomponents/commit/0a44a92))
* **ui5-multicombobox:** introduce open property and openChange event ([#930](https://github.com/SAP/ui5-webcomponents/issues/930)) ([c0b51f5](https://github.com/SAP/ui5-webcomponents/commit/c0b51f5))
* **ui5-panel:** improve accessibility ([#864](https://github.com/SAP/ui5-webcomponents/issues/864)) ([b133468](https://github.com/SAP/ui5-webcomponents/commit/b133468))
* **ui5-textarea:** implement input event ([#543](https://github.com/SAP/ui5-webcomponents/issues/543)) ([7c5647e](https://github.com/SAP/ui5-webcomponents/commit/7c5647e))
* **Documentation:** introduce new playground app ([#751](https://github.com/SAP/ui5-webcomponents/pull/751)) ([fdcddaa](https://github.com/SAP/ui5-webcomponents/commit/fdcddaa241cd14b182010f7815a26833655f95c4))
* **Configuration:** introduce animationMode configuration ([#905](https://github.com/SAP/ui5-webcomponents/issues/905)) ([c90e3b0](https://github.com/SAP/ui5-webcomponents/commit/c90e3b0))
* **Framework:** render SVG content with lit svg` ([#904](https://github.com/SAP/ui5-webcomponents/issues/904)) ([59fead4](https://github.com/SAP/ui5-webcomponents/commit/59fead4))
* **Framework:** introduce navigationMode property ([#910](https://github.com/SAP/ui5-webcomponents/issues/910)) ([9c43533](https://github.com/SAP/ui5-webcomponents/commit/9c43533))

### Code Refactoring
* **ui5-button:** subscribe event handlers via HBS template
* **ui5-shellbar:** move component to @ui5/webcomponents-fiori package ([#887](https://github.com/SAP/ui5-webcomponents/pull/887)) ([06f1770](https://github.com/SAP/ui5-webcomponents/commit/17c25ff123436c1f6e11513055b33977b06f1770))
* **ui5-card:** replace "avatar" property with "avatar" slot ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))
* **ui5-icon:** change "src" property to "name" ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))
* **ui5-shellbar:** rename "icon" slot to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/issues/901)) ([5ca3280](https://github.com/SAP/ui5-webcomponents/commit/5ca3280))
* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset ([#904](https://github.com/SAP/ui5-webcomponents/pull/904)) ([c25e0a7](https://github.com/SAP/ui5-webcomponents/commit/59fead49d7a3222d55270584bb048190dc25e0a7))
* **ui5-shellbar:** optimize animated co-pilot SVG size from 15kb to 8kb ([#960](https://github.com/SAP/ui5-webcomponents/pull/960)) ([42bd7cd](https://github.com/SAP/ui5-webcomponents/commit/66d8c62658648cfeb7392607e9b66548c42bd7cd))
* **ui5-shellbar-item:**  rename "src" property to "name" ([#928](https://github.com/SAP/ui5-webcomponents/pull/928)) ([8e060d1](https://github.com/SAP/ui5-webcomponents/commit/0489673610ce2fd0e96d0a3a1f4e0465d8e060d1))

### BREAKING CHANGES

* **icons:** move all individual icons to a new npm package called `@ui5/webcomponents-icons`.

You have to install the package 
```js
npm i @ui5/webcomponents-icons --save
```
The import statements should be changed

Before:
```js
@ui5/webcomponents/dist/icons/add.js
```

After:
```js
@ui5/webcomponents-icons/dist/icons/add.js
```
*Note:* The `ui5-icon` web component is not affected by this change, it is still in the `@ui5/webcomponents` package. Only the icons themselves (the icon assets) have been moved.

* **ui5-icon:** "src" property was renamed to "name".

The "name" poperty accepts icon name (such as "add") instead of icon src (such as "sap-icon://add").
Note: the src property will continue to work until the next release due to the impact of the change, but will produce a warning in the console.

* **ui5-shellbar:** move component to new `@ui5/webcomponents-fiori` package ([#887](https://github.com/SAP/ui5-webcomponents/pull/887)) ([06f1770](https://github.com/SAP/ui5-webcomponents/commit/17c25ff123436c1f6e11513055b33977b06f1770))

Now, you have to import the `<ui5-shellbar>` from the newly created package as follows:
```js
import @ui5/webcomponents-fiori/dist/ShellBar.js
```

* **ui5-shellbar:** rename "icon" slot to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/issues/901)) ([5ca3280](https://github.com/SAP/ui5-webcomponents/commit/5ca3280))

Now, the slot accepts a ui5-button, that would be overstyled to match ui5-shellbar viusal design.

* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset ([#904](https://github.com/SAP/ui5-webcomponents/pull/904)) ([c25e0a7](https://github.com/SAP/ui5-webcomponents/commit/59fead49d7a3222d55270584bb048190dc25e0a7))

Now, to get the coPilot animated version, you have to import the following module:
```js
import @ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js`
```

* **ui5-shellbar-item:** "src" property renamed to "name" ([#928](https://github.com/SAP/ui5-webcomponents/pull/928)) ([8e060d1](https://github.com/SAP/ui5-webcomponents/commit/0489673610ce2fd0e96d0a3a1f4e0465d8e060d1))

The "src" property has been renamed to icon and it accepts icon name (such as "add") instead of icon src (such as "sap-icon://add")

* **ui5-card:** replace "avatar" property with "avatar" slot ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))

The "avatar" property has been removed, use the "avatar" slot instead - you can pass an icon(`<ui5-icon>`) or an image(`<img/>`).

Before:
```html
<ui5-card avatar="sap-icon://add"></ui5-card>
```

After:
```html
<ui5-card><ui5-icon name="add" slot="avatar"></ui5-icon></ui5-card>`
```
and respectively:
```html
<ui5-card avatar="http://url/to/my/image"></ui5-card>`
```
becomes:
```html
<ui5-card><img src="http://url/to/my/image" slot="avatar"/></ui5-card>`
```



# [1.0.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2019-10-11)


### Bug Fixes

* **ui5-button:** apply correct "font-family: 72" ([#825](https://github.com/SAP/ui5-webcomponents/issues/825)) ([21ec559](https://github.com/SAP/ui5-webcomponents/commit/21ec559))
* **ui5-badge:** fix icon visual issue on IE ([#809](https://github.com/SAP/ui5-webcomponents/issues/809)) ([150a100](https://github.com/SAP/ui5-webcomponents/commit/150a100))

### Code Refactoring

* **framework:** stop icon fonts loading ([#827](https://github.com/SAP/ui5-webcomponents/pull/827))([21ec559](https://github.com/SAP/ui5-webcomponents/commit/21ec559))
* **framework:** add components' events info to UI5ElementMetadata([#833](https://github.com/SAP/ui5-webcomponents/issues/833))([68c30f4](https://github.com/SAP/ui5-webcomponents/pull/837/commits/68c30f4))


# [1.0.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2019-10-03)


### Bug Fixes

* **ui5-badge:** correct component sizing ([#733](https://github.com/SAP/ui5-webcomponents/issues/733)) ([f5a4798](https://github.com/SAP/ui5-webcomponents/commit/f5a4798))
* **ui5-badge:** fix icon size ([#729](https://github.com/SAP/ui5-webcomponents/issues/729)) ([f1e1343](https://github.com/SAP/ui5-webcomponents/commit/f1e1343))
* **ui5-busyindicator:** change z-index not to overlap popover or dialog ([#624](https://github.com/SAP/ui5-webcomponents/issues/624)) ([c91c811](https://github.com/SAP/ui5-webcomponents/commit/c91c811))
* **ui5-button:** align buttons with and without icons on same line ([#796](https://github.com/SAP/ui5-webcomponents/issues/796)) ([8420492](https://github.com/SAP/ui5-webcomponents/commit/8420492))
* **ui5-button:** fix Transparent button border in Fiori 3 & HCB ([#789](https://github.com/SAP/ui5-webcomponents/issues/789)) ([bc00f1f](https://github.com/SAP/ui5-webcomponents/commit/bc00f1f))
* **ui5-checkbox:** set default font-size to checkmark ([#618](https://github.com/SAP/ui5-webcomponents/issues/618)) ([d3a9197](https://github.com/SAP/ui5-webcomponents/commit/d3a9197))
* **ui5-datepicker:** date selection works on IE ([#623](https://github.com/SAP/ui5-webcomponents/issues/623)) ([5a0b7ad](https://github.com/SAP/ui5-webcomponents/commit/5a0b7ad))
* **ui5-datepicker:** icon from datepicker no longer flickers on IE ([#723](https://github.com/SAP/ui5-webcomponents/issues/723)) ([80c4f32](https://github.com/SAP/ui5-webcomponents/commit/80c4f32))
* **ui5-icon:** enable default icon size to be changed ([#629](https://github.com/SAP/ui5-webcomponents/issues/629)) ([a44cdc6](https://github.com/SAP/ui5-webcomponents/commit/a44cdc6))
* **ui5-icon:** icon no longer flickers on IE ([#722](https://github.com/SAP/ui5-webcomponents/issues/722)) ([964af67](https://github.com/SAP/ui5-webcomponents/commit/964af67))
* **ui5-input:** inputs now support placeholder on IE ([#781](https://github.com/SAP/ui5-webcomponents/issues/781)) ([559109d](https://github.com/SAP/ui5-webcomponents/commit/559109d))
* **ui5-input:** use translated text ([#783](https://github.com/SAP/ui5-webcomponents/issues/783)) ([1e9a4e6](https://github.com/SAP/ui5-webcomponents/commit/1e9a4e6))
* **ui5-link:** fix link hover effect ([#803](https://github.com/SAP/ui5-webcomponents/issues/803)) ([46bfaf1](https://github.com/SAP/ui5-webcomponents/commit/46bfaf1))
* **ui5-multi-combobox:** overflow tokens correctly when not enough space ([#714](https://github.com/SAP/ui5-webcomponents/issues/714)) ([c67fe0a](https://github.com/SAP/ui5-webcomponents/commit/c67fe0a))
* **ui5-multi-combobox:** enable closing on icon click ([#719](https://github.com/SAP/ui5-webcomponents/issues/719)) ([8d98def](https://github.com/SAP/ui5-webcomponents/commit/8d98def))
* **ui5-switch:** don't mirror checkmark icon in RTL ([#742](https://github.com/SAP/ui5-webcomponents/issues/742)) ([ad2609d](https://github.com/SAP/ui5-webcomponents/commit/ad2609d))
* **ui5-tabcontainer:** fix selected tab text color in HCB ([#805](https://github.com/SAP/ui5-webcomponents/issues/805)) ([3ccf80e](https://github.com/SAP/ui5-webcomponents/commit/3ccf80e))
* **ui5-table:** call resize handler on initial rendering ([#625](https://github.com/SAP/ui5-webcomponents/issues/625)) ([c20c85c](https://github.com/SAP/ui5-webcomponents/commit/c20c85c))
* **ui5-token:** correct visual in RTL/Compact ([#804](https://github.com/SAP/ui5-webcomponents/issues/804)) ([71c9caa](https://github.com/SAP/ui5-webcomponents/commit/71c9caa))
* **ui5-tokenizer:** use i18nbundle instead of resource bundle ([#757](https://github.com/SAP/ui5-webcomponents/issues/757)) ([d6668bc](https://github.com/SAP/ui5-webcomponents/commit/d6668bc))
* **UI5Element:** parent elements properly await for children upgrade ([#645](https://github.com/SAP/ui5-webcomponents/issues/645)) ([0e976f8](https://github.com/SAP/ui5-webcomponents/commit/0e976f8))
* **CSS Transform:** host selector not removed when there is trailing whitespace ([#780](https://github.com/SAP/ui5-webcomponents/issues/780)) ([b5d8fde](https://github.com/SAP/ui5-webcomponents/commit/b5d8fde))
* **doc:** fix typos in docs ([#680](https://github.com/SAP/ui5-webcomponents/issues/680)) ([f884643](https://github.com/SAP/ui5-webcomponents/commit/f884643))
* **DOMEventHandler:** does not crash in edge cases ([#774](https://github.com/SAP/ui5-webcomponents/issues/774)) ([2576883](https://github.com/SAP/ui5-webcomponents/commit/2576883))
* **FocusHelper:** handles SVG's focus method on IE ([#721](https://github.com/SAP/ui5-webcomponents/issues/721)) ([52517c4](https://github.com/SAP/ui5-webcomponents/commit/52517c4))
* **InputFormSupport:** enable form support for nested input elements ([#656](https://github.com/SAP/ui5-webcomponents/issues/656)) ([57adb04](https://github.com/SAP/ui5-webcomponents/commit/57adb04))


### Code Refactoring

* **ui5-datepicker:** hide week number in Islamic, Buddhist and Japanese calendars ([#806](https://github.com/SAP/ui5-webcomponents/issues/806)) ([a5ccb80](https://github.com/SAP/ui5-webcomponents/commit/a5ccb80))
* **ui5-li:** remove background CSS Variable ([#802](https://github.com/SAP/ui5-webcomponents/issues/802)) ([9bf57ab](https://github.com/SAP/ui5-webcomponents/commit/9bf57ab))
* **ui5-multi-combobox:** replace validate-input with allow-custom-values ([#749](https://github.com/SAP/ui5-webcomponents/issues/749)) ([f501df4](https://github.com/SAP/ui5-webcomponents/commit/f501df4))
* **ui5-panel:** update toggle button visual design to Fiori 3 ([#794](https://github.com/SAP/ui5-webcomponents/pull/794))
* **ui5-popover:** improve layouting, styling and positioning ([#779](https://github.com/SAP/ui5-webcomponents/issues/779)) ([1d377ba](https://github.com/SAP/ui5-webcomponents/commit/1d377ba))
* **ui5-table:** component is now supported on IE 11 ([#704](https://github.com/SAP/ui5-webcomponents/pull/704))
* **ui5-table:** width property of column is removed ([#784](https://github.com/SAP/ui5-webcomponents/issues/784)) ([dedb51e](https://github.com/SAP/ui5-webcomponents/commit/dedb51e))
* **ui5-input,ui5-select,ui5-multicombobox,ui5-datepicker:** make the components share same CSS for input field styling ([#793](https://github.com/SAP/ui5-webcomponents/pull/793))
* **All components CSS:** Styles improvements and clean up
[#632](https://github.com/SAP/ui5-webcomponents/pull/632)
[#646](https://github.com/SAP/ui5-webcomponents/pull/646)
[#647](https://github.com/SAP/ui5-webcomponents/pull/647)
[#648](https://github.com/SAP/ui5-webcomponents/pull/648)
[#650](https://github.com/SAP/ui5-webcomponents/pull/650)
[#657](https://github.com/SAP/ui5-webcomponents/pull/657)
[#658](https://github.com/SAP/ui5-webcomponents/pull/658)
[#659](https://github.com/SAP/ui5-webcomponents/pull/659)
[#660](https://github.com/SAP/ui5-webcomponents/pull/660)
[#662](https://github.com/SAP/ui5-webcomponents/pull/662)
[#664](https://github.com/SAP/ui5-webcomponents/pull/664)
[#667](https://github.com/SAP/ui5-webcomponents/pull/667)
[#669](https://github.com/SAP/ui5-webcomponents/pull/669)
[#670](https://github.com/SAP/ui5-webcomponents/pull/670)
[#671](https://github.com/SAP/ui5-webcomponents/pull/671)
[#673](https://github.com/SAP/ui5-webcomponents/pull/673)
[#674](https://github.com/SAP/ui5-webcomponents/pull/674)
[#678](https://github.com/SAP/ui5-webcomponents/pull/678)
[#684](https://github.com/SAP/ui5-webcomponents/pull/684)
[#686](https://github.com/SAP/ui5-webcomponents/pull/686)
[#687](https://github.com/SAP/ui5-webcomponents/pull/687)
[#688](https://github.com/SAP/ui5-webcomponents/pull/688)
[#700](https://github.com/SAP/ui5-webcomponents/pull/700)
* **All Components:** adapt CSS for IE 11 and remove all IE11 duplicate CSS ([#704](https://github.com/SAP/ui5-webcomponents/pull/704))
* **i18n:** make i18n more efficient ([#720](https://github.com/SAP/ui5-webcomponents/pull/720))
* **i18n, Theming, CLDR:** unify assets handling ([#744](https://github.com/SAP/ui5-webcomponents/pull/744))
* **Configuration:** make configuration initial only ([#638](https://github.com/SAP/ui5-webcomponents/issues/638)) ([86ad25b](https://github.com/SAP/ui5-webcomponents/commit/86ad25b)))


### Features

* **ui5-datepicker:** adds public getter dateValue ([#726](https://github.com/SAP/ui5-webcomponents/issues/726)) ([1ba3e25](https://github.com/SAP/ui5-webcomponents/commit/1ba3e25))
* **ui5-datepicker:** implement ACC support ([#763](https://github.com/SAP/ui5-webcomponents/issues/763)) ([188627e](https://github.com/SAP/ui5-webcomponents/commit/188627e))
* **ui5-icon:** accessibility implementation ([#709](https://github.com/SAP/ui5-webcomponents/issues/709)) ([1357c16](https://github.com/SAP/ui5-webcomponents/commit/1357c16))
* **ui5-icon:** use SVG icons instead of icon font ([#649](https://github.com/SAP/ui5-webcomponents/issues/649)) ([b6352d8](https://github.com/SAP/ui5-webcomponents/commit/b6352d8))
* **ui5-list:** added new param for selectionChange event ([#798](https://github.com/SAP/ui5-webcomponents/issues/798)) ([28c4181](https://github.com/SAP/ui5-webcomponents/commit/28c4181))
* **ui5-select:** adds readonly property selectedOption ([#718](https://github.com/SAP/ui5-webcomponents/issues/718)) ([5d9a1ac](https://github.com/SAP/ui5-webcomponents/commit/5d9a1ac))
* **ui5-switch:** accessibility implementation ([#692](https://github.com/SAP/ui5-webcomponents/issues/692)) ([7304a31](https://github.com/SAP/ui5-webcomponents/commit/7304a31))
* **ui5-tabcontainer:** update ACC of header and content ([#756](https://github.com/SAP/ui5-webcomponents/issues/756)) ([8550365](https://github.com/SAP/ui5-webcomponents/commit/8550365))
* **ui5-link, ui5-textarea, ui5-input, ui5-checkbox, ui5-button, ui5-badge, ui5-busyindicator, ui5-messagestrip:** Improve accessibility of components ([#613](https://github.com/SAP/ui5-webcomponents/issues/613)) ([16568c2](https://github.com/SAP/ui5-webcomponents/commit/16568c2))
* **Configuration:** add configuration for calendar first day of the week ([#627](https://github.com/SAP/ui5-webcomponents/issues/627)) ([9c6df48](https://github.com/SAP/ui5-webcomponents/commit/9c6df48))
* add support for angular two way data binding ([#706](https://github.com/SAP/ui5-webcomponents/issues/706)) ([16820e4](https://github.com/SAP/ui5-webcomponents/commit/16820e4))
* **Tooling:** add new component script ([#747](https://github.com/SAP/ui5-webcomponents/issues/747)) ([171a36f](https://github.com/SAP/ui5-webcomponents/commit/171a36f))
* **docs:** maintain documentation for released version ([#400](https://github.com/SAP/ui5-webcomponents/issues/400)) ([476f8e2](https://github.com/SAP/ui5-webcomponents/commit/476f8e2))

### BREAKING CHANGES

* **ui5-popover:** stayOpenOnScroll is now removed
Popover will no longer close when the browser is scrolled
and its parent (opener) is visible in the viewport.
* **ui5-li:** CSS variable --ui5-listitem-background-color is removed,
set the desired background directly on the tag.
* **ui5-table:** width property of the ui5-table-column has been removed, use CSS to give width to the columns.
`<ui5-table-column style="width: 100px">...`
* **ui5-multi-combobox:** property validate-input is removed,
use the property allow-custom-values, note built in validation is enabled by default.
* **Theming:** Theming.js no longer has getTheme and setTheme methods, use the Configuration.js instead.
* **i18n, Theming:** unify assets handling ([#744](https://github.com/SAP/ui5-webcomponents/pull/744)).
Use `"@ui5/webcomponents/dist/json-imports/i18n.js"`, instead of `"@ui5/webcomponents/dist/MessageBundleAssets.js"` to enable i18n.
Use `"@ui5/webcomponents/dist/json-imports/Themes.js"`, instead of import `"@ui5/webcomponents/dist/ThemePropertiesProvider.js"` to enable theming.



# [1.0.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2019-07-04)

### Bug Fixes

* **popup:** remove body styles in onExitDOM ([#593](https://github.com/SAP/ui5-webcomponents/issues/593)) ([410b8f6](https://github.com/SAP/ui5-webcomponents/commit/410b8f6))
* **framework:** fix redundant event dispatch ([#599](https://github.com/SAP/ui5-webcomponents/issues/599)) ([dc0cda2](https://github.com/SAP/ui5-webcomponents/commit/dc0cda2))

### Code Refactoring

* **ui5-shellbar-item:** Rename press event to itemClick ([#606](https://github.com/SAP/ui5-webcomponents/issues/606)) ([5bfab39](https://github.com/SAP/ui5-webcomponents/commit/5bfab39))
* **ui5-popover, ui5-dialog**: remove noHeader property (#615) ([6a990a7](https://github.com/SAP/ui5-webcomponents/commit/6a990a7)), closes [#615](https://github.com/SAP/ui5-webcomponents/issues/615)


### BREAKING CHANGES

* **ui5-shellbar-item:** ui5-shellbar-item press event is renamed to itemClick
* **ui5-popover, ui5-dialog**: the property noHeader is removed, the presence of header is based on the values of "headerText" property and "header" slot



## [1.0.0-rc.1](https://github.com/SAP/ui5-webcomponents/compare/v0.13.1...v1.0.0-rc.1) (2019-06-28)

### Bug Fixes
* **ui5-button:** fix disable click events when disabled ([#586](https://github.com/SAP/ui5-webcomponents/pull/586))
* **ui5-select:** prevent scrolling when changing selection with arrows(#588](https://github.com/SAP/ui5-webcomponents/pull/588))

### Refactoring

* **all components:** remove press event in favour of click (#597](https://github.com/SAP/ui5-webcomponents/pull/597))

### BREAKING CHANGES
* **ui5-button:** BREAKING CHANGE: ui5-button press event is renamed to click (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-card:** headerPress event is renamed to headerClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-link:** press event is renamed to click (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-list:** itemPress event is renamed to itemClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-shellbar:** notificationsPress event is renamed to notificationsClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-shellbar:** profilePress event is renamed to profileClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-shellbar:** productSwitchPress event is renamed to productSwitchClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-shellbar:** logoPress event is renamed to logoClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-shellbar:** coPilotPress event is renamed to coPilotClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-shellbar:** menuItemPress event is renamed to menuItemClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))
* **ui5-timeline-item:** ui5-timeline-item itemNamePress event is renamed to itemNameClick (#597](https://github.com/SAP/ui5-webcomponents/pull/597))

## [0.13.1](https://github.com/SAP/ui5-webcomponents/compare/v0.13.0...v0.13.1) (2019-06-22)

### Bug Fixes

* **ui5-table-column:** fix default slot rendering ([#579](https://github.com/SAP/ui5-webcomponents/pull/579))






# [0.13.0](https://github.com/SAP/ui5-webcomponents/compare/v0.12.0...v0.13.0) (2019-06-21)


### Bug Fixes

* **ui5-badge:** correct text font ([#535](https://github.com/SAP/ui5-webcomponents/issues/535)) ([3da0dd5](https://github.com/SAP/ui5-webcomponents/commit/3da0dd5))
* **ui5-icon:** correct RTL appearance ([#569](https://github.com/SAP/ui5-webcomponents/issues/569)) ([591d81a](https://github.com/SAP/ui5-webcomponents/commit/591d81a))
* **ui5-switch:** change getters names ([#566](https://github.com/SAP/ui5-webcomponents/issues/566)) ([2d94b60](https://github.com/SAP/ui5-webcomponents/commit/2d94b60))
* **ui5-tabcontainer:** set initial tab index ([#545](https://github.com/SAP/ui5-webcomponents/issues/545)) ([0127c2f](https://github.com/SAP/ui5-webcomponents/commit/0127c2f))
* **framework:** remove custom "falsy" checks from ifDefined ([#544](https://github.com/SAP/ui5-webcomponents/issues/544)) ([92a85fa](https://github.com/SAP/ui5-webcomponents/commit/92a85fa))
* **framework:** fix broken translations ([#548](https://github.com/SAP/ui5-webcomponents/issues/548)) ([37b2b07](https://github.com/SAP/ui5-webcomponents/commit/37b2b07))


### Code Refactoring

* **ui5-button:** rename type property to design ([#504](https://github.com/SAP/ui5-webcomponents/issues/504)) ([a62b471](https://github.com/SAP/ui5-webcomponents/commit/a62b471))
* **ui5-link:** rename type property to design ([#505](https://github.com/SAP/ui5-webcomponents/issues/505)) ([3965a00](https://github.com/SAP/ui5-webcomponents/commit/3965a00))
* **ui5-messagestrip:** rename hideIcon property to noIcon ([#507](https://github.com/SAP/ui5-webcomponents/issues/507)) ([2314fc3](https://github.com/SAP/ui5-webcomponents/commit/2314fc3))
* **ui5-popover:** hideHeader property renamed to noHeader ([#553](https://github.com/SAP/ui5-webcomponents/issues/553)) ([11dc3b1](https://github.com/SAP/ui5-webcomponents/commit/11dc3b1))
* **ui5-popover:** rename hideArrow property to noArrow ([#509](https://github.com/SAP/ui5-webcomponents/issues/509)) ([efff863](https://github.com/SAP/ui5-webcomponents/commit/efff863))
* **ui5-select:** change default slot from list items to options ([#532](https://github.com/SAP/ui5-webcomponents/issues/532)) ([2e4486b](https://github.com/SAP/ui5-webcomponents/commit/2e4486b))
* **ui5-switch:** rename type property to graphical ([#506](https://github.com/SAP/ui5-webcomponents/issues/506)) ([0040e85](https://github.com/SAP/ui5-webcomponents/commit/0040e85))
* **ui5-title:** remove unneeded accessibility role ([#573](https://github.com/SAP/ui5-webcomponents/pull/573))
* **ui5-button:** remove aria-disabled ([#558](https://github.com/SAP/ui5-webcomponents/pull/558))
* **framework:** stop calling focusout and focusin by convention ([#576](https://github.com/SAP/ui5-webcomponents/pull/558))


### Features

* **ui5-card:** add "headerInteractive" property ([#439](https://github.com/SAP/ui5-webcomponents/issues/439)) ([98f7075](https://github.com/SAP/ui5-webcomponents/commit/98f7075))
* **ui5-label:** expose font-weight property on root tag ([#534](https://github.com/SAP/ui5-webcomponents/issues/534)) ([88c794a](https://github.com/SAP/ui5-webcomponents/commit/88c794a))
* **ui5-li:** add info and infoState properties ([#539](https://github.com/SAP/ui5-webcomponents/issues/539)) ([f1d8a85](https://github.com/SAP/ui5-webcomponents/commit/f1d8a85))
* **ui5-select:** add form support([#565](https://github.com/SAP/ui5-webcomponents/issues/565)) ([89e3508](https://github.com/SAP/ui5-webcomponents/commit/89e3508))


### BREAKING CHANGES

* **ui5-select:** the parameter of the change event is now called "selectedOption"; ui5-select enforces ui5-option as children in the metadata
* **ui5-select:** Use ui5-option instead of ui5-li in ui5-select
* **ui5-link:** property "type" is removed, use property design
* **ui5-button:** property "type" is removed, use property design
* **ui5-switch:** property "type" is removed, use property graphical
* **ui5-messagestrip:** property hideIcon is renamed to noIcon
* **ui5-popover:** property hideIcon is renamed to noArrow
* **ui5-popover:**property hideIcon is renamed to noHeader





# [0.12.0](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.12.0) (2019-06-10)


### Bug Fixes

* all: hide components when hidden attribute is set ([#464](https://github.com/SAP/ui5-webcomponents/issues/464)) ([f7f07d2](https://github.com/SAP/ui5-webcomponents/commit/f7f07d2))
* access DOM in connectedCallback instead of constructor ([#524](https://github.com/SAP/ui5-webcomponents/issues/524)) ([0f3b8e4](https://github.com/SAP/ui5-webcomponents/commit/0f3b8e4))
* do not use assignedElements ([#432](https://github.com/SAP/ui5-webcomponents/issues/432)) ([c54c812](https://github.com/SAP/ui5-webcomponents/commit/c54c812))
* **ui5-table:** fix scrolling on space ([#232](https://github.com/SAP/ui5-webcomponents/issues/232)) ([cd63e9a](https://github.com/SAP/ui5-webcomponents/commit/cd63e9a))
* **ui5-button:** bold text in fiori_3 when button is emphasized ([#512](https://github.com/SAP/ui5-webcomponents/issues/512)) ([53cdc93](https://github.com/SAP/ui5-webcomponents/commit/53cdc93))
* **ui5-button:** fix focus outline color of emphasized button ([#499](https://github.com/SAP/ui5-webcomponents/issues/499)) ([1e0690c](https://github.com/SAP/ui5-webcomponents/commit/1e0690c))
* **ui5-checkbox:** fix touchArea size ([#448](https://github.com/SAP/ui5-webcomponents/issues/448)) ([8831139](https://github.com/SAP/ui5-webcomponents/commit/8831139))
* **ui5-li:** remove active state onmouseup ([#525](https://github.com/SAP/ui5-webcomponents/issues/525)) ([a07880d](https://github.com/SAP/ui5-webcomponents/commit/a07880d))
* **ui5-list:** fix list footer font family ([#494](https://github.com/SAP/ui5-webcomponents/issues/494)) ([5543d30](https://github.com/SAP/ui5-webcomponents/commit/5543d30))
* **ui5-messagestrip:** improve screen reader announcements ([#467](https://github.com/SAP/ui5-webcomponents/issues/467)) ([b68443c](https://github.com/SAP/ui5-webcomponents/commit/b68443c))
* **ui5-multi-combobox:** docs and API improvements ([#438](https://github.com/SAP/ui5-webcomponents/issues/438)) ([c559ac0](https://github.com/SAP/ui5-webcomponents/commit/c559ac0))
* **ui5-radiobutton:** make readonly radiobuttons not selectable via keyboard ([#500](https://github.com/SAP/ui5-webcomponents/issues/500)) ([2261f1c](https://github.com/SAP/ui5-webcomponents/commit/2261f1c))
* **ui5-select:** fix component clickable area ([#462](https://github.com/SAP/ui5-webcomponents/issues/462)) ([9c59de5](https://github.com/SAP/ui5-webcomponents/commit/9c59de5))
* **ui5-tabcontainer:** remove typo from component template ([#446](https://github.com/SAP/ui5-webcomponents/issues/446)) ([e701562](https://github.com/SAP/ui5-webcomponents/commit/e701562))


### Code Refactoring

* **ui5-button:** remove activeIcon property ([#513](https://github.com/SAP/ui5-webcomponents/issues/513)) ([8d8c343](https://github.com/SAP/ui5-webcomponents/commit/8d8c343))


### Features

* i18n: inline English texts if no translation is fetched ([#479](https://github.com/SAP/ui5-webcomponents/issues/479)) ([abfb221](https://github.com/SAP/ui5-webcomponents/commit/abfb221))
* **base:** implement late validation ([#522](https://github.com/SAP/ui5-webcomponents/issues/522)) ([c452d60](https://github.com/SAP/ui5-webcomponents/commit/c452d60))
* **ui5-badge:** initial implementation ([#521](https://github.com/SAP/ui5-webcomponents/issues/521)) ([8496211](https://github.com/SAP/ui5-webcomponents/commit/8496211))
* **ui5-busyindicator:** initial implementation ([#416](https://github.com/SAP/ui5-webcomponents/issues/416)) ([6b6b544](https://github.com/SAP/ui5-webcomponents/commit/6b6b544))
* **ui5-busyindicator:** introduce active property and simplify usage ([#519](https://github.com/SAP/ui5-webcomponents/issues/519)) ([ff59a98](https://github.com/SAP/ui5-webcomponents/commit/ff59a98))
* **ui5-li:** parameterize listitembase border bottom ([#520](https://github.com/SAP/ui5-webcomponents/issues/520)) ([da1c430](https://github.com/SAP/ui5-webcomponents/commit/da1c430))
* **ui5-table:** add noDataText for ui5-table without rows ([#402](https://github.com/SAP/ui5-webcomponents/issues/402)) ([907d513](https://github.com/SAP/ui5-webcomponents/commit/907d513)), closes [#389](https://github.com/SAP/ui5-webcomponents/issues/389)


### BREAKING CHANGES

* **ui5-button:** activeIcon property is removed





## [0.11.1](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.11.1) (2019-05-30)

**Note:** No code changes.





# [0.11.0](https://github.com/SAP/ui5-webcomponents/compare/v0.10.1...v0.11.0) (2019-05-22)


### Bug Fixes

* **ui5-checkbox:** correct default values of the boolean props  ([#408](https://github.com/SAP/ui5-webcomponents/issues/408)) ([9bdd2c5](https://github.com/SAP/ui5-webcomponents/commit/9bdd2c5))
* **ui5-messagestrip:** remove height 100% from element tag ([#387](https://github.com/SAP/ui5-webcomponents/issues/387)) ([4b64a9c](https://github.com/SAP/ui5-webcomponents/commit/4b64a9c))
* **ui5-panel:** add missing dependency for ui5-icon ([#406](https://github.com/SAP/ui5-webcomponents/issues/406)) ([650bcb0](https://github.com/SAP/ui5-webcomponents/commit/650bcb0))
* fix broken child property observation ([#423](https://github.com/SAP/ui5-webcomponents/issues/423)) ([b3e3b3f](https://github.com/SAP/ui5-webcomponents/commit/b3e3b3f))
* fix API build for composite components  ([#391](https://github.com/SAP/ui5-webcomponents/issues/391)) ([dcb829b](https://github.com/SAP/ui5-webcomponents/commit/dcb829b))
* prevent dual event dispatching in no conflict mode ([#363](https://github.com/SAP/ui5-webcomponents/issues/363)) ([4cbe3de](https://github.com/SAP/ui5-webcomponents/commit/4cbe3de))
* update tab container documentation ([#370](https://github.com/SAP/ui5-webcomponents/issues/370)) ([7117430](https://github.com/SAP/ui5-webcomponents/commit/7117430)), closes [#369](https://github.com/SAP/ui5-webcomponents/issues/369)


### Code Refactoring

* make custom CSS theme independent ([#386](https://github.com/SAP/ui5-webcomponents/issues/386)) ([d6b4ab5](https://github.com/SAP/ui5-webcomponents/commit/d6b4ab5))
* **ui5-datepicker:** rename event 'liveChange' to 'input' ([#394](https://github.com/SAP/ui5-webcomponents/pull/394))
* **ui5-panel:** remove backgroundDesign property ([#384](https://github.com/SAP/ui5-webcomponents/pull/384))
* **ui5-panel:** remove backgroundDesign property ([#383](https://github.com/SAP/ui5-webcomponents/pull/383))
* **ui5-checkbox:** rename "readOnly" to "readonly" ([#413](https://github.com/SAP/ui5-webcomponents/pull/413))
* **ui5-radiobutton:** rename "readOnly" to "readonly" ([#413](https://github.com/SAP/ui5-webcomponents/pull/413))


### Features

* **ui5-multi-combobox:** initial implementation ([#379](https://github.com/SAP/ui5-webcomponents/issues/379)) ([115900b](https://github.com/SAP/ui5-webcomponents/commit/115900b))
* **ui5-list:** selectionChange event provides previously selected items ([#418](https://github.com/SAP/ui5-webcomponents/issues/418)) ([f0fc8f2](https://github.com/SAP/ui5-webcomponents/commit/f0fc8f2))
* **ui5-shellbar:** API improvements ([#421](https://github.com/SAP/ui5-webcomponents/issues/421)) ([e0ff36d](https://github.com/SAP/ui5-webcomponents/commit/e0ff36d))
* add CSS variables section in API Ref ([#399](https://github.com/SAP/ui5-webcomponents/issues/399)) ([e198fa5](https://github.com/SAP/ui5-webcomponents/commit/e198fa5))
* add data-ui5-compact-size attribute to root when compact is set ([#382](https://github.com/SAP/ui5-webcomponents/issues/382)) ([cbf00a8](https://github.com/SAP/ui5-webcomponents/commit/cbf00a8))
* fetch ui5-datepicker assets from CDN ([#420](https://github.com/SAP/ui5-webcomponents/issues/420)) ([1f62dda](https://github.com/SAP/ui5-webcomponents/commit/1f62dda))
* simplify slots usage ([e4907b9](https://github.com/SAP/ui5-webcomponents/commit/e4907b9))


### BREAKING CHANGES

* **ui5-list:** the "selectionChange" event param "items" has been renamed to "selectedItems".
* **ui5-list:** the "backgroundDesign" property has been removed, use the corresponding
CSS variable (--_ui5_listitem_background_color) to alter the list items` background.
* **ui5-panel:** the "backgroundDesign" property has been removed, use the corresponding
CSS variables (--_ui5_panel_background_color) to alter the panel background.
* **ui5-datepicker:** 'liveChange' event has been renamed to 'input'.
* **ui5-checkbox:** property "readOnly" has been renamed to "readonly".
* **ui5-radiobutton:** property "readOnly" has been renamed to "readonly".
* the signature of the addCustomCSS method exported by "@ui5/webcomponents-base/Theming.js" is changed from addCustomCSS(tag, theme, css) to addCustomCSS(tag, css)





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

* **configuration:** fix map literals ([#324](https://github.com/SAP/ui5-webcomponents/issues/324)) ([515121f](https://github.com/SAP/ui5-webcomponents/commit/515121f))
* **docs:** fix card sample page ([#305](https://github.com/SAP/ui5-webcomponents/issues/305)) ([d91f237](https://github.com/SAP/ui5-webcomponents/commit/d91f237))
* add missing dependency to jquery-shim in resource bundle ([#242](https://github.com/SAP/ui5-webcomponents/issues/242)) ([3c5bd6f](https://github.com/SAP/ui5-webcomponents/commit/3c5bd6f))
* **ui5-button:** fix height ([#331](https://github.com/SAP/ui5-webcomponents/issues/331)) ([98a2c4e](https://github.com/SAP/ui5-webcomponents/commit/98a2c4e))
* **ui5-button:** fix width in ie11 ([#325](https://github.com/SAP/ui5-webcomponents/issues/325)) ([b00ab52](https://github.com/SAP/ui5-webcomponents/commit/b00ab52))
* **ui5-button:** removes active state after tabbing on an pressed button ([#335](https://github.com/SAP/ui5-webcomponents/issues/335)) ([0776e01](https://github.com/SAP/ui5-webcomponents/commit/0776e01))
* **ui5-checkbox:** correct setting of aria-readonly ([#220](https://github.com/SAP/ui5-webcomponents/issues/220)) ([c1f98a3](https://github.com/SAP/ui5-webcomponents/commit/c1f98a3))
* **ui5-checkbox:** fIx checkbox width in ie11 ([d58320b](https://github.com/SAP/ui5-webcomponents/commit/d58320b))
* **ui5-checkbox:** fixes issues with focus outline and wrapping ([#238](https://github.com/SAP/ui5-webcomponents/issues/238)) ([02bb56e](https://github.com/SAP/ui5-webcomponents/commit/02bb56e))
* **ui5-checkbox:** remove background from touchable area ([#226](https://github.com/SAP/ui5-webcomponents/issues/226)) ([3412ef3](https://github.com/SAP/ui5-webcomponents/commit/3412ef3))
* **ui5-li:** fix delete list item button height ([#221](https://github.com/SAP/ui5-webcomponents/issues/221)) ([a008022](https://github.com/SAP/ui5-webcomponents/commit/a008022))
* **ui5-li:** fix description text in compact mode ([#211](https://github.com/SAP/ui5-webcomponents/issues/211)) ([cadf996](https://github.com/SAP/ui5-webcomponents/commit/cadf996))
* checks navigator language for rtl enabling ([#253](https://github.com/SAP/ui5-webcomponents/issues/253)) ([c29d970](https://github.com/SAP/ui5-webcomponents/commit/c29d970))
* correct constructable stylesheet feature detection ([#271](https://github.com/SAP/ui5-webcomponents/issues/271)) ([816e6de](https://github.com/SAP/ui5-webcomponents/commit/816e6de))
* make fallback script work with multiple variables per line ([#252](https://github.com/SAP/ui5-webcomponents/issues/252)) ([298a165](https://github.com/SAP/ui5-webcomponents/commit/298a165))
* prevent merging of :host(tag) and tag css rules ([#349](https://github.com/SAP/ui5-webcomponents/issues/349)) ([f23085c](https://github.com/SAP/ui5-webcomponents/commit/f23085c))
* select correctly opens on click ([#235](https://github.com/SAP/ui5-webcomponents/issues/235)) ([a4915df](https://github.com/SAP/ui5-webcomponents/commit/a4915df))
* slots work in Safari ([#230](https://github.com/SAP/ui5-webcomponents/issues/230)) ([79445d0](https://github.com/SAP/ui5-webcomponents/commit/79445d0))
* **ui5-li:** fix typo ([#224](https://github.com/SAP/ui5-webcomponents/issues/224)) ([cb781f1](https://github.com/SAP/ui5-webcomponents/commit/cb781f1))
* **ui5-li-custom:** enable setting height of the custom content ([#311](https://github.com/SAP/ui5-webcomponents/issues/311)) ([76bf9f3](https://github.com/SAP/ui5-webcomponents/commit/76bf9f3))
* **ui5-link:** noreferrer for cross-origin links ([#202](https://github.com/SAP/ui5-webcomponents/issues/202)) ([5902704](https://github.com/SAP/ui5-webcomponents/commit/5902704))
* **ui5-panel:** correct inon size on small screens ([#213](https://github.com/SAP/ui5-webcomponents/issues/213)) ([a98f544](https://github.com/SAP/ui5-webcomponents/commit/a98f544))
* **ui5-radiobutton:** fix focus in ie11 ([#327](https://github.com/SAP/ui5-webcomponents/issues/327)) ([b59abd6](https://github.com/SAP/ui5-webcomponents/commit/b59abd6))
* **ui5-radiobutton:** fix keyboard handling on TAB/SHIFT+TAB ([#231](https://github.com/SAP/ui5-webcomponents/issues/231)) ([f2a18cf](https://github.com/SAP/ui5-webcomponents/commit/f2a18cf))
* **ui5-shellbar:** add missing dependency to ui5-popover ([#234](https://github.com/SAP/ui5-webcomponents/issues/234)) ([912f434](https://github.com/SAP/ui5-webcomponents/commit/912f434))
* **ui5-shellbar:** pass correct values for events details ([#298](https://github.com/SAP/ui5-webcomponents/issues/298)) ([2641ec6](https://github.com/SAP/ui5-webcomponents/commit/2641ec6))
* transform css files to es6 modules ([#306](https://github.com/SAP/ui5-webcomponents/issues/306)) ([dbb98c8](https://github.com/SAP/ui5-webcomponents/commit/dbb98c8))
* **ui5-shellbar:** set correct font-family to primary title ([#228](https://github.com/SAP/ui5-webcomponents/issues/228)) ([839a66e](https://github.com/SAP/ui5-webcomponents/commit/839a66e))
* **ui5-switch:** fix layouting on IE ([#223](https://github.com/SAP/ui5-webcomponents/issues/223)) ([1111dbf](https://github.com/SAP/ui5-webcomponents/commit/1111dbf))
* **ui5-togglebutton:** correct default btn hover and text hover ([#332](https://github.com/SAP/ui5-webcomponents/issues/332)) ([280f85d](https://github.com/SAP/ui5-webcomponents/commit/280f85d))


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

* correct calling unexisting method ([#157](https://github.com/SAP/ui5-webcomponents/issues/157)) ([0a8c8cd](https://github.com/SAP/ui5-webcomponents/commit/0a8c8cd))
* correct device detection error on mobile ([#143](https://github.com/SAP/ui5-webcomponents/issues/143)) ([857754e](https://github.com/SAP/ui5-webcomponents/commit/857754e))
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


### NOTABLE CHANGES
* The bundle size is reduced by removing unused functionality of core modules and making greater use of tree shaking.




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
* fix broken bundle on Edge [#64](https://github.com/SAP/ui5-webcomponents/issues/64) ([73117c7](https://github.com/SAP/ui5-webcomponents/commit/73117c7))
* do not modify the HTML tag ([#49](https://github.com/SAP/ui5-webcomponents/issues/49)) ([17f30b7](https://github.com/SAP/ui5-webcomponents/commit/17f30b7))
* fix playground theme switch ([#62](https://github.com/SAP/ui5-webcomponents/issues/62)) ([5212a87](https://github.com/SAP/ui5-webcomponents/commit/5212a87))
* fix playground home redirect ([#6](https://github.com/SAP/ui5-webcomponents/issues/6)) ([8c87778](https://github.com/SAP/ui5-webcomponents/commit/8c87778))
* prevent throwing exception if slotted child does not have listenFor ([#92](https://github.com/SAP/ui5-webcomponents/issues/92)) ([4ffce64](https://github.com/SAP/ui5-webcomponents/commit/4ffce64))
* unknown slots no longer cause an error ([#90](https://github.com/SAP/ui5-webcomponents/issues/90)) ([a033326](https://github.com/SAP/ui5-webcomponents/commit/a033326))


### BREAKING CHANGES

* any applications that wants to support Edge and/or IE11 should now import the respective browser support module. For details, see the [README.md](/README.md#browser-support)
* **ui5-tabcontainer:** The TabContainer "selected-key" and Tab "key" properties are removed. Use TabContainer "selectedIndex" property (selected-index attribute) to set and get the selected tab.
* addCustomCSS is no longer on the Core object. Use Theming instead. [#58](https://github.com/SAP/ui5-webcomponents/pull/58)


### NOTABLE CHANGES
* The bundle size is reduced by removing unused functionality of core modules and making greater use of tree shaking.
