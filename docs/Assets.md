# Assets and JSON module imports

UI5 Web Components aim to be feature rich and with a minimal code footprint at the same time. In order to achieve this, 
most UI5 Web Components packages ship their assets as `.json` files while also providing respective public module imports for them.

The assets in question could be i18n texts, icons, additional themes parameters, CLDR, etc...

Currently our npm packages follow the scheme:

`@ui5/<PACKAGE_NAME>/dist/assets/*`
(for the assets themselves)

`@ui5/<PACKAGE_NAME>/dist/json-imports/*`
(for the modules that provide the assets)

<a name="packages"></a>
## Packages

### `base` package

Asset type | Asset path | Public Module Import
------|------------------|---
CLDR | `@ui5/webcomponents-base/dist/assets/cldr/*` | `@ui5/webcomponents-base/dist/json-imports/LocaleData.js`

Usually you don't need to import the CLDR assets from the `base` package, but rather from the package(s) containing the actual web components.

### `main` package

Asset type | Asset path | Public Module Import
------|------------------|---
i18n | `@ui5/webcomponents/dist/assets/i18n/*` | `@ui5/webcomponents/dist/json-imports/i18n.js`
Additional themes | `@ui5/webcomponents/dist/assets/themes/*` | `@ui5/webcomponents/dist/json-imports/Themes.js`
CLDR | N/A | `@ui5/webcomponents/dist/json-imports/LocaleData.js`

The `main` package does not have any additional CLDR assets besides the CLDR assets of the `base` project.

### `fiori` package

Asset type | Asset path | Public Module Import
------|------------------|---
i18n | `@ui5/webcomponents-fiori/dist/assets/i18n/*` | `@ui5/webcomponents-fiori/dist/json-imports/i18n.js`
Additional themes | `@ui5/webcomponents-fiori/dist/assets/themes/*` | `@ui5/webcomponents-fiori/dist/json-imports/Themes.js`

### `icons` package

Asset type | Asset path | Public Module Import
------|------------------|---
i18n | `@ui5/webcomponents-fiori/dist/assets/i18n/*` | `@ui5/webcomponents-fiori/dist/json-imports/i18n.js`
All icons | `@ui5/webcomponents-fiori/dist/assets/icon-collections/*` | `@ui5/webcomponents-fiori/dist/json-imports/Icons.js`

Normally applications are expected to import only the individual icons that are going to be used, for example:

`import "@ui5/webcomponents-icons/dist/icons/add.js`";`

However, sometimes it makes sense to import all icons, hence the `@ui5/webcomponents-fiori/dist/json-imports/Icons.js` JSON import.

Since some icons have translatable tooltips, you might need the `i18n` JSON import as well.

<a name="bundling"></a>
## Efficient asset bundling

You may notice that JSON imports, for example:

`import "@ui5/webcomponents/dist/json-imports/i18n.js"`

or
 
`import "@ui5/webcomponents/dist/json-imports/Themes.js"` 
 
 will produce warning messages in the browser's console, such as for example:
> Inefficient bundling detected: consider bundling i18n/theme proeprties imports as URLs instead of inlining them.
> See rollup-plugin-url or webpack file-loader for more information.
> Suggested pattern: "assets\/.*\.json"

What this means is that it's recommended to instruct your source code bundling software
(some of the most popular being Webpack and Rollup) not to include all the asset files or theming related files
(files that match the <code>assets\/.*\.json</code> pattern) in your applications's javascript bundle,
but rather to leave them out. At runtime, they will be fetched on demand, if ever requested.

[How to do it with Webpack](https://github.com/webpack-contrib/file-loader)

[How to do it with Rollup](https://github.com/rollup/rollup-plugin-url)

Rollup example:

```js
import url from "rollup-plugin-url";
...
plugins.push(url({
	limit: 0,
	include: [
		/.*assets\/.*\.json/,
	],
	emitFiles: true,
	fileName: "[name].[hash][extname]",
	publicPath: YOUR_APPLICATION_PUBLIC_PATH + "/resources/",
}));
```

Please note that the code above is just sample snippet, and will not work on its own.
