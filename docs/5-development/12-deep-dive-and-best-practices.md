# Deep dive and best practices

## Understanding rendering

### What is rendering? <a name="rendering_def"></a>

In the context of UI5 Web Components the notion of **rendering** means **creating the content of a shadow root** (building the shadow DOM).

### Physical and logical components <a name="rendering_physical_logical"></a>

Each component that has a `template` described in `@customElement` decorator will be rendered (will have its shadow DOM built) initially and every time it gets invalidated.

Example:

```js
import MyDemoComponentTemplate from "./generated/templates/MyDemoComponentTemplate.lit.js";

@customElement({
    template: MyDemoComponentTemplate
})
```

Components that do not have `template` defined in `@customElement` decorator are considered *logical* or *marker* elements only. These components are never rendered (do not have a shadow root at all)
and their only purpose is to serve as items for higher-order components. The classical example of a logical component is a select option.

Example:

```html
<ui5-calendar>
	<ui5-date></ui5-date>
</ui5-calendar>
```

The `ui5-date` component does not have template, and is therefore never rendered. However, the `ui5-calendar` component, which is a physical component that has a template, 
renders HTML corresponding to each of its children (`ui5-date` instances) as part of its own shadow DOM.

### What is invalidation? <a name="invalidation"></a>

Invalidation means scheduling an already rendered component for asynchronous re-rendering (in the next animation frame). If an already invalidated component gets changed
again, before having been re-rendered, this will have no downside - it's in the queue of components to be re-rendered anyway.

Important: when a component is re-rendered, only the parts of its shadow DOM, dependent on the changed properties/slots are changed, which makes most updates very fast.

A component becomes *invalidated* whenever:
 - a *metadata-defined* **property** changes (not regular properties that f.e. you define in the constructor)
 - children are added/removed/rearranged in any **slot** declared with `@slot` decorator.
 - a slotted child in a **slot** configured with `invalidateOnChildChange: true` is invalidated.

Changes to properties always cause an invalidation. No specific metadata configuration is needed.

```js
@property()
text?: string;
```

Whenever `text` changes, the component will be invalidated.

As we defined earlier there two kind of slots - unnamed and named. Unnamed slots do not cause an invalidation. Most components do not need to render differently based on whether they have any slotted children or not. This component will not invalidate when children are added/removed from any of its unnamed slots.

However, some components render differently based on whether they have children or not (e.g. show counters/other UX elements for the number of children, f.e. carousel; or have special styles when empty or have a child in a specific slot, f.e. button with an icon).
If that is the case for the component you're building, you need to define slot using `slot` decorator. Thus, your component will become invalidated whenever children are added, removed or swap places in any of its slots.

```ts
@slot({ type: HTMLElement, "default": true })
content!: Array<HTMLElement>;
@slot()
header!: Array<HTMLElement>;
@slot()
footer!: Array<HTMLElement>;
```

Now that this component has slots defined with `@slot` decorator, changes to each of these slots will trigger an invalidation.

And finally, there are components that not only need to render differently based on the number/type of children they have, but they must also get invalidated
whenever their children change. This holds true for all components that work with abstract items (such as select with options, combo box with combo box items)
because these abstract items do not have a template (do not render themselves) and therefore rely on their parent to render some DOM for them in its own shadow root. So, when they get invalidated, they must also invalidate their parent.

```ts
@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
content!: Array<HTMLElement>;
@slot()
header!: Array<HTMLElement>;
@slot()
footer!: Array<HTMLElement>;
```

Only changes to children in the "content" slot will trigger invalidation for this component. Note that `invalidateOnChildChange` is defined per slot.
Finally, `invalidateOnChildChange` allows for more fine-granular rules when exactly children can invalidate their parents.

## Lifecycle hooks

Using the right lifecycle hook for the task is crucial to a well-designed and performant component.

### 1. `constructor`

Use the constructor for one-time initialization tasks.

What to do:
 - bind functions to `this` (very common when using the `ResizeHandler` helper class)
 - do one-time work when the first instance of a given component is created (f.e. instantiate a helper class or attach a special event listener to the `window` object)

What not to do:
 - anything rendering-related (use `onBeforeRendering`/`onAfterRendering`)
 - anything related to the state (use `onBeforeRendering`)
 - anything requiring DOM manipulation (the component isn't attached to the DOM yet - use `onAfterRendering` or `onEnterDOM`/`onExitDOM`)

Example:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";


@customElement({
    tag: "my-demo-component",
})
class MyDemoComponent extends UI5Element {
	_itemNavigation: ItemNavigation;
	_handleResizeBound: ResizeObserverCallback;

	constructor() {
		super();
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
}
```

### 2. `onBeforeRendering`

Use `onBeforeRendering` to prepare variables to be used in the `.hbs` template.

What to do:
 - prepare calculated (derived) state for use in the renderer

What not to do:
 - do not try to access the DOM (use `onAfterRendering` instead)

Let's take for example a component with the following metadata:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

@customElement({
    tag: "my-demo-component",
})
class MyDemoComponent extends UI5Element {
	@property()
	filter = "";

	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<HTMLElement>
}
```

This component has a `filter` property and a `default` slot that we want to call `items` (thus accessible with `this.items`).

Let's imagine we want to only show the items whose `name` property matches the value of our `filter` property - so we filter the items by name.

```ts

class MyDemoComponent extends UI5Element {
	@property()
	filter = "";

	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<HTMLElement>

	this._filteredItems = [];

	onBeforeRendering() {
		this._filteredItems = this.items.filter(item => item.name.includes(this.filter));
	}
}
```

In `onBeforeRendering` we prepare a `_filteredItems` array with some of the component's children (only the ones that have the `this.filter` text as part of their `name` property)

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

We loop over the `_fiteredItems` array that we prepared in `onBeforeRendering` and for each child we render a `slot` based on the child's `_individualSlot` property,
created automatically by the framework due to the default slot's metadata configuration (`individualSlots: true`).

The usage of this component would be for example:

```html
<my-filter-component filter="John">
	<my-filter-item name="John Smith"></my-filter-item>
	<my-filter-item name="Jane Doe"></my-filter-item>
	<my-filter-item name="Jack Johnson"></my-filter-item>
</my-filter-component>
```

The user would only see the first and third items as these are the only ones we rendered an individual slot for (the ones matching the `filter` value of "John").

In summary: `onBeforeRendering` is the best place to prepare all the variables you are going to need in the `.hbs` template.

### 3. `onAfterRendering`

The `onAfterRendering` lifecycle hook allows you to access the DOM every time the component is rendered.

You should avoid using this method whenever possible. It's best to delegate all HTML manipulation to the framework: change the state of the component,
the component will be invalidated, the template will be executed with the latest state, and DOM will be updated accordingly.
It is an anti-pattern to manually change the DOM.

In some cases, however, you must directly access the DOM since certain operations can only be performed imperatively (and not via the template):
 - setting the focus;
 - manually scrolling an element to a certain position;
 - calling a public method on a DOM Element (for example, to close a popup);
 - reading the sizes of DOM Elements;

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

### 4. `onEnterDOM` and `onExitDOM`

Unlike `onBeforeRendering` and `onAfterRendering`, which sound like parts of the same flow (but are not, and are actually used for completely independent tasks),
`onEnterDOM` and `onExitDOM` should almost always be used together, therefore they are presented as a whole in this article.

 - `onEnterDOM` is executed during the web component's standard `connectedCallback` method's execution
 - `onExitDOM` is executed during the web component's standard `disconnectedCallback` method's execution

If you have prior experience with web component development, you could think of `onEnterDOM` as `connectedCallback` and of `onExitDOM` as `disconnectedCallback`.

Note that these hooks are completely independent of the component's rendering lifecycle, and are solely related to its insertion and removal from DOM.

Normally, when a web component is created, for example:

```js
const b = document.createElement("my-demo-component");
```

it is already fully operational, although it isn't in DOM yet. Therefore, you should use `onEnterDOM` and `onExitDOM` only for functionality, related to
the component being in the DOM tree at all (and not to rendering, stying or anything related to the shadow root).

Common use cases are:
 - registering/de-registering a ResizeHandler
 - working with Intersection observer
 - any work you want to carry out only if the component is in the DOM;

Probably the best example of these hooks is the usage of the `ResizeHandler` helper class.

The component has a private `_width` property, defined and the following code in its class:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement({
    tag: "my-demo-component",
})
class MyDemoComponent extends UI5Element {
	@property({ type: Number })
	_width = 0;

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

Then, whenever the component resizes, the `ResizeHandler` will trigger the callback, the metadata `_width` property will be updated to a new value in `_onResize`,
the component will be invalidated, and the template will be executed with the new value of `_width`, respectively `styles`. 
