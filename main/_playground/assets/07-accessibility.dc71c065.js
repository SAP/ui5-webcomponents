import{j as e}from"./jsx-runtime.7897cedd.js";import{M as i}from"./index.8cb7a9d9.js";import{u as r}from"./index.ce731c38.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function j(s={}){const{wrapper:n}=Object.assign({},r(),s.components);return n?e.exports.jsx(n,Object.assign({},s,{children:e.exports.jsx(o,{})})):o();function o(){const t=Object.assign({h1:"h1",p:"p",h2:"h2",a:"a",code:"code",h3:"h3",strong:"strong",pre:"pre",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",hr:"hr"},r(),s.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Advanced/Accessibility"}),`
`,e.exports.jsx(t.h1,{children:"Accessibility in UI5 Web Components"}),`
`,e.exports.jsx(t.p,{children:"Accessibility refers to the possibility for everyone, including and especially people with disabilities, to access and use IT products. Making software work for more people should be of high priority. All users should be able to operate our software without loss of meaningful content, functionality, and efficiency when using assistive technologies."}),`
`,e.exports.jsx(t.p,{children:"Following those principles in an ongoing approach, we at UI5 Web Components aim to bring accessibility to life by providing the appropriate accessibility features, and following precise accessibility requirements and processes."}),`
`,e.exports.jsx(t.h2,{children:"Web Components & Accessibility"}),`
`,e.exports.jsx(t.p,{children:"Web Components allow developers to make their own custom components with native HTML and JavaScript with the usage of custom elements, shadow DOM, and templates. In HTML you can define an element using a role.  When you use semantic elements, you don\u2019t need to define a role as these elements receive all relevant aria mappings out of the box. However, this is not the case when you use custom elements where you should add all relevant accessibility attributes yourselves."}),`
`,e.exports.jsx(t.p,{children:"This is not needed in UI5 Web Components, because when using our elements, all relevant accessibility attributes for a certain component will be applied in the shadow DOM, without further setup. Additionally, many accessibility-related APIs are available. They can be used to enhance the accessibility in the context of each application."}),`
`,e.exports.jsxs(t.p,{children:["As the Web Components are a new standard, there are still some gaps in regard to accessibility. For example - setting IDRef relationships is currently not possible due to the nature of the custom elements and their shadow DOM. This is a limitation in the ARIA support and there is a draft of a new ",e.exports.jsx(t.a,{href:"https://github.com/WICG/aom",children:"AOM (Accessibility Object Model)"}),", which addresses this issue and many more, and aims at a better JS-based accessibility support for all web elements. We are continuously working on improving the existing limitations. For example, in order to create a Label-Input relationship, you can use the ",e.exports.jsx(t.code,{children:"for"})," property of the label component to bind the label to an input, or ",e.exports.jsx(t.code,{children:"accessible-name-ref"})," property of the input component to bind the input to a label."]}),`
`,e.exports.jsx(t.h2,{children:"Accessibility Features"}),`
`,e.exports.jsx(t.p,{children:"Many accessibility features are built into the core design elements upfront and are available to app teams out of the box. Keyboard navigation and interaction, tab and reading order, as well as screen reader support are fundamental features enabled in UI5 Web Components. Visualization features like high contrast themes, consistency of icons, keyboard focus visualization, layout adaptation, and support for text resizing are also available."}),`
`,e.exports.jsx(t.h3,{children:e.exports.jsx(t.strong,{children:"Screen Reader Support"})}),`
`,e.exports.jsx(t.p,{children:"UI5 Web Components provide the prerequisites for screen reader support based on the HTML, ARIA, and WCAG standards support in order to aid people using screen reader software."}),`
`,e.exports.jsxs(t.p,{children:["Navigation with the keyboard and screen reader should work properly together. In order for this to happen, you need to use the correct ARIA attributes and to map them to their HTML counterparts. With UI5 Web Components you will receive ARIA mapped elements out of the box. For example let's add a ",e.exports.jsx(t.code,{children:"ui5-combobox"})," component:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-combobox>
    <ui5-cb-item text="Item 1"></ui5-cb-item>
</ui5-combobox>
`})}),`
`,e.exports.jsxs(t.p,{children:["By doing so, you receive an input element with ",e.exports.jsx(t.code,{children:'role="combobox"'})," with all aria attributes relevant for this role in the shadow DOM. Also, if you set the ",e.exports.jsx(t.code,{children:"disabled"})," property, this will automatically add ",e.exports.jsx(t.code,{children:"disabled"})," to the shadow ",e.exports.jsx(t.code,{children:"combobox"})," element. Attribute mapping is available for all relevant properties - ",e.exports.jsx(t.code,{children:"required"}),", ",e.exports.jsx(t.code,{children:"disabled"}),", ",e.exports.jsx(t.code,{children:"readonly"}),", and more."]}),`
`,e.exports.jsx(t.p,{children:"In order to ease the setting of aria attributes, we have introduced properties that are available for developers to extend the accessibility support in the context of the application. More information about the available properties could be found in the Accessibility APIs section below."}),`
`,e.exports.jsx(t.h3,{children:e.exports.jsx(t.strong,{children:"Invisible Messaging"})}),`
`,e.exports.jsx(t.p,{children:"The Invisible Message provides a way to programmaticaly expose dynamic content changes in a way that can be announced by screen readers. It marks the dynamic content changes as ARIA live regions so that you are able to inform the users of assistive technologies for a change that has happened to the UI."}),`
`,e.exports.jsxs(t.p,{children:["The Invisible Messaging service is designed to be used both internally in the components logic and from the applications. Using the service, you have to specify the message to be announced by the screen reader and the mode which will be inserted in the ",e.exports.jsx(t.code,{children:"aria-live"})," attribute via the ",e.exports.jsx(t.code,{children:"InvisibleMessage.announce(message, mode)"})," method. The possible modes to choose from are:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:" InvisibleMessageMode.Assertive"})," - indicates that updates to the region have the highest priority and should be presented to the user immediately."]}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.code,{children:"InvisibleMessageMode.Polite"})," - indicates that updates to the region should be presented at the next graceful opportunity such as at the end of reading the current sentence, or when the user paused typing."]}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["According to the WAI-ARIA recommendations, the live regions should be initialised empty when the page is loaded. This way screen readers remember them and start to listen for changes of their value. Thus, we recommend to instantiate Invisible Message  as early as possible in the application. Then, you should specify the text, that has to be announced by the screen reader and the live region\u2019s mode using the ",e.exports.jsx(t.code,{children:"announce"}),` method.
Here is an example usage of the invisible messaging service - `,e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/MessageStrip/",children:"Dynamic MessageStrip Generator Sample"})]}),`
`,e.exports.jsx(t.h3,{children:e.exports.jsx(t.strong,{children:"Keyboard Handling"})}),`
`,e.exports.jsx(t.p,{children:"All standard UI elements and controls are designed to be keyboard-enabled. All suitable input channels (such as mouse, keyboard, or touch) are treated equally according to the capabilities of the device or the individual preferences of the user. For example, some users may prefer using the keyboard instead of a mouse, which lets them work faster."}),`
`,e.exports.jsx(t.p,{children:"Support for standard keystrokes, based on the role of the component element is available. Complex components also provide advanced keyboard handling, which is described in the Overview section of each component."}),`
`,e.exports.jsx(t.h3,{children:e.exports.jsx(t.strong,{children:"Theming"})}),`
`,e.exports.jsx(t.p,{children:"Theming is an important aspect when it comes to a UI5 Web Components application. The different colors shown on the UI need to have a good contrast to each other in order to be easily distinguishable. We ensure that the requirements for color contrast are fulfilled in all themes. High Contrast White and High Contrast Black themes are also available to support people with visual impairments."}),`
`,e.exports.jsxs(t.p,{children:["For more information regarding the available themes and how to use them, see the ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/advanced/configuration",children:"Configuration"})," section."]}),`
`,e.exports.jsx(t.h2,{children:"Accessibility APIs"}),`
`,e.exports.jsx(t.p,{children:"The mapping of the accessibility APIs to ARIA attributes is described in the following table:"}),`
`,e.exports.jsxs(t.table,{children:[e.exports.jsx(t.thead,{children:e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.th,{children:"UI5 Web Components Property"}),e.exports.jsx(t.th,{children:"HTML attribute"}),e.exports.jsx(t.th,{children:"Description"})]})}),e.exports.jsxs(t.tbody,{children:[e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"accessibleName"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"aria-label"})}),e.exports.jsx(t.td,{children:"Defines the text alternative of the component. If not provided, a default text alternative is set, if present."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"accessibleNameRef"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"aria-label"})}),e.exports.jsxs(t.td,{children:["Alternative for ",e.exports.jsx(t.code,{children:"aria-labelledby"}),". Receives ID (or many IDs) of the elements that serve as labels of the component. Those labels are passed as a concatenated string to the ",e.exports.jsx(t.code,{children:"aria-label"})," attribute."]})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"accessibleRole"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"role"})}),e.exports.jsx(t.td,{children:"Sets the accessible aria role of the component."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"accessibilityTexts"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"aria-label"})}),e.exports.jsx(t.td,{children:"An object of strings that define several additional accessibility texts for further customization."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"accessibilityAttributes"})}),e.exports.jsxs(t.td,{children:[e.exports.jsx(t.code,{children:"aria-expanded"}),", ",e.exports.jsx(t.code,{children:"aria-haspopup"}),", ",e.exports.jsx(t.code,{children:"aria-controls"})]}),e.exports.jsx(t.td,{children:"An object of strings that defines several additional accessibility attribute values for customization depending on the use case."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"accessibilityRoles"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"role"})}),e.exports.jsx(t.td,{children:"An object of strings that define several additional accessibility roles for further customization."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"required"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"aria-required"})}),e.exports.jsx(t.td,{children:"Defines whether the component is required."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"readonly"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"aria-readonly"})}),e.exports.jsx(t.td,{children:"Defines whether the component is read-only."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"disabled"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"aria-disabled"})}),e.exports.jsx(t.td,{children:"Defines whether the component is disabled."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"checked"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"aria-checked"})}),e.exports.jsx(t.td,{children:"Defines whether the component is checked."})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsxs(t.td,{children:[e.exports.jsx(t.code,{children:"level"}),", ",e.exports.jsx(t.code,{children:"headerLevel"})]}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"aria-level"})}),e.exports.jsx(t.td,{children:'Defines the heading level of a title. Available options are: "H6" to "H1".'})]}),e.exports.jsxs(t.tr,{children:[e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"interactive"})}),e.exports.jsx(t.td,{children:e.exports.jsx(t.code,{children:"tabindex"})}),e.exports.jsx(t.td,{children:"Defines if the component is interactive (focusable and pressable)."})]})]})]}),`
`,e.exports.jsx(t.h3,{children:"accessibleName"}),`
`,e.exports.jsx(t.p,{children:"Setting the property on the custom element as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-combobox accessible-name="Enter Value">
    <ui5-cb-item text="Item 1"></ui5-cb-item>
</ui5-combobox>
`})}),`
`,e.exports.jsx(t.p,{children:"Will result in the shadow DOM as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<input role="combobox" aria-label="Enter value" ... >
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"accessible-name"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["Popups: ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Dialog",children:"Dialog"}),", ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Popover",children:"Popover"})]}),`
`,e.exports.jsxs(t.li,{children:["User input components (e.g. ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Input",children:"Input"}),", ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/RadioButton",children:"RadioButton"}),")"]}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Panel",children:"Panel"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Breadcrumbs",children:"Breadcrumbs"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Button",children:"Button"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Icon",children:"Icon"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/List",children:"List"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/CheckBox",children:"CheckBox"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/RatingIndicator",children:"Rating Indicator"})}),`
`,e.exports.jsxs(t.li,{children:[e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Slider",children:"Slider"}),`,
`,e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/RangeSlider",children:"Range Slider"})]}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Table",children:"Table"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Tree",children:"Tree"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Card",children:"Card"})}),`
`]}),`
`,e.exports.jsx(t.hr,{}),`
`,e.exports.jsx(t.h3,{children:"accessibleNameRef"}),`
`,e.exports.jsx(t.p,{children:"Setting the property on the custom element as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-label id="myLabel" for="myInput">Date of birth</ui5-label>
<ui5-input id="myInput" accessible-name-ref="myLabel"></ui5-input>
`})}),`
`,e.exports.jsx(t.p,{children:"Will result in the shadow DOM as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<input aria-label="Date of birth" ... >
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"accessible-name-ref"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["Popups: ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Dialog",children:"Dialog"}),", ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Popover",children:"Popover"})]}),`
`,e.exports.jsxs(t.li,{children:["User input components (e.g. ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Input",children:"Input"}),", ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/RadioButton",children:"RadioButton"}),")"]}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Link",children:"Link"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Button",children:"Button"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/List",children:"List"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/CheckBox",children:"CheckBox"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Table",children:"Table"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Tree",children:"Tree"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Card",children:"Card"})}),`
`]}),`
`,e.exports.jsx(t.hr,{}),`
`,e.exports.jsx(t.h3,{children:"accessibilityTexts"}),`
`,e.exports.jsxs(t.p,{children:["This property accepts ",e.exports.jsx(t.code,{children:"object"})," with property values for different parts of the FlexibleColumnLayout elements. For more detailed information on every object property, read the API description in ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/FlexibleColumnLayout",children:"FlexibleColumnLayout"}),"."]}),`
`,e.exports.jsx(t.p,{children:"Setting the property on the custom element as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-flexible-column-layout id="component">...</ui5-flexible-column-layout>

<script>
    const component = document.getElemetnById("component");
    component.accessibilityTexts = {
        startColumnAccessibleName: "Products list",
    };
<\/script>
`})}),`
`,e.exports.jsx(t.p,{children:"Will result in the shadow DOM as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<div role="region" aria-labelledby="component-startColumnText" ... >
    ...
    <span id="component-startColumnText" class="ui5-hidden-text" ... >
        Products list
    </span>
    ...
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"accessibilityTexts"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/FlexibleColumnLayout",children:"FlexibleColumnLayout"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/ShellBar",children:"ShellBar"})}),`
`]}),`
`,e.exports.jsx(t.hr,{}),`
`,e.exports.jsx(t.h3,{children:"accessibilityAttributes"}),`
`,e.exports.jsxs(t.p,{children:["This property accepts an ",e.exports.jsx(t.code,{children:"object"})," with property values, which will be used to generate additinal accessibility attributes to the root element. For more detailed information on every object property, read the API description in ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Button/",children:"Button"}),"."]}),`
`,e.exports.jsx(t.p,{children:"Setting the property on the custom element as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-button id="button">...</ui5-button>
<ui5-dialog id="dialogIdentificator">...</ui5-dialog>

<script>
    const component = document.getElemetnById("button");
    component.accessibilityAttributes = {
        hasPopup: "dialog",
        controls: "dialogIdentificator"
    };
<\/script>
`})}),`
`,e.exports.jsx(t.p,{children:"Will result in the shadow DOM as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<button type="button" class="ui5-button-root" part="button" aria-controls="dialogIdentificator" aria-haspopup="dialog">
	...
</button>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"accessibilityAttributes"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Button",children:"Button"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Link",children:"Link"})}),`
`]}),`
`,e.exports.jsx(t.hr,{}),`
`,e.exports.jsx(t.h3,{children:"accessibilityRoles"}),`
`,e.exports.jsxs(t.p,{children:["This property accepts ",e.exports.jsx(t.code,{children:"object"})," with property values for different parts of the ",e.exports.jsx(t.code,{children:"FlexibleColumnLayout"})," elements. For more detailed information on every object property, read the API description in ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/FlexibleColumnLayout",children:"FlexibleColumnLayout"}),"."]}),`
`,e.exports.jsx(t.p,{children:"Setting the property on the custom element as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-flexible-column-layout id="component">...</ui5-flexible-column-layout>

<script>
    const component = document.getElemetnById("component");
    component.accessibilityRoles = {
        startColumnRole: "complimentary",
    };
<\/script>
`})}),`
`,e.exports.jsx(t.p,{children:"Results in the shadow DOM as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<div role="complimentary" ... >
    ...
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"accessibilityRoles"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/FlexibleColumnLayout",children:"FlexibleColumnLayout"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/ShellBar",children:"ShellBar"})}),`
`]}),`
`,e.exports.jsx(t.hr,{}),`
`,e.exports.jsx(t.h3,{children:"accessibleRole"}),`
`,e.exports.jsx(t.p,{children:"Setting the property on the custom element as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-panel accessible-role="Complementary">
    ...
</ui5-panel>
`})}),`
`,e.exports.jsx(t.p,{children:"Will result in the shadow DOM as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<div role="complementary" ... >
    ...
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"accessible-role"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsxs(t.li,{children:["User input components (e.g. ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Input",children:"Input"}),", ",e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/RadioButton",children:"RadioButton"}),")"]}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Panel",children:"Panel"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/List",children:"List"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Icon",children:"Icon"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Popover/",children:"Popover"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Dialog/",children:"Dialog"})}),`
`]}),`
`,e.exports.jsx(t.hr,{}),`
`,e.exports.jsx(t.h3,{children:"level, headerLevel"}),`
`,e.exports.jsx(t.p,{children:"Setting the property on the custom element as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-title level="H3">Title</ui5-title>
...
<ui5-panel header-text="Panel Header" header-level="H3">
</ui5-panel>
`})}),`
`,e.exports.jsx(t.p,{children:"Will result in the shadow DOM as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<h3 class="ui5-title-root" ... >...</h3>
...
<div class="ui5-panel-root" ... >
    ...
    <div role="heading" aria-level="3" ...>
        Panel Header
    </div>
    ...
</div>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"level"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Title",children:"Title"})}),`
`]}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"header-level"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Panel",children:"Panel"})}),`
`]}),`
`,e.exports.jsx(t.hr,{}),`
`,e.exports.jsx(t.h3,{children:"interactive"}),`
`,e.exports.jsx(t.p,{children:"Setting the property on the custom element as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<ui5-icon interactive></ui5-icon>
`})}),`
`,e.exports.jsx(t.p,{children:"Will result in the shadow DOM as:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-html",children:`<svg tabindex="0" role="button" ... ></svg>
`})}),`
`,e.exports.jsxs(t.p,{children:["The ",e.exports.jsx(t.code,{children:"interactive"})," property is currently supported in:"]}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Avatar",children:"Avatar"})}),`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://sap.github.io/ui5-webcomponents/playground/components/Icon",children:"Icon"})}),`
`]}),`
`,e.exports.jsx(t.hr,{}),`
`,e.exports.jsx(t.h2,{children:"Testing Accessibility"}),`
`,e.exports.jsx(t.p,{children:"UI5 Web Components provide the prerequisites for screen reader support based on the HTML, ARIA, and WCAG standards. All screen readers that follow those standards should work fine. Nevertheless, there are deviations in the interpretation depending on the combination of browser and screen reader. UI5 Web Components focus on compliance with the standards by performing automated checks for accessibility and manual tests with reference testing environments."}),`
`,e.exports.jsx(t.p,{children:"For Screen Reader Support, we recommend using JAWS 2021 + Chrome (latest), and for HTML/ARIA validation the recommended testing tool is Access Assistant. UI5 Web Components support other environments to the extent of providing a valid HTML and ARIA implementation following the WCAG standards."}),`
`,e.exports.jsx(t.p,{children:"Please note that reference testing environments may change over time to reflect changes in the usage of different browsers, their maintenance period, and increased accessibility compliance."}),`
`,e.exports.jsx(t.p,{children:"When reporting issues with different testing environments, please ensure that the issue is not false positive, a real accessibility concern is present, and there is an impact over the users. Therefore, we recommend to retest the issue using the mentioned reference testing tools and additionally with plain HTML."}),`
`,e.exports.jsx(t.p,{children:"In order to process the issues correctly, we would like to have the following information provided:"}),`
`,e.exports.jsx(t.p,{children:"\u2022	Issue description"}),`
`,e.exports.jsx(t.p,{children:"\u2022	Reference to the suspected violated accessibility requirement (e.g. Web Content Accessibility Guidelines, WCAG 2.0, BITV 2.0, EN 301 549)"}),`
`,e.exports.jsx(t.p,{children:"\u2022	Isolated example"}),`
`,e.exports.jsx(t.p,{children:"\u2022	Steps to reproduce"}),`
`,e.exports.jsx(t.p,{children:"\u2022	UI5 Web Components version"}),`
`,e.exports.jsx(t.p,{children:"\u2022	OS/Platform: {...}"}),`
`,e.exports.jsx(t.p,{children:"\u2022	Browser: {...}"}),`
`,e.exports.jsx(t.p,{children:"\u2022	Testing Tool"}),`
`,e.exports.jsx(t.h2,{children:"Note"}),`
`,e.exports.jsx(t.p,{children:"Have in mind that UI5 Web Components is optimized for the High Contrast mode of Windows when using Chrome and Edge. If you have enabled both the Windows High Contrast setting and the SAPUI5 High Contrast theme and you are using browser different than Chrome and Edge this may cause conflicts, and deficiencies in the theme can occur. In such cases, please switch off the Windows High Contrast setting or use different browser."}),`
`,e.exports.jsxs(t.p,{children:["Next: ",e.exports.jsx(t.a,{href:"../csp",children:"CSP"})]})]})}}export{j as default};
//# sourceMappingURL=07-accessibility.dc71c065.js.map
