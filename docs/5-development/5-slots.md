### Slots

In this article, we will discuss slots in the context of UI5 web components and how to define your own.

Components often need to render dynamic children in specific locations in their component tree, allowing a developer to supply child content when using the component, which will then place that child content in the proper location.

Currently, there are two types of slots: `named` and `unnamed`. The difference between these types is that named slots have accessors as class members, while unnamed slots do not. To define an unnamed slot, you simply add a `<slot>` element inside your `.hbs` template.

```hbs
<slot name="mySlot"></slot>
```

**Note:** It is recommended to describe your unnamed slots inside a JSDoc comment that describes your class using the `@slot` tag, following the pattern `@slot {type} name - description`.

To see how to define a `named` slot, see below.

## @slot decorator
To define your own named slot, you need to:
- Use the `slot` decorator.
- Define a class member.

The `slot` decorator is a property decorator that takes one optional argument as an object literal containing configuration options for the slot.

Defining a slot with the `slot` decorator means that this slot will be managed by the library. This means:
- If any of this UI5 Web Component's children are custom elements, the framework will wait until they are all defined and upgraded before rendering the component for the first time.
- The library will invalidate this UI5 Web Component whenever its children are added, removed, or rearranged (and additionally when invalidated, if `invalidateOnChildChange` is set).

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement })
    mySlot!: Array<HTMLElement>;
}
```

You can see the available options below.

### type
This option is required and accepts a type constructor (e.g., `HTMLElement`, `Node`) and is used to define the type of children that can be slotted inside the slot.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement })
    mySlot!: Array<HTMLElement>;
}
```

Available types:
| Type        | Description                      |
|-------------|----------------------------------|
| HTMLElement | Accepts HTML Elements only       |
| Node        | Accepts both Text nodes and HTML Elements |

### default
This option accepts a boolean value and is used to define whether this slot is the default one.

**Note:** The default slot can be used directly with `<slot></slot>` without specifying the slot name inside the template.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement, default: true })
    mySlot!: Array<HTMLElement>;
}
```

### individualSlots
This option accepts a boolean value and is used to define if each child will have its own slot, allowing you to arrange or wrap the children arbitrarily. This means that you need to handle the rendering on your own.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement, individualSlots: true })
    mySlot!: Array<HTMLElement>;
}
```

To render individual slots, you have to iterate and render each item arbitrarily. This can be done in two ways as shown below:

```hbs
{{#each mySlot}}
    <div>{{this}}</div>
{{/each}}
<!-- or -->
{{#each mySlot}}
    <slot name="{{this._individualSlot}}"></slot>
{{/each}}
```

**Note:** When this option is set to `true`, the `_individualSlot` property is set to each direct child, where `_individualSlot` returns a string following the pattern `{nameOfTheSlot}-{index}` and the slot attribute is changed based on that pattern.

### invalidateOnChildChange
This option accepts a boolean value or an object literal containing a configuration with more specific settings, determining whether the component should be invalidated on child change.

**NOTE: This is an experimental option and should not be used.**

Important: `invalidateOnChildChange` is not meant to be used with standard DOM elements and is not to be confused with MutationObserver-like functionality. It targets the use case of components that slot abstract items (UI5Element instances without a template) and require invalidation whenever these items are invalidated.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement, invalidateOnChildChange: true })
    mySlot!: Array<HTMLElement>;

    @slot({ type: HTMLElement, invalidateOnChildChange: { properties: true, slots: false }})
    mySlot2!: Array<HTMLElement>;

    @slot({ type: HTMLElement, invalidateOnChildChange: { properties: ["myProp"], slots: ["anotherSlot"] }})
    mySlot3!: Array<HTMLElement>;
}
```