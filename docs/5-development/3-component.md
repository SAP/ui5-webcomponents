# Defining a Component

To define your own custom UI5 web components, you need to:
- Use the `customElement` decorator.
- Extend the `UI5Element` base class.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

@customElement({
    tag: "my-demo-component",
    renderer: ...,
    styles: ...,
    template: ...,
    dependencies: ...,
    languageAware: ...,
    themeAware: ...,
    fastNavigation: ...,
    formAssociated: ...,
    shadowRootOptions: ...,
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

## @customElement decorator
The `customElement` decorator is a class decorator that takes one argument, which can be either a string or an object literal containing configuration options for the component. This allows each component to be individually configured.

When the argument is a string, it defines the tag name of the component. Otherwise, if the argument is an object literal you can see available options below.

### tag
This option is a string that sets the name of the custom element, registering the component within the global `CustomElementsRegistry`, where all custom elements are defined.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

@customElement({
    tag: "my-demo-component"
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

**Note:** By the HTML specification, the tag name must contain a dash ('-').

### renderer
This option specifies the rendering engine for the component. UI5 Web Components are agnostic of the DOM render engine used. However, all standard UI5 Web Components (`@ui5/webcomponents`, `@ui5/webcomponents-fiori`, etc.) use [lit-html](https://github.com/Polymer/lit-html) as the rendering technology of choice.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

@customElement({
    renderer: litRender
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

By specifying the `renderer` option, you can choose the rendering engine that best suits your component's needs.

### template
This option accepts a template in a type that your defined renderer will understand.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import MyDemoComponentTemplate from "./generated/templates/MyDemoComponentTemplate.lit.js";

@customElement({
    template: MyDemoComponentTemplate
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

**Note:** Standard UI5 Web Components use Handlebars templates that are automatically converted to lit-html syntax by the build script. If you have a `MyDemoComponentTemplate.hbs`, the build script will create a `generated/templates/DemoTemplate.lit.ts` file for you.

### styles
This option accepts either component styles or an array of component styles that should be inserted inside the shadow root of the component.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import MyDemoComponentCss from "./generated/themes/MyDemoComponent.css.js";

@customElement({
    styles: MyDemoComponentCss
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

**Note:** The build scripts automatically transpile your `.css` files to JavaScript files. For example, your `my-package/src/theme/MyDemoComponent.css` will be transpiled to `my-package/src/generated/themes/MyDemoComponent.css.ts`, which, in addition to your component's CSS, also contains definitions for all CSS variables for the default theme.

### dependencies
This option accepts an array of dependencies, which are all other web components used inside the `.hbs` template file. Without this, the internally used web components won't be defined.

Furthermore, to utilize the Scoping feature, you must list all the internally used web components in the `dependencies` static getter. The framework reads the dependencies and scopes the tag names of the listed web components.

For example, if the `ui5-icon` tag (or any other standard or custom UI5 Web Component) is used inside the template, you must import the `Icon` web component and add it to the `dependencies` static getter as shown:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";

@customElement({
    dependencies: [Icon]
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

### languageAware
This option accepts a boolean value and determines if the component should be re-rendered whenever the language changes. Use this setting if your component has translatable texts and needs to be re-rendered when the app changes the language.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

@customElement({
    languageAware: true
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

### themeAware
This option accepts a boolean value and determines if the component should be re-rendered whenever the theme changes.

**Important: You should almost never use this setting.**

Components are usually built so their structure is the same for all themes, with only CSS variables changing. This way, the browser automatically updates the styles when CSS variables get new values.

However, in rare cases, a component must behave differently (not just look differently) based on the theme. For example, the `ui5-icon` component shows different versions of the icons based on the theme. Use the `themeAware` setting in these exceptional cases to ensure your component is re-rendered on theme change.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

@customElement({
    themeAware: true
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

### fastNavigation
This option accepts a boolean value and defines whether this control supports F6 fast navigation. When enabled, the framework will set the `data-sap-ui-fastnavgroup` attribute on the component root element to construct a fast navigation group.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

@customElement({
    fastNavigation: true
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

### formAssociated
This option accepts a boolean value and defines if the component should support native form functionality. When set, the framework uses the `ElementInternals` API to implement the required interfaces for the component to work in a native HTML form as standard HTML input elements do. This is commonly used in input-type components such as Input, ComboBox, MultiComboBox, Select, and more.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

@customElement({
    formAssociated: true
})
class MyDemoComponent extends UI5Element {
    // class implementation
}
```

By following these guidelines, you can define and configure custom UI5 web components to meet your specific requirements.