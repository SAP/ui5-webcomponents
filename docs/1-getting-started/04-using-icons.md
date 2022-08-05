# Using Icons

*This section explains how to load and use icons in your UI5 Web Components projects.*

One of the most commonly used UI5 Web Components is `ui5-icon`. Additionally, several UI5 Web Components have an `icon` property that expects an icon name as a value.


## Icon Collections

The UI5 Web Components project currently offers 3 icon collections, provided as NPM packages:

Project | NPM Package | Description | Icons list
-----------|-----------|------------|-------------
`icons` | [UI5 Web Components - Icons](https://www.npmjs.com/package/@ui5/webcomponents-icons) | A rich icon collection (`SAP-icons`), suitable for enterprise-grade apps |[Explore](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons)
`icons-tnt` | [UI5 Web Components - Icons TNT](https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt) | A rich icon collection (`SAP-icons-TNT`), suitable for more technical apps | [Explore](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT)
`icons-business-suite` | [UI5 Web Components - Icons Business Suite](https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite) | A rich icon collection (`BusinessSuiteInAppSymbols`), suitable for SAP Fiori apps | [Explore](https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols)

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

## Custom Icon Collections

Currently we use SVGs to display all standard icons. 
In addition, we provide an API to register custom SVG icon collections via the `registerIconLoader` method as follows:

1. Register custom icon collection loader

The loader must return an object with the following fields:
- `collection` name
- `data` object that describes the icons: names and SVG paths

```js
import {registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
registerIconLoader("my-custom-icons", () => {
    return {
            "collection": "my-custom-icons",
            "data": {
                "mark": {
                    paths: [ 
                        // SVG path1, SVG path2, SVG path3...
                    ],
    }
});
```

2. Use the custom icons

After the SVG icons collection is registered, you can use the custom icons everywhere you usually use the standard icons in UI5 Web Components (e.g. ui5-icon, ui5-button, etc):

```html
<ui5-icon name="my-custom-icons/mark"></ui5-icon>
<ui5-button icon="my-custom-icons/mark"></ui5-button>
<ui5-avatar icon="my-custom-icons/mark"></ui5-avatar>
<ui5-li icon="my-custom-icons/mark"></ui5-li>
```

Next: [Using Additional Assets](../using-assets)
