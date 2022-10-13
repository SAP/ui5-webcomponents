# Deep dive and best practices

This tutorial will cover some finer details and best practices when designing and developing UI5 Web Components.

Before proceeding, please make sure you've read the other articles from this section, especially:
 - [Developing Custom UI5 Web Components](./02-custom-UI5-Web-Components.md)
 - [Understanding UI5 Web Components Metadata](./03-understanding-components-metadata.md)
 - [Understanding the Handlebars (`.hbs`) templates](./04-understanding-hbs-templates.md)

as this article will expand on many of the notions, introduced there.

## Understanding metadata

The `static get metadata()` method defines the public API of your component. Among other things, here you define:
 - the tag name
 - what properties/attributes (and of what type) your component supports
 - what slots your component supports

### Tag

The tag name must include a `-` as required for any custom element:

```js
metadata: {
	tag: "my-component"
}
```
and then the usage is:

```html
<my-component></my-component>
```

The `tag`, as defined in `metadata`, is sometimes also referred to as the "pure tag", meaning it is not suffixed.
See [Scoping](../2-advanced/03-scoping.md) for more on using a suffix with tag names.

### Properties

#### Properties are managed state

The framework will create a getter/setter pair on your component's prototype for each property, defined in metadata.

For example, after setting this metadata configuration:

```js
metadata: {
	properties: {
		text: {
			type: String
		}
	}
}
```

you can use the `text` getter/setter on this component's instances:

```js
let t = myComponent.text;
myComponent.text = "New text";
```

Whenever `text` is read or set, the framework-defined getter/setter will be called and thus the framework will be in control of the property.

#### Properties vs attributes

The `properties` section defines both properties and attributes for your component. By default, for each property (`camelCase` name) an attribute with the
same name but in `kebab-case` is supported. Properties of type `Object` have no attribute counterparts. If you wish to not have an attribute for a given property regardless of type, you can configure it with `noAttribute: true`.

#### Public vs private properties

The framework does not distinguish between *public* and *private* properties. You can treat some properties as private in a sense that you can document them as such and not advertise them to users.
The usual convention is that private properties start with an `_`, but this is not mandatory. In the end, all properties defined in the metadata, public or private,
are *component state*, therefore cause the component to be invalidated and subsequently re-rendered, when changed.

#### Property types and default values

The most common types of properties are `String`, `Boolean`, `Object`, `Integer` and `Float`. The last two are custom types, provided by the framework, that you must import (do not exist in the browser).

Most property types can have a `defaultValue` set. `Boolean` is always `false` by default and `Object` is always `{}` by default, so `defaultValue` is not allowed for these types.

You can also create custom property types by extending `@ui5/webcomponents-base/dist/DataType.js` and implementing its methods for your type.

#### Example

Example of defining properties:

```js
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
...

metadata: {
	tag: "my-component",
	properties: {
		text: {
			type: String,
			defaultValue: "Hello"
		},
		width: {
			type: Integer,
			defaultValue: 1024,
			noAttribute: true
		},
		scale: {
			type: Float,
			defaultValue: 0.5
		}
		data: {
			type: Object
		},
		/**
		 * @private
		 */
		_isPhone: {
			type: Boolean
		}
	}
}
```

Here `text`, `width`, `scale` and `data` are public properties, and `_isPhone` private, but only by convention. If the user (or the component internally) changes any of these properties, the component will be invalidated.

#### Best practices for using properties

The best practice is to **never** change public properties from within the component (they are owned by the application) unless the property changes due to user interaction (f.e. the user typed in an input - so you change the `value` property; or the user clicked a checkbox - and you flip the `checked` property). It is also
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

Here for example, if the `size` property (respectively the attribute with the same name) is set to `XS`, the component's dimensions will be changed from `5rem` to `2rem`. 
Using attribute selectors is the best practice as you don't have to set CSS classes on your component - you can write CSS selectors with `:host()` by attribute. 

#### Metadata properties vs normal JS properties

It is important not to confuse metadata-defined properties with regular Javascript properties.
You can create any number of properties on your component's instance, f.e.:

```js
constructor() {
	super();
	this._isMobile = false;
}
```

However, only metadata-defined properties are managed by the framework: cause invalidation and are converted to/from attributes.
Feel free to create as many regular JS properties for the purpose of your component's functionality as you need, but bear in mind
that they will not be managed by the framework.

### Slots

While *properties* define the objective characteristics of a component, *slots* define the way a component can nest other HTML elements.
You don't need to define slots for every component - some components are not meant to hold any other HTML elements, and are fully operated by properties and events alone.

You implement slots by configuring them with the `slots` metadata object, and rendering respective `<slot>` elements in your `.hbs` template.

You can read more about the `slot` HTML Element [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).

#### Default slot and named slots

For *named* slots you set the name you wish to use for the slot as the key in the `slots` metadata object.

Example:

```js
slots: {
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
```

and then in your `.hbs` template you render respectively `<slot name="items"></slot>` and `<slot name="footer"></slot>`.


The *default* slot on the other hand must be defined with the `default` key in the `slots` metadata object (also note the quotes around the `default` key as it is a reserved word):

```js
slots: {
	"default": {
		type: Node,
	}
}
```

and then in the `.hbs` template you render `<slot></slot>`.


#### Slot types

Unlike properties, slots can be of only two types: `HTMLElement` and `Node`.

`HTMLElement` means the slot accepts only other HTML Elements. You can use this type for any slot (default or named).

`Node` means that the slot can accept both HTML Elements and Text nodes, and is allowed only for the `default` slot. 
The reason for this restriction is that text nodes in HTML cannot have attributes, hence they cannot be slotted as HTML Elements can.
As a result, text can only go the default slot, hence `Node` is applicable only for default slots.

#### Are slots managed state?

Unlike metadata *properties*, which are always managed state (see the previous section), *slots* are not managed by the framework by default. 
Changes to slots do not trigger lifecycle events such as invalidation.

However, you can change this by setting `managedSlots: true` in the `metadata` object. This setting is global and affects all slots for your component.

```js
managedSlots: true,
slots:	{
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
```

Now, if children are added/removed/rearranged in any of the above slots, the component will be invalidated.

#### Slot accessors

Additionally, when you set `managedSlots: true`, you get a **read-only** accessor for the children in that slot.

Taking the example from above:
```js
managedSlots: true,
slots:	{
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
```

you will get the following accessors on your component's instances:

```js
const childrenInItems = this.items; // array of all children in the items slot
const childrenInFooter = this.footer; // array of all children in the footer slot
```

Finally, it's possible to define the property name for the accessor of the *default* slot (as using the `default` key is not convenient in Javascript).
You can do this with the `propertyName` setting:

```js
managedSlots: true,
slots: {
	"default": {
		type: Node,
		propertyName: "content"
	},
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}

```

```js
const childrenInDefaultSlot = this.content; // array of all children in the default slot
const childrenInItems = this.items; // array of all children in the items slot
const childrenInFooter = this.footer; // array of all children in the footer slot
```

These getters are helpful if your code needs to analyze/communicate with the children in a certain slot. They are also often used in the `.hbs`
template where you need for example to loop over the items of a component.

#### Individual slots

All children, assigned to a certain `slot`, are rendered by the browser next to each other in the exact order in which they were passed to the component.
Sometimes, however, each child must be placed separately in the shadow root, potentially wrapped in other HTML elements, to satisfy the UX design of the component.

The `individualSlots` slot metadata configuration setting (see [Understanding UI5 Web Components Metadata](./03-understanding-components-metadata.md)) allows you to have a separate physical slot for each child belonging to a certain slot.

Example:

```js
{
	managedSlots: true,
	slots: {
		"default": {
			type: HTMLElement,
			propertyName: "items",
			individualSlots: true
		}
	}
}
```

The framework will then create an `_individualSlot` property on each child, belonging to the slot. Just render these slots in the `.hbs` template
to have all children belonging to the slot displayed by the browser separately in your HTML markup of choice. 

For more information on individual slots and how to render them in the `.hbs` template click [here](./04-understanding-hbs-templates.md#slots_individual).

#### The invalidateOnChildChange setting

There is one last configuration setting for slots - `invalidateOnChildChange`. When set to `true`, whenever a child in a certain slot is invalidated,
your component will be invalidated as well.

```js
managedSlots: true,
slots: {
	"default": {
		type: HTMLElement,
		propertyName: "items",
		invalidateOnChildChange: true
	},
}
```

Now, the component will be invalidated not only when children are added/removed/rearranged, but also when children themselves change. This is very handy
for components working with abstract items.

Read more about abstract items and `invalidateOnChildChange` in the [Invalidation](#invalidation) section later in this article.

### Events

Most components fire *events* to notify the application of user interaction.

You can list the events fired by your component in the `events` metadata object, but this is optional and mostly done for documentation purposes.
Any event that you dispatch from your component will reach the application anyway.

Here is an example how to fire an event from your component:

1. Declare the event in your `metadata` (optional, but highly recommended for documentation purposes and clarity):

```js
events: {
	toggle: {}
}
```

2. In the `.hbs` template bind an event listener to some part of your component's HTML to be able to take action on user interaction:

```html
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

That's all it takes to manage an event's lifecycle! Now your component's users may listen for the `toggle` event:

```js
const panel = document.getElementsByTagName("my-panel")[0];
panel.addEventListener("toggle", () => {});
```

#### Working with event parameters

The above example demonstrated an event with no parameters. However, you can send arbitrary data to the app when firing an event.

Here's how:

1. Declare the event in your `metadata` and describe its parameters (again, optional, but good for consistency and documentation purposes):

```js
events: {
	selectionChange: {
		detail: {
			item: { type: HTMLElement },
			oldItem: { type: HTMLElement }
		}
	}
}
```

Here we define a `selectionChange` event which gives the app two pieces of information: `item` (the newly selected item) and `oldItem` (the previously selected item).
Respectively they will be accessible by the app with `event.detail.item` and `event.detail.oldItem` in the event handler, exactly like it works with native browser events.

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
	console.log(event.details.item);
	console.log(event.details.oldItem);
});
```

### Wrapping up metadata

Metadata determines most of your component's API. Describe its tag properties, slots and events there.

For example, consider a component with the following metadata:

```js
{
	tag: "my-demo-component",
	properties: {
		text: {
			type: String,
			defaultValue: "Hello"
		},
		selected: {
			type: Boolean,
			noAttribute: true	
		}
	},
	managedSlots: true,
	slots: {
		"default": {
			type: Node,
			propertyName: "items",
			invalidateOnChildChange: true
		},
		"icon": {
			type: HTMLElement
		}
	},
	events: {
		change: {
			detail: {
				newText: {type: String}
			}
		}
	}
}
```

This metadata conveys the following:

This component will have the following properties, created for it by the framework:
 - `this.text` (getter/setter, due to the `text` property) with default value of "Hello"
 - `this.selected` (getter/setter, due to the `selected` property) with default value of `false` (all Booleans are `false` by default in HTML and `defaultValue` cannot be configured for them)
 - `this.items` (getter only, due to having `managedSlots: true` and the `propertyName` of the default slot being `items`) - an array of all *Text Nodes and HTML Elements* in the default slot
 - `this.icon` (getter only, due to having `managedSlots: true` and the `icon` slot) - an array of all HTML Elements in the `icon` slot 

The component will have only 1 attribute:
 - `text` due to the `text` property (the other property has `noAttribute: true` set)

The component fires 1 event:
 - `change` with one string parameter: `newText`

This component will be invalidated whenever any of its properties changes, any of its slots has new/removed/rearranged children, and additionally when any UI5 Web Component in the `default` slot is invalidated. 

In this component's `.hbs` you are expected to render the two slots and to bind an event listener for the event:

```html
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

and in the component's class you are expected to fire the event, for example:

```js
class MyDemoComponent extends HTMLElement {
	...
	onInputChange(event) {
		const newText = this.shadowRoot.querySelector(".demo-input").value;
		this.text = newText;
		event.stopPropagation();
		this.fireEvent("change", { newText });
	}
}
```

Whenever the user stops typing in the `<input>` and its `change` event is fired, our component's `onInputChange` event handler will be executed.
There we get the new value of the input, update the `text` metadata property to reflect its new state, stop the input's native `change` event from propagating since we'll be firing our custom event
with the same name (and we don't want the user to get 2 events with the same name), and finally we fire our metadata event (`change`) with the `newText` parameter.

## Understanding rendering

### What is rendering?

In the context of UI5 Web Components the notion of **rendering** means **creating the content of a shadow root** (building the shadow DOM).

### Physical and logical components

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
 - a *metadata-defined* **property** changes (not regular properties that f.e. you define in the constructor)
 - children are added/removed/rearranged in any **slot** and the component has `managedSlots: true` set in the metadata object
 - a slotted child in a **slot** configured with `invalidateOnChildChange: true` is invalidated.

Changes to properties always cause an invalidation. No specific metadata configuration is needed.

```js
properties: {
	text: {
		type: String
	}
}
```

Whenever `text` changes, the component will be invalidated.

Changes to slots do not cause an invalidation by default. Most components do not need to render differently based on whether they have any slotted children or not.
The most common example for this are simple general-purpose containers (completely agnostic of their content).

```js
metadata: {
	slots: {
		"default": {
			type: HTMLElement
		},
		header: {
			type: HTMLElement
		},
		footer: {
			type: HTMLElement
		}
	}
}
```

This component will not invalidate when children are added/removed from any of its slots.

However, some components render differently based on whether they have children or not (e.g. show counters/other UX elements for the number of children, f.e. carousel; or have special styles when empty or have a child in a specific slot, f.e. button with an icon).
If that is the case for the component you're building, set `managedSlots: true` in your component's metadata. Thus, your component will become invalidated whenever children are added, removed or swap places in any of its slots.

```js
managedSlots: true,
slots: {
	"default": {
		type: HTMLElement
	},
	header: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
```

Now that this component has `managedSlots: true`, changes to each slot will trigger an invalidation. Note that the `managedSlots` configuration is global (and not per slot).

And finally, there are components that not only need to render differently based on the number/type of children they have, but they must also get invalidated
whenever their children change. This holds true for all components that work with abstract items (such as select with options, combo box with combo box items)
because these abstract items do not have a template (do not render themselves) and therefore rely on their parent to render some DOM for them in its own shadow root. So, when they get invalidated, they must also invalidate their parent.

```js
managedSlots: true,
slots: {
	"default": {
		type: HTMLElement,
		invalidateOnChildChange: true
	},
	header: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
```

Only changes to children in the "default" slot will trigger invalidation for this component. Note that `invalidateOnChildChange` is defined per slot (and not globally like `managedSlots`).
Finally, `invalidateOnChildChange` allows for more fine-granular rules when exactly children can invalidate their parents - see [Understanding UI5 Web Components Metadata](./03-understanding-components-metadata.md).

## Lifecycle hooks

Using the right lifecycle hook for the task is crucial to a well-designed and performant component.

### 1. `constructor`

Use the constructor for one-time initialization tasks.

What to do:
 - initialize private variables
 - bind functions to `this` (very common when using the `ResizeHandler` helper class)
 - do one-time work when the first instance of a given component is created (f.e. instantiate a helper class or attach a special event listener to the `window` object)

What not to do:
 - anything rendering-related (use `onBeforeRendering`/`onAfterRendering`)
 - anything related to the state (use `onBeforeRendering`)
 - anything requiring DOM manipulation (the component isn't attached to the DOM yet - use `onAfterRendering` or `onEnterDOM`/`onExitDOM`)

Example:

```js
constructor() {
	super();

	this._filteredItems = []; // initialize a variable for later use
	
	this._handleResizeBound = this._handleResize.bind(this); // bind a method once so that you can pass the same function to register/deregister-based helpers

	// do one-time work when the first instance of a component is created
	if (!isGlobalHandlerAttached) {
		document.addEventListener("mouseup", this._deactivate);
		isGlobalHandlerAttached = true;
	}

	// initialize the item navigation
	this._itemNavigation = new ItemNavigation(this, {
		navigationMode: NavigationMode.Horizontal,
		getItemsCallback: () => this._getFocusableItems(),
	});
}
```

### 2. `onBeforeRendering`

Use `onBeforeRendering` to prepare variables to be used in the `.hbs` template.

What to do:
 - prepare calculated (derived) state for use in the renderer
 - 

What not to do:
 - do not try to access the DOM (use `onAfterRendering` instead)
 - 

### 3. `onAfterRendering`

### 4. `onEnterDOM`

### 5. `onExitDOM`
