# Importing UI5 Web Components

*This section explains how to import UI5 Web Components to your projects.*

## Components Packages

The UI5 Web Components project currently offers 2 NPM packages with Web Components.

This separation is purely logical, as you can, and should, only import the components you are going to need from both packages. 

| Project | NPM Package                                                                        | Description                                                                          | Application           | Components List                                                   |
|---------|------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|-----------------------|-------------------------------------------------------------------|
| `main`  | [@ui5/webcomponents](https://www.npmjs.com/package/@ui5/webcomponents)             | "Bread-and-butter" components, such as buttons, pickers, inputs, list, table, etc. | General web apps      | [Explore](https://www.npmjs.com/package/@ui5/webcomponents)       |
| `fiori` | [@ui5/webcomponents-fiori](https://www.npmjs.com/package/@ui5/webcomponents-fiori) | More semantic, higher-order components that implement Fiori patterns                 | Mostly SAP Fiori apps | [Explore](https://www.npmjs.com/package/@ui5/webcomponents-fiori) |

## Usage


1. Add one or both of the above packages as dependencies to your project.

```
npm i @ui5/webcomponents
npm i @ui5/webcomponents-fiori
```

2. Import the components your app is going to use.

`import "@ui5/<PACKAGE-NAME>/dist/<COMPONENT-NAME>.js";`

For example:

```js
import "@ui5/webcomponents/dist/Button.js"; // ui5-button
import "@ui5/webcomponents/dist/Input.js"; // ui5-input
import "@ui5/webcomponents/dist/List.js"; // ui5-list
import "@ui5/webcomponents/dist/StandardListItem.js"; // ui5-li

import "@ui5/webcomponents-fiori/dist/Wizard.js"; // ui5-wizard
```

3. Use the components in your app.

Once a component is imported, it is **automatically** registered and ready to use. 

For example:

```html
<ui5-button id="btn">This is a button</ui5-button>
<ui5-input value="This is an input"></ui5-input>
<script>
    btn.addEventListener("click", () => {});
</script>
```

**Note:** For most components the name of the module (f.e. `Button.js`, `Icon.js`) coincides with the name of the tag (`ui5-button`, `ui5-icon`), 
whereas for others this is not the case (f.e. `StandardListItem.js` and `ui5-li`). Always consult the documentation when in doubt.

Next: [Understanding UI5 Web Components APIs](../understanding-components-apis)
