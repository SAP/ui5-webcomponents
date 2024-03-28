import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Icon",
    component: "Icon",
    argTypes,
};
const Template = (args) => html `<ui5-icon
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
export const Customized = Template.bind({});
Customized.args = {
    name: "tnt/antenna",
    style: "width: 3rem; height: 3rem; font-size: 1.5rem; color: crimson; background-color: #fafafa",
};
//# sourceMappingURL=Icon.stories.js.map