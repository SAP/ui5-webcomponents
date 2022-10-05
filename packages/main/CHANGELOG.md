# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.8.0](https://github.com/SAP/ui5-webcomponents/compare/v1.7.1...v1.8.0) (2022-10-03)


### Bug Fixes

* **ui5-breadcrumbs-popover:** aligned footer items ([#5821](https://github.com/SAP/ui5-webcomponents/issues/5821)) ([b1aa6e7](https://github.com/SAP/ui5-webcomponents/commit/b1aa6e70086689678175506b230479c8dbff6f99)), closes [#5810](https://github.com/SAP/ui5-webcomponents/issues/5810)
* **ui5-dialog:** correct imports in HC theme bundles ([#5851](https://github.com/SAP/ui5-webcomponents/issues/5851)) ([3cef0d5](https://github.com/SAP/ui5-webcomponents/commit/3cef0d5a104a4acd8b790cfd7549c5b890bdc81f)), closes [#5832](https://github.com/SAP/ui5-webcomponents/issues/5832)
* **ui5-dialog:** fixed text selection when the dialog is draggable ([#5724](https://github.com/SAP/ui5-webcomponents/issues/5724)) ([9e0c79f](https://github.com/SAP/ui5-webcomponents/commit/9e0c79fe7bf623d9b113be5b6df4a569293babbc))
* **ui5-input,ui5-combobox:** remove 'selected' announcement ([#5864](https://github.com/SAP/ui5-webcomponents/issues/5864)) ([e04adde](https://github.com/SAP/ui5-webcomponents/commit/e04added4ff84ffca490e3ce03d4dd54cffb600c))
* **ui5-input:** announce suggestion text once ([#5817](https://github.com/SAP/ui5-webcomponents/issues/5817)) ([6225e10](https://github.com/SAP/ui5-webcomponents/commit/6225e10011b668da92584f434f33640000ed2310))
* **ui5-input:** enable autocomplete deletion by Meta/Alt + backspace ([#5729](https://github.com/SAP/ui5-webcomponents/issues/5729)) ([df0fff6](https://github.com/SAP/ui5-webcomponents/commit/df0fff656392664c6ea1d8e63538dd787a37d0cf))
* **ui5-input:** handle deletion in numeric input ([#5676](https://github.com/SAP/ui5-webcomponents/issues/5676)) ([3858adb](https://github.com/SAP/ui5-webcomponents/commit/3858adb1d2e88c1bd26b09f12a25a7dffc691ba2)), closes [#4932](https://github.com/SAP/ui5-webcomponents/issues/4932)
* **ui5-multi-combobox:** apply focus when invoked explicitly ([#5850](https://github.com/SAP/ui5-webcomponents/issues/5850)) ([212b2ef](https://github.com/SAP/ui5-webcomponents/commit/212b2ef49d54f6328220a6d713e3ce8be5f8ab36))
* **ui5-panel:** improve focus outline visualization ([#5811](https://github.com/SAP/ui5-webcomponents/issues/5811)) ([83b244c](https://github.com/SAP/ui5-webcomponents/commit/83b244c300cd179c0584d0bf6d302e3631fb3581))
* **ui5-radio-button:** correct syncing radio group when exiting DOM ([#5859](https://github.com/SAP/ui5-webcomponents/issues/5859)) ([0dca9b2](https://github.com/SAP/ui5-webcomponents/commit/0dca9b2c87509be9ec3725681d8aa2dd23e59219)), closes [#5803](https://github.com/SAP/ui5-webcomponents/issues/5803)
* **ui5-tabcontainer:** fix closing overflow on mobile ([#5855](https://github.com/SAP/ui5-webcomponents/issues/5855)) ([996714e](https://github.com/SAP/ui5-webcomponents/commit/996714eb9345e3efd796cf8b3c46c8e198fd18e2)), closes [#5854](https://github.com/SAP/ui5-webcomponents/issues/5854)
* **ui5-tabcontainer:** fixed error when no tabs ([#5793](https://github.com/SAP/ui5-webcomponents/issues/5793)) ([cfb8951](https://github.com/SAP/ui5-webcomponents/commit/cfb8951f0acb30e1ebf54a18c2e9a3f5cf88cba1))
* **ui5-tabcontainer:** fixed tabs accessibility issues ([#5846](https://github.com/SAP/ui5-webcomponents/issues/5846)) ([e633b8b](https://github.com/SAP/ui5-webcomponents/commit/e633b8b3003136f6ad7696a0d12af807e38c18dc))
* **ui5-table:** add bottom border in Horizon themes ([#5807](https://github.com/SAP/ui5-webcomponents/issues/5807)) ([63bbf89](https://github.com/SAP/ui5-webcomponents/commit/63bbf89556fc254b3b53f6954bf48be0ad69b1a5))
* **ui5-table:** adjust samples according to the guidelines ([#5828](https://github.com/SAP/ui5-webcomponents/issues/5828)) ([debf472](https://github.com/SAP/ui5-webcomponents/commit/debf472f18f6a91a5eadee6d7f64da8563d4d0f7))
* **ui5-table:** apply correct padding in RTL mode ([#5805](https://github.com/SAP/ui5-webcomponents/issues/5805)) ([301fc4e](https://github.com/SAP/ui5-webcomponents/commit/301fc4ede2c1ab899a6a9268ed9bf776112ff42f))
* **ui5-table:** count header row as first one ([#5800](https://github.com/SAP/ui5-webcomponents/issues/5800)) ([9bef86f](https://github.com/SAP/ui5-webcomponents/commit/9bef86fd7b780e8e4fe7ba6e2720ff0444e73847))
* **ui5-textarea:** announce value state type ([#5798](https://github.com/SAP/ui5-webcomponents/issues/5798)) ([a689502](https://github.com/SAP/ui5-webcomponents/commit/a6895025300e707d63c0ab4f413b07f6a6f96563)), closes [#5716](https://github.com/SAP/ui5-webcomponents/issues/5716)
* **ui5-tokenizer:** return correct token on delete event ([#5744](https://github.com/SAP/ui5-webcomponents/issues/5744)) ([d694a88](https://github.com/SAP/ui5-webcomponents/commit/d694a8884782c576bbef720068bbbd62db3602a3))


### Features

* **main:** add support for custom SVG icons ([#5865](https://github.com/SAP/ui5-webcomponents/issues/5865)) ([d8b7200](https://github.com/SAP/ui5-webcomponents/commit/d8b7200f30c16d94b7f15ddbdf9808d8efbaa38c))
* **ui5-menu-item:** implement additional text ([#5867](https://github.com/SAP/ui5-webcomponents/issues/5867)) ([bf991b6](https://github.com/SAP/ui5-webcomponents/commit/bf991b6bb519e4cc849a542d67f4954efc4b55e3))
* **ui5-tree:** introduce `accessibleName` and  `accessibleNameRef` properties ([#5804](https://github.com/SAP/ui5-webcomponents/issues/5804)) ([2e3452a](https://github.com/SAP/ui5-webcomponents/commit/2e3452a98463aa3b78231651ac63771d3cbc5c1a))





## [1.7.1](https://github.com/SAP/ui5-webcomponents/compare/v1.7.0...v1.7.1) (2022-09-08)


### Bug Fixes

* **ui5-tabcontainer:** fixed error when no tabs ([#5793](https://github.com/SAP/ui5-webcomponents/issues/5793)) ([4aefe17](https://github.com/SAP/ui5-webcomponents/commit/4aefe176bfed5a6ba963418413aa167955b40418))





# [1.7.0](https://github.com/SAP/ui5-webcomponents/compare/v1.6.0...v1.7.0) (2022-09-02)


### Bug Fixes

* correct imports of horizon Badge CSS files ([#5673](https://github.com/SAP/ui5-webcomponents/issues/5673)) ([583a63d](https://github.com/SAP/ui5-webcomponents/commit/583a63ddc93717fe3a7f047888ca964a53091415))
* correctly calculate accessibleNameRef ([#5520](https://github.com/SAP/ui5-webcomponents/issues/5520)) ([a872c9b](https://github.com/SAP/ui5-webcomponents/commit/a872c9be58ee38f2d81d65e1a977cf7c80a380fd)), closes [#5452](https://github.com/SAP/ui5-webcomponents/issues/5452)
* remove woff files and woff/ttf usage ([#5629](https://github.com/SAP/ui5-webcomponents/issues/5629)) ([e4175cd](https://github.com/SAP/ui5-webcomponents/commit/e4175cdf000ace65758e75fb70545edd872197b8))
* **ui5-avatar-group:** width calculations for (non-)Chromium browsers adjusted ([#5737](https://github.com/SAP/ui5-webcomponents/issues/5737)) ([2741705](https://github.com/SAP/ui5-webcomponents/commit/274170508f944d1cbcd3df7e2a66d7cc55a9c2cd)), closes [#5643](https://github.com/SAP/ui5-webcomponents/issues/5643)
* **ui5-breadcrumbs:** current location misalignment is fixed ([#5585](https://github.com/SAP/ui5-webcomponents/issues/5585)) ([b685860](https://github.com/SAP/ui5-webcomponents/commit/b685860f56ad8669969a5d7df087ea26cdaf8351))
* **ui5-button:** adjust icon role ([#5714](https://github.com/SAP/ui5-webcomponents/issues/5714)) ([5b446f5](https://github.com/SAP/ui5-webcomponents/commit/5b446f52d2634ba400f2fbe2938d48fdd6c056af)), closes [#5505](https://github.com/SAP/ui5-webcomponents/issues/5505) [#5596](https://github.com/SAP/ui5-webcomponents/issues/5596) [#5687](https://github.com/SAP/ui5-webcomponents/issues/5687)
* **ui5-button:** announce is now correct when button is icon only with tooltip ([#5592](https://github.com/SAP/ui5-webcomponents/issues/5592)) ([7703945](https://github.com/SAP/ui5-webcomponents/commit/77039457ce0492894e416cdd0ecac0f9baaf8746)), closes [#5386](https://github.com/SAP/ui5-webcomponents/issues/5386)
* **ui5-button:** correct calculation of the min width of an icon button ([#5701](https://github.com/SAP/ui5-webcomponents/issues/5701)) ([005ada0](https://github.com/SAP/ui5-webcomponents/commit/005ada03f47f9b7657cf714cee4bfe3f6559acc8))
* **ui5-button:** correct text shadow in contrast themes ([#5750](https://github.com/SAP/ui5-webcomponents/issues/5750)) ([7fb7e4c](https://github.com/SAP/ui5-webcomponents/commit/7fb7e4cc4aa7dc6a7566226fc46513441e39cfde)), closes [#5420](https://github.com/SAP/ui5-webcomponents/issues/5420)
* **ui5-button:** provide tooltip for icon-only buttons ([#5734](https://github.com/SAP/ui5-webcomponents/issues/5734)) ([d49427f](https://github.com/SAP/ui5-webcomponents/commit/d49427f4a07d1f1c744bbc8f9964307662718440)), closes [#5687](https://github.com/SAP/ui5-webcomponents/issues/5687) [#5596](https://github.com/SAP/ui5-webcomponents/issues/5596) [#5505](https://github.com/SAP/ui5-webcomponents/issues/5505)
* **ui5-calendar:** adjust high contrast belize themes ([#5756](https://github.com/SAP/ui5-webcomponents/issues/5756)) ([4d19f91](https://github.com/SAP/ui5-webcomponents/commit/4d19f91f13f355f35d97b702fb4c8ccba0118a4b)), closes [#5377](https://github.com/SAP/ui5-webcomponents/issues/5377)
* **ui5-calendar:** adjust the role attribute of the header actions elements ([#5723](https://github.com/SAP/ui5-webcomponents/issues/5723)) ([3acd9bf](https://github.com/SAP/ui5-webcomponents/commit/3acd9bf5b44b1de3d919e46a5292dfbdae2ad340)), closes [#5708](https://github.com/SAP/ui5-webcomponents/issues/5708)
* **ui5-calendar:** align year and month picker focus to horizon ([#5692](https://github.com/SAP/ui5-webcomponents/issues/5692)) ([02816a9](https://github.com/SAP/ui5-webcomponents/commit/02816a944f392aded156d4725fef86f9c5382746)), closes [#5644](https://github.com/SAP/ui5-webcomponents/issues/5644)
* **ui5-date-picker:** focus out now closes the popup ([#5603](https://github.com/SAP/ui5-webcomponents/issues/5603)) ([0a7fcac](https://github.com/SAP/ui5-webcomponents/commit/0a7fcac976f56c3598ebe20af9acde4d8d1cd2d0)), closes [#5532](https://github.com/SAP/ui5-webcomponents/issues/5532)
* **ui5-date-picker:** remove background whitespace ([#5764](https://github.com/SAP/ui5-webcomponents/issues/5764)) ([2ad0c44](https://github.com/SAP/ui5-webcomponents/commit/2ad0c4480fbaea02ea8c5f6c25ab62490bddd641)), closes [#5640](https://github.com/SAP/ui5-webcomponents/issues/5640)
* **ui5-daterange-picker:** handle single date value ([#5769](https://github.com/SAP/ui5-webcomponents/issues/5769)) ([ce8a446](https://github.com/SAP/ui5-webcomponents/commit/ce8a446b32cd56b2e6d547c8f75b1f56b5426c99))
* **ui5-input:** additional check added for robustness ([#5619](https://github.com/SAP/ui5-webcomponents/issues/5619)) ([7275652](https://github.com/SAP/ui5-webcomponents/commit/72756520d7d7183bcee8db94ccd7e0e817024ff5)), closes [#5580](https://github.com/SAP/ui5-webcomponents/issues/5580)
* **ui5-input:** allows changing value in selection change event handler ([#5677](https://github.com/SAP/ui5-webcomponents/issues/5677)) ([46b175f](https://github.com/SAP/ui5-webcomponents/commit/46b175f8a6e1ff52adb6b1bf237e8df5fc482455))
* **ui5-input:** correction of change event ([#5671](https://github.com/SAP/ui5-webcomponents/issues/5671)) ([b89f91c](https://github.com/SAP/ui5-webcomponents/commit/b89f91c0a2f8afb336f2269cc441566b3ebfdd2c))
* **ui5-input:** fix item selection bugs ([#5372](https://github.com/SAP/ui5-webcomponents/issues/5372)) ([274efaa](https://github.com/SAP/ui5-webcomponents/commit/274efaaa212e3152d27665f1809e649a75f67001))
* **ui5-link:** multiple click events ([#5642](https://github.com/SAP/ui5-webcomponents/issues/5642)) ([74fd5b9](https://github.com/SAP/ui5-webcomponents/commit/74fd5b91fd83bf28c0f4347df92b3721eb11577d))
* **ui5-list:** unexpected spaces between group items ([#5726](https://github.com/SAP/ui5-webcomponents/issues/5726)) ([d69932c](https://github.com/SAP/ui5-webcomponents/commit/d69932c02afec12d0b9d6c600459abe1a1673395)), closes [#3869](https://github.com/SAP/ui5-webcomponents/issues/3869) [#5720](https://github.com/SAP/ui5-webcomponents/issues/5720)
* **ui5-menu:** opening a submenu no longer throws a console error ([#5591](https://github.com/SAP/ui5-webcomponents/issues/5591)) ([1b5caf7](https://github.com/SAP/ui5-webcomponents/commit/1b5caf761079017d7edbe4bff2fa9949390896f8)), closes [#5582](https://github.com/SAP/ui5-webcomponents/issues/5582)
* **ui5-menu:** prevent closing sub menu when hovering over icon ([#5670](https://github.com/SAP/ui5-webcomponents/issues/5670)) ([36cb3d2](https://github.com/SAP/ui5-webcomponents/commit/36cb3d20b2c51920f7bb31b2a44895060e456977)), closes [#5669](https://github.com/SAP/ui5-webcomponents/issues/5669)
* **ui5-multiinput:** prevented token-delete event firing when readonly ([#5613](https://github.com/SAP/ui5-webcomponents/issues/5613)) ([c8f4178](https://github.com/SAP/ui5-webcomponents/commit/c8f417819a8628afeff2ca496a4d72335190463e)), closes [#5448](https://github.com/SAP/ui5-webcomponents/issues/5448)
* **ui5-panel:** recognizable panel heading ([#5628](https://github.com/SAP/ui5-webcomponents/issues/5628)) ([6f1b250](https://github.com/SAP/ui5-webcomponents/commit/6f1b250813d858baaeabada4996daecfb8da9a08))
* **ui5-panel:** toggle ui5-panel correctly on Enter key ([#5660](https://github.com/SAP/ui5-webcomponents/issues/5660)) ([137d8f3](https://github.com/SAP/ui5-webcomponents/commit/137d8f395b7ebd6df2f180a6fcec83bdb959b931))
* **ui5-popup:** Synchronous opening of a popup from another popup with Enter key now works ([#4975](https://github.com/SAP/ui5-webcomponents/issues/4975)) ([1bb87f5](https://github.com/SAP/ui5-webcomponents/commit/1bb87f5a3ced8b11741deec6e64a6ad6a0af08cf)), closes [#4861](https://github.com/SAP/ui5-webcomponents/issues/4861)
* **ui5-select:** selected option in dropdown is now read out ([#5589](https://github.com/SAP/ui5-webcomponents/issues/5589)) ([f8ab6ed](https://github.com/SAP/ui5-webcomponents/commit/f8ab6ede3ff8ee1b972c0cdeb8399d446b4888b0))
* **ui5-slider, ui5-range-slider:** apply correct handle's icon ([#5612](https://github.com/SAP/ui5-webcomponents/issues/5612)) ([1706174](https://github.com/SAP/ui5-webcomponents/commit/1706174a9f052f293d87338b7cb00241b911d9d4))
* **ui5-tabcontainer:** update tab strip on tab selection ([#5449](https://github.com/SAP/ui5-webcomponents/issues/5449)) ([bbc9246](https://github.com/SAP/ui5-webcomponents/commit/bbc9246647854a4a509a6fe9c368cfd89a9cddb9)), closes [#5172](https://github.com/SAP/ui5-webcomponents/issues/5172) [#5116](https://github.com/SAP/ui5-webcomponents/issues/5116)
* **ui5-textarea:** show exceeded text when maxLength is 0 ([#5691](https://github.com/SAP/ui5-webcomponents/issues/5691)) ([52db670](https://github.com/SAP/ui5-webcomponents/commit/52db67087dfbcd61770755b6220a73fe1fe0195a)), closes [#5384](https://github.com/SAP/ui5-webcomponents/issues/5384)
* **ui5-time-picker:** remove ampm translation ([#5751](https://github.com/SAP/ui5-webcomponents/issues/5751)) ([4943ef9](https://github.com/SAP/ui5-webcomponents/commit/4943ef94683b197e1a3ee6c9995e05187d9b52d2)), closes [#5181](https://github.com/SAP/ui5-webcomponents/issues/5181)
* **ui5-tokenizer:** adjust scrolling behavior ([#5281](https://github.com/SAP/ui5-webcomponents/issues/5281)) ([572ca8d](https://github.com/SAP/ui5-webcomponents/commit/572ca8d58ccb6e189d4874c0f77b8558e1987a70))
* **ui5-tree:** include `targetItem` in `selection-change` event ([#5631](https://github.com/SAP/ui5-webcomponents/issues/5631)) ([dc73fe2](https://github.com/SAP/ui5-webcomponents/commit/dc73fe284ef23200c734f4d62308bd9ace2e0fcf)), closes [#5430](https://github.com/SAP/ui5-webcomponents/issues/5430)


### Features

* **framework:** reset scrollbar styles class ([#5623](https://github.com/SAP/ui5-webcomponents/issues/5623)) ([c3f3063](https://github.com/SAP/ui5-webcomponents/commit/c3f306383f971744886b99cc60911dcba924720b))
* **icons:** update to 4.14.0 5.0.2 SAP-Icons font ([#5605](https://github.com/SAP/ui5-webcomponents/issues/5605)) ([d794c0b](https://github.com/SAP/ui5-webcomponents/commit/d794c0b84ea03581cd969a84dc5c05383ec91b60))
* **ui5-avatar:** introduce badge support ([#5418](https://github.com/SAP/ui5-webcomponents/issues/5418)) ([816edf0](https://github.com/SAP/ui5-webcomponents/commit/816edf048ddeb67bc6332d85d38bb93431a6b1fb))
* **ui5-carousel:** add new CSS Shadow part ([#5700](https://github.com/SAP/ui5-webcomponents/issues/5700)) ([b60ff3f](https://github.com/SAP/ui5-webcomponents/commit/b60ff3ff0bfd48af58838ef1b40d4bbe5f7cab76))
* **ui5-dialog:** add state property ([#5587](https://github.com/SAP/ui5-webcomponents/issues/5587)) ([c680e7c](https://github.com/SAP/ui5-webcomponents/commit/c680e7cb3a1e1cc6e34ff1ac11b106c8314c04e9))
* **ui5-icon:** support SVGs with multiple paths  ([#5630](https://github.com/SAP/ui5-webcomponents/issues/5630)) ([ce17ca5](https://github.com/SAP/ui5-webcomponents/commit/ce17ca559ce507b8e10f20d7f80dab48908a8305)), closes [#5347](https://github.com/SAP/ui5-webcomponents/issues/5347) [#5526](https://github.com/SAP/ui5-webcomponents/issues/5526)
* **ui5-menu-item:** add new `accessibleName` property ([#5727](https://github.com/SAP/ui5-webcomponents/issues/5727)) ([51987c8](https://github.com/SAP/ui5-webcomponents/commit/51987c8db1b3d152c585cb242fcb05dd54e6b80d)), closes [#5514](https://github.com/SAP/ui5-webcomponents/issues/5514) [#5656](https://github.com/SAP/ui5-webcomponents/issues/5656)
* **ui5-popover:** new type DOMReference for opener ([#5609](https://github.com/SAP/ui5-webcomponents/issues/5609)) ([1a4de12](https://github.com/SAP/ui5-webcomponents/commit/1a4de12b37a2cb82be2af010758f4641acf7385d))
* **ui5-tabcontainer:** make tab-select event preventable ([#5661](https://github.com/SAP/ui5-webcomponents/issues/5661)) ([928f4fc](https://github.com/SAP/ui5-webcomponents/commit/928f4fc62181aa4e562eec4d8e06b5e39918c9b2)), closes [#5116](https://github.com/SAP/ui5-webcomponents/issues/5116)


### Reverts

* Revert "fix(ui5-button): adjust icon role" (#5722) ([22170f4](https://github.com/SAP/ui5-webcomponents/commit/22170f4c9ca591de8c807a5495c95443de51e056)), closes [#5722](https://github.com/SAP/ui5-webcomponents/issues/5722) [#5714](https://github.com/SAP/ui5-webcomponents/issues/5714)





# [1.6.0](https://github.com/SAP/ui5-webcomponents/compare/v1.5.0...v1.6.0) (2022-07-25)


### Bug Fixes

* **formEnablement:** correct submit event behaviour ([#5500](https://github.com/SAP/ui5-webcomponents/issues/5500)) ([07237ec](https://github.com/SAP/ui5-webcomponents/commit/07237ec))
* **inputs:** adjust placeholder styling ([#5547](https://github.com/SAP/ui5-webcomponents/issues/5547)) ([c427344](https://github.com/SAP/ui5-webcomponents/commit/c427344))
* **InvisibleMessage:** clear announcement after a while ([#5446](https://github.com/SAP/ui5-webcomponents/issues/5446)) ([af213f1](https://github.com/SAP/ui5-webcomponents/commit/af213f1))
* **MultoComboBox:** fix component scoping ([#5553](https://github.com/SAP/ui5-webcomponents/issues/5553)) ([9c26e8e](https://github.com/SAP/ui5-webcomponents/commit/9c26e8e)), closes [#5521](https://github.com/SAP/ui5-webcomponents/issues/5521)
* **ui5-card:** correct accessibility attribute ([#5479](https://github.com/SAP/ui5-webcomponents/issues/5479)) ([48ff032](https://github.com/SAP/ui5-webcomponents/commit/48ff032))
* **ui5-combobox:** annouce group item's text when accessed via keyboard ([#5478](https://github.com/SAP/ui5-webcomponents/issues/5478)) ([0f60574](https://github.com/SAP/ui5-webcomponents/commit/0f60574))
* **ui5-combobox:** correct ok and close buttons' behavior, as well as item select behavior on mobile ([#5541](https://github.com/SAP/ui5-webcomponents/issues/5541)) ([fdf25c3](https://github.com/SAP/ui5-webcomponents/commit/fdf25c3))
* **ui5-combobox:** correctly fire change event on item press ([#5447](https://github.com/SAP/ui5-webcomponents/issues/5447)) ([0218c19](https://github.com/SAP/ui5-webcomponents/commit/0218c19)), closes [#5432](https://github.com/SAP/ui5-webcomponents/issues/5432)
* **ui5-combobox:** simplify condition ([#5508](https://github.com/SAP/ui5-webcomponents/issues/5508)) ([514f632](https://github.com/SAP/ui5-webcomponents/commit/514f632))
* **ui5-date-picker:** adjust background color ([#5466](https://github.com/SAP/ui5-webcomponents/issues/5466)) ([7ea3f49](https://github.com/SAP/ui5-webcomponents/commit/7ea3f49)), closes [#5396](https://github.com/SAP/ui5-webcomponents/issues/5396)
* **ui5-date-picker:** adjust value help icon role ([#5419](https://github.com/SAP/ui5-webcomponents/issues/5419)) ([56cc995](https://github.com/SAP/ui5-webcomponents/commit/56cc995)), closes [#5378](https://github.com/SAP/ui5-webcomponents/issues/5378)
* **ui5-input:** enhance lazy loading ([#5370](https://github.com/SAP/ui5-webcomponents/issues/5370)) ([73010dc](https://github.com/SAP/ui5-webcomponents/commit/73010dc))
* **ui5-input, ui5-multi-input, ui5-combobox, ui5-multi-combobox:** announce value state type ([#5515](https://github.com/SAP/ui5-webcomponents/issues/5515)) ([82317d0](https://github.com/SAP/ui5-webcomponents/commit/82317d0)), closes [#5392](https://github.com/SAP/ui5-webcomponents/issues/5392)
* **ui5-li:** correct accessibility attribute to checkbox ([#5475](https://github.com/SAP/ui5-webcomponents/issues/5475)) ([88f278b](https://github.com/SAP/ui5-webcomponents/commit/88f278b))
* **ui5-li-groupheader:** use group role on UL nodes only ([#5518](https://github.com/SAP/ui5-webcomponents/issues/5518)) ([1010f73](https://github.com/SAP/ui5-webcomponents/commit/1010f73)), closes [#5400](https://github.com/SAP/ui5-webcomponents/issues/5400)
* **ui5-list:** focus handling on nested lists ([#5502](https://github.com/SAP/ui5-webcomponents/issues/5502)) ([5d4ae79](https://github.com/SAP/ui5-webcomponents/commit/5d4ae79))
* **ui5-panel:** add tooltip to expand/collapse icon ([#5543](https://github.com/SAP/ui5-webcomponents/issues/5543)) ([533469d](https://github.com/SAP/ui5-webcomponents/commit/533469d))
* **ui5-panel:** enhance aria-labelledby handling ([#5539](https://github.com/SAP/ui5-webcomponents/issues/5539)) ([410dee1](https://github.com/SAP/ui5-webcomponents/commit/410dee1))
* **ui5-radio-button:** correct keyboard navigation in RTL ([#5529](https://github.com/SAP/ui5-webcomponents/issues/5529)) ([bc726a9](https://github.com/SAP/ui5-webcomponents/commit/bc726a9))
* **ui5-select:** announce value state type ([#5538](https://github.com/SAP/ui5-webcomponents/issues/5538)) ([c0f8a2a](https://github.com/SAP/ui5-webcomponents/commit/c0f8a2a))
* **ui5-table:** render selectAll checkbox only in case ui5-table is not empty ([#5523](https://github.com/SAP/ui5-webcomponents/issues/5523)) ([cbf23d1](https://github.com/SAP/ui5-webcomponents/commit/cbf23d1))
* **ui5-title:** use correct font-family for Horizon Themes ([#5457](https://github.com/SAP/ui5-webcomponents/issues/5457)) ([62c4c20](https://github.com/SAP/ui5-webcomponents/commit/62c4c20))


### Features

* **ui5-calendar:** show months and years from both primary and secon… ([#5412](https://github.com/SAP/ui5-webcomponents/issues/5412)) ([d5dc7ec](https://github.com/SAP/ui5-webcomponents/commit/d5dc7ec))
* **ui5-panel:** remove header when not used ([#5513](https://github.com/SAP/ui5-webcomponents/issues/5513)) ([73757a4](https://github.com/SAP/ui5-webcomponents/commit/73757a4))
* **ui5-radio-button:** add accessibleName property ([#5548](https://github.com/SAP/ui5-webcomponents/issues/5548)) ([967b441](https://github.com/SAP/ui5-webcomponents/commit/967b441)), closes [#5516](https://github.com/SAP/ui5-webcomponents/issues/5516)





# [1.5.0](https://github.com/SAP/ui5-webcomponents/compare/v1.4.0...v1.5.0) (2022-07-03)


### Bug Fixes

* **formEnablement:** enable required attribute ([#5133](https://github.com/SAP/ui5-webcomponents/issues/5133)) ([ff044b0](https://github.com/SAP/ui5-webcomponents/commit/ff044b0)), closes [#3498](https://github.com/SAP/ui5-webcomponents/issues/3498)
* **framework:** correct use of arrow keys for ItemNavigation in RTL ([#5408](https://github.com/SAP/ui5-webcomponents/issues/5408)) ([cec8119](https://github.com/SAP/ui5-webcomponents/commit/cec8119)), closes [#5166](https://github.com/SAP/ui5-webcomponents/issues/5166)
* **ui5-avatar-group:** adapt width calculations in composite layouts ([#5357](https://github.com/SAP/ui5-webcomponents/issues/5357)) ([d176800](https://github.com/SAP/ui5-webcomponents/commit/d176800)), closes [#5333](https://github.com/SAP/ui5-webcomponents/issues/5333)
* **ui5-badge:** correctly detect if default slot is provided ([#5334](https://github.com/SAP/ui5-webcomponents/issues/5334)) ([0dceaf5](https://github.com/SAP/ui5-webcomponents/commit/0dceaf5)), closes [#5328](https://github.com/SAP/ui5-webcomponents/issues/5328)
* **ui5-button:** adjust icon role ([#5355](https://github.com/SAP/ui5-webcomponents/issues/5355)) ([1aac3c5](https://github.com/SAP/ui5-webcomponents/commit/1aac3c5)), closes [#5288](https://github.com/SAP/ui5-webcomponents/issues/5288)
* **ui5-card:** refactor header to avoid nesting interactive elements ([#5301](https://github.com/SAP/ui5-webcomponents/issues/5301)) ([9b33bad](https://github.com/SAP/ui5-webcomponents/commit/9b33bad))
* **ui5-carousel:** correct navigation buttons behavior ([#5302](https://github.com/SAP/ui5-webcomponents/issues/5302)) ([34027cd](https://github.com/SAP/ui5-webcomponents/commit/34027cd)), closes [#5125](https://github.com/SAP/ui5-webcomponents/issues/5125)
* **ui5-checkbox:** correct label color in Horizon ([#5375](https://github.com/SAP/ui5-webcomponents/issues/5375)) ([659cd7f](https://github.com/SAP/ui5-webcomponents/commit/659cd7f)), closes [#5364](https://github.com/SAP/ui5-webcomponents/issues/5364)
* **ui5-combobox:** change event is now fired on Enter if value is cha… ([#5284](https://github.com/SAP/ui5-webcomponents/issues/5284)) ([b8a4854](https://github.com/SAP/ui5-webcomponents/commit/b8a4854))
* **ui5-combobox, ui5-multi-combobox:** adjust dropdown width according to the visual specification ([#5371](https://github.com/SAP/ui5-webcomponents/issues/5371)) ([e585304](https://github.com/SAP/ui5-webcomponents/commit/e585304))
* **ui5-dialog:** add height to footer and samples achieving fiori footer design ([#5338](https://github.com/SAP/ui5-webcomponents/issues/5338)) ([03269f4](https://github.com/SAP/ui5-webcomponents/commit/03269f4))
* **ui5-dialog:** improved shrinking dialog when resizing ([#5291](https://github.com/SAP/ui5-webcomponents/issues/5291)) ([997f2a2](https://github.com/SAP/ui5-webcomponents/commit/997f2a2)), closes [#5265](https://github.com/SAP/ui5-webcomponents/issues/5265)
* **ui5-dialog:** make header text bold ([#5266](https://github.com/SAP/ui5-webcomponents/issues/5266)) ([42c0cbe](https://github.com/SAP/ui5-webcomponents/commit/42c0cbe)), closes [#5230](https://github.com/SAP/ui5-webcomponents/issues/5230)
* **ui5-dialog:** reposition on screen resize ([#5283](https://github.com/SAP/ui5-webcomponents/issues/5283)) ([c2341e8](https://github.com/SAP/ui5-webcomponents/commit/c2341e8))
* **ui5-input:** fix typeahead on mobile devices ([#5292](https://github.com/SAP/ui5-webcomponents/issues/5292)) ([edcdd24](https://github.com/SAP/ui5-webcomponents/commit/edcdd24))
* **ui5-input:** refactor change event ([#5296](https://github.com/SAP/ui5-webcomponents/issues/5296)) ([17465e3](https://github.com/SAP/ui5-webcomponents/commit/17465e3))
* **ui5-li:** correct accessible-name mappings ([#5280](https://github.com/SAP/ui5-webcomponents/issues/5280)) ([21ed1ee](https://github.com/SAP/ui5-webcomponents/commit/21ed1ee))
* **ui5-link:** enable overstyling ([#5366](https://github.com/SAP/ui5-webcomponents/issues/5366)) ([a359ebf](https://github.com/SAP/ui5-webcomponents/commit/a359ebf)), closes [#5267](https://github.com/SAP/ui5-webcomponents/issues/5267) [#5218](https://github.com/SAP/ui5-webcomponents/issues/5218)
* **ui5-panel:** set pointer cursor only over the header ([#5275](https://github.com/SAP/ui5-webcomponents/issues/5275)) ([04c23b9](https://github.com/SAP/ui5-webcomponents/commit/04c23b9))
* **ui5-popover:** avoid dangling aria-labelledby attribute ([#5428](https://github.com/SAP/ui5-webcomponents/issues/5428)) ([21d5457](https://github.com/SAP/ui5-webcomponents/commit/21d5457)), closes [#3956](https://github.com/SAP/ui5-webcomponents/issues/3956)
* **ui5-rating-indicator:** apply correct styles for focus in HC themes ([#5289](https://github.com/SAP/ui5-webcomponents/issues/5289)) ([4531582](https://github.com/SAP/ui5-webcomponents/commit/4531582))
* **ui5-rating-indicator:** import ui5-icon as used in template ([#5320](https://github.com/SAP/ui5-webcomponents/issues/5320)) ([885e359](https://github.com/SAP/ui5-webcomponents/commit/885e359)), closes [#5318](https://github.com/SAP/ui5-webcomponents/issues/5318)
* **ui5-slider, ui5-range-slider:** adjust padding to spec ([#5343](https://github.com/SAP/ui5-webcomponents/issues/5343)) ([bfbd23f](https://github.com/SAP/ui5-webcomponents/commit/bfbd23f)), closes [#4801](https://github.com/SAP/ui5-webcomponents/issues/4801)
* **ui5-tabcontainer:** make disabled tabs focusable in overflow ([#5300](https://github.com/SAP/ui5-webcomponents/issues/5300)) ([c39917f](https://github.com/SAP/ui5-webcomponents/commit/c39917f))


### Features

* **ui5-datetime-picker:** make change events preventable ([#5286](https://github.com/SAP/ui5-webcomponents/issues/5286)) ([7395dc3](https://github.com/SAP/ui5-webcomponents/commit/7395dc3)), closes [#4684](https://github.com/SAP/ui5-webcomponents/issues/4684) [#5121](https://github.com/SAP/ui5-webcomponents/issues/5121)
* **ui5-link, ui5-breadcrumbs:** add modifiers keys to click event ([#5228](https://github.com/SAP/ui5-webcomponents/issues/5228)) ([379cc7b](https://github.com/SAP/ui5-webcomponents/commit/379cc7b))
* **ui5-multi-combobox:** implement type ahead (autocomplete) ([#5358](https://github.com/SAP/ui5-webcomponents/issues/5358)) ([b8e46f4](https://github.com/SAP/ui5-webcomponents/commit/b8e46f4))
* **ui5-multi-combobox:** introduce grouping functionality ([#5250](https://github.com/SAP/ui5-webcomponents/issues/5250)) ([597a6f2](https://github.com/SAP/ui5-webcomponents/commit/597a6f2))





# [1.4.0](https://github.com/SAP/ui5-webcomponents/compare/v1.3.1...v1.4.0) (2022-05-25)


### Bug Fixes

* **ui5-breadcrumbs:** set aria-current to the focused element ([#5214](https://github.com/SAP/ui5-webcomponents/issues/5214)) ([20d8b83](https://github.com/SAP/ui5-webcomponents/commit/20d8b83))
* **ui5-calendar:** adjust previous and next button styles ([#5226](https://github.com/SAP/ui5-webcomponents/issues/5226)) ([87f6b36](https://github.com/SAP/ui5-webcomponents/commit/87f6b36)), closes [#5117](https://github.com/SAP/ui5-webcomponents/issues/5117)
* **ui5-calendar:** correct month button text localization ([#5246](https://github.com/SAP/ui5-webcomponents/issues/5246)) ([04f2b08](https://github.com/SAP/ui5-webcomponents/commit/04f2b08))
* **ui5-calendar:** fix displayed month name ([#5212](https://github.com/SAP/ui5-webcomponents/issues/5212)) ([b03c3ea](https://github.com/SAP/ui5-webcomponents/commit/b03c3ea))
* **ui5-color-palette:** align buttons to spec ([#5170](https://github.com/SAP/ui5-webcomponents/issues/5170)) ([9f7f382](https://github.com/SAP/ui5-webcomponents/commit/9f7f382)), closes [#4976](https://github.com/SAP/ui5-webcomponents/issues/4976)
* **ui5-color-picker:** align the slider to horizon spec ([#5209](https://github.com/SAP/ui5-webcomponents/issues/5209)) ([fd97a42](https://github.com/SAP/ui5-webcomponents/commit/fd97a42))
* **ui5-color-picker:** provide meaningful labels for the inner input components ([#5217](https://github.com/SAP/ui5-webcomponents/issues/5217)) ([a7de0cd](https://github.com/SAP/ui5-webcomponents/commit/a7de0cd)), closes [#5015](https://github.com/SAP/ui5-webcomponents/issues/5015) [#5023](https://github.com/SAP/ui5-webcomponents/issues/5023)
* **ui5-input:** adjust maxLength property documentation ([#5253](https://github.com/SAP/ui5-webcomponents/issues/5253)) ([0c01d9f](https://github.com/SAP/ui5-webcomponents/commit/0c01d9f))
* **ui5-input:** correct value-state styles in readonly and disabled ([#5208](https://github.com/SAP/ui5-webcomponents/issues/5208)) ([87bea32](https://github.com/SAP/ui5-webcomponents/commit/87bea32))
* **ui5-input:** prevent exception if there are suggestion but property is false ([#5219](https://github.com/SAP/ui5-webcomponents/issues/5219)) ([eb57cef](https://github.com/SAP/ui5-webcomponents/commit/eb57cef))
* **ui5-multi-combobox:** set correct height to items checkboxes ([#5216](https://github.com/SAP/ui5-webcomponents/issues/5216)) ([0946207](https://github.com/SAP/ui5-webcomponents/commit/0946207))
* **ui5-panel:** animate just icon without button ([#5164](https://github.com/SAP/ui5-webcomponents/issues/5164)) ([fe4ce06](https://github.com/SAP/ui5-webcomponents/commit/fe4ce06))
* **ui5-panel:** fix typo in css var name ([#5202](https://github.com/SAP/ui5-webcomponents/issues/5202)) ([854673d](https://github.com/SAP/ui5-webcomponents/commit/854673d)), closes [#5201](https://github.com/SAP/ui5-webcomponents/issues/5201)
* **ui5-rating-indicator:** refactor rating-indicator to use SVG icons ([#5191](https://github.com/SAP/ui5-webcomponents/issues/5191)) ([0782cf7](https://github.com/SAP/ui5-webcomponents/commit/0782cf7))
* **ui5-select:** correct Horizon popover styles ([#5186](https://github.com/SAP/ui5-webcomponents/issues/5186)) ([1c8870b](https://github.com/SAP/ui5-webcomponents/commit/1c8870b)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-select:** correct picker width ([#5240](https://github.com/SAP/ui5-webcomponents/issues/5240)) ([9bd9d24](https://github.com/SAP/ui5-webcomponents/commit/9bd9d24))
* **ui5-select:** select correct item by typing text ([#5252](https://github.com/SAP/ui5-webcomponents/issues/5252)) ([24401b2](https://github.com/SAP/ui5-webcomponents/commit/24401b2))
* **ui5-switch:** adjust additional description announcements ([#4927](https://github.com/SAP/ui5-webcomponents/issues/4927)) ([4fb44e8](https://github.com/SAP/ui5-webcomponents/commit/4fb44e8)), closes [#4887](https://github.com/SAP/ui5-webcomponents/issues/4887)
* **ui5-tabcontainer:** provide unique names for each disabled slot ([#5241](https://github.com/SAP/ui5-webcomponents/issues/5241)) ([3582127](https://github.com/SAP/ui5-webcomponents/commit/3582127)), closes [#5178](https://github.com/SAP/ui5-webcomponents/issues/5178)
* **ui5-table:** adjust colspan value in MultiSelect mode ([#5256](https://github.com/SAP/ui5-webcomponents/issues/5256)) ([405702c](https://github.com/SAP/ui5-webcomponents/commit/405702c))
* **ui5-textarea:** adjust focus outline offset ([#5101](https://github.com/SAP/ui5-webcomponents/issues/5101)) ([cc5c3bd](https://github.com/SAP/ui5-webcomponents/commit/cc5c3bd))
* **ui5-textarea:** adjust placeholder styling ([#5179](https://github.com/SAP/ui5-webcomponents/issues/5179)) ([fab2b61](https://github.com/SAP/ui5-webcomponents/commit/fab2b61))
* **ui5-textarea:** prevent valueState if maxlenght is exceeded ([#5237](https://github.com/SAP/ui5-webcomponents/issues/5237)) ([ed9d74f](https://github.com/SAP/ui5-webcomponents/commit/ed9d74f))
* fix passive listeners for mobile ([#5153](https://github.com/SAP/ui5-webcomponents/issues/5153)) ([3ffec52](https://github.com/SAP/ui5-webcomponents/commit/3ffec52))


### Features

* **inputs:** adjust dropdowns according to Horizon themes specification ([#5054](https://github.com/SAP/ui5-webcomponents/issues/5054)) ([7884022](https://github.com/SAP/ui5-webcomponents/commit/7884022))
* **u5-badge:** implement SAP Horizon theme family ([#5143](https://github.com/SAP/ui5-webcomponents/issues/5143)) ([74470fe](https://github.com/SAP/ui5-webcomponents/commit/74470fe)), closes [#5006](https://github.com/SAP/ui5-webcomponents/issues/5006)
* **ui5-avatar-group:** implement Horizon theme ([#5171](https://github.com/SAP/ui5-webcomponents/issues/5171)) ([78298af](https://github.com/SAP/ui5-webcomponents/commit/78298af)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-breadcrumbs:** implement Horizon theme ([#5066](https://github.com/SAP/ui5-webcomponents/issues/5066)) ([34c9d91](https://github.com/SAP/ui5-webcomponents/commit/34c9d91)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-calendar:** embed new horizon theme changes ([#5099](https://github.com/SAP/ui5-webcomponents/issues/5099)) ([b6f02e4](https://github.com/SAP/ui5-webcomponents/commit/b6f02e4))
* **ui5-carousel:** implement SAP Horizon theme family ([#5061](https://github.com/SAP/ui5-webcomponents/issues/5061)) ([ad1ea9f](https://github.com/SAP/ui5-webcomponents/commit/ad1ea9f))
* **ui5-color-palette:** implement Horizon theme ([#5149](https://github.com/SAP/ui5-webcomponents/issues/5149)) ([357e0d5](https://github.com/SAP/ui5-webcomponents/commit/357e0d5))
* **ui5-color-picker:** implement horizon themes ([#5139](https://github.com/SAP/ui5-webcomponents/issues/5139)) ([4c561fa](https://github.com/SAP/ui5-webcomponents/commit/4c561fa))
* **ui5-file-uploader:** implement SAP Horizon theme parameters ([#5086](https://github.com/SAP/ui5-webcomponents/issues/5086)) ([aff0af9](https://github.com/SAP/ui5-webcomponents/commit/aff0af9))
* **ui5-input:** implement type ahead (autocomplete) ([#5211](https://github.com/SAP/ui5-webcomponents/issues/5211)) ([ec44888](https://github.com/SAP/ui5-webcomponents/commit/ec44888))
* **ui5-list:** implement Horizon theme ([#5057](https://github.com/SAP/ui5-webcomponents/issues/5057)) ([27f8ea6](https://github.com/SAP/ui5-webcomponents/commit/27f8ea6)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-menu:** implement Horizon theme ([#5132](https://github.com/SAP/ui5-webcomponents/issues/5132)) ([26075fe](https://github.com/SAP/ui5-webcomponents/commit/26075fe))
* **ui5-multi-combobox:** add "accessibleName" and "accessibleNameRef" properties ([#5187](https://github.com/SAP/ui5-webcomponents/issues/5187)) ([0d80a2c](https://github.com/SAP/ui5-webcomponents/commit/0d80a2c))
* **ui5-progress-indicator:** implement Horizon theme ([#5140](https://github.com/SAP/ui5-webcomponents/issues/5140)) ([e1655c4](https://github.com/SAP/ui5-webcomponents/commit/e1655c4)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-rating-indicator:** implement small icons for readonly and disabled ([#5233](https://github.com/SAP/ui5-webcomponents/issues/5233)) ([405a598](https://github.com/SAP/ui5-webcomponents/commit/405a598))
* **ui5-side-navigation:** implement SAP Horizon theme family ([#5081](https://github.com/SAP/ui5-webcomponents/issues/5081)) ([d8d9315](https://github.com/SAP/ui5-webcomponents/commit/d8d9315)), closes [#5006](https://github.com/SAP/ui5-webcomponents/issues/5006)
* **ui5-sliderbase:** implements Horizon theme ([#5114](https://github.com/SAP/ui5-webcomponents/issues/5114)) ([9b2c705](https://github.com/SAP/ui5-webcomponents/commit/9b2c705))
* **ui5-switch:** embed new horizon theme changes ([#5017](https://github.com/SAP/ui5-webcomponents/issues/5017)) ([73994e1](https://github.com/SAP/ui5-webcomponents/commit/73994e1))
* **ui5-tabcontainer:** enable semantic icons in high contrast themes ([#5124](https://github.com/SAP/ui5-webcomponents/issues/5124)) ([3a13acf](https://github.com/SAP/ui5-webcomponents/commit/3a13acf)), closes [#2540](https://github.com/SAP/ui5-webcomponents/issues/2540)
* **ui5-token:** implement Horizon themes ([#5068](https://github.com/SAP/ui5-webcomponents/issues/5068)) ([0d1b124](https://github.com/SAP/ui5-webcomponents/commit/0d1b124))





## [1.3.1](https://github.com/SAP/ui5-webcomponents/compare/v1.3.0...v1.3.1) (2022-04-27)

**Note:** Version bump only for package @ui5/webcomponents





# [1.3.0](https://github.com/SAP/ui5-webcomponents/compare/v1.2.4...v1.3.0) (2022-04-19)


### Bug Fixes

* **ui5-avatar:** align to latest sap_horizon specification ([#4951](https://github.com/SAP/ui5-webcomponents/issues/4951)) ([80c1f42](https://github.com/SAP/ui5-webcomponents/commit/80c1f42))
* **ui5-avatar:** wrong border-radius ([#4877](https://github.com/SAP/ui5-webcomponents/issues/4877)) ([cb9f55f](https://github.com/SAP/ui5-webcomponents/commit/cb9f55f)), closes [#4873](https://github.com/SAP/ui5-webcomponents/issues/4873)
* **ui5-card-header:** prevent events from action slot to trigger header's click event ([#4965](https://github.com/SAP/ui5-webcomponents/issues/4965)) ([547ce9e](https://github.com/SAP/ui5-webcomponents/commit/547ce9e)), closes [#4891](https://github.com/SAP/ui5-webcomponents/issues/4891)
* **ui5-checkbox:** align to latest sap_horizon specification ([#4972](https://github.com/SAP/ui5-webcomponents/issues/4972)) ([be9e6bc](https://github.com/SAP/ui5-webcomponents/commit/be9e6bc))
* **ui5-color-palette:** Adapt components with responsive paddings ([#4985](https://github.com/SAP/ui5-webcomponents/issues/4985)) ([9de7198](https://github.com/SAP/ui5-webcomponents/commit/9de7198)), closes [#4869](https://github.com/SAP/ui5-webcomponents/issues/4869)
* **ui5-color-picker:** fix RTL visual issues ([#4966](https://github.com/SAP/ui5-webcomponents/issues/4966)) ([ae76500](https://github.com/SAP/ui5-webcomponents/commit/ae76500)), closes [#4892](https://github.com/SAP/ui5-webcomponents/issues/4892)
* **ui5-combobox:** disable autocomplete on Android ([#5088](https://github.com/SAP/ui5-webcomponents/issues/5088)) ([7353188](https://github.com/SAP/ui5-webcomponents/commit/7353188))
* **ui5-date-picker:** adjust initial value formatting ([#4967](https://github.com/SAP/ui5-webcomponents/issues/4967)) ([304e73b](https://github.com/SAP/ui5-webcomponents/commit/304e73b)), closes [#4958](https://github.com/SAP/ui5-webcomponents/issues/4958) [#4958](https://github.com/SAP/ui5-webcomponents/issues/4958)
* **ui5-date-picker:** handle date selection via enter keyboard key ([#4863](https://github.com/SAP/ui5-webcomponents/issues/4863)) ([fc2cec0](https://github.com/SAP/ui5-webcomponents/commit/fc2cec0)), closes [#4826](https://github.com/SAP/ui5-webcomponents/issues/4826)
* **ui5-date-picker:** remove aria-expanded attribute ([#4866](https://github.com/SAP/ui5-webcomponents/issues/4866)) ([381c884](https://github.com/SAP/ui5-webcomponents/commit/381c884)), closes [#4865](https://github.com/SAP/ui5-webcomponents/issues/4865)
* **ui5-date-picker:** remove timezone test ([#4829](https://github.com/SAP/ui5-webcomponents/issues/4829)) ([14552cf](https://github.com/SAP/ui5-webcomponents/commit/14552cf))
* **ui5-date*-picker:** adjust the date and time pickers accessibility attributes ([#4996](https://github.com/SAP/ui5-webcomponents/issues/4996)) ([229efcc](https://github.com/SAP/ui5-webcomponents/commit/229efcc)), closes [#4946](https://github.com/SAP/ui5-webcomponents/issues/4946)
* **ui5-datetime-picker:** Adapt components with responsive paddings ([#4977](https://github.com/SAP/ui5-webcomponents/issues/4977)) ([6c5e516](https://github.com/SAP/ui5-webcomponents/commit/6c5e516)), closes [#4869](https://github.com/SAP/ui5-webcomponents/issues/4869)
* **ui5-datetime-picker:** enable secondary calendar type ([#4970](https://github.com/SAP/ui5-webcomponents/issues/4970)) ([6a096cb](https://github.com/SAP/ui5-webcomponents/commit/6a096cb)), closes [#4959](https://github.com/SAP/ui5-webcomponents/issues/4959)
* **ui5-input:** activeElement is now correct in case of nested components ([#5005](https://github.com/SAP/ui5-webcomponents/issues/5005)) ([199d974](https://github.com/SAP/ui5-webcomponents/commit/199d974))
* **ui5-label:** prevent screenreader announcement of colon and asterisk ([#5072](https://github.com/SAP/ui5-webcomponents/issues/5072)) ([b5d5a3f](https://github.com/SAP/ui5-webcomponents/commit/b5d5a3f)), closes [#4830](https://github.com/SAP/ui5-webcomponents/issues/4830)
* **ui5-li:** correct focus handling ([#4935](https://github.com/SAP/ui5-webcomponents/issues/4935)) ([2b82342](https://github.com/SAP/ui5-webcomponents/commit/2b82342))
* **ui5-link:** remove double click event ([#5038](https://github.com/SAP/ui5-webcomponents/issues/5038)) ([4b95bc8](https://github.com/SAP/ui5-webcomponents/commit/4b95bc8)), closes [#4963](https://github.com/SAP/ui5-webcomponents/issues/4963) [#4963](https://github.com/SAP/ui5-webcomponents/issues/4963)
* **ui5-list:** correct keyboard handling ([#4890](https://github.com/SAP/ui5-webcomponents/issues/4890)) ([8c27355](https://github.com/SAP/ui5-webcomponents/commit/8c27355))
* **ui5-multi-combobox:** display placeholder consistently ([#4920](https://github.com/SAP/ui5-webcomponents/issues/4920)) ([359d1a3](https://github.com/SAP/ui5-webcomponents/commit/359d1a3)), closes [#4897](https://github.com/SAP/ui5-webcomponents/issues/4897)
* **ui5-multi-input:** correct header paddings in nMore popover ([#5040](https://github.com/SAP/ui5-webcomponents/issues/5040)) ([b06d608](https://github.com/SAP/ui5-webcomponents/commit/b06d608))
* **ui5-multi-input:** improve backspace and home handling ([#4646](https://github.com/SAP/ui5-webcomponents/issues/4646)) ([fa2a700](https://github.com/SAP/ui5-webcomponents/commit/fa2a700))
* **ui5-popover:** fix auto close when opener is outside the viewport ([#4847](https://github.com/SAP/ui5-webcomponents/issues/4847)) ([c944efd](https://github.com/SAP/ui5-webcomponents/commit/c944efd)), closes [#4716](https://github.com/SAP/ui5-webcomponents/issues/4716)
* **ui5-popover:** prevent arrow placement over popover's rounded corners ([#4960](https://github.com/SAP/ui5-webcomponents/issues/4960)) ([994871d](https://github.com/SAP/ui5-webcomponents/commit/994871d)), closes [#4599](https://github.com/SAP/ui5-webcomponents/issues/4599) [#4797](https://github.com/SAP/ui5-webcomponents/issues/4797)
* **ui5-responsive-popover:** allow opening a popover from component ([#5070](https://github.com/SAP/ui5-webcomponents/issues/5070)) ([241a112](https://github.com/SAP/ui5-webcomponents/commit/241a112)), closes [#5028](https://github.com/SAP/ui5-webcomponents/issues/5028)
* **ui5-tabcontainer:** add missing dependency in Tab ([#5069](https://github.com/SAP/ui5-webcomponents/issues/5069)) ([b03c56b](https://github.com/SAP/ui5-webcomponents/commit/b03c56b)), closes [#5037](https://github.com/SAP/ui5-webcomponents/issues/5037)
* make listeners passive ([#5012](https://github.com/SAP/ui5-webcomponents/issues/5012)) ([30f2dc7](https://github.com/SAP/ui5-webcomponents/commit/30f2dc7))
* **ui5-step-input:** align the min width to visual specification ([#4884](https://github.com/SAP/ui5-webcomponents/issues/4884)) ([197fef1](https://github.com/SAP/ui5-webcomponents/commit/197fef1)), closes [#4786](https://github.com/SAP/ui5-webcomponents/issues/4786)
* **ui5-tabcontainer:** fix overflow button visibility ([#4836](https://github.com/SAP/ui5-webcomponents/issues/4836)) ([8e67748](https://github.com/SAP/ui5-webcomponents/commit/8e67748)), closes [#4690](https://github.com/SAP/ui5-webcomponents/issues/4690)
* **ui5-time-picker:** firing change event after input change submit ([#4962](https://github.com/SAP/ui5-webcomponents/issues/4962)) ([2e3f428](https://github.com/SAP/ui5-webcomponents/commit/2e3f428)), closes [#4918](https://github.com/SAP/ui5-webcomponents/issues/4918)
* correct responsive padding in some consumers of popups ([#4926](https://github.com/SAP/ui5-webcomponents/issues/4926)) ([b501153](https://github.com/SAP/ui5-webcomponents/commit/b501153)), closes [#4870](https://github.com/SAP/ui5-webcomponents/issues/4870)
* **ui5-view-settings-dialog:** adjust scrollbar behavior  ([#4795](https://github.com/SAP/ui5-webcomponents/issues/4795)) ([8f58fd5](https://github.com/SAP/ui5-webcomponents/commit/8f58fd5)), closes [#4724](https://github.com/SAP/ui5-webcomponents/issues/4724) [#4725](https://github.com/SAP/ui5-webcomponents/issues/4725) [#4860](https://github.com/SAP/ui5-webcomponents/issues/4860)
* **ui5-view-settings-dialog:** fixing comments from previous commit ([#4851](https://github.com/SAP/ui5-webcomponents/issues/4851)) ([3fc5814](https://github.com/SAP/ui5-webcomponents/commit/3fc5814))


### Features

* **inputs:** SAP Horizon themes implementation ([#5003](https://github.com/SAP/ui5-webcomponents/issues/5003)) ([26aff35](https://github.com/SAP/ui5-webcomponents/commit/26aff35))
* **ui5-breadcrumbs:** add position numbering scheme "x of y" ([#4703](https://github.com/SAP/ui5-webcomponents/issues/4703)) ([35e2c96](https://github.com/SAP/ui5-webcomponents/commit/35e2c96))
* **ui5-button:** Implement SAP Horizon theme parameters ([#4912](https://github.com/SAP/ui5-webcomponents/issues/4912)) ([43761ad](https://github.com/SAP/ui5-webcomponents/commit/43761ad))
* **ui5-card:** implement SAP Horizon theme family ([#4974](https://github.com/SAP/ui5-webcomponents/issues/4974)) ([0137225](https://github.com/SAP/ui5-webcomponents/commit/0137225)), closes [#5006](https://github.com/SAP/ui5-webcomponents/issues/5006)
* **ui5-checkbox:** implement required property ([#5055](https://github.com/SAP/ui5-webcomponents/issues/5055)) ([d6a56cb](https://github.com/SAP/ui5-webcomponents/commit/d6a56cb)), closes [#4895](https://github.com/SAP/ui5-webcomponents/issues/4895)
* **ui5-dialog:** set horizon themes parameters ([#4925](https://github.com/SAP/ui5-webcomponents/issues/4925)) ([1f3d212](https://github.com/SAP/ui5-webcomponents/commit/1f3d212))
* **ui5-icon:** implement Horizon theme ([#5080](https://github.com/SAP/ui5-webcomponents/issues/5080)) ([6db8956](https://github.com/SAP/ui5-webcomponents/commit/6db8956)), closes [#5008](https://github.com/SAP/ui5-webcomponents/issues/5008)
* **ui5-input:** introduce openPicker() functionality ([#4971](https://github.com/SAP/ui5-webcomponents/issues/4971)) ([7e08a75](https://github.com/SAP/ui5-webcomponents/commit/7e08a75))
* **ui5-link:** Implement SAP Horizon theme parameters ([#5011](https://github.com/SAP/ui5-webcomponents/issues/5011)) ([ee44117](https://github.com/SAP/ui5-webcomponents/commit/ee44117))
* **ui5-menu:** Initial implementation ([#4742](https://github.com/SAP/ui5-webcomponents/issues/4742)) ([deac309](https://github.com/SAP/ui5-webcomponents/commit/deac309))
* **ui5-message-strip:** apply SAP Horizon parameters ([#4941](https://github.com/SAP/ui5-webcomponents/issues/4941)) ([8919965](https://github.com/SAP/ui5-webcomponents/commit/8919965))
* **ui5-multi-combobox:** Add cut/copy & paste handling ([#4854](https://github.com/SAP/ui5-webcomponents/issues/4854)) ([18c5912](https://github.com/SAP/ui5-webcomponents/commit/18c5912))
* **ui5-multi-combobox:** Improve F4/Alt+Down focus handling ([#4825](https://github.com/SAP/ui5-webcomponents/issues/4825)) ([01b56f3](https://github.com/SAP/ui5-webcomponents/commit/01b56f3))
* **ui5-multi-combobox, ui5-tokenizer:**  Handle 'Space' key combinations ([#4817](https://github.com/SAP/ui5-webcomponents/issues/4817)) ([0fbe1e1](https://github.com/SAP/ui5-webcomponents/commit/0fbe1e1))
* **ui5-multi-combobox, ui5-tokenizer:** Complete arrow navigation functionality ([#4784](https://github.com/SAP/ui5-webcomponents/issues/4784)) ([25cc16c](https://github.com/SAP/ui5-webcomponents/commit/25cc16c))
* **ui5-option:** add additional-text property ([#5065](https://github.com/SAP/ui5-webcomponents/issues/5065)) ([84d9f5f](https://github.com/SAP/ui5-webcomponents/commit/84d9f5f)), closes [#4999](https://github.com/SAP/ui5-webcomponents/issues/4999) [#4999](https://github.com/SAP/ui5-webcomponents/issues/4999)
* **ui5-panel:** implement SAP Horizon themes ([#5058](https://github.com/SAP/ui5-webcomponents/issues/5058)) ([67565d5](https://github.com/SAP/ui5-webcomponents/commit/67565d5)), closes [#5007](https://github.com/SAP/ui5-webcomponents/issues/5007)
* **ui5-radio-button:** implement new value states - Success and Information and implement Horizon theme ([#4913](https://github.com/SAP/ui5-webcomponents/issues/4913)) ([c85ad95](https://github.com/SAP/ui5-webcomponents/commit/c85ad95))
* **ui5-select:** add aria-roledescription attribute ([#4921](https://github.com/SAP/ui5-webcomponents/issues/4921)) ([e19a914](https://github.com/SAP/ui5-webcomponents/commit/e19a914)), closes [#2910](https://github.com/SAP/ui5-webcomponents/issues/2910)
* **ui5-tabcontainer:** enable nested tabs ([#4705](https://github.com/SAP/ui5-webcomponents/issues/4705)) ([3e715c4](https://github.com/SAP/ui5-webcomponents/commit/3e715c4))
* **ui5-tabcontainer:** implement SAP Horizon theme family ([#4981](https://github.com/SAP/ui5-webcomponents/issues/4981)) ([0b90287](https://github.com/SAP/ui5-webcomponents/commit/0b90287))
* **ui5-table:** Add 'accessibleName' and 'accessibleNameRef' properties ([#4994](https://github.com/SAP/ui5-webcomponents/issues/4994)) ([a4ef3cb](https://github.com/SAP/ui5-webcomponents/commit/a4ef3cb))
* **ui5-table:** implement SAP Horizon themes ([#4992](https://github.com/SAP/ui5-webcomponents/issues/4992)) ([5c2a056](https://github.com/SAP/ui5-webcomponents/commit/5c2a056)), closes [#4938](https://github.com/SAP/ui5-webcomponents/issues/4938)
* **ui5-textarea:** Horizon themes implementation ([#5018](https://github.com/SAP/ui5-webcomponents/issues/5018)) ([f5d56e2](https://github.com/SAP/ui5-webcomponents/commit/f5d56e2))
* **ui5-toast:** implement SAP Horizon Dark and HC themes ([#4864](https://github.com/SAP/ui5-webcomponents/issues/4864)) ([346fa64](https://github.com/SAP/ui5-webcomponents/commit/346fa64))





## [1.2.4](https://github.com/SAP/ui5-webcomponents/compare/v1.2.3...v1.2.4) (2022-03-30)


### Bug Fixes

* **ui5-card-header:** prevent events from action slot to trigger header's click event ([#4965](https://github.com/SAP/ui5-webcomponents/issues/4965)) ([f87d898](https://github.com/SAP/ui5-webcomponents/commit/f87d898)), closes [#4891](https://github.com/SAP/ui5-webcomponents/issues/4891)
* **ui5-date-picker:** adjust initial value formatting ([#4967](https://github.com/SAP/ui5-webcomponents/issues/4967)) ([3648b01](https://github.com/SAP/ui5-webcomponents/commit/3648b01)), closes [#4958](https://github.com/SAP/ui5-webcomponents/issues/4958) [#4958](https://github.com/SAP/ui5-webcomponents/issues/4958)
* **ui5-datetime-picker:** enable secondary calendar type ([#4970](https://github.com/SAP/ui5-webcomponents/issues/4970)) ([6bc84f7](https://github.com/SAP/ui5-webcomponents/commit/6bc84f7)), closes [#4959](https://github.com/SAP/ui5-webcomponents/issues/4959)
* **ui5-popover:** prevent arrow placement over popover's rounded corners ([#4960](https://github.com/SAP/ui5-webcomponents/issues/4960)) ([66604c3](https://github.com/SAP/ui5-webcomponents/commit/66604c3)), closes [#4599](https://github.com/SAP/ui5-webcomponents/issues/4599) [#4797](https://github.com/SAP/ui5-webcomponents/issues/4797)





## [1.2.3](https://github.com/SAP/ui5-webcomponents/compare/v1.2.2...v1.2.3) (2022-03-23)


### Bug Fixes

* **ui5-date-picker:** remove aria-expanded attribute ([#4866](https://github.com/SAP/ui5-webcomponents/issues/4866)) ([b62a0e9](https://github.com/SAP/ui5-webcomponents/commit/b62a0e9)), closes [#4865](https://github.com/SAP/ui5-webcomponents/issues/4865)





## [1.2.2](https://github.com/SAP/ui5-webcomponents/compare/v1.2.1...v1.2.2) (2022-03-22)


### Bug Fixes

* **ui5-li:** correct focus handling ([#4935](https://github.com/SAP/ui5-webcomponents/issues/4935)) ([1fdf415](https://github.com/SAP/ui5-webcomponents/commit/1fdf415))


### Features

* **ui5-select:** add aria-roledescription attribute ([#4921](https://github.com/SAP/ui5-webcomponents/issues/4921)) ([e4fa811](https://github.com/SAP/ui5-webcomponents/commit/e4fa811)), closes [#2910](https://github.com/SAP/ui5-webcomponents/issues/2910)





## [1.2.1](https://github.com/SAP/ui5-webcomponents/compare/v1.2.0...v1.2.1) (2022-03-02)


### Bug Fixes

* **ui5-multi-combobox:** Prevent scrolling on page up/down ([#4835](https://github.com/SAP/ui5-webcomponents/issues/4835)) ([6c85e8d](https://github.com/SAP/ui5-webcomponents/commit/6c85e8d))
* **ui5-responsive-popover:** fix auto close during re-rendering ([#4828](https://github.com/SAP/ui5-webcomponents/issues/4828)) ([5859ce7](https://github.com/SAP/ui5-webcomponents/commit/5859ce7)), closes [#4816](https://github.com/SAP/ui5-webcomponents/issues/4816)
* **ui5-segmented-button-item:** adopt inherited `tooltip` property ([#4843](https://github.com/SAP/ui5-webcomponents/issues/4843)) ([b04db63](https://github.com/SAP/ui5-webcomponents/commit/b04db63)), closes [#4840](https://github.com/SAP/ui5-webcomponents/issues/4840)


### Features

* **ui5-multi-combobox, ui5-tokenizer:** Full Home/End implementation ([#4796](https://github.com/SAP/ui5-webcomponents/issues/4796)) ([8d83d33](https://github.com/SAP/ui5-webcomponents/commit/8d83d33))





# [1.2.0](https://github.com/SAP/ui5-webcomponents/compare/v1.1.2...v1.2.0) (2022-02-28)


### Bug Fixes

* correct scoping issues with several components ([#4820](https://github.com/SAP/ui5-webcomponents/issues/4820)) ([621dc20](https://github.com/SAP/ui5-webcomponents/commit/621dc20))
* **inputs:** import used icons ([#4712](https://github.com/SAP/ui5-webcomponents/issues/4712)) ([2041ff3](https://github.com/SAP/ui5-webcomponents/commit/2041ff3))
* **popovers:** correct list items height of input dropdowns ([#4650](https://github.com/SAP/ui5-webcomponents/issues/4650)) ([11f8ada](https://github.com/SAP/ui5-webcomponents/commit/11f8ada)), closes [#4616](https://github.com/SAP/ui5-webcomponents/issues/4616)
* **templates:** replace HTML comments with HBS ones ([#4681](https://github.com/SAP/ui5-webcomponents/issues/4681)) ([ddc38eb](https://github.com/SAP/ui5-webcomponents/commit/ddc38eb)), closes [/github.com/SAP/ui5-webcomponents/blob/master/packages/tools/lib/hbs2lit/src/partialsVisitor.js#L95](https://github.com//github.com/SAP/ui5-webcomponents/blob/master/packages/tools/lib/hbs2lit/src/partialsVisitor.js/issues/L95)
* **ui5-badge:** update color-scheme parameters ([#4678](https://github.com/SAP/ui5-webcomponents/issues/4678)) ([c7d75ef](https://github.com/SAP/ui5-webcomponents/commit/c7d75ef)), closes [#3940](https://github.com/SAP/ui5-webcomponents/issues/3940)
* **ui5-button:** remove focus on phone and tablet ([#4746](https://github.com/SAP/ui5-webcomponents/issues/4746)) ([31915d7](https://github.com/SAP/ui5-webcomponents/commit/31915d7))
* **ui5-calendar:** adjust picker styles ([#4672](https://github.com/SAP/ui5-webcomponents/issues/4672)) ([3afe7a8](https://github.com/SAP/ui5-webcomponents/commit/3afe7a8))
* **ui5-color-palette-popover:** showDefaultColor works ([#4802](https://github.com/SAP/ui5-webcomponents/issues/4802)) ([f93f22f](https://github.com/SAP/ui5-webcomponents/commit/f93f22f))
* **ui5-color-palette-popover:** update documentation ([#4778](https://github.com/SAP/ui5-webcomponents/issues/4778)) ([34f629e](https://github.com/SAP/ui5-webcomponents/commit/34f629e))
* **ui5-color-picker:** adjust hue value update when user presses over the main color section ([#4601](https://github.com/SAP/ui5-webcomponents/issues/4601)) ([4b03374](https://github.com/SAP/ui5-webcomponents/commit/4b03374)), closes [#4540](https://github.com/SAP/ui5-webcomponents/issues/4540)
* **ui5-color-picker:** enable hex value input change on enter ([#4621](https://github.com/SAP/ui5-webcomponents/issues/4621)) ([cf45552](https://github.com/SAP/ui5-webcomponents/commit/cf45552)), closes [#4541](https://github.com/SAP/ui5-webcomponents/issues/4541)
* **ui5-combobox:** prevent dropdown closing on scroll ([#4773](https://github.com/SAP/ui5-webcomponents/issues/4773)) ([199e860](https://github.com/SAP/ui5-webcomponents/commit/199e860))
* **ui5-date-picker:** remove combobox role ([#4706](https://github.com/SAP/ui5-webcomponents/issues/4706)) ([2d457c9](https://github.com/SAP/ui5-webcomponents/commit/2d457c9))
* **ui5-daterange-picker:** change delimiter dynamically ([#4693](https://github.com/SAP/ui5-webcomponents/issues/4693)) ([ec02855](https://github.com/SAP/ui5-webcomponents/commit/ec02855)), closes [#2925](https://github.com/SAP/ui5-webcomponents/issues/2925)
* **ui5-file-uploader:** fixing the console warning ([#4605](https://github.com/SAP/ui5-webcomponents/issues/4605)) ([197f3f9](https://github.com/SAP/ui5-webcomponents/commit/197f3f9)), closes [#4592](https://github.com/SAP/ui5-webcomponents/issues/4592)
* **ui5-input:** aria-invalid is now properly rendered ([#4734](https://github.com/SAP/ui5-webcomponents/issues/4734)) ([81a00d7](https://github.com/SAP/ui5-webcomponents/commit/81a00d7)), closes [#4723](https://github.com/SAP/ui5-webcomponents/issues/4723)
* **ui5-input:** delete whole value of ui5-input with type number when… ([#4760](https://github.com/SAP/ui5-webcomponents/issues/4760)) ([0aa9979](https://github.com/SAP/ui5-webcomponents/commit/0aa9979))
* **ui5-input:** improve lazy loading behaviour ([#4763](https://github.com/SAP/ui5-webcomponents/issues/4763)) ([35342be](https://github.com/SAP/ui5-webcomponents/commit/35342be))
* **ui5-label:** allow focusing elements linked with for attribute inside a shadow root ([#4754](https://github.com/SAP/ui5-webcomponents/issues/4754)) ([bd7a8a1](https://github.com/SAP/ui5-webcomponents/commit/bd7a8a1)), closes [#4751](https://github.com/SAP/ui5-webcomponents/issues/4751)
* **ui5-li-tree:** correct usage of i18nBudnle ([#4668](https://github.com/SAP/ui5-webcomponents/issues/4668)) ([67848d7](https://github.com/SAP/ui5-webcomponents/commit/67848d7))
* **ui5-list:** fix separators in SAP Horizon ([#4805](https://github.com/SAP/ui5-webcomponents/issues/4805)) ([6a814b3](https://github.com/SAP/ui5-webcomponents/commit/6a814b3))
* **ui5-list:** initial focus target ([#4809](https://github.com/SAP/ui5-webcomponents/issues/4809)) ([cf6dd1a](https://github.com/SAP/ui5-webcomponents/commit/cf6dd1a))
* **ui5-multi-combobox:** add value selection on focus ([#4804](https://github.com/SAP/ui5-webcomponents/issues/4804)) ([08ea794](https://github.com/SAP/ui5-webcomponents/commit/08ea794))
* **ui5-popup:** body styles are no longer modified  ([#4813](https://github.com/SAP/ui5-webcomponents/issues/4813)) ([1754496](https://github.com/SAP/ui5-webcomponents/commit/1754496)), closes [#4347](https://github.com/SAP/ui5-webcomponents/issues/4347)
* **ui5-popup:** Usage of parts in Dialog, Popover, ResponsivePopover and TabContainer documented ([#4747](https://github.com/SAP/ui5-webcomponents/issues/4747)) ([f93909c](https://github.com/SAP/ui5-webcomponents/commit/f93909c)), closes [#4402](https://github.com/SAP/ui5-webcomponents/issues/4402)
* **ui5-select:** incorrect popover styles when value state is used ([#4651](https://github.com/SAP/ui5-webcomponents/issues/4651)) ([2d8ce46](https://github.com/SAP/ui5-webcomponents/commit/2d8ce46))
* **ui5-slider:** prevent handle's jumping on focus ([#4752](https://github.com/SAP/ui5-webcomponents/issues/4752)) ([dc2de5b](https://github.com/SAP/ui5-webcomponents/commit/dc2de5b))
* **ui5-slider:** sets correct color to tickmarks based on theme ([#4677](https://github.com/SAP/ui5-webcomponents/issues/4677)) ([4aecd48](https://github.com/SAP/ui5-webcomponents/commit/4aecd48))
* **ui5-switch:** adjust focus outline ([#4665](https://github.com/SAP/ui5-webcomponents/issues/4665)) ([0cb6580](https://github.com/SAP/ui5-webcomponents/commit/0cb6580)), closes [#2925](https://github.com/SAP/ui5-webcomponents/issues/2925)
* **ui5-switch:** role checkbox is changed to role switch ([#4658](https://github.com/SAP/ui5-webcomponents/issues/4658)) ([ec6ca80](https://github.com/SAP/ui5-webcomponents/commit/ec6ca80)), closes [#4633](https://github.com/SAP/ui5-webcomponents/issues/4633)
* **ui5-tabcontainer:** await for renderFinished in resize handler ([#4675](https://github.com/SAP/ui5-webcomponents/issues/4675)) ([cd8dc26](https://github.com/SAP/ui5-webcomponents/commit/cd8dc26)), closes [#4628](https://github.com/SAP/ui5-webcomponents/issues/4628)
* **ui5-tabcontainer:** fix overflow button runtime error ([#4780](https://github.com/SAP/ui5-webcomponents/issues/4780)) ([08d75fa](https://github.com/SAP/ui5-webcomponents/commit/08d75fa)), closes [#4770](https://github.com/SAP/ui5-webcomponents/issues/4770)
* **ui5-tabcontainer:** replace hardcoded text ([#4815](https://github.com/SAP/ui5-webcomponents/issues/4815)) ([439033c](https://github.com/SAP/ui5-webcomponents/commit/439033c)), closes [#4810](https://github.com/SAP/ui5-webcomponents/issues/4810)
* describe all dependencies for some components ([#4807](https://github.com/SAP/ui5-webcomponents/issues/4807)) ([1cf148f](https://github.com/SAP/ui5-webcomponents/commit/1cf148f))
* **ui5-table-row:** align checkbox vertically ([#4696](https://github.com/SAP/ui5-webcomponents/issues/4696)) ([62ae8dc](https://github.com/SAP/ui5-webcomponents/commit/62ae8dc))
* **ui5-textarea:** enhance aria-invalid attribute handling ([#4767](https://github.com/SAP/ui5-webcomponents/issues/4767)) ([f2fd6fb](https://github.com/SAP/ui5-webcomponents/commit/f2fd6fb))
* scoped bundles ([#4745](https://github.com/SAP/ui5-webcomponents/issues/4745)) ([2cd4c7e](https://github.com/SAP/ui5-webcomponents/commit/2cd4c7e))
* **ui5-switch:** adjust focus outline ([#4717](https://github.com/SAP/ui5-webcomponents/issues/4717)) ([9d9d6c8](https://github.com/SAP/ui5-webcomponents/commit/9d9d6c8))


### Features

* add and update icons from 4.13 and 5.01 icon fonts  ([#4790](https://github.com/SAP/ui5-webcomponents/issues/4790)) ([a9e88f0](https://github.com/SAP/ui5-webcomponents/commit/a9e88f0))
* **popups:** Implement declarative API for open/close ([#4653](https://github.com/SAP/ui5-webcomponents/issues/4653)) ([af70586](https://github.com/SAP/ui5-webcomponents/commit/af70586)), closes [#3527](https://github.com/SAP/ui5-webcomponents/issues/3527)
* **ui5-breadcrumbs:** allow preventDefault in item-click event listener ([#4589](https://github.com/SAP/ui5-webcomponents/issues/4589)) ([ccb4c83](https://github.com/SAP/ui5-webcomponents/commit/ccb4c83))
* **ui5-button:** add new `tooltip` property ([#4737](https://github.com/SAP/ui5-webcomponents/issues/4737)) ([df8f013](https://github.com/SAP/ui5-webcomponents/commit/df8f013)), closes [#4689](https://github.com/SAP/ui5-webcomponents/issues/4689)
* **ui5-button:** implement accessibilityAttributes property ([#4655](https://github.com/SAP/ui5-webcomponents/issues/4655)) ([d27c4b5](https://github.com/SAP/ui5-webcomponents/commit/d27c4b5)), closes [#3546](https://github.com/SAP/ui5-webcomponents/issues/3546)
* **ui5-input:** implement showClearIcon property ([#4641](https://github.com/SAP/ui5-webcomponents/issues/4641)) ([b1c1620](https://github.com/SAP/ui5-webcomponents/commit/b1c1620))
* **ui5-link:** provide accessible-name support ([#4711](https://github.com/SAP/ui5-webcomponents/issues/4711)) ([6597afa](https://github.com/SAP/ui5-webcomponents/commit/6597afa)), closes [#4498](https://github.com/SAP/ui5-webcomponents/issues/4498)
* **ui5-popup:** аdd default responsive paddings ([#4567](https://github.com/SAP/ui5-webcomponents/issues/4567)) ([ddc1e39](https://github.com/SAP/ui5-webcomponents/commit/ddc1e39)), closes [#4402](https://github.com/SAP/ui5-webcomponents/issues/4402)
* **ui5-rating-indicator:** Accessibility enhancements ([#4736](https://github.com/SAP/ui5-webcomponents/issues/4736)) ([f8dc9f0](https://github.com/SAP/ui5-webcomponents/commit/f8dc9f0))
* **ui5-switch:** provide accessible-name attribute support ([#4735](https://github.com/SAP/ui5-webcomponents/issues/4735)) ([ee6819f](https://github.com/SAP/ui5-webcomponents/commit/ee6819f)), closes [#4147](https://github.com/SAP/ui5-webcomponents/issues/4147)
* **ui5-table:** extend keyboard handling ([#4550](https://github.com/SAP/ui5-webcomponents/issues/4550)) ([8daa764](https://github.com/SAP/ui5-webcomponents/commit/8daa764)), closes [#3090](https://github.com/SAP/ui5-webcomponents/issues/3090)
* **ui5-table:** improve keyboard handling ([#4631](https://github.com/SAP/ui5-webcomponents/issues/4631)) ([f1f2b1b](https://github.com/SAP/ui5-webcomponents/commit/f1f2b1b))
* **ui5-tokenizer:** Implement token range deletion ([#4750](https://github.com/SAP/ui5-webcomponents/issues/4750)) ([cece8d7](https://github.com/SAP/ui5-webcomponents/commit/cece8d7))
* **ui5-tree:** make `item-click` event preventable ([#4708](https://github.com/SAP/ui5-webcomponents/issues/4708)) ([29967f0](https://github.com/SAP/ui5-webcomponents/commit/29967f0)), closes [#4502](https://github.com/SAP/ui5-webcomponents/issues/4502)





## [1.1.2](https://github.com/SAP/ui5-webcomponents/compare/v1.1.1...v1.1.2) (2022-01-26)


### Features

* **ui5-multi-input:** Keyboard handling ([#4495](https://github.com/SAP/ui5-webcomponents/issues/4495)) ([b978f4a](https://github.com/SAP/ui5-webcomponents/commit/b978f4a))





## [1.1.1](https://github.com/SAP/ui5-webcomponents/compare/v1.1.0...v1.1.1) (2022-01-24)


### Bug Fixes

* **ui5-split-button:** fix JS error on empty text content ([#4612](https://github.com/SAP/ui5-webcomponents/issues/4612)) ([c407fd1](https://github.com/SAP/ui5-webcomponents/commit/c407fd1)), closes [#4609](https://github.com/SAP/ui5-webcomponents/issues/4609)
* **ui5-title:** replace custom heading CSS vars with SAP theming-base vars ([#4617](https://github.com/SAP/ui5-webcomponents/issues/4617)) ([baa02bb](https://github.com/SAP/ui5-webcomponents/commit/baa02bb))





# [1.1.0](https://github.com/SAP/ui5-webcomponents/compare/v1.0.2...v1.1.0) (2022-01-21)


### Bug Fixes

* **inputs:** adjust value and placeholder styles ([#4400](https://github.com/SAP/ui5-webcomponents/issues/4400)) ([b6014bc](https://github.com/SAP/ui5-webcomponents/commit/b6014bc))
* **inputs:** value state message is not presented in readonly mode ([#4329](https://github.com/SAP/ui5-webcomponents/issues/4329)) ([e1250ae](https://github.com/SAP/ui5-webcomponents/commit/e1250ae))
* **popups:**  block layer of popups now has a tabindex with value 0 ([#4324](https://github.com/SAP/ui5-webcomponents/issues/4324)) ([0965738](https://github.com/SAP/ui5-webcomponents/commit/0965738)), closes [#4187](https://github.com/SAP/ui5-webcomponents/issues/4187)
* **ui5-badge:** center text vertically ([#4394](https://github.com/SAP/ui5-webcomponents/issues/4394)) ([e6d0f69](https://github.com/SAP/ui5-webcomponents/commit/e6d0f69))
* **ui5-breadcrumbs:** correct missing label for single breadcrumb ([#4578](https://github.com/SAP/ui5-webcomponents/issues/4578)) ([42254d8](https://github.com/SAP/ui5-webcomponents/commit/42254d8)), closes [#4565](https://github.com/SAP/ui5-webcomponents/issues/4565)
* **ui5-breadcrumbs:** remove text-decoration from separator ([#4568](https://github.com/SAP/ui5-webcomponents/issues/4568)) ([ed87ba5](https://github.com/SAP/ui5-webcomponents/commit/ed87ba5))
* **ui5-busy-indicator:** Improve delay handling ([#4321](https://github.com/SAP/ui5-webcomponents/issues/4321)) ([acb1729](https://github.com/SAP/ui5-webcomponents/commit/acb1729)), closes [#4108](https://github.com/SAP/ui5-webcomponents/issues/4108)
* **ui5-button:** clicking button is safari now gives it a focus ([#4235](https://github.com/SAP/ui5-webcomponents/issues/4235)) ([baeb02d](https://github.com/SAP/ui5-webcomponents/commit/baeb02d)), closes [#2951](https://github.com/SAP/ui5-webcomponents/issues/2951)
* **ui5-card:** adjust some classes in Playground samples ([#4462](https://github.com/SAP/ui5-webcomponents/issues/4462)) ([2a9ed2a](https://github.com/SAP/ui5-webcomponents/commit/2a9ed2a)), closes [#4200](https://github.com/SAP/ui5-webcomponents/issues/4200)
* **ui5-card:** update theming parameter ([#4582](https://github.com/SAP/ui5-webcomponents/issues/4582)) ([622db2c](https://github.com/SAP/ui5-webcomponents/commit/622db2c))
* **ui5-card-header:** fix rtl support ([#4536](https://github.com/SAP/ui5-webcomponents/issues/4536)) ([14a2a03](https://github.com/SAP/ui5-webcomponents/commit/14a2a03))
* **ui5-carousel:** fix playground sample ([#4366](https://github.com/SAP/ui5-webcomponents/issues/4366)) ([67ace3a](https://github.com/SAP/ui5-webcomponents/commit/67ace3a))
* **ui5-checkbox:** cursor style when disabled ([#4392](https://github.com/SAP/ui5-webcomponents/issues/4392)) ([5d3e8f5](https://github.com/SAP/ui5-webcomponents/commit/5d3e8f5))
* **ui5-checkbox:** fix position of checkmark in ie11 ([#4320](https://github.com/SAP/ui5-webcomponents/issues/4320)) ([2745bbc](https://github.com/SAP/ui5-webcomponents/commit/2745bbc))
* **ui5-combobox:** fix docs ([#4553](https://github.com/SAP/ui5-webcomponents/issues/4553)) ([f0b1bf7](https://github.com/SAP/ui5-webcomponents/commit/f0b1bf7))
* **ui5-combobox:** Keyboard navigation trough filtered items ([#4143](https://github.com/SAP/ui5-webcomponents/issues/4143)) ([17e6e51](https://github.com/SAP/ui5-webcomponents/commit/17e6e51))
* **ui5-combobox:** remove incorrect sample ([#4482](https://github.com/SAP/ui5-webcomponents/issues/4482)) ([4b2720b](https://github.com/SAP/ui5-webcomponents/commit/4b2720b))
* **ui5-combobox, ui5-textarea:** correct value state message placement in RTL mode ([#4396](https://github.com/SAP/ui5-webcomponents/issues/4396)) ([6ab9edb](https://github.com/SAP/ui5-webcomponents/commit/6ab9edb))
* **ui5-date-picker:** enable date value strict parsing ([#4428](https://github.com/SAP/ui5-webcomponents/issues/4428)) ([ac5ac2d](https://github.com/SAP/ui5-webcomponents/commit/ac5ac2d)), closes [#4409](https://github.com/SAP/ui5-webcomponents/issues/4409)
* **ui5-date-picker:** remove title attribute from samples ([#4422](https://github.com/SAP/ui5-webcomponents/issues/4422)) ([56a6724](https://github.com/SAP/ui5-webcomponents/commit/56a6724))
* **ui5-date-time-picker:** proper visualization on mobile ([#4345](https://github.com/SAP/ui5-webcomponents/issues/4345)) ([7d8b93a](https://github.com/SAP/ui5-webcomponents/commit/7d8b93a))
* **ui5-dialog:** correct border radius when stretched on phones ([#4327](https://github.com/SAP/ui5-webcomponents/issues/4327)) ([5aedc43](https://github.com/SAP/ui5-webcomponents/commit/5aedc43)), closes [#4254](https://github.com/SAP/ui5-webcomponents/issues/4254)
* **ui5-dialog:** resize handle is no longer shown on phones ([#4326](https://github.com/SAP/ui5-webcomponents/issues/4326)) ([9b3869f](https://github.com/SAP/ui5-webcomponents/commit/9b3869f)), closes [#4253](https://github.com/SAP/ui5-webcomponents/issues/4253)
* **ui5-icon:** correct tabindex value ([#4509](https://github.com/SAP/ui5-webcomponents/issues/4509)) ([54698f6](https://github.com/SAP/ui5-webcomponents/commit/54698f6))
* **ui5-input:** Consistent "change" event ([#4129](https://github.com/SAP/ui5-webcomponents/issues/4129)) ([09f9059](https://github.com/SAP/ui5-webcomponents/commit/09f9059))
* **ui5-input:** fix event handling in firefox ([#4447](https://github.com/SAP/ui5-webcomponents/issues/4447)) ([d973162](https://github.com/SAP/ui5-webcomponents/commit/d973162))
* **ui5-input:** fix value  truncation ([#4467](https://github.com/SAP/ui5-webcomponents/issues/4467)) ([d9261f5](https://github.com/SAP/ui5-webcomponents/commit/d9261f5))
* **ui5-input:** improve sample visualization ([#4476](https://github.com/SAP/ui5-webcomponents/issues/4476)) ([b0fd49a](https://github.com/SAP/ui5-webcomponents/commit/b0fd49a))
* **ui5-li-custom:** removed height restriction ([#4473](https://github.com/SAP/ui5-webcomponents/issues/4473)) ([e76f8c9](https://github.com/SAP/ui5-webcomponents/commit/e76f8c9)), closes [#4450](https://github.com/SAP/ui5-webcomponents/issues/4450)
* **ui5-link:** add `noopener` to rel attribute ([#4533](https://github.com/SAP/ui5-webcomponents/issues/4533)) ([3f2c3cd](https://github.com/SAP/ui5-webcomponents/commit/3f2c3cd))
* **ui5-popover:** restrict arrow going out of bounds ([#4599](https://github.com/SAP/ui5-webcomponents/issues/4599)) ([41239a8](https://github.com/SAP/ui5-webcomponents/commit/41239a8)), closes [#4581](https://github.com/SAP/ui5-webcomponents/issues/4581)
* Breadcrumbs no longer throws an error when empty ([#4563](https://github.com/SAP/ui5-webcomponents/issues/4563)) ([cfd9fa6](https://github.com/SAP/ui5-webcomponents/commit/cfd9fa6))
* Scoping issues corrected ([#4573](https://github.com/SAP/ui5-webcomponents/issues/4573)) ([4e430d3](https://github.com/SAP/ui5-webcomponents/commit/4e430d3))
* **ui5-input, ui5-multi-combobox:** value state popup now aligned properly in RTL mode ([#4310](https://github.com/SAP/ui5-webcomponents/issues/4310)) ([ce0dcd2](https://github.com/SAP/ui5-webcomponents/commit/ce0dcd2)), closes [#3830](https://github.com/SAP/ui5-webcomponents/issues/3830)
* **ui5-list:** remove hightlighting on items after tap on mobile ([#4388](https://github.com/SAP/ui5-webcomponents/issues/4388)) ([c328ea9](https://github.com/SAP/ui5-webcomponents/commit/c328ea9)), closes [#4258](https://github.com/SAP/ui5-webcomponents/issues/4258)
* **ui5-message-strip:** make speech output more comprehensive ([#4416](https://github.com/SAP/ui5-webcomponents/issues/4416)) ([9442e05](https://github.com/SAP/ui5-webcomponents/commit/9442e05))
* **ui5-multi-combobox:** make readonly component focusable on mobile device ([#4456](https://github.com/SAP/ui5-webcomponents/issues/4456)) ([755599d](https://github.com/SAP/ui5-webcomponents/commit/755599d))
* **ui5-panel:** rotate button counterclockwise in RTL mode ([#4470](https://github.com/SAP/ui5-webcomponents/issues/4470)) ([d3f6e39](https://github.com/SAP/ui5-webcomponents/commit/d3f6e39))
* **ui5-popover:** adjust top position when iOS keyboard is opened ([#4333](https://github.com/SAP/ui5-webcomponents/issues/4333)) ([a4b03a3](https://github.com/SAP/ui5-webcomponents/commit/a4b03a3))
* **ui5-popover:** fix content truncation ([#4359](https://github.com/SAP/ui5-webcomponents/issues/4359)) ([2e8d3bd](https://github.com/SAP/ui5-webcomponents/commit/2e8d3bd)), closes [#4259](https://github.com/SAP/ui5-webcomponents/issues/4259)
* **ui5-popover:** make sample responsive for small devices ([#4527](https://github.com/SAP/ui5-webcomponents/issues/4527)) ([fddf903](https://github.com/SAP/ui5-webcomponents/commit/fddf903)), closes [#4206](https://github.com/SAP/ui5-webcomponents/issues/4206)
* **ui5-radio-button:** remove cursor pointer for disabled state ([#4393](https://github.com/SAP/ui5-webcomponents/issues/4393)) ([d147df8](https://github.com/SAP/ui5-webcomponents/commit/d147df8))
* **ui5-rating-indicator:** not round values are correctly visualised in RTL mode ([#4330](https://github.com/SAP/ui5-webcomponents/issues/4330)) ([d901386](https://github.com/SAP/ui5-webcomponents/commit/d901386))
* **ui5-slider, ui5-range-slider:** remove focus outline on mobile ([#4458](https://github.com/SAP/ui5-webcomponents/issues/4458)) ([a295dc1](https://github.com/SAP/ui5-webcomponents/commit/a295dc1))
* **ui5-tabcontainer:** improve keyboard handling ([#4486](https://github.com/SAP/ui5-webcomponents/issues/4486)) ([a934eb3](https://github.com/SAP/ui5-webcomponents/commit/a934eb3)), closes [#2540](https://github.com/SAP/ui5-webcomponents/issues/2540)
* **ui5-table:** adjust header row's height according to the visual specification ([#4424](https://github.com/SAP/ui5-webcomponents/issues/4424)) ([175fce3](https://github.com/SAP/ui5-webcomponents/commit/175fce3))
* **ui5-table:** check select all checkbox, when all rows are selected programatically ([#4455](https://github.com/SAP/ui5-webcomponents/issues/4455)) ([7baabfa](https://github.com/SAP/ui5-webcomponents/commit/7baabfa))
* **ui5-textarea:** apply specified scrollbar stylings ([#4477](https://github.com/SAP/ui5-webcomponents/issues/4477)) ([84018fc](https://github.com/SAP/ui5-webcomponents/commit/84018fc))
* **ui5-textarea:** Calc properly TextArea's size for showExceeds property ([#4152](https://github.com/SAP/ui5-webcomponents/issues/4152)) ([6f06963](https://github.com/SAP/ui5-webcomponents/commit/6f06963))
* **ui5-token:** apply correct background color in HC themes ([#4464](https://github.com/SAP/ui5-webcomponents/issues/4464)) ([133e45d](https://github.com/SAP/ui5-webcomponents/commit/133e45d))
* adding stable selectors for tab container and shellbar ([#4369](https://github.com/SAP/ui5-webcomponents/issues/4369)) ([9abdaba](https://github.com/SAP/ui5-webcomponents/commit/9abdaba))
* **ui5-token:** border-radius adjusted to spec in in SAP Quartz HCB/HCW ([#4323](https://github.com/SAP/ui5-webcomponents/issues/4323)) ([6691b3d](https://github.com/SAP/ui5-webcomponents/commit/6691b3d))


### Features

* **ui5-split-button:** initial implementation ([#4570](https://github.com/SAP/ui5-webcomponents/issues/4570)) ([295925b](https://github.com/SAP/ui5-webcomponents/commit/295925b))
* stable-dom-ref supported for abstract items ([#4604](https://github.com/SAP/ui5-webcomponents/issues/4604)) ([5526dea](https://github.com/SAP/ui5-webcomponents/commit/5526dea))
* **framework:** introduce runtimes and version info ([#4491](https://github.com/SAP/ui5-webcomponents/issues/4491)) ([757577f](https://github.com/SAP/ui5-webcomponents/commit/757577f))
* **ui5-button:** accessibleNameRef property implemented ([#4474](https://github.com/SAP/ui5-webcomponents/issues/4474)) ([3f7eae3](https://github.com/SAP/ui5-webcomponents/commit/3f7eae3))
* **ui5-checkbox:** introduce accessibleName and accessibleNameRef ([#4547](https://github.com/SAP/ui5-webcomponents/issues/4547)) ([6f285fd](https://github.com/SAP/ui5-webcomponents/commit/6f285fd)), closes [#4500](https://github.com/SAP/ui5-webcomponents/issues/4500)
* **ui5-combobox:** add full keyboard handling ([#4494](https://github.com/SAP/ui5-webcomponents/issues/4494)) ([fd4bb50](https://github.com/SAP/ui5-webcomponents/commit/fd4bb50))
* **ui5-icon:** accessibleRole property implemented ([#4548](https://github.com/SAP/ui5-webcomponents/issues/4548)) ([6d6cf6f](https://github.com/SAP/ui5-webcomponents/commit/6d6cf6f)), closes [#4499](https://github.com/SAP/ui5-webcomponents/issues/4499)
* **ui5-input:** add full keyboard support ([#4414](https://github.com/SAP/ui5-webcomponents/issues/4414)) ([6133393](https://github.com/SAP/ui5-webcomponents/commit/6133393))
* **ui5-link:** accessibilityAttributes property implemented ([#4591](https://github.com/SAP/ui5-webcomponents/issues/4591)) ([9a16d61](https://github.com/SAP/ui5-webcomponents/commit/9a16d61)), closes [#3546](https://github.com/SAP/ui5-webcomponents/issues/3546)
* **ui5-list:** preventable item-click event ([#4448](https://github.com/SAP/ui5-webcomponents/issues/4448)) ([12d3e8a](https://github.com/SAP/ui5-webcomponents/commit/12d3e8a))
* **ui5-media-gallery:** Initial implementation ([#4427](https://github.com/SAP/ui5-webcomponents/issues/4427)) ([17cb225](https://github.com/SAP/ui5-webcomponents/commit/17cb225))
* **ui5-switch:** accessibleNameRef property implemented ([#4472](https://github.com/SAP/ui5-webcomponents/issues/4472)) ([8538de9](https://github.com/SAP/ui5-webcomponents/commit/8538de9))
* implement F6 Navigation Helper ([#4490](https://github.com/SAP/ui5-webcomponents/issues/4490)) ([60d0dc1](https://github.com/SAP/ui5-webcomponents/commit/60d0dc1))
* **ui5-option:** handle `title` attribute handle ([#4546](https://github.com/SAP/ui5-webcomponents/issues/4546)) ([0c060aa](https://github.com/SAP/ui5-webcomponents/commit/0c060aa))
* **ui5-popup:** add `accessibleNameRef` property ([#4517](https://github.com/SAP/ui5-webcomponents/issues/4517)) ([0a7c1f3](https://github.com/SAP/ui5-webcomponents/commit/0a7c1f3))
* **ui5-radio-button:** implement `accessibleNameRef` property ([#4511](https://github.com/SAP/ui5-webcomponents/issues/4511)) ([83fdef5](https://github.com/SAP/ui5-webcomponents/commit/83fdef5))
* **ui5-rating-indicator:** add full keyboard support ([#4411](https://github.com/SAP/ui5-webcomponents/issues/4411)) ([0e41f41](https://github.com/SAP/ui5-webcomponents/commit/0e41f41))
* **ui5-segmented-button:** implement `accessibleName` property ([#4378](https://github.com/SAP/ui5-webcomponents/issues/4378)) ([e6a8b38](https://github.com/SAP/ui5-webcomponents/commit/e6a8b38))
* **ui5-tabcontainer:** implement overflow functionality ([#4403](https://github.com/SAP/ui5-webcomponents/issues/4403)) ([a38bbab](https://github.com/SAP/ui5-webcomponents/commit/a38bbab)), closes [#2540](https://github.com/SAP/ui5-webcomponents/issues/2540)
* **ui5-tabcontainer:** show `separators` in overflow ([#4507](https://github.com/SAP/ui5-webcomponents/issues/4507)) ([b646157](https://github.com/SAP/ui5-webcomponents/commit/b646157))
* **ui5-tree-item:** add `indeterminate` state ([#4397](https://github.com/SAP/ui5-webcomponents/issues/4397)) ([80bbc22](https://github.com/SAP/ui5-webcomponents/commit/80bbc22))





## [1.0.2](https://github.com/SAP/ui5-webcomponents/compare/v1.0.1...v1.0.2) (2021-11-29)

**Note:** Version bump only for package @ui5/webcomponents





## [1.0.1](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0...v1.0.1) (2021-11-10)

**Note:** Version bump only for package @ui5/webcomponents





# [1.0.0](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.16...v1.0.0) (2021-11-10)


**Note:** Version bump only for package @ui5/webcomponents





# [1.0.0-rc.16](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.15...v1.0.0-rc.16) (2021-11-09)


### Bug Fixes

* **inputs:** SAP Horizon disabled state enhanced ([#4263](https://github.com/SAP/ui5-webcomponents/issues/4263)) ([f2b5f64](https://github.com/SAP/ui5-webcomponents/commit/f2b5f64))
* **ui-tabcontainer:** paddings are changed according to the spec part 2 ([#4196](https://github.com/SAP/ui5-webcomponents/issues/4196)) ([3fd8b48](https://github.com/SAP/ui5-webcomponents/commit/3fd8b48))
* **ui5-*:** add global styles for tap-highlight-color  ([18dab92](https://github.com/SAP/ui5-webcomponents/commit/18dab92))
* **ui5-avatar:** correct background when image slot is used ([#4117](https://github.com/SAP/ui5-webcomponents/issues/4117)) ([81d7815](https://github.com/SAP/ui5-webcomponents/commit/81d7815))
* **ui5-avatar:** Fixed font-size and color-scheme ([#3799](https://github.com/SAP/ui5-webcomponents/issues/3799)) ([ea8ef59](https://github.com/SAP/ui5-webcomponents/commit/ea8ef59))
* **ui5-button:** fix hover state for combi device([#4100](https://github.com/SAP/ui5-webcomponents/issues/4100)) ([6ab905c](https://github.com/SAP/ui5-webcomponents/commit/6ab905c))
* **ui5-calendar:** header year picker button has correct text ([#3665](https://github.com/SAP/ui5-webcomponents/issues/3665)) ([5857496](https://github.com/SAP/ui5-webcomponents/commit/5857496)), closes [#3658](https://github.com/SAP/ui5-webcomponents/issues/3658)
* **ui5-card:** allow accessibleNameRef to be used ([#4118](https://github.com/SAP/ui5-webcomponents/issues/4118)) ([07e8d44](https://github.com/SAP/ui5-webcomponents/commit/07e8d44)), closes [#3681](https://github.com/SAP/ui5-webcomponents/issues/3681)
* **ui5-checkbox:** fix component square's border-radius ([#4073](https://github.com/SAP/ui5-webcomponents/issues/4073)) ([c70942b](https://github.com/SAP/ui5-webcomponents/commit/c70942b))
* **ui5-color-picker:** change event is now fired on opacity change ([#3645](https://github.com/SAP/ui5-webcomponents/issues/3645)) ([9ee329a](https://github.com/SAP/ui5-webcomponents/commit/9ee329a))
* **ui5-combobox:** Autocomplete on Safari ([#3999](https://github.com/SAP/ui5-webcomponents/issues/3999)) ([2ee4feb](https://github.com/SAP/ui5-webcomponents/commit/2ee4feb))
* **ui5-combobox:** Fix value reset on ESC [#3886](https://github.com/SAP/ui5-webcomponents/issues/3886) ([ae74add](https://github.com/SAP/ui5-webcomponents/commit/ae74add)), closes [#3784](https://github.com/SAP/ui5-webcomponents/issues/3784) [#3784](https://github.com/SAP/ui5-webcomponents/issues/3784)
* **ui5-combobox:** Improve arrow navigation functionality ([#3928](https://github.com/SAP/ui5-webcomponents/issues/3928)) ([fea941a](https://github.com/SAP/ui5-webcomponents/commit/fea941a))
* **ui5-date-picker:** Alignment of input controls ([#4267](https://github.com/SAP/ui5-webcomponents/issues/4267)) ([3419db3](https://github.com/SAP/ui5-webcomponents/commit/3419db3))
* **ui5-date-picker:** Hover state on readonly is now fixed ([#4272](https://github.com/SAP/ui5-webcomponents/issues/4272)) ([535d0e5](https://github.com/SAP/ui5-webcomponents/commit/535d0e5))
* **ui5-datetime-picker:** aligning the focus borders ([#4250](https://github.com/SAP/ui5-webcomponents/issues/4250)) ([9404c73](https://github.com/SAP/ui5-webcomponents/commit/9404c73))
* **ui5-datetime-picker:** console error not thrown on Firefox browser ([#4161](https://github.com/SAP/ui5-webcomponents/issues/4161)) ([c2ad212](https://github.com/SAP/ui5-webcomponents/commit/c2ad212)), closes [#4136](https://github.com/SAP/ui5-webcomponents/issues/4136)
* **ui5-datetime-picker:** console error not thrown on Firefox browser ([#4164](https://github.com/SAP/ui5-webcomponents/issues/4164)) ([7d773d5](https://github.com/SAP/ui5-webcomponents/commit/7d773d5)), closes [#4136](https://github.com/SAP/ui5-webcomponents/issues/4136)
* **ui5-dialog:** fix in scroll blocking ([#4092](https://github.com/SAP/ui5-webcomponents/issues/4092)) ([e66ab79](https://github.com/SAP/ui5-webcomponents/commit/e66ab79))
* **ui5-dialog:** fix resize handler console warning ([#4138](https://github.com/SAP/ui5-webcomponents/issues/4138)) ([db2be65](https://github.com/SAP/ui5-webcomponents/commit/db2be65)), closes [#4131](https://github.com/SAP/ui5-webcomponents/issues/4131)
* **ui5-file-uploader:** Button is activated with Enter/Space key with screen reader virtual cursor ([#3944](https://github.com/SAP/ui5-webcomponents/issues/3944)) ([159687e](https://github.com/SAP/ui5-webcomponents/commit/159687e)), closes [#3767](https://github.com/SAP/ui5-webcomponents/issues/3767) [#3767](https://github.com/SAP/ui5-webcomponents/issues/3767)
* **ui5-icon:** decorative icons now have aria-hidden=true ([#3983](https://github.com/SAP/ui5-webcomponents/issues/3983)) ([9101130](https://github.com/SAP/ui5-webcomponents/commit/9101130)), closes [#3954](https://github.com/SAP/ui5-webcomponents/issues/3954)
* **ui5-input:** Adjust the default width applied to the icons in SAP Horizon theme ([#4275](https://github.com/SAP/ui5-webcomponents/issues/4275)) ([e650973](https://github.com/SAP/ui5-webcomponents/commit/e650973))
* **ui5-input:** Behaviour on mobile device enhanced ([#4025](https://github.com/SAP/ui5-webcomponents/issues/4025)) ([bab54f6](https://github.com/SAP/ui5-webcomponents/commit/bab54f6))
* **ui5-input:** escape HTML before highlighting suggestions (XSS) ([2a4919e](https://github.com/SAP/ui5-webcomponents/commit/2a4919e)), closes [#4245](https://github.com/SAP/ui5-webcomponents/issues/4245)
* **ui5-input:** Fix value reset on ESC ([#3886](https://github.com/SAP/ui5-webcomponents/issues/3886)) ([3f1c267](https://github.com/SAP/ui5-webcomponents/commit/3f1c267)), closes [#3784](https://github.com/SAP/ui5-webcomponents/issues/3784) [#3784](https://github.com/SAP/ui5-webcomponents/issues/3784)
* **ui5-input:** prevent suggestion popover open on focusin ([#3997](https://github.com/SAP/ui5-webcomponents/issues/3997)) ([0b3e12f](https://github.com/SAP/ui5-webcomponents/commit/0b3e12f))
* **ui5-input:** remove data-sap-no-tab-ref attribute from the inner input ([3e49773](https://github.com/SAP/ui5-webcomponents/commit/3e49773)), closes [#3603](https://github.com/SAP/ui5-webcomponents/issues/3603)
* **ui5-link:** add underlining in the regular state in hcb / hcw ([#3960](https://github.com/SAP/ui5-webcomponents/issues/3960)) ([903a480](https://github.com/SAP/ui5-webcomponents/commit/903a480))
* **ui5-list:** change role mappings so no interactive elements are ne… ([#3952](https://github.com/SAP/ui5-webcomponents/issues/3952)) ([6d98d0c](https://github.com/SAP/ui5-webcomponents/commit/6d98d0c)), closes [#3927](https://github.com/SAP/ui5-webcomponents/issues/3927)
* **ui5-list:** preventing space keydown ([#4088](https://github.com/SAP/ui5-webcomponents/issues/4088)) ([e9c5287](https://github.com/SAP/ui5-webcomponents/commit/e9c5287)), closes [#4049](https://github.com/SAP/ui5-webcomponents/issues/4049)
* **ui5-list:** remove unnecessary scrollbar in RTL for Multiselect mode ([#4085](https://github.com/SAP/ui5-webcomponents/issues/4085)) ([04c09da](https://github.com/SAP/ui5-webcomponents/commit/04c09da)), closes [#3947](https://github.com/SAP/ui5-webcomponents/issues/3947)
* **ui5-list, ui5-table, ui5-notification, ui5-busy-indicator:** getFocusDomRef returns the correct element when the state is busy ([#3951](https://github.com/SAP/ui5-webcomponents/issues/3951)) ([ec81c15](https://github.com/SAP/ui5-webcomponents/commit/ec81c15)), closes [#3922](https://github.com/SAP/ui5-webcomponents/issues/3922)
* **ui5-multi-combobox:** Fix value reset on ESC ([#3958](https://github.com/SAP/ui5-webcomponents/issues/3958)) ([ed128db](https://github.com/SAP/ui5-webcomponents/commit/ed128db))
* **ui5-multi-combobox:** prefilter selected items on n more click ([#3931](https://github.com/SAP/ui5-webcomponents/issues/3931)) ([2ebc6a7](https://github.com/SAP/ui5-webcomponents/commit/2ebc6a7))
* **ui5-multi-combobox:** prevent setting max-width of dialog header on mobile ([#3943](https://github.com/SAP/ui5-webcomponents/issues/3943)) ([97d0382](https://github.com/SAP/ui5-webcomponents/commit/97d0382)), closes [#3763](https://github.com/SAP/ui5-webcomponents/issues/3763)
* **ui5-multi-combobox:** revert selection after close button is pressed ([#3938](https://github.com/SAP/ui5-webcomponents/issues/3938)) ([104ec37](https://github.com/SAP/ui5-webcomponents/commit/104ec37)), closes [#3764](https://github.com/SAP/ui5-webcomponents/issues/3764)
* **ui5-multi-combobox:** select an item when value matches and enter is pressed ([#3942](https://github.com/SAP/ui5-webcomponents/issues/3942)) ([ec4ecc8](https://github.com/SAP/ui5-webcomponents/commit/ec4ecc8)), closes [#3809](https://github.com/SAP/ui5-webcomponents/issues/3809)
* **ui5-panel:** add border bottom, when fixed ([#4234](https://github.com/SAP/ui5-webcomponents/issues/4234)) ([a19e401](https://github.com/SAP/ui5-webcomponents/commit/a19e401))
* **ui5-rating-indicator:** apply correct color for readonly unselected icon ([#3992](https://github.com/SAP/ui5-webcomponents/issues/3992)) ([5854e0f](https://github.com/SAP/ui5-webcomponents/commit/5854e0f))
* **ui5-select:** correct screen reader speech out when popover is opened ([#3705](https://github.com/SAP/ui5-webcomponents/issues/3705)) ([06c193a](https://github.com/SAP/ui5-webcomponents/commit/06c193a)), closes [#3617](https://github.com/SAP/ui5-webcomponents/issues/3617)
* **ui5-select:** sap_horizon adjustments ([#4242](https://github.com/SAP/ui5-webcomponents/issues/4242)) ([466f5b9](https://github.com/SAP/ui5-webcomponents/commit/466f5b9))
* **ui5-slider:** keyboard handling now works correctly in RTL ([#3949](https://github.com/SAP/ui5-webcomponents/issues/3949)) ([f6dee74](https://github.com/SAP/ui5-webcomponents/commit/f6dee74))
* **ui5-tab-container:** selector fixed ([#4261](https://github.com/SAP/ui5-webcomponents/issues/4261)) ([#4273](https://github.com/SAP/ui5-webcomponents/issues/4273)) ([24ff145](https://github.com/SAP/ui5-webcomponents/commit/24ff145))
* **ui5-tabcontainer:** paddings are changed according to the spec ([#4166](https://github.com/SAP/ui5-webcomponents/issues/4166)) ([0bb0b92](https://github.com/SAP/ui5-webcomponents/commit/0bb0b92))
* **ui5-table:** Add missing dependency to Checkbox ([#4199](https://github.com/SAP/ui5-webcomponents/issues/4199)) ([0f6e224](https://github.com/SAP/ui5-webcomponents/commit/0f6e224)), closes [#4094](https://github.com/SAP/ui5-webcomponents/issues/4094)
* **ui5-table:** Hide row columns on minWidth ([#4193](https://github.com/SAP/ui5-webcomponents/issues/4193)) ([bf2495b](https://github.com/SAP/ui5-webcomponents/commit/bf2495b))
* **ui5-table:** Select all column is now sticky ([#3950](https://github.com/SAP/ui5-webcomponents/issues/3950)) ([9530a5b](https://github.com/SAP/ui5-webcomponents/commit/9530a5b))
* **ui5-tree, ui5-table, ui5-side-navigation:** unnecessary scrollbar in RTL is removed ([#3948](https://github.com/SAP/ui5-webcomponents/issues/3948)) ([61fe0fe](https://github.com/SAP/ui5-webcomponents/commit/61fe0fe))
* **ui5-upload-collection:** exploratory testing issues ([#3797](https://github.com/SAP/ui5-webcomponents/issues/3797)) ([7028b6c](https://github.com/SAP/ui5-webcomponents/commit/7028b6c)), closes [#3625](https://github.com/SAP/ui5-webcomponents/issues/3625)
* ComboBox arrow now correctly toggles the picker ([#3937](https://github.com/SAP/ui5-webcomponents/issues/3937)) ([19e77da](https://github.com/SAP/ui5-webcomponents/commit/19e77da))
* **framework:** Multiple properties have no attribute ([#3725](https://github.com/SAP/ui5-webcomponents/issues/3725)) ([2548935](https://github.com/SAP/ui5-webcomponents/commit/2548935))
* **ui5 card:** exploratory testing issues ([#3894](https://github.com/SAP/ui5-webcomponents/issues/3894)) ([f6bce94](https://github.com/SAP/ui5-webcomponents/commit/f6bce94))
* **ui5-avatar:** documentation improvements ([#3909](https://github.com/SAP/ui5-webcomponents/issues/3909)) ([833040d](https://github.com/SAP/ui5-webcomponents/commit/833040d))
* **ui5-avatar, ui5-icon:** attach onclick handler based on interactive property ([#3742](https://github.com/SAP/ui5-webcomponents/issues/3742)) ([cbdae54](https://github.com/SAP/ui5-webcomponents/commit/cbdae54))
* **ui5-badge:** update accent colors ([#3926](https://github.com/SAP/ui5-webcomponents/issues/3926)) ([7c45ff7](https://github.com/SAP/ui5-webcomponents/commit/7c45ff7)), closes [#3923](https://github.com/SAP/ui5-webcomponents/issues/3923) [#3923](https://github.com/SAP/ui5-webcomponents/issues/3923)
* **ui5-badge:** update parameters for color-scheme="8" ([#3814](https://github.com/SAP/ui5-webcomponents/issues/3814)) ([9f4a93e](https://github.com/SAP/ui5-webcomponents/commit/9f4a93e))
* **ui5-calendar:** ACC improvements ([#3789](https://github.com/SAP/ui5-webcomponents/issues/3789)) ([9f40233](https://github.com/SAP/ui5-webcomponents/commit/9f40233))
* **ui5-calendar:** keyboard handling now compliant with the specification ([#3649](https://github.com/SAP/ui5-webcomponents/issues/3649)) ([768d1e7](https://github.com/SAP/ui5-webcomponents/commit/768d1e7))
* **ui5-card:** correctly set aria-labelledby ([#3692](https://github.com/SAP/ui5-webcomponents/issues/3692)) ([1e57b00](https://github.com/SAP/ui5-webcomponents/commit/1e57b00)), closes [#3643](https://github.com/SAP/ui5-webcomponents/issues/3643)
* **ui5-card:** exploratory testing issues ([#3881](https://github.com/SAP/ui5-webcomponents/issues/3881)) ([75023c1](https://github.com/SAP/ui5-webcomponents/commit/75023c1))
* **ui5-card-header:** no longer fires click event twice ([#3823](https://github.com/SAP/ui5-webcomponents/issues/3823)) ([d4f4e91](https://github.com/SAP/ui5-webcomponents/commit/d4f4e91))
* **ui5-color-palette:** align space between swatches ([#3912](https://github.com/SAP/ui5-webcomponents/issues/3912)) ([8ad1fdd](https://github.com/SAP/ui5-webcomponents/commit/8ad1fdd))
* **ui5-color-palette:** focus outline is properly visualized ([#3648](https://github.com/SAP/ui5-webcomponents/issues/3648)) ([2e708d4](https://github.com/SAP/ui5-webcomponents/commit/2e708d4))
* **ui5-color-palette-popover:** fix event params ([#3873](https://github.com/SAP/ui5-webcomponents/issues/3873)) ([1066030](https://github.com/SAP/ui5-webcomponents/commit/1066030))
* **ui5-color-picker:** opacity slider doesn't affect the hue slider  ([#3664](https://github.com/SAP/ui5-webcomponents/issues/3664)) ([3afe78a](https://github.com/SAP/ui5-webcomponents/commit/3afe78a))
* **ui5-combo-box:** Link in value state message is now accessible ([#3901](https://github.com/SAP/ui5-webcomponents/issues/3901)) ([5fd1643](https://github.com/SAP/ui5-webcomponents/commit/5fd1643)), closes [#3855](https://github.com/SAP/ui5-webcomponents/issues/3855) [#3855](https://github.com/SAP/ui5-webcomponents/issues/3855)
* **ui5-combobox:** Double announcement on key navigation fixed ([#3495](https://github.com/SAP/ui5-webcomponents/issues/3495)) ([0ff3325](https://github.com/SAP/ui5-webcomponents/commit/0ff3325))
* **ui5-date-picker:** calendar horizontal center align ([#3905](https://github.com/SAP/ui5-webcomponents/issues/3905)) ([75aef88](https://github.com/SAP/ui5-webcomponents/commit/75aef88))
* **ui5-date-picker:** fix "dateValue" getter to return most recent value ([#3629](https://github.com/SAP/ui5-webcomponents/issues/3629)) ([bee34da](https://github.com/SAP/ui5-webcomponents/commit/bee34da)), closes [#3516](https://github.com/SAP/ui5-webcomponents/issues/3516)
* **ui5-date-picker:** internal calendar component state managed properly ([#3641](https://github.com/SAP/ui5-webcomponents/issues/3641)) ([6a820a6](https://github.com/SAP/ui5-webcomponents/commit/6a820a6))
* **ui5-date-picker:** keyboard handling now compliant with the specification ([#3636](https://github.com/SAP/ui5-webcomponents/issues/3636)) ([24467f8](https://github.com/SAP/ui5-webcomponents/commit/24467f8)), closes [#3091](https://github.com/SAP/ui5-webcomponents/issues/3091)
* **ui5-daypicker:** fix js error ([#3677](https://github.com/SAP/ui5-webcomponents/issues/3677)) ([b6d643a](https://github.com/SAP/ui5-webcomponents/commit/b6d643a))
* **ui5-daypicker:** support secondary calendar type ([#3773](https://github.com/SAP/ui5-webcomponents/issues/3773)) ([8dd14c1](https://github.com/SAP/ui5-webcomponents/commit/8dd14c1))
* **ui5-dialog:** correctly restore body scrolling on ESC ([#3696](https://github.com/SAP/ui5-webcomponents/issues/3696)) ([1c8e656](https://github.com/SAP/ui5-webcomponents/commit/1c8e656)), closes [#3690](https://github.com/SAP/ui5-webcomponents/issues/3690)
* **ui5-dialog:** fix console warning from exploratory testing ([#3893](https://github.com/SAP/ui5-webcomponents/issues/3893)) ([c648714](https://github.com/SAP/ui5-webcomponents/commit/c648714)), closes [#3620](https://github.com/SAP/ui5-webcomponents/issues/3620)
* **ui5-input:** adjust value state paddings according to specifications ([#3833](https://github.com/SAP/ui5-webcomponents/issues/3833)) ([4c8ff0c](https://github.com/SAP/ui5-webcomponents/commit/4c8ff0c)), closes [#3611](https://github.com/SAP/ui5-webcomponents/issues/3611) [#3611](https://github.com/SAP/ui5-webcomponents/issues/3611)
* **ui5-input:** prevent exception in console when input is clicked on mobile ([#3729](https://github.com/SAP/ui5-webcomponents/issues/3729)) ([8d05606](https://github.com/SAP/ui5-webcomponents/commit/8d05606))
* **ui5-label:** adjust colon margins ([#3897](https://github.com/SAP/ui5-webcomponents/issues/3897)) ([ccca671](https://github.com/SAP/ui5-webcomponents/commit/ccca671))
* **ui5-label:** wrapping now works when used in CustomListItem ([#3852](https://github.com/SAP/ui5-webcomponents/issues/3852)) ([8333f5e](https://github.com/SAP/ui5-webcomponents/commit/8333f5e))
* **ui5-li:** add "Selected" text to item's accessible name ([#3853](https://github.com/SAP/ui5-webcomponents/issues/3853)) ([2924010](https://github.com/SAP/ui5-webcomponents/commit/2924010))
* **ui5-li-groupheader:** change role option ([#3869](https://github.com/SAP/ui5-webcomponents/issues/3869)) ([90e718b](https://github.com/SAP/ui5-webcomponents/commit/90e718b))
* **ui5-li-groupheader:** fix row height ([#3610](https://github.com/SAP/ui5-webcomponents/issues/3610)) ([79d259e](https://github.com/SAP/ui5-webcomponents/commit/79d259e)), closes [#3606](https://github.com/SAP/ui5-webcomponents/issues/3606)
* **ui5-link:** the anchor element inherits its text-decoration ([#3911](https://github.com/SAP/ui5-webcomponents/issues/3911)) ([bb8629c](https://github.com/SAP/ui5-webcomponents/commit/bb8629c)), closes [#3837](https://github.com/SAP/ui5-webcomponents/issues/3837) [#3837](https://github.com/SAP/ui5-webcomponents/issues/3837)
* **ui5-popover:** fix arrow placement when reaching a border ([#3821](https://github.com/SAP/ui5-webcomponents/issues/3821)) ([9913632](https://github.com/SAP/ui5-webcomponents/commit/9913632)), closes [#3391](https://github.com/SAP/ui5-webcomponents/issues/3391)
* **ui5-popover:** fixed initial flickering ([#3910](https://github.com/SAP/ui5-webcomponents/issues/3910)) ([6afad2a](https://github.com/SAP/ui5-webcomponents/commit/6afad2a))
* **ui5-popover:** restrict growing width on small screens ([#3820](https://github.com/SAP/ui5-webcomponents/issues/3820)) ([bd0b33a](https://github.com/SAP/ui5-webcomponents/commit/bd0b33a))
* **ui5-radio-button:** exploratory testing issues ([#3740](https://github.com/SAP/ui5-webcomponents/issues/3740)) ([23ce10f](https://github.com/SAP/ui5-webcomponents/commit/23ce10f))
* **ui5-segmented-button:** correct focus on first click ([#3906](https://github.com/SAP/ui5-webcomponents/issues/3906)) ([6820dd7](https://github.com/SAP/ui5-webcomponents/commit/6820dd7))
* **ui5-SegmentedButton:** keyboard handling now compliant with the specification ([#3709](https://github.com/SAP/ui5-webcomponents/issues/3709)) ([d34afc1](https://github.com/SAP/ui5-webcomponents/commit/d34afc1))
* **ui5-select:** align value state to visual specification ([#3655](https://github.com/SAP/ui5-webcomponents/issues/3655)) ([cce6505](https://github.com/SAP/ui5-webcomponents/commit/cce6505)), closes [#3611](https://github.com/SAP/ui5-webcomponents/issues/3611)
* **ui5-select:** selection change with keyboard ([#3704](https://github.com/SAP/ui5-webcomponents/issues/3704)) ([68da439](https://github.com/SAP/ui5-webcomponents/commit/68da439))
* **ui5-side-navigation:** fix rtl behaviour ([#3774](https://github.com/SAP/ui5-webcomponents/issues/3774)) ([cb39444](https://github.com/SAP/ui5-webcomponents/commit/cb39444))
* **ui5-slider:** show tooltips when component has focus ([#3899](https://github.com/SAP/ui5-webcomponents/issues/3899)) ([952445d](https://github.com/SAP/ui5-webcomponents/commit/952445d))
* **ui5-textarea:** value state message link is now accessible ([#3916](https://github.com/SAP/ui5-webcomponents/issues/3916)) ([015e3ef](https://github.com/SAP/ui5-webcomponents/commit/015e3ef))
* **ui5-timeline:** align indicator in compact mode ([#3902](https://github.com/SAP/ui5-webcomponents/issues/3902)) ([0c31502](https://github.com/SAP/ui5-webcomponents/commit/0c31502))
* **ui5-timepicker:** correct navigation to the am/pm slider ([#3920](https://github.com/SAP/ui5-webcomponents/issues/3920)) ([ba38d4c](https://github.com/SAP/ui5-webcomponents/commit/ba38d4c))
* **ui5-toast:** Content is announced when ui5-toast is shown ([#3939](https://github.com/SAP/ui5-webcomponents/issues/3939)) ([66901ad](https://github.com/SAP/ui5-webcomponents/commit/66901ad))
* (ui5-li): add accessible name to single select radio button ([#3842](https://github.com/SAP/ui5-webcomponents/issues/3842)) ([c77d9c9](https://github.com/SAP/ui5-webcomponents/commit/c77d9c9))
* **ui5-ToggleButton:** SHIFT+SPACE cancels the action ([#3713](https://github.com/SAP/ui5-webcomponents/issues/3713)) ([48adbbe](https://github.com/SAP/ui5-webcomponents/commit/48adbbe))
* **ui5-tokenizer:** Fix invisble texts styling ([#3394](https://github.com/SAP/ui5-webcomponents/issues/3394)) ([bc62eaa](https://github.com/SAP/ui5-webcomponents/commit/bc62eaa))


### Code Refactoring

* **ui5-breadcrumbs-item:** remove stableDomRef public property ([#4284](https://github.com/SAP/ui5-webcomponents/issues/4284)) ([ecec275](https://github.com/SAP/ui5-webcomponents/commit/ecec275))
* **ui5-input:** make suggestion-scroll event protected ([#4141](https://github.com/SAP/ui5-webcomponents/issues/4141)) ([3a0abee](https://github.com/SAP/ui5-webcomponents/commit/3a0abee))
* **ui5-message-strip:** rename tag name ([#4268](https://github.com/SAP/ui5-webcomponents/issues/4268)) ([ec30ec2](https://github.com/SAP/ui5-webcomponents/commit/ec30ec2))


### Features

* **ui5-step-input:** implement sap_horizon theme ([#4247](https://github.com/SAP/ui5-webcomponents/issues/4247)) ([4180fe7](https://github.com/SAP/ui5-webcomponents/commit/4180fe7))
* add SAP-icons5.0 ([#4244](https://github.com/SAP/ui5-webcomponents/issues/4244)) ([c0a226e](https://github.com/SAP/ui5-webcomponents/commit/c0a226e))
* **framework:** allow using a custom i18n library ([#4119](https://github.com/SAP/ui5-webcomponents/issues/4119)) ([56f366f](https://github.com/SAP/ui5-webcomponents/commit/56f366f))
* **framework:** Implement better custom theme support ([#4121](https://github.com/SAP/ui5-webcomponents/issues/4121)) ([31e30f8](https://github.com/SAP/ui5-webcomponents/commit/31e30f8))
* **inputs:** SAP Horizon theme implementation ([#4222](https://github.com/SAP/ui5-webcomponents/issues/4222)) ([66d17f7](https://github.com/SAP/ui5-webcomponents/commit/66d17f7))
* **ui5-avatar:** implement sap_horizon ([#4225](https://github.com/SAP/ui5-webcomponents/issues/4225)) ([52311c4](https://github.com/SAP/ui5-webcomponents/commit/52311c4))
* **ui5-badge:** implement sap_horizon theme ([#4019](https://github.com/SAP/ui5-webcomponents/issues/4019)) ([7deccd1](https://github.com/SAP/ui5-webcomponents/commit/7deccd1)), closes [#4043](https://github.com/SAP/ui5-webcomponents/issues/4043)
* **ui5-breadcrumbs:** Initial implementation ([#3489](https://github.com/SAP/ui5-webcomponents/issues/3489)) ([6dbc2a0](https://github.com/SAP/ui5-webcomponents/commit/6dbc2a0)), closes [#3166](https://github.com/SAP/ui5-webcomponents/issues/3166)
* **ui5-busy-indicator:** SAP Horizon theme implementation ([#4179](https://github.com/SAP/ui5-webcomponents/issues/4179)) ([6dc366a](https://github.com/SAP/ui5-webcomponents/commit/6dc366a))
* **ui5-button:** implement sap_horizon theme ([#4126](https://github.com/SAP/ui5-webcomponents/issues/4126)) ([90483e2](https://github.com/SAP/ui5-webcomponents/commit/90483e2))
* **ui5-calendar:** implement horizon theme ([#4233](https://github.com/SAP/ui5-webcomponents/issues/4233)) ([f7d9113](https://github.com/SAP/ui5-webcomponents/commit/f7d9113))
* **ui5-calendar:** support secondary calendar type ([#3634](https://github.com/SAP/ui5-webcomponents/issues/3634)) ([fca7508](https://github.com/SAP/ui5-webcomponents/commit/fca7508))
* **ui5-card:** introduce accessibleName property ([#4021](https://github.com/SAP/ui5-webcomponents/issues/4021)) ([54fdb3a](https://github.com/SAP/ui5-webcomponents/commit/54fdb3a))
* **ui5-card:** SAP Horizon Theme Implementation ([#4189](https://github.com/SAP/ui5-webcomponents/issues/4189)) ([e0e488f](https://github.com/SAP/ui5-webcomponents/commit/e0e488f))
* **ui5-card-header:** implement ariaLevel property ([#3878](https://github.com/SAP/ui5-webcomponents/issues/3878)) ([b2b2ccd](https://github.com/SAP/ui5-webcomponents/commit/b2b2ccd))
* **ui5-carousel:** Implement F7 keyboard functionality ([#3559](https://github.com/SAP/ui5-webcomponents/issues/3559)) ([df0ace8](https://github.com/SAP/ui5-webcomponents/commit/df0ace8)), closes [#3092](https://github.com/SAP/ui5-webcomponents/issues/3092)
* **ui5-carousel:** SAP Horizon theme implementation ([1ed725f](https://github.com/SAP/ui5-webcomponents/commit/1ed725f))
* **ui5-checkbox:** implement sap_horizon ([#4031](https://github.com/SAP/ui5-webcomponents/issues/4031)) ([33ee202](https://github.com/SAP/ui5-webcomponents/commit/33ee202)), closes [#404](https://github.com/SAP/ui5-webcomponents/issues/404)
* **ui5-color-palette-popover:** implement isOpen method ([#3883](https://github.com/SAP/ui5-webcomponents/issues/3883)) ([b112765](https://github.com/SAP/ui5-webcomponents/commit/b112765))
* **ui5-color-palette-popover:** initial implementation ([#3746](https://github.com/SAP/ui5-webcomponents/issues/3746)) ([894628f](https://github.com/SAP/ui5-webcomponents/commit/894628f))
* **ui5-color-picker:** implement sap_horizon theme ([#4177](https://github.com/SAP/ui5-webcomponents/issues/4177)) ([1a201d6](https://github.com/SAP/ui5-webcomponents/commit/1a201d6))
* **ui5-date-picker:** preventable change and input events ([#3609](https://github.com/SAP/ui5-webcomponents/issues/3609)) ([05e0769](https://github.com/SAP/ui5-webcomponents/commit/05e0769)), closes [#3516](https://github.com/SAP/ui5-webcomponents/issues/3516) [#3516](https://github.com/SAP/ui5-webcomponents/issues/3516)
* **ui5-dialog, ui5-popup:** SAP Horizon theme implementation  ([#4175](https://github.com/SAP/ui5-webcomponents/issues/4175)) ([fa2ed03](https://github.com/SAP/ui5-webcomponents/commit/fa2ed03))
* **ui5-file-uploader:** implement sap_horizon theme ([#4243](https://github.com/SAP/ui5-webcomponents/issues/4243)) ([b25ce73](https://github.com/SAP/ui5-webcomponents/commit/b25ce73))
* **ui5-input, ui5-combobox, ui5-multicombobox:** SAP Horizon Theme Implementation ([#4182](https://github.com/SAP/ui5-webcomponents/issues/4182)) ([1f1db07](https://github.com/SAP/ui5-webcomponents/commit/1f1db07))
* **ui5-input, ui5-date-picker:** implement sap_horizon theme ([#4006](https://github.com/SAP/ui5-webcomponents/issues/4006)) ([e137de3](https://github.com/SAP/ui5-webcomponents/commit/e137de3)), closes [#4040](https://github.com/SAP/ui5-webcomponents/issues/4040) [#4046](https://github.com/SAP/ui5-webcomponents/issues/4046)
* **ui5-li:** adjust focus styles to sap_horizon ([#4220](https://github.com/SAP/ui5-webcomponents/issues/4220)) ([7c8acae](https://github.com/SAP/ui5-webcomponents/commit/7c8acae))
* **ui5-link:** implement sap_horizon theme ([#4180](https://github.com/SAP/ui5-webcomponents/issues/4180)) ([410a8fb](https://github.com/SAP/ui5-webcomponents/commit/410a8fb))
* **ui5-list:** announce the selection mode of the list on entry ([#4018](https://github.com/SAP/ui5-webcomponents/issues/4018)) ([7cfba7a](https://github.com/SAP/ui5-webcomponents/commit/7cfba7a)), closes [#3806](https://github.com/SAP/ui5-webcomponents/issues/3806)
* **ui5-messageStrip:** SAP Horizon theme implementation ([#4167](https://github.com/SAP/ui5-webcomponents/issues/4167)) ([7026564](https://github.com/SAP/ui5-webcomponents/commit/7026564))
* **ui5-panel:** noAnimation property introduced ([#3694](https://github.com/SAP/ui5-webcomponents/issues/3694)) ([fc7972b](https://github.com/SAP/ui5-webcomponents/commit/fc7972b)), closes [#3505](https://github.com/SAP/ui5-webcomponents/issues/3505)
* **ui5-panel:** SAP Horizon theme implementation ([#4170](https://github.com/SAP/ui5-webcomponents/issues/4170)) ([1865ffa](https://github.com/SAP/ui5-webcomponents/commit/1865ffa))
* **ui5-panel, ui5-table:** SAP Horizon focus outline ([#4236](https://github.com/SAP/ui5-webcomponents/issues/4236)) ([289df14](https://github.com/SAP/ui5-webcomponents/commit/289df14))
* **ui5-popover, ui5-responsive-popover:** implement sap_horizon theme ([#4020](https://github.com/SAP/ui5-webcomponents/issues/4020)) ([441776e](https://github.com/SAP/ui5-webcomponents/commit/441776e))
* **ui5-progress-indicator:** implement displayValue property ([#3879](https://github.com/SAP/ui5-webcomponents/issues/3879)) ([50008d0](https://github.com/SAP/ui5-webcomponents/commit/50008d0)), closes [#3573](https://github.com/SAP/ui5-webcomponents/issues/3573) [#3573](https://github.com/SAP/ui5-webcomponents/issues/3573)
* **ui5-progress-indicator:** implement sap_horizon ([#4226](https://github.com/SAP/ui5-webcomponents/issues/4226)) ([fdde4d0](https://github.com/SAP/ui5-webcomponents/commit/fdde4d0))
* **ui5-radio-button:** implement sap_horizon theme ([#4008](https://github.com/SAP/ui5-webcomponents/issues/4008)) ([6cb3eb0](https://github.com/SAP/ui5-webcomponents/commit/6cb3eb0)), closes [#4042](https://github.com/SAP/ui5-webcomponents/issues/4042)
* **ui5-radio-button:** SAP Horizon theme implementation ([#4181](https://github.com/SAP/ui5-webcomponents/issues/4181)) ([2309c30](https://github.com/SAP/ui5-webcomponents/commit/2309c30))
* **ui5-rating-indicator:** SAP Horizon theme implementation ([#4173](https://github.com/SAP/ui5-webcomponents/issues/4173)) ([daba3f0](https://github.com/SAP/ui5-webcomponents/commit/daba3f0))
* **ui5-responsive-popover:** add prevent initial focus parameter to showAt method ([#3595](https://github.com/SAP/ui5-webcomponents/issues/3595)) ([62d1079](https://github.com/SAP/ui5-webcomponents/commit/62d1079)), closes [#3473](https://github.com/SAP/ui5-webcomponents/issues/3473)
* **ui5-segmented-button:** implement sap_horizon theme ([#4197](https://github.com/SAP/ui5-webcomponents/issues/4197)) ([33d0f60](https://github.com/SAP/ui5-webcomponents/commit/33d0f60))
* **ui5-select:** adjust input and icon to sap_horizon ([#4071](https://github.com/SAP/ui5-webcomponents/issues/4071)) ([0bb04ce](https://github.com/SAP/ui5-webcomponents/commit/0bb04ce))
* **ui5-select:** implement sap_horizon in dropdown ([#4229](https://github.com/SAP/ui5-webcomponents/issues/4229)) ([4ac73c3](https://github.com/SAP/ui5-webcomponents/commit/4ac73c3))
* **ui5-shellbar:** implement sap_horizon ([#4251](https://github.com/SAP/ui5-webcomponents/issues/4251)) ([7500a08](https://github.com/SAP/ui5-webcomponents/commit/7500a08))
* **ui5-slider, ui5-range-slider:** SAP Horizon theme implementation ([#4168](https://github.com/SAP/ui5-webcomponents/issues/4168)) ([a19159b](https://github.com/SAP/ui5-webcomponents/commit/a19159b))
* **ui5-switch:** implement sap_horizon theme ([#4007](https://github.com/SAP/ui5-webcomponents/issues/4007)) ([6e51776](https://github.com/SAP/ui5-webcomponents/commit/6e51776)), closes [#4039](https://github.com/SAP/ui5-webcomponents/issues/4039)
* **ui5-switch:** implement sap_horizon theme ([#4156](https://github.com/SAP/ui5-webcomponents/issues/4156)) ([e3f82a8](https://github.com/SAP/ui5-webcomponents/commit/e3f82a8))
* **ui5-tab-container:** adjust focus styles in overflow to sap_horizon ([e2a4bdc](https://github.com/SAP/ui5-webcomponents/commit/e2a4bdc))
* **ui5-tab-container:** SAP Horizon theme implementation ([#4207](https://github.com/SAP/ui5-webcomponents/issues/4207)) ([8c80e57](https://github.com/SAP/ui5-webcomponents/commit/8c80e57))
* **ui5-tabcontainer:** implement sap_horizon theme ([#4079](https://github.com/SAP/ui5-webcomponents/issues/4079)) ([89d945a](https://github.com/SAP/ui5-webcomponents/commit/89d945a)), closes [#4045](https://github.com/SAP/ui5-webcomponents/issues/4045)
* **ui5-table:** implement sap_horizon theme ([#4165](https://github.com/SAP/ui5-webcomponents/issues/4165)) ([fcfb180](https://github.com/SAP/ui5-webcomponents/commit/fcfb180))
* **ui5-textarea:** SAP Horizon theme implementation ([#4237](https://github.com/SAP/ui5-webcomponents/issues/4237)) ([37e87c8](https://github.com/SAP/ui5-webcomponents/commit/37e87c8))
* **ui5-time-picker:** implement sap_horizon theme ([16f83d7](https://github.com/SAP/ui5-webcomponents/commit/16f83d7))
* rework stableDomRef concept ([#4210](https://github.com/SAP/ui5-webcomponents/issues/4210)) ([d1ebea3](https://github.com/SAP/ui5-webcomponents/commit/d1ebea3))
* **ui5-toast:** SAP Horizon theme implementation ([#4174](https://github.com/SAP/ui5-webcomponents/issues/4174)) ([3618617](https://github.com/SAP/ui5-webcomponents/commit/3618617))
* **ui5-tree:** introduce item-mouseover/item-mouseout events ([#3990](https://github.com/SAP/ui5-webcomponents/issues/3990)) ([e8b6145](https://github.com/SAP/ui5-webcomponents/commit/e8b6145))
* introduce sap_horizon theme initial draft ([#3991](https://github.com/SAP/ui5-webcomponents/issues/3991)) ([b1afaf0](https://github.com/SAP/ui5-webcomponents/commit/b1afaf0)), closes [#3988](https://github.com/SAP/ui5-webcomponents/issues/3988)


### BREAKING CHANGES

* **ui5-breadcrumbs-item:** BreadcrumbsItem's stableDomRef property has been removed - use
getDomRef to get the matching actual DOM ref
* The icons SVG imports are changed. If you previously had
```js
import "@ui5/webcomponents-icons/dist/accept.svg";
```
 you have to import the SVGs from the **v4/**  or the **v5/** directory:
```js
import "@ui5/webcomponents-icons/dist/v4/accept.svg"; //  for SAPIcons4.0
import "@ui5/webcomponents-icons/dist/v5/accept.svg"; // for SAPIcons5.0
```
* **ui5-message-strip:** MessageStrip component's tag name has been renamed from ui5-messagestrip to ui5-message-strip.
* **ui5-input:** The "suggestion-scroll" event has been removed as there is no such UX specified.
* **ui5-color-palette-popover:** The selected color is now available as it is documented: event.detail.color





# [1.0.0-rc.15](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.14...v1.0.0-rc.15) (2021-07-23)


### Bug Fixes

* **CheckBox:** Prevent jumping of elements aligned with baseline when checking/unchecking ([#3408](https://github.com/SAP/ui5-webcomponents/issues/3408)) ([b458b80](https://github.com/SAP/ui5-webcomponents/commit/b458b80))
* **inputs:** use base CSS param for border-radius ([#3430](https://github.com/SAP/ui5-webcomponents/issues/3430)) ([4a4c5bc](https://github.com/SAP/ui5-webcomponents/commit/4a4c5bc))
* **list items:** rename info & infoState properties ([#3259](https://github.com/SAP/ui5-webcomponents/issues/3259)) ([ca42531](https://github.com/SAP/ui5-webcomponents/commit/ca42531)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-avatar-group:** click event is fired only once ([#3196](https://github.com/SAP/ui5-webcomponents/issues/3196)) ([95986e2](https://github.com/SAP/ui5-webcomponents/commit/95986e2))
* **ui5-avatar-group:** deprecate avatarSize property ([#3229](https://github.com/SAP/ui5-webcomponents/issues/3229)) ([fd60e90](https://github.com/SAP/ui5-webcomponents/commit/fd60e90))
* **ui5-avatar-group:** visual design deviations ([#3252](https://github.com/SAP/ui5-webcomponents/issues/3252)) ([49639e5](https://github.com/SAP/ui5-webcomponents/commit/49639e5)), closes [#3197](https://github.com/SAP/ui5-webcomponents/issues/3197)
* **ui5-busyindicator:** fix aria-labelledby value ([#3266](https://github.com/SAP/ui5-webcomponents/issues/3266)) ([ef2d332](https://github.com/SAP/ui5-webcomponents/commit/ef2d332)), closes [#3256](https://github.com/SAP/ui5-webcomponents/issues/3256)
* **ui5-busyindicator:** fix typo in styles ([#3178](https://github.com/SAP/ui5-webcomponents/issues/3178)) ([023945a](https://github.com/SAP/ui5-webcomponents/commit/023945a))
* **ui5-busyindicator:** focus handling improvements ([#3189](https://github.com/SAP/ui5-webcomponents/issues/3189)) ([1ab4e77](https://github.com/SAP/ui5-webcomponents/commit/1ab4e77)), closes [#3171](https://github.com/SAP/ui5-webcomponents/issues/3171)
* **ui5-button:** added belize parameters to bundle ([#3485](https://github.com/SAP/ui5-webcomponents/issues/3485)) ([97a8713](https://github.com/SAP/ui5-webcomponents/commit/97a8713)), closes [#3482](https://github.com/SAP/ui5-webcomponents/issues/3482)
* **ui5-button:** improve use of Theme Designer CSS Variables ([#3445](https://github.com/SAP/ui5-webcomponents/issues/3445)) ([baec4d4](https://github.com/SAP/ui5-webcomponents/commit/baec4d4))
* **ui5-button:** stabilizing buttons line-height ([#3416](https://github.com/SAP/ui5-webcomponents/issues/3416)) ([e679b51](https://github.com/SAP/ui5-webcomponents/commit/e679b51)), closes [#3401](https://github.com/SAP/ui5-webcomponents/issues/3401) [#3401](https://github.com/SAP/ui5-webcomponents/issues/3401)
* **ui5-calendar:** correct enable/disable of prev and next buttons ([#3249](https://github.com/SAP/ui5-webcomponents/issues/3249)) ([8c66d5a](https://github.com/SAP/ui5-webcomponents/commit/8c66d5a)), closes [#3201](https://github.com/SAP/ui5-webcomponents/issues/3201)
* **ui5-card:** correct content html tag ([#3464](https://github.com/SAP/ui5-webcomponents/issues/3464)) ([9832843](https://github.com/SAP/ui5-webcomponents/commit/9832843)), closes [#3439](https://github.com/SAP/ui5-webcomponents/issues/3439) [#3439](https://github.com/SAP/ui5-webcomponents/issues/3439)
* **ui5-card:** fix styles for slotted images ([#3301](https://github.com/SAP/ui5-webcomponents/issues/3301)) ([1683134](https://github.com/SAP/ui5-webcomponents/commit/1683134))
* **ui5-card:** rename heading/subheading to titleText/subtitleText ([#3316](https://github.com/SAP/ui5-webcomponents/issues/3316)) ([24fda86](https://github.com/SAP/ui5-webcomponents/commit/24fda86)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-card:** update border width and box shadow ([#3509](https://github.com/SAP/ui5-webcomponents/issues/3509)) ([76dcdbf](https://github.com/SAP/ui5-webcomponents/commit/76dcdbf))
* **ui5-carousel:** enhance public api ([#3360](https://github.com/SAP/ui5-webcomponents/issues/3360)) ([351d289](https://github.com/SAP/ui5-webcomponents/commit/351d289)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-carousel:** hide navigation arrows on mouse out ([#3174](https://github.com/SAP/ui5-webcomponents/issues/3174)) ([655ec49](https://github.com/SAP/ui5-webcomponents/commit/655ec49))
* **ui5-carousel:** implement hideNavigationArrows property ([#3228](https://github.com/SAP/ui5-webcomponents/issues/3228)) ([2adee01](https://github.com/SAP/ui5-webcomponents/commit/2adee01)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-checkbox:** add aria-hidden attribute to icon ([#3511](https://github.com/SAP/ui5-webcomponents/issues/3511)) ([18de8a1](https://github.com/SAP/ui5-webcomponents/commit/18de8a1)), closes [#3433](https://github.com/SAP/ui5-webcomponents/issues/3433)
* **ui5-color-palette:** rename change event ([#3429](https://github.com/SAP/ui5-webcomponents/issues/3429)) ([b1e2eaf](https://github.com/SAP/ui5-webcomponents/commit/b1e2eaf)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-color-palette:** updated sample ([#3373](https://github.com/SAP/ui5-webcomponents/issues/3373)) ([b2b6c56](https://github.com/SAP/ui5-webcomponents/commit/b2b6c56))
* **ui5-combobox:** announce selected item ([#3358](https://github.com/SAP/ui5-webcomponents/issues/3358)) ([941a414](https://github.com/SAP/ui5-webcomponents/commit/941a414))
* **ui5-combobox:** enable setting value programatically ([#3253](https://github.com/SAP/ui5-webcomponents/issues/3253)) ([d85561a](https://github.com/SAP/ui5-webcomponents/commit/d85561a))
* **ui5-combobox:** Properly focus inner input ([#3243](https://github.com/SAP/ui5-webcomponents/issues/3243)) ([790c02e](https://github.com/SAP/ui5-webcomponents/commit/790c02e))
* **ui5-date-*:** components accessibility improved ([#3163](https://github.com/SAP/ui5-webcomponents/issues/3163)) ([fe06f84](https://github.com/SAP/ui5-webcomponents/commit/fe06f84)), closes [#3002](https://github.com/SAP/ui5-webcomponents/issues/3002)
* **ui5-date-picker:**  does not trigger value verification upon typing([#2922](https://github.com/SAP/ui5-webcomponents/issues/2922)) ([f5e92e0](https://github.com/SAP/ui5-webcomponents/commit/f5e92e0)), closes [#2827](https://github.com/SAP/ui5-webcomponents/issues/2827)
* **ui5-date-picker:** calibrate the width and alignment of day names ([#3095](https://github.com/SAP/ui5-webcomponents/issues/3095)) ([b6c1a0a](https://github.com/SAP/ui5-webcomponents/commit/b6c1a0a))
* **ui5-daterange-picker:** month is not changed when select first dat… ([#3255](https://github.com/SAP/ui5-webcomponents/issues/3255)) ([290b60b](https://github.com/SAP/ui5-webcomponents/commit/290b60b)), closes [#3129](https://github.com/SAP/ui5-webcomponents/issues/3129)
* **ui5-datetime-picker:** selecting only date value now works correct ([#3294](https://github.com/SAP/ui5-webcomponents/issues/3294)) ([0a112ea](https://github.com/SAP/ui5-webcomponents/commit/0a112ea))
* **ui5-file-uploader:** hovering now gives correct button styles ([#3148](https://github.com/SAP/ui5-webcomponents/issues/3148)) ([a0ce732](https://github.com/SAP/ui5-webcomponents/commit/a0ce732))
* **ui5-input:** change public method to private ([#3224](https://github.com/SAP/ui5-webcomponents/issues/3224)) ([1166fb4](https://github.com/SAP/ui5-webcomponents/commit/1166fb4)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-input:** Suggestions count is read out when expected ([#3127](https://github.com/SAP/ui5-webcomponents/issues/3127)) ([76ec379](https://github.com/SAP/ui5-webcomponents/commit/76ec379)), closes [#3051](https://github.com/SAP/ui5-webcomponents/issues/3051)
* **ui5-label:** fix required label in safari ([#3182](https://github.com/SAP/ui5-webcomponents/issues/3182)) ([921ac5a](https://github.com/SAP/ui5-webcomponents/commit/921ac5a))
* **ui5-label:** rename wrap property to wrappingType ([#3341](https://github.com/SAP/ui5-webcomponents/issues/3341)) ([e591e04](https://github.com/SAP/ui5-webcomponents/commit/e591e04)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-li:** info text width ([#3184](https://github.com/SAP/ui5-webcomponents/issues/3184)) ([3b930af](https://github.com/SAP/ui5-webcomponents/commit/3b930af))
* **ui5-li:** remove “delete” button from tab chain([#3290](https://github.com/SAP/ui5-webcomponents/issues/3290)) ([5176954](https://github.com/SAP/ui5-webcomponents/commit/5176954)), closes [#2964](https://github.com/SAP/ui5-webcomponents/issues/2964)
* **ui5-li-tree:** fix arrow flickering ([#3293](https://github.com/SAP/ui5-webcomponents/issues/3293)) ([eca59f5](https://github.com/SAP/ui5-webcomponents/commit/eca59f5)), closes [#3238](https://github.com/SAP/ui5-webcomponents/issues/3238)
* **ui5-li-tree:** fixed incorrect background of selected item ([#3072](https://github.com/SAP/ui5-webcomponents/issues/3072)) ([bb5d65f](https://github.com/SAP/ui5-webcomponents/commit/bb5d65f)), closes [#2978](https://github.com/SAP/ui5-webcomponents/issues/2978)
* **ui5-li-tree:** fixed incorrect display of the text ([#3086](https://github.com/SAP/ui5-webcomponents/issues/3086)) ([684ccbf](https://github.com/SAP/ui5-webcomponents/commit/684ccbf))
* **ui5-li-tree:** hover and active visual state ([#3298](https://github.com/SAP/ui5-webcomponents/issues/3298)) ([4ac6d23](https://github.com/SAP/ui5-webcomponents/commit/4ac6d23))
* **ui5-li-tree:** info text visual appearance ([#3280](https://github.com/SAP/ui5-webcomponents/issues/3280)) ([1523e25](https://github.com/SAP/ui5-webcomponents/commit/1523e25)), closes [#3130](https://github.com/SAP/ui5-webcomponents/issues/3130)
* **ui5-link:** event is now fired on Space/Enter ([#3374](https://github.com/SAP/ui5-webcomponents/issues/3374)) ([ffa2c4c](https://github.com/SAP/ui5-webcomponents/commit/ffa2c4c)), closes [#3007](https://github.com/SAP/ui5-webcomponents/issues/3007) [#3007](https://github.com/SAP/ui5-webcomponents/issues/3007)
* **ui5-link:** rename wrap property to wrappingType ([#3380](https://github.com/SAP/ui5-webcomponents/issues/3380)) ([cff8fd4](https://github.com/SAP/ui5-webcomponents/commit/cff8fd4)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-list:** fixed keyboard navigation when a list is inside a list ([#3314](https://github.com/SAP/ui5-webcomponents/issues/3314)) ([15e235e](https://github.com/SAP/ui5-webcomponents/commit/15e235e))
* **ui5-list:** focus after element when TAB key is pressed ([#3220](https://github.com/SAP/ui5-webcomponents/issues/3220)) ([32a4148](https://github.com/SAP/ui5-webcomponents/commit/32a4148))
* **ui5-list:** prevent load-more on initial intersection ([#3105](https://github.com/SAP/ui5-webcomponents/issues/3105)) ([ef52f2b](https://github.com/SAP/ui5-webcomponents/commit/ef52f2b))
* **ui5-list:** prevent scrolling with space ([#3272](https://github.com/SAP/ui5-webcomponents/issues/3272)) ([0c7e58b](https://github.com/SAP/ui5-webcomponents/commit/0c7e58b)), closes [#3089](https://github.com/SAP/ui5-webcomponents/issues/3089)
* **ui5-list:** rename inset property to indent ([#3244](https://github.com/SAP/ui5-webcomponents/issues/3244)) ([eba1e64](https://github.com/SAP/ui5-webcomponents/commit/eba1e64)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-messagestrip:** rename properties ([#3346](https://github.com/SAP/ui5-webcomponents/issues/3346)) ([1cb43f2](https://github.com/SAP/ui5-webcomponents/commit/1cb43f2)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-messagestrip:** rename type property to design ([#3276](https://github.com/SAP/ui5-webcomponents/issues/3276)) ([4208d19](https://github.com/SAP/ui5-webcomponents/commit/4208d19)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-multi-combobox:** Fix failing test ([#3366](https://github.com/SAP/ui5-webcomponents/issues/3366)) ([a9edc74](https://github.com/SAP/ui5-webcomponents/commit/a9edc74))
* **ui5-popover:** Calculate max content height ([#3386](https://github.com/SAP/ui5-webcomponents/issues/3386)) ([8cba688](https://github.com/SAP/ui5-webcomponents/commit/8cba688))
* **ui5-popover:** rename noArrow property to hideArrow ([#3351](https://github.com/SAP/ui5-webcomponents/issues/3351)) ([39cc473](https://github.com/SAP/ui5-webcomponents/commit/39cc473)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-popup:** adjust default header height ([#3506](https://github.com/SAP/ui5-webcomponents/issues/3506)) ([ab11001](https://github.com/SAP/ui5-webcomponents/commit/ab11001))
* **ui5-popup:** scroll handle is now working for input controls ([#3414](https://github.com/SAP/ui5-webcomponents/issues/3414)) ([c5e00c4](https://github.com/SAP/ui5-webcomponents/commit/c5e00c4))
* **ui5-rating-indicator:** Aria-readonly attribute is added when RatingIndicator in not editable ([#3219](https://github.com/SAP/ui5-webcomponents/issues/3219)) ([b90933c](https://github.com/SAP/ui5-webcomponents/commit/b90933c))
* **ui5-rating-indicator:** rename maxValue property to max ([#3375](https://github.com/SAP/ui5-webcomponents/issues/3375)) ([8aaf99b](https://github.com/SAP/ui5-webcomponents/commit/8aaf99b))
* **ui5-responsive-popover:** fix header styles ([#3176](https://github.com/SAP/ui5-webcomponents/issues/3176)) ([83a88af](https://github.com/SAP/ui5-webcomponents/commit/83a88af)), closes [#3173](https://github.com/SAP/ui5-webcomponents/issues/3173)
* **ui5-responsive-popover:** fixed position of downward pointing arrow ([#3508](https://github.com/SAP/ui5-webcomponents/issues/3508)) ([e0744d6](https://github.com/SAP/ui5-webcomponents/commit/e0744d6)), closes [#3500](https://github.com/SAP/ui5-webcomponents/issues/3500)
* **ui5-select:** avoid global state in test spec ([#3106](https://github.com/SAP/ui5-webcomponents/issues/3106)) ([e835a50](https://github.com/SAP/ui5-webcomponents/commit/e835a50)), closes [#3000](https://github.com/SAP/ui5-webcomponents/issues/3000)
* **ui5-select:** display the selected option's icon ([#3348](https://github.com/SAP/ui5-webcomponents/issues/3348)) ([dac8183](https://github.com/SAP/ui5-webcomponents/commit/dac8183)), closes [#3344](https://github.com/SAP/ui5-webcomponents/issues/3344)
* **ui5-select:** enable home/end keys ([#3372](https://github.com/SAP/ui5-webcomponents/issues/3372)) ([b12a30b](https://github.com/SAP/ui5-webcomponents/commit/b12a30b))
* **ui5-slider, ui5-range-slider:** render only one top level element ([#3115](https://github.com/SAP/ui5-webcomponents/issues/3115)) ([c03f211](https://github.com/SAP/ui5-webcomponents/commit/c03f211))
* **ui5-step-input:** firing step input once when value is deleted ([#3474](https://github.com/SAP/ui5-webcomponents/issues/3474)) ([a5f27f2](https://github.com/SAP/ui5-webcomponents/commit/a5f27f2)), closes [#3457](https://github.com/SAP/ui5-webcomponents/issues/3457)
* **ui5-step-input:** min width is now correct ([#3398](https://github.com/SAP/ui5-webcomponents/issues/3398)) ([a8af480](https://github.com/SAP/ui5-webcomponents/commit/a8af480)), closes [#3377](https://github.com/SAP/ui5-webcomponents/issues/3377) [#3377](https://github.com/SAP/ui5-webcomponents/issues/3377)
* **ui5-tab:** rename semanticColor property to design ([#3336](https://github.com/SAP/ui5-webcomponents/issues/3336)) ([a7a0da1](https://github.com/SAP/ui5-webcomponents/commit/a7a0da1)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-tabcontainer:** tabs are scrolled into view on key navigation ([#3354](https://github.com/SAP/ui5-webcomponents/issues/3354)) ([d61a9b2](https://github.com/SAP/ui5-webcomponents/commit/d61a9b2))
* **ui5-table:** introduce hide-no-data property ([#3302](https://github.com/SAP/ui5-webcomponents/issues/3302)) ([d2d4397](https://github.com/SAP/ui5-webcomponents/commit/d2d4397))
* **ui5-table-row:** prevent space only when target is table row ([#3393](https://github.com/SAP/ui5-webcomponents/issues/3393)) ([d48b4c6](https://github.com/SAP/ui5-webcomponents/commit/d48b4c6))
* **ui5-textarea:** revert value on escape ([#3261](https://github.com/SAP/ui5-webcomponents/issues/3261)) ([7b60885](https://github.com/SAP/ui5-webcomponents/commit/7b60885))
* **ui5-time-picker:** accessibility improved ([#3162](https://github.com/SAP/ui5-webcomponents/issues/3162)) ([927abf6](https://github.com/SAP/ui5-webcomponents/commit/927abf6)), closes [#3010](https://github.com/SAP/ui5-webcomponents/issues/3010)
* **ui5-title:** rename wrap property to wrappingType ([#3379](https://github.com/SAP/ui5-webcomponents/issues/3379)) ([448c726](https://github.com/SAP/ui5-webcomponents/commit/448c726))
* **ui5-tree:** alignment of items ([#3424](https://github.com/SAP/ui5-webcomponents/issues/3424)) ([788d25d](https://github.com/SAP/ui5-webcomponents/commit/788d25d))
* **ui5-wheelslider:** correcting the placement on mobile in different fontsizes ([#3396](https://github.com/SAP/ui5-webcomponents/issues/3396)) ([6104b80](https://github.com/SAP/ui5-webcomponents/commit/6104b80))
* keep invisible texts out of the view port ([#3085](https://github.com/SAP/ui5-webcomponents/issues/3085)) ([de47520](https://github.com/SAP/ui5-webcomponents/commit/de47520)), closes [#2723](https://github.com/SAP/ui5-webcomponents/issues/2723) [#2723](https://github.com/SAP/ui5-webcomponents/issues/2723)


### Code Refactoring

* **ui5-input:** remove highlight property ([#3350](https://github.com/SAP/ui5-webcomponents/issues/3350)) ([6630c2a](https://github.com/SAP/ui5-webcomponents/commit/6630c2a))


### Features

* rename aria-label to accessible-name ([#3449](https://github.com/SAP/ui5-webcomponents/issues/3449)) ([f4f5864](https://github.com/SAP/ui5-webcomponents/commit/f4f5864))
* **invisibleMessage:** introduce invisibleMessage util ([#3192](https://github.com/SAP/ui5-webcomponents/issues/3192)) ([0a33c40](https://github.com/SAP/ui5-webcomponents/commit/0a33c40))
* **ui5-avatar:** implement default slot ([#3237](https://github.com/SAP/ui5-webcomponents/issues/3237)) ([9646c3e](https://github.com/SAP/ui5-webcomponents/commit/9646c3e))
* **ui5-avatar-group:** Implement accessibility specification ([#3154](https://github.com/SAP/ui5-webcomponents/issues/3154)) ([baec15b](https://github.com/SAP/ui5-webcomponents/commit/baec15b)), closes [#2745](https://github.com/SAP/ui5-webcomponents/issues/2745)
* **ui5-busy-indicator:** add new "delay" property ([#3419](https://github.com/SAP/ui5-webcomponents/issues/3419)) ([cc8acc7](https://github.com/SAP/ui5-webcomponents/commit/cc8acc7))
* **ui5-button:** introducing attention type button ([#3481](https://github.com/SAP/ui5-webcomponents/issues/3481)) ([2c9393c](https://github.com/SAP/ui5-webcomponents/commit/2c9393c)), closes [#3446](https://github.com/SAP/ui5-webcomponents/issues/3446)
* **ui5-carousel:** add property hide-page-indicator ([#3268](https://github.com/SAP/ui5-webcomponents/issues/3268)) ([e13a4c9](https://github.com/SAP/ui5-webcomponents/commit/e13a4c9)), closes [#3158](https://github.com/SAP/ui5-webcomponents/issues/3158)
* **ui5-checkbox:** add indeterminate state ([#3309](https://github.com/SAP/ui5-webcomponents/issues/3309)) ([42a1326](https://github.com/SAP/ui5-webcomponents/commit/42a1326)), closes [#3217](https://github.com/SAP/ui5-webcomponents/issues/3217)
* **ui5-checkbox:** add support  for "Success" value state ([#3278](https://github.com/SAP/ui5-webcomponents/issues/3278)) ([580e289](https://github.com/SAP/ui5-webcomponents/commit/580e289)), closes [#3198](https://github.com/SAP/ui5-webcomponents/issues/3198) [#3198](https://github.com/SAP/ui5-webcomponents/issues/3198)
* **ui5-color-palette:** implement show-recent-color functionality ([#3113](https://github.com/SAP/ui5-webcomponents/issues/3113)) ([4bcd049](https://github.com/SAP/ui5-webcomponents/commit/4bcd049))
* **ui5-combobox:** add suggestions grouping ([#3469](https://github.com/SAP/ui5-webcomponents/issues/3469)) ([5e3f391](https://github.com/SAP/ui5-webcomponents/commit/5e3f391)), closes [#3371](https://github.com/SAP/ui5-webcomponents/issues/3371)
* **ui5-dialog:** add keyboard support for draggable and resizable ([#3483](https://github.com/SAP/ui5-webcomponents/issues/3483)) ([8580fd8](https://github.com/SAP/ui5-webcomponents/commit/8580fd8))
* **ui5-dialog:** labeling of header slots is now possible ([#3155](https://github.com/SAP/ui5-webcomponents/issues/3155)) ([9943ee7](https://github.com/SAP/ui5-webcomponents/commit/9943ee7)), closes [#2838](https://github.com/SAP/ui5-webcomponents/issues/2838)
* **ui5-icon:** add accessibility role ([#3407](https://github.com/SAP/ui5-webcomponents/issues/3407)) ([4bb84e1](https://github.com/SAP/ui5-webcomponents/commit/4bb84e1))
* **ui5-input:** introduce new SuggestionGroupItem ([#3248](https://github.com/SAP/ui5-webcomponents/issues/3248)) ([39ccf7b](https://github.com/SAP/ui5-webcomponents/commit/39ccf7b)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107) [#1](https://github.com/SAP/ui5-webcomponents/issues/1) [#1](https://github.com/SAP/ui5-webcomponents/issues/1) [#2](https://github.com/SAP/ui5-webcomponents/issues/2)
* **ui5-li:** title attribute handle ([#3385](https://github.com/SAP/ui5-webcomponents/issues/3385)) ([2f67084](https://github.com/SAP/ui5-webcomponents/commit/2f67084))
* **ui5-li-custom, ui5-li, ui5-li-groupheader:** add accessibleName property ([#3269](https://github.com/SAP/ui5-webcomponents/issues/3269)) ([2f88da0](https://github.com/SAP/ui5-webcomponents/commit/2f88da0))
* **ui5-list:** support pressing DELETE key ([#3226](https://github.com/SAP/ui5-webcomponents/issues/3226)) ([db04d08](https://github.com/SAP/ui5-webcomponents/commit/db04d08)), closes [#3089](https://github.com/SAP/ui5-webcomponents/issues/3089)
* **ui5-panel:** expose content css part ([#3211](https://github.com/SAP/ui5-webcomponents/issues/3211)) ([267fc02](https://github.com/SAP/ui5-webcomponents/commit/267fc02))
* **ui5-segmented-button-item:** introduce new component to serve as child of SegmentedButton ([#3258](https://github.com/SAP/ui5-webcomponents/issues/3258)) ([9bd9ce4](https://github.com/SAP/ui5-webcomponents/commit/9bd9ce4)), closes [#3191](https://github.com/SAP/ui5-webcomponents/issues/3191) [#3191](https://github.com/SAP/ui5-webcomponents/issues/3191)
* **ui5-select:** support angular reactive forms ([#3323](https://github.com/SAP/ui5-webcomponents/issues/3323)) ([e369aef](https://github.com/SAP/ui5-webcomponents/commit/e369aef))
* **ui5-switch:** implement design property ([#3257](https://github.com/SAP/ui5-webcomponents/issues/3257)) ([998be76](https://github.com/SAP/ui5-webcomponents/commit/998be76)), closes [#3107](https://github.com/SAP/ui5-webcomponents/issues/3107)
* **ui5-table:** Introduce  Single and Multi selection ([#2848](https://github.com/SAP/ui5-webcomponents/issues/2848)) ([cc31280](https://github.com/SAP/ui5-webcomponents/commit/cc31280))
* **ui5-table-group-row:** introduce new component ([#3470](https://github.com/SAP/ui5-webcomponents/issues/3470)) ([d5ab16a](https://github.com/SAP/ui5-webcomponents/commit/d5ab16a)), closes [#3319](https://github.com/SAP/ui5-webcomponents/issues/3319)
* add keyboard handling docs ([#3194](https://github.com/SAP/ui5-webcomponents/issues/3194)) ([5a27d17](https://github.com/SAP/ui5-webcomponents/commit/5a27d17)), closes [#3089](https://github.com/SAP/ui5-webcomponents/issues/3089)
* expose dist paths as root paths via package.json export field ([#3274](https://github.com/SAP/ui5-webcomponents/issues/3274)) ([bd34a5e](https://github.com/SAP/ui5-webcomponents/commit/bd34a5e))


### BREAKING CHANGES

* **ui5-combobox:** filter value property is removed.
FIXES: https://github.com/SAP/ui5-webcomponents/issues/2233
* **ui5-input:** The highlight property is removed and the feature is enabled by default
* **ui5-input:** the isOpen method that used to return if the value state popover is open or closed has been removed.





# [1.0.0-rc.14](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.11...v1.0.0-rc.14) (2021-04-01)


### Bug Fixes

* **ui5-busyindicator:** add a11y support ([#2938](https://github.com/SAP/ui5-webcomponents/issues/2938)) ([cfa50d8](https://github.com/SAP/ui5-webcomponents/commit/cfa50d8)), closes [#2381](https://github.com/SAP/ui5-webcomponents/issues/2381)
* **ui5-button:** disable hover on mobile devices ([#2968](https://github.com/SAP/ui5-webcomponents/issues/2968)) ([c870eb4](https://github.com/SAP/ui5-webcomponents/commit/c870eb4))
* **ui5-dialog:** Fix aria-labelledby attribute value ([#3044](https://github.com/SAP/ui5-webcomponents/issues/3044)) ([e0ab900](https://github.com/SAP/ui5-webcomponents/commit/e0ab900)), closes [#2946](https://github.com/SAP/ui5-webcomponents/issues/2946)
* **ui5-dialog:** fix content stretching on Safari ([#3068](https://github.com/SAP/ui5-webcomponents/issues/3068)) ([573a6c6](https://github.com/SAP/ui5-webcomponents/commit/573a6c6)), closes [#3064](https://github.com/SAP/ui5-webcomponents/issues/3064)
* **ui5-dialog:** Fixed RTL mode ([#3070](https://github.com/SAP/ui5-webcomponents/issues/3070)) ([0aac048](https://github.com/SAP/ui5-webcomponents/commit/0aac048)), closes [#3013](https://github.com/SAP/ui5-webcomponents/issues/3013)
* **ui5-dialog:** Fixed scrollbars styling ([#3067](https://github.com/SAP/ui5-webcomponents/issues/3067)) ([f4301b8](https://github.com/SAP/ui5-webcomponents/commit/f4301b8)), closes [#2887](https://github.com/SAP/ui5-webcomponents/issues/2887)
* **ui5-input:** inner input padding is correctly updated ([#3015](https://github.com/SAP/ui5-webcomponents/issues/3015)) ([b00b02b](https://github.com/SAP/ui5-webcomponents/commit/b00b02b)), closes [#2940](https://github.com/SAP/ui5-webcomponents/issues/2940)
* **ui5-input:** Prevent dialog closing on Escape ([#3043](https://github.com/SAP/ui5-webcomponents/issues/3043)) ([c073ad4](https://github.com/SAP/ui5-webcomponents/commit/c073ad4))
* **ui5-li-tree:** fixed incorrect tree items alignment ([#3075](https://github.com/SAP/ui5-webcomponents/issues/3075)) ([4b83c7b](https://github.com/SAP/ui5-webcomponents/commit/4b83c7b)), closes [#3069](https://github.com/SAP/ui5-webcomponents/issues/3069)
* **ui5-select:** keyboard/selection handling improvement ([#2907](https://github.com/SAP/ui5-webcomponents/issues/2907)) ([f18fd45](https://github.com/SAP/ui5-webcomponents/commit/f18fd45))


### Features

* **ui5-avatar-group:** new slot overflowButton ([#3037](https://github.com/SAP/ui5-webcomponents/issues/3037)) ([6d47d68](https://github.com/SAP/ui5-webcomponents/commit/6d47d68)), closes [#2912](https://github.com/SAP/ui5-webcomponents/issues/2912)





# [1.0.0-rc.13](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.12...v1.0.0-rc.13) (2021-03-26)


### Bug Fixes

* **ui5-avatar:** fix click event fired twice ([#2967](https://github.com/SAP/ui5-webcomponents/issues/2967)) ([377c9bc](https://github.com/SAP/ui5-webcomponents/commit/377c9bc)), closes [#2943](https://github.com/SAP/ui5-webcomponents/issues/2943)
* **ui5-button:** disable hover on mobile devices ([#2968](https://github.com/SAP/ui5-webcomponents/issues/2968)) ([c870eb4](https://github.com/SAP/ui5-webcomponents/commit/c870eb4))
* **ui5-button:** set icon-only attribute properly ([#2567](https://github.com/SAP/ui5-webcomponents/issues/2567)) ([#2824](https://github.com/SAP/ui5-webcomponents/issues/2824)) ([d834ec6](https://github.com/SAP/ui5-webcomponents/commit/d834ec6))
* **ui5-button:** use standard CSS param for border-radius ([#2840](https://github.com/SAP/ui5-webcomponents/issues/2840)) ([a5aafde](https://github.com/SAP/ui5-webcomponents/commit/a5aafde)), closes [#2830](https://github.com/SAP/ui5-webcomponents/issues/2830)
* **ui5-calendar:** re-render header on lang change ([#2939](https://github.com/SAP/ui5-webcomponents/issues/2939)) ([ad7adc5](https://github.com/SAP/ui5-webcomponents/commit/ad7adc5))
* **ui5-color-palette:** remove additional dots in more-colors ([#2958](https://github.com/SAP/ui5-webcomponents/issues/2958)) ([8ef07fe](https://github.com/SAP/ui5-webcomponents/commit/8ef07fe))
* **ui5-daterange-picker:** working with format pattern containing the delimiter ([#2873](https://github.com/SAP/ui5-webcomponents/issues/2873)) ([b397862](https://github.com/SAP/ui5-webcomponents/commit/b397862))
* **ui5-icon:** fix click event fired twice ([#2858](https://github.com/SAP/ui5-webcomponents/issues/2858)) ([6fd6a5e](https://github.com/SAP/ui5-webcomponents/commit/6fd6a5e)), closes [#2857](https://github.com/SAP/ui5-webcomponents/issues/2857)
* **ui5-input:** remove the 'submit' event ([#2855](https://github.com/SAP/ui5-webcomponents/issues/2855)) ([9e409e6](https://github.com/SAP/ui5-webcomponents/commit/9e409e6))
* **ui5-label:** text-align works with wrap property ([#2889](https://github.com/SAP/ui5-webcomponents/issues/2889)) ([c9f86a7](https://github.com/SAP/ui5-webcomponents/commit/c9f86a7))
* **ui5-li-custom:** keyboard handling improvement ([#2870](https://github.com/SAP/ui5-webcomponents/issues/2870)) ([583f5f0](https://github.com/SAP/ui5-webcomponents/commit/583f5f0)), closes [#2849](https://github.com/SAP/ui5-webcomponents/issues/2849)
* **ui5-multi-combobox:** correct focus handling when picker is opened via icon ([#2868](https://github.com/SAP/ui5-webcomponents/issues/2868)) ([76ef62c](https://github.com/SAP/ui5-webcomponents/commit/76ef62c))
* **ui5-page:** correct background-design styles ([#2862](https://github.com/SAP/ui5-webcomponents/issues/2862)) ([b10ee4c](https://github.com/SAP/ui5-webcomponents/commit/b10ee4c))
* **ui5-popover:** calculate offset for all sides of the page ([#2916](https://github.com/SAP/ui5-webcomponents/issues/2916)) ([e35cc1a](https://github.com/SAP/ui5-webcomponents/commit/e35cc1a))
* **ui5-popup:** position arrows correctly ([#2917](https://github.com/SAP/ui5-webcomponents/issues/2917)) ([5ffbbd9](https://github.com/SAP/ui5-webcomponents/commit/5ffbbd9)), closes [#2758](https://github.com/SAP/ui5-webcomponents/issues/2758) [#2401](https://github.com/SAP/ui5-webcomponents/issues/2401)
* **ui5-rangeslider:** fix handles opacity for IE11 ([#2983](https://github.com/SAP/ui5-webcomponents/issues/2983)) ([f0346c0](https://github.com/SAP/ui5-webcomponents/commit/f0346c0))
* **ui5-select:** incorrect value color is now fixed ([#2914](https://github.com/SAP/ui5-webcomponents/issues/2914)) ([0a074c9](https://github.com/SAP/ui5-webcomponents/commit/0a074c9))
* **ui5-select:** set aria-expanded initially ([#2991](https://github.com/SAP/ui5-webcomponents/issues/2991)) ([8353ac2](https://github.com/SAP/ui5-webcomponents/commit/8353ac2)), closes [#2987](https://github.com/SAP/ui5-webcomponents/issues/2987)
* **ui5-slider:** focus outline fully visible ([#2971](https://github.com/SAP/ui5-webcomponents/issues/2971)) ([cb849ba](https://github.com/SAP/ui5-webcomponents/commit/cb849ba))
* **ui5-table:** bottom borded added ([#2994](https://github.com/SAP/ui5-webcomponents/issues/2994)) ([802b6ca](https://github.com/SAP/ui5-webcomponents/commit/802b6ca)), closes [#2981](https://github.com/SAP/ui5-webcomponents/issues/2981)
* **ui5-table-column:** align content right in RTL ([#2955](https://github.com/SAP/ui5-webcomponents/issues/2955)) ([c117fe3](https://github.com/SAP/ui5-webcomponents/commit/c117fe3)), closes [#2945](https://github.com/SAP/ui5-webcomponents/issues/2945)
* **ui5-table-row:** fire row-click on SPACE/ENTER ([#2954](https://github.com/SAP/ui5-webcomponents/issues/2954)) ([1e328dc](https://github.com/SAP/ui5-webcomponents/commit/1e328dc)), closes [#2944](https://github.com/SAP/ui5-webcomponents/issues/2944)
* **ui5-togglebutton:** fix hover background on desktop ([#2984](https://github.com/SAP/ui5-webcomponents/issues/2984)) ([4f2a2cb](https://github.com/SAP/ui5-webcomponents/commit/4f2a2cb))


### Features

* **ui5-color-palette:** implement more-colors property ([#2853](https://github.com/SAP/ui5-webcomponents/issues/2853)) ([121bb2c](https://github.com/SAP/ui5-webcomponents/commit/121bb2c))
* **ui5-list:** introduce "growing" property ([#2950](https://github.com/SAP/ui5-webcomponents/issues/2950)) ([6fbbb21](https://github.com/SAP/ui5-webcomponents/commit/6fbbb21)), closes [#2882](https://github.com/SAP/ui5-webcomponents/issues/2882) [#2882](https://github.com/SAP/ui5-webcomponents/issues/2882)
* **ui5-tabcontainer:** support responsive paddings ([#2775](https://github.com/SAP/ui5-webcomponents/issues/2775)) ([19392ff](https://github.com/SAP/ui5-webcomponents/commit/19392ff)), closes [#2539](https://github.com/SAP/ui5-webcomponents/issues/2539)
* **ui5-table:** add growing on scroll ([#2593](https://github.com/SAP/ui5-webcomponents/issues/2593)) ([87520c2](https://github.com/SAP/ui5-webcomponents/commit/87520c2)), closes [#2589](https://github.com/SAP/ui5-webcomponents/issues/2589) [#2570](https://github.com/SAP/ui5-webcomponents/issues/2570)


### BREAKING CHANGES

* **ui5-input:** the 'submit' event is now removed. The 'submit' functionality must be added with a custom code - listen for the standard "keydown" event and check if ENTER is pressed to submit a form, containing the input component.




# [1.0.0-rc.12](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2021-02-18)


### Bug Fixes

* **ui5-avatar:** correct icon color ([#2658](https://github.com/SAP/ui5-webcomponents/issues/2658)) ([5a85687](https://github.com/SAP/ui5-webcomponents/commit/5a85687)), closes [#2555](https://github.com/SAP/ui5-webcomponents/issues/2555)
* **ui5-calendar:** "today" is now timezone aware([#2660](https://github.com/SAP/ui5-webcomponents/issues/2660)) ([32dd0ef](https://github.com/SAP/ui5-webcomponents/commit/32dd0ef))
* **ui5-checkbox:** use aria-hidden for inner input ([#2828](https://github.com/SAP/ui5-webcomponents/issues/2828)) ([d237401](https://github.com/SAP/ui5-webcomponents/commit/d237401)), closes [#2786](https://github.com/SAP/ui5-webcomponents/issues/2786)
* **ui5-checkbox:** vertical misalignment when wrap is true ([#2747](https://github.com/SAP/ui5-webcomponents/issues/2747)) ([9f027f1](https://github.com/SAP/ui5-webcomponents/commit/9f027f1))
* **ui5-combobox:** fix behaviour when enter is clicked ([a10acc8](https://github.com/SAP/ui5-webcomponents/commit/a10acc8))
* **ui5-combobox:** User action cancelled when clicking "X" on mobile ([#2742](https://github.com/SAP/ui5-webcomponents/issues/2742)) ([691c2e4](https://github.com/SAP/ui5-webcomponents/commit/691c2e4)), closes [#2449](https://github.com/SAP/ui5-webcomponents/issues/2449)
* **ui5-combobox, ui5-multicombobox:** center ValueState text ([#2733](https://github.com/SAP/ui5-webcomponents/issues/2733)) ([b2c770a](https://github.com/SAP/ui5-webcomponents/commit/b2c770a)), closes [#2274](https://github.com/SAP/ui5-webcomponents/issues/2274)
* **ui5-date-picker:** input type is now conveyed ([#2628](https://github.com/SAP/ui5-webcomponents/issues/2628)) ([70e3269](https://github.com/SAP/ui5-webcomponents/commit/70e3269)), closes [#2604](https://github.com/SAP/ui5-webcomponents/issues/2604)
* **ui5-icon:** alignment issue in Safari ([#2746](https://github.com/SAP/ui5-webcomponents/issues/2746)) ([daa51e7](https://github.com/SAP/ui5-webcomponents/commit/daa51e7))
* **ui5-icon:** remove vertical icon flip in RTL ([#2645](https://github.com/SAP/ui5-webcomponents/issues/2645)) ([0120960](https://github.com/SAP/ui5-webcomponents/commit/0120960)), closes [#2644](https://github.com/SAP/ui5-webcomponents/issues/2644)
* **ui5-icon:** ui5-icon i18n works for all packages ([#2816](https://github.com/SAP/ui5-webcomponents/issues/2816)) ([91e16a1](https://github.com/SAP/ui5-webcomponents/commit/91e16a1))
* **ui5-input:** enable centering of text ([#2788](https://github.com/SAP/ui5-webcomponents/issues/2788)) ([bd1bd6e](https://github.com/SAP/ui5-webcomponents/commit/bd1bd6e))
* **ui5-input:** focus is handled properly ([#2670](https://github.com/SAP/ui5-webcomponents/issues/2670)) ([2c033aa](https://github.com/SAP/ui5-webcomponents/commit/2c033aa))
* **ui5-input:** Obsolete accessibility API removed ([#2721](https://github.com/SAP/ui5-webcomponents/issues/2721)) ([014c985](https://github.com/SAP/ui5-webcomponents/commit/014c985)), closes [#2605](https://github.com/SAP/ui5-webcomponents/issues/2605)
* **ui5-input:** prevent selection of suggestion group item ([#2777](https://github.com/SAP/ui5-webcomponents/issues/2777)) ([6cc458b](https://github.com/SAP/ui5-webcomponents/commit/6cc458b)), closes [#2255](https://github.com/SAP/ui5-webcomponents/issues/2255)
* **ui5-input:** ValueStateMessage width fixed ([#2736](https://github.com/SAP/ui5-webcomponents/issues/2736)) ([1e8082d](https://github.com/SAP/ui5-webcomponents/commit/1e8082d))
* **ui5-list:** fix JS error on focusin ([#2720](https://github.com/SAP/ui5-webcomponents/issues/2720)) ([b36e54e](https://github.com/SAP/ui5-webcomponents/commit/b36e54e))
* **ui5-list:** remove busy indicator dom ([#2712](https://github.com/SAP/ui5-webcomponents/issues/2712)) ([fe76278](https://github.com/SAP/ui5-webcomponents/commit/fe76278))
* **ui5-list:** show busy ind over the list ([#2684](https://github.com/SAP/ui5-webcomponents/issues/2684)) ([ad56eaa](https://github.com/SAP/ui5-webcomponents/commit/ad56eaa))
* **ui5-multi-combobox:** fix livechange behaviour ([#2656](https://github.com/SAP/ui5-webcomponents/issues/2656)) ([57820dd](https://github.com/SAP/ui5-webcomponents/commit/57820dd))
* **ui5-multi-combobox:** The initial focus is set on the ui5-dialog ([#2702](https://github.com/SAP/ui5-webcomponents/issues/2702)) ([aeed733](https://github.com/SAP/ui5-webcomponents/commit/aeed733))
* **ui5-multi-input:** fix appearance in RTL ([#2782](https://github.com/SAP/ui5-webcomponents/issues/2782)) ([e842f23](https://github.com/SAP/ui5-webcomponents/commit/e842f23)), closes [#2749](https://github.com/SAP/ui5-webcomponents/issues/2749)
* **ui5-multicombobox:** Placeholder with tokens hidden ([#2785](https://github.com/SAP/ui5-webcomponents/issues/2785)) ([d769a0d](https://github.com/SAP/ui5-webcomponents/commit/d769a0d)), closes [#2261](https://github.com/SAP/ui5-webcomponents/issues/2261)
* **ui5-multiinput:** hide placeholder when tokens ([#2789](https://github.com/SAP/ui5-webcomponents/issues/2789)) ([679dae3](https://github.com/SAP/ui5-webcomponents/commit/679dae3)), closes [#2261](https://github.com/SAP/ui5-webcomponents/issues/2261)
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
* **ui5-upload-collection-item:** fix title behaviour on small screens ([#2699](https://github.com/SAP/ui5-webcomponents/issues/2699)) ([bb7c952](https://github.com/SAP/ui5-webcomponents/commit/bb7c952))


### Features

* **ui5-calendar:** Declarative dates support added ([#2648](https://github.com/SAP/ui5-webcomponents/issues/2648)) ([6602fba](https://github.com/SAP/ui5-webcomponents/commit/6602fba))
* **ui5-color-palette:** initial implementation ([#2731](https://github.com/SAP/ui5-webcomponents/issues/2731)) ([772424e](https://github.com/SAP/ui5-webcomponents/commit/772424e))
* **ui5-multi-combobox:** support two column layout for items ([#2642](https://github.com/SAP/ui5-webcomponents/issues/2642)) ([7742590](https://github.com/SAP/ui5-webcomponents/commit/7742590)), closes [#2637](https://github.com/SAP/ui5-webcomponents/issues/2637)
* **ui5-multi-input:** Implement accessibility specifications ([#2761](https://github.com/SAP/ui5-webcomponents/issues/2761)) ([2e7b968](https://github.com/SAP/ui5-webcomponents/commit/2e7b968))
* **ui5-range-slider:** focus and keyboard handling implementation ([#2620](https://github.com/SAP/ui5-webcomponents/issues/2620)) ([8c71ca4](https://github.com/SAP/ui5-webcomponents/commit/8c71ca4))
* **ui5-select:** Add support for disabled select options ([#2730](https://github.com/SAP/ui5-webcomponents/issues/2730)) ([e903164](https://github.com/SAP/ui5-webcomponents/commit/e903164)), closes [#2559](https://github.com/SAP/ui5-webcomponents/issues/2559)
* **ui5-slider:** focus and keyboard handling implementation ([#2614](https://github.com/SAP/ui5-webcomponents/issues/2614)) ([7b78c16](https://github.com/SAP/ui5-webcomponents/commit/7b78c16))
* **ui5-slider, ui5-range-slider:** implement a11y spec ([#2714](https://github.com/SAP/ui5-webcomponents/issues/2714)) ([cb76cf4](https://github.com/SAP/ui5-webcomponents/commit/cb76cf4)), closes [#2513](https://github.com/SAP/ui5-webcomponents/issues/2513)
* **ui5-table:** add growing on scroll ([#2593](https://github.com/SAP/ui5-webcomponents/issues/2593)) ([87520c2](https://github.com/SAP/ui5-webcomponents/commit/87520c2)), closes [#2589](https://github.com/SAP/ui5-webcomponents/issues/2589) [#2570](https://github.com/SAP/ui5-webcomponents/issues/2570)
* **ui5-tree-item:** implement info/infoState attributes ([#2711](https://github.com/SAP/ui5-webcomponents/issues/2711)) ([1f07d50](https://github.com/SAP/ui5-webcomponents/commit/1f07d50)), closes [#2633](https://github.com/SAP/ui5-webcomponents/issues/2633)
* create @ui5/webcomponents-ie11 package ([#2686](https://github.com/SAP/ui5-webcomponents/issues/2686)) ([1d3b37e](https://github.com/SAP/ui5-webcomponents/commit/1d3b37e))
* **ui5-tree:** implement acc spec  ([#2636](https://github.com/SAP/ui5-webcomponents/issues/2636)) ([4663b91](https://github.com/SAP/ui5-webcomponents/commit/4663b91)), closes [#2465](https://github.com/SAP/ui5-webcomponents/issues/2465)
* refactoring and new features for pickers ([#2598](https://github.com/SAP/ui5-webcomponents/issues/2598)) ([3e684b4](https://github.com/SAP/ui5-webcomponents/commit/3e684b4))





# [1.0.0-rc.11](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.10...v1.0.0-rc.11) (2020-12-21)


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
* **ui5-slider:** add more tests, add cozy styles, fix input event, fix tickmarks display ([#2508](https://github.com/SAP/ui5-webcomponents/issues/2508)) ([0cbc0bd](https://github.com/SAP/ui5-webcomponents/commit/0cbc0bd))
* **ui5-table:** improve accessibility ([#2534](https://github.com/SAP/ui5-webcomponents/issues/2534)) ([e06d6f3](https://github.com/SAP/ui5-webcomponents/commit/e06d6f3))
* **ui5-textarea:** announce required textarea ([#2385](https://github.com/SAP/ui5-webcomponents/issues/2385)) ([c2baf6b](https://github.com/SAP/ui5-webcomponents/commit/c2baf6b))
* **ui5-tree:** make the height of tree adjustable ([#2546](https://github.com/SAP/ui5-webcomponents/issues/2546)) ([1fc3180](https://github.com/SAP/ui5-webcomponents/commit/1fc3180)), closes [#2545](https://github.com/SAP/ui5-webcomponents/issues/2545)


### Features

* **framework:** Change child-parent invalidation API ([#2541](https://github.com/SAP/ui5-webcomponents/issues/2541)) ([a1a3f80](https://github.com/SAP/ui5-webcomponents/commit/a1a3f80))
* **ui5-avatar-group:** initial implementation ([#2524](https://github.com/SAP/ui5-webcomponents/issues/2524)) ([ae926ee](https://github.com/SAP/ui5-webcomponents/commit/ae926ee)), closes [#2409](https://github.com/SAP/ui5-webcomponents/issues/2409)
* **ui5-button:** implement title property ([#2492](https://github.com/SAP/ui5-webcomponents/issues/2492)) ([7ae9253](https://github.com/SAP/ui5-webcomponents/commit/7ae9253))
* **ui5-calendar:** introduce new component. ([#2424](https://github.com/SAP/ui5-webcomponents/issues/2424)) ([5470e23](https://github.com/SAP/ui5-webcomponents/commit/5470e23)), closes [#1730](https://github.com/SAP/ui5-webcomponents/issues/1730)
* **ui5-combobox:** аdd two-column layout support ([#2503](https://github.com/SAP/ui5-webcomponents/issues/2503)) ([679362d](https://github.com/SAP/ui5-webcomponents/commit/679362d)), closes [#2450](https://github.com/SAP/ui5-webcomponents/issues/2450)
* **ui5-date-picker:** component is now aligned with the specification ([#2304](https://github.com/SAP/ui5-webcomponents/issues/2304)) ([30d9d2b](https://github.com/SAP/ui5-webcomponents/commit/30d9d2b)), closes [#2151](https://github.com/SAP/ui5-webcomponents/issues/2151)
* **ui5-mcb:** introduces filter property ([#2088](https://github.com/SAP/ui5-webcomponents/issues/2088)) ([03cae4b](https://github.com/SAP/ui5-webcomponents/commit/03cae4b))
* **ui5-mcb-item:** implement stable-dom-ref property ([#2418](https://github.com/SAP/ui5-webcomponents/issues/2418)) ([6e4a156](https://github.com/SAP/ui5-webcomponents/commit/6e4a156))
* **ui5-option:** provide stableDomRef ([#2366](https://github.com/SAP/ui5-webcomponents/issues/2366)) ([50304f5](https://github.com/SAP/ui5-webcomponents/commit/50304f5)), closes [#1718](https://github.com/SAP/ui5-webcomponents/issues/1718)
* **ui5-popover:** implement hide-block-layer property ([#2413](https://github.com/SAP/ui5-webcomponents/issues/2413)) ([3b2d6de](https://github.com/SAP/ui5-webcomponents/commit/3b2d6de))
* **ui5-range-slider:** Add Range Slider component ([#2310](https://github.com/SAP/ui5-webcomponents/issues/2310)) ([9dea3b3](https://github.com/SAP/ui5-webcomponents/commit/9dea3b3))
* **ui5-slider:** Add Slider component ([#2349](https://github.com/SAP/ui5-webcomponents/issues/2349)) ([2b9008c](https://github.com/SAP/ui5-webcomponents/commit/2b9008c))
* **ui5-table:** add "loadMore" capability ([#2589](https://github.com/SAP/ui5-webcomponents/issues/2589)) ([2e5d5cd](https://github.com/SAP/ui5-webcomponents/commit/2e5d5cd))





# [1.0.0-rc.10](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.9...v1.0.0-rc.10) (2020-11-12)


### Bug Fixes

* **ui5-combobox:** allow typing in input on mobile devices ([#2412](https://github.com/SAP/ui5-webcomponents/issues/2412)) ([7bf44b5](https://github.com/SAP/ui5-webcomponents/commit/7bf44b5)), closes [#2324](https://github.com/SAP/ui5-webcomponents/issues/2324)
* **ui5-date-picker:**  hiding month button when month picker is shown ([#2331](https://github.com/SAP/ui5-webcomponents/issues/2331)) ([6454e29](https://github.com/SAP/ui5-webcomponents/commit/6454e29)), closes [#2244](https://github.com/SAP/ui5-webcomponents/issues/2244)
* **ui5-date-picker:** Updating navigation buttons states live in mont… ([#2307](https://github.com/SAP/ui5-webcomponents/issues/2307)) ([4f39aa4](https://github.com/SAP/ui5-webcomponents/commit/4f39aa4))
* **ui5-day-picker:** fix color contrast of selected day in HCB ([#2378](https://github.com/SAP/ui5-webcomponents/issues/2378)) ([ff67141](https://github.com/SAP/ui5-webcomponents/commit/ff67141)), closes [#2372](https://github.com/SAP/ui5-webcomponents/issues/2372)
* **ui5-dialog:** no longer gets clipped in short screen height in IE ([#2429](https://github.com/SAP/ui5-webcomponents/issues/2429)) ([03c8447](https://github.com/SAP/ui5-webcomponents/commit/03c8447)), closes [#2243](https://github.com/SAP/ui5-webcomponents/issues/2243)
* **ui5-dialog:** Texts are no longer blurred in Chromium-based browsers ([#2417](https://github.com/SAP/ui5-webcomponents/issues/2417)) ([eac514b](https://github.com/SAP/ui5-webcomponents/commit/eac514b))
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


### Features

* **ui5-checkbox:** implement ariaLabelledby property ([#2272](https://github.com/SAP/ui5-webcomponents/issues/2272)) ([cbf2461](https://github.com/SAP/ui5-webcomponents/commit/cbf2461))
* **ui5-daterange-picker:** enhance keyboard handling ([#2179](https://github.com/SAP/ui5-webcomponents/issues/2179)) ([84eb484](https://github.com/SAP/ui5-webcomponents/commit/84eb484)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-dialog:** introduce resizable property ([#2301](https://github.com/SAP/ui5-webcomponents/issues/2301)) ([8be4048](https://github.com/SAP/ui5-webcomponents/commit/8be4048)), closes [#2082](https://github.com/SAP/ui5-webcomponents/issues/2082)
* **ui5-link:** add aria-label and aria-labelledby support ([#2357](https://github.com/SAP/ui5-webcomponents/issues/2357)) ([7e65e77](https://github.com/SAP/ui5-webcomponents/commit/7e65e77)), closes [#2356](https://github.com/SAP/ui5-webcomponents/issues/2356)


# [1.0.0-rc.9](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2020-10-08)


### Bug Fixes

* **components:** fix setting contentDensity styles ([#2094](https://github.com/SAP/ui5-webcomponents/issues/2094)) ([9454ab7](https://github.com/SAP/ui5-webcomponents/commit/9454ab7)), closes [#2093](https://github.com/SAP/ui5-webcomponents/issues/2093)
* **ui5-badge:** update colors to match the spec([#2216](https://github.com/SAP/ui5-webcomponents/issues/2216)) ([2ddc4e9](https://github.com/SAP/ui5-webcomponents/commit/2ddc4e9)), closes [#2210](https://github.com/SAP/ui5-webcomponents/issues/2210)
* **ui5-button:** prevent button with icons truncate in ie ([#2181](https://github.com/SAP/ui5-webcomponents/issues/2181)) ([31ca287](https://github.com/SAP/ui5-webcomponents/commit/31ca287))
* **ui5-calendar:** Year text is now right in all timezones ([#2209](https://github.com/SAP/ui5-webcomponents/issues/2209)) ([3427f35](https://github.com/SAP/ui5-webcomponents/commit/3427f35))
* **ui5-calendar-header:** prevent scrolling when month/year picker is selected ([#2276](https://github.com/SAP/ui5-webcomponents/issues/2276)) ([fac40a8](https://github.com/SAP/ui5-webcomponents/commit/fac40a8))
* **ui5-card:**  Apply focus to header properly in IE ([#2050](https://github.com/SAP/ui5-webcomponents/issues/2050)) ([00760e6](https://github.com/SAP/ui5-webcomponents/commit/00760e6)), closes [#2007](https://github.com/SAP/ui5-webcomponents/issues/2007)
* **ui5-combobox:** allow setting value with javascript ([#2253](https://github.com/SAP/ui5-webcomponents/issues/2253)) ([0742854](https://github.com/SAP/ui5-webcomponents/commit/0742854))
* **ui5-date-picker:** ensure min and max date are not disabled ([#2280](https://github.com/SAP/ui5-webcomponents/issues/2280)) ([f0473f0](https://github.com/SAP/ui5-webcomponents/commit/f0473f0))
* **ui5-date-picker:** select date with SPACE on keyup ([#2279](https://github.com/SAP/ui5-webcomponents/issues/2279)) ([9d83806](https://github.com/SAP/ui5-webcomponents/commit/9d83806)), closes [#2276](https://github.com/SAP/ui5-webcomponents/issues/2276) [#2268](https://github.com/SAP/ui5-webcomponents/issues/2268)
* **ui5-daterange-picker:** date selection is now correct in all timez… ([#2203](https://github.com/SAP/ui5-webcomponents/issues/2203)) ([2bca6f1](https://github.com/SAP/ui5-webcomponents/commit/2bca6f1))
* **ui5-daterange-picker:** enable selection of single day ([#2157](https://github.com/SAP/ui5-webcomponents/issues/2157)) ([66722b2](https://github.com/SAP/ui5-webcomponents/commit/66722b2))
* **ui5-daterange-picker:** fix firstDate/lastDate getters values ([#2277](https://github.com/SAP/ui5-webcomponents/issues/2277)) ([00f5ab5](https://github.com/SAP/ui5-webcomponents/commit/00f5ab5)), closes [#2221](https://github.com/SAP/ui5-webcomponents/issues/2221)
* **ui5-daterange-picker:** Fix icon appearance in IE ([#2057](https://github.com/SAP/ui5-webcomponents/issues/2057)) ([dba7a2c](https://github.com/SAP/ui5-webcomponents/commit/dba7a2c)), closes [#2017](https://github.com/SAP/ui5-webcomponents/issues/2017)
* **ui5-daterange-picker:** fix js error when removed from the DOM ([#2180](https://github.com/SAP/ui5-webcomponents/issues/2180)) ([6cb2a71](https://github.com/SAP/ui5-webcomponents/commit/6cb2a71))
* **ui5-daterange-picker:** show value in input only when first & last… ([#2098](https://github.com/SAP/ui5-webcomponents/issues/2098)) ([f56cb66](https://github.com/SAP/ui5-webcomponents/commit/f56cb66))
* **ui5-datetime-picker:** fix scrollbar issue in IE11 ([#2154](https://github.com/SAP/ui5-webcomponents/issues/2154)) ([306572f](https://github.com/SAP/ui5-webcomponents/commit/306572f))
* **ui5-duration-picker:** fix incorrect data support ([#2097](https://github.com/SAP/ui5-webcomponents/issues/2097)) ([4bcd797](https://github.com/SAP/ui5-webcomponents/commit/4bcd797))
* **ui5-input:** announce custom valueStateMessage ([#2120](https://github.com/SAP/ui5-webcomponents/issues/2120)) ([8f8a0d4](https://github.com/SAP/ui5-webcomponents/commit/8f8a0d4))
* **ui5-input:** cancel suggestion selection with ESC ([#2289](https://github.com/SAP/ui5-webcomponents/issues/2289)) ([ef1fb40](https://github.com/SAP/ui5-webcomponents/commit/ef1fb40)), closes [#2254](https://github.com/SAP/ui5-webcomponents/issues/2254)
* **ui5-input:** deselect suggestion items on input ([#2285](https://github.com/SAP/ui5-webcomponents/issues/2285)) ([a98c6bd](https://github.com/SAP/ui5-webcomponents/commit/a98c6bd)), closes [#2256](https://github.com/SAP/ui5-webcomponents/issues/2256)
* **ui5-input:** fix value state msg appearance ([#2075](https://github.com/SAP/ui5-webcomponents/issues/2075)) ([edfe8ca](https://github.com/SAP/ui5-webcomponents/commit/edfe8ca))
* **ui5-input:** implement aria-required ([#2114](https://github.com/SAP/ui5-webcomponents/issues/2114)) ([0e0de82](https://github.com/SAP/ui5-webcomponents/commit/0e0de82))
* **ui5-input:** number input doesn't lose value ([#2130](https://github.com/SAP/ui5-webcomponents/issues/2130)) ([2c6139d](https://github.com/SAP/ui5-webcomponents/commit/2c6139d))
* **ui5-li:** correct image size ([5c51dc6](https://github.com/SAP/ui5-webcomponents/commit/5c51dc6)), closes [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** correct sizes ([2faad25](https://github.com/SAP/ui5-webcomponents/commit/2faad25)), closes [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** fix visual deviations from Fiori 3 ([#2314](https://github.com/SAP/ui5-webcomponents/issues/2314)) ([d430632](https://github.com/SAP/ui5-webcomponents/commit/d430632)), closes [#2297](https://github.com/SAP/ui5-webcomponents/issues/2297) [#2218](https://github.com/SAP/ui5-webcomponents/issues/2218)
* **ui5-li:** Scale image properly ([#2059](https://github.com/SAP/ui5-webcomponents/issues/2059)) ([3aadc0e](https://github.com/SAP/ui5-webcomponents/commit/3aadc0e))
* **ui5-li-custom:** fix pointer-events inheritance ([#2196](https://github.com/SAP/ui5-webcomponents/issues/2196)) ([bfb9999](https://github.com/SAP/ui5-webcomponents/commit/bfb9999))
* **ui5-messagestrip:** Close button now has the correct design ([#2029](https://github.com/SAP/ui5-webcomponents/issues/2029)) ([7f99be5](https://github.com/SAP/ui5-webcomponents/commit/7f99be5))
* **ui5-multi-combobox:** fix behavior of show all selected button ([#2100](https://github.com/SAP/ui5-webcomponents/issues/2100)) ([84362e0](https://github.com/SAP/ui5-webcomponents/commit/84362e0))
* **ui5-multi-combobox:** fix jumping parent div ([#2136](https://github.com/SAP/ui5-webcomponents/issues/2136)) ([ad1fbd7](https://github.com/SAP/ui5-webcomponents/commit/ad1fbd7))
* **ui5-multi-combobox:** fix width in IE ([#2104](https://github.com/SAP/ui5-webcomponents/issues/2104)) ([af0785c](https://github.com/SAP/ui5-webcomponents/commit/af0785c))
* **ui5-multiinput:** Improve valueStateMessage in nMore popover ([#2225](https://github.com/SAP/ui5-webcomponents/issues/2225)) ([a03f2b3](https://github.com/SAP/ui5-webcomponents/commit/a03f2b3)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-popover:** fix arrow horizontal position ([#2129](https://github.com/SAP/ui5-webcomponents/issues/2129)) ([7a1c3eb](https://github.com/SAP/ui5-webcomponents/commit/7a1c3eb)), closes [#2111](https://github.com/SAP/ui5-webcomponents/issues/2111)
* **ui5-popover:** fix js errors if parent is removed from DOM ([#2178](https://github.com/SAP/ui5-webcomponents/issues/2178)) ([904da0e](https://github.com/SAP/ui5-webcomponents/commit/904da0e))
* **ui5-popup:** prevent interaction with the content under the popup ([#2119](https://github.com/SAP/ui5-webcomponents/issues/2119)) ([d6ffa48](https://github.com/SAP/ui5-webcomponents/commit/d6ffa48))
* **ui5-popup:** restore focus when block layer is clicked ([#2123](https://github.com/SAP/ui5-webcomponents/issues/2123)) ([c079722](https://github.com/SAP/ui5-webcomponents/commit/c079722))
* **ui5-popup, ui5-dialog:** remove closed instance from openedPopupsRegistry ([#2275](https://github.com/SAP/ui5-webcomponents/issues/2275)) ([443af29](https://github.com/SAP/ui5-webcomponents/commit/443af29))
* **ui5-select:** fix text color of disabled select in hcb/hcw ([#2248](https://github.com/SAP/ui5-webcomponents/issues/2248)) ([bc6dfec](https://github.com/SAP/ui5-webcomponents/commit/bc6dfec))
* **ui5-select:** make disabled select not focusable ([#2229](https://github.com/SAP/ui5-webcomponents/issues/2229)) ([960f927](https://github.com/SAP/ui5-webcomponents/commit/960f927))
* **ui5-tabcontainer:** Fix ARIA posinset and setsize values ([#2046](https://github.com/SAP/ui5-webcomponents/issues/2046)) ([c6fcf69](https://github.com/SAP/ui5-webcomponents/commit/c6fcf69)), closes [#2035](https://github.com/SAP/ui5-webcomponents/issues/2035)
* **ui5-tabcontainer:** Implement ACC for overflowed items ([#2047](https://github.com/SAP/ui5-webcomponents/issues/2047)) ([efe03bc](https://github.com/SAP/ui5-webcomponents/commit/efe03bc)), closes [#2036](https://github.com/SAP/ui5-webcomponents/issues/2036)
* **ui5-tabcontainer:** remove scroll from empty tabs ([#2148](https://github.com/SAP/ui5-webcomponents/issues/2148)) ([11af57e](https://github.com/SAP/ui5-webcomponents/commit/11af57e))
* **ui5-table-row:** announce entire row and columns ([#2164](https://github.com/SAP/ui5-webcomponents/issues/2164)) ([09863d8](https://github.com/SAP/ui5-webcomponents/commit/09863d8)), closes [#2160](https://github.com/SAP/ui5-webcomponents/issues/2160)
* **ui5-textarea:** add aria-required ([#2113](https://github.com/SAP/ui5-webcomponents/issues/2113)) ([4f35c92](https://github.com/SAP/ui5-webcomponents/commit/4f35c92))
* **ui5-textarea:** announce custom valueStateMessage ([#2122](https://github.com/SAP/ui5-webcomponents/issues/2122)) ([4d27065](https://github.com/SAP/ui5-webcomponents/commit/4d27065))
* Fix aria-disabled usage ([#2056](https://github.com/SAP/ui5-webcomponents/issues/2056)) ([bb624ae](https://github.com/SAP/ui5-webcomponents/commit/bb624ae))


### Features

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
* **ui5-select:** Implеment value state message ([4133a42](https://github.com/SAP/ui5-webcomponents/commit/4133a42)), closes [#1086](https://github.com/SAP/ui5-webcomponents/issues/1086)
* **ui5-select:** introduce required property ([#2116](https://github.com/SAP/ui5-webcomponents/issues/2116)) ([f66875a](https://github.com/SAP/ui5-webcomponents/commit/f66875a))
* **ui5-tab-container:** implement overflow-button slot ([#2192](https://github.com/SAP/ui5-webcomponents/issues/2192)) ([e91c200](https://github.com/SAP/ui5-webcomponents/commit/e91c200))
* **ui5-textarea:** add ariaLabel and ariaLabelledby properties ([#2124](https://github.com/SAP/ui5-webcomponents/issues/2124)) ([c005478](https://github.com/SAP/ui5-webcomponents/commit/c005478)), closes [#2107](https://github.com/SAP/ui5-webcomponents/issues/2107)
* **ui5-time-picker:** improve keyboard handling support ([#2092](https://github.com/SAP/ui5-webcomponents/issues/2092)) ([20c55ed](https://github.com/SAP/ui5-webcomponents/commit/20c55ed)), closes [#1534](https://github.com/SAP/ui5-webcomponents/issues/1534)
* **ui5-token:** provide closeIcon slot ([#2193](https://github.com/SAP/ui5-webcomponents/issues/2193)) ([d19fa5f](https://github.com/SAP/ui5-webcomponents/commit/d19fa5f))




# [1.0.0-rc.8](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2020-07-30)


### Bug Fixes

* **ui5-avatar:** Correct colors are applied for acc themes ([#1786](https://github.com/SAP/ui5-webcomponents/issues/1786)) ([42f1766](https://github.com/SAP/ui5-webcomponents/commit/42f1766))
* **ui5-avatar:** Image URL may now contain special characters ([#1828](https://github.com/SAP/ui5-webcomponents/issues/1828)) ([3acab5a](https://github.com/SAP/ui5-webcomponents/commit/3acab5a))
* **ui5-busy-indicator:** Fix double focus issue ([#1779](https://github.com/SAP/ui5-webcomponents/issues/1779)) ([f7bc0aa](https://github.com/SAP/ui5-webcomponents/commit/f7bc0aa))
* **ui5-busyindicator:** Set bigger opacity for IE ([#2010](https://github.com/SAP/ui5-webcomponents/issues/2010)) ([ab3f92f](https://github.com/SAP/ui5-webcomponents/commit/ab3f92f)), closes [#2005](https://github.com/SAP/ui5-webcomponents/issues/2005)
* **ui5-busyindicator:** Prevent keyboard events propagation to controls ([#1607](https://github.com/SAP/ui5-webcomponents/issues/1607)) ([031b6ca](https://github.com/SAP/ui5-webcomponents/commit/031b6ca))
* **ui5-button:** Determine icon-only ignoring comment nodes ([#1679](https://github.com/SAP/ui5-webcomponents/issues/1679)) ([ba1ee78](https://github.com/SAP/ui5-webcomponents/commit/ba1ee78))
* **ui5-button:** Make buttons truncate ([#1586](https://github.com/SAP/ui5-webcomponents/issues/1586)) ([1044daa](https://github.com/SAP/ui5-webcomponents/commit/1044daa))
* **ui5-button:** Align verticaly icon in IE ([#1823](https://github.com/SAP/ui5-webcomponents/issues/1823)) ([b003f05](https://github.com/SAP/ui5-webcomponents/commit/b003f05))
* **ui5-button:** Apply aria-expanded to inner button tag ([#1781](https://github.com/SAP/ui5-webcomponents/issues/1781)) ([df9e4e9](https://github.com/SAP/ui5-webcomponents/commit/df9e4e9))
* **ui5-card:** Remove header outline ([#1891](https://github.com/SAP/ui5-webcomponents/issues/1891)) ([8f260f8](https://github.com/SAP/ui5-webcomponents/commit/8f260f8))
* **ui5-carousel:** Make content under the navigation arrows accessible ([#2014](https://github.com/SAP/ui5-webcomponents/issues/2014)) ([8123288](https://github.com/SAP/ui5-webcomponents/commit/8123288))
* **ui5-combo-box:** Close picker when no match ([#1926](https://github.com/SAP/ui5-webcomponents/issues/1926)) ([dcac133](https://github.com/SAP/ui5-webcomponents/commit/dcac133)), closes [#1920](https://github.com/SAP/ui5-webcomponents/issues/1920)
* **ui5-combobox:** Close popover on "Enter" key press ([f0e2bac](https://github.com/SAP/ui5-webcomponents/commit/f0e2bac)), closes [#1940](https://github.com/SAP/ui5-webcomponents/issues/1940)
* **ui5-combobox:** Close popup on focusout ([#2013](https://github.com/SAP/ui5-webcomponents/issues/2013)) ([2c95be4](https://github.com/SAP/ui5-webcomponents/commit/2c95be4)), closes [#2009](https://github.com/SAP/ui5-webcomponents/issues/2009)
* **ui5-combobox:** Correct the display of items in popover ([23fb8b7](https://github.com/SAP/ui5-webcomponents/commit/23fb8b7)), closes [#1925](https://github.com/SAP/ui5-webcomponents/issues/1925)
* **ui5-combobox:** Support aria-label/arial-labelledby and fix aria-expanded ([#1916](https://github.com/SAP/ui5-webcomponents/issues/1916)) ([99a0e81](https://github.com/SAP/ui5-webcomponents/commit/99a0e81))
* **ui5-dialog:** Fix behaviour on mobile when added to DOM on interaction ([#1830](https://github.com/SAP/ui5-webcomponents/issues/1830)) ([f95807d](https://github.com/SAP/ui5-webcomponents/commit/f95807d))
* **ui5-file-uploader:** Fix JS error thrown in IE ([#2023](https://github.com/SAP/ui5-webcomponents/issues/2023)) ([61b0205](https://github.com/SAP/ui5-webcomponents/commit/61b0205))
* **ui5-input:** Fix inpur cursor movement in Safari ([#1983](https://github.com/SAP/ui5-webcomponents/issues/1983)) ([7a9e9a3](https://github.com/SAP/ui5-webcomponents/commit/7a9e9a3))
* **ui5-input:** Fix js error on mouseover/out ([#1931](https://github.com/SAP/ui5-webcomponents/issues/1931)) ([7da7a54](https://github.com/SAP/ui5-webcomponents/commit/7da7a54)), closes [#1930](https://github.com/SAP/ui5-webcomponents/issues/1930)
* **ui5-input:** Fix JS errors when open/close popups ([#1811](https://github.com/SAP/ui5-webcomponents/issues/1811)) ([cbe8bb8](https://github.com/SAP/ui5-webcomponents/commit/cbe8bb8))
* **ui5-input:** Fix scrolling item into view ([#1848](https://github.com/SAP/ui5-webcomponents/issues/1848)) ([5438c66](https://github.com/SAP/ui5-webcomponents/commit/5438c66)), closes [#1847](https://github.com/SAP/ui5-webcomponents/issues/1847)
* **ui5-input:** Fix selection color and bg ([#1954](https://github.com/SAP/ui5-webcomponents/issues/1954)) ([30c357a](https://github.com/SAP/ui5-webcomponents/commit/30c357a))
* **ui5-input:** Stop firing focusout on suggestion click ([#1857](https://github.com/SAP/ui5-webcomponents/issues/1857)) ([a33dd95](https://github.com/SAP/ui5-webcomponents/commit/a33dd95)), closes [#1846](https://github.com/SAP/ui5-webcomponents/issues/1846)
* **ui5-input:** Suggestions can now be arbitrary list items ([#1969](https://github.com/SAP/ui5-webcomponents/issues/1969)) ([aa6fde4](https://github.com/SAP/ui5-webcomponents/commit/aa6fde4))
* **ui5-input:** Sync width of suggestions popover and input ([#1979](https://github.com/SAP/ui5-webcomponents/issues/1979)) ([dd4633e](https://github.com/SAP/ui5-webcomponents/commit/dd4633e))
* **ui5-link:** Fix "click twice" issue in Safari ([#1799](https://github.com/SAP/ui5-webcomponents/issues/1799)) ([#1800](https://github.com/SAP/ui5-webcomponents/issues/1800)) ([0f69b84](https://github.com/SAP/ui5-webcomponents/commit/0f69b84)), closes [#1796](https://github.com/SAP/ui5-webcomponents/issues/1796)
* **ui5-panel:** The expand/collapse button is not in the DOM when fixed ([#1793](https://github.com/SAP/ui5-webcomponents/issues/1793)) ([0b1dc52](https://github.com/SAP/ui5-webcomponents/commit/0b1dc52))
* **ui5-segmentedbutton:** Buttons no longer shrink on click ([#2028](https://github.com/SAP/ui5-webcomponents/issues/2028)) ([7951adc](https://github.com/SAP/ui5-webcomponents/commit/7951adc))
* **ui5-select:** Selection now changes instantly ([#2031](https://github.com/SAP/ui5-webcomponents/issues/2031)) ([88ceb83](https://github.com/SAP/ui5-webcomponents/commit/88ceb83))
* **ui5-list:** No longer show a dot on IE ([#2011](https://github.com/SAP/ui5-webcomponents/issues/2011)) ([77cabba](https://github.com/SAP/ui5-webcomponents/commit/77cabba))
* **ui5-li-tree:** Fix aria-expanded value ([#1894](https://github.com/SAP/ui5-webcomponents/issues/1894)) ([06e5aa1](https://github.com/SAP/ui5-webcomponents/commit/06e5aa1)), closes [#1892](https://github.com/SAP/ui5-webcomponents/issues/1892)
* **ui5-sebmentedbutton:** Fix intermittent js error ([#1874](https://github.com/SAP/ui5-webcomponents/issues/1874)) ([c44d9aa](https://github.com/SAP/ui5-webcomponents/commit/c44d9aa))
* **ui5-select:** improve keyboard handling ([#1771](https://github.com/SAP/ui5-webcomponents/issues/1771)) ([f555180](https://github.com/SAP/ui5-webcomponents/commit/f555180))
* **ui5-tabcontainer:** The aria-controls now points to an existing ID ([#1817](https://github.com/SAP/ui5-webcomponents/issues/1817)) ([4bd3604](https://github.com/SAP/ui5-webcomponents/commit/4bd3604))
* **ui5-tabcontainer:** Correct selected text color used for sap_belize ([#1876](https://github.com/SAP/ui5-webcomponents/issues/1876)) ([09577b9](https://github.com/SAP/ui5-webcomponents/commit/09577b9))
* **ui5-tabcontainer:** Fix accessibility of overflow button ([#1978](https://github.com/SAP/ui5-webcomponents/issues/1978)) ([a7488cd](https://github.com/SAP/ui5-webcomponents/commit/a7488cd))
* **ui5-tabcontainer:** Fix box-shadow ([#1829](https://github.com/SAP/ui5-webcomponents/issues/1829)) ([42998c7](https://github.com/SAP/ui5-webcomponents/commit/42998c7))
* **ui5-tabcontainer:** Fix id duplication ([#1789](https://github.com/SAP/ui5-webcomponents/issues/1789)) ([511cb40](https://github.com/SAP/ui5-webcomponents/commit/511cb40))
* **ui5-tabcontainer:** Fix overflow visibility ([#1993](https://github.com/SAP/ui5-webcomponents/issues/1993)) ([d6c2cbc](https://github.com/SAP/ui5-webcomponents/commit/d6c2cbc))
* **ui5-tabcontainer:** Prevent the tabcontainer from setting the selected property on ui5-tab internally ([#1974](https://github.com/SAP/ui5-webcomponents/issues/1974)) ([0e8b5ea](https://github.com/SAP/ui5-webcomponents/commit/0e8b5ea))
* **ui5-textarea:** Add missing dependency, extract .hbs partial ([#1909](https://github.com/SAP/ui5-webcomponents/issues/1909)) ([25ed25f](https://github.com/SAP/ui5-webcomponents/commit/25ed25f))
* **ui5-togglebutton:** Align vertically icons in IE ([#1824](https://github.com/SAP/ui5-webcomponents/issues/1824)) ([2d5e84b](https://github.com/SAP/ui5-webcomponents/commit/2d5e84b))
* **ui5-datepicker:** Fix value state when min/max  set ([#1742](https://github.com/SAP/ui5-webcomponents/issues/1742)) ([681de1f](https://github.com/SAP/ui5-webcomponents/commit/681de1f)), closes [#1740](https://github.com/SAP/ui5-webcomponents/issues/1740)
* **ui5-datetime-picker:** Set min width ([#1698](https://github.com/SAP/ui5-webcomponents/issues/1698)) ([7313838](https://github.com/SAP/ui5-webcomponents/commit/7313838))
* **ui5-dialog:** Position block layer fixed ([#1757](https://github.com/SAP/ui5-webcomponents/issues/1757)) ([377075a](https://github.com/SAP/ui5-webcomponents/commit/377075a))
* **ui5-dialog:** Restrict max height and width based on spec ([#1665](https://github.com/SAP/ui5-webcomponents/issues/1665)) ([a00225c](https://github.com/SAP/ui5-webcomponents/commit/a00225c))
* **ui5-dialog:** Unblock body scrolling when dialog is removed from DOM ([#1756](https://github.com/SAP/ui5-webcomponents/issues/1756)) ([6742295](https://github.com/SAP/ui5-webcomponents/commit/6742295))
* **ui5-duration-picker:** Make maxValue work with values greater than 23:59:59 ([#1666](https://github.com/SAP/ui5-webcomponents/issues/1666)) ([da30bc1](https://github.com/SAP/ui5-webcomponents/commit/da30bc1))
* **ui5-file-uploader:** Setting the value to an empty string also resets the file input ([#1715](https://github.com/SAP/ui5-webcomponents/issues/1715)) ([f8b1b39](https://github.com/SAP/ui5-webcomponents/commit/f8b1b39))
* **ui5-icon:** Icon now has a correct role ([#1652](https://github.com/SAP/ui5-webcomponents/issues/1652)) ([d9933bd](https://github.com/SAP/ui5-webcomponents/commit/d9933bd))
* **ui5-input:** Announce selected item ([#1578](https://github.com/SAP/ui5-webcomponents/issues/1578)) ([b28f7c4](https://github.com/SAP/ui5-webcomponents/commit/b28f7c4))
* **ui5-label:** Fix width for italic labels ([#1625](https://github.com/SAP/ui5-webcomponents/issues/1625)) ([14a48d1](https://github.com/SAP/ui5-webcomponents/commit/14a48d1))
* **ui5-li:** Do not announce active list item type ([#1575](https://github.com/SAP/ui5-webcomponents/issues/1575)) ([ec14719](https://github.com/SAP/ui5-webcomponents/commit/ec14719))
* **ui5-list:** Fire itemClick after the selection ([#1618](https://github.com/SAP/ui5-webcomponents/issues/1618)) ([28326c5](https://github.com/SAP/ui5-webcomponents/commit/28326c5))
* **ui5-messagestrip:** Add RTL support ([#1741](https://github.com/SAP/ui5-webcomponents/issues/1741)) ([6172005](https://github.com/SAP/ui5-webcomponents/commit/6172005)), closes [#1739](https://github.com/SAP/ui5-webcomponents/issues/1739)
* **ui5-popover:** Close popup when no opener ([#1630](https://github.com/SAP/ui5-webcomponents/issues/1630)) ([bd46d7b](https://github.com/SAP/ui5-webcomponents/commit/bd46d7b))
* **ui5-popover:** Ensure offset from window borders ([#1690](https://github.com/SAP/ui5-webcomponents/issues/1690)) ([b673a0c](https://github.com/SAP/ui5-webcomponents/commit/b673a0c))
* **ui5-popover:** Fix closing order of popovers ([#1676](https://github.com/SAP/ui5-webcomponents/issues/1676)) ([14add07](https://github.com/SAP/ui5-webcomponents/commit/14add07))
* **ui5-segmentedbutton:** Add RTL support ([#1734](https://github.com/SAP/ui5-webcomponents/issues/1734)) ([1c6a9bb](https://github.com/SAP/ui5-webcomponents/commit/1c6a9bb))
* **ui5-segmentedbutton:** Fix measuring when parent is not displayed ([#1657](https://github.com/SAP/ui5-webcomponents/issues/1657)) ([d00b0be](https://github.com/SAP/ui5-webcomponents/commit/d00b0be))
* **ui5-segmentedbutton:** Fix rendering in ie ([#1622](https://github.com/SAP/ui5-webcomponents/issues/1622)) ([396993e](https://github.com/SAP/ui5-webcomponents/commit/396993e))
* **ui5-select:** Fix use of ESC leads to wrong selection ([#1724](https://github.com/SAP/ui5-webcomponents/issues/1724)) ([095d6dc](https://github.com/SAP/ui5-webcomponents/commit/095d6dc))
* **ui5-shellbar:** Fix search field focus handling ([#1636](https://github.com/SAP/ui5-webcomponents/issues/1636)) ([c65010b](https://github.com/SAP/ui5-webcomponents/commit/c65010b))
* **ui5-table:** Fire rowClick for popped in cells as well ([#1671](https://github.com/SAP/ui5-webcomponents/issues/1671)) ([c48f541](https://github.com/SAP/ui5-webcomponents/commit/c48f541))
* **ui5-table-cell:** Fix popin of long texts ([#1648](https://github.com/SAP/ui5-webcomponents/issues/1648)) ([61ce284](https://github.com/SAP/ui5-webcomponents/commit/61ce284))
* **ui5-table-column:** Fix sticky column overlaps dialogs ([#1609](https://github.com/SAP/ui5-webcomponents/issues/1609)) ([c80130d](https://github.com/SAP/ui5-webcomponents/commit/c80130d)), closes [#1602](https://github.com/SAP/ui5-webcomponents/issues/1602)
* **ui5-table-row:** Do not show the colon when there is no popin text ([#1620](https://github.com/SAP/ui5-webcomponents/issues/1620)) ([2785daf](https://github.com/SAP/ui5-webcomponents/commit/2785daf))
* **ui5-textarea:** Fix text vertical alignment ([#1668](https://github.com/SAP/ui5-webcomponents/issues/1668)) ([6790647](https://github.com/SAP/ui5-webcomponents/commit/6790647))
* **ui5-timepicker:** Adjust hours in 12hours format only ([#1752](https://github.com/SAP/ui5-webcomponents/issues/1752)) ([df0add4](https://github.com/SAP/ui5-webcomponents/commit/df0add4)), closes [#1714](https://github.com/SAP/ui5-webcomponents/issues/1714)
* **ui5-timepicker:** Fix firing "change" event for the same value ([#1764](https://github.com/SAP/ui5-webcomponents/issues/1764)) ([3a0c7d5](https://github.com/SAP/ui5-webcomponents/commit/3a0c7d5))
* **ui5-timepicker, ui5-duration-picker:**  enable  width customization ([#1669](https://github.com/SAP/ui5-webcomponents/issues/1669)) ([9cfcbbf](https://github.com/SAP/ui5-webcomponents/commit/9cfcbbf))


### Features

* **ui5-card:** add 'action' slot ([#1915](https://github.com/SAP/ui5-webcomponents/issues/1915)) ([97c299d](https://github.com/SAP/ui5-webcomponents/commit/97c299d))
* **ui5-carousel:** Introduce loadMore event ([#1667](https://github.com/SAP/ui5-webcomponents/issues/1667)) ([e7af480](https://github.com/SAP/ui5-webcomponents/commit/e7af480))
* **ui5-datepicker:** Add property to hide week numbers ([#1955](https://github.com/SAP/ui5-webcomponents/issues/1955)) ([d11c973](https://github.com/SAP/ui5-webcomponents/commit/d11c973)), closes [#1949](https://github.com/SAP/ui5-webcomponents/issues/1949)
* **ui5-datepicker:** Implement keyboard handling ([#1706](https://github.com/SAP/ui5-webcomponents/issues/1706)) ([15e915f](https://github.com/SAP/ui5-webcomponents/commit/15e915f))
* **ui5-datepicker:** Implement valuestatemessage slot ([#1476](https://github.com/SAP/ui5-webcomponents/issues/1476)) ([82b3d41](https://github.com/SAP/ui5-webcomponents/commit/82b3d41))
* **ui5-datepicker:** Set value attribute through date object ([#1624](https://github.com/SAP/ui5-webcomponents/issues/1624)) ([4d7586d](https://github.com/SAP/ui5-webcomponents/commit/4d7586d))
* **ui5-daterange-picker:** Initial implementation ([#1785](https://github.com/SAP/ui5-webcomponents/issues/1785)) ([4c11286](https://github.com/SAP/ui5-webcomponents/commit/4c11286))
* **ui5-duration-picker:** Implement hide-hours & hide-minutes propererties ([#1604](https://github.com/SAP/ui5-webcomponents/issues/1604)) ([0af9b00](https://github.com/SAP/ui5-webcomponents/commit/0af9b00))
* **ui5-duration-picker:** Implement seconds-step & minutes-step properties ([#1603](https://github.com/SAP/ui5-webcomponents/issues/1603)) ([37ee069](https://github.com/SAP/ui5-webcomponents/commit/37ee069))
* **ui5-fileuploader:** Implement accessiblity specification ([#1585](https://github.com/SAP/ui5-webcomponents/issues/1585)) ([76943bc](https://github.com/SAP/ui5-webcomponents/commit/76943bc))
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
* **ui5-popup:** Add support for aria-label ([#1898](https://github.com/SAP/ui5-webcomponents/issues/1898)) ([69d8ee4](https://github.com/SAP/ui5-webcomponents/commit/69d8ee4))
* **ui5-progress-indicator:** Initial implementation ([#1887](https://github.com/SAP/ui5-webcomponents/issues/1887)) ([e8009c9](https://github.com/SAP/ui5-webcomponents/commit/e8009c9)), closes [#1392](https://github.com/SAP/ui5-webcomponents/issues/1392)
* **ui5-popover:** Prevent closing when no opener ([#1911](https://github.com/SAP/ui5-webcomponents/issues/1911)) ([e7c2518](https://github.com/SAP/ui5-webcomponents/commit/e7c2518)), closes [#1768](https://github.com/SAP/ui5-webcomponents/issues/1768)
* **ui5-popup:** Custom popups work with focusable elements in the shadow root ([#1844](https://github.com/SAP/ui5-webcomponents/issues/1844)) ([a109558](https://github.com/SAP/ui5-webcomponents/commit/a109558))
* **ui5-rating-indicator:** Initial implementation ([#1729](https://github.com/SAP/ui5-webcomponents/issues/1729)) ([a28f201](https://github.com/SAP/ui5-webcomponents/commit/a28f201))
* **ui5-select:** Implement angular two way data binding ([#1583](https://github.com/SAP/ui5-webcomponents/issues/1583)) ([f1f3d4f](https://github.com/SAP/ui5-webcomponents/commit/f1f3d4f))
* **ui5-suggestion-item:** Enable mouseover|out events ([#1784](https://github.com/SAP/ui5-webcomponents/issues/1784)) ([4359b9a](https://github.com/SAP/ui5-webcomponents/commit/4359b9a))
* **ui5-tabcontainer:** Add expand/collapse animation ([#1617](https://github.com/SAP/ui5-webcomponents/issues/1617)) ([0c32950](https://github.com/SAP/ui5-webcomponents/commit/0c32950)), closes [#1540](https://github.com/SAP/ui5-webcomponents/issues/1540)
* **ui5-table:** Allow for custom styling ([#1627](https://github.com/SAP/ui5-webcomponents/issues/1627)) ([232e7f5](https://github.com/SAP/ui5-webcomponents/commit/232e7f5))
* **ui5-timepicker:** Implement valuestatemessage slot ([#1482](https://github.com/SAP/ui5-webcomponents/issues/1482)) ([b1d30f3](https://github.com/SAP/ui5-webcomponents/commit/b1d30f3))
* **ui5-tree:** Introduce new component ([#1580](https://github.com/SAP/ui5-webcomponents/issues/1580)) ([2dd97cf](https://github.com/SAP/ui5-webcomponents/commit/2dd97cf))





# [1.0.0-rc.7](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2020-04-30)


### Bug Fixes

* **ui5-busyindicator:** fix component placement and appearance in IE ([#1505](https://github.com/SAP/ui5-webcomponents/issues/1505)) ([0e57d78](https://github.com/SAP/ui5-webcomponents/commit/0e57d78))
* **ui5-button:** make aria-label work for ui5-button ([#1445](https://github.com/SAP/ui5-webcomponents/issues/1445)) ([f0f8964](https://github.com/SAP/ui5-webcomponents/commit/f0f8964))
* **ui5-button:** make aria-labelledby work with numeric id ([#1500](https://github.com/SAP/ui5-webcomponents/issues/1500)) ([ac6e8d2](https://github.com/SAP/ui5-webcomponents/commit/ac6e8d2))
* **ui5-carousel:** Content now shrinks properly ([#1402](https://github.com/SAP/ui5-webcomponents/issues/1402)) ([0e26906](https://github.com/SAP/ui5-webcomponents/commit/0e26906))
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
* **ui5-responsive-popover:** add minimum sizes ([#1539](https://github.com/SAP/ui5-webcomponents/issues/1539)) ([c4ae309](https://github.com/SAP/ui5-webcomponents/commit/c4ae309))
* **ui5-responsive-popover:** implement default close button ([#1501](https://github.com/SAP/ui5-webcomponents/issues/1501)) ([c6868af](https://github.com/SAP/ui5-webcomponents/commit/c6868af))
* **ui5-segmentedbutton:** button can no longer be clicked when disabled ([#1393](https://github.com/SAP/ui5-webcomponents/issues/1393)) ([576d769](https://github.com/SAP/ui5-webcomponents/commit/576d769))
* **ui5-segmentedbutton:** import ui5-togglebutton by default ([#1549](https://github.com/SAP/ui5-webcomponents/issues/1549)) ([bccf03b](https://github.com/SAP/ui5-webcomponents/commit/bccf03b))
* **ui5-select:** prevent scrolling on Space ([#1418](https://github.com/SAP/ui5-webcomponents/issues/1418)) ([fb500fc](https://github.com/SAP/ui5-webcomponents/commit/fb500fc))
* **ui5-tabcontainer:** clicking a tab now always works ([#1567](https://github.com/SAP/ui5-webcomponents/issues/1567)) ([dc60609](https://github.com/SAP/ui5-webcomponents/commit/dc60609))
* **ui5-textarea:** stop showing valueStateMsg in value-state="None" ([#1568](https://github.com/SAP/ui5-webcomponents/issues/1568)) ([832c34e](https://github.com/SAP/ui5-webcomponents/commit/832c34e))
* **ui5-timepicker:** fix AM/PM selection ([#1569](https://github.com/SAP/ui5-webcomponents/issues/1569)) ([ad923a2](https://github.com/SAP/ui5-webcomponents/commit/ad923a2))
* **ui5-timepicker:** periods apply fix ([#1502](https://github.com/SAP/ui5-webcomponents/issues/1502)) ([b0195b7](https://github.com/SAP/ui5-webcomponents/commit/b0195b7))
* **ui5-timepicker:** prevent setting valueState="Error" on empty value ([5a3d1b1](https://github.com/SAP/ui5-webcomponents/commit/5a3d1b1))


### Features

* **ui5-avatar:** implement accessibility spec ([#1484](https://github.com/SAP/ui5-webcomponents/issues/1484)) ([501740e](https://github.com/SAP/ui5-webcomponents/commit/501740e))
* **ui5-busyindicator:** implement text property ([#1506](https://github.com/SAP/ui5-webcomponents/issues/1506)) ([4118c68](https://github.com/SAP/ui5-webcomponents/commit/4118c68))
* **ui5-button:** support aria-labelledby attribute([#1446](https://github.com/SAP/ui5-webcomponents/issues/1446)) ([e54111f](https://github.com/SAP/ui5-webcomponents/commit/e54111f))
* **ui5-carousel:** add navigate event ([#1454](https://github.com/SAP/ui5-webcomponents/issues/1454)) ([c55bcdc](https://github.com/SAP/ui5-webcomponents/commit/c55bcdc))
* **ui5-carousel:** Allow different number of items per page based on component width ([#1434](https://github.com/SAP/ui5-webcomponents/issues/1434)) ([dec0d4d](https://github.com/SAP/ui5-webcomponents/commit/dec0d4d))
* **ui5-combobox:** implement accessibility spec ([#1560](https://github.com/SAP/ui5-webcomponents/issues/1560)) ([3d56b4d](https://github.com/SAP/ui5-webcomponents/commit/3d56b4d))
* **ui5-datetime-picker:** introduce new component ([#1437](https://github.com/SAP/ui5-webcomponents/issues/1437)) ([ef27ca1](https://github.com/SAP/ui5-webcomponents/commit/ef27ca1))
* **ui5-duration-picker:** initial implementation ([#1415](https://github.com/SAP/ui5-webcomponents/issues/1415)) ([e38392e](https://github.com/SAP/ui5-webcomponents/commit/e38392e))
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





# [1.0.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2020-03-27)


### Bug Fixes

* **docs:** display the ui5-popover API correctly ([#1064](https://github.com/SAP/ui5-webcomponents/issues/1064)) ([e1b5649](https://github.com/SAP/ui5-webcomponents/commit/e1b5649))
* **main:** add missing icons ([#1319](https://github.com/SAP/ui5-webcomponents/issues/1319)) ([6bebdb5](https://github.com/SAP/ui5-webcomponents/commit/6bebdb5))
* **ui5-avatar:** make styles attribute dependant ([#1360](https://github.com/SAP/ui5-webcomponents/issues/1360)) ([e2791b0](https://github.com/SAP/ui5-webcomponents/commit/e2791b0))
* **ui5-avatar:** remove background color when there is no image ([#1148](https://github.com/SAP/ui5-webcomponents/issues/1148)) ([2bd2204](https://github.com/SAP/ui5-webcomponents/commit/2bd2204))
* **ui5-busyindicator:** adjust stylings to latest spec ([#1344](https://github.com/SAP/ui5-webcomponents/issues/1344)) ([0af6c3d](https://github.com/SAP/ui5-webcomponents/commit/0af6c3d))
* **ui5-busyindicator:** display as size=Large by default ([#1315](https://github.com/SAP/ui5-webcomponents/issues/1315)) ([743f0b3](https://github.com/SAP/ui5-webcomponents/commit/743f0b3))
* **ui5-busyindicator:** improve stylings ([#1350](https://github.com/SAP/ui5-webcomponents/issues/1350)) ([c3dd3f4](https://github.com/SAP/ui5-webcomponents/commit/c3dd3f4))
* **ui5-button:** fix icon shrinking ([#1258](https://github.com/SAP/ui5-webcomponents/issues/1258)) ([be943ba](https://github.com/SAP/ui5-webcomponents/commit/be943ba))
* **ui5-calendar-header:** fix width in ie ([#1205](https://github.com/SAP/ui5-webcomponents/issues/1205)) ([2d21ae0](https://github.com/SAP/ui5-webcomponents/commit/2d21ae0))
* **ui5-card:** fix width ([#1165](https://github.com/SAP/ui5-webcomponents/issues/1165)) ([e463d23](https://github.com/SAP/ui5-webcomponents/commit/e463d23))
* **ui5-card:** update ACC support ([#1042](https://github.com/SAP/ui5-webcomponents/issues/1042)) ([3253555](https://github.com/SAP/ui5-webcomponents/commit/3253555))
* **ui5-carousel:** add missing icon imports ([#1365](https://github.com/SAP/ui5-webcomponents/issues/1365)) ([d6bb698](https://github.com/SAP/ui5-webcomponents/commit/d6bb698))
* **ui5-carousel:** add missing import ([#1321](https://github.com/SAP/ui5-webcomponents/issues/1321)) ([19445d1](https://github.com/SAP/ui5-webcomponents/commit/19445d1))
* **ui5-checkbox:** fix wrapping of a long word ([#1007](https://github.com/SAP/ui5-webcomponents/issues/1007)) ([2117ecc](https://github.com/SAP/ui5-webcomponents/commit/2117ecc))
* **ui5-combobox:** component improvements ([#1141](https://github.com/SAP/ui5-webcomponents/issues/1141)) ([e211227](https://github.com/SAP/ui5-webcomponents/commit/e211227))
* **ui5-datepicker:** fix hoverbg-color when readonly ([#1361](https://github.com/SAP/ui5-webcomponents/issues/1361)) ([1696cba](https://github.com/SAP/ui5-webcomponents/commit/1696cba))
* **ui5-daypicker:** show correct today ([#1157](https://github.com/SAP/ui5-webcomponents/issues/1157)) ([6fb1dd6](https://github.com/SAP/ui5-webcomponents/commit/6fb1dd6))
* **ui5-dialog:** dialog focus trapping works again ([#1213](https://github.com/SAP/ui5-webcomponents/issues/1213)) ([e899708](https://github.com/SAP/ui5-webcomponents/commit/e899708))
* **ui5-dialog:** provide min-width on desktop ([#1257](https://github.com/SAP/ui5-webcomponents/issues/1257)) ([05b208d](https://github.com/SAP/ui5-webcomponents/commit/05b208d))
* **ui5-dialog:** stretch content area of dialog [#920](https://github.com/SAP/ui5-webcomponents/issues/920) ([#1167](https://github.com/SAP/ui5-webcomponents/issues/1167)) ([894d457](https://github.com/SAP/ui5-webcomponents/commit/894d457))
* **ui5-icon:** remove promise rejection ([#1299](https://github.com/SAP/ui5-webcomponents/issues/1299)) ([902db58](https://github.com/SAP/ui5-webcomponents/commit/902db58))
* **ui5-icon:** remove unneccessary aria-label attribute ([#1284](https://github.com/SAP/ui5-webcomponents/issues/1284)) ([9f2e756](https://github.com/SAP/ui5-webcomponents/commit/9f2e756))
* **ui5-input:** border-color on hover ([#1154](https://github.com/SAP/ui5-webcomponents/issues/1154)) ([9393b50](https://github.com/SAP/ui5-webcomponents/commit/9393b50))
* **ui5-input:** fix exceptions thrown when KH used ([#1301](https://github.com/SAP/ui5-webcomponents/issues/1301)) ([85f01d7](https://github.com/SAP/ui5-webcomponents/commit/85f01d7))
* **ui5-input:** fix javascript error on mobile ([#1339](https://github.com/SAP/ui5-webcomponents/issues/1339)) ([c0ffbac](https://github.com/SAP/ui5-webcomponents/commit/c0ffbac))
* **ui5-label:** fix truncation when show-colon is set ([#1079](https://github.com/SAP/ui5-webcomponents/issues/1079)) ([9e84314](https://github.com/SAP/ui5-webcomponents/commit/9e84314))
* **ui5-li:** correct focus color when active ([#1143](https://github.com/SAP/ui5-webcomponents/issues/1143)) ([7c4ee77](https://github.com/SAP/ui5-webcomponents/commit/7c4ee77))
* **ui5-li:** fix active state on mobile ([#1169](https://github.com/SAP/ui5-webcomponents/issues/1169)) ([90223f8](https://github.com/SAP/ui5-webcomponents/commit/90223f8))
* **ui5-li:** prevent checkbox shrinking ([#1142](https://github.com/SAP/ui5-webcomponents/issues/1142)) ([964dbc2](https://github.com/SAP/ui5-webcomponents/commit/964dbc2))
* **ui5-link:** fix JS error when href is undefined ([#1373](https://github.com/SAP/ui5-webcomponents/issues/1373)) ([a7cf983](https://github.com/SAP/ui5-webcomponents/commit/a7cf983))
* **ui5-mcb:** open correct popover from show more text ([#1371](https://github.com/SAP/ui5-webcomponents/issues/1371)) ([68cb73d](https://github.com/SAP/ui5-webcomponents/commit/68cb73d))
* **ui5-multi-cbx:** remove horizontal scrollbar ([#1312](https://github.com/SAP/ui5-webcomponents/issues/1312)) ([05175c4](https://github.com/SAP/ui5-webcomponents/commit/05175c4))
* **ui5-popover:** add header and footer to focus trapping ([#1298](https://github.com/SAP/ui5-webcomponents/issues/1298)) ([0e0344c](https://github.com/SAP/ui5-webcomponents/commit/0e0344c))
* **ui5-popover:** z-index is now consistent with dialogs ([#1209](https://github.com/SAP/ui5-webcomponents/issues/1209)) ([5f8ce93](https://github.com/SAP/ui5-webcomponents/commit/5f8ce93))
* **ui5-responsive-popover:** set z-index on phone ([#1303](https://github.com/SAP/ui5-webcomponents/issues/1303)) ([a38b605](https://github.com/SAP/ui5-webcomponents/commit/a38b605))
* **ui5-segmentedbutton:** size adjustments ([#1225](https://github.com/SAP/ui5-webcomponents/issues/1225)) ([1a8f8b0](https://github.com/SAP/ui5-webcomponents/commit/1a8f8b0))
* **ui5-select:** fix component baseline alignment ([#1075](https://github.com/SAP/ui5-webcomponents/issues/1075)) ([37b7891](https://github.com/SAP/ui5-webcomponents/commit/37b7891))
* **ui5-select:** prevent selection from cycling ([#1066](https://github.com/SAP/ui5-webcomponents/issues/1066)) ([d46be1f](https://github.com/SAP/ui5-webcomponents/commit/d46be1f))
* **ui5-tabcontainer:** apply overflow items styles ([#1178](https://github.com/SAP/ui5-webcomponents/issues/1178)) ([63ca721](https://github.com/SAP/ui5-webcomponents/commit/63ca721))
* **ui5-tabcontainer:** fix sizes on compact ([#1364](https://github.com/SAP/ui5-webcomponents/issues/1364)) ([6a4738e](https://github.com/SAP/ui5-webcomponents/commit/6a4738e))
* **ui5-tabcontainer:** fix tab content overflow and height calculation ([#1056](https://github.com/SAP/ui5-webcomponents/issues/1056)) ([6b65fa4](https://github.com/SAP/ui5-webcomponents/commit/6b65fa4))
* **ui5-table:** optimize non popin table rendering ([#1229](https://github.com/SAP/ui5-webcomponents/issues/1229)) ([872dcad](https://github.com/SAP/ui5-webcomponents/commit/872dcad))
* **ui5-table-row:** fix 1st and "nodata" rows visual ([#1156](https://github.com/SAP/ui5-webcomponents/issues/1156)) ([991e546](https://github.com/SAP/ui5-webcomponents/commit/991e546))
* **ui5-textarea:** apply border and bg-color to native textarea ([#1250](https://github.com/SAP/ui5-webcomponents/issues/1250)) ([a804e30](https://github.com/SAP/ui5-webcomponents/commit/a804e30))
* **ui5-textarea:** fix bg-color in IE ([#1210](https://github.com/SAP/ui5-webcomponents/issues/1210)) ([c047da7](https://github.com/SAP/ui5-webcomponents/commit/c047da7))
* **ui5-timepicker:** fix JS Error, improve user XP and sample ([#1362](https://github.com/SAP/ui5-webcomponents/issues/1362)) ([f02477b](https://github.com/SAP/ui5-webcomponents/commit/f02477b))
* **ui5-toast:** infinite loop prevented ([#1320](https://github.com/SAP/ui5-webcomponents/issues/1320)) ([1c2a94a](https://github.com/SAP/ui5-webcomponents/commit/1c2a94a))
* **ui5-toast:** keep toast open when hovered ([#1294](https://github.com/SAP/ui5-webcomponents/issues/1294)) ([2f4fd6e](https://github.com/SAP/ui5-webcomponents/commit/2f4fd6e)), closes [#1292](https://github.com/SAP/ui5-webcomponents/issues/1292)
* **ui5-dialog:** Dialog does not break when there is no header text ([#1146](https://github.com/SAP/ui5-webcomponents/issues/1146)) ([44e631a](https://github.com/SAP/ui5-webcomponents/commit/44e631a))
* **ui5-token:** token icon is shown again ([#1126](https://github.com/SAP/ui5-webcomponents/issues/1126)) ([59e5972](https://github.com/SAP/ui5-webcomponents/commit/59e5972))


### Code Refactoring

* **ui5-card:** update API and correct visual ([#1145](https://github.com/SAP/ui5-webcomponents/issues/1145)) ([6733de9](https://github.com/SAP/ui5-webcomponents/commit/6733de9))
* **ui5-tabcontainer:** provide tabIndex in tabSelect even ([d8d4fdb](https://github.com/SAP/ui5-webcomponents/commit/d8d4fdb))
* **ui5-textarea:** rename property maxLength to maxlength ([#1068](https://github.com/SAP/ui5-webcomponents/issues/1068)) ([b2ee6a3](https://github.com/SAP/ui5-webcomponents/commit/b2ee6a3))


### Features

* **ui5-li:** add Detail type ([#1323](https://github.com/SAP/ui5-webcomponents/issues/1323)) ([ac8f8ce](https://github.com/SAP/ui5-webcomponents/commit/ac8f8ce))
* **ui5-avatar:** add initials, imageFitType and bg-color ([#1151](https://github.com/SAP/ui5-webcomponents/issues/1151)) ([5d27c7f](https://github.com/SAP/ui5-webcomponents/commit/5d27c7f))
* **ui5-avatar:** introduce new component ([#1135](https://github.com/SAP/ui5-webcomponents/issues/1135)) ([b1c8747](https://github.com/SAP/ui5-webcomponents/commit/b1c8747))
* **ui5-carousel:** initial implementation ([#1159](https://github.com/SAP/ui5-webcomponents/issues/1159)) ([5b84d85](https://github.com/SAP/ui5-webcomponents/commit/5b84d85))
* **ui5-datepicker:** implement min and max date limits ([#1040](https://github.com/SAP/ui5-webcomponents/issues/1040)) ([35b2593](https://github.com/SAP/ui5-webcomponents/commit/35b2593))
* **ui5-dialog:** improve accessibility ([#1288](https://github.com/SAP/ui5-webcomponents/issues/1288)) ([ef2886b](https://github.com/SAP/ui5-webcomponents/commit/ef2886b))
* **ui5-file-uploader:** initial implementation ([#1184](https://github.com/SAP/ui5-webcomponents/issues/1184)) ([e628dbd](https://github.com/SAP/ui5-webcomponents/commit/e628dbd))
* **ui5-input:** implement valueStateMessage ([#1297](https://github.com/SAP/ui5-webcomponents/issues/1297)) ([538a79a](https://github.com/SAP/ui5-webcomponents/commit/538a79a))
* **ui5-input:** provide "Information" value state ([#1261](https://github.com/SAP/ui5-webcomponents/issues/1261)) ([77f7293](https://github.com/SAP/ui5-webcomponents/commit/77f7293))
* **ui5-list:** add infinite-scroll capability ([#1220](https://github.com/SAP/ui5-webcomponents/issues/1220)) ([756b78b](https://github.com/SAP/ui5-webcomponents/commit/756b78b))
* **ui5-mcb-item:** initial implementation ([#1254](https://github.com/SAP/ui5-webcomponents/issues/1254)) ([861a19b](https://github.com/SAP/ui5-webcomponents/commit/861a19b))
* **ui5-multi-combobox:** implement angular two way data binding ([#1363](https://github.com/SAP/ui5-webcomponents/issues/1363)) ([33009db](https://github.com/SAP/ui5-webcomponents/commit/33009db))
* **ui5-radiobutton:** introduce wrap property ([#1006](https://github.com/SAP/ui5-webcomponents/issues/1006)) ([99dd6c4](https://github.com/SAP/ui5-webcomponents/commit/99dd6c4))
* **ui5-segmentedbutton:** initial implementation ([#1164](https://github.com/SAP/ui5-webcomponents/issues/1164)) ([931fbe0](https://github.com/SAP/ui5-webcomponents/commit/931fbe0))
* **ui5-static-area-item:** implement lazy loading ([#1272](https://github.com/SAP/ui5-webcomponents/issues/1272)) ([1f76a71](https://github.com/SAP/ui5-webcomponents/commit/1f76a71))
* **ui5-suggestion-item:** add new component ([#1336](https://github.com/SAP/ui5-webcomponents/issues/1336)) ([786f4e9](https://github.com/SAP/ui5-webcomponents/commit/786f4e9))
* **ui5-tabcontainer:** add tabLayout property ([#1214](https://github.com/SAP/ui5-webcomponents/issues/1214)) ([e79dcc8](https://github.com/SAP/ui5-webcomponents/commit/e79dcc8))
* **ui5-table:** provide rowClick event ([#1186](https://github.com/SAP/ui5-webcomponents/issues/1186)) ([0ba6fdd](https://github.com/SAP/ui5-webcomponents/commit/0ba6fdd))
* **ui5-timepicker:** implement new component ([#1172](https://github.com/SAP/ui5-webcomponents/issues/1172)) ([56e39bc](https://github.com/SAP/ui5-webcomponents/commit/56e39bc))
* **input components:** make input-based components open dialog on mobile device ([#1144](https://github.com/SAP/ui5-webcomponents/issues/1144)) ([d7b1179](https://github.com/SAP/ui5-webcomponents/commit/d7b1179))
* **ui5-table:** introduce popinChange event ([#1166](https://github.com/SAP/ui5-webcomponents/issues/1166)) ([0979963](https://github.com/SAP/ui5-webcomponents/commit/0979963))
* **ui5-combobox:** initial implementation ([#1123](https://github.com/SAP/ui5-webcomponents/issues/1123)) ([ca2fa23](https://github.com/SAP/ui5-webcomponents/commit/ca2fa23))
* **ui5-toast:** introduce new component ([#1014](https://github.com/SAP/ui5-webcomponents/issues/1014)) ([48400cd](https://github.com/SAP/ui5-webcomponents/commit/48400cd))


### BREAKING CHANGES

* **ui5-busyindicator:** Medium size is now default

FIXES: https://github.com/SAP/ui5-webcomponents/issues/1337
* **ui5-mcb-item:** - ui5-multi-combobox no longer accepts `ui5-li` for items use `ui5-multi-combobox-item` instead.
- **ui5-combobox-item:** change the tag name from `ui5-combobox-item` to `ui5-cb-item`
* **ui5-tabcontainer:** `itemSelect` is renamed to `tabSelect` and the `item` event param is renamed to `tab`.

* **ui5-card:** the proeprty `subtitle` has been renamed to `subheading`
* **ui5-textarea:** The property `maxLength` has been renamed to `maxlength`and the attribute name is changed from `max-length` to `maxlength`.





# [1.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2019-12-02)

### Migration guide
Take a look the [migration guide](https://github.com/SAP/ui5-webcomponents/blob/master/docs/Migration-guides.md) for smooth update from 1.0.0-rc.4 version to 1.0.0-rc.5 version.


### Bug Fixes

* **ui5-button:** prevents setting 0 height to icons in IE ([#902](https://github.com/SAP/ui5-webcomponents/issues/902)) ([20511c6](https://github.com/SAP/ui5-webcomponents/commit/20511c6))
* **ui5-button:** subscribe event handlers via HBS template
* **ui5-checkbox:** fix layouting in IE ([#926](https://github.com/SAP/ui5-webcomponents/issues/926)) ([ffdc271](https://github.com/SAP/ui5-webcomponents/commit/ffdc271))
* **ui5-checkbox:** fix truncation in compactSize ([#998](https://github.com/SAP/ui5-webcomponents/issues/998)) ([3cdcede](https://github.com/SAP/ui5-webcomponents/commit/3cdcede))
* **ui5-datepicker:** fix DatePicker hover effect ([#999](https://github.com/SAP/ui5-webcomponents/issues/999)) ([44d6c27](https://github.com/SAP/ui5-webcomponents/commit/44d6c27))
* **ui5-datepicker:** it is now possible to set an empty placeholder ([#997](https://github.com/SAP/ui5-webcomponents/issues/997)) ([3eca602](https://github.com/SAP/ui5-webcomponents/commit/3eca602))
* **ui5-daypicker:** Separate daypicker click handling to mousedown/up handlers([#894](https://github.com/SAP/ui5-webcomponents/issues/894)) ([09d0ec7](https://github.com/SAP/ui5-webcomponents/commit/09d0ec7))
* **ui5-input:** correct ACC info implementation ([#846](https://github.com/SAP/ui5-webcomponents/issues/846)) ([7d547ec](https://github.com/SAP/ui5-webcomponents/commit/7d547ec))
* **ui5-input:** fix input pushed downward ([#891](https://github.com/SAP/ui5-webcomponents/issues/891)) ([bda9714](https://github.com/SAP/ui5-webcomponents/commit/bda9714))
* **ui5-multi-combobox:** close popover & empty value on selection ([#832](https://github.com/SAP/ui5-webcomponents/issues/832)) ([1b3e40d](https://github.com/SAP/ui5-webcomponents/commit/1b3e40d))
* **ui5-popover:** restrict max content height when overflowing the screen ([#908](https://github.com/SAP/ui5-webcomponents/issues/908)) ([6671793](https://github.com/SAP/ui5-webcomponents/commit/6671793))
* **ui5-select:** remove unsupported method in IE ([#919](https://github.com/SAP/ui5-webcomponents/issues/919)) ([f1bceea](https://github.com/SAP/ui5-webcomponents/commit/f1bceea))
* **ui5-tabcontainer:** adjust tabs to take 100% of TC height ([#895](https://github.com/SAP/ui5-webcomponents/issues/895)) ([6fcf259](https://github.com/SAP/ui5-webcomponents/commit/6fcf259))
* **ui5-tabcontainer:** fix overflow item default semantic color ([#989](https://github.com/SAP/ui5-webcomponents/issues/989)) ([a003189](https://github.com/SAP/ui5-webcomponents/commit/a003189)), closes [#988](https://github.com/SAP/ui5-webcomponents/issues/988)
* **ui5-tabcontainer:** fix overflow items appearance and selection  ([#988](https://github.com/SAP/ui5-webcomponents/issues/988)) ([8cd2a8b](https://github.com/SAP/ui5-webcomponents/commit/8cd2a8b))
* **ui5-list:** prevent navigaion with Left/Right keys([#985](https://github.com/SAP/ui5-webcomponents/issues/985)) ([3d46e2d](https://github.com/SAP/ui5-webcomponents/commit/3d46e2d))
*  **ui5-table:** pressing SPACE works for HTML elements inside ui5-table ([#964](https://github.com/SAP/ui5-webcomponents/issues/964)) ([2384236](https://github.com/SAP/ui5-webcomponents/commit/2384236))
* **ui5-table:** fix JS error when there are less cells than columns ([#841](https://github.com/SAP/ui5-webcomponents/issues/841)) ([fd3b690](https://github.com/SAP/ui5-webcomponents/commit/fd3b690))
* **ui5-table:** fix row navigation and focus handling ([#876](https://github.com/SAP/ui5-webcomponents/issues/876)) ([f69f42c](https://github.com/SAP/ui5-webcomponents/commit/f69f42c))


### Features

* **ItemNavigation:** introduce navigationMode property ([#910](https://github.com/SAP/ui5-webcomponents/issues/910)) ([9c43533](https://github.com/SAP/ui5-webcomponents/commit/9c43533))
* **ui5-icon:** change src property to name ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))
* **ui5-input:** introduce maxlength property ([#976](https://github.com/SAP/ui5-webcomponents/issues/976)) ([c149f5f](https://github.com/SAP/ui5-webcomponents/commit/c149f5f))
* **ui5-label:** add showColon property ([#965](https://github.com/SAP/ui5-webcomponents/issues/965)) ([ae95a8d](https://github.com/SAP/ui5-webcomponents/commit/ae95a8d))
* **ui5-multicombobox:** implement ACC support ([#937](https://github.com/SAP/ui5-webcomponents/issues/937)) ([0a44a92](https://github.com/SAP/ui5-webcomponents/commit/0a44a92))
* **ui5-multicombobox:** introduce open property and openChange event ([#930](https://github.com/SAP/ui5-webcomponents/issues/930)) ([c0b51f5](https://github.com/SAP/ui5-webcomponents/commit/c0b51f5))
* **ui5-panel:** improve accessibility ([#864](https://github.com/SAP/ui5-webcomponents/issues/864)) ([b133468](https://github.com/SAP/ui5-webcomponents/commit/b133468))
* **ui5-textarea:** implement input event ([#543](https://github.com/SAP/ui5-webcomponents/issues/543)) ([7c5647e](https://github.com/SAP/ui5-webcomponents/commit/7c5647e))

### Code Refactoring
* **ui5-shellbar:** move component to @ui5/webcomponents-fiori package ([#887](https://github.com/SAP/ui5-webcomponents/pull/887)) ([06f1770](https://github.com/SAP/ui5-webcomponents/commit/17c25ff123436c1f6e11513055b33977b06f1770))
* **ui5-card:** replace "avatar" property with "avatar" slot ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))
* **ui5-shellbar:** rename "icon" slot to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/issues/901)) ([5ca3280](https://github.com/SAP/ui5-webcomponents/commit/5ca3280))
* **ui5-shellbar-item:** "src" property renamed to "name" ([#928](https://github.com/SAP/ui5-webcomponents/pull/928)) ([8e060d1](https://github.com/SAP/ui5-webcomponents/commit/0489673610ce2fd0e96d0a3a1f4e0465d8e060d1))
* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset ([#904](https://github.com/SAP/ui5-webcomponents/pull/904)) ([c25e0a7](https://github.com/SAP/ui5-webcomponents/commit/59fead49d7a3222d55270584bb048190dc25e0a7))

### BREAKING CHANGES

* **icons:** Move all individual icons to a new npm package called `@ui5/webcomponents-icons`.

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
@ui5/webcomponents-icons/dist/add.js
```
* **ui5-shellbar:** move component to new `@ui5/webcomponents-fiori` package ([#887](https://github.com/SAP/ui5-webcomponents/pull/887)) ([06f1770](https://github.com/SAP/ui5-webcomponents/commit/17c25ff123436c1f6e11513055b33977b06f1770))

* **ui5-shellbar:** rename "icon" slot to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/issues/901)) ([5ca3280](https://github.com/SAP/ui5-webcomponents/commit/5ca3280))

The slot accepts a ui5-button and overstyles it to match ShellBar's styling.

* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset ([#904](https://github.com/SAP/ui5-webcomponents/pull/904)) ([c25e0a7](https://github.com/SAP/ui5-webcomponents/commit/59fead49d7a3222d55270584bb048190dc25e0a7))

To get the ShellBar's coPilot animated you have to import the `@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js` module

* **ui5-shellbar-item:** "src" property renamed to "name" ([#928](https://github.com/SAP/ui5-webcomponents/pull/928)) ([8e060d1](https://github.com/SAP/ui5-webcomponents/commit/0489673610ce2fd0e96d0a3a1f4e0465d8e060d1))

The "src" property was renamed to icon and accepts icon name (such as "add") instead of icon src (such as "sap-icon://add")

* **ui5-card:** replace "avatar" property with "avatar" slot ([#928](https://github.com/SAP/ui5-webcomponents/issues/928)) ([0489673](https://github.com/SAP/ui5-webcomponents/commit/0489673))

The avatar property was removed.
Use the avatar slot instead - pass an icon(<ui5-icon) or an image(<img).

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

* **ui5-icon:** "src" property was renamed to "name".

The "name" poperty accepts icon name (such as "add") instead of icon src (such as "sap-icon://add").
Note: the src property will continue to work until the next release due to the impact of the change, but will produce a warning in the console.








# [1.0.0-rc.4](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2019-10-11)


### Bug Fixes

* **ui5-badge:** fix icon visual issue in ie ([#809](https://github.com/SAP/ui5-webcomponents/issues/809)) ([150a100](https://github.com/SAP/ui5-webcomponents/commit/150a100))
* update output of create new component script ([#826](https://github.com/SAP/ui5-webcomponents/issues/826)) ([0241140](https://github.com/SAP/ui5-webcomponents/commit/0241140))
* **ui5-button:** apply correct font-family: 72 ([#825](https://github.com/SAP/ui5-webcomponents/issues/825)) ([21ec559](https://github.com/SAP/ui5-webcomponents/commit/21ec559))




# [1.0.0-rc.3](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2019-10-03)


### Bug Fixes

* **ui5-badge:** correct component sizing ([#733](https://github.com/SAP/ui5-webcomponents/issues/733)) ([f5a4798](https://github.com/SAP/ui5-webcomponents/commit/f5a4798))
* **ui5-badge:** fix icon size ([#729](https://github.com/SAP/ui5-webcomponents/issues/729)) ([f1e1343](https://github.com/SAP/ui5-webcomponents/commit/f1e1343))
* **ui5-busyindicator:** change z-index not to overlap popover or dialog ([#624](https://github.com/SAP/ui5-webcomponents/issues/624)) ([c91c811](https://github.com/SAP/ui5-webcomponents/commit/c91c811))
* **ui5-button:** align buttons with and without icons on same line ([#796](https://github.com/SAP/ui5-webcomponents/issues/796)) ([8420492](https://github.com/SAP/ui5-webcomponents/commit/8420492))
* **ui5-button:** fix Transparent button border in Fiori 3 & HCB ([#789](https://github.com/SAP/ui5-webcomponents/issues/789)) ([bc00f1f](https://github.com/SAP/ui5-webcomponents/commit/bc00f1f))
* **ui5-checkbox:** set default font-size to checkmark ([#618](https://github.com/SAP/ui5-webcomponents/issues/618)) ([d3a9197](https://github.com/SAP/ui5-webcomponents/commit/d3a9197))
* **ui5-input:** inputs now support placeholder on IE ([#781](https://github.com/SAP/ui5-webcomponents/issues/781)) ([559109d](https://github.com/SAP/ui5-webcomponents/commit/559109d))
* **ui5-icon:** icon no longer flickers on IE ([#722](https://github.com/SAP/ui5-webcomponents/issues/722)) ([964af67](https://github.com/SAP/ui5-webcomponents/commit/964af67))
* **ui5-input:** use translated text ([#783](https://github.com/SAP/ui5-webcomponents/issues/783)) ([1e9a4e6](https://github.com/SAP/ui5-webcomponents/commit/1e9a4e6))
* **ui5-link:** fix link hover effect ([#803](https://github.com/SAP/ui5-webcomponents/issues/803)) ([46bfaf1](https://github.com/SAP/ui5-webcomponents/commit/46bfaf1))
* **ui5-multi-combobox:** overflow tokens correctly when not enough space ([#714](https://github.com/SAP/ui5-webcomponents/issues/714)) ([c67fe0a](https://github.com/SAP/ui5-webcomponents/commit/c67fe0a))
* **ui5-multicombobox:** enable closing on icon click ([#719](https://github.com/SAP/ui5-webcomponents/issues/719)) ([8d98def](https://github.com/SAP/ui5-webcomponents/commit/8d98def))
* **ui5-switch:** don`t mirror checkmark icon in RTL ([#742](https://github.com/SAP/ui5-webcomponents/issues/742)) ([ad2609d](https://github.com/SAP/ui5-webcomponents/commit/ad2609d))
* **ui5-tabcontainer:** fix selected tab text color in HCB ([#805](https://github.com/SAP/ui5-webcomponents/issues/805)) ([3ccf80e](https://github.com/SAP/ui5-webcomponents/commit/3ccf80e))
* **ui5-table:** call resize handler on initial rendering ([#625](https://github.com/SAP/ui5-webcomponents/issues/625)) ([c20c85c](https://github.com/SAP/ui5-webcomponents/commit/c20c85c))
* **ui5-datepicker:** date selection works on IE ([#623](https://github.com/SAP/ui5-webcomponents/issues/623)) ([5a0b7ad](https://github.com/SAP/ui5-webcomponents/commit/5a0b7ad))
* **ui5-token:** correct visual in RTL/Compact ([#804](https://github.com/SAP/ui5-webcomponents/issues/804)) ([71c9caa](https://github.com/SAP/ui5-webcomponents/commit/71c9caa))
* **ui5-icon:** enable default icon size to be changed ([#629](https://github.com/SAP/ui5-webcomponents/issues/629)) ([a44cdc6](https://github.com/SAP/ui5-webcomponents/commit/a44cdc6))
* **InputFormSupport:** enable form support for nested input elements ([#656](https://github.com/SAP/ui5-webcomponents/issues/656)) ([57adb04](https://github.com/SAP/ui5-webcomponents/commit/57adb04))
* **doc:** fix typos in docs ([#680](https://github.com/SAP/ui5-webcomponents/issues/680)) ([f884643](https://github.com/SAP/ui5-webcomponents/commit/f884643))
* **ui5-datepicker:** icon from datepicker no longer flickers on IE ([#723](https://github.com/SAP/ui5-webcomponents/issues/723)) ([80c4f32](https://github.com/SAP/ui5-webcomponents/commit/80c4f32))
* **ui5-tokenizer:** use i18nbundle instead of resource bundle ([#757](https://github.com/SAP/ui5-webcomponents/issues/757)) ([d6668bc](https://github.com/SAP/ui5-webcomponents/commit/d6668bc))


### Code Refactoring


* **ui5-li:** remove background CSS Variable ([#802](https://github.com/SAP/ui5-webcomponents/issues/802)) ([9bf57ab](https://github.com/SAP/ui5-webcomponents/commit/9bf57ab))
* **ui5-multi-combobox:** replace validate-input with allow-custom-values ([#749](https://github.com/SAP/ui5-webcomponents/issues/749)) ([f501df4](https://github.com/SAP/ui5-webcomponents/commit/f501df4))
* **ui5-popover:** improve layouting, styling and positioning ([#779](https://github.com/SAP/ui5-webcomponents/issues/779)) ([1d377ba](https://github.com/SAP/ui5-webcomponents/commit/1d377ba))
* **ui5-table:** width property of column is removed ([#784](https://github.com/SAP/ui5-webcomponents/issues/784)) ([dedb51e](https://github.com/SAP/ui5-webcomponents/commit/dedb51e))
* **ui5-datepicker:** hide week number in Islamic, Buddhist and Japanese calendars ([#806](https://github.com/SAP/ui5-webcomponents/issues/806)) ([a5ccb80](https://github.com/SAP/ui5-webcomponents/commit/a5ccb80))


### Features

* **ui5-datepicker:** adds public getter dateValue ([#726](https://github.com/SAP/ui5-webcomponents/issues/726)) ([1ba3e25](https://github.com/SAP/ui5-webcomponents/commit/1ba3e25))
* **ui5-datepicker:** implement ACC support ([#763](https://github.com/SAP/ui5-webcomponents/issues/763)) ([188627e](https://github.com/SAP/ui5-webcomponents/commit/188627e))
* **ui5-icon:** implement ACC support ([#709](https://github.com/SAP/ui5-webcomponents/issues/709)) ([1357c16](https://github.com/SAP/ui5-webcomponents/commit/1357c16))
* **ui5-icon:** use SVG icons instead of icon font ([#649](https://github.com/SAP/ui5-webcomponents/issues/649)) ([b6352d8](https://github.com/SAP/ui5-webcomponents/commit/b6352d8))
* **ui5-list:** added new param for selectionChange event ([#798](https://github.com/SAP/ui5-webcomponents/issues/798)) ([28c4181](https://github.com/SAP/ui5-webcomponents/commit/28c4181))
* **ui5-select:** adds readonly property selectedOption ([#718](https://github.com/SAP/ui5-webcomponents/issues/718)) ([5d9a1ac](https://github.com/SAP/ui5-webcomponents/commit/5d9a1ac))
* **ui5-switch:** implement ACC support ([#692](https://github.com/SAP/ui5-webcomponents/issues/692)) ([7304a31](https://github.com/SAP/ui5-webcomponents/commit/7304a31))
* **ui5-tabcontainer:** update ACC of header and content ([#756](https://github.com/SAP/ui5-webcomponents/issues/756)) ([8550365](https://github.com/SAP/ui5-webcomponents/commit/8550365))
* **ui5-link, ui5-textarea, ui5-input, ui5-checkbox, ui5-button, ui5-badge, ui5-busyindicator, ui5-messagestrip:** Improve accessibility of components ([#613](https://github.com/SAP/ui5-webcomponents/issues/613)) ([16568c2](https://github.com/SAP/ui5-webcomponents/commit/16568c2))


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





# [1.0.0-rc.2](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2019-07-04)

### Bug Fixes

* **popup:** remove body styles in onExitDOM ([#593](https://github.com/SAP/ui5-webcomponents/issues/593)) ([410b8f6](https://github.com/SAP/ui5-webcomponents/commit/410b8f6))

### Code Refactoring

* **ui5-shellbar-item:** Rename press event to itemClick ([#606](https://github.com/SAP/ui5-webcomponents/issues/606)) ([5bfab39](https://github.com/SAP/ui5-webcomponents/commit/5bfab39))
* **ui5-popover, ui5-dialog**: remove noHeader property (#615) ([6a990a7](https://github.com/SAP/ui5-webcomponents/commit/6a990a7)), closes [#615](https://github.com/SAP/ui5-webcomponents/issues/615)


### BREAKING CHANGES

* **ui5-shellbar-item:** ui5-shellbar-item press event is renamed to itemClick
* **ui5-popover, ui5-dialog**: the property noHeader is removed, the presence of header is based on the values of "headerText" property and "header" slot





## [0.13.1](https://github.com/SAP/ui5-webcomponents/compare/v0.13.0...v0.13.1) (2019-06-22)

**Note:** Version bump only for package @ui5/webcomponents





# [0.13.0](https://github.com/SAP/ui5-webcomponents/compare/v0.12.0...v0.13.0) (2019-06-21)


### Bug Fixes

* **ui5-badge:** correct text font ([#535](https://github.com/SAP/ui5-webcomponents/issues/535)) ([3da0dd5](https://github.com/SAP/ui5-webcomponents/commit/3da0dd5))
* remove custom "falsy" checks from ifDefined ([#544](https://github.com/SAP/ui5-webcomponents/issues/544)) ([92a85fa](https://github.com/SAP/ui5-webcomponents/commit/92a85fa))
* **ui5-icon:** correct RTL appearance ([#569](https://github.com/SAP/ui5-webcomponents/issues/569)) ([591d81a](https://github.com/SAP/ui5-webcomponents/commit/591d81a))
* **ui5-switch:** change getters names ([#566](https://github.com/SAP/ui5-webcomponents/issues/566)) ([2d94b60](https://github.com/SAP/ui5-webcomponents/commit/2d94b60))
* **ui5-tabcontainer:** set initial tab index ([#545](https://github.com/SAP/ui5-webcomponents/issues/545)) ([0127c2f](https://github.com/SAP/ui5-webcomponents/commit/0127c2f))


### Code Refactoring

* **ui5-button:** rename type property to design ([#504](https://github.com/SAP/ui5-webcomponents/issues/504)) ([a62b471](https://github.com/SAP/ui5-webcomponents/commit/a62b471))
* **ui5-link:** rename type property to design ([#505](https://github.com/SAP/ui5-webcomponents/issues/505)) ([3965a00](https://github.com/SAP/ui5-webcomponents/commit/3965a00))
* **ui5-messagestrip:** rename hideIcon property to noIcon ([#507](https://github.com/SAP/ui5-webcomponents/issues/507)) ([2314fc3](https://github.com/SAP/ui5-webcomponents/commit/2314fc3))
* **ui5-popover:** hideHeader property renamed to noHeader ([#553](https://github.com/SAP/ui5-webcomponents/issues/553)) ([11dc3b1](https://github.com/SAP/ui5-webcomponents/commit/11dc3b1))
* **ui5-popover:** rename hideArrow property to noArrow ([#509](https://github.com/SAP/ui5-webcomponents/issues/509)) ([efff863](https://github.com/SAP/ui5-webcomponents/commit/efff863))
* **ui5-select:** change default slot from list items to options ([#532](https://github.com/SAP/ui5-webcomponents/issues/532)) ([2e4486b](https://github.com/SAP/ui5-webcomponents/commit/2e4486b))
* **ui5-switch:** rename type property to graphical ([#506](https://github.com/SAP/ui5-webcomponents/issues/506)) ([0040e85](https://github.com/SAP/ui5-webcomponents/commit/0040e85))


### Features

* **ui5-card:** add "headerInteractive" property ([#439](https://github.com/SAP/ui5-webcomponents/issues/439)) ([98f7075](https://github.com/SAP/ui5-webcomponents/commit/98f7075))
* **ui5-label:** expose font-weight property on root tag ([#534](https://github.com/SAP/ui5-webcomponents/issues/534)) ([88c794a](https://github.com/SAP/ui5-webcomponents/commit/88c794a))
* **ui5-li:** add info and infoState properties ([#539](https://github.com/SAP/ui5-webcomponents/issues/539)) ([f1d8a85](https://github.com/SAP/ui5-webcomponents/commit/f1d8a85))
* add form support for ui5-select ([#565](https://github.com/SAP/ui5-webcomponents/issues/565)) ([89e3508](https://github.com/SAP/ui5-webcomponents/commit/89e3508))


### BREAKING CHANGES

* the parameter of the change event is now called "selectedOption"; ui5-select enforces ui5-option as children in the metadata
* **ui5-select:** Use ui5-option instead of ui5-li in ui5-select
* **ui5-link:** property type is renamed to design
* **ui5-button:** type property is changed to design
* **ui5-switch:** type property is renamed to boolean property graphical
* **ui5-messagestrip:** hideIcon property is renamed to noIcon
* **ui5-popover:** hideArrow property is renamed to noArrow
* **ui5-popover:** hideHeader property renamed to noHeader





# [0.12.0](https://github.com/SAP/ui5-webcomponents/compare/v0.11.0...v0.12.0) (2019-06-10)


### Bug Fixes

* **ui5-button:** bold text in fiori_3 when button is emphasized ([#512](https://github.com/SAP/ui5-webcomponents/issues/512)) ([53cdc93](https://github.com/SAP/ui5-webcomponents/commit/53cdc93))
* **ui5-button:** fix focus outline color of emphasized button ([#499](https://github.com/SAP/ui5-webcomponents/issues/499)) ([1e0690c](https://github.com/SAP/ui5-webcomponents/commit/1e0690c))
* **ui5-checkbox:** fix touchArea size ([#448](https://github.com/SAP/ui5-webcomponents/issues/448)) ([8831139](https://github.com/SAP/ui5-webcomponents/commit/8831139))
* **ui5-li:** remove active state onmouseup ([#525](https://github.com/SAP/ui5-webcomponents/issues/525)) ([a07880d](https://github.com/SAP/ui5-webcomponents/commit/a07880d))
* **ui5-messagestrip:** improve screen reader announcements ([#467](https://github.com/SAP/ui5-webcomponents/issues/467)) ([b68443c](https://github.com/SAP/ui5-webcomponents/commit/b68443c))
* **ui5-multi-combobox:** docs and API improvements ([#438](https://github.com/SAP/ui5-webcomponents/issues/438)) ([c559ac0](https://github.com/SAP/ui5-webcomponents/commit/c559ac0))
* **ui5-radiobutton:** make readonly radiobuttons not selectable via keyboard ([#500](https://github.com/SAP/ui5-webcomponents/issues/500)) ([2261f1c](https://github.com/SAP/ui5-webcomponents/commit/2261f1c))
* **ui5-select:** fix component clickable area ([#462](https://github.com/SAP/ui5-webcomponents/issues/462)) ([9c59de5](https://github.com/SAP/ui5-webcomponents/commit/9c59de5))
* **ui5-tabcontainer:** remove typo from component template ([#446](https://github.com/SAP/ui5-webcomponents/issues/446)) ([e701562](https://github.com/SAP/ui5-webcomponents/commit/e701562))
* **ui5-table:** fix scrolling on space ([#232](https://github.com/SAP/ui5-webcomponents/issues/232)) ([cd63e9a](https://github.com/SAP/ui5-webcomponents/commit/cd63e9a))
* **ui5-list:** fix list footer font family ([#494](https://github.com/SAP/ui5-webcomponents/issues/494)) ([5543d30](https://github.com/SAP/ui5-webcomponents/commit/5543d30))
* all: fix styles for hidden attribute ([#464](https://github.com/SAP/ui5-webcomponents/issues/464)) ([f7f07d2](https://github.com/SAP/ui5-webcomponents/commit/f7f07d2))


### Code Refactoring

* **ui5-button:** remove activeIcon property ([#513](https://github.com/SAP/ui5-webcomponents/issues/513)) ([8d8c343](https://github.com/SAP/ui5-webcomponents/commit/8d8c343))


### Features

* inline english texts if no translation is fetched ([#479](https://github.com/SAP/ui5-webcomponents/issues/479)) ([abfb221](https://github.com/SAP/ui5-webcomponents/commit/abfb221))
* **base:** implement late validation ([#522](https://github.com/SAP/ui5-webcomponents/issues/522)) ([c452d60](https://github.com/SAP/ui5-webcomponents/commit/c452d60))
* **ui5-badge:** initial implementation ([#521](https://github.com/SAP/ui5-webcomponents/issues/521)) ([8496211](https://github.com/SAP/ui5-webcomponents/commit/8496211))
* **ui5-busyindicator:** initial implementation ([#416](https://github.com/SAP/ui5-webcomponents/issues/416)) ([6b6b544](https://github.com/SAP/ui5-webcomponents/commit/6b6b544))
* **ui5-busyindicator:** introduce active property and simplify usage ([#519](https://github.com/SAP/ui5-webcomponents/issues/519)) ([ff59a98](https://github.com/SAP/ui5-webcomponents/commit/ff59a98))
* **ui5-li:** parameterize listitembase border bottom ([#520](https://github.com/SAP/ui5-webcomponents/issues/520)) ([da1c430](https://github.com/SAP/ui5-webcomponents/commit/da1c430))
* **ui5-table:** add noDataText for ui5-table without rows ([#402](https://github.com/SAP/ui5-webcomponents/issues/402)) ([907d513](https://github.com/SAP/ui5-webcomponents/commit/907d513)), closes [#389](https://github.com/SAP/ui5-webcomponents/issues/389)


### BREAKING CHANGES

* **ui5-button:** activeIcon property is removed





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
