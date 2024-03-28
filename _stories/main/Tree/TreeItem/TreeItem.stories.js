import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit/directives/if-defined.js";
export default {
    title: "Main/Tree/Tree Item",
    component: "TreeItem",
    argTypes,
};
const Template = (args) => html `<ui5-tree>
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
		tooltip="${ifDefined(args.tooltip)}"
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
//# sourceMappingURL=TreeItem.stories.js.map