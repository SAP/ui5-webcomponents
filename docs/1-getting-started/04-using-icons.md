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

## Custom SVG icons

In case you need to use a fully custom SVG with multiple SVG elements like `circle` and `rect` instead of only a custom `path`, you can provide a custom renderer and register it for usage in `<ui5-icon>`.

First, create a template for the icon you need:

`BakeryDining.hbs`
```html
<g>
    <rect fill="none" height="24" width="24" y="0" />
</g>
<g>
    <g>
        <path
            d="M7.6,8.67l-2.01,0.8c-0.22,0.09-0.34,0.31-0.31,0.54l2.4,5.98h1.23l-0.62-6.9C8.25,8.75,7.91,8.54,7.6,8.67 z"
            opacity=".3" />
        <path d="M3.07,16.1c-0.27,0.53,0.29,1.09,0.82,0.83l1.68-0.84l-1.08-2.71L3.07,16.1z" opacity=".3" />
        <path
            d="M13.36,6.99h-2.71c-0.27,0-0.53,0.23-0.5,0.54l0.77,8.45h2.17l0.77-8.45C13.88,7.22,13.63,6.99,13.36,6.99z"
            opacity=".3" />
        <path
            d="M18.41,9.47l-2.01-0.8c-0.31-0.12-0.65,0.09-0.68,0.42l-0.62,6.9h1.23l2.4-5.98 C18.75,9.78,18.63,9.56,18.41,9.47z"
            opacity=".3" />
        <path d="M19.52,13.39l-1.08,2.7l1.68,0.84c0.52,0.26,1.09-0.3,0.82-0.83L19.52,13.39z" opacity=".3" />
        <path
            d="M20.5,10.94c0.13-0.32,0.1-0.23,0.15-0.39c0.3-1.21-0.34-2.47-1.5-2.93l-2.01-0.8c-0.46-0.18-0.95-0.21-1.41-0.12 c-0.11-0.33-0.29-0.63-0.52-0.89C14.73,5.29,14.06,5,13.36,5h-2.71C9.94,5,9.27,5.29,8.8,5.81C8.56,6.07,8.38,6.37,8.27,6.69 C7.81,6.6,7.32,6.63,6.86,6.81l-2.01,0.8c-1.16,0.46-1.8,1.72-1.5,2.93l0.15,0.38C1.1,15.55,1,15.55,1,16.38 c0,0.91,0.46,1.74,1.24,2.22c1.42,0.88,2.49,0.14,4-0.61h11.53c1.52,0.76,1.86,1.01,2.63,1.01c1,0,2.61-0.77,2.61-2.61 C23,15.54,22.88,15.51,20.5,10.94z M3.88,16.93c-0.53,0.26-1.09-0.3-0.82-0.83l1.41-2.72l1.08,2.71L3.88,16.93z M7.68,15.99 l-2.4-5.98C5.25,9.78,5.37,9.56,5.59,9.47l2.01-0.8c0.31-0.12,0.65,0.08,0.68,0.42l0.62,6.9H7.68z M13.09,15.99h-2.17l-0.77-8.45 c-0.03-0.31,0.23-0.54,0.5-0.54h2.71c0.27,0,0.53,0.23,0.5,0.54L13.09,15.99z M16.32,15.99h-1.23l0.62-6.9 c0.03-0.33,0.37-0.54,0.68-0.42l2.01,0.8c0.22,0.09,0.34,0.31,0.31,0.54L16.32,15.99z M20.12,16.93l-1.68-0.84l1.08-2.7l1.41,2.71 C21.21,16.63,20.64,17.19,20.12,16.93z" />
    </g>
</g>
```

The `.hbs` file must start exactly with the content `"<g>"` or `"<g "` for correct compilation. The HBS compiler will generate a template that you can then import and register with the icon regsitry.

`bundle.esm.js`
```js
import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import iconBakeryDiningTemplate from "./dist/generated/templates/BakeryDiningTemplate.lit.js";

// create the icon data for registration
const iconBakeryDining = {
    customTemplate: iconBakeryDiningTemplate,
    viewBox: "0 0 24 24",
    collection: "custom",
}

// register the icon
registerIcon("bakery-dining", iconBakeryDining);
```

The icon data object should fill the `customTemplate` property with a template that will be included inside the SVG of the `<ui5-icon>`. In that case, a `path` won't be rendered. You can also specify a custom `viewBox` size, as the default one is `0 0 512 512`.

Finally, the icon can be used anywhere.
```html
<ui5-icon name="custom/backery-dining"></ui5-icon>
<ui5-avatar icon="custom/backery-dining" size="XS"></ui5-avatar>
```

Tip: for multi-colored icons, you can specify multiple SVG elements and put a fill/color attribute with a specific value on each element.
```html
<g fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" fill="aqua"/>
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
</g>
```

Next: [Using Additional Assets](../using-assets)
