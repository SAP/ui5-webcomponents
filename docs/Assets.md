# Assets and JSON module imports

1. UI5 web components need non-code assets for their entrprise-ready features (i18n texts, themes, etc.)
2. These assets need to be known at runtime, but the actual bundle is created by applications.
3. The application has to "link" the assets from their node_modules location to their runtime location and make them known to the UI5 webcomponents framework.

The easiest way to enable applications for such "linking" is to express the dependency from the code of the web components to the actual asset files in terms of ES6 imports. In our case, the assets are in `.json` format, so using ES6 imports for the `.json` files is a way to "show" applicaitons what assets are needed.

Since JSON module imports are not standard browser functionality yet (spec work is in progress), a build tool is necessary and the assets imports are not imported automatically from the components in order to make them work without a build tool for rapid prototyping.

The assets are still required for productive usage so a separate import is necessary as well.

Currently our npm packages follow the scheme:

`@ui5/<PACKAGE_NAME>/dist/generated/assets/*`
(for the assets themselves)

`@ui5/<PACKAGE_NAME>/dist/Assets.js`
(for the module that provides the assets)

All JS build tools support importing JSON modules (via plugins like `@rollup/plugin-json` or by default like webpack), by inlining them in a JS module that exports the acutual content. In order to avoid inlinding all 40+ languages and ending up with a huge bundle, the `Assets.js` file exposes the assets with dynamic imports. This way, application build tools can do the following two things:
- include the necessary JSON data (inlined in JS) in the build output folder
- leave dynamic imports to only load the necessary one at runtime (since the ui5 webcomponents framework will see the runtime location inside the dynamic import).

## Packages
<a name="packages"></a>

### `localization` package

The `localization` package provides CLDR assets.

`import "@ui5/webcomponents-localization/dist/Assets.js";`

Usually you don't need to import the assets directly from the `localization` package (unless you are developing a Web Components package of your own),
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

`import "@ui5/webcomponents-icons/dist/add.js`";`

However, sometimes it makes sense to import all icons, hence the `import "@ui5/webcomponents-fiori/dist/Assets.js";` JSON import.
Along with the icons, it also includes all translatable texts.
