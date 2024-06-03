# Understanding UI5 Web Components Metadata

Metadata describes the public interface of a UI5 Web Component (tag name, properties, etc.).

*Disclaimer: The information below is for UI5 Web Components development only. It is experimental and may change.*

## Tag

Defines the HTML tag for the Web Component.

#### Example:

```ts
@customElements({
	tag: "my-component",
})
class MyComponent extends UI5Element {};
``` 



## Language-aware components

The `languageAware` metadata setting determines if the component should be re-rendered whenever the language changes.

```ts
@customElement({
	tag: "my-component",
	languageAware: true,
})
class MyComponent extends UI5Element {
}
```

You should use this setting if your component has translatable texts, therefore needs to be re-rendered when the app
changes the language.

## Theme-aware components

The `themeAware`  setting determines if the component should re-render whenever the theme changes.

```ts
@customElement({
	tag: "my-component",
	themeAware: true,
})
class MyComponent extends UI5Element {
}
```

**Important: You should almost never use this setting.**

Normally components are built in such a way that their structure
is exactly the same for all themes and whenever the theme changes *only CSS Variables are changed* and the component itself
does not need to be re-rendered - the browser automatically updates the styles when CSS Variables get new values.

However, there are some very rare cases where a component must behave differently (opposed to just look differently) based on the theme.
For example, the `ui5-icon` component must show different versions of the icons based on the theme. Use the `themeAware` setting
in these exceptional cases to guarantee that your component will be re-rendered on theme change.


## Form-associated components

The `formAssociated` setting defines if the component should support native Form support.
When set, the framework makese use of the `ElementInternals` API to implements the required interfaces to make component working in a native HTML Form
as standard HTML input element do.
It's commonly used in input-type components, such as: Input, ComboBox, MultiComboBox, Select and more.

```ts
@customElement({
	tag: "my-component",
	formAssociated: true,
})
class MyComponent extends UI5Element {
}
```

## Components in fast navigation groups

The F6 Navigation feature allows users to navigate quickly between groups of DOM elements using keyboard shortcuts.
The `fastNavigation` setting defines whether this control supports F6 fast navigation.
When the setting is enabled, the framework will set the `data-sap-ui-fastnavgroup` attribute on the component root element to construct fast navigation group.
When the focus is on the component and the `F6` key is pressed, the focus goes to the first focusable element of the next group, skipping other focusable elements inside the current component. Commonly used by container-type of compoennts like: Tabale, List, Wizard, ShellBar, Panel and more.

```ts
@customElement({
	tag: "my-component",
	fastNavigation: true,
})
class MyComponent extends UI5Element {
}
```


## Properties / Attributes

Defines the HTML properties for the Web Component. 

**Note about attributes:** By default, for each property an equivalent attribute is supported. Attributes have the same names as properties, but in `kebab-case` rather than `camelCase`.
Properties of type `Object`, properties with `multiple` set to`true` and properties with `noAttribute` set to `true` do not have an attribute equivalent. 

#### Example

```ts
@customElements({
	tag: "my-component",
})
class DemoComponent extends UI5Element {

	@property({ type: String, defaultValue: "Hello" })
	message!: string;

	@property({ type: Boolean, "noAttribute": true })
	shown!: boolean;

	@property({ type: Object })
	settings!: object;

	@property({ validator: Integer })
	animationDuration!: number;

	@property({ validator: Integer,  "multiple": true })
	nums!: Array<number>;
};
``` 


#### @property configuration settings

| Setting        | Type                         | Default   | Description                                                                                                   |
|----------------|------------------------------|-----------|---------------------------------------------------------------------------------------------------------------|
| `type`         | Property type                | String    | The type of the property. For more information on types see the table below.                                  |
| `defaultValue` | Any valid value for the type | undefined | Default value of the property. Cannot be set for type "Boolean". Booleans are always false by default in HTML.|
| `multiple`     | Boolean                      | false     | Indicates whether the property represents a single value or is an array of values of the given type.          |
| `noAttribute`  | Boolean                      | false     | No attribute equivalent will be created for that property. Always true for properties of type Object.        |
| `validator`  | Validator type                 | N/A       | The validator of the property. For more information on validators see the table below  |

**Note:** The `type` setting is required, except these two cases:

- `string` properties (type: String is considered default)

```ts
@property()
name!: string;
``` 

- `validator` is provided:

```ts
@property({ validator: Integer })
animationDuration!: number;
```


#### Types

| Type        | Class to Use                                            | Description                             |
|-------------|---------------------------------------------------------|-----------------------------------------|
| string      | `String`                                                | String value                            |
| boolean     | `Boolean`                                               | Boolean value - always false by default |
| object      | `Object`                                                | JS Object                               |
| custom type | Extend `@ui5/webcomponents-base/dist/types/DataType.js` | Used mainly for enumerations            |


#### Examples of prebuilt custom types

| Type       | Class to Use                                       | Description                                                    |
|------------|----------------------------------------------------|----------------------------------------------------------------|
| Integer    | `@ui5/webcomponents-base/dist/types/Integer.js`    | Integer value                                                  |
| ValueState | `@ui5/webcomponents-base/dist/types/ValueState.js` | Enumeration with: `None`, `Error`, `Warning`, `Success` values |

#### Validators

The `validator` is a custom class that implements `isValid` function that validates the property's value whenever it changes. If value is not valid, the framework will set the proeprty `defaultValue`.

| Type        | Class to Use                                             | Description                             |
|-------------|----------------------------------------------------------|-----------------------------------------|
| number      | `Integer`                                                | Validates the prop value to integer     |
| number      | `Float`                                                  | Validates the prop value to float       |
| string      | `CSSColor`                                               | Validates the prop value to valid CSS color|
| string      | `CSSSize`                                                | Validates the prop value to valid CSS size |
| string or HTMLElement      | `DomReference`                            | Validates the prop value is it's a string or HTMLElement |

## Slots

Defines the `slots` that will be provided by this UI5 Web Component.


#### Example


 ```js
class MyComponent extends UI5Element {
	@slot({ type: Node, "default": true })
	content!: Array<Node>;

	@slot()
	rows!: Array<HTMLElement>;

	@slot()
	footer!: Array<HTMLElement>;
}
```


#### Slot configuration settings

| Setting                      | Type                    | Default | Description                                                                                                                                                          |
|------------------------------|-------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` *                     | `HTMLElement` or `Node` | N/A     | The type of the children that can go into that slot.                                                                                                                  |
| `individualSlots`            | `Boolean`               | false   | If set to `true`, each child will have its own slot, allowing you to arrange/wrap the children arbitrarily.                                                          |
| `propertyName`               | `String`                | N/A     | Allows to set the name of the property on the Web Component, where the children belonging to this slot will be stored.                                               |
| `invalidateOnChildChange` ** | `Boolean` or `Object`   | false   | **Experimental, do not use.** Defines whether every invalidation of a UI5 Web Component in this slot should trigger an invalidation of the parent UI5 Web Component. |

`*` The `type` setting is required.

`**` 
**Note:** `invalidateOnChildChange` is not meant to be used with standard DOM Elements and is not to be confused with `MutationObserver`-like functionality. 
It rather targets the use case of components that slot abstract items (`UI5Element` instances without a template) and require to be invalidated in turn whenever these items are invalidated.  

The `invalidateOnChildChange` setting can be either a `Boolean` (`true` meaning invalidate the component on any change of a child in this slot) or an `Object` with `properties` and `slots` fields. They in turn can be either of
type `Boolean` (`true` meaning invalidate on any property change or any slot change) or `Array` of strings indicating exactly which properties or slots lead to invalidation.

Examples:

 - In the following example, since `invalidateOnChildChange` is not used (`false` by default), the component will be invalidated whenever children are added/removed in the `tabs` slot, but not whenever a child in that slot changes.

 ```js
class MyComponent extends UI5Element {
	@slot()
	tabs!: Array<HTMLElement>;
}
```

 - Setting `invalidateOnChildChange` to `true` means: invalidate the component whenever a child in the `tabs` slot gets invalidated, regardless of the reason.

```js
class MyComponent extends UI5Element {
	@slot({ type: HTMLElement, invalidateOnChildChange: "true" })
	tabs!: Array<HTMLElement>;
}
```


 - The following example uses the `Object` format again and means: invalidate the component whenever the children in this slot are invalidated due to property changes, but not due to slot changes. Here `"slots": false` is added for completeness (as `false` is the default value for both `properties` and `slots`)

```js
class MyComponent extends UI5Element {
	@slot({ 
		type: HTMLElement,
		invalidateOnChildChange: {
			"properties": true,
			"slots": false
		}
	})
	tabs!: Array<HTMLElement>;
}
```

 - The final example shows the most complex format of `invalidateOnChildChange` which allows to define which slots or properties in the children inside that slot lead to invalidation of the component:

 ```js
class MyComponent extends UI5Element {
	@slot({ 
		type: HTMLElement,
		invalidateOnChildChange: {
			"properties": ["text", "selected", "disabled"],
			"slots": ["default"]
		}
	})
	tabs!: Array<HTMLElement>;
}
```

Notes:
 - Children without a `slot` attribute will be assigned to the `default` slot. 
 - All HTML text nodes will be assigned to the `default` slot, as they cannot have a `slot` attribute.
 - For all slots the Web Component will have a property created, with the name of the slot, to hold a list of all children assigned to this slot.
 For example, if you have a slot named "rows", "this.rows" will be an array, holding references to all children with `slot="rows"`, or no slot, if rows was default.
 - For the `default` slot you can provide an accessor. In the following example, `this.items` will hold all children that were assigned to the default slot.

```ts
 @slot({ 
	type: HTMLElement
	"default": true,
})
items!: Array<HTMLElement>;
```


 #### Slot types

| Type        | Description                               |
|-------------|-------------------------------------------|
| Node        | Accepts both Text nodes and HTML Elements |
| HTMLElement | Accepts HTML Elements only                |


## Slots and Component Invalidation

 - The framework will invalidate this UI5 Web Component, whenever its children are added/removed/rearranged (and additionally when invalidated, if `invalidateOnChildChange` is set).
 - If any of this UI5 Web Component's children are custom elements, the framework will await until they are all
 defined and upgraded, before rendering the component for the first time.
