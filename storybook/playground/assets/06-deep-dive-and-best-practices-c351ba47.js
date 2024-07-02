import{j as e}from"./jsx-runtime-670e1be8.js";import{M as o}from"./index-2d5b4761.js";import{F as r}from"./Footer-3006da85.js";import{u as i}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-c68ca0b6.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(t){const n=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",a:"a",code:"code",h2:"h2",h3:"h3",pre:"pre",strong:"strong",h4:"h4",em:"em",ol:"ol"},i(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Development/Deep dive and best practices"}),`
`,e.jsx(n.h1,{id:"deep-dive-and-best-practices",children:"Deep Dive and Best Practices"}),`
`,e.jsx(n.p,{children:"This tutorial will cover some finer details and best practices when designing and developing UI5 Web Components."}),`
`,e.jsx(n.p,{children:"Before you proceed, please make sure you've read the other articles from this section, especially"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"./?path=/docs/docs-development-custom-ui5-web-components--docs",children:"Developing Custom UI5 Web Components"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"./?path=/docs/docs-development-understanding-components-metadata--docs",children:"Understanding UI5 Web Components Metadata"})}),`
`,e.jsx(n.li,{children:e.jsxs(n.a,{href:"./?path=/docs/docs-development-understanding-hbs-templates--docs",children:["Understanding the Handlebars (",e.jsx(n.code,{children:".hbs"}),") templates"]})}),`
`]}),`
`,e.jsx(n.p,{children:"as this article will expand on many of the notions introduced there."}),`
`,e.jsx(n.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"#metadata",children:"Metadata Deep Dive"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#metadata_tag",children:"Tag"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#metadata_properties",children:"Properties"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#metadata_slots",children:"Slots"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#metadata_events",children:"Events"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#metadata_wrapping_up",children:"Wrapping up metadata"}),`
`,e.jsx(n.a,{href:"#rendering",children:"Understanding rendering"})]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#rendering_def",children:"What is rendering?"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#rendering_physical_logical",children:"Physical and logical components"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#invalidation",children:"What is invalidation?"}),`
`,e.jsx(n.a,{href:"#lifecycle",children:"Lifecycle hooks"})]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#lifecycle_constructor",children:e.jsx(n.code,{children:"constructor"})})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#lifecycle_before",children:e.jsx(n.code,{children:"onBeforeRendering"})})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#lifecycle_after",children:e.jsx(n.code,{children:"onAfterRendering"})})}),`
`,e.jsx(n.li,{children:e.jsxs(n.a,{href:"#lifecycle_dom",children:[e.jsx(n.code,{children:"onEnterDOM"})," and ",e.jsx(n.code,{children:"onExitDOM"})]})}),`
`]}),`
`,e.jsxs(n.h2,{id:"metadata-deep-dive-",children:["Metadata Deep Dive ",e.jsx("a",{name:"metadata"})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"static get metadata()"})," method defines the public API of your component. Among other things, here you define:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"the tag name;"}),`
`,e.jsx(n.li,{children:"what properties/attributes (and of what type) your component supports;"}),`
`,e.jsx(n.li,{children:"what slots your component supports;"}),`
`,e.jsx(n.li,{children:"what events your component fires."}),`
`]}),`
`,e.jsxs(n.h3,{id:"tag-",children:["Tag ",e.jsx("a",{name:"metadata_tag"})]}),`
`,e.jsxs(n.p,{children:["The tag name must include a ",e.jsx(n.code,{children:"-"})," as required for any custom element:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`metadata: {
	tag: "my-component"
}
`})}),`
`,e.jsx(n.p,{children:"and then the usage is:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<my-component></my-component>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"tag"}),", as defined in ",e.jsx(n.code,{children:"metadata"}),`, is sometimes also referred to as the "pure tag", meaning it is not suffixed.
See `,e.jsx(n.a,{href:"./?path=/docs/docs-advanced-scoping--docs",children:"Scoping"})," for more on using a suffix with tag names."]}),`
`,e.jsxs(n.p,{children:["Important: The pure tag name of every UI5 Web Component is always set as an ",e.jsx(n.strong,{children:"attribute"})," to the component too."]}),`
`,e.jsxs(n.p,{children:["For example, when you create a ",e.jsx(n.code,{children:"ui5-button"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button id="b1" class="button1" design="Emphasized"></ui5-button>
`})}),`
`,e.jsxs(n.p,{children:["the framework will create an empty attribute with the name ",e.jsx(n.code,{children:"ui5-button"})," too, so the actual DOM would look like this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button id="b1" class="button1" design="Emphasized" ui5-button></ui5-button>
`})}),`
`,e.jsxs(n.p,{children:["Even if a suffix for tag names is configured (as described in ",e.jsx(n.a,{href:"./?path=/docs/docs-advanced-scoping--docs",children:"Scoping"}),`), the attribute with
the pure tag name will be the same.`]}),`
`,e.jsxs(n.p,{children:["For example, if the configured suffix is ",e.jsx(n.code,{children:"-demo"})," and all components are used with this suffix"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button-demo id="b1" class="button1" design="Emphasized" ui5-button></ui5-button-demo>
`})}),`
`,e.jsxs(n.p,{children:["the ",e.jsx(n.strong,{children:"attribute"})," will still be the same (",e.jsx(n.code,{children:"ui5-button"})," as opposed to the tag name of ",e.jsx(n.code,{children:"ui5-button-demo"}),")."]}),`
`,e.jsx(n.p,{children:`Therefore, the best practice when developing UI5 Web Components is to write CSS selectors for the shadow roots using
attribute selectors, instead of tag selectors.`}),`
`,e.jsxs(n.p,{children:["For example, if the ",e.jsx(n.code,{children:"Demo.hbs"})," file looks like this"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div class="my-component">
	<ui5-button id="openBtn">Open</ui5-button>
	<div>
		<slot></slot>
	</div>
	<ui5-list></ui5-list>
</div>
`})}),`
`,e.jsxs(n.p,{children:["you should not write selectors by tag name for other components in the ",e.jsx(n.code,{children:"Demo.css"})," file"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`ui5-button {
	width: 50px;
}
`})}),`
`,e.jsx(n.p,{children:"because, as stated above, the tag name could be suffixed and is not guaranteed to always be the same as the pure tag name."}),`
`,e.jsx(n.p,{children:"Instead, use the attribute selector"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`[ui5-button] {
	width: 50px;
}
`})}),`
`,e.jsx(n.p,{children:"or another type of selector (for example by ID)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`#openBtn {
	width: 50px;
}
`})}),`
`,e.jsxs(n.h3,{id:"properties-",children:["Properties ",e.jsx("a",{name:"metadata_properties"})]}),`
`,e.jsx(n.h4,{id:"properties-are-a-managed-state",children:"Properties Are a Managed State"}),`
`,e.jsx(n.p,{children:"The framework will create a getter/setter pair on your component's prototype for each property, defined in the metadata."}),`
`,e.jsx(n.p,{children:"For example, after setting this metadata configuration"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`metadata: {
	properties: {
		text: {
			type: String
		}
	}
}
`})}),`
`,e.jsxs(n.p,{children:["you can use the ",e.jsx(n.code,{children:"text"})," getter/setter on this component's instances"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`let t = myComponent.text;
myComponent.text = "New text";
`})}),`
`,e.jsxs(n.p,{children:["Whenever ",e.jsx(n.code,{children:"text"})," is read or set, the framework-defined getter/setter will be called and thus the framework will be in control of the property."]}),`
`,e.jsx(n.h4,{id:"properties-vs-attributes",children:"Properties vs Attributes"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"properties"})," section defines both properties and attributes for your component. By default, for each property (",e.jsx(n.code,{children:"camelCase"}),` name) an attribute with the
same name but in `,e.jsx(n.code,{children:"kebab-case"})," is supported. Properties of type ",e.jsx(n.code,{children:"Object"})," have no attribute counterparts. If you wish not to have an attribute for a given property regardless of the type, you can configure it with ",e.jsx(n.code,{children:"noAttribute: true"}),"."]}),`
`,e.jsx(n.h4,{id:"public-vs-private-properties",children:"Public vs Private Properties"}),`
`,e.jsxs(n.p,{children:["The framework does not distinguish between ",e.jsx(n.em,{children:"public"})," and ",e.jsx(n.em,{children:"private"}),` properties. You can treat some properties as private in a sense that you can document them as such and not advertise them to users.
The usual convention is that private properties start with an `,e.jsx(n.code,{children:"_"}),`, but this is not mandatory. In the end, all properties defined in the metadata, public or private,
are `,e.jsx(n.em,{children:"component state"}),", therefore cause the component to be invalidated and subsequently re-rendered, when changed."]}),`
`,e.jsx(n.h4,{id:"property-types-and-default-values",children:"Property Types and Default Values"}),`
`,e.jsxs(n.p,{children:["The most common types of properties are ",e.jsx(n.code,{children:"String"}),", ",e.jsx(n.code,{children:"Boolean"}),", ",e.jsx(n.code,{children:"Object"}),", ",e.jsx(n.code,{children:"Integer"})," and ",e.jsx(n.code,{children:"Float"}),". The last two are custom types provided by the framework that you must import (they do not exist in the browser)."]}),`
`,e.jsxs(n.p,{children:["Most property types can have a ",e.jsx(n.code,{children:"defaultValue"})," set. ",e.jsx(n.code,{children:"Boolean"})," is always ",e.jsx(n.code,{children:"false"})," by default and ",e.jsx(n.code,{children:"Object"})," is always ",e.jsx(n.code,{children:"{}"})," by default, so ",e.jsx(n.code,{children:"defaultValue"})," is not allowed for these types."]}),`
`,e.jsxs(n.p,{children:["You can also create custom property types by extending ",e.jsx(n.code,{children:"@ui5/webcomponents-base/dist/DataType.js"})," and implementing its methods for your type."]}),`
`,e.jsxs(n.h4,{id:"properties-with-multiple-true",children:["Properties With ",e.jsx(n.code,{children:"multiple: true"})]}),`
`,e.jsxs(n.p,{children:["If you configure a property with ",e.jsx(n.code,{children:"multiple: true"}),", it will be an array of elements of the given ",e.jsx(n.code,{children:"type"}),`, and will be treated by the framework exactly as
a property of type `,e.jsx(n.code,{children:"Object"})," would be (as arrays are technically objects). For example, it will not have an attribute counterpart."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`metadata: {
	properties: {
		numbers: {
			type: Integer,
			multiple: true
		}
	}
}
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`myComponent.numbers = [1, 2, 3];
`})}),`
`,e.jsxs(n.p,{children:["Properties with ",e.jsx(n.code,{children:"multiple: true"}),` are rarely used in practice, as they are not DOM-friendly (cannot be set in a declarative way, only with Javascript).
Their most common use case is as `,e.jsx(n.em,{children:"private"}),` properties for communication between related components. For example, the higher-order "date picker" component
communicates with its "day picker", "month picker", and "year picker" parts by means of private `,e.jsx(n.code,{children:"multiple"})," properties (to pass arrays of selected dates)."]}),`
`,e.jsxs(n.p,{children:["If you need to use a property with ",e.jsx(n.code,{children:"multiple: true"}),` as part of your component's public API, that is fine but bear in mind the limitations
(no declarative support as with all Objects, so no attribute for this property).`]}),`
`,e.jsxs(n.p,{children:["The alternative would be to use ",e.jsx(n.em,{children:"abstract"})," items, for example:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<my-component>
	<my-item slot="numbers" value="1"></my-item>
	<my-item slot="numbers" value="2"></my-item>
	<my-item slot="numbers" value="3"></my-item>
</my-component>
`})}),`
`,e.jsxs(n.p,{children:["Here instead of having a ",e.jsx(n.code,{children:"numbers"})," property of type ",e.jsx(n.code,{children:"Integer"})," configured with ",e.jsx(n.code,{children:"multiple: true"}),", we have a ",e.jsx(n.code,{children:"numbers"}),` slot, and inside this slot we pass abstract items with
a `,e.jsx(n.code,{children:"value"})," property of type ",e.jsx(n.code,{children:"Integer"}),`. This is now completely declarative, and is preferable unless the number of items is very large (in which case the
solution with the multiple property would likely be better).`]}),`
`,e.jsx(n.h4,{id:"examples",children:"Examples"}),`
`,e.jsx(n.p,{children:"Example of defining properties:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
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
`})}),`
`,e.jsxs(n.p,{children:["Here ",e.jsx(n.code,{children:"text"}),", ",e.jsx(n.code,{children:"width"}),", ",e.jsx(n.code,{children:"scale"})," and ",e.jsx(n.code,{children:"data"})," are public properties, and ",e.jsx(n.code,{children:"_isPhone"})," private, but only by convention. If the user (or the component internally) changes any of these properties, the component will be invalidated."]}),`
`,e.jsx(n.h4,{id:"best-practices-for-using-properties",children:"Best Practices for Using Properties"}),`
`,e.jsxs(n.p,{children:["The best practice is to ",e.jsx(n.strong,{children:"never"})," change public properties from within the component (they are owned by the application) unless the property changes due to user interaction (for example, the user typed in an input - so you change the ",e.jsx(n.code,{children:"value"})," property; or the user clicked a checkbox - and you flip the ",e.jsx(n.code,{children:"checked"}),` property). It is also
a best practice to always `,e.jsx(n.strong,{children:"fire an event"})," if you change a public property due to user interaction, to let the application know and synchronize its own state."]}),`
`,e.jsxs(n.p,{children:["As for private properties, the best practice is to ",e.jsx(n.strong,{children:"only"})," change them internally and never let the application know about their existence."]}),`
`,e.jsxs(n.p,{children:["Both public and private properties are great ways to create CSS selectors for your component with the ",e.jsx(n.code,{children:":host()"})," selector. The ",e.jsx(n.code,{children:":host()"})," selector targets the custom element itself, and can be combined with other selectors:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`:host {
	height: 5rem;
	width: 5rem;
}

:host([size="XS"]) {
	height: 2rem;
	width: 2rem;
}
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<my-comopnent size="XS"></my-comopnent> <!-- :host() targets my-component -->
`})}),`
`,e.jsxs(n.p,{children:["Here for example, if the ",e.jsx(n.code,{children:"size"})," property (respectively the attribute with the same name) is set to ",e.jsx(n.code,{children:"XS"}),", the component dimensions will be changed from ",e.jsx(n.code,{children:"5rem"})," to ",e.jsx(n.code,{children:"2rem"}),`.
Using attribute selectors is the best practice as you don't have to set CSS classes on your component - you can write CSS selectors with `,e.jsx(n.code,{children:":host()"})," by attribute."]}),`
`,e.jsx(n.h4,{id:"metadata-properties-vs-normal-js-properties",children:"Metadata Properties vs Normal JS Properties"}),`
`,e.jsx(n.p,{children:`It is important not to confuse metadata-defined properties with regular Javascript properties.
You can create any number of properties on your component's instance, for example`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`constructor() {
	super();
	this._isMobile = false;
}
`})}),`
`,e.jsx(n.p,{children:`However, only metadata-defined properties are managed by the framework: cause invalidation and are converted to/from attributes.
Feel free to create as many regular JS properties for the purpose of your component's functionality as you need, but bear in mind
that they will not be managed by the framework.`}),`
`,e.jsxs(n.h3,{id:"slots-",children:["Slots ",e.jsx("a",{name:"metadata_slots"})]}),`
`,e.jsxs(n.p,{children:["While ",e.jsx(n.em,{children:"properties"})," define the objective characteristics of a component, ",e.jsx(n.em,{children:"slots"}),` define the way a component can nest other HTML elements.
You don't need to define slots for every component - some components are not meant to hold any other HTML elements, and are fully operated by properties and events alone.`]}),`
`,e.jsxs(n.p,{children:["You implement slots by configuring them with the ",e.jsx(n.code,{children:"slots"})," metadata object, and rendering respective ",e.jsx(n.code,{children:"<slot>"})," elements in your ",e.jsx(n.code,{children:".hbs"})," template."]}),`
`,e.jsxs(n.p,{children:["You can read more about the ",e.jsx(n.code,{children:"slot"})," HTML element ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot",target:"_blank",rel:"nofollow noopener noreferrer",children:"here"}),"."]}),`
`,e.jsx(n.h4,{id:"default-slot-and-named-slots",children:"Default Slot and Named Slots"}),`
`,e.jsxs(n.p,{children:["For ",e.jsx(n.em,{children:"named"})," slots you set the name you wish to use for the slot as the key in the ",e.jsx(n.code,{children:"slots"})," metadata object."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`slots: {
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
`})}),`
`,e.jsxs(n.p,{children:["and then in your ",e.jsx(n.code,{children:".hbs"})," template you render respectively ",e.jsx(n.code,{children:'<slot name="items"></slot>'})," and ",e.jsx(n.code,{children:'<slot name="footer"></slot>'}),"."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.em,{children:"default"})," slot on the other hand must be defined with the ",e.jsx(n.code,{children:"default"})," key in the ",e.jsx(n.code,{children:"slots"})," metadata object (also note the quotes around the ",e.jsx(n.code,{children:"default"})," key as it is a reserved word):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`slots: {
	"default": {
		type: Node,
	}
}
`})}),`
`,e.jsxs(n.p,{children:["and then in the ",e.jsx(n.code,{children:".hbs"})," template you render ",e.jsx(n.code,{children:"<slot></slot>"}),"."]}),`
`,e.jsx(n.h4,{id:"slot-types",children:"Slot Types"}),`
`,e.jsxs(n.p,{children:["Unlike properties, slots can be of only two types: ",e.jsx(n.code,{children:"HTMLElement"})," and ",e.jsx(n.code,{children:"Node"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"HTMLElement"})," means the slot accepts only other HTML elements. You can use this type for any slot (default or named)."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"Node"})," means that the slot can accept both HTML elements and text nodes, and is allowed only for the ",e.jsx(n.code,{children:"default"}),` slot.
The reason for this restriction is that text nodes in HTML cannot have attributes, hence they cannot be slotted as HTML elements can.
As a result, text can only go the default slot, hence `,e.jsx(n.code,{children:"Node"})," is applicable only for default slots."]}),`
`,e.jsx(n.h4,{id:"are-slots-a-managed-state",children:"Are slots a managed state?"}),`
`,e.jsxs(n.p,{children:["Unlike metadata ",e.jsx(n.em,{children:"properties"}),", which are always a managed state (see the previous section), ",e.jsx(n.em,{children:"slots"}),` are not managed by the framework by default.
Changes to slots do not trigger lifecycle events such as invalidation.`]}),`
`,e.jsxs(n.p,{children:["However, you can change this by setting ",e.jsx(n.code,{children:"managedSlots: true"})," in the ",e.jsx(n.code,{children:"metadata"})," object. This setting is global and affects all slots for your component."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`managedSlots: true,
slots:	{
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
`})}),`
`,e.jsx(n.p,{children:"Now, if children are added/removed/rearranged in any of the above slots, the component will be invalidated."}),`
`,e.jsx(n.h4,{id:"slot-accessors",children:"Slot Accessors"}),`
`,e.jsxs(n.p,{children:["Additionally, when you set ",e.jsx(n.code,{children:"managedSlots: true"}),", you get a ",e.jsx(n.strong,{children:"read-only"})," accessor for the children in that slot."]}),`
`,e.jsx(n.p,{children:"Taking the example from above"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`managedSlots: true,
slots:	{
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
`})}),`
`,e.jsx(n.p,{children:"you will get the following accessors on your component's instances:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const childrenInItems = this.items; // array of all children in the items slot
const childrenInFooter = this.footer; // array of all children in the footer slot
`})}),`
`,e.jsxs(n.p,{children:["Finally, it's possible to define the property name for the accessor of the ",e.jsx(n.em,{children:"default"})," slot (as using the ",e.jsx(n.code,{children:"default"}),` key is not convenient in Javascript).
You can do this with the `,e.jsx(n.code,{children:"propertyName"})," setting:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`managedSlots: true,
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

`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const childrenInDefaultSlot = this.content; // array of all children in the default slot
const childrenInItems = this.items; // array of all children in the items slot
const childrenInFooter = this.footer; // array of all children in the footer slot
`})}),`
`,e.jsxs(n.p,{children:["These getters are helpful if your code needs to analyze/communicate with the children in a certain slot. They are also often used in the ",e.jsx(n.code,{children:".hbs"}),`
template where you need, for example, to loop over the items of a component.`]}),`
`,e.jsx(n.h4,{id:"individual-slots",children:"Individual Slots"}),`
`,e.jsxs(n.p,{children:["All children, assigned to a certain ",e.jsx(n.code,{children:"slot"}),`, are rendered by the browser next to each other in the exact order in which they were passed to the component.
Sometimes, however, each child must be placed separately in the shadow root, potentially wrapped in other HTML elements, to satisfy the UX design of the component.`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"individualSlots"})," slot metadata configuration setting (see ",e.jsx(n.a,{href:"./?path=/docs/docs-development-understanding-components-metadata--docs",children:"Understanding UI5 Web Components Metadata"}),") allows you to have a separate physical slot for each child belonging to a certain slot."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`{
	managedSlots: true,
	slots: {
		"default": {
			type: HTMLElement,
			propertyName: "items",
			individualSlots: true
		}
	}
}
`})}),`
`,e.jsxs(n.p,{children:["The framework will then create an ",e.jsx(n.code,{children:"_individualSlot"})," property on each child, belonging to the slot. Just render these slots in the ",e.jsx(n.code,{children:".hbs"}),` template
to have all children belonging to the slot displayed by the browser separately in your HTML markup of choice.`]}),`
`,e.jsxs(n.p,{children:["For more information on individual slots and how to render them in the ",e.jsx(n.code,{children:".hbs"})," template click ",e.jsx(n.a,{href:"./?path=/docs/docs-development-understanding-hbs-templates.md#slots_individual--docs",children:"here"}),"."]}),`
`,e.jsx(n.h4,{id:"the-invalidateonchildchange-setting",children:"The invalidateOnChildChange Setting"}),`
`,e.jsxs(n.p,{children:["There is one last configuration setting for slots - ",e.jsx(n.code,{children:"invalidateOnChildChange"}),". When set to ",e.jsx(n.code,{children:"true"}),`, whenever a child in a certain slot is invalidated,
your component will be invalidated as well.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`managedSlots: true,
slots: {
	"default": {
		type: HTMLElement,
		propertyName: "items",
		invalidateOnChildChange: true
	},
}
`})}),`
`,e.jsx(n.p,{children:`Now, the component will be invalidated not only when children are added/removed/rearranged, but also when children themselves change. This is very handy
for components working with abstract items.`}),`
`,e.jsxs(n.p,{children:["Read more about abstract items and ",e.jsx(n.code,{children:"invalidateOnChildChange"})," in the ",e.jsx(n.a,{href:"#invalidation",children:"Invalidation"})," section later in this article."]}),`
`,e.jsxs(n.h3,{id:"events-",children:["Events ",e.jsx("a",{name:"metadata_events"})]}),`
`,e.jsxs(n.p,{children:["Most components fire ",e.jsx(n.em,{children:"events"})," to notify the application of user interaction."]}),`
`,e.jsxs(n.p,{children:["You can list the events fired by your component in the ",e.jsx(n.code,{children:"events"}),` metadata object, but this is optional and mostly done for documentation purposes.
Any event that you dispatch from your component will reach the application anyway.`]}),`
`,e.jsx(n.p,{children:"Here is an example how to fire an event from your component:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Declare the event in your ",e.jsx(n.code,{children:"metadata"})," (optional, but highly recommended for documentation purposes and clarity):"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`events: {
	toggle: {}
}
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["In the ",e.jsx(n.code,{children:".hbs"})," template, bind an event listener to some part of your component's HTML to be able to take action on user interaction:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div class="my-panel">
	<button class="my-panel-toggle" @click="{{onPanelToggleClick}}">Toggle</button>
	<div class="my-panel-body">
		<slot></slot>
	</div>
</div>
`})}),`
`,e.jsxs(n.p,{children:[`In this example we have a simplified "panel" component consisting of a toggle button and a slot for the panel content.
We bind the `,e.jsx(n.code,{children:"click"})," event of the ",e.jsx(n.code,{children:"<button>"})," we'll use for toggling our panel to the ",e.jsx(n.code,{children:"onPanelToggleClick"})," method."]}),`
`,e.jsxs(n.p,{children:["For more on the ",e.jsx(n.code,{children:".hbs"})," template syntax and event listeners click ",e.jsx(n.a,{href:"./?path=/docs/docs-development-understanding-hbs-templates.md#syntax_at--docs",children:"here"}),"."]}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Implement the event handler in your component:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`class MyPanel extends UI5Element {
	...
	
	onPanelToggleClick(event) {
		this.togglePanel(); // do some work when the user clicks the button
		this.fireEvent("toggle"); // fire the event
	}
}
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"fireEvent"})," method is provided by the base ",e.jsx(n.code,{children:"UI5Element.js"}),` class and is therefore available to all components. The best practice is to always use
this method instead of simply calling the standard `,e.jsx(n.code,{children:"dispatchEvent"})," function as ",e.jsx(n.code,{children:"fireEvent"})," has framework-related enhanced functionality."]}),`
`,e.jsxs(n.p,{children:["That's all it takes to manage an event lifecycle! Now, your component users may listen for the ",e.jsx(n.code,{children:"toggle"})," event:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const panel = document.getElementsByTagName("my-panel")[0];
panel.addEventListener("toggle", () => {});
`})}),`
`,e.jsx(n.h4,{id:"working-with-event-parameters",children:"Working With Event Parameters"}),`
`,e.jsx(n.p,{children:"The above example demonstrated an event with no parameters. However, you can send arbitrary data to the app when firing an event."}),`
`,e.jsx(n.p,{children:"Here's how:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Declare the event in your ",e.jsx(n.code,{children:"metadata"})," and describe its parameters (again, optional, but good for consistency and documentation purposes):"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`events: {
	selectionChange: {
		detail: {
			item: { type: HTMLElement },
			oldItem: { type: HTMLElement }
		}
	}
}
`})}),`
`,e.jsxs(n.p,{children:["Here we define a ",e.jsx(n.code,{children:"selectionChange"})," event which gives the app two pieces of information: ",e.jsx(n.code,{children:"item"})," (the newly selected item) and ",e.jsx(n.code,{children:"oldItem"}),` (the previously selected item).
Respectively, they will be accessible by the app with `,e.jsx(n.code,{children:"event.detail.item"})," and ",e.jsx(n.code,{children:"event.detail.oldItem"})," in the event handler, exactly like it works with native browser events."]}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"Pass the data when firing the event:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`class MyItemsList extends UI5Element {
	...
	
	onSelectionChange(event) {
		...
		
		this.fireEvent("selectionChange", {
			item: item,
			oldItem: oldItem,
		});
	}
}
`})}),`
`,e.jsxs(n.p,{children:["To pass parameters, simply provide a second parameter of type ",e.jsx(n.code,{children:"Object"})," to ",e.jsx(n.code,{children:"fireEvent"})," with keys for all event parameters."]}),`
`,e.jsx(n.p,{children:"The usage of the event by the app will be exactly like in the case of a native HTML element:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const list = document.getElementsByTagName("my-items-list")[0];
list.addEventListener("selectionChange", (event) => {
	console.log(event.detail.item);
	console.log(event.detail.oldItem);
});
`})}),`
`,e.jsx(n.h4,{id:"events-and-noconflict-mode",children:"Events and noConflict Mode"}),`
`,e.jsxs(n.p,{children:["By default, when using the ",e.jsx(n.code,{children:"fireEvent"})," method, as demonstrated above, actually not just one, but two custom events are fired: one with the name provided as the first argument to ",e.jsx(n.code,{children:"fireEvent"}),`,
and one more with the same name but prefixed by `,e.jsx(n.code,{children:"ui5-"}),"."]}),`
`,e.jsx(n.p,{children:"For example, the following code"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`fireEvent("toggle");
`})}),`
`,e.jsxs(n.p,{children:["will dispatch two ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events",target:"_blank",rel:"nofollow noopener noreferrer",children:"custom events"})," by default:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"toggle"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"ui5-toggle"})}),`
`]}),`
`,e.jsxs(n.p,{children:["However, if you set the ",e.jsx(n.a,{href:"./?path=/docs/docs-advanced-configuration.md#no_conflict--docs",children:"noConflict"})," configuration setting to ",e.jsx(n.code,{children:"true"}),", only the ",e.jsx(n.strong,{children:"prefixed"})," event will be dispatched."]}),`
`,e.jsxs(n.p,{children:["So, when ",e.jsx(n.code,{children:"noConflict: true"})," is configured, the same code"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`fireEvent("toggle");
`})}),`
`,e.jsx(n.p,{children:"would result in just"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"ui5-toggle"})}),`
`]}),`
`,e.jsxs(n.p,{children:["Therefore, the best practice when binding to events ",e.jsx(n.strong,{children:"fired by other UI5 Web Components"})," in your ",e.jsx(n.code,{children:".hbs"}),` template, is to
always use the prefixed (`,e.jsx(n.code,{children:"ui5-"}),") event."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div class="my-component">
	<button @click="{{onNativeButtonClick}}">Click me</button>
	<ui5-button @ui5-click="{{onUI5ButtonClick}}">Click me</ui5-button>
	
	<input @change="{{onNativeInputChange}}" />
	<ui5-input @ui5-change="{{onUI5InputChange}}"></ui5-input>
	
	<ui5-list @ui5-item-click="{{onUI5ListItemClick}}"></ui5-list>
</div>
`})}),`
`,e.jsx(n.p,{children:"Please note the following:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For native HTML elements (",e.jsx(n.code,{children:"input"}),", ",e.jsx(n.code,{children:"button"}),") we bind to their respective events (",e.jsx(n.code,{children:"change"}),", ",e.jsx(n.code,{children:"click"}),") normally."]}),`
`,e.jsxs(n.li,{children:["For other UI5 Web Components (",e.jsx(n.code,{children:"ui5-button"}),", ",e.jsx(n.code,{children:"ui5-input"}),", ",e.jsx(n.code,{children:"ui5-list"}),"), rendered by our component, we bind to the ",e.jsx(n.code,{children:"ui5-"})," events as these are guaranteed to be dispatched even when ",e.jsx(n.code,{children:"noConflict"})," is configured to ",e.jsx(n.code,{children:"true"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"If we used the non-prefixed versions:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div class="my-component">
	<button @click="{{onNativeButtonClick}}">Click me</button>
	<ui5-button @click="{{onUI5ButtonClick}}">Click me</ui5-button>
	
	<input @change="{{onNativeInputChange}}" />
	<ui5-input @change="{{onUI5InputChange}}"></ui5-input>
	
	<ui5-list @item-click="{{onUI5ListItemClick}}"></ui5-list>
</div>
`})}),`
`,e.jsxs(n.p,{children:["this would work well only with the default configuration (where ",e.jsx(n.code,{children:"noConflict"})," is ",e.jsx(n.code,{children:"false"}),` and both events are fired), but our code would
"break" the moment an app sets `,e.jsx(n.code,{children:"noConflict: true"}),` since that would suppress UI5 Web Components from firing the non-prefixed versions and
our event handlers (`,e.jsx(n.code,{children:"onUI5ButtonClick"}),", ",e.jsx(n.code,{children:"onUI5InputChange"}),", etc.) would never be executed."]}),`
`,e.jsxs(n.h3,{id:"wrapping-up-metadata-",children:["Wrapping up Metadata ",e.jsx("a",{name:"metadata_wrapping_up"})]}),`
`,e.jsx(n.p,{children:"Metadata determines most of your component's API - describe its tag name, properties, slots and events there."}),`
`,e.jsx(n.p,{children:"For example, consider a component with the following metadata:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`{
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
`})}),`
`,e.jsx(n.p,{children:"This metadata conveys the following:"}),`
`,e.jsx(n.p,{children:"This component will have the following getters/setters, created for it by the framework:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"this.text"})," (getter/setter, due to the ",e.jsx(n.code,{children:"text"}),' property) with default value of "Hello";']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"this.selected"})," (getter/setter, due to the ",e.jsx(n.code,{children:"selected"})," property) with default value of ",e.jsx(n.code,{children:"false"})," (all Booleans are ",e.jsx(n.code,{children:"false"})," by default in HTML and ",e.jsx(n.code,{children:"defaultValue"})," cannot be configured for them);"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"this.items"})," (getter only, due to having ",e.jsx(n.code,{children:"managedSlots: true"})," and the ",e.jsx(n.code,{children:"propertyName"})," of the default slot being ",e.jsx(n.code,{children:"items"}),") - an array of all ",e.jsx(n.em,{children:"Text Nodes and HTML Elements"})," in the default slot;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"this.icon"})," (getter only, due to having ",e.jsx(n.code,{children:"managedSlots: true"})," and the ",e.jsx(n.code,{children:"icon"})," slot) - an array of all HTML elements in the ",e.jsx(n.code,{children:"icon"})," slot."]}),`
`]}),`
`,e.jsx(n.p,{children:"The component will have only 1 attribute:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"text"})," due to the ",e.jsx(n.code,{children:"text"})," property (the other property has ",e.jsx(n.code,{children:"noAttribute: true"})," set)."]}),`
`]}),`
`,e.jsxs(n.p,{children:["When the ",e.jsx(n.code,{children:"text"})," property changes, the ",e.jsx(n.code,{children:"text"})," attribute will also be reflected and vice-versa."]}),`
`,e.jsx(n.p,{children:"The component fires 1 event:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"change"})," with one string parameter: ",e.jsx(n.code,{children:"newText"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:["This component will be invalidated whenever any of its properties changes, any of its slots has new/removed/rearranged children, and additionally when any UI5 Web Component in the ",e.jsx(n.code,{children:"default"})," slot is invalidated."]}),`
`,e.jsxs(n.p,{children:["In this component's ",e.jsx(n.code,{children:".hbs"})," you are expected to render the two slots and to bind an event listener for the event"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div class="my-demo-component">
	<header>
		<slot name="icon"></slot>
		<input class="demo-input" value="{{text}}" @change="{{onInputChange}}">
	</header>
	<div>
		<slot></slot>
	</div>
</div>
`})}),`
`,e.jsx(n.p,{children:"and in the component class you are expected to fire the event, for example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`class MyDemoComponent extends HTMLElement {
	...
	onInputChange(event) {
		const newText = this.shadowRoot.querySelector(".demo-input").value;
		this.text = newText;
		event.stopPropagation();
		this.fireEvent("change", { newText });
	}
}
`})}),`
`,e.jsxs(n.p,{children:["Whenever the user stops typing in the ",e.jsx(n.code,{children:"<input>"})," and its ",e.jsx(n.code,{children:"change"})," event is fired, our component ",e.jsx(n.code,{children:"onInputChange"}),` event handler will be executed.
There we get the new value of the input, update the `,e.jsx(n.code,{children:"text"})," metadata property to reflect its new state, stop the input's native ",e.jsx(n.code,{children:"change"}),` event from propagating since we'll be firing our custom event
with the same name (and we don't want the user to get 2 events with the same name), and finally we fire our metadata event (`,e.jsx(n.code,{children:"change"}),") with the ",e.jsx(n.code,{children:"newText"})," parameter."]}),`
`,e.jsxs(n.h2,{id:"understanding-rendering-",children:["Understanding Rendering ",e.jsx("a",{name:"rendering"})]}),`
`,e.jsxs(n.h3,{id:"what-is-rendering-",children:["What is rendering? ",e.jsx("a",{name:"rendering_def"})]}),`
`,e.jsxs(n.p,{children:["In the context of UI5 Web Components, the notion of ",e.jsx(n.strong,{children:"rendering"})," means ",e.jsx(n.strong,{children:"creating the content of a shadow root"})," (building the shadow DOM)."]}),`
`,e.jsxs(n.h3,{id:"physical-and-logical-components-",children:["Physical and Logical Components ",e.jsx("a",{name:"rendering_physical_logical"})]}),`
`,e.jsxs(n.p,{children:["Each component that provides a ",e.jsx(n.code,{children:"static get template()"})," method will be rendered (will have its shadow DOM built) initially and every time it gets invalidated."]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import InputTemplate from "./generated/templates/InputTemplate.lit.js"; // this is the compiled Input.hbs template

// This component will have shadow DOM since it provides a template
static get template() {
	return InputTemplate;
}
`})}),`
`,e.jsxs(n.p,{children:["Components that do not provide a ",e.jsx(n.code,{children:"static get template()"})," method are considered ",e.jsx(n.em,{children:"logical"})," or ",e.jsx(n.em,{children:"marker"}),` elements only. These components are never rendered (do not have a shadow root at all)
and their only purpose is to serve as items for higher-order components. The classical example of a logical component is a select option.`]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-select>
	<ui5-option>Cozy</ui5-option>
	<ui5-option selected>Compact</ui5-option>
	<ui5-option >Condensed</ui5-option>
</ui5-select>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ui5-option"})," component does not provide a template, and is therefore never rendered. However, the ",e.jsx(n.code,{children:"ui5-select"}),` component, which is a physical component that has a template,
renders HTML corresponding to each of its children (`,e.jsx(n.code,{children:"ui5-option"})," instances) as part of its own shadow DOM."]}),`
`,e.jsxs(n.h3,{id:"what-is-invalidation-",children:["What is invalidation? ",e.jsx("a",{name:"invalidation"})]}),`
`,e.jsx(n.p,{children:`Invalidation means scheduling an already rendered component for asynchronous re-rendering (in the next animation frame). If an already invalidated component gets changed
again, before having been re-rendered, this will have no downside - it's in the queue of components to be re-rendered anyway.`}),`
`,e.jsx(n.p,{children:"Important: when a component is re-rendered, only the parts of its shadow DOM, dependent on the changed properties/slots are changed, which makes most updates very fast."}),`
`,e.jsxs(n.p,{children:["A component becomes ",e.jsx(n.em,{children:"invalidated"})," whenever:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["a ",e.jsx(n.em,{children:"metadata-defined"})," ",e.jsx(n.strong,{children:"property"})," changes (not regular properties that, for example, you define in the constructor);"]}),`
`,e.jsxs(n.li,{children:["children are added/removed/rearranged in any ",e.jsx(n.strong,{children:"slot"})," and the component has ",e.jsx(n.code,{children:"managedSlots: true"})," set in the metadata object;"]}),`
`,e.jsxs(n.li,{children:["a slotted child in a ",e.jsx(n.strong,{children:"slot"})," configured with ",e.jsx(n.code,{children:"invalidateOnChildChange: true"})," is invalidated."]}),`
`]}),`
`,e.jsx(n.p,{children:"Changes to properties always cause an invalidation. No specific metadata configuration is needed."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`properties: {
	text: {
		type: String
	}
}
`})}),`
`,e.jsxs(n.p,{children:["Whenever ",e.jsx(n.code,{children:"text"})," changes, the component will be invalidated."]}),`
`,e.jsx(n.p,{children:`Changes to slots do not cause an invalidation by default. Most components do not need to render differently based on whether they have any slotted children or not.
The most common example for this are simple general-purpose containers (completely agnostic of their content).`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`metadata: {
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
`})}),`
`,e.jsx(n.p,{children:"This component will not invalidate when children are added/removed from any of its slots."}),`
`,e.jsxs(n.p,{children:[`However, some components render differently based on whether they have children or not (e.g. show counters/other UX elements for the number of children, f.e. carousel; or have special styles when empty or have a child in a specific slot, f.e. button with an icon).
If that is the case for the component you're building, set `,e.jsx(n.code,{children:"managedSlots: true"})," in your component's metadata. Thus, your component will become invalidated whenever children are added, removed or swap places in any of its slots."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`managedSlots: true,
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
`})}),`
`,e.jsxs(n.p,{children:["Now that this component has ",e.jsx(n.code,{children:"managedSlots: true"}),", changes to each slot will trigger an invalidation. Note that the ",e.jsx(n.code,{children:"managedSlots"})," configuration is global (and not per slot)."]}),`
`,e.jsx(n.p,{children:`And finally, there are components that not only need to render differently based on the number/type of children they have, but they must also get invalidated
whenever their children change. This holds true for all components that work with abstract items (such as select with options, combo box with combo box items)
because these abstract items do not have a template (do not render themselves) and therefore rely on their parent to render some DOM for them in its own shadow root. So, when they get invalidated, they must also invalidate their parent.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`managedSlots: true,
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
`})}),`
`,e.jsxs(n.p,{children:['Only changes to children in the "default" slot will trigger invalidation for this component. Note that ',e.jsx(n.code,{children:"invalidateOnChildChange"})," is defined per slot (and not globally like ",e.jsx(n.code,{children:"managedSlots"}),`).
Finally, `,e.jsx(n.code,{children:"invalidateOnChildChange"})," allows for more fine-granular rules when exactly children can invalidate their parents - see ",e.jsx(n.a,{href:"./?path=/docs/docs-development-understanding-components-metadata--docs",children:"Understanding UI5 Web Components Metadata"}),"."]}),`
`,e.jsxs(n.h2,{id:"lifecycle-hooks-",children:["Lifecycle Hooks ",e.jsx("a",{name:"lifecycle"})]}),`
`,e.jsx(n.p,{children:"Using the right lifecycle hook for the task is crucial to a well-designed and performant component."}),`
`,e.jsxs(n.h3,{id:"constructor-",children:[e.jsx(n.code,{children:"constructor"})," ",e.jsx("a",{name:"lifecycle_constructor"})]}),`
`,e.jsx(n.p,{children:"Use the constructor for one-time initialization tasks."}),`
`,e.jsx(n.p,{children:"What to do:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"initialize private variables;"}),`
`,e.jsxs(n.li,{children:["bind functions to ",e.jsx(n.code,{children:"this"})," (very common when using the ",e.jsx(n.code,{children:"ResizeHandler"})," helper class);"]}),`
`,e.jsxs(n.li,{children:["do one-time work when the first instance of a given component is created (for example, instantiate a helper class or attach a special event listener to the ",e.jsx(n.code,{children:"window"})," object)."]}),`
`]}),`
`,e.jsx(n.p,{children:"What not to do:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["anything rendering-related (use ",e.jsx(n.code,{children:"onBeforeRendering"}),"/",e.jsx(n.code,{children:"onAfterRendering"}),");"]}),`
`,e.jsxs(n.li,{children:["anything related to the state (use ",e.jsx(n.code,{children:"onBeforeRendering"}),");"]}),`
`,e.jsxs(n.li,{children:["anything requiring DOM manipulation (the component isn't attached to the DOM yet - use ",e.jsx(n.code,{children:"onAfterRendering"})," or ",e.jsx(n.code,{children:"onEnterDOM"}),"/",e.jsx(n.code,{children:"onExitDOM"}),")."]}),`
`]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`constructor() {
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
`})}),`
`,e.jsxs(n.h3,{id:"onbeforerendering-",children:[e.jsx(n.code,{children:"onBeforeRendering"})," ",e.jsx("a",{name:"lifecycle_before"})]}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"onBeforeRendering"})," to prepare variables to be used in the ",e.jsx(n.code,{children:".hbs"})," template."]}),`
`,e.jsx(n.p,{children:"What to do:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"prepare calculated (derived) state for use in the renderer."}),`
`]}),`
`,e.jsx(n.p,{children:"What not to do:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["do not try to access the DOM (use ",e.jsx(n.code,{children:"onAfterRendering"})," instead)."]}),`
`]}),`
`,e.jsx(n.p,{children:"Let's take for example a component with the following metadata:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`{
	properties: {
		filter: {
			type: String
		}
	},
	managedSlots: true,
	slots: {
		"default": {
			type: HTMLElement,
			propertyName: "items",
			individualSlots: true
		}
	}
}
`})}),`
`,e.jsxs(n.p,{children:["This component has a ",e.jsx(n.code,{children:"filter"})," property and a ",e.jsx(n.code,{children:"default"})," slot that we want to call ",e.jsx(n.code,{children:"items"})," (thus accessible with ",e.jsx(n.code,{children:"this.items"}),")."]}),`
`,e.jsxs(n.p,{children:["Let's imagine we want to show only the items whose ",e.jsx(n.code,{children:"name"})," property matches the value of our ",e.jsx(n.code,{children:"filter"})," property - so we filter the items by name."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`constructor() {
	super();
	this._filteredItems = [];
}
onBeforeRendering() {
	this._filteredItems = this.items.filter(item => item.name.includes(this.filter));
}
`})}),`
`,e.jsxs(n.p,{children:["In ",e.jsx(n.code,{children:"onBeforeRendering"})," we prepare a ",e.jsx(n.code,{children:"_filteredItems"})," array with some of the component's children (only the ones that have the ",e.jsx(n.code,{children:"this.filter"})," text as part of their ",e.jsx(n.code,{children:"name"})," property)."]}),`
`,e.jsxs(n.p,{children:["And finally, in the ",e.jsx(n.code,{children:".hbs"})," template we have for example:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-handlebars",children:`<div class="my-filter-component">
	{{#each _filteredItems}}
		<div class="my-filtered-item">
			<slot name="{{_individualSlot}}"></slot>
		</div>
	{{/each}}
</div>
`})}),`
`,e.jsxs(n.p,{children:["We loop over the ",e.jsx(n.code,{children:"_fiteredItems"})," array that we prepared in ",e.jsx(n.code,{children:"onBeforeRendering"})," and for each child we render a ",e.jsx(n.code,{children:"slot"})," based on the child's ",e.jsx(n.code,{children:"_individualSlot"}),` property,
created automatically by the framework due to the default slot's metadata configuration (`,e.jsx(n.code,{children:"individualSlots: true"}),")."]}),`
`,e.jsx(n.p,{children:"The usage of this component would be, for example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<my-filter-component filter="John">
	<my-filter-item name="John Smith"></my-filter-item>
	<my-filter-item name="Jane Doe"></my-filter-item>
	<my-filter-item name="Jack Johnson"></my-filter-item>
</my-filter-component>
`})}),`
`,e.jsxs(n.p,{children:["The user would only see the first and third items as these are the only ones we rendered an individual slot for (the ones matching the ",e.jsx(n.code,{children:"filter"}),' value of "John").']}),`
`,e.jsxs(n.p,{children:["In summary: ",e.jsx(n.code,{children:"onBeforeRendering"})," is the best place to prepare all the variables you are going to need in the ",e.jsx(n.code,{children:".hbs"})," template."]}),`
`,e.jsxs(n.h3,{id:"onafterrendering-",children:[e.jsx(n.code,{children:"onAfterRendering"})," ",e.jsx("a",{name:"lifecycle_after"})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"onAfterRendering"})," lifecycle hook allows you to access the DOM every time the component is rendered."]}),`
`,e.jsx(n.p,{children:`You should avoid using this method whenever possible. It's best to delegate all HTML manipulation to the framework: change the state of the component,
the component will be invalidated, the template will be executed with the latest state, and the DOM will be updated accordingly.
It is an anti-pattern to manually change the DOM.`}),`
`,e.jsx(n.p,{children:"In some cases, however, you must directly access the DOM since certain operations can only be performed imperatively (and not via the template):"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"setting the focus;"}),`
`,e.jsx(n.li,{children:"manually scrolling an element to a certain position;"}),`
`,e.jsx(n.li,{children:"calling a public method on a DOM element (for example, to close a popup);"}),`
`,e.jsx(n.li,{children:"reading the sizes of DOM elements."}),`
`]}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div class="my-demo-component">
	<input id="first">
	<input id="second">
</div>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`onAfterRendering() {
	this.shadowRoot.querySelector("#second").focus();
	this._totalWidth = this.shadowRoot.querySelector("div.my-demo-component").offsetWidth;
}
`})}),`
`,e.jsxs(n.h3,{id:"4-onenterdom-and-onexitdom-",children:["4. ",e.jsx(n.code,{children:"onEnterDOM"})," and ",e.jsx(n.code,{children:"onExitDOM"})," ",e.jsx("a",{name:"lifecycle_dom"})]}),`
`,e.jsxs(n.p,{children:["Unlike ",e.jsx(n.code,{children:"onBeforeRendering"})," and ",e.jsx(n.code,{children:"onAfterRendering"}),`, which might sound like parts of the same flow but are used for completely separate tasks,
`,e.jsx(n.code,{children:"onEnterDOM"})," and ",e.jsx(n.code,{children:"onExitDOM"})," should almost always be used together. Hence, they are presented collectively in this article."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"onEnterDOM"})," is executed during the web component standard ",e.jsx(n.code,{children:"connectedCallback"})," method execution;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"onExitDOM"})," is executed during the web component standard ",e.jsx(n.code,{children:"disconnectedCallback"})," method execution."]}),`
`]}),`
`,e.jsxs(n.p,{children:["If you have prior experience with web component development, you could think of ",e.jsx(n.code,{children:"onEnterDOM"})," as ",e.jsx(n.code,{children:"connectedCallback"})," and of ",e.jsx(n.code,{children:"onExitDOM"})," as ",e.jsx(n.code,{children:"disconnectedCallback"}),"."]}),`
`,e.jsx(n.p,{children:"Note that these hooks are completely independent of the component's rendering lifecycle, and are solely related to its insertion and removal from the DOM."}),`
`,e.jsx(n.p,{children:"Normally, when a web component is created, for example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const b = document.createElement("ui5-button");
`})}),`
`,e.jsxs(n.p,{children:["it is already fully operational, although it isn't in the DOM yet. Therefore, you should use ",e.jsx(n.code,{children:"onEnterDOM"})," and ",e.jsx(n.code,{children:"onExitDOM"}),` only for functionality, related to
the component being in the DOM tree at all (and not to rendering, stying or anything related to the shadow root).`]}),`
`,e.jsx(n.p,{children:"Common use cases are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"registering/de-registering a ResizeHandler;"}),`
`,e.jsx(n.li,{children:"working with Intersection observer;"}),`
`,e.jsx(n.li,{children:"any work you want to carry out only if the component is in the DOM;"}),`
`]}),`
`,e.jsxs(n.p,{children:["Probably the best example of these hooks is the usage of the ",e.jsx(n.code,{children:"ResizeHandler"})," helper class."]}),`
`,e.jsxs(n.p,{children:["The component has a private ",e.jsx(n.code,{children:"_width"})," property, defined in its metadata:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`properties: {
	/**
	 * @private
	 */
	_width: {
		type: Integer
	}
}
`})}),`
`,e.jsx(n.p,{children:"and the following code in its class:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
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
				"max-width": \`\${this._width}px\`,
			},
		};
	}
}
`})}),`
`,e.jsxs(n.p,{children:["In the ",e.jsx(n.code,{children:"constructor"})," we bind the ",e.jsx(n.code,{children:"_onResize"}),` method to the component's instance to get a function with the correct context,
and then in `,e.jsx(n.code,{children:"onEnterDOM"})," and ",e.jsx(n.code,{children:"onExitDOM"})," we register/deregister this function with the ",e.jsx(n.code,{children:"ResizeHandler"})," helper class."]}),`
`,e.jsxs(n.p,{children:["Then, whenever the component resizes, the ",e.jsx(n.code,{children:"ResizeHandler"})," will trigger the callback, the metadata ",e.jsx(n.code,{children:"_width"})," property will be updated to a new value in ",e.jsx(n.code,{children:"_onResize"}),`,
the component will be invalidated, and the template will be executed with the new value of `,e.jsx(n.code,{children:"_width"}),", respectively ",e.jsx(n.code,{children:"styles"}),"."]}),`
`,e.jsx(r,{})]})}function f(t={}){const{wrapper:n}=Object.assign({},i(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(s,t)})):s(t)}export{f as default};
