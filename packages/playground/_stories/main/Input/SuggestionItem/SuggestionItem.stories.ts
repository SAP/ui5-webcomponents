import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type SuggestionItem from "@ui5/webcomponents/dist/SuggestionItem.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

export default {
	title: "Main/Input/Suggestion Item",
	component: "SuggestionItem",
	argTypes,
} as Meta<SuggestionItem>;

const Template: UI5StoryArgs<SuggestionItem, StoryArgsSlots> = (args) => html`
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