import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
import IconDesign from "@ui5/webcomponents/dist/types/IconDesign.js";
const component = "ui5-icon";
export default {
    title: "Main/Icon",
    component,
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component }),
        },
    },
    argTypes,
};
const Template = (args) => html ` <ui5-icon
        design="${ifDefined(args.design)}"
        ?interactive="${ifDefined(args.interactive)}"
        name="${ifDefined(args.name)}"
        accessible-name="${ifDefined(args.accessibleName)}"
        accessible-role="${ifDefined(args.accessibleRole)}"
        ?show-tooltip="${ifDefined(args.showTooltip)}"
        style="${ifDefined(args.style)}"
    ></ui5-icon>`;
export const Basic = Template.bind({});
Basic.args = {
    name: "activities",
};
export const FioriToolsIcons = Template.bind({});
FioriToolsIcons.args = {
    name: "tnt/antenna",
};
export const Customized = Template.bind({});
Customized.args = {
    name: "employee",
    style: "width: 3rem; height: 3rem; font-size: 1.5rem; color: crimson; background-color: #fafafa",
};
export const SemanticDesign = Template.bind({});
SemanticDesign.args = {
    name: "employee",
    design: IconDesign.Positive,
};
//# sourceMappingURL=Icon.stories.js.map