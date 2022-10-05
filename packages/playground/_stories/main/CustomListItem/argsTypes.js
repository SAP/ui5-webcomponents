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
    defaultSlot: {
        description: "Defines the content of the component.",
        control: "Node[]",
        table: { category: "Slots" },
    },
};
