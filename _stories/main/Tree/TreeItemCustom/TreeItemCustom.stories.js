import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit/directives/if-defined.js";
export default {
    title: "Main/Tree/Tree Item Custom",
    component: "TreeItemCustom",
    argTypes,
};
const Template = (args) => html `<ui5-tree>
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
		tooltip="${ifDefined(args.tooltip)}"
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
//# sourceMappingURL=TreeItemCustom.stories.js.map