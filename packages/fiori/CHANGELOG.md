# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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