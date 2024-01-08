import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs";

import type TreeItem from "@ui5/webcomponents/dist/TreeItem.js";
import { ifDefined } from "lit/directives/if-defined.js";

const component = "ui5-tree-item";

export default {
    title: "Main/Tree/Tree Item",
    component: "TreeItem",
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true }),
        },
    },
    argTypes,
} as Meta<TreeItem>;

const Template: UI5StoryArgs<TreeItem, StoryArgsSlots> = (args) => html`<ui5-tree>
    <ui5-tree-item
        additional-text="${ifDefined(args.additionalText)}"
        additional-text-state="${ifDefined(args.additionalTextState)}"
        text="${ifDefined(args.text)}"
        accessible-name="${ifDefined(args.accessibleName)}"
        expanded="${ifDefined(args.expanded)}"
        has-children="${ifDefined(args.hasChildren)}"
        icon="${ifDefined(args.icon)}"
        indeterminate="${ifDefined(args.indeterminate)}"
        accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
        navigated="${ifDefined(args.navigated)}"
        type="${ifDefined(args.type)}"
        selected="${ifDefined(args.selected)}"
    >
        ${unsafeHTML(args.default)}
        ${unsafeHTML(args.deleteButton)}
    </ui5-tree-item>
</ui5-tree>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Tree 1",
    expanded: true,
    icon: "paste",
    default: `<ui5-tree-item text="Tree 1.1">
    <ui5-tree-item text="Tree 1.1.1"></ui5-tree-item>
</ui5-tree-item>`,
};
