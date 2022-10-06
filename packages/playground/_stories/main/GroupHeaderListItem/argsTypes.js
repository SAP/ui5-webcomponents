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
    accessibleName: {
        description:
            "Defines the text alternative of the component. Note: If not provided a default text alternative will be set, if present.",
        control: "text",
        table: { defaultValue: { summary: '""' }, category: "Properties" },
    },
    default: {
        description:
            "Defines the text of the component. <br> <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.",
        control: "Node[]",
        table: { category: "Slots" },
    },
};
