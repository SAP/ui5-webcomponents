import{j as e}from"./jsx-runtime.d0876325.js";import{M as i}from"./index.854754ad.js";import{u as o}from"./index.cae18a49.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function g(s={}){const{wrapper:n}=Object.assign({},o(),s.components);return n?e.exports.jsx(n,Object.assign({},s,{children:e.exports.jsx(r,{})})):r();function r(){const t=Object.assign({h1:"h1",p:"p",em:"em",h2:"h2",h4:"h4",pre:"pre",code:"code",strong:"strong",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",ul:"ul",li:"li",a:"a"},o(),s.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Development/Understanding components metadata"}),`
`,e.exports.jsx(t.h1,{children:"Understanding UI5 Web Components Metadata"}),`
`,e.exports.jsx(t.p,{children:"Metadata is a JavaScript object, containing information about the public interface of a UI5 Web Component (tag name, properties, etc.)."}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.em,{children:"Disclaimer: The information below is for UI5 Web Components development only. It is experimental and may change."})}),`
`,e.exports.jsx(t.h2,{children:"Tag"}),`
`,e.exports.jsx(t.p,{children:"Defines the HTML tag for the Web Component."}),`
`,e.exports.jsx(t.h4,{children:"Example:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
	"tag": "ui5-my-element",
}
`})}),`
`,e.exports.jsx(t.h2,{children:"Properties / Attributes"}),`
`,e.exports.jsx(t.p,{children:"Defines the HTML properties for the Web Component."}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.strong,{children:"Note about attributes:"})," By default, for each property an equivalent attribute is supported. Attributes have the same names as properties, but in ",e.exports.jsx(t.code,{children:"kebab-case"})," rather than ",e.exports.jsx(t.code,{children:"camelCase"}),`.
Properties of type `,e.exports.jsx(t.code,{children:"Object"}),", properties with ",e.exports.jsx(t.code,{children:"multiple"})," set to",e.exports.jsx(t.code,{children:"true"})," and properties with ",e.exports.jsx(t.code,{children:"noAttribute"})," set to ",e.exports.jsx(t.code,{children:"true"})," do not have an attribute equivalent."]}),`
`,e.exports.jsx(t.h4,{children:"Example"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
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
`,e.exports.jsx(t.h4,{children:"Property configuration settings"}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"Setting"}),e.exports.jsx(t.th,{children:"Type"}),e.exports.jsx(t.th,{children:"Default"}),e.exports.jsx(t.th,{children:"Description"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"type"})}),e.exports.jsx(t.td,{children:"Property type"}),e.exports.jsx(t.td,{children:"N/A"}),e.exports.jsx(t.td,{children:"The type of the property. For more information on types see the table below."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"defaultValue"})}),e.exports.jsx(t.td,{children:"Any valid value for the type"}),e.exports.jsx(t.td,{children:"undefined"}),e.exports.jsx(t.td,{children:'Default value of the property. Cannot be set for type "Boolean". Booleans are always false by default in HTML.'})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"multiple"})}),e.exports.jsx(t.td,{children:"Boolean"}),e.exports.jsx(t.td,{children:"false"}),e.exports.jsx(t.td,{children:"Indicates whether the property represents a single value or is an array of values of the given type."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"noAttribute"})}),e.exports.jsx(t.td,{children:"Boolean"}),e.exports.jsx(t.td,{children:"false"}),e.exports.jsx(t.td,{children:"No attribute equivalent will be created for that property. Always true for properties of type Object."})]})]})]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"type"})," setting is required."]}),`
`,e.exports.jsx(t.h4,{children:"Types"}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"Type"}),e.exports.jsx(t.th,{children:"Class to Use"}),e.exports.jsx(t.th,{children:"Description"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:"string"}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"String"})}),e.exports.jsx(t.td,{children:"String value"})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:"boolean"}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"Boolean"})}),e.exports.jsx(t.td,{children:"Boolean value - always false by default"})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:"object"}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"Object"})}),e.exports.jsx(t.td,{children:"JS Object"})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:"custom type"}),e.exports.jsxs(t.td,{children:["Extend ",e.exports.jsx(t.code,{children:"@ui5/webcomponents-base/dist/types/DataType.js"})]}),e.exports.jsx(t.td,{children:"Used mainly for enumerations"})]})]})]}),`
`,e.exports.jsx(t.h4,{children:"Examples of prebuilt custom types"}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"Type"}),e.exports.jsx(t.th,{children:"Class to Use"}),e.exports.jsx(t.th,{children:"Description"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:"Integer"}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"@ui5/webcomponents-base/dist/types/Integer.js"})}),e.exports.jsx(t.td,{children:"Integer value"})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:"ValueState"}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"@ui5/webcomponents-base/dist/types/ValueState.js"})}),e.exports.jsxs(t.td,{children:["Enumeration with: ",e.exports.jsx(t.code,{children:"None"}),", ",e.exports.jsx(t.code,{children:"Error"}),", ",e.exports.jsx(t.code,{children:"Warning"}),", ",e.exports.jsx(t.code,{children:"Success"})," values"]})]})]})]}),`
`,e.exports.jsx(t.h2,{children:"Slots"}),`
`,e.exports.jsxs(t.p,{children:["Defines the ",e.exports.jsx(t.code,{children:"slots"})," that will be provided by this UI5 Web Component."]}),`
`,e.exports.jsx(t.h4,{children:"Example"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
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
`,e.exports.jsx(t.h4,{children:"Slot configuration settings"}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"Setting"}),e.exports.jsx(t.th,{children:"Type"}),e.exports.jsx(t.th,{children:"Default"}),e.exports.jsx(t.th,{children:"Description"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsxs(t.td,{children:[e.exports.jsx(t.code,{children:"type"})," *"]}),e.exports.jsxs(t.td,{children:[e.exports.jsx(t.code,{children:"HTMLElement"})," or ",e.exports.jsx(t.code,{children:"Node"})]}),e.exports.jsx(t.td,{children:"N/A"}),e.exports.jsx(t.td,{children:"The type of the children that can go into that slot."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"individualSlots"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"Boolean"})}),e.exports.jsx(t.td,{children:"false"}),e.exports.jsxs(t.td,{children:["If set to ",e.exports.jsx(t.code,{children:"true"}),", each child will have its own slot, allowing you to arrange/wrap the children arbitrarily."]})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"propertyName"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"String"})}),e.exports.jsx(t.td,{children:"N/A"}),e.exports.jsx(t.td,{children:"Allows to set the name of the property on the Web Component, where the children belonging to this slot will be stored."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsxs(t.td,{children:[e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," **"]}),e.exports.jsxs(t.td,{children:[e.exports.jsx(t.code,{children:"Boolean"})," or ",e.exports.jsx(t.code,{children:"Object"})]}),e.exports.jsx(t.td,{children:"false"}),e.exports.jsxs(t.td,{children:[e.exports.jsx(t.strong,{children:"Experimental, do not use."})," Defines whether every invalidation of a UI5 Web Component in this slot should trigger an invalidation of the parent UI5 Web Component."]})]})]})]}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.code,{children:"*"})," The ",e.exports.jsx(t.code,{children:"type"})," setting is required."]}),`
`,e.exports.jsxs(t.p,{children:[e.exports.jsx(t.code,{children:"**"}),`
`,e.exports.jsx(t.strong,{children:"Important:"})," ",e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," is not meant to be used with standard DOM Elements and is not to be confused with ",e.exports.jsx(t.code,{children:"MutationObserver"}),`-like functionality.
It rather targets the use case of components that slot abstract items (`,e.exports.jsx(t.code,{children:"UI5Element"})," instances without a template) and require to be invalidated in turn whenever these items are invalidated."]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," setting can be either a ",e.exports.jsx(t.code,{children:"Boolean"})," (",e.exports.jsx(t.code,{children:"true"})," meaning invalidate the component on any change of a child in this slot) or an ",e.exports.jsx(t.code,{children:"Object"})," with ",e.exports.jsx(t.code,{children:"properties"})," and ",e.exports.jsx(t.code,{children:"slots"}),` fields. They in turn can be either of
type `,e.exports.jsx(t.code,{children:"Boolean"})," (",e.exports.jsx(t.code,{children:"true"})," meaning invalidate on any property change or any slot change) or ",e.exports.jsx(t.code,{children:"Array"})," of strings indicating exactly which properties or slots lead to invalidation."]}),`
`,e.exports.jsx(t.p,{children:"Examples:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["In the following example, since ",e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," is not used (",e.exports.jsx(t.code,{children:"false"})," by default), the component will be invalidated whenever children are added/removed in the ",e.exports.jsx(t.code,{children:"tabs"}),` slot,
but not whenever a child in that slot changes.`]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
   managedSlots: true,
   slots: {
   	"default": {
   		"type": "HTMLElement",
   		"propertyName": "tabs",
   	}
   }
}
`})}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["Setting ",e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," to ",e.exports.jsx(t.code,{children:"true"})," means: invalidate the component whenever a child in the ",e.exports.jsx(t.code,{children:"tabs"})," slot gets invalidated, regardless of the reason."]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
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
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["The example below results in exactly the same behavior as the one above, but it uses the more explicit ",e.exports.jsx(t.code,{children:"Object"})," format:"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
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
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["The following example uses the ",e.exports.jsx(t.code,{children:"Object"}),` format again and means: invalidate the component whenever the children in this slot are invalidated due to property changes, but not due
to slot changes. Here `,e.exports.jsx(t.code,{children:'"slots": false'})," is added for completeness (as ",e.exports.jsx(t.code,{children:"false"})," is the default value for both ",e.exports.jsx(t.code,{children:"properties"})," and ",e.exports.jsx(t.code,{children:"slots"}),")"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
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
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["The final example shows the most complex format of ",e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," which allows to define which slots or properties in the children inside that slot lead to invalidation of the component:"]}),`
`]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
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
`,e.exports.jsx(t.p,{children:"Notes:"}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["Children without a ",e.exports.jsx(t.code,{children:"slot"})," attribute will be assigned to the ",e.exports.jsx(t.code,{children:"default"})," slot."]}),`
`,e.exports.jsxs(t.li,{children:["All HTML text nodes will be assigned to the ",e.exports.jsx(t.code,{children:"default"})," slot, as they cannot have a ",e.exports.jsx(t.code,{children:"slot"})," attribute."]}),`
`,e.exports.jsxs(t.li,{children:[`For all slots the Web Component will have a property created, with the name of the slot, to hold a list of all children assigned to this slot.
For example, if you have a slot named "rows", "this.rows" will be an array, holding references to all children with `,e.exports.jsx(t.code,{children:'slot="rows"'}),", or no slot, if rows was default."]}),`
`,e.exports.jsxs(t.li,{children:["For the ",e.exports.jsx(t.code,{children:"default"})," slot you can provide a ",e.exports.jsx(t.code,{children:"propertyName"}),` setting.
For example, if your default slot has a `,e.exports.jsx(t.code,{children:'propertyName: "items"'}),', then "this.items" will hold all children that were assigned to the default slot.']}),`
`]}),`
`,e.exports.jsx(t.h4,{children:"Allowed slot types"}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"Type"}),e.exports.jsx(t.th,{children:"Description"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:"Node"}),e.exports.jsx(t.td,{children:"Accepts both Text nodes and HTML Elements"})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:"HTMLElement"}),e.exports.jsx(t.td,{children:"Accepts HTML Elements only"})]})]})]}),`
`,e.exports.jsx(t.h2,{children:"Managed slots"}),`
`,e.exports.jsx(t.p,{children:"Determines whether the framework should manage the slots of this UI5 Web Component."}),`
`,e.exports.jsx(t.p,{children:`This setting is useful for UI5 Web Components that don't just slot children, but additionally base their own
rendering on the presence/absence/type of children.`}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
	"managedSlots": true
}
`})}),`
`,e.exports.jsxs(t.p,{children:["When ",e.exports.jsx(t.code,{children:"managedSlots"})," is set to ",e.exports.jsx(t.code,{children:"true"}),":"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["The framework will invalidate this UI5 Web Component, whenever its children are added/removed/rearranged (and additionally when invalidated, if ",e.exports.jsx(t.code,{children:"invalidateOnChildChange"})," is set)."]}),`
`,e.exports.jsx(t.li,{children:`If any of this UI5 Web Component's children are custom elements, the framework will await until they are all
defined and upgraded, before rendering the component for the first time.`}),`
`,e.exports.jsxs(t.li,{children:[`The framework will create properties for each slot on this UI5 Web Component's instances for easier access
to the slotted children. For example, if there are `,e.exports.jsx(t.code,{children:"header"}),", ",e.exports.jsx(t.code,{children:"content"})," and ",e.exports.jsx(t.code,{children:"footer"}),` slots, there will be
respectively `,e.exports.jsx(t.code,{children:"header"}),", ",e.exports.jsx(t.code,{children:"content"})," and ",e.exports.jsx(t.code,{children:"footer"})," properties of type ",e.exports.jsx(t.code,{children:"Array"}),` holding the slotted children for each slot.
`,e.exports.jsx(t.strong,{children:"Note:"})," You can use the ",e.exports.jsx(t.code,{children:"propertyName"})," metadata entity, described above, to modify these."]}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["In essence, set this to ",e.exports.jsx(t.code,{children:"true"}),` if the UI5 Web Component you're developing should be aware of its children
for the purposes of its own state management and rendering (contrary to just displaying them).`]}),`
`,e.exports.jsxs(t.p,{children:["An example of a component that would benefit from ",e.exports.jsx(t.code,{children:"managedSlots"}),` is a Tab Container that monitors its children (Tabs)
in order to display a link on its Tab Strip for each Tab child. Therefore, it would need to be invalidated whenever
Tabs are added/removed, in order to update its own state and visualization.`]}),`
`,e.exports.jsx(t.h2,{children:"Language-aware components"}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"languageAware"})," metadata setting determines if the component should be re-rendered whenever the language changes."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
	"languageAware": true
}
`})}),`
`,e.exports.jsx(t.p,{children:`You should use this setting if your component has translatable texts, therefore needs to be re-rendered when the app
changes the language.`}),`
`,e.exports.jsx(t.h2,{children:"Theme-aware components"}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"themeAware"})," metadata setting determines if the component should re-render whenever the theme changes."]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-json",children:`{
	"themeAware": true
}
`})}),`
`,e.exports.jsx(t.p,{children:e.exports.jsx(t.strong,{children:"Important: You should almost never use this setting."})}),`
`,e.exports.jsxs(t.p,{children:[`Normally components are built in such a way that their structure
is exactly the same for all themes and whenever the theme changes `,e.exports.jsx(t.em,{children:"only CSS Variables are changed"}),` and the component itself
does not need to be re-rendered - the browser automatically updates the styles when CSS Variables get new values.`]}),`
`,e.exports.jsxs(t.p,{children:[`However, there are some very rare cases where a component must behave differently (opposed to just look differently) based on the theme.
For example, the `,e.exports.jsx(t.code,{children:"ui5-icon"})," component must show different versions of the icons based on the theme. Use the ",e.exports.jsx(t.code,{children:"themeAware"}),` setting
in these exceptional cases to guarantee that your component will be re-rendered on theme change.`]}),`
`,e.exports.jsxs(t.p,{children:["Next: ",e.exports.jsxs(t.a,{href:"./04-understanding-hbs-templates.md",children:["Understanding the Handlebars (",e.exports.jsx(t.code,{children:".hbs"}),") templates"]})]})]})}}export{g as default};
//# sourceMappingURL=03-understanding-components-metadata.261501f9.js.map
