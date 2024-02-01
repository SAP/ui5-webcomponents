import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type ShellBarItem from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";

export default {
    title: "Fiori/ShellBar/ShellBarItem",
    component: "ShellBarItem",
    argTypes,
} as Meta<ShellBarItem>;

const Template: UI5StoryArgs<ShellBarItem, StoryArgsSlots> = (
    args
) => html`<ui5-shellbar
    primary-title="Corporate Portal"
>
    <img slot="logo" src="../assets/images/sap-logo-svg.svg" />
    <ui5-shellbar-item
        icon="${ifDefined(args.icon)}"
        text="${ifDefined(args.text)}"
        count="${ifDefined(args.count)}"
    ></ui5-shellbar-item>

</ui5-shellbar>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "2 notifications",
    icon: "bell",
    count: "2"
};