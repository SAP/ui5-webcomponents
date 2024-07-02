import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as d,F as l}from"./Banner-a1178143.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(n){const t=Object.assign({h1:"h1",p:"p",em:"em",h2:"h2",h4:"h4",pre:"pre",code:"code",strong:"strong",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",ul:"ul",li:"li"},r(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Development/Understanding components metadata"}),`
`,e.jsx(d,{}),`
`,e.jsx(t.h1,{id:"understanding-ui5-web-components-metadata",children:"Understanding UI5 Web Components Metadata"}),`
`,e.jsx(t.p,{children:"Metadata is a JavaScript object, containing information about the public interface of a UI5 Web Component (tag name, properties, etc.)."}),`
`,e.jsx(t.p,{children:e.jsx(t.em,{children:"Disclaimer: The information below is for UI5 Web Components development only. It is experimental and may change."})}),`
`,e.jsx(t.h2,{id:"tag",children:"Tag"}),`
`,e.jsx(t.p,{children:"Defines the HTML tag for the Web Component."}),`
`,e.jsx(t.h4,{id:"example",children:"Example:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
	"tag": "ui5-my-element",
}
`})}),`
`,e.jsx(t.h2,{id:"properties--attributes",children:"Properties / Attributes"}),`
`,e.jsx(t.p,{children:"Defines the HTML properties for the Web Component."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note about attributes:"})," By default, for each property an equivalent attribute is supported. Attributes have the same names as properties, but in ",e.jsx(t.code,{children:"kebab-case"})," rather than ",e.jsx(t.code,{children:"camelCase"}),`.
Properties of type `,e.jsx(t.code,{children:"Object"}),", properties with ",e.jsx(t.code,{children:"multiple"})," set to",e.jsx(t.code,{children:"true"})," and properties with ",e.jsx(t.code,{children:"noAttribute"})," set to ",e.jsx(t.code,{children:"true"})," do not have an attribute equivalent."]}),`
`,e.jsx(t.h4,{id:"example-1",children:"Example"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
	"properties": {
		"message": {
			"type": String,
			"defaultValue": "Hello",
		},
		"shown": {
			"type": Boolean,
			"noAttribute": true,
		},
		"settings": {
			"type": Object,
		},
		"nums": {
			"type": Integer,
			"multiple": true,
		},
		"animationDuration": {
			"type": Integer,
		},
	},
}
`})}),`
`,e.jsx(t.h4,{id:"property-configuration-settings",children:"Property configuration settings"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Setting"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Default"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"type"})}),e.jsx(t.td,{children:"Property type"}),e.jsx(t.td,{children:"N/A"}),e.jsx(t.td,{children:"The type of the property. For more information on types see the table below."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"defaultValue"})}),e.jsx(t.td,{children:"Any valid value for the type"}),e.jsx(t.td,{children:"undefined"}),e.jsx(t.td,{children:'Default value of the property. Cannot be set for type "Boolean". Booleans are always false by default in HTML.'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"multiple"})}),e.jsx(t.td,{children:"Boolean"}),e.jsx(t.td,{children:"false"}),e.jsx(t.td,{children:"Indicates whether the property represents a single value or is an array of values of the given type."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"noAttribute"})}),e.jsx(t.td,{children:"Boolean"}),e.jsx(t.td,{children:"false"}),e.jsx(t.td,{children:"No attribute equivalent will be created for that property. Always true for properties of type Object."})]})]})]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"type"})," setting is required."]}),`
`,e.jsx(t.h4,{id:"types",children:"Types"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Class to Use"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"string"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"String"})}),e.jsx(t.td,{children:"String value"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"boolean"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Boolean"})}),e.jsx(t.td,{children:"Boolean value - always false by default"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"object"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Object"})}),e.jsx(t.td,{children:"JS Object"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"custom type"}),e.jsxs(t.td,{children:["Extend ",e.jsx(t.code,{children:"@ui5/webcomponents-base/dist/types/DataType.js"})]}),e.jsx(t.td,{children:"Used mainly for enumerations"})]})]})]}),`
`,e.jsx(t.h4,{id:"examples-of-prebuilt-custom-types",children:"Examples of prebuilt custom types"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Class to Use"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Integer"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"@ui5/webcomponents-base/dist/types/Integer.js"})}),e.jsx(t.td,{children:"Integer value"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"ValueState"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"@ui5/webcomponents-base/dist/types/ValueState.js"})}),e.jsxs(t.td,{children:["Enumeration with: ",e.jsx(t.code,{children:"None"}),", ",e.jsx(t.code,{children:"Error"}),", ",e.jsx(t.code,{children:"Warning"}),", ",e.jsx(t.code,{children:"Success"})," values"]})]})]})]}),`
`,e.jsx(t.h2,{id:"slots",children:"Slots"}),`
`,e.jsxs(t.p,{children:["Defines the ",e.jsx(t.code,{children:"slots"})," that will be provided by this UI5 Web Component."]}),`
`,e.jsx(t.h4,{id:"example-2",children:"Example"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
	"slots": {
		"default": {
			"type": Node,
		},
		"footer": {
			"type": HTMLElement,
		},
		"rows": {
			"type": HTMLElement,
			"individualSlots": true,
		}
	}
}
`})}),`
`,e.jsx(t.h4,{id:"slot-configuration-settings",children:"Slot configuration settings"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Setting"}),e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Default"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsxs(t.td,{children:[e.jsx(t.code,{children:"type"})," *"]}),e.jsxs(t.td,{children:[e.jsx(t.code,{children:"HTMLElement"})," or ",e.jsx(t.code,{children:"Node"})]}),e.jsx(t.td,{children:"N/A"}),e.jsx(t.td,{children:"The type of the children that can go into that slot."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"individualSlots"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Boolean"})}),e.jsx(t.td,{children:"false"}),e.jsxs(t.td,{children:["If set to ",e.jsx(t.code,{children:"true"}),", each child will have its own slot, allowing you to arrange/wrap the children arbitrarily."]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"propertyName"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"String"})}),e.jsx(t.td,{children:"N/A"}),e.jsx(t.td,{children:"Allows to set the name of the property on the Web Component, where the children belonging to this slot will be stored."})]}),e.jsxs(t.tr,{children:[e.jsxs(t.td,{children:[e.jsx(t.code,{children:"invalidateOnChildChange"})," **"]}),e.jsxs(t.td,{children:[e.jsx(t.code,{children:"Boolean"})," or ",e.jsx(t.code,{children:"Object"})]}),e.jsx(t.td,{children:"false"}),e.jsxs(t.td,{children:[e.jsx(t.strong,{children:"Experimental, do not use."})," Defines whether every invalidation of a UI5 Web Component in this slot should trigger an invalidation of the parent UI5 Web Component."]})]})]})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"*"})," The ",e.jsx(t.code,{children:"type"})," setting is required."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"**"}),`
`,e.jsx(t.strong,{children:"Important:"})," ",e.jsx(t.code,{children:"invalidateOnChildChange"})," is not meant to be used with standard DOM Elements and is not to be confused with ",e.jsx(t.code,{children:"MutationObserver"}),`-like functionality.
It rather targets the use case of components that slot abstract items (`,e.jsx(t.code,{children:"UI5Element"})," instances without a template) and require to be invalidated in turn whenever these items are invalidated."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"invalidateOnChildChange"})," setting can be either a ",e.jsx(t.code,{children:"Boolean"})," (",e.jsx(t.code,{children:"true"})," meaning invalidate the component on any change of a child in this slot) or an ",e.jsx(t.code,{children:"Object"})," with ",e.jsx(t.code,{children:"properties"})," and ",e.jsx(t.code,{children:"slots"}),` fields. They in turn can be either of
type `,e.jsx(t.code,{children:"Boolean"})," (",e.jsx(t.code,{children:"true"})," meaning invalidate on any property change or any slot change) or ",e.jsx(t.code,{children:"Array"})," of strings indicating exactly which properties or slots lead to invalidation."]}),`
`,e.jsx(t.p,{children:"Examples:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["In the following example, since ",e.jsx(t.code,{children:"invalidateOnChildChange"})," is not used (",e.jsx(t.code,{children:"false"})," by default), the component will be invalidated whenever children are added/removed in the ",e.jsx(t.code,{children:"tabs"}),` slot,
but not whenever a child in that slot changes.`]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
   managedSlots: true,
   slots: {
   	"default": {
   		"type": "HTMLElement",
   		"propertyName": "tabs",
   	}
   }
}
`})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Setting ",e.jsx(t.code,{children:"invalidateOnChildChange"})," to ",e.jsx(t.code,{children:"true"})," means: invalidate the component whenever a child in the ",e.jsx(t.code,{children:"tabs"})," slot gets invalidated, regardless of the reason."]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
   managedSlots: true,
   slots: {
   	"default": {
   		"type": "HTMLElement",
   		"propertyName": "tabs",
   		"invalidateOnChildChange": true
   	}
   }
}
`})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The example below results in exactly the same behavior as the one above, but it uses the more explicit ",e.jsx(t.code,{children:"Object"})," format:"]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
   managedSlots: true,
   slots: {
   	"default": {
   		"type": "HTMLElement",
   		"propertyName": "tabs",
   		"invalidateOnChildChange": {
   			"properties": true,
   			"slots": true
   		}
   	}
   }
}
`})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The following example uses the ",e.jsx(t.code,{children:"Object"}),` format again and means: invalidate the component whenever the children in this slot are invalidated due to property changes, but not due
to slot changes. Here `,e.jsx(t.code,{children:'"slots": false'})," is added for completeness (as ",e.jsx(t.code,{children:"false"})," is the default value for both ",e.jsx(t.code,{children:"properties"})," and ",e.jsx(t.code,{children:"slots"}),")"]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
   managedSlots: true,
   slots: {
   	"default": {
   		"type": "HTMLElement",
   		"propertyName": "tabs",
   		"invalidateOnChildChange": {
   			"properties": true,
   			"slots": false
   		}
   	}
   }
}
`})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The final example shows the most complex format of ",e.jsx(t.code,{children:"invalidateOnChildChange"})," which allows to define which slots or properties in the children inside that slot lead to invalidation of the component:"]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
   managedSlots: true,
   slots: {
   	"default": {
   		"type": "HTMLElement",
   		"propertyName": "tabs",
   		"invalidateOnChildChange": {
   			"properties": ["text", "selected", "disabled"],
   			"slots": ["default"]
   		}
   	}
   }
}
`})}),`
`,e.jsx(t.p,{children:"Notes:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Children without a ",e.jsx(t.code,{children:"slot"})," attribute will be assigned to the ",e.jsx(t.code,{children:"default"})," slot."]}),`
`,e.jsxs(t.li,{children:["All HTML text nodes will be assigned to the ",e.jsx(t.code,{children:"default"})," slot, as they cannot have a ",e.jsx(t.code,{children:"slot"})," attribute."]}),`
`,e.jsxs(t.li,{children:[`For all slots the Web Component will have a property created, with the name of the slot, to hold a list of all children assigned to this slot.
For example, if you have a slot named "rows", "this.rows" will be an array, holding references to all children with `,e.jsx(t.code,{children:'slot="rows"'}),", or no slot, if rows was default."]}),`
`,e.jsxs(t.li,{children:["For the ",e.jsx(t.code,{children:"default"})," slot you can provide a ",e.jsx(t.code,{children:"propertyName"}),` setting.
For example, if your default slot has a `,e.jsx(t.code,{children:'propertyName: "items"'}),', then "this.items" will hold all children that were assigned to the default slot.']}),`
`]}),`
`,e.jsx(t.h4,{id:"allowed-slot-types",children:"Allowed slot types"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Type"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Node"}),e.jsx(t.td,{children:"Accepts both Text nodes and HTML Elements"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"HTMLElement"}),e.jsx(t.td,{children:"Accepts HTML Elements only"})]})]})]}),`
`,e.jsx(t.h2,{id:"managed-slots",children:"Managed slots"}),`
`,e.jsx(t.p,{children:"Determines whether the framework should manage the slots of this UI5 Web Component."}),`
`,e.jsx(t.p,{children:`This setting is useful for UI5 Web Components that don't just slot children, but additionally base their own
rendering on the presence/absence/type of children.`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
	"managedSlots": true
}
`})}),`
`,e.jsxs(t.p,{children:["When ",e.jsx(t.code,{children:"managedSlots"})," is set to ",e.jsx(t.code,{children:"true"}),":"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The framework will invalidate this UI5 Web Component, whenever its children are added/removed/rearranged (and additionally when invalidated, if ",e.jsx(t.code,{children:"invalidateOnChildChange"})," is set)."]}),`
`,e.jsx(t.li,{children:`If any of this UI5 Web Component's children are custom elements, the framework will await until they are all
defined and upgraded, before rendering the component for the first time.`}),`
`,e.jsxs(t.li,{children:[`The framework will create properties for each slot on this UI5 Web Component's instances for easier access
to the slotted children. For example, if there are `,e.jsx(t.code,{children:"header"}),", ",e.jsx(t.code,{children:"content"})," and ",e.jsx(t.code,{children:"footer"}),` slots, there will be
respectively `,e.jsx(t.code,{children:"header"}),", ",e.jsx(t.code,{children:"content"})," and ",e.jsx(t.code,{children:"footer"})," properties of type ",e.jsx(t.code,{children:"Array"}),` holding the slotted children for each slot.
`,e.jsx(t.strong,{children:"Note:"})," You can use the ",e.jsx(t.code,{children:"propertyName"})," metadata entity, described above, to modify these."]}),`
`]}),`
`,e.jsxs(t.p,{children:["In essence, set this to ",e.jsx(t.code,{children:"true"}),` if the UI5 Web Component you're developing should be aware of its children
for the purposes of its own state management and rendering (contrary to just displaying them).`]}),`
`,e.jsxs(t.p,{children:["An example of a component that would benefit from ",e.jsx(t.code,{children:"managedSlots"}),` is a Tab Container that monitors its children (Tabs)
in order to display a link on its Tab Strip for each Tab child. Therefore, it would need to be invalidated whenever
Tabs are added/removed, in order to update its own state and visualization.`]}),`
`,e.jsx(t.h2,{id:"language-aware-components",children:"Language-aware components"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"languageAware"})," metadata setting determines if the component should be re-rendered whenever the language changes."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
	"languageAware": true
}
`})}),`
`,e.jsx(t.p,{children:`You should use this setting if your component has translatable texts, therefore needs to be re-rendered when the app
changes the language.`}),`
`,e.jsx(t.h2,{id:"theme-aware-components",children:"Theme-aware components"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"themeAware"})," metadata setting determines if the component should re-render whenever the theme changes."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
	"themeAware": true
}
`})}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Important: You should almost never use this setting."})}),`
`,e.jsxs(t.p,{children:[`Normally components are built in such a way that their structure
is exactly the same for all themes and whenever the theme changes `,e.jsx(t.em,{children:"only CSS Variables are changed"}),` and the component itself
does not need to be re-rendered - the browser automatically updates the styles when CSS Variables get new values.`]}),`
`,e.jsxs(t.p,{children:[`However, there are some very rare cases where a component must behave differently (opposed to just look differently) based on the theme.
For example, the `,e.jsx(t.code,{children:"ui5-icon"})," component must show different versions of the icons based on the theme. Use the ",e.jsx(t.code,{children:"themeAware"}),` setting
in these exceptional cases to guarantee that your component will be re-rendered on theme change.`]}),`
`,e.jsx(l,{})]})}function b(n={}){const{wrapper:t}=Object.assign({},r(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(s,n)})):s(n)}export{b as default};
