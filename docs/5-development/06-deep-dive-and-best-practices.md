# Deep dive and best practices

This tutorial will cover some of the finer details and best practices when designing and developing UI5 Web Components.

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

### Properties

#### Properties are managed state

For each property, defined in metadata, a getter/setter pair will be automatically created on your component's prototype for that property.

Example:

```js
metadata: {
	properties: {
		text: {
			type: String
		}
	}
}
```

For example, a getter and setter pair with the name `text` will be created for this component's prototype.
You can then use `text` on your component's instance as you would use any other property:

```js
let t = myComponent.text;
myComponent.text = "New text";
```

The important part is that whenever `text` is accessed or changed, the framework-defined getter/setter will be called and thus the framework will be notified and in control.

#### Properties vs attributes

The `properties` section defines both properties and attributes for your component. By default, for each property (`camelCase` name) an attribute with the
same name but in `kebab-case` is supported. Properties of type `Object` have no attribute counterparts. If you wish for a property not to have an attribute regardless of type, you can configure it with `noAttribute: true`.

#### Public and private properties

You can define both *public* and *private* properties. The usual convention is that private properties start with an `_`, but this is not required. It's also important
to know that the framework does not distinguish between public and private properties - the important thing is that all properties, defined in the metadata,
are considered *component state*, therefore cause the component to be invalidated and subsequently re-rendered when changed. So, public properties are simply the ones
you decide to document for your users, but technically all properties are equal.

#### Property types and default value

The most common types of properties are `String`, `Boolean`, `Object`, `Integer` and `Float`. The last two are custom types that you must import (do not exist in the browser).

Most property types can have a `defaultValue` set. `Boolean` is always `false` by default and `Object` is always `{}` by default.

You can create custom property types by extending `@ui5/webcomponents-base/dist/DataType.js` and implementing its methods for your type.

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
:host([size="XS"]) {
	height: 2rem;
	width: 2rem;
}
```

```html
<my-comopnent size="XS"></my-comopnent> <!-- :host() targets my-component -->
```

Here for example, if the `size` property is set to `XS` (respectively the attribute with the same name), the component's dimensions change. 
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

However, only metadata-defined properties are managed by the framework: cause invalidation, are converted to attributes and vice-versa, etc.

### Slots



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

### What is invalidation?

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

This component will not invalidate when children are added/removed from any of its slots.

However, some components render differently based on whether they have children or not (e.g. show counters/other UX elements for the number of children, f.e. carousel; or have special styles when empty or have a child in a specific slot, f.e. button with an icon).
If that is the case for the component you're building, set `managedSlots: true` in your component's metadata. Thus, your component will become invalidated whenever children are added, removed or swap places in any of its slots.

```.js
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

```.js
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

Only changes to children in the "default" slot will trigger invalidation for this comopnent. Note that `invalidateOnChildChange` is defined per slot (and not globally like `managedSlots`).
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
