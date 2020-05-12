# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
