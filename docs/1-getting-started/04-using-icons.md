# Using Icons

*This section explains how to load and use icons in your UI5 Web Components projects.*

One of the most commonly used UI5 Web Components is `ui5-icon`. Additionally, several UI5 Web Components have an `icon` property that expects an icon name as a value.


## Icon Collections

The UI5 Web Components project currently offers 3 icon collections, provided as NPM packages:

Project | NPM Package | Description | Icons list
-----------|-----------|------------|-------------
`icons` | [UI5 Web Components - Icons](https://www.npmjs.com/package/@ui5/webcomponents-icons) | A rich icon collection (`SAP-icons`), suitable for enterprise-grade apps |[Explore](https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons)
`icons-tnt` | [UI5 Web Components - Icons TNT](https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt) | A rich icon collection (`SAP-icons-TNT`), suitable for more technical apps | [Explore](https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT)
`icons-business-suite` | [UI5 Web Components - Icons Business Suite](https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite) | A rich icon collection (`BusinessSuiteInAppSymbols`), suitable for SAP Fiori apps | [Explore](https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols)

## Usage

 1. Add one or more of the above packages as dependencies to your project.

```
npm i @ui5/webcomponents-icons
npm i @ui5/webcomponents-icons-tnt
npm i @ui5/webcomponents-icons-business-suite
```

 2. Import either all icons from a package, or better - only the ones your app is going to use.

**Important: It is strongly recommended that you only import the icons that your app is going to use. This will keep your bundle small.
Generally, importing all icons is required only if you do not know in advance which icons you are going to need.**

 - To import all icons from a package, use the `dist/AllIcons.js` module of that package:

`import "@ui5/<PACKAGE-NAME>/dist/AllIcons.js";`

For example:
```js
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";
```
 - To import individual icons, use the individual modules for the required icons:

`import "@ui5/<PACKAGE-NAME>/dist/<ICON-NAME>.js";`

For example:
```js
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/bookmark.js";
import "@ui5/webcomponents-icons/dist/cart.js";

import "@ui5/webcomponents-icons-tnt/dist/actor.js";

import "@ui5/webcomponents-icons-business-suite/dist/add-point.js";
```

 3. Once an icon has been imported, it can be used.

All collections but `@ui5/webcomponents-icons` require a prefix before the icon name. The prefix and icon name are separated by a `/`. 

Package | Prefix | Example
----------|---------|-------------
`@ui5/webcomponents-icons` | N/A | `alert`
`@ui5/webcomponents-icons-tnt` | `tnt` | `tnt/actor`
`@ui5/webcomponents-icons-business-suite` | `business-suite` | `business-suite/coins`

For example:
```html
<ui5-icon name="alert"></ui5-icon>
<ui5-button icon="tnt/actor"></ui5-button>
<ui5-avatar icon="business-suite/coins"></ui5-avatar>
```

Next: [Using Additional Assets](../using-assets)
