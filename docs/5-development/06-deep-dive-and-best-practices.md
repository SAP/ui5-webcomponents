# Deep Dive and Best Practices

This tutorial will cover some finer details and best practices when designing and developing UI5 Web Components.

Before you proceed, please make sure you've read the other articles from this section, especially
 - [Developing Custom UI5 Web Components](./02-custom-UI5-Web-Components.md)
 - [Understanding UI5 Web Components Metadata](./03-understanding-components-metadata.md)
 - [Understanding the Handlebars (`.hbs`) templates](./04-understanding-hbs-templates.md)

as this article will expand on many of the notions introduced there.

## Table of Contents
 [Component metadata](#metadata)
   - [Tag](#metadata_tag)
   - [Properties](#metadata_properties)
   - [Slots](#metadata_slots)
   - [Events](#metadata_events)
   - [Wrapping up metadata](#metadata_wrapping_up)

 [Understanding rendering](#rendering)
   - [What is rendering?](#rendering_def)
   - [Physical and logical components](#rendering_physical_logical)
   - [What is invalidation?](#invalidation)

 [Lifecycle hooks](#lifecycle)
   - [`constructor`](#lifecycle_constructor)
   - [`onBeforeRendering`](#lifecycle_before)
   - [`onAfterRendering`](#lifecycle_after)
   - [`onEnterDOM` and `onExitDOM`](#lifecycle_dom)

## Component metadata <a name="metadata"></a>

Component metadata referes to the public API of your component. Among other things, it includes:
 - the tag name;
 - what properties/attributes (and of what type) your component supports;
 - what slots your component supports;
 - what events your component fires.

### Tag <a name="metadata_tag"></a>

There is a `@customElement` class decorator available that is used just before the component's class and applied to the constructor of the class to describe the component.
One of the available settings is `tag` and  must include a `-` as required for any custom element:

```js
@customElement({
	tag: "my-component"
})
class MyComponent extends UI5Element {
}
```

and then the usage is:

```html
<my-component></my-component>
```

The `tag` is sometimes also referred to as the "pure tag", meaning it is not suffixed.
See [Scoping](../2-advanced/03-scoping.md) for more on using a suffix with tag names.

**Note:** The pure tag name of every UI5 Web Component is always set as an **attribute** to the component too.

For example, when you create a `ui5-button`

```html
<ui5-button id="b1" class="button1" design="Emphasized"></ui5-button>
```

the framework will create an empty attribute with the name `ui5-button` too, so the actual DOM would look like this:

```html
<ui5-button id="b1" class="button1" design="Emphasized" ui5-button></ui5-button>
```

Even if a suffix for tag names is configured (as described in [Scoping](../2-advanced/03-scoping.md)), the attribute with
the pure tag name will be the same.

For example, if the configured suffix is `-demo` and all components are used with this suffix

```html
<ui5-button-demo id="b1" class="button1" design="Emphasized" ui5-button></ui5-button-demo>
```

the **attribute** will still be the same (`ui5-button` as opposed to the tag name of `ui5-button-demo`).

Therefore, the best practice when developing UI5 Web Components is to write CSS selectors for the shadow roots using
attribute selectors, instead of tag selectors.

For example, if the `MyComponent.hbs` file looks like this

```html
<div class="my-component">
	<ui5-button id="openBtn">Open</ui5-button>
	<div>
		<slot></slot>
	</div>
	<ui5-list></ui5-list>
</div>
```

you should not write selectors by tag name for other components in the `MyComponent.css` file

```css
ui5-button {
	width: 50px;
}
```

because, as stated above, the tag name could be suffixed and is not guaranteed to always be the same as the pure tag name.

Instead, use the attribute selector

```css
[ui5-button] {
	width: 50px;
}
```

or another type of selector (for example by ID)

```css
#openBtn {
	width: 50px;
}
```

#### `languageAware`

Defines if the component will re-render when the configured language changes.
The setting commonly used in components that display built-in texts
that support i18n as they have to re-render to display the texts in the newly set language.

```ts
@customElement({
	tag: "my-component",
	languageAware: true,
})
class MyComponent extends UI5Element {
}
```


#### `themeAware`

Defines if the component will re-render when the configured theme changes.
It's used on rare cases when the rendering of the component depends on the theme - for instance, the `Icon` and the `IllustratedMessage`
should display different icon/illustration.

**Note:** The recommendation is not to write theme-dependant code, and components. Ideally, the CSS variables values should be the only thing that changes across different themes and for that we don't need component re-rendering. The framework loads the proper CSS variables per theme and the browser applies them.

```ts
@customElement({
	tag: "my-component",
	themeAware: true,
})
class MyComponent extends UI5Element {
}
```

#### `formAssociated`

Defines if the component should support native Form support, leveraging the `ElementInternals` API.
When set, the framework makese use of the `ElementInternals` API to implments the required interfaces so the component works in a native HTML Form
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

### Properties <a name="metadata_properties"></a>

The properties are defined via `@property` decorator and they are managed state. The framework will create a getter/setter pair on your component's prototype for each property, defined via the `@property` decorator and re-render the component once the property value changes.

```ts
@customElement({
	tag: "my-component",
})
class MyComponent extends UI5Element {
	@property()
	text?: string;
}
```

you can use the `text` getter/setter on this component's instances

```js
let t = myComponent.text;
myComponent.text = "New text";
```

Whenever `text` is read or set, the framework-defined getter/setter will be called and thus the framework will be in control of the property.

#### Properties vs Attributes

The `properties` section defines both properties and attributes for your component. By default, for each property (`camelCase` name) an attribute with the
same name but in `kebab-case` is supported. Properties of type `Object` and `Array` have no attribute counterparts. If you wish not to have an attribute for a given property regardless of the type, you can configure it with `noAttribute: true`.

#### Public vs Private Properties

The framework does not distinguish between *public* and *private* properties. You can treat some properties as private in a sense that you can document them as such and not advertise them to users.
The usual convention is that private properties start with an `_`, but this is not mandatory. In the end, all properties defined with the `@property` decorator, public or private, are *component state*, therefore cause the component to be invalidated and subsequently re-rendered, when changed.

#### Property Types

The`type` setting on the `@property` decorator is used for attribute conversion.

Converting from a property to a string, the framework can check the runtime type and convert to string, but coming an attribute, there is no way to know whether it is a boolean or a number unless a type is also given.
**Note:** If `type` is omitted, it is implied to be `String`

#### Types

|  Type   | Class to Use |                                Description                                 |
| ------- | ------------ | -------------------------------------------------------------------------- |
| string  | `String`     | Implied as default, should be omitted                                      |
| boolean | `Boolean`    | Boolean value, the presence of the attribute will set the property to true |
| number  | `Number`     | Number value, the attribute will be converted using `parseFloat`           |
| object  | `Object`     | JS Object, equivalent to `noAttribute: true`                               |
| []      | `Array`      | JS Array, equivalent to `noAttribute: true`                                |
| Enum    | `String`     | Enums are treated as strings, type does not accept enum types              |

#### Examples

Example of defining properties:

```js
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";

@customElement({
	tag: "my-component",
})
class MyComponent extends UI5Element {

	@proeprty()
	text?: string;

	@proeprty()
	name = "user1"

	@property({ type: Number, noAttribute: true })
	width = 1024

	@property({ type: Number })
	scale = 0.5

	@property({ type: Object })
	data: object = {};

	/**
	 * @private
	 */
	@proeprty({ type: Boolean })
	_isPhone = false;
}
```

Here `text`, `width`, `scale` and `data` are public properties, and `_isPhone` private, but only by convention. If the user (or the component internally) changes any of these properties, the component will be invalidated.

In most cases, `String` properties should be optional, unless an intial value makes more sense like the `input.value` being an empty string or some specific value;

#### Best Practices for Using Properties

The best practice is to **never** change public properties from within the component (they are owned by the application) unless the property changes due to user interaction (for example, the user typed in an input - so you change the `value` property; or the user clicked a checkbox - and you flip the `checked` property). It is also
a best practice to always **fire an event** if you change a public property due to user interaction, to let the application know and synchronize its own state.

As for private properties, the best practice is to **only** change them internally and never let the application know about their existence.

Both public and private properties are great ways to create CSS selectors for your component with the `:host()` selector. The `:host()` selector targets the custom element itself, and can be combined with other selectors:

```css
:host {
	height: 5rem;
	width: 5rem;
}

:host([size="XS"]) {
	height: 2rem;
	width: 2rem;
}
```

```html
<my-comopnent size="XS"></my-comopnent> <!-- :host() targets my-component -->
```

Here for example, if the `size` property (respectively the attribute with the same name) is set to `XS`, the component dimensions will be changed from `5rem` to `2rem`.
Using attribute selectors is the best practice as you don't have to set CSS classes on your component - you can write CSS selectors with `:host()` by attribute.

#### Metadata Properties vs Normal JS Properties

It is important not to confuse metadata-defined properties with regular Javascript properties.
You can create any number of properties on your component's instance, for example

```js
constructor() {
	super();
	this._isMobile = false;
}
```

However, only metadata-defined properties are managed by the framework: cause invalidation and are converted to/from attributes.
Feel free to create as many regular JS properties for the purpose of your component's functionality as you need, but bear in mind
that they will not be managed by the framework.

### Slots <a name="metadata_slots"></a>

While *properties* define the objective characteristics of a component, *slots* define the way a component can nest other HTML elements.
You don't need to define slots for every component - some components are not meant to hold any other HTML elements, and are fully operated by properties and events alone.

You implement slots by configuring them with the `@slot` decorator, and rendering respective `<slot>` elements in your `.hbs` template.

You can read more about the `slot` HTML element [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

#### Named Slots

For *named* slots you set the name you wish to use for the slot as the key in the `@slot` decorator.

Example:

```ts
@customElement({
	tag: "my-component",
})
class MyComponent extends UI5Element {
	@slot()
	items!: HTMLElement;

	@slot()
	footer!: HTMLElement;
}
```


and then in your `.hbs` template you render respectively `<slot name="items"></slot>` and `<slot name="footer"></slot>`.

#### Default Slots with accessor

The `default` slot must be defined with the `"default"` key in the `@slot` decorator (also note the quotes around the `default` key as it is a reserved word):

```ts
@customElement({
	tag: "my-component",
})
class MyComponent extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	items!: Array<Object>
}
```

and then in the `.hbs` template you render `<slot></slot>`.

#### Default slot without accessor

In case you don't need an accessor for the `default` slot, but you still need to appear in the public API reference
```ts
/*
 * @slot {Array<Node>} default - Defines the text of the component.
 */
@customElement({
	tag: "my-component",
})
class MyComponent extends UI5Element {
}
```

and then in the `.hbs` template you render `<slot></slot>`.


#### Slot Types

Unlike properties, slots can be of only two types: `HTMLElement` and `Node`.

`HTMLElement` means the slot accepts only other HTML elements. You can use this type for any slot (default or named).

`Node` means that the slot can accept both HTML elements and text nodes, and is allowed only for the `default` slot.
The reason for this restriction is that text nodes in HTML cannot have attributes, hence they cannot be slotted as HTML elements can.
As a result, text can only go the default slot, hence `Node` is applicable only for default slots.

#### Slots are managed state

As *properties*, *slots* are not managed state and changes to slots trigger invalidation.
If children are added/removed/rearranged in any of the above slots, the component will be invalidated (re-rendered).

#### Slot Accessors

You can use the slot accessors to get the children in that slot.

```ts
@customElement({
	tag: "my-component",
})
class MyComponent extends UI5Element {
	@slot()
	items!: HTMLElement;

	@slot()
	footer!: HTMLElement;
}
```

```js
const childrenInItems = this.items; // array of all children in the items slot
const childrenInFooter = this.footer; // array of all children in the footer slot
```


#### `individualSlots`

All children, assigned to a certain `slot`, are rendered by the browser next to each other in the exact order in which they were passed to the component.
Sometimes, however, each child must be placed separately in the shadow root, potentially wrapped in other HTML elements, to satisfy the UX design of the component.

The `individualSlots` slot metadata configuration setting (see [Understanding UI5 Web Components Metadata](./03-understanding-components-metadata.md)) allows you to have a separate physical slot for each child belonging to a certain slot.

Example:

```js
@customElement({
	tag: "my-component",
})
class MyComponent extends UI5Element {
	@slot({
		type: HTMLElement,
		individualSlots: true,
	})
	items!: Array<HTMLElement>
}
```

The framework will then create an `_individualSlot` property on each child, belonging to the slot. Just render these slots in the `.hbs` template
to have all children belonging to the slot displayed by the browser separately in your HTML markup of choice.

For more information on individual slots and how to render them in the `.hbs` template click [here](./04-understanding-hbs-templates.md#slots_individual).

#### `invalidateOnChildChange`

There is one last configuration setting for slots - `invalidateOnChildChange`. When set to `true`, whenever a child in a certain slot is invalidated,
your component will be invalidated as well.

```js
@slot({
	type: HTMLElement,
	invalidateOnChildChange: true,
})
items!: Array<HTMLElement>;
```

**Note:** Now, the component will be invalidated not only when children are added/removed/rearranged, but also when children themselves change.
This is very handy for components working with abstract items.

Read more about abstract items and `invalidateOnChildChange` in the [Invalidation](#invalidation) section later in this article.

### Events <a name="metadata_events"></a>

Most components fire *events* to notify the application of user interaction.

You can list the events fired by your component in the `events` metadata object, but this is optional and mostly done for documentation purposes.
Any event that you dispatch from your component will reach the application anyway.

Here is an example how to fire an event from your component:

1. Declare the event in your `@event` decorator

```js
@event("toggle")
class MyPanel extends UI5Element {
}
```

2. In the `.hbs` template, bind an event listener to some part of your component's HTML to be able to take action on user interaction:

```handlebars
<div class="my-panel">
	<button class="my-panel-toggle" @click="{{onPanelToggleClick}}">Toggle</button>
	<div class="my-panel-body">
		<slot></slot>
	</div>
</div>
```

In this example we have a simplified "panel" component consisting of a toggle button and a slot for the panel content.
We bind the `click` event of the `<button>` we'll use for toggling our panel to the `onPanelToggleClick` method.

For more on the `.hbs` template syntax and event listeners click [here](./04-understanding-hbs-templates.md#syntax_at).

3. Implement the event handler in your component:

```js
class MyPanel extends UI5Element {
	...

	onPanelToggleClick(event) {
		this.togglePanel(); // do some work when the user clicks the button
		this.fireEvent("toggle"); // fire the event
	}
}
```

The `fireEvent` method is provided by the base `UI5Element.js` class and is therefore available to all components. The best practice is to always use
this method instead of simply calling the standard `dispatchEvent` function as `fireEvent` has framework-related enhanced functionality.

That's all it takes to manage an event lifecycle! Now, your component users may listen for the `toggle` event:

```js
const panel = document.getElementsByTagName("my-panel")[0];
panel.addEventListener("toggle", () => {});
```

#### Working With Event Parameters

The above example demonstrated an event with no parameters. However, you can send arbitrary data to the app when firing an event.

Here's how:

1. Declare the event in your `metadata` and describe its parameters (again, optional, but good for consistency and documentation purposes):

```js
@event("selection-change", {
		detail: {
			item: { type: HTMLElement },
			oldItem: { type: HTMLElement }
		}
	}
}
class MyItemsList extends UI5Element {
}
```

Here we define a `selectionchange` event which gives the app two pieces of information: `item` (the newly selected item) and `oldItem` (the previously selected item).
Respectively, they will be accessible by the app with `event.detail.item` and `event.detail.oldItem` in the event handler, exactly like it works with native browser events.

2. Pass the data when firing the event:

```js
class MyItemsList extends UI5Element {
	...

	onSelectionChange(event) {
		...

		this.fireEvent("selectionChange", {
			item: item,
			oldItem: oldItem,
		});
	}
}
```

To pass parameters, simply provide a second parameter of type `Object` to `fireEvent` with keys for all event parameters.

The usage of the event by the app will be exactly like in the case of a native HTML element:

```js
const list = document.getElementsByTagName("my-items-list")[0];
list.addEventListener("selectionChange", (event) => {
	console.log(event.detail.item);
	console.log(event.detail.oldItem);
});
```

#### Events and noConflict Mode

By default, when using the `fireEvent` method, as demonstrated above, actually not just one, but two custom events are fired: one with the name provided as the first argument to `fireEvent`,
and one more with the same name but prefixed by `ui5-`.

For example, the following code

```js
fireEvent("toggle");
```

will dispatch two [custom events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) by default:
 - `toggle`
 - `ui5-toggle`

However, if you set the [noConflict](../2-advanced/01-configuration.md#no_conflict) configuration setting to `true`, only the **prefixed** event will be dispatched.

So, when `noConflict: true` is configured, the same code

```js
fireEvent("toggle");
```

would result in just
 - `ui5-toggle`

Therefore, the best practice when binding to events **fired by other UI5 Web Components** in your `.hbs` template, is to
always use the prefixed (`ui5-`) event.

Example:

```handlebars
<div class="my-component">
	<button @click="{{onNativeButtonClick}}">Click me</button>
	<ui5-button @ui5-click="{{onUI5ButtonClick}}">Click me</ui5-button>

	<input @change="{{onNativeInputChange}}" />
	<ui5-input @ui5-change="{{onUI5InputChange}}"></ui5-input>

	<ui5-list @ui5-item-click="{{onUI5ListItemClick}}"></ui5-list>
</div>
```

Please note the following:
 - For native HTML elements (`input`, `button`) we bind to their respective events (`change`, `click`) normally.
 - For other UI5 Web Components (`ui5-button`, `ui5-input`, `ui5-list`), rendered by our component, we bind to the `ui5-` events as these are guaranteed to be dispatched even when `noConflict` is configured to `true`.

If we used the non-prefixed versions:

```handlebars
<div class="my-component">
	<button @click="{{onNativeButtonClick}}">Click me</button>
	<ui5-button @click="{{onUI5ButtonClick}}">Click me</ui5-button>

	<input @change="{{onNativeInputChange}}" />
	<ui5-input @change="{{onUI5InputChange}}"></ui5-input>

	<ui5-list @item-click="{{onUI5ListItemClick}}"></ui5-list>
</div>
```

this would work well only with the default configuration (where `noConflict` is `false` and both events are fired), but our code would
"break" the moment an app sets `noConflict: true` since that would suppress UI5 Web Components from firing the non-prefixed versions and
our event handlers (`onUI5ButtonClick`, `onUI5InputChange`, etc.) would never be executed.

### Wrapping up Metadata <a name="metadata_wrapping_up"></a>

Metadata determines most of your component's API - describe its tag name, properties, slots and events there.
For example, consider the following component with  metadata:

```ts

type MyComponentChangeEventDetail = {
	newText: string
}

@customElement({
	tag: "my-component",
})
@event<MyComponentChangeEventDetail>("change", {
	detail: {
		newText: { type: String },
	},
})
class MyComponent extends UI5Element {

	@property()
	text = "Hello"

	@property()
	selected = false

	@slot({ type: HTMLElement, "default": true })
	items!: Array<HTMLElement>;

	@slot()
	icons!: Array<HTMLElement>;
}
```

This metadata conveys the following:

This component will have the following getters/setters, created for it by the framework:
 - `this.text` - getter/setter, due to the `text` property, with default value of "Hello";
 - `this.selected` - getter/setter, due to the `selected` property, with default value of `false` (all Booleans should be optional, but initializing them to `false` gives a type hint to TypeScript and `boolean` does not appear twice in the code);
 - `this.items` - an array of all *Text Nodes and HTML Elements* in the default slot;
 - `this.icon` - an array of all HTML elements in the `icons` slot.

The component will have only 1 attribute:
 - `text` due to the `text` property (the `selected` property has `noAttribute: true` set).

When the `text` property changes, the `text` attribute will also be reflected and vice-versa.

The component fires 1 event:
 - `change` with one string parameter: `newText`.

This component will be invalidated whenever any of its properties changes (`text`, `selected`), any of its slots has new/removed/rearranged children.


Additionally, in the component class you are expected to fire the event, for example:

```js
class MyComponent extends HTMLElement {
	...
	onInputChange(event) {
		this.fireEvent("change", { newText });
	}
}
```

In this component's `.hbs` you are expected to render the two slots and to bind an event listener for the event

```handlebars
<div class="my-demo-component">
	<header>
		<slot name="icon"></slot>
		<input class="demo-input" value="{{text}}" @change="{{onInputChange}}">
	</header>
	<div>
		<slot></slot>
	</div>
</div>
```


Whenever the user stops typing in the `<input>` and its `change` event is fired, our component `onInputChange` event handler will be executed.
There we get the new value of the input, update the `text` metadata property to reflect its new state, stop the input's native `change` event from propagating since we'll be firing our custom event
with the same name (and we don't want the user to get 2 events with the same name), and finally we fire our metadata event (`change`) with the `newText` parameter.

## Understanding Rendering <a name="rendering"></a>

### What is rendering? <a name="rendering_def"></a>

In the context of UI5 Web Components, the notion of **rendering** means **creating the content of a shadow root** (building the shadow DOM).

### Physical and Logical Components <a name="rendering_physical_logical"></a>

Each component that provides a `static get template()` method will be rendered (will have its shadow DOM built) initially and every time it gets invalidated.

Example:

```js
import InputTemplate from "./generated/templates/InputTemplate.lit.js"; // this is the compiled Input.hbs template

// This component will have shadow DOM since it provides a template
static get template() {
	return InputTemplate;
}
```

Components that do not provide a `static get template()` method are considered *logical* or *marker* elements only. These components are never rendered (do not have a shadow root at all)
and their only purpose is to serve as items for higher-order components. The classical example of a logical component is a select option.

Example:

```html
<ui5-select>
	<ui5-option>Cozy</ui5-option>
	<ui5-option selected>Compact</ui5-option>
	<ui5-option >Condensed</ui5-option>
</ui5-select>
```

The `ui5-option` component does not provide a template, and is therefore never rendered. However, the `ui5-select` component, which is a physical component that has a template,
renders HTML corresponding to each of its children (`ui5-option` instances) as part of its own shadow DOM.

### What is invalidation? <a name="invalidation"></a>

Invalidation means scheduling an already rendered component for asynchronous re-rendering (in the next animation frame). If an already invalidated component gets changed
again, before having been re-rendered, this will have no downside - it's in the queue of components to be re-rendered anyway.

Important: when a component is re-rendered, only the parts of its shadow DOM, dependent on the changed properties/slots are changed, which makes most updates very fast.

A component becomes *invalidated* whenever:
 - a **property** defined with `@property` decorator changes (not regular properties that, for example, you define in the constructor);
 - children defined with `@slot` decorator are added/removed/rearranged;
 - a slotted child is invalidated and `@slot#invalidateOnChildChange: true` is configured.

Changes to properties always cause an invalidation. No specific metadata configuration is needed.

```js
class MyComponent extends UI5Element {

	@property()
	text?: string;
}
```

Whenever `text` changes, the component will be invalidated.

Changes to slots (children are added/removed/rearranged) also cause an invalidation by default.

```js
class MyComponent extends UI5Element {

	@slot({ type: HTMLElement, "default": true })
	items!: Array<HTMLElement>;
}
```



There are components that not only need to render differently based on the number/type of children they have, but they must also get invalidated
whenever their children change.

```js
class MyComponent extends UI5Element {

	@slot({
		"default": true
		type: HTMLElement,
		invalidateOnChildChange: true
	 })
	items!: Array<HTMLElement>;
}
```


**Note:** Only changes to children in the "default" slot will trigger invalidation for this component. Note that `invalidateOnChildChange` is defined per slot.
Finally, `invalidateOnChildChange` allows for more fine-granular rules when exactly children can invalidate their parents - see [Understanding UI5 Web Components Metadata](./03-understanding-components-metadata.md).

## Lifecycle Hooks <a name="lifecycle"></a>

Using the right lifecycle hook for the task is crucial to a well-designed and performant component.

### `constructor` <a name="lifecycle_constructor"></a>

Use the constructor for one-time initialization tasks.

What to do:
 - initialize private variables;
 - bind functions to `this` (very common when using the `ResizeHandler` helper class);
 - do one-time work when the first instance of a given component is created (for example, instantiate a helper class or attach a special event listener to the `window` object).

What not to do:
 - anything rendering-related (use `onBeforeRendering`/`onAfterRendering`);
 - anything related to the state (use `onBeforeRendering`);
 - anything requiring DOM manipulation (the component isn't attached to the DOM yet - use `onAfterRendering` or `onEnterDOM`/`onExitDOM`).

Example:

```js
constructor() {
	super();

	// initialize a variable for later use
	this._filteredItems = [];

	// bind a method once so that you can pass the same function to register/deregister-based helpers
	this._handleResizeBound = this._handleResize.bind(this);

	// do one-time work when the first instance of a component is created
	if (!isGlobalHandlerAttached) {
		document.addEventListener("mouseup", this._deactivate);
		isGlobalHandlerAttached = true;
	}

	// initialize a helper class for the instance
	this._itemNavigation = new ItemNavigation(this, {
		navigationMode: NavigationMode.Horizontal,
		getItemsCallback: () => this._getFocusableItems(),
	});
}
```

### `onBeforeRendering` <a name="lifecycle_before"></a>

Use `onBeforeRendering` to prepare variables to be used in the `.hbs` template.

What to do:
 - prepare calculated (derived) state for use in the renderer.

What not to do:
 - do not try to access the DOM (use `onAfterRendering` instead).

Let's take for example a component with the following metadata:

```js
class MyComponent extends UI5Element {

	@property()
	filter!: string;

	@slot({
		"default": true
		type: HTMLElement,
		invalidateOnChildChange: true
	 })
	items!: Array<HTMLElement>;
}
```

This component has a `filter` property and a `default` slot that we want to call `items` (thus accessible with `this.items`).
Let's imagine we want to show only the items whose `name` property matches the value of our `filter` property - so we filter the items by name.

```js
constructor() {
	super();
	this._filteredItems = [];
}
onBeforeRendering() {
	this._filteredItems = this.items.filter(item => item.name.includes(this.filter));
}
```

In `onBeforeRendering` we prepare a `_filteredItems` array with some of the component's children (only the ones that have the `this.filter` text as part of their `name` property).

And finally, in the `.hbs` template we have for example:

```handlebars
<div class="my-filter-component">
	{{#each _filteredItems}}
		<div class="my-filtered-item">
			<slot name="{{_individualSlot}}"></slot>
		</div>
	{{/each}}
</div>
```

We loop over the `_fiteredItems` array that we prepared in `onBeforeRendering` and for each child we render a `slot` based on the child's `_individualSlot` property, created automatically by the framework due to the default slot's configuration (`individualSlots: true`).

The usage of this component would be, for example:

```html
<my-filter-component filter="John">
	<my-filter-item name="John Smith"></my-filter-item>
	<my-filter-item name="Jane Doe"></my-filter-item>
	<my-filter-item name="Jack Johnson"></my-filter-item>
</my-filter-component>
```

The user would only see the first and third items as these are the only ones we rendered an individual slot for (the ones matching the `filter` value of "John").

In summary: `onBeforeRendering` is the best place to prepare all the variables you are going to need in the `.hbs` template.

### `onAfterRendering` <a name="lifecycle_after"></a>

The `onAfterRendering` lifecycle hook allows you to access the DOM every time the component is rendered.

You should avoid using this method whenever possible. It's best to delegate all HTML manipulation to the framework: change the state of the component,
the component will be invalidated, the template will be executed with the latest state, and the DOM will be updated accordingly.
It is an anti-pattern to manually change the DOM.

In some cases, however, you must directly access the DOM since certain operations can only be performed imperatively (and not via the template):
 - setting the focus;
 - manually scrolling an element to a certain position;
 - calling a public method on a DOM element (for example, to close a popup);
 - reading the sizes of DOM elements.

Example:

```html
<div class="my-demo-component">
	<input id="first">
	<input id="second">
</div>
```

```js
onAfterRendering() {
	this.shadowRoot.querySelector("#second").focus();
	this._totalWidth = this.shadowRoot.querySelector("div.my-demo-component").offsetWidth;
}
```

### 4. `onEnterDOM` and `onExitDOM` <a name="lifecycle_dom"></a>

Unlike `onBeforeRendering` and `onAfterRendering`, which might sound like parts of the same flow but are used for completely separate tasks,
`onEnterDOM` and `onExitDOM` should almost always be used together. Hence, they are presented collectively in this article.

 - `onEnterDOM` is executed during the web component standard `connectedCallback` method execution;
 - `onExitDOM` is executed during the web component standard `disconnectedCallback` method execution.

If you have prior experience with web component development, you could think of `onEnterDOM` as `connectedCallback` and of `onExitDOM` as `disconnectedCallback`.

Note that these hooks are completely independent of the component's rendering lifecycle, and are solely related to its insertion and removal from the DOM.

Normally, when a web component is created, for example

```js
const b = document.createElement("ui5-button");
```

it is already fully operational, although it isn't in the DOM yet. Therefore, you should use `onEnterDOM` and `onExitDOM` only for functionality, related to
the component being in the DOM tree at all (and not to rendering, stying or anything related to the shadow root).

Common use cases are:
 - registering/de-registering a ResizeHandler;
 - working with Intersection observer;
 - any work you want to carry out only if the component is in the DOM;

Probably the best example of these hooks is the usage of the `ResizeHandler` helper class.

The component has a private `_width` property, defined as follows:

```js
class MyComponent extends UI5Element {

	@property({ type: Number })
	_width = 0;
}
```

and the following code in its class:

```js
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

class MyComponent extends UI5Element {
	constructor() {
		super();
		this._fnOnResize = this._onResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._fnOnResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._fnOnResize);
	}

	_onResize() {
		this._width = this.offsetWidth;
	}

	get styles() {
		return {
			valueStateMsgPopover: {
				"max-width": `${this._width}px`,
			},
		};
	}
}
```

In the `constructor` we bind the `_onResize` method to the component's instance to get a function with the correct context,
and then in `onEnterDOM` and `onExitDOM` we register/deregister this function with the `ResizeHandler` helper class.

Then, whenever the component resizes, the `ResizeHandler` will trigger the callback, the metadata `_width` property will be updated to a new value in `_onResize`, the component will be invalidated, and the template will be executed with the new value of `_width`, respectively `styles`.
