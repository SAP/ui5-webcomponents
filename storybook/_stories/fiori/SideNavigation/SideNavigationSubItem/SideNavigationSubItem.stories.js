import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/Side Navigation/Side Navigation Sub Item",
    component: "SideNavigationSubItem",
    argTypes,
};
const Template = (args) => {
    return html `
	<ui5-side-navigation>
	<ui5-side-navigation-item text="Events" icon="calendar" expanded>
		<ui5-side-navigation-sub-item
			text="${ifDefined(args.text)}"
			href="${ifDefined(args.href)}"
			?selected="${ifDefined(args.selected)}"
			?disabled="${ifDefined(args.disabled)}"
			target="${ifDefined(args.target)}"
		></ui5-side-navigation-sub-item>
	</ui5-side-navigation-item>
</ui5-side-navigation>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Local",
    selected: true
};
//# sourceMappingURL=SideNavigationSubItem.stories.js.map