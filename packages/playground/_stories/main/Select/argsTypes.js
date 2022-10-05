export default {
    "ui5-change": {
        action: "ui5-change",
        description: "Fired when the selected option changes.",
        table: { category: "Events" },
    },
    accessibleName: {
        description: "Defines the accessible ARIA name of the component.",
        control: "text",
        table: { defaultValue: {}, category: "Properties" },
    },
    accessibleNameRef: {
        description:
            "Receives id(or many ids) of the elements that label the select.",
        control: "text",
        table: { defaultValue: { summary: '""' }, category: "Properties" },
    },
    disabled: {
        description:
            "Defines whether the component is in disabled state. <br /><br /> <b>Note:</b> A disabled component is noninteractive.",
        control: "boolean",
        table: { defaultValue: { summary: "false" }, category: "Properties" },
    },
    name: {
        description:
            'Determines the name with which the component will be submitted in an HTML form. The value of the component will be the value of the currently selected <code>ui5-option</code>.\n\n<br /><br /> <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project: <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>\n\n<br /><br /> <b>Note:</b> When set, a native <code>input</code> HTML element will be created inside the <code>ui5-select</code> so that it can be submitted as part of an HTML form. Do not use this property unless you need to submit a form.',
        control: "text",
        table: { defaultValue: { summary: '""' }, category: "Properties" },
    },
    required: {
        description: "Defines whether the component is required.",
        control: "boolean",
        table: { defaultValue: { summary: "false" }, category: "Properties" },
    },
    selectedOption: {
        description: "(readonly) - Currently selected option.",
        control: "text",
        table: { defaultValue: {}, category: "Properties" },
    },
    valueState: {
        description:
            "Defines the value state of the component. <br /><br /> Available options are: <ul> <li><code>None</code></li> <li><code>Error</code></li> <li><code>Warning</code></li> <li><code>Success</code></li> <li><code>Information</code></li> </ul>",
        control: "text",
        table: { defaultValue: { summary: '"None"' }, category: "Properties" },
    },
    defaultSlot: {
        description:
            "Defines the component options.\n\n<br /><br /> <b>Note:</b> Only one selected option is allowed. If more than one option is defined as selected, the last one would be considered as the selected one.\n\n<br /><br /> <b>Note:</b> Use the <code>ui5-option</code> component to define the desired options.",
        control: "sap.ui.webcomponents.main.ISelectOption[]",
        table: { category: "Slots" },
    },
    valueStateMessage: {
        description:
            "Defines the value state message that will be displayed as pop up under the component. <br /><br />\n\n<b>Note:</b> If not specified, a default text (in the respective language) will be displayed. <br /> <b>Note:</b> The <code>valueStateMessage</code> would be displayed, when the component is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.",
        control: "HTMLElement[]",
        table: { category: "Slots" },
    },
};
