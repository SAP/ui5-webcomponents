# Using the Framework

*This section mentions framework-level APIs that do not have a dedicated section.*

Most of the time you'll be using the UI5 Web Components' APIs to do your job. However, there are also certain framework-level
APIs you should be aware of.


## Executing Code on Boot

```js
import { attachBoot } from "@ui5/webcomponents-base/dist/Boot.js";
```

The `attachBoot` function allows you to execute custom code when the framework has finished booting.

Example:

```js
attachBoot(() => {
	console.log("Framework booted");
});
```

## Ignoring Custom HTML Elements

The `ignoreCustomElements` feature lets you describe all custom elements to be ignored and improve the rendering performance of the UI5 Web Components by setting a given tag prefix.

```js
import { ignoreCustomElements } from "@ui5/webcomponents-base/dist/IgnoreElements.js";
ignoreCustomElements("app-");
```

### When do I need to use the `ignoreCustomElements` feature?

The feature is useful when UI5 Web Components are used together with custom HTML elements with custom tags to make the application markup more semantic.

For example:

```html
<ui5-card>
    <app-trip-calendar></app-trip-calendar>
</ui5-card>
```

The `ui5-card` is a UI5 Web Component, while the `app-trip-calendar` is an app-defined custom HTML element with just a semantic purpose, no JavaScript attached. It is slotted in the content of the `ui5-card`.

When a web component of ours is about to be defined and registered in the global CustomElements registry, the framework checks if some of the slotted children are custom elements by checking the presence of a hyphen ("-") in their tag names. If this is true, the framework waits for the children to be defined and registered first, because the state or visual appearance of the parent may rely on the slotted elements/children.

While this is required in many cases, for custom HTML elements with pure semantic purpose and no JavaScript class attached (f.e. `app-trip-calendar`) - it's not.
Moreover, it leads to increasing the `time to render` parameter of the given web component (f.e.`ui5-card`).
In cases like this, we recommend using `ignoreCustomElements` to let the UI5 Web Components framework treat such custom HTML elements as if they are standard HTML elements, such as: `div`, `span`, etc.
