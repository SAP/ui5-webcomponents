# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.7](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2020-04-30)


### Bug Fixes

* **ui5-product-switch-item:** fix active state ([#1547](https://github.com/SAP/ui5-webcomponents/issues/1547)) ([0305da8](https://github.com/SAP/ui5-webcomponents/commit/0305da8))
* **ui5-shellbar:** check for profile correctly ([#1438](https://github.com/SAP/ui5-webcomponents/issues/1438)) ([a4f502b](https://github.com/SAP/ui5-webcomponents/commit/a4f502b))
* **ui5-shellbar:** do not duplicate popover menu items ([#1456](https://github.com/SAP/ui5-webcomponents/issues/1456)) ([ae20272](https://github.com/SAP/ui5-webcomponents/commit/ae20272))
* **ui5-shellbar:** enable items keyboard handling ([#1473](https://github.com/SAP/ui5-webcomponents/issues/1473)) ([185851a](https://github.com/SAP/ui5-webcomponents/commit/185851a))
* **ui5-shellbar:** fix menuItems cloning ([#1457](https://github.com/SAP/ui5-webcomponents/issues/1457)) ([f4d2547](https://github.com/SAP/ui5-webcomponents/commit/f4d2547))
* **ui5-upload-collection:** ensure event.dataTransfer.types is array ([#1433](https://github.com/SAP/ui5-webcomponents/issues/1433)) ([28cc988](https://github.com/SAP/ui5-webcomponents/commit/28cc988))


### Features

* **ui5-upload-collection:** implement new webcomponent ([#1316](https://github.com/SAP/ui5-webcomponents/issues/1316)) ([54038e4](https://github.com/SAP/ui5-webcomponents/commit/54038e4))





# [1.0.0-rc.6](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2020-03-27)


### Bug Fixes

* **ui5-shellbar:** Change path in imports for playground ([#1008](https://github.com/SAP/ui5-webcomponents/issues/1008)) ([bfe36dd](https://github.com/SAP/ui5-webcomponents/commit/bfe36dd))
* **ui5-shellbar:** fire logoClick on small size ([#1192](https://github.com/SAP/ui5-webcomponents/issues/1192)) ([b84b9d8](https://github.com/SAP/ui5-webcomponents/commit/b84b9d8))
* **ui5-shellbar:** fix search field behavior ([#1264](https://github.com/SAP/ui5-webcomponents/issues/1264)) ([2beb1c5](https://github.com/SAP/ui5-webcomponents/commit/2beb1c5))
* **ui5-shellbar:** provide correct target ref when item is in overflow popover ([#1334](https://github.com/SAP/ui5-webcomponents/issues/1334)) ([7636bb7](https://github.com/SAP/ui5-webcomponents/commit/7636bb7))



### Features

* **ui5-shellbar:** add profile slot ([#1222](https://github.com/SAP/ui5-webcomponents/issues/1222)) ([9dab18b](https://github.com/SAP/ui5-webcomponents/commit/9dab18b))
* **ui5-shellbar-item:** introduce count property ([#1221](https://github.com/SAP/ui5-webcomponents/issues/1221)) ([02ddd0d](https://github.com/SAP/ui5-webcomponents/commit/02ddd0d))


### BREAKING CHANGES

* **ui5-shellbar:** profile property is removed in favour of profile slot


# [1.0.0-rc.5](https://github.com/SAP/ui5-webcomponents/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2019-12-02)


### Features

* **ui5-product-switch:** initial implementation ([#971](https://github.com/SAP/ui5-webcomponents/pull/971)) ([4646fcd](https://github.com/SAP/ui5-webcomponents/commit/70d44b1ebf4b47c7e99ebf96feb19e5c04646fcd))

### Code Refactoring

* **ui5-shellbar:** move component to @ui5/webcomponents-fiori package ([#887](https://github.com/SAP/ui5-webcomponents/pull/887)) ([06f1770](https://github.com/SAP/ui5-webcomponents/commit/17c25ff123436c1f6e11513055b33977b06f1770))	
* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset ([#904](https://github.com/SAP/ui5-webcomponents/pull/904)) ([c25e0a7](https://github.com/SAP/ui5-webcomponents/commit/59fead49d7a3222d55270584bb048190dc25e0a7))
* **ui5-shellbar:** optimize animated co-pilot SVG size from 15kb to 8kb ([#960](https://github.com/SAP/ui5-webcomponents/pull/960)) ([42bd7cd](https://github.com/SAP/ui5-webcomponents/commit/66d8c62658648cfeb7392607e9b66548c42bd7cd))
* **ui5-shellbar:** "icon" slot renamed to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/pull/901)) ([3e38149](https://github.com/SAP/ui5-webcomponents/commit/5ca3280ca166934ab02de92a04eccc8f53e38149))
* **ui5-shellbar-item:** "src" property renamed to "name" ([#928](https://github.com/SAP/ui5-webcomponents/pull/928)) ([8e060d1](https://github.com/SAP/ui5-webcomponents/commit/0489673610ce2fd0e96d0a3a1f4e0465d8e060d1))

### BREAKING CHANGES

* **ui5-shellbar:** extract animated co-pilot SVG as add-on asset

To get the ShellBar's coPilot animated SVG you have to import the following module:
```js
	import @ui5/webcomponents/dist/features/CoPilotAnimation.js` 
```

* **ui5-shellbar:** "icon" slot renamed to "startButton" ([#901](https://github.com/SAP/ui5-webcomponents/pull/901)) ([3e38149](https://github.com/SAP/ui5-webcomponents/commit/5ca3280ca166934ab02de92a04eccc8f53e38149))

* **ui5-shellbar-item:** "src" property renamed to "name":

The src property was renamed to icon and accepts icon name (such as "add") instead of icon src (such as "sap-icon://add")
