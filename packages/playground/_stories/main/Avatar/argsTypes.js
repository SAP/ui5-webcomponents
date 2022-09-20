export default {
    ['ui5-click']: {
        action: 'ui5-click',
        table: {
            category: "Events"
        },
    },
    accessibleName: {
        description:
            "Defines the text alternative of the component. If not provided a default text alternative will be set, if present.",
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Properties"
        },
    },
    ariaHaspopup: {
        description:
            "Defines the aria-haspopup value of the component when <code>interactive</code> property is <code>true</code>. <br /><br />",
        control: "text",
        table: {
            defaultValue: {},
            category: "Properties"
        },
    },
    colorScheme: {
        description:
            "Defines the background color of the desired image. <br /><br /> Available options are: <ul> <li><code>Accent1</code></li> <li><code>Accent2</code></li> <li><code>Accent3</code></li> <li><code>Accent4</code></li> <li><code>Accent5</code></li> <li><code>Accent6</code></li> <li><code>Accent7</code></li> <li><code>Accent8</code></li> <li><code>Accent9</code></li> <li><code>Accent10</code></li> <li><code>Placeholder</code></li> </ul>",
        control: "select",
        options: [
            "Accent1",
            "Accent10",
            "Accent2",
            "Accent3",
            "Accent4",
            "Accent5",
            "Accent6",
            "Accent7",
            "Accent8",
            "Accent9",
            "Placeholder",
        ],
        table: {
            defaultValue: { summary: '"Accent6"' },
            category: "Properties"
        },
    },
    icon: {
        description:
            'Defines the name of the UI5 Icon, that will be displayed. <br /> <b>Note:</b> If <code>image</code> slot is provided, the property will be ignored. <br /> <b>Note:</b> You should import the desired icon first, then use its name as "icon". <br /><br /> import "@ui5/webcomponents-icons/dist/{icon_name}.js" <br /> <pre>&lt;ui5-avatar icon="employee"></pre>\n\nSee all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.',
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Properties"
        },
    },
    initials: {
        description:
            "Defines the displayed initials. <br /> Up to two Latin letters can be displayed as initials.",
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Properties"
        },
    },
    interactive: {
        description:
            "Defines if the avatar is interactive (focusable and pressable).",
        control: "boolean",
        table: {
            defaultValue: { summary: "false" },
            category: "Properties"
        },
    },
    shape: {
        description:
            "Defines the shape of the component. <br /><br /> Available options are: <ul> <li><code>Circle</code></li> <li><code>Square</code></li> </ul>",
        control: "select",
        options: ["Circle", "Square"],
        table: {
            defaultValue: { summary: '"Circle"' },
            category: "Properties"
        },
    },
    size: {
        description:
            "Defines predefined size of the component. <br /><br /> Available options are: <ul> <li><code>XS</code></li> <li><code>S</code></li> <li><code>M</code></li> <li><code>L</code></li> <li><code>XL</code></li> </ul>",
        control: "select",
        options: ["L", "M", "S", "XL", "XS"],
        table: {
            defaultValue: { summary: '"S"' },
            category: "Properties"
        },
    },
    defaultSlot: {
        description:
            "Receives the desired <code>&lt;img&gt;</code> tag\n\n<b>Note:</b> If you experience flickering of the provided image, you can hide the component until it is being defined with the following CSS: <br /> <br /> <code> ui5-avatar:not(:defined) { <br /> &nbsp;visibility: hidden; <br /> } <br /> </code>",
        control: "text",
        table: {
            defaultValue: { summary: '""' },
            category: "Slots"
        },
    },
}