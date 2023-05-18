# TypeScript Development

Since 1.11.0 we migrated the framework and all components to TypeScript.
In addition to the pure code migration, we introduced a new format of component metadata definition leveraging TypeScript decorators.

## Component Metadata

### Decorators

We use decorators to describe the components' metadata. Here is the list of all available decorators:

```ts
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
```

### Class decorators
The class decorators are used just before the component's class declaration and applied to the constructor of the class to describe the component:

- `@customElement` - to define class-related metadata entities: `tag`, `renderer`, `template`, `styles`, `dependencies` and more.

```ts
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
```

- `@event` - to define the events, fired by the component

```ts
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
```

**Example:**

```ts
@customElement("ui5-menu")
@event("item-click", {
	detail: {
		item: {
			type: Object,
		},
		text: {
			type: String,
		},
	},
})
class MyClass extends UI5Element {

}
```

**Example:** `@customElement` can be used to define all class-related metadata entities:

```ts
@customElement({
	tag: "my-element-name",
	languageAware: true,
	themeAware: true,
	fastNavigation: true,
	renderer: Renderer,
	styles: MyElementStyles,
	template: MyElementTemplate,
	staticAreaStyles: MyStaticAreaStyles,
 	staticAreaTemplate: MyStaticAreaTemplate,
	dependencies: [ComponentA, ComponentB],
})
class MyElement extends UI5Element {

}
```

**Note**: the `static get render()` that we use when developing in JavaScript (still supported for backward compatibility) is replaced with **`renderer`** in the `@customElement` decorator.

### Property decorators

These are used inside the class and are associated with accessors (class members).
These decorators are used for properties and slots:

- `@property`- to define components' properties
```ts
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
```
- `@slot` - to define components' slots

```ts
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
```

### Defining properties (`@property`)

The `@property` decorator has a single parameter of type object with the following fields to describe a component property:

- type?: BooleanConstructor | StringConstructor | ObjectConstructor | DataType
- validator?: DataType,
- defaultValue?: PropertyValue,
- noAttribute?: boolean,
- multiple?: boolean,
- compareValues?: boolean,

The fields are explained in detail in the [Deep dive and best practices](./06-deep-dive-and-best-practices.md) article.

**Example:** "`String` properties with no specific default value" - we skip all settings as `String` is the default type and `empty string` is the default value.

```ts
/**
 * Defines the header text of the menu (displayed on mobile).
 *
 * @name sap.ui.webc.main.Menu.prototype.headerText
 * @type {string}
 * @defaultvalue ""
 * @public
 */
@property()
headerText!: string;
```

**Example:** "Properties with enumerated values" - we use `enum` for both the TypeScript class member and the property metadata in the decorator

```ts
/**
 * Defines the component design.
 *
 * @type {sap.ui.webc.main.types.ButtonDesign}
 * @name sap.ui.webc.main.Button.prototype.design
 * @defaultvalue "Default"
 * @public
 */
@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
design!: ButtonDesign;
```

**Example:** use `validator` instead of `type` for `DataType` descendants (although `type` still works for compatibility) 

```ts
/**
 * Defines component's timestamp.
 * <b>Note:</b> set by the Calendar component
 * @type {sap.ui.webc.base.types.Integer}
 * @name sap.ui.webc.main.CalendarHeader.prototype.timestamp
 * @public
 */
@property({ validator: Integer })
timestamp?: number;
```

The `validator` setting is preferable to `type` as it avoids confusion with the actual TypeScript type (i.e. `number` in this example).


**Example:** TypeScript types (`string`, `boolean`) are used for TypeScript class members, and  Javascript constructors (`String`, `Boolean`) for the metadata settings (as before)

```ts
@property({ type: Boolean })
hidden!: boolean;
```

### Usage of `@name` in properties' documentation
Set the `@name` JSDoc annotation for all *public* properties as JSDoc cannot associate the JSDoc comment with the property in the code.
This will not be necessary once we've switched to TypeDoc.

### Usage of `?` and `!`
Use `?` for all metadata properties that may be `undefined` or `null`, and `!` for all other metadata properties. As a rule of thumb:
- `Boolean` properties are always defined with `!` as they
are always `false` by default
```ts
@property({ type: Boolean })
interactive!: boolean;
```
- `String` properties are always defined with `!` as they
are `empty string` by default, unless you specifically set `defaultValue: undefined` (then use `?`)
```ts
@property()
text!: string;
```

```ts
@property({ defaultValue: undefined })
target?: string;
```

- properties with `validator` set, should be always defined with `?` as they are `undefined` by default, unless you specify a `truthy` default value.
```ts
@property({ validator: Float })
width?: number
```

### Never initialize metadata properties. Use `defaultValue` instead.

Wrong:
```ts
class Button extends UI5Element {
	@property({ type: ButtonDesign })
	design: ButtonDesign = ButtonDesign.Default;
}
```

Also Wrong:

```ts
class Button extends UI5Element {
	@property({ type: ButtonDesign })
	design: ButtonDesign;

	constructor() {
		super();
		this.design = ButtonDesign.Default;
	}
}
```

Correct:

```ts
class Button extends UI5Element {
	@property({type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: ButtonDesign;
}
```

**Note:** we use `!` to instruct the TypeScript compiler that the variable will be initialized with a default value different than `null` and `undefined`, since the TypeScript compiler does not know about the component lifecycle and the fact that the framework will initialize the `design` class member.

### Defining slots (`@slot`)

There are 3 common patterns for defining slots:

#### Default slot with `propertyName`

Before:
```js
/**
 * @type {HTMLElement[]}
 */
"default": {
	type: HTMLElement,
	propertyName: "items",
}
```

After:
```ts
/**
 * @name sap.ui.webc.main.SomeComponent.prototype.default
 * @type {HTMLElement[]}
 */
@slot({ "default": true, type: HTMLElement })
items!: Array<SomeItem>
```

Use the `propertyName` as the class member, set `"default": true` in the 
decorator definition, and use `prototype.default` as the JSDoc `@name`.

#### Named slot

Before:
```js
/**
 * @type {HTMLElement[]}
 */
content: {
	type: HTMLElement,
	invalidateOnChildChange: true,
}
```

After:
```ts
/**
 * @name sap.ui.webc.main.SomeComponent.prototype.content
 * @type {HTMLElement[]}
 */
@slot({ type: HTMLElement, invalidateOnChildChange: true })
content!: Array<HTMLElement>
```

Use the slot name as the class member, and again in the JSDoc `@name`.

#### Default slot without `propertyName`

Before:
```js
/**
 * @type {HTMLElement[]}
 */
"default": {
	type: HTMLElement,
}
```

After:
```ts
/**
 * @name sap.ui.webc.main.SomeComponent.prototype.default
 * @type {HTMLElement[]}
 */
```

**Only provide a JSDoc comment** and do not create a class member
for that slot.

#### What about `managedSlots`?

There isn't a decorator for `managedSlots` (unlike for all other metadata entities). It is set automatically when you use
at least one `@slot` decorator.

In essence, this means that if you need to access the slot content
in your component's code, the slots automatically need to be managed.
Therefore, whenever you use `@slot`, the `managedSlots` setting is automatically set.

### Defining events

 - The `@event` decorator must be used outside the class (contrary to `@property` and `@slot`).
 - You must provide a JSDoc `@name` annotation with `#`

Example:

```ts
/**
 * Fired when an item is activated, unless the item's <code>type</code> property
 * is set to <code>Inactive</code>.
 *
 * @event sap.ui.webc.main.List#item-click
 * @allowPreventDefault
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event("item-click", {
	detail: {
		item: { type: HTMLElement },
	},
})
```

## Events

There are a couple of rules to follow when creating and using events

1. Use the `@event` decorator:

```ts
/**
 * Fired when an item is activated, unless the item's <code>type</code> property
 * is set to <code>Inactive</code>.
 *
 * @event sap.ui.webc.main.List#item-click
 * @allowPreventDefault
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event("item-click", {
	detail: {
		item: { type: HTMLElement },
	},
})
```
2. Create a type for the event parameter

```ts
type ListItemClickEventDetail {
	item: ListItemBase,
}
```

3. Use the type when firing events

```ts
this.fireEvent<ListItemClickEventDetail>("item-click", { item })
```

4. Export the type for the event detail

```ts
export type { ListItemClickEventDetail };
```

Then, the users of your component can import the detail type and pass it to `CustomEvent`, for example:

```ts
onItemClick(e: CustomEvent<ListItemClickEventDetail>) {
	console.log(e.detail.item);
}
```

## Conventions and guidelines

### Conventions
<br/>

**1. Rename `"event"` to `"e"` in the `.ts` files as it collides with the `@event` decorator**.

Since the event decorator is being imported with the `event` keyword

Example:
```ts
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
```
Using the keyword `"event"` as a parameter for our handlers leads to a collision between the parameter and the `@event` decorator. 
<br/>
```ts
// Before ( which would lead to a name collision now )

_onfocusin(event: FocusEvent) {
	const target = event.target as ProductSwitchItem;
	this._itemNavigation.setCurrentItem(target);
	this._currentIndex = this.items.indexOf(target);
}
```
To avoid this and keep consistency, we decided to name the parameters in our handlers `"e"` instead.

```ts
// After

_onfocusin(e: FocusEvent) {
	const target = e.target as ProductSwitchItem;

	this._itemNavigation.setCurrentItem(target);
	this._currentIndex = this.items.indexOf(target);
}
```
<br/>

**2. Initialize all class members directly in the constructor.**

When creating classes, initialize **all** class members directly in the constructor, and not in another method, called in the constructor. This is to ensure that TypeScript understands that a class member will be always initialized, therefore is not optional. <br/>

Example:

```ts
// Before 

class UI5Element extends HTMLElement {
	constructor() {
		super();
		this._initializeState();
	}

	_initializeState() {
		const ctor = this.constructor;
		this._state = { ...ctor.getMetadata().getInitialState() };
	}
}
```
Before the change, we used to initialize `_state` in the `_initializeState` function. However, after the refactoring to TypeScript, we must do it directly in the constructor, otherwise it is not recognized as **always** initialized.

```ts
// After

class UI5Element extends HTMLElement {
	_state: State,

	constructor() {
		super();
		const ctor = this.constructor as typeof UI5Element;
		this._state = { ...ctor.getMetadata().getInitialState() };
	}
}
```
<br/>

**3. Create types for the Event Details.**

To enhance the quality and readability of our code, we should establish specific types for the `Event Details`. This approach will clearly define the required **`data`** for an event and optimize its usage. Without well-defined `EventDetail` types, we may also encounter naming conflicts between similar event names in various components, leading to potential errors. Implementing `EventDetail` types will effectively resolve this issue.

- ***3.1 How should we structure the name of our EventDetail type ?***

- - To be consistent within our project, the latest convention about how we name our EventDetail types is by using the following pattern: <br/>

```ts
// File: DayPicker.ts

// The pattern is 
// <<WebComponentName><EventName><EventDetail>>

type DayPickerChangeEventDetail = {
	dates: Array<number>,
	timestamp?: number,
}

class DayPicker extends CalendarPart implements ICalendarPicker {
	...
	_selectDate(e: Event, isShift: boolean) {
		...
		this.fireEvent<DayPickerChangeEventDetail>("change", {
			timestamp: this.timestamp,
			dates: this.selectedDates,
		});
	}
}

```
<br/>

**4. Use the syntax of `Array<T>` instead of `T[]`.**

While both notations work the same way, we have chosen to utilize the `Array<T>` notation, as opposed to `T[]`, to maintain consistency with the notations for `Map<>` and `Record<>`.

For example:

```ts
// Instead of
let openedRegistry: RegisteredPopUpT[] = [];

// We’ll use
let openedRegistry: Array<RegisteredPopupT> = [];
```
<br/>

**5. Use enums over object literals.**

Instead of using object literals, we have opted for `enums` to enhance **type safety and maintainability**. The use of enums provides compile-time type safety, reducing the potential for errors and making the code easier to manage. It is also important to note that all types in our "types" folder are already represented as `enums`.

Example:

```ts
// File: ColorConvension.ts

// Instead of 

const CSSColors = {
	aliceblue: "f0f8ff",
	antiquewhite: "faebd7",
	aqua: "00ffff",
	aquamarine: "7fffd4",
}

// We’ll use 

enum CSSColors {
	aliceblue = "f0f8ff",
	antiquewhite = "faebd7",
	aqua = "00ffff",
	aquamarine = "7fffd4",
}

```
<br/>

**6. Use the `"keyof typeof"` syntax when dynamically accessing objects with known keys.**

When dynamically accessing objects with **known** keys, always use the `"keyof typeof"` syntax for improved accuracy.

Example:

```ts
// File: ColorConvension.ts

enum CSSColors {
	aliceblue = "f0f8ff",
	antiquewhite = "faebd7",
	aqua = "00ffff",
	aquamarine = "7fffd4",
}
…

const getRGBColor = (color: string): ColorRGB => {
	...
	if (color in CSSColors) {
		color = CSSColors[color as keyof typeof CSSColors];
	}

	return HEXToRGB(color);
};

```
#
In the cases where the keys are unknown or uncertain, we use the `Record<K, T>` notation instead of the `{[key]}` notation.<br/>
In short, `Record<K, T>` is a TypeScript notation for describing an object with keys of `type K` and values of `type T`.

Example:

```ts
// File: UI5ElementMetadata.ts
...
type Metadata = {
	tag: string,
	managedSlots?: boolean,
	properties?: Record<string, Property>,
	slots?: Record<string, Slot>,
	events?: Array<object>,
	fastNavigation?: boolean,
	themeAware?: boolean,
	languageAware?: boolean,
};
```
<br/>

**7. Do not use "any", unless absolutely necessary.**

The `"any"` type instructs the TypeScript compiler to ignore type checking for a specific variable or expression. This can result in errors and make the code more complex to understand and maintain. Our `ESLint` usually takes care of this by enforcing best practices and avoiding its usage.

<br/>

### TypeScript-specific guidelines
<br/>

**1. When to use "import type" ?**

The `import` keyword is used to import values from a module, while `import type` is used to import only the type information of a module without its values. This type of information can be used in type annotations and declarations.
<br/>

For clarity, it is recommended to keep ***type*** and ***non-type*** imports on separate lines and explicitly mark types with the `type` keyword, as in the following example:

```ts
// This line

import I18nBundle, { getI18nBundle, I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
```
```ts

// Should be split into 

// Named export (function) called into the component class
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Default type export.
// Although I18nBundle is a class, it's used as a type of a variable.
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Named type export, used as a type of a variable.
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
```

<br/>

**2. When should we use the `"!"` operator in component's file ?**

The `!` operator in TypeScript is used to indicate that a value is not `null` or `undefined` in situations where the type checker cannot determine it.

It is commonly used when working with the `this.getDomRef()` and `this.shadowRoot` properties in our web components. The return types of these properties, `HTMLElement | null` and `ShadowRoot | null`, respectively, are marked with `null` because there may be instances when these values are not yet available.

This operator can also be used in other situations where TypeScript does not understand the framework's lifecycle, for example, when working with custom elements.

In short, the `!` operator is a useful tool for ensuring that a value is not `null` or `undefined` in cases where the type checker cannot determine this on its own.

For example:

```ts
import UI5Element from "sap/ui/core/Element";

class Example extends UI5Element {
	testProperty?: string;

	onBeforeRendering() {
		this.testProperty = "Some text";
	}

	onAfterRendering() {
		// here TypeScript will complain that the testProperty may be undefined
		// in order of its definition and because it doesn't understand the framework's lifecycle
		const varName: string = this.testProperty!;
	}
}
```
<br/>

**3. Usage of Generics.**

Generics in TypeScript help us with the creation of classes, functions, and other entities that can work with multiple types, instead of just a single one. This allows users to use their own types when consuming these entities.

Generic functions have been added to the `UI5Element`, and a common approach for using built-in generics has been established.
Our first generic function is the `fireEvent` function, which uses generics to describe the event details and to check that all necessary details have been provided. The types used to describe the details provide helpful information to consumers of the event as explained above.

For example: 

```ts
fireEvent<EventDetail>("click")
```
<br/>

The use of custom events as the type for the first argument of an event handler can result in TypeScript complaining about unknown properties in the details. By using generics and introducing a type for event details, we can tell TypeScript which parameters are included in the details, and thus avoid these complaints.

```ts
handleClick(e: CustomEvent<EventDetail>)
```

The second use of generics is in the `querySelector` function. It allows us to specify a custom element return type, such as "List," while retaining the default return type of `T | null.` This allows for more precise type checking and a better understanding of the expected return value.

It's important to note that casting the returned result will exclude "`null`." Additionally, if the result is always in the template and not surrounded by expressions, the "!" operator can be used.



```ts
async _getDialog() {
	const staticAreaItem = await this.getStaticAreaItemDomRef();
	return staticAreaItem!.querySelector<Dialog>("[ui5-dialog]")!;
}
```

The third use case for generics is with the `getFeature` function. This function enables us to retrieve a feature if it is **registered**. It is important to note that `getFeature` returns the class definition, rather than an instance of the class. To use it effectively, the `typeof` keyword should be utilized to obtain the class type, which will then be set as the return type of the function.

```ts
	getFeature<typeof FormSupportT>("FormSupport")
```
<br/>

**4. Managing Component Styles with `CSSMap` and `ComponentStylesData` in the Inheritance Chain**

To resolve inheritance chain issues, we introduced two types that can be used in the components. All components have implemented a static `get styles` function that returns either an array with required styles or just the component styles without an array. However, depending on the inheritance chain, TypeScript may complain about wrong return types, without considering that they will be merged into a flat array in the end.

```ts
// File: ListItem.ts

static get styles(): ComponentStylesData {
	return [ListItemBase.styles, styles];
}
```
<br/>

**5. Resolving the `this` type error with TypeScript.**

By default in Strict Mode, the type of `this` is explicitly `any`. When used in a global context function, as in the example, TypeScript will raise an error that `this` has an explicit type of `any`. To resolve this, you can add `this` as the first argument to the function and provide its type, usually the context in which the function will be used.

```ts
type MyType = {
	base: number;
	pow: (exponent: number) => number;
};

function pow(this: MyType, exponent: number) {
	return Math.pow(this.base, exponent);
}

const basePow: MyType = {
	base: 2,
	pow,
};
```