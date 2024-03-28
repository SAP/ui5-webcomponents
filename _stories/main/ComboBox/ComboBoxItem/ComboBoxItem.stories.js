import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Combo Box/Combo Box Item",
    component: "ComboBoxItem",
    argTypes,
};
const Template = (args) => html `<ui5-combobox value="${ifDefined(args.text)}">
	<ui5-cb-item text="${ifDefined(args.text)}" additional-text="${ifDefined(args.additionalText)}"></ui5-cb-item>
	<ui5-cb-item text="Australia" additional-text="AU"></ui5-cb-item>
	<ui5-cb-item text="Austria" additional-text="AT"></ui5-cb-item>
</ui5-combobox>`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Argentina",
    additionalText: "AR"
};
//# sourceMappingURL=ComboBoxItem.stories.js.map