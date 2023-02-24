import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

const component = "ui5-button";

export default {
    title: "Main/Button",
    component,
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component }),
        },
    },
    argTypes,
} as Meta<Button>;

const Template: UI5StoryArgs<Button, StoryArgsSlots> = (
    args
) => html` <ui5-button
    ?disabled="${ifDefined(args.disabled)}"
    design="${ifDefined(args.design)}"
    icon="${ifDefined(args.icon)}"
    icon-end="${ifDefined(args.iconEnd)}"
    ?submits="${ifDefined(args.submits)}"
    tooltip="${ifDefined(args.tooltip)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
    .accessibilityAttributes="${ifDefined(args.accessibilityAttributes)}"
    >${unsafeHTML(args.default)}</ui5-button
>`;

export const Basic = Template.bind({});
Basic.args = {
    default: "Default",
};

export const Disabled = Template.bind({});
Disabled.args = {
    default: "Disabled",
    disabled: true,
};

export const Transparent = Template.bind({});
Transparent.args = {
    default: "Cancel",
    design: ButtonDesign.Transparent,
};

export const WithIcon = Template.bind({});
WithIcon.storyName = "With Icon";
WithIcon.args = {
    icon: "employee",
    default: "Add",
};

export const IconOnly = Template.bind({});
IconOnly.args = {
    icon: "employee",
    accessibleNameRef: "lblAway",
};
IconOnly.decorators = [
    (storyFn) => html` <ui5-label
            style="display:none;"
            id="lblAdd"
            aria-hidden="true"
            >Add</ui5-label
        >
        ${storyFn()}`,
];
