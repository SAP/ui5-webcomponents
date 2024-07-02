import{j as e}from"./jsx-runtime-670e1be8.js";import{M as r}from"./index-6087c063.js";import{B as o,F as a}from"./Banner-a1178143.js";import{u as i}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(t){const n=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",pre:"pre",code:"code",ul:"ul",li:"li",strong:"strong",a:"a",em:"em",h4:"h4",ol:"ol"},i(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Development/Typescript in UI5 Web Components"}),`
`,e.jsx(o,{}),`
`,e.jsx(n.h1,{id:"typescript-development",children:"TypeScript Development"}),`
`,e.jsx(n.p,{children:`Since 1.11.0 we migrated the framework and all components to TypeScript.
In addition to the pure code migration, we introduced a new format of component metadata definition leveraging TypeScript decorators.`}),`
`,e.jsx(n.h2,{id:"component-metadata",children:"Component Metadata"}),`
`,e.jsx(n.h3,{id:"decorators",children:"Decorators"}),`
`,e.jsx(n.p,{children:"We use decorators to describe the components' metadata. Here is the list of all available decorators:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
`})}),`
`,e.jsx(n.h3,{id:"class-decorators",children:"Class decorators"}),`
`,e.jsx(n.p,{children:"The class decorators are used just before the component's class declaration and applied to the constructor of the class to describe the component:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@customElement"})," - to define class-related metadata entities: ",e.jsx(n.code,{children:"tag"}),", ",e.jsx(n.code,{children:"renderer"}),", ",e.jsx(n.code,{children:"template"}),", ",e.jsx(n.code,{children:"styles"}),", ",e.jsx(n.code,{children:"dependencies"})," and more."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@event"})," - to define the events, fired by the component"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import event from "@ui5/webcomponents-base/dist/decorators/event.js";
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Example:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`@customElement("ui5-menu")
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
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"@customElement"})," can be used to define all class-related metadata entities:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`@customElement({
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
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": the ",e.jsx(n.code,{children:"static get render()"})," that we use when developing in JavaScript (still supported for backward compatibility) is replaced with ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"renderer"})})," in the ",e.jsx(n.code,{children:"@customElement"})," decorator."]}),`
`,e.jsx(n.h3,{id:"property-decorators",children:"Property decorators"}),`
`,e.jsx(n.p,{children:`These are used inside the class and are associated with accessors (class members).
These decorators are used for properties and slots:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@property"}),"- to define components' properties"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import property from "@ui5/webcomponents-base/dist/decorators/property.js";
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@slot"})," - to define components' slots"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
`})}),`
`,e.jsxs(n.h3,{id:"defining-properties-property",children:["Defining properties (",e.jsx(n.code,{children:"@property"}),")"]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@property"})," decorator has a single parameter of type object with the following fields to describe a component property:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"type?: BooleanConstructor | StringConstructor | ObjectConstructor | DataType"}),`
`,e.jsx(n.li,{children:"validator?: DataType,"}),`
`,e.jsx(n.li,{children:"defaultValue?: PropertyValue,"}),`
`,e.jsx(n.li,{children:"noAttribute?: boolean,"}),`
`,e.jsx(n.li,{children:"multiple?: boolean,"}),`
`,e.jsx(n.li,{children:"compareValues?: boolean,"}),`
`]}),`
`,e.jsxs(n.p,{children:["The fields are explained in detail in the ",e.jsx(n.a,{href:"./?path=/docs/docs-development-deep-dive-and-best-practices--docs",children:"Deep dive and best practices"})," article."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"}),' "',e.jsx(n.code,{children:"String"}),' properties with no specific default value" - we skip all settings as ',e.jsx(n.code,{children:"String"})," is the default type and ",e.jsx(n.code,{children:"empty string"})," is the default value."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`/**
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
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"}),' "Properties with enumerated values" - we use ',e.jsx(n.code,{children:"enum"})," for both the TypeScript class member and the property metadata in the decorator"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`/**
 * Defines the component design.
 *
 * @type {sap.ui.webc.main.types.ButtonDesign}
 * @name sap.ui.webc.main.Button.prototype.design
 * @defaultvalue "Default"
 * @public
 */
@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
design!: ButtonDesign;
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," use ",e.jsx(n.code,{children:"validator"})," instead of ",e.jsx(n.code,{children:"type"})," for ",e.jsx(n.code,{children:"DataType"})," descendants (although ",e.jsx(n.code,{children:"type"})," still works for compatibility)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`/**
 * Defines component's timestamp.
 * <b>Note:</b> set by the Calendar component
 * @type {sap.ui.webc.base.types.Integer}
 * @name sap.ui.webc.main.CalendarHeader.prototype.timestamp
 * @public
 */
@property({ validator: Integer })
timestamp?: number;
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"validator"})," setting is preferable to ",e.jsx(n.code,{children:"type"})," as it avoids confusion with the actual TypeScript type (i.e. ",e.jsx(n.code,{children:"number"})," in this example)."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," TypeScript types (",e.jsx(n.code,{children:"string"}),", ",e.jsx(n.code,{children:"boolean"}),") are used for TypeScript class members, and  Javascript constructors (",e.jsx(n.code,{children:"String"}),", ",e.jsx(n.code,{children:"Boolean"}),") for the metadata settings (as before)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`@property({ type: Boolean })
hidden!: boolean;
`})}),`
`,e.jsxs(n.h3,{id:"usage-of-name-in-properties-documentation",children:["Usage of ",e.jsx(n.code,{children:"@name"})," in properties' documentation"]}),`
`,e.jsxs(n.p,{children:["Set the ",e.jsx(n.code,{children:"@name"})," JSDoc annotation for all ",e.jsx(n.em,{children:"public"}),` properties as JSDoc cannot associate the JSDoc comment with the property in the code.
This will not be necessary once we've switched to TypeDoc.`]}),`
`,e.jsxs(n.h3,{id:"usage-of--and-",children:["Usage of ",e.jsx(n.code,{children:"?"})," and ",e.jsx(n.code,{children:"!"})]}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"?"})," for all metadata properties that may be ",e.jsx(n.code,{children:"undefined"})," or ",e.jsx(n.code,{children:"null"}),", and ",e.jsx(n.code,{children:"!"})," for all other metadata properties. As a rule of thumb:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Boolean"})," properties are always defined with ",e.jsx(n.code,{children:"!"}),` as they
are always `,e.jsx(n.code,{children:"false"})," by default"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`@property({ type: Boolean })
interactive!: boolean;
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"String"})," properties are always defined with ",e.jsx(n.code,{children:"!"}),` as they
are `,e.jsx(n.code,{children:"empty string"})," by default, unless you specifically set ",e.jsx(n.code,{children:"defaultValue: undefined"})," (then use ",e.jsx(n.code,{children:"?"}),")"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`@property()
text!: string;
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`@property({ defaultValue: undefined })
target?: string;
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["properties with ",e.jsx(n.code,{children:"validator"})," set, should be always defined with ",e.jsx(n.code,{children:"?"})," as they are ",e.jsx(n.code,{children:"undefined"})," by default, unless you specify a ",e.jsx(n.code,{children:"truthy"})," default value."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`@property({ validator: Float })
width?: number
`})}),`
`,e.jsxs(n.h3,{id:"never-initialize-metadata-properties-use-defaultvalue-instead",children:["Never initialize metadata properties. Use ",e.jsx(n.code,{children:"defaultValue"})," instead."]}),`
`,e.jsx(n.p,{children:"Wrong:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`class Button extends UI5Element {
	@property({ type: ButtonDesign })
	design: ButtonDesign = ButtonDesign.Default;
}
`})}),`
`,e.jsx(n.p,{children:"Also Wrong:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`class Button extends UI5Element {
	@property({ type: ButtonDesign })
	design: ButtonDesign;

	constructor() {
		super();
		this.design = ButtonDesign.Default;
	}
}
`})}),`
`,e.jsx(n.p,{children:"Correct:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`class Button extends UI5Element {
	@property({type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: ButtonDesign;
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," we use ",e.jsx(n.code,{children:"!"})," to instruct the TypeScript compiler that the variable will be initialized with a default value different than ",e.jsx(n.code,{children:"null"})," and ",e.jsx(n.code,{children:"undefined"}),", since the TypeScript compiler does not know about the component lifecycle and the fact that the framework will initialize the ",e.jsx(n.code,{children:"design"})," class member."]}),`
`,e.jsxs(n.h3,{id:"defining-slots-slot",children:["Defining slots (",e.jsx(n.code,{children:"@slot"}),")"]}),`
`,e.jsx(n.p,{children:"There are 3 common patterns for defining slots:"}),`
`,e.jsxs(n.h4,{id:"default-slot-with-propertyname",children:["Default slot with ",e.jsx(n.code,{children:"propertyName"})]}),`
`,e.jsx(n.p,{children:"Before:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`/**
 * @type {HTMLElement[]}
 */
"default": {
	type: HTMLElement,
	propertyName: "items",
}
`})}),`
`,e.jsx(n.p,{children:"After:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`/**
 * @name sap.ui.webc.main.SomeComponent.prototype.default
 * @type {HTMLElement[]}
 */
@slot({ "default": true, type: HTMLElement })
items!: Array<SomeItem>
`})}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"propertyName"})," as the class member, set ",e.jsx(n.code,{children:'"default": true'}),` in the
decorator definition, and use `,e.jsx(n.code,{children:"prototype.default"})," as the JSDoc ",e.jsx(n.code,{children:"@name"}),"."]}),`
`,e.jsx(n.h4,{id:"named-slot",children:"Named slot"}),`
`,e.jsx(n.p,{children:"Before:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`/**
 * @type {HTMLElement[]}
 */
content: {
	type: HTMLElement,
	invalidateOnChildChange: true,
}
`})}),`
`,e.jsx(n.p,{children:"After:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`/**
 * @name sap.ui.webc.main.SomeComponent.prototype.content
 * @type {HTMLElement[]}
 */
@slot({ type: HTMLElement, invalidateOnChildChange: true })
content!: Array<HTMLElement>
`})}),`
`,e.jsxs(n.p,{children:["Use the slot name as the class member, and again in the JSDoc ",e.jsx(n.code,{children:"@name"}),"."]}),`
`,e.jsxs(n.h4,{id:"default-slot-without-propertyname",children:["Default slot without ",e.jsx(n.code,{children:"propertyName"})]}),`
`,e.jsx(n.p,{children:"Before:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`/**
 * @type {HTMLElement[]}
 */
"default": {
	type: HTMLElement,
}
`})}),`
`,e.jsx(n.p,{children:"After:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`/**
 * @name sap.ui.webc.main.SomeComponent.prototype.default
 * @type {HTMLElement[]}
 */
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Only provide a JSDoc comment"}),` and do not create a class member
for that slot.`]}),`
`,e.jsxs(n.h4,{id:"what-about-managedslots",children:["What about ",e.jsx(n.code,{children:"managedSlots"}),"?"]}),`
`,e.jsxs(n.p,{children:["There isn't a decorator for ",e.jsx(n.code,{children:"managedSlots"}),` (unlike for all other metadata entities). It is set automatically when you use
at least one `,e.jsx(n.code,{children:"@slot"})," decorator."]}),`
`,e.jsxs(n.p,{children:[`In essence, this means that if you need to access the slot content
in your component's code, the slots automatically need to be managed.
Therefore, whenever you use `,e.jsx(n.code,{children:"@slot"}),", the ",e.jsx(n.code,{children:"managedSlots"})," setting is automatically set."]}),`
`,e.jsx(n.h3,{id:"defining-events",children:"Defining events"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"@event"})," decorator must be used outside the class (contrary to ",e.jsx(n.code,{children:"@property"})," and ",e.jsx(n.code,{children:"@slot"}),")."]}),`
`,e.jsxs(n.li,{children:["You must provide a JSDoc ",e.jsx(n.code,{children:"@name"})," annotation with ",e.jsx(n.code,{children:"#"})]}),`
`]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`/**
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
`,e.jsx(n.h2,{id:"events",children:"Events"}),`
`,e.jsx(n.p,{children:"There are a couple of rules to follow when creating and using events"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Use the ",e.jsx(n.code,{children:"@event"})," decorator:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`/**
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
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"Create a type for the event parameter"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`type ListItemClickEventDetail {
	item: ListItemBase,
}
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Use the type when firing events"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`this.fireEvent<ListItemClickEventDetail>("item-click", { item })
`})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsx(n.li,{children:"Export the type for the event detail"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`export type { ListItemClickEventDetail };
`})}),`
`,e.jsxs(n.p,{children:["Then, the users of your component can import the detail type and pass it to ",e.jsx(n.code,{children:"CustomEvent"}),", for example:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`onItemClick(e: CustomEvent<ListItemClickEventDetail>) {
	console.log(e.detail.item);
}
`})}),`
`,e.jsx(n.h2,{id:"conventions-and-guidelines",children:"Conventions and guidelines"}),`
`,e.jsx(n.h3,{id:"conventions",children:"Conventions"}),`
`,e.jsx("br",{}),`
`,e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["1. Rename ",e.jsx(n.code,{children:'"event"'})," to ",e.jsx(n.code,{children:'"e"'})," in the ",e.jsx(n.code,{children:".ts"})," files as it collides with the ",e.jsx(n.code,{children:"@event"})," decorator"]}),"."]}),`
`,e.jsxs(n.p,{children:["Since the event decorator is being imported with the ",e.jsx(n.code,{children:"event"})," keyword"]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import event from "@ui5/webcomponents-base/dist/decorators/event.js";
`})}),`
`,e.jsxs(n.p,{children:["Using the keyword ",e.jsx(n.code,{children:'"event"'})," as a parameter for our handlers leads to a collision between the parameter and the ",e.jsx(n.code,{children:"@event"})," decorator."]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// Before ( which would lead to a name collision now )

_onfocusin(event: FocusEvent) {
	const target = event.target as ProductSwitchItem;
	this._itemNavigation.setCurrentItem(target);
	this._currentIndex = this.items.indexOf(target);
}
`})}),`
`,e.jsxs(n.p,{children:["To avoid this and keep consistency, we decided to name the parameters in our handlers ",e.jsx(n.code,{children:'"e"'})," instead."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// After

_onfocusin(e: FocusEvent) {
	const target = e.target as ProductSwitchItem;

	this._itemNavigation.setCurrentItem(target);
	this._currentIndex = this.items.indexOf(target);
}
`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"2. Initialize all class members directly in the constructor."})}),`
`,e.jsxs(n.p,{children:["When creating classes, initialize ",e.jsx(n.strong,{children:"all"})," class members directly in the constructor, and not in another method, called in the constructor. This is to ensure that TypeScript understands that a class member will be always initialized, therefore is not optional. ",e.jsx("br",{})]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// Before 

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
`,e.jsxs(n.p,{children:["Before the change, we used to initialize ",e.jsx(n.code,{children:"_state"})," in the ",e.jsx(n.code,{children:"_initializeState"})," function. However, after the refactoring to TypeScript, we must do it directly in the constructor, otherwise it is not recognized as ",e.jsx(n.strong,{children:"always"})," initialized."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// After

class UI5Element extends HTMLElement {
	_state: State,

	constructor() {
		super();
		const ctor = this.constructor as typeof UI5Element;
		this._state = { ...ctor.getMetadata().getInitialState() };
	}
}
`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"3. Create types for the Event Details."})}),`
`,e.jsxs(n.p,{children:["To enhance the quality and readability of our code, we should establish specific types for the ",e.jsx(n.code,{children:"Event Details"}),". This approach will clearly define the required ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"data"})})," for an event and optimize its usage. Without well-defined ",e.jsx(n.code,{children:"EventDetail"})," types, we may also encounter naming conflicts between similar event names in various components, leading to potential errors. Implementing ",e.jsx(n.code,{children:"EventDetail"})," types will effectively resolve this issue."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:e.jsx(n.strong,{children:"3.1 How should we structure the name of our EventDetail type ?"})})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["To be consistent within our project, the latest convention about how we name our EventDetail types is by using the following pattern: ",e.jsx("br",{})]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// File: DayPicker.ts

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
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["4. Use the syntax of ",e.jsx(n.code,{children:"Array<T>"})," instead of ",e.jsx(n.code,{children:"T[]"}),"."]})}),`
`,e.jsxs(n.p,{children:["While both notations work the same way, we have chosen to utilize the ",e.jsx(n.code,{children:"Array<T>"})," notation, as opposed to ",e.jsx(n.code,{children:"T[]"}),", to maintain consistency with the notations for ",e.jsx(n.code,{children:"Map<>"})," and ",e.jsx(n.code,{children:"Record<>"}),"."]}),`
`,e.jsx(n.p,{children:"For example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// Instead of
let openedRegistry: RegisteredPopUpT[] = [];

// We’ll use
let openedRegistry: Array<RegisteredPopupT> = [];
`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"5. Use enums over object literals."})}),`
`,e.jsxs(n.p,{children:["Instead of using object literals, we have opted for ",e.jsx(n.code,{children:"enums"})," to enhance ",e.jsx(n.strong,{children:"type safety and maintainability"}),'. The use of enums provides compile-time type safety, reducing the potential for errors and making the code easier to manage. It is also important to note that all types in our "types" folder are already represented as ',e.jsx(n.code,{children:"enums"}),"."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// File: ColorConvension.ts

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

`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["6. Use the ",e.jsx(n.code,{children:'"keyof typeof"'})," syntax when dynamically accessing objects with known keys."]})}),`
`,e.jsxs(n.p,{children:["When dynamically accessing objects with ",e.jsx(n.strong,{children:"known"})," keys, always use the ",e.jsx(n.code,{children:'"keyof typeof"'})," syntax for improved accuracy."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// File: ColorConvension.ts

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

`})}),`
`,e.jsx(n.h1,{id:""}),`
`,e.jsxs(n.p,{children:["In the cases where the keys are unknown or uncertain, we use the ",e.jsx(n.code,{children:"Record<K, T>"})," notation instead of the ",e.jsx(n.code,{children:"{[key]}"})," notation.",e.jsx("br",{}),`
In short, `,e.jsx(n.code,{children:"Record<K, T>"})," is a TypeScript notation for describing an object with keys of ",e.jsx(n.code,{children:"type K"})," and values of ",e.jsx(n.code,{children:"type T"}),"."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// File: UI5ElementMetadata.ts
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
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:'7. Do not use "any", unless absolutely necessary.'})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:'"any"'})," type instructs the TypeScript compiler to ignore type checking for a specific variable or expression. This can result in errors and make the code more complex to understand and maintain. Our ",e.jsx(n.code,{children:"ESLint"})," usually takes care of this by enforcing best practices and avoiding its usage."]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"typescript-specific-guidelines",children:"TypeScript-specific guidelines"}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:'1. When to use "import type" ?'})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"import"})," keyword is used to import values from a module, while ",e.jsx(n.code,{children:"import type"})," is used to import only the type information of a module without its values. This type of information can be used in type annotations and declarations."]}),`
`,e.jsx("br",{}),`
`,e.jsxs(n.p,{children:["For clarity, it is recommended to keep ",e.jsx(n.em,{children:e.jsx(n.strong,{children:"type"})})," and ",e.jsx(n.em,{children:e.jsx(n.strong,{children:"non-type"})})," imports on separate lines and explicitly mark types with the ",e.jsx(n.code,{children:"type"})," keyword, as in the following example:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// This line

import I18nBundle, { getI18nBundle, I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`
// Should be split into 

// Named export (function) called into the component class
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Default type export.
// Although I18nBundle is a class, it's used as a type of a variable.
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Named type export, used as a type of a variable.
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["2. When should we use the ",e.jsx(n.code,{children:'"!"'})," operator in component's file ?"]})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"!"})," operator in TypeScript is used to indicate that a value is not ",e.jsx(n.code,{children:"null"})," or ",e.jsx(n.code,{children:"undefined"})," in situations where the type checker cannot determine it."]}),`
`,e.jsxs(n.p,{children:["It is commonly used when working with the ",e.jsx(n.code,{children:"this.getDomRef()"})," and ",e.jsx(n.code,{children:"this.shadowRoot"})," properties in our web components. The return types of these properties, ",e.jsx(n.code,{children:"HTMLElement | null"})," and ",e.jsx(n.code,{children:"ShadowRoot | null"}),", respectively, are marked with ",e.jsx(n.code,{children:"null"})," because there may be instances when these values are not yet available."]}),`
`,e.jsx(n.p,{children:"This operator can also be used in other situations where TypeScript does not understand the framework's lifecycle, for example, when working with custom elements."}),`
`,e.jsxs(n.p,{children:["In short, the ",e.jsx(n.code,{children:"!"})," operator is a useful tool for ensuring that a value is not ",e.jsx(n.code,{children:"null"})," or ",e.jsx(n.code,{children:"undefined"})," in cases where the type checker cannot determine this on its own."]}),`
`,e.jsx(n.p,{children:"For example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import UI5Element from "sap/ui/core/Element";

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
`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"3. Usage of Generics."})}),`
`,e.jsx(n.p,{children:"Generics in TypeScript help us with the creation of classes, functions, and other entities that can work with multiple types, instead of just a single one. This allows users to use their own types when consuming these entities."}),`
`,e.jsxs(n.p,{children:["Generic functions have been added to the ",e.jsx(n.code,{children:"UI5Element"}),`, and a common approach for using built-in generics has been established.
Our first generic function is the `,e.jsx(n.code,{children:"fireEvent"})," function, which uses generics to describe the event details and to check that all necessary details have been provided. The types used to describe the details provide helpful information to consumers of the event as explained above."]}),`
`,e.jsx(n.p,{children:"For example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`fireEvent<EventDetail>("click")
`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:"The use of custom events as the type for the first argument of an event handler can result in TypeScript complaining about unknown properties in the details. By using generics and introducing a type for event details, we can tell TypeScript which parameters are included in the details, and thus avoid these complaints."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`handleClick(e: CustomEvent<EventDetail>)
`})}),`
`,e.jsxs(n.p,{children:["The second use of generics is in the ",e.jsx(n.code,{children:"querySelector"}),' function. It allows us to specify a custom element return type, such as "List," while retaining the default return type of ',e.jsx(n.code,{children:"T | null."})," This allows for more precise type checking and a better understanding of the expected return value."]}),`
`,e.jsxs(n.p,{children:[`It's important to note that casting the returned result will exclude "`,e.jsx(n.code,{children:"null"}),'." Additionally, if the result is always in the template and not surrounded by expressions, the "!" operator can be used.']}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`async _getDialog() {
	const staticAreaItem = await this.getStaticAreaItemDomRef();
	return staticAreaItem!.querySelector<Dialog>("[ui5-dialog]")!;
}
`})}),`
`,e.jsxs(n.p,{children:["The third use case for generics is with the ",e.jsx(n.code,{children:"getFeature"})," function. This function enables us to retrieve a feature if it is ",e.jsx(n.strong,{children:"registered"}),". It is important to note that ",e.jsx(n.code,{children:"getFeature"})," returns the class definition, rather than an instance of the class. To use it effectively, the ",e.jsx(n.code,{children:"typeof"})," keyword should be utilized to obtain the class type, which will then be set as the return type of the function."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`	getFeature<typeof FormSupportT>("FormSupport")
`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["4. Managing Component Styles with ",e.jsx(n.code,{children:"CSSMap"})," and ",e.jsx(n.code,{children:"ComponentStylesData"})," in the Inheritance Chain"]})}),`
`,e.jsxs(n.p,{children:["To resolve inheritance chain issues, we introduced two types that can be used in the components. All components have implemented a static ",e.jsx(n.code,{children:"get styles"})," function that returns either an array with required styles or just the component styles without an array. However, depending on the inheritance chain, TypeScript may complain about wrong return types, without considering that they will be merged into a flat array in the end."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// File: ListItem.ts

static get styles(): ComponentStylesData {
	return [ListItemBase.styles, styles];
}
`})}),`
`,e.jsx("br",{}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["5. Resolving the ",e.jsx(n.code,{children:"this"})," type error with TypeScript."]})}),`
`,e.jsxs(n.p,{children:["By default in Strict Mode, the type of ",e.jsx(n.code,{children:"this"})," is explicitly ",e.jsx(n.code,{children:"any"}),". When used in a global context function, as in the example, TypeScript will raise an error that ",e.jsx(n.code,{children:"this"})," has an explicit type of ",e.jsx(n.code,{children:"any"}),". To resolve this, you can add ",e.jsx(n.code,{children:"this"})," as the first argument to the function and provide its type, usually the context in which the function will be used."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`type MyType = {
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
`})}),`
`,e.jsx(a,{})]})}function f(t={}){const{wrapper:n}=Object.assign({},i(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(s,t)})):s(t)}export{f as default};
