# Assets and JSON Module Imports

UI5 Web Components need non-code assets for their enterprise-ready features (i18n texts, themes, etc.). These assets need to be known at runtime, but the actual bundle is created by applications. The application has to "link" the assets from their node_modules location to their runtime location and make them known to the UI5 Web Components framework.

The easiest way to enable applications for such "linking" is to express the code dependency of the Web Components to the actual asset files in terms of ES6 imports. In our case, the assets are in `.json` format, so using ES6 imports for the `.json` files is a way to "show" applications what assets are needed.

Since JSON module imports are not a standard browser functionality yet (spec work is in progress), you need a build tool. The assets imports are not imported automatically from the components in order to work without a build tool for rapid prototyping.

You need a separate import as well because the assets are still required for productive usage.

Currently, our npm packages follow this scheme:

`@ui5/<PACKAGE_NAME>/dist/generated/assets/*`
(for the assets themselves)

`@ui5/<PACKAGE_NAME>/dist/Assets.js`
(for the module that provides the assets)

All JS build tools support importing JSON modules (via plugins like `@rollup/plugin-json` or by default like webpack), by inlining them in a JS module that exports the actual content. To avoid the inlining of all 40+ languages and ending up with a huge bundle, the `Assets.js` file exposes the assets with dynamic imports. This way, application build tools can do the following two things:
- Include the necessary JSON data (inlined in JS) in the build output folder.
- Leave dynamic imports to only load the necessary one at runtime (since the UI5 Web Components framework will see the runtime location inside the dynamic import).

## Packages
<a name="packages"></a>

### `localization` package

The `localization` package provides CLDR assets.

`import "@ui5/webcomponents-localization/dist/Assets.js";`

Unless you are developing a Web Components package of your own, you don't need to import the assets directly from the `localization` package but rather from the package(s) containing the actual Web Components you'll be using in your app.

### `theme-base` package

The `theme-base` package provides common parameters for all themes.

`import "@ui5/webcomponents-theme-base/dist/Assets.js";`

Unless you are developing a Web Components package of your own, you don't need to import the assets directly from the `theme-base` package,
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

The assets file for the `@ui5/webcomponents-icons` package provides i18n assets for some icons: 

`import "@ui5/webcomponents-icons/dist/Assets.js";`

Normally, applications are expected to import only the individual icons that are going to be used, for example:

`import "@ui5/webcomponents-icons/dist/add.js`";`

However, sometimes it makes sense to import all icons. To do so, use the following import:

`import "@ui5/webcomponents-icons/dist/AllIcons.js";`

### `icons-tnt` package

The assets file for the `@ui5/webcomponents-icons-tnt` package is currently empty, but it may provide i18n assets in the future:

`import "@ui5/webcomponents-icons/dist/Assets.js";`

Therefore, we recommend importing it to be future-proof.

To import all `tnt` icons:

`import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";`
