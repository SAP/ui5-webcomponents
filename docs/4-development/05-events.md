# Events

In this article, we will discuss events in the context of UI5 Web Components.

Components use `CustomEvent` to inform developers of important state changes in the components. For example, the `change` event is fired whenever the value of a `ui5-input` is changed.

## `@event` Decorator

To define your own custom event, you need to use the `@event` decorator.

The `event` decorator is a class decorator that takes one required argument as a string to define the event name and an optional argument as an object literal to describe details of the custom element.

The details object allows developers to describe more information about the event.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";

@customElement("my-demo-component")
@event("change", {
	detail: {
		valid: { type: Boolean },
	},
})
class MyDemoComponent extends UI5Element {}
```

**Note:** This decorator is used only to describe the events of the component and is not meant to create emitters.

## How to use events

As mentioned earlier, the `@event` decorator doesn't create event emitters. To notify developers of component changes, we have to fire events ourselves. This can be done using the `fireEvent` method that comes from the `UI5Element` class.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";

@customElement("my-demo-component")
@event("change")
class MyDemoComponent extends UI5Element {
    @property()
    value = "";

    onNativeInputChange(e) {
        this.value = e.target.value;
        this.fireEvent("change");
    }
}
```

Events fired by the `fireEvent` method can be configurable, meaning you can decide whether the event should be cancelable or able to bubble. This can be done by setting the third and fourth parameters of the function to true, respectively.

```ts
this.fireEvent("change", {}, cancelable, bubbles);
```

**Note:** By default, the `fireEvent` method returns a boolean value that helps you understand whether the event was canceled (i.e., if the `preventDefault` method was called).

## Types
The `@event` decorator is generic and accepts a TypeScript type that describes its detail. This type is crucial for preventing incorrect detail data when the event is fired using `fireEvent` (which is also generic) and for ensuring type safety when listening for the event, so you know what kind of detail data to expect.

**Note:** It's required to export all types that describe specific event details for all public events.

Here's an example implementation:

```typescript
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";

// Define the event detail type
export type MyDemoComponentChangeEventDetail = {
    valid: boolean;
};

@customElement("my-demo-component")
@event<MyDemoComponentChangeEventDetail>("change", {
    detail: {
        valid: { type: Boolean },
    },
})
class MyDemoComponent extends UI5Element {
    @property()
    value = "";

    onNativeInputChange(e: Event) {
        this.fireEvent<MyDemoComponentChangeEventDetail>("change", {
            valid: true,
        });
    }
}

export { MyDemoComponent };
```

## noConflict mode
By default, UI5 Web Components fire all custom events twice: once with their name (e.g., `change`) and once more with a `ui5-` prefix (e.g., `ui5-change`). For example, when the `ui5-switch` is toggled, it fires a `change` event and a `ui5-change` event.

This `noConflict` setting allows us to prevent clashes between native and custom events.

The `noConflict` setting (`@ui5/webcomponents-base/config/NoConflict.js`) controls this behavior:
- **`false` (default)**: Events fire both with and without the `ui5-` prefix.
- **`true`**: Events fire only with the `ui5-` prefix, avoiding name collisions with third-party libraries.
- **Object**: Specific events listed in the object fire only with the `ui5-` prefix, while all other events fire both ways. Example:
  ```json
  {
      "events": ["selection-change", "header-click"]
  }
  ```
  In this case, only `selection-change` and `header-click` fire with the `ui5-` prefix, leaving these names available for other uses.

**Note:** With this setting, when attaching an event listener to a UI5 web component used inside a template, the event name must be specified with the ui5- prefix.