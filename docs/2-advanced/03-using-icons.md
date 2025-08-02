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

### with JSX Templates

In case you need to use a fully custom SVG, that can be used `ui5-icon`, `ui5-button` or any component that offers API to display an icon via icon name, you can provide a custom JSX template, rendering the custom SVG and register it under a custom name.


#### 1. Create JSX template

First, create a JSX template for the icon you need:

```tsx
// MyPensilSVGTemplate.tsx
export default function MyPensilSVGTemplate() {
    return (
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2221_23716)"><path d="M11.3333 1.99998C11.503 1.79933 11.7131 1.63601 11.9499 1.52043C12.1868 1.40485 12.4453 1.33953 12.709 1.32865C12.9727 1.31777 13.2358 1.36156 13.4815 1.45723C13.7272 1.55291 13.9502 1.69836 14.1361 1.88432C14.3221 2.07029 14.467 2.29268 14.5616 2.53734C14.6562 2.78199 14.6985 3.04353 14.6857 3.3053C14.6728 3.56706 14.6052 3.8233 14.4872 4.05769C14.3691 4.29207 14.2032 4.49947 13.9999 4.66664L4.99992 13.6666L1.33325 14.6666L2.33325 11L11.3333 1.99998Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 3.33331L12.6667 5.99998" stroke-linecap="round" stroke-linejoin="round"/></g>
            <defs>
                <clipPath id="clip0_2221_23716"><rect width="16" height="16"/></clipPath>
            </defs>
        </svg>
    )
};
```

#### 2. Register the Custom Icon

You can use the `registerIcon` to register the custom icon as follows:

```js
import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import myPensilSVGTemplate from "./MyPensilSVGTemplate.js";

// create the icon data for registration
const iconPensil = {
    customTemplate: myPensilSVGTemplate,
    collection: "custom",
    viewBox: "0 0 24 24", // optional
}

// register the icon
registerIcon("pensil", iconPensil);
```

#### 3. Use the Custom Icon

Finally, the icon can be used anywhere.
```html
<ui5-icon name="custom/pensil"></ui5-icon>
<ui5-button icon="custom/pensil"></ui5-button>
<ui5-avatar icon="custom/pensil" size="XS"></ui5-avatar>
```

**Tip:** for multi-colored icons, you can specify multiple SVG elements and put a fill/color attribute with a specific value on each element.
```html
<g fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" fill="aqua"/>
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
</g>
```
