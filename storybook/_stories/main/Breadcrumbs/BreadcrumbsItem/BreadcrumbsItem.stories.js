import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Breadcrumbs/Breadcrumbs Item",
    component: "BreadcrumbsItem",
    argTypes,
};
const Template = (args) => html `<ui5-breadcrumbs>
    <ui5-breadcrumbs-item href="https://www.sap.com" target="_blank">Root Page </ui5-breadcrumbs-item>
    <ui5-breadcrumbs-item href="${ifDefined(args.href)}" target="${ifDefined(args.target)}">${unsafeHTML(args.default)}</ui5-breadcrumbs-item>
    <ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
</ui5-breadcrumbs>`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    default: `Parent page`,
    href: "https://www.sap.com",
    target: "_blank"
};
//# sourceMappingURL=BreadcrumbsItem.stories.js.map