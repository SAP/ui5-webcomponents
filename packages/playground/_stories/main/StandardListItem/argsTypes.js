export default {
    disabled: {
        description:
            "Defines whether <code>ui5-li</code> is in disabled state. <br><br> <b>Note:</b> A disabled <code>ui5-li</code> is noninteractive.",
        control: "boolean",
        table: { defaultValue: { summary: "false" }, category: "Properties" },
    },
    selected: {
        description: "Defines the selected state of the <code>ListItem</code>.",
        control: "boolean",
        table: { defaultValue: { summary: "false" }, category: "Properties" },
    },
    type: {
        description:
            "Defines the visual indication and behavior of the list items. Available options are <code>Active</code> (by default), <code>Inactive</code> and <code>Detail</code>. <br><br> <b>Note:</b> When set to <code>Active</code>, the item will provide visual response upon press and hover, while with type <code>Inactive</code> and <code>Detail</code> - will not.",
        control: "select",
        options: ["Active", "Detail", "Inactive"],
        table: {
            defaultValue: { summary: '"Active"' },
            category: "Properties",
        },
    },
    "ui5-detail-click": {
        action: "ui5-detail-click",
        description:
            "Fired when the user clicks on the detail button when type is <code>Detail</code>.",
        table: { category: "Events" },
    },
    accessibleName: {
        description:
            "Defines the text alternative of the component. Note: If not provided a default text alternative will be set, if present.",
        control: "text",
        table: { defaultValue: { summary: '""' }, category: "Properties" },
    },
    additionalText: {
        description:
            "Defines the <code>additionalText</code>, displayed in the end of the list item.",
        control: "text",
        table: { defaultValue: {}, category: "Properties" },
    },
    additionalTextState: {
        description:
            'Defines the state of the <code>additionalText</code>. <br> Available options are: <code>"None"</code> (by default), <code>"Success"</code>, <code>"Warning"</code>, <code>"Information"</code> and <code>"Error"</code>.',
        control: "text",
        table: { defaultValue: { summary: '"None"' }, category: "Properties" },
    },
    description: {
        description:
            "Defines the description displayed right under the item text, if such is present.",
        control: "text",
        table: { defaultValue: {}, category: "Properties" },
    },
    icon: {
        description:
            'Defines the <code>icon</code> source URI. <br><br> <b>Note:</b> SAP-icons font provides numerous built-in icons. To find all the available icons, see the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.',
        control: "text",
        table: { defaultValue: {}, category: "Properties" },
    },
    iconEnd: {
        description:
            "Defines whether the <code>icon</code> should be displayed in the beginning of the list item or in the end. <br><br> <b>Note:</b> If <code>image</code> is set, the <code>icon</code> would be displayed after the <code>image</code>.",
        control: "boolean",
        table: { defaultValue: { summary: "false" }, category: "Properties" },
    },
    image: {
        description:
            "Defines the <code>image</code> source URI. <br><br> <b>Note:</b> The <code>image</code> would be displayed in the beginning of the list item.",
        control: "text",
        table: { defaultValue: {}, category: "Properties" },
    },
    defaultSlot: {
        description:
            "Defines the text of the component. <br><br> <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.",
        control: "Node[]",
        table: { category: "Slots" },
    },
};
