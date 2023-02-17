import{j as e}from"./jsx-runtime.68de865e.js";import{M as i}from"./index.766d49cf.js";import{u as r}from"./index.59e09c5d.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function g(n={}){const{wrapper:s}=Object.assign({},r(),n.components);return s?e.exports.jsx(s,Object.assign({},n,{children:e.exports.jsx(o,{})})):o();function o(){const t=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",a:"a",code:"code",h2:"h2",ol:"ol",h3:"h3",pre:"pre",strong:"strong",h4:"h4",em:"em"},r(),n.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Development/Deep dive and best practices"}),`
`,e.exports.jsx(t.h1,{children:"Deep dive and best practices"}),`
`,e.exports.jsx(t.p,{children:"This tutorial will cover some finer details and best practices when designing and developing UI5 Web Components."}),`
`,e.exports.jsx(t.p,{children:"Before proceeding, please make sure you've read the other articles from this section, especially:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"./02-custom-UI5-Web-Components.md",children:"Developing Custom UI5 Web Components"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"./03-understanding-components-metadata.md",children:"Understanding UI5 Web Components Metadata"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsxs(t.a,{href:"./04-understanding-hbs-templates.md",children:["Understanding the Handlebars (",e.exports.jsx(t.code,{children:".hbs"}),") templates"]})}),`
`]}),`
`,e.exports.jsx(t.p,{children:"as this article will expand on many of the notions, introduced there."}),`
`,e.exports.jsx(t.h2,{children:"Table of contents"}),`
`,e.exports.jsxs(t.ol,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.a,{href:"#metadata",children:"Metadata deep dive"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#metadata_tag",children:"Tag"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#metadata_properties",children:"Properties"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#metadata_slots",children:"Slots"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#metadata_events",children:"Events"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#metadata_wrapping_up",children:"Wrapping up metadata"})}),`
`]}),`
`]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.a,{href:"#rendering",children:"Understanding rendering"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#rendering_def",children:"What is rendering?"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#rendering_physical_logical",children:"Physical and logical components"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#invalidation",children:"What is invalidation?"})}),`
`]}),`
`]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.a,{href:"#lifecycle",children:"Lifecycle hooks"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#lifecycle_constructor",children:e.exports.jsx(t.code,{children:"constructor"})})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#lifecycle_before",children:e.exports.jsx(t.code,{children:"onBeforeRendering"})})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#lifecycle_after",children:e.exports.jsx(t.code,{children:"onAfterRendering"})})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsxs(t.a,{href:"#lifecycle_dom",children:[e.exports.jsx(t.code,{children:"onEnterDOM"})," and ",e.exports.jsx(t.code,{children:"onExitDOM"})]})}),`
`]}),`
`]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.a,{href:"#static",children:"The static area"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#static_preface",children:"Preface"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#static_what_why",children:"What is the static area and why is it needed?"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#static_using",children:"Using the static area?"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"#static_accessing",children:"Accessing the static area item"})}),`
`]}),`
`]}),`
`]}),`
`,e.exports.jsxs(t.h2,{children:["Metadata deep dive ",e.exports.jsx("a",{name:"metadata"})]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"static get metadata()"})," method defines the public API of your component. Among other things, here you define:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:"the tag name"}),`
`,e.exports.jsx(t.li,{children:"what properties/attributes (and of what type) your component supports"}),`
`,e.exports.jsx(t.li,{children:"what slots your component supports"}),`
`,e.exports.jsx(t.li,{children:"what events your component fires"}),`
`]}),`
`,e.exports.jsxs(t.h3,{children:["Tag ",e.exports.jsx("a",{name:"metadata_tag"})]}),`
`,e.exports.jsxs(t.p,{children:["The tag name must include a ",e.exports.jsx(t.code,{children:"-"})," as required for any custom element:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`metadata: {
	tag: "my-component"
}
`})}),`
`,e.exports.jsx(t.p,{children:"and then the usage is:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<my-component></my-component>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"tag"}),", as defined in ",e.exports.jsx(t.code,{children:"metadata"}),`, is sometimes also referred to as the "pure tag", meaning it is not suffixed.
See `,e.exports.jsx(t.a,{href:"../2-advanced/03-scoping.md",children:"Scoping"})," for more on using a suffix with tag names."]}),`
`,e.exports.jsxs(t.p,{children:["Important: the pure tag name of every UI5 Web Component is always set as an ",e.exports.jsx(t.strong,{children:"attribute"})," to the component too."]}),`
`,e.exports.jsxs(t.p,{children:["For example, when you create a ",e.exports.jsx(t.code,{children:"ui5-button"}),":"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button id="b1" class="button1" design="Emphasized"></ui5-button>
`})}),`
`,e.exports.jsxs(t.p,{children:["the framework will create an empty attribute with the name ",e.exports.jsx(t.code,{children:"ui5-button"})," too, so the actual DOM would look like this:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button id="b1" class="button1" design="Emphasized" ui5-button></ui5-button>
`})}),`
`,e.exports.jsxs(t.p,{children:["Even if a suffix for tag names is configured (as described in ",e.exports.jsx(t.a,{href:"../2-advanced/03-scoping.md",children:"Scoping"}),`), the attribute with
the pure tag name will be the same.`]}),`
`,e.exports.jsxs(t.p,{children:["For example, if the configured suffix is ",e.exports.jsx(t.code,{children:"-demo"})," and all components are used with this suffix:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button-demo id="b1" class="button1" design="Emphasized" ui5-button></ui5-button-demo>
`})}),`
`,e.exports.jsxs(t.p,{children:["the ",e.exports.jsx(t.strong,{children:"attribute"})," will still be the same (",e.exports.jsx(t.code,{children:"ui5-button"})," as opposed to the tag name of ",e.exports.jsx(t.code,{children:"ui5-button-demo"}),")."]}),`
`,e.exports.jsx(t.p,{children:`Therefore, the best practice when developing UI5 Web Components is to write CSS selectors for the shadow roots using
attribute selectors, instead of tag selectors.`}),`
`,e.exports.jsxs(t.p,{children:["For example, if the ",e.exports.jsx(t.code,{children:"Demo.hbs"})," file looks like this:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<div class="my-component">
	<ui5-button id="openBtn">Open</ui5-button>
	<div>
		<slot></slot>
	</div>
	<ui5-list></ui5-list>
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["you should not write selectors by tag name for other components in the ",e.exports.jsx(t.code,{children:"Demo.css"})," file:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-css",children:`ui5-button {
	width: 50px;
}
`})}),`
`,e.exports.jsx(t.p,{children:"because, as stated above, the tag name could be suffixed and is not guaranteed to always be the same as the pure tag name."}),`
`,e.exports.jsx(t.p,{children:"Instead, use the attribute selector:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-css",children:`[ui5-button] {
	width: 50px;
}
`})}),`
`,e.exports.jsx(t.p,{children:"or another type of selector (for example by ID):"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-css",children:`#openBtn {
	width: 50px;
}
`})}),`
`,e.exports.jsxs(t.h3,{children:["Properties ",e.exports.jsx("a",{name:"metadata_properties"})]}),`
`,e.exports.jsx(t.h4,{children:"Properties are managed state"}),`
`,e.exports.jsx(t.p,{children:"The framework will create a getter/setter pair on your component's prototype for each property, defined in the metadata."}),`
`,e.exports.jsx(t.p,{children:"For example, after setting this metadata configuration:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`metadata: {
	properties: {
		text: {
			type: String
		}
	}
}
`})}),`
`,e.exports.jsxs(t.p,{children:["you can use the ",e.exports.jsx(t.code,{children:"text"})," getter/setter on this component's instances:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`let t = myComponent.text;
myComponent.text = "New text";
`})}),`
`,e.exports.jsxs(t.p,{children:["Whenever ",e.exports.jsx(t.code,{children:"text"})," is read or set, the framework-defined getter/setter will be called and thus the framework will be in control of the property."]}),`
`,e.exports.jsx(t.h4,{children:"Properties vs attributes"}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"properties"})," section defines both properties and attributes for your component. By default, for each property (",e.exports.jsx(t.code,{children:"camelCase"}),` name) an attribute with the
same name but in `,e.exports.jsx(t.code,{children:"kebab-case"})," is supported. Properties of type ",e.exports.jsx(t.code,{children:"Object"})," have no attribute counterparts. If you wish to not have an attribute for a given property regardless of type, you can configure it with ",e.exports.jsx(t.code,{children:"noAttribute: true"}),"."]}),`
`,e.exports.jsx(t.h4,{children:"Public vs private properties"}),`
`,e.exports.jsxs(t.p,{children:["The framework does not distinguish between ",e.exports.jsx(t.em,{children:"public"})," and ",e.exports.jsx(t.em,{children:"private"}),` properties. You can treat some properties as private in a sense that you can document them as such and not advertise them to users.
The usual convention is that private properties start with an `,e.exports.jsx(t.code,{children:"_"}),`, but this is not mandatory. In the end, all properties defined in the metadata, public or private,
are `,e.exports.jsx(t.em,{children:"component state"}),", therefore cause the component to be invalidated and subsequently re-rendered, when changed."]}),`
`,e.exports.jsx(t.h4,{children:"Property types and default values"}),`
`,e.exports.jsxs(t.p,{children:["The most common types of properties are ",e.exports.jsx(t.code,{children:"String"}),", ",e.exports.jsx(t.code,{children:"Boolean"}),", ",e.exports.jsx(t.code,{children:"Object"}),", ",e.exports.jsx(t.code,{children:"Integer"})," and ",e.exports.jsx(t.code,{children:"Float"}),". The last two are custom types, provided by the framework, that you must import (they do not exist in the browser)."]}),`
`,e.exports.jsxs(t.p,{children:["Most property types can have a ",e.exports.jsx(t.code,{children:"defaultValue"})," set. ",e.exports.jsx(t.code,{children:"Boolean"})," is always ",e.exports.jsx(t.code,{children:"false"})," by default and ",e.exports.jsx(t.code,{children:"Object"})," is always ",e.exports.jsx(t.code,{children:"{}"})," by default, so ",e.exports.jsx(t.code,{children:"defaultValue"})," is not allowed for these types."]}),`
`,e.exports.jsxs(t.p,{children:["You can also create custom property types by extending ",e.exports.jsx(t.code,{children:"@ui5/webcomponents-base/dist/DataType.js"})," and implementing its methods for your type."]}),`
`,e.exports.jsxs(t.h4,{children:["Properties with ",e.exports.jsx(t.code,{children:"multiple: true"})]}),`
`,e.exports.jsxs(t.p,{children:["If you configure a property with ",e.exports.jsx(t.code,{children:"multiple: true"}),", it will be an array of elements of the given ",e.exports.jsx(t.code,{children:"type"}),`, and will be treated by the framework exactly as
a property of type `,e.exports.jsx(t.code,{children:"Object"})," would be (as arrays are technically objects). For example, it will not have an attribute counterpart."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`metadata: {
	properties: {
		numbers: {
			type: Integer,
			multiple: true
		}
	}
}
`})}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`myComponent.numbers = [1, 2, 3];
`})}),`
`,e.exports.jsxs(t.p,{children:["Properties with ",e.exports.jsx(t.code,{children:"multiple: true"}),` are rarely used in practice, as they are not DOM-friendly (cannot be set in a declarative way, only with Javascript).
Their most common use case is as `,e.exports.jsx(t.em,{children:"private"}),` properties for communication between related components. For example, the higher-order "date picker" component
communicates with its "day picker", "month picker", and "year picker" parts by means of private `,e.exports.jsx(t.code,{children:"multiple"})," properties (to pass arrays of selected dates)."]}),`
`,e.exports.jsxs(t.p,{children:["If you need to use a property with ",e.exports.jsx(t.code,{children:"multiple: true"}),` as part of your component's public API, that is fine, but bear in mind the limitations
(no declarative support as with all Objects, so no attribute for this property).`]}),`
`,e.exports.jsxs(t.p,{children:["The alternative would be to use ",e.exports.jsx(t.em,{children:"abstract"})," items, for example:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<my-component>
	<my-item slot="numbers" value="1"></my-item>
	<my-item slot="numbers" value="2"></my-item>
	<my-item slot="numbers" value="3"></my-item>
</my-component>
`})}),`
`,e.exports.jsxs(t.p,{children:["Here instead of having a ",e.exports.jsx(t.code,{children:"numbers"})," property of type ",e.exports.jsx(t.code,{children:"Integer"}),", configured with ",e.exports.jsx(t.code,{children:"multiple: true"}),", we have a ",e.exports.jsx(t.code,{children:"numbers"}),` slot, and inside this slot we pass abstract items with
a `,e.exports.jsx(t.code,{children:"value"})," property of type ",e.exports.jsx(t.code,{children:"Integer"}),`. This is now completely declarative, and is preferable unless the number of items is very large (in which case the
solution with the multiple property would likely be better).`]}),`
`,e.exports.jsx(t.h4,{children:"Examples"}),`
`,e.exports.jsx(t.p,{children:"Example of defining properties:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
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
`,e.exports.jsxs(t.p,{children:["Here ",e.exports.jsx(t.code,{children:"text"}),", ",e.exports.jsx(t.code,{children:"width"}),", ",e.exports.jsx(t.code,{children:"scale"})," and ",e.exports.jsx(t.code,{children:"data"})," are public properties, and ",e.exports.jsx(t.code,{children:"_isPhone"})," private, but only by convention. If the user (or the component internally) changes any of these properties, the component will be invalidated."]}),`
`,e.exports.jsx(t.h4,{children:"Best practices for using properties"}),`
`,e.exports.jsxs(t.p,{children:["The best practice is to ",e.exports.jsx(t.strong,{children:"never"})," change public properties from within the component (they are owned by the application) unless the property changes due to user interaction (f.e. the user typed in an input - so you change the ",e.exports.jsx(t.code,{children:"value"})," property; or the user clicked a checkbox - and you flip the ",e.exports.jsx(t.code,{children:"checked"}),` property). It is also
a best practice to always `,e.exports.jsx(t.strong,{children:"fire an event"})," if you change a public property due to user interaction, to let the application know and synchronize its own state."]}),`
`,e.exports.jsxs(t.p,{children:["As for private properties, the best practice is to ",e.exports.jsx(t.strong,{children:"only"})," change them internally and never let the application know about their existence."]}),`
`,e.exports.jsxs(t.p,{children:["Both public and private properties are great ways to create CSS selectors for your component with the ",e.exports.jsx(t.code,{children:":host()"})," selector. The ",e.exports.jsx(t.code,{children:":host()"})," selector targets the custom element itself, and can be combined with other selectors:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-css",children:`:host {
	height: 5rem;
	width: 5rem;
}

:host([size="XS"]) {
	height: 2rem;
	width: 2rem;
}
`})}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<my-comopnent size="XS"></my-comopnent> <!-- :host() targets my-component -->
`})}),`
`,e.exports.jsxs(t.p,{children:["Here for example, if the ",e.exports.jsx(t.code,{children:"size"})," property (respectively the attribute with the same name) is set to ",e.exports.jsx(t.code,{children:"XS"}),", the component's dimensions will be changed from ",e.exports.jsx(t.code,{children:"5rem"})," to ",e.exports.jsx(t.code,{children:"2rem"}),`.
Using attribute selectors is the best practice as you don't have to set CSS classes on your component - you can write CSS selectors with `,e.exports.jsx(t.code,{children:":host()"})," by attribute."]}),`
`,e.exports.jsx(t.h4,{children:"Metadata properties vs normal JS properties"}),`
`,e.exports.jsx(t.p,{children:`It is important not to confuse metadata-defined properties with regular Javascript properties.
You can create any number of properties on your component's instance, f.e.:`}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`constructor() {
	super();
	this._isMobile = false;
}
`})}),`
`,e.exports.jsx(t.p,{children:`However, only metadata-defined properties are managed by the framework: cause invalidation and are converted to/from attributes.
Feel free to create as many regular JS properties for the purpose of your component's functionality as you need, but bear in mind
that they will not be managed by the framework.`}),`
`,e.exports.jsxs(t.h3,{children:["Slots ",e.exports.jsx("a",{name:"metadata_slots"})]}),`
`,e.exports.jsxs(t.p,{children:["While ",e.exports.jsx(t.em,{children:"properties"})," define the objective characteristics of a component, ",e.exports.jsx(t.em,{children:"slots"}),` define the way a component can nest other HTML elements.
You don't need to define slots for every component - some components are not meant to hold any other HTML elements, and are fully operated by properties and events alone.`]}),`
`,e.exports.jsxs(t.p,{children:["You implement slots by configuring them with the ",e.exports.jsx(t.code,{children:"slots"})," metadata object, and rendering respective ",e.exports.jsx(t.code,{children:"<slot>"})," elements in your ",e.exports.jsx(t.code,{children:".hbs"})," template."]}),`
`,e.exports.jsxs(t.p,{children:["You can read more about the ",e.exports.jsx(t.code,{children:"slot"})," HTML Element ",e.exports.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot",children:"here"}),"."]}),`
`,e.exports.jsx(t.h4,{children:"Default slot and named slots"}),`
`,e.exports.jsxs(t.p,{children:["For ",e.exports.jsx(t.em,{children:"named"})," slots you set the name you wish to use for the slot as the key in the ",e.exports.jsx(t.code,{children:"slots"})," metadata object."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`slots: {
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
`})}),`
`,e.exports.jsxs(t.p,{children:["and then in your ",e.exports.jsx(t.code,{children:".hbs"})," template you render respectively ",e.exports.jsx(t.code,{children:'<slot name="items"></slot>'})," and ",e.exports.jsx(t.code,{children:'<slot name="footer"></slot>'}),"."]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.em,{children:"default"})," slot on the other hand must be defined with the ",e.exports.jsx(t.code,{children:"default"})," key in the ",e.exports.jsx(t.code,{children:"slots"})," metadata object (also note the quotes around the ",e.exports.jsx(t.code,{children:"default"})," key as it is a reserved word):"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`slots: {
	"default": {
		type: Node,
	}
}
`})}),`
`,e.exports.jsxs(t.p,{children:["and then in the ",e.exports.jsx(t.code,{children:".hbs"})," template you render ",e.exports.jsx(t.code,{children:"<slot></slot>"}),"."]}),`
`,e.exports.jsx(t.h4,{children:"Slot types"}),`
`,e.exports.jsxs(t.p,{children:["Unlike properties, slots can be of only two types: ",e.exports.jsx(t.code,{children:"HTMLElement"})," and ",e.exports.jsx(t.code,{children:"Node"}),"."]}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.code,{children:"HTMLElement"})," means the slot accepts only other HTML Elements. You can use this type for any slot (default or named)."]}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.code,{children:"Node"})," means that the slot can accept both HTML Elements and Text nodes, and is allowed only for the ",e.exports.jsx(t.code,{children:"default"}),` slot.
The reason for this restriction is that text nodes in HTML cannot have attributes, hence they cannot be slotted as HTML Elements can.
As a result, text can only go the default slot, hence `,e.exports.jsx(t.code,{children:"Node"})," is applicable only for default slots."]}),`
`,e.exports.jsx(t.h4,{children:"Are slots managed state?"}),`
`,e.exports.jsxs(t.p,{children:["Unlike metadata ",e.exports.jsx(t.em,{children:"properties"}),", which are always managed state (see the previous section), ",e.exports.jsx(t.em,{children:"slots"}),` are not managed by the framework by default.
Changes to slots do not trigger lifecycle events such as invalidation.`]}),`
`,e.exports.jsxs(t.p,{children:["However, you can change this by setting ",e.exports.jsx(t.code,{children:"managedSlots: true"})," in the ",e.exports.jsx(t.code,{children:"metadata"})," object. This setting is global and affects all slots for your component."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`managedSlots: true,
slots:	{
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
`})}),`
`,e.exports.jsx(t.p,{children:"Now, if children are added/removed/rearranged in any of the above slots, the component will be invalidated."}),`
`,e.exports.jsx(t.h4,{children:"Slot accessors"}),`
`,e.exports.jsxs(t.p,{children:["Additionally, when you set ",e.exports.jsx(t.code,{children:"managedSlots: true"}),", you get a ",e.exports.jsx(t.strong,{children:"read-only"})," accessor for the children in that slot."]}),`
`,e.exports.jsx(t.p,{children:"Taking the example from above:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`managedSlots: true,
slots:	{
	items: {
		type: HTMLElement
	},
	footer: {
		type: HTMLElement
	}
}
`})}),`
`,e.exports.jsx(t.p,{children:"you will get the following accessors on your component's instances:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const childrenInItems = this.items; // array of all children in the items slot
const childrenInFooter = this.footer; // array of all children in the footer slot
`})}),`
`,e.exports.jsxs(t.p,{children:["Finally, it's possible to define the property name for the accessor of the ",e.exports.jsx(t.em,{children:"default"})," slot (as using the ",e.exports.jsx(t.code,{children:"default"}),` key is not convenient in Javascript).
You can do this with the `,e.exports.jsx(t.code,{children:"propertyName"})," setting:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`managedSlots: true,
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
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const childrenInDefaultSlot = this.content; // array of all children in the default slot
const childrenInItems = this.items; // array of all children in the items slot
const childrenInFooter = this.footer; // array of all children in the footer slot
`})}),`
`,e.exports.jsxs(t.p,{children:["These getters are helpful if your code needs to analyze/communicate with the children in a certain slot. They are also often used in the ",e.exports.jsx(t.code,{children:".hbs"}),`
template where you need for example to loop over the items of a component.`]}),`
`,e.exports.jsx(t.h4,{children:"Individual slots"}),`
`,e.exports.jsxs(t.p,{children:["All children, assigned to a certain ",e.exports.jsx(t.code,{children:"slot"}),`, are rendered by the browser next to each other in the exact order in which they were passed to the component.
Sometimes, however, each child must be placed separately in the shadow root, potentially wrapped in other HTML elements, to satisfy the UX design of the component.`]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"individualSlots"})," slot metadata configuration setting (see ",e.exports.jsx(t.a,{href:"./03-understanding-components-metadata.md",children:"Understanding UI5 Web Components Metadata"}),") allows you to have a separate physical slot for each child belonging to a certain slot."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`{
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
`,e.exports.jsxs(t.p,{children:["The framework will then create an ",e.exports.jsx(t.code,{children:"_individualSlot"})," property on each child, belonging to the slot. Just render these slots in the ",e.exports.jsx(t.code,{children:".hbs"}),` template
to have all children belonging to the slot displayed by the browser separately in your HTML markup of choice.`]}),`
`,e.exports.jsxs(t.p,{children:["For more information on individual slots and how to render them in the ",e.exports.jsx(t.code,{children:".hbs"})," template click ",e.exports.jsx(t.a,{href:"./04-understanding-hbs-templates.md#slots_individual",children:"here"}),"."]}),`
`,e.exports.jsx(t.h4,{children:"The invalidateOnChildChange setting"}),`
`,e.exports.jsxs(t.p,{children:["There is one last configuration setting for slots - ",e.exports.jsx(t.code,{children:"invalidateOnChildChange"}),". When set to ",e.exports.jsx(t.code,{children:"true"}),`, whenever a child in a certain slot is invalidated,
your component will be invalidated as well.`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`managedSlots: true,
slots: {
	"default": {
		type: HTMLElement,
		propertyName: "items",
		invalidateOnChildChange: true
	},
}
`})}),`
`,e.exports.jsx(t.p,{children:`Now, the component will be invalidated not only when children are added/removed/rearranged, but also when children themselves change. This is very handy
for components working with abstract items.`}),`
`,e.exports.jsxs(t.p,{children:["Read more about abstract items and ",e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," in the ",e.exports.jsx(t.a,{href:"#invalidation",children:"Invalidation"})," section later in this article."]}),`
`,e.exports.jsxs(t.h3,{children:["Events ",e.exports.jsx("a",{name:"metadata_events"})]}),`
`,e.exports.jsxs(t.p,{children:["Most components fire ",e.exports.jsx(t.em,{children:"events"})," to notify the application of user interaction."]}),`
`,e.exports.jsxs(t.p,{children:["You can list the events fired by your component in the ",e.exports.jsx(t.code,{children:"events"}),` metadata object, but this is optional and mostly done for documentation purposes.
Any event that you dispatch from your component will reach the application anyway.`]}),`
`,e.exports.jsx(t.p,{children:"Here is an example how to fire an event from your component:"}),`
`,e.exports.jsxs(t.ol,{children:[`
`,e.exports.jsxs(t.li,{children:["Declare the event in your ",e.exports.jsx(t.code,{children:"metadata"})," (optional, but highly recommended for documentation purposes and clarity):"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`events: {
	toggle: {}
}
`})}),`
`,e.exports.jsxs(t.ol,{start:"2",children:[`
`,e.exports.jsxs(t.li,{children:["In the ",e.exports.jsx(t.code,{children:".hbs"})," template bind an event listener to some part of your component's HTML to be able to take action on user interaction:"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<div class="my-panel">
	<button class="my-panel-toggle" @click="{{onPanelToggleClick}}">Toggle</button>
	<div class="my-panel-body">
		<slot></slot>
	</div>
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:[`In this example we have a simplified "panel" component consisting of a toggle button and a slot for the panel content.
We bind the `,e.exports.jsx(t.code,{children:"click"})," event of the ",e.exports.jsx(t.code,{children:"<button>"})," we'll use for toggling our panel to the ",e.exports.jsx(t.code,{children:"onPanelToggleClick"})," method."]}),`
`,e.exports.jsxs(t.p,{children:["For more on the ",e.exports.jsx(t.code,{children:".hbs"})," template syntax and event listeners click ",e.exports.jsx(t.a,{href:"./04-understanding-hbs-templates.md#syntax_at",children:"here"}),"."]}),`
`,e.exports.jsxs(t.ol,{start:"3",children:[`
`,e.exports.jsx(t.li,{children:"Implement the event handler in your component:"}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`class MyPanel extends UI5Element {
	...
	
	onPanelToggleClick(event) {
		this.togglePanel(); // do some work when the user clicks the button
		this.fireEvent("toggle"); // fire the event
	}
}
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"fireEvent"})," method is provided by the base ",e.exports.jsx(t.code,{children:"UI5Element.js"}),` class and is therefore available to all components. The best practice is to always use
this method instead of simply calling the standard `,e.exports.jsx(t.code,{children:"dispatchEvent"})," function as ",e.exports.jsx(t.code,{children:"fireEvent"})," has framework-related enhanced functionality."]}),`
`,e.exports.jsxs(t.p,{children:["That's all it takes to manage an event's lifecycle! Now your component's users may listen for the ",e.exports.jsx(t.code,{children:"toggle"})," event:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const panel = document.getElementsByTagName("my-panel")[0];
panel.addEventListener("toggle", () => {});
`})}),`
`,e.exports.jsx(t.h4,{children:"Working with event parameters"}),`
`,e.exports.jsx(t.p,{children:"The above example demonstrated an event with no parameters. However, you can send arbitrary data to the app when firing an event."}),`
`,e.exports.jsx(t.p,{children:"Here's how:"}),`
`,e.exports.jsxs(t.ol,{children:[`
`,e.exports.jsxs(t.li,{children:["Declare the event in your ",e.exports.jsx(t.code,{children:"metadata"})," and describe its parameters (again, optional, but good for consistency and documentation purposes):"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`events: {
	selectionChange: {
		detail: {
			item: { type: HTMLElement },
			oldItem: { type: HTMLElement }
		}
	}
}
`})}),`
`,e.exports.jsxs(t.p,{children:["Here we define a ",e.exports.jsx(t.code,{children:"selectionChange"})," event which gives the app two pieces of information: ",e.exports.jsx(t.code,{children:"item"})," (the newly selected item) and ",e.exports.jsx(t.code,{children:"oldItem"}),` (the previously selected item).
Respectively they will be accessible by the app with `,e.exports.jsx(t.code,{children:"event.detail.item"})," and ",e.exports.jsx(t.code,{children:"event.detail.oldItem"})," in the event handler, exactly like it works with native browser events."]}),`
`,e.exports.jsxs(t.ol,{start:"2",children:[`
`,e.exports.jsx(t.li,{children:"Pass the data when firing the event:"}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`class MyItemsList extends UI5Element {
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
`,e.exports.jsxs(t.p,{children:["To pass parameters, simply provide a second parameter of type ",e.exports.jsx(t.code,{children:"Object"})," to ",e.exports.jsx(t.code,{children:"fireEvent"})," with keys for all event parameters."]}),`
`,e.exports.jsx(t.p,{children:"The usage of the event by the app will be exactly like in the case of a native HTML element:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const list = document.getElementsByTagName("my-items-list")[0];
list.addEventListener("selectionChange", (event) => {
	console.log(event.detail.item);
	console.log(event.detail.oldItem);
});
`})}),`
`,e.exports.jsx(t.h4,{children:"Events and noConflict mode"}),`
`,e.exports.jsxs(t.p,{children:["By default, when using the ",e.exports.jsx(t.code,{children:"fireEvent"})," method, as demonstrated above, actually not just one, but two custom events are fired: one with the name, provided as the first argument to ",e.exports.jsx(t.code,{children:"fireEvent"}),`,
and one more with the same name, but prefixed by `,e.exports.jsx(t.code,{children:"ui5-"}),"."]}),`
`,e.exports.jsx(t.p,{children:"For example, the following code:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`fireEvent("toggle");
`})}),`
`,e.exports.jsxs(t.p,{children:["will dispatch two ",e.exports.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events",children:"custom events"})," by default:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.code,{children:"toggle"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.code,{children:"ui5-toggle"})}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["However, if you set the ",e.exports.jsx(t.a,{href:"../2-advanced/01-configuration.md#no_conflict",children:"noConflict"})," configuration setting to ",e.exports.jsx(t.code,{children:"true"}),", only the ",e.exports.jsx(t.strong,{children:"prefixed"})," event will be dispatched."]}),`
`,e.exports.jsxs(t.p,{children:["So, when ",e.exports.jsx(t.code,{children:"noConflict: true"})," is configured, the same code:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`fireEvent("toggle");
`})}),`
`,e.exports.jsx(t.p,{children:"would result in just:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.code,{children:"ui5-toggle"})}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["Therefore, the best practice when binding to events, ",e.exports.jsx(t.strong,{children:"fired by other UI5 Web Components"})," in your ",e.exports.jsx(t.code,{children:".hbs"}),` template, is to
always use the prefixed (`,e.exports.jsx(t.code,{children:"ui5-"}),") event."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<div class="my-component">
	<button @click="{{onNativeButtonClick}}">Click me</button>
	<ui5-button @ui5-click="{{onUI5ButtonClick}}">Click me</ui5-button>
	
	<input @change="{{onNativeInputChange}}" />
	<ui5-input @ui5-change="{{onUI5InputChange}}"></ui5-input>
	
	<ui5-list @ui5-item-click="{{onUI5ListItemClick}}"></ui5-list>
</div>
`})}),`
`,e.exports.jsx(t.p,{children:"Please note the following:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["For native HTML elements (",e.exports.jsx(t.code,{children:"input"}),", ",e.exports.jsx(t.code,{children:"button"}),") we bind to their respective events (",e.exports.jsx(t.code,{children:"change"}),", ",e.exports.jsx(t.code,{children:"click"}),") normally."]}),`
`,e.exports.jsxs(t.li,{children:["For other UI5 Web Components (",e.exports.jsx(t.code,{children:"ui5-button"}),", ",e.exports.jsx(t.code,{children:"ui5-input"}),", ",e.exports.jsx(t.code,{children:"ui5-list"}),"), rendered by our component, we bind to the ",e.exports.jsx(t.code,{children:"ui5-"})," events as these are guaranteed to be dispatched even when ",e.exports.jsx(t.code,{children:"noConflict"})," is configured to ",e.exports.jsx(t.code,{children:"true"}),"."]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"If we used the non-prefixed versions:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<div class="my-component">
	<button @click="{{onNativeButtonClick}}">Click me</button>
	<ui5-button @click="{{onUI5ButtonClick}}">Click me</ui5-button>
	
	<input @change="{{onNativeInputChange}}" />
	<ui5-input @change="{{onUI5InputChange}}"></ui5-input>
	
	<ui5-list @item-click="{{onUI5ListItemClick}}"></ui5-list>
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["this would work well only with the default configuration (where ",e.exports.jsx(t.code,{children:"noConflict"})," is ",e.exports.jsx(t.code,{children:"false"}),` and both events are fired), but our code would
"break" the moment an app sets `,e.exports.jsx(t.code,{children:"noConflict: true"}),` since that would suppress UI5 Web Components from firing the non-prefixed versions and
our event handlers (`,e.exports.jsx(t.code,{children:"onUI5ButtonClick"}),", ",e.exports.jsx(t.code,{children:"onUI5InputChange"}),", etc.) would never be executed."]}),`
`,e.exports.jsxs(t.h3,{children:["Wrapping up metadata ",e.exports.jsx("a",{name:"metadata_wrapping_up"})]}),`
`,e.exports.jsx(t.p,{children:"Metadata determines most of your component's API - describe its tag name, properties, slots and events there."}),`
`,e.exports.jsx(t.p,{children:"For example, consider a component with the following metadata:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`{
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
`,e.exports.jsx(t.p,{children:"This metadata conveys the following:"}),`
`,e.exports.jsx(t.p,{children:"This component will have the following getters/setters, created for it by the framework:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"this.text"})," (getter/setter, due to the ",e.exports.jsx(t.code,{children:"text"}),' property) with default value of "Hello"']}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"this.selected"})," (getter/setter, due to the ",e.exports.jsx(t.code,{children:"selected"})," property) with default value of ",e.exports.jsx(t.code,{children:"false"})," (all Booleans are ",e.exports.jsx(t.code,{children:"false"})," by default in HTML and ",e.exports.jsx(t.code,{children:"defaultValue"})," cannot be configured for them)"]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"this.items"})," (getter only, due to having ",e.exports.jsx(t.code,{children:"managedSlots: true"})," and the ",e.exports.jsx(t.code,{children:"propertyName"})," of the default slot being ",e.exports.jsx(t.code,{children:"items"}),") - an array of all ",e.exports.jsx(t.em,{children:"Text Nodes and HTML Elements"})," in the default slot"]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"this.icon"})," (getter only, due to having ",e.exports.jsx(t.code,{children:"managedSlots: true"})," and the ",e.exports.jsx(t.code,{children:"icon"})," slot) - an array of all HTML Elements in the ",e.exports.jsx(t.code,{children:"icon"})," slot"]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"The component will have only 1 attribute:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"text"})," due to the ",e.exports.jsx(t.code,{children:"text"})," property (the other property has ",e.exports.jsx(t.code,{children:"noAttribute: true"})," set)"]}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["When the ",e.exports.jsx(t.code,{children:"text"})," property changes, the ",e.exports.jsx(t.code,{children:"text"})," attribute will also be reflected and vice-versa."]}),`
`,e.exports.jsx(t.p,{children:"The component fires 1 event:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"change"})," with one string parameter: ",e.exports.jsx(t.code,{children:"newText"})]}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["This component will be invalidated whenever any of its properties changes, any of its slots has new/removed/rearranged children, and additionally when any UI5 Web Component in the ",e.exports.jsx(t.code,{children:"default"})," slot is invalidated."]}),`
`,e.exports.jsxs(t.p,{children:["In this component's ",e.exports.jsx(t.code,{children:".hbs"})," you are expected to render the two slots and to bind an event listener for the event:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<div class="my-demo-component">
	<header>
		<slot name="icon"></slot>
		<input class="demo-input" value="{{text}}" @change="{{onInputChange}}">
	</header>
	<div>
		<slot></slot>
	</div>
</div>
`})}),`
`,e.exports.jsx(t.p,{children:"and in the component's class you are expected to fire the event, for example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`class MyDemoComponent extends HTMLElement {
	...
	onInputChange(event) {
		const newText = this.shadowRoot.querySelector(".demo-input").value;
		this.text = newText;
		event.stopPropagation();
		this.fireEvent("change", { newText });
	}
}
`})}),`
`,e.exports.jsxs(t.p,{children:["Whenever the user stops typing in the ",e.exports.jsx(t.code,{children:"<input>"})," and its ",e.exports.jsx(t.code,{children:"change"})," event is fired, our component's ",e.exports.jsx(t.code,{children:"onInputChange"}),` event handler will be executed.
There we get the new value of the input, update the `,e.exports.jsx(t.code,{children:"text"})," metadata property to reflect its new state, stop the input's native ",e.exports.jsx(t.code,{children:"change"}),` event from propagating since we'll be firing our custom event
with the same name (and we don't want the user to get 2 events with the same name), and finally we fire our metadata event (`,e.exports.jsx(t.code,{children:"change"}),") with the ",e.exports.jsx(t.code,{children:"newText"})," parameter."]}),`
`,e.exports.jsxs(t.h2,{children:["Understanding rendering ",e.exports.jsx("a",{name:"rendering"})]}),`
`,e.exports.jsxs(t.h3,{children:["What is rendering? ",e.exports.jsx("a",{name:"rendering_def"})]}),`
`,e.exports.jsxs(t.p,{children:["In the context of UI5 Web Components the notion of ",e.exports.jsx(t.strong,{children:"rendering"})," means ",e.exports.jsx(t.strong,{children:"creating the content of a shadow root"})," (building the shadow DOM)."]}),`
`,e.exports.jsxs(t.h3,{children:["Physical and logical components ",e.exports.jsx("a",{name:"rendering_physical_logical"})]}),`
`,e.exports.jsxs(t.p,{children:["Each component that provides a ",e.exports.jsx(t.code,{children:"static get template()"})," method will be rendered (will have its shadow DOM built) initially and every time it gets invalidated."]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`import InputTemplate from "./generated/templates/InputTemplate.lit.js"; // this is the compiled Input.hbs template

// This component will have shadow DOM since it provides a template
static get template() {
	return InputTemplate;
}
`})}),`
`,e.exports.jsxs(t.p,{children:["Components that do not provide a ",e.exports.jsx(t.code,{children:"static get template()"})," method are considered ",e.exports.jsx(t.em,{children:"logical"})," or ",e.exports.jsx(t.em,{children:"marker"}),` elements only. These components are never rendered (do not have a shadow root at all)
and their only purpose is to serve as items for higher-order components. The classical example of a logical component is a select option.`]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-select>
	<ui5-option>Cozy</ui5-option>
	<ui5-option selected>Compact</ui5-option>
	<ui5-option >Condensed</ui5-option>
</ui5-select>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"ui5-option"})," component does not provide a template, and is therefore never rendered. However, the ",e.exports.jsx(t.code,{children:"ui5-select"}),` component, which is a physical component that has a template,
renders HTML corresponding to each of its children (`,e.exports.jsx(t.code,{children:"ui5-option"})," instances) as part of its own shadow DOM."]}),`
`,e.exports.jsxs(t.h3,{children:["What is invalidation? ",e.exports.jsx("a",{name:"invalidation"})]}),`
`,e.exports.jsx(t.p,{children:`Invalidation means scheduling an already rendered component for asynchronous re-rendering (in the next animation frame). If an already invalidated component gets changed
again, before having been re-rendered, this will have no downside - it's in the queue of components to be re-rendered anyway.`}),`
`,e.exports.jsx(t.p,{children:"Important: when a component is re-rendered, only the parts of its shadow DOM, dependent on the changed properties/slots are changed, which makes most updates very fast."}),`
`,e.exports.jsxs(t.p,{children:["A component becomes ",e.exports.jsx(t.em,{children:"invalidated"})," whenever:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["a ",e.exports.jsx(t.em,{children:"metadata-defined"})," ",e.exports.jsx(t.strong,{children:"property"})," changes (not regular properties that f.e. you define in the constructor)"]}),`
`,e.exports.jsxs(t.li,{children:["children are added/removed/rearranged in any ",e.exports.jsx(t.strong,{children:"slot"})," and the component has ",e.exports.jsx(t.code,{children:"managedSlots: true"})," set in the metadata object"]}),`
`,e.exports.jsxs(t.li,{children:["a slotted child in a ",e.exports.jsx(t.strong,{children:"slot"})," configured with ",e.exports.jsx(t.code,{children:"invalidateOnChildChange: true"})," is invalidated."]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"Changes to properties always cause an invalidation. No specific metadata configuration is needed."}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`properties: {
	text: {
		type: String
	}
}
`})}),`
`,e.exports.jsxs(t.p,{children:["Whenever ",e.exports.jsx(t.code,{children:"text"})," changes, the component will be invalidated."]}),`
`,e.exports.jsx(t.p,{children:`Changes to slots do not cause an invalidation by default. Most components do not need to render differently based on whether they have any slotted children or not.
The most common example for this are simple general-purpose containers (completely agnostic of their content).`}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`metadata: {
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
`,e.exports.jsx(t.p,{children:"This component will not invalidate when children are added/removed from any of its slots."}),`
`,e.exports.jsxs(t.p,{children:[`However, some components render differently based on whether they have children or not (e.g. show counters/other UX elements for the number of children, f.e. carousel; or have special styles when empty or have a child in a specific slot, f.e. button with an icon).
If that is the case for the component you're building, set `,e.exports.jsx(t.code,{children:"managedSlots: true"})," in your component's metadata. Thus, your component will become invalidated whenever children are added, removed or swap places in any of its slots."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`managedSlots: true,
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
`,e.exports.jsxs(t.p,{children:["Now that this component has ",e.exports.jsx(t.code,{children:"managedSlots: true"}),", changes to each slot will trigger an invalidation. Note that the ",e.exports.jsx(t.code,{children:"managedSlots"})," configuration is global (and not per slot)."]}),`
`,e.exports.jsx(t.p,{children:`And finally, there are components that not only need to render differently based on the number/type of children they have, but they must also get invalidated
whenever their children change. This holds true for all components that work with abstract items (such as select with options, combo box with combo box items)
because these abstract items do not have a template (do not render themselves) and therefore rely on their parent to render some DOM for them in its own shadow root. So, when they get invalidated, they must also invalidate their parent.`}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`managedSlots: true,
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
`,e.exports.jsxs(t.p,{children:['Only changes to children in the "default" slot will trigger invalidation for this component. Note that ',e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," is defined per slot (and not globally like ",e.exports.jsx(t.code,{children:"managedSlots"}),`).
Finally, `,e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," allows for more fine-granular rules when exactly children can invalidate their parents - see ",e.exports.jsx(t.a,{href:"./03-understanding-components-metadata.md",children:"Understanding UI5 Web Components Metadata"}),"."]}),`
`,e.exports.jsxs(t.h2,{children:["Lifecycle hooks ",e.exports.jsx("a",{name:"lifecycle"})]}),`
`,e.exports.jsx(t.p,{children:"Using the right lifecycle hook for the task is crucial to a well-designed and performant component."}),`
`,e.exports.jsxs(t.h3,{children:["1. ",e.exports.jsx(t.code,{children:"constructor"})," ",e.exports.jsx("a",{name:"lifecycle_constructor"})]}),`
`,e.exports.jsx(t.p,{children:"Use the constructor for one-time initialization tasks."}),`
`,e.exports.jsx(t.p,{children:"What to do:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:"initialize private variables"}),`
`,e.exports.jsxs(t.li,{children:["bind functions to ",e.exports.jsx(t.code,{children:"this"})," (very common when using the ",e.exports.jsx(t.code,{children:"ResizeHandler"})," helper class)"]}),`
`,e.exports.jsxs(t.li,{children:["do one-time work when the first instance of a given component is created (f.e. instantiate a helper class or attach a special event listener to the ",e.exports.jsx(t.code,{children:"window"})," object)"]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"What not to do:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["anything rendering-related (use ",e.exports.jsx(t.code,{children:"onBeforeRendering"}),"/",e.exports.jsx(t.code,{children:"onAfterRendering"}),")"]}),`
`,e.exports.jsxs(t.li,{children:["anything related to the state (use ",e.exports.jsx(t.code,{children:"onBeforeRendering"}),")"]}),`
`,e.exports.jsxs(t.li,{children:["anything requiring DOM manipulation (the component isn't attached to the DOM yet - use ",e.exports.jsx(t.code,{children:"onAfterRendering"})," or ",e.exports.jsx(t.code,{children:"onEnterDOM"}),"/",e.exports.jsx(t.code,{children:"onExitDOM"}),")"]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`constructor() {
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
`,e.exports.jsxs(t.h3,{children:["2. ",e.exports.jsx(t.code,{children:"onBeforeRendering"})," ",e.exports.jsx("a",{name:"lifecycle_before"})]}),`
`,e.exports.jsxs(t.p,{children:["Use ",e.exports.jsx(t.code,{children:"onBeforeRendering"})," to prepare variables to be used in the ",e.exports.jsx(t.code,{children:".hbs"})," template."]}),`
`,e.exports.jsx(t.p,{children:"What to do:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:"prepare calculated (derived) state for use in the renderer"}),`
`]}),`
`,e.exports.jsx(t.p,{children:"What not to do:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["do not try to access the DOM (use ",e.exports.jsx(t.code,{children:"onAfterRendering"})," instead)"]}),`
`]}),`
`,e.exports.jsx(t.p,{children:"Let's take for example a component with the following metadata:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`{
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
`,e.exports.jsxs(t.p,{children:["This component has a ",e.exports.jsx(t.code,{children:"filter"})," property and a ",e.exports.jsx(t.code,{children:"default"})," slot that we want to call ",e.exports.jsx(t.code,{children:"items"})," (thus accessible with ",e.exports.jsx(t.code,{children:"this.items"}),")."]}),`
`,e.exports.jsxs(t.p,{children:["Let's imagine we want to only show the items whose ",e.exports.jsx(t.code,{children:"name"})," property matches the value of our ",e.exports.jsx(t.code,{children:"filter"})," property - so we filter the items by name."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`constructor() {
	super();
	this._filteredItems = [];
}
onBeforeRendering() {
	this._filteredItems = this.items.filter(item => item.name.includes(this.filter));
}
`})}),`
`,e.exports.jsxs(t.p,{children:["In ",e.exports.jsx(t.code,{children:"onBeforeRendering"})," we prepare a ",e.exports.jsx(t.code,{children:"_filteredItems"})," array with some of the component's children (only the ones that have the ",e.exports.jsx(t.code,{children:"this.filter"})," text as part of their ",e.exports.jsx(t.code,{children:"name"})," property)"]}),`
`,e.exports.jsxs(t.p,{children:["And finally, in the ",e.exports.jsx(t.code,{children:".hbs"})," template we have for example:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<div class="my-filter-component">
	{{#each _filteredItems}}
		<div class="my-filtered-item">
			<slot name="{{_individualSlot}}"></slot>
		</div>
	{{/each}}
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["We loop over the ",e.exports.jsx(t.code,{children:"_fiteredItems"})," array that we prepared in ",e.exports.jsx(t.code,{children:"onBeforeRendering"})," and for each child we render a ",e.exports.jsx(t.code,{children:"slot"})," based on the child's ",e.exports.jsx(t.code,{children:"_individualSlot"}),` property,
created automatically by the framework due to the default slot's metadata configuration (`,e.exports.jsx(t.code,{children:"individualSlots: true"}),")."]}),`
`,e.exports.jsx(t.p,{children:"The usage of this component would be for example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<my-filter-component filter="John">
	<my-filter-item name="John Smith"></my-filter-item>
	<my-filter-item name="Jane Doe"></my-filter-item>
	<my-filter-item name="Jack Johnson"></my-filter-item>
</my-filter-component>
`})}),`
`,e.exports.jsxs(t.p,{children:["The user would only see the first and third items as these are the only ones we rendered an individual slot for (the ones matching the ",e.exports.jsx(t.code,{children:"filter"}),' value of "John").']}),`
`,e.exports.jsxs(t.p,{children:["In summary: ",e.exports.jsx(t.code,{children:"onBeforeRendering"})," is the best place to prepare all the variables you are going to need in the ",e.exports.jsx(t.code,{children:".hbs"})," template."]}),`
`,e.exports.jsxs(t.h3,{children:["3. ",e.exports.jsx(t.code,{children:"onAfterRendering"})," ",e.exports.jsx("a",{name:"lifecycle_after"})]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"onAfterRendering"})," lifecycle hook allows you to access the DOM every time the component is rendered."]}),`
`,e.exports.jsx(t.p,{children:`You should avoid using this method whenever possible. It's best to delegate all HTML manipulation to the framework: change the state of the component,
the component will be invalidated, the template will be executed with the latest state, and DOM will be updated accordingly.
It is an anti-pattern to manually change the DOM.`}),`
`,e.exports.jsx(t.p,{children:"In some cases, however, you must directly access the DOM since certain operations can only be performed imperatively (and not via the template):"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:"setting the focus;"}),`
`,e.exports.jsx(t.li,{children:"manually scrolling an element to a certain position;"}),`
`,e.exports.jsx(t.li,{children:"calling a public method on a DOM Element (for example, to close a popup);"}),`
`,e.exports.jsx(t.li,{children:"reading the sizes of DOM Elements;"}),`
`]}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<div class="my-demo-component">
	<input id="first">
	<input id="second">
</div>
`})}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`onAfterRendering() {
	this.shadowRoot.querySelector("#second").focus();
	this._totalWidth = this.shadowRoot.querySelector("div.my-demo-component").offsetWidth;
}
`})}),`
`,e.exports.jsxs(t.h3,{children:["4. ",e.exports.jsx(t.code,{children:"onEnterDOM"})," and ",e.exports.jsx(t.code,{children:"onExitDOM"})," ",e.exports.jsx("a",{name:"lifecycle_dom"})]}),`
`,e.exports.jsxs(t.p,{children:["Unlike ",e.exports.jsx(t.code,{children:"onBeforeRendering"})," and ",e.exports.jsx(t.code,{children:"onAfterRendering"}),`, which sound like parts of the same flow (but are not, and are actually used for completely independent tasks),
`,e.exports.jsx(t.code,{children:"onEnterDOM"})," and ",e.exports.jsx(t.code,{children:"onExitDOM"})," should almost always be used together, therefore they are presented as a whole in this article."]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"onEnterDOM"})," is executed during the web component's standard ",e.exports.jsx(t.code,{children:"connectedCallback"})," method's execution"]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"onExitDOM"})," is executed during the web component's standard ",e.exports.jsx(t.code,{children:"disconnectedCallback"})," method's execution"]}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["If you have prior experience with web component development, you could think of ",e.exports.jsx(t.code,{children:"onEnterDOM"})," as ",e.exports.jsx(t.code,{children:"connectedCallback"})," and of ",e.exports.jsx(t.code,{children:"onExitDOM"})," as ",e.exports.jsx(t.code,{children:"disconnectedCallback"}),"."]}),`
`,e.exports.jsx(t.p,{children:"Note that these hooks are completely independent of the component's rendering lifecycle, and are solely related to its insertion and removal from DOM."}),`
`,e.exports.jsx(t.p,{children:"Normally, when a web component is created, for example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const b = document.createElement("ui5-button");
`})}),`
`,e.exports.jsxs(t.p,{children:["it is already fully operational, although it isn't in DOM yet. Therefore, you should use ",e.exports.jsx(t.code,{children:"onEnterDOM"})," and ",e.exports.jsx(t.code,{children:"onExitDOM"}),` only for functionality, related to
the component being in the DOM tree at all (and not to rendering, stying or anything related to the shadow root).`]}),`
`,e.exports.jsx(t.p,{children:"Common use cases are:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:"registering/de-registering a ResizeHandler"}),`
`,e.exports.jsx(t.li,{children:"working with Intersection observer"}),`
`,e.exports.jsx(t.li,{children:"any work you want to carry out only if the component is in the DOM;"}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["Probably the best example of these hooks is the usage of the ",e.exports.jsx(t.code,{children:"ResizeHandler"})," helper class."]}),`
`,e.exports.jsxs(t.p,{children:["The component has a private ",e.exports.jsx(t.code,{children:"_width"})," property, defined in its metadata:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`properties: {
	/**
	 * @private
	 */
	_width: {
		type: Integer
	}
}
`})}),`
`,e.exports.jsx(t.p,{children:"and the following code in its class:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
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
`,e.exports.jsxs(t.p,{children:["In the ",e.exports.jsx(t.code,{children:"constructor"})," we bind the ",e.exports.jsx(t.code,{children:"_onResize"}),` method to the component's instance to get a function with the correct context,
and then in `,e.exports.jsx(t.code,{children:"onEnterDOM"})," and ",e.exports.jsx(t.code,{children:"onExitDOM"})," we register/deregister this function with the ",e.exports.jsx(t.code,{children:"ResizeHandler"})," helper class."]}),`
`,e.exports.jsxs(t.p,{children:["Then, whenever the component resizes, the ",e.exports.jsx(t.code,{children:"ResizeHandler"})," will trigger the callback, the metadata ",e.exports.jsx(t.code,{children:"_width"})," property will be updated to a new value in ",e.exports.jsx(t.code,{children:"_onResize"}),`,
the component will be invalidated, and the template will be executed with the new value of `,e.exports.jsx(t.code,{children:"_width"}),", respectively ",e.exports.jsx(t.code,{children:"styles"}),"."]}),`
`,e.exports.jsxs(t.h2,{children:["The static area ",e.exports.jsx("a",{name:"static"})]}),`
`,e.exports.jsxs(t.h3,{children:["Preface ",e.exports.jsx("a",{name:"static_preface"})]}),`
`,e.exports.jsxs(t.p,{children:["This section expands on the UI5 Web Components class structure, so if you haven't, please check ",e.exports.jsx(t.a,{href:"./02-custom-UI5-Web-Components.md",children:"Developing Custom UI5 Web Components"})," first."]}),`
`,e.exports.jsx(t.p,{children:"Normally, the whole HTML markup of a UI5 Web Component is found in one place - the shadow DOM of the custom element itself."}),`
`,e.exports.jsx(t.p,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button id="button">Click me</ui5-button>
`})}),`
`,e.exports.jsxs(t.p,{children:["All HTML, belonging to this ",e.exports.jsx(t.code,{children:"ui5-button"})," instance is in its own shadow DOM."]}),`
`,e.exports.jsx(t.p,{children:"Respectively, in the class where the button component is defined, we provide one template and one piece of CSS:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";
import buttonCss from "./generated/themes/Button.css.js";

class Button extends UI5Element {
	...
	
	static get styles() {
		return buttonCss;
	}

	static get template() {
		return ButtonTemplate;
	}

}
`})}),`
`,e.exports.jsx(t.p,{children:"These are respectively the template and CSS that are going to be used in the component's shadow DOM."}),`
`,e.exports.jsxs(t.p,{children:[`However, there are more complex components, whose HTML is split in two parts - the custom element's shadow DOM (as is the case with the button),
but also a so called `,e.exports.jsx(t.strong,{children:"static area"}),` part, holding all popups this component might open. This is the case with most components that have any kind of
popup-related functionality (dropdowns, rich tooltips, popovers, dialogs). Prominent examples are `,e.exports.jsx(t.code,{children:"ui5-select"}),", ",e.exports.jsx(t.code,{children:"ui5-combobox"}),", ",e.exports.jsx(t.code,{children:"ui5-textarea"}),", ",e.exports.jsx(t.code,{children:"ui5-date-picker"}),"."]}),`
`,e.exports.jsxs(t.h3,{children:["What is the static area and why is it needed? ",e.exports.jsx("a",{name:"static_what_why"})]}),`
`,e.exports.jsxs(t.p,{children:["The static area is a special ",e.exports.jsx(t.em,{children:"singleton"})," custom element (",e.exports.jsx(t.code,{children:"ui5-static-area"}),"), placed automatically by the framework as the first child of the ",e.exports.jsx(t.code,{children:"body"}),`.
For each component, having a `,e.exports.jsx(t.strong,{children:"static area"})," part, a ",e.exports.jsx(t.code,{children:"ui5-static-area-item"})," custom element is created inside the static area."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body>
	<ui5-static-area> <!-- created automatically only once -->
		<ui5-static-area-item></ui5-static-area-item> <!-- created automatically for the ui5-select -->
		<ui5-static-area-item></ui5-static-area-item> <!-- created automatically for the ui5-date-picker -->
	</ui5-static-area>

	<ui5-select></ui5-select> <!-- needs a static area part -->
	<ui5-date-picker></ui5-date-picker> <!-- needs a static area part -->
	<ui5-button></ui5-button> <!-- does not need a static area part -->
</body>
`})}),`
`,e.exports.jsxs(t.p,{children:["In this example 3 UI5 Web Components are used: ",e.exports.jsx(t.code,{children:"ui5-select"}),", ",e.exports.jsx(t.code,{children:"ui5-date-picker"}),", and ",e.exports.jsx(t.code,{children:"ui5-button"}),`.
Since two of them have static area parts, the framework has created a `,e.exports.jsx(t.code,{children:"ui5-static-area"})," (one for the whole page) and inside it a ",e.exports.jsx(t.code,{children:"ui5-static-area-item"}),`
for each component with a static area part.`]}),`
`,e.exports.jsxs(t.p,{children:["Thus, the HTML, defining the ",e.exports.jsx(t.code,{children:"ui5-select"})," and ",e.exports.jsx(t.code,{children:"ui5-date-picker"})," components is split in two parts of the HTML page:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["the shadow DOM of the custom element itself (",e.exports.jsx(t.code,{children:"ui5-select"}),", ",e.exports.jsx(t.code,{children:"ui5-date-picker"}),")"]}),`
`,e.exports.jsxs(t.li,{children:["the shadow DOM of the ",e.exports.jsx(t.code,{children:"static-area-item"}),", created for the respective component."]}),`
`]}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.strong,{children:`This is necessary because such a split is the only way to guarantee that a popup (dropdown, rich tooltip, popover, etc.) will always be
positioned correctly on the HTML page`}),", even if parts of the page have:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.code,{children:"transform: translate"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.code,{children:"overflow: hidden"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.code,{children:"z-index"})}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["Since the ",e.exports.jsx(t.code,{children:"ui5-statia-area"})," is a top-level ",e.exports.jsx(t.code,{children:"body"}),` child, it is guaranteed to be on top of everything else on the page with the correct CSS styles,
regardless of the page structure and `,e.exports.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Glossary/Stacking_context",children:"stacking context"}),"."]}),`
`,e.exports.jsx(t.p,{children:"If we did not use a static area, for example as in a component, defined like this:"}),`
`,e.exports.jsxs(t.p,{children:["In the ",e.exports.jsx(t.code,{children:"MySelect.js"})," file:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<div class="my-select">
	<h1>Click to open the dropdown:</h1>
	<button @click="{{onOpenDropdownClick}}">Dropdown</button>
	
	<ui5-popover id="#popover" ?open="{{dropdownOpen}}">
		<ui5-list>
			{{#each dropdownItems}}
				<ui5-li>{{text}}</ui5-li>
			{{/each}}
		</ui5-list>
	</ui5-popover>
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["In the ",e.exports.jsx(t.code,{children:"MySelect.js"})," file:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`class MySelect extends UI5Element {
	...
	onOpenDropdownClick(event) {
		this.dropdownOpen = true;
	}
}
`})}),`
`,e.exports.jsxs(t.p,{children:["then when the user clicks the ",e.exports.jsx(t.code,{children:"button"}),", and the ",e.exports.jsx(t.code,{children:"ui5-popover"})," opens (due to its ",e.exports.jsx(t.code,{children:"open"})," property having been set to ",e.exports.jsx(t.code,{children:"true"}),`),
this popover might be partially or entirely "cut" or misplaced, depending on the position of the component on the page.`]}),`
`,e.exports.jsx(t.p,{children:"Example 1:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body>
	<my-select></my-select>
</body>
`})}),`
`,e.exports.jsxs(t.p,{children:["Here the ",e.exports.jsx(t.code,{children:"my-select"})," component would work just fine as it is the only component on the page and no other components create a stacking context or overflow."]}),`
`,e.exports.jsx(t.p,{children:"However, consider example 2:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body>
	<div style="height: 20px; overflow: hidden;">
		<my-select></my-select>
	</div>
</body>
`})}),`
`,e.exports.jsxs(t.p,{children:["Now, when the popover opens, only a ",e.exports.jsx(t.code,{children:"20px"}),"-high strip of it would be visible due to the parent element's CSS."]}),`
`,e.exports.jsx(t.p,{children:`This is an oversimplified example that could easily be fixed, but in real-world scenarios there are often parts of the HTML page we cannot
influence which cause problems with popups.`}),`
`,e.exports.jsxs(t.h3,{children:["Using the static area ",e.exports.jsx("a",{name:"static_using"})]}),`
`,e.exports.jsx(t.p,{children:"Here is how we can rework the component from the example above to take advantage of the static area:"}),`
`,e.exports.jsxs(t.ol,{children:[`
`,e.exports.jsx(t.li,{children:"Split the template and CSS of the component:"}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["Instead of having the dropdown (",e.exports.jsx(t.code,{children:"ui5-popover"}),") in the main template:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<div class="my-select">
	<h1>Click to open the dropdown:</h1>
	<button @click="{{onOpenDropdownClick}}">Dropdown</button>
	
	<ui5-popover id="#popover" ?open="{{dropdownOpen}}">
		<ui5-list>
			{{#each dropdownItems}}
				<ui5-li>{{text}}</ui5-li>
			{{/each}}
		</ui5-list>
	</ui5-popover>
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["split ",e.exports.jsx(t.code,{children:"MySelect.hbs"})," into ",e.exports.jsx(t.code,{children:"MySelect.hbs"})," and ",e.exports.jsx(t.code,{children:"MySelectDropdown.hbs"}),":"]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"MySelect.hbs"})," file:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<div class="my-select">
	<h1>Click to open the dropdown:</h1>
	<button @click="{{onOpenDropdownClick}}">Dropdown</button>
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"MySelectDropdown.hbs"})," file:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-handlebars",children:`<ui5-popover id="#popover" ?open="{{dropdownOpen}}">
	<ui5-list>
		{{#each dropdownItems}}
			<ui5-li>{{text}}</ui5-li>
		{{/each}}
	</ui5-list>
</ui5-popover>
`})}),`
`,e.exports.jsx(t.p,{children:"Also, create the CSS of the component in 2 files:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"MySelect.css"})," (with styles for the select itself, f.e. ",e.exports.jsx(t.code,{children:".my-select {}"}),")"]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"MySelectDropdown.css"})," (with styles for the dropdown only, f.e. ",e.exports.jsx(t.code,{children:"#dropdown {}"}),")"]}),`
`]}),`
`,e.exports.jsxs(t.ol,{start:"2",children:[`
`,e.exports.jsx(t.li,{children:"Pass the new template and CSS to the component class"}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"MySelect.js"})," file:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`import MySelectTemplate from "./generated/templates/MySelect.lit.js";
import MySelectDropdownTemplate from "./generated/templates/MySelectDropdown.lit.js";

import mySelectCss from "./generated/themes/MySelect.css.js";
import mySelectDropdownCss from "./generated/themes/MySelectDropdown.css.js";

class MySelect extends UI5Element {
	...
	
	static get styles() {
		return mySelectCss;
	}
	
	static get staticAreaStyles() {
		return mySelectDropdownCss;
	}
	
	static get template() {
		return MySelectTemplate;
	}

	static get staticAreaTemplate() {
		return MySelectDropdownTemplate;
	}

}
`})}),`
`,e.exports.jsxs(t.p,{children:["Creating the ",e.exports.jsx(t.code,{children:"static get staticAreaTemplate()"}),` method is the indication that your component has a static area part,
and will trigger the respective framework functionality to support it.`]}),`
`,e.exports.jsxs(t.ol,{start:"3",children:[`
`,e.exports.jsxs(t.li,{children:["Use the ",e.exports.jsx(t.code,{children:"async getStaticAreaItemDomRef()"})," method to create the static area item ",e.exports.jsx(t.strong,{children:"on demand"}),", whenever necessary."]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`class MySelect extends UI5Element {
	...

	async onOpenDropdownClick() {
		await this.getStaticAreaItemDomRef(); // this line is new compared to the old implementation
		this.dropdownOpen = true;
	}

}
`})}),`
`,e.exports.jsx(t.p,{children:"This is all it takes to make your component work with the static area."}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.strong,{children:"Important:"})," please note that the static area item is only created ",e.exports.jsx(t.strong,{children:"on demand"})," - when you call the ",e.exports.jsx(t.code,{children:"async getStaticAreaItemDomRef()"}),` function.
For most components this is when the user opens a menu/dropdown/hovers over an element for a tooltip, etc.`]}),`
`,e.exports.jsx(t.p,{children:"Let's go over the whole process in more detail:"}),`
`,e.exports.jsxs(t.ol,{children:[`
`,e.exports.jsxs(t.li,{children:["The browser renders a ",e.exports.jsx(t.code,{children:"<my-select></my-select>"})," component:"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body>
	<my-select></my-select>
</body>
`})}),`
`,e.exports.jsxs(t.p,{children:["The shadow root of the ",e.exports.jsx(t.code,{children:"my-select"})," component will be created with the content from the ",e.exports.jsx(t.code,{children:"MySelect.hbs"})," template, as it was provided as ",e.exports.jsx(t.code,{children:"static get template()"}),`.
Note that until this point nothing related to the static area has happened. The lifecycle of this component so far is not much different than that of a `,e.exports.jsx(t.code,{children:"ui5-button"}),"."]}),`
`,e.exports.jsxs(t.ol,{start:"2",children:[`
`,e.exports.jsx(t.li,{children:'The user interacts with the component (clicks the "Dropdown" button)'}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["This will trigger the ",e.exports.jsx(t.code,{children:"onOpenDropdownClick"})," event handler we've bound in ",e.exports.jsx(t.code,{children:"MySelect.hbs"}),`
and once the first line of this event handler is executed (the `,e.exports.jsx(t.code,{children:"await this.getStatiAreaItemDomRef"})," part):"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`async onOpenDropdownClick() {
	await this.getStaticAreaItemDomRef();
	this.dropdownOpen = true;
}
`})}),`
`,e.exports.jsxs(t.p,{children:["the framework will create the ",e.exports.jsx(t.code,{children:"ui5-static-area"})," and a ",e.exports.jsx(t.code,{children:"ui5-static-area-item"})," and will create its shadow root with the content from the ",e.exports.jsx(t.code,{children:"MySelectDropdown.hbs"})," template, as it was provided as ",e.exports.jsx(t.code,{children:"static get staticAreaTemplate()"}),"."]}),`
`,e.exports.jsx(t.p,{children:"The DOM would then look like this:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<body>
	<ui5-static-area>
		<ui5-static-area-item>
			#shadow-root <!-- The MySelectDropdown.hbs template was rendered here -->
		</ui5-static-area-item>
	</ui5-static-area>

	<my-select>
		#shadow-root <!-- The MySelect.hbs template was rendered here -->
	</my-select>
</body>
`})}),`
`,e.exports.jsx(t.p,{children:"If the user hadn't clicked the button, the static area part would not have been created at all."}),`
`,e.exports.jsxs(t.h3,{children:["Accessing the static area item ",e.exports.jsx("a",{name:"static_accessing"})]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"async getStaticAreaItemDomRef()"})," function from the example above:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`async onOpenDropdownClick() {
	await this.getStaticAreaItemDomRef();
	this.dropdownOpen = true;
}
`})}),`
`,e.exports.jsxs(t.p,{children:["returns a reference to the ",e.exports.jsx(t.code,{children:"shadowRoot"})," of the static area item for this component."]}),`
`,e.exports.jsx(t.p,{children:"You can therefore access it like this:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-js",children:`const staticAreaItem = await this.getStaticAreaItemDomRef();
const popover = staticAreaItem.querySelector("[ui5-popover]");
`})}),`
`,e.exports.jsxs(t.p,{children:["First, we get a reference to the static area item's shadow root in ",e.exports.jsx(t.code,{children:"staticAreaItem"}),", and then we get the instance of the ",e.exports.jsx(t.code,{children:"ui5-popover"}),` element
by using the attribute selector (`,e.exports.jsx(t.code,{children:"[ui5-popover]"}),"), as is the best practice. See ",e.exports.jsx(t.a,{href:"#metadata_tag",children:"Tag"})," in the ",e.exports.jsx(t.a,{href:"#metadata",children:"Metadata deep dive"})," section above."]}),`
`,e.exports.jsxs(t.p,{children:["Also, note that no matter how many times you call ",e.exports.jsx(t.code,{children:"getStaticAreaItemDomRef"}),", the static area item will be created only the first time."]})]})}}export{g as default};
//# sourceMappingURL=06-deep-dive-and-best-practices.2403d689.js.map
