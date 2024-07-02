import { html } from "lit";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Tab Container/Tab Separator",
    component: "TabSeparator",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-tabcontainer>
	<ui5-tab icon="calendar" text="Tab 1">
		<ui5-label>Possimus ipsa eos impedit aut nisi repellendus recusandae, temporibus ducimus, necessitatibus tenetur facere, minima vero fugit rem reiciendis natus ratione quia numquam?</ui5-label>
	</ui5-tab>
	<ui5-tab-separator></ui5-tab-separator>
	<ui5-tab icon="action-settings" text="Tab 2">
		<ui5-label>Explicabo laboriosam ab consequuntur, qui dignissimos inventore sapiente ullam quaerat ratione libero vero, beatae laudantium! Aperiam numquam tempore, laudantium perferendis recusandae autem.</ui5-label>
	</ui5-tab>
</ui5-tabcontainer>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {};
//# sourceMappingURL=TabSeparator.stories.js.map