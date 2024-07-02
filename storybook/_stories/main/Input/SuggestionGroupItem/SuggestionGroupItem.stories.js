import { html } from "lit";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: "Main/Input/Suggestion Group Item",
    component: "SuggestionGroupItem",
    argTypes,
};
const Template = (args) => html `
<ui5-input
	show-suggestions
>
<ui5-suggestion-group-item text="${ifDefined(args.text)}"></ui5-suggestion-group-item>
<ui5-suggestion-item text="Germany"></ui5-suggestion-item>
<ui5-suggestion-item text="France"></ui5-suggestion-item>
</ui5-input>`;
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    text: "Europe"
};
//# sourceMappingURL=SuggestionGroupItem.stories.js.map