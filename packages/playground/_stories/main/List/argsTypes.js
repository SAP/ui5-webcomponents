export default {
    "item-click": {
        action: 'ui5-item-click',
        table: {
            category: "Events"
        },
    },
    "item-close": {
        action: 'ui5-item-close',
        table: {
            category: "Events"
        },
    },
    "item-toggle": {
        action: 'ui5-item-toggle',
        table: {
            category: "Events"
        },
    },
    "item-delete": {
        action: 'ui5-item-delete',
        table: {
            category: "Events"
        },
    },
    "selection-change": {
        action: 'ui5-selection-change',
        table: {
            category: "Events"
        },
    },
    "load-more": {
        action: 'ui5-load-more',
        table: {
            category: "Events"
        },
    },
    accessibleName: {
        description: "Defines the accessible name of the component.",
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Properties"
        },
    },
    accessibleNameRef: {
        description: "Defines the IDs of the elements that label the input.",
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Properties"
        },
    },
    accessibleRole: {
        description: "Defines the accessible role of the component. <br/><br/>",
        control: "text",
        table: {
            defaultValue: { summary: '"list"' },
            category: "Properties"
        },
    },
    busy: {
        description:
            "Defines if the component would display a loading indicator over the list.",
        control: "boolean",
        table: {
            defaultValue: { summary: "false" },
            category: "Properties"
        },
    },
    busyDelay: {
        description:
            "Defines the delay in milliseconds, after which the busy indicator will show up for this component.",
        control: "number",
        table: {
            defaultValue: { summary: "1000" },
            category: "Properties"
        },
    },
    footerText: {
        description: "Defines the footer text.",
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Properties"
        },
    },
    growing: {
        description:
            'Defines whether the component will have growing capability either by pressing a <code>More</code> button, or via user scroll. In both cases <code>load-more</code> event is fired. <br/><br/>\n\nAvailable options: <br/><br/> <code>Button</code> - Shows a <code>More</code> button at the bottom of the list, pressing of which triggers the <code>load-more</code> event. <br/> <code>Scroll</code> - The <code>load-more</code> event is triggered when the user scrolls to the bottom of the list; <br/> <code>None</code> (default) - The growing is off. <br/><br/>\n\n<b>Restrictions:</b> <code>growing="Scroll"</code> is not supported for Internet Explorer, on IE the component will fallback to <code>growing="Button"</code>.',
        control: "select",
        options: [
            "Button",
            "Scroll",
            "None",
        ],
        table: {
            defaultValue: { summary: '"None"' },
            category: "Properties"
        },
    },
    headerText: {
        description:
            "Defines the component header text. <br/><br/> <b>Note:</b> If <code>header</code> is set this property is ignored.",
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Properties"
        },
    },
    indent: {
        description: "Determines whether the component is indented.",
        control: "boolean",
        table: {
            defaultValue: { summary: "false" },
            category: "Properties"
        },
    },
    mode: {
        description:
            "Defines the mode of the component. <br/><br/> <b>Note:</b> Available options are <code>None</code>, <code>SingleSelect</code>, <code>SingleSelectBegin</code>, <code>SingleSelectEnd</code>, <code>MultiSelect</code>, and <code>Delete</code>.",
        control: "select",
        options: [
            "None",
            "SingleSelect",
            "SingleSelectBegin",
            "SingleSelectEnd",
            "SingleSelectAuto",
            "MultiSelect",
            "Delete",
        ],
        table: {
            defaultValue: { summary: '"None"' },
            category: "Properties"
        },
    },
    noDataText: {
        description:
            "Defines the text that is displayed when the component contains no items.",
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Properties"
        },
    },
    separators: {
        description:
            "Defines the item separator style that is used. <br/><br/> <b>Notes:</b> <ul> <li>Avalaible options are <code>All</code>, <code>Inner</code>, and <code>None</code>.</li> <li>When set to <code>None</code>, none of the items are separated by horizontal lines.</li> <li>When set to <code>Inner</code>, the first item doesn't have a top separator and the last item doesn't have a bottom separator.</li> </ul>",
        control: "select",
        options: [
            "All",
            "Inner",
            "None",
        ],
        table: {
            defaultValue: { summary: '"All"' },
            category: "Properties"
        },
    },
    default: {
        description:
            "Defines the items of the component. <br/><br/> <b>Note:</b> Use <code>ui5-li</code>, <code>ui5-li-custom</code>, and <code>ui5-li-groupheader</code> for the intended design.",
        control: "sap.ui.webcomponents.main.IListItem[]",
        table: {
            defaultValue: { summary: '""' },
            category: "Slots"
        },
    },
    header: {
        description:
            "Defines the component header. <br/><br/> <b>Note:</b> When <code>header</code> is set, the <code>headerText</code> property is ignored.",
        control: "HTMLElement[]",
        table: {
            defaultValue: { summary: '""' },
            category: "Slots"
        },
    },
}