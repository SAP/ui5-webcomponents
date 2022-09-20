export default {
    ['ui5-click']: {
        action: 'ui5-click',
        table: {
            category: "Events"
        },
    },
    ['ui5-overflow']: {
        action: 'ui5-overflow',
        table: {
            category: "Events"
        },
    },
    ariaHaspopup: {
        description:
            'Defines the aria-haspopup value of the component on: <br /><br /> <ul> <li> the whole container when <code>type</code> property is <code>Group</code></li> <li> the default "More" overflow button when <code>type</code> is <code>Individual</code></li> </ul> <br /><br />',
        control: "text",
        table: {
            defaultValue: {},
            category: "Properties"
        },
    },
    type: {
        description:
            "Defines the mode of the <code>AvatarGroup</code>. <br /><br /> Available options are: <ul> <li><code>Group</code></li> <li><code>Individual</code></li> </ul>",
        control: "select",
        options: ["Group", "Individual"],
        table: {
            defaultValue: { summary: '"Group"' },
            category: "Properties"
        },
    },
    default: {
        description:
            'Defines the items of the component. Use the <code>ui5-avatar</code> component as an item. <br /><br /> <b>Note:</b> The UX guidelines recommends using avatars with "Circle" shape. Moreover, if you use avatars with "Square" shape, there will be visual inconsistency as the built-in overflow action has "Circle" shape.',
        control: "sap.ui.webcomponents.main.IAvatar[]",
        table: {
            category: "Slots"
        },
    },
    overflowButton: {
        description:
            "Defines the overflow button of the component. <b>Note:</b> We recommend using the <code>ui5-button</code> component. <br /><br /> <b>Note:</b> If this slot is not used, the component will display the built-in overflow button.",
        control: "HTMLElement",
        table: {
            category: "Slots"
        },
    },
}