import{j as e}from"./jsx-runtime.7897cedd.js";import{M as i}from"./index.8cb7a9d9.js";import{u as o}from"./index.ce731c38.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function g(n={}){const{wrapper:s}=Object.assign({},o(),n.components);return s?e.exports.jsx(s,Object.assign({},n,{children:e.exports.jsx(r,{})})):r();function r(){const t=Object.assign({h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",code:"code",h4:"h4",strong:"strong",ul:"ul",li:"li",em:"em",ol:"ol"},o(),n.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Development/Ts"}),`
`,e.exports.jsx(t.h1,{children:"Typescript development"}),`
`,e.exports.jsx(t.h2,{children:"Metadata"}),`
`,e.exports.jsx(t.h3,{children:"Decorators"}),`
`,e.exports.jsx(t.p,{children:"We use decorators to describe metadata."}),`
`,e.exports.jsx(t.p,{children:"List of all available decorators:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import themeAware from "@ui5/webcomponents-base/dist/decorators/themeAware.js";
import fastNavigation from "@ui5/webcomponents-base/dist/decorators/fastNavigation.js";
`})}),`
`,e.exports.jsx(t.h3,{children:"Types of decorators"}),`
`,e.exports.jsx(t.h4,{children:"Class decorators"}),`
`,e.exports.jsxs(t.p,{children:["These are used ",e.exports.jsx(t.strong,{children:"outside"})," the class declaration and describe the class:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import themeAware from "@ui5/webcomponents-base/dist/decorators/themeAware.js";
import fastNavigation from "@ui5/webcomponents-base/dist/decorators/fastNavigation.js";
`})}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`@customElement("ui5-menu")
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
`})}),`
`,e.exports.jsx(t.h4,{children:"Property decorators"}),`
`,e.exports.jsxs(t.p,{children:["These are used ",e.exports.jsx(t.strong,{children:"inside"}),` the class and are associated with accessors (class members).
Such decorators are used for properties and slots:`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
`})}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`class MyClass extends UI5Element {
	@property({ type: Boolean })
	open!:boolean;
}
`})}),`
`,e.exports.jsx(t.h3,{children:"Defining the tag and other settings"}),`
`,e.exports.jsxs(t.p,{children:["Use ",e.exports.jsx(t.code,{children:"@customElement"})," as a replacement for the metadata ",e.exports.jsx(t.code,{children:"tag"})," setting."]}),`
`,e.exports.jsxs(t.p,{children:["Use ",e.exports.jsx(t.code,{children:"@themeAware"}),", ",e.exports.jsx(t.code,{children:"@languageAware"})," and ",e.exports.jsx(t.code,{children:"@fastNavigation"})," where needed. Note that these do not accept parameters."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`@customElement("my-element-name")
@languageAware
@themeAware
@fastNavigation
`})}),`
`,e.exports.jsxs(t.h3,{children:["Defining properties (",e.exports.jsx(t.code,{children:"@property"}),")"]}),`
`,e.exports.jsxs(t.p,{children:["Pass an object with the settings (",e.exports.jsx(t.code,{children:"type"}),", ",e.exports.jsx(t.code,{children:"defaultValue"}),", etc.), defining the property, as the only parameter to the ",e.exports.jsx(t.code,{children:"@property"})," decorator."]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"String"})," is the default type, no need to explicitly write it"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`/**
 * Defines the header text of the menu (displayed on mobile).
 *
 * @name sap.ui.webc.main.Menu.prototype.headerText
 * @type {string}
 * @defaultvalue ""
 * @public
 */
@property()
headerText!: string;
`})}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["use Typescript ",e.exports.jsx(t.code,{children:"enum"})," for enums (do not extend ",e.exports.jsx(t.code,{children:"DataType"}),")"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`/**
 * Defines the component design.
 *
 * <br/><br/>
 * <b>The available values are:</b>
 *
 * <ul>
 * <li><code>Default</code></li>
 * <li><code>Emphasized</code></li>
 * <li><code>Positive</code></li>
 * <li><code>Negative</code></li>
 * <li><code>Transparent</code></li>
 * <li><code>Attention</code></li>
 * </ul>
 *
 * @type {sap.ui.webc.main.types.ButtonDesign}
 * @name sap.ui.webc.main.Button.prototype.design
 * @defaultvalue "Default"
 * @public
 */
@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
design!: ButtonDesign;
`})}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["use ",e.exports.jsx(t.code,{children:"validator"})," instead of ",e.exports.jsx(t.code,{children:"type"})," for ",e.exports.jsx(t.code,{children:"DataType"})," descendants (although ",e.exports.jsx(t.code,{children:"type"})," still works for compatibility)"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`/**
 * Defines component's timestamp.
 * <b>Note:</b> set by the Calendar component
 * @type {sap.ui.webc.base.types.Integer}
 * @name sap.ui.webc.main.CalendarHeader.prototype.timestamp
 * @public
 */
@property({ validator: Integer })
timestamp?: number;
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"validator"})," setting is preferable to ",e.exports.jsx(t.code,{children:"type"})," as it avoids confusion with the actual Typescript type (i.e. ",e.exports.jsx(t.code,{children:"number"})," in this example)"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["Note the difference between Typescript types (",e.exports.jsx(t.code,{children:"string"}),", ",e.exports.jsx(t.code,{children:"boolean"}),") and Javascript constructors (",e.exports.jsx(t.code,{children:"String"}),", ",e.exports.jsx(t.code,{children:"Boolean"}),")."]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"The former are used for Typescript class members, and the latter (as before) for the metadata settings."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`@property({ type: Boolean })
hidden!: boolean;
`})}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.strong,{children:"Important:"})," set the ",e.exports.jsx(t.code,{children:"@name"})," JSDoc annotation for all ",e.exports.jsx(t.em,{children:"public"}),` properties as JSDoc cannot associate the JSDoc comment with the property in the code.
This will not be necessary once we've switched to TypeDoc.`]}),`
`]}),`
`,e.exports.jsxs(t.li,{children:[`
`,e.exports.jsxs(t.p,{children:["Use ",e.exports.jsx(t.code,{children:"?"})," for all metadata properties that may be ",e.exports.jsx(t.code,{children:"undefined"}),", and ",e.exports.jsx(t.code,{children:"!"})," for all other metadata properties."]}),`
`]}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["As a rule of thumb, ",e.exports.jsx(t.code,{children:"String"})," properties are always defined with ",e.exports.jsx(t.code,{children:"!"})," unless you specifically set ",e.exports.jsx(t.code,{children:"defaultValue: undefined"})," and ",e.exports.jsx(t.code,{children:"validator"}),`
properties are always defined with `,e.exports.jsx(t.code,{children:"?"})," unless you specify a default value. ",e.exports.jsx(t.code,{children:"Boolean"})," properties are always defined with ",e.exports.jsx(t.code,{children:"!"}),` as they
always have a default value of `,e.exports.jsx(t.code,{children:"false"}),"."]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.strong,{children:"Important:"})," never initialize metadata properties. Use ",e.exports.jsx(t.code,{children:"defaultValue"})," instead."]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"Wrong:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`class Button extends UI5Element {
	@property({ type: ButtonDesign })
	design: ButtonDesign = ButtonDesign.Default;
}
`})}),`
`,e.exports.jsx(t.p,{children:"Also Wrong:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`class Button extends UI5Element {
	@property({ type: ButtonDesign })
	design: ButtonDesign;

	constructor() {
		super();
		this.design = ButtonDesign.Default;
	}
}
`})}),`
`,e.exports.jsx(t.p,{children:"Correct:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`class Button extends UI5Element {
	@property({type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: ButtonDesign;
}
`})}),`
`,e.exports.jsxs(t.p,{children:["Note the usage of ",e.exports.jsx(t.code,{children:"!"}),` to tell Typescript that this variable will always be defined,
since Typescript does not know that the framework will create a special getter for it.`]}),`
`,e.exports.jsxs(t.h3,{children:["Defining slots (",e.exports.jsx(t.code,{children:"@slot"}),")"]}),`
`,e.exports.jsx(t.p,{children:"There are 3 common patterns for defining slots:"}),`
`,e.exports.jsxs(t.h4,{children:["Default slot with ",e.exports.jsx(t.code,{children:"propertyName"})]}),`
`,e.exports.jsx(t.p,{children:"Before:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`/**
 * @type {HTMLElement[]}
 */
"default": {
	type: HTMLElement,
	propertyName: "items",
}
`})}),`
`,e.exports.jsx(t.p,{children:"After:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`/**
 * @name sap.ui.webc.main.SomeComponent.prototype.default
 * @type {HTMLElement[]}
 */
@slot({ "default": true, type: HTMLElement })
items!: Array<SomeItem>
`})}),`
`,e.exports.jsxs(t.p,{children:["Use the ",e.exports.jsx(t.code,{children:"propertyName"})," as the class member, set ",e.exports.jsx(t.code,{children:'"default": true'}),` in the
decorator definition, and use `,e.exports.jsx(t.code,{children:"prototype.default"})," as the JSDoc ",e.exports.jsx(t.code,{children:"@name"}),"."]}),`
`,e.exports.jsx(t.h4,{children:"Named slot"}),`
`,e.exports.jsx(t.p,{children:"Before:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`/**
 * @type {HTMLElement[]}
 */
content: {
	type: HTMLElement,
	invalidateOnChildChange: true,
}
`})}),`
`,e.exports.jsx(t.p,{children:"After:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`/**
 * @name sap.ui.webc.main.SomeComponent.prototype.content
 * @type {HTMLElement[]}
 */
@slot({ type: HTMLElement, invalidateOnChildChange: true })
content!: Array<HTMLElement>
`})}),`
`,e.exports.jsxs(t.p,{children:["Use the slot name as the class member, and again in the JSDoc ",e.exports.jsx(t.code,{children:"@name"}),"."]}),`
`,e.exports.jsxs(t.h4,{children:["Default slot without ",e.exports.jsx(t.code,{children:"propertyName"})]}),`
`,e.exports.jsx(t.p,{children:"Before:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`/**
 * @type {HTMLElement[]}
 */
"default": {
	type: HTMLElement,
}
`})}),`
`,e.exports.jsx(t.p,{children:"After:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`/**
 * @name sap.ui.webc.main.SomeComponent.prototype.default
 * @type {HTMLElement[]}
 */
`})}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.strong,{children:"Only provide a JSDoc comment"}),` and do not create a class member
for that slot.`]}),`
`,e.exports.jsxs(t.h4,{children:["What about ",e.exports.jsx(t.code,{children:"managedSlots"}),"?"]}),`
`,e.exports.jsxs(t.p,{children:["There isn't a decorator for ",e.exports.jsx(t.code,{children:"managedSlots"}),` (unlike for all other metadata entities). It is set automatically when you use
at least one `,e.exports.jsx(t.code,{children:"@slot"})," decorator."]}),`
`,e.exports.jsxs(t.p,{children:[`In essence, this means that if you need to access the slot content
in your component's code, the slots automatically need to be managed.
Therefore, whenever you use `,e.exports.jsx(t.code,{children:"@slot"}),", the ",e.exports.jsx(t.code,{children:"managedSlots"})," setting is automatically set."]}),`
`,e.exports.jsx(t.h3,{children:"Defining events"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["The ",e.exports.jsx(t.code,{children:"@event"})," decorator must be used outside the class (contrary to ",e.exports.jsx(t.code,{children:"@property"})," and ",e.exports.jsx(t.code,{children:"@slot"}),")."]}),`
`,e.exports.jsxs(t.li,{children:["You must provide a JSDoc ",e.exports.jsx(t.code,{children:"@name"})," annotation with ",e.exports.jsx(t.code,{children:"#"})]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`/**
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
`})}),`
`,e.exports.jsx(t.h2,{children:"Events"}),`
`,e.exports.jsx(t.p,{children:"There are a couple of rules to follow when creating and using events"}),`
`,e.exports.jsxs(t.ol,{children:[`
`,e.exports.jsxs(t.li,{children:["Use the ",e.exports.jsx(t.code,{children:"@event"})," decorator:"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`/**
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
`})}),`
`,e.exports.jsxs(t.ol,{start:"2",children:[`
`,e.exports.jsx(t.li,{children:"Create a type for the event parameter"}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`type ListItemClickEventDetail {
	item: ListItemBase,
}
`})}),`
`,e.exports.jsxs(t.ol,{start:"3",children:[`
`,e.exports.jsx(t.li,{children:"Use the type when firing events"}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`this.fireEvent<ListItemClickEventDetail>("item-click", { item })
`})}),`
`,e.exports.jsxs(t.ol,{start:"4",children:[`
`,e.exports.jsx(t.li,{children:"Export the type for the event detail"}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`export type { ListItemClickEventDetail };
`})}),`
`,e.exports.jsxs(t.p,{children:["Then, the users of your component can import the detail type and pass it to ",e.exports.jsx(t.code,{children:"CustomEvent"}),", for example:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`onItemClick(e: CustomEvent<ListItemClickEventDetail>) {
	console.log(e.detail.item);
}
`})}),`
`,e.exports.jsx(t.h2,{children:"Conventions and guidelines"}),`
`,e.exports.jsx(t.h3,{children:"Conventions"}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsxs(t.strong,{children:["1. Rename ",e.exports.jsx(t.code,{children:'"event"'})," to ",e.exports.jsx(t.code,{children:'"e"'})," in the ",e.exports.jsx(t.code,{children:".ts"})," files as it collides with the ",e.exports.jsx(t.code,{children:"@event"})," decorator"]}),"."]}),`
`,e.exports.jsxs(t.p,{children:["Since the event decorator is being imported with the ",e.exports.jsx(t.code,{children:"event"})," keyword"]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`import event from "@ui5/webcomponents-base/dist/decorators/event.js";
`})}),`
`,e.exports.jsxs(t.p,{children:["Using the keyword ",e.exports.jsx(t.code,{children:'"event"'})," as a paramater for our handlers leads to a collision between the parameter and the ",e.exports.jsx(t.code,{children:"@event"})," decorator."]}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// Before ( which would lead to a name collision now )

_onfocusin(event: FocusEvent) {
	const target = event.target as ProductSwitchItem;
	this._itemNavigation.setCurrentItem(target);
	this._currentIndex = this.items.indexOf(target);
}
`})}),`
`,e.exports.jsxs(t.p,{children:["In order to avoid this and keep consistency, we made a decision to name the parameters in our handlers ",e.exports.jsx(t.code,{children:'"e"'})," instead."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// After

_onfocusin(e: FocusEvent) {
	const target = e.target as ProductSwitchItem;

	this._itemNavigation.setCurrentItem(target);
	this._currentIndex = this.items.indexOf(target);
}
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.strong,{children:"2. Initialize all class members directly in the constructor."})}),`
`,e.exports.jsxs(t.p,{children:["When creating classes, initialize ",e.exports.jsx(t.strong,{children:"all"})," class members directly in the constructor, and not in another method, called in the constructor. This is to ensure that TypeScript understands that a class member will be always initialized, therefore is not optional. ",e.exports.jsx("br",{})]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// Before 

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
`})}),`
`,e.exports.jsxs(t.p,{children:["Before the change, we used to initialize ",e.exports.jsx(t.code,{children:"_state"})," in the ",e.exports.jsx(t.code,{children:"_initializeState"})," function. However, after the refactoring to TypeScript, we must do it directly in the constructor, otherwise it is not recognized as ",e.exports.jsx(t.strong,{children:"always"})," initialized."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// After

class UI5Element extends HTMLElement {
	_state: State,

	constructor() {
		super();
		const ctor = this.constructor as typeof UI5Element;
		this._state = { ...ctor.getMetadata().getInitialState() };
	}
}
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.strong,{children:"3. Create types for the Event Details."})}),`
`,e.exports.jsxs(t.p,{children:["To enhance the quality and readability of our code, we should establish specific types for the ",e.exports.jsx(t.code,{children:"Event Details"}),". This approach will clearly define the required ",e.exports.jsx(t.strong,{children:e.exports.jsx(t.code,{children:"data"})})," for an event and optimize its usage. Without well-defined ",e.exports.jsx(t.code,{children:"EventDetail"})," types, we may also encounter naming conflicts between similar event names in various components, leading to potential errors. Implementing ",e.exports.jsx(t.code,{children:"EventDetail"})," types will effectively resolve this issue."]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.em,{children:e.exports.jsx(t.strong,{children:"3.1 How should we structure the name of our EventDetail type ?"})})}),`
`]}),`
`,e.exports.jsxs(t.li,{children:[`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["In order to be consistent within our project, the latest convention about how we name our EventDetail types is by using the following pattern: ",e.exports.jsx("br",{})]}),`
`]}),`
`]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// File: DayPicker.ts

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

`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsxs(t.strong,{children:["4. Use the syntax of ",e.exports.jsx(t.code,{children:"Array<T>"})," instead of ",e.exports.jsx(t.code,{children:"T[]"}),"."]})}),`
`,e.exports.jsxs(t.p,{children:["While both notations work the same way, we have chosen to utilize the ",e.exports.jsx(t.code,{children:"Array<T>"})," notation, as opposed to ",e.exports.jsx(t.code,{children:"T[]"}),", to maintain consistency with the notations for ",e.exports.jsx(t.code,{children:"Map<>"})," and ",e.exports.jsx(t.code,{children:"Record<>"}),"."]}),`
`,e.exports.jsx(t.p,{children:"For example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// Instead of
let openedRegistry: RegisteredPopUpT[] = [];

// We\u2019ll use
let openedRegistry: Array<RegisteredPopupT> = [];
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.strong,{children:"5. Use enums over object literals."})}),`
`,e.exports.jsxs(t.p,{children:["Instead of using object literals, we have opted for ",e.exports.jsx(t.code,{children:"enums"})," to enhance ",e.exports.jsx(t.strong,{children:"type safety and maintainability"}),'. The use of enums provides compile-time type safety, reducing the potential for errors and making the code easier to manage. It is also important to note that all types in our "types" folder are already represented as ',e.exports.jsx(t.code,{children:"enums"}),"."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// File: ColorConvension.ts

// Instead of 

const CSSColors = {
	aliceblue: "f0f8ff",
	antiquewhite: "faebd7",
	aqua: "00ffff",
	aquamarine: "7fffd4",
}

// We\u2019ll use 

enum CSSColors {
	aliceblue = "f0f8ff",
	antiquewhite = "faebd7",
	aqua = "00ffff",
	aquamarine = "7fffd4",
}

`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsxs(t.strong,{children:["6. Use the ",e.exports.jsx(t.code,{children:'"keyof typeof"'})," syntax when accessing dynamically objects with known keys."]})}),`
`,e.exports.jsxs(t.p,{children:["When accessing dynamically objects with ",e.exports.jsx(t.strong,{children:"known"})," keys, always use the ",e.exports.jsx(t.code,{children:'"keyof typeof"'})," syntax for improved accuracy."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// File: ColorConvension.ts

enum CSSColors {
	aliceblue = "f0f8ff",
	antiquewhite = "faebd7",
	aqua = "00ffff",
	aquamarine = "7fffd4",
}
\u2026

const getRGBColor = (color: string): ColorRGB => {
	...
	if (color in CSSColors) {
		color = CSSColors[color as keyof typeof CSSColors];
	}

	return HEXToRGB(color);
};

`})}),`
`,e.exports.jsx(t.h1,{}),`
`,e.exports.jsxs(t.p,{children:["In the cases where the keys are unknown or uncertain we use the ",e.exports.jsx(t.code,{children:"Record<K, T>"})," notation instead of the ",e.exports.jsx(t.code,{children:"{[key]}"})," notation.",e.exports.jsx("br",{}),`
In short, `,e.exports.jsx(t.code,{children:"Record<K, T>"})," is a TypeScript notation for describing an object with keys of ",e.exports.jsx(t.code,{children:"type K"})," and values of ",e.exports.jsx(t.code,{children:"type T"}),"."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// File: UI5ElementMetadata.ts
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
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.strong,{children:'7. Do not use "any", unless absolutely necessary.'})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:'"any"'})," type, while powerful, can be a ",e.exports.jsx(t.strong,{children:"dangerous"})," feature as it instructs the TypeScript compiler to ignore type checking for a specific variable or expression. This can result in errors and make the code more complex to understand and maintain. Our ",e.exports.jsx(t.code,{children:"ESLint"})," usually takes care of this by enforcing best practices and avoiding its usage."]}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.h3,{children:"TypeScript specific guidelines"}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.strong,{children:'1. When to use "import type" ?'})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"import"})," keyword is used to import values from a module, while ",e.exports.jsx(t.code,{children:"import type"})," is used to import only the type information of a module without its values. This type information can be used in type annotations and declarations."]}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsxs(t.p,{children:["For clarity, it is recommended to keep ",e.exports.jsx(t.em,{children:e.exports.jsx(t.strong,{children:"type"})})," and ",e.exports.jsx(t.em,{children:e.exports.jsx(t.strong,{children:"non-type"})})," imports on separate lines and explicitly mark types with the ",e.exports.jsx(t.code,{children:"type"})," keyword, as in the following example:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// This line

import I18nBundle, { getI18nBundle, I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
`})}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`
// Should be split into 

// Named export (function) used into the the component class
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Default export used into the the component class.
// I18nBundle is a class constructor, but in the current example it's used 
// as a type for a variable to which the class will be assinged.
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// named type export
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsxs(t.strong,{children:["2. When should we use the ",e.exports.jsx(t.code,{children:'"!"'})," operator in component's file ?"]})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"!"})," operator in TypeScript is used to indicate that a value is not ",e.exports.jsx(t.code,{children:"null"})," or ",e.exports.jsx(t.code,{children:"undefined"})," in situations where the type checker cannot determine it."]}),`
`,e.exports.jsxs(t.p,{children:["It is commonly used when working with the ",e.exports.jsx(t.code,{children:"this.getDomRef()"})," and ",e.exports.jsx(t.code,{children:"this.shadowRoot"})," properties in our web components. The return types of these properties, ",e.exports.jsx(t.code,{children:"HTMLElement | null"})," and ",e.exports.jsx(t.code,{children:"ShadowRoot | null"}),", respectively, are marked with ",e.exports.jsx(t.code,{children:"null"})," because there may be instances when these values are not yet available."]}),`
`,e.exports.jsx(t.p,{children:"This operator can also be used in other situations where TypeScript does not understand the framework's lifecycle, for example, when working with custom elements."}),`
`,e.exports.jsxs(t.p,{children:["In short, the ",e.exports.jsx(t.code,{children:"!"})," operator is a useful tool for ensuring that a value is not ",e.exports.jsx(t.code,{children:"null"})," or ",e.exports.jsx(t.code,{children:"undefined"})," in cases where the type checker cannot determine this on its own."]}),`
`,e.exports.jsx(t.p,{children:"For example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`import UI5Element from "sap/ui/core/Element";

class Example extends UI5Element {
	testProperty?: string;

	onBeforeRendering() {
		this.testProperty = "Some text";
	}

	onAfterRendering() {
		// here TypeScript will complain about that the testProperty may be undefined
		// in order of its definition and because it doesn't understand the framework's lifecycle
		const varName: string = this.testProperty!;
	}
}
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.strong,{children:"3. Usage of Generics."})}),`
`,e.exports.jsx(t.p,{children:"Generics in TypeScript help us with the creation of classes, functions, and other entities that can work with multiple types, instead of just a single one. This allows users to use their own types when consuming these entities."}),`
`,e.exports.jsxs(t.p,{children:["In the migration to TypeScript, generic functions have been added to the ",e.exports.jsx(t.code,{children:"UI5Element"}),", and a common approach for using built-in generics has been established."]}),`
`,e.exports.jsxs(t.p,{children:["Our first generic function is the ",e.exports.jsx(t.code,{children:"fireEvent"})," function, which uses generics to describe the event details and to check that all necessary details have been provided. The types used to describe the details provide helpful information to consumers of the event as explained above."]}),`
`,e.exports.jsx(t.p,{children:"For example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`fireEvent<EventDetail>("click")
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:"The use of custom events as the type for the first argument of an event handler can result in TypeScript complaining about unknown properties in the details. By using generics and introducing a type for event details, we can tell Typescript which parameters are included in the details, and thus avoid these complaints."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`handleClick(e: CustomEvent<EventDetail>)
`})}),`
`,e.exports.jsxs(t.p,{children:["The second use of generics is in the ",e.exports.jsx(t.code,{children:"querySelector"}),' function. It allows us to specify a custom element return type, such as "List," while retaining the default return type of ',e.exports.jsx(t.code,{children:"T | null."})," This allows for more precise type checking and better understanding of the expected return value."]}),`
`,e.exports.jsxs(t.p,{children:[`It's important to note that casting the returned result will exclude "`,e.exports.jsx(t.code,{children:"null"}),'." Additionally, if the result is always in the template and not surrounded by expressions, the "!" operator can be used.']}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`async _getDialog() {
	const staticAreaItem = await this.getStaticAreaItemDomRef();
	return staticAreaItem!.querySelector<Dialog>("[ui5-dialog]")!;
}
`})}),`
`,e.exports.jsxs(t.p,{children:["The third use case for generics is with the ",e.exports.jsx(t.code,{children:"getFeature"})," function. This function enables us to retrieve a feature, if it is ",e.exports.jsx(t.strong,{children:"registered"}),". It is important to note that ",e.exports.jsx(t.code,{children:"getFeature"})," returns the class definition, rather than an instance of the class. To use it effectively, the ",e.exports.jsx(t.code,{children:"typeof"})," keyword should be utilized to obtain the class type, which will then be set as the return type of the function."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`	getFeature<typeof FormSupportT>("FormSupport")
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsxs(t.strong,{children:["4. Managing Component Styles with ",e.exports.jsx(t.code,{children:"CSSMap"})," and ",e.exports.jsx(t.code,{children:"ComponentStylesData"})," in the Inheritance Chain"]})}),`
`,e.exports.jsxs(t.p,{children:["To resolve inheritance chain issues, we introduced two types that can be used in the components. All components have implemented a static ",e.exports.jsx(t.code,{children:"get styles"})," function that returns either an array with required styles or just the component styles without an array. However, depending on the inheritance chain, TypeScript may complain about wrong return types, without considering that they will be merged into a flat array in the end."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`// File: ListItem.ts

static get styles(): ComponentStylesData {
	return [ListItemBase.styles, styles];
}
`})}),`
`,e.exports.jsx("br",{}),`
`,e.exports.jsx(t.p,{children:e.exports.jsxs(t.strong,{children:["5. Resolving the ",e.exports.jsx(t.code,{children:"this"})," type error with TypeScript."]})}),`
`,e.exports.jsxs(t.p,{children:["By default in Strict Mode, the type of ",e.exports.jsx(t.code,{children:"this"})," is explicitly ",e.exports.jsx(t.code,{children:"any"}),". When used in a global context function, as in the example, TypeScript will raise an error that ",e.exports.jsx(t.code,{children:"this"})," has an explicit type of ",e.exports.jsx(t.code,{children:"any"}),". To resolve this, you can add ",e.exports.jsx(t.code,{children:"this"})," as the first argument to the function and provide its type, usually the context in which the function will be used."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-ts",children:`type MyType = {
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
`})})]})}}export{g as default};
//# sourceMappingURL=07-ts.b016bae4.js.map
