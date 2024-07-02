import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/Side Navigation/Side Navigation Item",
    component: "SideNavigationItem",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-side-navigation>
	<ui5-side-navigation-item
		text="${ifDefined(args.text)}"
		icon="${ifDefined(args.icon)}"
		?expanded="${ifDefined(args.expanded)}"
		?disabled="${ifDefined(args.disabled)}"
		?whole-item-toggleable="${ifDefined(args.wholeItemToggleable)}"
		href="${ifDefined(args.href)}"
		?selected="${ifDefined(args.selected)}"
		target="${ifDefined(args.target)}"
	>
		${unsafeHTML(args.default)}
	</ui5-side-navigation-item>
</ui5-side-navigation>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Events",
    icon: "calendar",
    expanded: true,
    default: `<ui5-side-navigation-sub-item text="Local"></ui5-side-navigation-sub-item>`,
    selected: true
};
//# sourceMappingURL=SideNavigationItem.stories.js.map