import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/Side Navigation/Side Navigation Group",
    component: "SideNavigationGroup",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-side-navigation>
	<ui5-side-navigation-group
		text="${ifDefined(args.text)}"
		?expanded="${ifDefined(args.expanded)}"
		?disabled="${ifDefined(args.disabled)}"
	>
		${unsafeHTML(args.default)}
	</ui5-side-navigation-group>
</ui5-side-navigation>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Group",
    expanded: true,
    disabled: false,
    default: `<ui5-side-navigation-item text="Item"></ui5-side-navigation-item>`
};
//# sourceMappingURL=SideNavigationGroup.stories.js.map