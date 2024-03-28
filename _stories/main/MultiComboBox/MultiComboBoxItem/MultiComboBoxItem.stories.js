import { html } from "lit";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: "Main/Multi-Combo Box/Multi-Combo Box Item",
    component: "MultiComboBoxItem",
    argTypes,
};
const Template = (args) => html `
<ui5-multi-combobox>
	<ui5-mcb-item
		text="${ifDefined(args.text)}"
		additional-text="${ifDefined(args.additionalText)}"
		?selected="${ifDefined(args.selected)}"
	></ui5-mcb-item>
</ui5-multi-combobox>`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Argentina",
    selected: true
};
//# sourceMappingURL=MultiComboBoxItem.stories.js.map