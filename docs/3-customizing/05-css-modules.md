# CSS Modules
## What Are CSS Modules?
[CSS Modules](https://github.com/css-modules/css-modules/) are CSS files where all class names and animation names are scoped locally by default. They help us to provide styles which could be used to improve the styles of components to make them suitable for specific use cases.

## Local Scope
CSS Modules have class selectors scoped locally by default. For instance, the class `inputIcon` is specific to that file. This is useful when the class is used in micro-front-end scenarios.

```css
.inputIcon { // for example it results in: _inputIcon_1aanh_2
}
```

## Support
CSS modules allow you to import your .css file into a JavaScript Object with the CSS definitions as properties. They don't have an official specification, nor are they a browser feature. They are part of a compilation process that runs against your project to convert scoped classes and selectors into CSS files that the browser can understand.

### Tools
| Name    | Description                                                   |
|---------|---------------------------------------------------------------|
| PostCSS | PostCSS supports CSS Modules through the plugin `postcss-modules`. [Learn more](https://www.npmjs.com/package/postcss-modules) |
| Webpack | The `css-loader` has CSS Modules built-in. You can activate it by using the `?modules` flag. [Learn more](https://github.com/webpack-contrib/css-loader) |
| Vite    | Vite supports CSS Modules through Lightning CSS. [Learn more](https://vitejs.dev/guide/features#css-modules) |

### Frameworks

| Name   | Description    |
|--------|----------------|
| React  | Integration into the build tool might be needed. |
| Angular| Integration into the build tool might be needed. |
| Vue    | Integration into the build tool might be needed. |
| Svelte | Integration into the build tool might be needed. |

## Example Usage
As mentioned earlier, each tool that supports CSS modules resolves them to a JavaScript import that has a default export as a JavaScript Object with keys for each CSS definition and named exports respectively.

### Usage with tooling

With the current example, we cover the use case for interactive icons inside `ui5-input`. By default, not every icon placed inside `ui5-input` should have an interactive visual appearance, and people had to implement missing styles themselves. With `@ui5/webcomponents/dist/styles/Icon.module.css`, we provide styles for interactive icons that might be reused.

```html
<ui5-input>
    <ui5-icon id="custom-icon" name="search" slot="icon"></ui5-icon>
</ui5-input>
<script type="module">
    import { inputIcon } from "@ui5/webcomponents/dist/styles/Icon.module.css";

    const icon = document.getElementById("custom-icon");
    icon.classList.add(inputIcon);
</script>
```

### Usage without Tooling

CSS modules can be used without being processed by build tools, similar to native CSS files. To use them, you need to import them directly inside your CSS files using a relative path to the module. Our CSS definitions follow the camelCase naming convention, meaning that each key from the JavaScript Object or named import has a class representation (for example, `import { inputIcon } from "@ui5/webcomponents/dist/styles/Icon.module.css"'` can be used as the `.inputIcon` class in this scenario).

**Note:** If you are unsure whether your application or build tool supports CSS modules, you can use the respective file without the `.module` in the file name, which is provided for each of the CSS modules.

**Note:** When CSS modules are imported into CSS files, the CSS definitions are not scoped.

```html
<style>
    @import url("./node_modules/@ui5/webcomponents/dist/styles/Icon.module.css");
    ## Or
    @import url("./node_modules/@ui5/webcomponents/dist/styles/Icon.css");
</style>
<ui5-input>
    <ui5-icon name="search" slot="icon" class="inputIcon"></ui5-icon>
</ui5-input>
```

## Available CSS Modules in Main Package

### Icon.module.css

`Icon.module.css` provides CSS definitions for enhacing the `ui5-icon` component styles in different use cases. You can reuse these styles by using `@ui5/webcomponents/dist/styles/Icon.module.css`.

| CSS Definition | Description | Since |
|----------------|-------------|-------|
| `inputIcon` | Used to style icons in the context of input components where components accept icons as a slot and the icon should be visually interactive | 2.0.0 |