import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type BreadcrumbsItem from "@ui5/webcomponents/dist/BreadcrumbsItem.js";

const component = "ui5-breadcrumbs-item";

export default {
    title: "Main/Breadcrumbs/Breadcrumbs Item",
    component: "BreadcrumbsItem",
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true }),
        },
    },
    argTypes,
} as Meta<BreadcrumbsItem>;

const Template: UI5StoryArgs<BreadcrumbsItem, StoryArgsSlots> = (args) =>
    html`<ui5-breadcrumbs>
    <ui5-breadcrumbs-item href="https://www.sap.com" target="_blank">Root Page </ui5-breadcrumbs-item>
    <ui5-breadcrumbs-item href="${ifDefined(args.href)}" target="${ifDefined(args.target)}">${unsafeHTML(args.default)}</ui5-breadcrumbs-item>
    <ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
</ui5-breadcrumbs>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"]
Basic.args = {
    default: `Parent page`,
    href: "https://www.sap.com",
    target: "_blank"
};