import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type TreeItemCustom from "@ui5/webcomponents/dist/TreeItemCustom.js";
import { ifDefined } from "lit/directives/if-defined.js";

export default {
    title: "Main/Tree/Tree Item Custom",
    component: "TreeItemCustom",
    argTypes,
} as Meta<TreeItemCustom>;

const Template: UI5StoryArgs<TreeItemCustom, StoryArgsSlots> = (args) => html`<ui5-tree>
    <ui5-tree-item-custom
        hide-selection-element="${ifDefined(args.hideSelectionElement)}"
        accessible-name="${ifDefined(args.accessibleName)}"
        additional-text-state="${ifDefined(args.additionalTextState)}"
        expanded="${ifDefined(args.expanded)}"
        has-children="${ifDefined(args.hasChildren)}"
        icon="${ifDefined(args.icon)}"
        indeterminate="${ifDefined(args.indeterminate)}"
        accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
        navigated="${ifDefined(args.navigated)}"
        type="${ifDefined(args.type)}"
        selected="${ifDefined(args.selected)}"
    >
        ${unsafeHTML(args.content)}
        ${unsafeHTML(args.default)}
        ${unsafeHTML(args.deleteButton)}
    </ui5-tree-item-custom>
</ui5-tree>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    expanded: true,
    content: `<ui5-button slot="content">Level 1</ui5-button>`,
    default: `<ui5-tree-item-custom>
    <ui5-button slot="content">Level 2</ui5-button>
    <ui5-tree-item-custom>
        <ui5-button slot="content">Level 3</ui5-button>
    </ui5-tree-item-custom>
</ui5-tree-item-custom>`
};
