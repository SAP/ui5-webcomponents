# Assets and JSON module imports

UI5 Web Components aim to be feature rich and with a minimal code footprint at the same time. In order to achieve this, 
most UI5 Web Components packages ship their assets as `.json` files while also providing a public module import for them.

The assets in question could be i18n texts, icons, additional themes parameters, CLDR, etc...

Currently our npm packages follow the scheme:

`@ui5/<PACKAGE_NAME>/dist/generated/assets/*`
(for the assets themselves)

`@ui5/<PACKAGE_NAME>/dist/Assets.js`
(for the module that provides the assets)

<a name="packages"></a>
## Packages

### `localization` package

The `localization` package provides CLDR assets.

`import "@ui5/webcomponents-utils/dist/Assets.js";`

Usually you don't need to import the assets directly from the `base` package (unless you are developing a Web Components package of your own),
but rather from the package(s) containing the actual Web Components you'll be using in your app.

### `theme-base` package

The `theme-base` package provides common parameters for all themes.

`import "@ui5/webcomponents-theme-base/dist/Assets.js";`

Usually you don't need to import the assets directly from the `theme-base` package (unless you are developing a Web Components package of your own),
but rather from the package(s) containing the actual Web Components you'll be using in your app.

### `main` package

The `main` package's `Assets.js` import provides package-specific additional theming parameters and i18n assets. 
All assets from the `base` and `theme-base` packages are also imported automatically so you don't have to worry about them.

`import "@ui5/webcomponents/dist/Assets.js";`

### `fiori` package

The `fiori` package's `Assets.js` import provides package specific additional theming parameters and i18n assets. All assets from the `main`
package are also imported since the `fiori` package internally uses features of the `main` package.

`import "@ui5/webcomponents-fiori/dist/Assets.js";`

### `icons` package

`import "@ui5/webcomponents-fiori/dist/Assets.js";`

Normally applications are expected to import only the individual icons that are going to be used, for example:

`import "@ui5/webcomponents-icons/dist/icons/add.js`";`

However, sometimes it makes sense to import all icons, hence the `import "@ui5/webcomponents-fiori/dist/Assets.js";` JSON import. 
Along with the icons, it also includes all translatable texts.

<a name="bundling"></a>
## Efficient asset bundling

You may notice that `Assets.js` imports, such as:

`import "@ui5/webcomponents/dist/Assets.js"`
 
 will produce warning messages in the browser's console, such as for example:
> Inefficient bundling detected: consider bundling i18n/theme properties imports as URLs instead of inlining them.
> See rollup-plugin-url or webpack file-loader for more information.
> Suggested pattern: "assets\/.*\.json"

What this means is that it's recommended to instruct your source code bundling software
(some of the most popular being Webpack and Rollup) not to include all the asset files or theming related files
(files that match the <code>assets\/.*\.json</code> pattern) in your applications' JavaScript bundle,
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
