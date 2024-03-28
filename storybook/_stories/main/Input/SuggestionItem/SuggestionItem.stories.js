import { html } from "lit";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: "Main/Input/Suggestion Item",
    component: "SuggestionItem",
    argTypes,
};
const Template = (args) => html `
<ui5-input show-suggestions>
	<ui5-suggestion-item
	additional-text="${ifDefined(args.additionalText)}"
	additional-text-state="${ifDefined(args.additionalTextState)}"
	description="${ifDefined(args.description)}"
	icon="${ifDefined(args.icon)}"
	?icon-end="${ifDefined(args.iconEnd)}"
	image="${ifDefined(args.image)}"
	text="${ifDefined(args.text)}"
	type="${ifDefined(args.type)}"
	></ui5-suggestion-item>
</ui5-input>`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Germany"
};
//# sourceMappingURL=SuggestionItem.stories.js.map