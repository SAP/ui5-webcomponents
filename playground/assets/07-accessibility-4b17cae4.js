import{j as e}from"./jsx-runtime-670e1be8.js";import{M as r}from"./index-6087c063.js";import{B as s,F as l}from"./Banner-a1178143.js";import{u as o}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function i(t){const n=Object.assign({h1:"h1",p:"p",h2:"h2",a:"a",code:"code",h3:"h3",strong:"strong",pre:"pre",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",hr:"hr"},o(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Docs/Advanced/Accessibility"}),`
`,e.jsx(s,{}),`
`,e.jsx(n.h1,{id:"accessibility-in-ui5-web-components",children:"Accessibility in UI5 Web Components"}),`
`,e.jsx(n.p,{children:"Accessibility refers to the possibility for everyone, including and especially people with disabilities, to access and use IT products. Making software work for more people should be of high priority. All users should be able to operate our software without loss of meaningful content, functionality, and efficiency when using assistive technologies."}),`
`,e.jsx(n.p,{children:"Following those principles in an ongoing approach, we at UI5 Web Components aim to bring accessibility to life by providing the appropriate accessibility features, and following precise accessibility requirements and processes."}),`
`,e.jsx(n.h2,{id:"web-components--accessibility",children:"Web Components & Accessibility"}),`
`,e.jsx(n.p,{children:"Web Components allow developers to make their own custom components with native HTML and JavaScript with the usage of custom elements, shadow DOM, and templates. In HTML you can define an element using a role.  When you use semantic elements, you don’t need to define a role as these elements receive all relevant aria mappings out of the box. However, this is not the case when you use custom elements where you should add all relevant accessibility attributes yourselves."}),`
`,e.jsx(n.p,{children:"This is not needed in UI5 Web Components, because when using our elements, all relevant accessibility attributes for a certain component will be applied in the shadow DOM, without further setup. Additionally, many accessibility-related APIs are available. They can be used to enhance the accessibility in the context of each application."}),`
`,e.jsxs(n.p,{children:["As the Web Components are a new standard, there are still some gaps in regard to accessibility. For example - setting IDRef relationships is currently not possible due to the nature of the custom elements and their shadow DOM. This is a limitation in the ARIA support and there is a draft of a new ",e.jsx(n.a,{href:"https://github.com/WICG/aom",target:"_blank",rel:"nofollow noopener noreferrer",children:"AOM (Accessibility Object Model)"}),", which addresses this issue and many more, and aims at a better JS-based accessibility support for all web elements. We are continuously working on improving the existing limitations. For example, in order to create a Label-Input relationship, you can use the ",e.jsx(n.code,{children:"for"})," property of the label component to bind the label to an input, or ",e.jsx(n.code,{children:"accessible-name-ref"})," property of the input component to bind the input to a label."]}),`
`,e.jsx(n.h2,{id:"accessibility-features",children:"Accessibility Features"}),`
`,e.jsx(n.p,{children:"Many accessibility features are built into the core design elements upfront and are available to app teams out of the box. Keyboard navigation and interaction, tab and reading order, as well as screen reader support are fundamental features enabled in UI5 Web Components. Visualization features like high contrast themes, consistency of icons, keyboard focus visualization, layout adaptation, and support for text resizing are also available."}),`
`,e.jsx(n.h3,{id:"screen-reader-support",children:e.jsx(n.strong,{children:"Screen Reader Support"})}),`
`,e.jsx(n.p,{children:"UI5 Web Components provide the prerequisites for screen reader support based on the HTML, ARIA, and WCAG standards support in order to aid people using screen reader software."}),`
`,e.jsxs(n.p,{children:["Navigation with the keyboard and screen reader should work properly together. In order for this to happen, you need to use the correct ARIA attributes and to map them to their HTML counterparts. With UI5 Web Components you will receive ARIA mapped elements out of the box. For example let's add a ",e.jsx(n.code,{children:"ui5-combobox"})," component:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-combobox>
    <ui5-cb-item text="Item 1"></ui5-cb-item>
</ui5-combobox>
`})}),`
`,e.jsxs(n.p,{children:["By doing so, you receive an input element with ",e.jsx(n.code,{children:'role="combobox"'})," with all aria attributes relevant for this role in the shadow DOM. Also, if you set the ",e.jsx(n.code,{children:"disabled"})," property, this will automatically add ",e.jsx(n.code,{children:"disabled"})," to the shadow ",e.jsx(n.code,{children:"combobox"})," element. Attribute mapping is available for all relevant properties - ",e.jsx(n.code,{children:"required"}),", ",e.jsx(n.code,{children:"disabled"}),", ",e.jsx(n.code,{children:"readonly"}),", and more."]}),`
`,e.jsx(n.p,{children:"In order to ease the setting of aria attributes, we have introduced properties that are available for developers to extend the accessibility support in the context of the application. More information about the available properties could be found in the Accessibility APIs section below."}),`
`,e.jsx(n.h3,{id:"invisible-messaging",children:e.jsx(n.strong,{children:"Invisible Messaging"})}),`
`,e.jsx(n.p,{children:"The Invisible Message provides a way to programmaticaly expose dynamic content changes in a way that can be announced by screen readers. It marks the dynamic content changes as ARIA live regions so that you are able to inform the users of assistive technologies for a change that has happened to the UI."}),`
`,e.jsxs(n.p,{children:["The Invisible Messaging service is designed to be used both internally in the components logic and from the applications. Using the service, you have to specify the message to be announced by the screen reader and the mode which will be inserted in the ",e.jsx(n.code,{children:"aria-live"})," attribute via the ",e.jsx(n.code,{children:"InvisibleMessage.announce(message, mode)"})," method. The possible modes to choose from are:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:" InvisibleMessageMode.Assertive"})," - indicates that updates to the region have the highest priority and should be presented to the user immediately."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"InvisibleMessageMode.Polite"})," - indicates that updates to the region should be presented at the next graceful opportunity such as at the end of reading the current sentence, or when the user paused typing."]}),`
`]}),`
`,e.jsxs(n.p,{children:["According to the WAI-ARIA recommendations, the live regions should be initialised empty when the page is loaded. This way screen readers remember them and start to listen for changes of their value. Thus, we recommend to instantiate Invisible Message  as early as possible in the application. Then, you should specify the text, that has to be announced by the screen reader and the live region’s mode using the ",e.jsx(n.code,{children:"announce"}),` method.
Here is an example usage of the invisible messaging service - `,e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-messagestrip--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Dynamic MessageStrip Generator Sample"})]}),`
`,e.jsx(n.h3,{id:"keyboard-handling",children:e.jsx(n.strong,{children:"Keyboard Handling"})}),`
`,e.jsx(n.p,{children:"All standard UI elements and controls are designed to be keyboard-enabled. All suitable input channels (such as mouse, keyboard, or touch) are treated equally according to the capabilities of the device or the individual preferences of the user. For example, some users may prefer using the keyboard instead of a mouse, which lets them work faster."}),`
`,e.jsx(n.p,{children:"Support for standard keystrokes, based on the role of the component element is available. Complex components also provide advanced keyboard handling, which is described in the Overview section of each component."}),`
`,e.jsx(n.h3,{id:"theming",children:e.jsx(n.strong,{children:"Theming"})}),`
`,e.jsx(n.p,{children:"Theming is an important aspect when it comes to a UI5 Web Components application. The different colors shown on the UI need to have a good contrast to each other in order to be easily distinguishable. We ensure that the requirements for color contrast are fulfilled in all themes. High Contrast White and High Contrast Black themes are also available to support people with visual impairments."}),`
`,e.jsxs(n.p,{children:["For more information regarding the available themes and how to use them, see the ",e.jsx(n.a,{href:"./?path=/docs/docs-advanced-configuration--docs",children:"Configuration"})," section."]}),`
`,e.jsx(n.h2,{id:"accessibility-apis",children:"Accessibility APIs"}),`
`,e.jsx(n.p,{children:"The mapping of the accessibility APIs to ARIA attributes is described in the following table:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"UI5 Web Components Property"}),e.jsx(n.th,{children:"HTML attribute"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"accessibleName"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-label"})}),e.jsx(n.td,{children:"Defines the text alternative of the component. If not provided, a default text alternative is set, if present."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"accessibleNameRef"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-label"})}),e.jsxs(n.td,{children:["Alternative for ",e.jsx(n.code,{children:"aria-labelledby"}),". Receives ID (or many IDs) of the elements that serve as labels of the component. Those labels are passed as a concatenated string to the ",e.jsx(n.code,{children:"aria-label"})," attribute."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"accessibleRole"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"role"})}),e.jsx(n.td,{children:"Sets the accessible aria role of the component."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"accessibilityTexts"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-label"})}),e.jsx(n.td,{children:"An object of strings that define several additional accessibility texts for further customization."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"accessibilityAttributes"})}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"aria-expanded"}),", ",e.jsx(n.code,{children:"aria-haspopup"}),", ",e.jsx(n.code,{children:"aria-controls"})]}),e.jsx(n.td,{children:"An object of strings that defines several additional accessibility attribute values for customization depending on the use case."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"accessibilityRoles"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"role"})}),e.jsx(n.td,{children:"An object of strings that define several additional accessibility roles for further customization."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"required"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-required"})}),e.jsx(n.td,{children:"Defines whether the component is required."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"readonly"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-readonly"})}),e.jsx(n.td,{children:"Defines whether the component is read-only."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"disabled"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-disabled"})}),e.jsx(n.td,{children:"Defines whether the component is disabled."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"checked"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-checked"})}),e.jsx(n.td,{children:"Defines whether the component is checked."})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"level"}),", ",e.jsx(n.code,{children:"headerLevel"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"aria-level"})}),e.jsx(n.td,{children:'Defines the heading level of a title. Available options are: "H6" to "H1".'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"interactive"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"tabindex"})}),e.jsx(n.td,{children:"Defines if the component is interactive (focusable and pressable)."})]})]})]}),`
`,e.jsx(n.h3,{id:"accessiblename",children:"accessibleName"}),`
`,e.jsx(n.p,{children:"Setting the property on the custom element as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-combobox accessible-name="Enter Value">
    <ui5-cb-item text="Item 1"></ui5-cb-item>
</ui5-combobox>
`})}),`
`,e.jsx(n.p,{children:"Will result in the shadow DOM as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<input role="combobox" aria-label="Enter value" ... >
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"accessible-name"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Popups: ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-dialog--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Dialog"}),", ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-popover--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Popover"})]}),`
`,e.jsxs(n.li,{children:["User input components (e.g. ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-input--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Input"}),", ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-radiobutton--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadioButton"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-panel--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Panel"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-breadcrumbs--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Breadcrumbs"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-button--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Button"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-icon--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Icon"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-list--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"List"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-checkbox--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"CheckBox"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-ratingindicator--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Rating Indicator"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-slider--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Slider"}),`,
`,e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-rangeslider--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Range Slider"})]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-table--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Table"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-tree--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Tree"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-card--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Card"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"accessiblenameref",children:"accessibleNameRef"}),`
`,e.jsx(n.p,{children:"Setting the property on the custom element as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-label id="myLabel" for="myInput">Date of birth</ui5-label>
<ui5-input id="myInput" accessible-name-ref="myLabel"></ui5-input>
`})}),`
`,e.jsx(n.p,{children:"Will result in the shadow DOM as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<input aria-label="Date of birth" ... >
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"accessible-name-ref"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Popups: ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-dialog--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Dialog"}),", ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-popover--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Popover"})]}),`
`,e.jsxs(n.li,{children:["User input components (e.g. ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-input--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Input"}),", ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-radiobutton--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadioButton"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-link--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Link"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-button--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Button"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-list--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"List"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-checkbox--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"CheckBox"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-table--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Table"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-tree--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Tree"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-card--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Card"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"accessibilitytexts",children:"accessibilityTexts"}),`
`,e.jsxs(n.p,{children:["This property accepts ",e.jsx(n.code,{children:"object"})," with property values for different parts of the FlexibleColumnLayout elements. For more detailed information on every object property, read the API description in ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-flexiblecolumnlayout--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"FlexibleColumnLayout"}),"."]}),`
`,e.jsx(n.p,{children:"Setting the property on the custom element as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-flexible-column-layout id="component">...</ui5-flexible-column-layout>

<script>
    const component = document.getElemetnById("component");
    component.accessibilityTexts = {
        startColumnAccessibleName: "Products list",
    };
<\/script>
`})}),`
`,e.jsx(n.p,{children:"Will result in the shadow DOM as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div role="region" aria-labelledby="component-startColumnText" ... >
    ...
    <span id="component-startColumnText" class="ui5-hidden-text" ... >
        Products list
    </span>
    ...
</div>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"accessibilityTexts"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-flexiblecolumnlayout--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"FlexibleColumnLayout"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-shellbar--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"ShellBar"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"accessibilityattributes",children:"accessibilityAttributes"}),`
`,e.jsxs(n.p,{children:["This property accepts an ",e.jsx(n.code,{children:"object"})," with property values, which will be used to generate additinal accessibility attributes to the root element. For more detailed information on every object property, read the API description in ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-button--docs/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Button"}),"."]}),`
`,e.jsx(n.p,{children:"Setting the property on the custom element as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button id="button">...</ui5-button>
<ui5-dialog id="dialogIdentificator">...</ui5-dialog>

<script>
    const component = document.getElemetnById("button");
    component.accessibilityAttributes = {
        hasPopup: "dialog",
        controls: "dialogIdentificator"
    };
<\/script>
`})}),`
`,e.jsx(n.p,{children:"Will result in the shadow DOM as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<button type="button" class="ui5-button-root" part="button" aria-controls="dialogIdentificator" aria-haspopup="dialog">
	...
</button>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"accessibilityAttributes"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-button--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Button"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-link--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Link"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"accessibilityroles",children:"accessibilityRoles"}),`
`,e.jsxs(n.p,{children:["This property accepts ",e.jsx(n.code,{children:"object"})," with property values for different parts of the ",e.jsx(n.code,{children:"FlexibleColumnLayout"})," elements. For more detailed information on every object property, read the API description in ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-flexiblecolumnlayout--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"FlexibleColumnLayout"}),"."]}),`
`,e.jsx(n.p,{children:"Setting the property on the custom element as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-flexible-column-layout id="component">...</ui5-flexible-column-layout>

<script>
    const component = document.getElemetnById("component");
    component.accessibilityRoles = {
        startColumnRole: "complimentary",
    };
<\/script>
`})}),`
`,e.jsx(n.p,{children:"Results in the shadow DOM as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div role="complimentary" ... >
    ...
</div>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"accessibilityRoles"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-flexiblecolumnlayout--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"FlexibleColumnLayout"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-shellbar--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"ShellBar"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"accessiblerole",children:"accessibleRole"}),`
`,e.jsx(n.p,{children:"Setting the property on the custom element as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-panel accessible-role="Complementary">
    ...
</ui5-panel>
`})}),`
`,e.jsx(n.p,{children:"Will result in the shadow DOM as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div role="complementary" ... >
    ...
</div>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"accessible-role"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["User input components (e.g. ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-input--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Input"}),", ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-radiobutton--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"RadioButton"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-panel--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Panel"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-list--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"List"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-icon--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Icon"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-popover--docs/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Popover"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-dialog--docs/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Dialog"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"level-headerlevel",children:"level, headerLevel"}),`
`,e.jsx(n.p,{children:"Setting the property on the custom element as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-title level="H3">Title</ui5-title>
...
<ui5-panel header-text="Panel Header" header-level="H3">
</ui5-panel>
`})}),`
`,e.jsx(n.p,{children:"Will result in the shadow DOM as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<h3 class="ui5-title-root" ... >...</h3>
...
<div class="ui5-panel-root" ... >
    ...
    <div role="heading" aria-level="3" ...>
        Panel Header
    </div>
    ...
</div>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"level"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-title--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Title"})}),`
`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"header-level"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-panel--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Panel"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"interactive",children:"interactive"}),`
`,e.jsx(n.p,{children:"Setting the property on the custom element as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-icon interactive></ui5-icon>
`})}),`
`,e.jsx(n.p,{children:"Will result in the shadow DOM as:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<svg tabindex="0" role="button" ... ></svg>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"interactive"})," property is currently supported in:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-avatar--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Avatar"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/nightly/playground/?path=/docs/main-icon--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Icon"})}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"testing-accessibility",children:"Testing Accessibility"}),`
`,e.jsx(n.p,{children:"UI5 Web Components provide the prerequisites for screen reader support based on the HTML, ARIA, and WCAG standards. All screen readers that follow those standards should work fine. Nevertheless, there are deviations in the interpretation depending on the combination of browser and screen reader. UI5 Web Components focus on compliance with the standards by performing automated checks for accessibility and manual tests with reference testing environments."}),`
`,e.jsx(n.p,{children:"For Screen Reader Support, we recommend using JAWS 2021 + Chrome (latest), and for HTML/ARIA validation the recommended testing tool is Access Assistant. UI5 Web Components support other environments to the extent of providing a valid HTML and ARIA implementation following the WCAG standards."}),`
`,e.jsx(n.p,{children:"Please note that reference testing environments may change over time to reflect changes in the usage of different browsers, their maintenance period, and increased accessibility compliance."}),`
`,e.jsx(n.p,{children:"When reporting issues with different testing environments, please ensure that the issue is not false positive, a real accessibility concern is present, and there is an impact over the users. Therefore, we recommend to retest the issue using the mentioned reference testing tools and additionally with plain HTML."}),`
`,e.jsx(n.p,{children:"In order to process the issues correctly, we would like to have the following information provided:"}),`
`,e.jsx(n.p,{children:"•	Issue description"}),`
`,e.jsx(n.p,{children:"•	Reference to the suspected violated accessibility requirement (e.g. Web Content Accessibility Guidelines, WCAG 2.0, BITV 2.0, EN 301 549)"}),`
`,e.jsx(n.p,{children:"•	Isolated example"}),`
`,e.jsx(n.p,{children:"•	Steps to reproduce"}),`
`,e.jsx(n.p,{children:"•	UI5 Web Components version"}),`
`,e.jsx(n.p,{children:"•	OS/Platform: {...}"}),`
`,e.jsx(n.p,{children:"•	Browser: {...}"}),`
`,e.jsx(n.p,{children:"•	Testing Tool"}),`
`,e.jsx(n.h2,{id:"note",children:"Note"}),`
`,e.jsx(n.p,{children:"Have in mind that UI5 Web Components is optimized for the High Contrast mode of Windows when using Chrome and Edge. If you have enabled both the Windows High Contrast setting and the SAPUI5 High Contrast theme and you are using browser different than Chrome and Edge this may cause conflicts, and deficiencies in the theme can occur. In such cases, please switch off the Windows High Contrast setting or use different browser."}),`
`,e.jsx(l,{})]})}function f(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(i,t)})):i(t)}export{f as default};
